import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none ${
        scrolled ? "py-2.5" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display text-lg sm:text-xl">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-sans font-bold">
              ZI
            </span>
            <span className="tracking-tight">Zobayerul <span className="italic text-accent">Islam</span></span>
          </a>

          <ul className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden lg:inline-flex items-center px-5 py-2 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-all"
          >
            Let's talk
          </a>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>

        {open && (
          <div className="pointer-events-auto lg:hidden mt-2 glass-strong rounded-2xl p-5 animate-fade-in">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-foreground/80 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-center mt-2 px-5 py-2.5 rounded-full bg-foreground text-background font-medium"
              >
                Let's talk
              </a>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
