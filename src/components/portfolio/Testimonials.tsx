import { Quote, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { store, useStore } from "@/lib/portfolio-store";

export function Testimonials() {
  const reviews = useStore(store.getTestimonials);

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What <span className="text-gradient">clients say</span></>}
        />

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="relative glass rounded-2xl p-6 sm:p-7 h-full hover-lift">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/20" />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 font-display italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background grid place-items-center font-medium text-sm">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
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

