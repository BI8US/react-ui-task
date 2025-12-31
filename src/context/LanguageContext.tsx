import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import { TEXTS as EN_TEXTS } from "../locales/en";
import { TEXTS as ET_TEXTS } from "../locales/et";

type Language = "en" | "et";

type TextsType = typeof EN_TEXTS;

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    TEXTS: TextsType;
}

const translations: Record<Language, TextsType> = {
    en: EN_TEXTS,
    et: ET_TEXTS,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem("language") as Language;
        if (translations[saved]) return saved;

        if (navigator.language.startsWith("et")) return "et";

        return "en";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => {
            if (prev === "en") return "et";
            if (prev === "et") return "en";
            return "en";
        });
    };

    return (
        <LanguageContext.Provider
            value={{ language, toggleLanguage, TEXTS: translations[language] }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};
