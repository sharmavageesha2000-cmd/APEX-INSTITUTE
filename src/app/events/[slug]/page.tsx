import React from 'react';
import Link from 'next/link';
import { getEventBySlug, getEvents } from '@/lib/store';
import { Calendar, Clock, MapPin, User, CheckCircle2, ArrowLeft, Send } from 'lucide-react';

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const allEvents = await getEvents();
  const evt = (await getEventBySlug(params.slug)) || allEvents[0];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back link */}
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Workshops & Events</span>
      </Link>

      {/* Hero Header */}
      <div className="bg-white p-6 sm:p-10 border border-purple-100 rounded-3xl space-y-6 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200 uppercase tracking-wider">
            {evt.category} &bull; FREE REGISTRATION
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          {evt.title}
        </h1>

        <p className="text-sm text-slate-600 font-medium leading-relaxed">{evt.description}</p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <div className="font-extrabold text-slate-900">Date</div>
              <div className="text-slate-600 font-medium">{evt.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <Clock className="w-4 h-4 text-pink-600 shrink-0" />
            <div>
              <div className="font-extrabold text-slate-900">Time</div>
              <div className="text-slate-600 font-medium">{evt.time}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="font-extrabold text-slate-900">Venue</div>
              <div className="text-slate-600 font-medium truncate">{evt.location}</div>
            </div>
          </div>
        </div>

        {/* Speaker Info */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={evt.speakerFoto}
            alt={evt.speakerName}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
          />
          <div>
            <div className="font-extrabold text-slate-900 text-sm">{evt.speakerName}</div>
            <div className="text-xs text-slate-500 font-medium">{evt.speakerRole}</div>
          </div>
        </div>
      </div>

      {/* Free Seat Registration CTA */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-extrabold text-slate-900">Reserve Your Free Seat Now</h3>
        <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
          Limited virtual seats available for this live interactive workshop. Registrations close 2 hours prior to the session.
        </p>

        <Link
          href="/contact"
          className="inline-flex bright-btn-primary font-bold px-8 py-3.5 text-xs items-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Confirm Free Seat Registration</span>
        </Link>
      </div>
    </div>
  );
}
