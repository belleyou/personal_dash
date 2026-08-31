import React, { useMemo, useState } from "react";
import {
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  Info,
  DollarSign,
  Calendar,
  LineChart as LineChartIcon,
  Filter,
  Milestone,
  Download
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";
import {
  GTMTelemetryRecord,
  TRADE_VERTICALS,
  HISTORICAL_FUNNEL_TRENDS,
  HistoricalFunnelPoint
} from "../data/gtmAnalyticsDataset";

interface FunnelConversionViewProps {
  data: GTMTelemetryRecord[];
}

export const FunnelConversionView: React.FC<FunnelConversionViewProps> = ({ data }) => {
  const [selectedTrade, setSelectedTrade] = useState<string>("All Trades");
  const [trendMetricMode, setTrendMetricMode] = useState<"conversion_rates" | "funnel_volumes" | "arr_growth">("conversion_rates");
  const [showMilestones, setShowMilestones] = useState<boolean>(true);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("All Quarters");

  const filteredData = useMemo(() => {
    if (selectedTrade === "All Trades") return data;
    return data.filter((r) => r.trade === selectedTrade);
  }, [data, selectedTrade]);

  // Funnel Stage Counts for Current Cohort
  const totalIngress = filteredData.length;
  const mqlCount = filteredData.filter((r) => r.stage !== "Lead Ingress").length;
  const sqlCount = filteredData.filter((r) => r.stage === "SQL" || r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost").length;
  const oppCount = filteredData.filter((r) => r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost").length;
  const wonCount = filteredData.filter((r) => r.stage === "Closed Won").length;
  const lostCount = filteredData.filter((r) => r.stage === "Closed Lost").length;

  const totalWonArr = useMemo(() => {
    const won = filteredData.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    if (won.length === 0) return "Null";
    return won.reduce((acc, r) => acc + (r.dealValue || 0), 0);
  }, [filteredData]);

  // Stage-to-stage pass-through percentages
  const leadToMqlPct = totalIngress > 0 ? ((mqlCount / totalIngress) * 100).toFixed(1) + "%" : "Null";
  const mqlToSqlPct = mqlCount > 0 ? ((sqlCount / mqlCount) * 100).toFixed(1) + "%" : "Null";
  const sqlToOppPct = sqlCount > 0 ? ((oppCount / sqlCount) * 100).toFixed(1) + "%" : "Null";
  const oppToWonPct = oppCount > 0 ? ((wonCount / oppCount) * 100).toFixed(1) + "%" : "Null";
  const overallLeadToWonPct = totalIngress > 0 ? ((wonCount / totalIngress) * 100).toFixed(1) + "%" : "Null";

  // Average Stage Dwell Times
  const avgSalesCycle = useMemo(() => {
    const closed = filteredData.filter((r) => r.salesCycleDays !== null && r.salesCycleDays !== undefined);
    if (closed.length === 0) return "Null";
    const avg = closed.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / closed.length;
    return Math.round(avg) + " Days";
  }, [filteredData]);

  // Filter historical trend series
  const filteredTrendData = useMemo(() => {
    if (selectedQuarter === "All Quarters") return HISTORICAL_FUNNEL_TRENDS;
    return HISTORICAL_FUNNEL_TRENDS.filter((p) => p.quarter === selectedQuarter);
  }, [selectedQuarter]);

  // Key historical trend statistics
  const firstPoint = HISTORICAL_FUNNEL_TRENDS[0];
  const latestPoint = HISTORICAL_FUNNEL_TRENDS[HISTORICAL_FUNNEL_TRENDS.length - 1];
  const conversionLift = (latestPoint.leadToWonPct - firstPoint.leadToWonPct).toFixed(2);
  const sqlWinLift = (latestPoint.sqlToWonPct - firstPoint.sqlToWonPct).toFixed(2);
  const cycleReductionDays = firstPoint.avgSalesCycleDays - latestPoint.avgSalesCycleDays;

  const handleExportHistoricalCSV = () => {
    const headers = [
      "Period",
      "Quarter",
      "Leads Ingress",
      "MQLs Qualified",
      "SQLs Validated",
      "Opportunities Created",
      "Closed Won Deals",
      "Lead-to-Won Conv %",
      "SQL-to-Won Conv %",
      "MQL-to-SQL Conv %",
      "Booked ARR ($)",
      "Avg Sales Cycle (Days)",
      "Speed to Lead (Mins)",
      "RevOps Milestone"
    ];

    const rows = filteredTrendData.map((d) => [
      `"${d.period}"`,
      `"${d.quarter}"`,
      d.leadsIngress,
      d.mqls,
      d.sqls,
      d.opportunities,
      d.closedWon,
      `${d.leadToWonPct}%`,
      `${d.sqlToWonPct}%`,
      `${d.mqlToSqlPct}%`,
      d.bookedArr,
      d.avgSalesCycleDays,
      d.speedToLeadMin,
      `"${d.milestone || "N/A"}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `funnel_conversion_historical_trends_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-600" />
            End-to-End Funnel Conversion Engine (Lead → SQL → Closed Won)
          </h3>
          <p className="font-sans text-xs text-zinc-500 mt-0.5">
            Stage progression waterfall, historical conversion trend line, drop-off analysis, and cycle velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500 font-bold">Trade Filter:</span>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="px-3 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
          >
            <option value="All Trades">All Trades & Verticals</option>
            {TRADE_VERTICALS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Stage Interactive Funnel Waterfall Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
        {/* Stage 1: Lead Ingress */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Stage 1</span>
              <span className="px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 font-mono text-[10px] font-bold">
                100% Ingress
              </span>
            </div>
            <h4 className="font-sans font-bold text-sm text-zinc-900">Lead Ingress</h4>
            <div className="font-hand text-3xl font-black text-ink mt-2">{totalIngress}</div>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-100 font-sans text-[10px] text-zinc-500">
            Raw inquiries captured across all channels.
          </div>
        </div>

        {/* Stage 2: MQL Qualified */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Stage 2</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono text-[10px] font-bold">
                {leadToMqlPct} Pass
              </span>
            </div>
            <h4 className="font-sans font-bold text-sm text-zinc-900">MQL Qualified</h4>
            <div className="font-hand text-3xl font-black text-ink mt-2">{mqlCount}</div>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-100 font-sans text-[10px] text-zinc-500">
            Scoring threshold & ICP fit verified.
          </div>
        </div>

        {/* Stage 3: SQL Validated */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Stage 3</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-900 font-mono text-[10px] font-bold">
                {mqlToSqlPct} Pass
              </span>
            </div>
            <h4 className="font-sans font-bold text-sm text-zinc-900">SQL Validated</h4>
            <div className="font-hand text-3xl font-black text-ink mt-2">{sqlCount}</div>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-100 font-sans text-[10px] text-zinc-500">
            BANT accepted by sales rep.
          </div>
        </div>

        {/* Stage 4: Active Opportunity */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Stage 4</span>
              <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-900 font-mono text-[10px] font-bold">
                {sqlToOppPct} Pass
              </span>
            </div>
            <h4 className="font-sans font-bold text-sm text-zinc-900">Opportunity</h4>
            <div className="font-hand text-3xl font-black text-ink mt-2">{oppCount}</div>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-100 font-sans text-[10px] text-zinc-500">
            CPQ Quoting & commercial demo underway.
          </div>
        </div>

        {/* Stage 5: Closed Won */}
        <div className="bg-emerald-50 border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase">Stage 5</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-950 font-mono text-[10px] font-bold">
                {oppToWonPct} Win
              </span>
            </div>
            <h4 className="font-sans font-bold text-sm text-emerald-950">Closed Won</h4>
            <div className="font-hand text-3xl font-black text-emerald-900 mt-2">{wonCount}</div>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-200 font-sans text-[10px] text-emerald-800 font-bold">
            ARR: {totalWonArr !== "Null" ? `$${(totalWonArr as number).toLocaleString()}` : "Null"}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISUAL TREND LINE CHART: Funnel Conversion Historical Performance Over Time */}
      {/* ========================================================================= */}
      <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-hand text-lg font-bold text-ink">
                Funnel Conversion Trend Analysis (Lead → SQL → Closed Won Over Time)
              </h3>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded font-mono text-[10px] font-bold">
                Jan 2026 – Aug 2026
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Longitudinal tracking of conversion efficiency, stage velocity, and closed-won throughput across monthly RevOps cohorts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Mode Toggle */}
            <div className="flex bg-zinc-100 p-1 rounded-xl border-2 border-ink">
              <button
                onClick={() => setTrendMetricMode("conversion_rates")}
                className={`px-2.5 py-1 rounded-lg text-xs font-hand font-bold transition-all cursor-pointer ${
                  trendMetricMode === "conversion_rates"
                    ? "bg-[#1c4039] text-white shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Conversion Rates (%)
              </button>
              <button
                onClick={() => setTrendMetricMode("funnel_volumes")}
                className={`px-2.5 py-1 rounded-lg text-xs font-hand font-bold transition-all cursor-pointer ${
                  trendMetricMode === "funnel_volumes"
                    ? "bg-[#1c4039] text-white shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Funnel Volumes (Counts)
              </button>
              <button
                onClick={() => setTrendMetricMode("arr_growth")}
                className={`px-2.5 py-1 rounded-lg text-xs font-hand font-bold transition-all cursor-pointer ${
                  trendMetricMode === "arr_growth"
                    ? "bg-[#1c4039] text-white shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Booked ARR ($)
              </button>
            </div>

            {/* Quarter Filter */}
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-2.5 py-1 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
            >
              <option value="All Quarters">All Quarters (YTD 2026)</option>
              <option value="Q1 2026">Q1 2026 (Jan–Mar)</option>
              <option value="Q2 2026">Q2 2026 (Apr–Jun)</option>
              <option value="Q3 2026">Q3 2026 (Jul–Aug)</option>
            </select>

            {/* Export CSV */}
            <button
              onClick={handleExportHistoricalCSV}
              className="px-2.5 py-1 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1"
              title="Export historical trend dataset"
            >
              <Download className="h-3.5 w-3.5 text-zinc-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Historical Highlights Metric Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">
              Lead → Won Conversion Lift
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hand text-2xl font-black text-emerald-950">+{conversionLift}%</span>
              <span className="font-mono text-xs text-emerald-700">
                ({firstPoint.leadToWonPct}% → {latestPoint.leadToWonPct}%)
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-sans block mt-0.5">
              3.39x historical throughput expansion
            </span>
          </div>

          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-blue-800 uppercase block">
              SQL → Closed Won Win Rate
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hand text-2xl font-black text-blue-950">+{sqlWinLift}%</span>
              <span className="font-mono text-xs text-blue-700">
                ({firstPoint.sqlToWonPct}% → {latestPoint.sqlToWonPct}%)
              </span>
            </div>
            <span className="text-[10px] text-blue-700 font-sans block mt-0.5">
              Reflects higher lead qualification accuracy
            </span>
          </div>

          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-purple-800 uppercase block">
              Sales Cycle Acceleration
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hand text-2xl font-black text-purple-950">-{cycleReductionDays} Days</span>
              <span className="font-mono text-xs text-purple-700">
                ({firstPoint.avgSalesCycleDays}d → {latestPoint.avgSalesCycleDays}d)
              </span>
            </div>
            <span className="text-[10px] text-purple-700 font-sans block mt-0.5">
              50% reduction in lead-to-close latency
            </span>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-amber-800 uppercase block">
              Speed to Lead SLA
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-hand text-2xl font-black text-amber-950">5.4 mins</span>
              <span className="font-mono text-xs text-amber-700">
                (Down from 42.5m)
              </span>
            </div>
            <span className="text-[10px] text-amber-700 font-sans block mt-0.5">
              Powered by Lemlist & Outbound AI Swarm
            </span>
          </div>
        </div>

        {/* Recharts Trend Line Graph */}
        <div className="h-[340px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {trendMetricMode === "conversion_rates" ? (
              <LineChart data={filteredTrendData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis
                  dataKey="shortPeriod"
                  tick={{ fill: "#52525b", fontSize: 11, fontWeight: "bold" }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                />
                <YAxis
                  unit="%"
                  tick={{ fill: "#52525b", fontSize: 11 }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const dataPoint = payload[0].payload as HistoricalFunnelPoint;
                      return (
                        <div className="bg-white border-2 border-ink rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] font-sans text-xs space-y-1.5 min-w-[220px]">
                          <div className="flex items-center justify-between border-b border-zinc-200 pb-1">
                            <span className="font-bold text-zinc-900">{dataPoint.period}</span>
                            <span className="font-mono text-[10px] text-zinc-500 font-bold">{dataPoint.quarter}</span>
                          </div>
                          <div className="space-y-1 pt-1">
                            <div className="flex justify-between items-center text-emerald-800">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-600 inline-block"></span>
                                Lead → Won Rate:
                              </span>
                              <span className="font-bold font-mono">{dataPoint.leadToWonPct}%</span>
                            </div>
                            <div className="flex justify-between items-center text-blue-800">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-blue-600 inline-block"></span>
                                SQL → Won Rate:
                              </span>
                              <span className="font-bold font-mono">{dataPoint.sqlToWonPct}%</span>
                            </div>
                            <div className="flex justify-between items-center text-amber-800">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-amber-500 inline-block"></span>
                                MQL → SQL Pass:
                              </span>
                              <span className="font-bold font-mono">{dataPoint.mqlToSqlPct}%</span>
                            </div>
                            <div className="flex justify-between items-center text-purple-800">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-purple-600 inline-block"></span>
                                Opp → Won Win:
                              </span>
                              <span className="font-bold font-mono">{dataPoint.oppToWonPct}%</span>
                            </div>
                          </div>
                          {dataPoint.milestone && (
                            <div className="mt-2 pt-1.5 border-t border-dashed border-zinc-200 text-[10px] text-indigo-700 font-medium">
                              🚀 <span className="font-bold">Milestone:</span> {dataPoint.milestone}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px", fontFamily: "sans-serif" }} />
                <Line
                  type="monotone"
                  dataKey="leadToWonPct"
                  name="Lead → Closed Won Rate (%)"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#059669", stroke: "#18181b", strokeWidth: 1.5 }}
                  activeDot={{ r: 8, stroke: "#18181b", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="sqlToWonPct"
                  name="SQL → Closed Won Win Rate (%)"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  strokeDasharray="4 2"
                  dot={{ r: 4, fill: "#2563eb" }}
                />
                <Line
                  type="monotone"
                  dataKey="mqlToSqlPct"
                  name="MQL → SQL Acceptance (%)"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#f59e0b" }}
                />
                <Line
                  type="monotone"
                  dataKey="oppToWonPct"
                  name="Opp → Closed Won (%)"
                  stroke="#9333ea"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={{ r: 3, fill: "#9333ea" }}
                />
              </LineChart>
            ) : trendMetricMode === "funnel_volumes" ? (
              <AreaChart data={filteredTrendData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis
                  dataKey="shortPeriod"
                  tick={{ fill: "#52525b", fontSize: 11, fontWeight: "bold" }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                />
                <YAxis
                  tick={{ fill: "#52525b", fontSize: 11 }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataPoint = payload[0].payload as HistoricalFunnelPoint;
                      return (
                        <div className="bg-white border-2 border-ink rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] font-sans text-xs space-y-1 min-w-[200px]">
                          <span className="font-bold text-zinc-900 block border-b border-zinc-200 pb-1">
                            {dataPoint.period}
                          </span>
                          <div className="flex justify-between text-zinc-700">
                            <span>Leads Ingress:</span>
                            <span className="font-bold font-mono">{dataPoint.leadsIngress.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-amber-700">
                            <span>MQLs Qualified:</span>
                            <span className="font-bold font-mono">{dataPoint.mqls.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-blue-700">
                            <span>SQLs Validated:</span>
                            <span className="font-bold font-mono">{dataPoint.sqls.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-purple-700">
                            <span>Opportunities:</span>
                            <span className="font-bold font-mono">{dataPoint.opportunities.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-emerald-700 font-bold border-t border-zinc-100 pt-1">
                            <span>Closed Won:</span>
                            <span className="font-mono">{dataPoint.closedWon.toLocaleString()} deals</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                <Area
                  type="monotone"
                  dataKey="leadsIngress"
                  name="Leads Ingress"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  fillOpacity={0.4}
                />
                <Area
                  type="monotone"
                  dataKey="sqls"
                  name="SQLs Validated"
                  stroke="#8b5cf6"
                  fill="#c4b5fd"
                  fillOpacity={0.5}
                />
                <Area
                  type="monotone"
                  dataKey="closedWon"
                  name="Closed Won Deals"
                  stroke="#10b981"
                  fill="#6ee7b7"
                  fillOpacity={0.8}
                />
              </AreaChart>
            ) : (
              <AreaChart data={filteredTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                <XAxis
                  dataKey="shortPeriod"
                  tick={{ fill: "#52525b", fontSize: 11, fontWeight: "bold" }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                />
                <YAxis
                  tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
                  tick={{ fill: "#52525b", fontSize: 11 }}
                  axisLine={{ stroke: "#18181b", strokeWidth: 1.5 }}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, "Booked ARR"]}
                  labelFormatter={(lbl) => `Period: ${lbl}`}
                />
                <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                <Area
                  type="monotone"
                  dataKey="bookedArr"
                  name="Booked ARR ($ USD)"
                  stroke="#047857"
                  fill="#a7f3d0"
                  fillOpacity={0.6}
                  strokeWidth={2.5}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Milestone Chronology Timeline */}
        <div className="bg-zinc-50 border-2 border-zinc-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-hand text-sm font-bold text-zinc-900 flex items-center gap-1.5">
              <Milestone className="h-4 w-4 text-indigo-600" />
              RevOps & GTM Architecture Milestones Driving Conversion Velocity
            </span>
            <span className="font-mono text-[10px] text-zinc-500">Chronological Evolution</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-white border-2 border-zinc-200 rounded-lg p-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Jan 2026</span>
                <span className="font-mono text-[10px] text-zinc-400">Baseline</span>
              </div>
              <p className="text-zinc-600 text-[11px]">Manual SDR lead routing; 42.5 min speed-to-lead SLA.</p>
              <div className="font-mono font-bold text-zinc-800 text-[10px] pt-1">Conv: 3.75%</div>
            </div>

            <div className="bg-white border-2 border-zinc-200 rounded-lg p-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Mar 2026</span>
                <span className="font-mono text-[10px] text-blue-600 font-bold">+1.58% Lift</span>
              </div>
              <p className="text-zinc-600 text-[11px]">Automated ICP domain matching and fuzzy enrichment active.</p>
              <div className="font-mono font-bold text-zinc-800 text-[10px] pt-1">Conv: 5.33%</div>
            </div>

            <div className="bg-white border-2 border-emerald-300 bg-emerald-50/40 rounded-lg p-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950">May 2026</span>
                <span className="font-mono text-[10px] text-emerald-700 font-bold">+2.48% Lift</span>
              </div>
              <p className="text-zinc-700 text-[11px]">Launched Lemlist multi-channel sequences & Lemwarm inbox health.</p>
              <div className="font-mono font-bold text-emerald-800 text-[10px] pt-1">Conv: 7.81%</div>
            </div>

            <div className="bg-white border-2 border-indigo-300 bg-indigo-50/40 rounded-lg p-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-950">Jul–Aug 2026</span>
                <span className="font-mono text-[10px] text-indigo-700 font-bold">+4.91% Lift</span>
              </div>
              <p className="text-zinc-700 text-[11px]">Lucid CPQ diagramming & autonomous RevOps SSoT routing live.</p>
              <div className="font-mono font-bold text-indigo-800 text-[10px] pt-1">Conv: 12.72%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stage Transition Analysis & Pass-Through Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2 flex items-center justify-between">
            <span>Stage-to-Stage Pass-Through Metrics</span>
            <span className="font-mono text-xs font-bold text-emerald-700">
              End-to-End: {overallLeadToWonPct}
            </span>
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <strong className="font-sans text-zinc-900">Lead → MQL Qualification</strong>
                <p className="text-zinc-500 text-[11px]">Automated enrich & scoring filter</p>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-indigo-700 text-sm">{leadToMqlPct}</span>
                <p className="text-zinc-400 text-[10px]">{mqlCount} / {totalIngress} leads</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <strong className="font-sans text-zinc-900">MQL → SQL Acceptance</strong>
                <p className="text-zinc-500 text-[11px]">Sales discovery & BANT verification</p>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-amber-700 text-sm">{mqlToSqlPct}</span>
                <p className="text-zinc-400 text-[10px]">{sqlCount} / {mqlCount} MQLs</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <strong className="font-sans text-zinc-900">SQL → Opportunity Creation</strong>
                <p className="text-zinc-500 text-[11px]">CPQ estimation & quote delivery</p>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-purple-700 text-sm">{sqlToOppPct}</span>
                <p className="text-zinc-400 text-[10px]">{oppCount} / {sqlCount} SQLs</p>
              </div>
            </div>

            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl flex items-center justify-between text-xs">
              <div>
                <strong className="font-sans text-zinc-900">Opportunity → Closed Won</strong>
                <p className="text-zinc-500 text-[11px]">Executive approval & contract sign-off</p>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-emerald-700 text-sm">{oppToWonPct}</span>
                <p className="text-zinc-400 text-[10px]">{wonCount} won / {oppCount} opps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Funnel Bottleneck & Cycle Velocity */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2">
            Funnel Velocity & Dwell Time
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl">
              <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold">Avg Sales Cycle</span>
              <div className="font-hand text-2xl font-black text-ink mt-1">{avgSalesCycle}</div>
              <span className="font-sans text-[10px] text-zinc-500">MQL creation to close</span>
            </div>

            <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl">
              <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold">Lost Opportunities</span>
              <div className="font-hand text-2xl font-black text-rose-600 mt-1">{lostCount} Deals</div>
              <span className="font-sans text-[10px] text-zinc-500">Closed lost in cohort</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border-2 border-amber-200 rounded-xl text-xs space-y-1">
            <strong className="text-amber-900 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-700" />
              Funnel Friction Insights
            </strong>
            <p className="text-amber-800">
              MQL-to-SQL drop-off is lowest when Outbound AI swarms handle preliminary qualification, accelerating transition velocity by 4.2x compared to standard email outreach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
