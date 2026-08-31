import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Calculator,
  Percent,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { CAMPAIGN_SUMMARIES, CampaignSummary, GTMTelemetryRecord } from "../data/gtmAnalyticsDataset";

interface CampaignPerformanceViewProps {
  data: GTMTelemetryRecord[];
}

export const CampaignPerformanceView: React.FC<CampaignPerformanceViewProps> = ({ data }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>("All Channels");

  // Summary Metrics from Campaign Summaries
  const filteredCampaigns = useMemo(() => {
    if (selectedChannel === "All Channels") return CAMPAIGN_SUMMARIES;
    return CAMPAIGN_SUMMARIES.filter((c) => c.channel === selectedChannel);
  }, [selectedChannel]);

  const totalSpend = useMemo(() => {
    return filteredCampaigns.reduce((acc, c) => acc + c.totalSpend, 0);
  }, [filteredCampaigns]);

  const totalLeads = useMemo(() => {
    return filteredCampaigns.reduce((acc, c) => acc + c.leadsCreated, 0);
  }, [filteredCampaigns]);

  const totalWonLogos = useMemo(() => {
    return filteredCampaigns.reduce((acc, c) => acc + c.wonLogos, 0);
  }, [filteredCampaigns]);

  const totalBookedArr = useMemo(() => {
    return filteredCampaigns.reduce((acc, c) => acc + c.bookedArr, 0);
  }, [filteredCampaigns]);

  const blendedCpl = totalLeads > 0 ? (totalSpend / totalLeads).toFixed(2) : "Null";
  const blendedCac = totalWonLogos > 0 ? (totalSpend / totalWonLogos).toFixed(0) : "Null";
  const netRoi = totalSpend > 0 ? (((totalBookedArr - totalSpend) / totalSpend) * 100).toFixed(1) + "%" : "Null";

  const avgPaybackMonths = useMemo(() => {
    const activeWithLogos = filteredCampaigns.filter((c) => c.wonLogos > 0);
    if (activeWithLogos.length === 0) return "Null";
    const avg = activeWithLogos.reduce((acc, c) => acc + c.paybackMonths, 0) / activeWithLogos.length;
    return avg.toFixed(1) + " Months";
  }, [filteredCampaigns]);

  return (
    <div className="space-y-6">
      {/* Top 4-KPI Metric Ribbon for Campaign Economics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Blended CPL */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Cost Per Lead (CPL)</span>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {blendedCpl !== "Null" ? `$${blendedCpl}` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Total spend / Total leads</span>
            <span className="text-blue-700 font-bold font-mono">Acquisition</span>
          </div>
        </div>

        {/* Metric 2: Customer Acquisition Cost (CAC) */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Customer Acquisition Cost</span>
              <Calculator className="h-4 w-4 text-purple-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {blendedCac !== "Null" ? `$${Number(blendedCac).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Spend / Won customers</span>
            <span className="text-purple-700 font-bold font-mono">Blended CAC</span>
          </div>
        </div>

        {/* Metric 3: Campaign Net ROI */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Net Campaign ROI</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="font-hand text-3xl font-black text-emerald-900">
              {netRoi !== "Null" ? `+${netRoi}` : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>(ARR - Spend) / Spend</span>
            <span className="text-emerald-700 font-bold font-mono">High Yield</span>
          </div>
        </div>

        {/* Metric 4: CAC Payback Period */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">CAC Payback Period</span>
              <Calendar className="h-4 w-4 text-amber-600" />
            </div>
            <div className="font-hand text-3xl font-black text-ink">
              {avgPaybackMonths !== "Null" ? avgPaybackMonths : <span className="text-rose-500 font-mono">Null</span>}
            </div>
          </div>
          <div className="font-sans text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
            <span>Time to cash recovery</span>
            <span className="text-amber-700 font-bold font-mono">Benchmark: &lt;12m</span>
          </div>
        </div>
      </div>

      {/* Campaign Ledger Table */}
      <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-100 pb-3">
          <div>
            <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Campaign Performance & Attribution Ledger
            </h3>
            <p className="font-sans text-xs text-zinc-500">
              Detailed breakdown of marketing spend, CPL, SQL generation, CAC, and ROI across campaigns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-500 font-bold">Filter Channel:</span>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
            >
              <option value="All Channels">All Marketing Channels</option>
              <option value="Outbound AI Agent">Outbound AI Agent</option>
              <option value="Partner Referral / Channel">Partner Referral / Channel</option>
              <option value="Trade Shows & Industry Expos">Trade Shows & Industry Expos</option>
              <option value="Paid Search & Intent Ads">Paid Search & Intent Ads</option>
              <option value="Inbound Organic / SEO">Inbound Organic / SEO</option>
              <option value="Social & Thought Leadership">Social & Thought Leadership</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border-2 border-ink rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 border-b-2 border-ink font-mono text-[11px] text-zinc-700 uppercase">
                <th className="py-2.5 px-3">Campaign Name</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3 text-right">Spend</th>
                <th className="py-2.5 px-3 text-right">Leads</th>
                <th className="py-2.5 px-3 text-right">CPL</th>
                <th className="py-2.5 px-3 text-right">SQLs</th>
                <th className="py-2.5 px-3 text-right">Won Deals</th>
                <th className="py-2.5 px-3 text-right">Booked ARR</th>
                <th className="py-2.5 px-3 text-right">CAC</th>
                <th className="py-2.5 px-3 text-right">Net ROI</th>
                <th className="py-2.5 px-3 text-right">Payback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredCampaigns.map((c, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-zinc-900">{c.campaignName}</td>
                  <td className="py-2.5 px-3 font-sans text-zinc-600">{c.channel}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-zinc-800">${c.totalSpend.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-zinc-800">{c.leadsCreated}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-700">${c.cpl.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-mono text-zinc-800">{c.sqlsGenerated}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-zinc-900">{c.wonLogos}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">
                    {c.bookedArr > 0 ? `$${c.bookedArr.toLocaleString()}` : "$0"}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-purple-700">
                    {c.wonLogos > 0 ? `$${Math.round(c.cac).toLocaleString()}` : "—"}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    {c.roi > 0 ? (
                      <span className="text-emerald-700">+{c.roi.toFixed(0)}%</span>
                    ) : (
                      <span className="text-rose-600">{c.roi.toFixed(0)}%</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-amber-800 font-bold">
                    {c.paybackMonths > 0 ? `${c.paybackMonths} mo` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unit Economics & Channel Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
          <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2">
            Top Performing Channel: Autonomous AI Outbound Swarm
          </h3>
          <div className="p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span>+8,100% Campaign ROI</span>
              <span className="font-mono">$1,435,000 Booked ARR</span>
            </div>
            <p className="text-emerald-800">
              Low CPL ($123.24) combined with rapid multi-agent lead qualification delivers a short CAC payback period of 4.8 months.
            </p>
          </div>

          <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-xl text-xs space-y-1.5">
            <div className="flex items-center justify-between font-bold text-blue-900">
              <span>Partner Co-Sell Motion</span>
              <span className="font-mono">$1,140,000 Booked ARR</span>
            </div>
            <p className="text-blue-800">
              High contract value ($380k average deal size) offsets slightly higher CPL ($248.28), maintaining strong LTV/CAC ratio of 8.2x.
            </p>
          </div>
        </div>

        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
          <h3 className="font-hand text-lg font-bold text-ink border-b-2 border-zinc-100 pb-2">
            FRD Campaign Formulas
          </h3>
          <div className="space-y-2 text-xs font-mono text-zinc-700">
            <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200">
              <strong className="text-zinc-900">Cost Per Lead (CPL):</strong><br />
              <code>CPL = Total Campaign Spend / Total Leads Acquired</code>
            </div>
            <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200">
              <strong className="text-zinc-900">Customer Acquisition Cost (CAC):</strong><br />
              <code>CAC = Total S&M Spend / Closed Won Customer Logos</code>
            </div>
            <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-200">
              <strong className="text-zinc-900">Campaign ROI %:</strong><br />
              <code>ROI = ((Attributed Booked ARR - Spend) / Spend) * 100</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
