import { GraduationCap, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { store, useStore } from "@/lib/portfolio-store";

export function Education() {
  const items = useStore(store.getEducation);
  return (
    <section id="education" className="relative py-10">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Education"
          title={<>Academic <span className="text-gradient">background</span></>}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.id} delay={i * 0.07}>
              <div className="glass rounded-2xl p-5 sm:p-6 h-full hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground text-background grid place-items-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> {it.status || "Completed"}
                  </span>
                </div>
                <h3 className="font-display text-lg mb-1 leading-snug">{it.degree}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Passing year: {it.year}</p>
                <p className="text-xs sm:text-sm text-muted-foreground/80">Institute: {it.institute}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
