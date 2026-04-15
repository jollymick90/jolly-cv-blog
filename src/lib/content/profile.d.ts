export type ProjectStatus = 'LIVE' | 'BETA' | 'PRIVATE' | 'ARCHIVE';

export interface ProfileContact {
  email: string;
  phone: string;
  city: string;
  github: string;
  linkedin: string;
}

export interface ProfileProject {
  id: string;
  slug: string;
  status: ProjectStatus;
  tags: string[];
  // From localized file (merged by id):
  title: string;
  description: string;
}

export interface ProfileCoreArea {
  icon: string; // Material Symbol name, e.g. "devices"
  tags: string[];
  // From localized file (merged by icon):
  title: string;
  description: string;
}

export interface ProfileExperience {
  id: string;
  period: string;
  label: string;
  company: string;
  description: string;
}

export interface ProfileCommunityEntry {
  label: string;
  title: string;
  description: string;
}

export interface ProfileCertification {
  id: number;
  content: string;
  date: string;
}

export interface Profile {
  // From common.json
  contact: ProfileContact;
  stack: string[];
  certifications: ProfileCertification[];
  // Merged (common + localized)
  projects: ProfileProject[];
  coreAreas: ProfileCoreArea[];
  // From localized only
  name: string;
  role: string;
  bio: string;
  experiences: ProfileExperience[];
  community: ProfileCommunityEntry[];
}
