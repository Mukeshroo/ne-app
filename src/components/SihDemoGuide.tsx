import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  PlayCircle,
  CheckCircle2,
} from 'lucide-react';

export const SihDemoGuide: React.FC = () => {
  const {
    sihDemoStep,
    isDemoModeActive,
    setIsDemoModeActive,
    goToDemoStep,
  } = useApp();

  if (!isDemoModeActive) return null;

  const demoSteps = [
    {
      step: 1,
      title: 'Trainee Login & Greeting',
      desc: 'Mukesh Kumar logs into Sarthak. View progress, attendance (89%), verified skills (8), and "Your Next Best Skill".',
    },
    {
      step: 2,
      title: 'Trainee Dashboard Overview',
      desc: 'Inspect enrolled courses, competency status, and the immediate recommendation engine for rural trainees.',
    },
    {
      step: 3,
      title: 'Attendance (Zero New CapEx)',
      desc: 'Simulate QR code scan & STQC-certified biometric device verification reusing existing PACS desktop hardware.',
    },
    {
      step: 4,
      title: 'Interactive Assessment',
      desc: 'Take the PACS Computerisation test with real-time countdown timer, bilingual questions, and instant pass scoring.',
    },
    {
      step: 5,
      title: 'Instant Certification',
      desc: 'Upon passing, certificate CRT-NCCT-2026-8941 is cryptographically generated with SHA-256 hash and DigiLocker link.',
    },
    {
      step: 6,
      title: 'Digital Skill Passport',
      desc: 'Explore the government-grade Digital Skill Passport with verified competencies, institute stamp, and verifiable QR.',
    },
    {
      step: 7,
      title: 'AI Skill-Gap & Career Engine',
      desc: 'See 78% Career Match for "Cooperative Accounts Assistant", missing skills (GST & Digital Compliance), and 3-step path.',
    },
    {
      step: 8,
      title: 'Offline-First LMS Course',
      desc: 'Open course modules, toggle offline SQLite download for zero-connectivity village operation, and complete a module.',
    },
    {
      step: 9,
      title: 'Job Recommendations',
      desc: 'View AI-ranked cooperative vacancies with match percentages (92% DCCB, 88% PACS), and 1-click apply.',
    },
    {
      step: 10,
      title: 'Switch to Employer Recruiter',
      desc: 'Recruiters at IFFCO & Amul search across 1,248 verified candidates filtered by PACS skills and districts.',
    },
    {
      step: 11,
      title: 'Filter & Inspect Candidates',
      desc: 'Filter candidates by verified competencies, attendance rate, and certification without relying on resume claims.',
    },
    {
      step: 12,
      title: 'Verify Candidate Skill Passport',
      desc: 'Recruiter inspects Mukesh Kumar verified credentials, testing body accreditation, and public cryptographic seal.',
    },
    {
      step: 13,
      title: 'Shortlist & Issue Job Offer',
      desc: 'Recruiter shortlists the candidate for PACS Digital Operator role, triggering instant notification.',
    },
    {
      step: 14,
      title: 'NCCT Government Intelligence',
      desc: 'National apex dashboard showing 14.9L+ trained, 63K+ PACS, state comparisons, and emerging skill demand.',
    },
    {
      step: 15,
      title: 'Employment Feedback Loop',
      desc: 'Continuous feedback loop where employer hiring ratings directly update NCCT curriculum and training priorities.',
    },
  ];

  const current = demoSteps[sihDemoStep - 1] || demoSteps[0];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-800/60 shadow-lg px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Step indicator & summary */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 shrink-0">
            <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
              {sihDemoStep}
            </span>
            <div className="leading-tight">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  SIH 2026 Demo Tour (Step {sihDemoStep} of 15)
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                <span className="text-white font-semibold text-sm truncate max-w-[240px] sm:max-w-md">
                  {current.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1 max-w-xl">
                {current.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Step navigation */}
        <div className="flex items-center space-x-2 self-end md:self-auto shrink-0">
          <button
            onClick={() => goToDemoStep(Math.max(1, sihDemoStep - 1))}
            disabled={sihDemoStep === 1}
            className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 flex items-center space-x-1 cursor-pointer"
            id="sih-demo-prev-btn"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {/* Quick jump select */}
          <select
            value={sihDemoStep}
            onChange={(e) => goToDemoStep(Number(e.target.value))}
            className="bg-slate-800 text-slate-200 text-xs rounded-md border border-slate-700 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer"
            id="sih-demo-select"
          >
            {demoSteps.map((s) => (
              <option key={s.step} value={s.step}>
                {s.step}. {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => goToDemoStep(Math.min(15, sihDemoStep + 1))}
            disabled={sihDemoStep === 15}
            className="px-3 py-1 rounded-md text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs flex items-center space-x-1 cursor-pointer"
            id="sih-demo-next-btn"
          >
            <span>Next Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsDemoModeActive(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            title="Exit Demo Bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
