import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, navItems } from "../content";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();

  const sectionIds = navItems.map((n) => n.href.replace("#", ""));
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
    }
  }, [reduced]);

  return (
    <div className="relative min-h-screen">
      {/* Blueprint grid background */}
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="blueprint-vignette" aria-hidden="true" />

      {/* Sheet frame */}
      <div className="fixed inset-[6px] md:inset-[12px] border border-[var(--color-line)] pointer-events-none z-10" aria-hidden="true">
        {/* Tick marks along edges */}
        <FrameTicks />
      </div>

      {/* Rulers (desktop only) */}
      <Rulers />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 md:px-8 transition-colors duration-200 ${
          scrolled ? "bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-line)]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Back to top"
          >
            <span className="w-3 h-3 bg-[var(--color-accent)] inline-block" />
            {site.shortName}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`font-mono text-[11px] uppercase tracking-[0.12em] transition-colors relative pb-1 ${
                  active === item.href.replace("#", "")
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-ink-dim)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span className="text-[var(--color-ink-faint)] mr-1">{item.num}</span>
                {item.label}
                {active === item.href.replace("#", "") && (
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                    layoutId="nav-underline"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors hidden sm:block"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "DARK" : "LIGHT"}
            </button>

            {/* Status chip */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ok)] pulse-dot" />
              AVAILABLE
            </div>

            {/* Resume button */}
            <a
              href={site.resumeUrl}
              className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 border border-[var(--color-line-strong)] text-[var(--color-ink-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              RESUME ↓
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`w-5 h-px bg-[var(--color-ink)] transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`w-5 h-px bg-[var(--color-ink)] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-px bg-[var(--color-ink)] transition-transform ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-bg)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="font-heading text-3xl font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <span className="font-mono text-sm text-[var(--color-ink-faint)] mr-3">{item.num}</span>
                {item.label}
              </motion.button>
            ))}
            <button
              onClick={toggle}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mt-8"
            >
              {theme === "dark" ? "SWITCH TO LIGHT" : "SWITCH TO DARK"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-[1] pt-14">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FrameTicks() {
  const ticks = [];
  const spacing = 40;
  // Top and bottom ticks
  for (let i = 0; i < 40; i++) {
    ticks.push(
      <div key={`t-${i}`} className="absolute bg-[var(--color-line)]" style={{ left: `${(i / 40) * 100}%`, top: 0, width: 1, height: 4 }} />,
      <div key={`b-${i}`} className="absolute bg-[var(--color-line)]" style={{ left: `${(i / 40) * 100}%`, bottom: 0, width: 1, height: 4 }} />
    );
  }
  // Left and right ticks
  for (let i = 0; i < 25; i++) {
    ticks.push(
      <div key={`l-${i}`} className="absolute bg-[var(--color-line)]" style={{ top: `${(i / 25) * 100}%`, left: 0, width: 4, height: 1 }} />,
      <div key={`r-${i}`} className="absolute bg-[var(--color-line)]" style={{ top: `${(i / 25) * 100}%`, right: 0, width: 4, height: 1 }} />
    );
  }
  return <>{ticks}</>;
}

function Rulers() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden lg:block fixed z-20 pointer-events-none" aria-hidden="true">
      {/* Top ruler */}
      <div className="fixed top-14 left-[12px] right-[12px] h-4 border-b border-[var(--color-line)] flex items-end overflow-hidden">
        {Array.from({ length: 13 }, (_, i) => (
          <span
            key={i}
            className="font-mono text-[7px] text-[var(--color-ink-faint)] absolute"
            style={{ left: `${(i / 12) * 100}%` }}
          >
            {i * 100}
          </span>
        ))}
        {/* Scroll indicator */}
        <div
          className="absolute bottom-0 w-2 h-2 bg-[var(--color-accent)] transition-all duration-100"
          style={{ left: `${scrollPct}%` }}
        />
      </div>
      {/* Left ruler */}
      <div className="fixed top-14 left-[12px] bottom-[12px] w-4 border-r border-[var(--color-line)] flex flex-col justify-between items-end py-2 overflow-hidden">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="font-mono text-[7px] text-[var(--color-ink-faint)]" style={{ writingMode: "vertical-rl" }}>
            {i * 100}
          </span>
        ))}
      </div>
    </div>
  );
}



function Footer() {
  return (
    <footer className="relative z-[1] border-t border-[var(--color-line)] bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-3">
              CONTACT
            </div>
            <a
              href={`mailto:${site.email}`}
              className="font-heading text-lg text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            >
              {site.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-3">
              LINKS
            </div>
            <div className="flex flex-col gap-2">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] transition-colors">
                LinkedIn ↗
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[12px] text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] transition-colors">
                GitHub ↗
              </a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-3">
              NAVIGATION
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-[12px] text-[var(--color-ink-dim)] hover:text-[var(--color-accent)] transition-colors"
            >
              BACK TO TOP ↑
            </button>
          </div>
        </div>

        {/* Revision strip */}
        <div className="border-t border-[var(--color-line)] pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
            {site.revision}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
