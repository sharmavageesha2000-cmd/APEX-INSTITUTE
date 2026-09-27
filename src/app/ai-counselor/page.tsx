'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  ArrowRight,
  GraduationCap,
  Award,
  Phone,
  Calendar,
  Compass,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: string;
}

const ROADMAP_TOPICS = [
  {
    title: 'Beginner to Full Stack Developer',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js & Next.js in 4-6 months with placement.',
    prompt: 'I want a detailed step-by-step 4-month roadmap to become a Full Stack Developer as a beginner. Which courses and projects should I complete?',
  },
  {
    title: 'Non-Tech to Data Science & AI',
    description: 'Transition from B.Com/Arts/Mech into high-paying Data Analyst or AI Engineer roles.',
    prompt: 'Can someone from a non-CS or non-technical background switch into Data Science and AI? How does Apex Institute help with bridge classes and placement?',
  },
  {
    title: 'Cloud & DevOps Career Roadmap',
    description: 'Master AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.',
    prompt: 'What are the career opportunities and salary packages for Cloud DevOps Engineers? What certifications will I be prepared for?',
  },
  {
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Become a Security Analyst or SOC specialist defending enterprise networks.',
    prompt: 'What does the Cybersecurity curriculum cover, and what is the eligibility and demand for Ethical Hackers?',
  },
];

