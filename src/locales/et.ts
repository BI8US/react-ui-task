import { TEXTS as EN_TEXTS } from "./en";

type TranslationType = typeof EN_TEXTS;

export const TEXTS: TranslationType = {
    auth: {
        companyName: "React Demo App",
        welcome: "Tere tulemast tagasi",
        createAccount: "Loo konto",
        noAccount: "Pole veel kontot?",
        alreadyHaveAccount: "Konto on juba olemas?",
        register: "Registreeru",
        login: "Logi sisse",
        forgotPassword: "Unustasid parooli?",
        signIn: "Logi sisse",
        labels: {
            name: "Täisnimi",
            email: "E-post",
            password: "Parool",
            confirmPassword: "Kinnita parool",
        },
        resetPassword: "Taasta parool",
        resetDesc: "Sisesta oma e-posti aadress ja me saadame sulle lingi parooli taastamiseks.",
        sendResetLink: "Saada taastamislink",
        backToLogin: "Tagasi sisselogimisse",
        resetSuccess: "Kontrolli e-posti! Saatsime parooli taastamise lingi.",
        emailSent: "E-kiri saadetud",
    },
    validation: {
        nameRequired: "Nimi on kohustuslik",
        emailRequired: "E-post on kohustuslik",
        emailInvalid: "Palun sisesta korrektne e-posti aadress",
        passwordRequired: "Parool on kohustuslik",
        passwordMinLength: "Parool peab olema vähemalt 6 tähemärki",
        passwordsDoNotMatch: "Paroolid ei kattu",
    },
    nav: {
        logo: "DEMO",
        home: "Avaleht",
        coin: "Münt",
        snake: "Ussimäng",
        wheel: "Õnneratas",
        logout: "Logi välja",
    },
    pages: {
        home: {
            title: "Tere tulemast Demosse",
            subtitle:
                "See on testülesanne. Kuna konkreetseid sisunõudeid polnud, otsustasin lõbutseda ja luua interaktiivsed minirakendused.",
            cards: {
                coin: {
                    title: "Otsustaja",
                    desc: "Ei suuda otsustada? Viska münti.",
                },
                snake: {
                    title: "Retro Ussimäng",
                    desc: "Klassikaline mäng aja veetmiseks.",
                },
                wheel: {
                    title: "Õnneratas",
                    desc: "Juhuslik valik sinu variantidest.",
                },
            },
        },
        coin: {
            title: "Mündivise",
            content: "Kas on raske valikut teha? Las münt otsustab.",
            flipping: "Viskan...",
            flip: "Viska münti",
            heads: "KULL",
            tails: "KIRI",
        },
        snake: {
            title: "Retro Ussimäng",
            score: "SKOOR",
            best: "REKORD",
            start: "Alusta mängu",
            again: "Proovi uuesti",
            gameOver: "Mäng läbi!",
            controls: "Liikumine: WASD, Nooled või Nupud",
        },
        wheel: {
            title: "Õnneratas",
            desc: "Lisa valikud ja nende kaalud (W), et muuta tõenäosusi.",
            winner: "Võitja",
            addOption: "Lisa valik",
            inputs: {
                label: "Nimi",
            },
            luck: "Edu!",
            spin: "KEERUTA",
        },
    },
};
