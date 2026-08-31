import React, { useState, useMemo } from "react";
import {
  GitFork,
  Clock,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  ArrowRight,
  Filter,
  Flame
} from "lucide-react";

export interface ChannelData {
  channel: string;
  leadShare: number; // percentage e.g. 32%
  leadCount: number;
  winRate: number; // percentage
  wonDeals: number;
  bookedARR: number; // USD
  estimatedCAC: number; // USD
  cpl: number; // USD
  roiMultiplier: number; // e.g. 5.4x
  color: string;
}

export const CHANNEL_DATA: ChannelData[] = [
  {
    channel: "Outbound AI Agent",
    leadShare: 34.5,
    leadCount: 520,
    winRate: 37.8,
    wonDeals: 46,
    bookedARR: 3840000,
    estimatedCAC: 3200,
    cpl: 85,
    roiMultiplier: 6.8,
    color: "bg-indigo-500"
  },
  {
    channel: "Inbound Organic",
    leadShare: 26.0,
    leadCount: 390,
    winRate: 35.2,
    wonDeals: 32,
    bookedARR: 2450000,
    estimatedCAC: 2800,
    cpl: 62,
    roiMultiplier: 7.4,
    color: "bg-emerald-500"
  },
  {
    channel: "Partner Referral",
    leadShare: 18.5,
    leadCount: 280,
    winRate: 42.1,
    wonDeals: 28,
    bookedARR: 3100000,
    estimatedCAC: 4100,
    cpl: 140,
    roiMultiplier: 8.2,
    color: "bg-amber-500"
  },
  {
    channel: "Paid Search & Display",
    leadShare: 14.0,
    leadCount: 210,
    winRate: 24.6,
    wonDeals: 14,
    bookedARR: 980000,
    estimatedCAC: 5800,
    cpl: 195,
    roiMultiplier: 3.1,
    color: "bg-rose-500"
  },
  {
    channel: "Trade Shows & Conferences",
    leadShare: 7.0,
    leadCount: 105,
    winRate: 31.0,
    wonDeals: 9,
    bookedARR: 1250000,
    estimatedCAC: 7200,
    cpl: 380,
    roiMultiplier: 4.0,
    color: "bg-purple-500"
  }
];

export interface SlaLatencyBucket {
  bucket: string;
  minMinutes: number;
  maxMinutes: number;
  leadVolume: number;
  percentage: number;
  conversionRate: number;
  status: "Target SLA Met (<5 min)" | "Warning Window (5-15 min)" | "SLA Breached (>15 min)";
}

export const SLA_BUCKETS: SlaLatencyBucket[] = [
  {
    bucket: "< 2 Minutes (Autonomous AI)",
    minMinutes: 0,
    maxMinutes: 2,
    leadVolume: 640,
    percentage: 42.5,
    conversionRate: 41.2,
    status: "Target SLA Met (<5 min)"
  },
  {
    bucket: "2 - 5 Minutes (Instant Rep Routing)",
    minMinutes: 2,
    maxMinutes: 5,
    leadVolume: 495,
    percentage: 32.8,
    conversionRate: 34.6,
    status: "Target SLA Met (<5 min)"
  },
  {
    bucket: "5 - 15 Minutes (Delayed Queue)",
    minMinutes: 5,
    maxMinutes: 15,
    leadVolume: 230,
    percentage: 15.3,
    conversionRate: 21.0,
    status: "Warning Window (5-15 min)"
  },
  {
    bucket: "15 - 60 Minutes (Manual SDR)",
    minMinutes: 15,
    maxMinutes: 60,
    leadVolume: 105,
    percentage: 7.0,
    conversionRate: 11.4,
    status: "SLA Breached (>15 min)"
  },
  {
    bucket: "> 1 Hour (Critical SLA Breach)",
    minMinutes: 60,
    maxMinutes: 999,
    leadVolume: 35,
    percentage: 2.4,
    conversionRate: 4.8,
    status: "SLA Breached (>15 min)"
  }
];

