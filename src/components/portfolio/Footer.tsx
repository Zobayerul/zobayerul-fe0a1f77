import { Code2, Facebook, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-16 pb-8 mt-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-background" />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display font-bold text-lg mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Code2 className="w-5 h-5" />
              </span>
              <span className="text-gradient">Zobayerul Islam</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Web Developer & Ecommerce Expert building modern digital solutions for ambitious brands worldwide.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl glass grid place-items-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Home", "About", "Services", "Projects", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Web Development", "Ecommerce", "Mobile Apps", "CRM & ERP", "Custom Software"].map((l) => (
                <li key={l}>
                  <a href="#services" className="hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://wa.me/8801968634181" className="hover:text-primary transition-colors">
                  WhatsApp: +8801968634181
                </a>
              </li>
              <li>
                <a href="tel:01968634181" className="hover:text-primary transition-colors">
                  Phone: 01968634181
                </a>
              </li>
              <li>Bangladesh — Worldwide</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zobayerul Islam. All rights reserved.</p>
          <p>
            Crafted with <span className="text-primary">♥</span> by{" "}
            <span className="text-gradient font-semibold">Zobayerul Islam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
