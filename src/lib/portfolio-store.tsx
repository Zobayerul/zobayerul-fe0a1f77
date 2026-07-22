import { useEffect, useState } from "react";

export type Project = { id: string; img: string; title: string; tag: string; desc: string; url: string };
export type Testimonial = { id: string; name: string; role: string; text: string };

const PK = "portfolio.projects";
const TK = "portfolio.testimonials";
const AK = "portfolio.admin";
const XK = "portfolio.texts";

export const defaultProjects: Project[] = [
  { id: "1", img: "", title: "Tour Booking Platform", tag: "Travel", desc: "End-to-end tour and travel booking system.", url: "https://tour.betabig.com/" },
  { id: "2", img: "", title: "MediBook", tag: "Healthcare", desc: "Doctor appointment and clinic management app.", url: "https://medibook.betabig.com/" },
  { id: "3", img: "", title: "Payroll System", tag: "HR / SaaS", desc: "Employee payroll, salary and attendance manager.", url: "https://payroll.betabig.com/" },
  { id: "4", img: "", title: "Farm Management", tag: "AgriTech", desc: "Livestock, inventory and operations dashboard.", url: "https://farm.betabig.com/" },
  { id: "5", img: "", title: "Toolify", tag: "SaaS Tools", desc: "All-in-one productivity toolkit for teams.", url: "https://toolify.betabig.com/" },
  { id: "6", img: "", title: "Food Order", tag: "Ecommerce", desc: "Restaurant ordering and delivery platform.", url: "https://foodorder.betabig.com/" },
];

export const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "Rifat Ahmed", role: "Founder, Lumen Store", text: "Zobayerul delivered our ecommerce platform ahead of schedule and exceeded every expectation. Sales grew 3x in the first quarter." },
  { id: "2", name: "Sarah Khan", role: "CEO, EduStream", text: "From design to deployment, the entire process was smooth. The LMS he built powers thousands of students every day." },
  { id: "3", name: "Daniel Carter", role: "Product Lead, PulseCRM", text: "Best developer we've worked with. Clean code, smart architecture, and genuinely cares about the product outcomes." },
];

// Editable site text — keys grouped so the admin panel can show sections.
export const defaultTexts: Record<string, string> = {
  // Hero
  "hero.badge": "Available for new work",
  "hero.title.a": "Thoughtful digital products,",
  "hero.title.b": "built to grow",
  "hero.title.c": "with your business.",
  "hero.desc": "I'm Zobayerul — a web developer and ecommerce specialist partnering with founders and teams to ship clean, fast, and conversion-ready experiences.",
  "hero.cta.primary": "Start a project",
  "hero.cta.secondary": "View work",
  "hero.cta.whatsapp": "WhatsApp",
  "hero.badge.available": "Available",
  "hero.tag.eyebrow": "Web · Ecommerce",
  "hero.tag.role": "Developer",
  "hero.stat1.v": "100+",
  "hero.stat1.l": "Projects shipped",
  "hero.stat2.v": "60+",
  "hero.stat2.l": "Happy clients",
  "hero.stat3.v": "5+",
  "hero.stat3.l": "Years building",
  // Navbar
  "nav.cta": "Let's talk",
  // About
  "about.eyebrow": "About",
  "about.title.a": "A developer who treats your product",
  "about.title.b": "like his own",
  "about.p1": "Hi, I'm Zobayerul Islam. For the last five years I've helped founders, agencies and growing teams turn rough ideas into polished web and ecommerce products people actually love using.",
  "about.p2": "From quiet marketing sites to busy multi-vendor stores, I focus on the details that move the needle — clean code, fast load times, thoughtful UX, and design that builds trust on every screen.",
  // Services
  "services.eyebrow": "Services",
  "services.title.a": "Full-stack solutions for",
  "services.title.b": "modern businesses",
  "services.desc": "From idea to launch — production-grade development across web, mobile, and enterprise software.",
  // Contact
  "contact.eyebrow": "Get In Touch",
  "contact.title.a": "Let's build something",
  "contact.title.b": "remarkable",
  "contact.desc": "Have a project in mind? Send a message or reach out on WhatsApp — I usually reply within a few hours.",
  "contact.whatsapp": "+880 1968 634181",
  "contact.phone": "01968634181",
  "contact.email": "support@zobayerul.com",
  "contact.location": "Bangladesh — Worldwide",
  "contact.cta.chat": "Chat on WhatsApp",
  // Footer
  "footer.tagline": "Independent web developer & ecommerce specialist, partnering with ambitious brands worldwide to ship products that perform.",
  "footer.copyright": "Zobayerul Islam. All rights reserved.",
};

function read<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function write(k: string, v: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new Event("portfolio-store"));
}

export const store = {
  getProjects: () => read<Project[]>(PK, defaultProjects),
  setProjects: (v: Project[]) => write(PK, v),
  getTestimonials: () => read<Testimonial[]>(TK, defaultTestimonials),
  setTestimonials: (v: Testimonial[]) => write(TK, v),
  getTexts: () => read<Record<string, string>>(XK, {}),
  setTexts: (v: Record<string, string>) => write(XK, v),
  isLoggedIn: () => read<boolean>(AK, false),
  login: (u: string, p: string) => {
    if (u === "Shishir" && p === "#Zobayerul192030") { write(AK, true); return true; }
    return false;
  },
  logout: () => write(AK, false),
};

export function useStore<T>(getter: () => T): T {
  const [v, setV] = useState<T>(getter);
  useEffect(() => {
    setV(getter());
    const fn = () => setV(getter());
    window.addEventListener("portfolio-store", fn);
    window.addEventListener("storage", fn);
    return () => { window.removeEventListener("portfolio-store", fn); window.removeEventListener("storage", fn); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}

// Read one text value (with SSR-safe default) and re-render on updates.
export function useText(key: string): string {
  const [v, setV] = useState<string>(defaultTexts[key] ?? "");
  useEffect(() => {
    const get = () => {
      const overrides = store.getTexts();
      return overrides[key] ?? defaultTexts[key] ?? "";
    };
    setV(get());
    const fn = () => setV(get());
    window.addEventListener("portfolio-store", fn);
    window.addEventListener("storage", fn);
    return () => { window.removeEventListener("portfolio-store", fn); window.removeEventListener("storage", fn); };
  }, [key]);
  return v;
}

// Inline editable-text component. Renders the current value for `id`.
export function T({ id }: { id: string }) {
  const v = useText(id);
  return <>{v}</>;
}
