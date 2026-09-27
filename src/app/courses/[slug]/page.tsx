import React from 'react';
import { getCourseBySlug, getCourses, getReviews } from '@/lib/store';
import { CourseDetailsClient } from '@/components/courses/CourseDetailsClient';

interface CourseDetailsPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const [allCourses, reviews] = await Promise.all([
    getCourses(),
    getReviews(),
  ]);
  const s = params.slug.toLowerCase().trim();
  const course = allCourses.find((c) => c.slug === s || c.slug.includes(s) || s.includes(c.slug)) || allCourses[0];

  return (
    <div className="pb-20">
      <CourseDetailsClient course={course} allCourses={allCourses} reviews={reviews} />
    </div>
  );
}
