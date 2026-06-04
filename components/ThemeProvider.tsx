"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "a" | "b";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("a");

  // Load from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("dristy-theme") as Theme;
    if (savedTheme === "a" || savedTheme === "b") {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "a");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "a" ? "b" : "a";
    setTheme(newTheme);
    localStorage.setItem("dristy-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
