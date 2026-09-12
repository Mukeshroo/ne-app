import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Download,
  ExternalLink,
  FileCheck,
  Landmark,
  QrCode,
  ShieldCheck,
  Sparkles,
  X,
  Share2,
  Building,
  Calendar,
  Layers,
} from 'lucide-react';

export const SkillPassportModal: React.FC = () => {
  const {
    trainee,
    isSkillPassportModalOpen,
    setIsSkillPassportModalOpen,
    openCertificateVerification,
    language,
    updateTrainee,
    addNotification,
  } = useApp();

  if (!isSkillPassportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const toggleEmploymentStatus = () => {
    const nextStatus =
      trainee.employmentStatus === 'Open to Opportunities'
        ? 'Shortlisted'
        : 'Open to Opportunities';
    updateTrainee({ employmentStatus: nextStatus });
    addNotification(`Employment status changed to: ${nextStatus}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border-4 border-amber-400/80 overflow-hidden relative my-auto">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-slate-200 px-6 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {language === 'hi' ? 'सत्यापित डिजिटल स्किल पासपोर्ट' : 'Verified Digital Skill Passport'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1 cursor-pointer border border-slate-700"
              title="Print or Export PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setIsSkillPassportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passport Document Body with Guilloche Border Feel */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 via-white to-amber-50/30 print:p-0">
          {/* Official Emblem & Header */}
          <div className="text-center pb-6 border-b-2 border-slate-200 relative">
            <div className="flex justify-center items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 text-amber-400 flex items-center justify-center font-extrabold text-2xl shadow-md border border-amber-400/60">
                स
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Government of India • Ministry of Cooperation
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Outfit']">
                  NATIONAL COOPERATIVE SKILL PASSPORT
                </h2>
                <div className="text-[11px] font-semibold text-blue-800">
                  National Council for Cooperative Training (NCCT) & VAMNICOM
                </div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold mt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CRYPTOGRAPHICALLY AUTHENTICATED • DIGILOCKER LINKABLE</span>
            </div>
          </div>

          {/* Profile & Identification Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-slate-200 items-center">
            {/* Trainee Photo */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={trainee.avatarUrl}
                  alt={trainee.fullName}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl ring-2 ring-slate-300"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md" title="Verified Biometrics">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <span className="mt-3 text-[11px] font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded-md border text-slate-700">
                ID: {trainee.skillId}
              </span>
            </div>

            {/* Trainee Details */}
            <div className="sm:col-span-2 space-y-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Full Name of Candidate
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  {trainee.fullName}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="font-bold text-slate-500 block">Training Institute:</span>
                  <span className="font-semibold text-slate-800">{trainee.institute}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">Affiliated Cooperative / PACS:</span>
                  <span className="font-semibold text-slate-800">{trainee.pacsName}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">State & District:</span>
                  <span className="font-semibold text-slate-800">{trainee.district}, {trainee.state}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block">Overall Assessment Score:</span>
                  <span className="font-extrabold text-blue-800 text-sm">{trainee.overallScore}% (Grade A+)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between bg-amber-50/70 p-2.5 rounded-xl border border-amber-200 text-xs">
                <div>
                  <span className="text-slate-600 font-medium">Employment Status: </span>
                  <strong className="text-slate-900 font-bold">{trainee.employmentStatus}</strong>
                </div>
                <button
                  onClick={toggleEmploymentStatus}
                  className="px-2.5 py-1 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                >
                  Change Status
                </button>
              </div>
            </div>
          </div>

          {/* Verified Skills Matrix */}
          <div className="py-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 flex items-center space-x-1.5 font-['Outfit']">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Verified Competencies ({trainee.verifiedSkills.length})</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-semibold">
                Independently assessed by NCCT Examination Board
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trainee.verifiedSkills.map((sk) => (
                <div
                  key={sk.id}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-bold text-xs text-slate-900">{sk.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 pl-5">
                      {sk.assessingBody} • {sk.verifiedDate}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {sk.proficiencyLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Certificates & QR Verification Zone */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Certificates Earned */}
            <div className="sm:col-span-2 space-y-2.5">
              <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 flex items-center space-x-1.5 font-['Outfit']">
                <FileCheck className="w-4 h-4 text-blue-700" />
                <span>Accredited NCCT Certificates ({trainee.certificates.length})</span>
              </h4>
              <div className="space-y-2">
                {trainee.certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-blue-300 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{cert.courseTitle}</p>
                      <p className="text-[10px] text-slate-500">
                        Cert #{cert.certificateNumber} • Score: {cert.scorePercentage}%
                      </p>
                    </div>
                    <button
                      onClick={() => openCertificateVerification(cert)}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-[11px] font-bold border border-blue-200 flex items-center space-x-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Verify QR</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Verification Box */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col items-center text-center shadow-lg border border-slate-800">
              <div
                onClick={() => openCertificateVerification(trainee.certificates[0])}
                className="bg-white p-2 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                title="Click to simulate public QR scan verification"
              >
                {/* Visual SVG QR Code */}
                <svg viewBox="0 0 100 100" className="w-24 h-24 text-slate-900">
                  <path fill="currentColor" d="M0 0h30v30H0zm5 5v20h20V5zm5 5h10v10H10zM70 0h30v30H70zm5 5v20h20V5zm5 5h10v10H80zM0 70h30v30H0zm5 5v20h20V75zm5 5h10v10H10zM40 10h10v10H40zm10 10h10v10H50zm-10 10h10v10H40zm30 10h10v10H70zm-10 10h10v10H60zm10 10h10v10H70zm20 0h10v10H90zm-10 10h10v10H80zm10 10h10v10H90zm-40-10h10v10H50zm-10 10h10v10H40zm10 10h10v10H50zm-20-20h10v10H30zm10-10h10v10H40z" />
                </svg>
              </div>

              <span className="mt-2 text-xs font-bold text-amber-400">
                Scan QR to Verify
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Instant cryptographic proof without exposing personal Aadhaar/PAN.
              </p>
              <button
                onClick={() => openCertificateVerification(trainee.certificates[0])}
                className="mt-2 text-[11px] underline text-blue-300 hover:text-white font-semibold cursor-pointer"
              >
                Open Public Verification View →
              </button>
            </div>
          </div>
        </div>

        {/* Official Security Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-600 flex flex-wrap justify-between items-center gap-2">
          <span>Digital Signature: NCCT-PKI-2026-SHA256-ROOT-GOV</span>
          <span>Last Authenticated: {trainee.lastUpdated}</span>
          <span className="text-emerald-700 font-bold">✓ Tamper-Evident Ledger Active</span>
        </div>
      </div>
    </div>
  );
};
