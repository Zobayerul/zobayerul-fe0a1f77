import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./Section";
import { store, useStore } from "@/lib/portfolio-store";

export function Testimonials() {
  const reviews = useStore(store.getTestimonials);
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.max(1, Math.ceil(reviews.length / perPage));
  const current = reviews.slice(page * perPage, page * perPage + perPage);

  const go = (dir: number) => setPage((p) => (p + dir + pages) % pages);

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What <span className="text-gradient">clients say</span></>}
        />

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 transition-opacity">
          {current.map((r) => (
            <div key={r.id} className="relative glass rounded-2xl p-6 sm:p-7 h-full hover-lift">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/20" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 font-display italic">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-foreground text-background grid place-items-center font-medium text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button onClick={() => go(-1)} aria-label="Previous" className="w-10 h-10 rounded-full glass grid place-items-center hover:text-accent transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-accent" : "w-2 bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next" className="w-10 h-10 rounded-full glass grid place-items-center hover:text-accent transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
