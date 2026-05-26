import { CheckCircle2, Code2, Rocket, ShieldCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

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
    <section id="about" className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="About Me"
          title={
            <>
              Crafting digital products that <span className="text-gradient">drive growth</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm <span className="text-foreground font-semibold">Zobayerul Islam</span>, a
                professional Web Developer & Ecommerce Expert helping ambitious brands turn ideas
                into scalable digital products. From elegant marketing sites to complex
                multi-vendor stores, I deliver experiences that convert.
              </p>
              <p>
                With deep expertise across modern frontend frameworks, backend APIs, and
                ecommerce platforms, I architect solutions that are <span className="text-foreground">fast,
                secure, and built to scale</span> — paired with refined UI/UX that earns trust on
                every screen.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                {skills.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Code2, title: "Clean Code", text: "Maintainable, documented, production-ready." },
                { icon: Rocket, title: "Fast Delivery", text: "Agile workflow with on-time milestones." },
                { icon: ShieldCheck, title: "Secure", text: "Best practices for auth, data, and ops." },
                { icon: CheckCircle2, title: "Result Driven", text: "Built for KPIs and conversions." },
              ].map((c, i) => (
                <div
                  key={c.title}
                  className="glass rounded-2xl p-6 hover-lift"
                  style={{ transform: i % 2 ? "translateY(20px)" : "" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center mb-4">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
