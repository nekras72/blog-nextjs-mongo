"use client"

import ThemeContext from "@/context/ThemeContext";
import { useContext, useEffect, useState } from "react";

interface IChildren {
    children: React.ReactNode | React.ReactNode[];
}

const ThemeProvider: React.FC<IChildren> = ({ children }) => {
    const { theme } = useContext(ThemeContext);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])
    if (isMounted) return (
        <div className={theme}>
            {children}
        </div>
    )
};

export default ThemeProvider;