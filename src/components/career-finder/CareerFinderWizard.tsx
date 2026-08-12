'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Domain, Course } from '@/lib/types';
import { CourseCard } from '../ui/CourseCard';
import { EnquiryModal } from '../ui/EnquiryModal';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Code,
  BrainCircuit,
  BarChart3,
  Megaphone,
  Palette,
  Briefcase,
  Calculator,
  RefreshCw,
  Send,
} from 'lucide-react';

interface CareerFinderWizardProps {
  domains: Domain[];
  courses: Course[];
}

export const CareerFinderWizard: React.FC<CareerFinderWizardProps> = ({ domains, courses }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    interest: 'Technology',
    experience: 'Beginner',
    codingPreference: 'Coding',
    goal: 'Land First Job',
    timeCommitment: '10-20 Hours',
  });

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [activeCourseForEnquiry, setActiveCourseForEnquiry] = useState<Course | null>(null);

  const handleNext = () => {
    if (step <= 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Enhanced Recommendation calculation based on all 5 user answers
  const getRecommendedCourses = () => {
    let matched = [...courses];

    // Filter by interest domain
    if (answers.interest === 'Technology') {
      matched = matched.filter(
        (c) =>
          c.domainSlug === 'information-technology' ||
          c.domainSlug === 'cloud-devops' ||
          c.domainId === 'dom-1' ||
          c.domainId === 'dom-8'
      );
    } else if (answers.interest === 'Artificial Intelligence') {
      matched = matched.filter((c) => c.domainSlug === 'ai-machine-learning' || c.domainId === 'dom-2');
    } else if (answers.interest === 'Data & Analytics') {
      matched = matched.filter((c) => c.domainSlug === 'data-analytics' || c.domainId === 'dom-3');
    } else if (answers.interest === 'Digital Marketing') {
      matched = matched.filter((c) => c.domainSlug === 'digital-marketing' || c.domainId === 'dom-4');
    } else if (answers.interest === 'UI/UX Design') {
      matched = matched.filter((c) => c.domainSlug === 'ui-ux-design' || c.domainId === 'dom-5');
    } else if (answers.interest === 'Finance') {
      matched = matched.filter((c) => c.domainSlug === 'finance-accounting' || c.domainId === 'dom-7');
    }

    // Secondary filter for coding preference
    if (answers.codingPreference === 'Non-Coding') {
      const nonCoding = matched.filter((c) =>
        ['Data & Analytics', 'Digital Marketing', 'UI/UX & Design', 'Finance & Accounting', 'Management & Business'].includes(c.domainName || '')
      );
      if (nonCoding.length > 0) matched = nonCoding;
    }

    if (matched.length === 0) matched = courses.slice(0, 3);
    return matched;
  };

  const recommendedList = getRecommendedCourses();

  return (
    <div className="space-y-8">
      {/* Wizard Step Card */}
      {step <= 5 ? (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-purple-100 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Top Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-purple-700">Step {step} of 5</span>
              <span className="text-slate-500">{Math.round((step / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-pink-600 to-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Question 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">1. What are you most interested in?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Technology', desc: 'Full Stack, Cloud, DevOps & Coding', icon: Code },
                  { label: 'Artificial Intelligence', desc: 'GenAI, LLMs, Machine Learning', icon: BrainCircuit },
                  { label: 'Data & Analytics', desc: 'Power BI, SQL, Business Analytics', icon: BarChart3 },
                  { label: 'Digital Marketing', desc: 'SEO, Google Ads, Performance Ads', icon: Megaphone },
                  { label: 'UI/UX Design', desc: 'Figma, Mobile & Web Product Design', icon: Palette },
                  { label: 'Finance', desc: 'Tally Prime, GST, Valuation Modeling', icon: Calculator },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setAnswers({ ...answers, interest: opt.label })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                      answers.interest === opt.label
                        ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <opt.icon className={`w-5 h-5 shrink-0 mt-0.5 ${answers.interest === opt.label ? 'text-purple-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{opt.label}</div>
                      <div className="text-xs text-slate-600 font-medium">{opt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">2. What is your current experience level?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Beginner', desc: 'Starting from scratch with zero prior knowledge' },
                  { label: 'Intermediate', desc: 'Have basic concepts or college education' },
                  { label: 'Advanced', desc: 'Experienced professional seeking tech upskilling' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setAnswers({ ...answers, experience: opt.label })}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all text-center space-y-2 ${
                      answers.experience === opt.label
                        ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900 text-base">{opt.label}</div>
                    <div className="text-xs text-slate-600 font-medium">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">3. Do you prefer coding or non-coding roles?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Coding', desc: 'Building software, web apps, backend APIs & algorithms' },
                  { label: 'Non-Coding', desc: 'Design, Analytics, Marketing, Product & Finance' },
                  { label: 'Open to Both', desc: 'Flexible to explore both technical and business roles' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setAnswers({ ...answers, codingPreference: opt.label })}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all text-center space-y-2 ${
                      answers.codingPreference === opt.label
                        ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900 text-base">{opt.label}</div>
                    <div className="text-xs text-slate-600 font-medium">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">4. What is your primary career goal?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Land First Job', desc: 'Fresh graduate seeking high-paying tier-1 entry role' },
                  { label: 'Switch Careers into Tech', desc: 'Transitioning from non-tech background into IT' },
                  { label: 'Salary Boost & Promotion', desc: 'Upskilling for senior software role & salary raise' },
                  { label: 'Freelancing & Remote Work', desc: 'Work remotely with global international clients' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setAnswers({ ...answers, goal: opt.label })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all space-y-1 ${
                      answers.goal === opt.label
                        ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900 text-sm">{opt.label}</div>
                    <div className="text-xs text-slate-600 font-medium">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question 5 */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-slate-900">5. How much time can you dedicate per week?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: '5-10 Hours', desc: 'Part-time light learning alongside job or college' },
                  { label: '10-20 Hours', desc: 'Structured regular weekend + evening commitment' },
                  { label: 'Full-time Bootcamp', desc: '30+ Hours per week fast-track career accelerator' },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => setAnswers({ ...answers, timeCommitment: opt.label })}
                    className={`cursor-pointer p-5 rounded-2xl border transition-all text-center space-y-2 ${
                      answers.timeCommitment === opt.label
                        ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-extrabold text-slate-900 text-base">{opt.label}</div>
                    <div className="text-xs text-slate-600 font-medium">{opt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="bright-btn-secondary text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="bright-btn-primary font-bold text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5"
            >
              <span>{step === 5 ? 'View My Recommended Path' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* RECOMMENDATION REPORT STEP */
        <div className="space-y-8 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>96% AI Career Match</span>
              </span>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-purple-700 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Recommended Career Path: <span className="gradient-text-bright">{answers.interest} Specialist</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Based on your target goal (<strong className="text-slate-900">{answers.goal}</strong>), experience (<strong className="text-slate-900">{answers.experience}</strong>), and preference for <strong className="text-slate-900">{answers.codingPreference}</strong> roles.
            </p>
          </div>

          {/* Recommended Courses Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-pink-600" />
              <span>Recommended Certification Programs</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedList.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnquireClick={(crs) => {
                    setActiveCourseForEnquiry(crs);
                    setEnquiryModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        selectedCourse={activeCourseForEnquiry}
        courses={courses}
      />
    </div>
  );
};
