import { redirect } from 'next/navigation';

interface EnrollPageProps {
  params: { slug: string };
}

export default function EnrollPage({ params }: EnrollPageProps) {
  redirect(`/register?course=${params.slug}`);
}
