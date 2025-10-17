export type AppStatus = 'Applied' | 'Reviewed' | 'Rejected';

export interface Application {
  id?: number;
  jobId: number;
  candidateId: number;
  candidateName: string;
  email: string;
  status: AppStatus;
  appliedDate: string;
  resume?: string;
  coverLetter?: string;
}
export type ExperienceRange = '0-2 years' | '2-5 years' | '5+ years';

export interface Job {
  id?: number;
  jobId: string;
  title: string;
  companyName: string;
  location: string;
  description: string;
  experience: ExperienceRange;
  salary?: string;
  postedBy: number;
  postedDate: string;
  active?: boolean;
}
export interface NotificationItem {
  id?: string;
  text: string;
  date: string; // ISO
  read?: boolean;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'employer' | 'candidate';
  company?: string;
  notifications?: NotificationItem[];
  appliedJobs?: number[];
}
