import { NextResponse } from 'next/server';
import { getCourses, createCourse } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domainSlug = searchParams.get('domain') || undefined;
  const search = searchParams.get('search') || undefined;
  const level = searchParams.get('level') || undefined;
  const mode = searchParams.get('mode') || undefined;
  const featuredOnly = searchParams.get('featured') === 'true';

  try {
    const courses = await getCourses({ domainSlug, search, level, mode, featuredOnly });
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      headline,
      description,
      domainId,
      duration,
      fee,
      discountFee,
      level,
      mode,
      badge,
      syllabus,
      careerRoles,
      highlights,
      placementAssistance,
      featured,
    } = body;

    if (!title || !domainId || !fee) {
      return NextResponse.json({ error: 'Title, domain, and fee are required' }, { status: 400 });
    }

    const courseSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const course = await createCourse({
      title,
      slug: courseSlug,
      headline: headline || title,
      description: description || headline || title,
      domainId,
      duration: duration || '3 Months',
      fee: Number(fee),
      discountFee: discountFee ? Number(discountFee) : undefined,
      level: level || 'Beginner to Advanced',
      mode: mode || 'Live Online',
      badge,
      rating: 4.8,
      totalStudents: 50,
      syllabus: syllabus || [
        { moduleNumber: 1, title: 'Foundations & Basics', duration: '4 Weeks', topics: ['Core Concepts', 'Hands-on Labs'] },
      ],
      careerRoles: careerRoles || [{ title: 'Specialist Role', avgSalary: '₹6.0 LPA - ₹12 LPA', hiringCompanies: ['Tech Enterprise'] }],
      highlights: highlights || ['100% Placement Assistance', 'Live Projects', 'Mentorship'],
      instructor: {
        name: 'Apex Senior Tech Mentor',
        title: 'Lead Industry Architect',
        experience: '10+ Years Industry Experience',
        expertise: ['Full Stack', 'System Architecture'],
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      projects: [
        {
          title: 'Production SaaS Web Application',
          description: 'Complete web platform with server rendering, database schemas, and cloud deployment.',
          techStack: ['React', 'Next.js', 'PostgreSQL', 'Docker'],
        },
      ],
      faqs: [
        {
          question: 'Are live lecture recordings provided?',
          answer: 'Yes! High-definition recordings are uploaded to your LMS dashboard within 2 hours.',
        },
      ],
      prerequisites: ['Basic computer fundamentals'],
      whoShouldTake: ['Students, freshers, and career switchers'],
      toolsCovered: ['Core Tools', 'Industry Frameworks'],
      placementAssistance: placementAssistance !== false,
      featured: Boolean(featured),
    });

    return NextResponse.json({ success: true, course });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
