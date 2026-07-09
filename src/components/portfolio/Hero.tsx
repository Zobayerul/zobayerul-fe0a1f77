import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import profile from "@/assets/profile.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      {/* Soft background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl bg-accent/10" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl bg-accent/5" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full text-xs font-medium mb-5 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-muted-foreground tracking-wide uppercase text-[10px] sm:text-xs">Available for new work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl mb-5 sm:mb-6 tracking-tight"
          >
            Thoughtful digital products,{" "}
            <span className="text-gradient">built to grow</span> with your business.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            I'm Zobayerul — a web developer and ecommerce specialist partnering with
            founders and teams to ship clean, fast, and conversion-ready experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-foreground text-background font-medium text-sm sm:text-base hover:bg-foreground/90 transition-all"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card text-foreground font-medium text-sm sm:text-base hover:bg-muted transition-all"
            >
              View work
            </a>
            <a
              href="https://wa.me/8801968634181"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full glass hover:glass-strong text-foreground font-medium text-sm transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-accent" />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-14 max-w-md"
          >
            {[
              { v: "100+", l: "Projects shipped" },
              { v: "60+", l: "Happy clients" },
              { v: "5+", l: "Years building" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl sm:text-4xl text-foreground">{s.v}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mx-auto order-1 lg:order-2"
        >
          <div className="absolute inset-0 -z-10 blur-3xl bg-accent/15 rounded-full" />
          <div className="relative w-[260px] sm:w-[320px] md:w-[400px] aspect-square animate-float">
            <div className="absolute inset-0 rounded-[2rem] bg-foreground/5 p-[1px]">
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-border bg-card">
                <img
                  src={profile}
                  alt="Zobayerul Islam, Web Developer"
                  width={768}
                  height={896}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -top-3 -left-3 glass-strong rounded-full px-3.5 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium">Available</span>
            </div>
            <div className="absolute -bottom-3 -right-3 glass-strong rounded-2xl px-4 py-2.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Web · Ecommerce</div>
              <div className="text-sm font-semibold font-display italic text-accent">Developer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
