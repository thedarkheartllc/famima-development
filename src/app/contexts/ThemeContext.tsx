"use client";

import { createContext, useContext, ReactNode } from "react";

// Simple context that doesn't actually manage theme state
// Just provides a placeholder for any components that might reference it
const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{}}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
