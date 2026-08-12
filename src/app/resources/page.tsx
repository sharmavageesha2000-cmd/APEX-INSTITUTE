'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Download, FileText, PlayCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ResourcesPage() {
  const resourceItems = [
    {
      title: 'Full Stack MERN & Next.js Interview Prep Handbook',
      category: 'Interview Kit',
      type: 'PDF Guide (45 Pages)',
      desc: '100+ top technical interview questions with complete code solutions on React 18, Server Actions & System Design.',
    },
    {
      title: 'Python for Data Science & Machine Learning Cheatsheet',
      category: 'Cheatsheet',
      type: 'PDF Guide (20 Pages)',
      desc: 'Quick reference for NumPy arrays, Pandas DataFrames, Scikit-Learn pipelines & PyTorch tensor transformations.',
    },
    {
      title: 'AWS & Cloud DevOps Infrastructure Architecture Blueprint',
      category: 'Architecture',
      type: 'Diagram & Code',
      desc: 'Step-by-step Terraform scripts & Kubernetes manifest templates for zero-downtime microservice deployments.',
    },
    {
      title: 'ATS-Optimized Software Engineer Resume Template',
      category: 'Career Asset',
      type: 'Docx & Canva',
      desc: 'Proven resume layout that cleared recruiter screening at Amazon, Swiggy, and Razorpay.',
    },
    {
      title: 'Figma UI/UX Design System Component Library',
      category: 'Design Asset',
      type: 'Figma Community File',
      desc: 'Scalable auto-layout components, color tokens, typography scales, and interactive button variants.',
    },
    {
      title: 'Mastering SQL Queries & Database Optimization Guide',
      category: 'Study Guide',
      type: 'PDF Book (35 Pages)',
      desc: 'Complex SQL join queries, index tuning, query plan analysis, and normalization practices.',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Free Knowledge Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Free Learning Resources & Study Kits
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Boost your technical preparation with our curated interview handbooks, code cheat sheets, and career assets.
        </p>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceItems.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-md space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {item.category}
                </span>
                <span className="text-slate-500 font-medium">{item.type}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
            </div>

            <button
              onClick={() => alert(`Downloading "${item.title}" resource bundle!`)}
              className="w-full bright-btn-primary font-bold text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Free Kit</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
