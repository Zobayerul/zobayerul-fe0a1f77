import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import profile from "@/assets/profile.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl bg-primary/20 animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl bg-accent/20" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-muted-foreground">Available for new projects</span>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
          >
            Building Modern{" "}
            <span className="text-gradient">Websites</span> & Digital Solutions{" "}
            <span className="text-gradient">That Grow</span> Businesses.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            I help businesses build powerful websites, ecommerce platforms, mobile apps,
            and custom software solutions with modern UI/UX and scalable technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-[0_0_40px_oklch(0.82_0.14_210/0.4)] hover:shadow-[0_0_60px_oklch(0.82_0.14_210/0.7)] transition-all"
            >
              Hire Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl glass-strong text-foreground font-semibold hover:bg-white/10 transition-all"
            >
              View Projects
            </a>
            <a
              href="https://wa.me/8801968634181"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-4 rounded-xl glass hover:glass-strong text-foreground font-medium transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-14 max-w-md"
          >
            {[
              { v: "100+", l: "Projects" },
              { v: "60+", l: "Happy Clients" },
              { v: "5+", l: "Years" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-br from-primary/40 to-accent/40 rounded-full" />
          <div className="relative w-[300px] md:w-[400px] aspect-square animate-float">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary to-accent p-[2px]">
              <div className="w-full h-full rounded-[2rem] overflow-hidden glass-strong">
                <img
                  src={profile}
                  alt="Zobayerul Islam, Web Developer"
                  width={768}
                  height={896}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -left-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2 animate-float">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium">Online</span>
            </div>
            <div className="absolute -bottom-4 -right-4 glass-strong rounded-2xl px-4 py-3 animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-xs text-muted-foreground">Web & Ecommerce</div>
              <div className="text-sm font-bold text-gradient">Expert Developer</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
