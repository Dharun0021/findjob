"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-context";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  onThemeChange?: () => void;
}

export function ThemeToggle({ onThemeChange }: ThemeToggleProps = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
    // Call the callback if provided (e.g., to close mobile menu)
    onThemeChange?.();
  };

  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-4 w-4" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4" />
    ) : (
      <Sun className="h-4 w-4" />
    );
  };

  const getTooltip = () => {
    if (theme === "light") return "Switch to dark mode";
    if (theme === "dark") return "Switch to system theme";
    return "Switch to light mode";
  };

  return (
    <motion.button
      onClick={cycleTheme}
      className="inline-flex items-center justify-center p-3 sm:p-2 rounded-lg navbar-link focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0"
      aria-label={getTooltip()}
      title={getTooltip()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-5 w-5 sm:h-4 sm:w-4"
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
}
