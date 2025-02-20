import type { MainSkills, PresentationResume, IResume, Certification } from "./resume"

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
export const myResumePlaceholder: IResume = {
    mainSkills: [...mainSkillList],
    presentation,
    certifications: [...certifications]
}