import React, { useState, useMemo } from "react";
import {
  Sliders,
  TrendingUp,
  Zap,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  RefreshCw,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Layers
} from "lucide-react";

export const SalesVelocitySimulatorSection: React.FC = () => {
  // Baseline Defaults
  const BASELINE_OPPS = 120;
  const BASELINE_WIN_RATE = 32.0; // 32%
  const BASELINE_ACV = 48000; // $48k
  const BASELINE_CYCLE_DAYS = 35; // 35 days

  // Interactive Simulation Sliders State
  const [oppCount, setOppCount] = useState<number>(BASELINE_OPPS);
  const [winRate, setWinRate] = useState<number>(BASELINE_WIN_RATE);
  const [acv, setAcv] = useState<number>(BASELINE_ACV);
  const [cycleDays, setCycleDays] = useState<number>(BASELINE_CYCLE_DAYS);

  // Baseline Daily & Annual Velocity
  const baselineDailyVelocity = useMemo(() => {
    return (BASELINE_OPPS * (BASELINE_WIN_RATE / 100) * BASELINE_ACV) / BASELINE_CYCLE_DAYS;
  }, []);

  const baselineQuarterlyVelocity = useMemo(() => {
    return baselineDailyVelocity * 90;
  }, [baselineDailyVelocity]);

  // Simulated Daily & Annual Velocity
  const simulatedDailyVelocity = useMemo(() => {
    return (oppCount * (winRate / 100) * acv) / Math.max(cycleDays, 1);
  }, [oppCount, winRate, acv, cycleDays]);

  const simulatedQuarterlyVelocity = useMemo(() => {
    return simulatedDailyVelocity * 90;
  }, [simulatedDailyVelocity]);

  const velocityDeltaPercent = useMemo(() => {
    return Math.round(((simulatedDailyVelocity - baselineDailyVelocity) / baselineDailyVelocity) * 100);
  }, [simulatedDailyVelocity, baselineDailyVelocity]);

  const quarterlyDeltaARR = useMemo(() => {
    return simulatedQuarterlyVelocity - baselineQuarterlyVelocity;
  }, [simulatedQuarterlyVelocity, baselineQuarterlyVelocity]);

  // NRR & GRR Cohort Waterfall Data
  const [startingARR, setStartingARR] = useState<number>(10000000); // $10.0M
  const [expansionARR, setExpansionARR] = useState<number>(1850000); // $1.85M
  const [contractionARR, setContractionARR] = useState<number>(320000); // $320k
  const [churnARR, setChurnARR] = useState<number>(480000); // $480k

  const endingARR = useMemo(() => {
    return startingARR + expansionARR - contractionARR - churnARR;
  }, [startingARR, expansionARR, contractionARR, churnARR]);

  const nrrPercent = useMemo(() => {
    return Math.round((endingARR / startingARR) * 1000) / 10;
  }, [endingARR, startingARR]);

  const grrPercent = useMemo(() => {
    const retainedARR = startingARR - contractionARR - churnARR;
    return Math.round((retainedARR / startingARR) * 1000) / 10;
  }, [startingARR, contractionARR, churnARR]);

  const resetToBaseline = () => {
    setOppCount(BASELINE_OPPS);
    setWinRate(BASELINE_WIN_RATE);
    setAcv(BASELINE_ACV);
    setCycleDays(BASELINE_CYCLE_DAYS);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 border-2 border-ink rounded-lg">
              <Zap className="h-5 w-5 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-hand text-xl font-bold text-ink">
                Sales Efficiency, Velocity Simulation & NRR/GRR Waterfall
              </h3>
              <p className="font-sans text-xs text-zinc-500">
                Formula calculation: Pipeline Velocity = (# Opps × Win Rate % × ACV) / Days. Interactive scenario simulation and cohort retention waterfall.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 font-mono text-xs font-bold">
              KPI-164 & KPI-165
            </span>
            <button
              onClick={resetToBaseline}
              className="px-3 py-1 bg-white hover:bg-zinc-100 border-2 border-ink rounded-lg font-hand text-xs font-bold flex items-center gap-1 cursor-pointer shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
            >
              <RefreshCw className="h-3 w-3" /> Reset Baseline
            </button>
          </div>
        </div>

        {/* Live Equation Formula Bar */}
        <div className="p-4 bg-zinc-900 text-white rounded-xl border-2 border-ink font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between text-zinc-400 mb-2 border-b border-zinc-700 pb-1.5">
            <span className="font-bold text-zinc-300 uppercase flex items-center gap-1.5">
              <Target className="h-4 w-4 text-emerald-400" />
              Live Pipeline Velocity Computation
            </span>
            <span className="text-emerald-400 font-bold">
              ${Math.round(simulatedDailyVelocity).toLocaleString()} / Day ($
              {(simulatedQuarterlyVelocity / 1000000).toFixed(2)}M / Quarter)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-zinc-400">Velocity =</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-indigo-300 font-bold">
              {oppCount} Opps
            </span>
            <span>×</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-amber-300 font-bold">
              {winRate}% Win
            </span>
            <span>×</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-emerald-300 font-bold">
              ${(acv / 1000).toFixed(0)}k ACV
            </span>
            <span className="text-zinc-400">÷</span>
            <span className="bg-zinc-800 px-2 py-0.5 rounded text-rose-300 font-bold">
              {cycleDays} Days
            </span>
            <span className="text-zinc-400">=</span>
            <span
              className={`font-black px-2 py-0.5 rounded ${
                velocityDeltaPercent >= 0
                  ? "bg-emerald-900/80 text-emerald-300 border border-emerald-500"
                  : "bg-rose-900/80 text-rose-300 border border-rose-500"
              }`}
            >
              {velocityDeltaPercent >= 0 ? `+${velocityDeltaPercent}%` : `${velocityDeltaPercent}%`} vs Baseline
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Interactive Simulation Sliders (Left) + NRR/GRR Waterfall (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Controls */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3 mb-4">
              <h4 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                <Sliders className="h-5 w-5 text-indigo-600" />
                Scenario Simulation Engine
              </h4>
              <span className="font-mono text-xs text-zinc-400">4 Levers</span>
            </div>

            <div className="space-y-4">
              {/* Slider 1: Opp Count */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-700 font-bold">1. Opportunity Volume:</span>
                  <span className="font-bold text-indigo-700">{oppCount} Deals</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={oppCount}
                  onChange={(e) => setOppCount(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>20 Deals</span>
                  <span>Baseline: {BASELINE_OPPS}</span>
                  <span>300 Deals</span>
                </div>
              </div>

              {/* Slider 2: Win Rate */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-700 font-bold">2. Opportunity Win Rate %:</span>
                  <span className="font-bold text-amber-700">{winRate}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="0.5"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>10%</span>
                  <span>Baseline: {BASELINE_WIN_RATE}%</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Slider 3: ACV */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-700 font-bold">3. Average Deal Size (ACV):</span>
                  <span className="font-bold text-emerald-700">${acv.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="150000"
                  step="2500"
                  value={acv}
                  onChange={(e) => setAcv(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>$15k</span>
                  <span>Baseline: ${(BASELINE_ACV / 1000).toFixed(0)}k</span>
                  <span>$150k</span>
                </div>
              </div>

              {/* Slider 4: Sales Cycle Days */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-700 font-bold">4. Sales Cycle Length:</span>
                  <span className="font-bold text-rose-700">{cycleDays} Days</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="1"
                  value={cycleDays}
                  onChange={(e) => setCycleDays(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>10 Days (Ultra-fast)</span>
                  <span>Baseline: {BASELINE_CYCLE_DAYS}d</span>
                  <span>90 Days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-zinc-50 border-2 border-ink rounded-xl flex items-center justify-between font-mono text-xs">
            <span>
              Projected Quarterly Impact:{" "}
              <strong className={quarterlyDeltaARR >= 0 ? "text-emerald-700" : "text-rose-700"}>
                {quarterlyDeltaARR >= 0 ? "+" : ""}
                ${(quarterlyDeltaARR / 1000000).toFixed(2)}M ARR
              </strong>
            </span>
            <span className="font-sans text-[11px] text-zinc-500">vs Baseline</span>
          </div>
        </div>

        {/* NRR & GRR Retention Waterfall */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3 mb-4">
              <h4 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-600" />
                NRR & GRR Cohort Retention Waterfall
              </h4>
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                  NRR: {nrrPercent}%
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-300 font-bold">
                  GRR: {grrPercent}%
                </span>
              </div>
            </div>

            {/* Waterfall Flow Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              {/* Step 1: Starting ARR */}
              <div className="p-3 bg-zinc-50 border-2 border-ink rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">1. Starting Cohort ARR</span>
                  <span className="font-sans font-bold text-zinc-900 text-sm">Beginning Annual Run-rate</span>
                </div>
                <span className="font-bold text-zinc-900 text-sm">
                  ${(startingARR / 1000000).toFixed(2)}M
                </span>
              </div>

              {/* Step 2: Expansion ARR (+) */}
              <div className="p-3 bg-emerald-50 border-2 border-emerald-300 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-700 block text-[10px] uppercase font-bold">+ Expansion & Upsell ARR</span>
                  <span className="font-sans font-bold text-emerald-950 text-sm">Seat adds & product upgrades</span>
                </div>
                <span className="font-bold text-emerald-800 text-sm">
                  +${(expansionARR / 1000000).toFixed(2)}M
                </span>
              </div>

              {/* Step 3: Contraction ARR (-) */}
              <div className="p-3 bg-amber-50 border-2 border-amber-300 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-amber-700 block text-[10px] uppercase font-bold">- Contraction & Downgrades</span>
                  <span className="font-sans font-bold text-amber-950 text-sm">Tier reductions & seat drop</span>
                </div>
                <span className="font-bold text-amber-800 text-sm">
                  -${(contractionARR / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Step 4: Churn ARR (-) */}
              <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-rose-700 block text-[10px] uppercase font-bold">- Logo Churn & Cancellations</span>
                  <span className="font-sans font-bold text-rose-950 text-sm">Lost accounts</span>
                </div>
                <span className="font-bold text-rose-800 text-sm">
                  -${(churnARR / 1000).toFixed(0)}k
                </span>
              </div>

              {/* Step 5: Ending ARR (=) */}
              <div className="p-3.5 bg-indigo-900 text-white border-2 border-ink rounded-xl flex items-center justify-between shadow">
                <div>
                  <span className="text-indigo-300 block text-[10px] uppercase font-bold">= Ending Cohort ARR</span>
                  <span className="font-sans font-black text-white text-base">Net Retained Run-rate</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-300 text-base">
                    ${(endingARR / 1000000).toFixed(2)}M
                  </span>
                  <span className="block text-[10px] text-indigo-300 font-normal">
                    +${((endingARR - startingARR) / 1000000).toFixed(2)}M Net New
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-600 flex items-center justify-between">
            <span>NRR Formula: <code>Ending ARR / Starting ARR</code></span>
            <span className="font-mono font-bold text-emerald-700">Top Quartile (110%+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
