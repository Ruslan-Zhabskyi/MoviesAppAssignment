import React, { createContext, useState, useEffect } from "react";

interface LanguageContextInterface {
    language: string;
    toggleLanguage: () => void;
}

const initialContextState: LanguageContextInterface = {
    language: "en-US",
    toggleLanguage: () => {}
};

export const LanguageContext = createContext<LanguageContextInterface>(initialContextState);

const LanguageContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-US');

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en-US' ? 'uk-UA' : 'en-US'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContextProvider;