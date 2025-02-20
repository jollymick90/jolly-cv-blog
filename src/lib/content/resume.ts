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

export type IResume = {
    mainSkills: MainSkills[],
    presentation: PresentationResume,
    certifications: Certification[]
}