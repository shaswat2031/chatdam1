'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({ isDark: true, toggle: () => { } });

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true); // default dark

    useEffect(() => {
        const saved = localStorage.getItem('damchat-theme') ?? 'dark';
        const dark = saved === 'dark';
        setIsDark(dark);
        document.documentElement.setAttribute('data-theme', saved);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        const t = next ? 'dark' : 'light';
        localStorage.setItem('damchat-theme', t);
        document.documentElement.setAttribute('data-theme', t);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
