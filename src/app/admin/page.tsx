import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import {
  getDomains,
  getCourses,
  getEnquiries,
  getUsers,
  getAllEnrollments,
  getBlogs,
  getEvents,
  getSiteSettings,
} from '@/lib/store';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  if (user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const domains = await getDomains();
  const courses = await getCourses();
  const enquiries = await getEnquiries();
  const users = await getUsers();
  const enrollments = await getAllEnrollments();
  const blogs = await getBlogs();
  const events = await getEvents();
  const settings = await getSiteSettings();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <AdminDashboardClient
        initialDomains={domains}
        initialCourses={courses}
        initialEnquiries={enquiries}
        initialUsers={users}
        initialEnrollments={enrollments}
        initialBlogs={blogs}
        initialEvents={events}
        initialSettings={settings}
      />
    </div>
  );
}
