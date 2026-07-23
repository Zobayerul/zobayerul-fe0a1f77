import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Section";
import { T, useText } from "@/lib/portfolio-store";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow={useText("contact.eyebrow")}
          title={<><T id="contact.title.a" /> <span className="text-gradient"><T id="contact.title.b" /></span></>}
          description={useText("contact.desc")}
        />

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 max-w-6xl mx-auto">
          <Reveal>
            <div className="space-y-4">
              <a
                href="https://wa.me/8801968634181"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 glass rounded-2xl p-5 hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 grid place-items-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="font-semibold"><T id="contact.whatsapp" /></div>
                </div>
              </a>

              <a href="tel:01968634181" className="group flex items-center gap-4 glass rounded-2xl p-5 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-semibold"><T id="contact.phone" /></div>
                </div>
              </a>

              <a href="mailto:support@zobayerul.com" className="group flex items-center gap-4 glass rounded-2xl p-5 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-semibold"><T id="contact.email" /></div>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-2xl p-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-semibold"><T id="contact.location" /></div>
                </div>
              </div>

              <a
                href="https://wa.me/8801968634181"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-[0_0_30px_oklch(0.75_0.15_150/0.5)] hover:shadow-[0_0_50px_oklch(0.75_0.15_150/0.7)] transition-all"
              >
                <T id="contact.cta.chat" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 4000);
              }}
              className="glass-strong rounded-3xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name" type="text" placeholder="John Doe" />
                <Field label="Email" type="email" placeholder="you@email.com" />
              </div>
              <Field label="Subject" type="text" placeholder="Project inquiry" />
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full rounded-xl bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[0_0_40px_oklch(0.82_0.14_210/0.4)] hover:shadow-[0_0_60px_oklch(0.82_0.14_210/0.7)] transition-all"
              >
                {sent ? "Message Sent ✓" : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-muted-foreground">{label}</label>
      <input
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-xl bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
