import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { WhyChooseMe } from "@/components/portfolio/WhyChooseMe";
import { Process } from "@/components/portfolio/Process";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { FAQ } from "@/components/portfolio/FAQ";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { WhatsAppFab } from "@/components/portfolio/WhatsAppFab";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { store, useStore, type Project, type Testimonial } from "@/lib/portfolio-store";
import { LogOut, Plus, Trash2 } from "lucide-react";

function Site() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Services />
        <WhyChooseMe />
        <Process />
        <Testimonials />
        <FAQ />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <ThemeToggle />
    </div>
  );
}

function AdminLogin() {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form onSubmit={(e) => { e.preventDefault(); if (!store.login(u, p)) setErr("Invalid credentials"); }} className="w-full max-w-md glass-strong rounded-3xl p-8 space-y-5">
        <h1 className="text-3xl font-display">Admin Login</h1>
        <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        {err && <div className="text-sm text-destructive">{err}</div>}
        <button className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">Login</button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
    </div>
  );
}

function Dashboard() {
  const projects = useStore(store.getProjects);
  const testimonials = useStore(store.getTestimonials);
  const [tab, setTab] = useState<"projects" | "testimonials">("projects");
  const upP = (id: string, patch: Partial<Project>) => store.setProjects(projects.map((p) => p.id === id ? { ...p, ...patch } : p));
  const upT = (id: string, patch: Partial<Testimonial>) => store.setTestimonials(testimonials.map((t) => t.id === id ? { ...t, ...patch } : t));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-display">Dashboard</h1>
        <div className="flex gap-2">
          <a href="#" onClick={() => { location.hash = ""; location.reload(); }} className="px-4 py-2 rounded-full glass text-sm">View site</a>
          <button onClick={() => store.logout()} className="px-4 py-2 rounded-full bg-foreground text-background text-sm inline-flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
        </div>
      </header>
      <div className="flex gap-2">
        <button onClick={() => setTab("projects")} className={`px-4 py-2 rounded-full text-sm ${tab === "projects" ? "bg-primary text-primary-foreground" : "glass"}`}>Projects ({projects.length})</button>
        <button onClick={() => setTab("testimonials")} className={`px-4 py-2 rounded-full text-sm ${tab === "testimonials" ? "bg-primary text-primary-foreground" : "glass"}`}>Testimonials ({testimonials.length})</button>
      </div>
      {tab === "projects" ? (
        <div className="space-y-4">
          <button onClick={() => store.setProjects([...projects, { id: crypto.randomUUID(), img: "", title: "New Project", tag: "Web", desc: "Short description", url: "https://" }])} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" />Add project</button>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="glass rounded-2xl p-5 space-y-3">
                <div className="flex justify-end"><button onClick={() => store.setProjects(projects.filter((x) => x.id !== p.id))} className="text-destructive"><Trash2 className="w-4 h-4" /></button></div>
                <Field label="Title" value={p.title} onChange={(v) => upP(p.id, { title: v })} />
                <Field label="Tag" value={p.tag} onChange={(v) => upP(p.id, { tag: v })} />
                <Field label="Link (URL)" value={p.url} onChange={(v) => upP(p.id, { url: v })} />
                <Field label="Image URL" value={p.img} onChange={(v) => upP(p.id, { img: v })} placeholder="https://..." />
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Description</label>
                  <textarea value={p.desc} onChange={(e) => upP(p.id, { desc: e.target.value })} rows={2} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
                </div>
                {p.img && <img src={p.img} alt="" className="w-full h-32 object-cover rounded-lg" />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={() => store.setTestimonials([...testimonials, { id: crypto.randomUUID(), name: "Client Name", role: "Role, Company", text: "Client feedback here." }])} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" />Add testimonial</button>
          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-5 space-y-3">
                <div className="flex justify-end"><button onClick={() => store.setTestimonials(testimonials.filter((x) => x.id !== t.id))} className="text-destructive"><Trash2 className="w-4 h-4" /></button></div>
                <Field label="Name" value={t.name} onChange={(v) => upT(t.id, { name: v })} />
                <Field label="Role" value={t.role} onChange={(v) => upT(t.id, { role: v })} />
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Comment</label>
                  <textarea value={t.text} onChange={(e) => upT(t.id, { text: e.target.value })} rows={3} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Admin() {
  const loggedIn = useStore(store.isLoggedIn);
  return <div className="min-h-screen bg-background text-foreground">{loggedIn ? <Dashboard /> : <AdminLogin />}</div>;
}

function App() {
  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "");
  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return hash === "#admin" ? <Admin /> : <Site />;
}

// Default to light theme
if (typeof document !== "undefined") {
  const saved = localStorage.getItem("theme");
  if (!saved || saved === "light") document.documentElement.classList.add("light");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
