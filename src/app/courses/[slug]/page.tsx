import React from 'react';
import { getCourseBySlug, getCourses, getReviews } from '@/lib/store';
import { CourseDetailsClient } from '@/components/courses/CourseDetailsClient';

interface CourseDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const allCourses = await getCourses();
  const course = (await getCourseBySlug(params.slug)) || allCourses[0];
  const reviews = await getReviews();

  return (
    <div className="pb-20">
      <CourseDetailsClient course={course} allCourses={allCourses} reviews={reviews} />
    </div>
  );
}
