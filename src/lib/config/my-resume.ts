import type {
	Certification,
	ExperiencesEvent,
	IResume,
	MainSkills,
	PresentationResume,
	SkillItem,
	SpeakersEvent,
	StudiesEvent
} from '$lib/content/resume';

// 
// "Da oltre otto anni mi dedico allo sviluppo software, creando soluzioni su misura per ogni contesto e cliente, e puntando sempre all’eccellenza tecnica e alla continua innovazione."

// "Attivo nel settore IT dal 2015, ho consolidato una solida esperienza nella realizzazione di applicazioni fullstack e mobile, mettendo in campo versatilità, problem solving e un approccio orientato al risultato."

// "Il mio percorso nel mondo del software, iniziato nel 2015, mi ha permesso di sviluppare competenze trasversali e di adottare le migliori tecnologie per rispondere alle esigenze specifiche dei clienti con soluzioni di alta qualità."

// "Dal 2015 trasformo sfide tecnologiche in opportunità, sfruttando la mia esperienza con linguaggi e framework diversificati per progettare e realizzare applicazioni efficienti e innovative."

// "Con un percorso professionale che inizia nel 2015, mi contraddistingue la capacità di adattarmi a contesti dinamici, sviluppando software che uniscono precisione tecnica e creatività per risolvere problemi complessi."

// Mi chiamo Michele Scarpa e sono un ingegnere del software da diversi anni. Ho consolidato una solida esperienza nalla realizzazione di applicazioni fullstack e mobile. Il mio focus è nel miglioramento continuo di tutto ciò che gira attorno a un software, capendo il contesto, le tecnologie e il dominio in cui vive.  


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
        name: "Svelte",
    },
    {
        name: "Java",
    },    
    {
        name: "Android",
    }
]

