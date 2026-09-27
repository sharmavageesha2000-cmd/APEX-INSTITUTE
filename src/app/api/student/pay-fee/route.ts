import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getEnrollmentsByUser, updateEnrollment } from '@/lib/store';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { enrollmentId, amount, planChosen } = await request.json();

    if (!enrollmentId || !amount) {
      return NextResponse.json(
        { error: 'Enrollment ID and amount are required' },
        { status: 400 }
      );
    }

    const userEnrollments = await getEnrollmentsByUser(user.id);
    const targetEnr = userEnrollments.find((e) => e.id === enrollmentId);
    if (!targetEnr) {
      return NextResponse.json({ error: 'Enrollment record not found' }, { status: 404 });
    }

    const payAmount = Number(amount);
    const currentRemaining =
      targetEnr.remainingFee ??
      Math.max(0, (targetEnr.totalFee || 25000) - (targetEnr.registrationFeePaid || 2000));
    const newRemaining = Math.max(0, currentRemaining - payAmount);
    const newStatus = newRemaining === 0 ? 'FULLY_PAID' : 'PARTIALLY_PAID';

    const updated = await updateEnrollment(enrollmentId, {
      remainingFee: newRemaining,
      paymentStatus: newStatus,
      paymentPlan: planChosen || targetEnr.paymentPlan || 'LUMPSUM',
      lastPaymentDate: new Date().toISOString(),
    });

    revalidatePath('/dashboard');
    revalidatePath('/admin');

    const txnId = `TXN-FEE-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
      success: true,
      enrollment: updated,
      transactionId: txnId,
      paidAmount: payAmount,
      remainingFee: newRemaining,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
