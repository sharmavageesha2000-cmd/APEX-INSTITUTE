import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getCourseById, getCourseBySlug, getCourses } from '@/lib/store';
import { hashPassword } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      courseId,
      name,
      email,
      phone,
      city,
      password,
      batchTiming,
      paymentChoice,
      amountToPay,
    } = body;

    if (!name || !email || !courseId) {
      return NextResponse.json(
        { error: 'Name, email, and course selection are required.' },
        { status: 400 }
      );
    }

    // Resolve course
    const allCourses = await getCourses();
    const course =
      allCourses.find((c) => c.id === courseId || c.slug === courseId) ||
      (await getCourseById(courseId)) ||
      (await getCourseBySlug(courseId)) ||
      allCourses[0];

    const isFullPayment = paymentChoice === 'FULL_PAYMENT' || paymentChoice === 'FULL';
    const courseFee = course ? (course.discountFee || course.fee) : 25000;
    const fullDiscount = Math.round(courseFee * 0.05);
    const fullDiscountedFee = courseFee - fullDiscount;

    const finalAmount = isFullPayment
      ? (amountToPay || fullDiscountedFee)
      : 2000;

    // Securely hash password for metadata storage
    const hashedPassword = password ? await hashPassword(password) : await hashPassword('student123');

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    const itemName = `${course?.title || 'Tech Bootcamp'} - ${
      isFullPayment ? 'Full Tuition Enrollment' : 'Seat Booking Deposit (Mandatory)'
    }`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email.trim().toLowerCase(),
      client_reference_id: `apex-reg-${Date.now()}`,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: itemName,
              description: `Apex Tech Institute Program Enrollment for ${name.trim()} (${phone || ''})`,
              images: course?.image ? [course.image] : [],
            },
            unit_amount: Math.round(finalAmount * 100), // in paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/register?canceled=true`,
      metadata: {
        type: 'REGISTRATION',
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone || '',
        city: city || 'Bangalore',
        hashedPassword,
        courseId: course?.id || 'course-1',
        courseTitle: course?.title || 'Bootcamp',
        batchTiming: batchTiming || 'Mon-Fri (7:30 PM - 9:30 PM)',
        paymentChoice: isFullPayment ? 'FULL_PAYMENT' : 'DEPOSIT_2000',
        amountPaid: String(finalAmount),
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate Stripe Checkout.' },
      { status: 500 }
    );
  }
}
