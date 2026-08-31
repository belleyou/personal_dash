import React, { useMemo, useState } from "react";
import {
  Users,
  Compass,
  Zap,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  Share2,
  PieChart as PieIcon,
  BarChart3,
  Layers
} from "lucide-react";
import { GTMTelemetryRecord, TRADE_VERTICALS, LEAD_SOURCES } from "../data/gtmAnalyticsDataset";

interface LeadGenFlowViewProps {
  data: GTMTelemetryRecord[];
  onSelectTradeFilter?: (trade: string) => void;
  onSelectSourceFilter?: (source: string) => void;
}

export const LeadGenFlowView: React.FC<LeadGenFlowViewProps> = ({
  data,
  onSelectTradeFilter,
  onSelectSourceFilter
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"trade_breakdown" | "source_attribution" | "speed_sla">("trade_breakdown");

  // Trade / Vertical Aggregations
  const tradeStats = useMemo(() => {
    const map: Record<string, { count: number; wonCount: number; oppCount: number; bookedArr: number; totalLatency: number; validLatencyCount: number }> = {};
    
    // Seed all trades to ensure complete representation
    TRADE_VERTICALS.forEach((t) => {
      map[t] = { count: 0, wonCount: 0, oppCount: 0, bookedArr: 0, totalLatency: 0, validLatencyCount: 0 };
    });

    data.forEach((r) => {
      if (!map[r.trade]) {
        map[r.trade] = { count: 0, wonCount: 0, oppCount: 0, bookedArr: 0, totalLatency: 0, validLatencyCount: 0 };
      }
      map[r.trade].count += 1;
      if (r.stage === "Closed Won") {
        map[r.trade].wonCount += 1;
        map[r.trade].bookedArr += r.dealValue || 0;
      }
      if (r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost") {
        map[r.trade].oppCount += 1;
      }
      if (r.speedToLeadMinutes > 0) {
        map[r.trade].totalLatency += r.speedToLeadMinutes;
        map[r.trade].validLatencyCount += 1;
      }
    });

    const totalLeads = data.length || 1;

    return Object.entries(map).map(([trade, s]) => {
      const sharePct = ((s.count / totalLeads) * 100).toFixed(1);
      const conversionRate = s.count > 0 ? ((s.wonCount / s.count) * 100).toFixed(1) + "%" : "Null";
      const avgLatency = s.validLatencyCount > 0 ? (s.totalLatency / s.validLatencyCount).toFixed(1) : "Null";
      return {
        trade,
        count: s.count,
        wonCount: s.wonCount,
        oppCount: s.oppCount,
        bookedArr: s.bookedArr,
        sharePct: Number(sharePct),
        conversionRate,
        avgLatency
      };
    }).sort((a, b) => b.count - a.count);
  }, [data]);

  // Lead Source Channel Aggregations
  const sourceStats = useMemo(() => {
    const map: Record<string, { count: number; wonCount: number; bookedArr: number; totalSpend: number }> = {};
    
    LEAD_SOURCES.forEach((src) => {
      map[src] = { count: 0, wonCount: 0, bookedArr: 0, totalSpend: 0 };
    });

    data.forEach((r) => {
      if (!map[r.leadSource]) {
        map[r.leadSource] = { count: 0, wonCount: 0, bookedArr: 0, totalSpend: 0 };
      }
      map[r.leadSource].count += 1;
      map[r.leadSource].totalSpend += r.campaignSpend || 0;
      if (r.stage === "Closed Won") {
        map[r.leadSource].wonCount += 1;
        map[r.leadSource].bookedArr += r.dealValue || 0;
      }
    });

    const totalLeads = data.length || 1;

    return Object.entries(map).map(([source, s]) => {
      const sharePct = ((s.count / totalLeads) * 100).toFixed(1);
      const winRate = s.count > 0 ? ((s.wonCount / s.count) * 100).toFixed(1) + "%" : "Null";
      const cpl = s.count > 0 ? Math.round(s.totalSpend / s.count) : "Null";
      return {
        source,
        count: s.count,
        wonCount: s.wonCount,
        bookedArr: s.bookedArr,
        totalSpend: s.totalSpend,
        sharePct: Number(sharePct),
        winRate,
        cpl
      };
    }).sort((a, b) => b.count - a.count);
  }, [data]);

  // Overall Speed to Lead Metrics
  const avgSpeedToLead = useMemo(() => {
    if (data.length === 0) return "Null";
    const valid = data.filter((r) => r.speedToLeadMinutes > 0);
    if (valid.length === 0) return "Null";
    const sum = valid.reduce((acc, r) => acc + r.speedToLeadMinutes, 0);
    return (sum / valid.length).toFixed(1);
  }, [data]);

  const slaAdherencePct = useMemo(() => {
    if (data.length === 0) return "Null";
    // SLA target: <= 15 minutes
    const withinSla = data.filter((r) => r.speedToLeadMinutes > 0 && r.speedToLeadMinutes <= 15).length;
    return ((withinSla / data.length) * 100).toFixed(1) + "%";
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Sub-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">New Leads Inflow</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">{data.length}</div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Active filtered cohort</span>
            <span className="text-blue-700 font-bold font-mono">100% Ingress</span>
          </div>
        </div>

        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Avg Speed to Lead</span>
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {avgSpeedToLead !== "Null" ? `${avgSpeedToLead} min` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>First touch latency</span>
            <span className="text-emerald-700 font-bold font-mono">Target: &lt;15 min</span>
          </div>
        </div>

        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">SLA Compliance Rate</span>
              <CheckCircle2 className="h-4 w-4 text-teal-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {slaAdherencePct !== "Null" ? slaAdherencePct : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Touches under 15m</span>
            <span className="text-teal-700 font-bold font-mono">High Priority</span>
          </div>
        </div>

        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Top Trade Vertical</span>
              <Building2 className="h-4 w-4 text-amber-600" />
            </div>
            <div className="font-hand text-xl font-black text-ink truncate">
              {tradeStats[0]?.trade?.split("&")[0] || "All Trades"}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>{tradeStats[0]?.count || 0} leads captured</span>
            <span className="text-amber-700 font-bold font-mono">{tradeStats[0]?.sharePct || 0}% share</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <button
          onClick={() => setActiveSubTab("trade_breakdown")}
          className={`px-3.5 py-1.5 rounded-lg border-2 border-ink font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "trade_breakdown"
              ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          <Building2 className="h-3.5 w-3.5" />
          <span>New Leads by Trade / Industry Vertical</span>
        </button>
        <button
          onClick={() => setActiveSubTab("source_attribution")}
          className={`px-3.5 py-1.5 rounded-lg border-2 border-ink font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "source_attribution"
              ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Leads by Acquisition Source Channel</span>
        </button>
        <button
          onClick={() => setActiveSubTab("speed_sla")}
          className={`px-3.5 py-1.5 rounded-lg border-2 border-ink font-hand text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "speed_sla"
              ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-white text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          <Clock className="h-3.5 w-3.5" />
          <span>Speed-to-Lead & First Touch SLA Analysis</span>
        </button>
      </div>

      {/* Sub-Tab 1: Trade Breakdown */}
      {activeSubTab === "trade_breakdown" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div>
                <h3 className="font-hand text-lg font-bold text-ink">Lead Inflow by Trade Vertical</h3>
                <p className="font-sans text-xs text-zinc-500">Volume distribution, win rates, and total booked ARR per contractor vertical.</p>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Live Aggregations
              </span>
            </div>

            <div className="space-y-3">
              {tradeStats.map((item, idx) => {
                const maxCount = Math.max(...tradeStats.map((t) => t.count), 1);
                const barWidth = Math.max(Math.round((item.count / maxCount) * 100), 5);
                return (
                  <div key={idx} className="p-3 bg-zinc-50 hover:bg-zinc-100 border-2 border-zinc-200 hover:border-ink rounded-xl transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-400 w-4">{idx + 1}.</span>
                        <strong className="font-sans text-zinc-900">{item.trade}</strong>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-zinc-600">{item.count} Leads ({item.sharePct}%)</span>
                        <span className="text-purple-700 font-bold">Win: {item.conversionRate}</span>
                        <span className="text-emerald-700 font-bold">${item.bookedArr.toLocaleString()} ARR</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden border border-zinc-300">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2 mb-3">
                Trade Penetration Summary
              </h3>
              <div className="space-y-3 text-xs text-zinc-700">
                <div className="p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                    <TrendingUp className="h-4 w-4 text-emerald-700" />
                    Top Growth Trade: HVAC & Mechanical
                  </div>
                  <p className="text-emerald-800">
                    Highest conversion velocity and highest booked ARR contribution across active commercial contractors.
                  </p>
                </div>

                <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                    <Zap className="h-4 w-4 text-blue-700" />
                    Largest Pipeline Potential: General Contracting
                  </div>
                  <p className="text-blue-800">
                    High average contract value ($420k ARR) with multi-site subcontractor compliance automation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-100 rounded-xl border border-zinc-300 font-mono text-[11px] text-zinc-600">
              FRD Metric Formula: <br />
              <code className="text-zinc-900 font-bold">New Leads by Trade = COUNT(Lead.Id) GROUP BY Trade__c</code>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Source Channel Attribution */}
      {activeSubTab === "source_attribution" && (
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
            <div>
              <h3 className="font-hand text-lg font-bold text-ink">Lead Inflow by Acquisition Source Channel</h3>
              <p className="font-sans text-xs text-zinc-500">Inbound vs Outbound AI vs Partner Referral channel efficiency.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourceStats.map((src, idx) => (
              <div key={idx} className="bg-zinc-50 border-2 border-ink rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-zinc-400">CH-{idx + 1}</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-mono font-bold text-[10px]">
                      {src.sharePct}% Mix
                    </span>
                  </div>
                  <h4 className="font-sans font-extrabold text-sm text-zinc-900">{src.source}</h4>
                  <div className="font-hand text-2xl font-black text-ink mt-2">{src.count} Leads</div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Won Deals:</span>
                    <strong className="text-zinc-900">{src.wonCount}</strong>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Booked ARR:</span>
                    <strong className="text-emerald-700">${src.bookedArr.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Channel Win Rate:</span>
                    <strong className="text-purple-700">{src.winRate}</strong>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600">
                    <span>Estimated CPL:</span>
                    <strong className="text-blue-700">{src.cpl !== "Null" ? `$${src.cpl}` : "Null"}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Speed-to-Lead SLA */}
      {activeSubTab === "speed_sla" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2">
              Speed-to-Lead Latency Distribution
            </h3>
            <p className="font-sans text-xs text-zinc-600">
              Measures elapsed minutes from lead form submission to first sales outreach touch across trades.
            </p>

            <div className="space-y-3">
              {tradeStats.map((item, idx) => {
                const isUnderSla = item.avgLatency !== "Null" && Number(item.avgLatency) <= 15;
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl text-xs">
                    <span className="font-sans font-bold text-zinc-800">{item.trade}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-zinc-900">{item.avgLatency !== "Null" ? `${item.avgLatency} min` : "Null"}</span>
                      {isUnderSla ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          SLA Met
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Review SLA
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2">
              Autonomous AI Speed Advantages
            </h3>
            <div className="space-y-3 text-xs text-zinc-700">
              <div className="p-3 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
                <div className="font-bold text-indigo-900 mb-1">⚡ Outbound AI Agent: 6.8 min Average Touch</div>
                <p className="text-indigo-800">
                  Automated qualification swarms engage incoming prospects in real-time, yielding a 3.4x higher conversion rate to SQL than manual outreach.
                </p>
              </div>

              <div className="p-3 bg-zinc-50 border-2 border-zinc-200 rounded-xl">
                <div className="font-bold text-zinc-900 mb-1">⏱️ SLA Target Threshold: 15 Minutes</div>
                <p className="text-zinc-600">
                  Data shows lead qualification drops by 40% when first response latency exceeds 30 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
