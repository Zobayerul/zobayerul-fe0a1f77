import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Project = { id: string; img: string; title: string; tag: string; desc: string; url: string };
export type Testimonial = { id: string; name: string; role: string; text: string };
export type Education = { id: string; degree: string; year: string; institute: string; status: string };



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

export const defaultEducation: Education[] = [
  { id: "1", degree: "Honors — Political Science", year: "2024", institute: "Dhaka University", status: "Completed" },
  { id: "2", degree: "H.S.C — Humanities", year: "2019", institute: "Gazipur Cantonment College", status: "Completed" },
  { id: "3", degree: "S.S.C — Business Studies", year: "2017", institute: "KamarJuri Yousuf Ali High School", status: "Completed" },
];

export const defaultTexts: Record<string, string> = {
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
  "nav.cta": "Let's talk",
  "about.eyebrow": "About",
  "about.title.a": "A developer who treats your product",
  "about.title.b": "like his own",
  "about.p1": "Hi, I'm Zobayerul Islam. For the last five years I've helped founders, agencies and growing teams turn rough ideas into polished web and ecommerce products people actually love using.",
  "about.p2": "From quiet marketing sites to busy multi-vendor stores, I focus on the details that move the needle — clean code, fast load times, thoughtful UX, and design that builds trust on every screen.",
  "education.eyebrow": "Education",
  "education.title.a": "Academic",
  "education.title.b": "background",
  "education.label.year": "Passing year:",
  "education.label.institute": "Institute:",
  "services.eyebrow": "Services",
  "services.title.a": "Full-stack solutions for",
  "services.title.b": "modern businesses",
  "services.desc": "From idea to launch — production-grade development across web, mobile, and enterprise software.",
  "contact.eyebrow": "Get In Touch",
  "contact.title.a": "Let's build something",
  "contact.title.b": "remarkable",
  "contact.desc": "Have a project in mind? Send a message or reach out on WhatsApp — I usually reply within a few hours.",
  "contact.whatsapp": "+880 1968 634181",
  "contact.phone": "01968634181",
  "contact.email": "support@zobayerul.com",
  "contact.location": "Bangladesh — Worldwide",
  "contact.cta.chat": "Chat on WhatsApp",
  "footer.tagline": "Independent web developer & ecommerce specialist, partnering with ambitious brands worldwide to ship products that perform.",
  "footer.copyright": "Zobayerul Islam. All rights reserved.",
};

export const defaultEducationEyebrow = "Education";

export type Spacing = { t: number; b: number };
export type Seo = { title: string; description: string; keywords: string; ogImage: string };
export type Settings = { spacing: Record<string, Spacing>; css: string; seo: Seo };

