import { projects, moreProjects, site } from "../content";
import { SheetHeading } from "../components/SheetHeading";
import { DrawingCard } from "../components/DrawingCard";
import { Reveal } from "../components/Reveal";

export function Work() {
  return (
    <section id="work" className="relative px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <SheetHeading
          num="01"
          total={site.totalSheets}
          label={`SHEET 01 / ${String(site.totalSheets).padStart(2, "0")} — SELECTED WORK`}
          title="Selected Work"
        />

        <Reveal>
          <p className="text-[var(--color-ink-dim)] max-w-[64ch] mb-12 leading-relaxed">
            A selection of projects spanning web applications, machine learning systems, and trading infrastructure. Each built from specification to deployment.
          </p>
        </Reveal>

        {/* Project cards */}
        <div className="space-y-12 md:space-y-16 mb-16">
          {projects.map((project, i) => (
            <DrawingCard
              key={project.id}
              project={project}
              reversed={i % 2 === 1}
            />
          ))}
        </div>

        {/* More drawings index table */}
        <Reveal>
          <div className="border border-[var(--color-line)]">
            <div className="px-4 py-3 border-b border-[var(--color-line)] bg-[var(--color-bg-raised)]">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)]">
                MORE DRAWINGS — INDEX
              </span>
            </div>
            <div className="divide-y divide-[var(--color-line)]">
              {moreProjects.map((p) => (
                <a
                  key={p.name}
                  href={p.url || "#"}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[var(--color-accent-dim)] hover:border-l-2 hover:border-l-[var(--color-accent)] hover:pl-5 transition-all group"
                >
                  <span className="font-mono text-[12px] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                    {p.name}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-[var(--color-ink-faint)] hidden sm:inline">
                      {p.stack}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-ink-faint)]">
                      {p.year}
                    </span>
                    <span className="text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors">
                      →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
