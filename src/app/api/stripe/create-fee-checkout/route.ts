import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getCurrentUser } from '@/lib/auth';
import { getAllEnrollments } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Please log in to make fee payments.' }, { status: 401 });
    }

    const { enrollmentId, amount, planChosen } = await request.json();

    if (!enrollmentId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid payment parameters.' }, { status: 400 });
    }

    const enrollments = await getAllEnrollments();
    const enrollment = enrollments.find((e) => e.id === enrollmentId);

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment record not found.' }, { status: 404 });
    }

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      client_reference_id: `apex-fee-${Date.now()}`,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${enrollment.courseTitle || 'Course'} - Tuition Fee Installment`,
              description: `Apex Tech Institute Fee Payment for ${user.name} (${user.email})`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard?payment=canceled`,
      metadata: {
        type: 'FEE_PAYMENT',
        enrollmentId,
        userId: user.id,
        amountPaid: String(amount),
        planChosen: planChosen || 'LUMPSUM',
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Error creating Stripe fee checkout session:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate Stripe Fee Checkout.' },
      { status: 500 }
    );
  }
}
