// src/lib/utils/profile-utils.ts
import common from '$content/profile/common.json';
import profileEn from '$content/profile/en.json';
import profileIt from '$content/profile/it.json';
import type { Profile, ProfileProject, ProfileCoreArea, ProjectStatus } from '$lib/content/profile';
import type { LangAvailable } from '$lib/types';

export function getProfile(lang: LangAvailable = 'en'): Profile {
  const localized = lang === 'it' ? profileIt : profileEn;

  const projects: ProfileProject[] = common.projects.map((commonProject) => {
    const localizedProject = localized.projects.find((p) => p.id === commonProject.id);
    return {
      ...commonProject,
      status: commonProject.status as ProjectStatus,
      title: localizedProject?.title ?? commonProject.id,
      description: localizedProject?.description ?? ''
    };
  });

  const coreAreas: ProfileCoreArea[] = common.coreAreas.map((commonArea) => {
    const localizedArea = localized.coreAreas.find((a) => a.icon === commonArea.icon);
    return {
      ...commonArea,
      title: localizedArea?.title ?? commonArea.icon,
      description: localizedArea?.description ?? ''
    };
  });

  return {
    contact: common.contact,
    stack: common.stack,
    certifications: common.certifications,
    projects,
    coreAreas,
    name: localized.name,
    role: localized.role,
    bio: localized.bio,
    experiences: localized.experiences,
    community: localized.community
  };
}
