import React from 'react';
import { getDomains, getCourses, getReviews } from '@/lib/store';
import { HomeClientWrapper } from '@/components/home/HomeClientWrapper';

export const revalidate = 60;

export default async function HomePage() {
  const [domains, allCourses, reviews] = await Promise.all([
    getDomains(),
    getCourses(),
    getReviews(),
  ]);
  const featuredCourses = allCourses.filter((c) => c.featured);

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
