import { GraduationCap, BadgeCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const items = [
  {
    degree: "Honors — Political Science",
    year: "2024",
    institution: "Dhaka University",
    board: null,
    result: "CGPA 2.83",
    verified: false,
  },
  {
    degree: "H.S.C — Humanities",
    year: "2019",
    institution: "Gazipur Cantonment College",
    board: "Dhaka",
    result: "GPA 4.92",
    verified: true,
  },
  {
    degree: "S.S.C — Business Studies",
    year: "2017",
    institution: "Kamarjuri Yousuf Ali High School",
    board: "Dhaka",
    result: "GPA 4.00",
    verified: true,
  },
];

export function Education() {
  return (
    <section id="education" className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Education"
          title={<>Academic <span className="text-gradient">background</span></>}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <Reveal key={it.degree} delay={i * 0.07}>
              <div className="glass rounded-2xl p-5 sm:p-6 h-full hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground text-background grid place-items-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {it.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full">
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg mb-1 leading-snug">{it.degree}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Passing year: {it.year}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Institution</span>
                    <span className="text-foreground text-right">{it.institution}</span>
                  </div>
                  {it.board && (
                    <div className="flex justify-between gap-3">
                      <span className="text-muted-foreground">Board</span>
                      <span className="text-foreground">{it.board}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-3">
                    <span className="text-muted-foreground">Result</span>
                    <span className="text-accent font-semibold">{it.result}</span>
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
