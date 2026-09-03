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
import { ArchitectureDiagramViewer } from "./ArchitectureDiagramViewer";

interface SaaSCPQOrderManagementProcessProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

export const SaaSCPQOrderManagementProcess: React.FC<SaaSCPQOrderManagementProcessProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"star_breakdown" | "architecture_image" | "subagent_tree" | "execution_trace" | "sandbox">("star_breakdown");
  const [customerTrack, setCustomerTrack] = useState<"enterprise_lcs" | "self_serve_plg" | "comparison">("enterprise_lcs");
  const [subagentViewMode, setSubagentViewMode] = useState<"five_core" | "extension_agents">("five_core");
  const [selectedSubagent, setSelectedSubagent] = useState<number>(1);
  const [selectedTraceType, setSelectedTraceType] = useState<"enterprise_lcs" | "self_serve_plg">("enterprise_lcs");

  // Interactive Sandbox state (Dual Track)
  const [sandboxCustomerType, setSandboxCustomerType] = useState<"enterprise_lcs" | "self_serve_plg">("enterprise_lcs");
  
  // LCS Enterprise inputs
  const [subSeats, setSubSeats] = useState<number>(500);
  const [consumptionCredits, setConsumptionCredits] = useState<number>(100000);
  const [rampYears, setRampYears] = useState<number>(3);
  const [discountPercent, setDiscountPercent] = useState<number>(18);
  const [slaTier, setSlaTier] = useState<string>("99.99% Mission Critical");
  const [creditTier, setCreditTier] = useState<string>("Tier 1 (D&B Score 88, $1M Line)");
  const [paymentTerms, setPaymentTerms] = useState<string>("Net 30 via ACH / Wire");
  const [poNumber, setPoNumber] = useState<string>("PO-8829-CORP");

  // Self-Serve inputs
  const [selfServePlan, setSelfServePlan] = useState<string>("Scale Tier ($99/mo/seat)");
  const [selfServeSeats, setSelfServeSeats] = useState<number>(25);
  const [taxJurisdiction, setTaxJurisdiction] = useState<string>("EU VAT (20% Reverse Charge)");
  const [cardType, setCardType] = useState<string>("Stripe Corporate Visa (Ending 4242)");
  
  // Lifecycle simulator action state
  const [lifecycleAction, setLifecycleAction] = useState<"none" | "co_term_expansion" | "plan_downgrade" | "renewal_uplift" | "dunning_failed">("none");

  // Simulation execution state
  const [sandboxStatus, setSandboxStatus] = useState<"idle" | "running" | "completed">("idle");
  const [sandboxStep, setSandboxStep] = useState<number>(0);

  const runSandbox = () => {
    setSandboxStatus("running");
    setSandboxStep(1);
    const timers = [
      setTimeout(() => setSandboxStep(2), 400),
      setTimeout(() => setSandboxStep(3), 850),
      setTimeout(() => setSandboxStep(4), 1300),
      setTimeout(() => setSandboxStep(5), 1750),
      setTimeout(() => {
        setSandboxStep(6);
        setSandboxStatus("completed");
      }, 2200)
    ];
    return () => timers.forEach(clearTimeout);
  };

  const resetSandbox = () => {
    setSandboxStatus("idle");
    setSandboxStep(0);
    setLifecycleAction("none");
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
  const seatUnitPrice = sandboxCustomerType === "enterprise_lcs" ? 1200 : 1188;
  const activeSeats = sandboxCustomerType === "enterprise_lcs" 
    ? (lifecycleAction === "co_term_expansion" ? subSeats + 100 : subSeats)
    : (lifecycleAction === "co_term_expansion" ? selfServeSeats + 15 : selfServeSeats);
  
  const discountRate = sandboxCustomerType === "enterprise_lcs" ? discountPercent : (selfServeSeats > 20 ? 10 : 0);
  const annualSubValue = activeSeats * seatUnitPrice * (1 - discountRate / 100);
  const consumptionValue = (consumptionCredits * 0.08);
  const upliftMultiplier = lifecycleAction === "renewal_uplift" ? 1.07 : 1.0;
  const totalACV = (annualSubValue + consumptionValue) * upliftMultiplier;
  const totalTCV = sandboxCustomerType === "enterprise_lcs" 
    ? (totalACV * rampYears) 
    : totalACV;

  // Tax calculation for self-serve
  const taxRate = taxJurisdiction.includes("20%") ? 0.20 : taxJurisdiction.includes("8.25%") ? 0.0825 : 0;
  const calculatedTax = totalACV * taxRate;

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

      {/* Customer Profile Track Switcher */}
      <div className="bg-zinc-100 border-2 border-ink rounded-xl p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-sky-700 shrink-0" />
          <div>
            <span className="font-hand font-bold text-xs text-zinc-900 block">Target Customer Operational Track:</span>
            <span className="font-sans text-[11px] text-zinc-600">Toggle between high-touch enterprise managed-service and automated self-serve flows</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 self-stretch sm:self-auto bg-white p-1 rounded-lg border border-zinc-300">
          <button
            onClick={() => {
              setCustomerTrack("enterprise_lcs");
              setSelectedTraceType("enterprise_lcs");
              setSandboxCustomerType("enterprise_lcs");
            }}
            className={`px-3 py-1.5 rounded-md font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              customerTrack === "enterprise_lcs"
                ? "bg-sky-600 text-white shadow-sm"
                : "text-zinc-650 hover:bg-zinc-100"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>🏢 Managed LCS Enterprise</span>
          </button>

          <button
            onClick={() => {
              setCustomerTrack("self_serve_plg");
              setSelectedTraceType("self_serve_plg");
              setSandboxCustomerType("self_serve_plg");
            }}
            className={`px-3 py-1.5 rounded-md font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              customerTrack === "self_serve_plg"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-650 hover:bg-zinc-100"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>⚡ Self-Serve PLG</span>
          </button>

          <button
            onClick={() => setCustomerTrack("comparison")}
            className={`px-3 py-1.5 rounded-md font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              customerTrack === "comparison"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-650 hover:bg-zinc-100"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>🔄 Dual-Track Matrix</span>
          </button>
        </div>
      </div>

      {/* Internal Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2 select-none">
        {[
          { id: "star_breakdown", label: "📋 S.T.A.R. Method Breakdown", icon: FileCheck2 },
          { id: "architecture_image", label: "🖼️ Logic Architecture Diagram", icon: Layers },
          { id: "subagent_tree", label: "🤖 Agentforce Subagents Tree (5 Agents)", icon: Cpu },
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
          <div className="bg-sky-50/60 border-2 border-sky-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-sky-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-hand font-bold text-sm text-sky-950">
                  Product Manager Leadership: SaaS CPQ &amp; Order-to-Cash Automation
                </h4>
                <p className="font-sans text-xs text-zinc-700 mt-0.5 leading-relaxed">
                  Engineered in the <strong>STAR (Situation, Task, Action, Result)</strong> framework. Demonstrates the complete automation across 5 lifecycle stages for both <strong>Managed-Service LCS Enterprise B2B</strong> and <strong>Self-Serve PLG</strong> customers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-200 text-sky-950 border border-sky-300">
                Active Track: {customerTrack === "enterprise_lcs" ? "🏢 Managed LCS" : customerTrack === "self_serve_plg" ? "⚡ Self-Serve" : "🔄 Dual Matrix"}
              </span>
            </div>
          </div>

          {/* DUAL-TRACK COMPARISON MATRIX VIEW */}
          {customerTrack === "comparison" && (
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-hand font-black text-lg text-ink">
                    5-Stage Automation: Managed LCS Enterprise vs. Self-Serve PLG
                  </h3>
                </div>
                <span className="font-mono text-xs bg-indigo-50 border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded font-bold">
                  Side-by-Side Architectural Mapping
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 border-b-2 border-ink">
                      <th className="p-3 font-hand font-black text-sm text-zinc-900 w-1/5">Lifecycle Stage</th>
                      <th className="p-3 font-hand font-black text-sm text-sky-950 bg-sky-50/70 border-l border-r border-zinc-200 w-2/5">
                        🏢 Managed-Service LCS Enterprise B2B
                      </th>
                      <th className="p-3 font-hand font-black text-sm text-emerald-950 bg-emerald-50/70 w-2/5">
                        ⚡ Self-Serve PLG Customer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr>
                      <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">
                        <span className="font-mono text-[10px] text-sky-800 block">Stage 1</span>
                        1. Order Capture &amp; Quoting
                      </td>
                      <td className="p-3 bg-sky-50/30 border-l border-r border-zinc-200 leading-relaxed">
                        <strong>Q2C Initiation:</strong> Sales quote accepted via DocuSign or Salesforce CPQ. Negotiated pricing tiers, 250+ seat minimums, 99.99% mission-critical SLAs, and 3-year ramp schedules with co-terming terms.
                      </td>
                      <td className="p-3 bg-emerald-50/30 leading-relaxed">
                        <strong>Self-Serve Portal:</strong> Buyer configures seats (1-100) and API credit packages directly in the online pricing widget with immediate transparent tier pricing and instant cart checkout.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">
                        <span className="font-mono text-[10px] text-sky-800 block">Stage 2</span>
                        2. Order Validation &amp; Credit Check
                      </td>
                      <td className="p-3 bg-sky-50/30 border-l border-r border-zinc-200 leading-relaxed">
                        <strong>Approval &amp; Compliance:</strong> Automated Dun &amp; Bradstreet corporate credit limit validation, Purchase Order (PO) matching, and margin floor checks (&gt;75% auto-sign, &lt;75% Slack 1-click VP sign-off).
                      </td>
                      <td className="p-3 bg-emerald-50/30 leading-relaxed">
                        <strong>Instant Micro-Tax &amp; Anti-Fraud:</strong> Automated VAT/GST calculation based on customer geo-location (EU VAT reverse charge, US state sales tax) + real-time Stripe Radar fraud score.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">
                        <span className="font-mono text-[10px] text-sky-800 block">Stage 3</span>
                        3. Fulfillment, Provisioning &amp; IAM
                      </td>
                      <td className="p-3 bg-sky-50/30 border-l border-r border-zinc-200 leading-relaxed">
                        <strong>Enterprise Digital Fulfillment:</strong> Dedicated single-tenant cloud VPC cluster spin-up, automated SAML 2.0 / SCIM Okta directory sync, RBAC seat allocation, and dedicated TAM onboarding trigger.
                      </td>
                      <td className="p-3 bg-emerald-50/30 leading-relaxed">
                        <strong>Zero-Touch Cloud Sandbox:</strong> 15-second multi-tenant container workspace deployment, instant developer API key generation, and feature flag toggles for immediate Day-0 self-serve usage.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">
                        <span className="font-mono text-[10px] text-sky-800 block">Stage 4</span>
                        4. Billing &amp; Recurring Revenue
                      </td>
                      <td className="p-3 bg-sky-50/30 border-l border-r border-zinc-200 leading-relaxed">
                        <strong>Enterprise Invoicing:</strong> Net 30/60 corporate invoice generated in NetSuite with automated ACH/Wire lockbox reconciliation and dual ASC 606 revenue recognition schedules.
                      </td>
                      <td className="p-3 bg-emerald-50/30 leading-relaxed">
                        <strong>Credit Card &amp; Metering:</strong> Automated 3D-Secure credit card tokenization via Stripe, monthly recurring billing cycle, and real-time consumption credit drawdown metering telemetry.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-zinc-900 bg-zinc-50/50">
                        <span className="font-mono text-[10px] text-sky-800 block">Stage 5</span>
                        5. Renewal, Swaps, Upgrades &amp; Churn
                      </td>
                      <td className="p-3 bg-sky-50/30 border-l border-r border-zinc-200 leading-relaxed">
                        <strong>Enterprise Lifecycle:</strong> Mid-cycle co-termed expansion quotes, SKU swaps, automated 90/60/30-day renewal orchestration with contractual CPI/+7% price uplifts.
                      </td>
                      <td className="p-3 bg-emerald-50/30 leading-relaxed">
                        <strong>Smart Dunning &amp; Churn Guard:</strong> Autonomous smart dunning for failed cards with 4-phase retry logic, grace-period feature throttling before suspension, and 1-click self-serve plan modifications.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
                  <strong>Hybrid SaaS Packaging Complexity:</strong> As the SaaS enterprise scaled from pure seat subscriptions to a hybrid model (base platform seat tiers + usage-based API consumption credits), commercial deal friction skyrocketed across both LCS Enterprise and Self-Serve channels:
                </p>
                <div className="bg-white/90 border border-red-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>5-Day Deal Desk Queues:</strong> Sales reps quoting custom ramp deals (e.g. 250 seats Y1, 500 seats Y2 + 100K API calls) required 4 sequential approval steps across Finance, Deal Desk, and Legal.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>Self-Serve Cart Abandonment (27%):</strong> Self-serve portal lacked real-time international tax calculation (EU VAT / GST) and dynamic seat minimum validations, causing checkout drop-offs.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>72-Hour Manual Tenant Provisioning:</strong> Post-signature, enterprise deals sat in Jira queues waiting for DevOps/Cloud Ops to manually spin up AWS/GCP tenant instances and configure metering webhooks.</span>
                  </div>
                  <div className="flex items-start gap-2 text-red-950">
                    <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                    <span><strong>14% Consumption Billing Leakage:</strong> Disconnects between Salesforce CPQ, Stripe/Zuora, and Cloud Telemetry meant overage usage was unbilled, and mid-cycle tier swaps caused billing disputes.</span>
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
                  <strong>Architect Autonomous 5-Phase QTC Infrastructure:</strong> Lead end-to-end product requirements, data modeling, and multi-agent system architecture across Sales Ops, Cloud Engineering, Finance, and Customer Success:
                </p>
                <div className="bg-white/90 border border-blue-200 rounded-xl p-3 text-xs space-y-2">
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>5 Autonomous Subagents:</strong> Decompose monolithic CPQ into 5 specialized subagents mapping 1:1 to Order Capture, Credit/Tax Validation, Digital Fulfillment, Billing/Rev-Rec, and Renewal/Churn.</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Dual-Track Orchestration:</strong> Support both managed-service LCS enterprise workflows (D&amp;B credit, PO match, Net 30 ACH, dedicated VPC) and self-serve PLG (credit card tokenization, micro-tax, 15s instant workspace).</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>MuleSoft Orders MCP:</strong> Establish standard Model Context Protocol (MCP) tool bindings to interface between AI agents, Cloud IAM, and Billing/ERP systems.</span>
                  </div>
                  <div className="flex items-start gap-2 text-blue-950">
                    <Target className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                    <span><strong>Audit-Proof ASC 606 &amp; Smart Dunning:</strong> Ensure dual revenue schedules (amortized ARR + event usage) and smart dunning retry sequences to eliminate involuntary churn.</span>
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
                    Phase 3: Execution Across 5 Autonomous Stages
                  </span>
                  <h3 className="font-hand font-black text-xl text-amber-950">
                    (A) ACTIONS
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-800">
                Spearheaded the technical roadmap, API specifications, and multi-agent coordination system across all 5 lifecycle stages:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {/* Stage 1 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-sky-100 text-sky-800 font-mono font-bold text-xs flex items-center justify-center border border-sky-300">
                      1
                    </span>
                    <h5 className="font-hand font-black text-xs text-zinc-900">Order Capture &amp; Quoting</h5>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-700 leading-relaxed">
                    Automates Q2C initiation for custom quotes (multi-year ramps, 250+ seat minimums, SLAs) and self-serve online pricing portals.
                  </p>
                  <div className="font-mono text-[9.5px] text-sky-800 bg-sky-50 p-1 rounded border border-sky-200 font-bold">
                    ✓ Evaluates ARR tiers &amp; ramps
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center border border-emerald-300">
                      2
                    </span>
                    <h5 className="font-hand font-black text-xs text-zinc-900">Validation &amp; Credit Check</h5>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-700 leading-relaxed">
                    Automates D&amp;B corporate credit scoring, PO matching, and real-time geo-tax (EU VAT reverse charge, US sales tax).
                  </p>
                  <div className="font-mono text-[9.5px] text-emerald-800 bg-emerald-50 p-1 rounded border border-emerald-200 font-bold">
                    ✓ Instant tax &amp; credit audit
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-amber-100 text-amber-800 font-mono font-bold text-xs flex items-center justify-center border border-amber-300">
                      3
                    </span>
                    <h5 className="font-hand font-black text-xs text-zinc-900">Fulfillment &amp; Provisioning</h5>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-700 leading-relaxed">
                    Digital fulfillment spins up dedicated VPC clusters (LCS) or 15s multi-tenant containers (Self-Serve) with SAML/SCIM SSO.
                  </p>
                  <div className="font-mono text-[9.5px] text-amber-800 bg-amber-50 p-1 rounded border border-amber-200 font-bold">
                    ✓ Zero-touch 15s activation
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-purple-100 text-purple-800 font-mono font-bold text-xs flex items-center justify-center border border-purple-300">
                      4
                    </span>
                    <h5 className="font-hand font-black text-xs text-zinc-900">Billing &amp; Recurring Rev</h5>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-700 leading-relaxed">
                    Automates Net 30/60 corporate invoicing, Stripe card tokenization, usage metering telemetry, and ASC 606 revenue schedules.
                  </p>
                  <div className="font-mono text-[9.5px] text-purple-800 bg-purple-50 p-1 rounded border border-purple-200 font-bold">
                    ✓ Dual ASC 606 Rev-Rec
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="bg-white/95 border-2 border-amber-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-teal-100 text-teal-800 font-mono font-bold text-xs flex items-center justify-center border border-teal-300">
                      5
                    </span>
                    <h5 className="font-hand font-black text-xs text-zinc-900">Renewal &amp; Churn Guard</h5>
                  </div>
                  <p className="font-sans text-[11px] text-zinc-700 leading-relaxed">
                    Manages mid-cycle co-termed expansions, SKU swaps, 90-day renewal uplifts (+7%), and smart dunning card decline recovery.
                  </p>
                  <div className="font-mono text-[9.5px] text-teal-800 bg-teal-50 p-1 rounded border border-teal-200 font-bold">
                    ✓ Smart dunning &amp; retention
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
                    <span className="text-zinc-600 text-[11px] mt-1 block">98.5% faster Quote-to-Cash cycle across enterprise and self-serve deals.</span>
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
                <span>SaaS CPQ &amp; Order Management Logic Architecture</span>
              </h3>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                Full-resolution vector logic architecture detailing Omnichannel Ingress, Agentforce Master Agent, 5 Subagents, MuleSoft Orders MCP, and Cloud Fulfillment.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/saas_cpq_order_logic.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border-2 border-zinc-300 rounded-lg font-hand text-xs font-bold cursor-pointer transition-all shadow-sm"
              >
                <Layers className="h-3.5 w-3.5 text-zinc-600" />
                <span>Open Raw SVG</span>
              </a>
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

          {/* Interactive Pan & Zoom Diagram Viewer */}
          <ArchitectureDiagramViewer
            imageSrc="/saas_cpq_order_logic.svg"
            altText="SaaS CPQ and Order Management Process Logic with Autonomous Subagents"
            title="SaaS CPQ & Order Management Multi-Agent Architecture"
            subtitle="Interactive Pan, Zoom, Subsystem Focus & Fullscreen View"
          />

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
          <div className="border-b border-dashed border-zinc-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Cpu className="h-5 w-5 text-indigo-600" />
                <span>Agentforce Subagent Definition Hierarchy</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650 mt-1">
                Visualizing the Master CPQ Agent, Agent Router, and the 5 Core Autonomous Subagents mapped directly to each lifecycle stage, plus specialized swarm extension agents.
              </p>
            </div>
            
            {/* Swarm Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg border border-zinc-300 self-start sm:self-auto">
              <button
                onClick={() => setSubagentViewMode("five_core")}
                className={`px-2.5 py-1 rounded-md font-hand text-xs font-bold transition-all cursor-pointer ${
                  subagentViewMode === "five_core"
                    ? "bg-ink text-white shadow-sm"
                    : "text-zinc-650 hover:bg-zinc-200"
                }`}
              >
                5 Core Lifecycle Subagents
              </button>
              <button
                onClick={() => setSubagentViewMode("extension_agents")}
                className={`px-2.5 py-1 rounded-md font-hand text-xs font-bold transition-all cursor-pointer ${
                  subagentViewMode === "extension_agents"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-zinc-650 hover:bg-zinc-200"
                }`}
              >
                +4 Specialized Swarm Extensions
              </button>
            </div>
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
                  Active (Autonomous Swarm)
                </span>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Primary intelligence orchestrator. Ingests commercial intents across sales reps (LCS Enterprise) and pricing portals (Self-Serve PLG), coordinates deterministic subagents, and triggers zero-touch cloud fulfillment.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Architecture: 5 Core + 4 Extensions</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Routing: Autonomous</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Protocol: MuleSoft Orders MCP</span>
              </div>
            </div>
          </div>

          {/* Router Node */}
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-ink"></div>
            <div className="w-full max-w-md bg-sky-500 text-white border-2 border-ink rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] text-center">
              <span className="font-hand font-bold text-sm block">⚡ # Agent Router (Start Agent)</span>
              <span className="font-sans text-xs text-sky-100">Evaluates input intent, detects customer profile (Managed LCS Enterprise vs. Self-Serve PLG), and routes to specialized subagents.</span>
            </div>
            <div className="w-0.5 h-6 bg-ink"></div>
            <div className="w-full max-w-5xl h-0.5 bg-ink"></div>
          </div>

          {/* VIEW MODE 1: 5 CORE INTEGRATED SUBAGENTS */}
          {subagentViewMode === "five_core" && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-zinc-700 uppercase">
                  5 Core Integrated Subagents (Automating All 5 Lifecycle Stages)
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">Click subagent to inspect details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  {
                    id: 1,
                    num: "#1",
                    stage: "Stage 1",
                    name: "Order Capture & Quoting",
                    subagentCode: "subagent.capture_quoting",
                    role: "Q2C Initiation & Terms",
                    color: "border-sky-300 bg-sky-50 text-sky-900",
                    badgeBg: "bg-sky-600 text-white",
                    icon: FileCheck2,
                    lcsAutomation: "Custom sales quote acceptance, 99.99% SLAs, 250+ seat minimums, multi-year ramps.",
                    selfServeAutomation: "Online pricing portal self-select, instant transparent tier calculation, cart creation.",
                    actions: ["Negotiated Pricing Tiers", "Seat Minimum Thresholds", "SLA Term Enforcement", "Ramp Schedule Generator"],
                    output: "Structured Quote & Terms Payload"
                  },
                  {
                    id: 2,
                    num: "#2",
                    stage: "Stage 2",
                    name: "Validation & Credit Check",
                    subagentCode: "subagent.validation_compliance",
                    role: "Approvals & Geo-Tax",
                    color: "border-emerald-300 bg-emerald-50 text-emerald-900",
                    badgeBg: "bg-emerald-600 text-white",
                    icon: ShieldCheck,
                    lcsAutomation: "D&B corporate credit scoring, PO matching verification, Deal Desk margin floor (>75%).",
                    selfServeAutomation: "Real-time Avalara/Stripe Tax geo-tax (EU VAT reverse charge, US sales tax) + anti-fraud scoring.",
                    actions: ["D&B Corporate Credit Check", "Purchase Order (PO) Match", "Real-Time Geo Tax Engine", "Margin Floor Auditing"],
                    output: "Verified & Tax-Cleared Order"
                  },
                  {
                    id: 3,
                    num: "#3",
                    stage: "Stage 3",
                    name: "Fulfillment & Provisioning",
                    subagentCode: "subagent.fulfillment_iam",
                    role: "Digital Fulfillment & IAM",
                    color: "border-purple-300 bg-purple-50 text-purple-900",
                    badgeBg: "bg-purple-600 text-white",
                    icon: Cloud,
                    lcsAutomation: "Dedicated single-tenant cloud VPC cluster spin-up, SAML 2.0 / SCIM Okta directory sync.",
                    selfServeAutomation: "15-second multi-tenant cloud workspace container deployment, instant API key generation.",
                    actions: ["Digital Goods Fulfillment", "IAM Seat Allocation", "SAML 2.0 / SCIM Directory Sync", "API License Token Gen"],
                    output: "Active Cloud Tenant (15s Instant)"
                  },
                  {
                    id: 4,
                    num: "#4",
                    stage: "Stage 4",
                    name: "Billing & Recurring Rev",
                    subagentCode: "subagent.billing_revenue",
                    role: "Invoicing & ASC 606",
                    color: "border-amber-300 bg-amber-50 text-amber-900",
                    badgeBg: "bg-amber-600 text-white",
                    icon: CreditCard,
                    lcsAutomation: "Net 30/60 corporate invoicing, automated ACH/Wire lockbox reconciliation, NetSuite GL sync.",
                    selfServeAutomation: "3D-Secure credit card tokenization via Stripe, monthly recurring billing, usage telemetry.",
                    actions: ["Net 30/60 Invoicing & Stripe", "ACH / Wire Lockbox Sync", "Usage Telemetry Ingestion", "ASC 606 Rev-Rec Schedule"],
                    output: "Live Billing Schedule & Rev-Rec"
                  },
                  {
                    id: 5,
                    num: "#5",
                    stage: "Stage 5",
                    name: "Renewal & Churn Guard",
                    subagentCode: "subagent.lifecycle_churn",
                    role: "Amendments & Retention",
                    color: "border-teal-300 bg-teal-50 text-teal-900",
                    badgeBg: "bg-teal-600 text-white",
                    icon: RefreshCw,
                    lcsAutomation: "Mid-term co-termed seat expansions, SKU swaps, automated 90/60/30-day renewal uplifts (+7%).",
                    selfServeAutomation: "1-click self-service tier swaps, smart dunning machine retries for failed cards, grace period suspension.",
                    actions: ["Co-Termed Add-on Quotes", "SKU & Tier Swaps", "90-Day Renewal Uplift (+7%)", "Smart Dunning Retry Logic"],
                    output: "Lifecycle & Retention Record"
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
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${agent.badgeBg}`}>
                            {agent.num} {agent.stage}
                          </span>
                          <Icon className="h-4 w-4 opacity-80" />
                        </div>
                        <h5 className="font-hand font-black text-sm mb-0.5 leading-tight">{agent.name}</h5>
                        <span className="font-mono text-[10px] text-zinc-600 block mb-2">{agent.subagentCode}</span>
                        
                        <div className="space-y-1 font-sans text-[10.5px] bg-white/85 p-2 rounded-lg border border-black/10">
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

              {/* Selected Subagent Drilldown Card */}
              {selectedSubagent && (
                <div className="bg-zinc-50 border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-zinc-200 gap-2">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-sky-700" />
                      <span className="font-hand font-bold text-sm text-zinc-900">
                        Detailed Automation Execution: Subagent #{selectedSubagent}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-bold">
                      Autonomous Trigger: Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                    <div className="bg-sky-50/70 border border-sky-200 rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-hand font-bold text-sky-950 text-sm">
                        <Building2 className="h-4 w-4 text-sky-700" />
                        <span>🏢 Managed-Service LCS Enterprise Automation:</span>
                      </div>
                      <p className="font-sans text-zinc-700 leading-relaxed">
                        {selectedSubagent === 1 && "Automates custom sales quote acceptance via DocuSign, capturing negotiated pricing tiers, 250+ seat minimums, 99.99% SLAs, and multi-year ramp terms."}
                        {selectedSubagent === 2 && "Automates corporate credit evaluation via Dun & Bradstreet API, parses customer Purchase Orders (PO), and enforces Deal Desk margin governance (>75%)."}
                        {selectedSubagent === 3 && "Spins up dedicated single-tenant AWS/GCP VPC infrastructure in under 15 seconds, synchronizes Okta SAML 2.0 / SCIM directory, and assigns enterprise RBAC roles."}
                        {selectedSubagent === 4 && "Generates Net 30/60 corporate invoice in NetSuite, sets automated ACH/Wire lockbox reconciliation webhooks, and amortizes dual ASC 606 revenue schedules."}
                        {selectedSubagent === 5 && "Manages mid-term co-termed expansion quotes, SKU swaps, and orchestrates 90/60/30-day proactive renewal sequences with contractual +7% price uplifts."}
                      </p>
                    </div>

                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-hand font-bold text-emerald-950 text-sm">
                        <Zap className="h-4 w-4 text-emerald-700" />
                        <span>⚡ Self-Serve PLG Customer Automation:</span>
                      </div>
                      <p className="font-sans text-zinc-700 leading-relaxed">
                        {selectedSubagent === 1 && "Powers the online self-serve pricing portal, dynamically calculating seat volume discounts (1-100 seats) and prepaid API consumption credit bundles with instant cart addition."}
                        {selectedSubagent === 2 && "Executes real-time cross-border geo-tax calculation (EU VAT reverse charge, US state sales tax) via Avalara/Stripe Tax and scores fraud risk via Stripe Radar."}
                        {selectedSubagent === 3 && "Executes zero-touch container provisioning: generates multi-tenant SaaS workspace in 15 seconds, issues instant developer API license keys, and enables base feature flags."}
                        {selectedSubagent === 4 && "Tokenizes 3D-Secure credit cards via Stripe, schedules automated monthly/annual recurring charges, and ingests live API consumption telemetry for usage drawdowns."}
                        {selectedSubagent === 5 && "Enables 1-click in-app plan swaps/downgrades and executes automated Smart Dunning retry logic for failed cards with a 14-day grace period before tenant suspension."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: 4 SPECIALIZED SWARM EXTENSION AGENTS */}
          {subagentViewMode === "extension_agents" && (
            <div className="space-y-4 pt-2">
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-3.5 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-indigo-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-hand font-bold text-sm text-indigo-950">
                    Specialized Extension Swarm Agents (Deep LCS Enterprise &amp; High-Volume PLG)
                  </h4>
                  <p className="font-sans text-xs text-indigo-900/80 mt-0.5 leading-relaxed">
                    Designed to handle extreme operational edge cases: multi-subsidiary enterprise procurement matching and high-throughput micro-tax gateway / smart dunning automation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LCS Extension 1 */}
                <div className="bg-white border-2 border-sky-300 rounded-xl p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-mono text-[10px] font-bold border border-sky-300">
                      LCS Enterprise Extension Agent
                    </span>
                    <Building2 className="h-4 w-4 text-sky-700" />
                  </div>
                  <h4 className="font-hand font-black text-base text-zinc-900">
                    Enterprise Deal Desk &amp; Legal Procurement Agent
                  </h4>
                  <span className="font-mono text-xs text-zinc-500 block">`agent.lcs_procurement`</span>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Autonomous legal redline auditor that compares buyer-requested terms against standard corporate guidelines, matches subsidiary Purchase Orders (PO), and generates 1-click Slack approval cards for VP signatures.
                  </p>
                  <div className="font-mono text-[10.5px] bg-zinc-50 p-2 rounded border border-zinc-200 text-zinc-800 space-y-1">
                    <div>✓ Automated PO-to-Quote Line Matching</div>
                    <div>✓ Non-Standard Legal Indemnity Auditing</div>
                    <div>✓ Multi-Entity Tax Residency Clearance</div>
                  </div>
                </div>

                {/* LCS Extension 2 */}
                <div className="bg-white border-2 border-purple-300 rounded-xl p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-mono text-[10px] font-bold border border-purple-300">
                      LCS Enterprise Extension Agent
                    </span>
                    <Cloud className="h-4 w-4 text-purple-700" />
                  </div>
                  <h4 className="font-hand font-black text-base text-zinc-900">
                    Dedicated Cloud VPC &amp; Mission-Critical SLA Agent
                  </h4>
                  <span className="font-mono text-xs text-zinc-500 block">`agent.lcs_sla_provisioning`</span>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Coordinates dedicated single-tenant VPC cluster isolation, provisions dedicated cloud compute nodes across AWS/GCP, configures 99.999% uptime telemetry monitors, and triggers white-glove TAM onboarding.
                  </p>
                  <div className="font-mono text-[10.5px] bg-zinc-50 p-2 rounded border border-zinc-200 text-zinc-800 space-y-1">
                    <div>✓ Single-Tenant Cloud VPC Cluster Isolation</div>
                    <div>✓ Automated 99.999% SLA Uptime Telemetry Setup</div>
                    <div>✓ Dedicated Customer Technical Account Manager (TAM) Handshake</div>
                  </div>
                </div>

                {/* PLG Extension 1 */}
                <div className="bg-white border-2 border-emerald-300 rounded-xl p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-300">
                      Self-Serve PLG Extension Agent
                    </span>
                    <Zap className="h-4 w-4 text-emerald-700" />
                  </div>
                  <h4 className="font-hand font-black text-base text-zinc-900">
                    Real-Time Checkout &amp; Micro-Tax Gateway Agent
                  </h4>
                  <span className="font-mono text-xs text-zinc-500 block">`agent.plg_checkout_tax`</span>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Eliminates checkout cart friction for self-serve users by computing real-time VAT/GST reverse charges across 190+ countries, executing instant 3D-Secure payment tokenization, and eliminating drop-off latency.
                  </p>
                  <div className="font-mono text-[10.5px] bg-zinc-50 p-2 rounded border border-zinc-200 text-zinc-800 space-y-1">
                    <div>✓ Sub-Second International VAT / GST Calculation</div>
                    <div>✓ Stripe 3D-Secure Frictionless Card Tokenization</div>
                    <div>✓ Instant PDF VAT Invoice &amp; Customer Receipt Delivery</div>
                  </div>
                </div>

                {/* PLG Extension 2 */}
                <div className="bg-white border-2 border-teal-300 rounded-xl p-4 space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-mono text-[10px] font-bold border border-teal-300">
                      Self-Serve PLG Extension Agent
                    </span>
                    <RefreshCw className="h-4 w-4 text-teal-700" />
                  </div>
                  <h4 className="font-hand font-black text-base text-zinc-900">
                    Autonomous Smart Dunning &amp; Retention Churn Guard Agent
                  </h4>
                  <span className="font-mono text-xs text-zinc-500 block">`agent.plg_retention_guard`</span>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    Monitors credit card decline error codes (insufficient funds vs expired), initiates optimized-hour card retries, applies a 14-day soft feature throttling grace period before suspension, and delivers 1-click retention discounts.
                  </p>
                  <div className="font-mono text-[10.5px] bg-zinc-50 p-2 rounded border border-zinc-200 text-zinc-800 space-y-1">
                    <div>✓ Machine-Timed Dunning Retries (Day 1, 3, 7, 14)</div>
                    <div>✓ Soft Feature Throttling Grace Period (Zero Abrupt Lockout)</div>
                    <div>✓ 1-Click Retention Plan Swap Offer (&lt;2% Involuntary Churn)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: LIVE EXECUTION TRACE */}
      {activeSubTab === "execution_trace" && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-dashed border-zinc-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-hand font-black text-xl text-ink flex items-center gap-2">
                <Terminal className="h-5 w-5 text-emerald-600" />
                <span>Live Execution Trace &amp; Reasoning Timeline</span>
              </h3>
              <p className="font-sans text-xs text-zinc-650 mt-1">
                Faithfully models the reasoning and tool execution trace from Attachment 3 across Input, Transitions, Actions, and Output Evaluation.
              </p>
            </div>
            
            {/* Trace Type Selector */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-lg border border-zinc-300 self-start sm:self-auto">
              <button
                onClick={() => setSelectedTraceType("enterprise_lcs")}
                className={`px-3 py-1 rounded-md font-hand text-xs font-bold transition-all cursor-pointer ${
                  selectedTraceType === "enterprise_lcs"
                    ? "bg-sky-700 text-white shadow-sm"
                    : "text-zinc-650 hover:bg-zinc-200"
                }`}
              >
                🏢 Trace A: LCS Enterprise ($480K Contract)
              </button>
              <button
                onClick={() => setSelectedTraceType("self_serve_plg")}
                className={`px-3 py-1 rounded-md font-hand text-xs font-bold transition-all cursor-pointer ${
                  selectedTraceType === "self_serve_plg"
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-zinc-650 hover:bg-zinc-200"
                }`}
              >
                ⚡ Trace B: Self-Serve PLG (25 Seats + EU VAT)
              </button>
            </div>
          </div>

          {/* Trace Steps Container */}
          <div className="bg-slate-900 border-3 border-ink rounded-2xl p-5 md:p-6 text-white font-mono text-xs shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-4">
            
            {/* TRACE A: MANAGED LCS ENTERPRISE */}
            {selectedTraceType === "enterprise_lcs" && (
              <>
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">Input (LCS Enterprise):</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 border border-slate-700">
                        💬 "Sales Rep Quote Acceptance: Acme Global Enterprise accepts custom quote for 500 SaaS Platform seats + 100K API credits with 3-year ramp and PO-8829."
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
                    <span className="text-indigo-300 ml-2">✦ Detected Managed-Service LCS Enterprise intent: Requires 3-year ramp schedule, PO validation, and dedicated VPC provisioning.</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 1 Action:</span>
                    <span className="text-sky-300 ml-2">⚡ Invoke `#1 subagent.capture_quoting`: Calculated 3-Year Ramp: Y1=250 seats ($246K), Y2=500 seats ($492K), Y3=500 seats ($492K). 99.99% SLA locked.</span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 2 Action:</span>
                    <span className="text-emerald-300 ml-2">⚡ Invoke `#2 subagent.validation_compliance`: D&amp;B Score = 88 (Tier 1, $1M line approved). PO-8829 matched to quote lines. Blended gross margin = 81.4% (Threshold &gt;75% auto-approved).</span>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 3 Action:</span>
                    <span className="text-purple-300 ml-2">⚡ Invoke `#3 subagent.fulfillment_iam`: Spun up dedicated AWS VPC cluster `vpc-acme-us-east`. Configured Okta SAML 2.0 / SCIM directory for 500 enterprise seats.</span>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 4 Action:</span>
                    <span className="text-amber-300 ml-2">⚡ Invoke `#4 subagent.billing_revenue`: Generated NetSuite Invoice #INV-9942 (Net 30 ACH / Wire). Configured automated ASC 606 revenue amortization schedule.</span>
                  </div>
                </div>

                {/* Step 8 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 5 Action:</span>
                    <span className="text-teal-300 ml-2">⚡ Invoke `#5 subagent.lifecycle_churn`: Scheduled proactive 90/60/30-day renewal orchestration event with contractual +7% price uplift cap.</span>
                  </div>
                </div>

                {/* Step 9 */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-bold">Output Evaluation (LCS Enterprise):</span>
                    <div className="bg-slate-800 p-2.5 rounded-lg border border-emerald-500/40 text-slate-200">
                      <span className="text-emerald-300 font-bold">🔍 GROUNDING SCORE: 1.0 (Enterprise Fulfillment Completed)</span>
                      <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                        Total QTC Turnaround: <strong>11.8 minutes</strong> (down from 8 days). PO-8829 locked, Net 30 ACH invoice active, 500 Okta seats provisioned, and dedicated VPC active.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TRACE B: SELF-SERVE PLG */}
            {selectedTraceType === "self_serve_plg" && (
              <>
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">Input (Self-Serve PLG):</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-200 border border-slate-700">
                        💬 "Self-Serve Checkout: Developer buyer in Berlin, Germany configures 25 Pro seats ($99/seat) + 20K API credits via online portal."
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
                    <span className="text-indigo-300 ml-2">✦ Detected Self-Serve PLG intent: Requires automated EU VAT reverse charge calculation, Stripe card tokenization, and 15-second instant container provisioning.</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 1 Action:</span>
                    <span className="text-sky-300 ml-2">⚡ Invoke `#1 subagent.capture_quoting`: Computed dynamic pricing: 25 seats @ $99/mo = $2,475/mo + $1,600 API bundle. Self-serve cart created.</span>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 2 Action:</span>
                    <span className="text-emerald-300 ml-2">⚡ Invoke `#2 subagent.validation_compliance`: Geo-located buyer in Germany (DE). Applied EU VAT reverse charge (20% verified via VIES). Stripe Radar fraud score: 2 (Safe).</span>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 3 Action:</span>
                    <span className="text-purple-300 ml-2">⚡ Invoke `#3 subagent.fulfillment_iam`: Zero-Touch Cloud Execution: Spun up multi-tenant workspace `ws_berlin_dev_44` in 14.2 seconds. Dispatched API license keys to buyer.</span>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 4 Action:</span>
                    <span className="text-amber-300 ml-2">⚡ Invoke `#4 subagent.billing_revenue`: Executed 3D-Secure Stripe card charge ($4,075). Configured monthly auto-charge and live telemetry drawdown webhook.</span>
                  </div>
                </div>

                {/* Step 8 */}
                <div className="flex items-start gap-3 pl-2 border-l-2 border-slate-700 ml-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div>
                    <span className="text-emerald-400 font-bold">Stage 5 Action:</span>
                    <span className="text-teal-300 ml-2">⚡ Invoke `#5 subagent.lifecycle_churn`: Activated Smart Dunning Churn Guard (`agent.plg_retention_guard`) with 4-phase retry schedule and 14-day soft grace period.</span>
                  </div>
                </div>

                {/* Step 9 */}
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 text-sm">
                    ✓
                  </span>
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-bold">Output Evaluation (Self-Serve PLG):</span>
                    <div className="bg-slate-800 p-2.5 rounded-lg border border-emerald-500/40 text-slate-200">
                      <span className="text-emerald-300 font-bold">🔍 GROUNDING SCORE: 1.0 (Zero-Touch Self-Serve Provisioned)</span>
                      <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
                        Total Checkout &amp; Provisioning Time: <strong>14.2 seconds</strong>. Customer has live workspace, instant API key, automated receipt, and active dunning protection.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

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
              
              {/* Customer Track Selector */}
              <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-2">
                <span className="text-[11px] font-bold text-zinc-700 block uppercase tracking-wider font-mono">
                  Select Customer Profile:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSandboxCustomerType("enterprise_lcs");
                      resetSandbox();
                    }}
                    className={`p-2 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      sandboxCustomerType === "enterprise_lcs"
                        ? "bg-sky-50 border-sky-600 text-sky-950 shadow-sm"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5 text-sky-700" />
                    <span>🏢 Managed LCS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSandboxCustomerType("self_serve_plg");
                      resetSandbox();
                    }}
                    className={`p-2 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      sandboxCustomerType === "self_serve_plg"
                        ? "bg-emerald-50 border-emerald-600 text-emerald-950 shadow-sm"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5 text-emerald-700" />
                    <span>⚡ Self-Serve PLG</span>
                  </button>
                </div>
              </div>

              {/* ENTERPRISE LCS CONTROLS */}
              {sandboxCustomerType === "enterprise_lcs" && (
                <div className="space-y-3 animate-fade-in">
                  {/* Slider: Subscription Seats */}
                  <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-zinc-700 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-sky-600" />
                        Enterprise Seats (Annual)
                      </span>
                      <span className="font-mono text-sky-700 text-sm">{activeSeats} Seats</span>
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
                      <span>50 (Growth)</span>
                      <span>500 (Enterprise)</span>
                      <span>2,000 (Strategic)</span>
                    </div>
                  </div>

                  {/* Slider: Consumption Credits */}
                  <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-zinc-700 flex items-center gap-1.5">
                        <Database className="h-3.5 w-3.5 text-emerald-600" />
                        API Consumption Pool
                      </span>
                      <span className="font-mono text-emerald-700 text-sm">{consumptionCredits.toLocaleString()} Calls</span>
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
                  </div>

                  {/* Multi-Year Ramp & Governance */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">Ramp Term</span>
                      <select
                        value={rampYears}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setRampYears(Number(e.target.value))}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                      >
                        <option value={1}>1-Year Annual</option>
                        <option value={2}>2-Year Ramp</option>
                        <option value={3}>3-Year Multi-Year</option>
                        <option value={5}>5-Year Strategic</option>
                      </select>
                    </div>

                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">SLA Commitment</span>
                      <select
                        value={slaTier}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setSlaTier(e.target.value)}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                      >
                        <option value="99.99% Mission Critical">99.99% Mission Critical</option>
                        <option value="99.9% Standard Enterprise">99.9% Standard Enterprise</option>
                        <option value="99.999% Zero-Downtime Dedicated">99.999% Dedicated VPC</option>
                      </select>
                    </div>
                  </div>

                  {/* Payment Terms & PO */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">Payment Terms</span>
                      <select
                        value={paymentTerms}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                      >
                        <option value="Net 30 via ACH / Wire">Net 30 (ACH / Wire)</option>
                        <option value="Net 60 Corporate Procurement">Net 60 Procurement</option>
                        <option value="Prepaid Annual ACH">Prepaid Annual ACH</option>
                      </select>
                    </div>

                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">Purchase Order (PO)</span>
                      <input
                        type="text"
                        value={poNumber}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setPoNumber(e.target.value)}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50 text-zinc-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SELF-SERVE PLG CONTROLS */}
              {sandboxCustomerType === "self_serve_plg" && (
                <div className="space-y-3 animate-fade-in">
                  {/* Slider: Self-Serve Seats */}
                  <div className="bg-white border-2 border-zinc-300 rounded-xl p-3 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-zinc-700 flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-emerald-600" />
                        Self-Serve Seats (Online Portal)
                      </span>
                      <span className="font-mono text-emerald-700 text-sm">{activeSeats} Seats</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={selfServeSeats}
                      disabled={sandboxStatus === "running"}
                      onChange={(e) => setSelfServeSeats(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>5 Seats</span>
                      <span>25 Seats (Team)</span>
                      <span>100 Seats (Max Self-Serve)</span>
                    </div>
                  </div>

                  {/* Plan Tier & Tax Jurisdiction */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">Plan Tier</span>
                      <select
                        value={selfServePlan}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setSelfServePlan(e.target.value)}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                      >
                        <option value="Pro Tier ($99/mo/seat)">Pro ($99/mo)</option>
                        <option value="Scale Tier ($149/mo/seat)">Scale ($149/mo)</option>
                        <option value="Starter Tier ($49/mo/seat)">Starter ($49/mo)</option>
                      </select>
                    </div>

                    <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                      <span className="text-[10.5px] font-bold text-zinc-700 block">Tax Jurisdiction</span>
                      <select
                        value={taxJurisdiction}
                        disabled={sandboxStatus === "running"}
                        onChange={(e) => setTaxJurisdiction(e.target.value)}
                        className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                      >
                        <option value="EU VAT (20% Reverse Charge)">EU VAT (20%)</option>
                        <option value="UK VAT (20% Standard)">UK VAT (20%)</option>
                        <option value="US California (8.25% Sales Tax)">US CA (8.25%)</option>
                        <option value="Tax Exempt (B2B Certified)">Tax Exempt (B2B)</option>
                      </select>
                    </div>
                  </div>

                  {/* Card Type & Tokenization */}
                  <div className="bg-white border-2 border-zinc-300 rounded-xl p-2.5 space-y-1">
                    <span className="text-[10.5px] font-bold text-zinc-700 block">Instant Payment Rail</span>
                    <select
                      value={cardType}
                      disabled={sandboxStatus === "running"}
                      onChange={(e) => setCardType(e.target.value)}
                      className="w-full border border-zinc-300 rounded p-1 font-mono text-xs font-bold bg-zinc-50"
                    >
                      <option value="Stripe Corporate Visa (Ending 4242)">Stripe Corporate Visa (••4242)</option>
                      <option value="Stripe Mastercard Business (Ending 8819)">Mastercard Business (••8819)</option>
                      <option value="American Express Corporate (Ending 3005)">AMEX Corporate (••3005)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* INTERACTIVE LIFECYCLE EVENT TRIGGERS */}
              <div className="bg-zinc-100 border-2 border-zinc-300 rounded-xl p-3 space-y-2">
                <span className="text-[11px] font-bold text-zinc-800 block uppercase tracking-wider font-mono">
                  Simulate Mid-Cycle Lifecycle Events:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-hand">
                  <button
                    type="button"
                    onClick={() => {
                      setLifecycleAction("co_term_expansion");
                      runSandbox();
                    }}
                    disabled={sandboxStatus === "running"}
                    className={`p-1.5 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                      lifecycleAction === "co_term_expansion"
                        ? "bg-sky-600 text-white border-sky-800"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    + Co-Term Add-on (+Seats)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLifecycleAction("plan_downgrade");
                      runSandbox();
                    }}
                    disabled={sandboxStatus === "running"}
                    className={`p-1.5 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                      lifecycleAction === "plan_downgrade"
                        ? "bg-amber-600 text-white border-amber-800"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    🔄 SKU Tier Swap
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLifecycleAction("renewal_uplift");
                      runSandbox();
                    }}
                    disabled={sandboxStatus === "running"}
                    className={`p-1.5 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                      lifecycleAction === "renewal_uplift"
                        ? "bg-emerald-600 text-white border-emerald-800"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    📅 90-Day Renewal (+7%)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLifecycleAction("dunning_failed");
                      runSandbox();
                    }}
                    disabled={sandboxStatus === "running"}
                    className={`p-1.5 rounded-lg border font-bold text-center cursor-pointer transition-all ${
                      lifecycleAction === "dunning_failed"
                        ? "bg-red-600 text-white border-red-800"
                        : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    ⚠️ Smart Dunning Failed Card
                  </button>
                </div>
              </div>

              {/* Live Contract Value Preview */}
              <div className="bg-sky-50 border-2 border-sky-300 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-900 block">
                  Calculated Commercial Economics
                </span>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-700 font-bold">Annual Contract Value (ACV):</span>
                  <span className="font-mono font-black text-base text-sky-950">${Math.round(totalACV).toLocaleString()}</span>
                </div>
                {sandboxCustomerType === "enterprise_lcs" ? (
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-700 font-bold">Total Contract Value (TCV, {rampYears}yr):</span>
                    <span className="font-mono font-black text-sm text-emerald-800">${Math.round(totalTCV).toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-zinc-700 font-bold">Estimated Geo-Tax:</span>
                    <span className="font-mono font-black text-xs text-zinc-700">${Math.round(calculatedTax).toLocaleString()} ({taxJurisdiction})</span>
                  </div>
                )}
              </div>

              {/* Trigger Button */}
              {sandboxStatus === "idle" && (
                <button
                  onClick={runSandbox}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-hand text-base font-black border-2 border-ink shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Execute Autonomous 5-Stage Orchestration</span>
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
                  <span>
                    {sandboxCustomerType === "enterprise_lcs" ? "Enterprise Contract Executed & Dedicated VPC Live!" : "Self-Serve Cart Checked Out & Workspace Live (14s)!"}
                  </span>
                </div>
              )}
            </div>

            {/* Right Simulation Execution Console (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border-3 border-ink rounded-xl p-4 text-white font-mono text-xs space-y-3 shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-300 font-bold">5-Stage Subagent Autonomous Execution Console</span>
                  </div>
                  <span className="text-slate-400 text-[10px]">
                    Track: {sandboxCustomerType === "enterprise_lcs" ? "🏢 Managed LCS" : "⚡ Self-Serve PLG"}
                  </span>
                </div>

                {sandboxStatus === "idle" && (
                  <div className="text-slate-400 py-12 text-center space-y-2">
                    <Sliders className="h-8 w-8 mx-auto opacity-40" />
                    <p>Adjust parameters or click a Lifecycle Event to inspect live subagent transitions across all 5 stages.</p>
                  </div>
                )}

                {sandboxStatus !== "idle" && (
                  <div className="space-y-2.5">
                    {/* Stage 0 / Router */}
                    {sandboxStep >= 1 && (
                      <div className="flex items-start gap-2 text-sky-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [ROUTER]</span>
                        <span>
                          {sandboxCustomerType === "enterprise_lcs"
                            ? `Ingested LCS Enterprise intent for ${activeSeats} seats, ${rampYears}yr ramp, PO ${poNumber}. Routing to Stage 1.`
                            : `Ingested Self-Serve checkout cart for ${activeSeats} seats on ${selfServePlan} in ${taxJurisdiction}. Routing to Stage 1.`}
                        </span>
                      </div>
                    )}

                    {/* Stage 1: Order Capture & Quoting */}
                    {sandboxStep >= 2 && (
                      <div className="flex items-start gap-2 text-indigo-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [STAGE 1: subagent.capture_quoting]</span>
                        <span>
                          {sandboxCustomerType === "enterprise_lcs"
                            ? `Computed negotiated ramp economics: ACV $${Math.round(totalACV).toLocaleString()} (TCV $${Math.round(totalTCV).toLocaleString()}). Locked ${slaTier} SLA term.`
                            : `Calculated transparent tier pricing: $${Math.round(totalACV / 12).toLocaleString()}/mo. Validated minimum seat threshold.`}
                        </span>
                      </div>
                    )}

                    {/* Stage 2: Validation & Compliance */}
                    {sandboxStep >= 3 && (
                      <div className="flex items-start gap-2 text-emerald-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [STAGE 2: subagent.validation_compliance]</span>
                        <span>
                          {sandboxCustomerType === "enterprise_lcs"
                            ? `D&B corporate credit score = 88 (Tier 1). PO ${poNumber} matched to contract lines. Deal Desk gross margin = 81.4% (Auto-Approved).`
                            : `Real-time geo-tax computed ($${Math.round(calculatedTax).toLocaleString()}). Stripe Radar anti-fraud score = 2 (Low Risk / Passed).`}
                        </span>
                      </div>
                    )}

                    {/* Stage 3: Fulfillment & IAM Provisioning */}
                    {sandboxStep >= 4 && (
                      <div className="flex items-start gap-2 text-purple-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [STAGE 3: subagent.fulfillment_iam]</span>
                        <span>
                          {sandboxCustomerType === "enterprise_lcs"
                            ? `Spun up dedicated single-tenant AWS VPC cluster \`vpc_corp_acme_prod\`. Synced Okta SCIM directory for ${activeSeats} seats.`
                            : `Zero-Touch Cloud Sandbox: Deployed multi-tenant workspace \`ws_dev_plg_77\` in 14.6s. Generated developer API license key.`}
                        </span>
                      </div>
                    )}

                    {/* Stage 4: Billing & Recurring Rev */}
                    {sandboxStep >= 5 && (
                      <div className="flex items-start gap-2 text-amber-300 animate-fade-in">
                        <span className="text-emerald-400">✓ [STAGE 4: subagent.billing_revenue]</span>
                        <span>
                          {sandboxCustomerType === "enterprise_lcs"
                            ? `Dispatched NetSuite Invoice #INV-8831 (${paymentTerms}). Configured automated ASC 606 revenue amortization schedules.`
                            : `Tokenized ${cardType}. Activated monthly recurring auto-charge ($${Math.round(totalACV / 12).toLocaleString()}/mo) & live metering telemetry.`}
                        </span>
                      </div>
                    )}

                    {/* Stage 5: Lifecycle & Churn Guard */}
                    {sandboxStep >= 6 && (
                      <div className="flex items-start gap-2 text-teal-300 animate-fade-in bg-slate-800 p-2 rounded border border-teal-500/30">
                        <span className="text-emerald-400">⚡ [STAGE 5: subagent.lifecycle_churn]</span>
                        <span>
                          {lifecycleAction === "co_term_expansion" && "Processed co-termed mid-cycle add-on quote (+seats co-termed to primary contract end-date)."}
                          {lifecycleAction === "plan_downgrade" && "Managed SKU tier swap: adjusted feature entitlement flags without data loss."}
                          {lifecycleAction === "renewal_uplift" && "Scheduled proactive 90-day renewal orchestration event with contractual +7% price uplift cap."}
                          {lifecycleAction === "dunning_failed" && "Armed Smart Dunning: scheduled 4-phase card retries (Day 1, 3, 7, 14) + soft feature throttling grace period."}
                          {lifecycleAction === "none" && (sandboxCustomerType === "enterprise_lcs" ? "Orchestrated 90/60/30-day proactive contract renewal sequence & co-terming rules." : "Armed Smart Dunning Churn Guard & enabled 1-click self-service tier swaps.")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {sandboxStatus === "completed" && (
                <div className="bg-slate-800/80 p-2.5 rounded border border-emerald-400/40 text-[11px] text-slate-200 mt-2">
                  <span className="text-emerald-400 font-bold">Execution Result:</span>
                  <p className="mt-0.5 text-slate-300">
                    {sandboxCustomerType === "enterprise_lcs"
                      ? "Enterprise QTC Turnaround: 11.8 minutes (vs. legacy 8 days manual). Full ASC 606 Rev-Rec compliance & dedicated cloud tenant live."
                      : "Self-Serve Turnaround: 14.6 seconds. Zero-touch credit card processing, automated VAT invoicing, and instant multi-tenant workspace."}
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
