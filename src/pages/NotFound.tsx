import { Layout } from "../components/Layout";

export function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-4">
            SHEET NOT FOUND
          </div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-[var(--color-line)]" />
            <span className="font-heading text-6xl font-semibold text-[var(--color-ink)]">404</span>
            <div className="h-px w-16 bg-[var(--color-line)]" />
          </div>
          <p className="font-mono text-[12px] text-[var(--color-ink-dim)] mb-8 max-w-[40ch] mx-auto">
            The requested drawing does not exist in the archive. It may have been revised or removed.
          </p>
          <a
            href="/"
            className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] px-5 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium hover:translate-y-[-2px] transition-transform"
          >
            RETURN TO INDEX →
          </a>
        </div>
      </div>
    </Layout>
  );
}
