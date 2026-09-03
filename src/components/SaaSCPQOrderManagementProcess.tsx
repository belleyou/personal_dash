/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  ShieldCheck,
  Zap,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign,
  Database,
  Cloud,
  Layers,
  ArrowRight,
  Check,
  Share2,
  ZoomIn,
  Download,
  Sliders,
  Cpu,
  ChevronDown,
  ChevronRight,
  Terminal,
  Server,
  Play,
  RotateCcw,
  Target,
  AlertTriangle,
  Building2,
  FileCheck2,
  BarChart3,
  CreditCard,
  Users,
  Code2,
  Network
} from "lucide-react";

interface SaaSCPQOrderManagementProcessProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

export const SaaSCPQOrderManagementProcess: React.FC<SaaSCPQOrderManagementProcessProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"star_breakdown" | "architecture_image" | "subagent_tree" | "execution_trace" | "sandbox">("star_breakdown");
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [selectedSubagent, setSelectedSubagent] = useState<number>(1);

  // Interactive Sandbox state
  const [subSeats, setSubSeats] = useState<number>(500);
  const [consumptionCredits, setConsumptionCredits] = useState<number>(100000);
  const [rampYears, setRampYears] = useState<number>(3);
  const [discountPercent, setDiscountPercent] = useState<number>(18);
  const [sandboxStatus, setSandboxStatus] = useState<"idle" | "running" | "completed">("idle");
  const [sandboxStep, setSandboxStep] = useState<number>(0);

  const runSandbox = () => {
    setSandboxStatus("running");
    setSandboxStep(1);
    const timers = [
      setTimeout(() => setSandboxStep(2), 500),
      setTimeout(() => setSandboxStep(3), 1000),
      setTimeout(() => setSandboxStep(4), 1500),
      setTimeout(() => setSandboxStep(5), 2000),
      setTimeout(() => {
        setSandboxStep(6);
        setSandboxStatus("completed");
      }, 2500)
    ];
    return () => timers.forEach(clearTimeout);
  };

  const resetSandbox = () => {
    setSandboxStatus("idle");
    setSandboxStep(0);
  };

  const handleShare = () => {
    const link = `${window.location.origin}/#projects?tab=channel_partner_qtc&view=saas_cpq`;
    if (onCopyLink) {
      onCopyLink(link, "Link to saas_cpq_order_logic");
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  const isCopied = copiedLabel === "Link to saas_cpq_order_logic";

  // Calculate simulated contract metrics
  const annualSubValue = subSeats * 1200 * (1 - discountPercent / 100);
  const consumptionValue = (consumptionCredits * 0.08);
  const totalACV = annualSubValue + consumptionValue;
  const totalTCV = (annualSubValue * rampYears) + (consumptionValue * rampYears);

  return (
    <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b-2 border-dashed border-zinc-200 pb-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-900 font-hand text-xs font-black rotate-[-1deg]">
              <Sparkles className="h-3.5 w-3.5 shrink-0 animate-spin text-sky-600" />
              SaaS CPQ &amp; Order Management Logic
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold">
              <Cloud className="h-3 w-3 text-emerald-600" /> Subscription + Consumption
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 font-mono text-[11px] font-bold">
              <Network className="h-3 w-3 text-indigo-600" /> MuleSoft Orders MCP
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-mono text-[11px] font-bold">
              <Cpu className="h-3 w-3 text-purple-600" /> Autonomous Subagents
            </span>
          </div>

          <h2 className="font-hand text-2xl md:text-3xl lg:text-4xl font-black text-ink tracking-tight flex items-center gap-2.5 flex-wrap">
            <span>SaaS CPQ &amp; Order-to-Cash Multi-Agent Orchestration</span>
            <Zap className="h-7 w-7 text-amber-500 shrink-0" />
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-650 mt-1 max-w-4xl leading-relaxed">
            Autonomous multi-agent system designed for modern SaaS enterprises managing <strong>hybrid subscription seats</strong> and <strong>usage-based consumption credits</strong>. Powered by an intelligent Agent Router, 5 purpose-built Subagents, and MuleSoft Orders MCP for instantaneous cloud tenant provisioning and ASC 606 revenue recognition.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-center">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-950 border-2 border-sky-300 rounded-xl font-hand text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer select-none"
          >
            {isCopied ? (
              <>
                <Check className="h-4 w-4 text-emerald-700 animate-scale-up" />
                <span>Copied Direct Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4 text-sky-700" />
                <span>Share Architecture</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top 4 Impact KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-sky-50/80 border-2 border-sky-300 rounded-xl p-3.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-sky-900">
              QTC Turnaround
            </span>
            <Clock className="h-4 w-4 text-sky-700 shrink-0" />
          </div>
          <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Quote-to-Order Fulfillment</h4>
          <div className="mt-2 pt-2 border-t border-sky-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">8 Business Days</span>
              <span className="font-sans font-black text-lg text-sky-950">&lt; 12 Minutes</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-sky-200 text-sky-900 font-mono text-[10px] font-extrabold">
              98.5% ⚡
            </span>
          </div>
        </div>

        <div className="bg-purple-50/80 border-2 border-purple-300 rounded-xl p-3.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-purple-900">
              SaaS Provisioning
            </span>
            <Cloud className="h-4 w-4 text-purple-700 shrink-0" />
          </div>
          <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Tenant &amp; IAM Deployment</h4>
          <div className="mt-2 pt-2 border-t border-purple-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">72 Hours Manual</span>
              <span className="font-sans font-black text-lg text-purple-950">15 Seconds</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-purple-200 text-purple-900 font-mono text-[10px] font-extrabold">
              Zero-Touch 🚀
            </span>
          </div>
        </div>

        <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-xl p-3.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-900">
              Metering Governance
            </span>
            <Database className="h-4 w-4 text-emerald-700 shrink-0" />
          </div>
          <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Consumption Billing Leakage</h4>
          <div className="mt-2 pt-2 border-t border-emerald-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">14% Usage Drift</span>
              <span className="font-sans font-black text-lg text-emerald-950">0% Drift</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono text-[10px] font-extrabold">
              100% Reconciled 🛡️
            </span>
          </div>
        </div>

        <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-3.5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-900">
              Deal Desk Velocity
            </span>
            <DollarSign className="h-4 w-4 text-amber-700 shrink-0" />
          </div>
          <h4 className="font-sans font-bold text-xs text-zinc-700 mb-2">Margin &amp; Discount Approval</h4>
          <div className="mt-2 pt-2 border-t border-amber-200 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 line-through block">5 Days Queue</span>
              <span className="font-sans font-black text-lg text-amber-950">&lt; 8 Minutes</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-mono text-[10px] font-extrabold">
              Slack 1-Click 💬
            </span>
          </div>
        </div>
      </div>

      {/* Internal Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2 select-none">
        {[
          { id: "star_breakdown", label: "📋 S.T.A.R. Method Breakdown", icon: FileCheck2 },
          { id: "architecture_image", label: "🖼️ Logic Architecture Diagram", icon: Layers },
          { id: "subagent_tree", label: "🤖 Agentforce Subagents Tree", icon: Cpu },
          { id: "execution_trace", label: "⚡ Live Execution Trace", icon: Terminal },
          { id: "sandbox", label: "🎮 Hybrid Quoting Sandbox", icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
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

      {/* TAB 1: S.T.A.R. METHOD BREAKDOWN */}
      {activeSubTab === "star_breakdown" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-sky-50/60 border-2 border-sky-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-hand font-bold text-sm text-sky-950">
                Product Manager Leadership: SaaS CPQ &amp; Provisioning Architecture
              </h4>
              <p className="font-sans text-xs text-zinc-700 mt-1 leading-relaxed">
                Authored in the structured <strong>STAR (Situation, Task, Action, Result)</strong> methodology. Outlining how modern B2B SaaS organizations eliminate deal desk delays, configuration chaos in hybrid subscription/consumption packaging, and manual cloud tenant provisioning bottlenecks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Situation */}
            <div className="bg-red-50/70 border-3 border-red-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  S
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-red-700 block">
                    Phase 1: Friction &amp; Complexity
                  </span>
                  <h3 className="font-hand font-black text-xl text-red-950">
                    (S) SITUATION
                  </h3>
                </div>
              </div>
              
              <div className="space-y-2 font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed">
                <p>
                  <strong>Hybrid SaaS Packaging Complexity:</strong> As the SaaS enterprise scaled from pure seat subscriptions to a hybrid model (base platform seat tiers + usage-based API consumption credits), commercial deal friction skyrocketed:
                </p>
                <div className="bg-white/90 border border-red-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>5-Day Deal Desk Queues:</strong> Sales reps quoting custom ramp deals (e.g. 250 seats Y1, 500 seats Y2 + 100K API calls) required 4 sequential approval steps across Finance, Deal Desk, and Legal.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>18% Quoting Configuration Error Rate:</strong> Reps frequently combined incompatible tier SKUs, missed minimum seat thresholds, or miscalculated prepaid credit drawdowns.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>72-Hour Manual Tenant Provisioning:</strong> Post-signature, deals sat in Jira queues waiting for DevOps/Cloud Ops to manually spin up AWS/GCP tenant instances and configure metering webhooks.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>14% Consumption Billing Leakage:</strong> Disconnects between Salesforce CPQ, Stripe/Zuora, and Cloud Telemetry meant overage usage was unbilled or billed months late.</span>
                  </div>
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
                    Phase 2: Product Manager Ownership
                  </span>
                  <h3 className="font-hand font-black text-xl text-blue-950">
                    (T) TASK
                  </h3>
                </div>
              </div>

              <div className="space-y-2 font-sans text-xs sm:text-sm text-zinc-800 leading-relaxed">
                <p>
                  <strong>Architect Autonomous QTC Infrastructure:</strong> Lead end-to-end product requirements, data modeling, and multi-agent system architecture across Sales Ops, Cloud Engineering, Finance, and Customer Success:
                </p>
                <div className="bg-white/90 border border-blue-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Design Multi-Agent CPQ Swarm:</strong> Decompose monolithic CPQ into specialized, deterministic subagents for Subscription Licensing, Consumption Metering, Deal Desk, and Provisioning.</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Implement MuleSoft Orders MCP:</strong> Establish standard Model Context Protocol (MCP) tool bindings to interface between AI agents, Cloud IAM, and Billing/ERP systems.</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Sub-Minute Quoting &amp; Zero-Touch Provisioning:</strong> Reduce end-to-end cycle from 8 days to under 15 minutes, with instant tenant creation upon DocuSign completion.</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Audit-Proof ASC 606 Revenue Recognition:</strong> Ensure dual revenue schedules (amortized ARR + event-driven usage drawdowns) are 100% compliant with Finance standards.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-amber-50/70 border-3 border-amber-200 rounded-2xl p-5 shadow-sm space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  A
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                    Phase 3: Execution, Subagents &amp; Technical Architecture
                  </span>
                  <h3 className="font-hand font-black text-xl text-amber-950">
                    (A) ACTIONS
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-800">
                Spearheaded the technical roadmap, API specifications, and multi-agent coordination system across 4 key engineering pillars:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* Action 1 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-sky-100 text-sky-800 font-mono font-bold text-xs flex items-center justify-center border border-sky-300">
                      1
                    </span>
                    <h5 className="font-hand font-black text-sm text-zinc-900">Subscription Subagent</h5>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Programmed deterministic pricing algorithms for multi-year ramp contracts, user seat minimums, and automatic co-terming for mid-term upgrades.
                  </p>
                  <div className="font-mono text-[10px] text-sky-800 bg-sky-50 p-1.5 rounded border border-sky-200 font-bold">
                    ✓ Evaluates ARR tiers &amp; ramps
                  </div>
                </div>

                {/* Action 2 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center border border-emerald-300">
                      2
                    </span>
                    <h5 className="font-hand font-black text-sm text-zinc-900">Consumption Subagent</h5>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Engineered consumption telemetry modeling for prepaid credit pools, dynamic overage rate cards, and burn rate simulations based on historical usage.
                  </p>
                  <div className="font-mono text-[10px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200 font-bold">
                    ✓ Configures credit drawdowns
                  </div>
                </div>

                {/* Action 3 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                      3
                    </span>
                    <h5 className="font-hand font-black text-sm text-zinc-900">Deal Desk &amp; Margin</h5>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Configured DRICAD margin floor checks (&gt;75% margin = auto-approval; &lt;75% = instant Slack interactive card with 1-click VP sign-off).
                  </p>
                  <div className="font-mono text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200 font-bold">
                    ✓ Slashes queues from 5d to 8m
                  </div>
                </div>

                {/* Action 4 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-800 font-mono font-bold text-xs flex items-center justify-center border border-purple-300">
                      4
                    </span>
                    <h5 className="font-hand font-black text-sm text-zinc-900">Orders MCP &amp; Tenant Sync</h5>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Designed MuleSoft MCP tool callers: upon contract execution, dispatches AWS/GCP tenant creation webhooks and sets Zuora/NetSuite billing schedules.
                  </p>
                  <div className="font-mono text-[10px] text-purple-800 bg-purple-50 p-1.5 rounded border border-purple-200 font-bold">
                    ✓ Instant 15s tenant activation
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-emerald-50/80 border-3 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-hand font-black text-base flex items-center justify-center border-2 border-ink shadow-sm">
                  R
                </span>
                <div>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                    Phase 4: Verified Commercial &amp; Operational Results
                  </span>
                  <h3 className="font-hand font-black text-xl text-emerald-950">
                    (R) RESULTS
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">Fulfillment Velocity</span>
                    <strong className="text-zinc-900 text-sm block mt-1">8 Days ➔ &lt; 12 Minutes</strong>
                    <span className="text-zinc-600 text-[11px] mt-1 block">98.5% faster Quote-to-Cash cycle across 100% of hybrid deals.</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-100 font-mono text-[10px] text-emerald-700 font-bold">
                    ⚡ 8x Revenue Acceleration
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">Cloud Provisioning</span>
                    <strong className="text-zinc-900 text-sm block mt-1">72 Hours ➔ 15 Seconds</strong>
                    <span className="text-zinc-600 text-[11px] mt-1 block">Zero manual Jira DevOps tickets. Immediate Day-0 customer value.</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-100 font-mono text-[10px] text-emerald-700 font-bold">
                    🚀 Zero-Touch Onboarding
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">Revenue Accuracy</span>
                    <strong className="text-zinc-900 text-sm block mt-1">14% Leakage ➔ 0% Drift</strong>
                    <span className="text-zinc-600 text-[11px] mt-1 block">Automatic credit drawdown &amp; real-time overage billing synchronization.</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-100 font-mono text-[10px] text-emerald-700 font-bold">
                    💰 $1.8M ARR Protected
                  </div>
                </div>

                <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">Sales Productivity</span>
                    <strong className="text-zinc-900 text-sm block mt-1">75% Quoting Time Saved</strong>
                    <span className="text-zinc-600 text-[11px] mt-1 block">AEs spend 4 fewer hours/week on CPQ admin; 0% invalid configuration errors.</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-100 font-mono text-[10px] text-emerald-700 font-bold">
                    📈 +22% Selling Capacity
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECTURE IMAGE VIEWER */}
      {activeSubTab === "architecture_image" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl p-3.5">
            <div>
              <h3 className="font-hand font-black text-lg text-ink flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-600" />
                <span>SaaS CPQ &amp; Order Management Logic Image</span>
              </h3>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                Full-resolution vector logic architecture detailing Omnichannel Ingress, Agentforce Master Agent, 5 Subagents, MuleSoft Orders MCP, and Cloud Fulfillment.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border-2 border-zinc-300 rounded-lg font-hand text-xs font-bold cursor-pointer transition-all shadow-sm"
              >
                <ZoomIn className="h-3.5 w-3.5 text-zinc-600" />
                <span>{isZoomed ? "Reset Zoom" : "Expand Image"}</span>
              </button>
              <a
                href="/saas_cpq_order_logic.svg"
                download="saas_cpq_order_logic_architecture.svg"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white border-2 border-ink rounded-lg font-hand text-xs font-bold cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download SVG</span>
              </a>
            </div>
          </div>

          {/* Rendered SVG Architecture Image Container */}
          <div className={`border-3 border-ink rounded-2xl overflow-hidden bg-slate-900 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all duration-300 ${isZoomed ? "p-2" : "p-1"}`}>
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700 text-white font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                <span className="text-slate-300 font-bold ml-2">saas_cpq_order_logic.svg • 1920 × 1080 Blueprint</span>
              </div>
              <span className="text-emerald-400 font-bold">100% Vector Crisp</span>
            </div>

            <div className="overflow-x-auto bg-slate-50 flex items-center justify-center p-2">
              <img
                src="/saas_cpq_order_logic.svg"
                alt="SaaS CPQ and Order Management Process Logic with Autonomous Subagents"
                className={`w-full h-auto object-contain transition-all ${isZoomed ? "max-w-none min-w-[1400px]" : "max-w-full"}`}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Architecture Key Components Legend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-sky-950 font-hand text-sm">
                <Bot className="h-4 w-4 text-sky-700" />
                <span>Agentforce Router &amp; Guardrails</span>
              </div>
              <p className="text-zinc-700 leading-relaxed">
                Ingests quote requests across Slack, Web, and Commerce. Detects intent, enforces margin thresholds, and dynamically routes to specialized SaaS pricing and provisioning subagents.
              </p>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 font-hand text-sm">
                <Database className="h-4 w-4 text-emerald-700" />
                <span>Data 360 Single Source of Truth</span>
              </div>
              <p className="text-zinc-700 leading-relaxed">
                Unifies product catalogs, subscription tiers, consumption rate cards, active license seats, and historical customer burn telemetry for continuous zero-drift reconciliation.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-purple-950 font-hand text-sm">
                <Network className="h-4 w-4 text-purple-700" />
                <span>MuleSoft Orders MCP</span>
              </div>
              <p className="text-zinc-700 leading-relaxed">
                Model Context Protocol tool bindings: standardizes AI agent interactions with ERP (NetSuite, Zuora) and cloud infrastructure (AWS/GCP IAM) for instantaneous order and tenant execution.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AGENTFORCE SUBAGENTS HIERARCHY TREE */}
      {activeSubTab === "subagent_tree" && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-dashed border-zinc-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Cpu className="h-5 w-5 text-indigo-600" />
                <span>Agentforce Subagent Definition Hierarchy</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650 mt-1">
                Visualizing the Master CPQ Agent, Agent Router, and 5 purpose-built Subagents based on Salesforce Agentforce architecture.
              </p>
            </div>
            <span className="font-mono text-xs bg-indigo-50 border border-indigo-200 text-indigo-800 px-2.5 py-1 rounded-lg font-bold self-start sm:self-center">
              Agentforce Schema v2.4
            </span>
          </div>

          {/* Master Agent Box */}
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-3 border-ink rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2.5 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-500 rounded-lg text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <span className="font-hand font-bold text-base">SaaS CPQ &amp; Revenue Operations Agent</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                  Active (Autonomous)
                </span>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Primary intelligence orchestrator. Processes conversational prompts from sales reps and buyers, validates customer entitlements, and dispatches sub-tasks to child subagents.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Subagents: (5)</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Routing: Autonomous</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Protocol: MCP v1</span>
              </div>
            </div>
          </div>

          {/* Router Node */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-ink"></div>
            <div className="w-full max-w-md bg-sky-500 text-white border-2 border-ink rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] text-center">
              <span className="font-hand font-bold text-sm block">⚡ # Agent Router (Start Agent)</span>
              <span className="font-sans text-xs text-sky-100">Evaluates input intent, detects SaaS licensing models, and routes to specialized subagents.</span>
            </div>
            <div className="w-0.5 h-6 bg-ink"></div>
            <div className="w-full max-w-4xl h-0.5 bg-ink"></div>
          </div>

          {/* 5 Subagents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {[
              {
                id: 1,
                num: "#1",
                name: "Subscription Licensing",
                role: "Term & Ramp Specialist",
                color: "border-sky-300 bg-sky-50 text-sky-900",
                badgeBg: "bg-sky-500 text-white",
                icon: FileCheck2,
                actions: ["Multi-Year ARR Ramps", "User Tier Minimums", "Co-Terming Rules", "Auto-Renewal Caps"],
                output: "Structured ARR Schedule"
              },
              {
                id: 2,
                num: "#2",
                name: "Consumption Metering",
                role: "Credits & Usage Specialist",
                color: "border-emerald-300 bg-emerald-50 text-emerald-900",
                badgeBg: "bg-emerald-600 text-white",
                icon: Database,
                actions: ["Prepaid Credit Pools", "Usage Rate Cards", "Dynamic Overage Tiers", "Drawdown Telemetry"],
                output: "Meter Configuration & Caps"
              },
              {
                id: 3,
                num: "#3",
                name: "Deal Desk Approval",
                role: "Margin & Governance Specialist",
                color: "border-amber-300 bg-amber-50 text-amber-900",
                badgeBg: "bg-amber-600 text-white",
                icon: ShieldCheck,
                actions: ["Gross Margin Check (>75%)", "Non-Standard T&C Audit", "Slack 1-Click Signoff", "DRICAD Escalation"],
                output: "Approved Executed Quote"
              },
              {
                id: 4,
                num: "#4",
                name: "Tenant Provisioning",
                role: "Cloud Workspace Specialist",
                color: "border-purple-300 bg-purple-50 text-purple-900",
                badgeBg: "bg-purple-600 text-white",
                icon: Cloud,
                actions: ["SaaS Tenant ID Creation", "IAM Seat Allocation", "Feature Flag Toggles", "API License Token Gen"],
                output: "Active Cloud Tenant (15s)"
              },
              {
                id: 5,
                num: "#5",
                name: "Orders MCP Sync",
                role: "MuleSoft ERP Connector",
                color: "border-teal-300 bg-teal-50 text-teal-900",
                badgeBg: "bg-teal-600 text-white",
                icon: RefreshCw,
                actions: ["NetSuite Order Creation", "Zuora Invoicing Schedules", "ASC 606 Revenue Rev-Rec", "Contract Activation"],
                output: "Live ERP Contract & Billing"
              }
            ].map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedSubagent === agent.id;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedSubagent(agent.id)}
                  className={`border-2 rounded-xl p-3 shadow-sm flex flex-col justify-between transition-all cursor-pointer ${agent.color} ${
                    isSelected ? "ring-2 ring-ink ring-offset-2 scale-102" : "hover:border-zinc-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${agent.badgeBg}`}>
                        {agent.num} Subagent
                      </span>
                      <Icon className="h-4 w-4 opacity-80" />
                    </div>
                    <h5 className="font-hand font-black text-sm mb-0.5 leading-tight">{agent.name}</h5>
                    <span className="font-sans text-[11px] opacity-75 block mb-2">{agent.role}</span>
                    
                    <div className="space-y-1 font-sans text-[11px] bg-white/80 p-2 rounded-lg border border-black/10">
                      {agent.actions.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-black/10 font-mono text-[9.5px] font-bold">
                    ➔ Output: {agent.output}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: LIVE EXECUTION TRACE */}
      {activeSubTab === "execution_trace" && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-dashed border-zinc-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Terminal className="h-5 w-5 text-emerald-600" />
                <span>Live Execution Trace &amp; Reasoning Timeline</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650 mt-1">
                Faithfully models the reasoning and tool execution trace from Attachment 3 across Input, Transitions, Actions, and Output Evaluation.
              </p>
            </div>
            <span className="font-mono text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">
              Trace ID: #tr_8941_prod
            </span>
          </div>

          {/* Trace Steps Container */}
          <div className="bg-slate-900 border-3 border-ink rounded-2xl p-5 md:p-6 text-white font-mono text-xs shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-4">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">Input:</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 border border-slate-700">
                    💬 "Generate 3-year Enterprise quote for Acme Corp: 500 SaaS Platform seats + 100K API consumption credits with tiered ramp."
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Transition to Subagent:</span>
                <span className="text-sky-300 ml-2">➡️ # Agent Router</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Reasoning:</span>
                <span className="text-indigo-300 ml-2">✦ Detected Hybrid SaaS Quoting Intent: requires Subscription &amp; Ramp evaluation + Consumption drawdowns.</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Action:</span>
                <span className="text-yellow-300 ml-2">⚡ Query Data 360: Retrieve Acme Corp Account ID (ACC-8091), active tenant tier, and discount history.</span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Transition to Subagent:</span>
                <span className="text-sky-300 ml-2">➡️ #1 Subscription Licensing Subagent</span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Reasoning:</span>
                <span className="text-indigo-300 ml-2">✦ Applied 3-Year Ramp: Y1=250 seats ($246K), Y2=500 seats ($492K), Y3=500 seats ($492K). Auto-co-terming enabled.</span>
              </div>
            </div>

            {/* Step 7 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Transition to Subagent:</span>
                <span className="text-sky-300 ml-2">➡️ #2 Consumption &amp; Metering Subagent</span>
              </div>
            </div>

            {/* Step 8 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Reasoning:</span>
                <span className="text-indigo-300 ml-2">✦ Modeled 100K prepaid API credits @ $0.08/call ($8,000/yr commit). Configured burst overage rate card @ $0.12/call.</span>
              </div>
            </div>

            {/* Step 9 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Action:</span>
                <span className="text-yellow-300 ml-2">⚡ Deal Desk Margin Evaluation: Blended margin = 81.4% (Threshold: &gt;75%). Automatically approved without human queue.</span>
              </div>
            </div>

            {/* Step 10 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Connected Subagent:</span>
                <span className="text-purple-300 ml-2">🤖 MuleSoft Orders MCP (Model Context Protocol)</span>
              </div>
            </div>

            {/* Step 11 */}
            <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div>
                <span className="text-emerald-400 font-bold">Action:</span>
                <span className="text-yellow-300 ml-2">⚡ Execute Orders MCP: Dispatched webhook to AWS Control Plane • Tenant ID generated: `ten_acme_8091_prod` • IAM seats assigned (500) • Feature flags: [ENTERPRISE_API, AUDIT_LOGS].</span>
              </div>
            </div>

            {/* Step 12 */}
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                ✓
              </span>
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold">Output Evaluation:</span>
                <div className="bg-slate-800 p-2.5 rounded-lg border border-emerald-500/40 text-slate-200">
                  <span className="text-emerald-300 font-bold">🔍 GROUNDING SCORE: 1.0 (Passed)</span>
                  <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                    Order #QTC-9942 created in NetSuite • Zuora billing schedule live ($500K ACV) • Tenant provisioned &amp; active in 12.4 seconds • Welcome payload dispatched to buyer.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: INTERACTIVE HYBRID QUOTING SANDBOX */}
      {activeSubTab === "sandbox" && (
        <div className="space-y-6 animate-fade-in bg-zinc-50 border-3 border-ink rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-3 gap-2">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-600" />
                <span>Interactive SaaS Hybrid CPQ &amp; Provisioning Sandbox</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650">
                Configure a live enterprise contract combining subscription seats and consumption credits to watch the subagents route and provision.
              </p>
            </div>
            {sandboxStatus === "completed" && (
              <button
                onClick={resetSandbox}
                className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 rounded-lg font-hand text-xs font-bold border-2 border-zinc-300 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Slider 1: Subscription Seats */}
              <div className="bg-white border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-700 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-sky-600" />
                    Subscription Seats (Annual)
                  </span>
                  <span className="font-mono text-sky-700 text-sm">{subSeats} Seats</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={subSeats}
                  disabled={sandboxStatus === "running"}
                  onChange={(e) => setSubSeats(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>50 (Startup)</span>
                  <span>500 (Mid-Market)</span>
                  <span>2,000 (Enterprise)</span>
                </div>
              </div>

              {/* Slider 2: Consumption Credits */}
              <div className="bg-white border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-700 flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-emerald-600" />
                    Prepaid Consumption Credits
                  </span>
                  <span className="font-mono text-emerald-700 text-sm">{consumptionCredits.toLocaleString()} Credits</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={consumptionCredits}
                  disabled={sandboxStatus === "running"}
                  onChange={(e) => setConsumptionCredits(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>10K API Calls</span>
                  <span>100K API Calls</span>
                  <span>500K API Calls</span>
                </div>
              </div>

              {/* Slider 3: Ramp & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-700 block">Ramp Term</span>
                  <select
                    value={rampYears}
                    disabled={sandboxStatus === "running"}
                    onChange={(e) => setRampYears(Number(e.target.value))}
                    className="w-full border-2 border-zinc-300 rounded-lg p-1.5 font-mono text-xs font-bold bg-zinc-50 cursor-pointer"
                  >
                    <option value={1}>1-Year Annual</option>
                    <option value={2}>2-Year Ramp</option>
                    <option value={3}>3-Year Multi-Year</option>
                    <option value={5}>5-Year Strategic</option>
                  </select>
                </div>

                <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-zinc-700 block">Blended Discount</span>
                  <select
                    value={discountPercent}
                    disabled={sandboxStatus === "running"}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full border-2 border-zinc-300 rounded-lg p-1.5 font-mono text-xs font-bold bg-zinc-50 cursor-pointer"
                  >
                    <option value={10}>10% Standard</option>
                    <option value={18}>18% Tier 2 (Auto)</option>
                    <option value={25}>25% Tier 3 (VP Approval)</option>
                    <option value={35}>35% Non-Standard</option>
                  </select>
                </div>
              </div>

              {/* Live Contract Value Preview */}
              <div className="bg-sky-50 border-2 border-sky-300 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-900 block">Calculated Contract Economics</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-700 font-bold">Annual Contract Value (ACV):</span>
                  <span className="font-mono font-black text-base text-sky-950">${Math.round(totalACV).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-700 font-bold">Total Contract Value (TCV):</span>
                  <span className="font-mono font-black text-sm text-emerald-800">${Math.round(totalTCV).toLocaleString()}</span>
                </div>
              </div>

              {/* Trigger Button */}
              {sandboxStatus === "idle" && (
                <button
                  onClick={runSandbox}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-hand text-base font-black border-2 border-ink shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Execute Multi-Agent CPQ &amp; Provisioning</span>
                </button>
              )}

              {sandboxStatus === "running" && (
                <div className="w-full py-3 bg-indigo-50 text-indigo-900 rounded-xl font-mono text-xs font-bold border-2 border-indigo-300 flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin text-indigo-600" />
                  <span>Orchestrating Subagents ({sandboxStep}/5)...</span>
                </div>
              )}

              {sandboxStatus === "completed" && (
                <div className="w-full py-2.5 bg-emerald-100 text-emerald-900 rounded-xl font-hand text-sm font-bold border-2 border-emerald-300 text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  <span>Quote Approved &amp; Tenant Live (12s)!</span>
                </div>
              )}
            </div>

            {/* Right Simulation Execution Console (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border-3 border-ink rounded-xl p-4 text-white font-mono text-xs space-y-3 shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-300 font-bold">Subagent Execution Console</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">MCP Channel Active</span>
                </div>

                {sandboxStatus === "idle" && (
                  <div className="text-slate-400 py-12 text-center space-y-2">
                    <Sliders className="h-8 w-8 mx-auto opacity-40" />
                    <p>Adjust the contract parameters on the left and click "Execute" to inspect live subagent transitions.</p>
                  </div>
                )}

                {sandboxStatus !== "idle" && (
                  <div className="space-y-2.5">
                    {sandboxStep >= 1 && (
                      <div className="flex items-start gap-2 text-sky-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [ROUTER]</span>
                        <span>Ingested {subSeats} seats + {consumptionCredits.toLocaleString()} credits. Dispatched to Licensing Subagent.</span>
                      </div>
                    )}
                    {sandboxStep >= 2 && (
                      <div className="flex items-start gap-2 text-indigo-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [#1 LICENSING]</span>
                        <span>Calculated {rampYears}-year ramp schedule with {discountPercent}% tier discount. Annual Sub: ${Math.round(annualSubValue).toLocaleString()}.</span>
                      </div>
                    )}
                    {sandboxStep >= 3 && (
                      <div className="flex items-start gap-2 text-emerald-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [#2 CONSUMPTION]</span>
                        <span>Configured {consumptionCredits.toLocaleString()} prepaid drawdown meter @ $0.08/unit. Overage tier set to $0.12.</span>
                      </div>
                    )}
                    {sandboxStep >= 4 && (
                      <div className="flex items-start gap-2 text-amber-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [#3 DEAL DESK]</span>
                        <span>
                          Gross margin check: 81.2% &gt; threshold. {discountPercent > 20 ? "Triggered Slack 1-click executive confirmation." : "Auto-approved instantly."}
                        </span>
                      </div>
                    )}
                    {sandboxStep >= 5 && (
                      <div className="flex items-start gap-2 text-purple-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [#4 PROVISIONING]</span>
                        <span>
                          Generated Cloud Tenant ID {`ten_auto_8091`}. Allocated {subSeats} IAM seats in US-East cluster.
                        </span>
                      </div>
                    )}
                    {sandboxStep >= 6 && (
                      <div className="flex items-start gap-2 text-teal-300 animate-fade-in bg-slate-800 p-2 rounded border border-teal-500/30">
                        <span className="text-emerald-400">⚡ [#5 ORDERS MCP]</span>
                        <span>MuleSoft MCP invoked: NetSuite Contract #SO-8831 Live • Zuora billing schedule active • ASC 606 Rev-Rec generated!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {sandboxStatus === "completed" && (
                <div className="bg-slate-800/80 p-2.5 rounded border border-emerald-400/40 text-[11px] text-slate-200 mt-2">
                  <span className="text-emerald-400 font-bold">Execution Result:</span>
                  <p className="mt-0.5 text-slate-300">
                    Total QTC Turnaround: <strong>12.4 seconds</strong> (vs. legacy 8 days manual). Zero unbilled consumption drift.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
