import React from 'react';
import { getCourses } from '@/lib/store';
import { CourseRegisterClient } from '@/components/auth/CourseRegisterClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Course Enrollment & Student Registration | Apex Tech Institute',
  description:
    'Enroll in your career program with prefilled fees, course switcher dropdown, and mandatory ₹2,000 seat booking fee.',
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: { course?: string };
}) {
  const allCourses = await getCourses();

  return (
    <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6">
      <CourseRegisterClient
        allCourses={allCourses}
        initialCourseSlug={searchParams?.course}
      />
    </div>
  );
}
