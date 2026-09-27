import React from 'react';
import { getDomainBySlug, getDomains, getCourses } from '@/lib/store';
import { DomainDetailsClient } from '@/components/domains/DomainDetailsClient';

interface DomainDetailsPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60;

export default async function DomainDetailsPage({ params }: DomainDetailsPageProps) {
  const [allDomains, allCourses] = await Promise.all([
    getDomains(),
    getCourses(),
  ]);
  const s = params.slug.toLowerCase().trim();
  const domain = allDomains.find((d) => d.slug === s || d.slug.includes(s) || s.includes(d.slug)) || allDomains[0];

  const domainCourses = allCourses.filter(
    (c) => c.domainId === domain.id || c.domainSlug === domain.slug
  );

  return (
    <div className="pb-20">
      <DomainDetailsClient domain={domain} domainCourses={domainCourses} allCourses={allCourses} />
    </div>
  );
}
