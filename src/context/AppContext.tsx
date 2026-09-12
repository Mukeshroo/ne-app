import React, { createContext, useContext, useState } from 'react';
import {
  CandidateProfile,
  Certificate,
  Course,
  FeedbackRecord,
  JobRecommendation,
  Language,
  Role,
  SkillPassport,
} from '../types';
import {
  CANDIDATES_LIST,
  COURSES,
  FEEDBACK_RECORDS_INITIAL,
  INITIAL_TRAINEE,
  RECOMMENDED_JOBS,
} from '../data/mockData';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  offlineQueueCount: number;
  syncStatus: 'synced' | 'syncing' | 'offline';
  triggerSync: () => void;
  
  // Data State
  trainee: SkillPassport;
  updateTrainee: (updated: Partial<SkillPassport>) => void;
  courses: Course[];
  markModuleCompleted: (courseId: string, moduleId: string) => void;
  toggleCourseOffline: (courseId: string) => void;
  jobs: JobRecommendation[];
  applyToJob: (jobId: string) => void;
  candidates: CandidateProfile[];
  shortlistCandidate: (candId: string) => void;
  hireCandidate: (candId: string, roleName: string) => void;
  feedbackRecords: FeedbackRecord[];
  addFeedback: (record: Omit<FeedbackRecord, 'id' | 'date'>) => void;
  
  // Modals & Overlays
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  isSkillPassportModalOpen: boolean;
  setIsSkillPassportModalOpen: (open: boolean) => void;
  isQrVerifyModalOpen: boolean;
  setIsQrVerifyModalOpen: (open: boolean) => void;
  activeVerificationCertificate: Certificate | null;
  openCertificateVerification: (cert: Certificate) => void;
  isSecurityModalOpen: boolean;
  setIsSecurityModalOpen: (open: boolean) => void;
  
  // SIH 2026 Demo Step
  sihDemoStep: number;
  setSihDemoStep: (step: number) => void;
  isDemoModeActive: boolean;
  setIsDemoModeActive: (active: boolean) => void;
  goToDemoStep: (step: number) => void;
  
  // Notifications
  notifications: ToastNotification[];
  addNotification: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('trainee');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  const [isOffline, setIsOfflineState] = useState<boolean>(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');
  
  const [trainee, setTrainee] = useState<SkillPassport>(INITIAL_TRAINEE);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [jobs, setJobs] = useState<JobRecommendation[]>(RECOMMENDED_JOBS);
  const [candidates, setCandidates] = useState<CandidateProfile[]>(CANDIDATES_LIST);
  const [feedbackRecords, setFeedbackRecords] = useState<FeedbackRecord[]>(FEEDBACK_RECORDS_INITIAL);
  
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSkillPassportModalOpen, setIsSkillPassportModalOpen] = useState(false);
  const [isQrVerifyModalOpen, setIsQrVerifyModalOpen] = useState(false);
  const [activeVerificationCertificate, setActiveVerificationCertificate] = useState<Certificate | null>(
    INITIAL_TRAINEE.certificates[0]
  );
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  
  const [sihDemoStep, setSihDemoStep] = useState<number>(1);
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastNotification = {
      id,
      type,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [newToast, ...prev].slice(0, 4));
    setTimeout(() => {
      removeNotification(id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    // Reset tab default appropriately
    if (newRole === 'trainee') setActiveTab('dashboard');
    else if (newRole === 'institute_admin') setActiveTab('trainees');
    else if (newRole === 'ncct_admin') setActiveTab('national_intelligence');
    else if (newRole === 'employer') setActiveTab('talent_search');
    else if (newRole === 'pacs_operator') setActiveTab('pacs_members');
  };

  const setIsOffline = (offline: boolean) => {
    setIsOfflineState(offline);
    if (offline) {
      setSyncStatus('offline');
      setOfflineQueueCount((prev) => (prev === 0 ? 3 : prev));
      addNotification(
        'Offline Mode Active. Learning and attendance saved locally in SQLite cache.',
        'warning'
      );
    } else {
      triggerSync();
    }
  };

  const triggerSync = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      const recordsCount = offlineQueueCount > 0 ? offlineQueueCount : 12;
      setOfflineQueueCount(0);
      setSyncStatus('synced');
      setIsOfflineState(false);
      addNotification(`Sync Complete ✓ ${recordsCount} offline records synchronized with NIC GovCloud.`, 'success');
    }, 1400);
  };

  const updateTrainee = (updated: Partial<SkillPassport>) => {
    setTrainee((prev) => ({ ...prev, ...updated }));
  };

  const markModuleCompleted = (courseId: string, moduleId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const newModules = c.modules.map((m) => (m.id === moduleId ? { ...m, completed: true } : m));
        const completedCount = newModules.filter((m) => m.completed).length;
        const progress = Math.round((completedCount / newModules.length) * 100);
        return {
          ...c,
          modules: newModules,
          completedModules: completedCount,
          progressPercentage: progress,
        };
      })
    );
    addNotification('Module completed! Progress updated.', 'info');
  };

  const toggleCourseOffline = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        const newStatus = !c.isDownloadedOffline;
        addNotification(
          newStatus
            ? `Course "${c.title}" downloaded for offline village use.`
            : `Course "${c.title}" removed from offline storage.`,
          'info'
        );
        return { ...c, isDownloadedOffline: newStatus };
      })
    );
  };

  const applyToJob = (jobId: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, appliedStatus: 'Applied' } : j))
    );
    addNotification('Application submitted with verified Digital Skill Passport!', 'success');
  };

  const shortlistCandidate = (candId: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: 'Shortlisted' } : c))
    );
    addNotification('Candidate shortlisted and notified via SMS/Portal!', 'success');
  };

  const hireCandidate = (candId: string, roleName: string) => {
    const cand = candidates.find((c) => c.id === candId);
    setCandidates((prev) =>
      prev.map((c) => (c.id === candId ? { ...c, status: 'Hired' } : c))
    );
    if (cand) {
      addFeedback({
        candidateName: cand.name,
        employerName: 'District Cooperative Recruitment Board',
        role: roleName,
        hired: true,
        skillsUsed: cand.verifiedSkills,
        additionalSkillsRequired: 'PACS statutory ledger reconciliation',
        performanceRating: 5,
      });
    }
    addNotification(`Hiring offer confirmed for ${cand?.name}! Continuous feedback logged.`, 'success');
  };

  const addFeedback = (record: Omit<FeedbackRecord, 'id' | 'date'>) => {
    const newRecord: FeedbackRecord = {
      ...record,
      id: `fb-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setFeedbackRecords((prev) => [newRecord, ...prev]);
  };

  const openCertificateVerification = (cert: Certificate) => {
    setActiveVerificationCertificate(cert);
    setIsQrVerifyModalOpen(true);
  };

  const goToDemoStep = (step: number) => {
    setSihDemoStep(step);
    setIsDemoModeActive(true);

    switch (step) {
      case 1:
        setRoleState('trainee');
        setActiveTab('dashboard');
        break;
      case 2:
        setRoleState('trainee');
        setActiveTab('dashboard');
        break;
      case 3:
        setRoleState('trainee');
        setActiveTab('attendance');
        break;
      case 4:
        setRoleState('trainee');
        setActiveTab('assessment');
        break;
      case 5:
        setRoleState('trainee');
        setActiveTab('certificates');
        break;
      case 6:
        setRoleState('trainee');
        setIsSkillPassportModalOpen(true);
        break;
      case 7:
        setRoleState('trainee');
        setIsSkillPassportModalOpen(false);
        setActiveTab('skill_gap');
        break;
      case 8:
        setRoleState('trainee');
        setActiveTab('learning');
        break;
      case 9:
        setRoleState('trainee');
        setActiveTab('jobs');
        break;
      case 10:
        setRoleState('employer');
        setActiveTab('talent_search');
        break;
      case 11:
        setRoleState('employer');
        setActiveTab('talent_search');
        break;
      case 12:
        setRoleState('employer');
        setActiveTab('talent_search');
        break;
      case 13:
        setRoleState('ncct_admin');
        setActiveTab('national_intelligence');
        break;
      case 14:
        setRoleState('ncct_admin');
        setActiveTab('state_analytics');
        break;
      case 15:
        setRoleState('ncct_admin');
        setActiveTab('feedback_loop');
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        isOffline,
        setIsOffline,
        offlineQueueCount,
        syncStatus,
        triggerSync,
        trainee,
        updateTrainee,
        courses,
        markModuleCompleted,
        toggleCourseOffline,
        jobs,
        applyToJob,
        candidates,
        shortlistCandidate,
        hireCandidate,
        feedbackRecords,
        addFeedback,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isSkillPassportModalOpen,
        setIsSkillPassportModalOpen,
        isQrVerifyModalOpen,
        setIsQrVerifyModalOpen,
        activeVerificationCertificate,
        openCertificateVerification,
        isSecurityModalOpen,
        setIsSecurityModalOpen,
        sihDemoStep,
        setSihDemoStep,
        isDemoModeActive,
        setIsDemoModeActive,
        goToDemoStep,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
