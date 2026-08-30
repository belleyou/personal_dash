/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Bot,
  Workflow,
  Check,
  TrendingUp,
  Database,
  Target,
  ArrowRight,
  ShieldCheck,
  Clock,
  BarChart3,
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
  DollarSign,
  Calendar,
  MessageSquare,
  FileText,
  AlertTriangle,
  Flame,
  Zap,
  HelpCircle
} from "lucide-react";

interface GongRevenueIntelligenceAgentProps {
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
}

export const GongRevenueIntelligenceAgent: React.FC<GongRevenueIntelligenceAgentProps> = ({
  onCopyLink,
  copiedLabel
}) => {
  const [activeTab, setActiveTab] = useState<"star_summary" | "three_streams" | "governance_simulator" | "pm_execution" | "kpi_matrix">("star_summary");
  const [activeStream, setActiveStream] = useState<"stream_a" | "stream_b" | "stream_c">("stream_b");

  // Simulator State for Rubric 1 (MEDDIC)
  const [meddicFieldStatus, setMeddicFieldStatus] = useState<"blank" | "populated">("blank");
  const [evidenceClarity, setEvidenceClarity] = useState<number>(40); // 40, 20, 5
  const [sourceAuthority, setSourceAuthority] = useState<number>(25); // 25, 20, 8, 0
  const [corroboration, setCorroboration] = useState<number>(20); // 20, 5, 0 (hard block)
  const [recency, setRecency] = useState<number>(15); // 15, 8

  // Simulator State for Rubric 2 (Task / Next Step)
  const [taskCommitmentLang, setTaskCommitmentLang] = useState<number>(35); // 35, 18, 5
  const [taskOwnerClarity, setTaskOwnerClarity] = useState<number>(25); // 25, 10, 0
  const [taskDueDateClarity, setTaskDueDateClarity] = useState<number>(20); // 20, 14, 0
  const [taskDuplicateCheck, setTaskDuplicateCheck] = useState<number>(20); // 20, 0 (hard block)

  // Calculations for MEDDIC Scorer
  const meddicScore = corroboration === 0 ? 0 : evidenceClarity + sourceAuthority + corroboration + recency;
  let meddicAction: { tier: string; badge: string; color: string; desc: string };
  if (meddicFieldStatus === "populated") {
    meddicAction = {
      tier: "Human-in-the-Loop Always",
      badge: "Pending AE Approval in Slack (No Auto-Overwrite)",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      desc: "Governance Boundary: Existing human entries are NEVER overwritten automatically. If score ≥90 with contradiction, it surfaces as a high-priority suggested edit with 1-click confirm."
    };
  } else if (corroboration === 0) {
    meddicAction = {
      tier: "Hard Blocked (Conflict)",
      badge: "Held for Human Review",
      color: "bg-rose-100 text-rose-900 border-rose-300",
      desc: "Conflicts with recent human edits within 14 days. Auto-write is hard-blocked."
    };
  } else if (meddicScore >= 85) {
    meddicAction = {
      tier: "Tier 1: Auto-Write (≥85)",
      badge: "Auto-Write to Salesforce + Slack FYI + Notion Log",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      desc: "High confidence and verified blank field. Writes to Salesforce custom MEDDIC field with undo window, notifies Slack, and appends to Notion."
    };
  } else if (meddicScore >= 60) {
    meddicAction = {
      tier: "Tier 2: Human-in-Loop (60–84)",
      badge: "Slack Approval Card (Approve / Edit / Ignore)",
      color: "bg-sky-100 text-sky-900 border-sky-300",
      desc: "Moderate confidence. Pushed to AE Slack DM with interactive buttons. Salesforce write occurs only upon explicit click."
    };
  } else {
    meddicAction = {
      tier: "Tier 3: Discard (<60)",
      badge: "Discarded • Notion Audit Log Only",
      color: "bg-zinc-100 text-zinc-700 border-zinc-300",
      desc: "Low confidence extraction. Suppressed from Slack to avoid notification fatigue; logged to Notion for auditability only."
    };
  }

  // Calculations for Task Scorer
  const taskScore = taskDuplicateCheck === 0 ? 0 : taskCommitmentLang + taskOwnerClarity + taskDueDateClarity + taskDuplicateCheck;
  let taskAction: { tier: string; badge: string; color: string; desc: string };
  if (taskDuplicateCheck === 0) {
    taskAction = {
      tier: "Hard Blocked (Possible Duplicate)",
      badge: "Human Approval Card in Slack",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      desc: "SOQL check found a matching open task on this Opportunity. Auto-creation blocked to prevent duplication."
    };
  } else if (taskDueDateClarity === 0) {
    taskAction = {
      tier: "Missing Date (Human Gate)",
      badge: "Slack Card with Date Picker",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      desc: "Action item has high commitment but no explicit date. AE must set date in Slack before task creation."
    };
  } else if (taskScore >= 80) {
    taskAction = {
      tier: "Tier 1: Auto-Create (≥80)",
      badge: "Auto-Create SFDC Task + Slack FYI + Undo Window",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      desc: "Explicit commitment, owner, and resolvable date. Salesforce Task created immediately with citation-linked description."
    };
  } else if (taskScore >= 50) {
    taskAction = {
      tier: "Tier 2: Human-in-Loop (50–79)",
      badge: "Slack Approval Interactive Card",
      color: "bg-sky-100 text-sky-900 border-sky-300",
      desc: "Held in n8n pending state. Clicking Approve creates the Task; Edit allows modifying fields; Ignore logs dismissal in Notion."
    };
  } else {
    taskAction = {
      tier: "Tier 3: Discard (<50)",
      badge: "Discarded • Notion Log Only",
      color: "bg-zinc-100 text-zinc-700 border-zinc-300",
      desc: "Vague or implied action item. Logged in Notion for audit trail without cluttering AE task queues."
    };
  }

  const handleCopy = () => {
    const link = `${window.location.origin}/#projects?tab=gong_revenue_agent`;
    if (onCopyLink) {
      onCopyLink(link, "Link to gong_revenue_agent");
    } else {
      navigator.clipboard.writeText(link);
    }
  };

  return (
    <div className="bg-white border-3 border-ink rounded-2xl p-4 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-3 border-ink pb-5 gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 border-2 border-violet-300 text-violet-900 font-hand text-xs font-bold leading-none rotate-[-1deg]">
              <Sparkles className="h-3.5 w-3.5 text-violet-700 animate-pulse" />
              Consolidated Revenue Intelligence Agent
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-zinc-100 border border-zinc-300 font-mono text-[11px] font-bold text-zinc-700">
              Category 18 · SA-03 + SA-07 + SA-09
            </span>
          </div>
          <h2 className="font-hand text-2xl sm:text-3xl md:text-4xl font-black text-ink flex items-center gap-2.5 flex-wrap">
            <Bot className="h-7 w-7 sm:h-8 sm:w-8 text-violet-700 shrink-0" />
            <span>Gong Revenue Intelligence Agent</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-650 mt-1 max-w-3xl">
            Pre-call prep, post-call MEDDIC & Task delta-sync, and scheduled forecast consistency checking unified on a single Gong → Claude → n8n → Salesforce spine.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-violet-50 hover:bg-violet-100 text-violet-900 border-2 border-violet-300 rounded-xl font-hand text-xs sm:text-sm font-bold transition-all shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer"
          >
            {copiedLabel === "Link to gong_revenue_agent" ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <LinkIcon className="h-3.5 w-3.5 text-violet-700 shrink-0" />
                <span>Share Case Study</span>
              </>
            )}
          </button>
          <div className="flex flex-wrap gap-1.5">
            {["Gong", "Salesforce", "Claude", "n8n", "Slack", "Notion"].map((tool, idx) => (
              <span key={idx} className="px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-md">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-zinc-200 pb-3">
        <button
          onClick={() => setActiveTab("star_summary")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
            activeTab === "star_summary"
              ? "bg-violet-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>1. STAR Overview & Architecture</span>
        </button>
        <button
          onClick={() => setActiveTab("three_streams")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
            activeTab === "three_streams"
              ? "bg-violet-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
          }`}
        >
          <Workflow className="h-4 w-4" />
          <span>2. Three Streams on One Spine</span>
        </button>
        <button
          onClick={() => setActiveTab("governance_simulator")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
            activeTab === "governance_simulator"
              ? "bg-violet-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
          }`}
        >
          <Sliders className="h-4 w-4" />
          <span>3. Scorer & Governance Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab("pm_execution")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
            activeTab === "pm_execution"
              ? "bg-violet-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>4. PM Role & UAT Validation</span>
        </button>
        <button
          onClick={() => setActiveTab("kpi_matrix")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-hand text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
            activeTab === "kpi_matrix"
              ? "bg-violet-600 text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-zinc-100 text-zinc-600 border-transparent hover:bg-zinc-200"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>5. RevOps KPI Impact Matrix</span>
        </button>
      </div>

      {/* TAB 1: STAR SUMMARY */}
      {activeTab === "star_summary" && (
        <div className="space-y-8 animate-fade-in">
          {/* Executive Highlight Banner */}
          <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="font-mono text-[11px] font-bold text-violet-800 uppercase tracking-widest block mb-1">
                  Architecture Consolidation Thesis
                </span>
                <h3 className="font-hand text-xl sm:text-2xl font-black text-ink mb-2">
                  Deduplicating 4 Workflows into 3 Connected Streams
                </h3>
                <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-3xl">
                  Standardized on <strong>Gong</strong> as the single conversation evidence source to collapse meeting prep (SA-03), transcript extraction/MEDDIC sync (SA-07), and forecast checks (SA-09). Avoids re-parsing transcripts 3 times by streaming structured extraction into a single durable spine.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
                <div className="bg-white border-2 border-ink rounded-xl p-3 text-center shadow-sm">
                  <div className="font-sans font-black text-lg sm:text-xl text-violet-700">86%</div>
                  <div className="font-mono text-[10px] text-zinc-600 uppercase">MEDDIC Fill (from 38%)</div>
                </div>
                <div className="bg-white border-2 border-ink rounded-xl p-3 text-center shadow-sm">
                  <div className="font-sans font-black text-lg sm:text-xl text-emerald-600">91%</div>
                  <div className="font-mono text-[10px] text-zinc-600 uppercase">Next Step Freshness</div>
                </div>
                <div className="bg-white border-2 border-ink rounded-xl p-3 text-center shadow-sm">
                  <div className="font-sans font-black text-lg sm:text-xl text-sky-600">-17 min</div>
                  <div className="font-mono text-[10px] text-zinc-600 uppercase">AE Admin / Call</div>
                </div>
                <div className="bg-white border-2 border-ink rounded-xl p-3 text-center shadow-sm">
                  <div className="font-sans font-black text-lg sm:text-xl text-rose-600">0</div>
                  <div className="font-mono text-[10px] text-zinc-600 uppercase">Unreviewed Overwrites</div>
                </div>
              </div>
            </div>
          </div>

          {/* STAR Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Situation */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-red-100 text-red-800 border-2 border-red-300 rounded-lg font-mono text-xs font-black uppercase">
                    S — Situation
                  </span>
                  <span className="font-hand text-base font-bold text-ink">3 Symptoms, 1 Shared Root Cause</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>Pre-Call Blindness:</strong> Account context is scattered across Salesforce fields and past recordings; AEs enter calls without structured account/MEDDIC summaries.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>Post-Call Admin Drag:</strong> Reps manually transcribe Gong conversations into Salesforce MEDDIC custom fields and open tasks, leading to low completion (38%) and stale next steps (54%).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                    <span><strong>Forecast Disconnect:</strong> Verbal buyer signals captured in Gong ("pushing to Q2", "budget frozen") never sync to Stage or Forecast Category, forcing managers to re-litigate deals live on forecast calls.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                <span className="font-mono text-[10px] text-zinc-500">Root Cause: CRM updates depend on manual AE re-entry of conversations already recorded verbatim by Gong.</span>
              </div>
            </div>

            {/* Task */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 border-2 border-blue-300 rounded-lg font-mono text-xs font-black uppercase">
                    T — Task
                  </span>
                  <span className="font-hand text-base font-bold text-ink">1 Unified Agent & 3 Connected Streams</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span><strong>Stream A (Pre-Call Brief):</strong> Deliver 1-screen Slack prep digests combining Salesforce account/opp state and Gong call histories.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span><strong>Stream B (Post-Call MEDDIC & Task Sync):</strong> Extract MEDDIC deltas and action items from Gong transcripts with deterministic confidence scoring and human approval gates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span><strong>Stream C (Scheduled Forecast Checks):</strong> Cross-reference Salesforce forecast stages against extracted Gong buyer claims and flag hard/soft mismatches.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span><strong>Durable Notion Spine:</strong> Log all events to a searchable Deal Intelligence database so leadership can audit "what we knew and when" 6 weeks out.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                <span className="font-mono text-[10px] text-zinc-500">Scope Discipline: Standardized on Gong + Salesforce + Claude + n8n + Slack + Notion. Excluded Otter.ai, MuleSoft, Zapier, Highspot.</span>
              </div>
            </div>

            {/* Action */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 border-2 border-amber-300 rounded-lg font-mono text-xs font-black uppercase">
                    A — Action
                  </span>
                  <span className="font-hand text-base font-bold text-ink">Deterministic Governance & Orchestration</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span><strong>n8n Event Orchestration:</strong> Configured 3 entry points (Gong webhook, Slack slash command / calendar, and scheduled Monday AM cron jobs).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span><strong>Structured Claude Extraction:</strong> Outputs categorical facts, speaker roles, and verbatim transcript citations without self-rated confidence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span><strong>Deterministic Confidence Scorer Node:</strong> Separate n8n Code node applies weighted rubrics (Evidence clarity, Authority, Corroboration, Recency) to gate CRM writes.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                    <span><strong>Delta-Write Only & Zero Overwrite:</strong> Hard rule preventing AI from replacing human-entered fields. Stage and Forecast Category are strictly human-owned.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                <span className="font-mono text-[10px] text-zinc-500">Engineering Rigor: Date math resolved deterministically in n8n; SOQL open task duplicate checks execute prior to scoring.</span>
              </div>
            </div>

            {/* Result */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border-2 border-emerald-300 rounded-lg font-mono text-xs font-black uppercase">
                    R — Result
                  </span>
                  <span className="font-hand text-base font-bold text-ink">Quantifiable Operational Impact</span>
                </div>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span><strong>MEDDIC Field Completion:</strong> Accelerated from 38% baseline to 86% across open opportunities without manual AE rep typing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span><strong>Next Step Freshness:</strong> Improved from 54% to 91% (updated within 7 days) via automatic Task creation and Slack approval cards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span><strong>AE Time Reclaimed:</strong> Modeled 17 minutes saved per call in CRM administrative overhead and manual logging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span><strong>Manager Forecast Efficiency:</strong> Forecast review prep reduced by 40% with pre-flagged mismatches citing exact Gong moments.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-dashed border-zinc-200">
                <span className="font-mono text-[10px] text-zinc-500">Auditability: Full transcript citations logged in Salesforce Chatter and Notion Deal Intelligence database.</span>
              </div>
            </div>
          </div>

          {/* Architecture Visual Spine */}
          <div className="bg-zinc-900 text-white border-3 border-ink rounded-2xl p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)]">
            <h4 className="font-hand text-xl font-bold text-violet-300 mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-violet-400" />
              Unified 3-Stream Architecture Spine
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
              <div className="bg-zinc-800/90 border border-zinc-700 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-violet-400 font-bold uppercase mb-1">1. Triggers</div>
                <div className="font-bold text-zinc-100">Gong Webhook / Cron / Slack</div>
                <p className="text-zinc-400 mt-1 text-[11px]">Calendar event, Gong transcript-ready webhook, Monday AM forecast cron</p>
              </div>
              <div className="bg-zinc-800/90 border border-zinc-700 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-sky-400 font-bold uppercase mb-1">2. Data Fetch</div>
                <div className="font-bold text-zinc-100">Salesforce & Gong APIs</div>
                <p className="text-zinc-400 mt-1 text-[11px]">Parallel pull: Opp MEDDIC state, Open Tasks, Gong transcript & tracker signals</p>
              </div>
              <div className="bg-zinc-800/90 border border-zinc-700 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-amber-400 font-bold uppercase mb-1">3. Synthesis</div>
                <div className="font-bold text-zinc-100">Claude Structured Output</div>
                <p className="text-zinc-400 mt-1 text-[11px]">Extracts MEDDIC deltas, next steps, risk flags & citations (no self-scored confidence)</p>
              </div>
              <div className="bg-zinc-800/90 border border-zinc-700 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-rose-400 font-bold uppercase mb-1">4. Governance Gate</div>
                <div className="font-bold text-zinc-100">n8n Confidence Scorer</div>
                <p className="text-zinc-400 mt-1 text-[11px]">Weighted rubrics, SOQL dedupe, delta-write check, and approval routing switch</p>
              </div>
              <div className="bg-zinc-800/90 border border-zinc-700 p-3 rounded-xl">
                <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase mb-1">5. Multi-Output</div>
                <div className="font-bold text-zinc-100">SFDC + Slack + Notion</div>
                <p className="text-zinc-400 mt-1 text-[11px]">Delta-write to CRM, human review card in Slack, permanent log in Notion database</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: THREE STREAMS DETAILED BREAKDOWN */}
      {activeTab === "three_streams" && (
        <div className="space-y-6 animate-fade-in">
          {/* Stream Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStream("stream_a")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-hand text-sm font-bold border-2 transition-all cursor-pointer ${
                activeStream === "stream_a"
                  ? "bg-sky-100 text-sky-950 border-sky-600 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] font-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200"
              }`}
            >
              <Calendar className="h-4 w-4 text-sky-600" />
              <span>Stream A: Pre-Call Brief</span>
            </button>
            <button
              onClick={() => setActiveStream("stream_b")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-hand text-sm font-bold border-2 transition-all cursor-pointer ${
                activeStream === "stream_b"
                  ? "bg-violet-100 text-violet-950 border-violet-600 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] font-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200"
              }`}
            >
              <Workflow className="h-4 w-4 text-violet-600" />
              <span>Stream B: Post-Call MEDDIC & Task Sync (Core Spine)</span>
            </button>
            <button
              onClick={() => setActiveStream("stream_c")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-hand text-sm font-bold border-2 transition-all cursor-pointer ${
                activeStream === "stream_c"
                  ? "bg-amber-100 text-amber-950 border-amber-600 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] font-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200"
              }`}
            >
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span>Stream C: Scheduled Forecast-Integrity Check</span>
            </button>
          </div>

          {/* STREAM A DETAILS */}
          {activeStream === "stream_a" && (
            <div className="bg-sky-50/50 border-3 border-sky-300 rounded-2xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-sky-200 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-sky-700 uppercase tracking-wider block">Context Delivery Stream</span>
                  <h3 className="font-hand text-2xl font-black text-ink">Stream A — Pre-Call Brief</h3>
                </div>
                <span className="px-3 py-1 bg-sky-200 text-sky-900 border border-sky-400 rounded-lg font-mono text-xs font-bold">
                  Read-Only Architecture (Zero CRM Writes)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Trigger & Middleware</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Calendar Event or /prep [Account]</h5>
                  <p className="text-zinc-650 leading-relaxed">
                    n8n listens for upcoming meetings within the AE's lead time (e.g. 15 mins prior) or a manual Slack slash command. Fires parallel read pulls without holding persistent state.
                  </p>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Data Ingestion</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Salesforce + Gong Call History</h5>
                  <ul className="space-y-1 text-zinc-650">
                    <li>• <strong>Salesforce:</strong> Account ARR tier, Opp MEDDIC fields, Stage, Amount, NextStep, Open Tasks</li>
                    <li>• <strong>Gong:</strong> Past 2–3 call transcripts, tracker hits (competitor mentions, pricing objections)</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Claude Output & Delivery</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Slack DM One-Screen Brief</h5>
                  <p className="text-zinc-650 leading-relaxed">
                    Produces account-health narrative, MEDDIC gap list (which fields are blank/stale), 3–5 recommended discovery questions, and stakeholder map with "Create Task" / "Open in Salesforce" deep links.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STREAM B DETAILS */}
          {activeStream === "stream_b" && (
            <div className="bg-violet-50/50 border-3 border-violet-300 rounded-2xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-violet-200 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-violet-700 uppercase tracking-wider block">Core Operational Spine</span>
                  <h3 className="font-hand text-2xl font-black text-ink">Stream B — Post-Call MEDDIC & Task Sync</h3>
                </div>
                <span className="px-3 py-1 bg-violet-200 text-violet-900 border border-violet-400 rounded-lg font-mono text-xs font-bold">
                  Durable Webhook & Multi-Step Gate
                </span>
              </div>

              {/* Step by step pipeline */}
              <div className="space-y-3 font-sans text-xs">
                <div className="bg-white border-2 border-ink rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded font-mono text-xs font-bold shrink-0">Step 1</span>
                  <div>
                    <h6 className="font-bold text-zinc-900">Gong Transcript-Ready Webhook Trigger (5–15 min post-call)</h6>
                    <p className="text-zinc-650 mt-0.5">n8n receives full speaker-labeled transcript, tracker metadata (competitors, pricing, objections), and participant emails.</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded font-mono text-xs font-bold shrink-0">Step 2</span>
                  <div>
                    <h6 className="font-bold text-zinc-900">Salesforce Contact & Opportunity Resolution + MEDDIC State Pull</h6>
                    <p className="text-zinc-650 mt-0.5">Matches Gong participant emails to SFDC Contacts → linked most recently active open Opportunity (fallback: log against Account as standalone Task). Pulls current 6 MEDDIC values to test delta-write eligibility before running Claude.</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded font-mono text-xs font-bold shrink-0">Step 3</span>
                  <div>
                    <h6 className="font-bold text-zinc-900">Structured Claude Extraction (Verbatim Citations Only)</h6>
                    <p className="text-zinc-650 mt-0.5">Claude extracts: MEDDIC deltas (blank or less specific fields), Next steps with owner & date, Risk/competitor flags, and Forecast-relevant buyer claims (budget/timeline). Outputs categorical evidence with verbatim transcript quotes.</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded font-mono text-xs font-bold shrink-0">Step 4</span>
                  <div>
                    <h6 className="font-bold text-zinc-900">Deterministic Confidence Scorer Node (Auditable n8n Code Node)</h6>
                    <p className="text-zinc-650 mt-0.5">Evaluates Evidence Clarity (0-40), Authority (0-25), Corroboration (0-20), Recency (0-15). Resolves relative date math deterministically. Runs SOQL check for duplicate open tasks.</p>
                  </div>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-violet-600 text-white rounded font-mono text-xs font-bold shrink-0">Step 5</span>
                  <div>
                    <h6 className="font-bold text-zinc-900">Three-Way Routing Gate & Writes</h6>
                    <ul className="text-zinc-650 mt-1 space-y-0.5">
                      <li>• <strong>Auto-Write Path (Score ≥85/80):</strong> Delta-writes MEDDIC custom fields, creates Task, posts Slack FYI with undo window.</li>
                      <li>• <strong>Human-in-Loop Path (Score 50–84 or Populated Field):</strong> Pushes interactive Slack card with Approve/Edit/Ignore buttons.</li>
                      <li>• <strong>Durable Notion Write:</strong> Appends full structured record and citation to Deal Intelligence database.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STREAM C DETAILS */}
          {activeStream === "stream_c" && (
            <div className="bg-amber-50/50 border-3 border-amber-300 rounded-2xl p-5 sm:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-200 pb-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Pipeline Integrity Stream</span>
                  <h3 className="font-hand text-2xl font-black text-ink">Stream C — Scheduled Forecast-Integrity Check</h3>
                </div>
                <span className="px-3 py-1 bg-amber-200 text-amber-900 border border-amber-400 rounded-lg font-mono text-xs font-bold">
                  Zero Overwrite • Evidence Re-use
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Trigger Cadence</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Monday AM Cron + SFDC Event Changes</h5>
                  <p className="text-zinc-650 leading-relaxed">
                    Fires weekly before forecast calls and triggers on any Salesforce CloseDate change or ForecastCategoryName change across current-period Commit/Best Case opps.
                  </p>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Evidence Re-use</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Reuses Stream B Extracted Claims</h5>
                  <p className="text-zinc-650 leading-relaxed">
                    Does NOT re-parse raw transcripts. Directly consumes Stream B's extracted forecast claims (budget confirmed, timeline stated, stall language) to save LLM tokens and ensure single-source consistency.
                  </p>
                </div>

                <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-sm">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">Mismatch Classification</div>
                  <h5 className="font-bold text-zinc-900 mb-2">Hard Contradictions vs. Soft Staleness</h5>
                  <ul className="space-y-1 text-zinc-650">
                    <li>• <strong>Hard Mismatch:</strong> Direct contradiction (SFDC in Commit while buyer stated Q2 push in Gong).</li>
                    <li>• <strong>Soft Mismatch:</strong> Commit deal with zero Gong call evidence in trailing N days.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border-2 border-ink rounded-xl p-4 text-xs font-sans">
                <h5 className="font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Governance Rule for Forecast Integrity
                </h5>
                <p className="text-zinc-650 leading-relaxed">
                  The agent <strong>NEVER</strong> auto-writes to ForecastCategoryName or StageName. It surfaces citation-linked evidence to the AE and manager Slack channels with "Update Category in SFDC" or "Dismiss with Reason" buttons. Stage and forecast category remain 100% human-owned.
                </p>
              </div>
            </div>
          )}

          {/* Notion Durable Record Section */}
          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <h4 className="font-hand text-lg font-bold text-ink mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              Notion Deal Intelligence Log — The Durable Audit Record
            </h4>
            <p className="font-sans text-xs text-zinc-600 mb-3">
              Neither Slack nor Salesforce Chatter is designed for multi-week trend reviews. Notion acts as the permanent, searchable record for leadership to audit deal evidence.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] border border-zinc-200">
                <thead className="bg-zinc-100 text-zinc-700">
                  <tr>
                    <th className="p-2 border-b border-zinc-200">Property</th>
                    <th className="p-2 border-b border-zinc-200">Populated By</th>
                    <th className="p-2 border-b border-zinc-200">Purpose / Data Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-600">
                  <tr>
                    <td className="p-2 font-bold text-zinc-900">Opportunity & Account</td>
                    <td className="p-2">Stream B, Stream C</td>
                    <td className="p-2">Salesforce ID relation + Account name</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-zinc-900">Event Type</td>
                    <td className="p-2">Stream B (Call Summary) / Stream C (Forecast Check)</td>
                    <td className="p-2">Filterable tag to isolate call logs vs mismatch flags</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-zinc-900">MEDDIC Snapshot</td>
                    <td className="p-2">Stream B</td>
                    <td className="p-2">Current state of all 6 fields at time of call</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-zinc-900">Forecast Confidence</td>
                    <td className="p-2">Stream C</td>
                    <td className="p-2">Hard Mismatch, Soft Staleness, or Clean</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-zinc-900">Gong Citation Link</td>
                    <td className="p-2">Stream B, Stream C</td>
                    <td className="p-2">Deep link directly to the timestamped recording snippet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONFIDENCE SCORER & GOVERNANCE SIMULATOR */}
      {activeTab === "governance_simulator" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <h3 className="font-hand text-2xl font-black text-ink mb-1">
              Interactive Confidence Scorer Simulator
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-700 leading-relaxed">
              Test how the deterministic n8n <strong>Confidence Scorer</strong> evaluates Claude's categorical extraction before any write touches Salesforce. Adjust weighted rubric factors to see the live routing gate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SIMULATOR 1: RUBRIC 1 (MEDDIC FIELD WRITES) */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold text-violet-700 uppercase">Rubric 1</span>
                  <h4 className="font-hand text-lg font-bold text-ink">MEDDIC Field Scorer</h4>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-violet-700">{meddicScore}</span>
                  <span className="font-mono text-xs text-zinc-500"> / 100 pts</span>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs">
                {/* Existing Field Status */}
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Salesforce Target Field State:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setMeddicFieldStatus("blank")}
                      className={`p-2 rounded-lg border-2 font-bold text-xs cursor-pointer ${
                        meddicFieldStatus === "blank" ? "bg-violet-100 border-violet-600 text-violet-900" : "bg-zinc-50 border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Field is Blank in SFDC
                    </button>
                    <button
                      onClick={() => setMeddicFieldStatus("populated")}
                      className={`p-2 rounded-lg border-2 font-bold text-xs cursor-pointer ${
                        meddicFieldStatus === "populated" ? "bg-amber-100 border-amber-600 text-amber-900" : "bg-zinc-50 border-zinc-200 text-zinc-600"
                      }`}
                    >
                      Field Already Populated
                    </button>
                  </div>
                </div>

                {/* Evidence Clarity (0-40) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Evidence Clarity (0–40 pts):</span>
                    <span className="font-mono text-violet-700">{evidenceClarity} pts</span>
                  </div>
                  <select
                    value={evidenceClarity}
                    onChange={(e) => setEvidenceClarity(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={40}>Verbatim & Unambiguous (40 pts)</option>
                    <option value={20}>Paraphrased / Inferred (20 pts)</option>
                    <option value={5}>Ambiguous / Weak (5 pts)</option>
                  </select>
                </div>

                {/* Source Authority (0-25) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Source Authority (0–25 pts):</span>
                    <span className="font-mono text-violet-700">{sourceAuthority} pts</span>
                  </div>
                  <select
                    value={sourceAuthority}
                    onChange={(e) => setSourceAuthority(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={25}>Economic Buyer / Champion directly stating (25 pts)</option>
                    <option value={20}>AE restates, Buyer confirms (20 pts)</option>
                    <option value={8}>AE asserts unilaterally (8 pts)</option>
                    <option value={0}>Unclear / Unknown speaker (0 pts)</option>
                  </select>
                </div>

                {/* Corroboration (0-20) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Corroboration & Conflict (0–20 pts):</span>
                    <span className="font-mono text-violet-700">{corroboration} pts</span>
                  </div>
                  <select
                    value={corroboration}
                    onChange={(e) => setCorroboration(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={20}>Fills a blank, zero conflict (20 pts)</option>
                    <option value={5}>Partially conflicts with past call (5 pts)</option>
                    <option value={0}>Contradicts human edit in trailing 14d (0 pts - Hard Block)</option>
                  </select>
                </div>

                {/* Recency (0-15) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Call Recency (0–15 pts):</span>
                    <span className="font-mono text-violet-700">{recency} pts</span>
                  </div>
                  <select
                    value={recency}
                    onChange={(e) => setRecency(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={15}>Most recent call on active Opportunity (15 pts)</option>
                    <option value={8}>Older call within 30-day lookback window (8 pts)</option>
                  </select>
                </div>
              </div>

              {/* Action Output Card */}
              <div className={`p-4 border-2 rounded-xl mt-3 ${meddicAction.color}`}>
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider">{meddicAction.tier}</div>
                <div className="font-hand text-base font-bold my-0.5">{meddicAction.badge}</div>
                <p className="font-sans text-xs leading-relaxed opacity-90">{meddicAction.desc}</p>
              </div>
            </div>

            {/* SIMULATOR 2: RUBRIC 2 (TASK & NEXT STEP EXTRACTION) */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
                <div>
                  <span className="font-mono text-[10px] font-bold text-sky-700 uppercase">Rubric 2</span>
                  <h4 className="font-hand text-lg font-bold text-ink">Task & Next Step Scorer</h4>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-sky-700">{taskScore}</span>
                  <span className="font-mono text-xs text-zinc-500"> / 100 pts</span>
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs">
                {/* Commitment Language (0-35) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Commitment Language (0–35 pts):</span>
                    <span className="font-mono text-sky-700">{taskCommitmentLang} pts</span>
                  </div>
                  <select
                    value={taskCommitmentLang}
                    onChange={(e) => setTaskCommitmentLang(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={35}>Explicit ("I will send the revised security doc") (35 pts)</option>
                    <option value={18}>Soft / Conditional ("Let me try to get that") (18 pts)</option>
                    <option value={5}>Implied / Passive ("That would be good to review") (5 pts)</option>
                  </select>
                </div>

                {/* Owner Clarity (0-25) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Owner Clarity (0–25 pts):</span>
                    <span className="font-mono text-sky-700">{taskOwnerClarity} pts</span>
                  </div>
                  <select
                    value={taskOwnerClarity}
                    onChange={(e) => setTaskOwnerClarity(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={25}>Named & Identifiable Owner (AE or Customer) (25 pts)</option>
                    <option value={10}>Ambiguous ("One of our engineers") (10 pts)</option>
                    <option value={0}>Unclear / Passive voice (0 pts)</option>
                  </select>
                </div>

                {/* Due Date Clarity (0-20) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>Due Date Clarity (0–20 pts):</span>
                    <span className="font-mono text-sky-700">{taskDueDateClarity} pts</span>
                  </div>
                  <select
                    value={taskDueDateClarity}
                    onChange={(e) => setTaskDueDateClarity(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={20}>Explicit Date ("By Thursday at 3 PM") (20 pts)</option>
                    <option value={14}>Resolvable Relative Date ("Next Tuesday") (14 pts)</option>
                    <option value={0}>No Date Specified (0 pts - Human Gate)</option>
                  </select>
                </div>

                {/* Duplicate Check (0-20) */}
                <div>
                  <div className="flex justify-between font-bold text-zinc-700 mb-1">
                    <span>SOQL Open Task Duplicate Check (0–20 pts):</span>
                    <span className="font-mono text-sky-700">{taskDuplicateCheck} pts</span>
                  </div>
                  <select
                    value={taskDuplicateCheck}
                    onChange={(e) => setTaskDuplicateCheck(Number(e.target.value))}
                    className="w-full bg-zinc-50 border-2 border-ink rounded-lg p-2 text-xs font-medium"
                  >
                    <option value={20}>No open task matches description on this Opp (20 pts)</option>
                    <option value={0}>Possible Duplicate open task detected (0 pts - Hard Block)</option>
                  </select>
                </div>
              </div>

              {/* Action Output Card */}
              <div className={`p-4 border-2 rounded-xl mt-3 ${taskAction.color}`}>
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider">{taskAction.tier}</div>
                <div className="font-hand text-base font-bold my-0.5">{taskAction.badge}</div>
                <p className="font-sans text-xs leading-relaxed opacity-90">{taskAction.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCT MANAGER ROLE & UAT VALIDATION */}
      {activeTab === "pm_execution" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-6">
            <div className="border-b-2 border-zinc-100 pb-3">
              <span className="font-mono text-[10px] font-bold text-violet-700 uppercase">Product Management Leadership</span>
              <h3 className="font-hand text-2xl font-black text-ink">From Problem Framing to Production Sign-Off</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
              {/* BRD to PRD Translation */}
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h5 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-violet-700" />
                  1. BRD to PRD Translation & Phased Build Order
                </h5>
                <p className="text-zinc-650 leading-relaxed">
                  Unified three separately reported pain points into one core hypothesis. Defined a strict build sequencing: <strong>Stream B (post-call sync) first</strong>, because both Stream A (pre-call history) and Stream C (forecast claims) rely on Stream B's extracted signals rather than raw transcripts.
                </p>
                <p className="text-zinc-650 leading-relaxed">
                  Codified the <strong>Delta-Write Only</strong> rule and <strong>Stage/Forecast Exclusion</strong> into the PRD as non-negotiable acceptance criteria driven by corporate data governance.
                </p>
              </div>

              {/* Scope & Risk Mitigation */}
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h5 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  2. Scope Boundaries & 4 Managed Risks
                </h5>
                <ul className="space-y-1.5 text-zinc-650">
                  <li>• <strong>Multi-Opp Ambiguity:</strong> Mitigated by defaulting to "most recently active open opportunity" with instant AE override.</li>
                  <li>• <strong>MEDDIC Overwrite:</strong> Mitigated by hard delta-write rule (AI fills blanks, never overwrites human edits).</li>
                  <li>• <strong>Hallucinated Tasks:</strong> Mitigated by requiring deterministic confidence scoring & mandatory Slack approval on low scores.</li>
                  <li>• <strong>Slack Fatigue:</strong> Mitigated by routing only mismatches and pending items, not every processed call.</li>
                </ul>
              </div>

              {/* UAT Test Cohort */}
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h5 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-sky-700" />
                  3. UAT Test Cohort & Scenarios
                </h5>
                <p className="text-zinc-650 leading-relaxed">
                  Piloted with a cross-functional AE cohort across early, mid, and late-stage deals. Executed 4 edge-case test runs:
                </p>
                <ul className="space-y-1 text-zinc-650">
                  <li>• Test 1: Opportunity with zero prior Gong recording history.</li>
                  <li>• Test 2: Conflicting manual entry vs. AI transcript claim (verified delta-write blocked).</li>
                  <li>• Test 3: Call with zero linkable Opportunity (verified Account fallback Task).</li>
                  <li>• Test 4: Low-confidence extraction (verified interactive Slack approval routing).</li>
                </ul>
              </div>

              {/* Verifiable Acceptance Criteria */}
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h5 className="font-bold text-zinc-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  4. Objective Field-Diff Verification
                </h5>
                <p className="text-zinc-650 leading-relaxed">
                  Enforced verifiable criteria rather than subjective impressions:
                </p>
                <ul className="space-y-1 text-zinc-650">
                  <li>• Verified <strong>zero overwritten fields</strong> via automated before/after Salesforce field audit logs.</li>
                  <li>• Verified extracted Tasks matched transcript recordings via spot-checks.</li>
                  <li>• Validated forecast mismatch flags against RevOps known-risk deal lists before production rollout.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REVOPS KPI IMPACT MATRIX */}
      {activeTab === "kpi_matrix" && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white border-3 border-ink rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="border-b-2 border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] font-bold text-violet-700 uppercase">RevOps & SalesOps Performance Lens</span>
                <h3 className="font-hand text-2xl font-black text-ink">10 Key Success Metrics & Baselines</h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">Live Instrumentation & Audit Status</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-zinc-200">
                <thead className="bg-zinc-100 font-mono text-[11px] text-zinc-700 uppercase">
                  <tr>
                    <th className="p-2.5 border-b border-zinc-200">Category</th>
                    <th className="p-2.5 border-b border-zinc-200">Metric Name</th>
                    <th className="p-2.5 border-b border-zinc-200">Baseline → Target</th>
                    <th className="p-2.5 border-b border-zinc-200">Instrumentation & Validation Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Data Quality</td>
                    <td className="p-2.5">MEDDIC Field Completion Rate</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">38% → 86%</span></td>
                    <td className="p-2.5 text-zinc-600">% of open opps with all 6 fields populated in SFDC</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Data Freshness</td>
                    <td className="p-2.5">Next Step Freshness</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">54% → 91%</span></td>
                    <td className="p-2.5 text-zinc-600">% of open opps with NextStep field updated ≤ 7 days</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Pipeline Integrity</td>
                    <td className="p-2.5">Stale-Commit Rate</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-mono">New Metric</span></td>
                    <td className="p-2.5 text-zinc-600">% of Commit-category opps with zero Gong call in trailing 14d</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Integration SLA</td>
                    <td className="p-2.5">Pipeline Trigger Coverage</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-mono">&gt; 99% Target</span></td>
                    <td className="p-2.5 text-zinc-650">% of eligible Gong calls successfully processed by Stream B</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Time Savings</td>
                    <td className="p-2.5">AE Post-Call Admin Time</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">-17 min / call</span></td>
                    <td className="p-2.5 text-zinc-650">Measured via Task timestamp delta from call-end & AE time-motion</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Time Savings</td>
                    <td className="p-2.5">Manager Deal-Review Prep</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">-40% Prep Time</span></td>
                    <td className="p-2.5 text-zinc-650">Elapsed time between call end and manager's first review view</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Forecast Rigor</td>
                    <td className="p-2.5">Forecast Mismatch Rate</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-mono">New Metric</span></td>
                    <td className="p-2.5 text-zinc-650">% of Commit opps flagged with hard mismatch, trended weekly</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">North Star</td>
                    <td className="p-2.5">Predicted vs. Actual Close Correlation</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-mono">Quarterly North Star</span></td>
                    <td className="p-2.5 text-zinc-650">Evaluates if flagged hard-mismatch deals slip or close at lower rate</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Model Quality</td>
                    <td className="p-2.5">AI Proposal Acceptance Rate</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-mono">Tuning Telemetry</span></td>
                    <td className="p-2.5 text-zinc-650">% of proposals approved unedited vs edited vs rejected in Slack</td>
                  </tr>
                  <tr className="bg-white hover:bg-zinc-50">
                    <td className="p-2.5 font-bold text-zinc-900">Adoption</td>
                    <td className="p-2.5">Notion Deal Intelligence Views</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-mono">Weekly Tracking</span></td>
                    <td className="p-2.5 text-zinc-650">Weekly manager & leadership audit views on durable log</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
