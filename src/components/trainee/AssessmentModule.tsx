import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../../data/mockData';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export const AssessmentModule: React.FC = () => {
  const {
    trainee,
    updateTrainee,
    setActiveTab,
    setIsSkillPassportModalOpen,
    openCertificateVerification,
    language,
    addNotification,
  } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(900); // 15:00 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(84);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const currentQ = ASSESSMENT_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: idx }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(answers[currentQuestionIndex + 1] ?? null);
    } else {
      handleSubmitAssessment();
    }
  };

  const handleSubmitAssessment = () => {
    setIsSubmitted(true);
    // calculate score
    let correctCount = 0;
    ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) correctCount++;
    });
    // Ensure realistic passing score around 84%
    const calculated = Math.max(84, Math.round((correctCount / ASSESSMENT_QUESTIONS.length) * 100));
    setScorePercentage(calculated);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }

    addNotification('Assessment submitted! You have passed with Distinction ✓', 'success');
  };

  const handleRestart = () => {
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setTimeLeftSeconds(900);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
                <FileCheck className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                NCCT Examination & Skill Accreditation Board
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
              National Cooperative Competency Assessment
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Course: Digital Skills for PACS Computerisation • Proctored Assessment
            </p>
          </div>

          {!isSubmitted && (
            <div className="flex items-center space-x-3 self-start sm:self-auto bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">
                  Time Remaining
                </span>
                <span className="font-mono text-base font-extrabold text-amber-400">
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Question Canvas or Results View */}
      {!isSubmitted ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          {/* Progress Tracker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-lg text-xs font-bold">
                Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400">• Standard PACS Level-2 Test</span>
            </div>

            {/* Quick jump pagination pills */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {ASSESSMENT_QUESTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentQuestionIndex(i);
                    setSelectedOption(answers[i] ?? null);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer transition-all ${
                    currentQuestionIndex === i
                      ? 'bg-blue-800 text-white shadow-xs'
                      : answers[i] !== undefined
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Question Text in Bilingual Mode */}
          <div className="space-y-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Question Prompt:
            </span>
            <p className="text-base font-bold text-slate-900 leading-relaxed">
              {currentQ.questionEn}
            </p>
            <p className="text-sm font-medium text-slate-600 border-t border-slate-200/80 pt-2 font-['Noto_Sans_Devanagari']">
              {currentQ.questionHi}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Select One Verified Answer:
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.optionsEn.map((optEn, idx) => {
                const isSelected = selectedOption === idx;
                const optHi = currentQ.optionsHi[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                        isSelected
                          ? 'border-blue-700 bg-blue-700 text-white'
                          : 'border-slate-300 text-slate-500'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <p className={`text-xs font-bold ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                        {optEn}
                      </p>
                      <p className="text-[11px] text-slate-500 font-['Noto_Sans_Devanagari']">
                        {optHi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Nav Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex((prev) => prev - 1);
                  setSelectedOption(answers[currentQuestionIndex - 1] ?? null);
                }
              }}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous Question
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-blue-800 hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
              id="assessment-submit-next-btn"
            >
              <span>
                {currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1
                  ? 'Submit Assessment'
                  : 'Save & Next'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Result Screen as specified in Section 12 */
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-400 shadow-xl space-y-6 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <Award className="w-12 h-12 stroke-[2.2]" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              NCCT National Certification Exam
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2 font-['Outfit']">
              Assessment Result
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Candidate: <strong>{trainee.fullName}</strong> ({trainee.skillId})
            </p>
          </div>

          {/* Score Card */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 rounded-2xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Achieved Score</span>
            <div className="text-5xl font-black text-emerald-700 font-['Outfit']">
              {scorePercentage}%
            </div>
            <div className="inline-flex items-center space-x-1.5 text-emerald-900 font-extrabold text-sm bg-emerald-200/60 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>STATUS: PASSED ✓ (Distinction)</span>
            </div>
          </div>

          {/* Skills Verified section */}
          <div className="space-y-2 text-left bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Skills Verified & Appended to Skill Passport:
            </span>
            <div className="space-y-1.5">
              {['Digital Payments & Micro-ATM', 'Computer Operations', 'Basic Accounting & Day-Book'].map(
                (sk, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-white rounded-lg border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between"
                  >
                    <span className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{sk}</span>
                    </span>
                    <span className="text-[10px] bg-emerald-50 px-2 py-0.5 rounded text-emerald-700 font-bold">
                      Accredited
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => setIsSkillPassportModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md border border-amber-500 transition-all cursor-pointer flex items-center justify-center space-x-2"
              id="view-updated-passport-btn"
            >
              <Award className="w-4 h-4" />
              <span>Open Updated Skill Passport</span>
            </button>

            <button
              onClick={() => openCertificateVerification(trainee.certificates[0])}
              className="px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>View Cryptographic Certificate</span>
            </button>

            <button
              onClick={handleRestart}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
