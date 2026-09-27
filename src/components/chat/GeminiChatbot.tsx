'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  GraduationCap,
  Phone,
  ChevronDown,
  Compass,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { icon: '🚀', label: 'Highest CTC courses?', prompt: 'Which courses at Apex Institute offer the highest placement salary packages and top hiring partner demand?' },
  { icon: '🎓', label: 'Beginner 4-month roadmap', prompt: 'I am a beginner wanting to switch to tech. Can you suggest a clear 4-month learning roadmap to get job-ready?' },
  { icon: '💰', label: 'Fees & 35% scholarship', prompt: 'What are the course fees and how can I apply for up to 35% scholarship discount?' },
  { icon: '⏱️', label: 'Weekend vs weekday batches', prompt: 'I am a working professional / student. What are your batch timings and online vs classroom options?' },
  { icon: '📞', label: 'Book free demo class', prompt: 'How do I book a 100% free 1-on-1 career counselling session and attend a live demo class?' },
];

const PROMPT_STYLES = [
  {
    bg: 'bg-orange-50 hover:bg-orange-100/90 border-orange-200/90 text-orange-950 shadow-xs hover:border-orange-300',
    iconColor: 'text-orange-600',
  },
  {
    bg: 'bg-teal-50 hover:bg-teal-100/90 border-teal-200/90 text-teal-950 shadow-xs hover:border-teal-300',
    iconColor: 'text-teal-600',
  },
  {
    bg: 'bg-emerald-50 hover:bg-emerald-100/90 border-emerald-200/90 text-emerald-950 shadow-xs hover:border-emerald-300',
    iconColor: 'text-emerald-600',
  },
  {
    bg: 'bg-cyan-50 hover:bg-cyan-100/90 border-cyan-200/90 text-cyan-950 shadow-xs hover:border-cyan-300',
    iconColor: 'text-cyan-600',
  },
  {
    bg: 'bg-rose-50 hover:bg-rose-100/90 border-rose-200/90 text-rose-950 shadow-xs hover:border-rose-300',
    iconColor: 'text-rose-600',
  },
];

