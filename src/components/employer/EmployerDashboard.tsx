import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CandidateProfile } from '../../types';
import {
  Briefcase,
  Search,
  Filter,
  Award,
  CheckCircle2,
  Building2,
  MapPin,
  Sparkles,
  PlusCircle,
  FileCheck,
  UserCheck,
  Send,
  X,
  Bot,
  BrainCircuit,
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const {
    candidates,
    shortlistCandidate,
    hireCandidate,
    setIsSkillPassportModalOpen,
    language,
    addNotification,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);

  // Job Creation Form state
  const [jobTitle, setJobTitle] = useState('PACS Digital Operator');
  const [organization, setOrganization] = useState('District Central Cooperative Bank Ltd.');
  const [location, setLocation] = useState('Barabanki / Lucknow, Uttar Pradesh');
  const [employmentType, setEmploymentType] = useState('Full-Time');
  const [salaryRange, setSalaryRange] = useState('₹18,000 - ₹24,000 / month');
  const [experience, setExperience] = useState('Fresher to 1 Year');
  const [qualification, setQualification] = useState('Graduate (B.Com / B.Sc / BA with NCCT Diploma)');
  const [isAiGeneratingSkills, setIsAiGeneratingSkills] = useState(false);
  const [generatedSkills, setGeneratedSkills] = useState<string[]>([
    'Computer Operations',
    'Digital Record Management',
    'Digital Payments & Micro-ATM',
    'Basic Cyber Safety & Compliance',
  ]);

  const handleAiSkillGenerate = () => {
    setIsAiGeneratingSkills(true);
    setTimeout(() => {
      setIsAiGeneratingSkills(false);
      if (jobTitle.toLowerCase().includes('account')) {
        setGeneratedSkills([
          'Cooperative Accounting',
          'Double-Entry Bookkeeping',
          'Day-Book & Cash Balance Reconciliation',
          'GST & Statutory Compliance',
        ]);
      } else if (jobTitle.toLowerCase().includes('dairy')) {
        setGeneratedSkills([
          'AMCU Milk Analyzer Software',
          'Milk FAT/SNF Testing',
          'Village Center Cold-Chain Logging',
          'Direct Farmer DBT Credit',
        ]);
      } else {
        setGeneratedSkills([
          'Computer Operations',
          'Digital Record Management',
          'Digital Payments & Micro-ATM',
          'Basic Cyber Safety & Compliance',
        ]);
      }
      addNotification('AI mapped job title into standardized NCCT competencies!', 'success');
    }, 1100);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreateJobOpen(false);
    addNotification(`Job vacancy "${jobTitle}" published with AI-structured skills!`, 'success');
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institute.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSkill =
      selectedSkillFilter === 'all' ||
      c.verifiedSkills.some((s) => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()));

    const matchesState =
      selectedStateFilter === 'all' || c.state.toLowerCase() === selectedStateFilter.toLowerCase();

    return matchesSearch && matchesSkill && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with 4 Stats (Section 13) */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded-md bg-amber-400 text-slate-950">
                <Briefcase className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Cooperative Employer Recruitment Portal
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 font-['Outfit']">
              Find Verified Cooperative Talent
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Hire credentialed personnel from 19 NCCT RICMs, ICMs and VAMNICOM with cryptographic Skill Passports.
            </p>
          </div>

          <button
            onClick={() => setIsCreateJobOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md border border-amber-500 flex items-center space-x-2 self-start md:self-auto cursor-pointer transition-all"
            id="create-job-modal-btn"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Create Vacancy (AI Skill Assisted)</span>
          </button>
        </div>

        {/* 4 Core Employer Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-800/60">
          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Verified Candidates
            </span>
            <span className="text-2xl font-black text-amber-400 font-['Outfit']">
              1,248
            </span>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">
              Across 32 States & UTs
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Open Positions
            </span>
            <span className="text-2xl font-black text-white font-['Outfit']">
              324
            </span>
            <p className="text-[10px] text-blue-200 font-semibold mt-0.5">
              PACS & DCCB Openings
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              New This Week
            </span>
            <span className="text-2xl font-black text-emerald-400 font-['Outfit']">
              87
            </span>
            <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">
              Fresh Certified Batches
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-[11px] text-blue-200 uppercase font-bold block">
              Average Skill Match
            </span>
            <span className="text-2xl font-black text-white font-['Outfit']">
              72%
            </span>
            <p className="text-[10px] text-amber-300 font-semibold mt-0.5">
              AI Competency Ranking
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, district, or institute..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Skill Filter */}
        <select
          value={selectedSkillFilter}
          onChange={(e) => setSelectedSkillFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
        >
          <option value="all">All Skills</option>
          <option value="Accounting">Accounting & Day-Book</option>
          <option value="Payments">Digital Payments / Micro-ATM</option>
          <option value="Computer">Computer Operations</option>
          <option value="AMCU">AMCU & Dairy Tech</option>
          <option value="Inventory">Warehouse / POS</option>
        </select>

        {/* State Filter */}
        <select
          value={selectedStateFilter}
          onChange={(e) => setSelectedStateFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
        >
          <option value="all">All States</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Punjab">Punjab</option>
          <option value="West Bengal">West Bengal</option>
        </select>
      </div>

      {/* Candidates Cards Grid (Section 13) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Card Header: Avatar & Match Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={cand.avatarUrl}
                    alt={cand.name}
                    className="w-13 h-13 rounded-xl object-cover border-2 border-slate-200 shadow-xs"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base font-['Outfit']">
                      {cand.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500">
                      {cand.skillId}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{cand.location}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs px-2.5 py-1 rounded-xl shadow-2xs">
                  {cand.matchPercentage}% Match
                </div>
              </div>

              {/* Education & Institute */}
              <div className="mt-3 text-xs space-y-0.5 border-t border-slate-100 pt-2.5">
                <p className="text-slate-700">
                  <span className="font-bold text-slate-900">Institute:</span> {cand.institute}
                </p>
                <p className="text-slate-600 text-[11px]">
                  <span className="font-semibold text-slate-700">PACS Affiliation:</span> {cand.pacsName}
                </p>
                <p className="text-slate-600 text-[11px]">
                  <span className="font-semibold text-slate-700">Education:</span> {cand.education}
                </p>
              </div>

              {/* Verified Competencies */}
              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Verified Competencies ({cand.verifiedSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1">
                  {cand.verifiedSkills.slice(0, 3).map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center"
                    >
                      ✓ {sk}
                    </span>
                  ))}
                  {cand.verifiedSkills.length > 3 && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
                      +{cand.verifiedSkills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-slate-500">
                {cand.availability}
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setIsSkillPassportModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  View Passport
                </button>

                {cand.status === 'Hired' ? (
                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                    Hired ✓
                  </span>
                ) : cand.status === 'Shortlisted' ? (
                  <button
                    onClick={() => hireCandidate(cand.id, 'PACS Digital Operator')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Confirm Hire
                  </button>
                ) : (
                  <button
                    onClick={() => shortlistCandidate(cand.id)}
                    className="px-3 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Shortlist
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Creation Modal with AI Skill Generation (Section 14) */}
      {isCreateJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base font-['Outfit']">
                  Create Cooperative Job & Auto-Generate Skill Requirements
                </h3>
              </div>
              <button
                onClick={() => setIsCreateJobOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJob} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organization / Cooperative</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location / District</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Remuneration</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Minimum Qualification</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full border rounded-xl p-2.5 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* AI Skill Generator Chamber (Section 14) */}
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-300 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-amber-950 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>AI Skill Requirements Generation</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAiSkillGenerate}
                    disabled={isAiGeneratingSkills}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-lg text-xs border border-amber-500 cursor-pointer shadow-2xs"
                  >
                    {isAiGeneratingSkills ? 'Extracting...' : 'Generate Skill Requirements'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-600">
                  The system simulates AI converting free-text job titles into structured, verifiable NCCT competencies.
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {generatedSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-slate-900 font-bold text-xs flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sk}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateJobOpen(false)}
                  className="px-4 py-2 border rounded-xl text-slate-700 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
