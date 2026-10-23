import { motion } from "framer-motion";
import { heroCopy, site } from "../content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Reveal } from "../components/Reveal";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-8 py-20"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Sheet label with dimension line */}
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] whitespace-nowrap">
              {heroCopy.sheetLabel}
            </span>
            <div className="flex-1 h-px bg-[var(--color-line)] relative">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-[var(--color-line-strong)] rotate-45" />
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: text content */}
          <div className="lg:col-span-7">
            <h1 className="font-heading font-semibold text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.03em] text-[var(--color-ink)] mb-6">
              <motion.span
                className="block"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {heroCopy.h1Line1}
              </motion.span>
              <motion.span
                className="block relative"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {heroCopy.h1Line2}
                {/* Amber underline on "ship" */}
                {!reduced && (
                  <motion.span
                    className="absolute bottom-1 left-0 h-[3px] bg-[var(--color-accent)]"
                    initial={{ width: 0 }}
                    animate={{ width: "3.2em" }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {reduced && (
                  <span className="absolute bottom-1 left-0 h-[3px] bg-[var(--color-accent)] w-[3.2em]" />
                )}
              </motion.span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-[var(--color-ink-dim)] max-w-[540px] leading-relaxed mb-8"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {heroCopy.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <a
                href="#work"
                className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium hover:translate-y-[-2px] transition-transform"
              >
                {heroCopy.ctaPrimary}
              </a>
              <a
                href={site.resumeUrl}
                className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-3 border border-[var(--color-line-strong)] text-[var(--color-ink-dim)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                {heroCopy.ctaSecondary}
              </a>
              <a
                href="#contact"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)] hover:text-[var(--color-accent)] transition-colors"
              >
                {heroCopy.ctaTertiary}
              </a>
            </motion.div>

            {/* Spec strip */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--color-line)] bg-[var(--color-line)]"
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {heroCopy.specStrip.map((spec) => (
                <div key={spec.label} className="bg-[var(--color-bg)] p-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-1">
                    {spec.label}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-dim)]">
                    {spec.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Technical drawing panel */}
          <div className="lg:col-span-5">
            <Reveal delay={0.3}>
              <HeroDrawing reduced={reduced} />
            </Reveal>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
            SCROLL ↓
          </span>
          {!reduced && (
            <motion.div
              className="w-px h-8 bg-[var(--color-line-strong)]"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}

function HeroDrawing({ reduced }: { reduced: boolean }) {
  return (
    <div className="border border-[var(--color-line-strong)] p-4 bg-[var(--color-bg-raised)] relative">
      {/* Corner registration marks */}
      <RegistrationMark className="absolute -top-1 -left-1" />
      <RegistrationMark className="absolute -top-1 -right-1" />
      <RegistrationMark className="absolute -bottom-1 -left-1" />
      <RegistrationMark className="absolute -bottom-1 -right-1" />

      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Technical drawing of system architecture"
        role="img"
      >
        {/* Isometric wireframe device */}
        <motion.g
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Main device body */}
          <motion.path
            d="M120 80 L280 80 L300 100 L300 220 L140 220 L120 200 Z"
            stroke="var(--color-line-strong)"
            strokeWidth="1"
            fill="none"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Screen */}
          <motion.path
            d="M140 100 L270 100 L270 200 L140 200 Z"
            stroke="var(--color-ink-faint)"
            strokeWidth="0.5"
            fill="var(--color-bg-sunken)"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          />
          {/* Screen content lines */}
          <motion.path
            d="M155 120 L240 120 M155 135 L220 135 M155 150 L250 150 M155 165 L200 165 M155 180 L230 180"
            stroke="var(--color-line)"
            strokeWidth="0.5"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          {/* 3D depth lines */}
          <motion.path
            d="M120 80 L140 100 M280 80 L300 100 M120 200 L140 220"
            stroke="var(--color-line)"
            strokeWidth="0.5"
            strokeDasharray="4 2"
            initial={reduced ? {} : { opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.4, delay: 1 }}
          />
        </motion.g>

        {/* Callout lines and labels */}
        <motion.g
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {/* A: FRONTEND */}
          <motion.path
            d="M155 120 L80 60"
            stroke="var(--color-accent)"
            strokeWidth="0.75"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          />
          <text x="30" y="55" className="font-mono" fill="var(--color-accent)" fontSize="9" fontFamily="var(--font-mono)">
            A: FRONTEND
          </text>

          {/* B: API */}
          <motion.path
            d="M270 140 L350 100"
            stroke="var(--color-accent)"
            strokeWidth="0.75"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          />
          <text x="330" y="95" className="font-mono" fill="var(--color-accent)" fontSize="9" fontFamily="var(--font-mono)">
            B: API
          </text>

          {/* C: DATA */}
          <motion.path
            d="M200 200 L200 260"
            stroke="var(--color-accent)"
            strokeWidth="0.75"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          />
          <text x="175" y="278" className="font-mono" fill="var(--color-accent)" fontSize="9" fontFamily="var(--font-mono)">
            C: DATA
          </text>

          {/* D: DEPLOY */}
          <motion.path
            d="M300 160 L360 200"
            stroke="var(--color-accent)"
            strokeWidth="0.75"
            initial={reduced ? {} : { pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          />
          <text x="340" y="215" className="font-mono" fill="var(--color-accent)" fontSize="9" fontFamily="var(--font-mono)">
            D: DEPLOY
          </text>

          {/* Callout dots */}
          <circle cx="155" cy="120" r="2.5" fill="var(--color-accent)" />
          <circle cx="270" cy="140" r="2.5" fill="var(--color-accent)" />
          <circle cx="200" cy="200" r="2.5" fill="var(--color-accent)" />
          <circle cx="300" cy="160" r="2.5" fill="var(--color-accent)" />
        </motion.g>
      </svg>

      {/* Drawing label */}
      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)] text-center">
        FIG. 01 — SYSTEM ARCHITECTURE OVERVIEW
      </div>
    </div>
  );
}

function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className={className} aria-hidden="true">
      <circle cx="4" cy="4" r="3" fill="none" stroke="var(--color-line-strong)" strokeWidth="0.5" />
      <line x1="4" y1="0" x2="4" y2="8" stroke="var(--color-line-strong)" strokeWidth="0.5" />
      <line x1="0" y1="4" x2="8" y2="4" stroke="var(--color-line-strong)" strokeWidth="0.5" />
    </svg>
  );
}
