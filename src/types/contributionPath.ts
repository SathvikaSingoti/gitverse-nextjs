/**
 * Shared repository analysis types used across multiple feature detectors
 */

export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";
export type FocusArea = "Frontend" | "Backend" | "Full Stack" | "AI/ML" | "DevOps";

export interface ContributionPreference {
  name: string;
  experienceLevel: ExperienceLevel;
  focusArea: FocusArea;
}

export interface RepositoryFile {
  path: string;
  name?: string;
  language?: string;
  size?: number;
  type?: "file" | "directory";
  importance?: number;
  category?: string;
  dependencies?: string[];
  metadata?: Record<string, unknown>;
}

export interface RepositoryAnalysisData {
  id?: string | number;
  repositoryId?: string | number;
  name?: string;
  description?: string;
  url?: string;
  size?: number;
  files?: Array<RepositoryFile | string>;
  languages?: Array<{ name?: string; percentage?: number }>;
  commits?: Array<{ hash?: string; message?: string; authorName?: string; committedAt?: string }>;
  contributors?: Array<{ name?: string; commits?: number }>;
  issues?: Array<{ id?: string | number; title?: string; labels?: Array<{ name: string }>; state?: string }>;
  commitHash?: string;
  analysisDate?: Date;
  totalFiles?: number;
  insights?: string[];
  metadata?: Record<string, unknown>;
}

export interface ContributionDayPlan {
  day: string;
  summary: string;
  tasks: string[];
  goals: string[];
}

export interface RepositoryLearningConcept {
  title: string;
  description: string;
  category: string;
}

export interface RecommendedFile {
  path: string;
  reason: string;
  confidence: number;
}

export interface RecommendedIssue {
  id: string;
  title: string;
  labels: string[];
  path: string;
  estimate: string;
}

export interface ContributionMilestone {
  title: string;
  progress: number;
  description: string;
}

export interface ContributionProfile {
  name: string;
  experienceLevel: ExperienceLevel;
  focusArea: FocusArea;
  score: number;
  badge: string;
}

export interface ContributionPathPlan {
  profile: ContributionProfile;
  roadmap: ContributionDayPlan[];
  recommendedFiles: RecommendedFile[];
  learningConcepts: RepositoryLearningConcept[];
  recommendedIssues: RecommendedIssue[];
  firstContributionOpportunities: string[];
  milestones: ContributionMilestone[];
  completionScore: number;
  progress: number;
  badges: string[];
  summary: string;
  aiAssistantHint: string;
  futureAIReady: boolean;
}