import React from 'react';
import { getDomainBySlug, getDomains, getCourses } from '@/lib/store';
import { DomainDetailsClient } from '@/components/domains/DomainDetailsClient';

interface DomainDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function DomainDetailsPage({ params }: DomainDetailsPageProps) {
  const allDomains = await getDomains();
  const domain = (await getDomainBySlug(params.slug)) || allDomains[0];
  const allCourses = await getCourses();

  const domainCourses = allCourses.filter(
    (c) => c.domainId === domain.id || c.domainSlug === domain.slug
  );

  return (
    <div className="pb-20">
      <DomainDetailsClient domain={domain} domainCourses={domainCourses} allCourses={allCourses} />
    </div>
  );
}
