export type ContactData = {
    phone: string;
    email: string;
    
}
export type PresentationResume = string;
export type MainSkills = {
    name: string;
}

export type Certification = {
    id: number;
    type: 'work' | 'cert' | 'study';
    content: string;
    date: string;
}

export type CertificationUI = {
    className: string;
} & Certification

export type LevelTag = "high" | "medium" | "base"
export interface SkillItem {
    name: string;
    level: number;
    levelTag: LevelTag;
}

export interface SkillItemUI extends SkillItem {
    color: string
}

export type IResume = {
    mainSkills: MainSkills[],
    presentation: PresentationResume,
    certifications: Certification[],
    contact: ContactData,
    skills: SkillItem[]
}