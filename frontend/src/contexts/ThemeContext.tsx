// import { createContext, useState, useEffect, type ReactNode } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//     theme: Theme;
//     toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//     theme: "light",
//     toggleTheme: () => { },
// });

// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     const [theme, setTheme] = useState<Theme>(
//         (localStorage.getItem("theme") as Theme) || "light"
//     );

//     useEffect(() => {
//         document.documentElement.setAttribute("data-theme", theme);
//         localStorage.setItem("theme", theme);
//     }, [theme]);

//     const toggleTheme = () =>
//         setTheme(prev => (prev === "light" ? "dark" : "light"));

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };












import { createContext, useState, useEffect, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(
        (localStorage.getItem("theme") as Theme) || "system"
    );

    const applyTheme = (currentTheme: Theme) => {
        if (currentTheme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
        } else {
            document.documentElement.setAttribute("data-theme", currentTheme);
        }
    };

    // 🔥 FIX #1 — page load par bhi theme apply karo
    useEffect(() => {
        applyTheme(theme);
    }, []);

    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const listener = () => applyTheme("system");

            mq.addEventListener("change", listener);
            return () => mq.removeEventListener("change", listener);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
