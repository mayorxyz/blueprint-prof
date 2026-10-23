import { useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Crosshair() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (reduced || isTouch) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [reduced, isTouch]);

  if (reduced || isTouch || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{ left: pos.x + 16, top: pos.y + 16 }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Crosshair mark */}
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-[var(--color-accent)] opacity-60">
          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" />
          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        {/* Coordinates */}
        <span className="absolute left-5 top-0 font-mono text-[9px] text-[var(--color-ink-faint)] whitespace-nowrap">
          X {String(pos.x).padStart(4, "0")} Y {String(pos.y).padStart(4, "0")}
        </span>
      </div>
    </div>
  );
}
