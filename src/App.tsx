/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Flame, 
  Globe, 
  Camera, 
  BookOpen, 
  Award,
  GraduationCap, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  User,
  Heart,
  MessageCircle,
  X,
  FileText,
  Shield,
  Zap,
  CheckCircle,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Star,
  FolderDot,
  Volume2,
  Music,
  CalendarPlus,
  Coffee,
  Monitor,
  PlayCircle,
  Database
} from "lucide-react";

import baoSelfie from "./Selfie.png";
import resumePdf from "./assets/bao_you_resume_all.pdf";

import wingCover from "./Wing.jpeg";
import padCover from "./PAD.jpeg";
import amCover from "./AM.jpeg";
import allstarCover from "./AllStar.jpeg";
import docCover from "./Doc.jpeg";

// Import types & static data
import { 
  CONTACT_INFO, 
  METRICS, 
  ABOUT_ME, 
  CAREER_EXPERIENCE, 
  EDUCATION_LIST, 
  CERTIFICATIONS, 
  SKILLS_DATA, 
  TRADITIONAL_PROJECTS, 
  AI_GTM_PROJECTS, 
  HOBBIES,
  EVALUATION_PROJECTS,
  MODELING_PROJECTS,
  SALES_PRO_PROJECTS
} from "./data";

// Import custom whiteboard component sketches
import { 
  DoodleBoyWithBubble, 
  HandshakeSvg, 
  ArchitectureFlowSvg, 
  ProfessionalPathSvg,
  CameraSketchSvg,
  BriefcaseSketchSvg,
  LightbulbSketchSvg,
  CertificateSketchSvg,
  WavingHandSketchSvg,
  CoffeeSketchSvg,
  IHerbLogoSketchSvg,
  GoogleLogoSketchSvg,
  SalesforceLogoSketchSvg,
  TwitterLogoSketchSvg,
  XaiLogoSketchSvg
} from "./components/DoodleDrawings";

// Import Crayon Animated Video Player
import { CrayonVideoPlayer } from "./components/CrayonVideoPlayer";

// Helper helper function to return specific hand-crafted corporate badges matching credentials
const getCompanyIcon = (issuer: string) => {
  const canonical = issuer.toLowerCase();
  
  if (canonical.includes("salesforce")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 6 15 A 3 3 0 0 1 6 9 A 4 4 0 0 1 14 7 A 3 3 0 0 1 18 10 A 3 3 0 0 1 17 15 Z" fill="#bae6fd" />
        <path d="M 6.5 15 C 4 14.5, 4 9, 8 9 C 9 6, 14.5 5.5, 15.5 9 C 18 8, 19.5 11, 18 14 C 17 15, 7.5 15.5, 6.5 15 Z" fill="none" stroke="#18181b" strokeWidth="2.5" />
        <path d="M 9.5 12 Q 13.5 11 15 12.5" fill="none" stroke="#0284c7" strokeWidth="1.2" />
      </svg>
    );
  }
  if (canonical.includes("cornell")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 5 5 H 19 V 12 C 19 17, 12 20, 12 20 C 12 20, 5 17, 5 12 Z" fill="#fee2e2" stroke="#18181b" strokeWidth="2.2" />
        <path d="M 9 9 Q 12 8 13.5 12 Q 11.5 15.5 9 14.5" fill="none" stroke="#dc2626" strokeWidth="2.2" />
        <line x1="12" y1="5" x2="12" y2="19" stroke="#18181b" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    );
  }
  if (canonical.includes("atlassian") || canonical.includes("jira")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 4 18 L 10 5 L 12 9 L 6 18 Z" fill="#bae6fd" stroke="#18181b" strokeWidth="2" />
        <path d="M 12 18 L 18 5 L 20 9 L 14 18 Z" fill="#bae6fd" stroke="#18181b" strokeWidth="2" />
      </svg>
    );
  }
  if (canonical.includes("leandata")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="16" r="3.2" fill="#86efac" stroke="#18181b" strokeWidth="2" />
        <circle cx="17" cy="8" r="3.2" fill="#86efac" stroke="#18181b" strokeWidth="2" />
        <path d="M 9.5 14 Q 13 11 14.5 9.5" fill="none" stroke="#18181b" strokeWidth="2.2" />
        <path d="M 10 12 L 14 12" stroke="#18181b" strokeWidth="1" />
      </svg>
    );
  }
  if (canonical.includes("outreach")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" fill="#ffedd5" stroke="#18181b" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" fill="#ea580c" stroke="#18181b" strokeWidth="1.5" />
      </svg>
    );
  }
  if (canonical.includes("slack")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="8" y1="4" x2="8" y2="20" stroke="#e01e5a" strokeWidth="2.8" />
        <line x1="16" y1="4" x2="16" y2="20" stroke="#2eb67d" strokeWidth="2.8" />
        <line x1="4" y1="8" x2="20" y2="8" stroke="#36c5f0" strokeWidth="2.8" />
        <line x1="4" y1="16" x2="20" y2="16" stroke="#ecb22e" strokeWidth="2.8" />
        <circle cx="12" cy="12" r="3.5" fill="#fbf8f3" stroke="#18181b" strokeWidth="2" />
      </svg>
    );
  }
  if (canonical.includes("okta")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="8" fill="#dbeafe" stroke="#18181b" strokeWidth="2.2" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="#2563eb" strokeWidth="2.2" />
      </svg>
    );
  }
  if (canonical.includes("zendesk")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5,19 12,5 12,19" fill="#bbf7d0" stroke="#18181b" strokeWidth="2" />
        <polygon points="19,5 12,5 12,19" fill="#065f46" stroke="#18181b" strokeWidth="1.5" />
      </svg>
    );
  }
  if (canonical.includes("notion")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#f4f4f5" stroke="#18181b" strokeWidth="2.2" />
        <path d="M 8 16 L 8 8 L 13 14 L 13 8 M 13 14 L 16 16 L 16 8" fill="none" stroke="#18181b" strokeWidth="2" />
      </svg>
    );
  }
  if (canonical.includes("hubspot")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4.5" fill="#ffedd5" stroke="#18181b" strokeWidth="2" />
        <line x1="12" y1="7.5" x2="12" y2="4" stroke="#18181b" strokeWidth="2" />
        <line x1="8.5" y1="14" x2="5.5" y2="16" stroke="#18181b" strokeWidth="2" />
        <line x1="15.5" y1="14" x2="18.5" y2="16" stroke="#18181b" strokeWidth="2" />
        <circle cx="12" cy="3.5" r="2" fill="#ff7a59" stroke="#18181b" strokeWidth="1.5" />
        <circle cx="5" cy="16.5" r="2" fill="#ff7a59" stroke="#18181b" strokeWidth="1.5" />
        <circle cx="19" cy="16.5" r="2" fill="#ff7a59" stroke="#18181b" strokeWidth="1.5" />
      </svg>
    );
  }
  if (canonical.includes("google")) {
    return (
      <svg className="h-5 w-5 shrink-0 select-none text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M 12 12 H 18.5 A 6.5 6.5 0 1 1 17 8 L 14 10.5 Q 12.5 9 12 12 Z" fill="#fee2e2" stroke="#18181b" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M 6 12 Q 6 7 12 7" stroke="#ea4335" strokeWidth="2.5" fill="none" />
        <path d="M 12 7 Q 16 7 18 10" stroke="#fbbc05" strokeWidth="2.5" fill="none" />
        <path d="M 18 10 L 12 10" stroke="#4285f4" strokeWidth="2.5" fill="none" />
      </svg>
    );
  }
  
  return (
    <svg className="h-5 w-5 shrink-0 select-none text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
};

