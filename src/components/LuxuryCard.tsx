import React from "react";

interface LuxuryCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  botanical?: boolean;
}

export function LuxuryCard({ children, className = "", hover = true, botanical = false }: LuxuryCardProps) {
  return (
    <section className={["lux-glass p-5 sm:p-7", hover ? "lux-hover" : "", botanical ? "lux-flower-strip" : "", className].join(" ")}>
      {children}
    </section>
  );
}

export function LuxuryMediaFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`lux-media-frame ${className}`}>{children}</div>;
}
