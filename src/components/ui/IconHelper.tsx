import React from 'react';
import {
  Code,
  BrainCircuit,
  BarChart3,
  Megaphone,
  Palette,
  Briefcase,
  Calculator,
  MessageSquare,
  Cpu,
  GraduationCap,
  Cloud,
  ShieldCheck,
  Building2,
  Users,
  Award,
  BookOpen,
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Code':
      return <Code className={className} />;
    case 'BrainCircuit':
      return <BrainCircuit className={className} />;
    case 'BarChart3':
      return <BarChart3 className={className} />;
    case 'Megaphone':
      return <Megaphone className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Calculator':
      return <Calculator className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};
