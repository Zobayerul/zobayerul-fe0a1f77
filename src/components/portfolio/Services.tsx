import {
  Globe, ShoppingCart, Smartphone, Users, Wallet,
  GraduationCap, CalendarCheck, Package, Code2, ArrowUpRight
} from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";

const services = [
  { icon: Globe, title: "Web Design & Development", text: "Pixel-perfect, performant websites with conversion-focused UX." },
  { icon: ShoppingCart, title: "Ecommerce Development", text: "Scalable storefronts on Shopify, WooCommerce & custom stacks." },
  { icon: Smartphone, title: "Mobile App Development", text: "Native-feel apps for Android & iOS with React Native and Flutter." },
  { icon: Users, title: "CRM & ERP Solutions", text: "End-to-end systems to streamline sales, ops, and customer data." },
  { icon: Wallet, title: "HR & Payroll Software", text: "Automate employee data, attendance, and payroll processing." },
  { icon: GraduationCap, title: "Learning Management Systems", text: "Modern LMS with courses, quizzes, and live class workflows." },
  { icon: CalendarCheck, title: "Booking & Reservation Systems", text: "Real-time booking platforms for services, rentals, and hospitality." },
  { icon: Package, title: "Inventory Management", text: "Track stock, suppliers, and warehouses with smart dashboards." },
  { icon: Code2, title: "Custom Software", text: "Tailor-made platforms engineered around your unique workflow." },
];

export function Services() {
  return (
    <section id="services" className="relative py-16">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Services"
          title={<>Full-stack solutions for <span className="text-gradient">modern businesses</span></>}
          description="From idea to launch — production-grade development across web, mobile, and enterprise software."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative h-full glass rounded-2xl p-7 hover-lift overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 grid place-items-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_30px_oklch(0.82_0.14_210/0.5)] transition-all">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    {s.title}
                    <ArrowUpRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
