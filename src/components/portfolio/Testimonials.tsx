import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const reviews = [
  {
    name: "Rifat Ahmed",
    role: "Founder, Lumen Store",
    text: "Zobayerul delivered our ecommerce platform ahead of schedule and exceeded every expectation. Sales grew 3x in the first quarter.",
    initial: "R",
  },
  {
    name: "Sarah Khan",
    role: "CEO, EduStream",
    text: "From design to deployment, the entire process was smooth. The LMS he built powers thousands of students every day.",
    initial: "S",
  },
  {
    name: "Daniel Carter",
    role: "Product Lead, PulseCRM",
    text: "Best developer we've worked with. Clean code, smart architecture, and genuinely cares about the product outcomes.",
    initial: "D",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What <span className="text-gradient">clients say</span></>}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="relative glass rounded-2xl p-7 h-full hover-lift">
                <Quote className="absolute top-5 right-5 w-10 h-10 text-primary/20" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center font-bold text-primary-foreground">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
