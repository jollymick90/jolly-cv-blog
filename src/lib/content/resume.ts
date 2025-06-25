export type SocialIcon =  'LinkedInIcon' | 'GitHubIcon' | 'InstagramIcon' | 'BlueskyIcon' | 'XIcon';
export type SocialInfo = {
    icon: SocialIcon;
    href: string;
    ariaLabel: string;
}
export type ContactData = {
    showPhone: boolean;
    phone: string;
    email: string;
    social: SocialInfo[];
    address: {
        showStreet?: boolean;
        street: string;
        useShortAddress: boolean;
        city: string;
        nearestBigCity: string;
        zipcode: string;
        country: string;
    }
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
    content?: string;
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

export type SkillAquired = {
    name: string,
    level?: number,
    type?: string
}

export type ExperiencesEvent = {
    companyName: string;
    role: string;
    target?: string,
    dateEnd: string,
    dateEndTime: string | null,
    dateStart: string,
    dateStartTime: string,
    description: string,
    longDescription?: string,
    experiencesList?: string[],
    skillAquiredList: SkillAquired[],
    experiencesListShort?: string[]
} & TimelineEvent;

export type ExperiencesEventUI = {
    className: string;
} & ExperiencesEvent;

export type SpeakersEvent = {
    description: string,
    title: string
} & TimelineEvent;

export type SpeakersEventUI = {
    className: string;
} & SpeakersEvent;

export type Certification = TimelineEvent;

export type CertificationUI = {
    className: string;
} & Certification;

export type SkillTypeEnum = {
    PROGRAMMING_LANGUAGE: unknown,
    DATABASE_MANAGEMENT: unknown
    CLOUD_PLATFORM: unknown,
    NETWORKING: unknown,
    DEVOPS: unknown,
    OPERATING_SYSTEM: unknown,
    WEB_DEVELOPMENT: unknown,
    MOBILE: unknown,
    FRAMEWORKS: unknown,
    TOOLS: unknown,
    OTHER: unknown,
    SOFT_SKILL: unknown
}

export type SkillTagEnum = {
    frontend: unknown,
    backend: unknown,
    gis: unknown,
    technical: unknown,
    softskill: unknown,
    versioning: unknown
}

export type SkillType = keyof SkillTypeEnum;
export type SkillTag = string;

export interface SkillItem {
    name: string;
    level: number;
    levelTag: LevelTag;
    type?: SkillType;
    tags?: SkillTag;
}

export interface SkillItemUI extends SkillItem {
    color: string
}

export type IResume = {
    title: string;
	fullName: string;
    mainRoleTitle: string;
    mainSkills: MainSkills[],
    presentation: PresentationResume,
    certifications: Certification[],
    speakers: SpeakersEvent[],
    contact: ContactData,
    skills: SkillItem[],
    studies: StudiesEvent[],
    experiences: ExperiencesEvent[]
}