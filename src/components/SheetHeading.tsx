import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface SheetHeadingProps {
  num: string;
  total: number;
  label: string;
  title: string;
}

export function SheetHeading({ num, total, label, title }: SheetHeadingProps) {
  const reduced = useReducedMotion();

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
          {label}
        </span>
        {!reduced && (
          <motion.div
            className="flex-1 h-px bg-[var(--color-line)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
        )}
        {reduced && <div className="flex-1 h-px bg-[var(--color-line)]" />}
      </div>
      <h2 className="font-heading font-semibold text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)]">
        {title}
      </h2>
    </div>
  );
}
