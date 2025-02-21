import type { MainSkills, PresentationResume, IResume, Certification, SkillItem } from "../content/resume"

const mainSkillList: MainSkills[] = [
    {
        name: "Typescript",
    },
    {
        name: "Javascript",
    },
    {
        name: "React",
    },
    {
        name: "Angular",
    },
    {
        name: "Vue",
    },
    {
        name: "Android",
    }
]

const presentation: PresentationResume = 'Dal 2015 sviluppo software, so essere versatile e in questi anni ho imparato a trovare soluzioni adatte al contesto e al cliente. Sono appassionato del settore IT e ricerco costantemente di migliorare le mie qualità tecniche e professionali, un ottimo problem solver focalizzato su risultato e qualità';

const certifications: Certification[] = [
    {
        id: 3,
        type: 'cert',
        content: 'AWS Certified Developer - Associate',
        date: 'Dicembre 2022'
    },
    {
        id: 2,
        type: 'cert',
        content: 'ISIPM Base',
        date: 'Aprile 22'
    },
    {
        id: 1,
        type: 'cert',
        content: 'Google Professional Data Engineering ',
        date: 'Marzo 2020',
    }
];

export 	const eventTypes = {
    cert: 'bg-green-400',
    work: 'bg-blue-400',
    study: 'bg-red-400'
    
};
const listSkills: SkillItem[] = [
    //advanced
    {
        name: "Typescript",
        level: 90,
        levelTag: "high"
    },
    {
        name: "Javascript",
        level: 90,
        levelTag: "high"
    },
    {
        name: "HTML/CSS",
        level: 85,
        levelTag: "high"
    },
    {
        name: "React",
        level: 85,
        levelTag: "high"
    },
    {
        name: "Angular",
        level: 85,
        levelTag: "high"
    },
    {
        name: "Vue",
        level: 85,
        levelTag: "high"
    },
    {
        name: "JQuery",
        level: 85,
        levelTag: "high"
    },
    {
        name: "OpenLayers/Leaflet",
        level: 75,
        levelTag: "high"
    },
    {
        name: "git",
        level: 80,
        levelTag: "high"
    },
    {
        name: "Java",
        level: 80,
        levelTag: "high"
    },
    {
        name: "Spring Boot",
        level: 80,
        levelTag: "high"
    },
    {
        name: "Hibernate",
        level: 80,
        levelTag: "high"
    },
    //intermedie
    {
        name: "Kotlin",
        level: 60,
        levelTag: "medium"
    },
    {
        name: "Android",
        level: 65,
        levelTag: "medium"
    },
    {
        name: "React Native",
        level: 65,
        levelTag: "medium"
    },
    {
        name: "Tizen OS",
        level: 65,
        levelTag: "medium"
    },
    {
        name: "Framework7",
        level: 60,
        levelTag: "medium"
    },
    {
        name: "SQL",
        level: 60,
        levelTag: "medium"
    },
    {
        name: "NodeJS",
        level: 60,
        levelTag: "medium"
    },
    // base
    {
        name: "C#",
        level: 50,
        levelTag: "base"
    },
    {
        name: "DotNet",
        level: 50,
        levelTag: "base"
    },
    {
        name: "Cordova",
        level: 40,
        levelTag: "base"
    },

]

export const myResumePlaceholder: IResume = {
    mainSkills: [...mainSkillList],
    presentation,
    certifications: [...certifications],
    contact: {
        email: 'scarpa.michele.90@gmail.com',
        phone: '+393483482541'
    },
    skills: [ ...listSkills ]
}