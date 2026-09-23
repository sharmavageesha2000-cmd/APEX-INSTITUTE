import React from 'react';
import { Metadata } from 'next';
import { SkillPassportClient } from '@/components/skill-passport/SkillPassportClient';

export const metadata: Metadata = {
  title: 'Student Skill Passport | Verified Digital Profile & Credential Ledger | Apex Institute',
  description:
    'Every Apex student receives an official, blockchain-grade Digital Skill Passport showcasing verified Skills, Capstone Projects, Govt. Certifications, Proctored Assessments, Internships, and interactive Web Portfolio.',
};

export default function SkillPassportPage() {
  return <SkillPassportClient />;
}