const presentation: PresentationResume = 'Mi chiamo Michele Scarpa e sono un ingegnere del software da diversi anni. Ho consolidato una solida esperienza nalla realizzazione di applicazioni fullstack e mobile. Il mio focus è nel miglioramento continuo di tutto ciò che gira attorno a un software, capendo il contesto, le tecnologie e il dominio in cui vive. ';

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
        title: 'Frontend Roadmap: Beginning Dilemma',
        description: 'Roadmap e strumenti per la strada del frontend developer'
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
        companyName: 'Almaviva Digitaltec',
        role: 'Fullstack Developer',
        dateEnd: 'current',
        dateEndTime: null,
        dateStart: 'Sep 22',
        dateStartTime: '2022-09-01',
        date: '2022 - current',
        description: 'Dal 2022 ho lavorato a progetti fullstack con tecnologie Angular e Java-Springboot. Principalmente in progetti dedicati alla pubblica amministrazione. Ho anche fatto largo uso di tecnologie GIS: Geoserver, Geonode, leaflet',
        experiencesList: [
            'Sviluppo di applicativi fullstack Angular, Springboot',
            "Gestione piccoli team in progetti",
            "Sviluppo applicativi Web GIS: Geoserver, Geonode, Leaflet"
        ],
        skillAquiredList: []
    },
    {
        id: 1,
        type: 'work',
        companyName: 'Viasat - Greenext',
        role: 'Front End Developer',
        dateEnd: 'Sep 22',
        dateEndTime: '2022-09-01',
        dateStart: 'Sep 21',
        dateStartTime: '2021-09-01',
        date: '2021 - 2022',
        experiencesList: [
            "Mantenimento e sviluppo applicativo Angular ",
            "Sviluppo applicativo in React con tecnologia GraphQL",
            "Acquisizione certificazione project management ISIPM"
        ],
        description: 'Durante questa esperienza ho lavorato principalmente come Frontend Developer, utilizzando Angular e React ed esplorando l\'uso di GraphQL. Ho inoltre conseguito la certificazione ISIPM per acquisire una solida base di Project Management, indispensabile per operare in contesti progettuali complessi. Mi sono prevalentemente dedicato al settore Waste Management, inizialmente nella Business Unit di Viasat e successivamente presso Greenext.',
        skillAquiredList: []
    },
    {
        id: 2,
        type: 'work',
        companyName: 'Red-V - Ennova Researh',
        role: 'Junior Software Engineer',
        dateStart: 'Sep 15',
        dateStartTime: '2015-09-15',
        dateEnd: 'Sep 21',
        dateEndTime: '2021-09-01',
        date: '2015 - 2021',
        skillAquiredList: [
            { name: 'JAVA' },
            { name: 'Hibernate' }

        ],
        experiencesList: [
            'Sviluppo nuove funzionalità e mantenimento prodotto Digital Signage',
            'Sviluppo applicazioni per SmartTV: Samsung (Tizen) e Toshiba',
            'Sviluppo applicazioni mobile Android: B2B e B2C',
            'Sviluppo applicazioni WebGis con VueJS e OpenLayer'
        ],

        description: 'Ho lavorato allo sviluppo di soluzioni Digital Signage, inizialmente su dispositivi Android e backend Java/JSP. Ho realizzato un client per monitor “embedded” (Toshiba e Samsung Tizen). Ho potuto lavorare anche ad altri progetti in prodotti e in consulenza con le seguenti tecnologie: Vue.js, React, Angular e Android (Kotlin)',
        longDescription: 'Durante questa esperienza lavorativa mi sono inizialmente occupato del settore Digital Signage, contribuendo allo sviluppo di un applicativo client per dispositivi Android e di un backend monolitico in Java, con interfacce JSP. Il focus principale riguardava la gestione e l\'ottimizzazione di immagini, video, font e altri asset destinati ai player, che ne curano la visualizzazione. In una seconda fase, ho lavorato alla realizzazione di un client per monitor “embedded” - display professionali dotati di API e browser personalizzati, pensati per applicazioni di digital signage. Oltre a perfezionare il prodotto, ho avuto modo di partecipare a diversi progetti, sfruttando tecnologie come Vue.js, React, Angular e sviluppando app mobile su Android (Kotlin).'
    },
    {
        id: 3,
        type: 'work',
        companyName: "IN's mercato",
        role: 'Work & study',
        dateStart: 'Sep 12',
        dateStartTime: '2012-10-1',
        dateEnd: 'Dec 14',
        dateEndTime: '2014-12-01',
        date: '2012 - 2014',
        skillAquiredList: [
            { name: 'Customer Service' },
            { name: 'Time Managment' }
        ],
        experiencesList: ['Inventario - Organizzazione Lavoro personale e dei collaboratori'],
        description: 'Durante gli anni di studio in ingegneria, per sostenere le spese universitarie, ho lavorato in un supermercato. Questa esperienza mi ha permesso fin da subito di sviluppare competenze fondamentali come l\'organizzazione, la leadership e il lavoro di squadra, qualità che continuo a valorizzare nel mio percorso professionale.'
    }
];
const listSkills: SkillItem[] = [
    //advanced
    {
        name: "Typescript",
        level: 90,
        levelTag: "high",
        type: 'PROGRAMMING_LANGUAGE'
    },
    {
        name: "Javascript",
        level: 90,
        levelTag: "high",
        type: 'PROGRAMMING_LANGUAGE'
    },
    {
        name: "HTML/CSS",
        level: 85,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "React",
        level: 85,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "Angular",
        level: 85,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "Vue",
        level: 85,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "JQuery",
        level: 85,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "OpenLayers/Leaflet",
        level: 80,
        levelTag: "high",
        type: 'WEB_DEVELOPMENT'
    },
    {
        name: "git",
        level: 80,
        levelTag: "high",
    },
    {
        name: "Java",
        level: 80,
        levelTag: "high",
        type: 'PROGRAMMING_LANGUAGE'
    },
    {
        name: "Spring Boot",
        level: 80,
        levelTag: "high",
        type: 'FRAMEWORKS'
    },
    {
        name: "Hibernate",
        level: 80,
        levelTag: "high",
        
    },
    //intermedie
    {
        name: "Kotlin",
        level: 60,
        levelTag: "medium",
        type: 'PROGRAMMING_LANGUAGE'
    },
    {
        name: "Android",
        level: 70,
        levelTag: "medium",
        type: 'MOBILE'
    },
    {
        name: "React Native",
        level: 70,
        levelTag: "medium",
        type: 'MOBILE'
    },
    {
        name: "Tizen OS",
        level: 65,
        levelTag: "medium",
        type: 'OTHER'
    },
    {
        name: "Framework7",
        level: 60,
        levelTag: "medium",
        type: 'FRAMEWORKS'
    },
    {
        name: "SQL",
        level: 60,
        levelTag: "medium",
        type: 'DATABASE_MANAGEMENT'
    },
    {
        name: "NodeJS",
        level: 60,
        levelTag: "medium"
    },
    // base
    {
        name: "Docker",
        level: 50,
        levelTag: "base"
    },
    {
        name: "Kubernates",
        level: 50,
        levelTag: "base"
    },
    {
        name: "Helm",
        level: 40,
        levelTag: "base"
    },
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
    fullName: 'Michele Scarpa',
    mainRoleTitle: 'Software engineer',
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