import { useState, useEffect, useCallback } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable
  }
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      document.body.classList.add("light");
    } else {
      root.classList.remove("light");
      document.body.classList.remove("light");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
