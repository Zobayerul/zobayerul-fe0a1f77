import { useEffect, useState } from "react";

/** Thin accent progress bar + subtle cursor glow. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const fn = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full bg-accent origin-left transition-[width] duration-150 ease-out"
        style={{ width: `${p}%`, boxShadow: "0 0 12px var(--accent)" }}
      />
    </div>
  );
}
