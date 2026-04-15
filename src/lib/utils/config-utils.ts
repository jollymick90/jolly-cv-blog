import { defaultLang } from '$lib/i18n/lang.store';
import { getProfile } from '$lib/utils/profile-utils';
import type { Profile } from '$lib/content/profile.d.ts';
import type { IResume } from '$lib/content/resume';
import type { LangAvailable } from '$lib/types';

export function profileToResume(profile: Profile): IResume {
  return {
    title: `${profile.name} — ${profile.role}`,
    fullName: profile.name,
    mainRoleTitle: profile.role,
    presentation: profile.bio,
    contact: {
      email: profile.contact.email,
      showPhone: false,
      phone: profile.contact.phone,
      address: {
        showStreet: false,
        street: '',
        city: profile.contact.city,
        nearestBigCity: profile.contact.city,
        useShortAddress: true,
        zipcode: '',
        country: 'Italy'
      }
    },
    certifications: profile.certifications.map(c => ({
      id: c.id,
      type: 'cert' as const,
      content: c.content,
      date: c.date
    })),
    speakers: [],
    studies: [],
    experiences: profile.experiences.map((e, i) => ({
      id: i,
      type: 'work' as const,
      date: e.period,
      companyName: e.company,
      role: e.label,
      description: e.description,
      longDescription: e.description,
      dateStart: e.period,
      dateEnd: '',
      dateStartTime: e.period,
      dateEndTime: null,
      skillAquiredList: []
    })),
    mainSkills: profile.stack.slice(0, 5).map(s => ({ name: s })),
    skills: [],
    social: []
  };
}

/**
 * @deprecated Use getProfile() from '$lib/utils/profile-utils' instead.
 * This function is kept for backward compatibility with print routes.
 */
export function getResumeLang(lang: LangAvailable = defaultLang as LangAvailable): IResume {
  return profileToResume(getProfile(lang));
}
