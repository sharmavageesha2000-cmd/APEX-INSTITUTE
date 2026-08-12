'use client';

import React, { useState, useEffect } from 'react';
import { Domain } from '@/lib/types';
import { DynamicIcon } from '../ui/IconHelper';
import { ApexLogo } from '../ui/ApexLogo';
import { Volume2, VolumeX, Sparkles, Bot, Radio, CheckCircle2 } from 'lucide-react';

interface AIDomainAdvisorCardProps {
  domain: Domain;
}

export const AIDomainAdvisorCard: React.FC<AIDomainAdvisorCardProps> = ({ domain }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'careers' | 'salary'>('overview');

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getExplanationText = () => {
    if (activeTab === 'careers') {
      return `Graduating in ${domain.name} opens top corporate roles like Lead ${domain.subcategories[0] || 'Engineer'}, Senior ${domain.subcategories[1] || 'Specialist'}, and Technical Architect across tier-1 product tech companies.`;
    }
    if (activeTab === 'salary') {
      return `${domain.name} professionals command an average starting CTC of ₹6.5 LPA to ₹18.0 LPA in India, with high global demand for certified practitioners.`;
    }
    return `Welcome to Apex Tech Institute! I am your AI Domain Advisor for ${domain.name}. In this specialization track, you will build 4+ live enterprise projects covering ${domain.subcategories.slice(0, 3).join(', ')} with daily senior mentorship.`;
  };

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const text = getExplanationText();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-xl space-y-4 relative overflow-hidden group">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-indigo-400/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header: Institute Logo + Domain Icon */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        {/* Institute Logo & Name */}
        <ApexLogo size="sm" showSubtitle={false} />

        {/* Domain Icon Badge */}
        <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 font-extrabold text-xs px-3 py-1.5 rounded-full border border-purple-200 shadow-xs">
          <DynamicIcon name={domain.iconName} className="w-4 h-4 text-purple-600" />
          <span>{domain.name}</span>
        </div>
      </div>

      {/* AI Avatar & Advisor Info Row */}
      <div className="flex items-center gap-4">
        {/* Animated AI Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-0.5 shadow-md shadow-pink-500/20">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt="AI Domain Advisor"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          {/* Live Online Badge */}
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            <span>AI</span>
          </span>
        </div>

        {/* Advisor Details */}
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-700 uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded-md">
            <Bot className="w-3 h-3 text-purple-600" />
            <span>AI Career Advisor</span>
          </div>
          <h3 className="font-extrabold text-slate-900 text-base leading-tight">Dr. Maya AI</h3>
          <p className="text-xs text-slate-500 font-medium">Senior Domain Lead &amp; Curriculum Strategist</p>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-[11px] font-extrabold">
        {(['overview', 'careers', 'salary'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (isSpeaking) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`flex-1 py-1.5 rounded-lg capitalize transition-all ${
              activeTab === tab
                ? 'bg-white text-purple-700 shadow-sm border border-purple-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* AI Speech Bubble */}
      <div className="relative bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 text-xs text-slate-800 space-y-3 font-medium">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-purple-700 font-extrabold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" />
            <span>AI Domain Insights ({activeTab.toUpperCase()})</span>
          </div>

          {/* Equalizer Wave indicator when speaking */}
          {isSpeaking && (
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-3 bg-purple-600 rounded-full animate-bounce"></span>
              <span className="w-1 h-4 bg-pink-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
            </div>
          )}
        </div>

        <p className="text-slate-700 leading-relaxed font-medium italic">
          &ldquo;{getExplanationText()}&rdquo;
        </p>

        {/* Audio Speech Synthesis Toggle Button */}
        <button
          onClick={handleToggleSpeech}
          className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
            isSpeaking
              ? 'bg-rose-600 text-white shadow-md hover:bg-rose-700'
              : 'bright-btn-primary'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Pause AI Voice Explanation</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              <span>Listen to AI Voice Explanation 🔊</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