export const SECTIONS: { id: string; label: string }[] = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "services", label: "Services" },
  { id: "why", label: "Why choose me" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const defaultSettings: Settings = {
  spacing: {},
  css: "",
  seo: {
    title: "Zobayerul Islam — Web Developer & Ecommerce Expert",
    description:
      "Zobayerul Islam — Web Developer & Ecommerce Expert building modern websites, mobile apps, CRM, ERP and custom software for growing businesses.",
    keywords: "web developer, ecommerce expert, shopify, react developer, Bangladesh",
    ogImage: "",
  },
};

// In-memory cache, hydrated from Supabase on load.
type Cache = { projects: Project[]; testimonials: Testimonial[]; education: Education[]; texts: Record<string, string>; settings: Settings };
const cache: Cache = { projects: defaultProjects, testimonials: defaultTestimonials, education: defaultEducation, texts: {}, settings: defaultSettings };
let loaded = false;

const emit = () => { if (typeof window !== "undefined") window.dispatchEvent(new Event("portfolio-store")); };

async function loadAll() {
  const { data } = await supabase.from("site_content").select("key,value");
  if (data) {
    for (const row of data) {
      if (row.key === "projects" && Array.isArray(row.value)) cache.projects = row.value as Project[];
      else if (row.key === "testimonials" && Array.isArray(row.value)) cache.testimonials = row.value as Testimonial[];
      else if (row.key === "education" && Array.isArray(row.value)) cache.education = row.value as Education[];
      else if (row.key === "texts" && row.value && typeof row.value === "object") cache.texts = row.value as Record<string, string>;
      else if (row.key === "settings" && row.value && typeof row.value === "object") cache.settings = { ...defaultSettings, ...(row.value as Settings) };
    }
  }
  loaded = true;
  emit();
}

async function saveKey(key: "projects" | "testimonials" | "education" | "texts" | "settings", value: unknown) {
  await supabase.from("site_content").upsert({ key, value: value as never, updated_at: new Date().toISOString() });
}

if (typeof window !== "undefined") {
  loadAll();
  // Realtime cross-browser sync
  supabase
    .channel("site_content_changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, (payload) => {
      const row = (payload.new ?? payload.old) as { key: string; value: unknown } | null;
      if (!row) return;
      if (row.key === "projects") cache.projects = (row.value as Project[]) ?? defaultProjects;
      else if (row.key === "testimonials") cache.testimonials = (row.value as Testimonial[]) ?? defaultTestimonials;
      else if (row.key === "education") cache.education = (row.value as Education[]) ?? defaultEducation;
      else if (row.key === "texts") cache.texts = (row.value as Record<string, string>) ?? {};
      else if (row.key === "settings") cache.settings = { ...defaultSettings, ...((row.value as Settings) ?? {}) };
      emit();
    })
    .subscribe();
}

let authed = false;
if (typeof window !== "undefined") {
  supabase.auth.getSession().then(({ data }) => { authed = !!data.session; emit(); });
  supabase.auth.onAuthStateChange((_e, session) => { authed = !!session; emit(); });
}


export const store = {
  isLoaded: () => loaded,
  getProjects: () => cache.projects,
  setProjects: (v: Project[]) => { cache.projects = v; emit(); saveKey("projects", v); },
  getTestimonials: () => cache.testimonials,
  setTestimonials: (v: Testimonial[]) => { cache.testimonials = v; emit(); saveKey("testimonials", v); },
  getEducation: () => cache.education,
  setEducation: (v: Education[]) => { cache.education = v; emit(); saveKey("education", v); },
  getTexts: () => cache.texts,
  setTexts: (v: Record<string, string>) => { cache.texts = v; emit(); saveKey("texts", v); },
  getSettings: () => cache.settings,
  setSettings: (v: Settings) => { cache.settings = v; emit(); saveKey("settings", v); },
  isLoggedIn: () => authed,
  login: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return false;
    authed = true;
    emit();
    return true;
  },
  logout: async () => { await supabase.auth.signOut(); authed = false; emit(); },

};

const defaultsFor: Record<string, unknown> = {};

export function useStore<T>(getter: () => T): T {
  // Always render the SSR/default snapshot first, then swap after mount to avoid hydration mismatch.
  const [v, setV] = useState<T>(() => {
    const g = getter as unknown as () => T;
    if (g === (store.getProjects as unknown)) return defaultProjects as unknown as T;
    if (g === (store.getTestimonials as unknown)) return defaultTestimonials as unknown as T;
    if (g === (store.getEducation as unknown)) return defaultEducation as unknown as T;
    if (g === (store.getSettings as unknown)) return defaultSettings as unknown as T;
    return getter();
  });
  useEffect(() => {
    setV(getter());
    const fn = () => setV(getter());
    window.addEventListener("portfolio-store", fn);
    return () => { window.removeEventListener("portfolio-store", fn); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}

export function useText(key: string): string {
  const [v, setV] = useState<string>(defaultTexts[key] ?? "");
  useEffect(() => {
    const get = () => cache.texts[key] ?? defaultTexts[key] ?? "";
    setV(get());
    const fn = () => setV(get());
    window.addEventListener("portfolio-store", fn);
    return () => { window.removeEventListener("portfolio-store", fn); };
  }, [key]);
  return v;
}


export function T({ id }: { id: string }) {
  const v = useText(id);
  return <>{v}</>;
}
