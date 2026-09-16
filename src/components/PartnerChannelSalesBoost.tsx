import React, { useState } from "react";
import { 
  Maximize2, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Briefcase
} from "lucide-react";

interface ImageItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  src: string;
  fallbackSvg?: string;
  description: string;
  tags: string[];
}

const IMAGES_DATA: ImageItem[] = [
  {
    id: "system-input-flow",
    title: "1. System Input & AI Agent Flow Architecture",
    subtitle: "Quote Creation Copilot in Slack/Grok to Automated AI Agent Branches",
    badge: "AI Architecture & Branching",
    src: "/partner_channel_boost_1.png",
    description: "End-to-end system input trigger capturing quote creation commands in Slack/Grok, OMS / Deal Registration deduplication, and five automated AI Agent branches: Generate Summary with seller/approver routing, Suggest Actions (Bundle, Discount Tier), Upsell/Renew Signal detection, Revenue Leakage risk flagging (Data Hygiene Issue & Pipeline Forecast Inaccuracy), and Task Triggers.",
    tags: ["NLP Copilot", "AI Agents", "Slack/Grok", "OMS / Deal Reg", "Seller & Approver", "Risk Flags"]
  },
  {
    id: "figma-solution-workflow",
    title: "2. Figma Architecture Workflow: Problem vs. AI Solution",
    subtitle: "End-to-End Blueprint from Slow Manual Onboarding to Unified AI Engine",
    badge: "Figma Full System Blueprint",
    src: "/partner_channel_boost_2.png",
    description: "Detailed system architecture designed in Figma contrasting the Current Process (slow, manual OMS, dedupe lead submission, deal claims, approval bottlenecks causing revenue leaks and hygiene issues) against The Solution: AI Agents & NLP Integration, Deal Reg Agent in Slack, Approval Agent with data normalization, Match LMS Patch, and a structured 5-step analysis pipeline (Summary Deal Context ➔ Recommend ➔ Dedupe ➔ Categorize ➔ Reasoning Risk) to maximize partner ROI.",
    tags: ["Figma Design", "Current vs Solution", "Approval Agent", "Match LMS", "Fast Approval", "Partner ROI"]
  },
  {
    id: "pm-tasks-matrix",
    title: "3. Challenges vs. PM Tasks Execution Matrix",
    subtitle: "Systematic GTM Product Management Challenge-to-Task Mapping",
    badge: "PM Execution Matrix",
    src: "/partner_channel_boost_3.png",
    description: "Comprehensive 10-tier Product Management breakdown mapping every critical GTM challenge to its corresponding technical and operational PM task: Trigger (Interview), Objects/Fields (Discovery Phase), LMS Match (Analysis, KPI Metrics), Map/Modeling/Govt, Patch (prompt, implement), Migrate (model, memory), Prompt (dedupe, sync), Rule (Enable/Feedback), AI Gate (sync), and Human-In-The-Loop CRM Sync.",
    tags: ["Challenges vs Tasks", "GTM PM Framework", "LMS Match", "AI Gate", "Human-In-The-Loop", "CRM Sync"]
  }
];

export const PartnerChannelSalesBoost: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleOpenLightbox = (item: ImageItem) => {
    setSelectedImage(item);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  return (
    <div id="partner-channel-sales-boost-page" className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              Partner Channel Sales Boost Architecture
            </div>
            <span className="text-xs text-blue-200/80 font-mono bg-white/10 px-3 py-1 rounded-md">
              3 Original Diagrams in One Page
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Partner Channel Sales Boost
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Direct visual showcase of the original three system flowcharts and architecture diagrams. 
            Displaying the end-to-end partner onboarding transformation, AI agent copilot orchestration, 
            and the comprehensive GTM PM challenges-to-tasks execution matrix.
          </p>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/15">
            <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider mr-1">Quick Jump:</span>
            {IMAGES_DATA.map((img, idx) => (
              <a
                key={img.id}
                href={`#${img.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all duration-150 border border-white/10 hover:border-white/25"
              >
                <span className="w-4 h-4 rounded-full bg-blue-400 text-blue-950 font-bold flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                {idx === 0 ? "System Input & AI Flow" : idx === 1 ? "Figma Architecture" : "Challenges & PM Tasks"}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* The 3 Images Displayed in One Page */}
      <div className="space-y-10">
        {IMAGES_DATA.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Diagram Title Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              {/* Actions: Full Screen & Download */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(item)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors cursor-pointer"
                  title="View full size with zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                  Full Size
                </button>
                <a
                  href={item.src}
                  download={`partner_channel_boost_${index + 1}.png`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-lg shadow-2xs transition-colors"
                  title="Download original image"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  Save
                </a>
              </div>
            </div>

            {/* Main Image Frame */}
            <div className="p-4 sm:p-8 bg-slate-100/60 flex items-center justify-center min-h-[300px]">
              <div 
                className="w-full max-w-5xl rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group relative"
                onClick={() => handleOpenLightbox(item)}
              >
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 text-white text-xs font-medium px-3.5 py-2 rounded-lg shadow-lg flex items-center gap-2 backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5" /> Click to enlarge & zoom
                  </span>
                </div>
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-contain mx-auto block max-h-[750px]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Context & Description Footer */}
            <div className="p-5 sm:p-6 bg-white border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Architecture Breakdown & Details
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-slate-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox / Full-screen Zoom Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Top Control Bar */}
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/20">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-xs text-white/70">
                {selectedImage.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-white/80 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <a
                href={selectedImage.src}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-2"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Image Viewport */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <div 
              className="transition-transform duration-150 origin-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg shadow-2xl bg-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
