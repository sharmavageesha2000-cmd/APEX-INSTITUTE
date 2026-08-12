import React from 'react';
import { getCourseBySlug, getCourses } from '@/lib/store';
import { getCurrentUser } from '@/lib/auth';
import { EnrollmentClient } from '@/components/enroll/EnrollmentClient';

interface EnrollPageProps {
  params: { slug: string };
}

export default async function EnrollPage({ params }: EnrollPageProps) {
  const allCourses = await getCourses();
  const course = (await getCourseBySlug(params.slug)) || allCourses[0];
  const user = await getCurrentUser();

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
      <EnrollmentClient course={course} currentUser={user} allCourses={allCourses} />
    </div>
  );
}
