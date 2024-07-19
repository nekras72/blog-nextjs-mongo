"use client"
import { useContext } from 'react';
import styles from './themeToggler.module.css';
import Image from 'next/image';
import ThemeContext from '@/context/ThemeContext';

const ThemeToggler = () => {

    const { theme, toggle } = useContext(ThemeContext);

    return (
        <div
        className={styles.container}
        onClick={toggle}
        style={theme === "dark" ? { background: "white" } : { background: "#0f172a" }}
        >
            <Image
                src="/moon.png"
                alt="moon"
                width={14}
                height={14}
            />
            <div
                className={styles.circle}
                style={theme === "dark" ? { right: "2px", background: "#0f172a" } : { left: "2px", background: "white" }}
            />
            <Image
                src="/sun.png"
                alt="sun"
                width={14}
                height={14}
            />
        </div >
    )
};

export default ThemeToggler
