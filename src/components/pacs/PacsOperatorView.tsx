import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  UserPlus,
  WifiOff,
  Wifi,
  Database,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  HardDrive,
  ShieldCheck,
  Send,
  Calendar,
} from 'lucide-react';

export const PacsOperatorView: React.FC = () => {
  const { isOffline, toggleOfflineMode, addNotification, language } = useApp();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaarLast4, setAadhaarLast4] = useState('');
  const [pacsName, setPacsName] = useState('Barabanki Primary Agricultural Credit Society (PACS-UP-081)');
  const [category, setCategory] = useState<'PACS Staff' | 'SHG Member' | 'Rural Youth' | 'Dairy Member'>('PACS Staff');
  const [recommendedCourse, setRecommendedCourse] = useState('Digital Skills for PACS Computerisation');

  const [registeredCandidates, setRegisteredCandidates] = useState([
    {
      id: 'REG-101',
      name: 'Rameshwar Yadav',
      mobile: '98765 43210',
      aadhaar: 'XXXX-XXXX-4891',
      category: 'PACS Staff',
      course: 'Digital Skills for PACS Computerisation',
      status: 'Synced to NCCT Cloud ✓',
      isPendingSync: false,
      date: '12 Sep 2026',
    },
    {
      id: 'REG-102',
      name: 'Sunita Devi',
      mobile: '94150 11223',
      aadhaar: 'XXXX-XXXX-7120',
      category: 'SHG Member',
      course: 'SHG Bookkeeping & Cooperative Micro-Credit',
      status: 'Synced to NCCT Cloud ✓',
      isPendingSync: false,
      date: '11 Sep 2026',
    },
    {
      id: 'REG-103',
      name: 'Mohit Rawat',
      mobile: '91200 99881',
      aadhaar: 'XXXX-XXXX-9032',
      category: 'Rural Youth',
      course: 'Digital Accounting for Cooperatives',
      status: 'Queued in Local SQLite Cache',
      isPendingSync: true,
      date: 'Today',
    },
  ]);

  // Handle category switch with auto-suggested course
  const handleCategoryChange = (cat: typeof category) => {
    setCategory(cat);
    if (cat === 'PACS Staff') {
      setRecommendedCourse('Digital Skills for PACS Computerisation');
    } else if (cat === 'SHG Member') {
      setRecommendedCourse('SHG Bookkeeping & Cooperative Micro-Credit');
    } else if (cat === 'Dairy Member') {
      setRecommendedCourse('Dairy Operations & AMCU Cold-Chain Management');
    } else {
      setRecommendedCourse('Digital Accounting for Cooperatives');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile) return;

    const newRecord = {
      id: `REG-${Math.floor(100 + Math.random() * 900)}`,
      name: fullName,
      mobile: mobile,
      aadhaar: `XXXX-XXXX-${aadhaarLast4 || '1234'}`,
      category: category,
      course: recommendedCourse,
      status: isOffline ? 'Saved locally in SQLite. Will sync when online.' : 'Synced to NCCT Cloud ✓',
      isPendingSync: isOffline,
      date: 'Just now',
    };

    setRegisteredCandidates([newRecord, ...registeredCandidates]);
    setFullName('');
    setMobile('');
    setAadhaarLast4('');

    if (isOffline) {
      addNotification('Candidate saved locally in SQLite cache. Will sync when online.', 'info');
    } else {
      addNotification(`Candidate ${fullName} enrolled into ${recommendedCourse} and synced with NCCT!`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (Section 10) */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-emerald-400 text-slate-950 font-bold">
                <Building className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Village Level Operator (VLO) • PACS Computerisation Terminal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Outfit']">
              PACS Member & Trainee Registration
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              Barabanki Primary Agricultural Credit Society (PACS-UP-081) • Empowering rural cooperative youth with direct access to NCCT skilling.
            </p>
          </div>

          {/* Offline Toggle Quick Control */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-950/80 p-2 rounded-xl border border-emerald-600/40 text-xs">
            <button
              onClick={toggleOfflineMode}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                isOffline ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isOffline ? 'Offline Mode Active' : 'Online Connected'}</span>
            </button>
            <span className="text-[11px] text-emerald-300 font-mono hidden sm:inline">
              Local DB: SQLite
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-column layout: Form + Candidate Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (3 cols): Registration Form (Section 10) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <UserPlus className="w-5 h-5 text-blue-800" />
            <h3 className="font-extrabold text-slate-900 text-base font-['Outfit']">
              Register Candidate for Cooperative Training
            </h3>
          </div>

          {isOffline && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Offline Mode Enabled:</strong> Candidate registration will be safely stored in the browser's local SQLite database and automatically synced to the NCCT cloud upon network restoration.
              </span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Candidate Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mukesh Kumar Verma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Mobile Number (for SMS & OTP) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Aadhaar Card (Last 4 Digits)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 4891"
                  value={aadhaarLast4}
                  onChange={(e) => setAadhaarLast4(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:bg-white font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  DPDP Compliant: Full UID never stored
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  PACS / Cooperative Affiliation
                </label>
                <input
                  type="text"
                  value={pacsName}
                  onChange={(e) => setPacsName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-100 text-slate-700 font-semibold"
                />
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Cooperative Category & Target Cadre *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['PACS Staff', 'SHG Member', 'Rural Youth', 'Dairy Member'] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-blue-800 text-white border-blue-900 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Auto-suggested recommended course */}
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-1">
              <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Recommended Course (Auto-suggested based on cadre):</span>
              </div>
              <p className="font-extrabold text-blue-950 text-sm">{recommendedCourse}</p>
              <p className="text-[11px] text-blue-800">
                Accredited by NCCT & Regional Institute of Cooperative Management (RICM Lucknow).
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              id="pacs-register-candidate-btn"
            >
              <Send className="w-4 h-4" />
              <span>
                {isOffline ? 'Save Candidate to Offline SQLite' : 'Submit & Enroll Candidate'}
              </span>
            </button>
          </form>
        </div>

        {/* Right Column (2 cols): Registered Candidates at this PACS */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
                Village Trainees ({registeredCandidates.length})
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Barabanki Hub
              </span>
            </div>

            <div className="space-y-3">
              {registeredCandidates.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-all space-y-1.5 text-xs"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-extrabold text-slate-900 text-sm">{c.name}</h5>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {c.mobile} • {c.aadhaar}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px]">
                      {c.category}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-slate-700">{c.course}</p>

                  <div className="pt-1 border-t border-slate-200 flex items-center justify-between text-[10px]">
                    <span
                      className={`font-bold flex items-center space-x-1 ${
                        c.isPendingSync ? 'text-amber-800' : 'text-emerald-700'
                      }`}
                    >
                      {c.isPendingSync ? (
                        <Clock className="w-3 h-3 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      )}
                      <span>{c.status}</span>
                    </span>
                    <span className="text-slate-400">{c.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
