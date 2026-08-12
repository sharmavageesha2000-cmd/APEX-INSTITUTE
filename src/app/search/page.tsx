import React, { Suspense } from 'react';
import { getCourses, getDomains, getBlogs, getEvents } from '@/lib/store';
import { GlobalSearchClient } from '@/components/search/GlobalSearchClient';

export default async function SearchPage() {
  const courses = await getCourses();
  const domains = await getDomains();
  const blogs = await getBlogs();
  const events = await getEvents();

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Suspense fallback={<div className="text-slate-400 text-center py-12">Loading global search index...</div>}>
        <GlobalSearchClient
          courses={courses}
          domains={domains}
          blogs={blogs}
          events={events}
        />
      </Suspense>
    </div>
  );
}
