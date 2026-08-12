import { NextResponse } from 'next/server';
import { getDomains, createDomain } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const domains = await getDomains();
    return NextResponse.json({ domains });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { name, slug, headline, description, iconName, subcategories } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const domain = await createDomain({
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      headline: headline || `${name} Career Excellence Programs`,
      description: description || `Comprehensive training programs in ${name}.`,
      iconName: iconName || 'BookOpen',
      subcategories: Array.isArray(subcategories) ? subcategories : [],
    });

    return NextResponse.json({ success: true, domain });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create domain' }, { status: 500 });
  }
}
