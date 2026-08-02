import React from "react";
import {
  Home,
  UserRound,
  BadgeCheck,
  FolderKanban,
  Newspaper,
  BriefcaseBusiness,
  Heart,
  CalendarDays,
} from "lucide-react";

export type PortfolioPage =
  | "home"
  | "about"
  | "certifications"
  | "projects"
  | "articles"
  | "career"
  | "contact"
  | "meet";

interface CloudNavigationProps {
  activePage: PortfolioPage;
  onNavigate: (page: PortfolioPage) => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "certifications", label: "Certifications", icon: BadgeCheck },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "articles", label: "Articles", icon: Newspaper },
  { id: "career", label: "Career", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact & Hobbies", icon: Heart },
  { id: "meet", label: "Meet Me", icon: CalendarDays },
] satisfies Array<{
  id: PortfolioPage;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}>;

export function CloudNavigation({ activePage, onNavigate }: CloudNavigationProps) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        className="lux-nav mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-3 py-3 sm:justify-between sm:px-5"
        aria-label="Portfolio navigation"
      >
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="lux-nav-link shrink-0"
            aria-current={activePage === id ? "page" : undefined}
            onClick={() => onNavigate(id)}
          >
            <span className="lux-cloud" aria-hidden="true">
              <Icon size={17} strokeWidth={1.8} />
            </span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
