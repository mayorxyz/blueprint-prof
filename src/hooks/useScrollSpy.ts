import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset = 72): string {
  const [active, setActive] = useState(ids[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset + 100;
      let current = ids[0] || "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids, offset]);

  return active;
}
