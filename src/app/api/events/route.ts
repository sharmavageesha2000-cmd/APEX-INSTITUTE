import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getEvents, createEvent } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const events = await getEvents();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, category, date, time, location, speakerName, speakerRole, description } = body;

    if (!title || !date || !time) {
      return NextResponse.json({ error: 'Title, date, and time are required' }, { status: 400 });
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newEvent = await createEvent({
      title,
      slug,
      category: category || 'Workshops',
      date,
      time,
      location: location || 'Bangalore Campus & Online Live',
      speakerName: speakerName || 'Apex Senior Architect',
      speakerRole: speakerRole || 'Industry Mentor',
      speakerFoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      description: description || 'Interactive masterclass organized by Apex Tech Institute.',
      featured: true,
    });

    revalidatePath('/events');
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create event' }, { status: 500 });
  }
}