export const ChannelAndSlaSection: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>("All");

  const totalLeads = useMemo(() => {
    return CHANNEL_DATA.reduce((acc, curr) => acc + curr.leadCount, 0);
  }, []);

  const totalBookedARR = useMemo(() => {
    return CHANNEL_DATA.reduce((acc, curr) => acc + curr.bookedARR, 0);
  }, []);

  const slaComplianceRate = useMemo(() => {
    const metVolume = SLA_BUCKETS.filter((b) => b.status === "Target SLA Met (<5 min)").reduce(
      (acc, curr) => acc + curr.leadVolume,
      0
    );
    const totalVolume = SLA_BUCKETS.reduce((acc, curr) => acc + curr.leadVolume, 0);
    return Math.round((metVolume / totalVolume) * 1000) / 10;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-zinc-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 border-2 border-ink rounded-lg">
              <GitFork className="h-5 w-5 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-hand text-xl font-bold text-ink">
                Channel Attribution & Speed-to-Lead SLA Monitoring
              </h3>
              <p className="font-sans text-xs text-zinc-500">
                Lead share, win rates & CAC across Outbound AI, Inbound Organic, Partner, Search & Events with &lt; 5 min SLA adherence tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
              KPI-159 & KPI-160
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-mono text-xs font-bold flex items-center gap-1">
              <Flame className="h-3 w-3 text-amber-600" /> &lt; 5 Min Target
            </span>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">SLA Compliance (&lt;5 min)</span>
            <div className="font-hand text-3xl font-black text-emerald-700 mt-1">
              {slaComplianceRate}%
            </div>
            <span className="font-sans text-[11px] text-emerald-600 font-bold mt-1 block">
              75.3% leads contacted in under 5 mins
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Avg First-Touch Latency</span>
            <div className="font-hand text-3xl font-black text-indigo-700 mt-1">
              3.4 Min
            </div>
            <span className="font-sans text-[11px] text-zinc-500 mt-1 block">
              Autonomous AI triage in 45 sec
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Highest Win Rate Channel</span>
            <div className="font-hand text-2xl font-black text-zinc-900 mt-1 truncate">
              Partner Referral
            </div>
            <span className="font-sans text-[11px] text-amber-700 font-bold mt-1 block">
              42.1% Win Rate ($3.1M ARR)
            </span>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl">
            <span className="font-mono text-xs text-zinc-500 font-bold uppercase">Lowest Acquisition CAC</span>
            <div className="font-hand text-2xl font-black text-zinc-900 mt-1 truncate">
              Inbound Organic
            </div>
            <span className="font-sans text-[11px] text-emerald-700 font-bold mt-1 block">
              $2,800 CAC (7.4x Net ROI)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Channel Attribution (Left) + Speed-to-Lead SLA (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Attribution Matrix */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3 mb-4">
              <h4 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-600" />
                GTM Channel Attribution Ledger
              </h4>
              <span className="font-mono text-xs text-zinc-400">By Lead Source</span>
            </div>

            <div className="space-y-4">
              {CHANNEL_DATA.map((ch) => (
                <div key={ch.channel} className="p-3.5 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-indigo-600 border border-ink"></span>
                      <span className="font-sans font-bold text-sm text-zinc-900">{ch.channel}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      ${ch.bookedARR.toLocaleString()} ARR
                    </span>
                  </div>

                  {/* Visual Share Bar */}
                  <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${ch.leadShare}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-center font-mono text-[11px] pt-1">
                    <div className="bg-white p-1 rounded border border-zinc-200">
                      <span className="text-zinc-400 block text-[9px]">LEAD SHARE</span>
                      <strong className="text-zinc-800">{ch.leadShare}%</strong>
                    </div>
                    <div className="bg-white p-1 rounded border border-zinc-200">
                      <span className="text-zinc-400 block text-[9px]">WIN RATE</span>
                      <strong className="text-emerald-700">{ch.winRate}%</strong>
                    </div>
                    <div className="bg-white p-1 rounded border border-zinc-200">
                      <span className="text-zinc-400 block text-[9px]">EST. CAC</span>
                      <strong className="text-zinc-800">${ch.estimatedCAC}</strong>
                    </div>
                    <div className="bg-white p-1 rounded border border-zinc-200">
                      <span className="text-zinc-400 block text-[9px]">ROI MULT</span>
                      <strong className="text-indigo-700">{ch.roiMultiplier}x</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-500 flex items-center justify-between">
            <span>Executive Finding: Outbound AI + Partner generate 61% of total ARR</span>
            <span className="font-mono font-bold text-indigo-600">High Efficiency</span>
          </div>
        </div>

        {/* Speed-to-Lead & First-Touch SLA Tracking */}
        <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3 mb-4">
              <h4 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                First-Touch Latency & SLA Adherence
              </h4>
              <span className="font-mono text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                Target: &lt; 5 Min
              </span>
            </div>

            <div className="space-y-3">
              {SLA_BUCKETS.map((bucket, idx) => {
                const isCompliant = bucket.status === "Target SLA Met (<5 min)";
                const isWarning = bucket.status === "Warning Window (5-15 min)";

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      isCompliant
                        ? "bg-emerald-50/70 border-emerald-300"
                        : isWarning
                        ? "bg-amber-50/70 border-amber-300"
                        : "bg-rose-50/70 border-rose-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        {isCompliant ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                        )}
                        <span className="font-sans font-bold text-xs text-zinc-900">
                          {bucket.bucket}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-zinc-700">
                        {bucket.leadVolume} leads ({bucket.percentage}%)
                      </span>
                    </div>

                    {/* Visual bar */}
                    <div className="w-full bg-white h-2 rounded-full border border-ink/20 overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full ${
                          isCompliant ? "bg-emerald-500" : isWarning ? "bg-amber-500" : "bg-rose-500"
                        }`}
                        style={{ width: `${bucket.percentage}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-600">
                      <span>
                        Stage Win Rate: <strong className="text-zinc-900">{bucket.conversionRate}%</strong>
                      </span>
                      <span
                        className={`font-bold ${
                          isCompliant ? "text-emerald-800" : isWarning ? "text-amber-800" : "text-rose-800"
                        }`}
                      >
                        {isCompliant
                          ? "✓ 4.1x Higher Win Rate"
                          : isWarning
                          ? "⚠️ 50% Win Rate Decay"
                          : "🚨 88% Conversion Drop"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-100 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
            <strong>RevOps Insight:</strong> Leads contacted in <strong>&lt; 2 minutes</strong> by Autonomous AI Agents close at <strong>41.2%</strong> versus only <strong>4.8%</strong> when delayed past 1 hour.
          </div>
        </div>
      </div>
    </div>
  );
};
