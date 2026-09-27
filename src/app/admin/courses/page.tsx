import { redirect } from 'next/navigation';

export default function AdminCoursesAliasPage() {
  redirect('/admin?tab=COURSES');
}
