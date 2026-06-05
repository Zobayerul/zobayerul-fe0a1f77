import { MessageSquare, ClipboardList, PenTool, Code, Bug, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const steps = [
  { icon: MessageSquare, title: "Discussion", text: "Understand goals, audience, and scope." },
  { icon: ClipboardList, title: "Planning", text: "Strategy, architecture, and roadmap." },
  { icon: PenTool, title: "Design", text: "Wireframes and polished UI mockups." },
  { icon: Code, title: "Development", text: "Clean, scalable engineering execution." },
  { icon: Bug, title: "Testing", text: "QA, performance, and security checks." },
  { icon: Rocket, title: "Launch", text: "Deploy, monitor, and iterate." },
];

export function Process() {
  return (
    <section id="process" className="relative py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Work Process"
          title={<>A proven path from <span className="text-gradient">idea to launch</span></>}
        />

        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="relative glass rounded-2xl p-6 sm:p-7 h-full hover-lift">
                <div className="absolute -top-3 left-6 px-2.5 py-1 rounded-full bg-foreground text-background font-display text-xs">
                  0{i + 1}
                </div>
                <s.icon className="w-7 h-7 text-accent mb-4 mt-2" />
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

