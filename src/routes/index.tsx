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
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { SiteStyle } from "@/components/portfolio/SiteStyle";

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
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", href: "/favicon.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zobayerul Islam",
          jobTitle: "Web Developer & Ecommerce Expert",
          email: "support@zobayerul.com",
          telephone: "+8801968634181",
          address: { "@type": "PostalAddress", addressCountry: "BD" },
          url: "https://zobayerul.lovable.app",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SiteStyle />
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
      <ThemeToggle />
      <ScrollProgress />
    </div>
  );
}
