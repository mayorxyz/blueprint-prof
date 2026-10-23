import { useState } from "react";
import { stackGroups, site } from "../content";
import { SheetHeading } from "../components/SheetHeading";
import { Reveal } from "../components/Reveal";

export function Stack() {
  return (
    <section id="stack" className="relative px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <SheetHeading
          num="03"
          total={site.totalSheets}
          label={`SHEET 03 / ${String(site.totalSheets).padStart(2, "0")} — STACK & CAPABILITIES`}
          title="Stack & Capabilities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stackGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.1}>
              <StackGroup group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackGroup({ group }: { group: typeof stackGroups[number] }) {
  return (
    <div className="border border-[var(--color-line)] bg-[var(--color-bg-raised)] corner-ticks">
      {/* Tab header */}
      <div className="px-4 py-2.5 border-b border-[var(--color-line)] bg-[var(--color-bg-sunken)]">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
          {group.title}
        </span>
      </div>
      {/* Skills */}
      <div className="p-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillChip key={skill.name} name={skill.name} note={skill.note} />
        ))}
      </div>
    </div>
  );
}

function SkillChip({ name, note }: { name: string; note: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <span
        className={`inline-block font-mono text-[11px] px-2.5 py-1.5 border transition-colors cursor-default ${
          hovered
            ? "border-[var(--color-accent)] text-[var(--color-accent)]"
            : "border-[var(--color-line)] text-[var(--color-ink-dim)]"
        }`}
      >
        {name}
      </span>
      {hovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 whitespace-nowrap">
          <div className="font-mono text-[10px] px-2 py-1 bg-[var(--color-bg-sunken)] border border-[var(--color-line-strong)] text-[var(--color-ink-dim)]">
            {note}
          </div>
          {/* Leader line */}
          <div className="w-px h-2 bg-[var(--color-accent)] mx-auto" />
        </div>
      )}
    </div>
  );
}
