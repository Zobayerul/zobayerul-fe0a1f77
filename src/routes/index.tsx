import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Education } from "@/components/portfolio/Education";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { WhyChooseMe } from "@/components/portfolio/WhyChooseMe";
import { Process } from "@/components/portfolio/Process";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { FAQ } from "@/components/portfolio/FAQ";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { WhatsAppFab } from "@/components/portfolio/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zobayerul Islam — Web Developer & Ecommerce Expert" },
      {
        name: "description",
        content:
          "Zobayerul Islam — premium Web Developer & Ecommerce Expert building modern websites, mobile apps, CRM, ERP, and custom software for growing businesses.",
      },
      { property: "og:title", content: "Zobayerul Islam — Web Developer & Ecommerce Expert" },
      {
        property: "og:description",
        content:
          "Modern websites, ecommerce stores, mobile apps and custom software built to grow your business.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Services />
        <WhyChooseMe />
        <Process />
        <Testimonials />
        <FAQ />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
