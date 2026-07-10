import { useEffect, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { store, useStore } from "@/lib/portfolio-store";
import profile from "@/assets/profile.jpg";

export function Testimonials() {
  const reviews = useStore(store.getTestimonials);
  const [i, setI] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const calc = () => setPerView(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const max = Math.max(0, reviews.length - perView);
  const idx = Math.min(i, max);

  useEffect(() => {
    if (reviews.length <= perView) return;
    const t = setInterval(() => setI((v) => (v >= max ? 0 : v + 1)), 5000);
    return () => clearInterval(t);
  }, [reviews.length, perView, max]);

  const prev = () => setI((v) => (v <= 0 ? max : v - 1));
  const next = () => setI((v) => (v >= max ? 0 : v + 1));

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What <span className="text-gradient">clients say</span></>}
        />

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(idx * 100) / perView}%)` }}
            >
              {reviews.map((r, k) => (
                <div
                  key={r.id || r.name + k}
                  className="shrink-0 px-2.5 sm:px-3"
                  style={{ width: `${100 / perView}%` }}
                >
                  <Reveal delay={0}>
                    <div className="relative glass rounded-2xl p-6 sm:p-7 h-full hover-lift">
                      <Quote className="absolute top-5 right-5 w-8 h-8 text-accent/20" />
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 font-display italic">"{r.text}"</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                          <img src={profile} alt="Zobayerul Islam" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{r.name}</div>
                          <div className="text-xs text-muted-foreground">{r.role}</div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>

          {reviews.length > perView && (
            <>
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full glass hover:glass-strong grid place-items-center transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: max + 1 }).map((_, k) => (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      aria-label={`Go to slide ${k + 1}`}
                      className={`h-1.5 rounded-full transition-all ${k === idx ? "w-6 bg-accent" : "w-1.5 bg-foreground/25"}`}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full glass hover:glass-strong grid place-items-center transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
