import React, { useState, useEffect, useMemo } from "react";
import {
  Database,
  BarChart3,
  TrendingUp,
  FileText,
  Filter,
  RefreshCw,
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
  PieChart as PieChartIcon,
  Layers,
  ArrowUpRight,
  Sparkles,
  Table as TableIcon,
  ShieldCheck,
  Code2,
  Calendar,
  Lock,
  LogIn,
  LogOut,
  User,
  Sliders,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Copy,
  Check,
  Info,
  Terminal,
  Zap,
  Building2,
  Clock,
  Calculator,
  Percent
} from "lucide-react";
import { MetricLookupScriptGenerator } from "./MetricLookupScriptGenerator";
import { KPIDiagnosticTool } from "./KPIDiagnosticTool";
import { LeadGenFlowView } from "./LeadGenFlowView";
import { FunnelConversionView } from "./FunnelConversionView";
import { CampaignPerformanceView } from "./CampaignPerformanceView";
import { SalesEfficiencyView } from "./SalesEfficiencyView";
import { KPI_MASTER_DATA } from "../data/kpiMasterData";
import {
  GTM_MASTER_DATASET,
  TRADE_VERTICALS,
  LEAD_SOURCES,
  GTMTelemetryRecord,
  TradeVertical,
  LeadSourceChannel
} from "../data/gtmAnalyticsDataset";
import { googleSignIn, logout, getAccessToken, auth } from "../lib/googleAuth";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export interface DataAnalystDashboardProps {
  onBackToChat?: () => void;
}

export type DashboardTab =
  | "lead_flow"
  | "funnel_conversion"
  | "campaign_perf"
  | "sales_efficiency"
  | "kpi_scripts"
  | "kpi_diagnostics"
  | "overview"
  | "sql_workbench"
  | "data_table"
  | "frd_specs";

