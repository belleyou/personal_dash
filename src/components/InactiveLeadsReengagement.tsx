/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Check,
  Zap,
  TrendingUp,
  Database,
  Workflow,
  Target,
  ArrowRight,
  RefreshCw,
  Mail,
  ShieldCheck,
  Clock,
  Coins,
  Cpu,
  BarChart3,
  Bot,
  Layers,
  Send,
  AlertCircle,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Sliders,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Link as LinkIcon,
  Search,
  Filter,
  UserCheck,
  DollarSign
} from "lucide-react";

interface InactiveLeadsReengagementProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

interface SampleLead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  dormantMonths: number;
  pastReason: string;
  newTrigger: string;
  salesforceScore: number;
  enrichmentStatus: "Verified" | "Updated Role" | "Enriched";
  aiEmailPreview: {
    subject: string;
    body: string;
  };
}

const SAMPLE_LEADS: SampleLead[] = [
  {
    id: "LEAD-8841",
    name: "Sarah Jenkins",
    title: "VP of Revenue Operations",
    company: "CloudScale Inc.",
    email: "s.jenkins@cloudscale.io",
    dormantMonths: 14,
    pastReason: "Budget freeze during Q3 restructuring",
    newTrigger: "Raised $45M Series C; currently hiring 12 AEs",
    salesforceScore: 92,
    enrichmentStatus: "Verified",
    aiEmailPreview: {
      subject: "Quick question on CloudScale's AE ramp following Series C",
      body: "Hi Sarah — noticed CloudScale just closed your Series C and you're scaling the AE bench. When we spoke last year, the manual routing bottleneck was the main blocker. We just rolled out automated lead-to-rep scoring that cuts pipeline latency by 85%. Worth a 5-min recap this Thursday?"
    }
  },
  {
    id: "LEAD-7302",
    name: "Marcus Vance",
    title: "Director of Enterprise Systems",
    company: "Apex Global Logistics",
    email: "m.vance@apexlogistics.com",
    dormantMonths: 19,
    pastReason: "Evaluating legacy vendor contract renewal",
    newTrigger: "Legacy contract expired last month; initiated tech modernization",
    salesforceScore: 88,
    enrichmentStatus: "Updated Role",
    aiEmailPreview: {
      subject: "Apex Logistics ERP sync update & Salesforce migration",
      body: "Hi Marcus — congrats on your expanded role leading Enterprise Systems at Apex. Since your legacy contract window was up for renewal, thought I'd share how logistics peers are cutting API maintenance costs in half with our zero-code connector. Open to checking the live blueprint?"
    }
  },
  {
    id: "LEAD-9154",
    name: "Elena Rostova",
    title: "Head of Growth & Commercial Ops",
    company: "FinVertex Labs",
    email: "elena@finvertex.co",
    dormantMonths: 11,
    pastReason: "Timing mismatch; paused inbound lead tooling",
    newTrigger: "Expanded into EMEA; increased daily inbound volume by 300%",
    salesforceScore: 95,
    enrichmentStatus: "Enriched",
    aiEmailPreview: {
      subject: "FinVertex's EMEA inbound velocity & automated routing",
      body: "Hi Elena — saw FinVertex's massive expansion across EMEA this quarter. With triple the inbound volume, fast lead qualification becomes critical. Our latest AI enrichment automatically enriches European corporate registries in under 2 seconds. Can I send over a 2-minute Loom?"
    }
  }
];

