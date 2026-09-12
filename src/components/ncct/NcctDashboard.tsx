import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  EMERGING_SKILLS_DATA,
  MONTHLY_COMPLETION_DATA,
  NCCT_STATE_METRICS,
} from '../../data/mockData';
import {
  Landmark,
  TrendingUp,
  BarChart3,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  Sparkles,
  MapPin,
  Filter,
  Download,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const NcctDashboard: React.FC = () => {
  const { setActiveTab, language, addNotification } = useApp();

  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [activeTabSub, setActiveTabSub] = useState<'overview' | 'states' | 'skill_gap_map'>('overview');

  const filteredStateData =
    selectedState === 'All'
      ? NCCT_STATE_METRICS
      : NCCT_STATE_METRICS.filter((s) => s.state.toLowerCase() === selectedState.toLowerCase());

  const handleExportReport = () => {
    addNotification('NCCT National Cooperative Skilling Report exported to CSV/PDF!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (Section 15) */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-amber-400 text-slate-950 font-bold">
                <Landmark className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Ministry of Cooperation • National Cooperative Training Council
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Outfit']">
              NCCT Skill & Employment Intelligence
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Apex real-time oversight of VAMNICOM, 5 RICMs, 14 ICMs, and 63,000+ computerised PACS societies across India.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleExportReport}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export National Analytics</span>
            </button>
          </div>
        </div>

        {/* 4 Core Top Statistics (Section 15) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-white/10 rounded-xl p-4 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Personnel Trained
            </span>
            <span className="text-3xl font-black text-amber-400 font-['Outfit']">
              14.9L+
            </span>
            <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
              Across all cooperative cadres
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              PACS Infrastructure
            </span>
            <span className="text-3xl font-black text-white font-['Outfit']">
              63K+
            </span>
            <p className="text-[11px] text-blue-200 font-semibold mt-0.5">
              Computerised terminals active
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Course Completion
            </span>
            <span className="text-3xl font-black text-emerald-400 font-['Outfit']">
              82%
            </span>
            <p className="text-[11px] text-emerald-300 font-semibold mt-0.5">
              With verifiable assessment
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Employment Linkage
            </span>
            <span className="text-3xl font-black text-white font-['Outfit']">
              58%
            </span>
            <p className="text-[11px] text-amber-300 font-semibold mt-0.5">
              Formal placement & SHG livelihoods
            </p>
          </div>
        </div>
      </div>

      {/* Global Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 uppercase flex items-center mr-1">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Filters:
          </span>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 font-semibold cursor-pointer"
          >
            <option value="2026">Financial Year 2026-27</option>
            <option value="2025">Financial Year 2025-26</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-1.5 bg-slate-50 font-semibold cursor-pointer"
          >
            <option value="All">All Indian States (National)</option>
            {NCCT_STATE_METRICS.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        {/* View mode toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs">
          <button
            onClick={() => setActiveTabSub('overview')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTabSub === 'overview'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            National Overview
          </button>
          <button
            onClick={() => setActiveTabSub('states')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTabSub === 'states'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State Performance Table
          </button>
          <button
            onClick={() => setActiveTabSub('skill_gap_map')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTabSub === 'skill_gap_map'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            District Skill Gap Map
          </button>
        </div>
      </div>

      {/* AI Emerging Skill Demand & AI Insight (Section 16) */}
      <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-2xl p-6 border-2 border-amber-300 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-md bg-amber-400 text-slate-950">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
              Emerging Skill Demand & AI Macro Signals
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
            Quarterly Trend Q2-2026
          </span>
        </div>

        {/* 4 Skill Demand Cards (Section 16) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 block">Digital Accounting</span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-['Outfit']">↑ 24%</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">High Growth</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Driven by mandatory PACS audits</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 block">Data Management</span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-['Outfit']">↑ 18%</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Surging</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Member KYC and land registry</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 block">Digital Payments</span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-['Outfit']">↑ 16%</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Steady</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Micro-ATM and UPI disbursals</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 block">Dairy Technology</span>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-700 font-['Outfit']">↑ 12%</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Expanding</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">AMCU & cold-chain integration</p>
          </div>
        </div>

        {/* AI Insight Box (Section 16) */}
        <div className="p-4 bg-white rounded-xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-extrabold text-slate-900 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>NCCT AI National Policy Insight:</span>
            </div>
            <p className="text-slate-700 leading-relaxed max-w-3xl">
              “Demand for digital accounting skills is increasing faster than current training availability in selected districts. Recommending VAMNICOM to authorize 15 additional weekend batches at RICM Lucknow, ICM Bhopal, and ICM Gandhinagar.”
            </p>
          </div>

          <button
            onClick={() => setActiveTabSub('skill_gap_map')}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer flex items-center space-x-1"
          >
            <span>View Skill Gap Map</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Charts View */}
      {activeTabSub === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Skilling & Placement Funnel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
                  Training, Certification & Placement Trajectory
                </h4>
                <p className="text-xs text-slate-500">Monthly progression across national institutes</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_COMPLETION_DATA}>
                  <defs>
                    <linearGradient id="colorTrained" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="trained" name="Personnel Trained" stroke="#1e40af" fillOpacity={1} fill="url(#colorTrained)" />
                  <Area type="monotone" dataKey="certified" name="Certificates Issued" stroke="#f59e0b" fill="#fef3c7" />
                  <Area type="monotone" dataKey="placed" name="Employment Linked" stroke="#059669" fillOpacity={1} fill="url(#colorPlaced)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top States Skilling Capacity Bar Chart */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
                  State-wise Personnel Trained (Top 6 States)
                </h4>
                <p className="text-xs text-slate-500">Comparing total skilling volume by region</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={NCCT_STATE_METRICS.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="state" stroke="#64748b" fontSize={10} angle={-15} textAnchor="end" height={40} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="traineesCount" name="Personnel Trained" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="pacsCount" name="PACS Covered" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* State Performance Table */}
      {activeTabSub === 'states' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 overflow-hidden">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit']">
              State-wise Skilling & Employment Performance Index
            </h4>
            <span className="text-xs text-slate-500">Live registry data</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">State / UT</th>
                  <th className="py-3 px-4">Trainees Certified</th>
                  <th className="py-3 px-4">PACS Infrastructure</th>
                  <th className="py-3 px-4">Completion %</th>
                  <th className="py-3 px-4">Employment Linkage</th>
                  <th className="py-3 px-4">Dominant Skill Demand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredStateData.map((row) => (
                  <tr key={row.state} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{row.state}</td>
                    <td className="py-3 px-4 font-mono">{row.traineesCount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-mono">{row.pacsCount.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-700">{row.completionRate}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-700">{row.employmentRate}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {row.highDemandSkill}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* District Skill Gap Map (Section 16) */}
      {activeTabSub === 'skill_gap_map' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 font-['Outfit'] flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>District-Level Skill Gap Heatmap (Priority Remediation)</span>
              </h4>
              <p className="text-xs text-slate-500">
                Identifies cooperative societies where computerisation hardware exists but trained personnel are in acute deficit.
              </p>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              18 Critical Districts Flagged
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/60 space-y-2">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-slate-900 text-sm">Barabanki & Ayodhya (UP)</h5>
                <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full">
                  Deficit: -38%
                </span>
              </div>
              <p className="text-xs text-slate-600">
                42 PACS societies awaiting trained personnel for Day-Book ledger computerisation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => addNotification('Emergency batch authorized for RICM Lucknow!', 'info')}
                  className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                >
                  Allocate Training Quota
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-2">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-slate-900 text-sm">Kolhapur & Sangli (MH)</h5>
                <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                  Deficit: -26%
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Sugar mill cooperative credit societies need GST e-invoicing operators.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => addNotification('VAMNICOM assigned specialized module for Western Maharashtra!', 'info')}
                  className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                >
                  Allocate Training Quota
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 space-y-2">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-slate-900 text-sm">Anand & Kheda (GJ)</h5>
                <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                  Deficit: -14%
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Dairy cooperatives require automated AMCU milk fat analyzer operators.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => addNotification('ICM Gandhinagar dairy quota expanded!', 'info')}
                  className="px-3 py-1 bg-blue-800 hover:bg-blue-900 text-white text-[11px] font-bold rounded-lg cursor-pointer"
                >
                  Allocate Training Quota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
