export type Role = 'trainee' | 'institute_admin' | 'ncct_admin' | 'employer' | 'pacs_operator';

export type Language = 'en' | 'hi';

export interface VerifiedSkill {
  id: string;
  name: string;
  category: 'Cooperative Banking' | 'Digital IT' | 'Agri-Business' | 'Compliance' | 'Operations';
  verifiedDate: string;
  assessingBody: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  courseTitle: string;
  candidateName: string;
  candidateId: string;
  institute: string;
  issueDate: string;
  scorePercentage: number;
  grade: string;
  verificationHash: string;
  digiLockerStatus: 'Linked' | 'Available';
  skillsVerified: string[];
  instructorName: string;
}

export interface SkillPassport {
  skillId: string;
  fullName: string;
  avatarUrl: string;
  pacsName: string;
  district: string;
  state: string;
  institute: string;
  overallScore: number;
  employmentStatus: 'Open to Opportunities' | 'Shortlisted' | 'Employed in Cooperative' | 'Self-Employed';
  qrVerificationUrl: string;
  verifiedSkills: VerifiedSkill[];
  certificates: Certificate[];
  attendanceRate: number;
  lastUpdated: string;
  digiLockerLinked: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  type: 'video' | 'pdf' | 'quiz' | 'practical';
  isCurrent?: boolean;
}

export interface Course {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  institute: string;
  instructor: string;
  progressPercentage: number;
  totalModules: number;
  completedModules: number;
  isDownloadedOffline: boolean;
  skillsTaught: string[];
  estimatedHours: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  modules: CourseModule[];
}

export interface AssessmentQuestion {
  id: number;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface JobRecommendation {
  id: string;
  title: string;
  organization: string;
  coopType: 'PACS' | 'District Central Coop Bank' | 'Dairy Cooperative' | 'Agri Marketing Federation' | 'Sugar Cooperative';
  location: string;
  salaryRange: string;
  matchScore: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  appliedStatus: 'Not Applied' | 'Applied' | 'Shortlisted' | 'Selected';
  postedDaysAgo: number;
  description: string;
}

export interface SkillGapAnalysis {
  targetRole: string;
  currentMatchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendedLearningPath: {
    step: number;
    courseTitle: string;
    duration: string;
    skillToAcquire: string;
    urgency: 'High' | 'Medium' | 'Foundational';
  }[];
  marketInsight: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  state: string;
  district: string;
  institute: string;
  pacsName: string;
  skillId: string;
  avatarUrl: string;
  matchPercentage: number;
  verifiedSkills: string[];
  certificatesCount: number;
  attendanceScore: number;
  availability: 'Immediate' | 'Within 15 Days' | 'Employed';
  appliedFor?: string;
  status: 'Available' | 'Shortlisted' | 'Interviewed' | 'Hired';
  education: string;
}

export interface NcctStateData {
  state: string;
  traineesCount: number;
  pacsCount: number;
  completionRate: number;
  employmentRate: number;
  activeInstitutes: number;
  highDemandSkill: string;
}

export interface FeedbackRecord {
  id: string;
  candidateName: string;
  employerName: string;
  role: string;
  hired: boolean;
  skillsUsed: string[];
  additionalSkillsRequired: string;
  performanceRating: number;
  date: string;
}
