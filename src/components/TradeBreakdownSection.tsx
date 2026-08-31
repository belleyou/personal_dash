import React, { useState, useMemo } from "react";
import {
  Wrench,
  Zap,
  Droplet,
  Building2,
  Home,
  Cloud,
  Activity,
  Truck,
  TrendingUp,
  Award,
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  Filter,
  CheckCircle2
} from "lucide-react";

export interface TradeMetric {
  trade: string;
  category: string;
  icon: any;
  opportunityCount: number;
  totalLeads: number;
  winRate: number; // percentage e.g. 34.2
  bookedARR: number; // USD
  avgDealSize: number; // USD
  avgSalesCycleDays: number;
  growthYoY: number; // percentage
  status: "High Growth" | "Stable" | "Emerging";
  topDriver: string;
}

export const TRADE_BREAKDOWN_DATA: TradeMetric[] = [
  {
    trade: "Commercial HVAC & Mechanical",
    category: "Specialty Trade",
    icon: Wrench,
    opportunityCount: 142,
    totalLeads: 420,
    winRate: 36.8,
    bookedARR: 2840000,
    avgDealSize: 54400,
    avgSalesCycleDays: 34,
    growthYoY: 42.5,
    status: "High Growth",
    topDriver: "Automated preventative maintenance quoting & field IoT integration"
  },
  {
    trade: "Electrical & Solar",
    category: "Energy & Infrastructure",
    icon: Zap,
    opportunityCount: 118,
    totalLeads: 365,
    winRate: 34.5,
    bookedARR: 2310000,
    avgDealSize: 56800,
    avgSalesCycleDays: 31,
    growthYoY: 38.2,
    status: "High Growth",
    topDriver: "Commercial solar IRA tax credit proposals and rapid CPQ turnaround"
  },
  {
    trade: "Plumbing & Industrial Piping",
    category: "Specialty Trade",
    icon: Droplet,
    opportunityCount: 88,
    totalLeads: 290,
    winRate: 31.2,
    bookedARR: 1420000,
    avgDealSize: 45800,
    avgSalesCycleDays: 29,
    growthYoY: 24.1,
    status: "Stable",
    topDriver: "Emergency commercial dispatch and service agreement automation"
  },
  {
    trade: "General Contracting",
    category: "Construction & Build",
    icon: Building2,
    opportunityCount: 95,
    totalLeads: 310,
    winRate: 28.4,
    bookedARR: 1890000,
    avgDealSize: 70000,
    avgSalesCycleDays: 48,
    growthYoY: 19.8,
    status: "Stable",
    topDriver: "Subcontractor bid management and change-order approval velocity"
  },
  {
    trade: "Commercial Roofing",
    category: "Exterior & Envelope",
    icon: Home,
    opportunityCount: 76,
    totalLeads: 245,
    winRate: 33.1,
    bookedARR: 1540000,
    avgDealSize: 61200,
    avgSalesCycleDays: 27,
    growthYoY: 31.4,
    status: "Stable",
    topDriver: "Drone thermal inspection quoting and storm restoration claims"
  },
  {
    trade: "Enterprise SaaS",
    category: "Technology",
    icon: Cloud,
    opportunityCount: 164,
    totalLeads: 580,
    winRate: 38.9,
    bookedARR: 4120000,
    avgDealSize: 64500,
    avgSalesCycleDays: 39,
    growthYoY: 51.0,
    status: "High Growth",
    topDriver: "Autonomous AI sales agents and CRM data enrichment swarms"
  },
  {
    trade: "Healthcare Systems",
    category: "Institutional",
    icon: Activity,
    opportunityCount: 62,
    totalLeads: 190,
    winRate: 29.5,
    bookedARR: 1980000,
    avgDealSize: 108500,
    avgSalesCycleDays: 62,
    growthYoY: 27.6,
    status: "Emerging",
    topDriver: "HIPAA-compliant procurement and hospital facility compliance"
  },
  {
    trade: "Logistics & Supply Chain",
    category: "Distribution",
    icon: Truck,
    opportunityCount: 84,
    totalLeads: 275,
    winRate: 32.7,
    bookedARR: 1650000,
    avgDealSize: 60100,
    avgSalesCycleDays: 33,
    growthYoY: 33.8,
    status: "High Growth",
    topDriver: "Cold-chain compliance telemetry and freight partner integrations"
  }
];

