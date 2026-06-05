import { ExternalLink } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const projects = [
  { img: p1, title: "Lumen Ecommerce", tag: "Ecommerce", desc: "Multi-vendor marketplace with realtime inventory." },
  { img: p2, title: "Nova Mobile App", tag: "Mobile App", desc: "Cross-platform fitness app with AI coaching." },
  { img: p3, title: "PulseCRM", tag: "CRM / SaaS", desc: "Sales pipeline and customer analytics dashboard." },
  { img: p4, title: "EduStream LMS", tag: "LMS", desc: "Live classes, quizzes, and progress tracking." },
  { img: p5, title: "Stay Booking", tag: "Booking", desc: "Hotel and venue reservation platform." },
  { img: p6, title: "Stockflow", tag: "Inventory", desc: "Warehouse and supplier management system." },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title={<>Recent <span className="text-gradient">projects</span></>}
          description="A selection of digital products built end-to-end for global clients."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group relative rounded-2xl overflow-hidden glass hover-lift h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-background/90 backdrop-blur text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-full text-foreground border border-border">
                    {p.tag}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-display text-xl leading-tight">{p.title}</h3>
                    <button className="w-8 h-8 rounded-full bg-muted grid place-items-center text-foreground/70 group-hover:bg-foreground group-hover:text-background transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

