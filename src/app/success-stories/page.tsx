import React from 'react';
import Link from 'next/link';
import { Star, Award, Sparkles, Building2, Quote, ArrowRight } from 'lucide-react';
import { getReviews } from '@/lib/store';

export default async function SuccessStoriesPage() {
  const reviews = await getReviews();

  const successStoriesList = [
    {
      name: 'Aarav Sharma',
      role: 'Full Stack Engineer',
      company: 'Razorpay',
      prevBackground: 'Non-Tech B.Com Graduate',
      course: 'Full Stack MERN & Next.js Masterclass',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      review: 'The project-driven curriculum and live mentorship helped me switch careers from non-tech to a 12 LPA Full Stack role at Razorpay in just 6 months!',
    },
    {
      name: 'Priya Verma',
      role: 'AI Solutions Engineer',
      company: 'Fractal Analytics',
      prevBackground: 'B.Sc Mathematics Graduate',
      course: 'Generative AI & LLM Agent Engineering',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      review: 'The GenAI module with LangChain and vector databases is top-notch. Mentors were super responsive during live lab sessions.',
    },
    {
      name: 'Rohan Mehta',
      role: 'Business Intelligence Analyst',
      company: 'Deloitte',
      prevBackground: 'Fresh BBA Graduate',
      course: 'Business Analytics & Power BI Masterclass',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      review: 'Hands-on Power BI and SQL dashboards gave me the exact confidence needed to clear technical interviews smoothly.',
    },
    {
      name: 'Sneha Kulkarni',
      role: 'UI/UX Product Designer',
      company: 'CRED',
      prevBackground: 'Graphic Designer',
      course: 'UI/UX Product Design & Figma Mastery',
      rating: 5,
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      review: 'Built 3 polished Figma case studies for my Behance portfolio. The 1-on-1 design feedback sessions cleared all my concepts!',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Real Alumni Transformations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Student Success Stories & Career Transitions
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Discover how students from diverse backgrounds transformed their careers through practical bootcamps and senior mentorship.
        </p>
      </div>

      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {successStoriesList.map((story, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: story.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Placed at {story.company}
                </span>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-purple-200 absolute -top-3 -left-3" />
                <p className="text-slate-700 text-sm font-medium italic leading-relaxed relative z-10 pl-4">
                  &ldquo;{story.review}&rdquo;
                </p>
              </div>

              {/* Transition Badges */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium text-[11px]">Previous Background:</span>
                  <div className="font-extrabold text-slate-800">{story.prevBackground}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-purple-600" />
                <div className="text-right">
                  <span className="text-slate-500 font-medium text-[11px]">Current Role:</span>
                  <div className="font-extrabold text-slate-900">{story.role}</div>
                </div>
              </div>
            </div>

            {/* Profile Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
              <img
                src={story.photo}
                alt={story.name}
                className="w-12 h-12 rounded-xl object-cover border border-purple-200"
              />
              <div>
                <div className="font-extrabold text-slate-900 text-sm">{story.name}</div>
                <div className="text-xs text-purple-700 font-bold">{story.course}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
