import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Building, Cpu, Sparkles, Navigation, Music } from "lucide-react";
import sfBayMiniatureImg from "../assets/images/sf_bay_miniature_3d_1784421037247.jpg";
import { 
  SpaceXRocketSketchSvg,
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
}

export const SFBayMiniature: React.FC<SFBayMiniatureProps> = ({
  activePage,
  onNavigate,
  onSubmitProjectClick,
  onMusicClick
}) => {
  const [activeWeather, setActiveWeather] = useState<WeatherType>("stars");
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

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
      icon: <Navigation className="h-4 w-4" />,
      color: "from-red-500 to-orange-600",
    },
    {
      id: "presidio",
      name: "The Presidio of San Francisco",
      category: "landmark",
      description: "A vast, lush former military outpost now serving as an expansive national park site filled with eucalyptus groves, historic barracks, and scenic hiking trails.",
      funFact: "It is home to the Letterman Digital Arts Center, the global headquarters of Lucasfilm and the famous bronze Yoda fountain!",
      techStack: "Eco-conservation, micro-climate mapping, high-definition spatial databases",
      x: "12%",
      y: "36%",
      icon: <MapPin className="h-4 w-4" />,
      color: "from-emerald-600 to-green-700",
    },
    {
      id: "fishermanswharf",
      name: "Fisherman's Wharf",
      category: "landmark",
      description: "SF's historic coastal waterfront hub, famous for seafood stands, fresh sourdough clam chowder bowls, and sunbathing sea lions at Pier 39.",
      funFact: "The resident colony of California sea lions took over the Pier 39 docks shortly after the Loma Prieta earthquake in 1989!",
      techStack: "Aquatic telemetry trackers, sustainable fishery supply routes",
      x: "32%",
      y: "26%",
      icon: <MapPin className="h-4 w-4" />,
      color: "from-cyan-500 to-blue-600",
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
      icon: <Building className="h-4 w-4" />,
      color: "from-zinc-400 to-zinc-600",
    },
    {
      id: "salesforcetower",
      name: "Salesforce Tower",
      category: "architecture",
      description: "The tallest architectural masterpiece in San Francisco's skyline, serving as a beacon of SaaS and Cloud Computing.",
      funFact: "Its crown features a permanent 9-story LED art installation by Jim Campbell, casting atmospheric lights reflecting the city's vibe.",
      techStack: "Cloud CRM, Enterprise APIs, High-Performance Concrete",
      x: "59%",
      y: "26%",
      icon: <Building className="h-4 w-4" />,
      color: "from-blue-500 to-sky-600",
    },
    {
      id: "cablecar",
      name: "Powell-Hyde Cable Car",
      category: "architecture",
      description: "SF's rolling kinetic historic monument, ascending the near-vertical hills of California and Hyde Streets.",
      funFact: "It is the world's last manually operated cable car system, using mechanical grip-men to latch onto a moving underground steel cable!",
      techStack: "Mechanical Grip Systems, Steel Cables, Kinetic Traction",
      x: "34%",
      y: "72%",
      icon: <MapPin className="h-4 w-4" />,
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
      icon: <Cpu className="h-4 w-4" />,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "baybridge",
      name: "San Francisco-Oakland Bay Bridge",
      category: "landmark",
      description: "A colossal complex of steel and concrete bridges spanning San Francisco Bay, handling massive daily commuter flows and linking SF to the East Bay.",
      funFact: "Its western span features 'The Bay Lights,' a monumental kinetic light sculpture of 25,000 individually programmable white LED lights!",
      techStack: "Double-deck suspension steel, LED kinetic automation pipelines",
      x: "82%",
      y: "68%",
      icon: <Navigation className="h-4 w-4 rotate-45" />,
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "chasecenter",
      name: "Chase Center",
      category: "architecture",
      description: "The state-of-the-art sports and entertainment arena in Mission Bay, home to the Golden State Warriors and premier global performance tours.",
      funFact: "The arena features a massive 3.2-acre public plaza filled with dynamic interactive displays, curated fine art, and retail pavilions.",
      techStack: "High-density crowd telemetry, real-time ticket ledger protocols",
      x: "76%",
      y: "84%",
      icon: <Building className="h-4 w-4" />,
      color: "from-amber-600 to-rose-600",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 p-1 relative select-none">
      
      {/* 3D Atmospheric Miniature Landscape Wrapper */}
      <div className="bg-[#F2F0EF] rounded-2xl border-3 border-emerald-800/40 p-5 md:p-6 shadow-md relative overflow-hidden flex flex-col items-center">
        
        {/* Immersive Background Weather Atmospheres (Dynamic CSS Overlays) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          
          {/* Star Shining Overlay */}
          <AnimatePresence>
            {activeWeather === "stars" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 overflow-hidden pointer-events-none"
              >
                {/* Magical ambient warm night/deep-space-like translucent tint to make the stars pop */}
                <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-radial from-amber-300/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Group of shimmering 5-pointed stars */}
                <div className="absolute inset-0">
                  {[...Array(18)].map((_, i) => {
                    const delay = i * 0.3;
                    const duration = 2.0 + (i % 3) * 0.8;
                    const scale = 0.4 + (i % 3) * 0.25;
                    const left = `${(i * 9) % 92 + 4}%`;
                    const top = `${(i * 13) % 80 + 8}%`;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute text-amber-400"
                        style={{ left, top }}
                        animate={{
                          scale: [0, scale, 0],
                          opacity: [0, 1, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay,
                        }}
                      >
                        <svg className="w-5 h-5 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)] fill-current text-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.2L22 11.6l-5.6 4.4L18 22l-6-4.5L6 22l1.6-6-5.6-4.4 7.6-2.4z" />
                        </svg>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Header Controls: Navigation and GTM actions, centered vertically and horizontally at the top */}
        <div className="w-full flex flex-col items-center justify-center gap-4 z-20 pb-4 border-b border-emerald-800/10">
          
          {/* Embedded Navigation Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
            {[
              { id: "home", label: "HOME", color: "bg-pink-200 hover:bg-pink-300" },
              { id: "about", label: "ABOUT", color: "bg-white hover:bg-emerald-100" },
              { id: "certifications", label: "CERTIFICATIONS", color: "bg-white hover:bg-orange-100" },
              { id: "projects", label: "PROJECTS", color: "bg-white hover:bg-amber-100" },
              { id: "articles", label: "ARTICLES", color: "bg-white hover:bg-sky-100" },
              { id: "career", label: "CAREER", color: "bg-white hover:bg-purple-100" },
              { id: "contact", label: "CONTACT & HOBBIES", color: "bg-white hover:bg-rose-100" },
            ].map((item) => {
              const isSelected = activePage === item.id;
              const tilt = item.id === "home" ? "rotate-[-1deg]" : item.id === "about" ? "rotate-[1deg]" : item.id === "certifications" ? "rotate-[-0.8deg]" : item.id === "projects" ? "rotate-[-1.5deg]" : item.id === "articles" ? "rotate-[1.5deg]" : item.id === "career" ? "rotate-[0.5deg]" : item.id === "contact" ? "rotate-[1.2deg]" : "rotate-[-1.5deg]";
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3.5 py-1.5 font-hand text-xs md:text-sm font-extrabold transition-all duration-150 border-2 border-ink rounded-lg shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1.5px_1.5px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1.5 cursor-pointer ${tilt} ${
                    isSelected 
                      ? "bg-highlight text-ink" 
                      : `${item.color} text-ink`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* "Submit a Project" Button */}
            <button
              onClick={onSubmitProjectClick}
              className="px-3.5 py-1.5 font-hand text-xs md:text-sm font-extrabold transition-all duration-150 border-2 border-ink rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-950 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1.5px_1.5px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1.5 cursor-pointer rotate-[-0.8deg]"
            >
              <Cpu className="h-3.5 w-3.5 text-emerald-800 animate-pulse" />
              <span>Submit a Project</span>
            </button>

            {/* "Let's Chat" Button - matches the Submit a Project style format and rename MEET ME to Let's Chat */}
            <button
              onClick={() => onNavigate("meet")}
              className="px-3.5 py-1.5 font-hand text-xs md:text-sm font-extrabold transition-all duration-150 border-2 border-ink rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-950 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4.5px_4.5px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1.5px_1.5px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1.5 cursor-pointer rotate-[1.1deg]"
            >
              <Navigation className="h-3.5 w-3.5 text-emerald-800 animate-bounce" />
              <span>Let's Chat</span>
            </button>
          </div>
        </div>

        {/* 💡 INSTRUCTION BANNER & COMPANY ICONS 💡 */}
        <div className="w-full max-w-4xl text-center mt-4 mb-2 z-20 flex flex-col items-center gap-3">
          <div className="inline-block bg-emerald-50/90 border border-emerald-800/20 px-5 py-2 rounded-xl text-emerald-950 font-hand text-xs md:text-sm font-black shadow-xs">
            Welcome To The Automation World
          </div>

          {/* 3D cartoon icons of the companies: SpaceX, Rubrik, Quantcast, Google, Salesforce, iHerb */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 bg-white/70 backdrop-blur-xs px-6 py-3 rounded-2xl border-2 border-emerald-800/20 shadow-xs">
            <div 
              onClick={() => onNavigate("career", "spacex")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at SpaceX"
            >
              <SpaceXRocketSketchSvg className="h-10 w-10 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
              <span className="font-mono text-[9px] font-black text-zinc-700 group-hover:text-ink mt-0.5">SpaceX</span>
            </div>
            <div 
              onClick={() => onNavigate("career", "rubrik")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at Rubrik"
            >
              <RubrikSketchSvg className="h-10 w-10 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
              <span className="font-mono text-[9px] font-black text-zinc-700 group-hover:text-ink mt-0.5">Rubrik</span>
            </div>
            <div 
              onClick={() => onNavigate("career", "quantcast")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at Quantcast"
            >
              <QuantcastSketchSvg className="h-10 w-10 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
              <span className="font-mono text-[9px] font-black text-zinc-700 group-hover:text-ink mt-0.5">Quantcast</span>
            </div>
            <div 
              onClick={() => onNavigate("career", "google")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at Google"
            >
              <GoogleLogoSketchSvg className="h-10 w-22 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
            </div>
            <div 
              onClick={() => onNavigate("career", "salesforce")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at Salesforce"
            >
              <SalesforceLogoSketchSvg className="h-10 w-22 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
            </div>
            <div 
              onClick={() => onNavigate("career", "iherb")}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" 
              title="Click to explore Work Experience at iHerb"
            >
              <IHerbLogoSketchSvg className="h-10 w-22 hover:scale-115 transition-all duration-150 filter drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* Main Isometric 3D Miniature Display Frame */}
        <div className="relative w-full aspect-video md:aspect-[16/10] max-w-4xl mx-auto mt-2 rounded-xl border border-emerald-800/10 overflow-hidden shadow-sm bg-white/30 z-20">
          
          {/* Main 3D isometric image rendering of SF Bay Area */}
          <img
            src={sfBayMiniatureImg}
            alt="SF Bay Area 3D Miniature Isometric"
            className="w-full h-full object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Interactive Spotlights of spread out landmarks removed */}

          {/* Connected Lines Overlay to show networking across SF Bay */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-35 z-10">
            {/* Draw delicate dotted lines between technology and salesforce tower / Golden gate to highlight GTM operations */}
            <path
              d="M 150,220 Q 300,280 440,195 Q 560,250 512,300"
              fill="none"
              stroke="#047857"
              strokeWidth="2"
              strokeDasharray="4,6"
              className="animate-[dash_10s_linear_infinite]"
            />
            <path
              d="M 280,310 Q 420,290 512,300"
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="2,4"
            />
          </svg>
        </div>

        {/* Selected Landmark Interactive Details Panel */}
        <div className="w-full max-w-4xl mt-4 z-20">
          <AnimatePresence mode="wait">
            {selectedLandmark ? (
              <motion.div
                key={selectedLandmark.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-white/70 backdrop-blur-md rounded-xl border border-emerald-800/15 shadow-sm text-left flex flex-col md:flex-row md:items-start gap-4 relative"
              >
                {/* Category color pill */}
                <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedLandmark.color} text-white shrink-0 self-center md:self-start`}>
                  {selectedLandmark.icon}
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-hand text-lg font-black text-emerald-950">
                      {selectedLandmark.name}
                    </h4>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 rounded">
                      {selectedLandmark.category}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                     {selectedLandmark.description}
                  </p>

                  <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-800/5 text-[11px] font-sans text-emerald-900/90 italic">
                    <strong>Fun Fact:</strong> {selectedLandmark.funFact}
                  </div>

                  {selectedLandmark.techStack && (
                    <div className="text-[10px] font-mono text-zinc-500 pt-0.5">
                      <span className="font-semibold text-zinc-700">Underlying Tech:</span> {selectedLandmark.techStack}
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 p-1 rounded-full hover:bg-zinc-100 transition-colors"
                >
                  ✕
                </button>
              </motion.div>
            ) : (
              <div className="p-3 bg-white/30 rounded-xl border border-dashed border-emerald-800/10 text-center">
                <p className="font-hand text-xs text-zinc-500">
                  Welcome To The Automation World
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
