import React from 'react';
import Link from 'next/link';
import { getBlogBySlug, getBlogs } from '@/lib/store';
import { Clock, Calendar, User, ArrowLeft, Share2, Sparkles, BookOpen } from 'lucide-react';

export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const allBlogs = await getBlogs();
  const blog = (await getBlogBySlug(params.slug)) || allBlogs[0];

  const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Resources & Articles</span>
      </Link>

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full border border-purple-200 inline-block uppercase tracking-wider">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2 border-y border-slate-200 py-3 font-medium">
          <div className="flex items-center gap-2">
            <img
              src={blog.authorPhoto}
              alt={blog.authorName}
              className="w-8 h-8 rounded-full object-cover border border-purple-200"
            />
            <div>
              <div className="font-extrabold text-slate-900 text-xs">{blog.authorName}</div>
              <div className="text-[10px] text-slate-500">{blog.authorTitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            <span>Published {blog.createdAt}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-600" />
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Banner Image */}
      <div className="bg-white p-2 border border-purple-100 rounded-3xl overflow-hidden shadow-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 sm:h-96 object-cover rounded-2xl"
        />
      </div>

      {/* Article Content */}
      <div className="bg-white p-6 sm:p-10 border border-purple-100 rounded-3xl shadow-md space-y-6 text-sm text-slate-700 leading-relaxed font-medium">
        <p className="text-base font-extrabold text-slate-900 leading-relaxed italic border-l-4 border-purple-600 pl-4 py-1">
          {blog.summary}
        </p>

        <div className="space-y-4 text-slate-700">
          <p>
            In today&apos;s rapidly evolving tech landscape, gaining hands-on practical experience is the key factor that separates successful candidates from the rest. Whether you are aiming to break into Full Stack Web Development, Generative AI, or Data Analytics, working on live real-world projects accelerates your learning curve exponentially.
          </p>

          <h2 className="text-xl font-extrabold text-slate-900 pt-4">Why Practical Industry Skills Matter</h2>
          <p>
            Theoretical knowledge builds foundation, but building production-grade software applications teaches you error handling, state management, API design, and deployment pipelines. Hiring managers search for GitHub repositories with active commits and live demo links.
          </p>

          <h2 className="text-xl font-extrabold text-slate-900 pt-4">Next Steps to Accelerate Your Career</h2>
          <p>
            Start by choosing one core specialization domain. Focus on mastering foundational concepts before moving on to advanced frameworks. Enroll in structured bootcamps where senior industry mentors evaluate your code and guide your interview preparation.
          </p>
        </div>
      </div>

      {/* Share & Related Articles */}
      <div className="pt-8 space-y-6">
        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>Related Articles You Might Like</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedBlogs.map((b) => (
            <Link
              key={b.id}
              href={`/blog/${b.slug}`}
              className="bg-white p-5 border border-purple-100 rounded-2xl shadow-sm hover:border-purple-300 transition-all space-y-2 block"
            >
              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                {b.category}
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm line-clamp-2">{b.title}</h4>
              <p className="text-xs text-slate-600 font-medium line-clamp-2">{b.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
