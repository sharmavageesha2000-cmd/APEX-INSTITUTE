import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { updateEvent, deleteEvent } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = await updateEvent(params.id, body);

    revalidatePath('/events');
    revalidatePath('/events/[slug]', 'page');
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json({ success: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const deleted = await deleteEvent(params.id);

    revalidatePath('/events');
    revalidatePath('/events/[slug]', 'page');
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete event' }, { status: 500 });
  }
}
