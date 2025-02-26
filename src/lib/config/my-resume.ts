import type {
    MainSkills,
    PresentationResume,
    IResume, Certification,
    SkillItem, SpeakersEvent,
    StudiesEvent, ExperiencesEvent
} from "$lib/content/resume"

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

export const eventTypes = {
    cert: 'bg-green-400',
    work: 'bg-blue-400',
    study: 'bg-red-400',
    speaker: 'bg-purple-400'

};
export const speakers: SpeakersEvent[] = [
    {
        id: 1,
        type: 'speaker',
        content: 'GDG Dev Fest Venezia',
        date: 'Novembre 2024',
    }
]

export const studies: StudiesEvent[] = [
    {
        id: 1,
        type: 'study',
        content: 'Università studi Padova',
        target: "Triennale Ingegneria Dell'informazione",
        date: '2015'
    },
    {
        id: 2,
        type: 'study',
        content: 'ITIS C.Zuccante',
        target: 'Perito Tecnico Elettronico e telecomunicazioni',
        date: '2009'
    }
];

export const experiences: ExperiencesEvent[] = [
    {
        id: 1,
        type: 'work',
        content: 'Almaviva Digitaltec',
        target: 'Fullstack Developer',
        dateEnd: 'current',
        dateEndTime: null,
        dateStart: 'Sep 22',
        dateStartTime: '2022-09-01',
        date: '2022 - current',
        description: 'Dal 2022 ho lavorato a progetti fullstack con tecnologie Angular e Java-Springboot. Almaviva opera principalmente come azienda di consulenza per la pubblica amministrazione'
    },
    {
        id: 1,
        type: 'work',
        content: 'Viasat - Greenext',
        target: 'Front End Developer',
        dateEnd: 'Sep 22',
        dateEndTime: '2022-09-01',
        dateStart: 'Sep 21',
        dateStartTime: '2021-09-01',
        date: '2021 - 2022',
        description: 'In questa realtà ho operato principalmente come frontend developer con tecnologie Angular e React, sperimentando Graphql. Ho avuto modo di prendere la certificazione ISIPM per avere le basi del project managment: concetti essenziali per poter lavorare in progetti. Principalmente ho lavorato nel settore WASTE-MANAGMENT (dalla Bussines Unit di Viasat e poi nell\'azienda Greenext)'
    },
    {
        id: 2,
        type: 'work',
        content: 'Red-V - Ennova Researh',
        target: 'Backend Frontend Mobile',
        dateStart: 'Sep 15',
        dateStartTime: '2015-09-15',
        dateEnd: 'Sep 21',
        dateEndTime: '2021-09-01',
        date: '2015 - 2021',
        description: 'è stato il mio primo lavoro nel settore IT esattamente quando ho finito il percorso di studi. Ho avuto modo di conoscere lo sviluppo software in tutto il suo stack, dal database al frontend, dalle soluzioni on-premises al cloud. Principalmente ho lavorato al prodotto RED-V che opera nel settore Digital-Signage. Inoltre ho potuto lavorare su prodotti di diversi importanti clienti. Dal primo anno ho potuto sviluppare in Android, da JAVA-Eclipse fino a Kotlik-AndroidStudio'
    },
    {
        id: 3,
        type: 'work',
        content: "IN's mercato",
        target: 'Work & study',
        dateStart: 'Sep 12',
        dateStartTime: '2012-10-1',
        dateEnd: 'Dec 14',
        dateEndTime: '2014-12-01',
        date: '2012 - 2014',
        description: 'Durante gli anni di studio a ingegneria, per pagarmi gli studi, ho lavorato presso questo supermercato. Fin da subito ho avuto modo di imparare l\'importanza dell\'organizzazione, della leadership e del gioco di squadra'
    }
];
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
    speakers: [...speakers],
    contact: {
        email: 'scarpa.michele.90@gmail.com',
        phone: '+393483482541'
    },
    skills: [...listSkills],
    studies: [...studies],
    experiences: [...experiences]
}