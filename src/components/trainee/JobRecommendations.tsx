import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobRecommendation } from '../../types';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Send,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';

export const JobRecommendations: React.FC = () => {
  const { jobs, applyToJob, setIsSkillPassportModalOpen, language } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobRecommendation | null>(jobs[0] || null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && job.coopType.toLowerCase().includes(filterType.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                <Briefcase className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                AI Opportunity Matching
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1 font-['Outfit']">
              Recommended Cooperative Livelihoods
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
              Verified skills in your Digital Skill Passport are dynamically ranked against real vacancies at PACS, District Banks, Milk Federations, and KRIBHCO/IFFCO.
            </p>
          </div>

          <button
            onClick={() => setIsSkillPassportModalOpen(true)}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold border border-amber-500 flex items-center space-x-2 self-start md:self-auto cursor-pointer"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>Digital Skill Passport Attached</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job role, district, or cooperative..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
            {['all', 'PACS', 'Bank', 'Dairy', 'Agri'].map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                  filterType === f
                    ? 'bg-blue-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'All Cooperatives' : f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Job Cards + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Job Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.map((job) => {
            const isSelected = selectedJob?.id === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[11px] border border-blue-200">
                        {job.coopType}
                      </span>
                      <span className="text-xs text-slate-400">• Posted {job.postedDaysAgo}d ago</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                      {job.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.organization}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </p>
                  </div>

                  {/* AI Match Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-xl shadow-xs font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{job.matchScore}% Match</span>
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-800">
                      {job.salaryRange}
                    </span>
                  </div>
                </div>

                {/* Skills Match Breakdown */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] font-bold text-slate-500 mr-1">Required:</span>
                    {job.requiredSkills.map((sk, i) => {
                      const isMatched = job.matchedSkills.includes(sk);
                      return (
                        <span
                          key={i}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1 ${
                            isMatched
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isMatched ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-0.5" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-amber-600 mr-0.5" />
                          )}
                          <span>{sk}</span>
                        </span>
                      );
                    })}
                  </div>

                  {job.appliedStatus === 'Applied' ? (
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                      ✓ Application Submitted
                    </span>
                  ) : job.appliedStatus === 'Shortlisted' ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      ★ Shortlisted by Recruiter!
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyToJob(job.id);
                      }}
                      className="px-4 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                    >
                      <span>1-Click Apply</span>
                      <Send className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Job Deep-Dive & Action */}
        {selectedJob && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5 h-fit sticky top-24">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                {selectedJob.coopType}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 font-['Outfit']">
                {selectedJob.title}
              </h3>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {selectedJob.organization}
              </p>
              <p className="text-xs text-slate-500">{selectedJob.location}</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Monthly Remuneration</span>
              <p className="text-lg font-extrabold text-slate-900">{selectedJob.salaryRange}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase">Role Overview</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Your Competency Alignment</span>
                <span className="font-extrabold text-emerald-700">{selectedJob.matchScore}% Match</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${selectedJob.matchScore}%` }}
                ></div>
              </div>

              {selectedJob.missingSkills.length > 0 && (
                <p className="text-[11px] text-amber-800 pt-1">
                  Missing recommended skill: <strong>{selectedJob.missingSkills.join(', ')}</strong>. You can still apply; NCCT allows in-service bridging!
                </p>
              )}
            </div>

            <div className="pt-2">
              {selectedJob.appliedStatus === 'Applied' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-emerald-800 flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Application Active & Under Review</span>
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Recruiter has received your verified Skill Passport and NCCT attendance log.
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => applyToJob(selectedJob.id)}
                  className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply with Verified Skill Passport</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
