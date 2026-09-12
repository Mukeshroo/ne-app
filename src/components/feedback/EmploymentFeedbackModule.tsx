import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Building2,
  User,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Send,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const EmploymentFeedbackModule: React.FC = () => {
  const { addNotification, language } = useApp();

  const [technicalRating, setTechnicalRating] = useState(4);
  const [systemReadinessRating, setSystemReadinessRating] = useState(5);
  const [disciplineRating, setDisciplineRating] = useState(4);
  const [feedbackNotes, setFeedbackNotes] = useState(
    'Good command over digital payments and basic accounting. Needs further training on GST returns.'
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addNotification(
      'Feedback incorporated into NCCT Continuous Curriculum Improvement Engine!',
      'success'
    );
  };

  const renderStars = (rating: number, setRating?: (val: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!setRating || isSubmitted}
            onClick={() => setRating && setRating(star)}
            className={`transition-colors cursor-pointer ${
              star <= rating ? 'text-amber-400' : 'text-slate-300'
            }`}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (Section 17) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <MessageSquare className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Continuous Quality Improvement (CQI) Loop
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
              Post-Placement Employer Feedback & Curriculum Feedback Loop
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
              Empowering employers and cooperatives to grade candidate field performance, automatically streaming insights to VAMNICOM & NCCT to evolve training syllabi.
            </p>
          </div>
        </div>
      </div>

      {/* Main Feedback Form & Impact Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Feedback Submission (Section 17) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase text-slate-500">
                Evaluated Cooperative Employee
              </span>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Mukesh Kumar (SKL-2026-UP-8841)
              </h3>
              <p className="text-xs text-slate-600 flex items-center space-x-1.5 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Barabanki District Central Cooperative Society</span>
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 self-start sm:self-auto">
              Role: Accounts Assistant
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating Question 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  1. Technical Competence
                </span>
                <p className="text-[11px] text-slate-500">
                  Ability to operate PACS computerisation software and double-entry ledgers.
                </p>
              </div>
              {renderStars(technicalRating, setTechnicalRating)}
            </div>

            {/* Rating Question 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  2. System Readiness & Tool Adaptability
                </span>
                <p className="text-[11px] text-slate-500">
                  Ease of handling Micro-ATM, biometric scanners, and UPI cash points.
                </p>
              </div>
              {renderStars(systemReadinessRating, setSystemReadinessRating)}
            </div>

            {/* Rating Question 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  3. Attendance, Punctuality & Discipline
                </span>
                <p className="text-[11px] text-slate-500">
                  Adherence to banking hours and cooperative member relations.
                </p>
              </div>
              {renderStars(disciplineRating, setDisciplineRating)}
            </div>

            {/* Feedback Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Field Performance Notes & Recommendations:
              </label>
              <textarea
                rows={3}
                value={feedbackNotes}
                disabled={isSubmitted}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-extrabold text-sm">Feedback Recorded & Synced ✓</p>
                    <p className="text-[11px] text-emerald-800">
                      Recommendation routed to VAMNICOM syllabus board. Trainee notified to undertake GST bridge module.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-3 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-800 font-bold hover:bg-emerald-100"
                >
                  Edit
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-extrabold shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                id="submit-feedback-btn"
              >
                <Send className="w-4 h-4" />
                <span>Submit Evaluation to NCCT Knowledge Base</span>
              </button>
            )}
          </form>
        </div>

        {/* Right Column (1 span): AI Impact on NCCT Curriculum (Section 17) */}
        <div className="space-y-4">
          <div className="bg-amber-50/70 rounded-2xl p-5 border-2 border-amber-300 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Closed-Loop Impact</span>
            </div>

            <h4 className="font-bold text-base text-slate-900 font-['Outfit']">
              Direct Feedback into NCCT Curriculum Updates
            </h4>

            <p className="text-xs text-slate-700 leading-relaxed">
              When 40+ employers in Uttar Pradesh noted that new hires required additional training on GST returns, the AI engine automatically triggered an alert to the NCCT Academic Committee.
            </p>

            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs space-y-1.5">
              <span className="font-extrabold text-slate-900 flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                <span>Automated Curricular Action:</span>
              </span>
              <p className="text-[11px] text-slate-600">
                12-hour mandatory "GST E-Invoicing for PACS" module appended to the 2026 National Skilling Syllabus across all 14 ICMs and 5 RICMs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
              Recent Employer Evaluations
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Sunita Patel</span>
                  <span className="text-amber-500 font-extrabold">★ 4.8 / 5</span>
                </div>
                <p className="text-[11px] text-slate-500">Amul Anand Dairy Cooperative</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Rameshwar Yadav</span>
                  <span className="text-amber-500 font-extrabold">★ 4.6 / 5</span>
                </div>
                <p className="text-[11px] text-slate-500">Lucknow DCCB Bank Branch #4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
