import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  CheckCircle2,
  Fingerprint,
  QrCode,
  ShieldCheck,
  Sparkles,
  Camera,
  Cpu,
  RefreshCw,
  HardDrive,
  Users,
  AlertCircle,
} from 'lucide-react';

export const AttendanceModule: React.FC = () => {
  const { trainee, updateTrainee, addNotification, language, isOffline } = useApp();

  const [mode, setMode] = useState<'qr' | 'biometric' | 'manual'>('biometric');
  const [isProcessing, setIsProcessing] = useState(false);
  const [markedToday, setMarkedToday] = useState(true);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(
    'Attendance marked at 09:15 AM IST via PACS USB Fingerprint Scanner (Barabanki PACS).'
  );

  const handleSimulateAttendance = (type: string) => {
    setIsProcessing(true);
    setVerificationFeedback(null);

    setTimeout(() => {
      setIsProcessing(false);
      setMarkedToday(true);
      const newAttendance = Math.min(100, trainee.attendanceRate + 1);
      updateTrainee({ attendanceRate: newAttendance });

      const feedback =
        type === 'biometric'
          ? 'Fingerprint Matched (99.8% Confidence) via PACS Morpho/Mantra Scanner. Reused existing computerisation terminal.'
          : 'QR Code Decrypted & Verified against NCCT Institute Geofence.';

      setVerificationFeedback(feedback);
      addNotification(
        isOffline
          ? 'Attendance recorded locally in SQLite cache (queued for cloud sync).'
          : 'Attendance authenticated and synchronized with NCCT National Database ✓',
        'success'
      );
    }, 1500);
  };

  const attendanceLog = [
    { date: '12 Sep 2026', time: '09:15 AM', mode: 'Biometric (PACS USB)', status: 'Present ✓', location: 'Barabanki PACS Room #1' },
    { date: '11 Sep 2026', time: '09:08 AM', mode: 'Biometric (PACS USB)', status: 'Present ✓', location: 'Barabanki PACS Room #1' },
    { date: '10 Sep 2026', time: '09:30 AM', mode: 'QR Geo-Scan', status: 'Present ✓', location: 'RICM Lucknow Hall B' },
    { date: '09 Sep 2026', time: '09:12 AM', mode: 'Biometric (PACS USB)', status: 'Present ✓', location: 'Barabanki PACS Room #1' },
    { date: '08 Sep 2026', time: '—', mode: 'Sunday Off', status: 'Holiday', location: 'N/A' },
    { date: '07 Sep 2026', time: '09:19 AM', mode: 'Biometric (PACS USB)', status: 'Present ✓', location: 'Barabanki PACS Room #1' },
  ];

  return (
    <div className="space-y-6">
      {/* Zero Hardware CapEx Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-6 border border-emerald-700/60 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-emerald-500/30 text-emerald-300">
                <Cpu className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Zero New Hardware CapEx Guarantee
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white font-['Outfit']">
              Reusing Existing PACS Computerisation Infrastructure
            </h3>
            <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
              Sarthak integrates directly with standard STQC-certified USB fingerprint scanners (Mantra/Morpho) and existing desktop webcams already supplied under the Ministry of Cooperation Centrally Sponsored Project.
            </p>
          </div>

          <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-600/40 text-xs text-center shrink-0">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block">
              UIDAI / STQC Compatible
            </span>
            <span className="font-mono text-white font-extrabold text-sm">
              USB HID Plug & Play
            </span>
          </div>
        </div>
      </div>

      {/* Main Attendance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Interaction Chamber */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Mark Today's Attendance
              </h4>
              <p className="text-xs text-slate-500">
                Mandatory for certificate issuance (Minimum 75% requirement)
              </p>
            </div>

            {/* Mode Selector Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setMode('biometric')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  mode === 'biometric'
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Biometric Scanner</span>
              </button>

              <button
                onClick={() => setMode('qr')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  mode === 'qr'
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan QR</span>
              </button>

              <button
                onClick={() => setMode('manual')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  mode === 'manual'
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Manual (Admin)</span>
              </button>
            </div>
          </div>

          {/* Interactive Mode Body */}
          {mode === 'biometric' && (
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
              <div
                onClick={() => handleSimulateAttendance('biometric')}
                className={`w-28 h-28 rounded-3xl mx-auto flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                  isProcessing
                    ? 'bg-blue-100 text-blue-800 animate-pulse ring-4 ring-blue-300'
                    : markedToday
                    ? 'bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400 hover:scale-105'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800 hover:scale-105 ring-2 ring-slate-300'
                }`}
                title="Click to authenticate thumb impression via USB device"
              >
                <Fingerprint className="w-16 h-16 stroke-[1.5]" />
              </div>

              <div>
                <h5 className="font-extrabold text-slate-900 text-base">
                  {isProcessing
                    ? 'Verifying Biometric Hash...'
                    : markedToday
                    ? 'Today Verified: Present ✓'
                    : 'Place Thumb on PACS USB Scanner'}
                </h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Reuses PACS computer USB port. Instant 1:1 match against NCCT enrollment record.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleSimulateAttendance('biometric')}
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {isProcessing ? 'Authenticating...' : 'Simulate Thumb Impression'}
                </button>
              </div>
            </div>
          )}

          {mode === 'qr' && (
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-slate-900 rounded-2xl p-3 relative flex items-center justify-center text-white overflow-hidden shadow-md">
                <div className="absolute inset-x-0 h-1 bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-bounce top-1/2"></div>
                <QrCode className="w-28 h-28 opacity-40" />
                <div className="absolute bottom-2 text-[10px] text-slate-300 font-mono">
                  Camera Viewfinder Active
                </div>
              </div>

              <div>
                <h5 className="font-extrabold text-slate-900 text-base">
                  Scan Classroom Dynamic QR
                </h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  Point camera at the smart classroom screen. Refreshed every 15 seconds with geofence protection to prevent proxy attendance.
                </p>
              </div>

              <button
                onClick={() => handleSimulateAttendance('qr')}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isProcessing ? 'Verifying QR...' : 'Scan Classroom QR'}
              </button>
            </div>
          )}

          {mode === 'manual' && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-start space-x-2 text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Admin override is reserved exclusively for institute instructors when hardware fails. Every manual entry requires two-party OTP approval and is logged in the NCCT audit trail.
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Instructor Employee ID:</label>
                  <input
                    type="text"
                    defaultValue="NCCT-FAC-8891"
                    disabled
                    className="w-full bg-slate-200 border rounded-lg px-3 py-1.5 text-slate-700 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Reason for Manual Marking:</label>
                  <input
                    type="text"
                    defaultValue="Power fluctuation at village sub-center"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700"
                  />
                </div>
              </div>
              <button
                onClick={() => handleSimulateAttendance('manual')}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                Submit Supervised Attendance
              </button>
            </div>
          )}

          {verificationFeedback && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{verificationFeedback}</span>
            </div>
          )}
        </div>

        {/* Right 1 col: Stats & Recent Log */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
              Overall Attendance Ratio
            </h4>

            <div className="text-center py-2">
              <div className="text-4xl font-extrabold text-slate-900 font-['Outfit']">
                {trainee.attendanceRate}%
              </div>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                24 of 27 Total Sessions Attended
              </p>
              <div className="mt-3 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${trainee.attendanceRate}%` }}
                ></div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-1">
              <div className="font-bold">NCCT Rule Compliance:</div>
              <p className="text-[11px] text-blue-800">
                Minimum 75% attendance mandatory for appearing in the National Cooperative Skills Assessment. You are fully eligible.
              </p>
            </div>
          </div>

          {/* Recent Attendance Records */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
              Recent Session Records
            </h4>
            <div className="space-y-2 text-xs">
              {attendanceLog.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-slate-800">{log.date}</span>
                    <p className="text-[10px] text-slate-500">{log.mode} • {log.time}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                      log.status.includes('Present')
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