export const TradeBreakdownSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"arr" | "winRate" | "volume" | "growth">("arr");

  const filteredTrades = useMemo(() => {
    let result = [...TRADE_BREAKDOWN_DATA];
    if (selectedCategory !== "All") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === "arr") return b.bookedARR - a.bookedARR;
      if (sortBy === "winRate") return b.winRate - a.winRate;
      if (sortBy === "volume") return b.opportunityCount - a.opportunityCount;
      if (sortBy === "growth") return b.growthYoY - a.growthYoY;
      return 0;
    });

    return result;
  }, [selectedCategory, sortBy]);

  const totalBookedARR = useMemo(() => {
    return TRADE_BREAKDOWN_DATA.reduce((acc, curr) => acc + curr.bookedARR, 0);
  }, []);

  const totalOpportunities = useMemo(() => {
    return TRADE_BREAKDOWN_DATA.reduce((acc, curr) => acc + curr.opportunityCount, 0);
  }, []);

  const blendedWinRate = useMemo(() => {
    const totalWon = TRADE_BREAKDOWN_DATA.reduce(
      (acc, curr) => acc + (curr.opportunityCount * curr.winRate) / 100,
      0
    );
    return Math.round((totalWon / totalOpportunities) * 1000) / 10;
  }, [totalOpportunities]);

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(TRADE_BREAKDOWN_DATA.map((t) => t.category)))];
  }, []);

  return (
    <div className="space-y-6">
      {/* Header & KPI Summary Strip */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 border-2 border-ink rounded-lg">
                <BarChart3 className="h-5 w-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-hand text-xl font-bold text-ink">
                  Trade Breakdown: Live Volume, Win Rates & Booked ARR
                </h3>
                <p className="font-sans text-xs text-zinc-500">
                  Performance across Commercial HVAC & Mechanical, Electrical & Solar, Plumbing & Industrial Piping, General Contracting, Roofing, Enterprise SaaS, Healthcare & Logistics.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
              8 Key Verticals
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 font-mono text-xs font-bold">
              KPI-158 Master
            </span>
          </div>
        </div>

        {/* 4 Summary Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Total Booked ARR</span>
            <div className="font-hand text-3xl font-black text-emerald-700 mt-1">
              ${(totalBookedARR / 1000000).toFixed(2)}M
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              Across all 8 key commercial trades
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Live Opp Volume</span>
            <div className="font-hand text-3xl font-black text-indigo-700 mt-1">
              {totalOpportunities} Deals
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              In active qualification & negotiation
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Blended Win Rate</span>
            <div className="font-hand text-3xl font-black text-amber-700 mt-1">
              {blendedWinRate}%
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              +4.2% above historical benchmark
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Top Bookings Trade</span>
            <div className="font-hand text-2xl font-black text-zinc-900 mt-1 truncate">
              Enterprise SaaS
            </div>
            <span className="font-sans text-[11px] text-emerald-600 font-bold mt-1 block">
              $4.12M ARR (38.9% Win Rate)
            </span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Sort */}
      <div className="bg-paper border-2 border-ink rounded-xl p-4 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-zinc-600 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-zinc-500" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs rounded-lg font-hand font-bold border border-ink transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-highlight text-ink shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
                  : "bg-white text-zinc-600 hover:bg-zinc-100"
              }`}
            >
              {cat}
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
            <option value="arr">Booked ARR (High to Low)</option>
            <option value="winRate">Win Rate % (High to Low)</option>
            <option value="volume">Opportunity Count (High to Low)</option>
            <option value="growth">YoY Growth % (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Trade Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrades.map((item, idx) => {
          const IconComponent = item.icon;
          const maxArr = Math.max(...TRADE_BREAKDOWN_DATA.map((t) => t.bookedARR));
          const arrPercent = Math.round((item.bookedARR / maxArr) * 100);

          return (
            <div
              key={item.trade}
              className="bg-white border-3 border-ink rounded-xl p-5 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between hover:translate-y-[-2px] transition-all"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-zinc-100 border-2 border-ink rounded-lg">
                      <IconComponent className="h-5 w-5 text-indigo-700" />
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-base text-zinc-900 leading-tight">
                        {item.trade}
                      </h4>
                      <span className="font-mono text-[11px] text-zinc-500">{item.category}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      item.status === "High Growth"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : item.status === "Stable"
                        ? "bg-blue-100 text-blue-800 border-blue-300"
                        : "bg-amber-100 text-amber-800 border-amber-300"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Progress Bar of Booked ARR */}
                <div className="space-y-1 my-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Booked ARR</span>
                    <span className="font-bold text-emerald-700 text-sm">
                      ${item.bookedARR.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-100 h-2.5 rounded-full border border-ink overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(arrPercent, 6)}%` }}
                    ></div>
                  </div>
                </div>

                {/* 4 Quantitative Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-center my-3">
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">Win Rate</span>
                    <span className="font-sans font-black text-sm text-zinc-900">{item.winRate}%</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">Live Opps</span>
                    <span className="font-sans font-black text-sm text-zinc-900">{item.opportunityCount}</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-zinc-500 uppercase">Avg ACV</span>
                    <span className="font-sans font-black text-sm text-zinc-900">
                      ${Math.round(item.avgDealSize / 1000)}k
                    </span>
                  </div>
                </div>

                {/* Growth & Sales Cycle */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-600 px-1">
                  <span>
                    Avg Cycle: <strong>{item.avgSalesCycleDays} days</strong>
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="h-3 w-3" /> +{item.growthYoY}% YoY
                  </span>
                </div>
              </div>

              {/* Bottom Insight Takeaway */}
              <div className="mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-600 flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Driver:</strong> {item.topDriver}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
