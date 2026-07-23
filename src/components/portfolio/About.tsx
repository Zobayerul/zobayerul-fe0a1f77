import { CheckCircle2, Code2, Rocket, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { T, useText } from "@/lib/portfolio-store";

const skills = [
  "React / Next.js",
  "Laravel / PHP",
  "Node.js / TypeScript",
  "Shopify / WooCommerce",
  "React Native / Flutter",
  "PostgreSQL / MongoDB",
];

export function About() {
  return (
    <section id="about" className="relative py-8 sm:py-10">
      <div className="container mx-auto px-5 sm:px-6">
        <SectionHeader
          eyebrow={useText("about.eyebrow")}
          title={
            <>
              <T id="about.title.a" /> <span className="text-gradient"><T id="about.title.b" /></span>
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <p><T id="about.p1" /></p>
              <p><T id="about.p2" /></p>

              <div className="grid sm:grid-cols-2 gap-2.5 pt-3">
                {skills.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {[
                { icon: Code2, title: "Clean Code", text: "Readable, documented, production-ready." },
                { icon: Rocket, title: "On-Time Delivery", text: "Clear milestones, no surprises." },
                { icon: ShieldCheck, title: "Secure by Default", text: "Auth, data, and ops done right." },
                { icon: CheckCircle2, title: "Built for Results", text: "Designed around your KPIs." },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="glass rounded-2xl p-5 sm:p-6 hover-lift"
                  style={{ transform: i % 2 ? "translateY(20px)" : "" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-foreground text-background grid place-items-center mb-4">
                    <c.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-lg mb-1">{c.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

