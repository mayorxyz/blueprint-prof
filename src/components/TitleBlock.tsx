interface TitleBlockProps {
  drawing: string;
  stack: string;
  status: string;
  year: string;
  rev: string;
}

export function TitleBlock({ drawing, stack, status, year, rev }: TitleBlockProps) {
  const rows = [
    { label: "DRAWING", value: drawing },
    { label: "STACK", value: stack },
    { label: "STATUS", value: status },
    { label: "YEAR", value: year },
    { label: "REV", value: rev },
  ];

  return (
    <div className="border border-[var(--color-line)] font-mono text-[10px] uppercase tracking-[0.08em]">
      {rows.map((row, i) => (
        <div key={row.label} className={`flex ${i > 0 ? "border-t border-[var(--color-line)]" : ""}`}>
          <span className="px-2 py-1 text-[var(--color-ink-faint)] border-r border-[var(--color-line)] min-w-[60px]">
            {row.label}
          </span>
          <span className="px-2 py-1 text-[var(--color-ink-dim)] flex-1">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
