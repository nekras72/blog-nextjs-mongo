"use client";
import { createContext, Dispatch, useEffect, useState } from "react";

interface IChildren {
    children: React.ReactNode | React.ReactNode[];
}

type ThemeType = "light" | "dark";

interface IThemeContextValue {
    theme: ThemeType,
    toggle: () => void,
}

const InitialThemeContextValue: IThemeContextValue = {
    theme: 'light', toggle: () => undefined
};

const ThemeContext = createContext<IThemeContextValue>(InitialThemeContextValue);

const getFromLocalStorage = (): ThemeType => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem('odb-theme');
        if (value === "light" || value === "dark") {
            return value;
        }
    }
    return 'light';
};

const setToLocalStorage = (type:ThemeType) => {
    localStorage.setItem('odb-theme', type);
}

export const ThemeContextProvider: React.FC<IChildren> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>(() => getFromLocalStorage());

    const contextValue = {
        theme,
        toggle: () => setTheme(theme => theme === 'light' ? 'dark' : 'light')
    };

    useEffect(() => {
        setToLocalStorage(theme);
    },[theme]);
    return <ThemeContext.Provider value={contextValue}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeContext;