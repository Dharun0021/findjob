"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  const linkClass = (active: boolean) =>
    cn(
      "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105",
      active ? "navbar-link-active" : "navbar-link"
    );

  const mobileLinkClass = (active: boolean) =>
    cn(
      "block px-4 py-3 text-base font-semibold transition-all duration-200",
      active ? "navbar-mobile-link-active" : "navbar-mobile-link"
    );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50 navbar border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - JobFinder brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-xl sm:text-2xl font-black navbar-brand transition-all duration-300 transform group-hover:scale-110">
                <span className="navbar-brand-accent">Job</span>Finder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={linkClass(isActive("/"))}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className={linkClass(isActive("/jobs"))}
              aria-current={isActive("/jobs") ? "page" : undefined}
            >
              Jobs
            </Link>
            <Link
              href="/saved"
              className={linkClass(isActive("/saved"))}
              aria-current={isActive("/saved") ? "page" : undefined}
            >
              Saved
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md navbar-link focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                opacity: { duration: 0.6 },
              }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1 sm:px-3 navbar-mobile-bg border-t"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  <Link
                    href="/"
                    className={mobileLinkClass(isActive("/"))}
                    aria-current={isActive("/") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                >
                  <Link
                    href="/jobs"
                    className={mobileLinkClass(isActive("/jobs"))}
                    aria-current={isActive("/jobs") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
                >
                  <Link
                    href="/saved"
                    className={mobileLinkClass(isActive("/saved"))}
                    aria-current={isActive("/saved") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Saved
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="navbar-mobile-link font-semibold text-base">
                      Theme
                    </span>
                    <div className="flex-1 flex justify-end">
                      <ThemeToggle
                        onThemeChange={() => setIsMobileMenuOpen(false)}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default SiteNav;