export const GeminiChatbot: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **Hi! I'm ApexBot, your personal AI Career Counselor!**\n\nPowered by **Google Gemini**, I can recommend the best courses for your career goals, explain batch timings, calculate scholarship discounts, share upcoming events, and help you get job-ready with 100% placement support.\n\nWhat would you like to explore today?`,
      model: 'gemini-live',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, loading]);

  // Adjust textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  // Initialize Speech Recognition if supported
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
      alert('Speech recognition is not supported in this browser.');
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
        content: `👋 **Chat reset!** Talk to me for course suggestions, salary roadmaps, or fee discounts!`,
        model: 'gemini-3.8-flash',
        timestamp: 'Just now',
      },
    ]);
  };

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setLoading(true);

    try {
      const apiPayloadMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiPayloadMessages,
          pageContext: pathname,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const assistantMsg: Message = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          model: data.model || 'gemini-flash',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        if (!isOpen) {
          setHasUnread(true);
        }
      } else {
        throw new Error(data.error || 'Failed to get answer');
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
      <div className="space-y-2 text-sm leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const itemText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>{renderInlineStyles(itemText)}</span>
              </div>
            );
          }

          const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numberMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded-md shrink-0">
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
    <>
      {/* ── CUTE FLOATING ROBOT LAUNCHER WITH SPEECH BUBBLE ──────── */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none">
          {/* Animated Greeting Speech Bubble */}
          {showSpeechBubble && (
            <div className="relative mb-2.5 max-w-[280px] sm:max-w-[320px] animate-speech-bubble">
              <div
                onClick={() => {
                  setIsOpen(true);
                  setHasUnread(false);
                }}
                className="cursor-pointer bg-white/95 backdrop-blur-xl border-2 border-teal-300/90 hover:border-teal-400 rounded-2xl p-3 shadow-xl shadow-teal-500/20 hover:scale-105 transition-all text-slate-800 relative group"
              >
                {/* Bubble Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSpeechBubble(false);
                  }}
                  title="Dismiss hint"
                  className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs shadow-xs transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>

                <div className="flex items-start gap-2.5">
                  <span className="text-xl animate-bounce shrink-0">👋</span>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-orange-100/90 text-orange-700 text-[10px] font-black tracking-wider uppercase flex items-center gap-1 border border-orange-200/80">
                        <Sparkles className="w-2.5 h-2.5 text-orange-500" /> AI Counselor
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" /> Live
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug">
                      Hi! Ask me for <span className="text-teal-600 underline decoration-teal-300 decoration-2 font-black">course roadmaps</span> &amp; counselling!
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-[10px] font-black text-emerald-800 border border-emerald-300/60 shadow-2xs">
                        🎁 35% Scholarship
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold">Tap to chat &bull; Free</span>
                    </div>
                  </div>
                </div>

                {/* Speech Bubble Arrow pointing to the robot */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-teal-300 rotate-45 transform" />
              </div>
            </div>
          )}

          {/* Cute Robot Character on Hologram Stage */}
          <div
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="cursor-pointer relative flex flex-col items-center group"
          >
            {/* Holographic Glowing Base Ring */}
            <div className="absolute -bottom-2 w-24 h-6 bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 rounded-full blur-[8px] opacity-80 animate-hologram-pulse" />
            <div className="absolute -bottom-1.5 w-18 h-3.5 rounded-full border border-teal-300/80 bg-gradient-to-r from-teal-400/30 to-emerald-400/30" />

            {/* Twinkling Star Particle Effects */}
            <span className="absolute -top-1 -left-2 text-amber-400 text-xs animate-star-glow select-none">✦</span>
            <span className="absolute top-4 -right-2 text-teal-400 text-sm animate-star-glow [animation-delay:1s] select-none">✨</span>
            <span className="absolute -top-3 right-3 text-cyan-400 text-xs animate-star-glow [animation-delay:1.5s] select-none">★</span>

            {/* 3D Robot Mascot (NO BOX, FULL ORIGINAL BACKGROUND SCENE, WITH REAL WAVING HAND ACTION) */}
            <div className="relative w-32 sm:w-36 aspect-[460/428] animate-robot-3d transition-transform group-hover:scale-105 duration-300 filter drop-shadow-[0_16px_30px_rgba(13,148,136,0.4)]">
              {/* Clean Robot Body without the original static hand */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/robot-body-nohand.png"
                  alt="Apex AI 3D Robot Counselor"
                  width={460}
                  height={428}
                  className="w-full h-full object-cover"
                  priority
                />

                {/* Animated 3D Waving Hand Layer positioned right over the elbow */}
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
                    alt="Robot saying Hi"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Online Green Pulsing Beacon matching mascot design */}
              <span className="absolute top-2 right-2 flex h-3.5 w-3.5 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs" />
              </span>

              {/* Unread Alert Badge */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-bounce z-20" />
              )}
            </div>

            {/* Attractive 3D-styled Pill Label Below */}
            <div className="mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 hover:from-teal-500 hover:to-emerald-500 text-white text-[10px] font-black tracking-wider uppercase shadow-lg shadow-teal-700/30 border border-teal-300/50 flex items-center gap-1.5 transition-all group-hover:scale-105 active:scale-95">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
              <span>Ask ApexBot</span>
            </div>
          </div>
        </div>
      )}

      {/* ── REDESIGNED CUTE CHAT WINDOW ──────────────────────────── */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-2 sm:inset-6 md:inset-8 rounded-3xl'
              : 'bottom-3 left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[430px] max-h-[85vh] rounded-3xl'
          } flex flex-col bg-white shadow-2xl border-2 border-teal-300/90 overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95`}
          style={{
            boxShadow: '0 25px 70px -12px rgba(13, 148, 136, 0.35), 0 10px 25px -5px rgba(249, 115, 22, 0.15)',
          }}
        >
          {/* Header styled with Mint Teal, Seafoam & Warm Coral Accent Line */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 text-white flex items-center justify-between shadow-md shrink-0 relative overflow-hidden">
            {/* Top delicate coral/gold shine border matching mascot joint accents */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 opacity-90" />

            <div className="flex items-center gap-3">
              {/* Cute Mascot Avatar with Waving Hand & Coral Accent Rim */}
              <div className="relative">
                <div className="relative w-12 h-12 rounded-2xl bg-teal-900 overflow-hidden border-2 border-orange-300/80 shadow-inner flex items-center justify-center p-0.5">
                  <Image
                    src="/images/robot-body-nohand.png"
                    alt="ApexBot Mascot"
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
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-teal-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1">
                    ApexBot <span className="text-amber-300 text-xs">✨</span>
                  </h3>
                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-teal-100 border border-white/25 backdrop-blur-md">
                    Gemini 3.8
                  </span>
                </div>
                <p className="text-[11px] text-teal-100 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Your AI Career &amp; Course Guide &bull; Online
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 text-teal-100">
              <button
                onClick={handleClearChat}
                title="Restart conversation"
                className="p-1.5 rounded-xl hover:bg-white/20 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore window size' : 'Expand full size'}
                className="p-1.5 rounded-xl hover:bg-white/20 hover:text-white transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-xl hover:bg-white/20 hover:text-white transition-colors"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (window.speechSynthesis) window.speechSynthesis.cancel();
                  setSpeakingId(null);
                }}
                title="Close chat"
                className="p-1.5 rounded-xl hover:bg-rose-500/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-teal-50/50 via-cyan-50/20 to-slate-50/60 custom-scrollbar min-h-[320px]">
                {/* Cute Welcome Showcase Card modeled on mascot card */}
                {messages.length === 1 && (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 via-cyan-50/70 to-orange-50/40 border-2 border-teal-200/90 shadow-sm relative overflow-hidden mb-2">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-black tracking-widest text-teal-800 uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-500" /> Course Application &amp; Counseling
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Admissions Open
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-teal-300/70 bg-teal-100/40">
                        <Image
                          src="/images/robot-body-nohand.png"
                          alt="Cute Robot Mascot"
                          width={80}
                          height={80}
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
                            alt="Waving"
                            fill
                            sizes="20px"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 leading-snug">
                          Apex Tech Institute AI Counselor ★
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                          Ask me about <strong>courses</strong>, <strong>100% placement assurance</strong>, <strong>fees &amp; scholarships</strong>, or <strong>batch timings</strong>!
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-teal-200/60">
                      <span className="text-[10px] font-bold text-orange-800 bg-orange-100/80 border border-orange-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        🚀 High CTC Tracks
                      </span>
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100/80 border border-teal-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        🎓 100% Placement Assurance
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        💰 35% Scholarship
                      </span>
                    </div>
                  </div>
                )}

                {messages.map((msg) => {
                  const isBot = msg.role === 'assistant';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-end gap-2 max-w-[92%] sm:max-w-[85%]">
                        {/* Bot Avatar beside message */}
                        {isBot && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200 overflow-hidden shrink-0 shadow-xs mb-1">
                            <Image
                              src="/images/robot-counselor.png"
                              alt="ApexBot"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl p-3.5 shadow-sm transition-all ${
                            isBot
                              ? 'bg-white border-2 border-teal-100/90 text-slate-800 rounded-bl-sm'
                              : 'bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 text-white rounded-br-sm shadow-teal-700/20 shadow-md'
                          }`}
                        >
                          {isBot ? (
                            renderFormattedContent(msg.content)
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          )}
                        </div>
                      </div>

                      {/* Footer info & action buttons */}
                      <div
                        className={`flex items-center gap-2 mt-1 text-[11px] px-2 text-slate-400 ${
                          isBot ? 'justify-start pl-10' : 'justify-end'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isBot && msg.model && (
                          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
                            ⚡ {msg.model.replace('models/', '')}
                          </span>
                        )}
                        {isBot && (
                          <>
                            <button
                              onClick={() => handleCopy(msg.content, msg.id)}
                              title="Copy response"
                              className="hover:text-teal-700 transition-colors p-0.5"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleSpeak(msg.content, msg.id)}
                              title={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                              className="hover:text-teal-700 transition-colors p-0.5"
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

                {/* Loading / Typing indicator with Mascot */}
                {loading && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 border border-teal-200 overflow-hidden shrink-0 shadow-xs">
                      <Image
                        src="/images/robot-counselor.png"
                        alt="ApexBot Thinking"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover animate-pulse"
                      />
                    </div>
                    <div className="bg-white border-2 border-teal-100/90 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-2">
                      <div className="flex gap-1.5 items-center">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
                      </div>
                      <span className="text-xs font-bold text-teal-800">
                        ApexBot is crafting your answer...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* 3D-styled Quick Prompt Chips with Mascot Pastel Theme */}
              {messages.length <= 3 && !loading && (
                <div className="px-3 py-2.5 bg-gradient-to-r from-teal-50/80 via-white to-cyan-50/80 border-t border-teal-100/80 overflow-x-auto custom-scrollbar shrink-0">
                  <div className="text-[10px] font-black uppercase text-teal-900 tracking-wider mb-1.5 px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Tap any question to ask:
                  </div>
                  <div className="flex gap-2 flex-nowrap pb-1">
                    {QUICK_PROMPTS.map((qp, idx) => {
                      const style = PROMPT_STYLES[idx % PROMPT_STYLES.length];
                      return (
                        <button
                          key={idx}
                          onClick={() => sendMessage(qp.prompt)}
                          className={`whitespace-nowrap px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 active:scale-95 ${style.bg}`}
                        >
                          <span>{qp.icon}</span>
                          <span>{qp.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quick Call-to-action shortcuts with colorful soft pastel badges */}
              <div className="px-3 py-2 bg-slate-50/90 border-t border-teal-100/70 flex items-center justify-between text-[11px] shrink-0">
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 font-bold transition-colors"
                >
                  <Phone className="w-3 h-3 text-emerald-600" /> Free Demo
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200/80 font-bold transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-600" /> 50+ Bootcamps
                </Link>
                <Link
                  href="/ai-counselor"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200/80 font-bold transition-colors"
                >
                  <Compass className="w-3 h-3 text-orange-600" /> Full Studio
                </Link>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white border-t border-teal-100/90 shrink-0">
                <div className="flex items-end gap-2 bg-slate-50/90 border-2 border-teal-200/90 hover:border-teal-300 focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-200/50 rounded-2xl p-1.5 transition-all">
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
                    placeholder="Ask ApexBot about courses, fees, placements..."
                    rows={1}
                    disabled={loading}
                    className="flex-1 bg-transparent border-0 outline-none text-sm text-slate-800 placeholder-slate-400 resize-none px-2 py-1.5 max-h-32"
                  />

                  {/* Speech to text */}
                  <button
                    onClick={toggleListening}
                    type="button"
                    title={isListening ? 'Stop listening' : 'Speak your question'}
                    className={`p-2 rounded-xl transition-all ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                        : 'text-slate-400 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Send Button */}
                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputMessage.trim() || loading}
                    aria-label="Send message"
                    className="p-2 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-600/25 active:scale-95 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-slate-400">
                  <span>Press Enter to send &bull; Shift+Enter for new line</span>
                  <span className="font-bold text-teal-700 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Powered by Gemini 3.8 Flash
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
