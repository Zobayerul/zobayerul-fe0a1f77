import { useEffect, useState } from "react";

export type Project = { id: string; img: string; title: string; tag: string; desc: string; url: string };
export type Testimonial = { id: string; name: string; role: string; text: string };

const PK = "portfolio.projects";
const TK = "portfolio.testimonials";
const AK = "portfolio.admin";

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
