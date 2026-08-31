import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  Filter,
  CheckCircle2,
  Award,
  ArrowUpRight,
  Layers,
  FileSpreadsheet,
  Download
} from "lucide-react";

export interface CampaignLedgerItem {
  id: string;
  name: string;
  quarter: string;
  channel: string;
  spend: number; // USD
  leadsGenerated: number;
  sqlsGenerated: number;
  wonLogos: number;
  bookedARR: number; // USD
  cpl: number; // calculated USD
  cac: number; // calculated USD
  roiPercent: number; // Net ROI %
  paybackMonths: number;
  status: "Active" | "Completed" | "Scaling";
}

export const CAMPAIGN_LEDGER_DATA: CampaignLedgerItem[] = [
  {
    id: "CMP-2026-01",
    name: "Autonomous AI Cold Outbound Swarm",
    quarter: "Q1 2026",
    channel: "Outbound AI",
    spend: 42000,
    leadsGenerated: 480,
    sqlsGenerated: 165,
    wonLogos: 26,
    bookedARR: 1480000,
    cpl: 87.5,
    cac: 1615,
    roiPercent: 3423,
    paybackMonths: 2.1,
    status: "Scaling"
  },
  {
    id: "CMP-2026-02",
    name: "Commercial HVAC Industry Playbook",
    quarter: "Q1 2026",
    channel: "Trade Content & SEO",
    spend: 28000,
    leadsGenerated: 310,
    sqlsGenerated: 94,
    wonLogos: 14,
    bookedARR: 820000,
    cpl: 90.3,
    cac: 2000,
    roiPercent: 2828,
    paybackMonths: 3.2,
    status: "Active"
  },
  {
    id: "CMP-2026-03",
    name: "AHR Expo & Mechanical Contractor Summit",
    quarter: "Q1 2026",
    channel: "Trade Show",
    spend: 65000,
    leadsGenerated: 195,
    sqlsGenerated: 78,
    wonLogos: 12,
    bookedARR: 940000,
    cpl: 333.3,
    cac: 5416,
    roiPercent: 1346,
    paybackMonths: 5.8,
    status: "Completed"
  },
  {
    id: "CMP-2026-04",
    name: "Google Ads: CPQ & RevOps Automation",
    quarter: "Q1 2026",
    channel: "Paid Search",
    spend: 52000,
    leadsGenerated: 240,
    sqlsGenerated: 62,
    wonLogos: 9,
    bookedARR: 580000,
    cpl: 216.6,
    cac: 5777,
    roiPercent: 1015,
    paybackMonths: 6.4,
    status: "Active"
  },
  {
    id: "CMP-2026-05",
    name: "Partner Ecosystem Co-Marketing (Salesforce/Lemlist)",
    quarter: "Q1 2026",
    channel: "Partner Referral",
    spend: 35000,
    leadsGenerated: 290,
    sqlsGenerated: 130,
    wonLogos: 22,
    bookedARR: 1650000,
    cpl: 120.6,
    cac: 1590,
    roiPercent: 4614,
    paybackMonths: 1.8,
    status: "Scaling"
  },
  {
    id: "CMP-2026-06",
    name: "Solar & Roofing CPQ Webinar & Whitepaper",
    quarter: "Q1 2026",
    channel: "Webinar / Content",
    spend: 18000,
    leadsGenerated: 220,
    sqlsGenerated: 58,
    wonLogos: 8,
    bookedARR: 480000,
    cpl: 81.8,
    cac: 2250,
    roiPercent: 2566,
    paybackMonths: 3.5,
    status: "Completed"
  }
];

