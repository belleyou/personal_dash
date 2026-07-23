import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Sparkles, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  TrendingUp, 
  Database, 
  Workflow, 
  Target, 
  HelpCircle, 
  Trash2, 
  PlusCircle, 
  RefreshCw, 
  Star,
  Clock,
  ArrowRight,
  Sliders,
  Maximize2,
  Minimize2,
  Copy,
  Link as LinkIcon
} from "lucide-react";

interface RevenueStreamlineCaseStudyProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

export const RevenueStreamlineCaseStudy: React.FC<RevenueStreamlineCaseStudyProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeDetailTab, setActiveDetailTab] = useState<"deck" | "solutions" | "stack" | "rollout" | "qa">("deck");
  const [expandedQA, setExpandedQA] = useState<number | null>(null);

  const totalSlides = 14;

  const slidesData = [
    {
      id: 1,
      title: "Revenue Systems Streamline Initiative",
      badge: "ENTERPRISE REVOPS ARCHITECTURE",
      subtitle: "Evaluations, Architectural Options & Recommendations for Scaling from 20 to 50 AEs during Migration from HubSpot to Salesforce",
      type: "cover"
    },
    {
      id: 2,
      title: "Core Business Bottlenecks & System Goals",
      badge: "PROBLEM & GOALS",
      type: "bottlenecks"
    },
    {
      id: 3,
      title: "Key System Assumptions",
      badge: "ARCHITECTURE FOUNDATIONS",
      type: "assumptions"
    },
    {
      id: 4,
      title: "Key Business Metrics & KPIs to Track",
      badge: "MEASURABLE IMPACT",
      type: "kpis"
    },
    {
      id: 5,
      title: "Evaluation of 4 Architecture Solutions",
      badge: "SYSTEM TRADE-OFFS",
      type: "solutions_overview"
    },
    {
      id: 6,
      title: "Solution 1: Native Apex & Point-to-Point",
      badge: "SOLUTION #1",
      type: "solution_1"
    },
    {
      id: 7,
      title: "Solution 2: Salesforce Agentforce & Data Cloud",
      badge: "SOLUTION #2",
      type: "solution_2"
    },
    {
      id: 8,
      title: "Solution 3: n8n AI Orchestration (Recommended)",
      badge: "RECOMMENDED SOLUTION ⭐",
      type: "solution_3"
    },
    {
      id: 9,
      title: "Solution 4: Custom MCP Microservices",
      badge: "SOLUTION #4",
      type: "solution_4"
    },
    {
      id: 10,
      title: "Why Solution #3 Wins (n8n Engine)",
      badge: "RECOMMENDATION JUSTIFICATION",
      type: "why_wins"
    },
    {
      id: 11,
      title: "Phased Rollout Plan For Solution #3 (Recommended ⭐)",
      badge: "10-WEEK IMPLEMENTATION ROADMAP",
      type: "rollout"
    },
    {
      id: 12,
      title: "Stack Rationalization Summary",
      badge: "TOOLING OPTIMIZATION",
      type: "stack_summary"
    },
    {
      id: 13,
      title: "Addl. Questions & Answers",
      badge: "EXECUTIVE REVIEW & Q&A",
      type: "qa"
    },
    {
      id: 14,
      title: "Appendix: Implementation Phase Plan Comparison",
      badge: "4 SOLUTION DIRECTIONS COMPARISON",
      type: "appendix"
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  return (
    <div className="bg-white border-3 border-ink rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-8 animate-fade-in">
      {/* Header & Meta Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-800 text-emerald-950 font-hand text-xs font-black rotate-[-1deg]">
              <Sparkles className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
              NEW CASE STUDY • ENTERPRISE REVOPS ARCHITECTURE
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 font-mono text-[10px] font-bold text-amber-900">
              PDF Presentation Integrated
            </span>
          </div>

          <h3 className="font-hand text-2xl md:text-3xl font-black text-ink flex items-center gap-2">
            <FileText className="h-7 w-7 text-emerald-800 shrink-0" />
            Revenue Systems Streamline Initiative
          </h3>
          <p className="font-sans text-xs md:text-sm text-zinc-650 mt-1 max-w-3xl">
            Evaluations, Architectural Options &amp; Recommendations for Scaling from 20 to 50 AEs during Migration from HubSpot to Salesforce.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onCopyLink && (
            <button
              onClick={() => {
                const link = `${window.location.origin}/#projects?tab=revops_streamline`;
                onCopyLink(link, "Link to revops_streamline");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-ink rounded-lg font-hand text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] cursor-pointer select-none"
            >
              {copiedLabel === "Link to revops_streamline" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-700 animate-scale-up shrink-0" />
                  <span>Copied Case Study Link!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
                  <span>Copy Case Study Link</span>
                </>
              )}
            </button>
          )}

          <a
            href="#projects?tab=revops_streamline"
            onClick={() => setActiveDetailTab("deck")}
            className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-ink border-2 border-ink rounded-md font-mono text-xs font-bold transition-all cursor-pointer"
          >
            14-Slide Deck
          </a>
        </div>
      </div>

      {/* KPI Impact Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-800/30 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-emerald-800 mb-1">
            <Zap className="h-4 w-4 shrink-0" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">Ingestion Velocity</span>
          </div>
          <div className="font-hand text-2xl md:text-3xl font-black text-emerald-950">&lt;5 min</div>
          <p className="font-sans text-[11px] text-zinc-600 mt-0.5">Per 10k rows (Reduced from 60+ mins, 12x speedup)</p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-800/30 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-sky-800 mb-1">
            <Workflow className="h-4 w-4 shrink-0" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">Hierarchy Accuracy</span>
          </div>
          <div className="font-hand text-2xl md:text-3xl font-black text-sky-950">&gt;90%</div>
          <p className="font-sans text-[11px] text-zinc-600 mt-0.5">PE → MSO Parent → MSO Child coverage</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-800/30 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-purple-800 mb-1">
            <TrendingUp className="h-4 w-4 shrink-0" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">Call Connects</span>
          </div>
          <div className="font-hand text-2xl md:text-3xl font-black text-purple-950">&gt;15%</div>
          <p className="font-sans text-[11px] text-zinc-600 mt-0.5">Tripled pickup rate via Clay multi-vendor waterfall</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-800/30 rounded-xl p-3.5 shadow-xs">
          <div className="flex items-center gap-1.5 text-amber-800 mb-1">
            <Target className="h-4 w-4 shrink-0" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">CRM Adoption</span>
          </div>
          <div className="font-hand text-2xl md:text-3xl font-black text-amber-950">100%</div>
          <p className="font-sans text-[11px] text-zinc-600 mt-0.5">Salesforce as single source of truth for 50 AEs</p>
        </div>
      </div>

      {/* Sub-Navigation Tabs within Case Study */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2">
        <button
          onClick={() => setActiveDetailTab("deck")}
          className={`px-4 py-2 font-hand text-xs md:text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDetailTab === "deck"
              ? "bg-emerald-200 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          <Layers className="h-4 w-4 text-emerald-800" />
          <span>Slide Deck Viewer (14 Slides)</span>
        </button>

        <button
          onClick={() => setActiveDetailTab("solutions")}
          className={`px-4 py-2 font-hand text-xs md:text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDetailTab === "solutions"
              ? "bg-amber-200 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          <Cpu className="h-4 w-4 text-amber-800" />
          <span>4 Architectural Options Matrix</span>
        </button>

        <button
          onClick={() => setActiveDetailTab("stack")}
          className={`px-4 py-2 font-hand text-xs md:text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDetailTab === "stack"
              ? "bg-indigo-200 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          <Sliders className="h-4 w-4 text-indigo-800" />
          <span>Stack Rationalization (Keep / Cut)</span>
        </button>

        <button
          onClick={() => setActiveDetailTab("rollout")}
          className={`px-4 py-2 font-hand text-xs md:text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDetailTab === "rollout"
              ? "bg-sky-200 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          <Clock className="h-4 w-4 text-sky-800" />
          <span>10-Week Rollout Roadmap</span>
        </button>

        <button
          onClick={() => setActiveDetailTab("qa")}
          className={`px-4 py-2 font-hand text-xs md:text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
            activeDetailTab === "qa"
              ? "bg-purple-200 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
          }`}
        >
          <HelpCircle className="h-4 w-4 text-purple-800" />
          <span>Executive Review Q&amp;A</span>
        </button>
      </div>

      {/* TAB 1: SLIDE DECK VIEWER */}
      {activeDetailTab === "deck" && (
        <div className="space-y-4">
          {/* Controls Bar for Deck */}
          <div className="flex flex-wrap items-center justify-between bg-zinc-900 text-white p-3 rounded-xl border-2 border-ink gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-400">
                SLIDE {currentSlide} OF {totalSlides}:
              </span>
              <span className="font-sans text-xs md:text-sm font-bold text-zinc-200 truncate max-w-xs md:max-w-md">
                {slidesData[currentSlide - 1].title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevSlide}
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md border border-zinc-600 transition-all cursor-pointer"
                title="Previous Slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <select
                value={currentSlide}
                onChange={(e) => setCurrentSlide(Number(e.target.value))}
                className="bg-zinc-800 text-white font-mono text-xs font-bold px-2 py-1 rounded border border-zinc-600 cursor-pointer"
              >
                {slidesData.map((s) => (
                  <option key={s.id} value={s.id}>
                    Slide {s.id}: {s.title}
                  </option>
                ))}
              </select>

              <button
                onClick={handleNextSlide}
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md border border-zinc-600 transition-all cursor-pointer"
                title="Next Slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-md transition-all cursor-pointer ml-1"
                title={isFullscreen ? "Exit Fullscreen" : "Expand Presentation"}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Slide Frame Container */}
          <div className={`relative bg-[#0f172a] text-slate-100 rounded-2xl border-3 border-ink shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] overflow-hidden transition-all duration-300 ${isFullscreen ? "fixed inset-4 z-50 p-8 overflow-y-auto" : "p-6 md:p-10 min-h-[480px]"}`}>
            
            {/* Slide Header inside canvas */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-sky-400 uppercase bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/50">
                {slidesData[currentSlide - 1].badge}
              </span>
              <span className="font-mono text-xs text-slate-400">
                Revenue Systems Streamline Initiative • Page {currentSlide}/{totalSlides}
              </span>
            </div>

            {/* SLIDE CONTENT RENDERER BASED ON SLIDE ID */}
            {currentSlide === 1 && (
              <div className="flex flex-col justify-center min-h-[340px] space-y-6 py-6">
                <span className="inline-block font-mono text-xs font-bold tracking-wider text-sky-400 uppercase bg-sky-950 px-3 py-1 rounded-md border border-sky-700/50 w-fit">
                  ENTERPRISE REVOPS ARCHITECTURE
                </span>
                <h1 className="font-sans font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
                  Revenue Systems <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400">
                    Streamline Initiative
                  </span>
                </h1>
                <p className="font-sans text-sm md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                  Evaluations, Architectural Options &amp; Recommendations for Scaling from 20 to 50 AEs during Migration from HubSpot to Salesforce
                </p>
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span>Prepared by: Enterprise GTM Systems Architect</span>
                  <span>•</span>
                  <span>Stack: Salesforce, n8n, Claude 3.5, Clay, Outreach</span>
                </div>
              </div>
            )}

            {currentSlide === 2 && (
              <div className="space-y-6">
                <h2 className="font-sans font-extrabold text-2xl text-white">Core Business Bottlenecks &amp; System Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/90 border border-slate-700 p-5 rounded-xl space-y-2">
                    <div className="font-mono text-xs font-bold text-sky-400">1. Tool &amp; Data Overlap</div>
                    <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed">
                      Severe fragmentation across 11 tools (Definitive, Clay, LISN, Modigie, Apollo, Nooks, Commonroom, Outreach, Dripify, Salesforce, HubSpot). Creates data clashing, duplicate spend, and lack of single source of truth.
                    </p>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-700 p-5 rounded-xl space-y-2">
                    <div className="font-mono text-xs font-bold text-sky-400">2. 60+ Min Upload Delays</div>
                    <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed">
                      Synchronous list processing in Salesforce and heavy list segmentation in HubSpot create &gt;1 hour bottlenecks per 50k in Salesforce and 10k rows in HubSpot.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-sky-950 to-teal-950 border border-sky-500/40 p-6 rounded-xl space-y-3">
                  <h3 className="font-sans font-bold text-lg text-sky-300 flex items-center gap-2">
                    <Target className="h-5 w-5 text-sky-400" />
                    Goal: Salesforce as One-Stop Shop
                  </h3>
                  <ul className="list-disc list-inside space-y-2 font-sans text-xs md:text-sm text-slate-200">
                    <li>Reps never leave the CRM to find account context or execute outreach.</li>
                    <li>Automate health hierarchy mapping (PE → MSO Parent → MSO Child → Clinical Entity).</li>
                    <li>Keep provider counts and EHR data refreshed asynchronously.</li>
                  </ul>
                </div>
              </div>
            )}

            {currentSlide === 3 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Key System Assumptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  {[
                    { label: "Investment Flexibility & Vendor Strategy", text: "The company is comfortable with extra costs involved in adding or replacing third-party tools/vendors to achieve best-in-class data hygiene and pipeline velocity." },
                    { label: "AI Openness & Automation Readiness", text: "The organization is fully open to leveraging AI capabilities (Agentforce, n8n AI agent workflows, Claude/GPT-4o LLM nodes) for enrichment, intent parsing, and hierarchy resolution." },
                    { label: "HubSpot to Salesforce Migration", text: "Contacts in HubSpot will be migrated directly to the Salesforce Contact object (skipping Lead object migration), ensuring clean Account-Contact mapping." },
                    { label: "Salesforce as Single Source of Truth", text: "Salesforce Sales Cloud holds ~95% of TAM and serves as the primary CRM, with HubSpot CRM being fully decommissioned post-migration." },
                    { label: "Growth Target & Scale", text: "Revenue systems architecture must seamlessly support scaling the AE team from 20 to 50 AEs over the next 12 months without operational friction." },
                    { label: "Healthcare Hierarchy Governance", text: "Parent-child structures (PE → MSO Parent → MSO Child) will be auto-maintained via commercial databases while enabling AE manual overrides in Salesforce." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-xl flex items-start gap-3">
                      <Check className="h-5 w-5 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-sky-300 block mb-0.5 font-sans font-bold">{item.label}</strong>
                        <span className="text-slate-300 font-sans text-xs leading-relaxed">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentSlide === 4 && (
              <div className="space-y-6">
                <h2 className="font-sans font-extrabold text-2xl text-white">Key Business Metrics &amp; KPIs to Track</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-sky-500/30 p-5 rounded-xl space-y-2">
                    <div className="text-sky-400 font-mono text-xs font-bold">Ingestion Velocity</div>
                    <div className="text-2xl font-black text-white font-hand">Target: &lt;5 mins / 10k rows</div>
                    <p className="text-xs text-slate-300 font-sans">Human prep time reduced to &lt;10 mins per campaign list, eliminating the 1-hour SFDC &amp; HubSpot upload stall.</p>
                  </div>

                  <div className="bg-slate-900 border border-teal-500/30 p-5 rounded-xl space-y-2">
                    <div className="text-teal-400 font-mono text-xs font-bold">Hierarchy Accuracy</div>
                    <div className="text-2xl font-black text-white font-hand">Target: &gt;90% Account Coverage</div>
                    <p className="text-xs text-slate-300 font-sans">Automated parent-child mapping (PE → MSO Parent → MSO Child) reconciled across all target accounts in SFDC.</p>
                  </div>

                  <div className="bg-slate-900 border border-indigo-500/30 p-5 rounded-xl space-y-2">
                    <div className="text-indigo-400 font-mono text-xs font-bold">Deliverability &amp; Pickup</div>
                    <div className="text-2xl font-black text-white font-hand">Target: &gt;15% Call Connects</div>
                    <p className="text-xs text-slate-300 font-sans">Mobile pickup rate tripled via Clay multi-vendor waterfall; cold email bounce rates kept strictly below 2%.</p>
                  </div>

                  <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-xl space-y-2">
                    <div className="text-amber-400 font-mono text-xs font-bold">AE Productivity &amp; Usage</div>
                    <div className="text-2xl font-black text-white font-hand">Target: 100% SFDC Adoption</div>
                    <p className="text-xs text-slate-300 font-sans">Zero platform switching. 100% of AE prospect research and sequencing triggered directly inside Salesforce.</p>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 5 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Evaluation of 4 Architecture Solutions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans border-collapse">
                    <thead>
                      <tr className="bg-slate-800 text-sky-300 font-mono text-[11px] uppercase">
                        <th className="p-3 border border-slate-700">Solution</th>
                        <th className="p-3 border border-slate-700">Architecture Name</th>
                        <th className="p-3 border border-slate-700">Primary Stack</th>
                        <th className="p-3 border border-slate-700">Est. Time-to-Value</th>
                        <th className="p-3 border border-slate-700">Engineering Effort</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-3 border border-slate-800 font-bold">Solution #1</td>
                        <td className="p-3 border border-slate-800">Custom Apex &amp; AppExchange/3PA/REST API</td>
                        <td className="p-3 border border-slate-800 text-slate-400">Salesforce Apex, LWC, Point-to-Point REST APIs</td>
                        <td className="p-3 border border-slate-800 font-mono">16 - 20 Weeks</td>
                        <td className="p-3 border border-slate-800 text-red-400 font-bold">High</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-800 font-bold">Solution #2</td>
                        <td className="p-3 border border-slate-800">Salesforce Agentforce &amp; AppExchange/3PA/REST API</td>
                        <td className="p-3 border border-slate-800 text-slate-400">Agentforce AI, Data Cloud, Prompt Builder</td>
                        <td className="p-3 border border-slate-800 font-mono">12 - 16 Weeks</td>
                        <td className="p-3 border border-slate-800 text-amber-400 font-bold">Medium-High</td>
                      </tr>
                      <tr className="bg-sky-950/60 font-bold border-2 border-teal-500">
                        <td className="p-3 border border-slate-700 text-teal-300 flex items-center gap-1">
                          Solution #3 <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 inline" />
                        </td>
                        <td className="p-3 border border-slate-700 text-white">Middleware AI Orchestration (Recommended)</td>
                        <td className="p-3 border border-slate-700 text-teal-200">n8n, Claude 3.5 Sonnet, Salesforce Bulk API v2</td>
                        <td className="p-3 border border-slate-700 font-mono text-teal-300">8 - 12 Weeks</td>
                        <td className="p-3 border border-slate-700 text-emerald-300">Medium-Low</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-slate-800 font-bold">Solution #4</td>
                        <td className="p-3 border border-slate-800">Custom MCP Microservices</td>
                        <td className="p-3 border border-slate-800 text-slate-400">Custom Python/Node, AWS, Vector DB, MCP</td>
                        <td className="p-3 border border-slate-800 font-mono">18 - 20 Weeks</td>
                        <td className="p-3 border border-slate-800 text-red-400 font-bold">Very High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {currentSlide === 6 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Solution 1: Native Apex &amp; Point-to-Point</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-mono text-xs font-bold text-sky-400">Architecture Approach</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Custom Apex code, Batch Apex, and LWC flow triggers within SFDC. Point-to-point REST API integrations directly connecting SFDC AppExchange to third-party vendors without external orchestrators.
                    </p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-mono text-xs font-bold text-amber-400">Pros &amp; Trade-offs</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <strong className="text-emerald-400">Pros:</strong> Fully native to SFDC UI; no external middleware fees.<br />
                      <strong className="text-red-400">Cons:</strong> Heavy technical debt, tight coupling, and high exposure to Salesforce governor limits and API callout ceilings.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-400 flex justify-center">
                  [Flow Architecture: Sales Rep → LWC Staging Component → Custom Async Staging → Apex Batch Engine → Point-to-Point APIs → SFDC Accounts]
                </div>
              </div>
            )}

            {currentSlide === 7 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Solution 2: Salesforce Agentforce &amp; Data Cloud</h2>
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h3 className="font-mono text-xs font-bold text-sky-400">Salesforce AI Native Stack Details</h3>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans list-disc list-inside">
                    <li>Uses Agentforce AI Agents, Data Cloud Data Model Objects (DMOs), and Prompt Builder.</li>
                    <li>Autonomously detects intent signals and maps healthcare account relationships natively.</li>
                    <li><strong className="text-emerald-400">Pros:</strong> Cutting-edge native AI rep experience directly inside the CRM.</li>
                    <li><strong className="text-red-400">Cons:</strong> Very high consumption cost (Data Cloud / Flex Credits) and severe vendor lock-in.</li>
                  </ul>
                </div>
              </div>
            )}

            {currentSlide === 8 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-sans font-extrabold text-2xl text-white">Solution 3: n8n AI Orchestration</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-zinc-950 font-mono text-[10px] font-black uppercase">
                    ⭐ RECOMMENDED ARCHITECTURE
                  </span>
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-teal-500/50 space-y-3">
                  <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
                    Node-based n8n automation engine orchestrating AI LLMs (Claude 3.5 Sonnet), Definitive Healthcare, and Clay enrichment before pushing clean records via Salesforce Bulk API v2.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-teal-950/60 p-3 rounded-lg border border-teal-700/50">
                      <strong className="text-teal-300 block mb-1 font-mono">Impact &amp; Benefits</strong>
                      <span>Decouples heavy processing from SFDC, reduces list upload times from 60 mins to &lt;5 mins, and cuts overall tool spend significantly.</span>
                    </div>
                    <div className="bg-sky-950/60 p-3 rounded-lg border border-sky-700/50">
                      <strong className="text-sky-300 block mb-1 font-mono">Execution Stack</strong>
                      <span>n8n Webhook → Sub-Workflow 1 (Claude LLM Intent) → Sub-Workflow 2 (Hierarchy Resolution) → Bulk API v2 Ingest → Outreach API.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 9 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Solution 4: Custom MCP Microservices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-mono text-xs font-bold text-sky-400">Developer-Centric MCP Server</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Custom Model Context Protocol (MCP) server built on Python/Node.js microservices connecting LLM models to databases and SFDC APIs via open-source protocols.
                    </p>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-mono text-xs font-bold text-amber-400">Pros &amp; Trade-offs</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      <strong className="text-emerald-400">Pros:</strong> Zero vendor lock-in; complete control over AI logic &amp; data models.<br />
                      <strong className="text-red-400">Cons:</strong> Extremely high DevOps engineering overhead, custom container hosting, and ongoing code maintenance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 10 && (
              <div className="space-y-6">
                <h2 className="font-sans font-extrabold text-2xl text-white">Why Solution #3 Wins (n8n Engine)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-sky-500/30 space-y-2">
                    <Zap className="h-6 w-6 text-sky-400" />
                    <h3 className="font-sans font-bold text-white text-sm">Bulk API v2 Speed</h3>
                    <p className="text-xs text-slate-300">Bypasses synchronous SFDC trigger limits by staging and bulk-upserting records asynchronously in parallel batches.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-teal-500/30 space-y-2">
                    <Workflow className="h-6 w-6 text-teal-400" />
                    <h3 className="font-sans font-bold text-white text-sm">Hierarchy AI Parsing</h3>
                    <p className="text-xs text-slate-300">Uses Claude 3.5 LLM nodes to clean PE → MSO Parent → MSO Child trees before writing to Salesforce.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-indigo-500/30 space-y-2">
                    <Sliders className="h-6 w-6 text-indigo-400" />
                    <h3 className="font-sans font-bold text-white text-sm">GTM Agility</h3>
                    <p className="text-xs text-slate-300">Allows RevOps to modify enrichment logic and intent triggers visually without Apex code deployment cycles.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-sky-950 via-teal-950 to-slate-900 border border-teal-500/40 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-3xl md:text-5xl font-black text-sky-300">&lt;5 min</span>
                    <span className="block font-mono text-xs text-slate-400 uppercase tracking-wider mt-1">Campaign Processing Time</span>
                  </div>
                  <div className="max-w-xl text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
                    <strong className="text-teal-300 block mb-1 font-bold">Eliminating the 1-Hour Delay:</strong>
                    By offloading data enrichment, deduplication, and intent parsing to n8n before calling Salesforce Bulk API v2, human effort drops to &lt;10 minutes and list ingestion speed improves by 12×.
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 11 && (
              <div className="space-y-6">
                <h2 className="font-sans font-extrabold text-2xl text-white">Phased Rollout Plan For Solution #3 (Recommended ⭐)</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-slate-900 p-4 rounded-xl border border-sky-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono text-[10px] font-bold">W1-3</span>
                    <h3 className="font-sans font-bold text-white text-sm">Core Infra</h3>
                    <p className="text-xs text-slate-300">Deploy n8n cluster; authenticate OAuth2 to SFDC, Clay, Definitive, Outreach.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-teal-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-mono text-[10px] font-bold">W3-5</span>
                    <h3 className="font-sans font-bold text-white text-sm">Bulk API</h3>
                    <p className="text-xs text-slate-300">Build Bulk API v2 asynchronous event upload pipeline.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-indigo-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] font-bold">W5-8</span>
                    <h3 className="font-sans font-bold text-white text-sm">AI Hierarchy</h3>
                    <p className="text-xs text-slate-300">Integrate Claude LLM nodes for PE-MSO hierarchy and intent scoring.</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold">W8-10</span>
                    <h3 className="font-sans font-bold text-white text-sm">Go-Live</h3>
                    <p className="text-xs text-slate-300">Slack alerts, error catchers, rep enablement, and full rollout.</p>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 12 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Stack Rationalization Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="bg-emerald-950/40 border border-emerald-500/50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                      <Check className="h-4 w-4" /> KEEP
                    </div>
                    <ul className="space-y-1 text-slate-200 font-sans">
                      <li><strong>Salesforce</strong> (Core CRM)</li>
                      <li><strong>Definitive</strong> (Health Data)</li>
                      <li><strong>Clay</strong> (AI Waterfall)</li>
                      <li><strong>Outreach / Nooks</strong> (Engagement)</li>
                      <li><strong>Commonroom</strong> (Intent Signals)</li>
                    </ul>
                  </div>

                  <div className="bg-red-950/40 border border-red-500/50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold font-mono">
                      <Trash2 className="h-4 w-4" /> CUT
                    </div>
                    <ul className="space-y-1 text-slate-200 font-sans">
                      <li><strong>HubSpot CRM</strong> (Dual CRM drag)</li>
                      <li><strong>LISN &amp; Modigie</strong> (Bad phone data)</li>
                      <li><strong>Dripify</strong> (LinkedIn risk)</li>
                    </ul>
                  </div>

                  <div className="bg-amber-950/40 border border-amber-500/50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                      <RefreshCw className="h-4 w-4" /> REPLACE
                    </div>
                    <ul className="space-y-1 text-slate-200 font-sans">
                      <li><strong>Apollo.ai</strong> (Downgrade standalone user seats; retain API inside Clay waterfall for backfill lookup)</li>
                    </ul>
                  </div>

                  <div className="bg-sky-950/40 border border-sky-500/50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-sky-400 font-bold font-mono">
                      <PlusCircle className="h-4 w-4" /> ADD
                    </div>
                    <ul className="space-y-1 text-slate-200 font-sans">
                      <li><strong>Einstein Copilot / Agentforce</strong> (Rep AI)</li>
                      <li><strong>n8n</strong> (AI Orchestration Engine)</li>
                      <li><strong>LeanData</strong> (Matching/Routing)</li>
                      <li><strong>D&amp;B Optimizer / ZoomInfo</strong></li>
                      <li><strong>AI Models</strong> (Claude 3.5 / GPT-4o)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentSlide === 13 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Addl. Questions &amp; Answers (Executive Q&amp;A)</h2>
                <div className="space-y-2 text-xs md:text-sm">
                  {[
                    { q: "1. How to evaluate and determine tech stack investment and database to be trusted in page #12?", a: "A: Primary Source Data Authority, API Speed & Asynchronous Throughput, ROI/Overall Cost & Redundancy Removal." },
                    { q: "2. What’s the enablement & adoption process?", a: "A: Role-Based or Territory Sandbox Training, Automated Actionable Alerts, Adoption Monitoring & Feedback via Office Hours, Survey, Stakeholders interviews." },
                    { q: "3. What processes need human intervention and approval?", a: "A: Account tier, buying threshold, Low-Confidence Deduplication Exceptions." },
                    { q: "4. How to build intent signals of identify new hires and departures from companies?", a: "A: Multi-Source Signal Monitoring, AI Candidate & Title Parsing, Former Champion Tracking." },
                    { q: "5. How to qualify leads and opportunities?", a: "A: Firmographic & Healthcare Fit, Behavioral Intent, Automated AI Qualification Score, Opportunity Stage Gate." }
                  ].map((qa, idx) => (
                    <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                      <strong className="text-sky-300 font-sans block">{qa.q}</strong>
                      <span className="text-slate-300 font-sans block text-xs">{qa.a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentSlide === 14 && (
              <div className="space-y-4">
                <h2 className="font-sans font-extrabold text-2xl text-white">Appendix: Implementation Phase Plan Comparison</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-900 border border-slate-700 p-3.5 rounded-xl space-y-2">
                    <strong className="text-sky-400 block font-mono text-xs">SOLUTION #1: APEX / LWC</strong>
                    <ul className="text-slate-300 space-y-1">
                      <li>W1-3: Planning &amp; Schema</li>
                      <li>W4-7: Apex Bulk &amp; Staging</li>
                      <li>W8-12: REST API Connectors</li>
                      <li>W13-16: LWC UX &amp; UAT</li>
                    </ul>
                    <span className="inline-block text-[10px] text-red-400 font-mono font-bold bg-red-950 px-2 py-0.5 rounded">High Complexity</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 p-3.5 rounded-xl space-y-2">
                    <strong className="text-amber-400 block font-mono text-xs">SOLUTION #2: AGENTFORCE</strong>
                    <ul className="text-slate-300 space-y-1">
                      <li>W1-3: Data Cloud DMO</li>
                      <li>W4-6: Topic Definition</li>
                      <li>W7-9: Service Setup</li>
                      <li>W10-12: Guardrails &amp; Deploy</li>
                    </ul>
                    <span className="inline-block text-[10px] text-amber-400 font-mono font-bold bg-amber-950 px-2 py-0.5 rounded">Moderate Complexity</span>
                  </div>

                  <div className="bg-teal-950/80 border-2 border-teal-500 p-3.5 rounded-xl space-y-2">
                    <strong className="text-teal-300 block font-mono text-xs flex items-center gap-1">
                      SOLUTION #3: n8n AI ⭐
                    </strong>
                    <ul className="text-slate-200 space-y-1">
                      <li>W1-2: n8n Infra Setup</li>
                      <li>W3-4: Bulk API v2 Pipeline</li>
                      <li>W5-6: AI Hierarchy &amp; Enrich</li>
                      <li>W7-8: Alert &amp; Enablement</li>
                    </ul>
                    <span className="inline-block text-[10px] text-emerald-300 font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded">Low-Moderate Complexity</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 p-3.5 rounded-xl space-y-2">
                    <strong className="text-purple-400 block font-mono text-xs">SOLUTION #4: CUSTOM MCP</strong>
                    <ul className="text-slate-300 space-y-1">
                      <li>W1-4: AWS/DevOps Provision</li>
                      <li>W5-9: MCP Tool Development</li>
                      <li>W10-14: Hierarchy Logic</li>
                      <li>W15-18: System Integration</li>
                    </ul>
                    <span className="inline-block text-[10px] text-red-400 font-mono font-bold bg-red-950 px-2 py-0.5 rounded">Very High Complexity</span>
                  </div>
                </div>
              </div>
            )}

            {/* Slide Navigation Footer within canvas */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={handlePrevSlide}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
              >
                <ChevronLeft className="h-4 w-4" /> Previous Slide
              </button>

              <div className="flex items-center gap-1">
                {slidesData.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(s.id)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === s.id ? "w-6 bg-sky-400" : "w-2 bg-slate-700 hover:bg-slate-500"}`}
                    title={`Slide ${s.id}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
              >
                Next Slide <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4 ARCHITECTURAL OPTIONS COMPARISON MATRIX */}
      {activeDetailTab === "solutions" && (
        <div className="space-y-6">
          <div className="border-b-2 border-zinc-200 pb-3">
            <h4 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <Cpu className="h-5 w-5 text-amber-700" />
              Detailed Comparison: 4 Architecture Solutions Evaluated
            </h4>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Evaluating trade-offs across engineering complexity, maintainability, platform alignment, and governor limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solution 1 */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-zinc-500">SOLUTION #1</span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono text-[10px] font-bold">16-20 WEEKS • HIGH EFFORT</span>
              </div>
              <h5 className="font-sans font-extrabold text-base text-ink">Custom Apex &amp; Point-to-Point REST APIs</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Builds Apex Batch engines, LWC upload widgets, and point-to-point REST API calls directly inside Salesforce Sales Cloud.
              </p>
              <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-zinc-100">
                <p className="text-emerald-800"><strong>Pros:</strong> Fully native to SFDC UI; no third-party middleware licenses required.</p>
                <p className="text-red-700"><strong>Cons:</strong> Heavy technical debt, tight coupling, high risk of hitting SFDC governor limits and API callout ceilings.</p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-zinc-500">SOLUTION #2</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">12-16 WEEKS • MED-HIGH EFFORT</span>
              </div>
              <h5 className="font-sans font-extrabold text-base text-ink">Salesforce Agentforce &amp; Data Cloud</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Uses Agentforce AI Agents, Data Cloud Data Model Objects (DMOs), and Prompt Builder to detect intent and hierarchy natively.
              </p>
              <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-zinc-100">
                <p className="text-emerald-800"><strong>Pros:</strong> Cutting-edge native AI rep experience directly inside the Salesforce drawer panel.</p>
                <p className="text-red-700"><strong>Cons:</strong> Extremely high consumption costs (Data Cloud / Flex Credits) and heavy vendor lock-in.</p>
              </div>
            </div>

            {/* Solution 3 - Recommended */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 border-3 border-emerald-800 rounded-xl p-5 shadow-[5px_5px_0px_0px_rgba(6,78,59,1)] space-y-3 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 bg-amber-400 text-zinc-950 font-hand text-[10px] font-black px-8 py-1.5 rotate-45 border border-ink shadow-xs">
                RECOMMENDED ⭐
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-emerald-950">SOLUTION #3 (WINNER)</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-200 text-emerald-950 border border-emerald-800 font-mono text-[10px] font-black">8-12 WEEKS • MED-LOW EFFORT</span>
              </div>
              <h5 className="font-sans font-black text-lg text-emerald-950">Middleware AI Orchestration (n8n Engine)</h5>
              <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                Node-based n8n automation engine orchestrating Claude 3.5 Sonnet LLMs, Definitive Healthcare, and Clay enrichment before pushing clean records via Bulk API v2.
              </p>
              <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-emerald-200">
                <p className="text-emerald-950"><strong>Pros:</strong> Decouples heavy processing from SFDC, reduces list upload times from 60 mins to &lt;5 mins (12x speedup), cuts tool spend.</p>
                <p className="text-zinc-650"><strong>Cons:</strong> Requires n8n orchestration skill set.</p>
              </div>
            </div>

            {/* Solution 4 */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-zinc-500">SOLUTION #4</span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono text-[10px] font-bold">18-20 WEEKS • VERY HIGH EFFORT</span>
              </div>
              <h5 className="font-sans font-extrabold text-base text-ink">Custom MCP Microservices</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Custom Model Context Protocol (MCP) server built on Python/Node microservices connecting LLMs to databases and SFDC APIs via open-source protocols.
              </p>
              <div className="space-y-1.5 text-xs font-sans pt-2 border-t border-zinc-100">
                <p className="text-emerald-800"><strong>Pros:</strong> Zero vendor lock-in; complete control over AI logic and data models.</p>
                <p className="text-red-700"><strong>Cons:</strong> Extremely high DevOps engineering overhead, custom container hosting, and ongoing code maintenance.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STACK RATIONALIZATION */}
      {activeDetailTab === "stack" && (
        <div className="space-y-6">
          <div className="border-b-2 border-zinc-200 pb-3">
            <h4 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <Sliders className="h-5 w-5 text-indigo-700" />
              Stack Rationalization Strategy
            </h4>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Consolidating 11 redundant tools down to a high-velocity, cost-controlled commercial engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-emerald-50 border-2 border-emerald-800 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(6,78,59,1)] space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-hand font-black text-lg">
                <Check className="h-5 w-5 text-emerald-700" /> KEEP
              </div>
              <ul className="space-y-2 text-xs font-sans text-emerald-950">
                <li className="p-2 bg-white rounded border border-emerald-200"><strong>Salesforce:</strong> Core CRM &amp; Single Source of Truth</li>
                <li className="p-2 bg-white rounded border border-emerald-200"><strong>Definitive:</strong> Healthcare Data Authority</li>
                <li className="p-2 bg-white rounded border border-emerald-200"><strong>Clay:</strong> AI Enrichment Waterfall</li>
                <li className="p-2 bg-white rounded border border-emerald-200"><strong>Outreach / Nooks:</strong> Engagement Sequences</li>
                <li className="p-2 bg-white rounded border border-emerald-200"><strong>Commonroom:</strong> Intent Signals</li>
              </ul>
            </div>

            <div className="bg-red-50 border-2 border-red-800 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(153,27,27,1)] space-y-3">
              <div className="flex items-center gap-2 text-red-950 font-hand font-black text-lg">
                <Trash2 className="h-5 w-5 text-red-700" /> CUT
              </div>
              <ul className="space-y-2 text-xs font-sans text-red-950">
                <li className="p-2 bg-white rounded border border-red-200"><strong>HubSpot CRM:</strong> Decommissioned (eliminated dual-CRM drag)</li>
                <li className="p-2 bg-white rounded border border-red-200"><strong>LISN &amp; Modigie:</strong> Removed bad phone data vendors</li>
                <li className="p-2 bg-white rounded border border-red-200"><strong>Dripify:</strong> Eliminated LinkedIn account flag risk</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-800 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(146,64,14,1)] space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-hand font-black text-lg">
                <RefreshCw className="h-5 w-5 text-amber-700" /> REPLACE
              </div>
              <ul className="space-y-2 text-xs font-sans text-amber-950">
                <li className="p-2 bg-white rounded border border-amber-200">
                  <strong>Apollo.ai:</strong> Downgraded expensive standalone seats; retained API inside Clay waterfall for backfill lookup only.
                </li>
              </ul>
            </div>

            <div className="bg-sky-50 border-2 border-sky-800 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(7,89,133,1)] space-y-3">
              <div className="flex items-center gap-2 text-sky-950 font-hand font-black text-lg">
                <PlusCircle className="h-5 w-5 text-sky-700" /> ADD
              </div>
              <ul className="space-y-2 text-xs font-sans text-sky-950">
                <li className="p-2 bg-white rounded border border-sky-200"><strong>Einstein Copilot / Agentforce:</strong> In-CRM Rep AI</li>
                <li className="p-2 bg-white rounded border border-sky-200"><strong>n8n:</strong> AI Orchestration Engine</li>
                <li className="p-2 bg-white rounded border border-sky-200"><strong>LeanData:</strong> Matching &amp; Routing Engine</li>
                <li className="p-2 bg-white rounded border border-sky-200"><strong>D&amp;B / ZoomInfo:</strong> Legal Tree Governance</li>
                <li className="p-2 bg-white rounded border border-sky-200"><strong>AI Models:</strong> Claude 3.5 Sonnet &amp; GPT-4o</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 10-WEEK ROLLOUT ROADMAP */}
      {activeDetailTab === "rollout" && (
        <div className="space-y-6">
          <div className="border-b-2 border-zinc-200 pb-3">
            <h4 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <Clock className="h-5 w-5 text-sky-700" />
              10-Week Phased Implementation Roadmap
            </h4>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Structured rollout ensuring zero downtime during the HubSpot-to-Salesforce migration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-2">
              <span className="px-2.5 py-1 rounded bg-sky-100 text-sky-950 font-mono text-xs font-black border border-sky-300">
                WEEKS 1–3
              </span>
              <h5 className="font-sans font-extrabold text-base text-ink pt-1">Core Infrastructure</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Deploy self-hosted or cloud n8n cluster; authenticate OAuth2 endpoints for Salesforce, Clay, Definitive Healthcare, and Outreach.
              </p>
            </div>

            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-2">
              <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-950 font-mono text-xs font-black border border-teal-300">
                WEEKS 3–5
              </span>
              <h5 className="font-sans font-extrabold text-base text-ink pt-1">Bulk API v2 Engine</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Build Bulk API v2 asynchronous upload pipeline for batch processing, decoupling list uploads from SFDC synchronous triggers.
              </p>
            </div>

            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-2">
              <span className="px-2.5 py-1 rounded bg-indigo-100 text-indigo-950 font-mono text-xs font-black border border-indigo-300">
                WEEKS 5–8
              </span>
              <h5 className="font-sans font-extrabold text-base text-ink pt-1">AI Hierarchy Parsing</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Integrate Claude 3.5 Sonnet LLM nodes for PE → MSO Parent → MSO Child hierarchy resolution and behavioral intent scoring.
              </p>
            </div>

            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-2">
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-950 font-mono text-xs font-black border border-emerald-300">
                WEEKS 8–10
              </span>
              <h5 className="font-sans font-extrabold text-base text-ink pt-1">Go-Live &amp; Enablement</h5>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Implement Slack alerting, automated error catchers, sandbox rep enablement, and complete decommissioning of HubSpot.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EXECUTIVE REVIEW Q&A */}
      {activeDetailTab === "qa" && (
        <div className="space-y-6">
          <div className="border-b-2 border-zinc-200 pb-3">
            <h4 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-purple-700" />
              Executive Review &amp; Architectural Q&amp;A
            </h4>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Key strategic answers addressed during leadership architectural review.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "1. How to evaluate and determine tech stack investment and database to be trusted in stack rationalization?",
                a: "Primary Source Data Authority (Definitive for healthcare, Salesforce for core CRM), API Speed & Asynchronous Throughput (Bulk API v2 over synchronous calls), and ROI/Overall Cost & Redundancy Removal (cutting duplicate tools like LISN, Modigie, Dripify)."
              },
              {
                q: "2. What is the enablement and adoption process for 50 Account Executives?",
                a: "Role-based or territory sandbox training, automated actionable Slack alerts, adoption monitoring, and feedback loops via weekly office hours, surveys, and stakeholder interviews."
              },
              {
                q: "3. What processes need human intervention and approval?",
                a: "Account tier re-assignments, buying threshold overrides, and low-confidence deduplication exceptions where AI confidence falls below 85%."
              },
              {
                q: "4. How to build intent signals to identify new hires and departures from target companies?",
                a: "Multi-source signal monitoring combining Commonroom, job posting scrapers, AI candidate & title parsing, and former champion tracking via LinkedIn/Clay triggers."
              },
              {
                q: "5. How to qualify leads and opportunities automatically?",
                a: "Firmographic & healthcare fit algorithms, behavioral intent triggers, automated AI qualification scoring, and strict opportunity stage gate criteria enforced directly inside Salesforce."
              }
            ].map((qa, idx) => (
              <div 
                key={idx}
                className="bg-white border-2 border-ink rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] space-y-2 cursor-pointer hover:bg-purple-50/50 transition-colors"
                onClick={() => setExpandedQA(expandedQA === idx ? null : idx)}
              >
                <div className="flex items-center justify-between font-sans font-bold text-sm text-ink">
                  <span>{qa.q}</span>
                  <span className="font-mono text-xs text-purple-800 underline shrink-0 ml-2">
                    {expandedQA === idx ? "Collapse" : "Expand Answer"}
                  </span>
                </div>
                <p className="font-sans text-xs text-zinc-700 leading-relaxed pt-2 border-t border-zinc-100">
                  <strong className="text-purple-900 block mb-0.5">Architectural Answer:</strong>
                  {qa.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
