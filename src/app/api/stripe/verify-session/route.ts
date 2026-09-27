import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import {
  getUserByEmail,
  createUser,
  createEnrollment,
  getCourseById,
  getCourses,
  getAllEnrollments,
  updateEnrollment,
} from '@/lib/store';
import { signToken, getAuthTokenCookieName } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required.' }, { status: 400 });
    }

    // Retrieve the verified session directly from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment has not been completed or verified by Stripe.' },
        { status: 400 }
      );
    }

    const metadata = session.metadata || {};
    const transactionId =
      (typeof session.payment_intent === 'string' ? session.payment_intent : session.id) ||
      `STRIPE-${session.id.slice(-8)}`;

    // 1. REGISTRATION VERIFICATION
    if (metadata.type === 'REGISTRATION') {
      const email = (metadata.email || '').toLowerCase().trim();
      const name = metadata.name || 'Enrolled Student';
      const phone = metadata.phone || '';
      const city = metadata.city || 'Bangalore';
      const hashedPassword = metadata.hashedPassword;
      const courseId = metadata.courseId || 'course-1';
      const batchTiming = metadata.batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)';
      const isFullPayment = metadata.paymentChoice === 'FULL_PAYMENT';
      const amountPaid = Number(metadata.amountPaid) || (isFullPayment ? 25000 : 2000);

      // Find course
      const allCourses = await getCourses();
      const course =
        allCourses.find((c) => c.id === courseId || c.slug === courseId) ||
        (await getCourseById(courseId)) ||
        allCourses[0];

      const courseFee = course ? (course.discountFee || course.fee) : 25000;
      const remainingBalance = isFullPayment ? 0 : Math.max(0, courseFee - amountPaid);
      const paymentStatus = isFullPayment ? 'FULLY_PAID' : 'REGISTRATION_PAID';

      // 1.1 Find or Create User
      let user = await getUserByEmail(email);
      if (!user) {
        const userId = `usr-${Date.now()}`;
        user = await createUser({
          id: userId,
          name,
          email,
          password: hashedPassword,
          phone,
          city,
          role: 'STUDENT',
          createdAt: new Date().toISOString(),
        });

        try {
          await prisma.user.create({
            data: {
              id: userId,
              name,
              email,
              password: hashedPassword,
              phone,
              city,
              role: 'STUDENT',
            },
          });
        } catch (dbErr) {}
      }

      // 1.2 Check or Create Enrollment
      const enrollments = await getAllEnrollments();
      let enrollment = enrollments.find(
        (e) => e.userId === user?.id && e.courseId === course?.id
      );

      if (!enrollment && user && course) {
        enrollment = await createEnrollment(user.id, course.id, batchTiming, {
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone || '',
          totalFee: courseFee,
          registrationFeePaid: amountPaid,
          remainingFee: remainingBalance,
          paymentPlan: 'LUMPSUM',
          paymentStatus: paymentStatus as any,
          mode: 'Live Online',
        });

        try {
          await prisma.enrollment.create({
            data: {
              id: enrollment.id,
              userId: user.id,
              courseId: course.id,
              status: 'ACTIVE',
              progress: 10,
              batchTiming,
              mode: 'Live Online',
            },
          });
        } catch (dbErr) {}
      }

      // 1.3 Sign Auth Cookie for automatic portal sign-in
      const token = signToken({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: 'STUDENT',
      });

      const response = NextResponse.json({
        success: true,
        verified: true,
        transactionId,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: 'STUDENT',
        },
        enrollment: enrollment || {
          courseTitle: course?.title,
          totalFee: courseFee,
          registrationFeePaid: amountPaid,
          remainingFee: remainingBalance,
          paymentStatus,
        },
        paymentChoice: isFullPayment ? 'FULL_PAYMENT' : 'DEPOSIT_2000',
      });

      response.cookies.set(getAuthTokenCookieName(), token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      revalidatePath('/dashboard');
      revalidatePath('/admin');
      return response;
    }

    // 2. DASHBOARD FEE PAYMENT VERIFICATION
    if (metadata.type === 'FEE_PAYMENT') {
      const enrollmentId = metadata.enrollmentId;
      const amountPaid = Number(metadata.amountPaid) || 0;
      const planChosen = (metadata.planChosen as any) || 'LUMPSUM';

      const enrollments = await getAllEnrollments();
      const enr = enrollments.find((e) => e.id === enrollmentId);

      if (enr) {
        const newPaid = (enr.registrationFeePaid || 0) + amountPaid;
        const newRemaining = Math.max(0, (enr.remainingFee || 0) - amountPaid);
        const newStatus = newRemaining === 0 ? 'FULLY_PAID' : 'PARTIALLY_PAID';

        await updateEnrollment(enr.id, {
          registrationFeePaid: newPaid,
          remainingFee: newRemaining,
          paymentStatus: newStatus as any,
          paymentPlan: planChosen,
        });

        try {
          await prisma.enrollment.update({
            where: { id: enr.id },
            data: {
              status: 'ACTIVE',
            },
          });
        } catch (dbErr) {}

        revalidatePath('/dashboard');
        revalidatePath('/admin');

        return NextResponse.json({
          success: true,
          verified: true,
          transactionId,
          remainingFee: newRemaining,
          paymentStatus: newStatus,
        });
      }

      return NextResponse.json({
        success: true,
        verified: true,
        transactionId,
      });
    }

    return NextResponse.json({
      success: true,
      verified: true,
      transactionId,
    });
  } catch (error: any) {
    console.error('Error verifying Stripe session:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to verify Stripe payment session.' },
      { status: 500 }
    );
  }
}
