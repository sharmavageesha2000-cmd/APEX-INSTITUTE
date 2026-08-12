import React from 'react';
import { redirect } from 'next/navigation';

export default function BlogsSlugAliasPage({ params }: { params: { slug: string } }) {
  redirect(`/blog/${params.slug}`);
}
