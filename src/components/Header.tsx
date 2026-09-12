import React from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import {
  Award,
  Globe,
  Mic,
  ShieldCheck,
  Sparkles,
  Wifi,
  WifiOff,
  UserCheck,
  Building2,
  Landmark,
  Briefcase,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    isOffline,
    setIsOffline,
    syncStatus,
    offlineQueueCount,
    setIsVoiceModalOpen,
    setIsSkillPassportModalOpen,
    setIsSecurityModalOpen,
    isDemoModeActive,
    setIsDemoModeActive,
    goToDemoStep,
  } = useApp();

  const rolesList: { id: Role; labelEn: string; labelHi: string; icon: React.ReactNode }[] = [
    { id: 'trainee', labelEn: 'Trainee', labelHi: 'प्रशिक्षु', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'institute_admin', labelEn: 'Institute Admin', labelHi: 'संस्थान एडमिन', icon: <Building2 className="w-4 h-4" /> },
    { id: 'ncct_admin', labelEn: 'NCCT / Govt Admin', labelHi: 'एनसीईआरटी / सरकार', icon: <Landmark className="w-4 h-4" /> },
    { id: 'employer', labelEn: 'Employer / Recruiter', labelHi: 'नियोक्ता', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'pacs_operator', labelEn: 'PACS Operator', labelHi: 'पैक्स ऑपरेटर', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Official Government Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center font-medium tracking-wide text-amber-300">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
            SIH 2026 Problem SIH26087
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-slate-300 font-semibold tracking-tight">
            सहकारिता मंत्रालय / Ministry of Cooperation, Govt. of India
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSecurityModalOpen(true)}
            className="hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer"
            title="View Security & Hardware Architecture"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Zero CapEx Architecture</span>
          </button>

          <button
            onClick={() => {
              setIsDemoModeActive(!isDemoModeActive);
              if (!isDemoModeActive) goToDemoStep(1);
            }}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all flex items-center space-x-1 ${
              isDemoModeActive
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/40'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>{isDemoModeActive ? 'SIH Demo Active' : 'Launch SIH Demo'}</span>
          </button>
        </div>
      </div>

      {/* Tricolor Accent Bar (Saffron, White, Green) */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-amber-500"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-emerald-600"></div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Logo & Identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-950/20 border border-blue-800/40">
            <span className="text-xl tracking-tighter text-amber-400 font-extrabold">स</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
                SARTHAK <span className="text-blue-700 font-medium text-sm">/ सार्थक</span>
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[11px] border border-blue-200">
                NCCT & VAMNICOM
              </span>
            </div>
            <p className="text-[12px] text-slate-500 font-medium tracking-tight">
              {language === 'hi'
                ? 'प्रशिक्षण से आजीविका — सत्यापित कौशल के साथ'
                : 'Turning Training Into Livelihood — One Verified Skill at a Time'}
            </p>
          </div>
        </div>

        {/* Global Controls: Role Switcher, Offline Simulator, Voice Assistant, Language */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Switcher Pills */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 overflow-x-auto text-xs">
            {rolesList.map((item) => {
              const active = role === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setRole(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-blue-800 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                  id={`role-btn-${item.id}`}
                >
                  {item.icon}
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Offline Simulator Switch */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center space-x-1.5 cursor-pointer ${
                isOffline
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
              }`}
              title={isOffline ? 'Currently Offline (SQLite Cache Active)' : 'Online with NIC GovCloud'}
              id="offline-toggle-btn"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>Offline ({offlineQueueCount})</span>
                </>
              ) : syncStatus === 'syncing' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NIC Cloud</span>
                </>
              )}
            </button>

            {/* Voice Assistant Button: "Ask Sarthak" */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 transition-all flex items-center space-x-1 cursor-pointer"
              title="Voice Assistant for Rural Users"
              id="voice-assistant-btn"
            >
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              <span>{language === 'hi' ? 'बोलें' : 'Ask Sarthak'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-all flex items-center space-x-1 cursor-pointer"
              id="language-switch-btn"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Skill Passport Quick Trigger */}
            <button
              onClick={() => setIsSkillPassportModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500 shadow-xs transition-all flex items-center space-x-1 cursor-pointer"
              id="skill-passport-quick-btn"
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Skill Passport</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
