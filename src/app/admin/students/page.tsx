import { redirect } from 'next/navigation';

export default function AdminStudentsAliasPage() {
  redirect('/admin?tab=STUDENTS');
}
