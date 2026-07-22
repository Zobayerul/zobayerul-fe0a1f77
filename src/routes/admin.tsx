import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { store, useStore, defaultTexts, type Project, type Testimonial } from "@/lib/portfolio-store";
import { LogOut, Plus, Trash2, Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin Dashboard — Zobayerul Islam" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: Admin,
});

function Admin() {
  const loggedIn = useStore(store.isLoggedIn);
  return (
    <div className="min-h-screen bg-background text-foreground">
      {loggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form
        onSubmit={(e) => { e.preventDefault(); if (!store.login(u, p)) setErr("Invalid credentials"); }}
        className="w-full max-w-md glass-strong rounded-3xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-display">Admin Login</h1>
        <p className="text-sm text-muted-foreground">Sign in to manage portfolio content.</p>
        <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Username" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        <input value={p} onChange={(e) => setP(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        {err && <div className="text-sm text-destructive">{err}</div>}
        <button className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold">Login</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const projects = useStore(store.getProjects);
  const testimonials = useStore(store.getTestimonials);
  const [tab, setTab] = useState<"projects" | "testimonials" | "texts">("texts");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <header className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-3xl font-display">Dashboard</h1>
        <div className="flex gap-2">
          <a href="/" className="px-4 py-2 rounded-full glass text-sm">View site</a>
          <button onClick={() => store.logout()} className="px-4 py-2 rounded-full bg-foreground text-background text-sm inline-flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
        </div>
      </header>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setTab("texts")} className={`px-4 py-2 rounded-full text-sm ${tab === "texts" ? "bg-primary text-primary-foreground" : "glass"}`}>Site Text</button>
        <button onClick={() => setTab("projects")} className={`px-4 py-2 rounded-full text-sm ${tab === "projects" ? "bg-primary text-primary-foreground" : "glass"}`}>Projects ({projects.length})</button>
        <button onClick={() => setTab("testimonials")} className={`px-4 py-2 rounded-full text-sm ${tab === "testimonials" ? "bg-primary text-primary-foreground" : "glass"}`}>Testimonials ({testimonials.length})</button>
      </div>

      {tab === "projects" && <ProjectsPanel items={projects} />}
      {tab === "testimonials" && <TestimonialsPanel items={testimonials} />}
      {tab === "texts" && <TextsPanel />}
    </div>
  );
}

function TextsPanel() {
  const texts = useStore(store.getTexts);
  const groups: Record<string, string[]> = {};
  Object.keys(defaultTexts).forEach((k) => {
    const g = k.split(".")[0];
    (groups[g] ||= []).push(k);
  });
  const update = (key: string, v: string) => store.setTexts({ ...texts, [key]: v });
  const reset = (key: string) => {
    const next = { ...texts };
    delete next[key];
    store.setTexts(next);
  };
  const resetAll = () => { if (confirm("Reset all text to defaults?")) store.setTexts({}); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">Edit any text on your website. Changes save automatically and appear live.</p>
        <button onClick={resetAll} className="px-4 py-2 rounded-full glass text-sm inline-flex items-center gap-2"><RotateCcw className="w-4 h-4" />Reset all</button>
      </div>
      {Object.entries(groups).map(([group, keys]) => (
        <div key={group} className="glass rounded-2xl p-5 sm:p-6 space-y-4">
          <h3 className="font-display text-xl capitalize">{group}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {keys.map((k) => {
              const val = texts[k] ?? defaultTexts[k];
              const overridden = texts[k] !== undefined && texts[k] !== defaultTexts[k];
              const long = (defaultTexts[k] || "").length > 60;
              return (
                <div key={k}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs text-muted-foreground font-mono">{k}</label>
                    {overridden && (
                      <button onClick={() => reset(k)} className="text-[10px] text-accent inline-flex items-center gap-1"><RotateCcw className="w-3 h-3" />reset</button>
                    )}
                  </div>
                  {long ? (
                    <textarea value={val} onChange={(e) => update(k, e.target.value)} rows={3} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
                  ) : (
                    <input value={val} onChange={(e) => update(k, e.target.value)} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Save className="w-3 h-3" /> Auto-saved to this browser</div>
    </div>
  );
}

function ProjectsPanel({ items }: { items: Project[] }) {
  const update = (id: string, patch: Partial<Project>) =>
    store.setProjects(items.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const remove = (id: string) => store.setProjects(items.filter((p) => p.id !== id));
  const add = () =>
    store.setProjects([...items, { id: crypto.randomUUID(), img: "", title: "New Project", tag: "Web", desc: "Short description", url: "https://" }]);

  return (
    <div className="space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" />Add project</button>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs text-muted-foreground">Project</div>
              <button onClick={() => remove(p.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
            <Field label="Title" value={p.title} onChange={(v) => update(p.id, { title: v })} />
            <Field label="Tag" value={p.tag} onChange={(v) => update(p.id, { tag: v })} />
            <Field label="Link (URL)" value={p.url} onChange={(v) => update(p.id, { url: v })} />
            <Field label="Image URL" value={p.img} onChange={(v) => update(p.id, { img: v })} placeholder="https://... (optional)" />
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Description</label>
              <textarea value={p.desc} onChange={(e) => update(p.id, { desc: e.target.value })} rows={2} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
            </div>
            {p.img && <img src={p.img} alt="" className="w-full h-32 object-cover rounded-lg" />}
            <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Save className="w-3 h-3" /> Auto-saved</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsPanel({ items }: { items: Testimonial[] }) {
  const update = (id: string, patch: Partial<Testimonial>) =>
    store.setTestimonials(items.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const remove = (id: string) => store.setTestimonials(items.filter((t) => t.id !== id));
  const add = () =>
    store.setTestimonials([...items, { id: crypto.randomUUID(), name: "Client Name", role: "Role, Company", text: "Client feedback here." }]);

  return (
    <div className="space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" />Add testimonial</button>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.id} className="glass rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs text-muted-foreground">Testimonial</div>
              <button onClick={() => remove(t.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
            <Field label="Name" value={t.name} onChange={(v) => update(t.id, { name: v })} />
            <Field label="Role" value={t.role} onChange={(v) => update(t.id, { role: v })} />
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Comment</label>
              <textarea value={t.text} onChange={(e) => update(t.id, { text: e.target.value })} rows={3} className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
            </div>
          </div>
        ))}
      </div>
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
