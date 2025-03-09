import type { IResume } from './content';

export type LandingConfig = {
    title: string,
    heading: string,
    description: string
}
export type Experience = {
    company: string,
    position: string,
    years: string
}
export type ResumeConfig = {
    title: string,
    name: string,
    role: string,
    description: string,
    experiences: Experience[]
}

export type SiteContent = {
    landing: LandingConfig,
    resume: IResume
}
export type SiteConfig = {
    it: SiteContent,
    en: SiteConfig
}
//export type LangType = 'it' | 'en';
export type LangType = keyof SiteConfig;
//export type SectionType = 'landing' | 'resume';
export type SectionType = keyof SiteContent;