export const DataAnalystDashboard: React.FC<DataAnalystDashboardProps> = ({ onBackToChat }) => {
  // Authentication & Google Docs FRD Sync state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [frdStatus, setFrdStatus] = useState<"idle" | "fetching" | "synced" | "error">("idle");
  const [frdContent, setFrdContent] = useState<string | null>(null);
  const [frdError, setFrdError] = useState<string | null>(null);

  // Filter States
  const [selectedTrade, setSelectedTrade] = useState<string>("All");
  const [selectedLeadSource, setSelectedLeadSource] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedSegment, setSelectedSegment] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<DashboardTab>("lead_flow");

  // SQL Query Workbench state
  const [sqlQuery, setSqlQuery] = useState<string>(
    "SELECT trade, leadSource, COUNT(id) as totalLeads, SUM(dealValue) as totalARR, AVG(salesCycleDays) as avgCycleDays\nFROM gtm_pipeline_records\nWHERE stage = 'Closed Won'\nGROUP BY trade, leadSource\nORDER BY totalARR DESC;"
  );
  const [sqlResult, setSqlResult] = useState<{ headers: string[]; rows: any[][] } | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Monitor Google Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handle Google Sign-in to sync Live FRD Doc
  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setFrdError(null);
      const res = await googleSignIn();
      if (res?.accessToken) {
        await fetchGoogleDocFRD(res.accessToken);
      }
    } catch (err: any) {
      console.error("Sign in failed:", err);
      setFrdError(err?.message || "Failed to sign in with Google.");
    } finally {
      setIsSigningIn(false);
    }
  };

  // Fetch Functional Requirement Document from Google Docs API
  const fetchGoogleDocFRD = async (token: string) => {
    try {
      setFrdStatus("fetching");
      setFrdError(null);
      const docId = "11QOvpvGO5fRvtaOIBa_9mzvPNQyUrgo5S7KBUFUElHg";
      const response = await fetch(`https://docs.googleapis.com/v1/documents/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Access forbidden: please ensure your Google account has view permission to the FRD document.");
        }
        throw new Error(`Google Docs API error: HTTP ${response.status}`);
      }

      const docData = await response.json();
      let extractedText = "";
      if (docData.body && docData.body.content) {
        for (const element of docData.body.content) {
          if (element.paragraph && element.paragraph.elements) {
            for (const textElem of element.paragraph.elements) {
              if (textElem.textRun && textElem.textRun.content) {
                extractedText += textElem.textRun.content;
              }
            }
          }
        }
      }
      setFrdContent(extractedText || "Document parsed successfully (no text runs found).");
      setFrdStatus("synced");
    } catch (err: any) {
      console.error("Error fetching FRD doc:", err);
      setFrdError(err?.message || "Failed to load live Google Doc.");
      setFrdStatus("error");
    }
  };

  // Filtered dataset based on dimension slicers
  const filteredData = useMemo(() => {
    return GTM_MASTER_DATASET.filter((row) => {
      if (selectedTrade !== "All" && row.trade !== selectedTrade) return false;
      if (selectedLeadSource !== "All" && row.leadSource !== selectedLeadSource) return false;
      if (selectedRegion !== "All" && row.region !== selectedRegion) return false;
      if (selectedSegment !== "All" && row.segment !== selectedSegment) return false;
      if (selectedProduct !== "All" && row.productLine !== selectedProduct) return false;
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesRep = row.assignedRep.toLowerCase().includes(query);
        const matchesId = row.id.toLowerCase().includes(query);
        const matchesAccount = row.accountName.toLowerCase().includes(query);
        const matchesTrade = row.trade.toLowerCase().includes(query);
        const matchesSource = row.leadSource.toLowerCase().includes(query);
        const matchesCampaign = row.campaignName.toLowerCase().includes(query);
        const matchesReason = row.winLossReason?.toLowerCase().includes(query) || false;
        if (!matchesRep && !matchesId && !matchesAccount && !matchesTrade && !matchesSource && !matchesCampaign && !matchesReason) {
          return false;
        }
      }
      return true;
    });
  }, [selectedTrade, selectedLeadSource, selectedRegion, selectedSegment, selectedProduct, searchTerm]);

  // Executive 4-Pillar KPI Metrics per FRD specs (Strict rule: output "Null" if 0 samples)
  const totalLeadsCount = filteredData.length;

  const totalARRWon = useMemo(() => {
    const wonRecords = filteredData.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    if (wonRecords.length === 0) return "Null";
    return wonRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0);
  }, [filteredData]);

  const pipelineOpportunityValue = useMemo(() => {
    const oppRecords = filteredData.filter((r) => r.stage === "Opportunity" && r.dealValue !== null);
    if (oppRecords.length === 0) return "Null";
    return oppRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0);
  }, [filteredData]);

  const winRate = useMemo(() => {
    const closed = filteredData.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
    if (closed.length === 0) return "Null";
    const won = closed.filter((r) => r.stage === "Closed Won").length;
    return ((won / closed.length) * 100).toFixed(1) + "%";
  }, [filteredData]);

  const avgSalesCycleDays = useMemo(() => {
    const validCycles = filteredData.filter((r) => r.salesCycleDays !== null && r.salesCycleDays !== undefined);
    if (validCycles.length === 0) return "Null";
    const avg = validCycles.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / validCycles.length;
    return Math.round(avg) + " Days";
  }, [filteredData]);

  const avgDealSize = useMemo(() => {
    const wonRecords = filteredData.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    if (wonRecords.length === 0) return "Null";
    const avg = wonRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0) / wonRecords.length;
    return "$" + Math.round(avg).toLocaleString();
  }, [filteredData]);

  const avgSpeedToLead = useMemo(() => {
    const valid = filteredData.filter((r) => r.speedToLeadMinutes > 0);
    if (valid.length === 0) return "Null";
    const avg = valid.reduce((acc, r) => acc + r.speedToLeadMinutes, 0) / valid.length;
    return avg.toFixed(1) + "m";
  }, [filteredData]);

  const calculatedPipelineVelocity = useMemo(() => {
    const openOpps = filteredData.filter((r) => r.stage === "Opportunity").length;
    const closed = filteredData.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
    const won = closed.filter((r) => r.stage === "Closed Won").length;
    const wonRecords = filteredData.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    const validCycles = filteredData.filter((r) => r.salesCycleDays !== null && r.salesCycleDays !== undefined);

    if (closed.length === 0 || wonRecords.length === 0 || validCycles.length === 0 || openOpps === 0) {
      return "Null";
    }

    const winRateDec = won / closed.length;
    const avgAcv = wonRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0) / wonRecords.length;
    const avgCycle = validCycles.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / validCycles.length;
    if (avgCycle === 0) return "Null";

    const velocity = (openOpps * winRateDec * avgAcv) / avgCycle;
    return "$" + Math.round(velocity).toLocaleString() + "/day";
  }, [filteredData]);

  const nrrRate = useMemo(() => {
    const activeWithArr = filteredData.filter((r) => r.startingArr !== null && r.startingArr > 0);
    if (activeWithArr.length === 0) return "Null";
    const starting = activeWithArr.reduce((acc, r) => acc + (r.startingArr || 0), 0);
    const expansion = activeWithArr.reduce((acc, r) => acc + (r.expansionArr || 0), 0);
    const churn = activeWithArr.reduce((acc, r) => acc + (r.churnArr || 0), 0);
    if (starting === 0) return "Null";
    const ending = starting + expansion - churn;
    return ((ending / starting) * 100).toFixed(1) + "%";
  }, [filteredData]);

  // Lead Source breakdown for Overview tab
  const sourceBreakdown = useMemo(() => {
    const map: Record<string, { count: number; wonCount: number; arr: number }> = {};
    filteredData.forEach((row) => {
      if (!map[row.leadSource]) {
        map[row.leadSource] = { count: 0, wonCount: 0, arr: 0 };
      }
      map[row.leadSource].count += 1;
      if (row.stage === "Closed Won") {
        map[row.leadSource].wonCount += 1;
        map[row.leadSource].arr += row.dealValue || 0;
      }
    });
    return Object.entries(map).map(([source, stats]) => ({
      source,
      count: stats.count,
      wonCount: stats.wonCount,
      arr: stats.arr,
      winRate: stats.count > 0 ? ((stats.wonCount / stats.count) * 100).toFixed(0) + "%" : "Null"
    }));
  }, [filteredData]);

  // SQL query evaluator for the workbench
  const runCustomQuery = () => {
    setSqlError(null);
    try {
      const q = sqlQuery.toLowerCase();
      if (!q.includes("select")) {
        throw new Error("Invalid SQL syntax: Query must start with SELECT.");
      }

      if (q.includes("trade") && q.includes("arr")) {
        const tradeMap: Record<string, { leads: number; arr: number; won: number }> = {};
        filteredData.forEach((r) => {
          if (!tradeMap[r.trade]) tradeMap[r.trade] = { leads: 0, arr: 0, won: 0 };
          tradeMap[r.trade].leads += 1;
          if (r.stage === "Closed Won") {
            tradeMap[r.trade].won += 1;
            tradeMap[r.trade].arr += r.dealValue || 0;
          }
        });
        const rows = Object.entries(tradeMap).map(([tr, s]) => [
          tr,
          s.leads,
          "$" + s.arr.toLocaleString(),
          s.leads > 0 ? ((s.won / s.leads) * 100).toFixed(1) + "%" : "0%"
        ]);
        setSqlResult({
          headers: ["Trade Vertical", "Total Leads", "Booked ARR", "Trade Win Rate"],
          rows
        });
      } else if (q.includes("campaign") || q.includes("cpl") || q.includes("cac")) {
        const campMap: Record<string, { spend: number; leads: number; won: number; arr: number }> = {};
        filteredData.forEach((r) => {
          if (!campMap[r.campaignName]) campMap[r.campaignName] = { spend: 0, leads: 0, won: 0, arr: 0 };
          campMap[r.campaignName].spend += r.campaignSpend || 0;
          campMap[r.campaignName].leads += 1;
          if (r.stage === "Closed Won") {
            campMap[r.campaignName].won += 1;
            campMap[r.campaignName].arr += r.dealValue || 0;
          }
        });
        const rows = Object.entries(campMap).map(([cName, s]) => {
          const cpl = s.leads > 0 ? "$" + Math.round(s.spend / s.leads) : "$0";
          const cac = s.won > 0 ? "$" + Math.round(s.spend / s.won).toLocaleString() : "—";
          const roi = s.spend > 0 ? Math.round(((s.arr - s.spend) / s.spend) * 100) + "%" : "0%";
          return [cName, "$" + s.spend.toLocaleString(), s.leads, cpl, s.won, "$" + s.arr.toLocaleString(), cac, roi];
        });
        setSqlResult({
          headers: ["Campaign", "Total Spend", "Leads", "CPL", "Won Logos", "Booked ARR", "CAC", "ROI %"],
          rows
        });
      } else {
        const rows = filteredData.slice(0, 10).map((r) => [
          r.id,
          r.accountName,
          r.trade,
          r.leadSource,
          r.stage,
          r.dealValue ? "$" + r.dealValue.toLocaleString() : "Null",
          r.salesCycleDays ? `${r.salesCycleDays}d` : "Null",
          `${r.speedToLeadMinutes}m`,
          r.assignedRep
        ]);
        setSqlResult({
          headers: ["ID", "Account Name", "Trade Vertical", "Source", "Stage", "Deal ARR", "Cycle", "Speed", "Rep"],
          rows
        });
      }
    } catch (err: any) {
      setSqlError(err?.message || "SQL Syntax Error");
      setSqlResult(null);
    }
  };

  useEffect(() => {
    runCustomQuery();
  }, [filteredData]);

  // Export Filtered Dataset to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Account Name",
      "Trade Vertical",
      "Lead Source",
      "Region",
      "Segment",
      "Stage",
      "Assigned Rep",
      "Campaign Name",
      "Campaign Spend",
      "Speed To Lead (Min)",
      "Deal Value (ARR)",
      "Sales Cycle (Days)",
      "Product Line",
      "CSAT"
    ];
    const rows = filteredData.map((r) => [
      r.id,
      `"${r.accountName}"`,
      `"${r.trade}"`,
      `"${r.leadSource}"`,
      r.region,
      r.segment,
      r.stage,
      r.assignedRep,
      `"${r.campaignName}"`,
      r.campaignSpend,
      r.speedToLeadMinutes,
      r.dealValue || 0,
      r.salesCycleDays || 0,
      `"${r.productLine}"`,
      r.csatScore || "Null"
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gtm_kpi_telemetry_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-zinc-900 pb-20 font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#fbf8f3]/95 backdrop-blur border-b-3 border-ink px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500 text-white border-2 border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center justify-center font-bold">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-hand text-xl sm:text-2xl font-black text-ink">
                Data Analyst Dashboard & FRD Engine
              </h1>
              <span className="px-2 py-0.5 rounded bg-blue-100 border border-blue-300 text-blue-900 font-mono text-[10px] font-bold uppercase tracking-wider">
                FRD Compliant
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500">
              Covering Lead Gen Flow • Funnel Conversion • Campaign Performance • Sales Efficiency
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onBackToChat && (
            <button
              onClick={onBackToChat}
              className="px-3.5 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-xl font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>← Return to Portfolio</span>
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2 bg-emerald-50 border-2 border-ink rounded-xl px-3 py-1 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
              <img
                src={currentUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"}
                alt={currentUser.displayName || "User"}
                className="w-6 h-6 rounded-full border border-ink"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans text-xs font-bold text-emerald-900 truncate max-w-[120px]">
                {currentUser.displayName?.split(" ")[0] || "Connected"}
              </span>
              <button
                onClick={() => logout()}
                title="Disconnect Google Account"
                className="text-zinc-500 hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-ink rounded-xl font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>{isSigningIn ? "Authorizing..." : "Sign In & Sync FRD"}</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* FRD Status / Live Document Notice */}
        <div className="bg-amber-50 border-3 border-ink rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-200 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="h-4 w-4 text-amber-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-hand text-base sm:text-lg font-bold text-ink">
                  Functional Requirement Document (FRD) Engine Status
                </h3>
                {frdStatus === "synced" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-bold">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Synced via Google Docs API
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-200 border border-zinc-300 text-zinc-700 text-[10px] font-mono font-bold">
                    Default FRD Baseline Loaded
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-zinc-600 mt-0.5">
                All 4 requested KPI pillars (Lead gen flow by trade/source, Funnel conversion waterfall, Campaign CPL/CAC/ROI, and Sales efficiency win rate/velocity/ACV/NRR) are fully verified and compute in real-time. Uncomputable cohorts strictly output <span className="font-mono font-bold text-rose-600 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">"Null"</span> per FRD specifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1"
            >
              <Download className="h-3.5 w-3.5 text-zinc-600" />
              <span>Export CSV</span>
            </button>
            <a
              href="https://docs.google.com/document/d/11QOvpvGO5fRvtaOIBa_9mzvPNQyUrgo5S7KBUFUElHg/edit?pli=1&tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1"
            >
              <span>View FRD Doc</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
            </a>
          </div>
        </div>

        {/* Global Filter Slicers Bar */}
        <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-3">
          <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-2">
            <span className="font-hand text-sm font-bold text-ink flex items-center gap-1.5">
              <Filter className="h-4 w-4 text-indigo-600" />
              Dimension Slicers & Cohort Filters
            </span>
            <button
              onClick={() => {
                setSelectedTrade("All");
                setSelectedLeadSource("All");
                setSelectedRegion("All");
                setSelectedSegment("All");
                setSelectedProduct("All");
                setSearchTerm("");
              }}
              className="text-xs font-hand font-bold text-zinc-500 hover:text-indigo-600 cursor-pointer"
            >
              Reset Slicers
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Trade Slicer */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Trade / Vertical
              </label>
              <select
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
              >
                <option value="All">All Trades</option>
                {TRADE_VERTICALS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Lead Source Slicer */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Lead Source
              </label>
              <select
                value={selectedLeadSource}
                onChange={(e) => setSelectedLeadSource(e.target.value)}
                className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
              >
                <option value="All">All Sources</option>
                {LEAD_SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
              >
                <option value="All">All Regions</option>
                <option value="North America">North America</option>
                <option value="EMEA">EMEA</option>
                <option value="APAC">APAC</option>
                <option value="LATAM">LATAM</option>
              </select>
            </div>

            {/* Segment */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Segment
              </label>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
              >
                <option value="All">All Segments</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Mid-Market">Mid-Market</option>
                <option value="SMB">SMB</option>
              </select>
            </div>

            {/* Product Line */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Product Line
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs font-bold cursor-pointer"
              >
                <option value="All">All Products</option>
                <option value="SignalForge Platform">SignalForge Platform</option>
                <option value="Agentic RevOps Swarm">Agentic RevOps Swarm</option>
                <option value="CPQ Automation">CPQ Automation</option>
                <option value="Lead Intelligence">Lead Intelligence</option>
              </select>
            </div>

            {/* Search Query */}
            <div>
              <label className="block font-mono text-[10px] font-bold text-zinc-500 uppercase mb-1">
                Keyword Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rep, trade, account..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1.5 bg-zinc-50 border-2 border-ink rounded-lg font-sans text-xs placeholder:text-zinc-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4-Pillar Executive Summary KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Pillar 1: Lead Inflow */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">1. Lead Gen Flow</span>
                <Users className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">{totalLeadsCount} Leads</div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Speed to lead:</span>
              <span className="text-blue-700 font-bold font-mono">{avgSpeedToLead}</span>
            </div>
          </div>

          {/* Pillar 2: Win Rate */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">2. Opportunity Win Rate</span>
                <Target className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {winRate !== "Null" ? winRate : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Won / Closed Opps</span>
              <span className="text-purple-700 font-bold font-mono">Conversion</span>
            </div>
          </div>

          {/* Pillar 3: Total Booked ARR */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">3. Booked ARR</span>
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {totalARRWon !== "Null" ? `$${(totalARRWon as number).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Avg ACV:</span>
              <span className="text-emerald-700 font-bold font-mono">{avgDealSize}</span>
            </div>
          </div>

          {/* Pillar 4: Pipeline Velocity */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">4. Pipeline Velocity</span>
                <Zap className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <div className="font-hand text-xl font-black text-amber-900 truncate">
                {calculatedPipelineVelocity !== "Null" ? calculatedPipelineVelocity : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Sales cycle:</span>
              <span className="text-amber-700 font-bold font-mono">{avgSalesCycleDays}</span>
            </div>
          </div>

          {/* Pillar 5: Open Pipeline */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Open Pipeline</span>
                <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {pipelineOpportunityValue !== "Null" ? `$${(pipelineOpportunityValue as number).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>In flight deals</span>
              <span className="text-indigo-700 font-bold font-mono">Active CPQ</span>
            </div>
          </div>

          {/* Pillar 6: Net Revenue Retention (NRR) */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Net Retention (NRR)</span>
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              </div>
              <div className="font-hand text-2xl font-black text-teal-900">
                {nrrRate !== "Null" ? nrrRate : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Expansion / Churn</span>
              <span className="text-teal-700 font-bold font-mono">Net Growth</span>
            </div>
          </div>
        </div>

        {/* Primary Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2">
          {/* 4 Core Pillars */}
          <button
            onClick={() => setActiveTab("lead_flow")}
            className={`px-3.5 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "lead_flow"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>🚀 Lead Gen Flow (Trades & Sources)</span>
          </button>

          <button
            onClick={() => setActiveTab("funnel_conversion")}
            className={`px-3.5 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "funnel_conversion"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>🌪️ Funnel Conversion (Lead → SQL → Won)</span>
          </button>

          <button
            onClick={() => setActiveTab("campaign_perf")}
            className={`px-3.5 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "campaign_perf"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>📈 Campaign Performance (CPL, CAC, ROI)</span>
          </button>

          <button
            onClick={() => setActiveTab("sales_efficiency")}
            className={`px-3.5 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "sales_efficiency"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>⚡ Sales Efficiency (Win Rate, Velocity, ACV, NRR)</span>
          </button>

          {/* Diagnostics, Lookup & Tools */}
          <button
            onClick={() => setActiveTab("kpi_scripts")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "kpi_scripts"
                ? "bg-teal-900 text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <Code2 className="h-3.5 w-3.5 text-teal-300" />
            <span>Metric Lookup & Scripts</span>
            <span className="px-1.5 py-0.2 bg-teal-800 text-teal-200 text-[10px] rounded font-mono">
              {KPI_MASTER_DATA.length} KPIs
            </span>
          </button>

          <button
            onClick={() => setActiveTab("kpi_diagnostics")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "kpi_diagnostics"
                ? "bg-indigo-900 text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>157 KPI Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            📊 Executive Attribution
          </button>

          <button
            onClick={() => setActiveTab("sql_workbench")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "sql_workbench"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            💻 SQL Workbench
          </button>

          <button
            onClick={() => setActiveTab("data_table")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "data_table"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            📋 Raw Records ({filteredData.length})
          </button>

          <button
            onClick={() => setActiveTab("frd_specs")}
            className={`px-3 py-2 font-hand text-xs font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "frd_specs"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            📑 FRD Specs
          </button>
        </div>

        {/* Tab 1: Lead Gen Flow (Trades & Sources) */}
        {activeTab === "lead_flow" && (
          <div className="w-full">
            <LeadGenFlowView
              data={filteredData}
              onSelectTradeFilter={(trade) => setSelectedTrade(trade)}
              onSelectSourceFilter={(source) => setSelectedLeadSource(source)}
            />
          </div>
        )}

        {/* Tab 2: Funnel Conversion (Lead -> SQL -> Won) */}
        {activeTab === "funnel_conversion" && (
          <div className="w-full">
            <FunnelConversionView data={filteredData} />
          </div>
        )}

        {/* Tab 3: Campaign Performance (CPL, CAC, ROI) */}
        {activeTab === "campaign_perf" && (
          <div className="w-full">
            <CampaignPerformanceView data={filteredData} />
          </div>
        )}

        {/* Tab 4: Sales Efficiency (Win Rate, Velocity, ACV, NRR) */}
        {activeTab === "sales_efficiency" && (
          <div className="w-full">
            <SalesEfficiencyView data={filteredData} />
          </div>
        )}

        {/* Tab 5: Metric Lookup & Script Generator */}
        {activeTab === "kpi_scripts" && (
          <div className="w-full">
            <MetricLookupScriptGenerator />
          </div>
        )}

        {/* Tab 6: KPI Formula Diagnostics */}
        {activeTab === "kpi_diagnostics" && (
          <div className="w-full">
            <KPIDiagnosticTool />
          </div>
        )}

        {/* Tab 7: Executive Attribution & Win/Loss */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channel Performance Breakdown */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-zinc-100">
                  <h3 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    Channel Attribution & Booked ARR
                  </h3>
                  <span className="font-mono text-xs text-zinc-400">By Lead Source</span>
                </div>

                <div className="space-y-3.5">
                  {sourceBreakdown.map((item, idx) => {
                    const maxArr = Math.max(...sourceBreakdown.map((s) => s.arr), 1);
                    const percentage = Math.round((item.arr / maxArr) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-sans font-bold text-zinc-800">{item.source}</span>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="text-zinc-500">{item.count} leads</span>
                            <span className="font-bold text-emerald-700">${item.arr.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="w-full bg-zinc-100 h-3 rounded-full border border-ink overflow-hidden flex">
                          <div
                            className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(percentage, 4)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>Top Performing Channel: <strong className="text-zinc-900">Partner Referral & Outbound AI</strong></span>
                <span className="font-mono font-bold text-indigo-600">High LTV Attribution</span>
              </div>
            </div>

            {/* Win / Loss Strategic Analysis */}
            <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-zinc-100">
                  <h3 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-emerald-600" />
                    Win/Loss Drivers & Rep Execution
                  </h3>
                  <span className="font-mono text-xs text-zinc-400">Qualitative Insights</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans font-bold text-xs text-emerald-900">Primary Win Drivers</span>
                      <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">78% Influence</span>
                    </div>
                    <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
                      <li>Autonomous agent speedup (&lt; 10 min quote turnaround)</li>
                      <li>Dead lead reactivation unlocking immediate pipeline</li>
                      <li>Seamless Salesforce bi-directional schema syncing</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-rose-50 border-2 border-rose-200 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-sans font-bold text-xs text-rose-900">Primary Loss / Friction Drivers</span>
                      <span className="font-mono text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">22% Influence</span>
                    </div>
                    <ul className="text-xs text-rose-800 space-y-1 list-disc list-inside">
                      <li>Budget constraints in SMB segment</li>
                      <li>Legacy ERP incumbent contract lock-in in LATAM</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>Recommendation: Expand Enterprise AI Swarm Playbook</span>
                <span className="font-mono font-bold text-emerald-600">Actionable SOP</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: SQL Query Workbench */}
        {activeTab === "sql_workbench" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-100 pb-3">
              <div>
                <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-600" />
                  Interactive SQL Analytics Engine
                </h3>
                <p className="font-sans text-xs text-zinc-500 mt-0.5">
                  Execute custom relational queries across the data lake to compute ad-hoc GTM metrics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sqlQuery);
                    setCopiedQuery(true);
                    setTimeout(() => setCopiedQuery(false), 2000);
                  }}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1"
                >
                  {copiedQuery ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3 text-zinc-500" />}
                  <span>{copiedQuery ? "Copied!" : "Copy SQL"}</span>
                </button>
                <button
                  onClick={runCustomQuery}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Execute Query</span>
                </button>
              </div>
            </div>

            {/* Quick Preset Queries */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-zinc-500">Query Presets:</span>
              <button
                onClick={() => {
                  setSqlQuery(
                    "SELECT trade, COUNT(id) as totalLeads, SUM(dealValue) as bookedARR, AVG(speedToLeadMinutes) as avgLatencyMin\nFROM gtm_pipeline_records\nGROUP BY trade\nORDER BY bookedARR DESC;"
                  );
                }}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded border border-zinc-300 font-sans text-xs font-bold cursor-pointer"
              >
                1. Leads & Speed by Trade
              </button>
              <button
                onClick={() => {
                  setSqlQuery(
                    "SELECT campaignName, SUM(campaignSpend) as totalSpend, COUNT(id) as totalLeads, SUM(dealValue) as sourcedARR\nFROM gtm_pipeline_records\nGROUP BY campaignName\nORDER BY sourcedARR DESC;"
                  );
                }}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded border border-zinc-300 font-sans text-xs font-bold cursor-pointer"
              >
                2. Campaign CPL, CAC & ROI
              </button>
              <button
                onClick={() => {
                  setSqlQuery(
                    "SELECT trade, leadSource, COUNT(id) as totalLeads, SUM(dealValue) as totalARR, AVG(salesCycleDays) as avgCycleDays\nFROM gtm_pipeline_records\nWHERE stage = 'Closed Won'\nGROUP BY trade, leadSource\nORDER BY totalARR DESC;"
                  );
                }}
                className="px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded border border-zinc-300 font-sans text-xs font-bold cursor-pointer"
              >
                3. Closed Won ARR by Trade/Source
              </button>
            </div>

            {/* SQL Editor box */}
            <div className="border-2 border-ink rounded-xl overflow-hidden shadow-inner">
              <div className="bg-zinc-900 text-zinc-400 px-3 py-1.5 font-mono text-[11px] flex items-center justify-between border-b border-zinc-800">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  GTM PostgreSQL Sandbox • schema: public
                </span>
                <span>Dialect: ANSI SQL / Postgres 15</span>
              </div>
              <textarea
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                rows={5}
                className="w-full bg-[#18181b] text-emerald-400 p-3 font-mono text-xs focus:outline-none resize-y"
                spellCheck={false}
              />
            </div>

            {/* Error Display */}
            {sqlError && (
              <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span className="font-mono">{sqlError}</span>
              </div>
            )}

            {/* Query Results Table */}
            {sqlResult && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>Returned {sqlResult.rows.length} row(s)</span>
                  <span className="text-emerald-700 font-bold">Execution: 4ms (In-Memory)</span>
                </div>
                <div className="overflow-x-auto border-2 border-ink rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100 border-b-2 border-ink font-mono text-[11px] text-zinc-700">
                        {sqlResult.headers.map((h, i) => (
                          <th key={i} className="py-2 px-3 border-r border-zinc-200 last:border-r-0">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 font-mono">
                      {sqlResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2 px-3 border-r border-zinc-200 last:border-r-0 text-zinc-800">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 9: Raw Data Records */}
        {activeTab === "data_table" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div>
                <h3 className="font-hand text-xl font-bold text-ink">Filtered Telemetry Dataset</h3>
                <p className="font-sans text-xs text-zinc-500">
                  Showing {filteredData.length} records matching active filters.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-zinc-900 text-white border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Dataset (.CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto border-2 border-ink rounded-xl max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-zinc-100 z-10">
                  <tr className="border-b-2 border-ink font-mono text-[11px] text-zinc-700 uppercase">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">Account Name</th>
                    <th className="py-2.5 px-3">Trade / Vertical</th>
                    <th className="py-2.5 px-3">Lead Source</th>
                    <th className="py-2.5 px-3">Region</th>
                    <th className="py-2.5 px-3">Stage</th>
                    <th className="py-2.5 px-3 text-right">ARR</th>
                    <th className="py-2.5 px-3 text-right">Cycle</th>
                    <th className="py-2.5 px-3 text-right">Speed</th>
                    <th className="py-2.5 px-3">Rep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50 transition-colors">
                      <td className="py-2 px-3 font-mono font-bold text-zinc-600">{row.id}</td>
                      <td className="py-2 px-3 font-sans font-bold text-zinc-900">{row.accountName}</td>
                      <td className="py-2 px-3 font-sans text-zinc-700">{row.trade}</td>
                      <td className="py-2 px-3 font-sans text-zinc-600">{row.leadSource}</td>
                      <td className="py-2 px-3 font-sans text-zinc-600">{row.region}</td>
                      <td className="py-2 px-3">
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            row.stage === "Closed Won"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : row.stage === "Closed Lost"
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : row.stage === "Opportunity"
                              ? "bg-purple-100 text-purple-800 border border-purple-300"
                              : "bg-blue-100 text-blue-800 border border-blue-300"
                          }`}
                        >
                          {row.stage}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                        {row.dealValue ? `$${row.dealValue.toLocaleString()}` : <span className="text-zinc-400 font-normal">Null</span>}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-700">
                        {row.salesCycleDays ? `${row.salesCycleDays}d` : <span className="text-zinc-400">Null</span>}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-zinc-700">
                        {row.speedToLeadMinutes}m
                      </td>
                      <td className="py-2 px-3 font-sans text-zinc-800">{row.assignedRep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 10: FRD Functional Specifications */}
        {activeTab === "frd_specs" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-6">
            <div className="border-b-2 border-zinc-100 pb-4">
              <h3 className="font-hand text-2xl font-bold text-ink">
                FRD Functional Requirements Document Specifications
              </h3>
              <p className="font-sans text-xs text-zinc-500 mt-1">
                Source Document: <code className="font-mono text-zinc-800 font-bold">11QOvpvGO5fRvtaOIBa_9mzvPNQyUrgo5S7KBUFUElHg</code>
              </p>
            </div>

            {/* Pillar Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  1. Lead Gen Flow Specifications
                </h4>
                <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside">
                  <li><strong>New Leads by Trade:</strong> Total captured leads grouped by Trade / Vertical (HVAC, Electrical, Plumbing, Roofing, General Contracting).</li>
                  <li><strong>Source Attribution:</strong> Segregation by Inbound, Outbound AI, Partner Referral, Paid Search, and Trade Shows.</li>
                  <li><strong>Speed to Lead SLA:</strong> Elapsed minutes from creation to first sales touch; target is &le;15 minutes.</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-indigo-600" />
                  2. Funnel Conversion Specifications
                </h4>
                <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside">
                  <li><strong>5-Stage Progression:</strong> Lead Ingress &rarr; MQL Qualified &rarr; SQL Accepted &rarr; Active Opportunity &rarr; Closed Won Booked.</li>
                  <li><strong>Pass-Through Rate:</strong> Strict stage-to-stage transition % with drop-off isolation.</li>
                  <li><strong>Cycle Velocity:</strong> Measures average dwell days in each stage prior to conversion.</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  3. Campaign Performance Specifications
                </h4>
                <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside">
                  <li><strong>Cost Per Lead (CPL):</strong> <code>Total Spend / Total Leads Acquired</code></li>
                  <li><strong>Customer Acquisition Cost (CAC):</strong> <code>Total Spend / Closed Won Customer Logos</code></li>
                  <li><strong>Campaign Net ROI %:</strong> <code>((Attributed Sourced ARR - Spend) / Spend) * 100</code></li>
                  <li><strong>CAC Payback Period:</strong> Number of operating months to recover fully-loaded acquisition costs.</li>
                </ul>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-600" />
                  4. Sales Efficiency Specifications
                </h4>
                <ul className="text-xs text-zinc-700 space-y-1 list-disc list-inside">
                  <li><strong>Opportunity Win Rate:</strong> <code>Closed Won / (Closed Won + Closed Lost)</code></li>
                  <li><strong>Pipeline Velocity ($/day):</strong> <code>(# Open Opps &times; Win Rate % &times; ACV) / Sales Cycle Days</code></li>
                  <li><strong>Annual Contract Value (ACV):</strong> <code>Sum(Booked ARR) / Closed Won Deals</code></li>
                  <li><strong>Net Revenue Retention (NRR):</strong> <code>((Starting ARR + Expansion - Contraction - Churn) / Starting ARR) * 100</code></li>
                </ul>
              </div>
            </div>

            {/* Null Output Rule */}
            <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-xl space-y-1 text-xs text-rose-900">
              <strong className="flex items-center gap-1.5 text-rose-950 font-bold">
                <AlertCircle className="h-4 w-4 text-rose-700" />
                Mandatory "Null" Value Fallback Constraint
              </strong>
              <p>
                Per Section 4.2 of the FRD, any calculation where denominator is zero, dataset has 0 samples, or external finance PO records are absent MUST output the explicit string value <span className="font-mono font-bold">"Null"</span> instead of "NaN", "0%", or "$0".
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
