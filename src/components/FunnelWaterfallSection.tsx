import React, { useState, useMemo } from "react";
import {
  Layers,
  TrendingDown,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  PieChart,
  BarChart3,
  Flame,
  ShieldCheck
} from "lucide-react";

export interface FunnelStageData {
  stageNumber: number;
  stageName: string;
  count: number;
  ingressPercentage: number; // % of initial ingress (100%)
  stepConversionRate: number; // % passing to next stage
  dropOffRate: number; // % dropping out
  dwellTimeDays: number; // average days in this stage
  pipelineValue: number; // USD
  primaryLeakageReason: string;
  optimizationAction: string;
}

export const FUNNEL_5_STAGES: FunnelStageData[] = [
  {
    stageNumber: 1,
    stageName: "Lead Ingress",
    count: 1540,
    ingressPercentage: 100.0,
    stepConversionRate: 64.3,
    dropOffRate: 35.7,
    dwellTimeDays: 0.8,
    pipelineValue: 18480000,
    primaryLeakageReason: "Personal emails (gmail/yahoo), invalid phone, out-of-territory",
    optimizationAction: "Real-time Clearbit/Apollo data enrichment & bot honeypot filter"
  },
  {
    stageNumber: 2,
    stageName: "MQL Qualified",
    count: 990,
    ingressPercentage: 64.3,
    stepConversionRate: 58.6,
    dropOffRate: 41.4,
    dwellTimeDays: 2.4,
    pipelineValue: 14200000,
    primaryLeakageReason: "Lead score threshold under 60, no active budget or timing fit",
    optimizationAction: "Autonomous AI qualification swarms engaging within 90 seconds"
  },
  {
    stageNumber: 3,
    stageName: "SQL Validated",
    count: 580,
    ingressPercentage: 37.7,
    stepConversionRate: 55.2,
    dropOffRate: 44.8,
    dwellTimeDays: 4.8,
    pipelineValue: 10450000,
    primaryLeakageReason: "Discovery call cancellation, competitor existing multi-year contract",
    optimizationAction: "Automated pre-meeting executive brief & competitive battlecards"
  },
  {
    stageNumber: 4,
    stageName: "Active Opportunity",
    count: 320,
    ingressPercentage: 20.8,
    stepConversionRate: 38.8,
    dropOffRate: 61.2,
    dwellTimeDays: 26.5,
    pipelineValue: 6850000,
    primaryLeakageReason: "Security review redlines, VP Finance budget freeze, champion departure",
    optimizationAction: "Sub-minute CPQ quote generation and automated SOC2 trust room"
  },
  {
    stageNumber: 5,
    stageName: "Closed Won Booked",
    count: 124,
    ingressPercentage: 8.1,
    stepConversionRate: 100.0,
    dropOffRate: 0.0,
    dwellTimeDays: 0.0,
    pipelineValue: 4120000,
    primaryLeakageReason: "N/A — Successfully contracted",
    optimizationAction: "Instant Slack celebration webhook and CSM onboarding kickoff"
  }
];

