"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
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
      className="inline-flex items-center justify-center p-2 rounded-lg navbar-link focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
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
      >
        {getIcon()}
      </motion.div>
    </motion.button>
  );
}
