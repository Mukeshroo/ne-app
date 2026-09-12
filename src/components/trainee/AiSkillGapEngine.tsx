import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Briefcase,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface TargetRoleConfig {
  role: string;
  matchScore: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  learningPath: { step: number; title: string; duration: string; skill: string; priority: 'High' | 'Medium' }[];
  explanation: string;
  averageSalary: string;
  openVacancies: number;
}

export const AiSkillGapEngine: React.FC = () => {
  const { trainee, setActiveTab, addNotification, language } = useApp();

  const targetRoles: TargetRoleConfig[] = [
    {
      role: 'Cooperative Accounts Assistant',
      matchScore: 78,
      requiredSkills: [
        'Computer Operations',
        'Accounting Basics',
        'Digital Payments & Micro-ATM',
        'DBT Reconciliation',
        'Advanced Cooperative Accounting & Audit',
        'GST & Digital Compliance',
      ],
      matchedSkills: [
        'Computer Operations',
        'Accounting Basics',
        'Digital Payments & Micro-ATM',
        'DBT Reconciliation',
      ],
      missingSkills: [
        'Advanced Cooperative Accounting & Audit',
        'GST & Digital Compliance',
      ],
      learningPath: [
        {
          step: 1,
          title: 'Digital Accounting for Cooperatives',
          duration: '2 weeks (32 hrs)',
          skill: 'Advanced Cooperative Accounting & Audit',
          priority: 'High',
        },
        {
          step: 2,
          title: 'GST & Statutory Compliance for PACS',
          duration: '1 week (16 hrs)',
          skill: 'GST & Digital Compliance',
          priority: 'High',
        },
        {
          step: 3,
          title: 'Advanced Excel & Spreadsheet Automation',
          duration: '1 week (14 hrs)',
          skill: 'Financial Macros & Day-Book Reports',
          priority: 'Medium',
        },
      ],
      explanation:
        'Sarthak AI evaluated your 6 verified competencies against 324 active job postings from District Central Cooperative Banks (DCCB) and Apex societies. You possess solid computer & payment fundamentals, but employers require GST e-invoicing and statutory cooperative audit compliance for accounts assistant designations.',
      averageSalary: '₹18,000 - ₹24,000 / month',
      openVacancies: 142,
    },
    {
      role: 'PACS Digital Operator',
      matchScore: 88,
      requiredSkills: [
        'Computer Operations',
        'Digital Record Management',
        'Digital Payments',
        'Micro-ATM Handling',
        'PACS Member KYC',
        'Storage Depot ERP Module',
      ],
      matchedSkills: [
        'Computer Operations',
        'Digital Record Management',
        'Digital Payments',
        'Micro-ATM Handling',
      ],
      missingSkills: ['Storage Depot ERP Module', 'Farmer KYC Validation'],
      learningPath: [
        {
          step: 1,
          title: 'PACS Storage & Warehouse ERP Module',
          duration: '1 week (12 hrs)',
          skill: 'Fertilizer & Grain Inventory Software',
          priority: 'High',
        },
      ],
      explanation:
        'Your profile strongly aligns with PACS computerisation requirements under the Ministry of Cooperation mandate. Completing the 1-week Storage Depot module will bring you to a 98% hiring probability.',
      averageSalary: '₹15,000 - ₹19,500 / month',
      openVacancies: 218,
    },
    {
      role: 'Dairy Operations & AMCU Assistant',
      matchScore: 84,
      requiredSkills: [
        'Digital Payments',
        'AMCU Milk Analyzer Software',
        'Village Collection Logistics',
        'Direct Bank Credit (DBT)',
      ],
      matchedSkills: ['Digital Payments', 'Direct Bank Credit (DBT)'],
      missingSkills: ['AMCU Milk Analyzer Software', 'Milk FAT/SNF Testing'],
      learningPath: [
        {
          step: 1,
          title: 'Dairy Cooperative Cold-Chain & QC Systems',
          duration: '2 weeks (24 hrs)',
          skill: 'AMCU Software & FAT Analysis',
          priority: 'High',
        },
      ],
      explanation:
        'With your payments and DBT expertise, local milk federations (like Parag and Amul village societies) have high demand for automated collection unit operators.',
      averageSalary: '₹16,500 - ₹21,000 / month',
      openVacancies: 89,
    },
  ];

  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const activeRole = targetRoles[selectedRoleIndex];

  const handleStartSkillPlan = () => {
    addNotification(`Enrolled in Skill-Gap Plan for "${activeRole.role}"!`, 'success');
    setActiveTab('learning');
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
                <BrainCircuit className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Sarthak AI Career Engine
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
              AI Career & Skill Gap Analysis
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
              Empowered by machine learning models correlating real-time NCCT candidate verified profiles with active cooperative job requisitions.
            </p>
          </div>

          {/* Role selector chips */}
          <div className="flex flex-wrap gap-2">
            {targetRoles.map((r, i) => (
              <button
                key={i}
                onClick={() => setSelectedRoleIndex(i)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  selectedRoleIndex === i
                    ? 'bg-blue-800 text-white border-blue-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{r.role}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                    selectedRoleIndex === i ? 'bg-amber-400 text-slate-950 font-extrabold' : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {r.matchScore}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Match Score & Skills Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Match Score Display */}
          <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 shadow-md border border-indigo-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Target Career Role
                </span>
                <h3 className="text-2xl font-black text-white font-['Outfit'] mt-0.5">
                  {activeRole.role}
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Average Cooperative Stipend: <strong>{activeRole.averageSalary}</strong> • {activeRole.openVacancies} Active Openings
                </p>
              </div>

              {/* Radial Match Score representation */}
              <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-2xl border border-white/20">
                <div className="text-right">
                  <span className="text-[11px] text-slate-300 uppercase font-bold block">
                    Career Match
                  </span>
                  <span className="text-3xl font-black text-amber-400 font-['Outfit']">
                    {activeRole.matchScore}%
                  </span>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-amber-400/40 border-t-amber-400 flex items-center justify-center font-bold text-xs text-white">
                  Match
                </div>
              </div>
            </div>

            {/* Visual Match Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs text-blue-200">
                <span>Competency Coverage</span>
                <span>
                  {activeRole.matchedSkills.length} of {activeRole.requiredSkills.length} Core Skills Verified
                </span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeRole.matchScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Required vs Matched vs Missing Skills Grid */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Skill Requirement Matrix for {activeRole.role}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Verified Matched Skills */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your Verified Skills ({activeRole.matchedSkills.length})</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Validated
                  </span>
                </div>
                <div className="space-y-1.5">
                  {activeRole.matchedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-medium text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between"
                    >
                      <span>✓ {sk}</span>
                      <span className="text-[10px] text-emerald-600 font-bold">100% Match</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills / Gaps */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Missing Skills / Gaps ({activeRole.missingSkills.length})</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    Action Required
                  </span>
                </div>
                <div className="space-y-1.5">
                  {activeRole.missingSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-semibold text-amber-950 bg-white px-3 py-1.5 rounded-lg border border-amber-200 flex items-center justify-between"
                    >
                      <span>⚠ {sk}</span>
                      <span className="text-[10px] text-amber-700 font-bold">Gap</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Learning Path (Step 1, Step 2, Step 3) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>Recommended Learning Path to Bridge Gap</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Target Timeline: 4 Weeks
              </span>
            </div>

            <div className="space-y-3">
              {activeRole.learningPath.map((item) => (
                <div
                  key={item.step}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {item.step}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">
                        {item.title}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.duration}</span>
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-blue-800">
                          Acquires: {item.skill}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      item.priority === 'High'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}
                  >
                    {item.priority} Urgency
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-slate-500">
                Completing this sequence will elevate your career match from{' '}
                <strong className="text-slate-900">{activeRole.matchScore}% → 96%</strong>.
              </p>
              <button
                onClick={handleStartSkillPlan}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                id="start-skill-gap-plan-btn"
              >
                <span>Start Skill-Gap Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Explainable AI & Market Insights */}
        <div className="space-y-6">
          {/* Explainable AI Card: "Why this recommendation?" */}
          <div className="bg-amber-50/70 rounded-2xl p-6 border-2 border-amber-300/80 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Explainable AI Reasoning</span>
            </div>

            <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
              Why this recommendation?
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed">
              {activeRole.explanation}
            </p>

            <div className="p-3 bg-white rounded-xl border border-amber-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">Live Cooperative Demand Signals:</div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                <li>+24% increase in accounting jobs in UP DCCB</li>
                <li>NABARD mandates digital ledger audit for all PACS</li>
                <li>Certified candidates hired within an average of 11 days</li>
              </ul>
            </div>
          </div>

          {/* Cooperative Employers Hiring for this role */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-blue-700" />
              <span>Active Cooperative Recruiters</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-900">Barabanki District Central Coop Bank</p>
                <p className="text-[11px] text-slate-500">12 Accounts Assistant Positions</p>
                <span className="text-[10px] font-bold text-emerald-700">92% Match with your profile</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-900">UP Cooperative Marketing Fed (UPPCF)</p>
                <p className="text-[11px] text-slate-500">8 Fertilizer Inventory Positions</p>
                <span className="text-[10px] font-bold text-emerald-700">85% Match with your profile</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('jobs')}
              className="w-full py-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Browse All Matched Jobs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
