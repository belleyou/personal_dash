import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Zap,
  Target,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
  Sliders,
  CheckCircle2,
  RefreshCw,
  BarChart3,
  Award
} from "lucide-react";
import { GTMTelemetryRecord, TRADE_VERTICALS } from "../data/gtmAnalyticsDataset";

interface SalesEfficiencyViewProps {
  data: GTMTelemetryRecord[];
}

export const SalesEfficiencyView: React.FC<SalesEfficiencyViewProps> = ({ data }) => {
  // Win Rate
  const winRate = useMemo(() => {
    const closed = data.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
    if (closed.length === 0) return "Null";
    const won = closed.filter((r) => r.stage === "Closed Won").length;
    return ((won / closed.length) * 100).toFixed(1);
  }, [data]);

  // Average Contract Value (ACV)
  const avgAcv = useMemo(() => {
    const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    if (won.length === 0) return "Null";
    const sum = won.reduce((acc, r) => acc + (r.dealValue || 0), 0);
    return Math.round(sum / won.length);
  }, [data]);

  // Sales Cycle Days
  const avgSalesCycle = useMemo(() => {
    const valid = data.filter((r) => r.salesCycleDays !== null && r.salesCycleDays !== undefined);
    if (valid.length === 0) return "Null";
    const sum = valid.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0);
    return Math.round(sum / valid.length);
  }, [data]);

  // Open Opportunities count
  const openOppsCount = useMemo(() => {
    return data.filter((r) => r.stage === "Opportunity").length;
  }, [data]);

  // Calculated Pipeline Velocity: (Opps * WinRate * ACV) / Days
  const calculatedPipelineVelocity = useMemo(() => {
    if (winRate === "Null" || avgAcv === "Null" || avgSalesCycle === "Null" || openOppsCount === 0) {
      return "Null";
    }
    const winRateDec = Number(winRate) / 100;
    const acvNum = Number(avgAcv);
    const cycleNum = Number(avgSalesCycle);
    if (cycleNum === 0) return "Null";

    const velocity = (openOppsCount * winRateDec * acvNum) / cycleNum;
    return Math.round(velocity);
  }, [winRate, avgAcv, avgSalesCycle, openOppsCount]);

  // Net Revenue Retention (NRR) Calculation
  const nrrStats = useMemo(() => {
    const activeWithArr = data.filter((r) => r.startingArr !== null && r.startingArr > 0);
    if (activeWithArr.length === 0) {
      return {
        startingArr: 0,
        expansionArr: 0,
        churnArr: 0,
        endingArr: 0,
        nrrPct: "Null",
        grrPct: "Null"
      };
    }

    const startingArr = activeWithArr.reduce((acc, r) => acc + (r.startingArr || 0), 0);
    const expansionArr = activeWithArr.reduce((acc, r) => acc + (r.expansionArr || 0), 0);
    const churnArr = activeWithArr.reduce((acc, r) => acc + (r.churnArr || 0), 0);
    const endingArr = startingArr + expansionArr - churnArr;

    const nrrPct = startingArr > 0 ? ((endingArr / startingArr) * 100).toFixed(1) + "%" : "Null";
    const grrPct = startingArr > 0 ? (((startingArr - churnArr) / startingArr) * 100).toFixed(1) + "%" : "Null";

    return {
      startingArr,
      expansionArr,
      churnArr,
      endingArr,
      nrrPct,
      grrPct
    };
  }, [data]);

  // Interactive Pipeline Velocity Simulator State
  const [simOpps, setSimOpps] = useState<number>(openOppsCount || 6);
  const [simWinRate, setSimWinRate] = useState<number>(Number(winRate !== "Null" ? winRate : 38));
  const [simAcv, setSimAcv] = useState<number>(Number(avgAcv !== "Null" ? avgAcv : 185000));
  const [simCycleDays, setSimCycleDays] = useState<number>(Number(avgSalesCycle !== "Null" ? avgSalesCycle : 32));

  const simulatedVelocity = useMemo(() => {
    if (simCycleDays === 0) return 0;
    return Math.round((simOpps * (simWinRate / 100) * simAcv) / simCycleDays);
  }, [simOpps, simWinRate, simAcv, simCycleDays]);

  return (
    <div className="space-y-6">
      {/* Top 4-KPI Metric Ribbon for Sales Efficiency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Opportunity Win Rate */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Opportunity Win Rate</span>
              <Target className="h-4 w-4 text-purple-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {winRate !== "Null" ? `${winRate}%` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Won / (Won + Lost)</span>
            <span className="text-purple-700 font-bold font-mono">Efficiency</span>
          </div>
        </div>

        {/* Metric 2: Pipeline Velocity */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Pipeline Velocity ($/day)</span>
              <Zap className="h-4 w-4 text-blue-600" />
            </div>
            <div className="font-hand text-3xl font-black text-blue-900">
              {calculatedPipelineVelocity !== "Null" ? `$${(calculatedPipelineVelocity as number).toLocaleString()}/day` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>(Opps × Win% × ACV) / Days</span>
            <span className="text-blue-700 font-bold font-mono">Daily ARR Inflow</span>
          </div>
        </div>

        {/* Metric 3: Average Contract Value (ACV) */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Average Contract Value (ACV)</span>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {avgAcv !== "Null" ? `$${(avgAcv as number).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>ARR per closed won deal</span>
            <span className="text-emerald-700 font-bold font-mono">Deal Sizing</span>
          </div>
        </div>

        {/* Metric 4: Net Revenue Retention (NRR) */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Net Revenue Retention (NRR)</span>
              <TrendingUp className="h-4 w-4 text-teal-600" />
            </div>
            <div className="font-hand text-3xl font-black text-teal-900">
              {nrrStats.nrrPct !== "Null" ? nrrStats.nrrPct : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Expansion vs Churn</span>
            <span className="text-teal-700 font-bold font-mono">GRR: {nrrStats.grrPct}</span>
          </div>
        </div>
      </div>

      {/* Interactive Pipeline Velocity Calculator & Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
            <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <Sliders className="h-5 w-5 text-indigo-600" />
              Interactive Pipeline Velocity Simulator
            </h3>
            <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold">
              Dynamic Model
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1">
                <span>1. Open Opportunities in Pipeline:</span>
                <span className="font-mono text-indigo-700">{simOpps} Opps</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={simOpps}
                onChange={(e) => setSimOpps(Number(e.target.value))}
                className="w-full cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1">
                <span>2. Opportunity Win Rate (%):</span>
                <span className="font-mono text-purple-700">{simWinRate}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={80}
                value={simWinRate}
                onChange={(e) => setSimWinRate(Number(e.target.value))}
                className="w-full cursor-pointer accent-purple-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1">
                <span>3. Average Contract Value (ACV):</span>
                <span className="font-mono text-emerald-700">${simAcv.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={20000}
                max={500000}
                step={5000}
                value={simAcv}
                onChange={(e) => setSimAcv(Number(e.target.value))}
                className="w-full cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-zinc-800 mb-1">
                <span>4. Sales Cycle Length (Days):</span>
                <span className="font-mono text-amber-700">{simCycleDays} Days</span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                value={simCycleDays}
                onChange={(e) => setSimCycleDays(Number(e.target.value))}
                className="w-full cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-900 text-white rounded-xl border-2 border-ink space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-400">Simulated Daily Revenue Inflow:</span>
              <span className="font-hand text-2xl font-black text-emerald-400 font-mono">
                ${simulatedVelocity.toLocaleString()} / day
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 border-t border-zinc-800 font-mono">
              <span>Annualized Pipeline Run Rate:</span>
              <strong className="text-zinc-200">${(simulatedVelocity * 365).toLocaleString()} ARR</strong>
            </div>
          </div>
        </div>

        {/* NRR & GRR Retention Waterfall */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
            <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-600" />
              Net Revenue Retention (NRR) Waterfall
            </h3>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold">
              Cohort Analysis
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-zinc-700">1. Starting Contracted ARR</span>
              <span className="font-mono font-bold text-zinc-900">${nrrStats.startingArr.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-emerald-900">+ Expansion & Upsell ARR</span>
              <span className="font-mono font-bold text-emerald-700">+${nrrStats.expansionArr.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-rose-50 border-2 border-rose-200 rounded-xl flex items-center justify-between text-xs">
              <span className="font-sans font-bold text-rose-900">- Contraction & Logo Churn</span>
              <span className="font-mono font-bold text-rose-600">-${nrrStats.churnArr.toLocaleString()}</span>
            </div>

            <div className="p-3 bg-zinc-100 border-2 border-ink rounded-xl flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-900">Ending Period ARR</span>
              <span className="font-mono text-emerald-700 text-sm">${nrrStats.endingArr.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-teal-50 border-2 border-teal-200 rounded-xl text-center">
              <span className="font-mono text-[10px] font-bold text-teal-800 uppercase">Net Retention (NRR)</span>
              <div className="font-hand text-2xl font-black text-teal-900 mt-1">{nrrStats.nrrPct}</div>
            </div>
            <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
              <span className="font-mono text-[10px] font-bold text-blue-800 uppercase">Gross Retention (GRR)</span>
              <div className="font-hand text-2xl font-black text-blue-900 mt-1">{nrrStats.grrPct}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
