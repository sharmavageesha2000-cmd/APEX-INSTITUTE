import React from 'react';
import { getDomains, getCourses, getReviews } from '@/lib/store';
import { HomeClientWrapper } from '@/components/home/HomeClientWrapper';

export default async function HomePage() {
  const domains = await getDomains();
  const featuredCourses = await getCourses({ featuredOnly: true });
  const allCourses = await getCourses();
  const reviews = await getReviews();

  return (
    <div className="overflow-hidden">
      <HomeClientWrapper
        domains={domains}
        featuredCourses={featuredCourses}
        allCourses={allCourses}
        reviews={reviews}
      />
    </div>
  );
}
