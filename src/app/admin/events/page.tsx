import { redirect } from 'next/navigation';

export default function AdminEventsAliasPage() {
  redirect('/admin?tab=BLOGS_EVENTS');
}
