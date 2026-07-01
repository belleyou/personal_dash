/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Database,
  Leaf,
  Workflow,
  Compass,
  Flower
} from "lucide-react";

import baoSelfie from "./Selfie.png";
const resumePdf = "/Bao_You_Resume.pdf";

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
  XaiLogoSketchSvg,
  SpaceXRocketSketchSvg
} from "./components/DoodleDrawings";

// Import Crayon Animated Video Player
import { CrayonVideoPlayer } from "./components/CrayonVideoPlayer";

// Import Apple Music Playlist Connector
import { MyFavoriteMusic } from "./components/MyFavoriteMusic";

// Import Salesforce Web-to-Lead configuration form
import { WebToLeadForm } from "./components/WebToLeadForm";

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

export const BotanicalVine: React.FC<{ className?: string; flip?: boolean; rotate?: string }> = ({ className = "h-12 w-12", flip = false, rotate = "0deg" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} select-none pointer-events-none fill-none stroke-current text-emerald-800/80 drop-shadow-sm`}
      style={{ transform: `${flip ? "scaleX(-1)" : ""} rotate(${rotate})` }}
    >
      {/* Curved main stem */}
      <path
        d="M 15 85 Q 35 45 80 20"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Leaf 1 */}
      <path
        d="M 28 66 Q 10 52 32 46 C 42 54 34 64 28 66"
        fill="var(--color-highlight)"
        strokeWidth="2"
      />
      {/* Leaf 2 */}
      <path
        d="M 46 48 Q 58 26 62 44 Q 52 56 46 48"
        fill="var(--color-marker-green)"
        strokeWidth="2"
      />
      {/* Leaf 3 */}
      <path
        d="M 64 32 Q 86 16 78 36 Q 68 42 64 32"
        fill="var(--color-highlight)"
        strokeWidth="2"
      />
      {/* Small organic berries / decorative buds */}
      <circle cx="21" cy="74" r="3.5" fill="#f59e0b" stroke="var(--color-ink)" strokeWidth="1.2" />
      <circle cx="53" cy="54" r="3.5" fill="#f59e0b" stroke="var(--color-ink)" strokeWidth="1.2" />
    </svg>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [hoveredNav, setHoveredNav] = useState<string>("home");
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Career experience expansion
  const [activeProjectTab, setActiveProjectTab] = useState<"innovations_video" | "traditional" | "ai" | "crm" | "evaluation" | "modeling" | "sales">("innovations_video");
  const [certFilter, setCertFilter] = useState<"all" | "salesforce" | "other">("all");
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [showResumeToast, setShowResumeToast] = useState(false);

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
      if (["home", "about", "certifications", "projects", "career", "contact", "meet", "thank-you"].includes(hash)) {
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

  // Track page transitions in Google Analytics
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      const trackingId = (import.meta as any).env.VITE_GA_TRACKING_ID;
      if (trackingId) {
        (window as any).gtag("config", trackingId, {
          page_title: activePage.charAt(0).toUpperCase() + activePage.slice(1) + " | Portfolio",
          page_path: activePage === "home" ? "/" : `/${activePage}`,
        });
      }
    }
  }, [activePage]);

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

          {/* Faint paper wrinkles & creases removed for a clean, non-distracting flat paper background */}

          {/* Genuine scanner dust, fibers, and microscopic speckles removed for a cleaner background per user request */}
          
          {/* Soft sketchbook paper vignette shadows in the outermost corners */}
          <radialGradient id="vignette-effect" cx="50%" cy="50%" r="70%">
            <stop offset="65%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#282218" stopOpacity="0.07" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#vignette-effect)" />
        </svg>
      </div>
      
      {/* Background accents removed for a cleaner flat paper look */}
      
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
              
              {/* Outer delicate frame housing the childlike character - compact padding with Botanical Vines framing it */}
              <div className="relative p-5 md:p-6 bg-white/15 rounded-2xl border-3 border-emerald-800/40 hover:border-emerald-800/60 transition-all duration-300 transform hover:scale-[1.01] shadow-sm">
                
                {/* Botanical Vine flourishes in opposite corners */}
                <BotanicalVine className="absolute -left-6 -top-6 h-14 w-14 animate-pulse" rotate="-15deg" />
                <BotanicalVine className="absolute -right-6 -bottom-6 h-14 w-14 animate-pulse" flip={true} rotate="-15deg" />

                {/* Visual pencil markings on the frame to emphasize handmade craftsmanship */}
                <span className="absolute left-3 top-2 text-[10px] font-mono text-emerald-700/60 select-none opacity-55">*</span>
                <span className="absolute right-4 top-2 text-[10px] font-hand text-emerald-700/60 select-none opacity-45">natural fiber paper</span>
                <span className="absolute right-3 bottom-2 text-xs font-mono text-emerald-700/60 select-none opacity-50">°</span>
                <span className="absolute left-5 bottom-2 text-[9px] font-mono text-emerald-700/60 select-none opacity-40">#organic-flow</span>
                
                {/* The beautifully styled childlike character scaled down */}
                <DoodleBoyWithBubble 
                  currentHoverSection="home" 
                  className="w-[187px] h-[228px] md:w-[228px] md:h-[270.4px] transform hover:rotate-1 transition-transform duration-500 ease-out animate-fade-in" 
                />
              </div>
              
              {/* Storybook soft Typography & quiet narrative speech */}
              <div className="space-y-2 max-w-2xl">
                <h2 className="font-hand text-xl md:text-2xl lg:text-3xl text-emerald-950 font-extrabold leading-tight tracking-tight">
                  "Navigating GTM blueprints with organic balance, natural curiosity, and technical precision."
                </h2>
                <p className="font-sans text-xs text-zinc-650 leading-relaxed max-w-lg mx-auto italic">
                  Welcome to my sketchbook. A calm, human-centric composition of certified enterprise integrations, sustainable GTM architectures, and carefully cultivated revenue operations.
                </p>
                
                <div className="pt-1 flex justify-center gap-1.5 opacity-65">
                  <span className="h-1 w-1 rounded-full bg-emerald-600"></span>
                  <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
                  <span className="h-1 w-1 rounded-full bg-emerald-400"></span>
                </div>
              </div>

            </div>

            {/* Small Natural Emerald Music Note Section as a 3D Polished Pill Button */}
            <div className="w-full max-w-5xl mx-auto flex justify-end px-4 mb-2 z-20">
              <button
                id="music-note-home-btn"
                onClick={() => setIsMusicModalOpen(true)}
                className="relative px-3.5 py-1.5 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 text-white font-hand text-[10px] sm:text-xs font-black rounded-full border-2 border-ink shadow-[0_4px_0_0_#064e3b,3px_7px_0px_0px_rgba(24,24,27,0.3)] hover:-translate-y-1 hover:shadow-[0_5px_0_0_#064e3b,3px_8px_0px_0px_rgba(24,24,27,0.3)] active:translate-y-0.5 active:shadow-[0_1px_0_0_#064e3b,1.5px_3px_0px_0px_rgba(24,24,27,0.3)] transition-all duration-150 cursor-pointer flex items-center gap-1.5 group overflow-hidden select-none"
                title="Pop Up My Favorite Music Player"
              >
                {/* Glossy radial glass shine overlays */}
                <span className="absolute inset-x-0 top-0 h-[45%] bg-white/35 rounded-t-full filter blur-[1px]"></span>
                <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></span>
                <Music className="h-3.5 w-3.5 stroke-[3] drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)] transform group-hover:scale-110 transition-transform duration-200" />
                <span className="relative drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.35)] shrink-0">
                  Listen to My Favorite Music!
                </span>
              </button>
            </div>

            {/* Separator banner with custom botanical theme */}
            <div className="w-full my-4 flex items-center justify-center gap-4 opacity-80 select-none font-medium">
              <div className="h-[2.5px] border-t-2 border-dashed border-emerald-800/30 flex-1 max-w-md hidden sm:block"></div>
              <div className="flex items-center gap-2 text-emerald-950">
                <Leaf className="h-4.5 w-4.5 text-emerald-700 animate-pulse" />
                <span className="font-hand text-xs font-black tracking-wider">ORGANIC GTM PORTALS</span>
                <Flower className="h-4.5 w-4.5 text-emerald-700 animate-pulse" style={{ animationDuration: '6s' }} />
              </div>
              <div className="h-[2.5px] border-t-2 border-dashed border-emerald-800/30 flex-1 max-w-md hidden sm:block"></div>
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

                {/* Column 2: Organic GTM Blueprints */}
                <div 
                  onClick={() => navigateToPage("projects")}
                  className="group flex-1 cursor-pointer p-2.5 rounded-xl hover:bg-emerald-100/40 transition-all duration-300 w-full text-center flex flex-col items-center justify-center"
                >
                  <div className="transform group-hover:scale-105 group-hover:rotate-[1deg] transition-all duration-300 flex flex-col items-center">
                    <ArchitectureFlowSvg className="h-16 w-16 md:h-20 md:w-20 mb-2 filter drop-shadow-sm" />
                    <h3 className="font-hand text-2xl font-black text-ink tracking-tight mt-0.5 select-none">
                      Organic GTM Blueprints
                    </h3>
                    <p className="font-sans text-[11px] text-zinc-500 max-w-xs mt-1 italic">
                      (Explore functional CRM designs & technical integrations)
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

            {/* Special SpaceX IPO Business Systems Mission Highlight */}
            <div className="w-full max-w-5xl mx-auto mb-6 p-4 md:p-6 border-3 border-ink rounded-xl bg-white/75 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.005] transition-transform duration-200 relative overflow-hidden select-none">
              {/* Highlight label taped on */}
              <div className="absolute top-2.5 right-2.5 px-3 py-1 font-hand text-[10px] sm:text-xs bg-red-100 text-red-800 border-2 border-ink rotate-[1.5deg] rounded-sm select-none font-bold shadow-xs">
                Business Systems Feature 🚀
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-5 mt-2 md:mt-0">
                <div className="shrink-0">
                  <SpaceXRocketSketchSvg className="h-16 w-16 md:h-20 md:w-20 filter drop-shadow-sm animate-bounce" />
                </div>
                <div className="space-y-1 text-center md:text-left flex-1">
                  <h4 className="font-hand text-2xl font-black text-ink flex items-center justify-center md:justify-start gap-2">
                    <span>Enterprise Systems SpaceX IPO Enablement Readiness</span>
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-zinc-700 leading-relaxed max-w-3xl">
                    Spearheaded robust GTM systems, Salesforce custom products, and federation workflows—partnering across Engineering and SOX compliance pipelines to secure financial system auditability and system scalability, helping **SpaceX prepare for its historic IPO launch**.
                  </p>
                  <p className="font-sans text-[11px] text-emerald-800 font-bold italic mt-1.5 flex items-center justify-center md:justify-start gap-1">
                    <span>✨ Deliverables: Billing pipelines, single-sign-on (SSO) systems integration, and high-efficiency Salesforce operations.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Hand-drawn partner/portfolio company logos in order: iHerb, Google, Salesforce, Twitter, XAI */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-6 select-none bg-white/20 p-2.5 rounded-lg border-2 border-dashed border-zinc-300 w-full max-w-5xl mx-auto shadow-xs">
              <span className="font-hand text-xs font-black text-zinc-600 tracking-wider">PROUD PORTFOLIO & WORK ROLES:</span>
              <IHerbLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <GoogleLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <SalesforceLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <TwitterLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
              <XaiLogoSketchSvg className="h-8 w-22 hover:scale-105 active:scale-95 transition-transform duration-150" />
            </div>

            {/* Salesforce Web-to-Lead Dynamic Integration Form Panel */}
            <WebToLeadForm userEmail={CONTACT_INFO.email} />
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
              <p className="font-sans text-sm text-zinc-650 mt-1">
                A careful composition of high-performance system architectures, organic commercial blueprints, and optimized workflows.
              </p>
            </div>

            {/* Folder Tabs - Compact single row, horizontal scrollable without wrapping */}
            <div className="flex flex-nowrap overflow-x-auto border-b-3 border-ink w-full gap-x-1.5 select-none pb-[3px] scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
              <button
                onClick={() => setActiveProjectTab("innovations_video")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "innovations_video"
                    ? "bg-amber-100 text-ink border-b-3 border-b-amber-100 z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <PlayCircle className="h-4 w-4 text-amber-600 animate-pulse" />
                Architectural Innovations 🎥
              </button>
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
                <Workflow className="h-4 w-4 text-emerald-800" />
                Intelligent Workflows ({AI_GTM_PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveProjectTab("traditional")}
                className={`flex items-center gap-1.5 px-4 py-2.5 font-hand text-sm md:text-base font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-lg translate-y-[3px] shrink-0 select-none ${
                  activeProjectTab === "traditional"
                    ? "bg-marker-blue text-ink border-b-3 border-b-marker-blue z-10 scale-105"
                    : "bg-zinc-150 text-zinc-500 border-b-3 border-b-ink hover:text-ink hover:bg-[#fafafa]"
                }`}
              >
                <FolderDot className="h-4 w-4 text-teal-700" />
                Core GTM Systems ({TRADITIONAL_PROJECTS.length})
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
                <Leaf className="h-4 w-4 text-emerald-800" />
                Revenue Growth Ops ({SALES_PRO_PROJECTS.length})
              </button>
            </div>

            {/* Project Cards Grid / Walkthrough */}
            {activeProjectTab === "innovations_video" ? (
              <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-4 gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mb-2 rounded-full bg-amber-50 border-2 border-amber-200 text-amber-800 font-hand text-xs font-bold leading-none rotate-[-1deg]">
                      <Sparkles className="h-3 w-3 shrink-0 animate-spin" />
                      Architectural Innovations Showcase
                    </span>
                    <h3 className="font-hand text-2xl md:text-3xl font-black text-ink flex items-center gap-2">
                      <PlayCircle className="h-6 w-6 text-amber-600 shrink-0" />
                      GTM Systems & Architecture Video
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Systems Design", "Salesforce RevOps", "Enterprise GTM", "Workflow Automation", "API Integration"].map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtitle / Intro */}
                <p className="font-sans text-sm text-zinc-650 leading-relaxed md:max-w-4xl">
                  Take a comprehensive look at standard enterprise architecture patterns, advanced custom systems orchestration, and strategic Salesforce lifecycle execution. This demonstration outlines robust ways to scale customer operations databases, design high-integrity routing funnels, and connect modular APIs to streamline commercial revenue flows.
                </p>

                {/* Embedded YouTube Video Container */}
                <div className="w-full aspect-video bg-zinc-950 border-3 border-ink rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/2NPEc0dxfhI" 
                    title="GTM Systems & Architecture Video Overview" 
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
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                      Global Process Mapping
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Detailed decomposition of multi-system business structures, from raw web-to-lead landing page ingestion into core Salesforce org objects.
                    </p>
                  </div>

                  <div className="p-4 bg-[#fbfbfb] border-2 border-ink rounded-lg shadow-sm">
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0"></span>
                      Advanced RevOps Engine
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Optimizing routing mechanisms, validation constraints, and lead qualification logic to maximize velocity across sales representative channels.
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-50 border-2 border-ink rounded-lg shadow-sm">
                    <h4 className="font-sans font-extrabold text-sm text-zinc-900 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      Custom REST Pipelines
                    </h4>
                    <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                      Connecting backend server relays with secure token handshakes, ensuring customer properties sync flawlessly with zero data leakage.
                    </p>
                  </div>
                </div>
              </div>
            ) : activeProjectTab === "crm" ? (
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
            
            <div className="border-b-3 border-ink pb-4">
              <div>
                <h2 className="font-hand text-3xl md:text-4xl font-extrabold text-ink flex items-center flex-wrap gap-2.5">
                  <span>Work Experience & System Impact</span>
                  <BriefcaseSketchSvg className="h-9 w-9 shrink-0 hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer" />
                </h2>
                <p className="font-sans text-sm text-zinc-600 mt-1">
                  Quantified performance improvements, revenue scale, and career history across top technology companies.
                </p>
              </div>
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
                
                {/* Category 1: CRM & SSO Applications */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-emerald-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🎯</span> CRM & SSO Applications
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Salesforce (Sales / Service / Marketing / Partner Community Cloud)", "CPQ", "Dealhub", "Agentforce", "HubSpot CRM", "OKTA", "Zendesk", "ServiceMax", "Relevance AI", "Slack"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-emerald-50 text-emerald-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 2: CLM & ERP Integrations */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-indigo-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🔌</span> CLM & ERP Integrations
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Salesforce–SAP integrations", "Netsuite", "Oracle ERP", "O2C / Lead-to-Cash", "Mobile application integrations", "Middleware", "CloudBlue", "Apttus / Conga", "DocuSign", "SpringCM", "PandaDoc", "Ironclad"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-indigo-50 text-indigo-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 3: Analytics Apps & Web HTTP */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-rose-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">📈</span> Analytics Apps & Web HTTP
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Einstein Analytics", "Tableau", "Snowflake", "BigQuery", "SQL", "SOQL", "Python", "Data Loader / ETL", "Workbench", "Jira", "Confluence", "Asana", "Smartsheet", "Lucidchart", "Google Sheets / Docs / Slides / Workspace", "Excel", "PowerBI", "SDLC", "HTML", "JSON"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-rose-50 text-rose-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 4: Automation Middleware & AI */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between">
                  <div>
                    <h4 className="font-hand text-lg font-black text-purple-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🤖</span> Automation Middleware & AI
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Zapier", "Momentum", "Relevance AI", "Hightouch", "Traction Complete", "Einstein Copilot", "Gen AI Workflows", "DemandTools", "RingLead", "Mulesoft", "Cursor", "VSCode", "Codex", "Claude Code"].map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] bg-purple-50 text-purple-800 border-2 border-ink rounded-md font-sans font-bold shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Category 5: GTM Apps */}
                <div className="p-4 bg-white border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:scale-[1.01] transition-transform flex flex-col justify-between md:col-span-2 lg:col-span-2">
                  <div>
                    <h4 className="font-hand text-lg font-black text-amber-800 flex items-center gap-1.5 border-b border-dashed border-zinc-200 pb-1.5 mb-2.5">
                      <span className="text-sm">🚀</span> GTM Apps
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {["Outreach.io", "Groove.io", "Gong.io", "LinkedIn Sales Navigator", "Zoominfo", "Clay", "Clari", "SalesLoft", "Hightouch", "D&B Optimizer / Credit Monitor", "Revenue.io", "People.ai", "Drift", "Workramp", "Apollo.ai", "6Sense", "HighSpot", "Workday", "WorkMe", "Adobe Enterprise Manager", "Docebo", "RingLead", "Leandata", "ZinFi", "GCP", "MixMax", "Demandbase"].map((s, i) => (
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
                    <motion.div
                      key={idx}
                      className="relative group"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                    >
                      
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
                    </motion.div>
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

            <div className="max-w-5xl lg:max-w-6xl mx-auto space-y-10 animate-fade-in text-ink">
              
              {/* Responsive 2-column grid to hold Contact Rolodex and Apple Music player side-by-side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
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

              {/* My Favorite Music Panel (Apple Music API Integration) */}
              <MyFavoriteMusic />
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

        {/* 7. DEDICATED THANK YOU PAGE */}
        {activePage === "thank-you" && (
          <div className="max-w-4xl mx-auto my-12 p-8 bg-white border-3 border-ink rounded-2xl shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] text-center space-y-8 animate-fade-in bg-graph-paper relative overflow-hidden select-none">
            {/* Visual design markings decoration */}
            <span className="absolute top-3 left-4 text-xs font-mono text-zinc-400">ASTERA-INSPECT-COMPLETE</span>
            <span className="absolute top-3 right-4 text-xs font-mono text-zinc-400">STATUS: LEAD_PERSISTED_OK</span>
            <span className="absolute bottom-3 right-4 text-[10px] font-hand text-zinc-400">designed with love by PM Bao You</span>

            {/* Breathtaking checkmark badge */}
            <div className="inline-flex items-center justify-center p-5 bg-emerald-100 rounded-full border-4 border-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] rotate-[-2deg] my-4 animate-bounce">
              <CheckCircle className="h-14 w-14 text-emerald-600 stroke-[2.5]" />
            </div>

            <div className="space-y-3">
              <h2 className="font-hand text-4xl lg:text-5xl font-black text-ink tracking-tight">
                Thank You, Builder!
              </h2>
              <p className="font-sans text-base max-w-xl mx-auto text-zinc-700 leading-relaxed">
                Your high-speed connectivity project proposal has been successfully broadcast to our lead ingestion flow in Salesforce.
              </p>
            </div>

            {/* Simulated technical system flow steps */}
            <div className="bg-zinc-50 border-2 border-dashed border-ink rounded-xl p-6 text-left max-w-2xl mx-auto space-y-4 shadow-sm relative">
              <div className="absolute -top-3.5 left-6 bg-highlight border-2 border-ink px-3 py-1 rounded text-xs font-hand font-extrabold rotate-[1deg]">
                WHAT HAPPENS NEXT?
              </div>

              <div className="space-y-4 pt-2 font-sans text-sm text-zinc-650">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center bg-sky-100 border border-ink font-bold font-mono text-[10px] h-6 w-6 rounded-full mt-0.5">1</span>
                  <div>
                    <strong className="text-zinc-950 block text-sm font-bold">Standard Confirmation Dispatch</strong>
                    <span className="text-xs">We automatically prepared a custom intake confirmation email summarizing your lanes, Aries DSP retimers, Taurus cables, or Leo memory controllers configuration. Check the intake dialog banner to fire off a copy!</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center bg-indigo-100 border border-ink font-bold font-mono text-[10px] h-6 w-6 rounded-full mt-0.5">2</span>
                  <div>
                    <strong className="text-zinc-950 block text-sm font-bold">Signal Integrity Review</strong>
                    <span className="text-xs">Systems architects at our San Jose, CA headquarters will analyze your channel insertion loss, lane counts, and board topologies to map optimization blueprints.</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 flex items-center justify-center bg-emerald-100 border border-ink font-bold font-mono text-[10px] h-6 w-6 rounded-full mt-0.5">3</span>
                  <div>
                    <strong className="text-zinc-950 block text-sm font-bold">Proposal Consultation Scheduled</strong>
                    <span className="text-xs">Check out the <strong>MEET ME</strong> section in the top navigation to directly lock in an interactive, live calendar consultation slot on my schedule if you want to speed up implementation review!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom action loop buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => navigateToPage("home")}
                className="px-8 py-3.5 bg-highlight text-ink font-hand text-lg font-black border-3 border-ink rounded-xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] transition-all flex items-center gap-2 cursor-pointer rotate-[-1deg]"
              >
                <span>← BACK TO HOME SCREEN</span>
              </button>

              <button
                onClick={() => navigateToPage("meet")}
                className="px-8 py-3.5 bg-white text-ink font-hand text-lg font-black border-3 border-ink rounded-xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] transition-all flex items-center gap-2 cursor-pointer rotate-[1deg]"
              >
                <span>BOOK A SESSION NOW →</span>
              </button>
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

      {/* 🎵 APPLE MUSIC POPUP WINDOW MODAL 🎵 */}
      <AnimatePresence>
        {isMusicModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMusicModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            
            {/* Window Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="relative bg-white border-4 border-ink rounded-2xl w-full max-w-lg md:max-w-xl shadow-[8px_8px_0px_0px_rgba(242,108,162,1)] z-10 flex flex-col h-auto max-h-[95vh] select-none"
            >
              {/* Custom Windows-style Header bar with pink color */}
              <div className="bg-pink-500 text-white border-b-4 border-ink p-3 flex items-center justify-between select-none relative z-20 shrink-0">
                <div className="flex items-center gap-2 mr-3 min-w-0">
                  <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-ink flex items-center justify-center text-[8px] font-black font-sans text-pink-500 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">
                    ★
                  </span>
                  <span className="font-hand text-lg md:text-xl font-black text-white drop-shadow-sm tracking-wide truncate">
                    🎵 My Favorite Music
                  </span>
                </div>
                
                {/* Control Action Buttons (With guaranteed shrink-0 so they never wrap or cut off) */}
                <div className="flex items-center gap-2 shrink-0 select-none relative z-30">
                  <button 
                    onClick={() => {
                      setIsMusicModalOpen(false);
                      navigateToPage("contact");
                      setTimeout(() => {
                        const el = document.getElementById("my-favorite-music-comp");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 200);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-ink text-xs font-hand font-extrabold border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    title="View inline under Contact & Hobbies page"
                  >
                    View Inline ↗
                  </button>
                  <button 
                    onClick={() => setIsMusicModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-pink-100 text-pink-950 border-2 border-ink font-black hover:bg-pink-200 active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer shrink-0"
                    aria-label="Close Pop Up"
                    title="Close Window"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scroll-free Content Container */}
              <div className="p-4 bg-stone-50 rounded-b-xl relative z-10 overflow-visible h-auto">
                <MyFavoriteMusic isModalView={true} />
              </div>

              {/* Footer status bar */}
              <div className="bg-zinc-100 border-t-2 border-ink p-2.5 rounded-b-xl flex items-center justify-between text-ink select-none font-mono text-[9px] sm:text-[10px] uppercase font-bold text-zinc-500 shrink-0">
                <span>SYSTEM: COMPACT FOCUS VIBES</span>
                <span className="text-pink-600 font-extrabold animate-pulse">● BAO'S MUSIC OK</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📄 RESUME PDF VIEWER MODAL 📄 */}
      <AnimatePresence>
        {isResumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResumeModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            
            {/* Window Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 28, stiffness: 380 }}
              className="relative bg-white border-4 border-ink rounded-2xl w-full max-w-4xl md:max-w-5xl shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] z-10 flex flex-col h-[90vh] max-h-[90vh] select-none"
            >
              {/* Header bar */}
              <div className="bg-emerald-600 text-white border-b-4 border-ink p-3 flex items-center justify-between select-none relative z-20 shrink-0">
                <div className="flex items-center gap-2 mr-3 min-w-0">
                  <span className="w-3.5 h-3.5 rounded-full bg-white border-2 border-ink flex items-center justify-center text-[8px] font-black font-sans text-emerald-600 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">
                    ★
                  </span>
                  <span className="font-hand text-lg md:text-xl font-black text-white drop-shadow-sm tracking-wide truncate">
                    📄 Bao You - Professional Resume PDF
                  </span>
                </div>
                
                {/* Control Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 select-none relative z-30">
                  <a 
                    href={resumePdf} 
                    download="Bao_You_Resume.pdf"
                    className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-ink text-xs font-hand font-extrabold border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    title="Download PDF directly"
                  >
                    Download PDF ⬇
                  </a>
                  <a 
                    href={resumePdf} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-ink text-xs font-hand font-extrabold border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    title="Open PDF in a new tab"
                  >
                    Open New Tab ↗
                  </a>
                  <button 
                    onClick={() => setIsResumeModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-950 border-2 border-ink font-black hover:bg-emerald-200 active:translate-y-0.5 flex items-center justify-center transition-all cursor-pointer shrink-0"
                    aria-label="Close Pop Up"
                    title="Close Window"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* PDF Frame Area */}
              <div className="flex-1 bg-zinc-150 p-2 relative z-10 overflow-hidden flex flex-col">
                <iframe 
                  src={resumePdf} 
                  className="w-full h-full border-3 border-ink rounded-lg bg-white shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1)]" 
                  title="Bao You Resume PDF Viewer"
                />
              </div>

              {/* Footer status bar */}
              <div className="bg-zinc-100 border-t-2 border-ink p-2.5 rounded-b-xl flex items-center justify-between text-ink select-none font-mono text-[9px] sm:text-[10px] uppercase font-bold text-zinc-500 shrink-0">
                <span>FILE SOURCE: SECURE PORTFOLIO ENGINE</span>
                <span className="text-emerald-600 font-extrabold animate-pulse">● ONLINE PDF VIEWER OK</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resume Download Toast Notification */}
      <AnimatePresence>
        {showResumeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-highlight border-3 border-ink p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex items-center gap-3 font-sans"
          >
            <div className="bg-emerald-100 border-2 border-ink text-emerald-800 p-1.5 rounded-lg shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-hand font-extrabold text-ink text-sm sm:text-base">Download Confirmed!</p>
              <p className="text-zinc-600 text-xs mt-0.5">Your resume PDF download has been initiated successfully.</p>
            </div>
            <button
              onClick={() => setShowResumeToast(false)}
              className="text-zinc-400 hover:text-ink shrink-0 font-bold self-start text-sm select-none cursor-pointer"
              aria-label="Close notification"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
