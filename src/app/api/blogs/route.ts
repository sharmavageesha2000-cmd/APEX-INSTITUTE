import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getBlogs, createBlog } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const blogs = await getBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, category, authorName, authorTitle, readTime, summary, content } = body;

    if (!title || !summary || !content) {
      return NextResponse.json({ error: 'Title, summary, and content are required' }, { status: 400 });
    }

    const slug = body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newBlog = await createBlog({
      title,
      slug,
      category: category || 'Career Guide',
      image: body.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      authorName: authorName || 'Apex Editorial Team',
      authorTitle: authorTitle || 'Lead Tech Writer',
      authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      readTime: readTime || '5 min read',
      summary,
      content,
      featured: true,
    });

    revalidatePath('/blog');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
