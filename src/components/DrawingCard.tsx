import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { TitleBlock } from "./TitleBlock";
import type { Project } from "../content";

interface DrawingCardProps {
  project: Project;
  reversed?: boolean;
}

function StatusDot({ status }: { status: string }) {
  const color =
    status === "LIVE"
      ? "bg-[var(--color-ok)]"
      : status === "BETA"
      ? "bg-[var(--color-accent)]"
      : "bg-[var(--color-ink-faint)]";
  return <span className={`inline-block w-2 h-2 rounded-full ${color} mr-1.5`} />;
}

export function DrawingCard({ project, reversed = false }: DrawingCardProps) {
  const reduced = useReducedMotion();

  const imageFallback = (
    <div className="w-full aspect-[16/10] bg-[var(--color-bg-sunken)] border border-[var(--color-line)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-line)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
        </svg>
      </div>
      <div className="text-center z-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-2">
          PREVIEW
        </div>
        <div className="font-heading text-2xl font-semibold text-[var(--color-ink-faint)]">
          {project.title}
        </div>
      </div>
      {/* Browser chrome */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[var(--color-bg-raised)] border-b border-[var(--color-line)] flex items-center px-3 gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[var(--color-ink-faint)] opacity-40" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-ink-faint)] opacity-40" />
        <span className="w-2 h-2 rounded-full bg-[var(--color-ink-faint)] opacity-40" />
        <span className="ml-3 font-mono text-[9px] text-[var(--color-ink-faint)] truncate">
          {project.liveUrl || project.codeUrl || "localhost"}
        </span>
      </div>
    </div>
  );

  return (
    <motion.article
      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 border border-[var(--color-line)] p-4 md:p-6 bg-[var(--color-bg-raised)] relative corner-ticks group hover:border-[var(--color-line-strong)] transition-colors duration-150`}
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Giant background numeral */}
      <span className="absolute top-4 right-4 font-mono text-[5rem] md:text-[7rem] font-bold text-[var(--color-ink-faint)] opacity-[0.06] leading-none select-none pointer-events-none">
        {project.num}
      </span>

      <div className={`${reversed ? "lg:order-2" : ""}`}>
        {imageFallback}
      </div>

      <div className={`flex flex-col justify-between ${reversed ? "lg:order-1" : ""}`}>
        <div>
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--color-ink)] mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-ink-dim)] mb-3 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono text-[10px] uppercase tracking-[0.08em] px-2 py-1 border border-[var(--color-line)] text-[var(--color-ink-dim)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <TitleBlock
            drawing={project.title.toUpperCase()}
            stack={project.stack.slice(0, 3).join(", ").toUpperCase()}
            status={project.status}
            year={project.year}
            rev={project.rev}
          />
          <div className="flex items-center gap-4 mt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent)] hover:underline"
              >
                <StatusDot status={project.status} />
                LIVE ↗
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-dim)] hover:text-[var(--color-accent)]"
              >
                CODE ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
