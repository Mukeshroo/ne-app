import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SihDemoGuide } from './components/SihDemoGuide';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { TraineeDashboard } from './components/trainee/TraineeDashboard';
import { SkillPassportModal } from './components/trainee/SkillPassportModal';
import { PublicVerificationModal } from './components/trainee/PublicVerificationModal';
import { AiSkillGapEngine } from './components/trainee/AiSkillGapEngine';
import { JobRecommendations } from './components/trainee/JobRecommendations';
import { LmsLearningModule } from './components/trainee/LmsLearningModule';
import { AttendanceModule } from './components/trainee/AttendanceModule';
import { AssessmentModule } from './components/trainee/AssessmentModule';
import { InstituteDashboard } from './components/admin/InstituteDashboard';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { NcctDashboard } from './components/ncct/NcctDashboard';
import { PacsOperatorView } from './components/pacs/PacsOperatorView';
import { EmploymentFeedbackModule } from './components/feedback/EmploymentFeedbackModule';
import {
  LayoutDashboard,
  BookOpen,
  BrainCircuit,
  Briefcase,
  CalendarCheck,
  FileCheck,
  Building,
  Landmark,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Info,
  Award,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const {
    role,
    activeTab,
    setActiveTab,
    notifications,
    dismissNotification,
    isDemoModeActive,
    language,
    setIsSkillPassportModalOpen,
  } = useApp();

  // Navigation tab definitions for Trainee role
  const traineeTabs = [
    { id: 'dashboard', label: 'Trainee Overview', icon: LayoutDashboard },
    { id: 'learning', label: 'LMS Courseware', icon: BookOpen },
    { id: 'skill_gap', label: 'AI Skill Gap Engine', icon: BrainCircuit },
    { id: 'jobs', label: 'Cooperative Livelihoods', icon: Briefcase },
    { id: 'attendance', label: 'Smart Attendance', icon: CalendarCheck },
    { id: 'assessment', label: 'Competency Exam', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* SIH 2026 Interactive Tour Bar for Hackathon Judges */}
      <SihDemoGuide />

      {/* Government Grade Header */}
      <Header />

      {/* Sub-Navigation for Trainee Role */}
      {role === 'trainee' && (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2 no-scrollbar">
              <div className="flex items-center space-x-1 sm:space-x-2">
                {traineeTabs.map((t) => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id as any)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-blue-800 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Passport Action */}
              <button
                onClick={() => setIsSkillPassportModalOpen(true)}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs border border-amber-500 shadow-2xs transition-transform hover:scale-102 cursor-pointer ml-4 shrink-0"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Skill Passport</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Role: Trainee */}
        {role === 'trainee' && (
          <div>
            {activeTab === 'dashboard' && <TraineeDashboard />}
            {activeTab === 'learning' && <LmsLearningModule />}
            {activeTab === 'skill_gap' && <AiSkillGapEngine />}
            {activeTab === 'jobs' && <JobRecommendations />}
            {activeTab === 'attendance' && <AttendanceModule />}
            {activeTab === 'assessment' && <AssessmentModule />}
          </div>
        )}

        {/* Role: Institute Admin (RICM / ICM / VAMNICOM) */}
        {role === 'institute_admin' && <InstituteDashboard />}

        {/* Role: Cooperative Employer */}
        {role === 'employer' && (
          <div className="space-y-6">
            <EmployerDashboard />
            <div className="pt-4 border-t border-slate-200">
              <EmploymentFeedbackModule />
            </div>
          </div>
        )}

        {/* Role: NCCT / Ministry of Cooperation Central Admin */}
        {role === 'ncct_admin' && <NcctDashboard />}

        {/* Role: PACS Operator / Rural Training Mobilizer */}
        {role === 'pacs_operator' && <PacsOperatorView />}
      </main>

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => dismissNotification(n.id)}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center justify-between border transition-all animate-in slide-in-from-bottom-2 duration-300 cursor-pointer ${
              n.type === 'success'
                ? 'bg-slate-900 text-emerald-300 border-emerald-500/40'
                : n.type === 'warning'
                ? 'bg-amber-950 text-amber-200 border-amber-600/50'
                : 'bg-slate-900 text-blue-200 border-blue-500/40'
            }`}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{n.message}</span>
            </div>
            <span className="text-[10px] text-slate-400 ml-2">Dismiss</span>
          </div>
        ))}
      </div>

      {/* Global Modals */}
      <SkillPassportModal />
      <PublicVerificationModal />
      <VoiceAssistantModal />

      {/* Government-Grade Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-extrabold text-sm">
                  स
                </div>
                <span className="font-extrabold text-white text-base tracking-tight font-['Outfit']">
                  SARTHAK • सार्थक
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                National Cooperative Skill, Training, ERP & Employment Digital Public Infrastructure.
              </p>
              <div className="text-[10px] text-slate-400">
                Ministry of Cooperation • Government of India
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
                Key Institutes
              </h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li>National Council for Cooperative Training (NCCT)</li>
                <li>Vaikunth Mehta National Institute (VAMNICOM Pune)</li>
                <li>5 Regional Institutes (RICMs)</li>
                <li>14 Institutes of Cooperative Management (ICMs)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
                Cooperative Framework
              </h4>
              <ul className="space-y-1.5 text-slate-400 text-xs">
                <li>Primary Agricultural Credit Societies (PACS)</li>
                <li>District Central Cooperative Banks (DCCBs)</li>
                <li>Self-Help Groups (SHG-BLP Federations)</li>
                <li>Dairy & Marketing Cooperatives (AMUL, IFFCO, KRIBHCO)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">
                Security & Zero CapEx
              </h4>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Zero Hardware CapEx</span>
                </div>
                <p className="text-slate-400 text-[10px]">
                  Integrates with pre-existing computerisation hardware, USB STQC biometric sensors and webcams.
                </p>
              </div>
              <p className="text-[10px] text-slate-400">
                Fully compliant with Digital Personal Data Protection (DPDP) Act 2023.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <p>
              Smart India Hackathon 2026 Prototype • Problem Statement SIH26087
            </p>
            <div className="flex items-center space-x-4">
              <span className="hover:text-slate-200 transition-colors">NCCT Verification Node: 104.28.19.4</span>
              <span>•</span>
              <span className="hover:text-slate-200 transition-colors">W3C Verifiable Credentials</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">System Operational ✓</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
