import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteSettings, updateSiteSettings } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = await updateSiteSettings(body);

    revalidatePath('/', 'layout');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}
