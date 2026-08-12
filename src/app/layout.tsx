import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { getDomains } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const font = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Apex Tech Institute | Modern EdTech & Career Mastery Platform',
  description: 'Accelerate your tech career with flagship courses in Full Stack Web Development, Data Science, AI/ML, Cloud DevOps, Cybersecurity, and UI/UX Design with 100% placement support.',
  keywords: ['training institute', 'full stack course', 'data science bootcamp', 'devops course', 'placement guarantee', 'edtech platform'],
  openGraph: {
    title: 'Apex Tech Institute | Modern EdTech & Career Mastery Platform',
    description: 'Industry-focused training programs designed to help students build practical skills, gain confidence and prepare for real-world tech careers.',
    url: 'https://apexinstitute.com',
    siteName: 'Apex Tech Institute',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const domains = await getDomains();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Apex Tech Institute',
    url: 'https://apexinstitute.com',
    logo: 'https://apexinstitute.com/logo.png',
    description: 'Premier EdTech & Career Mastery Institute offering job-oriented training in 10 major career domains.',
    telephone: '+919876543210',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Apex Tower, Outer Ring Road, HSR Layout',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560102',
      addressCountry: 'IN',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${font.variable} ${spaceGrotesk.variable} ${font.className} min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased`}>
        <Navbar domains={domains} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
