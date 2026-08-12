import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Sparkles, User, ArrowRight } from 'lucide-react';
import { getEvents } from '@/lib/store';

export default async function EventsIndexPage() {
  const events = await getEvents();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-700 bg-pink-100 px-3.5 py-1.5 rounded-full border border-pink-200">
          <Calendar className="w-4 h-4 text-pink-600" />
          <span>Live Workshops & Demo Classes</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Upcoming Tech Events & Career Webinars
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Reserve your free seat for live interactive coding workshops, GenAI lab demos, and corporate career guidance sessions.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-md space-y-4 hover:border-purple-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-extrabold text-pink-700 bg-pink-50 px-3 py-0.5 rounded-full border border-pink-200">
                  {evt.category}
                </span>
                <span className="text-xs text-purple-700 font-extrabold">{evt.date}</span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 leading-snug">{evt.title}</h2>

              <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">{evt.description}</p>

              {/* Speaker & Location */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <img
                    src={evt.speakerFoto}
                    alt={evt.speakerName}
                    className="w-7 h-7 rounded-full object-cover border border-purple-200"
                  />
                  <div>
                    <span className="font-extrabold text-slate-900">{evt.speakerName}</span>
                    <span className="text-slate-500 font-normal"> ({evt.speakerRole})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>{evt.time}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 space-y-2">
              <Link
                href={`/events/${evt.slug}`}
                className="w-full md:w-auto bright-btn-primary font-bold text-xs px-6 py-3.5 flex items-center justify-center gap-1.5"
              >
                <span>Reserve Free Seat</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
