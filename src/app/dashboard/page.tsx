import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getEnrollmentsByUser, getCourses, getEnquiries } from '@/lib/store';
import { StudentDashboardClient } from '@/components/dashboard/StudentDashboardClient';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  // If not logged in, redirect to login page
  if (!user) {
    redirect('/login?redirect=/dashboard');
  }

  // If admin tries to access student dashboard, redirect to admin page
  if (user.role === 'ADMIN') {
    redirect('/admin');
  }

  const enrollments = await getEnrollmentsByUser(user.id);
  const enquiries = await getEnquiries();
  const allCourses = await getCourses();

  // Filter enquiries for current user email
  const userEnquiries = enquiries.filter((e) => e.email.toLowerCase() === user.email.toLowerCase());

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <StudentDashboardClient
        user={user}
        enrollments={enrollments}
        enquiries={userEnquiries}
        savedCourses={allCourses.slice(0, 2)}
      />
    </div>
  );
}
