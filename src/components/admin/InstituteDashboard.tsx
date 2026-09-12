import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  PlusCircle,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  BookOpen,
  FileText,
  X,
  Send,
} from 'lucide-react';

export const InstituteDashboard: React.FC = () => {
  const { addNotification, language } = useApp();

  const [activeTab, setActiveTab] = useState<'batches' | 'trainees' | 'reports'>('batches');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewBatchModalOpen, setIsNewBatchModalOpen] = useState(false);

  // New Batch Form State
  const [newBatchName, setNewBatchName] = useState('Batch 2026-D1: PACS Digital Operations');
  const [courseName, setCourseName] = useState('Digital Skills for PACS Computerisation');
  const [trainerName, setTrainerName] = useState('Dr. S. K. Awasthi (Senior Faculty)');
  const [capacity, setCapacity] = useState('50');
  const [startDate, setStartDate] = useState('2026-10-01');

  const batches = [
    {
      id: 'BAT-2026-A1',
      title: 'Digital Skills for PACS Computerisation',
      code: 'PACS-DS-01',
      traineesEnrolled: 60,
      attendanceRate: 88,
      status: 'In Progress (Module 4 of 5)',
      startDate: '01 Aug 2026',
      endDate: '30 Sep 2026',
      faculty: 'Er. Rajesh Mishra',
      venue: 'Smart Computer Lab #2, RICM Lucknow',
    },
    {
      id: 'BAT-2026-B2',
      title: 'Cooperative Accounting & Audit Compliance',
      code: 'COOP-ACC-02',
      traineesEnrolled: 45,
      attendanceRate: 92,
      status: 'Assessment Proctored',
      startDate: '15 Jul 2026',
      endDate: '15 Sep 2026',
      faculty: 'Prof. Ananya Sen',
      venue: 'Auditorium Hall A, RICM Lucknow',
    },
    {
      id: 'BAT-2026-C1',
      title: 'Dairy Operations & AMCU Cold-Chain',
      code: 'DAIRY-OP-03',
      traineesEnrolled: 40,
      attendanceRate: 85,
      status: 'In Progress (Module 2 of 4)',
      startDate: '20 Aug 2026',
      endDate: '25 Oct 2026',
      faculty: 'Er. V. P. Singh',
      venue: 'Demonstration Dairy Hub, Barabanki',
    },
  ];

  const traineeRoster = [
    {
      id: 'TR-101',
      name: 'Mukesh Kumar',
      skillId: 'SKL-2026-UP-8841',
      batch: 'BAT-2026-A1',
      pacs: 'Barabanki PACS (PACS-UP-081)',
      attendance: '89%',
      assessment: '84% (Passed ✓)',
      certStatus: 'Issued & QR Verifiable',
    },
    {
      id: 'TR-102',
      name: 'Sunita Patel',
      skillId: 'SKL-2026-GJ-4122',
      batch: 'BAT-2026-B2',
      pacs: 'Anand District Cooperative Milk Union',
      attendance: '94%',
      assessment: '91% (Passed ✓)',
      certStatus: 'Issued & QR Verifiable',
    },
    {
      id: 'TR-103',
      name: 'Rameshwar Yadav',
      skillId: 'SKL-2026-UP-9012',
      batch: 'BAT-2026-A1',
      pacs: 'Ayodhya Central Cooperative',
      attendance: '85%',
      assessment: '78% (Passed ✓)',
      certStatus: 'Issued & QR Verifiable',
    },
    {
      id: 'TR-104',
      name: 'Pooja Sharma',
      skillId: 'SKL-2026-RJ-3321',
      batch: 'BAT-2026-B2',
      pacs: 'Jaipur Rural Mahila PACS',
      attendance: '91%',
      assessment: '88% (Passed ✓)',
      certStatus: 'Issued & QR Verifiable',
    },
  ];

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewBatchModalOpen(false);
    addNotification(`New batch "${newBatchName}" registered with NCCT Academic Board!`, 'success');
  };

  const handleBulkIssueCertificates = () => {
    addNotification('Cryptographically signed certificates issued to 45 eligible candidates!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-blue-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-amber-400 text-slate-950 font-bold">
                <Building2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                NCCT Regional Institute of Cooperative Management (RICM Lucknow)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Outfit']">
              Institute Administration & Academic ERP
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Accredited Training Center ID: <strong>RICM-UP-002</strong> • Supervising 1,840 trainees across 28 cooperative batches.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsNewBatchModalOpen(true)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-extrabold border border-amber-500 shadow-md flex items-center space-x-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Create New Batch</span>
            </button>

            <button
              onClick={handleBulkIssueCertificates}
              className="px-4 py-2.5 bg-blue-800 hover:bg-blue-700 text-white rounded-xl text-xs font-bold border border-blue-700 shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Bulk Sign Certificates</span>
            </button>
          </div>
        </div>

        {/* 4 Institute Metric Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-800/50">
          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Active Batches
            </span>
            <span className="text-2xl font-black text-amber-400 font-['Outfit']">
              14 Batches
            </span>
            <p className="text-[10px] text-blue-200 font-semibold mt-0.5">
              PACS, Dairy & Accounts
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Enrolled Trainees
            </span>
            <span className="text-2xl font-black text-white font-['Outfit']">
              480 Trainees
            </span>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">
              100% Bio-verified
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Avg. Attendance Rate
            </span>
            <span className="text-2xl font-black text-emerald-400 font-['Outfit']">
              88.4%
            </span>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">
              Above 75% NCCT threshold
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Certified Candidates
            </span>
            <span className="text-2xl font-black text-white font-['Outfit']">
              394 Candidates
            </span>
            <p className="text-[10px] text-amber-300 font-semibold mt-0.5">
              Passports issued
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs">
          <button
            onClick={() => setActiveTab('batches')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'batches'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Training Batches ({batches.length})
          </button>
          <button
            onClick={() => setActiveTab('trainees')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'trainees'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Trainee Roster & Accreditation
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Compliance & Audit Reports
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search batches or trainees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
      </div>

      {/* View: Batches */}
      {activeTab === 'batches' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {batches.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-mono font-bold text-[10px] border border-blue-200">
                    {b.code}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {b.status}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                  {b.title}
                </h4>

                <div className="text-xs space-y-1 text-slate-600">
                  <p>
                    <span className="font-bold text-slate-800">Faculty:</span> {b.faculty}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Venue:</span> {b.venue}
                  </p>
                  <p>
                    <span className="font-bold text-slate-800">Duration:</span> {b.startDate} to {b.endDate}
                  </p>
                </div>

                {/* Attendance & Enrollment bar */}
                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Enrolled: <strong>{b.traineesEnrolled} Trainees</strong></span>
                    <span className="text-emerald-700 font-bold">Attendance: {b.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${b.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => addNotification(`Detailed roster opened for ${b.code}`, 'info')}
                  className="text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center space-x-1 cursor-pointer"
                >
                  <span>Manage Batch Roster</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View: Trainee Roster */}
      {activeTab === 'trainees' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
                Active Trainees Roster & Skill Accreditation Status
              </h4>
              <p className="text-xs text-slate-500">Biometric attendance verified with STQC USB hardware</p>
            </div>

            <button
              onClick={() => addNotification('Trainee roster downloaded as CSV/PDF!', 'success')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Roster</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Trainee Name & ID</th>
                  <th className="py-3 px-4">Batch</th>
                  <th className="py-3 px-4">Cooperative / PACS</th>
                  <th className="py-3 px-4">Attendance Rate</th>
                  <th className="py-3 px-4">Assessment</th>
                  <th className="py-3 px-4">Skill Passport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {traineeRoster.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{t.name}</p>
                      <p className="text-[10px] font-mono text-slate-500">{t.skillId}</p>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{t.batch}</td>
                    <td className="py-3 px-4 text-slate-600">{t.pacs}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {t.attendance}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900">{t.assessment}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t.certStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View: Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
            Mandatory Ministry of Cooperation Compliance Documents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">PACS Hardware Utilization & Zero CapEx Audit</p>
                <p className="text-[11px] text-slate-500">Verified STQC Biometric Device Serial Hash Logs</p>
              </div>
              <button
                onClick={() => addNotification('Hardware log downloaded!', 'info')}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-blue-800 font-bold hover:bg-blue-50"
              >
                Download PDF
              </button>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">NCCT Q2 Skilling & Livelihood Transition Report</p>
                <p className="text-[11px] text-slate-500">Candidate Employment & Enterprise Linkage Ratio</p>
              </div>
              <button
                onClick={() => addNotification('NCCT report downloaded!', 'info')}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-blue-800 font-bold hover:bg-blue-50"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Batch Modal */}
      {isNewBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base font-['Outfit']">
                  Schedule New Cooperative Training Batch
                </h3>
              </div>
              <button
                onClick={() => setIsNewBatchModalOpen(false)}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Batch Designation *</label>
                <input
                  type="text"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Approved Curriculum *</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned NCCT Faculty</label>
                  <input
                    type="text"
                    value={trainerName}
                    onChange={(e) => setTrainerName(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Candidate Quota</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsNewBatchModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Register Batch with NCCT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
