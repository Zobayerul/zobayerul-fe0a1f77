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
    <Reveal className="text-center max-w-3xl mx-auto mb-10">
      <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium text-primary mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
