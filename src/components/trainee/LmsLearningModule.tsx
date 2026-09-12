import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Play,
  RotateCcw,
  Video,
  Wifi,
  WifiOff,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const LmsLearningModule: React.FC = () => {
  const {
    courses,
    markModuleCompleted,
    toggleCourseOffline,
    isOffline,
    syncStatus,
    setActiveTab,
    language,
    addNotification,
  } = useApp();

  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const activeCourse = courses[selectedCourseIndex] || courses[0];
  const [activeModuleIndex, setActiveModuleIndex] = useState(3); // 'Digital Payments'
  const activeModule = activeCourse.modules[activeModuleIndex] || activeCourse.modules[0];

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCompleteCurrentModule = () => {
    markModuleCompleted(activeCourse.id, activeModule.id);
    if (activeModuleIndex < activeCourse.modules.length - 1) {
      setActiveModuleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Offline Status Alert Banner if in Offline Mode */}
      {isOffline && (
        <div className="bg-amber-500/15 border-2 border-amber-400 p-4 rounded-2xl flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center space-x-3">
            <WifiOff className="w-5 h-5 text-amber-700 animate-pulse shrink-0" />
            <div>
              <p className="font-extrabold text-sm">
                {language === 'hi' ? '● ऑफलाइन मोड सक्रिय' : '● Offline Learning Active'}
              </p>
              <p className="text-[11px] text-amber-900 mt-0.5">
                {language === 'hi'
                  ? 'आप ऑफलाइन हैं। लर्निंग और उपस्थिति स्थानीय स्तर पर सहेज ली जाएगी और कनेक्टिविटी लौटने पर स्वतः सिंक होगी।'
                  : 'You are offline. Learning modules and quiz progress will continue and sync automatically when connectivity returns.'}
              </p>
            </div>
          </div>
          <span className="font-mono font-bold bg-amber-200/80 px-2 py-1 rounded-md text-[11px]">
            SQLite Cache
          </span>
        </div>
      )}

      {/* Top Course Switcher & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                NCCT & VAMNICOM Offline-First LMS
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
              {language === 'hi' ? activeCourse.hindiTitle : activeCourse.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lead Instructor: <strong>{activeCourse.instructor}</strong> • {activeCourse.institute}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCourseOffline(activeCourse.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 cursor-pointer ${
                activeCourse.isDownloadedOffline
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {activeCourse.isDownloadedOffline
                  ? 'Downloaded for Offline Learning ✓'
                  : 'Download for Offline Learning'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assessment')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold border border-amber-500 shadow-2xs cursor-pointer flex items-center space-x-1"
            >
              <span>Take Assessment</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Course Tabs */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2 overflow-x-auto text-xs">
          {courses.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCourseIndex(i);
                setActiveModuleIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCourseIndex === i
                  ? 'bg-blue-800 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c.title.split(' ')[0]} {c.title.split(' ')[1]} ({c.progressPercentage}%)
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area: Player & Modules List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Active Module Content / Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Interactive Module Viewer Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h4 className="font-bold text-sm truncate font-['Outfit']">
                  Module {activeModuleIndex + 1}: {activeModule.title}
                </h4>
              </div>
              <span className="text-xs text-slate-300 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeModule.durationMinutes} mins</span>
              </span>
            </div>

            {/* Video / Interactive Stage */}
            <div className="aspect-video bg-slate-950 relative flex items-center justify-center text-white overflow-hidden group">
              {isVideoPlaying ? (
                <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="text-emerald-400 font-mono">
                      ● STREAMING (HD 1080p Offline Encrypted)
                    </span>
                    <span>14:20 / {activeModule.durationMinutes}:00</span>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="inline-block p-4 rounded-2xl bg-blue-900/60 border border-blue-500/40 backdrop-blur-md">
                      <p className="text-base font-extrabold text-white">
                        {activeModule.title}
                      </p>
                      <p className="text-xs text-blue-200 mt-1">
                        Lecture delivered by NCCT Master Trainer for PACS Computerisation
                      </p>
                    </div>
                  </div>

                  {/* Simulated player scrub bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full w-2/5 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <button
                        onClick={() => setIsVideoPlaying(false)}
                        className="text-amber-400 hover:underline cursor-pointer"
                      >
                        Pause Session
                      </button>
                      <span>Audio: Hindi (Official)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 space-y-4">
                  <div
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-16 h-16 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-xl cursor-pointer transition-transform hover:scale-110"
                  >
                    <Play className="w-8 h-8 ml-1 fill-current" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">
                      Start Interactive Lecture
                    </h5>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Available with Hindi audio narration & subtitles for low-bandwidth rural connections.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls for Module */}
            <div className="p-4 bg-slate-50 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-semibold text-slate-600">Module Status:</span>
                {activeModule.completed ? (
                  <span className="text-emerald-700 font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Completed & Verified</span>
                  </span>
                ) : (
                  <span className="text-blue-700 font-semibold">In Progress</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCompleteCurrentModule}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Module as Completed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Module Syllabus & Study Notes */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Standard Operating Procedures & Handouts</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">PACS Daily Day-Book SOP</p>
                  <p className="text-[10px] text-slate-500">PDF • 2.4 MB (Offline Cached)</p>
                </div>
                <button className="px-2.5 py-1 rounded-md bg-white border text-blue-700 font-bold text-xs hover:bg-blue-50">
                  Open
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900">Micro-ATM USB Configuration</p>
                  <p className="text-[10px] text-slate-500">PDF • 1.8 MB (Offline Cached)</p>
                </div>
                <button className="px-2.5 py-1 rounded-md bg-white border text-blue-700 font-bold text-xs hover:bg-blue-50">
                  Open
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Module Checklist */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
                Curriculum Modules ({activeCourse.modules.length})
              </h4>
              <span className="text-xs font-extrabold text-blue-800">
                {activeCourse.progressPercentage}%
              </span>
            </div>

            <div className="space-y-2">
              {activeCourse.modules.map((m, idx) => {
                const isActive = activeModuleIndex === idx;
                return (
                  <div
                    key={m.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-start space-x-3 ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="pt-0.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'border-blue-700 text-blue-700 bg-white'
                              : 'border-slate-300 text-slate-400'
                          }`}
                        >
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <p
                        className={`font-bold ${
                          isActive ? 'text-blue-950' : 'text-slate-800'
                        }`}
                      >
                        {m.title}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                        <span className="capitalize">{m.type}</span>
                        <span>•</span>
                        <span>{m.durationMinutes}m</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Assessment Trigger button */}
            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('assessment')}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl border border-amber-500 shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Course Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
