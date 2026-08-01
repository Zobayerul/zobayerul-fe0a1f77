import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
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
import { Admin } from "@/components/AdminApp";

function Site() {
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

function App() {
  const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "");
  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return hash === "#admin" ? <Admin /> : <Site />;
}

// Default to light theme
if (typeof document !== "undefined") {
  const saved = localStorage.getItem("theme");
  if (!saved || saved === "light") document.documentElement.classList.add("light");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
