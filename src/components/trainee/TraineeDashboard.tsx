import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  GraduationCap,
  Sparkles,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
  Compass,
  FileCheck,
  Building,
  Briefcase,
} from 'lucide-react';

export const TraineeDashboard: React.FC = () => {
  const {
    trainee,
    courses,
    setActiveTab,
    setIsSkillPassportModalOpen,
    language,
    toggleCourseOffline,
    openCertificateVerification,
  } = useApp();

  const currentCourse = courses[0]; // Digital Skills for PACS Computerisation

  return (
    <div className="space-y-6">
      {/* Top Greeting & Status Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={trainee.avatarUrl}
              alt={trainee.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/80 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400 text-xs font-bold tracking-wider uppercase">
                  {language === 'hi' ? 'सत्यापित पैक्स प्रशिक्षु' : 'Verified PACS Trainee'}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Skill ID: {trainee.skillId}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight font-['Outfit']">
                {language === 'hi' ? `सुप्रभात, ${trainee.fullName}` : `Good morning, ${trainee.fullName}`}
              </h2>
              <p className="text-xs text-blue-200 mt-0.5">
                {trainee.institute} • {trainee.pacsName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSkillPassportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm flex items-center space-x-2 transition-all cursor-pointer border border-amber-500"
              id="view-passport-hero-btn"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>{language === 'hi' ? 'स्किल पासपोर्ट देखें' : 'View Skill Passport'}</span>
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center space-x-2 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'hi' ? 'उपस्थिति दर्ज करें' : 'Mark Attendance'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? 'प्रशिक्षण प्रगति' : 'Training Progress'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">72%</span>
            <span className="text-xs font-semibold text-emerald-600">On Track</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-700 h-full rounded-full transition-all" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? 'उपस्थिति' : 'Attendance'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {trainee.attendanceRate}%
            </span>
            <span className="text-xs font-semibold text-slate-500">24/27 Days</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-700 font-medium">
            ✓ Eligible for NCCT Certification (&gt;75%)
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? 'सत्यापित कौशल' : 'Verified Skills'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {trainee.verifiedSkills.length}
            </span>
            <span className="text-xs font-semibold text-amber-700">Verified</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Assessed by VAMNICOM & NCCT
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {language === 'hi' ? 'प्रमाणपत्र प्राप्त' : 'Certificates'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
              {trainee.certificates.length}
            </span>
            <span className="text-xs font-semibold text-purple-700">DigiLocker</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Cryptographically signed QR codes
          </p>
        </div>
      </div>

      {/* "Your Next Best Skill" Innovation Card */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white rounded-2xl p-6 border-2 border-amber-300 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1 shadow-2xs">
                <Sparkles className="w-3 h-3" />
                <span>{language === 'hi' ? 'एआई सिफारिश' : 'AI Career Acceleration'}</span>
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                {language === 'hi' ? 'आपका अगला सबसे बेहतर कौशल' : 'Your Next Best Skill'}
              </h3>
            </div>

            <h4 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
              Digital Accounting for Cooperatives
            </h4>

            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/70 text-xs text-slate-700 leading-relaxed max-w-2xl">
              <span className="font-bold text-slate-900 mr-1">
                {language === 'hi' ? 'कारण:' : 'Reason:'}
              </span>
              “Based on your current verified skills and real-time employer demand across 324 cooperative vacancies, this course can improve your job match from <strong>78% → 92%</strong> for Accounts Assistant roles.”
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('skill_gap')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-2xs transition-all cursor-pointer flex items-center justify-center space-x-1"
            >
              <span>{language === 'hi' ? 'स्किल गैप विश्लेषण' : 'View Skill Gap Plan'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
              id="start-recommended-course-btn"
            >
              <span>{language === 'hi' ? 'अनुशंसित कोर्स शुरू करें' : 'Start Recommended Course'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* In-Progress Course Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                Current Course
              </span>
              {currentCourse.isDownloadedOffline && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center">
                  ● Offline Ready
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1 font-['Outfit']">
              {currentCourse.title}
            </h3>
            <p className="text-xs text-slate-500">
              Instructor: {currentCourse.instructor} • {currentCourse.institute}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleCourseOffline(currentCourse.id)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-1 cursor-pointer"
              title="Download course materials for village offline use"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>{currentCourse.isDownloadedOffline ? 'Downloaded' : 'Download Offline'}</span>
            </button>

            <button
              onClick={() => setActiveTab('learning')}
              className="px-4 py-1.5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold flex items-center space-x-1 cursor-pointer"
            >
              <span>Continue Learning</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modules status */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Progress: {currentCourse.progressPercentage}% completed</span>
            <span>
              {currentCourse.completedModules} of {currentCourse.totalModules} modules finished
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${currentCourse.progressPercentage}%` }}
            ></div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {currentCourse.modules.map((m, idx) => (
              <div
                key={m.id}
                className={`p-2.5 rounded-xl border text-xs flex items-center space-x-2 ${
                  m.completed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : m.isCurrent
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                {m.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : m.isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 shrink-0">
                    {idx + 1}
                  </span>
                )}
                <span className="truncate">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates & Verified Badges Quick Peek */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Verified Skills Showcase */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5 font-['Outfit']">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Verified Competencies ({trainee.verifiedSkills.length})</span>
            </h4>
            <button
              onClick={() => setIsSkillPassportModalOpen(true)}
              className="text-xs text-blue-700 font-bold hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {trainee.verifiedSkills.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
                {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Certificate with QR Trigger */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5 font-['Outfit']">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span>Latest Verified Certificate</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                DigiLocker Linked
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-800">
              {trainee.certificates[0]?.courseTitle}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Certificate #{trainee.certificates[0]?.certificateNumber} • Issued by {trainee.certificates[0]?.institute}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700">
              Score: {trainee.certificates[0]?.scorePercentage}% ({trainee.certificates[0]?.grade})
            </span>
            <button
              onClick={() => openCertificateVerification(trainee.certificates[0])}
              className="px-3 py-1 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 text-xs font-bold border border-blue-200 cursor-pointer"
            >
              Verify QR Authenticity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
