import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium text-accent uppercase tracking-[0.18em] mb-4 sm:mb-5 border border-accent/20 bg-accent/5">
        <span className="w-1 h-1 rounded-full bg-accent" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 leading-[1.1] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </Reveal>
  );
}
