import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { createEnrollment, getEnrollmentsByUser } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const enrollments = await getEnrollmentsByUser(user.id);
  return NextResponse.json({ enrollments });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Please login to enroll' }, { status: 401 });
  }

  try {
    const { courseId, batchTiming } = await request.json();
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const enrollment = await createEnrollment(user.id, courseId, batchTiming);
    return NextResponse.json({ success: true, enrollment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to enroll' }, { status: 500 });
  }
}