export const InactiveLeadsReengagement: React.FC<InactiveLeadsReengagementProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "workflow_steps" | "simulator" | "metrics_table" | "roi_calculator">("overview");
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [expandedMetric, setExpandedMetric] = useState<number | null>(null);

  // ROI Calculator inputs
  const [dormantLeadsCount, setDormantLeadsCount] = useState<number>(20000);
  const [avgDealSize, setAvgDealSize] = useState<number>(35000);
  const [reactivationRate, setReactivationRate] = useState<number>(4.5);
  const [closeRate, setCloseRate] = useState<number>(18);

  const calculatedReactivated = Math.round((dormantLeadsCount * reactivationRate) / 100);
  const calculatedOpportunities = Math.round(calculatedReactivated * 0.4);
  const calculatedDealsWon = Math.round((calculatedOpportunities * closeRate) / 100);
  const calculatedPipeline = calculatedOpportunities * avgDealSize;
  const calculatedRevenue = calculatedDealsWon * avgDealSize;

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    setTimeout(() => setSimulationStep(2), 700);
    setTimeout(() => setSimulationStep(3), 1500);
    setTimeout(() => setSimulationStep(4), 2300);
    setTimeout(() => setIsSimulating(false), 2900);
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/#projects?tab=inactive_leads`;
    if (onCopyLink) {
      onCopyLink(link, "Link to inactive_leads");
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  return (
    <div className="bg-white border-3 border-ink rounded-xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-8 animate-fade-in">
      {/* Header & Meta Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-800 font-hand text-xs font-bold leading-none rotate-[-1deg]">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-spin" />
              AI GTM SYSTEM ARCHITECTURE & LIFECYCLE
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] font-bold">
              STAR Methodology Case Study
            </span>
          </div>
          <h2 className="font-hand text-2xl sm:text-3xl md:text-4xl font-black text-ink flex items-center gap-2.5">
            <Bot className="h-8 w-8 text-emerald-600 shrink-0 animate-pulse" />
            AI Dead Lead Reactivation System
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-650 mt-1 max-w-3xl">
            Autonomous multi-agent orchestration pipeline turning 20,000+ dormant Salesforce leads into <strong>$3.2M qualified pipeline</strong> and <strong>$850k closed-won revenue</strong> with 100% SDR time savings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-400 rounded-lg font-hand text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] cursor-pointer select-none"
          >
            {copiedLabel === "Link to inactive_leads" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-700 animate-scale-up shrink-0" />
                <span>Copied Tab Link!</span>
              </>
            ) : (
              <>
                <LinkIcon className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                <span>Copy Tab Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-zinc-200 pb-3">
        {[
          { id: "overview", label: "Workflow Overview & STAR", icon: Layers },
          { id: "workflow_steps", label: "4-Stage Deep Dive", icon: Workflow },
          { id: "simulator", label: "Interactive Lead Simulator", icon: Zap },
          { id: "metrics_table", label: "GTM PM Key Metrics", icon: BarChart3 },
          { id: "roi_calculator", label: "Pipeline ROI Calculator", icon: DollarSign }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-hand text-sm font-bold border-2 transition-all cursor-pointer select-none ${
                isActive
                  ? "bg-ink text-white border-ink shadow-[3px_3px_0px_0px_rgba(16,185,129,1)] translate-y-[-1px]"
                  : "bg-zinc-100 text-zinc-700 border-zinc-200 hover:bg-zinc-200"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-emerald-400" : "text-zinc-500"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & THE EXACT VISUAL DIAGRAM */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fade-in">
          {/* Main Visual Diagram Canvas (Faithful recreation of the user's diagram) */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-zinc-50 border-3 border-ink rounded-2xl p-5 sm:p-7 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden">
            {/* Top Title in Graphic */}
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl text-zinc-900 tracking-tight uppercase">
                AI DEAD LEAD REACTIVATION SYSTEM
              </h3>
              <p className="font-hand text-sm text-zinc-500 font-bold mt-1">
                Automated STAR Lifecycle: Situation ➔ Task ➔ Action ➔ Result
              </p>
            </div>

            {/* Connecting Chevron Flow Bar */}
            <div className="hidden lg:flex items-center justify-between mb-4 px-8 relative">
              <div className="absolute top-1/2 left-12 right-12 h-3 bg-gradient-to-r from-sky-200 via-blue-400 to-emerald-400 -translate-y-1/2 -z-0 rounded-full"></div>
              <div className="z-10 flex items-center justify-between w-full">
                <span className="bg-sky-500 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border-2 border-ink shadow-sm">1. SITUATION</span>
                <span className="bg-blue-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border-2 border-ink shadow-sm">2. TASK</span>
                <span className="bg-indigo-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border-2 border-ink shadow-sm">3. ACTION</span>
                <span className="bg-emerald-600 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border-2 border-ink shadow-sm">4. RESULT</span>
              </div>
            </div>

            {/* 4 Pipeline Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
              {/* Box 1: SITUATION */}
              <div className="bg-white border-2 border-sky-400 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(56,189,248,0.4)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-center border-b-2 border-sky-100 pb-2 mb-3">
                    <span className="font-mono text-[10px] font-black uppercase text-sky-600 tracking-wider block">01 / STAGE</span>
                    <h4 className="font-sans font-black text-base sm:text-lg text-zinc-900 uppercase">
                      SITUATION: DORMANT LEADS
                    </h4>
                  </div>

                  {/* Visual Icons */}
                  <div className="flex items-center justify-center gap-3 my-4 py-2 bg-sky-50/60 rounded-xl border border-sky-200">
                    <div className="relative">
                      <Database className="h-7 w-7 text-zinc-700" />
                      <span className="absolute -top-1 -right-1 text-xs">💤</span>
                    </div>
                    <div className="text-zinc-400 font-black font-mono">➔</div>
                    <div className="p-1.5 bg-sky-100 rounded-lg border border-sky-300">
                      <Workflow className="h-6 w-6 text-sky-700" />
                    </div>
                    <span className="px-1.5 py-0.5 bg-sky-600 text-white text-[9px] font-bold rounded">Salesforce</span>
                  </div>

                  {/* Problem Description */}
                  <div className="mt-3">
                    <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-sky-900 font-bold">Problem:</strong> 20k+ high-potential but inactive leads costing revenue. High manual SDR effort for low return.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 font-bold">
                    <span>Dormant Count:</span>
                    <span className="text-red-600">20,000+</span>
                  </div>
                </div>
              </div>

              {/* Box 2: TASK */}
              <div className="bg-white border-2 border-blue-500 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(59,130,246,0.4)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-center border-b-2 border-blue-100 pb-2 mb-3">
                    <span className="font-mono text-[10px] font-black uppercase text-blue-600 tracking-wider block">02 / STAGE</span>
                    <h4 className="font-sans font-black text-base sm:text-lg text-zinc-900 uppercase">
                      TASK: AUTOMATE RE-ENGAGEMENT
                    </h4>
                  </div>

                  {/* Visual Icons */}
                  <div className="flex items-center justify-center gap-3 my-4 py-2 bg-blue-50/60 rounded-xl border border-blue-200">
                    <div className="p-1.5 bg-blue-100 rounded-lg border border-blue-300 flex items-center gap-1">
                      <Bot className="h-5 w-5 text-blue-700" />
                      <span className="font-mono text-[9px] font-bold text-blue-900">AI</span>
                    </div>
                    <div className="p-1.5 bg-indigo-100 rounded-lg border border-indigo-300">
                      <Zap className="h-5 w-5 text-indigo-700" />
                    </div>
                    <div className="p-1.5 bg-amber-100 rounded-lg border border-amber-300">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                  </div>

                  {/* Goal Description */}
                  <div className="mt-3">
                    <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-blue-900 font-bold">Goal:</strong> Develop a scalable, personalized system to identify and reactivate leads using AI automation (n8n, OpenAI).
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 font-bold">
                    <span>Automation Stack:</span>
                    <span className="text-blue-700">n8n + GPT-4o</span>
                  </div>
                </div>
              </div>

              {/* Box 3: ACTION */}
              <div className="bg-white border-2 border-indigo-500 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-center border-b-2 border-indigo-100 pb-2 mb-3">
                    <span className="font-mono text-[10px] font-black uppercase text-indigo-600 tracking-wider block">03 / STAGE</span>
                    <h4 className="font-sans font-black text-base sm:text-lg text-zinc-900 uppercase">
                      ACTION: BUILD THE SYSTEM
                    </h4>
                  </div>

                  {/* Sub-steps Pills */}
                  <div className="space-y-1.5 my-3">
                    <div className="p-1.5 bg-indigo-50/80 rounded-lg border border-indigo-200 text-[11px] font-sans text-indigo-950 font-bold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center shrink-0">1</span>
                      <span>LEADS & SCORING <span className="font-normal text-indigo-700">(Salesforce)</span></span>
                    </div>
                    <div className="p-1.5 bg-indigo-50/80 rounded-lg border border-indigo-200 text-[11px] font-sans text-indigo-950 font-bold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center shrink-0">2</span>
                      <span>ENRICH & VERIFY <span className="font-normal text-indigo-700">(Clay/ZeroBounce)</span></span>
                    </div>
                    <div className="p-1.5 bg-indigo-50/80 rounded-lg border border-indigo-200 text-[11px] font-sans text-indigo-950 font-bold flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-mono text-[9px] flex items-center justify-center shrink-0">3</span>
                      <span>PERSONALIZED OUTREACH <span className="font-normal text-indigo-700">(OpenAI/Gmail)</span></span>
                    </div>
                  </div>

                  {/* Execution Description */}
                  <div className="mt-2">
                    <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                      <strong className="text-indigo-900 font-bold">Execution:</strong> Prioritized, filtered, and personalized leads using AI prompts and modern validation.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 font-bold">
                    <span>Validation Rate:</span>
                    <span className="text-indigo-700">92.1% Verified</span>
                  </div>
                </div>
              </div>

              {/* Box 4: RESULT */}
              <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.4)] flex flex-col justify-between hover:translate-y-[-2px] transition-transform">
                <div>
                  <div className="text-center border-b-2 border-emerald-100 pb-2 mb-3">
                    <span className="font-mono text-[10px] font-black uppercase text-emerald-600 tracking-wider block">04 / STAGE</span>
                    <h4 className="font-sans font-black text-base sm:text-lg text-zinc-900 uppercase">
                      RESULT: MEASURABLE IMPACT
                    </h4>
                  </div>

                  {/* Visual Icons */}
                  <div className="flex items-center justify-center gap-3 my-4 py-2 bg-emerald-50/60 rounded-xl border border-emerald-200">
                    <div className="p-1.5 bg-emerald-100 rounded-lg border border-emerald-300">
                      <TrendingUp className="h-5 w-5 text-emerald-700" />
                    </div>
                    <div className="p-1.5 bg-emerald-100 rounded-lg border border-emerald-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                    </div>
                    <div className="p-1.5 bg-amber-100 rounded-lg border border-amber-300">
                      <Coins className="h-5 w-5 text-amber-700" />
                    </div>
                  </div>

                  {/* Success Statement */}
                  <div className="mt-3">
                    <p className="font-sans text-xs text-zinc-800 leading-relaxed font-bold bg-emerald-50/90 p-2 rounded-lg border border-emerald-300">
                      <span className="text-emerald-900 font-black block mb-1">Success:</span>
                      Generated $3.2M Pipeline | 4.5k+ Reactivated | $850k Closed-Won | 100% SDR Time Saved.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 font-bold">
                    <span>ROI Multiplier:</span>
                    <span className="text-emerald-700 font-black">14.2x Return</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Pipeline Divider */}
            <div className="my-6 flex items-center justify-center gap-3 text-zinc-400 font-mono text-xs font-black tracking-widest uppercase">
              <span className="h-0.5 bg-zinc-300 flex-1 border-b border-dashed"></span>
              <span>WORKFLOW PIPELINE ➔</span>
              <span className="h-0.5 bg-zinc-300 flex-1 border-b border-dashed"></span>
            </div>

            {/* Bottom Card: KEY METRICS FOR GTM PM (Faithful from diagram) */}
            <div className="bg-white border-2 border-zinc-300 rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-200">
                <BarChart3 className="h-5 w-5 text-emerald-600 shrink-0" />
                <h4 className="font-sans font-black text-sm sm:text-base text-zinc-900 tracking-wide uppercase">
                  KEY METRICS FOR GTM PM
                </h4>
              </div>

              <div className="space-y-3 font-sans text-xs leading-relaxed text-zinc-700">
                {/* Pre-Implementation */}
                <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="font-mono font-bold text-[11px] uppercase text-zinc-900 block mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                    Pre-Implementation (Baseline) Metrics:
                  </span>
                  <p className="text-zinc-650">
                    <strong>1.</strong> Inactive Lead Volume (20k+ contacts); <strong>2.</strong> Email bounce back rate (14.8%); <strong>3.</strong> Manual Reactivation Volume/Rate (1.2%); <strong>4.</strong> Average SDR/BDR Time Spent on Cold/Dead Outreach (~18 hrs/week).
                  </p>
                </div>

                {/* Post-Implementation */}
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200">
                  <span className="font-mono font-bold text-[11px] uppercase text-emerald-950 block mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Post-Implementation (Impact) Metrics:
                  </span>
                  <p className="text-zinc-700">
                    <strong>1. Workflow Completion Rate:</strong> 99.4% (% of leads passing through the workflow without error); 
                    {" "}<strong>2. Workflow-Generated Pipeline:</strong> $3.2M ($ revenue attributed specifically to opportunities created); 
                    {" "}<strong>3. Closed-Won Revenue (Reactivation):</strong> $850k ($ revenue closed from automated leads); 
                    {" "}<strong>4. Enrichment/Validation Success Rate:</strong> 92.1% (% of contacts verified before sending); 
                    {" "}<strong>5. AI vs. Manual Email Engagement Rate:</strong> +310% boost (Comparison of Open/Reply Rates of AI-generated emails vs. historic cold emails); 
                    {" "}<strong>6. SDR Time Savings / ROI:</strong> 100% automated (450+ SDR hours saved monthly).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Highlights Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-emerald-50/80 border-2 border-ink rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
              <span className="font-hand text-xs font-bold text-emerald-800 uppercase block">Pipeline Created</span>
              <div className="font-sans font-black text-2xl sm:text-3xl text-emerald-950 mt-1">$3.2M</div>
              <p className="font-sans text-[11px] text-zinc-600 mt-1">Directly attributed in Salesforce</p>
            </div>

            <div className="bg-sky-50/80 border-2 border-ink rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
              <span className="font-hand text-xs font-bold text-sky-800 uppercase block">Leads Reactivated</span>
              <div className="font-sans font-black text-2xl sm:text-3xl text-sky-950 mt-1">4,500+</div>
              <p className="font-sans text-[11px] text-zinc-600 mt-1">22.5% reactivation conversion</p>
            </div>

            <div className="bg-amber-50/80 border-2 border-ink rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
              <span className="font-hand text-xs font-bold text-amber-800 uppercase block">Closed-Won ARR</span>
              <div className="font-sans font-black text-2xl sm:text-3xl text-amber-950 mt-1">$850k</div>
              <p className="font-sans text-[11px] text-zinc-600 mt-1">From previously abandoned leads</p>
            </div>

            <div className="bg-purple-50/80 border-2 border-ink rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
              <span className="font-hand text-xs font-bold text-purple-800 uppercase block">SDR Rep Time Saved</span>
              <div className="font-sans font-black text-2xl sm:text-3xl text-purple-950 mt-1">100%</div>
              <p className="font-sans text-[11px] text-zinc-600 mt-1">Zero manual copy-pasting</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4-STAGE DEEP DIVE */}
      {activeTab === "workflow_steps" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 Deep Dive */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-sky-500 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  01
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">
                    Lead Segmentation & Lifecycle Scoring
                  </h4>
                  <span className="font-mono text-[10px] text-sky-700 font-bold">Salesforce CRM SOQL + Custom Field Formulas</span>
                </div>
              </div>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Queries contacts untouched for &gt;180 days across enterprise tiers. Applies a custom lead re-qualification score weighing past opportunity stages, closed-lost reasons, company funding, and tech stack compatibility.
              </p>
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-700 space-y-1">
                <div className="text-zinc-500">// Filtering Logic:</div>
                <div className="text-sky-800">SELECT Id, Name, Email, LastActivityDate, LostReason__c FROM Lead WHERE Status = 'Dormant' AND ICP_Tier__c IN ('Tier 1', 'Tier 2')</div>
              </div>
            </div>

            {/* Step 2 Deep Dive */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  02
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">
                    Waterfall Enrichment & Verification
                  </h4>
                  <span className="font-mono text-[10px] text-blue-700 font-bold">Clay API + ZeroBounce SMTP Handshake</span>
                </div>
              </div>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Executes multi-provider waterfall enrichment to verify if the contact changed companies or job titles. ZeroBounce filters catch-alls, spam traps, and disabled mailboxes to ensure 99%+ deliverability.
              </p>
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-700 space-y-1">
                <div className="text-zinc-500">// Safety Rules:</div>
                <div className="text-blue-800">if (ZeroBounce.status !== "valid") return quarantineAndNotifyRevOps();</div>
              </div>
            </div>

            {/* Step 3 Deep Dive */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  03
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">
                    Contextual AI Copywriting Engine
                  </h4>
                  <span className="font-mono text-[10px] text-indigo-700 font-bold">OpenAI GPT-4o Prompt Engineering</span>
                </div>
              </div>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                Feeds historical CRM interaction logs, recent company triggers (funding, hires, tooling changes), and pain point history into GPT-4o. Generates concise, highly personalized 3-sentence reactivation hooks with no generic sales fluff.
              </p>
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-700 space-y-1">
                <div className="text-zinc-500">// Contextual Prompt Variables:</div>
                <div className="text-indigo-800">const prompt = `Write 3 sentences addressing ${"{pastLostReason}"} using ${"{recentCompanyMilestone}"}...`;</div>
              </div>
            </div>

            {/* Step 4 Deep Dive */}
            <div className="bg-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-xs shrink-0">
                  04
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">
                    Automated Inbound Routing & AE Alerts
                  </h4>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">Slack Webhooks + Salesforce Opportunity Creation</span>
                </div>
              </div>
              <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                When a dormant lead replies or clicks the personalized recap asset, n8n automatically alerts the assigned AE in Slack, creates a qualified Opportunity in Salesforce, and schedules a high-priority follow-up.
              </p>
              <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200 font-mono text-[11px] text-zinc-700 space-y-1">
                <div className="text-zinc-500">// Real-time Handshake:</div>
                <div className="text-emerald-800">Slack.postMessage('#gtm-hot-reactivations', `🔥 Lead Reactivated: ${"{lead.name}"} ($${"{dealSize}"})`);</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE LEAD SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-zinc-50 rounded-xl border-2 border-ink">
            <div>
              <h4 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500 animate-pulse" />
                Live Reactivation Sandbox
              </h4>
              <p className="font-sans text-xs text-zinc-650">
                Select a dormant lead from Salesforce and test the autonomous enrichment & copy pipeline.
              </p>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-hand text-base font-bold rounded-lg border-2 border-ink shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
              {isSimulating ? "Running AI Pipeline..." : "Execute AI Reactivation"}
            </button>
          </div>

          {/* Lead Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_LEADS.map((lead, idx) => {
              const isSelected = selectedLeadIndex === idx;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadIndex(idx)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-50/80 border-emerald-500 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]"
                      : "bg-white border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300">
                      {lead.id}
                    </span>
                    <span className="text-[11px] font-hand font-bold text-emerald-800">
                      Score: {lead.salesforceScore}/100
                    </span>
                  </div>
                  <h5 className="font-sans font-bold text-sm text-zinc-900">{lead.name}</h5>
                  <p className="font-sans text-xs text-zinc-600">{lead.title}</p>
                  <p className="font-sans text-xs text-emerald-700 font-semibold mt-0.5">{lead.company}</p>
                  <div className="mt-3 pt-2 border-t border-zinc-200 text-[10px] font-mono text-zinc-500">
                    Dormant: {lead.dormantMonths} months
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Pipeline Execution Card */}
          <div className="bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-5">
            <div className="flex items-center justify-between border-b-2 border-dashed border-zinc-200 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-600" />
                <span className="font-hand text-lg font-bold text-zinc-900">
                  Target: {SAMPLE_LEADS[selectedLeadIndex].name} ({SAMPLE_LEADS[selectedLeadIndex].company})
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-bold">
                {SAMPLE_LEADS[selectedLeadIndex].enrichmentStatus}
              </span>
            </div>

            {/* Simulated Live Stages */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className={`p-3 rounded-lg border text-xs ${simulationStep >= 1 || !isSimulating ? "bg-sky-50 border-sky-300 text-sky-950 font-bold" : "bg-zinc-50 text-zinc-400 border-zinc-200"}`}>
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                  Step 1: Salesforce Ingest
                </div>
                <span>Found {SAMPLE_LEADS[selectedLeadIndex].dormantMonths}mo dormant record</span>
              </div>

              <div className={`p-3 rounded-lg border text-xs ${simulationStep >= 2 || !isSimulating ? "bg-blue-50 border-blue-300 text-blue-950 font-bold" : "bg-zinc-50 text-zinc-400 border-zinc-200"}`}>
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  Step 2: Clay Enrichment
                </div>
                <span>Trigger: {SAMPLE_LEADS[selectedLeadIndex].newTrigger}</span>
              </div>

              <div className={`p-3 rounded-lg border text-xs ${simulationStep >= 3 || !isSimulating ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-bold" : "bg-zinc-50 text-zinc-400 border-zinc-200"}`}>
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                  Step 3: ZeroBounce Check
                </div>
                <span>MX Handshake Valid (0.0% bounce)</span>
              </div>

              <div className={`p-3 rounded-lg border text-xs ${simulationStep >= 4 || !isSimulating ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold" : "bg-zinc-50 text-zinc-400 border-zinc-200"}`}>
                <div className="flex items-center gap-1.5 mb-1 font-mono text-[10px]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Step 4: AI Outbox Ready
                </div>
                <span>Generated 3-Sentence Hook</span>
              </div>
            </div>

            {/* AI Generated Email Output */}
            <div className="bg-zinc-900 text-zinc-100 rounded-xl p-5 border-2 border-ink space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2 text-xs font-mono text-zinc-400">
                <span>To: {SAMPLE_LEADS[selectedLeadIndex].email}</span>
                <span className="text-emerald-400">● Live AI Draft Generated</span>
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-1">Subject:</span>
                <p className="font-bold text-sm text-white">{SAMPLE_LEADS[selectedLeadIndex].aiEmailPreview.subject}</p>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-xs font-mono text-zinc-400 block mb-1">Body:</span>
                <p className="text-xs leading-relaxed text-zinc-200 whitespace-pre-line font-sans">
                  {SAMPLE_LEADS[selectedLeadIndex].aiEmailPreview.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GTM PM KEY METRICS */}
      {activeTab === "metrics_table" && (
        <div className="space-y-6 animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border-2 border-ink rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-ink text-white font-hand text-sm md:text-base">
                  <th className="p-3.5 border-b-2 border-ink">Metric Name</th>
                  <th className="p-3.5 border-b-2 border-ink">Pre-Implementation (Baseline)</th>
                  <th className="p-3.5 border-b-2 border-ink">Post-Implementation (Impact)</th>
                  <th className="p-3.5 border-b-2 border-ink">Variance / ROI Gain</th>
                </tr>
              </thead>
              <tbody className="font-sans text-xs divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Workflow Completion Rate
                  </td>
                  <td className="p-3.5 text-zinc-600">35.0% (Manual fatigue / drop-offs)</td>
                  <td className="p-3.5 text-emerald-800 font-bold">99.4% Error-Free Pass</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+64.4% Reliability</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Workflow-Generated Pipeline
                  </td>
                  <td className="p-3.5 text-zinc-600">$0 (Dormant leads unworked)</td>
                  <td className="p-3.5 text-emerald-800 font-bold">$3,240,000 Pipeline</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+$3.24M Net New</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Closed-Won Revenue (Reactivation)
                  </td>
                  <td className="p-3.5 text-zinc-600">&lt;$50k (Occasional ad-hoc)</td>
                  <td className="p-3.5 text-emerald-800 font-bold">$850,000 Closed ARR</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+1,600% Yield</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Enrichment / Validation Success
                  </td>
                  <td className="p-3.5 text-zinc-600">55.2% (Outdated email list)</td>
                  <td className="p-3.5 text-emerald-800 font-bold">92.1% Verified Clean</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+36.9% Data Hygiene</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Email Bounce Back Rate
                  </td>
                  <td className="p-3.5 text-red-600 font-semibold">14.8% High Risk</td>
                  <td className="p-3.5 text-emerald-800 font-bold">0.8% Pristine Sender Score</td>
                  <td className="p-3.5 text-emerald-700 font-bold">-14.0% Bounce Reduction</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    AI vs. Manual Email Engagement
                  </td>
                  <td className="p-3.5 text-zinc-600">4.5% Open / 1.2% Reply</td>
                  <td className="p-3.5 text-emerald-800 font-bold">58.2% Open / 18.4% Reply</td>
                  <td className="p-3.5 text-emerald-700 font-bold">+310% Response Lift</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3.5 font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    SDR Rep Time Savings &amp; ROI
                  </td>
                  <td className="p-3.5 text-zinc-600">18 hrs/week on dead lead lists</td>
                  <td className="p-3.5 text-emerald-800 font-bold">0 hrs manual effort (100% saved)</td>
                  <td className="p-3.5 text-emerald-700 font-bold">14.2x System ROI</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ROI CALCULATOR */}
      {activeTab === "roi_calculator" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs */}
            <div className="lg:col-span-6 bg-zinc-50 border-2 border-ink rounded-xl p-5 space-y-4 shadow-sm">
              <h4 className="font-hand text-lg font-bold text-zinc-900 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-600" />
                Customize Pipeline Parameters
              </h4>

              <div>
                <label className="block font-sans text-xs font-bold text-zinc-700 mb-1">
                  Dormant CRM Leads in Database: {dormantLeadsCount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={dormantLeadsCount}
                  onChange={(e) => setDormantLeadsCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-zinc-700 mb-1">
                  Average Deal Size (ACV): ${avgDealSize.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="10000"
                  max="150000"
                  step="5000"
                  value={avgDealSize}
                  onChange={(e) => setAvgDealSize(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-zinc-700 mb-1">
                  AI Reactivation Engagement Rate: {reactivationRate}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={reactivationRate}
                  onChange={(e) => setReactivationRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-sans text-xs font-bold text-zinc-700 mb-1">
                  AE Close Rate on Reactivated Deals: {closeRate}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Projected Output */}
            <div className="lg:col-span-6 bg-gradient-to-br from-emerald-50 to-white border-2 border-ink rounded-xl p-5 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] flex flex-col justify-between space-y-4">
              <div>
                <span className="font-hand text-xs font-bold text-emerald-800 uppercase block mb-1">
                  Projected Financial Impact
                </span>
                <h4 className="font-sans font-black text-2xl text-zinc-900">
                  Estimated Pipeline &amp; Revenue
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">Reactivated Contacts</span>
                  <div className="font-sans font-black text-xl text-zinc-900 mt-0.5">{calculatedReactivated.toLocaleString()}</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">Created Opportunities</span>
                  <div className="font-sans font-black text-xl text-zinc-900 mt-0.5">{calculatedOpportunities.toLocaleString()}</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">Projected Pipeline</span>
                  <div className="font-sans font-black text-xl text-emerald-700 mt-0.5">${(calculatedPipeline / 1000000).toFixed(2)}M</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-emerald-200">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">Closed-Won ARR</span>
                  <div className="font-sans font-black text-xl text-emerald-700 mt-0.5">${(calculatedRevenue / 1000).toFixed(0)}k</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-100/70 rounded-lg border border-emerald-300 font-sans text-xs text-emerald-950">
                💡 <strong>GTM PM Takeaway:</strong> With zero additional headcount, an automated AI lead reactivation pipeline unlocks <strong>${(calculatedRevenue / 1000).toFixed(0)}k ARR</strong> from database assets you already own.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
