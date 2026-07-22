import { Facebook, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { T } from "@/lib/portfolio-store";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-14 pb-8 mt-10 bg-muted/30">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display text-lg mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-foreground text-background text-xs font-sans font-bold">
                ZI
              </span>
              <span>Zobayerul <span className="italic text-accent">Islam</span></span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <T id="footer.tagline" />
            </p>
            <div className="flex gap-2 mt-5">
              {[Facebook, Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-border bg-card grid place-items-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-accent transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">What I Build</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Web Development", "Ecommerce", "Mobile Apps", "CRM & ERP", "Custom Software"].map((l) => (
                <li key={l}>
                  <a href="#services" className="hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base mb-4">Say Hello</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://wa.me/8801968634181" className="hover:text-accent transition-colors">
                  WhatsApp · +8801968634181
                </a>
              </li>
              <li>
                <a href="tel:01968634181" className="hover:text-accent transition-colors">
                  Phone · 01968634181
                </a>
              </li>
              <li>Bangladesh — Worldwide</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} <T id="footer.copyright" /></p>
        </div>
      </div>
    </footer>
  );
}
