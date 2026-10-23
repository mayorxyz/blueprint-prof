import { motion } from "framer-motion";
import { aboutCopy, site } from "../content";
import { SheetHeading } from "../components/SheetHeading";
import { Reveal } from "../components/Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEffect, useRef, useState } from "react";

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <SheetHeading
          num="02"
          total={site.totalSheets}
          label={`SHEET 02 / ${String(site.totalSheets).padStart(2, "0")} — ABOUT`}
          title="About"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Portrait */}
          <div className="lg:col-span-4">
            <Reveal>
              <PortraitFrame />
            </Reveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            {aboutCopy.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-[var(--color-ink-dim)] leading-relaxed mb-5 max-w-[64ch]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--color-line)] bg-[var(--color-line)]">
              {aboutCopy.stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} reduced={reduced} />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-6">
              REVISION HISTORY
            </div>
            <div className="relative pl-6 border-l border-[var(--color-line)]">
              {aboutCopy.timeline.map((item, i) => (
                <div key={i} className="relative mb-6 last:mb-0">
                  <div
                    className={`absolute -left-[25px] top-1 w-2.5 h-2.5 border ${
                      item.latest
                        ? "bg-[var(--color-accent)] border-[var(--color-accent)]"
                        : "bg-[var(--color-bg)] border-[var(--color-line-strong)]"
                    }`}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[12px] text-[var(--color-accent)] font-medium">
                      {item.year}
                    </span>
                    <span className="font-mono text-[12px] text-[var(--color-ink-dim)]">
                      {item.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PortraitFrame() {
  return (
    <div className="relative border border-[var(--color-line-strong)] p-3 bg-[var(--color-bg-raised)]">
      {/* Corner ticks */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-line-strong)]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[var(--color-line-strong)]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[var(--color-line-strong)]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-line-strong)]" />

      <div className="aspect-[4/5] bg-[var(--color-bg-sunken)] flex items-center justify-center border border-[var(--color-line)]">
        <div className="text-center">
          <div className="font-heading text-5xl font-semibold text-[var(--color-ink-faint)] mb-2">
            MT
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
            PORTRAIT PLACEHOLDER
          </div>
        </div>
      </div>

      {/* Dimension label */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <div className="flex-1 h-px bg-[var(--color-line)]" />
        <span className="font-mono text-[9px] text-[var(--color-ink-faint)]">
          PORTRAIT · 4:5
        </span>
        <div className="flex-1 h-px bg-[var(--color-line)]" />
      </div>
    </div>
  );
}

function StatCard({ value, label, reduced }: { value: string; label: string; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-[var(--color-bg)] p-5 text-center">
      <motion.div
        className="font-mono text-3xl md:text-4xl font-medium text-[var(--color-ink)] mb-2"
        initial={reduced || visible ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {value}
      </motion.div>
      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
        {label}
      </div>
    </div>
  );
}
