import { NextResponse } from 'next/server';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, courseId, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    const enquiry = await createEnquiry({
      name,
      email,
      phone,
      courseId,
      message: message || 'Enquiry submitted from website.',
    });

    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id, status, notes } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, status, notes);
    return NextResponse.json({ success: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
