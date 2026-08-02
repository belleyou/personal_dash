import React from "react";

interface LuxuryPageShellProps {
  page: "about" | "certifications" | "projects" | "articles" | "career" | "contact" | "meet";
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function LuxuryPageShell({ page, eyebrow, title, description, children }: LuxuryPageShellProps) {
  return (
    <main data-page={page} className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <header className="mb-9">
        {eyebrow && (
          <div className="lux-badge mb-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>}
      </header>
      <div className="space-y-7">{children}</div>
    </main>
  );
}
