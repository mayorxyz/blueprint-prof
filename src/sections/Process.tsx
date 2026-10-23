import { motion } from "framer-motion";
import { processSteps, site } from "../content";
import { SheetHeading } from "../components/SheetHeading";
import { Reveal } from "../components/Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <SheetHeading
          num="04"
          total={site.totalSheets}
          label={`SHEET 04 / ${String(site.totalSheets).padStart(2, "0")} — PROCESS`}
          title="How I Build"
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[52px] left-0 right-0 h-px bg-[var(--color-line)]">
              {!reduced && (
                <motion.div
                  className="absolute inset-0 bg-[var(--color-accent)] origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {reduced && <div className="absolute inset-0 bg-[var(--color-accent)]" />}
            </div>

            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.12}>
                  <ProcessStep step={step} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-[11px] w-px bg-[var(--color-line)]">
              {!reduced && (
                <motion.div
                  className="absolute inset-0 bg-[var(--color-accent)] origin-top"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {reduced && <div className="absolute inset-0 bg-[var(--color-accent)]" />}
            </div>

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.1}>
                  <div className="relative">
                    <div className="absolute -left-8 top-2 w-[22px] h-[22px] border border-[var(--color-accent)] bg-[var(--color-bg)] flex items-center justify-center">
                      <span className="font-mono text-[9px] text-[var(--color-accent)]">{step.num}</span>
                    </div>
                    <div className="border border-[var(--color-line)] p-4 bg-[var(--color-bg-raised)]">
                      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)] mb-2">
                        {step.title}
                      </div>
                      <p className="font-mono text-[12px] text-[var(--color-ink-dim)] leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step }: { step: typeof processSteps[number] }) {
  return (
    <div className="border border-[var(--color-line)] bg-[var(--color-bg-raised)] p-4 relative corner-ticks">
      {/* Step number circle */}
      <div className="absolute -top-3 left-4 w-6 h-6 border border-[var(--color-accent)] bg-[var(--color-bg)] flex items-center justify-center">
        <span className="font-mono text-[9px] text-[var(--color-accent)]">{step.num}</span>
      </div>
      <div className="mt-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)] mb-2">
          {step.title}
        </div>
        <p className="font-mono text-[11px] text-[var(--color-ink-dim)] leading-relaxed">
          {step.text}
        </p>
      </div>
    </div>
  );
}