export const CampaignEconomicsLedgerSection: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"roi" | "spend" | "arr" | "cac">("roi");

  const totalSpend = useMemo(() => {
    return CAMPAIGN_LEDGER_DATA.reduce((acc, curr) => acc + curr.spend, 0);
  }, []);

  const totalLeads = useMemo(() => {
    return CAMPAIGN_LEDGER_DATA.reduce((acc, curr) => acc + curr.leadsGenerated, 0);
  }, []);

  const totalSQLs = useMemo(() => {
    return CAMPAIGN_LEDGER_DATA.reduce((acc, curr) => acc + curr.sqlsGenerated, 0);
  }, []);

  const totalWonLogos = useMemo(() => {
    return CAMPAIGN_LEDGER_DATA.reduce((acc, curr) => acc + curr.wonLogos, 0);
  }, []);

  const totalBookedARR = useMemo(() => {
    return CAMPAIGN_LEDGER_DATA.reduce((acc, curr) => acc + curr.bookedARR, 0);
  }, []);

  // Executive Economics Calculations
  const blendedCPL = useMemo(() => {
    return Math.round((totalSpend / totalLeads) * 10) / 10;
  }, [totalSpend, totalLeads]);

  const blendedCAC = useMemo(() => {
    return Math.round((totalSpend / totalWonLogos));
  }, [totalSpend, totalWonLogos]);

  const netCampaignROI = useMemo(() => {
    return Math.round(((totalBookedARR - totalSpend) / totalSpend) * 100);
  }, [totalBookedARR, totalSpend]);

  const avgCACPaybackMonths = useMemo(() => {
    // CAC / (ARR per logo / 12)
    const avgMonthlyRevenuePerLogo = (totalBookedARR / totalWonLogos) / 12;
    return Math.round((blendedCAC / avgMonthlyRevenuePerLogo) * 10) / 10;
  }, [blendedCAC, totalBookedARR, totalWonLogos]);

  const filteredCampaigns = useMemo(() => {
    let result = [...CAMPAIGN_LEDGER_DATA];
    if (selectedChannel !== "All") {
      result = result.filter((c) => c.channel === selectedChannel);
    }

    result.sort((a, b) => {
      if (sortBy === "roi") return b.roiPercent - a.roiPercent;
      if (sortBy === "spend") return b.spend - a.spend;
      if (sortBy === "arr") return b.bookedARR - a.bookedARR;
      if (sortBy === "cac") return a.cac - b.cac;
      return 0;
    });

    return result;
  }, [selectedChannel, sortBy]);

  const channels = ["All", ...Array.from(new Set(CAMPAIGN_LEDGER_DATA.map((c) => c.channel)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 border-2 border-ink rounded-lg">
              <TrendingUp className="h-5 w-5 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-hand text-xl font-bold text-ink">
                Campaign Performance Economics & Ledger
              </h3>
              <p className="font-sans text-xs text-zinc-500">
                Executive unit economics (Blended CPL, CAC, Net ROI %, Payback Period) and detailed campaign spend & bookings ledger.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 font-mono text-xs font-bold">
              KPI-162 & KPI-163
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
              Unit Economics
            </span>
          </div>
        </div>

        {/* 4 Executive Economics KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Blended CPL</span>
            <div className="font-hand text-3xl font-black text-indigo-700 mt-1">
              ${blendedCPL}
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              Spend ${totalSpend.toLocaleString()} / {totalLeads} Leads
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Blended CAC</span>
            <div className="font-hand text-3xl font-black text-zinc-900 mt-1">
              ${blendedCAC.toLocaleString()}
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              Across {totalWonLogos} Closed Won Logos
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Net Campaign ROI</span>
            <div className="font-hand text-3xl font-black text-emerald-700 mt-1">
              +{netCampaignROI.toLocaleString()}%
            </div>
            <span className="font-sans text-[11px] text-emerald-600 font-bold mt-1 block">
              ${(totalBookedARR / 1000000).toFixed(2)}M Booked / ${Math.round(totalSpend / 1000)}k Spend
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">CAC Payback Period</span>
            <div className="font-hand text-3xl font-black text-amber-700 mt-1">
              {avgCACPaybackMonths} Mos
            </div>
            <span className="font-sans text-[11px] text-amber-700 font-bold mt-1 block">
              Best-in-class recovery (&lt; 12 mo)
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Sort */}
      <div className="bg-paper border-2 border-ink rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-zinc-600 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-zinc-500" />
            Channel Filter:
          </span>
          {channels.map((chan) => (
            <button
              key={chan}
              onClick={() => setSelectedChannel(chan)}
              className={`px-3 py-1 text-xs rounded-lg font-hand font-bold border border-ink transition-all cursor-pointer ${
                selectedChannel === chan
                  ? "bg-highlight text-ink shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
                  : "bg-white text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {chan}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-zinc-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 text-xs rounded-lg border-2 border-ink bg-white font-sans font-bold text-zinc-800 cursor-pointer outline-none shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
          >
            <option value="roi">Net ROI % (High to Low)</option>
            <option value="arr">Booked ARR (High to Low)</option>
            <option value="spend">Spend (High to Low)</option>
            <option value="cac">CAC (Lowest First)</option>
          </select>
        </div>
      </div>

      {/* Detailed Campaign Ledger Table */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3 mb-4">
          <h4 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
            Granular Campaign Performance Ledger
          </h4>
          <span className="font-mono text-xs text-zinc-400">
            {filteredCampaigns.length} Campaign Initiatives
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-zinc-100 border-2 border-ink text-zinc-700 font-mono text-[11px] uppercase">
                <th className="p-3">Campaign / Channel</th>
                <th className="p-3">Spend</th>
                <th className="p-3">Leads</th>
                <th className="p-3">SQLs</th>
                <th className="p-3">Won Logos</th>
                <th className="p-3">Booked ARR</th>
                <th className="p-3">CPL / CAC</th>
                <th className="p-3">Net ROI</th>
                <th className="p-3">Payback</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50 font-mono transition-colors">
                  <td className="p-3">
                    <div className="font-sans font-bold text-zinc-900">{c.name}</div>
                    <span className="text-[10px] text-zinc-500">{c.channel} • {c.quarter}</span>
                  </td>
                  <td className="p-3 font-bold text-zinc-800">${c.spend.toLocaleString()}</td>
                  <td className="p-3 text-zinc-700">{c.leadsGenerated}</td>
                  <td className="p-3 text-zinc-700">{c.sqlsGenerated}</td>
                  <td className="p-3 font-bold text-emerald-700">{c.wonLogos}</td>
                  <td className="p-3 font-extrabold text-emerald-800">${c.bookedARR.toLocaleString()}</td>
                  <td className="p-3">
                    <div>CPL: <strong>${c.cpl}</strong></div>
                    <div className="text-zinc-500">CAC: <strong>${c.cac.toLocaleString()}</strong></div>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      +{c.roiPercent}%
                    </span>
                  </td>
                  <td className="p-3 text-zinc-800 font-bold">{c.paybackMonths} mo</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        c.status === "Scaling"
                          ? "bg-indigo-100 text-indigo-800 border-indigo-300"
                          : c.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-zinc-100 text-zinc-700 border-zinc-300"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