const getHobbyCover = (name: string, defaultCover?: string) => {
  const norm = name.toLowerCase();
  if (norm.includes("travel") || norm.includes("exploration")) return wingCover;
  if (norm.includes("music") || norm.includes("acappella")) return padCover;
  if (norm.includes("photography") || norm.includes("street")) return amCover;
  if (norm.includes("nba") || norm.includes("sports")) return allstarCover;
  if (norm.includes("reading") || norm.includes("strategic")) return docCover;
  return defaultCover;
};

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [hoveredNav, setHoveredNav] = useState<string>("home");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Career experience expansion
  const [activeProjectTab, setActiveProjectTab] = useState<"traditional" | "ai" | "crm" | "evaluation" | "modeling" | "sales">("crm");
  const [certFilter, setCertFilter] = useState<"all" | "salesforce" | "other">("all");

  // Live Calendar & Booking states
  const [activeCalendarTab, setActiveCalendarTab] = useState<"embed" | "booking">("embed");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    date: "2026-06-12",
    time: "10:00 AM",
    type: "30m Strategy consultation",
    notes: ""
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [customCalendlyUrl, setCustomCalendlyUrl] = useState<string>(CONTACT_INFO.calendlyUrl || "https://calendly.com/you-bell521");

  // True multi-page mock router using hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "about", "certifications", "projects", "career", "contact", "meet"].includes(hash)) {
        setActivePage(hash);
        setHoveredNav(hash);
      } else {
        setActivePage("home");
        setHoveredNav("home");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    handleHashChange(); // Run on initial mount
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToPage = (pageName: string) => {
    window.location.hash = pageName === "home" ? "" : pageName;
    setActivePage(pageName);
    setHoveredNav(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Find standard icons dynamically for hobby list
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="h-6 w-6 text-orange-500" />;
      case "Globe":
        return <Globe className="h-6 w-6 text-sky-500" />;
      case "Music":
        return <Music className="h-6 w-6 text-pink-500" />;
      case "Camera":
        return <Camera className="h-6 w-6 text-purple-500" />;
      default:
        return <BookOpen className="h-6 w-6 text-green-500" />;
    }
  };

  // Filter certifications
  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    if (certFilter === "all") return true;
    if (certFilter === "salesforce") return cert.isSalesforce;
    return !cert.isSalesforce;
  });

  const totalSfCerts = CERTIFICATIONS.filter(c => c.isSalesforce).length;
  const totalOtherCerts = CERTIFICATIONS.filter(c => !c.isSalesforce).length;

  return (
    <div className="min-h-screen bg-sketchbook-paper text-ink selection:bg-highlight font-sans antialiased relative pb-16 overflow-x-hidden">
      
      {/* Immersive Scanned Sketchbook Paper Overlay with faint wrinkles, smudges, and dust speckles */}
      <div className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden opacity-90">
        <svg className="absolute inset-0 w-full h-full opacity-65" xmlns="http://www.w3.org/2000/svg">
          {/* Handdrawn soft gray charcoal shading smudges */}
          <radialGradient id="smudge-1" cx="15%" cy="25%" r="35%">
            <stop offset="0%" stopColor="#7c7365" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#ecebe6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="smudge-2" cx="85%" cy="75%" r="45%">
            <stop offset="0%" stopColor="#837c70" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ecebe6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="smudge-3" cx="50%" cy="10%" r="25%">
            <stop offset="0%" stopColor="#1c160e" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ecebe6" stopOpacity="0" />
          </radialGradient>

          <rect width="100%" height="100%" fill="url(#smudge-1)" />
          <rect width="100%" height="100%" fill="url(#smudge-2)" />
          <rect width="100%" height="100%" fill="url(#smudge-3)" />

          {/* Faint paper wrinkles & creases */}
          {/* Main fold line from top-left curving slightly across */}
          <path d="M -100 200 Q 500 180 1100 240 T 2200 160" fill="none" stroke="#fafafa" strokeWidth="2.0" opacity="0.45" />
          <path d="M -100 202 Q 500 182 1100 242 T 2200 162" fill="none" stroke="#2c271f" strokeWidth="1.0" opacity="0.06" />

          {/* Secondary subtle vertical crease */}
          <path d="M 1150 -100 Q 1050 450 1250 1300" fill="none" stroke="#fafafa" strokeWidth="2.5" opacity="0.4" />
          <path d="M 1152 -100 Q 1052 450 1252 1300" fill="none" stroke="#2c271f" strokeWidth="1.2" opacity="0.07" />

          {/* Genuine scanner dust, fibers, and microscopic speckles */}
          <g fill="#1b1b1b" opacity="0.28">
            <circle cx="140" cy="110" r="0.75" />
            <circle cx="280" cy="220" r="0.4" />
            <circle cx="490" cy="340" r="0.9" />
            <circle cx="760" cy="160" r="0.5" />
            <circle cx="950" cy="510" r="1.1" />
            <circle cx="1380" cy="250" r="0.6" />
            <circle cx="1600" cy="570" r="0.8" />
            <circle cx="1820" cy="210" r="0.5" />
            <circle cx="1950" cy="440" r="1.2" />

            {/* Microscopic fiber threads */}
            <path d="M 330 140 Q 332 143 335 141" fill="none" stroke="#1b1b1b" strokeWidth="0.6" />
            <path d="M 870 340 Q 868 345 873 343" fill="none" stroke="#1b1b1b" strokeWidth="0.5" />
            <path d="M 1440 600 Q 1444 602 1441 605" fill="none" stroke="#1b1b1b" strokeWidth="0.6" />
          </g>

          {/* Soft sketchbook paper vignette shadows in the outermost corners */}
          <radialGradient id="vignette-effect" cx="50%" cy="50%" r="70%">
            <stop offset="65%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#282218" stopOpacity="0.07" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#vignette-effect)" />
        </svg>
      </div>
      
      {/* Authentic Handdrawn Ink Splatter Background Accents replicating Homepage.png */}
      <svg className="fixed left-2 md:left-6 lg:left-10 top-36 w-16 md:w-20 lg:w-24 h-48 pointer-events-none opacity-45 z-0 select-none text-zinc-800" viewBox="0 0 80 180" fill="currentColor">
        <circle cx="20" cy="30" r="3.5" />
        <circle cx="28" cy="45" r="1.5" />
        <circle cx="15" cy="50" r="2.2" />
        <path d="M 35 22 Q 38 27 34 29 C 31 31 32 23 35 22 Z" />
        <circle cx="45" cy="65" r="4.2" opacity="0.8" />
        <circle cx="50" cy="80" r="2" />
        <circle cx="18" cy="95" r="1.5" />
        <circle cx="25" cy="110" r="5" />
        <circle cx="34" cy="118" r="2.5" />
        <path d="M 22 135 C 24 139 21 144 18 142 C 16 139 20 134 22 135 Z" />
        <circle cx="48" cy="148" r="3.1" />
        <circle cx="55" cy="158" r="1.5" />
        <circle cx="28" cy="165" r="2.2" />
      </svg>
      <svg className="fixed right-2 md:right-6 lg:right-10 top-56 w-14 md:w-16 lg:w-20 h-40 pointer-events-none opacity-35 z-0 select-none text-zinc-805" viewBox="0 0 60 160" fill="currentColor">
        <circle cx="25" cy="20" r="4.5" />
        <circle cx="15" cy="35" r="2.1" />
        <circle cx="32" cy="42" r="1.5" />
        <circle cx="20" cy="60" r="3" />
        <circle cx="45" cy="75" r="1.8" />
        <path d="M 12 90 Q 15 94 13 97 C 10 99 9 93 12 90 Z" />
        <circle cx="28" cy="105" r="5.2" />
        <circle cx="38" cy="120" r="2.3" />
        <circle cx="15" cy="135" r="1.2" />
        <circle cx="24" cy="145" r="3.5" />
      </svg>
      
      {/* ========================================================
          CORE HEADER BAR (Consistent across all pages)
         ======================================================== */}
      <header className="max-w-7xl mx-auto px-4 pt-6 pb-2 flex flex-col items-center">
        
        {/* Horizontal Navigation: Whimsical 3D sketchbook buttons */}
        <nav className="flex flex-wrap items-center justify-center gap-3.5 md:gap-5 my-4 relative z-30">
          {[
            { id: "home", label: "HOME", color: "bg-pink-200 hover:bg-pink-300" },
            { id: "about", label: "ABOUT", color: "bg-white hover:bg-emerald-100" },
            { id: "certifications", label: "CERTIFICATIONS", color: "bg-white hover:bg-orange-100" },
            { id: "projects", label: "PROJECTS", color: "bg-white hover:bg-amber-100" },
            { id: "career", label: "CAREER", color: "bg-white hover:bg-purple-100" },
            { id: "contact", label: "CONTACT & HOBBIES", color: "bg-white hover:bg-rose-100" },
            { id: "meet", label: "MEET ME", color: "bg-white hover:bg-lime-150" },
          ].map((item) => {
            const isSelected = activePage === item.id;
            const tilt = item.id === "home" ? "rotate-[-1deg]" : item.id === "about" ? "rotate-[1deg]" : item.id === "certifications" ? "rotate-[-0.8deg]" : item.id === "projects" ? "rotate-[-1.5deg]" : item.id === "career" ? "rotate-[0.5deg]" : item.id === "contact" ? "rotate-[1.2deg]" : item.id === "meet" ? "rotate-[-1.1deg]" : "rotate-[-1.5deg]";
            return (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(activePage)}
                className={`px-5 py-2.5 font-hand text-sm md:text-base font-extrabold transition-all duration-150 border-3 border-ink rounded-lg shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-2 cursor-pointer ${tilt} ${
                  isSelected 
                    ? "bg-highlight text-ink" 
                    : `${item.color} text-ink`
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ========================================================
          PAGE CONTROLLER (Dynamic viewport based on hash)
         ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 pt-4">
        
        {/* 1. HOME SCREEN VIEW */}
        {activePage === "home" && (
          <div className="flex flex-col items-center">
            
            {/* Centered snug storybook landscape with the delicate childlike character centerpiece */}
            <div className="flex flex-col items-center justify-center py-4 md:py-6 px-4 text-center max-w-4xl mx-auto space-y-5 animate-fade-in relative z-10 w-full select-none">
              
              {/* Outer delicate frame housing the childlike character - compact padding */}
              <div className="relative p-5 md:p-6 bg-white/10 rounded-2xl border-2 border-dashed border-zinc-400/40 hover:border-zinc-450/60 transition-all duration-300 transform hover:scale-[1.01]">
                {/* Visual pencil markings on the frame to emphasize handmade craftsmanship */}
                <span className="absolute left-3 top-2 text-[10px] font-mono text-zinc-400 select-none opacity-55">*</span>
                <span className="absolute right-4 top-2 text-[10px] font-hand text-zinc-500/60 select-none opacity-45">scanned paper</span>
                <span className="absolute right-3 bottom-2 text-xs font-mono text-zinc-400 select-none opacity-50">°</span>
                <span className="absolute left-5 bottom-2 text-[9px] font-mono text-zinc-400 select-none opacity-40">#712f</span>
                
                {/* The beautifully styled childlike character scaled down */}
                <DoodleBoyWithBubble 
                  currentHoverSection="home" 
                  className="w-36 h-44 md:w-44 md:h-52 transform hover:rotate-1 transition-transform duration-500 ease-out" 
                />
              </div>
              
              {/* Storybook soft Typography & quiet narrative speech */}
              <div className="space-y-2 max-w-2xl">
                <h2 className="font-hand text-xl md:text-2xl lg:text-3xl text-zinc-900 font-extrabold leading-tight tracking-tight">
                  "Navigating GTM blueprints with childlike wonder and technical precision."
                </h2>
                <p className="font-sans text-xs text-zinc-550 leading-relaxed max-w-lg mx-auto italic">
                  Welcome to my sketchbook. A quiet composition of certified enterprise integrations, modern web architectures, and carefully crafted revenue operations.
                </p>
                
                <div className="pt-1 flex justify-center gap-1.5 opacity-65">
                  <span className="h-1 w-1 rounded-full bg-zinc-400"></span>
                  <span className="h-1 w-1 rounded-full bg-zinc-350"></span>
                  <span className="h-1 w-1 rounded-full bg-zinc-300"></span>
                </div>
              </div>

            </div>

            {/* Separator banner with sparse margin spacing */}
            <div className="w-full my-3 flex items-center justify-center gap-4 opacity-75 select-none font-medium">
              <div className="h-[2px] bg-dashed bg-zinc-500 flex-1 max-w-md"></div>
              <span className="font-hand text-xs font-black text-zinc-700 tracking-wider">PORTFOLIO PORTALS</span>
              <div className="h-[2px] bg-dashed bg-zinc-500 flex-1 max-w-md"></div>
            </div>

            {/* Real-time Handdrawn Navigation Infographic Panel */}
            <div className="w-full max-w-5xl mx-auto mb-6 mt-3 border-3 border-ink rounded-xl bg-white/45 backdrop-blur-xs p-4 md:p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative select-none">
              <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2">
                
                {/* Column 1: Who Am I? */}
                <div 
                  onClick={() => navigateToPage("about")}
                  className="group flex-1 cursor-pointer p-2.5 rounded-xl hover:bg-sky-100/40 transition-all duration-300 w-full text-center flex flex-col items-center justify-center"
                >
                  <div className="transform group-hover:scale-105 group-hover:rotate-[-1.5deg] transition-all duration-300 flex flex-col items-center">
                    <HandshakeSvg className="h-16 w-16 md:h-20 md:w-20 mb-2 filter drop-shadow-sm" />
                    <h3 className="font-hand text-2xl font-black text-ink tracking-tight mt-0.5 select-none">
                      Who Am I?
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500 max-w-xs mt-1 italic">
                      (Learn about my background, passions, & core GTM skills)
                    </p>
                  </div>
                </div>

                {/* Handdrawn Vertical Divider 1 */}
                <svg className="h-24 w-4 text-ink opacity-30 self-center hidden md:block" viewBox="0 0 24 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 8 10 Q 14 60 7 110 T 9 190" />
                  <path d="M 16 12 Q 11 58 17 112 T 15 188" />
                </svg>
                <div className="w-full border-t-2 border-dashed border-ink/20 opacity-40 my-1 md:hidden"></div>

                {/* Column 2: Architectural Innovations */}
                <div 
                  onClick={() => navigateToPage("projects")}
                  className="group flex-1 cursor-pointer p-2.5 rounded-xl hover:bg-emerald-100/40 transition-all duration-300 w-full text-center flex flex-col items-center justify-center"
                >
                  <div className="transform group-hover:scale-105 group-hover:rotate-[1deg] transition-all duration-300 flex flex-col items-center">
                    <ArchitectureFlowSvg className="h-16 w-16 md:h-20 md:w-20 mb-2 filter drop-shadow-sm" />
                    <h3 className="font-hand text-2xl font-black text-ink tracking-tight mt-0.5 select-none">
                      Architectural Innovations
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500 max-w-xs mt-1 italic">
                      (Explore blueprints & technical integrations)
                    </p>
                  </div>
                </div>

                {/* Handdrawn Vertical Divider 2 */}
                <svg className="h-24 w-4 text-ink opacity-30 self-center hidden md:block" viewBox="0 0 24 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M 8 10 Q 14 60 7 110 T 9 190" />
                  <path d="M 16 12 Q 11 58 17 112 T 15 188" />
                </svg>
                <div className="w-full border-t-2 border-dashed border-ink/20 opacity-40 my-1 md:hidden"></div>

                {/* Column 3: Professional Path */}
                <div 
                  onClick={() => navigateToPage("career")}
                  className="group flex-1 cursor-pointer p-2.5 rounded-xl hover:bg-orange-100/40 transition-all duration-300 w-full text-center flex flex-col items-center justify-center"
                >
                  <div className="transform group-hover:scale-105 group-hover:rotate-[-0.8deg] transition-all duration-300 flex flex-col items-center">
                    <ProfessionalPathSvg className="h-16 w-16 md:h-20 md:w-20 mb-2 filter drop-shadow-sm" />
                    <h3 className="font-hand text-2xl font-black text-ink tracking-tight mt-0.5 select-none">
                      Professional Path
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500 max-w-xs mt-1 italic">
                      (Trace my career milestones & achievements)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Hand-drawn partner/portfolio company logos in order: iHerb, Google, Salesforce, Twitter, XAI */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-12 select-none bg-white/20 p-2.5 rounded-lg border-2 border-dashed border-zinc-300 w-full max-w-5xl mx-auto shadow-xs">
              <span className="font-hand text-xs font-black text-zinc-600 tracking-wider">PROUD PORTFOLIO & WORK ROLES:</span>
              <IHerbLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <GoogleLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <SalesforceLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <TwitterLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <XaiLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
            </div>
          </div>
        )}

        {/* 2. ABOUT, EDUCATION & SKILLS VIEW */}
        {activePage === "about" && (
          <div className="space-y-12 mb-12">
            
            <div className="border-b-3 border-ink pb-4">
              <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                <span>Who Am I? About Bao You</span>
                <WavingHandSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
              </h2>
              <p className="font-sans text-sm text-zinc-650 mt-1">
                Global GTM CRM / Revenue Systems / Enterprise Applications Product Manager based in San Francisco Bay Area, CA.
              </p>
              
              {/* Hand-drawn partner/portfolio company logos in order: iHerb, Google, Salesforce, Twitter, XAI */}
              <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 mt-4 select-none bg-white/20 p-2.5 rounded-lg border-2 border-dashed border-zinc-200 w-fit">
                <span className="font-hand text-xs font-black text-zinc-600 tracking-wider mr-2">EXPERIENCE STACKS & LEADERSHIPS:</span>
                <IHerbLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <GoogleLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <SalesforceLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <TwitterLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <XaiLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Profile Card, Summary & Education */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Profile Photo / Selfie Card */}
                <div className="bg-white border-3 border-ink rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative w-40 h-40 md:w-44 md:h-44 shrink-0 border-3 border-ink rounded-xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] bg-paper rotate-[-1.5deg]">
                    <img 
                      src={baoSelfie} 
                      alt="Bao You" 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 right-2 bg-highlight text-ink font-hand text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-ink shadow-sm rotate-[4deg]">
                      San Francisco 📍
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="inline-block relative">
                      <div className="absolute inset-0 bg-highlight -skew-y-1 opacity-80 transform translate-y-0.5"></div>
                      <h3 className="relative font-hand text-2xl font-black text-ink px-2">Bao You</h3>
                    </div>
                    <p className="font-sans text-xs md:text-sm font-semibold text-zinc-650 leading-relaxed italic">
                      "Connecting Sales Operational & Strategy Planning, Enterprise System Architecture, System Data Analytics, and GTM Release Validations/Enablement to sustain and scale business applications."
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 font-sans">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full font-bold">
                        San Francisco, CA 📍
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-mono bg-sky-50 border border-sky-200 text-sky-700 rounded-full font-bold">
                        13x Salesforce Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Executive Description Card */}
                <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                  <div className="inline-block relative mb-5">
                    <div className="absolute inset-0 bg-marker-blue -skew-y-1.5 opacity-85 transform translate-y-1"></div>
                    <h3 className="relative font-hand text-xl font-black text-ink px-2.5 py-0.5 flex items-center gap-2">
                      <User className="h-5 w-5 text-indigo-700 shrink-0" />
                      Executive Positioning
                    </h3>
                  </div>
                  <p className="font-sans text-zinc-700 leading-relaxed text-sm md:text-base">
                    {ABOUT_ME.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-zinc-200">
                    <h4 className="font-mono text-xs uppercase font-bold text-zinc-400 mb-3 tracking-wider">Fluent Languages</h4>
                    <div className="flex flex-wrap gap-4">
                      {ABOUT_ME.languages.map((l, lIdx) => (
                        <div key={lIdx} className="flex items-center gap-2 bg-zinc-50 border-2 border-ink px-3 py-1 rounded-md text-xs">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
                          <strong className="text-zinc-950 font-bold">{l.name}</strong>
                          <span className="text-zinc-500">({l.level})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                  <div className="inline-block relative mb-5">
                    <div className="absolute inset-0 bg-marker-green -skew-y-1.5 opacity-85 transform translate-y-1"></div>
                    <h3 className="relative font-hand text-xl font-black text-ink px-2.5 py-0.5 flex items-center gap-2">
                      <GraduationCap className="h-5.5 w-5.5 text-emerald-700 shrink-0" />
                      Educational Grounding
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    {EDUCATION_LIST.map((edu, eIdx) => (
                      <div key={eIdx} className="relative pl-6 border-l-2 border-black">
                        <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-ink border border-white"></span>
                        <h4 className="font-sans font-extrabold text-base text-zinc-950">
                          {edu.degree}
                        </h4>
                        <p className="font-hand text-sm text-zinc-800 font-semibold mt-0.5">
                          {edu.institution}, {edu.location}
                        </p>
                        <span className="inline-block px-2 py-0.5 mt-2 bg-zinc-100 border border-zinc-300 text-[10px] font-mono rounded">
                          {edu.dates}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Categorized Skills blocks */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-8">
                  {SKILLS_DATA.map((cat, idx) => {
                    const highlightClass = (() => {
                      switch (cat.markerColor) {
                        case "marker-blue": return "bg-marker-blue";
                        case "marker-green": return "bg-marker-green";
                        case "marker-orange": return "bg-marker-orange";
                        default: return "bg-highlight";
                      }
                    })();

                    return (
                      <div
                        key={idx}
                        className="bg-white border-3 border-ink rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]"
                      >
                        <div className="inline-block relative mb-4">
                          <div className={`absolute inset-0 ${highlightClass} -skew-y-2 opacity-85 transform translate-y-1`}></div>
                          <h4 className="relative font-hand text-lg font-black text-ink px-2 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 shrink-0" />
                            {cat.category}
                          </h4>
                        </div>

                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {cat.skills.map((skill, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-xs">
                              <span className="h-1.5 w-1.5 rounded-full bg-ink shrink-0 inline-block"></span>
                              <span className="font-sans font-medium text-zinc-800">
                                {skill}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>


            {/* Simple SSO & System Security Compliance section is handled elegantly inside Categorized Skills blocks on the right */}

          </div>
        )}

        {/* 2.5. STANDALONE CERTIFICATIONS VIEW */}
        {activePage === "certifications" && (
          <div className="space-y-12 mb-12">
            
            <div className="border-b-3 border-ink pb-4">
              <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                <span>Professional Certifications & Badges</span>
                <CertificateSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
              </h2>
              <p className="font-sans text-sm text-zinc-650 mt-1">
                Verified platform expertise, cloud credential badging, and system architect designations.
              </p>
            </div>

            <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
              <h3 className="font-hand text-2xl font-black text-ink mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                Verified Accreditations
              </h3>

              {/* Hand-Drawn filters */}
              <div className="flex flex-wrap gap-3 mb-8 border-b-2 border-dashed border-zinc-200 pb-6 justify-center sm:justify-start">
                <button
                  onClick={() => setCertFilter("all")}
                  className={`px-5 py-2.5 font-sans text-xs md:text-sm font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer flex items-center gap-2 ${
                    certFilter === "all" 
                      ? "border-ink bg-highlight text-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]" 
                      : "border-zinc-300 bg-zinc-50 text-zinc-400 shadow-[1px_1px_0px_0px_rgba(228,228,231,1)] hover:bg-white hover:border-zinc-500 hover:text-ink hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] md:active:translate-y-[1px]"
                  }`}
                >
                  <Award className="h-4 w-4 shrink-0 text-yellow-600" />
                  All Credentials ({CERTIFICATIONS.length})
                </button>
                <button
                  onClick={() => setCertFilter("salesforce")}
                  className={`px-5 py-2.5 font-sans text-xs md:text-sm font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer flex items-center gap-2 ${
                    certFilter === "salesforce" 
                      ? "border-ink bg-sky-200 text-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]" 
                      : "border-zinc-300 bg-zinc-50 text-zinc-400 shadow-[1px_1px_0px_0px_rgba(228,228,231,1)] hover:bg-white hover:border-zinc-500 hover:text-ink hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] md:active:translate-y-[1px]"
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-sky-600" />
                  Salesforce Platform ({totalSfCerts}x)
                </button>
                <button
                  onClick={() => setCertFilter("other")}
                  className={`px-5 py-2.5 font-sans text-xs md:text-sm font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer flex items-center gap-2 ${
                    certFilter === "other" 
                      ? "border-ink bg-emerald-200 text-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]" 
                      : "border-zinc-300 bg-zinc-50 text-zinc-400 shadow-[1px_1px_0px_0px_rgba(228,228,231,1)] hover:bg-white hover:border-zinc-500 hover:text-ink hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] md:active:translate-y-[1px]"
                  }`}
                >
                  <Zap className="h-4 w-4 shrink-0 text-emerald-600" />
                  Other Platforms ({totalOtherCerts}x)
                </button>
              </div>

              {/* Credentials grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCerts.map((cert, idx) => {
                  const badgeBg = (() => {
                    switch (cert.badgeColor) {
                      case "yellow": return "bg-[#fef08a]";
                      case "blue": return "bg-[#93c5fd]";
                      case "green": return "bg-[#86efac]";
                      default: return "bg-[#fed7aa]";
                    }
                  })();

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-paper border-2 border-ink rounded-lg shadow-sm"
                    >
                      <div className={`p-1 h-8 w-8 rounded border border-ink ${badgeBg} flex items-center justify-center shrink-0`}>
                        {getCompanyIcon(cert.issuer)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans font-bold text-xs text-ink truncate leading-tight">
                          {cert.name}
                        </h4>
                        <p className="font-hand text-[10px] text-zinc-500 leading-none mt-0.5">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* 3. BUSINESS PROJECTS VIEW */}
        {activePage === "projects" && (
          <div className="space-y-10 mb-12">
            
            <div className="border-b-3 border-ink pb-4">
              <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                <span>Architectural Innovations & Case Studies</span>
                <LightbulbSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
              </h2>
              <p className="font-sans text-sm text-zinc-600 mt-1">
                Selected system architectures and automated workflows built with traditional middleware or generative artificial intelligence.
              </p>
            </div>

            {/* Folder Tabs - Compact single row, horizontal scrollable without wrapping */}
            <div className="flex flex-nowrap overflow-x-auto border-b-3 border-ink w-full gap-x-1.5 select-none pb-[3px] scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
              <button
                onClick={() => setActiveProjectTab("crm")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "crm"
                    ? "bg-marker-green text-ink border-b-3 border-b-marker-green z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <Monitor className="h-4 w-4 text-emerald-600 animate-pulse" />
                Custom CRM Prototype 🎥
              </button>
              <button
                onClick={() => setActiveProjectTab("ai")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "ai"
                    ? "bg-highlight text-ink border-b-3 border-b-highlight z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <Sparkles className="h-4 w-4 text-indigo-600" />
                AI GTM Solutions ({AI_GTM_PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("traditional")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "traditional"
                    ? "bg-marker-blue text-ink border-b-3 border-b-marker-blue z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <FolderDot className="h-4 w-4 text-blue-600" />
                Traditional GTM Solutions ({TRADITIONAL_PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("evaluation")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "evaluation"
                    ? "bg-marker-orange text-ink border-b-3 border-b-marker-orange z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <FileText className="h-4 w-4 text-amber-600" />
                System Evaluation ({EVALUATION_PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("modeling")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "modeling"
                    ? "bg-rose-100 text-ink border-b-3 border-b-rose-100 z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <Database className="h-4 w-4 text-rose-600 animate-pulse" />
                Data Modeling ({MODELING_PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("sales")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "sales"
                    ? "bg-purple-100 text-ink border-b-3 border-b-purple-100 z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <Zap className="h-4 w-4 text-purple-600" />
                Sales Process ({SALES_PRO_PROJECTS.length})
              </button>
            </div>

            {/* Project Cards Grid / Walkthrough */}
            {activeProjectTab === "crm" ? (
              <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-4 gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mb-2 rounded-full bg-emerald-50 border-2 border-emerald-200 text-emerald-800 font-hand text-xs font-bold leading-none rotate-[-1deg]">
                      <Sparkles className="h-3 w-3 shrink-0 animate-spin" />
                      Interactive CRM Systems Mock Architecture
                    </span>
                    <h3 className="font-hand text-2xl md:text-3xl font-black text-ink flex items-center gap-2">
                      <Monitor className="h-6 w-6 text-emerald-600 shrink-0" />
                      Custom CRM Prototype Demonstration
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["React 18", "Tailwind CSS", "Express Server", "Salesforce API", "Google Cloud", "LLM Pipelines"].map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtitle / Intro */}
                <p className="font-sans text-sm text-zinc-650 leading-relaxed md:max-w-4xl">
                  Watch the dynamic showcase of a tailor-made CRM pipeline. This custom solution completely replaces traditional clunky layouts with a super-fast whiteboard flow, automatic lead enrichment routing, real-time sync with Salesforce, and interactive workspace widgets.
                </p>

                {/* Embedded YouTube Video Container */}
                <div className="w-full aspect-video bg-zinc-950 border-3 border-ink rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/kFSWw3SWIXk" 
                    title="Custom CRM Prototype Video Demonstration" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="w-full h-full min-h-[300px] md:min-h-[450px]"
                  ></iframe>
                </div>

                {/* Additional context & bullet descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-dashed border-zinc-200">
                  <div className="p-4 bg-zinc-50 border-2 border-ink rounded-lg shadow-sm">
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      Whiteboard CRM Flowboard
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Custom responsive CRM interface showing lead lifecycle deals from inbox intake through close. Generates clean customer data profiles with no manual input required.
                    </p>
                  </div>

                  <div className="p-4 bg-[#fbfbfb] border-2 border-ink rounded-lg shadow-sm">
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                      Instant Salesforce Connector
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Maintains instant background queues syncing contact schemas, deal records, and custom properties directly to a production Salesforce or HubSpot workspace.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border-2 border-ink rounded-lg shadow-sm">
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                      RevOps Automated Audit
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Generates dynamic business performance graphics, highlighting leakage areas in routing queues and suggesting optimizations for pipeline speed.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {(() => {
                  switch (activeProjectTab) {
                    case "evaluation":
                      return EVALUATION_PROJECTS;
                    case "modeling":
                      return MODELING_PROJECTS;
                    case "sales":
                      return SALES_PRO_PROJECTS;
                    case "traditional":
                      return TRADITIONAL_PROJECTS;
                    case "ai":
                    default:
                      return AI_GTM_PROJECTS;
                  }
                })().map((project, idx) => {
                  return (
                    <div
                      key={idx}
                      className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] hover:shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] hover:translate-y-[-1px] transition-all flex flex-col justify-between"
                    >
                      <div>
                        {project.aiUse && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mb-4 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-hand text-xs font-bold leading-none rotate-[-1deg]">
                            <Sparkles className="h-3 w-3 shrink-0" />
                            {project.aiUse}
                          </div>
                        )}

                        <h4 className="font-sans font-extrabold text-lg md:text-xl text-ink tracking-tight mb-5 flex items-center justify-between">
                          {project.title}
                          <FolderDot className="h-4 w-4 text-zinc-400 shrink-0 select-none ml-2" />
                        </h4>

                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <span className="px-1.5 py-0.5 h-5 bg-red-50 text-red-700 border border-red-200 rounded text-[9px] uppercase font-bold shrink-0 select-none">
                              Problem
                            </span>
                            <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                              {project.problem}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <span className="px-1.5 py-0.5 h-5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] uppercase font-bold shrink-0 select-none">
                              Solution
                            </span>
                            <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                              {project.solution}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <span className="px-1.5 py-0.5 h-5 bg-green-50 text-green-700 border border-green-200 rounded text-[9px] uppercase font-bold shrink-0 select-none">
                              Impact
                            </span>
                            <div className="relative inline-block w-full">
                              <span className="bg-highlight px-1 text-ink font-sans font-bold text-xs rounded-sm">
                                {project.impact}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-5 border-t border-dashed border-zinc-200 flex flex-wrap items-center justify-start gap-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tools.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-1.5 py-0.5 font-mono text-[9px] text-zinc-600 bg-zinc-100 border border-zinc-200 rounded"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* 4. CAREER, TIMELINE & IMPACT SCREEN */}
        {activePage === "career" && (
          <div className="space-y-12 mb-12">
            
            <div className="border-b-3 border-ink pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                  <span>Work Experience & System Impact</span>
                  <BriefcaseSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
                </h2>
                <p className="font-sans text-sm text-zinc-600 mt-1">
                  Quantified performance improvements, revenue scale, and career history across top technology companies.
                </p>
              </div>
              <a 
                href={resumePdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="self-start md:self-auto px-5 py-2.5 font-hand text-base font-extrabold transition-all duration-150 border-3 border-ink rounded-lg bg-highlight hover:bg-yellow-300 text-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-2 cursor-pointer"
              >
                <FileText className="h-5 w-5 shrink-0" />
                VIEW FULL RESUME (PDF)
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </a>
            </div>

            {/* Hand-drawn partner/portfolio company logos in order: iHerb, Google, Salesforce, Twitter, XAI */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-3 pb-8 pt-2 select-none border-b border-dashed border-zinc-200">
              <span className="font-hand text-sm font-extrabold text-zinc-500 uppercase tracking-widest">PROUD PORTFOLIO COMPANIES:</span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <IHerbLogoSketchSvg className="h-9 w-24 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <GoogleLogoSketchSvg className="h-9 w-24 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <SalesforceLogoSketchSvg className="h-9 w-24 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <TwitterLogoSketchSvg className="h-9 w-24 hover:scale-105 active:scale-95 transition-transform duration-150" />
                <XaiLogoSketchSvg className="h-9 w-24 hover:scale-105 active:scale-95 transition-transform duration-150" />
              </div>
            </div>

            {/* Metric grids */}
            <div>
              <h3 className="font-hand text-2xl font-black text-ink mb-6 flex items-center gap-2">
                📊 Measurable Business Impact Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {METRICS.map((item, idx) => {
                  const markerBg = (() => {
                    switch (item.markerColor) {
                      case "marker-blue": return "bg-marker-blue";
                      case "marker-green": return "bg-marker-green";
                      case "marker-orange": return "bg-marker-orange";
                      default: return "bg-highlight";
                    }
                  })();

                  return (
                    <div
                      key={idx}
                      className="relative bg-white border-3 border-ink rounded-lg p-6 flex flex-col justify-between shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]"
                    >
                      <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 font-hand text-[10px] ${markerBg} border border-ink rotate-[-3deg] rounded-sm select-none`}>
                        Outcome #{idx + 1}
                      </div>

                      <div>
                        <div className="font-hand text-3xl lg:text-4xl font-black text-ink mb-1.5 select-none">
                          {item.value}
                        </div>
                        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-800 leading-tight mb-2">
                          {item.label}
                        </h4>
                      </div>

                      <p className="font-sans text-xs text-zinc-600 leading-relaxed border-t border-dashed border-zinc-200 mt-2 pt-2">
                        {item.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Supported Systems & Enterprise Stack */}
            <div className="bg-[#faf9f6]/90 border-3 border-ink rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden select-none">
              <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-400 uppercase select-none">// verified stack</div>
              <h3 className="font-hand text-2xl font-black text-ink mb-1 flex items-center gap-2">
                🖥️ Supported Systems & Enterprise Applications
              </h3>
              <p className="font-sans text-xs text-zinc-650 mb-5 leading-relaxed max-w-3xl italic">
                A verified directory of CRM, ERP, Middleware, AI agent automation, and Analytics applications built, maintained, and optimized over 10+ years of leading high-impact GTM business systems.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Category 1 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-emerald-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🎯</span> CRM & SSO Applications
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Salesforce (Sales / Service / Marketing / Partner Community Cloud)", "CPQ", "Agentforce", "HubSpot CRM", "OKTA", "Zendesk", "ServiceMax"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-emerald-50 text-emerald-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 2 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-indigo-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🔌</span> Enterprise & ERP Integrations
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Salesforce–SAP integrations", "O2C / Lead-to-Cash", "mobile application integrations", "middleware", "downstream ERP process support", "CloudBlue", "Apttus / Conga", "DocuSign", "SpringCM"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-indigo-50 text-indigo-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 3 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-rose-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">📈</span> Analytics Apps
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Einstein Analytics", "Tableau", "Snowflake", "BigQuery", "SQL", "SOQL", "Python", "Data Loader / ETL", "Workbench"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-rose-50 text-rose-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 4 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-teal-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🛠️</span> Agile / PM Tools
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Jira", "Confluence", "Asana", "Smartsheet", "Lucidchart", "Google Workspace", "Microsoft 365", "Slack", "SDLC / Product Lifecycle Management"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-teal-50 text-teal-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 5 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-purple-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🤖</span> Automation Middleware & AI
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Zapier", "Hightouch", "Traction Complete", "Einstein Copilot", "Gen AI Workflows", "DemandTools", "RingLead", "Mulesoft"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-purple-50 text-purple-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 6 */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-amber-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🛡️</span> Delivery & Governance
                    </h4>
                    <div className="flex flex-wrap gap-1.55">
                      {["Incident Management", "UAT / Test Script Creation", "Defect Tracking", "Release Validation", "Change Management", "SOX ITGC / SOD Compliance", "SOP Documentation", "Production Support"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-amber-50 text-amber-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Timeline Experience Cards */}
            <div className="pt-6">
              <h3 className="font-hand text-2xl font-black text-ink mb-8">
                💼 Experience Timeline & Project Deliverables
              </h3>

              <div className="relative border-l-3 border-ink ml-4 md:ml-6 pl-6 space-y-8 pb-4">
                {CAREER_EXPERIENCE.map((item, idx) => {
                  const isOpen = expandedIndex === idx;

                  return (
                    <div key={idx} className="relative group">
                      
                      {/* Interactive dot toggler */}
                      <button
                        onClick={() => setExpandedIndex(isOpen ? null : idx)}
                        className={`absolute left-[-35px] top-1.5 h-6 w-6 rounded-full border-3 border-ink flex items-center justify-center transition-all ${
                          isOpen ? "bg-highlight" : "bg-paper text-zinc-400"
                        }`}
                        title="Click to toggle bullet highlights"
                      >
                        <Briefcase className="h-3 w-3 text-ink" />
                      </button>

                      <div className="bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
                        <div 
                          className="cursor-pointer flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 select-none"
                          onClick={() => setExpandedIndex(isOpen ? null : idx)}
                        >
                          <div>
                            <h4 className="font-sans font-extrabold text-base md:text-lg text-ink tracking-tight flex items-center gap-1.5 flex-wrap">
                              {item.role}
                              {idx < 2 && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-[8px] uppercase font-bold text-ink rotate-[-1deg]">
                                  <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-600 shrink-0" />
                                  Lead Role
                                </span>
                              )}
                            </h4>
                            <p className="font-hand text-sm text-zinc-805 font-bold mt-0.5">
                              {item.company}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-zinc-400 mt-2">
                              <span className="flex items-center gap-1 font-semibold">
                                <Calendar className="h-3 w-3" />
                                {item.dates}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {item.location}
                              </span>
                            </div>
                          </div>

                          <div className={`self-end sm:self-start flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-black uppercase tracking-wider rounded-lg border-2 border-ink transition-all duration-150 cursor-pointer select-none md:active:translate-y-0.5 ${
                            isOpen 
                              ? "bg-amber-100 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]" 
                              : "bg-highlight text-ink shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] hover:translate-y-[1px]"
                          }`}>
                            {isOpen ? (
                              <>
                                <ChevronUp className="h-3.5 w-3.5 shrink-0" />
                                <span>Collapse</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3.5 w-3.5 shrink-0 animate-bounce" />
                                <span>Expand Details</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Bullet description list */}
                        <div className={`transition-all duration-250 ease-in-out ${
                          isOpen ? "max-h-[850px] opacity-100 mt-4 pt-4 border-t border-dashed border-zinc-200" : "max-h-0 opacity-0 overflow-hidden"
                        }`}>
                          
                          {/* Tools listed */}
                          <div className="mb-4 flex flex-wrap gap-1.5 items-center">
                            <span className="font-mono text-[9px] uppercase font-bold text-zinc-400 mr-2">Core Stack:</span>
                            {item.tools.map((t, tIdx) => (
                              <span 
                                key={tIdx}
                                className="px-1.5 py-0.5 text-[10px] bg-sky-50 border border-sky-100 text-sky-800 rounded font-sans font-semibold"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <ul className="space-y-2.5 text-zinc-700 text-xs md:text-sm leading-relaxed">
                            {item.bullets.map((bullet, bIdx) => {
                              // Highlight key words for recruiter convenience
                              const parts = bullet.split(/(\b(?:Salesforce|CRM|CPQ|GTM|AI-Powered|AI-augmented|UAT|SOPs|SDLC|BizOps|Quote-to-Cash|SLAs)\b)/g);
                              return (
                                <li key={bIdx} className="flex items-start gap-2">
                                  <span className="font-hand text-base text-ink shrink-0 mt-[-2px] select-none">-</span>
                                  <span className="flex-1">
                                    {parts.map((p, pIdx) => {
                                      const isMatch = /\b(?:Salesforce|CRM|CPQ|GTM|AI-Powered|AI-augmented|UAT|SOPs|SDLC|BizOps|Quote-to-Cash|SLAs)\b/.test(p);
                                      return isMatch ? (
                                        <strong key={pIdx} className="bg-highlight/30 px-0.5 rounded font-bold text-zinc-950">{p}</strong>
                                      ) : p;
                                    })}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* 5. CONTACT & HOBBIES VIEW */}
        {activePage === "contact" && (
          <div className="space-y-12 mb-12 animate-fade-in text-ink">
            
            <div className="border-b-3 border-ink pb-4">
              <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                <span>Contact Channels & Hobbies</span>
                <CameraSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
              </h2>
              <p className="font-sans text-sm text-zinc-650 mt-1">
                Reach out to discuss Salesforce solutions, RevOps optimization audits, or browse my off-duty interests and pass-times.
              </p>
            </div>

            <div className="max-w-2xl md:max-w-3xl mx-auto space-y-10 animate-fade-in text-ink">
              
              {/* Official Contact Rolodex */}
              <div className="bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                <h3 className="font-hand text-xl font-black text-ink mb-4 pb-2 border-b-2 border-dashed border-zinc-200 flex items-center gap-2">
                  <span>📁 Official Contact Rolodex</span>
                </h3>

                <div className="space-y-4">
                  {/* Email contact */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px]">
                    <a 
                      href={`mailto:${CONTACT_INFO.email}`} 
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                        <Mail className="h-4 w-4 text-indigo-505 shrink-0" />
                      </div>
                      <span className="font-bold truncate">{CONTACT_INFO.email}</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(CONTACT_INFO.email, "email")}
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all cursor-pointer w-16 text-center select-none"
                    >
                      {copiedText === "email" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  {/* Phone contact */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px]">
                    <a 
                      href={`tel:${CONTACT_INFO.phone}`} 
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                      </div>
                      <span className="font-bold">{CONTACT_INFO.phone}</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(CONTACT_INFO.phone, "phone")}
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all cursor-pointer w-16 text-center select-none"
                    >
                      {copiedText === "phone" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  {/* LinkedIn contact */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px] w-full overflow-hidden">
                    <a 
                      href={CONTACT_INFO.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Linkedin className="h-4 w-4 text-blue-650 shrink-0" />
                      </div>
                      <span className="font-bold truncate">linkedin.com/in/baoyingyou</span>
                    </a>
                    <a 
                      href={CONTACT_INFO.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all text-center w-16 select-none"
                    >
                      Visit
                    </a>
                  </div>

                  {/* Salesforce Trailhead contact */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px] w-full overflow-hidden">
                    <a 
                      href={CONTACT_INFO.salesforceTrailhead} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                        <Award className="h-4 w-4 text-amber-500 shrink-0" />
                      </div>
                      <span className="font-bold truncate">salesforce.com/trailblazer/baoyou</span>
                    </a>
                    <a 
                      href={CONTACT_INFO.salesforceTrailhead} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all text-center w-16 select-none"
                    >
                      Visit
                    </a>
                  </div>

                  {/* Threads Connection */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px] w-full overflow-hidden">
                    <a 
                      href={CONTACT_INFO.threads} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-zinc-900 shrink-0 select-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2a10 10 0 1 0 10 10" />
                          <path d="M12 8a4 4 0 1 0 2 3.5" />
                          <path d="M14 11.5c.5.5 1.5.5 2-.5" />
                        </svg>
                      </div>
                      <span className="font-bold truncate">threads.net/@bao2you</span>
                    </a>
                    <a 
                      href={CONTACT_INFO.threads} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all text-center w-16 select-none"
                    >
                      Visit
                    </a>
                  </div>

                  {/* Instagram Connection */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px] w-full overflow-hidden">
                    <a 
                      href={CONTACT_INFO.instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-rose-600 shrink-0 select-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </div>
                      <span className="font-bold truncate">instagram.com/bao2you</span>
                    </a>
                    <a 
                      href={CONTACT_INFO.instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all text-center w-16 select-none"
                    >
                      Visit
                    </a>
                  </div>

                  {/* TikTok Connection */}
                  <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 flex items-center justify-between min-h-[64px] w-full overflow-hidden">
                    <a 
                      href={(CONTACT_INFO as any).tiktok || "https://www.tiktok.com/@bao2you?is_from_webapp=1&sender_device=pc"} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-zinc-900 font-sans md:text-sm text-xs hover:text-blue-606 transition-colors truncate"
                    >
                      <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                        <svg className="h-4 w-4 text-teal-600 shrink-0 select-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                        </svg>
                      </div>
                      <span className="font-bold truncate">tiktok.com/@bao2you</span>
                    </a>
                    <a 
                      href={(CONTACT_INFO as any).tiktok || "https://www.tiktok.com/@bao2you?is_from_webapp=1&sender_device=pc"} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-[#18181b] hover:bg-neutral-800 text-white text-[11px] font-hand font-extrabold rounded-md shadow active:scale-95 transition-all text-center w-16 select-none"
                    >
                      Visit
                    </a>
                  </div>
                </div>
              </div>

              {/* Off-Duty Hobbies Snapshot Polaroids */}
              <div className="bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                <h3 className="font-hand text-xl font-black text-ink mb-5 pb-2 border-b-2 border-dashed border-zinc-200 flex items-center gap-2">
                  <span>📸 Off-Duty Hobbies Grid</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {HOBBIES.map((h: any, hIdx) => {
                    const rot = hIdx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";
                    const isLastOdd = hIdx === HOBBIES.length - 1 && HOBBIES.length % 2 !== 0;
                    return (
                      <div
                        key={hIdx}
                        className={`bg-zinc-50 border-2 border-ink p-4 rounded-xl shadow-sm transform hover:rotate-0 hover:scale-[1.01] transition-all duration-200 ${rot} ${isLastOdd ? "md:col-span-2" : ""}`}
                      >
                        <div className="w-full aspect-[4/3] bg-white border border-zinc-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden select-none">
                          {getHobbyCover(h.name, h.coverImage) ? (
                            <img 
                              src={getHobbyCover(h.name, h.coverImage)} 
                              className="w-full h-full object-cover select-none" 
                              referrerPolicy="no-referrer" 
                              alt={h.name} 
                            />
                          ) : (
                            getHobbyIcon(h.iconName)
                          )}
                          <div className="absolute inset-0 bg-graph-paper opacity-5 pointer-events-none"></div>
                        </div>

                        <h4 className="font-sans font-bold text-sm text-ink mb-1">
                          {h.name}
                        </h4>
                        <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                          {h.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 6. MEET ME VIEW */}
        {activePage === "meet" && (
          <div className="space-y-12 mb-12 animate-fade-in text-ink">
            
            <div className="border-b-3 border-ink pb-4">
              <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                <span>Meet Me & Booking Workspace</span>
                <CoffeeSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
              </h2>
              <p className="font-sans text-sm text-zinc-650 mt-1">
                Schedule a live, one-on-one calendar session to talk strategy, career navigation, or custom system designs.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: What I Offer (Interview Tips, CRM Org Entry, AI Transitioning) */}
              <div className="lg:col-span-6 flex flex-col h-full">
                <div className="bg-white border-3 border-ink rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden flex flex-col justify-between h-full w-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full blur-2xl opacity-50 -mr-5 -mt-5 pointer-events-none"></div>
                  
                  <h3 className="font-hand text-2xl font-black text-ink mb-5 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-yellow-500 shrink-0 animate-pulse" />
                    Bao's Consultation & Mentoring Focus
                  </h3>

                  <div className="space-y-6 relative z-10">
                    
                    {/* Item 1 */}
                    <div className="flex gap-4">
                      <div className="bg-emerald-100 border-2 border-ink h-10 w-10 rounded-lg flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] rotate-[-2deg]">
                        <Award className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-sans font-extrabold text-base text-zinc-900">
                          Global Enterprise Interview Tips
                        </h4>
                        <p className="font-sans text-xs text-zinc-600 mt-1 leading-relaxed">
                          Get first-hand insights on mastering complex multi-stage loops at global enterprises (Twitter/X, Google, Salesforce HQ). Learn how to effectively showcase system analysis methodology, UAT frameworks, and high-impact RevOps execution.
                        </p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4">
                      <div className="bg-amber-100 border-2 border-ink h-10 w-10 rounded-lg flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] rotate-[1.5deg]">
                        <Briefcase className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-sans font-extrabold text-base text-zinc-900">
                          Entering & Working the System / CRM Org
                        </h4>
                        <p className="font-sans text-xs text-zinc-600 mt-1 leading-relaxed">
                          Mentorship to help you land and thrive in high-stakes CRM systems roles. Learn the blueprint on managing complex multi-system commercial operations, navigating corporate political channels, implementing change controls, and achieving maximum business alignment.
                        </p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4">
                      <div className="bg-pink-100 border-2 border-ink h-10 w-10 rounded-lg flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] rotate-[-1deg]">
                        <Zap className="h-5 w-5 text-pink-700" />
                      </div>
                      <div>
                        <h4 className="font-sans font-extrabold text-base text-zinc-900">
                          AI Transitioning Experience & Architecture
                        </h4>
                        <p className="font-sans text-xs text-zinc-600 mt-1 leading-relaxed">
                          Modernize your GTM processes with intelligent agents, structured data retrieval (RAG), and server-side automation. I'll guide you through transitioning standard CRM layouts to include agentic systems, utilizing Google-GenAI SDK integrations, and setting up automated task extraction pipelines.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Whimsical hand-sketched quote banner with coffee emoji */}
                  <div className="mt-8 p-4 bg-zinc-50 border-2 border-dashed border-zinc-300 rounded-lg flex items-center gap-3">
                    <Coffee className="h-6 w-6 text-zinc-600 shrink-0 select-none" />
                    <p className="font-hand text-xs md:text-sm text-zinc-650 italic leading-relaxed">
                      "Whether you're looking to scale your enterprise business application processes or break into the CRM systems arena, let's connect and map out the playbook over coffee ☕."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Whimsical live scheduler slot booking card & Google Calendar Button */}
              <div className="lg:col-span-6">
                <div className="bg-white border-3 border-ink rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative rotate-[0.5deg] overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-3 right-3 text-xs font-mono text-zinc-300 select-none">// live-integrations</div>
                  
                  <div>
                    {/* Header Controls with Tab Switcher */}
                    <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 pb-3 mb-5">
                      <h3 className="font-hand text-2xl font-black text-ink flex items-center gap-2">
                        <CalendarPlus className="h-6 w-6 text-lime-600 shrink-0 animate-bounce" />
                        Live Booking Hub
                      </h3>
                      
                      {/* Tab Selectors */}
                      <div className="flex gap-1 bg-zinc-100 p-1 border-2 border-ink rounded-lg">
                        <button
                          onClick={() => setActiveCalendarTab("embed")}
                          className={`px-2.5 py-1 font-hand text-[10px] md:text-sm font-black rounded-md cursor-pointer transition-colors ${
                            activeCalendarTab === "embed"
                              ? "bg-ink text-white"
                              : "bg-transparent text-zinc-600 hover:bg-zinc-50"
                          }`}
                        >
                          🖥️ Slots Stream
                        </button>
                        <button
                          onClick={() => setActiveCalendarTab("booking")}
                          className={`px-2.5 py-1 font-hand text-[10px] md:text-sm font-black rounded-md cursor-pointer transition-colors ${
                            activeCalendarTab === "booking"
                              ? "bg-ink text-white"
                              : "bg-transparent text-zinc-600 hover:bg-zinc-50"
                          }`}
                        >
                          📅 Calendly Embed
                        </button>
                      </div>
                    </div>

                    {/* CONFIRMED BOOKING SUCCESS COMPONENT */}
                    {isBookingConfirmed ? (
                      <div className="bg-emerald-50 border-3 border-emerald-600 p-5 rounded-xl space-y-4 shadow-[4px_4px_0px_0px_rgba(5,150,105,1)] animate-fade-in relative">
                        <div className="absolute top-2 right-2 text-2xl select-none">🎉</div>
                        <h4 className="font-hand text-xl font-bold text-emerald-800 flex items-center gap-1.5 border-b border-emerald-200 pb-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                          Booking Synchronized!
                        </h4>
                        
                        <div className="space-y-2 bg-white/70 border-2 border-emerald-300 p-3.5 text-xs font-sans text-zinc-800 leading-relaxed shadow-sm rounded-lg">
                          <p>
                            <span className="font-bold text-emerald-800">System Notification:</span> Success code returned. Meeting slots have been synchronized into the calendar buffer:
                          </p>
                          <ul className="space-y-1 pt-1.5 border-t border-dashed border-zinc-200 mt-2">
                            <li><span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px]">Attendee:</span> {bookingForm.name} ({bookingForm.email})</li>
                            <li><span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px]">Topic:</span> {bookingForm.type}</li>
                            <li><span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px]">DateTime:</span> {bookingForm.date} at {bookingForm.time}</li>
                            {bookingForm.notes && (
                              <li><span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px]">Agenda:</span> "{bookingForm.notes}"</li>
                            )}
                          </ul>
                        </div>

                        <p className="font-hand text-xs text-zinc-600 italic">
                          *A meeting confirmation and Google Meet link will be synchronized to your inbox shortly.*
                        </p>

                        <button
                          onClick={() => {
                            setIsBookingConfirmed(false);
                            setBookingForm({ name: "", email: "", date: "2026-06-12", time: "10:00 AM", type: "30m Strategy Review - Enterprise career plan", notes: "" });
                          }}
                          className="w-full py-2 border-2 border-ink bg-white font-hand font-extrabold text-xs text-ink rounded-md shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:bg-zinc-50 cursor-pointer active:translate-y-0.5"
                        >
                          Book Another Consultation
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* TAB A: PUBLIC GOOGLE CALENDAR EMBED STREAM */}
                        {activeCalendarTab === "embed" && (
                          <div className="space-y-4 animate-fade-in">
                            <div className="bg-zinc-50 p-2 border-2 border-ink rounded-lg relative overflow-hidden flex flex-col">
                              <div className="flex items-center justify-between mb-1 px-1">
                                <span className="font-mono text-[9px] text-emerald-600 font-extrabold uppercase flex items-center gap-1">
                                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                  Bao's Google Calendar Live Stream
                                </span>
                                <span className="font-mono text-[9px] text-zinc-400 uppercase">GMT-8 (Los Angeles)</span>
                              </div>
                              
                              <div className="w-full bg-white border border-zinc-200 rounded overflow-hidden min-h-[300px]">
                                <iframe 
                                  src="https://calendar.google.com/calendar/embed?src=you.bell521%40gmail.com&ctz=America%2FLos_Angeles&showTitle=0&showPrint=0&showTz=0&showCalendars=0&mode=WEEK" 
                                  style={{ border: 0 }} 
                                  width="100%" 
                                  height="310" 
                                  frameBorder="0" 
                                  scrolling="no" 
                                  className="w-full h-[310px]"
                                  title="Google Calendar Core Stream"
                                ></iframe>
                              </div>
                            </div>
                            
                            <p className="font-sans text-[11px] text-zinc-500 leading-normal text-center">
                              📝 Use the live window above to check slots, or click the **Calendly Embed** tab to book a session instantly.
                            </p>
                          </div>
                        )}

                        {/* TAB B: CALENDLY WIDGET EMBED WITH FULL CONFIGURATION */}
                        {activeCalendarTab === "booking" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 p-2 text-xs rounded-lg mb-1 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                              <span className="font-mono text-[9px] text-zinc-500 font-extrabold uppercase shrink-0">🔗 Configured Calendly URL:</span>
                              <input
                                type="text"
                                value={customCalendlyUrl}
                                onChange={(e) => setCustomCalendlyUrl(e.target.value)}
                                placeholder="https://calendly.com/your-username"
                                className="border-2 border-ink rounded px-2 py-1 text-[11px] font-sans text-zinc-800 w-full sm:w-48 focus:outline-none focus:bg-white font-bold"
                              />
                            </div>

                            <div className="w-full bg-white border-2 border-ink rounded-lg overflow-hidden min-h-[385px] relative shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                              <iframe
                                src={`${customCalendlyUrl}${customCalendlyUrl.includes('?') ? '&' : '?'}embed_domain=${encodeURIComponent(window.location.origin)}&embed_type=Inline`}
                                style={{ border: 0 }}
                                width="100%"
                                height="385"
                                frameBorder="0"
                                className="w-full h-[385px]"
                                title="Calendly Booking Scheduler"
                              ></iframe>
                            </div>

                            <p className="font-sans text-[11px] text-zinc-550 leading-normal text-center italic">
                              💡 Need a different duration or event type? Fill in your custom Calendly link above or edit <code>src/data.ts</code>.
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Dynamic Action block based on selected scheduler config */}
                  {!isBookingConfirmed && (
                    <div className="space-y-3 pt-4 border-t border-dashed border-zinc-200">
                      <p className="font-sans text-xs text-zinc-500">
                        {activeCalendarTab === "booking" 
                          ? "Prefer booking outside of the iframe embedded container? Click below to load the direct event page in a new workspace window."
                          : "Clicking below will navigate to my Google Calendar booking scheduler page, where you can select a live, verified slot."
                        }
                      </p>
                      <a 
                        href={activeCalendarTab === "booking" ? customCalendlyUrl : CONTACT_INFO.calendarUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 font-hand text-lg font-black text-center transition-all duration-150 border-3 border-ink rounded-lg bg-highlight hover:bg-yellow-300 text-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center justify-center gap-2.5 cursor-pointer text-zinc-900"
                      >
                        <CalendarPlus className="h-5.5 w-5.5 text-zinc-900 shrink-0" />
                        {activeCalendarTab === "booking" ? "OPEN DIRECT CALENDLY PAGE" : "BOOK INTEGRATED CALENDAR SLOT"}
                        <ArrowUpRight className="h-5 w-5 text-zinc-900 shrink-0" />
                      </a>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* ========================================================
          VISUAL FOOTER
         ======================================================== */}
      <footer className="text-center pt-10 mt-12 border-t-2 border-dashed border-zinc-305 max-w-6xl mx-auto px-4 select-none">
        <p className="font-hand text-sm text-zinc-500">
          {CONTACT_INFO.name} — GTM Systems Architect Pro. Developed in React & Tailwind CSS.
        </p>
        <p className="font-mono text-[9px] text-zinc-400 mt-1 uppercase tracking-widest">
          Copyright © 2026. Hand-Drawn Design Style.
        </p>
      </footer>

    </div>
  );
}
