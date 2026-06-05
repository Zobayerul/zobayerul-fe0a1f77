import { Palette, Zap, Search, Smartphone, Lock, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const items = [
  { icon: Palette, title: "Modern UI/UX", text: "Refined, on-brand interfaces that feel premium." },
  { icon: Zap, title: "Fast Delivery", text: "Sprint-based workflow with rapid iteration." },
  { icon: Search, title: "SEO Friendly", text: "Built for visibility from the foundation up." },
  { icon: Smartphone, title: "Mobile Responsive", text: "Flawless on every screen — mobile to desktop." },
  { icon: Lock, title: "Secure & Scalable", text: "Battle-tested architecture and best practices." },
  { icon: Target, title: "Business Focused", text: "Solutions aligned with revenue and KPIs." },
];

export function WhyChooseMe() {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Why Choose Me"
          title={<>The advantage of working with a <span className="text-gradient">dedicated expert</span></>}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.05}>
              <div className="group glass rounded-2xl p-5 sm:p-6 flex gap-4 sm:gap-5 hover-lift">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-foreground text-background grid place-items-center group-hover:bg-accent transition-colors">
                  <it.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">{it.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

