export type ContactData = {
    phone: string;
    email: string;
    
}
export type PresentationResume = string;
export type MainSkills = {
    name: string;
}
export type TimelineEventType = 'work' | 'cert' | 'study' | 'speaker';

export type LevelTag = "high" | "medium" | "base"

export type TimelineEvent = {
    id: number;
    type: TimelineEventType;
    content: string;
    date: string;
}

export type TimelineEventUI = {
    className: string;
} & TimelineEvent;

export type StudiesEvent = {
    target: string;
} & TimelineEvent;

export type StudiesEventUI = {
    className: string;
} & TimelineEventUI;

export type ExperiencesEvent = {
    target: string,
    dateEnd: string,
    dateEndTime: string | null,
    dateStart: string,
    dateStartTime: string
} & TimelineEvent;

export type ExperiencesEventUI = {
    className: string;
} & ExperiencesEvent;

export type SpeakersEvent = TimelineEvent;

export type SpeakersEventUI = {
    className: string;
} & SpeakersEvent;

export type Certification = TimelineEvent;

export type CertificationUI = {
    className: string;
} & Certification;

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
    speakers: SpeakersEvent[],
    contact: ContactData,
    skills: SkillItem[],
    studies: StudiesEvent[],
    experiences: ExperiencesEvent[]
}