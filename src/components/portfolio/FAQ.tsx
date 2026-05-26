import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const faqs = [
  { q: "What services do you offer?", a: "Web design & development, ecommerce, mobile apps, CRM/ERP, HR & payroll, LMS, booking systems, inventory management, and custom software." },
  { q: "How long does a project take?", a: "Most landing sites take 1–2 weeks, ecommerce stores 3–6 weeks, and full custom platforms 6–12+ weeks depending on scope." },
  { q: "Do you provide post-launch support?", a: "Yes — every project includes a free support window, with optional ongoing maintenance and feature retainers." },
  { q: "Can you redesign my existing website?", a: "Absolutely. I audit your current site, identify gaps, and rebuild it with modern UI/UX and performance best practices." },
  { q: "What is your pricing model?", a: "Project-based fixed quotes after scope discussion. Hourly and retainer options also available." },
  { q: "How do we get started?", a: "Send a message via the contact form or WhatsApp. We'll schedule a free discovery call within 24 hours." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title={<>Common <span className="text-gradient">questions</span></>}
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className={`glass rounded-2xl overflow-hidden transition-all ${isOpen ? "glow-cyan" : ""}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-semibold text-lg">{f.q}</span>
                    <Plus
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
