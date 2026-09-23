export interface DomainCertificate {
  id: string;
  title: string;
  subtitle: string;
  issuingAuthority: string;
  credentialId: string;
  accreditations: {
    tag: string;
    type: 'GOVT' | 'AICTE' | 'NSDC' | 'INTERNATIONAL';
    bg: string;
    text: string;
    border: string;
  }[];
  skillsValidated: string[];
  keyBenefits: string[];
  validity: string;
  verificationType: string;
  themeGradient: string;
  sealText: string;
}

export function getDomainCertificate(domainSlug: string, domainName: string): DomainCertificate {
  const certs = getDomainCertificates(domainSlug, domainName);
  return certs[0];
}

export function getDomainCertificates(domainSlug: string, domainName: string): DomainCertificate[] {
  const slug = (domainSlug || '').toLowerCase();

  if (slug.includes('information-technology') || slug.includes('it')) {
    return [
      {
        id: `cert-it-1`,
        title: `Govt. of India & AICTE Approved Software Engineering Credential`,
        subtitle: `National Level Technical Competency Certification in Full-Stack, Next.js & Cloud Architectures`,
        issuingAuthority: `Ministry of Skill Development (Govt. of India) & AICTE Technical Board`,
        credentialId: `GOVT-AICTE-IT-2026-9812`,
        accreditations: [
          { tag: 'Govt. of India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'NSDC Skill India 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'ISO 9001:2026 Verified 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
        ],
        skillsValidated: ['React & Next.js 14 App Router', 'Node.js Microservices & REST APIs', 'PostgreSQL & Prisma ORM', 'Docker & CI/CD Pipelines'],
        keyBenefits: ['Direct Entry into Tier-1 Corporate Hiring Portals', 'Government Recognized Career Qualification', 'QR Code Verifiable Registry'],
        validity: 'Lifetime Global Validity',
        verificationType: 'Government Portal & QR Code Verification',
        themeGradient: 'from-amber-500 via-purple-600 to-indigo-600',
        sealText: 'GOVT APPROVED • AICTE VERIFIED • NSDC CERTIFIED',
      },
    ];
  }

  if (slug.includes('ai') || slug.includes('data-science') || slug.includes('artificial')) {
    return [
      {
        id: `cert-ai-1`,
        title: `AICTE & NASSCOM Certified AI & Machine Learning Credential`,
        subtitle: `National Advanced Qualification in Python AI, PyTorch, LLMs, RAG & Autonomous Systems`,
        issuingAuthority: `AICTE Technical Education Board & NASSCOM FutureSkills Prime Portal`,
        credentialId: `AICTE-NASSCOM-AI-2026-7731`,
        accreditations: [
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'Govt. Skill India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'NSDC Partnered 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'ISO 9001:2026 Standard 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
        ],
        skillsValidated: ['PyTorch Deep Neural Networks', 'LLM Fine-Tuning & Prompt Engineering', 'LangChain & Vector DB RAG Pipelines', 'FastAPI AI Model Deployment'],
        keyBenefits: ['Recognized by Top MNC AI R&D Labs', 'Government Portal Transcript Verification', 'Includes Capstone AI Accreditation'],
        validity: 'Lifetime Global Validity',
        verificationType: 'QR Code & Digital Cryptographic Seal',
        themeGradient: 'from-purple-600 via-pink-600 to-rose-600',
        sealText: 'AICTE CERTIFIED • NASSCOM APPROVED',
      },
    ];
  }

  if (slug.includes('cyber') || slug.includes('security')) {
    return [
      {
        id: `cert-sec-1`,
        title: `Govt. Recognized & AICTE Approved Cyber Defense Credential`,
        subtitle: `National Standard Certification in SOC Analysis, Threat Hunting & SIEM Operations`,
        issuingAuthority: `Ministry of Electronics & IT (MeitY) & AICTE Technical Board`,
        credentialId: `MEITY-AICTE-CYBER-2026-6640`,
        accreditations: [
          { tag: 'Govt. MeitY Recognized 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'NSDC Cybersecurity Sector 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'ISO 27001 Security Standard 🌐', type: 'INTERNATIONAL', bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300' },
        ],
        skillsValidated: ['SIEM Splunk & Log Monitoring', 'Wireshark Network Traffic Analysis', 'OWASP Top 10 Vulnerability Audit', 'Incident Response & Threat Mitigation'],
        keyBenefits: ['Meets Enterprise Security Compliance', 'Government Cyber Cell Partnered', '100% Verifiable Credentials'],
        validity: 'Lifetime Global Validity',
        verificationType: 'MeitY Registry & QR Code',
        themeGradient: 'from-red-600 via-rose-600 to-purple-600',
        sealText: 'MEITY RECOGNIZED • AICTE CERTIFIED',
      },
    ];
  }

  if (slug.includes('cloud') || slug.includes('devops')) {
    return [
      {
        id: `cert-cloud-1`,
        title: `AICTE & AWS Academy Accredited Cloud DevOps Credential`,
        subtitle: `National Technical Certification in AWS Cloud Architecture, Docker & Kubernetes CI/CD`,
        issuingAuthority: `AICTE Technical Education Board & AWS Cloud Academy Council`,
        credentialId: `AICTE-AWS-CLOUD-2026-5521`,
        accreditations: [
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'Govt. Skill India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'NSDC Certified 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'ISO 9001:2026 Verified 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
        ],
        skillsValidated: ['AWS EC2, S3, RDS & VPC Subnetting', 'Docker & Kubernetes Orchestration', 'CI/CD Pipelines & Terraform Automation', 'CloudWatch System Monitoring'],
        keyBenefits: ['Direct Referral to Cloud Managed Providers', 'Govt Portal Transcript Alignment', 'Verifiable Credential Badge'],
        validity: 'Lifetime Global Validity',
        verificationType: 'AICTE & QR Verification',
        themeGradient: 'from-amber-600 via-orange-600 to-indigo-600',
        sealText: 'AICTE CERTIFIED • AWS ACADEMY APPROVED',
      },
    ];
  }

  if (slug.includes('analytics') || slug.includes('data-analytics')) {
    return [
      {
        id: `cert-analytics-1`,
        title: `Govt. of India & NSDC Certified Enterprise Data Analytics Credential`,
        subtitle: `National Standard Certification in SQL, Power BI, DAX Modeling & Executive Dashboards`,
        issuingAuthority: `Ministry of Skill Development (Govt. of India) & NSDC National Skill Board`,
        credentialId: `GOVT-NSDC-BI-2026-9041`,
        accreditations: [
          { tag: 'Govt. of India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'NSDC Skill India 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'ISO 9001:2026 Quality Standard 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
        ],
        skillsValidated: ['Power BI DAX Complex Formulas', 'Advanced SQL Window Functions & CTEs', 'Data Warehousing & Star Schema Modeling', 'Executive Dashboard Storytelling'],
        keyBenefits: ['Direct Referral to Analytics Consultancies', 'Government Portal Transcript Verification', 'Lifetime Verifiable Registry'],
        validity: 'Lifetime Global Validity',
        verificationType: 'Government Portal & QR Verification',
        themeGradient: 'from-amber-500 via-orange-600 to-purple-600',
        sealText: 'GOVT APPROVED • NSDC CERTIFIED',
      },
    ];
  }

  if (slug.includes('communication') || slug.includes('soft-skills')) {
    return [
      {
        id: `cert-comm-1`,
        title: `Govt. Recognized & AICTE Approved Executive Corporate Communication Credential`,
        subtitle: `National Competency Certification in Business English, Leadership & Workplace Diplomacy`,
        issuingAuthority: `Ministry of Skill Development (Govt. of India) & AICTE Management Board`,
        credentialId: `GOVT-AICTE-COMM-2026-3112`,
        accreditations: [
          { tag: 'Govt. of India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
          { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
          { tag: 'NSDC Skill India 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
          { tag: 'ISO 9001:2026 Standard 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
        ],
        skillsValidated: ['Executive Business English & Accent Neutralization', 'High-Impact Email Etiquette & Corporate Messaging', 'Boardroom Pitching & Presentation Storytelling', 'Cross-Cultural Workplace Diplomacy'],
        keyBenefits: ['Direct Priority Entry into MNC Placement Drives', 'Official Government Transcript Badge', '1-on-1 Certified Audio Audit'],
        validity: 'Lifetime Global Validity',
        verificationType: 'Government Registry & QR Code',
        themeGradient: 'from-purple-600 via-pink-600 to-indigo-600',
        sealText: 'GOVT APPROVED • AICTE VERIFIED',
      },
    ];
  }

  // Default fallback for any other domain (UI/UX, Digital Marketing, Finance, Emerging Tech, Career Programs)
  return [
    {
      id: `cert-${slug}-1`,
      title: `Govt. of India & AICTE Approved National ${domainName} Qualification`,
      subtitle: `Government Recognized Certification with Skill India & ISO 9001:2026 Standards`,
      issuingAuthority: `Ministry of Skill Development (Govt. of India) & AICTE Technical Education Board`,
      credentialId: `GOVT-AICTE-${slug.substring(0, 4).toUpperCase()}-2026-9012`,
      accreditations: [
        { tag: 'Govt. of India Approved 🏛️', type: 'GOVT', bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-300' },
        { tag: 'AICTE Certified 🎓', type: 'AICTE', bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300' },
        { tag: 'NSDC Skill India 🇮🇳', type: 'NSDC', bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300' },
        { tag: 'ISO 9001:2026 Quality Verified 🌐', type: 'INTERNATIONAL', bg: 'bg-purple-50', text: 'text-purple-900', border: 'border-purple-300' },
      ],
      skillsValidated: [`Core ${domainName} Industry Standards`, 'Advanced Practical Project Execution', 'Enterprise Quality Benchmarks', 'Professional Compliance & Best Practices'],
      keyBenefits: ['Direct Referral to Partner Hiring Portals', 'Government Recognized Career Credential', 'Lifetime Verifiable Ledger & QR Verification'],
      validity: 'Lifetime Global Validity',
      verificationType: 'Government Portal & QR Verification',
      themeGradient: 'from-amber-500 via-purple-600 to-indigo-600',
      sealText: 'GOVT APPROVED • AICTE VERIFIED • NSDC CERTIFIED',
    },
  ];
}
