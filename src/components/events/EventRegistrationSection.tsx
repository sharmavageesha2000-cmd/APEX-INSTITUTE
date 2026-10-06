'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Send,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User as UserIcon,
  Phone,
  Mail,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Ticket,
} from 'lucide-react';
import { EventItem } from '@/lib/types';

interface EventRegistrationSectionProps {
  event: EventItem;
}

export const EventRegistrationSection: React.FC<EventRegistrationSectionProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    profile: 'College Student / Fresher',
  });
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [passId, setPassId] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user already booked this event in this browser
    const existingPass = localStorage.getItem(`apex_event_pass_${event.id}`);
    if (existingPass) {
      setPassId(existingPass);
    } else {
      const generated = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      setPassId(generated);
    }
  }, [event.id]);

  const handleOpenModal = () => {
    setErrorMsg('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      profile: 'College Student / Fresher',
    });
    setIsOpen(true);
  };

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    const cleanEmail = formData.email.trim();

    if (!cleanName) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile / WhatsApp number.');
      return;
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const bookingPass = passId || `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      setPassId(bookingPass);

      const messageContent = `[Free Workshop Seat Registration] Pass: #${bookingPass} | Event: "${event.title}" | Date: ${event.date} at ${event.time} | Venue: ${event.location} | Speaker: ${event.speakerName} | Profile: ${formData.profile}`;

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          message: messageContent,
          type: 'FREE_COUNSELLING',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to register seat.');
      }

      localStorage.setItem(`apex_event_pass_${event.id}`, bookingPass);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Network error. Please try again or contact admissions at +91 9876543210.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyJoiningLink = () => {
    const link = typeof window !== 'undefined' ? `${window.location.origin}/events/${event.slug}?pass=${passId}` : `https://apexinstitute.com/events/${event.slug}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `Hello Apex Institute Team! I have booked my free seat for the workshop:\n\n*${event.title}*\nDate: ${event.date} at ${event.time}\nPass ID: #${passId}\nName: ${formData.name}\n\nPlease share the live workshop access link and resources with me on this WhatsApp number.`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Live Workshop: ${event.title}`);
    const details = encodeURIComponent(
      `You are registered for "${event.title}" with Apex Tech Institute.\nPass: #${passId}\nSpeaker: ${event.speakerName} (${event.speakerRole})\nVenue: ${event.location}\nJoin Link: https://apexinstitute.com/events/${event.slug}?pass=${passId}`
    );
    const location = encodeURIComponent(event.location);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <>
      {/* Free Seat Registration CTA Section (Exact visual match) */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-purple-200 p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-extrabold text-slate-900">Reserve Your Free Seat Now</h3>
        <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
          Limited virtual seats available for this live interactive workshop. Registrations close 2 hours prior to the session.
        </p>

        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex bright-btn-primary font-bold px-8 py-3.5 text-xs items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Confirm Free Seat Registration</span>
        </button>
      </div>

      {/* POPUP MODAL */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="bg-white rounded-3xl border border-purple-200 shadow-2xl max-w-lg w-full overflow-hidden max-h-[92vh] flex flex-col relative animate-scaleUp"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Ticket className="w-5 h-5 text-amber-300" />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                      {isSubmitted ? "You're In! Seat Confirmed" : 'Book Your Free Workshop Seat'}
                    </h3>
                    <p className="text-xs text-pink-100 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3 h-3 text-amber-300 inline" />
                      100% Free Entry &bull; Live Interactive Access
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
                {!isSubmitted ? (
                  /* STEP 1: FORM FILL-OUT SECTION */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Event Mini-Card */}
                    <div className="bg-purple-50/70 border border-purple-200/90 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-pink-700 bg-pink-100 px-2 py-0.5 rounded-full border border-pink-200">
                          {event.category}
                        </span>
                        <span className="text-xs text-purple-800 font-extrabold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {event.date}
                        </span>
                        <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-pink-600" />
                          {event.time}
                        </span>
                      </div>

                      <h4 className="font-black text-slate-900 text-sm leading-snug">
                        {event.title}
                      </h4>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-purple-200/60 font-medium">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span className="truncate max-w-[200px]">{event.location}</span>
                        </div>
                        <div className="text-slate-700 font-bold">
                          By {event.speakerName}
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium">
                      Please enter your contact details below to reserve your seat and receive your private access link:
                    </p>

                    {errorMsg && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
                        <span>⚠️ {errorMsg}</span>
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <UserIcon className="w-3.5 h-3.5 text-purple-600" />
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs sm:text-sm text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Phone Number / WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        Mobile Number / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-xs font-bold text-slate-500">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={12}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ''),
                            })
                          }
                          placeholder="98765 43210"
                          className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs sm:text-sm text-slate-900 font-medium transition-all"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Joining link and calendar pass will be sent directly to this WhatsApp number.
                      </p>
                    </div>

                    {/* Email ID */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-pink-600" />
                        Email ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul.sharma@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs sm:text-sm text-slate-900 font-medium transition-all"
                      />
                    </div>

                    {/* Current Background Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-800">
                        Current Status / Background
                      </label>
                      <select
                        value={formData.profile}
                        onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-xs text-slate-800 font-medium bg-white"
                      >
                        <option value="College Student / Fresher">College Student / Fresher</option>
                        <option value="Working Professional (IT)">Working Professional (IT)</option>
                        <option value="Non-IT Background / Career Switcher">Non-IT Background / Career Switcher</option>
                        <option value="Job Seeker seeking placement">Job Seeker seeking placement</option>
                      </select>
                    </div>

                    {/* Privacy notice */}
                    <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>100% Free registration. No spam guarantee.</span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bright-btn-primary font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 cursor-pointer disabled:opacity-75 transition-all"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Reserving Your Seat...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm &amp; Book Free Seat Now</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* STEP 2: "YOU'RE IN" CONFIRMATION SCREEN */
                  <div className="space-y-5 text-center animate-fadeIn">
                    {/* Celebration Badge */}
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 flex items-center justify-center text-emerald-600 shadow-md">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        🎉 You&apos;re In! Free Seat Booked
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
                        Seat Confirmed Successfully!
                      </h4>
                    </div>

                    {/* Prominent WhatsApp and Email Dispatch Banner */}
                    <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-2xl text-left space-y-2 shadow-sm">
                      <div className="flex items-start gap-2.5">
                        <MessageSquare className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-black text-emerald-950">
                            Seat details &amp; meeting link dispatched!
                          </div>
                          <p className="text-[11px] text-emerald-900 font-medium leading-relaxed mt-0.5">
                            Your official workshop joining link, pass, and calendar invite have been shared to your WhatsApp (<strong>+91 {formData.phone}</strong>) and Email (<strong>{formData.email}</strong>).
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Official Digital Event Pass */}
                    <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 text-left space-y-3 relative overflow-hidden shadow-xl border border-slate-800">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <Ticket className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-black tracking-wider text-amber-300 uppercase">
                            Official Workshop Pass
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300">
                          #{passId}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Workshop Topic
                        </div>
                        <div className="text-sm sm:text-base font-black text-white leading-snug">
                          {event.title}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Date &amp; Time</div>
                          <div className="font-bold text-slate-100">{event.date}</div>
                          <div className="text-[11px] text-purple-300 font-semibold">{event.time}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Mentor</div>
                          <div className="font-bold text-slate-100">{event.speakerName}</div>
                          <div className="text-[11px] text-slate-400 font-medium truncate">{event.speakerRole}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                        <div>
                          <span className="text-[10px] text-slate-400">Attendee: </span>
                          <span className="font-bold text-white">{formData.name}</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700">
                          FREE ADMISSION
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: WhatsApp + Copy Link + Calendar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                      <a
                        href={getWhatsAppShareUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Open on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={copyJoiningLink}
                        className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700">Pass Link Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Pass Link</span>
                          </>
                        )}
                      </button>

                      <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:col-span-2 flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span>Add Event to Google Calendar</span>
                        <ExternalLink className="w-3 h-3 text-purple-400" />
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            profile: 'College Student / Fresher',
                          });
                        }}
                        className="flex-1 py-2.5 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Book Another Seat
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Close &amp; Return to Event
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
