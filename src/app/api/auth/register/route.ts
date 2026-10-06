import { NextResponse } from 'next/server';
import {
  getUserByEmail,
  createUser,
  createEnrollment,
  getCourses,
  getCourseById,
  getCourseBySlug,
} from '@/lib/store';
import { hashPassword, signToken, getAuthTokenCookieName } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      password,
      phone,
      city,
      courseId,
      batchTiming,
      paymentChoice,
      paymentType,
      amountPaidNow,
      transactionId,
    } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await getUserByEmail(cleanEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please log in directly.' },
        { status: 400 }
      );
    }

    // Resolve chosen course
    const allCourses = await getCourses();
    let selectedCourse = null;
    if (courseId) {
      selectedCourse =
        allCourses.find((c) => c.id === courseId || c.slug === courseId) ||
        (await getCourseById(courseId)) ||
        (await getCourseBySlug(courseId));
    }

    // If no specific course was provided, default to first course
    if (!selectedCourse && allCourses.length > 0) {
      selectedCourse = allCourses[0];
    }

    const hashedPassword = await hashPassword(password);
    const userId = `usr-${Date.now()}`;

    // 1. Create User in store
    const newUser = await createUser({
      id: userId,
      name,
      email: cleanEmail,
      password: hashedPassword,
      phone: phone || '',
      city: city || 'Bangalore',
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
    });

    // Also attempt DB insert if Prisma is configured
    try {
      await prisma.user.create({
        data: {
          id: userId,
          name,
          email: cleanEmail,
          password: hashedPassword,
          phone: phone || '',
          city: city || 'Bangalore',
          role: 'STUDENT',
        },
      });
    } catch (dbErr) {
      // Memory store fallback handles it
    }

    // 2. Create Course Enrollment with chosen payment option (Full Payment or ₹2,000 Deposit)
    let enrollment = null;
    const courseFee = selectedCourse ? (selectedCourse.discountFee || selectedCourse.fee) : 25000;
    const isFullPayment =
      paymentChoice === 'FULL_PAYMENT' ||
      paymentChoice === 'FULL' ||
      paymentType === 'FULL' ||
      paymentType === 'FULL_PAYMENT';
    const fullDiscount = Math.round(courseFee * 0.05);
    const fullDiscountedFee = courseFee - fullDiscount;

    const paidNow = isFullPayment ? (amountPaidNow || fullDiscountedFee) : 2000;
    const remainingBalance = isFullPayment ? 0 : Math.max(0, courseFee - 2000);
    const paymentStatus: 'FULLY_PAID' | 'REGISTRATION_PAID' = isFullPayment ? 'FULLY_PAID' : 'REGISTRATION_PAID';

    const generatedTxn =
      transactionId ||
      `TXN-APEX-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (selectedCourse) {
      enrollment = await createEnrollment(
        userId,
        selectedCourse.id,
        batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
        {
          userName: name,
          userEmail: cleanEmail,
          userPhone: phone || '',
          totalFee: courseFee,
          registrationFeePaid: paidNow,
          remainingFee: remainingBalance,
          paymentPlan: 'LUMPSUM',
          paymentStatus,
          mode: 'Live Online',
        }
      );

      try {
        await prisma.enrollment.create({
          data: {
            id: enrollment.id,
            userId,
            courseId: selectedCourse.id,
            status: 'ACTIVE',
            progress: 10,
            batchTiming: batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
            mode: 'Live Online',
          },
        });
      } catch (dbErr) {}
    }

    // Revalidate paths for immediate visibility in Admin Panel and LMS
    revalidatePath('/admin');
    revalidatePath('/dashboard');

    // 3. Issue authentication token & cookie
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        enrollment,
        transactionId: generatedTxn,
        registrationFeePaid: paidNow,
        remainingFee: remainingBalance,
        paymentStatus,
        paymentChoice: isFullPayment ? 'FULL_PAYMENT' : 'DEPOSIT_2000',
        courseTitle: selectedCourse?.title,
      },
      { status: 201 }
    );

    response.cookies.set(getAuthTokenCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to complete registration' },
      { status: 500 }
    );
  }
}

