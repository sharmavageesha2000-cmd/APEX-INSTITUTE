import { NextResponse } from 'next/server';
import { deleteUser, updateUser } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Prevent admin from deleting themselves
  if (user.id === params.id) {
    return NextResponse.json({ error: 'Cannot delete your own administrator account' }, { status: 400 });
  }

  try {
    const deleted = await deleteUser(params.id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete user' }, { status: 500 });
  }
}

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
    const updated = await updateUser(params.id, body);
    return NextResponse.json({ success: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update user' }, { status: 500 });
  }
}
