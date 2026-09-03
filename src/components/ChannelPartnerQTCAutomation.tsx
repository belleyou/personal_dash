/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Bot,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Building2,
  Workflow,
  Sparkles,
  Link as LinkIcon,
  Check,
  Share2,
  Layers,
  MessageSquare,
  FileCheck2,
  Sliders,
  Flame,
  ChevronRight,
  Target,
  BarChart3,
  Cpu,
  RefreshCw
} from "lucide-react";
import { SaaSCPQOrderManagementProcess } from "./SaaSCPQOrderManagementProcess";
import { SubagentsTechToolingSpecs } from "./SubagentsTechToolingSpecs";

interface ChannelPartnerQTCAutomationProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

export const ChannelPartnerQTCAutomation: React.FC<ChannelPartnerQTCAutomationProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [activeTab, setActiveTab] = useState<"saas_cpq_logic" | "star_framework" | "kpi_matrix" | "agent_swarm" | "simulator" | "slack_hook" | "subagents_tech_specs">("saas_cpq_logic");

  // Simulator state
  const [simPartnerTier, setSimPartnerTier] = useState<"Platinum" | "Gold" | "Silver">("Platinum");
  const [simDealSize, setSimDealSize] = useState<number>(250000);
  const [simDiscount, setSimDiscount] = useState<number>(22);
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "completed">("idle");
  const [simStep, setSimStep] = useState<number>(0);

  const runSimulation = () => {
    setSimStatus("running");
    setSimStep(1);
    setTimeout(() => {
      setSimStep(2);
      setTimeout(() => {
        setSimStep(3);
        setTimeout(() => {
          setSimStep(4);
          setTimeout(() => {
            setSimStatus("completed");
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const resetSimulation = () => {
    setSimStatus("idle");
    setSimStep(0);
  };

  const handleShare = () => {
    const link = `${window.location.origin}/#projects?tab=channel_partner_qtc`;
    if (onCopyLink) {
      onCopyLink(link, "Link to channel_partner_qtc");
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  const isCopied = copiedLabel === "Link to channel_partner_qtc";

  return (
    <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-800 font-hand text-xs font-black rotate-[-1deg]">
              <Sparkles className="h-3.5 w-3.5 shrink-0 animate-spin" />
              ⭐ STAR Case Study • Product Manager Leadership
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 font-mono text-[11px] font-bold">
              <Bot className="h-3 w-3" /> Multi-Agent Swarm
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[11px] font-bold">
              <Zap className="h-3 w-3" /> Quote-to-Cash (QTC)
            </span>
          </div>

          <h2 className="font-hand text-2xl md:text-3xl lg:text-4xl font-black text-ink tracking-tight flex items-center gap-2.5 flex-wrap">
            <span>Channel Partner Portal & AI Agent QTC Automation</span>
            <Users className="h-7 w-7 text-emerald-600 shrink-0" />
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-650 mt-1 max-w-3xl leading-relaxed">
            Eliminating indirect channel friction through an end-to-end self-service Partner Portal, automated DRICAD governance, and an intelligent 4-Agent AI Swarm accelerating deal registration and Quote-to-Cash cycle times.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-300 rounded-xl font-hand text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer select-none"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-emerald-700 animate-scale-up" />
                <span>Copied Direct Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-emerald-700" />
                <span>Share Case Study</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top 5 KPI Metrics Comparison Cards (Pre vs Post) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1 */}
        <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-900">
                Speed & Efficiency
              </span>
              <Clock className="h-4 w-4 text-emerald-700 shrink-0" />
            </div>
            <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Deal Reg Approval Time</h4>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">5 Days</span>
              <span className="font-sans font-black text-lg text-emerald-900">&lt; 10 Mins</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono text-[10px] font-extrabold">
              99.6% ⚡
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-blue-50/80 border-2 border-blue-300 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-blue-900">
                Quote to Cash
              </span>
              <Zap className="h-4 w-4 text-blue-700 shrink-0" />
            </div>
            <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">QTC Cycle Time</h4>
          </div>
          <div className="mt-2 pt-2 border-t border-blue-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">8 Days</span>
              <span className="font-sans font-black text-lg text-blue-950">&lt; 24 Hours</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-200 text-blue-900 font-mono text-[10px] font-extrabold">
              8x Faster 🚀
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-purple-50/80 border-2 border-purple-300 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-purple-900">
                Partner Adoption
              </span>
              <Users className="h-4 w-4 text-purple-700 shrink-0" />
            </div>
            <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Monthly Active Partners</h4>
          </div>
          <div className="mt-2 pt-2 border-t border-purple-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">28% MAP</span>
              <span className="font-sans font-black text-lg text-purple-950">82% MAP</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-purple-200 text-purple-900 font-mono text-[10px] font-extrabold">
              +54% 📈
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-rose-50/80 border-2 border-rose-300 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-rose-900">
                Compliance & Duplication
              </span>
              <ShieldCheck className="h-4 w-4 text-rose-700 shrink-0" />
            </div>
            <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Duplicate Deal Reg Rate</h4>
          </div>
          <div className="mt-2 pt-2 border-t border-rose-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">24% Dups</span>
              <span className="font-sans font-black text-lg text-rose-950">&lt; 2%</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-rose-200 text-rose-900 font-mono text-[10px] font-extrabold">
              -92% 🛡️
            </span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 mb-1">
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-900">
                Operational Cost
              </span>
              <DollarSign className="h-4 w-4 text-amber-700 shrink-0" />
            </div>
            <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Channel Ops Cost / Deal</h4>
          </div>
          <div className="mt-2 pt-2 border-t border-amber-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">$145 / Deal</span>
              <span className="font-sans font-black text-lg text-amber-950">72% Reduction</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-mono text-[10px] font-extrabold">
              -$104 💰
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs inside Case Study */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2 select-none">
        {[
          { id: "saas_cpq_logic", label: "☁️ SaaS CPQ & Order Logic (Subagents & STAR)", icon: Sparkles },
          { id: "star_framework", label: "📋 S.T.A.R. Framework (Channel QTC)", icon: FileCheck2 },
          { id: "kpi_matrix", label: "📊 KPI Metrics (Pre / Post)", icon: BarChart3 },
          { id: "agent_swarm", label: "🤖 4-Agent AI Swarm Architecture", icon: Cpu },
          { id: "simulator", label: "⚡ Interactive Deal Reg Simulator", icon: Sliders },
          { id: "slack_hook", label: "💬 Slack & Teams Self-Service Hooks", icon: MessageSquare },
          { id: "subagents_tech_specs", label: "🛠️ 5 Subagents Tech Stack & Features", icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                isActive
                  ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] scale-105"
                  : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 hover:border-zinc-400"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-sky-400" : "text-zinc-600"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 0: SaaS CPQ & Order Management Process (Logic Image, Subagents, STAR & Sandbox) */}
      {activeTab === "saas_cpq_logic" && (
        <SaaSCPQOrderManagementProcess onCopyLink={onCopyLink} copiedLabel={copiedLabel} />
      )}

      {/* TAB 1: S.T.A.R. Framework View */}
      {activeTab === "star_framework" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Situation */}
            <div className="bg-red-50/70 border-3 border-red-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  S
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-red-700 block">
                    Phase 1: Friction & Bottleneck
                  </span>
                  <h3 className="font-hand font-black text-xl text-red-950">
                    (S) SITUATION
                  </h3>
                </div>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed">
                <strong>Severe indirect channel partner friction:</strong> Legacy manual portal workflows, slow deal registration approvals taking up to 5 business days, sluggish Quote-to-Cash (8-day turnaround), 24% lead duplication causing partner conflict, and high operational overhead with revenue leakage ($145 ops cost per deal reg).
              </p>
              <div className="bg-white/80 border border-red-200 rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-red-900 font-bold">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                  <span>5-day deal registration queues caused partner dissatisfaction</span>
                </div>
                <div className="flex items-center gap-2 text-red-900 font-bold">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                  <span>24% duplicate registrations triggered direct/indirect channel disputes</span>
                </div>
              </div>
            </div>

            {/* Task */}
            <div className="bg-blue-50/70 border-3 border-blue-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  T
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-blue-700 block">
                    Phase 2: Product Ownership
                  </span>
                  <h3 className="font-hand font-black text-xl text-blue-950">
                    (T) TASK
                  </h3>
                </div>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed">
                <strong>Product Manager Leadership:</strong> Define, architect, and lead the end-to-end (E2E) solution across cross-functional commercial stakeholders: a modern Custom Partner Portal and an Intelligent AI Agent system with multi-channel self-service hooks (Slack & Microsoft Teams bots) to automate deal registration and Quote-to-Cash.
              </p>
              <div className="bg-white/80 border border-blue-200 rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-blue-950 font-bold">
                  <Target className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                  <span>Define PRDs, technical schemas, and partner journey maps</span>
                </div>
                <div className="flex items-center gap-2 text-blue-950 font-bold">
                  <Target className="h-3.5 w-3.5 text-blue-700 shrink-0" />
                  <span>Architect multi-tier enterprise governance and sub-minute approvals</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-amber-50/70 border-3 border-amber-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  A
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                    Phase 3: Execution & Architecture
                  </span>
                  <h3 className="font-hand font-black text-xl text-amber-950">
                    (A) ACTIONS
                  </h3>
                </div>
              </div>
              <div className="space-y-2 font-sans text-xs sm:text-sm text-zinc-800">
                <div className="flex items-start gap-2 bg-white/90 border border-amber-200 rounded-xl p-2.5">
                  <span className="font-mono font-black text-amber-700 text-xs bg-amber-100 px-1.5 py-0.5 rounded">1</span>
                  <span><strong>DRICAD Governance:</strong> Enforced structured trade-off framework aligning Sales, Channel Ops, Legal, and Finance on discounting policies.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 border border-amber-200 rounded-xl p-2.5">
                  <span className="font-mono font-black text-amber-700 text-xs bg-amber-100 px-1.5 py-0.5 rounded">2</span>
                  <span><strong>Automated Deduction Engine:</strong> Programmed automatic conflict detection against CRM territory data to stop duplicate claims instantly.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 border border-amber-200 rounded-xl p-2.5">
                  <span className="font-mono font-black text-amber-700 text-xs bg-amber-100 px-1.5 py-0.5 rounded">3</span>
                  <span><strong>24/7 Self-Service CPQ/Quote Agent:</strong> Built conversational quotation hooks in Slack/Teams for partner reps to generate approved quotes in real time.</span>
                </div>
                <div className="flex items-start gap-2 bg-white/90 border border-amber-200 rounded-xl p-2.5">
                  <span className="font-mono font-black text-amber-700 text-xs bg-amber-100 px-1.5 py-0.5 rounded">4</span>
                  <span><strong>Pre-filtering Layer:</strong> Deployed a high-throughput caching and pre-filtering layer to minimize LLM token costs and guarantee &lt;500ms latency.</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-emerald-50/80 border-3 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  R
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                    Phase 4: Verified Outcomes & AI Swarm
                  </span>
                  <h3 className="font-hand font-black text-xl text-emerald-950">
                    (R) RESULTS
                  </h3>
                </div>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed">
                <strong>Integrated 4 Key Autonomous AI Agents:</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-2.5 flex items-start gap-2">
                  <Bot className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Identify & Dedupe Agent</strong>
                    <span className="text-zinc-650 text-[11px]">Slashed duplicates from 24% to &lt;2%</span>
                  </div>
                </div>
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-2.5 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Discount Validation Agent</strong>
                    <span className="text-zinc-650 text-[11px]">Enforced tier pricing with 0% margin error</span>
                  </div>
                </div>
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-2.5 flex items-start gap-2">
                  <Zap className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">Parallel Approval Agent</strong>
                    <span className="text-zinc-650 text-[11px]">Cut approval queues from 5 days to &lt;10 mins</span>
                  </div>
                </div>
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-2.5 flex items-start gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-zinc-900 block">OM Syncing Agent</strong>
                    <span className="text-zinc-650 text-[11px]">Accelerated QTC from 8 days to &lt;24 hours</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: KPI Metrics Table (Pre vs Post) */}
      {activeTab === "kpi_matrix" && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              <span>Comprehensive KPI Metrics Comparison (Pre vs. Post Implementation)</span>
            </h3>
            <span className="font-mono text-xs text-zinc-500 font-bold hidden sm:inline-block">
              Exact Data from Production Deployment
            </span>
          </div>

          <div className="overflow-x-auto border-3 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-teal-900 text-white font-hand text-sm md:text-base border-b-3 border-ink">
                  <th className="p-3.5 sm:p-4 border-r border-teal-800">Metric Category</th>
                  <th className="p-3.5 sm:p-4 border-r border-teal-800">KPI Name</th>
                  <th className="p-3.5 sm:p-4 border-r border-teal-800 bg-red-950/60 text-rose-200">
                    Pre-Implement (Baseline)
                  </th>
                  <th className="p-3.5 sm:p-4 bg-emerald-950/80 text-emerald-300">
                    Post-Implement (Target / Result)
                  </th>
                  <th className="p-3.5 sm:p-4 text-right">Impact Lift</th>
                </tr>
              </thead>
              <tbody className="font-sans text-xs sm:text-sm divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                      Speed & Efficiency
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-zinc-800 border-r border-zinc-200">
                    Deal Reg Approval Time
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700 bg-rose-50/40 border-r border-zinc-200">
                    5 Business Days
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-black text-emerald-800 bg-emerald-50/50">
                    &lt; 10 Minutes
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-black text-emerald-700">
                    99.6% Speedup ⚡
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-600 shrink-0" />
                      Quote to Cash
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-zinc-800 border-r border-zinc-200">
                    QTC Cycle Time
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700 bg-rose-50/40 border-r border-zinc-200">
                    8 Days
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-black text-emerald-800 bg-emerald-50/50">
                    &lt; 24 Hours
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-black text-emerald-700">
                    8x Faster 🚀
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-purple-600 shrink-0" />
                      Partner Adoption
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-zinc-800 border-r border-zinc-200">
                    Portal Monthly Active Partners (MAP)
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700 bg-rose-50/40 border-r border-zinc-200">
                    28%
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-black text-emerald-800 bg-emerald-50/50">
                    82%
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-black text-emerald-700">
                    +54% Net Lift 📈
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      Compliance & Duplication
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-zinc-800 border-r border-zinc-200">
                    Duplicate Registration Rate
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700 bg-rose-50/40 border-r border-zinc-200">
                    24%
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-black text-emerald-800 bg-emerald-50/50">
                    &lt; 2%
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-black text-emerald-700">
                    12x Cleanliness 🛡️
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">
                    <span className="inline-flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-emerald-700 shrink-0" />
                      Operational Cost
                    </span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-zinc-800 border-r border-zinc-200">
                    Channel Ops Processing Cost
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700 bg-rose-50/40 border-r border-zinc-200">
                    $145 per Deal Reg
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-black text-emerald-800 bg-emerald-50/50">
                    72% Cost Reduction ($40.60)
                  </td>
                  <td className="p-3.5 sm:p-4 text-right font-mono font-black text-emerald-700">
                    -$104.40 / Reg 💰
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: 4-Agent AI Swarm Architecture */}
      {activeTab === "agent_swarm" && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-dashed border-zinc-200 pb-3">
            <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600" />
              <span>Multi-Agent Swarm Orchestration Flow</span>
            </h3>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Autonomous coordination across 4 purpose-built agents eliminating manual handoffs across Salesforce, CPQ, and Order Management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Agent 1 */}
            <div className="bg-sky-50/80 border-2 border-sky-300 rounded-2xl p-4 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-sky-200 text-sky-900 font-mono text-[10px] font-black uppercase mb-2 inline-block">
                  Agent #1 • Ingestion
                </span>
                <h4 className="font-hand font-black text-lg text-sky-950 mb-1 flex items-center gap-1.5">
                  <Bot className="h-5 w-5 text-sky-700 shrink-0" />
                  Identify & Dedupe Agent
                </h4>
                <p className="font-sans text-xs text-zinc-700 mt-2 leading-relaxed">
                  Performs instant fuzzy matching and territory cross-referencing against Salesforce Core to catch duplicate registrations in under 2 seconds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200 font-mono text-[10px] text-sky-950 font-bold">
                Output: 0% duplicate collision
              </div>
            </div>

            {/* Agent 2 */}
            <div className="bg-indigo-50/80 border-2 border-indigo-300 rounded-2xl p-4 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-mono text-[10px] font-black uppercase mb-2 inline-block">
                  Agent #2 • Governance
                </span>
                <h4 className="font-hand font-black text-lg text-indigo-950 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-indigo-700 shrink-0" />
                  Discount Validation Agent
                </h4>
                <p className="font-sans text-xs text-zinc-700 mt-2 leading-relaxed">
                  Evaluates partner tier margins, historical tier discounting schedules, and DRICAD compliance rules to ensure healthy commercial margin.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-200 font-mono text-[10px] text-indigo-950 font-bold">
                Output: Tier verified & locked
              </div>
            </div>

            {/* Agent 3 */}
            <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl p-4 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-mono text-[10px] font-black uppercase mb-2 inline-block">
                  Agent #3 • Velocity
                </span>
                <h4 className="font-hand font-black text-lg text-emerald-950 mb-1 flex items-center gap-1.5">
                  <Zap className="h-5 w-5 text-emerald-700 shrink-0" />
                  Parallel Approval Agent
                </h4>
                <p className="font-sans text-xs text-zinc-700 mt-2 leading-relaxed">
                  Triggers simultaneous multi-stakeholder micro-approvals via Slack webhooks, removing 5-day sequential waterfall queues.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 font-mono text-[10px] text-emerald-950 font-bold">
                Output: Approved in &lt;10 mins
              </div>
            </div>

            {/* Agent 4 */}
            <div className="bg-purple-50/80 border-2 border-purple-300 rounded-2xl p-4 shadow-sm relative flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-purple-200 text-purple-900 font-mono text-[10px] font-black uppercase mb-2 inline-block">
                  Agent #4 • Fulfillment
                </span>
                <h4 className="font-hand font-black text-lg text-purple-950 mb-1 flex items-center gap-1.5">
                  <RefreshCw className="h-5 w-5 text-purple-700 shrink-0" />
                  OM Syncing Agent
                </h4>
                <p className="font-sans text-xs text-zinc-700 mt-2 leading-relaxed">
                  Directly transmits approved quotes into Salesforce CPQ and ERP billing systems, finalizing Quote-to-Cash fulfillment within 24 hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-200 font-mono text-[10px] text-purple-950 font-bold">
                Output: ERP synchronised & live
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Interactive Deal Reg Simulator */}
      {activeTab === "simulator" && (
        <div className="space-y-6 animate-fade-in bg-zinc-50 border-3 border-ink rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-3 gap-2">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-600" />
                <span>Interactive Channel Deal Reg & QTC Simulator</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650">
                Test how the autonomous 4-agent swarm validates deal parameters and executes parallel approvals.
              </p>
            </div>
            {simStatus === "completed" && (
              <button
                onClick={resetSimulation}
                className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg font-hand text-xs font-bold border-2 border-zinc-300 cursor-pointer"
              >
                Reset Simulator
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold text-zinc-700 mb-1">
                  1. Partner Tier Level:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Platinum", "Gold", "Silver"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSimPartnerTier(tier)}
                      disabled={simStatus === "running"}
                      className={`py-2 px-3 rounded-xl font-hand text-xs font-bold border-2 transition-all cursor-pointer ${
                        simPartnerTier === tier
                          ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                          : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-zinc-700 mb-1">
                  2. Deal Registration Size ($ ARR):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[50000, 250000, 1000000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSimDealSize(amt)}
                      disabled={simStatus === "running"}
                      className={`py-2 px-2 rounded-xl font-mono text-xs font-bold border-2 transition-all cursor-pointer ${
                        simDealSize === amt
                          ? "bg-emerald-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                          : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-500"
                      }`}
                    >
                      ${(amt / 1000).toLocaleString()}k
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono font-bold text-zinc-700 mb-1">
                  <span>3. Requested Partner Discount:</span>
                  <span className="text-indigo-700 font-black">{simDiscount}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={simDiscount}
                  onChange={(e) => setSimDiscount(Number(e.target.value))}
                  disabled={simStatus === "running"}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <button
                onClick={runSimulation}
                disabled={simStatus === "running"}
                className={`w-full py-3 rounded-xl font-hand text-sm font-black border-2 border-ink shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  simStatus === "running"
                    ? "bg-zinc-300 text-zinc-600 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                }`}
              >
                {simStatus === "running" ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Swarm Processing Deal...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Run Autonomous AI Agent Pipeline</span>
                  </>
                )}
              </button>
            </div>

            {/* Execution Stages Display (Right) */}
            <div className="lg:col-span-7 bg-white border-2 border-ink rounded-2xl p-4 space-y-3">
              <span className="font-mono text-[10px] font-black text-zinc-500 uppercase tracking-wider block">
                Live Multi-Agent Pipeline Trace
              </span>

              {/* Step 1 */}
              <div className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                simStep >= 1 ? "bg-sky-50 border-sky-400" : "bg-zinc-50 border-zinc-200 opacity-50"
              }`}>
                <div className="flex items-center gap-2.5">
                  <Bot className={`h-5 w-5 ${simStep >= 1 ? "text-sky-700 animate-pulse" : "text-zinc-400"}`} />
                  <div>
                    <span className="font-hand font-bold text-xs sm:text-sm text-zinc-900 block">
                      1. Identify & Dedupe Agent
                    </span>
                    <span className="font-mono text-[10px] text-zinc-650">
                      Cross-referencing CRM accounts & territories...
                    </span>
                  </div>
                </div>
                {simStep >= 1 && (
                  <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-bold rounded">
                    0 Conflicts Found (1.2s)
                  </span>
                )}
              </div>

              {/* Step 2 */}
              <div className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                simStep >= 2 ? "bg-indigo-50 border-indigo-400" : "bg-zinc-50 border-zinc-200 opacity-50"
              }`}>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className={`h-5 w-5 ${simStep >= 2 ? "text-indigo-700 animate-pulse" : "text-zinc-400"}`} />
                  <div>
                    <span className="font-hand font-bold text-xs sm:text-sm text-zinc-900 block">
                      2. Discount Validation Agent
                    </span>
                    <span className="font-mono text-[10px] text-zinc-650">
                      Checking {simPartnerTier} tier threshold ({simDiscount}% margin policy)...
                    </span>
                  </div>
                </div>
                {simStep >= 2 && (
                  <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-bold rounded">
                    Valid Margin (0.8s)
                  </span>
                )}
              </div>

              {/* Step 3 */}
              <div className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                simStep >= 3 ? "bg-amber-50 border-amber-400" : "bg-zinc-50 border-zinc-200 opacity-50"
              }`}>
                <div className="flex items-center gap-2.5">
                  <Zap className={`h-5 w-5 ${simStep >= 3 ? "text-amber-600 animate-pulse" : "text-zinc-400"}`} />
                  <div>
                    <span className="font-hand font-bold text-xs sm:text-sm text-zinc-900 block">
                      3. Parallel Approval Agent
                    </span>
                    <span className="font-mono text-[10px] text-zinc-650">
                      Dispatched Slack webhook to Regional Channel VP & Finance...
                    </span>
                  </div>
                </div>
                {simStep >= 3 && (
                  <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-bold rounded">
                    Auto-Consensus (2.1s)
                  </span>
                )}
              </div>

              {/* Step 4 */}
              <div className={`p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                simStep >= 4 ? "bg-emerald-50 border-emerald-400" : "bg-zinc-50 border-zinc-200 opacity-50"
              }`}>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className={`h-5 w-5 ${simStep >= 4 ? "text-emerald-700 animate-spin" : "text-zinc-400"}`} />
                  <div>
                    <span className="font-hand font-bold text-xs sm:text-sm text-zinc-900 block">
                      4. Order Management (OM) Sync Agent
                    </span>
                    <span className="font-mono text-[10px] text-zinc-650">
                      Generated CPQ SKU quote & synced billing to ERP...
                    </span>
                  </div>
                </div>
                {simStep >= 4 && (
                  <span className="px-2 py-0.5 bg-emerald-200 border border-emerald-400 text-emerald-900 font-mono text-[10px] font-black rounded">
                    QTC Completed (&lt;24 hrs)
                  </span>
                )}
              </div>

              {/* Completed Banner */}
              {simStatus === "completed" && (
                <div className="p-3 bg-emerald-100 border-2 border-emerald-400 rounded-xl text-emerald-950 text-xs font-bold flex items-center justify-between">
                  <span>🎉 Deal Registration Approved & Order Created in 4.1 seconds (Saved 5 business days)!</span>
                  <span className="font-mono font-black text-emerald-800">100% SLA</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Slack & Teams Hooks */}
      {activeTab === "slack_hook" && (
        <div className="space-y-5 animate-fade-in">
          <div className="border-b border-dashed border-zinc-200 pb-3">
            <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span>Multi-Channel Conversational Hooks (Slack & Teams)</span>
            </h3>
            <p className="font-sans text-xs text-zinc-650 mt-1">
              Partner reps can register deals and fetch real-time quotes directly inside their preferred chat environments without portal friction.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-900 border-3 border-ink rounded-2xl p-5 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] text-slate-100 font-sans text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="font-mono text-slate-400 text-[11px] ml-2">#channel-partner-deals • Slack Bot Interface</span>
              </div>
              <span className="font-mono text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                Connected: Salesforce API v60
              </span>
            </div>

            {/* Message 1 */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white shrink-0">
                PR
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-slate-200">Partner Rep (Apex Systems)</span>
                  <span className="text-[10px] text-slate-400">10:42 AM</span>
                </div>
                <div className="bg-slate-800 p-2.5 rounded-xl text-slate-200 font-mono">
                  /quote-partner customer="Acme Health Corp" tier="Platinum" seats=500 discount=20%
                </div>
              </div>
            </div>

            {/* Message 2: Bot Reply */}
            <div className="flex items-start gap-3 pl-4 border-l-2 border-emerald-500">
              <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="space-y-2 w-full">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-emerald-400">Channel AI Agent Swarm</span>
                  <span className="text-[10px] text-slate-400">10:42 AM (2.1s later)</span>
                </div>
                <div className="bg-slate-800/90 border border-emerald-500/40 p-3 rounded-xl space-y-2 text-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">✅ Deal Registration & Quote #CPQ-84920 Approved!</span>
                    <span className="bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded font-mono text-[10px]">
                      &lt;10 Min Auto-Approval
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    • <strong>Dedupe Check:</strong> Clean (0 conflict in Acme Health territory)<br />
                    • <strong>Discount:</strong> 20% within Platinum threshold ($180,000 ARR)<br />
                    • <strong>Order Sync:</strong> Sent to ERP Billing Queue (QTC estimated: 4 hours)
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-mono text-[10px] font-bold cursor-pointer">
                      Download PDF Quote
                    </button>
                    <button className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded font-mono text-[10px] cursor-pointer">
                      View in Partner Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 5 Subagents Technical Tooling & Features Specs */}
      {activeTab === "subagents_tech_specs" && (
        <SubagentsTechToolingSpecs />
      )}

      {/* Footer / Product Manager Architecture Takeaways */}
      <div className="border-t-2 border-dashed border-zinc-200 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300 flex items-center justify-center shrink-0">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-hand font-bold text-sm sm:text-base text-zinc-900">
              Product Leadership Core Takeaway
            </h4>
            <p className="font-sans text-xs text-zinc-650">
              Autonomous multi-agent orchestration turns high-friction multi-day approval bottlenecks into real-time self-service revenue engines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-hand text-xs font-bold border-2 border-zinc-300 cursor-pointer"
          >
            <LinkIcon className="h-3.5 w-3.5 text-zinc-600" />
            <span>Copy Tab Link</span>
          </button>
        </div>
      </div>

    </div>
  );
};