export default function AiCounselorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Welcome to the Apex AI Career & Course Advisory Studio!**\n\nI am **ApexBot**, your personal AI Career Counselor powered by **Google Gemini 3.8 Flash**.\n\nWhether you are a college graduate, a working professional seeking a salary hike, or switching from non-IT to tech, I can:\n- **Recommend the best matching career domains & courses**\n- **Explain batch timings, fees & up to 35% scholarship eligibility**\n- **Detail our 100% placement assurance and hiring partner network**\n\nTell me a bit about your education background, current role, or what career you aspire to!`,
      model: 'gemini-3.8-flash',
      timestamp: 'Just now',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputMessage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        speechRecognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: `👋 **Chat reset!** Tell me about your dream tech career or what course you'd like to explore!`,
        model: 'gemini-3.8-flash',
        timestamp: 'Just now',
      },
    ]);
  };

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          pageContext: '/ai-counselor (Full Studio)',
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            model: data.model || 'gemini-flash',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error(data.error || 'Failed to fetch response');
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ I encountered a temporary connection issue. Please feel free to retry or call our admissions desk at **+91 9876543210**.`,
          model: 'system',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2.5 text-sm sm:text-base leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1.5" />;

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>{renderInlineStyles(trimmed.substring(2))}</span>
              </div>
            );
          }

          const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numberMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1">
                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md shrink-0">
                  {numberMatch[1]}
                </span>
                <span>{renderInlineStyles(numberMatch[2])}</span>
              </div>
            );
          }

          return <p key={idx}>{renderInlineStyles(trimmed)}</p>;
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-teal-950">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-teal-100/70 text-teal-800 px-1.5 py-0.5 rounded text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-[#e6fbf7] via-[#f0fdf4] to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Top Title with Mascot Illustration */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-teal-200/80 shadow-lg">
          <div className="flex items-center gap-5">
            {/* 3D Robot Mascot in Hero (NO BOX, FULL ORIGINAL BACKGROUND SCENE, WITH REAL WAVING HAND ACTION) */}
            <div className="relative w-28 sm:w-36 aspect-[460/428] rounded-3xl overflow-hidden shadow-2xl animate-robot-3d shrink-0 filter drop-shadow-[0_16px_30px_rgba(13,148,136,0.35)]">
              <Image
                src="/images/robot-body-nohand.png"
                alt="ApexBot 3D Robot Mascot"
                width={460}
                height={428}
                className="w-full h-full object-cover"
                priority
              />
              <div
                className="absolute animate-robot-hand-wave pointer-events-none"
                style={{
                  top: '30.37%',
                  left: '66.74%',
                  width: '17.39%',
                  height: '25.7%',
                  transformOrigin: '22% 92%',
                }}
              >
                <Image
                  src="/images/robot-hand.png"
                  alt="Waving Hand"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="absolute top-2 right-2 flex h-3.5 w-3.5 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs" />
              </span>
            </div>


            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black mb-1.5 border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>ApexBot Career Counselor &bull; Powered by Gemini 3.8 Flash</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-heading">
                AI Career &amp; Course Advisory Studio
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Get personalized course recommendations, salary benchmarks, syllabus roadmaps, and batch guidance directly from our friendly AI counselor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-4 py-2.5 rounded-2xl bg-white border border-teal-200 text-teal-800 hover:bg-teal-50 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call Human Advisor</span>
            </Link>
            <Link
              href="/courses"
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-500/20 hover:brightness-105 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>50+ Bootcamps</span>
            </Link>
          </div>
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: Career Roadmaps & Highlights */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Roadmaps */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 border border-teal-100 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">Popular Career Roadmaps</h3>
                  <p className="text-[11px] text-slate-500">Click any card to ask ApexBot</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {ROADMAP_TOPICS.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(topic.prompt)}
                    className="w-full text-left p-3.5 rounded-2xl border border-teal-100/90 bg-gradient-to-br from-white to-teal-50/40 hover:border-teal-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-teal-700 mb-1">
                      <span>{topic.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-teal-600" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{topic.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Institute Highlights Card */}
            <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-cyan-950 text-white rounded-3xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-black text-sm tracking-wide text-amber-300 uppercase mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> The Apex Guarantee
              </h4>
              <ul className="space-y-3 text-xs text-teal-100">
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <span><strong>100% Placement Support</strong> with 500+ Hiring Partners</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <span><strong>Live Production Capstone Projects</strong> reviewed by Tech Leads</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <span><strong>Up to 35% Scholarship Discount</strong> for eligible applicants</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <span><strong>Classroom (Bangalore) &amp; Live Online</strong> flexible batches</span>
                </li>
              </ul>

              <div className="mt-5 pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Free 1-on-1 Counselling
                </Link>
              </div>
            </div>
          </div>

          {/* Right Main Chat Canvas */}
          <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border-2 border-teal-200 shadow-2xl overflow-hidden h-[750px]">
            {/* Chat Canvas Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 text-white flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="relative w-12 h-12 rounded-2xl bg-teal-800 overflow-hidden border-2 border-white/40 shadow-inner flex items-center justify-center p-0.5">
                    <Image
                      src="/images/robot-body-nohand.png"
                      alt="ApexBot Avatar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute animate-robot-hand-wave pointer-events-none"
                      style={{
                        top: '30.37%',
                        left: '66.74%',
                        width: '17.39%',
                        height: '25.7%',
                        transformOrigin: '22% 92%',
                      }}
                    >
                      <Image
                        src="/images/robot-hand.png"
                        alt="Waving Hand"
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-teal-800" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-base tracking-tight">ApexBot AI Counselor</h2>
                    <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-teal-100 border border-white/25">
                      Gemini 3.8 Flash
                    </span>
                  </div>
                  <p className="text-xs text-teal-100">
                    Online &bull; Ask anything about courses, placements, syllabus, or fees
                  </p>
                </div>
              </div>

              <button
                onClick={handleClearChat}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-teal-100 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Chat</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-gradient-to-b from-teal-50/30 via-white to-slate-50/50 custom-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div className="flex items-end gap-2.5 max-w-[94%] sm:max-w-[85%]">
                      {isBot && (
                        <div className="w-9 h-9 rounded-2xl bg-teal-100 border border-teal-200 overflow-hidden shrink-0 shadow-xs mb-1">
                          <Image
                            src="/images/robot-counselor.png"
                            alt="ApexBot"
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div
                        className={`rounded-3xl p-4 sm:p-5 shadow-sm transition-all ${
                          isBot
                            ? 'bg-white border-2 border-teal-100 text-slate-800 rounded-bl-sm'
                            : 'bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white rounded-br-sm shadow-teal-600/20 shadow-md'
                        }`}
                      >
                        {isBot ? (
                          renderFormattedContent(msg.content)
                        ) : (
                          <p className="text-sm sm:text-base whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2.5 mt-1.5 text-xs px-2 text-slate-400 ${
                        isBot ? 'justify-start pl-11' : 'justify-end'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isBot && msg.model && (
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                          ⚡ {msg.model.replace('models/', '')}
                        </span>
                      )}
                      {isBot && (
                        <>
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            title="Copy reply"
                            className="hover:text-teal-700 transition-colors p-1"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleSpeak(msg.content, msg.id)}
                            title={speakingId === msg.id ? 'Stop audio' : 'Read aloud'}
                            className="hover:text-teal-700 transition-colors p-1"
                          >
                            {speakingId === msg.id ? (
                              <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-teal-100 border border-teal-200 overflow-hidden shrink-0 shadow-xs">
                    <Image
                      src="/images/robot-counselor.png"
                      alt="ApexBot Thinking"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover animate-pulse"
                    />
                  </div>
                  <div className="bg-white border-2 border-teal-100 rounded-3xl rounded-tl-sm px-5 py-4 shadow-sm flex items-center gap-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-bounce" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-teal-800">
                      ApexBot is consulting Gemini LLM for your personalized guidance...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-teal-100 shrink-0">
              <div className="flex items-end gap-2.5 bg-slate-50 border-2 border-teal-200 rounded-2xl p-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200/50 transition-all">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask ApexBot about roadmaps, fees, placements, scholarships..."
                  rows={2}
                  disabled={loading}
                  className="flex-1 bg-transparent border-0 outline-none text-sm sm:text-base text-slate-800 placeholder-slate-400 resize-none px-2 py-1.5"
                />

                <button
                  onClick={toggleListening}
                  type="button"
                  title={isListening ? 'Stop recording' : 'Voice input'}
                  className={`p-2.5 rounded-xl transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-400 hover:text-teal-600 hover:bg-teal-100/60'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || loading}
                  aria-label="Send query"
                  className="p-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 px-1 text-xs text-slate-400">
                <span>Press Enter to send &bull; Shift+Enter for new line</span>
                <span className="font-bold text-teal-700">Powered by Gemini 3.8 Flash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
