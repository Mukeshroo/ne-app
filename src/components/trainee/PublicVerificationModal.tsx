import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  ShieldCheck,
  X,
  ExternalLink,
  Award,
  Building,
  Calendar,
  Lock,
  Share2,
} from 'lucide-react';

export const PublicVerificationModal: React.FC = () => {
  const {
    isQrVerifyModalOpen,
    setIsQrVerifyModalOpen,
    activeVerificationCertificate,
    trainee,
  } = useApp();

  if (!isQrVerifyModalOpen || !activeVerificationCertificate) return null;

  const cert = activeVerificationCertificate;
  const currentTimestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'medium',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto">
        {/* Verification Status Header */}
        <div className="bg-emerald-700 text-white p-6 text-center relative">
          <button
            onClick={() => setIsQrVerifyModalOpen(false)}
            className="absolute right-4 top-4 p-1.5 rounded-full text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-700 flex items-center justify-center mx-auto shadow-lg mb-3">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest bg-emerald-800/80 px-3 py-1 rounded-full text-emerald-200 inline-block mb-1">
            Government of India • Ministry of Cooperation
          </span>
          <h3 className="text-2xl font-black tracking-tight font-['Outfit']">
            Certificate Verified ✓
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Official cryptographically verified credential from NCCT & VAMNICOM repository.
          </p>
        </div>

        {/* Verification Record Details */}
        <div className="p-6 space-y-4 text-sm bg-slate-50/50">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-start border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Candidate Name
                </span>
                <p className="font-extrabold text-base text-slate-900">
                  {cert.candidateName}
                </p>
                <span className="text-[11px] font-mono text-slate-500">
                  Skill ID: {cert.candidateId}
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
                Grade: {cert.grade}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase">
                Course Title
              </span>
              <p className="font-bold text-slate-900 text-sm">
                {cert.courseTitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 block">Accredited Institute:</span>
                <span className="font-semibold text-slate-800">{cert.institute}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Completion Date:</span>
                <span className="font-semibold text-slate-800">{cert.issueDate}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Assessment Score:</span>
                <span className="font-extrabold text-blue-700">{cert.scorePercentage}% Passed</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">Certificate ID:</span>
                <span className="font-mono font-bold text-slate-800">{cert.certificateNumber}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                Verified Skill Status
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cert.skillsVerified.map((sk, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy and Verification Timestamp Notice */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>Privacy-Preserving Public Verification</span>
            </div>
            <p className="text-blue-800 text-[11px] leading-relaxed">
              In compliance with Digital Personal Data Protection (DPDP) Act, sensitive private information (such as complete Aadhaar, mobile number, or bank details) is intentionally excluded from this public verification view.
            </p>
            <div className="text-[10px] text-slate-500 font-mono pt-1">
              Verification Timestamp: {currentTimestamp} IST • Ledger Hash: {cert.verificationHash}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">
              Verified by Sarthak • NCCT National Repository
            </span>
          </div>
          <button
            onClick={() => setIsQrVerifyModalOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