export const FunnelWaterfallSection: React.FC = () => {
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  const selectedStage = FUNNEL_5_STAGES[selectedStageIdx];

  const totalClosedWonARR = FUNNEL_5_STAGES[4].pipelineValue;
  const overallLeadToWonRate = ((FUNNEL_5_STAGES[4].count / FUNNEL_5_STAGES[0].count) * 100).toFixed(1);
  const totalSalesCycleDays = FUNNEL_5_STAGES.reduce((acc, curr) => acc + curr.dwellTimeDays, 0).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 border-2 border-ink rounded-lg">
              <Layers className="h-5 w-5 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-hand text-xl font-bold text-ink">
                5-Stage Funnel Progression & Conversion Waterfall
              </h3>
              <p className="font-sans text-xs text-zinc-500">
                Visual stage waterfall: Lead Ingress (100%) → MQL Qualified → SQL Validated → Active Opportunity → Closed Won Booked with drop-off diagnostics & dwell times.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 font-mono text-xs font-bold">
              KPI-161 Master
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
              5-Stage Telemetry
            </span>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Total Ingress Volume</span>
            <div className="font-hand text-3xl font-black text-zinc-900 mt-1">
              {FUNNEL_5_STAGES[0].count} Leads
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              100.0% Initial Top-of-Funnel
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Closed Won Booked</span>
            <div className="font-hand text-3xl font-black text-emerald-700 mt-1">
              {FUNNEL_5_STAGES[4].count} Won
            </div>
            <span className="font-sans text-[11px] text-emerald-600 font-bold mt-1 block">
              ${(totalClosedWonARR / 1000000).toFixed(2)}M Booked ARR
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Ingress-to-Won Pass Rate</span>
            <div className="font-hand text-3xl font-black text-indigo-700 mt-1">
              {overallLeadToWonRate}%
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              Benchmark standard for B2B SaaS is 4-7%
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Total Velocity Dwell</span>
            <div className="font-hand text-3xl font-black text-amber-700 mt-1">
              {totalSalesCycleDays} Days
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              End-to-end elapsed turnaround
            </span>
          </div>
        </div>
      </div>

      {/* Visual 5-Stage Waterfall Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {FUNNEL_5_STAGES.map((stage, idx) => {
          const isSelected = selectedStageIdx === idx;
          const isLast = idx === 4;

          return (
            <button
              key={stage.stageName}
              onClick={() => setSelectedStageIdx(idx)}
              className={`p-4 rounded-xl border-3 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? "bg-paper border-indigo-700 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] translate-y-[-2px]"
                  : "bg-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:bg-zinc-50"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">
                    Stage {stage.stageNumber}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isLast
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {stage.ingressPercentage}%
                  </span>
                </div>

                <h4 className="font-sans font-black text-sm text-zinc-900 leading-tight">
                  {stage.stageName}
                </h4>

                <div className="font-hand text-2xl font-black text-ink">
                  {stage.count}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-100 h-2 rounded-full border border-zinc-300 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isLast ? "bg-emerald-500" : "bg-indigo-600"
                    }`}
                    style={{ width: `${stage.ingressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-dashed border-zinc-300 space-y-1 font-mono text-[11px]">
                <div className="flex items-center justify-between text-zinc-500">
                  <span>Dwell:</span>
                  <strong className="text-zinc-800">{stage.dwellTimeDays}d</strong>
                </div>
                {!isLast && (
                  <div className="flex items-center justify-between text-zinc-500">
                    <span>Pass:</span>
                    <strong className="text-emerald-700">{stage.stepConversionRate}%</strong>
                  </div>
                )}
                {isLast && (
                  <div className="flex items-center justify-between text-emerald-700 font-bold">
                    <span>ARR:</span>
                    <strong>${(stage.pipelineValue / 1000000).toFixed(1)}M</strong>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Diagnostic Detail Box */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
        <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 border border-ink text-indigo-900 font-mono text-xs font-bold">
              Stage {selectedStage.stageNumber}
            </span>
            <h4 className="font-hand text-lg font-bold text-ink">
              Diagnostic & Leakage Deep-Dive: {selectedStage.stageName}
            </h4>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            Pipeline In Flight: <strong>${selectedStage.pipelineValue.toLocaleString()}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs text-rose-900 flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                Primary Stage Leakage Drivers ({selectedStage.dropOffRate}% Drop-Off)
              </span>
              <span className="font-mono text-[10px] font-bold bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded">
                Leakage Point
              </span>
            </div>
            <p className="font-sans text-xs text-rose-800 leading-relaxed">
              {selectedStage.primaryLeakageReason}
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-xs text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Recommended Automated Playbook / SOP
              </span>
              <span className="font-mono text-[10px] font-bold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">
                Action Item
              </span>
            </div>
            <p className="font-sans text-xs text-emerald-800 leading-relaxed">
              {selectedStage.optimizationAction}
            </p>
          </div>
        </div>

        {/* Stage Pass-Through Equation */}
        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-wrap items-center justify-between text-xs font-mono text-zinc-700">
          <span>
            Stage Volume: <strong>{selectedStage.count} records</strong> ({selectedStage.ingressPercentage}% of initial ingress)
          </span>
          <span>
            Average Stage Dwell: <strong>{selectedStage.dwellTimeDays} days</strong>
          </span>
          <span>
            Pass-Through Conversion: <strong className="text-indigo-700">{selectedStage.stepConversionRate}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
