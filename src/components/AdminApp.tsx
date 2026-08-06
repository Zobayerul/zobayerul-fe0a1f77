import { useState } from "react";
import { store, useStore, defaultTexts, SECTIONS, type Project, type Testimonial, type Education } from "@/lib/portfolio-store";
import { LogOut, Plus, Trash2, Save, RotateCcw } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export function Admin() {
  const loggedIn = useStore(store.isLoggedIn);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Toaster position="top-center" />
      {loggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setErr("");
          const ok = await store.login(u, p);
          setBusy(false);
          if (!ok) setErr("Invalid credentials");
        }}
        className="w-full max-w-md glass-strong rounded-3xl p-8 space-y-5 animate-scale-in"
      >
        <h1 className="text-3xl font-display">Admin Login</h1>
        <p className="text-sm text-muted-foreground">Sign in with your admin email to manage content.</p>
        <input value={u} onChange={(e) => setU(e.target.value)} type="email" autoComplete="username" placeholder="Email" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        <input value={p} onChange={(e) => setP(e.target.value)} type="password" autoComplete="current-password" placeholder="Password" className="w-full rounded-xl bg-card border border-border px-4 py-3" />
        {err && <div className="text-sm text-destructive">{err}</div>}
        <button disabled={busy} className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-60">{busy ? "Signing in…" : "Login"}</button>
      </form>
    </div>
  );
}


function Dashboard() {
  const projects = useStore(store.getProjects);
  const testimonials = useStore(store.getTestimonials);
  const education = useStore(store.getEducation);
  const [tab, setTab] = useState<"projects" | "testimonials" | "education" | "texts" | "design" | "seo">("texts");

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h1 className="truncate text-2xl sm:text-3xl font-display">Dashboard</h1>
        <div className="flex gap-2 shrink-0">
          <SaveButton />
          <a href="/" className="px-3 sm:px-4 py-2 rounded-full glass text-xs sm:text-sm">View site</a>
          <button onClick={() => store.logout()} className="px-3 sm:px-4 py-2 rounded-full bg-foreground text-background text-xs sm:text-sm inline-flex items-center gap-2"><LogOut className="w-4 h-4" />Logout</button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {([
          ["texts", "Site Text"],
          ["projects", `Projects (${projects.length})`],
          ["testimonials", `Testimonials (${testimonials.length})`],
          ["education", `Education (${education.length})`],
          ["design", "Design / CSS"],
          ["seo", "SEO"],
        ] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`shrink-0 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm ${tab === id ? "bg-primary text-primary-foreground" : "glass"}`}>{label}</button>
        ))}
      </div>


      {tab === "projects" && <ProjectsPanel items={projects} />}
      {tab === "testimonials" && <TestimonialsPanel items={testimonials} />}
      {tab === "education" && <EducationPanel items={education} />}
      {tab === "texts" && <TextsPanel />}
      {tab === "design" && <DesignPanel />}
      {tab === "seo" && <SeoPanel />}
    </div>
  );
}

