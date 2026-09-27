import React from 'react';
import { getBlogs } from '@/lib/store';
import { BlogClientView } from '@/components/blog/BlogClientView';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const blogs = await getBlogs();
  return <BlogClientView initialBlogs={blogs} />;
}
