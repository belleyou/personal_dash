import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Building, 
  Cpu, 
  Sparkles, 
  Navigation, 
  Heart, 
  X, 
  ArrowUpRight, 
  CheckCircle2, 
  Info 
} from "lucide-react";
import sfBayMiniatureImg from "../assets/images/sf_bay_miniature_transparent_1785703019042.jpg";
import { 
  RubrikSketchSvg,
  QuantcastSketchSvg,
  GoogleLogoSketchSvg,
  SalesforceLogoSketchSvg,
  IHerbLogoSketchSvg
} from "./DoodleDrawings";

export type WeatherType = "stars" | "off";

interface Landmark {
  id: string;
  name: string;
  category: "landmark" | "technology" | "architecture";
  description: string;
  funFact: string;
  techStack?: string;
  x: string; // positioning percentage for absolute overlay
  y: string;
  icon: React.ReactNode;
  color: string;
}

interface SFBayMiniatureProps {
  activePage: string;
  onNavigate: (page: string, targetSection?: string) => void;
  onSubmitProjectClick: () => void;
  onMusicClick: () => void;
  isDarkPolarity?: boolean;
  onTogglePolarity?: () => void;
}

export const SFBayMiniature: React.FC<SFBayMiniatureProps> = ({
  activePage,
  onNavigate,
  onSubmitProjectClick,
  onMusicClick,
  isDarkPolarity = false,
  onTogglePolarity
}) => {
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [localDarkPolarity, setLocalDarkPolarity] = useState(isDarkPolarity);

  // Sync cursor position for custom heart cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('a, button, input, [role="button"], .cursor-pointer');
        setIsHoveringInteractive(isInteractive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handlePolarityToggle = () => {
    const nextState = !localDarkPolarity;
    setLocalDarkPolarity(nextState);
    if (onTogglePolarity) {
      onTogglePolarity();
    } else {
      if (nextState) {
        document.documentElement.classList.add("dark-polarity");
      } else {
        document.documentElement.classList.remove("dark-polarity");
      }
    }
  };

  const landmarks: Landmark[] = [
    {
      id: "goldengate",
      name: "Golden Gate Bridge",
      category: "landmark",
      description: "The world's most iconic International Orange suspension bridge spanning the beautiful Golden Gate strait.",
      funFact: "The bridge's orange color was originally intended only as a primer, but architect Irving Morrow preferred it to traditional black or grey!",
      techStack: "Structural Steel, Wind Dynamics",
      x: "15%",
      y: "48%",
      icon: <Navigation className="h-3.5 w-3.5" />,
      color: "from-red-500 to-orange-600",
    },
    {
      id: "presidio",
      name: "The Presidio of San Francisco",
      category: "landmark",
      description: "A vast, lush former military outpost now serving as an expansive national park site filled with eucalyptus groves and scenic trails.",
      funFact: "It is home to the Letterman Digital Arts Center, the global headquarters of Lucasfilm and the famous bronze Yoda fountain!",
      techStack: "Eco-conservation, micro-climate mapping",
      x: "12%",
      y: "36%",
      icon: <MapPin className="h-3.5 w-3.5" />,
      color: "from-emerald-600 to-green-700",
    },
    {
      id: "transamerica",
      name: "Transamerica Pyramid",
      category: "architecture",
      description: "The classic brutalist modernist pyramid that defined San Francisco's skyline for generations.",
      funFact: "The foundation is 9 feet thick and rests on a solid bed of sand and clay, engineered to withstand powerful San Francisco tremblers.",
      techStack: "Modernist brutalism, seismic tieback rods",
      x: "54%",
      y: "22%",
      icon: <Building className="h-3.5 w-3.5" />,
      color: "from-zinc-400 to-zinc-600",
    },
    {
      id: "salesforcetower",
      name: "Salesforce Tower",
      category: "architecture",
      description: "The tallest architectural masterpiece in San Francisco's skyline, serving as a beacon of SaaS and Cloud Computing.",
      funFact: "Its crown features a permanent 9-story LED art installation by Jim Campbell, casting atmospheric lights reflecting the city's vibe.",
      techStack: "Cloud CRM, Enterprise APIs",
      x: "59%",
      y: "26%",
      icon: <Building className="h-3.5 w-3.5" />,
      color: "from-blue-500 to-sky-600",
    },
    {
      id: "cablecar",
      name: "Powell-Hyde Cable Car",
      category: "architecture",
      description: "SF's rolling kinetic historic monument, ascending the near-vertical hills of California and Hyde Streets.",
      funFact: "It is the world's last manually operated cable car system, using mechanical grip-men to latch onto a moving underground steel cable!",
      techStack: "Mechanical Grip Systems, Steel Cables",
      x: "34%",
      y: "72%",
      icon: <MapPin className="h-3.5 w-3.5" />,
      color: "from-amber-500 to-yellow-600",
    },
    {
      id: "techhub",
      name: "GTM Hub & AI Server",
      category: "technology",
      description: "The high-tech backbone of Silicon Valley, driving autonomous computing, LLMs, and real-time Revenue Operations.",
      funFact: "Integrates GTM flows and AI models server-side to orchestrate Salesforce triggers and CPQ structures automatically.",
      techStack: "Vibe Coding, Node.js, Gemini API, GTM Automations",
      x: "62%",
      y: "65%",
      icon: <Cpu className="h-3.5 w-3.5" />,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  const themeBgClass = localDarkPolarity ? "bg-slate-900 text-slate-100" : "bg-[#f4f0ea] text-[#18181b]";
  const cellBgClass = localDarkPolarity ? "bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700" : "bg-white border-[#18181b] text-[#18181b] hover:bg-emerald-50";
  const borderClass = localDarkPolarity ? "border-slate-700" : "border-[#18181b]";

  return (
    <div className={`w-full min-h-screen ${themeBgClass} transition-colors duration-300 font-sans relative selection:bg-emerald-200 selection:text-ink overflow-hidden pb-1 flex flex-col justify-between`}>
      
      {/* Background Flashing Shiny Stars Scattered Across Full Homepage */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <span className="absolute top-[3%] left-[4%] text-amber-400 text-xl md:text-2xl animate-star-twinkle">✦</span>
        <span className="absolute top-[6%] right-[5%] text-emerald-400 text-lg md:text-xl animate-star-twinkle [animation-delay:0.8s]">✧</span>
        <span className="absolute top-[16%] left-[12%] text-sky-400 text-base md:text-lg animate-star-twinkle [animation-delay:1.5s]">✦</span>
        <span className="absolute top-[22%] right-[10%] text-amber-300 text-2xl animate-star-twinkle [animation-delay:0.4s]">✦</span>
        <span className="absolute top-[38%] left-[3%] text-emerald-500 text-xl animate-star-twinkle [animation-delay:1.2s]">✧</span>
        <span className="absolute top-[45%] right-[2%] text-amber-400 text-xl animate-star-twinkle [animation-delay:1.8s]">✦</span>
        <span className="absolute top-[62%] left-[6%] text-sky-400 text-lg animate-star-twinkle [animation-delay:0.6s]">✦</span>
        <span className="absolute top-[70%] right-[7%] text-emerald-400 text-2xl animate-star-twinkle [animation-delay:1.1s]">✧</span>
        <span className="absolute top-[82%] left-[10%] text-amber-400 text-xl animate-star-twinkle [animation-delay:1.7s]">✦</span>
        <span className="absolute top-[88%] right-[12%] text-sky-300 text-lg animate-star-twinkle [animation-delay:0.3s]">✧</span>
      </div>
      
      {/* 1. Custom 3D Angled Glove Pointer Cursor (Desktop Fine Pointer Devices) */}
      <div 
        className="heart-cursor" 
        aria-hidden="true"
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px`,
          transform: `translate(-18%, -8%) scale(${isMouseDown ? 0.85 : isHoveringInteractive ? 1.25 : 1.0})`,
          pointerEvents: "none"
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-12 h-12 select-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="handTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="hand3dBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
          </defs>

          {/* 3D Black/Dark Extrusion Depth Layer */}
          <path
            d="M 28 10 C 22 10 18 15 20 25 L 30 46 C 24 44 16 48 17 58 C 18 68 28 78 43 86 C 58 92 70 86 76 74 C 80 64 75 52 68 45 C 71 40 70 34 63 30 C 58 27 53 28 50 31 C 48 26 43 24 38 26 L 28 10 Z"
            fill="url(#hand3dBevel)"
            transform="translate(4, 5)"
          />

          {/* Black Outer Contour Line */}
          <path 
            d="M 28 8 C 22 8 18 13 20 23 L 30 44 C 24 42 16 46 17 56 C 18 66 28 76 43 84 C 58 90 70 84 76 72 C 80 62 75 50 68 43 C 71 38 70 32 63 28 C 58 25 53 26 50 29 C 48 24 43 22 38 24 L 28 8 Z"
            fill="#18181b" 
          />
          
          {/* Main White Glossy 3D Surface */}
          <path 
            d="M 28 11 C 24 11 21 15 23 23 L 32 42 C 27 40 20 44 21 52 C 22 60 30 70 43 78 C 56 84 66 80 71 70 C 74 61 70 51 64 45 C 67 41 66 36 60 32 C 56 29 52 30 49 33 C 47 29 43 27 38 29 L 28 11 Z"
            fill="url(#handTopGrad)" 
          />

          {/* Finger Grooves & Separator Lines */}
          <path d="M 41 39 L 51 57" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 50 34 L 59 52" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 58 40 L 65 52" stroke="#18181b" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Thumb Crease */}
          <path d="M 33 46 Q 26 44 24 50" stroke="#18181b" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Soft Highlight Glare */}
          <path d="M 27 15 L 30 30" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>

      <main className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 pt-2 pb-1 space-y-3 flex-1 flex flex-col justify-between">
        
        {/* 2. MASTHEAD / BRAND HEADER */}
        <header className={`flex items-center justify-between border-b-2 ${borderClass} pb-4 pt-2`}>
          <a 
            className="flex items-center gap-2.5 font-sans font-bold text-sm md:text-base hover:opacity-85 transition-opacity" 
            href="#top" 
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            aria-label="Welcome to the Animation World home"
          >
            <span className="text-red-500 text-xl font-bold select-none">♥</span>
            <span className="tracking-tight font-extrabold text-xs sm:text-sm md:text-base">
              Welcome to the Animation World - Bao You - GTM RevOps AI Systems Architect Pro.
            </span>
          </a>
          
          <button 
            className="polarity-button bg-emerald-100 hover:bg-emerald-200 text-[#18181b] border-2 border-[#18181b] font-mono text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer shrink-0" 
            type="button" 
            id="polarity"
            onClick={handlePolarityToggle}
          >
            SWITCH POLARITY
          </button>
        </header>

        {/* 3. EDITORIAL NAVIGATION GRID (ROOM 01 to ROOM 07) */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2" aria-label="Primary navigation">
          {[
            { room: "ROOM 01", label: "HOME", target: "home", color: "bg-emerald-100" },
            { room: "ROOM 02", label: "ABOUT", target: "about", color: "bg-white" },
            { room: "ROOM 03", label: "CERTIFICATIONS", target: "certifications", color: "bg-white" },
            { room: "ROOM 04", label: "PROJECTS", target: "projects", color: "bg-white" },
            { room: "ROOM 05", label: "ARTICLES", target: "articles", color: "bg-white" },
            { room: "ROOM 06", label: "CAREER", target: "career", color: "bg-white" },
            { room: "ROOM 07", label: "CONTACT & HOBBIES", target: "contact", color: "bg-white" },
          ].map((navItem) => {
            const isCurrent = activePage === navItem.target;
            return (
              <a 
                key={navItem.target}
                href={`#${navItem.target}`} 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(navItem.target);
                }}
                className={`p-3 border-2 ${borderClass} rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] cursor-pointer flex flex-col justify-between ${
                  isCurrent 
                    ? "bg-emerald-200 text-[#18181b]" 
                    : `${cellBgClass}`
                }`}
              >
                <small className="font-mono text-[9px] font-bold tracking-wider text-slate-500 uppercase">{navItem.room}</small>
                <strong className="font-sans font-black text-xs md:text-sm tracking-tight mt-1">{navItem.label}</strong>
              </a>
            );
          })}
        </nav>

        {/* 4. ACTION ZONE / RULED ROW */}
        <section className={`grid grid-cols-1 sm:grid-cols-2 gap-2 border-y-2 ${borderClass} py-2`} aria-label="Project actions">
          <a 
            className={`p-3.5 border-2 ${borderClass} rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] cursor-pointer flex items-center justify-between ${cellBgClass}`}
            href="#submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmitProjectClick();
            }}
          >
            <div>
              <small className="font-mono text-[9px] font-bold tracking-wider text-emerald-600 block uppercase">POSITION</small>
              <strong className="font-sans font-black text-xs md:text-sm tracking-tight">SUBMIT A PROJECT</strong>
            </div>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </a>

          <a 
            className={`p-3.5 border-2 ${borderClass} rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all hover:-translate-y-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] cursor-pointer flex items-center justify-between ${cellBgClass}`}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            <div>
              <small className="font-mono text-[9px] font-bold tracking-wider text-emerald-600 block uppercase">POSITION</small>
              <strong className="font-sans font-black text-xs md:text-sm tracking-tight">LET’S CHAT</strong>
            </div>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </a>
        </section>

        {/* 5. LARGE HORIZONTAL OBSERVATION AREA */}
        <section className={`border-2 ${borderClass} rounded-2xl p-3.5 md:p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] ${localDarkPolarity ? "bg-slate-950" : "bg-white"} space-y-3 md:space-y-4 flex-1 flex flex-col justify-start`} id="top">
          
          {/* Top Full-Width Horizontal Company Logos Strip */}
          <div className={`border-2 ${borderClass} rounded-2xl p-3 md:p-4 bg-white flex items-center justify-around gap-2 md:gap-6 relative overflow-x-auto shadow-xs`}>
            
            {/* SpaceX Rocket Animated Overlay */}
            <div 
              onClick={() => onNavigate("career", "spacex")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0" 
              title="SpaceX Experience — Click to view career log"
            >
              <div className="spacex-rocket-animated">
                <svg viewBox="0 0 100 100" className="h-10 w-10 inline-block select-none" xmlns="http://www.w3.org/2000/svg" aria-label="SpaceX Rocket">
                  <path d="M 50 70 Q 42 84 50 96 Q 58 84 50 70" fill="#f97316" stroke="#18181b" strokeWidth="2.5" />
                  <path d="M 50 72 Q 46 80 50 90 Q 54 80 50 72" fill="#facc15" />
                  <path d="M 50 12 C 37 42, 37 68, 50 70 C 63 68, 63 42, 50 12 Z" fill="#ffffff" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M 46 36 L 54 44 M 54 36 L 46 44" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 38 52 Q 22 66, 38 66 Z" fill="#dc2626" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M 62 52 Q 78 66, 62 66 Z" fill="#dc2626" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="50" cy="28" r="5" fill="#38bdf8" stroke="#18181b" strokeWidth="2" />
                </svg>
              </div>
              <span className="font-mono text-[9px] font-black text-[#18181b] mt-0.5">SpaceX</span>
            </div>

            {/* Rubrik */}
            <div 
              onClick={() => onNavigate("career", "rubrik")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Rubrik Experience"
            >
              <RubrikSketchSvg className="h-11 w-11" />
            </div>

            {/* Quantcast */}
            <div 
              onClick={() => onNavigate("career", "quantcast")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Quantcast Experience"
            >
              <QuantcastSketchSvg className="h-10 w-10" />
              <span className="font-mono text-[9px] font-black text-[#18181b] mt-0.5">Quantcast</span>
            </div>

            {/* Google */}
            <div 
              onClick={() => onNavigate("career", "google")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Google Experience"
            >
              <GoogleLogoSketchSvg className="h-10 w-10" />
              <span className="font-mono text-[9px] font-black text-[#18181b] mt-0.5">Google</span>
            </div>

            {/* Salesforce */}
            <div 
              onClick={() => onNavigate("career", "salesforce")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="Salesforce Experience"
            >
              <SalesforceLogoSketchSvg className="h-10 w-16" />
              <span className="font-mono text-[9px] font-black text-[#18181b] mt-0.5">salesforce</span>
            </div>

            {/* iHerb */}
            <div 
              onClick={() => onNavigate("career", "iherb")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-transform shrink-0"
              title="iHerb Experience"
            >
              <IHerbLogoSketchSvg className="h-10 w-10" />
              <span className="font-mono text-[9px] font-black text-[#18181b] mt-0.5">iHerb</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full flex flex-col items-center justify-between space-y-4 py-2">
            
            {/* Top Row: Copy Block + Curiosity Level Status Box */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
              
              {/* Left Copy Block */}
              <div className="space-y-1.5 bg-white p-3 md:p-4 rounded-xl border-2 border-[#18181b] shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] max-w-md">
                <p className="cell-label font-mono text-[10px] font-bold tracking-widest text-emerald-600 uppercase">
                  FIELD EXPERIENCE / SELECTED SIGNALS
                </p>
                
                <p className="aside-copy font-sans font-black text-xs md:text-sm lg:text-base leading-snug tracking-tight text-emerald-600">
                  BUILT WITH CURIOUS TEAMS.<br />
                  SHIPPED ACROSS CLOUDS.<br />
                  STILL ASKING "WHAT IF?"
                </p>
              </div>

              {/* Curiosity Level Status Box */}
              <div className="mood bg-emerald-100 border-2 border-[#18181b] p-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-baseline gap-1.5">
                  <strong className="font-hand font-extrabold text-3xl text-[#18181b]">120</strong>
                  <span className="font-mono text-[9px] font-bold text-[#18181b] uppercase leading-none">
                    CURIOSITY<br />LEVEL
                  </span>
                </div>
                <div className="w-12 sm:w-14 h-2 bg-emerald-300 rounded-full overflow-hidden border border-[#18181b] shrink-0">
                  <div className="w-full h-full bg-emerald-600"></div>
                </div>
              </div>
            </div>

            {/* Middle: Floating Hero Animation Image Stage in Circular Frame */}
            <div className="relative w-full flex items-center justify-center my-1 pointer-events-auto -translate-y-20 sm:-translate-y-24 -mb-20 sm:-mb-24">
              <div className="hero-artwork-float flex items-center justify-center transform rotate-1 hover:scale-105 transition-transform duration-300">
                <div className="w-[430px] h-[430px] sm:w-[520px] sm:h-[520px] md:w-[585px] md:h-[585px] rounded-full border-4 border-[#18181b] bg-white shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] overflow-hidden flex items-center justify-center p-2 sm:p-4 shrink-0">
                  <img 
                    src={sfBayMiniatureImg} 
                    alt="A child turned 45 degrees right holding a heart balloon on a miniature San Francisco Bay Area island" 
                    className="w-full h-full object-cover scale-105 select-none rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Surrounding Flashing Shiny Stars & Sparkles */}
              <span className="spark absolute top-2 right-6 sm:right-12 text-amber-400 text-3xl animate-star-twinkle pointer-events-none">
                ✦
              </span>
              <span className="spark absolute top-8 left-4 sm:left-10 text-emerald-400 text-2xl animate-star-twinkle [animation-delay:0.7s] pointer-events-none">
                ✧
              </span>
              <span className="spark absolute bottom-4 right-8 sm:right-16 text-sky-400 text-3xl animate-star-twinkle [animation-delay:1.4s] pointer-events-none">
                ✦
              </span>
              <span className="spark absolute bottom-8 left-6 sm:left-12 text-amber-300 text-xl animate-star-twinkle [animation-delay:0.3s] pointer-events-none">
                ✦
              </span>
            </div>

            {/* Bottom Row Headline Banner: THINK AI SIDEWAYS (Positioned directly below the floating image) */}
            <div className="w-full flex justify-center pt-2 pb-1 z-10 -translate-y-16 sm:-translate-y-20 -mb-16 sm:-mb-20">
              <div className="bg-white p-3 sm:p-4 md:p-5 rounded-2xl border-2 border-[#18181b] shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] inline-block text-center">
                <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-none text-[#18181b] uppercase select-none">
                  <span className="text-emerald-500 underline decoration-4 underline-offset-4">THINK AI SIDEWAYS</span>
                </h1>
              </div>
            </div>

          </div>
        </section>

        {/* Selected Landmark Modal Popup */}
        <AnimatePresence>
          {selectedLandmark && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-900 border-3 border-[#18181b] rounded-2xl max-w-md w-full p-5 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4 relative"
              >
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${selectedLandmark.color} text-white shadow`}>
                    {selectedLandmark.icon}
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-lg text-slate-900 dark:text-white">{selectedLandmark.name}</h3>
                    <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">{selectedLandmark.category}</span>
                  </div>
                </div>

                <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedLandmark.description}
                </p>

                <div className="bg-emerald-50 dark:bg-slate-800/80 p-3 rounded-xl border border-emerald-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <Info className="h-3.5 w-3.5" /> FUN FACT
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-snug">
                    {selectedLandmark.funFact}
                  </p>
                </div>

                {selectedLandmark.techStack && (
                  <div className="text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Tech Stack:</span> {selectedLandmark.techStack}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 6. IDENTITY FOOTER */}
        <footer className="pt-2 pb-1 mt-1 border-t-2 border-dashed border-zinc-300 dark:border-zinc-800 text-center select-none">
          <p className="font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-none">
            COPYRIGHT © 2026 HYROXBY TECH LLC
          </p>
        </footer>
      </main>
    </div>
  );
};