function EducationPanel({ items }: { items: Education[] }) {
  const update = (id: string, patch: Partial<Education>) =>
    store.setEducation(items.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const remove = (id: string) => store.setEducation(items.filter((e) => e.id !== id));
  const add = () =>
    store.setEducation([...items, { id: crypto.randomUUID(), degree: "New Degree", year: "2025", institute: "Institute name", status: "Completed" }]);

  return (
    <div className="space-y-4">
      <button onClick={add} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" />Add education</button>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((e) => (
          <div key={e.id} className="glass rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs text-muted-foreground">Education</div>
              <button onClick={() => remove(e.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
            <Field label="Degree" value={e.degree} onChange={(v) => update(e.id, { degree: v })} />
            <Field label="Passing year" value={e.year} onChange={(v) => update(e.id, { year: v })} />
            <Field label="Institute" value={e.institute} onChange={(v) => update(e.id, { institute: v })} />
            <Field label="Status" value={e.status} onChange={(v) => update(e.id, { status: v })} placeholder="Completed / Running" />
            <div className="text-xs text-muted-foreground inline-flex items-center gap-1"><Save className="w-3 h-3" /> Auto-saved</div>
          </div>
        ))}
      </div>
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

function DesignPanel() {
  const s = useStore(store.getSettings);
  const setPad = (id: string, k: "t" | "b", v: number) => {
    const cur = s.spacing?.[id] ?? { t: 40, b: 40 };
    store.setSettings({ ...s, spacing: { ...s.spacing, [id]: { ...cur, [k]: v } } });
  };
  const [css, setCss] = useState(s.css || "");

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-display text-xl">Section spacing (px)</h3>
          <button onClick={() => store.setSettings({ ...s, spacing: {} })} className="px-3 py-1.5 rounded-full glass text-xs inline-flex items-center gap-1"><RotateCcw className="w-3 h-3" />Reset spacing</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {SECTIONS.map((sec) => {
            const v = s.spacing?.[sec.id];
            return (
              <div key={sec.id} className="rounded-xl border border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{sec.label}</div>
                  {v && <button onClick={() => { const sp = { ...s.spacing }; delete sp[sec.id]; store.setSettings({ ...s, spacing: sp }); }} className="text-[10px] text-accent">reset</button>}
                </div>
                {(["t", "b"] as const).map((k) => (
                  <div key={k}>
                    <label className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{k === "t" ? "Top padding" : "Bottom padding"}</span>
                      <span>{v?.[k] ?? 40}px</span>
                    </label>
                    <input type="range" min={0} max={160} step={2} value={v?.[k] ?? 40} onChange={(e) => setPad(sec.id, k, Number(e.target.value))} className="w-full" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-2xl p-5 sm:p-6 space-y-3">
        <h3 className="font-display text-xl">Custom CSS</h3>
        <p className="text-sm text-muted-foreground">Write any CSS here — it applies live on the website.</p>
        <textarea value={css} onChange={(e) => setCss(e.target.value)} rows={12} spellCheck={false}
          placeholder={"#about { background: #fafafa; }\n.hero-title { letter-spacing: -1px; }"}
          className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm font-mono" />
        <div className="flex gap-2">
          <button onClick={() => store.setSettings({ ...s, css })} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Save className="w-4 h-4" />Save CSS</button>
          <button onClick={() => { setCss(""); store.setSettings({ ...s, css: "" }); }} className="px-4 py-2 rounded-full glass text-sm">Clear</button>
        </div>
      </div>
    </div>
  );
}

function SeoPanel() {
  const s = useStore(store.getSettings);
  const [f, setF] = useState(s.seo);
  const fields: { k: keyof typeof f; label: string; hint: string; area?: boolean }[] = [
    { k: "title", label: "Meta title", hint: "60 characters or less" },
    { k: "description", label: "Meta description", hint: "160 characters or less", area: true },
    { k: "keywords", label: "Keywords", hint: "comma separated" },
    { k: "ogImage", label: "Social share image URL", hint: "full https:// link" },
  ];
  return (
    <div className="glass rounded-2xl p-5 sm:p-6 space-y-4">
      <h3 className="font-display text-xl">SEO settings</h3>
      <p className="text-sm text-muted-foreground">These tags apply live on the website.</p>
      {fields.map((fl) => (
        <div key={fl.k}>
          <label className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{fl.label}</span>
            <span>{(f?.[fl.k] || "").length} chars — {fl.hint}</span>
          </label>
          {fl.area ? (
            <textarea rows={3} value={f?.[fl.k] || ""} onChange={(e) => setF({ ...f, [fl.k]: e.target.value })}
              className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
          ) : (
            <input value={f?.[fl.k] || ""} onChange={(e) => setF({ ...f, [fl.k]: e.target.value })}
              className="w-full rounded-lg bg-card border border-border px-3 py-2 text-sm" />
          )}
        </div>
      ))}
      <button onClick={() => store.setSettings({ ...s, seo: f })} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm inline-flex items-center gap-2"><Save className="w-4 h-4" />Save SEO</button>
    </div>
  );
}

function SaveButton() {
  const dirty = useStore(store.isDirty);
  const saving = useStore(store.isSaving);
  return (
    <button
      onClick={() => store.save()}
      disabled={!dirty || saving}
      className="px-3 sm:px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm inline-flex items-center gap-2 disabled:opacity-40"
    >
      <Save className="w-4 h-4" />
      {saving ? "Saving..." : dirty ? "Save changes" : "Saved"}
    </button>
  );
}
