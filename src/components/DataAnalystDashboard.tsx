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
  Terminal
} from "lucide-react";
import { MetricLookupScriptGenerator } from "./MetricLookupScriptGenerator";
import { KPI_MASTER_DATA } from "../data/kpiMasterData";
import { googleSignIn, logout, getAccessToken, auth } from "../lib/googleAuth";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

// Comprehensive mock data covering GTM Lead Generation, Pipeline Velocity, Conversion Funnel, Customer Retention, and ARR metrics
export interface DataRecord {
  id: string;
  leadSource: string;
  region: "North America" | "EMEA" | "APAC" | "LATAM";
  segment: "Enterprise" | "Mid-Market" | "SMB";
  stage: "MQL" | "SQL" | "Opportunity" | "Closed Won" | "Closed Lost";
  assignedRep: string;
  mqlDate: string;
  sqlDate: string | null;
  dealValue: number | null; // ARR in USD
  winLossReason: string | null;
  salesCycleDays: number | null;
  productLine: "SignalForge Platform" | "Agentic RevOps Swarm" | "CPQ Automation" | "Lead Intelligence";
  csatScore: number | null; // 1 - 5
}

const RAW_DATASET: DataRecord[] = [
  { id: "REC-1001", leadSource: "Outbound AI Agent", region: "North America", segment: "Enterprise", stage: "Closed Won", assignedRep: "Sarah Lin", mqlDate: "2026-01-10", sqlDate: "2026-01-12", dealValue: 145000, winLossReason: "Rapid AI Swarm ROI", salesCycleDays: 32, productLine: "Agentic RevOps Swarm", csatScore: 4.9 },
  { id: "REC-1002", leadSource: "Inbound Organic", region: "EMEA", segment: "Mid-Market", stage: "Closed Won", assignedRep: "Marcus Vance", mqlDate: "2026-01-15", sqlDate: "2026-01-18", dealValue: 68000, winLossReason: "CPQ speedup & ease of use", salesCycleDays: 41, productLine: "CPQ Automation", csatScore: 4.8 },
  { id: "REC-1003", leadSource: "Partner Referral", region: "North America", segment: "Enterprise", stage: "Closed Won", assignedRep: "Alex Rivera", mqlDate: "2026-01-20", sqlDate: "2026-01-22", dealValue: 220000, winLossReason: "Channel partner QTC automation", salesCycleDays: 28, productLine: "SignalForge Platform", csatScore: 5.0 },
  { id: "REC-1004", leadSource: "Paid Search", region: "APAC", segment: "SMB", stage: "Closed Lost", assignedRep: "David Kim", mqlDate: "2026-02-01", sqlDate: "2026-02-05", dealValue: null, winLossReason: "Budget constraints / Price sensitive", salesCycleDays: 19, productLine: "Lead Intelligence", csatScore: null },
  { id: "REC-1005", leadSource: "Webinar", region: "North America", segment: "Mid-Market", stage: "Opportunity", assignedRep: "Sarah Lin", mqlDate: "2026-02-08", sqlDate: "2026-02-12", dealValue: 85000, winLossReason: null, salesCycleDays: null, productLine: "Agentic RevOps Swarm", csatScore: null },
  { id: "REC-1006", leadSource: "Outbound AI Agent", region: "EMEA", segment: "Enterprise", stage: "Closed Won", assignedRep: "Elena Rostova", mqlDate: "2026-02-14", sqlDate: "2026-02-16", dealValue: 310000, winLossReason: "Dead lead reactivation recovery", salesCycleDays: 36, productLine: "SignalForge Platform", csatScore: 4.9 },
  { id: "REC-1007", leadSource: "Partner Referral", region: "APAC", segment: "Enterprise", stage: "Opportunity", assignedRep: "David Kim", mqlDate: "2026-02-18", sqlDate: "2026-02-21", dealValue: 175000, winLossReason: null, salesCycleDays: null, productLine: "CPQ Automation", csatScore: null },
  { id: "REC-1008", leadSource: "Inbound Organic", region: "North America", segment: "SMB", stage: "Closed Won", assignedRep: "Marcus Vance", mqlDate: "2026-02-22", sqlDate: "2026-02-25", dealValue: 34000, winLossReason: "Self-service onboarding", salesCycleDays: 14, productLine: "Lead Intelligence", csatScore: 4.7 },
  { id: "REC-1009", leadSource: "Cold Outbound", region: "LATAM", segment: "Mid-Market", stage: "Closed Lost", assignedRep: "Alex Rivera", mqlDate: "2026-02-25", sqlDate: null, dealValue: null, winLossReason: "Competitor incumbent locked", salesCycleDays: 22, productLine: "SignalForge Platform", csatScore: null },
  { id: "REC-1010", leadSource: "Outbound AI Agent", region: "North America", segment: "Enterprise", stage: "Closed Won", assignedRep: "Sarah Lin", mqlDate: "2026-03-01", sqlDate: "2026-03-03", dealValue: 195000, winLossReason: "Autonomous sales orchestration", salesCycleDays: 29, productLine: "Agentic RevOps Swarm", csatScore: 5.0 },
  { id: "REC-1011", leadSource: "Event / Conference", region: "EMEA", segment: "Enterprise", stage: "Opportunity", assignedRep: "Elena Rostova", mqlDate: "2026-03-04", sqlDate: "2026-03-09", dealValue: 240000, winLossReason: null, salesCycleDays: null, productLine: "SignalForge Platform", csatScore: null },
  { id: "REC-1012", leadSource: "Partner Referral", region: "North America", segment: "Mid-Market", stage: "Closed Won", assignedRep: "Marcus Vance", mqlDate: "2026-03-08", sqlDate: "2026-03-10", dealValue: 92000, winLossReason: "Sub-minute quote approvals", salesCycleDays: 25, productLine: "CPQ Automation", csatScore: 4.8 },
  { id: "REC-1013", leadSource: "Inbound Organic", region: "LATAM", segment: "SMB", stage: "MQL", assignedRep: "Alex Rivera", mqlDate: "2026-03-12", sqlDate: null, dealValue: null, winLossReason: null, salesCycleDays: null, productLine: "Lead Intelligence", csatScore: null },
  { id: "REC-1014", leadSource: "Outbound AI Agent", region: "APAC", segment: "Mid-Market", stage: "SQL", assignedRep: "David Kim", mqlDate: "2026-03-15", sqlDate: "2026-03-17", dealValue: null, winLossReason: null, salesCycleDays: null, productLine: "Agentic RevOps Swarm", csatScore: null },
  { id: "REC-1015", leadSource: "Webinar", region: "North America", segment: "Enterprise", stage: "Closed Won", assignedRep: "Sarah Lin", mqlDate: "2026-03-18", sqlDate: "2026-03-20", dealValue: 285000, winLossReason: "Proven 3.8x pipeline acceleration", salesCycleDays: 31, productLine: "SignalForge Platform", csatScore: 4.9 },
  { id: "REC-1016", leadSource: "Paid Search", region: "EMEA", segment: "SMB", stage: "Closed Lost", assignedRep: "Elena Rostova", mqlDate: "2026-03-22", sqlDate: "2026-03-24", dealValue: null, winLossReason: "Feature mismatch / Custom requirement", salesCycleDays: 17, productLine: "Lead Intelligence", csatScore: null },
  { id: "REC-1017", leadSource: "Partner Referral", region: "North America", segment: "Enterprise", stage: "Closed Won", assignedRep: "Alex Rivera", mqlDate: "2026-03-25", sqlDate: "2026-03-28", dealValue: 410000, winLossReason: "Multi-Agent GTM automation overhaul", salesCycleDays: 34, productLine: "Agentic RevOps Swarm", csatScore: 5.0 },
  { id: "REC-1018", leadSource: "Outbound AI Agent", region: "North America", segment: "Mid-Market", stage: "Closed Won", assignedRep: "Marcus Vance", mqlDate: "2026-04-01", sqlDate: "2026-04-03", dealValue: 115000, winLossReason: "Integrates with existing Salesforce", salesCycleDays: 27, productLine: "CPQ Automation", csatScore: 4.9 }
];

export interface DataAnalystDashboardProps {
  onBackToChat?: () => void;
}

export const DataAnalystDashboard: React.FC<DataAnalystDashboardProps> = ({ onBackToChat }) => {
  // Authentication & Google Docs FRD Sync state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [frdStatus, setFrdStatus] = useState<"idle" | "fetching" | "synced" | "error">("idle");
  const [frdContent, setFrdContent] = useState<string | null>(null);
  const [frdError, setFrdError] = useState<string | null>(null);

  // Filter States
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedSegment, setSelectedSegment] = useState<string>("All");
  const [selectedLeadSource, setSelectedLeadSource] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"kpi_scripts" | "overview" | "funnel" | "sql_workbench" | "frd_specs" | "data_table">("kpi_scripts");

  // SQL Query Workbench state
  const [sqlQuery, setSqlQuery] = useState<string>(
    "SELECT leadSource, COUNT(id) as totalLeads, SUM(dealValue) as totalARR, AVG(salesCycleDays) as avgCycleDays\nFROM gtm_pipeline_records\nWHERE stage = 'Closed Won'\nGROUP BY leadSource\nORDER BY totalARR DESC;"
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

  // Filtered dataset
  const filteredData = useMemo(() => {
    return RAW_DATASET.filter((row) => {
      if (selectedRegion !== "All" && row.region !== selectedRegion) return false;
      if (selectedSegment !== "All" && row.segment !== selectedSegment) return false;
      if (selectedLeadSource !== "All" && row.leadSource !== selectedLeadSource) return false;
      if (selectedProduct !== "All" && row.productLine !== selectedProduct) return false;
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesRep = row.assignedRep.toLowerCase().includes(query);
        const matchesId = row.id.toLowerCase().includes(query);
        const matchesSource = row.leadSource.toLowerCase().includes(query);
        const matchesReason = row.winLossReason?.toLowerCase().includes(query) || false;
        if (!matchesRep && !matchesId && !matchesSource && !matchesReason) return false;
      }
      return true;
    });
  }, [selectedRegion, selectedSegment, selectedLeadSource, selectedProduct, searchTerm]);

  // Metric Calculations according to Functional Requirement Document (FRD) specs
  // Strict rule: If metric cannot be computed or has 0 valid samples, output "Null"
  const totalLeadsCount = filteredData.length;

  const totalARRWon = useMemo(() => {
    const wonRecords = filteredData.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
    if (wonRecords.length === 0) return "Null";
    const sum = wonRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0);
    return sum;
  }, [filteredData]);

  const pipelineOpportunityValue = useMemo(() => {
    const oppRecords = filteredData.filter((r) => r.stage === "Opportunity" && r.dealValue !== null);
    if (oppRecords.length === 0) return "Null";
    const sum = oppRecords.reduce((acc, r) => acc + (r.dealValue || 0), 0);
    return sum;
  }, [filteredData]);

  const mqlToSqlConversionRate = useMemo(() => {
    if (filteredData.length === 0) return "Null";
    const sqlCount = filteredData.filter((r) => r.stage !== "MQL").length;
    return ((sqlCount / filteredData.length) * 100).toFixed(1) + "%";
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

  const avgCSATScore = useMemo(() => {
    const csatRecords = filteredData.filter((r) => r.csatScore !== null && r.csatScore !== undefined);
    if (csatRecords.length === 0) return "Null";
    const avg = csatRecords.reduce((acc, r) => acc + (r.csatScore || 0), 0) / csatRecords.length;
    return avg.toFixed(2) + " / 5.0";
  }, [filteredData]);

  // Lead Source breakdown
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

  // Simple In-Browser SQL query evaluator for the workbench
  const runCustomQuery = () => {
    setSqlError(null);
    try {
      // Mock execution engine parsing SQL Workbench
      const q = sqlQuery.toLowerCase();
      if (!q.includes("select")) {
        throw new Error("Invalid SQL syntax: Query must start with SELECT.");
      }

      if (q.includes("leadsource") && q.includes("arr")) {
        const rows = sourceBreakdown.map((s) => [s.source, s.count, "$" + s.arr.toLocaleString(), s.winRate]);
        setSqlResult({
          headers: ["Lead Source", "Total Leads", "Total ARR Won", "Source Win Rate"],
          rows
        });
      } else if (q.includes("region")) {
        const regionMap: Record<string, number> = {};
        filteredData.forEach((r) => {
          regionMap[r.region] = (regionMap[r.region] || 0) + (r.dealValue || 0);
        });
        const rows = Object.entries(regionMap).map(([reg, val]) => [reg, "$" + val.toLocaleString()]);
        setSqlResult({
          headers: ["Region", "Total Booked ARR"],
          rows
        });
      } else {
        // Generic return of filtered dataset subset
        const rows = filteredData.slice(0, 8).map((r) => [
          r.id,
          r.leadSource,
          r.stage,
          r.dealValue ? "$" + r.dealValue.toLocaleString() : "Null",
          r.salesCycleDays ? `${r.salesCycleDays}d` : "Null",
          r.assignedRep
        ]);
        setSqlResult({
          headers: ["Record ID", "Lead Source", "Pipeline Stage", "Deal Value (ARR)", "Sales Cycle", "Assigned Rep"],
          rows
        });
      }
    } catch (err: any) {
      setSqlError(err?.message || "SQL Syntax Error");
      setSqlResult(null);
    }
  };

  // Execute initial SQL query on mount
  useEffect(() => {
    runCustomQuery();
  }, [filteredData]);

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
              Built per Functional Requirement Document • Google Docs ID: <code className="font-mono text-zinc-700">11QOvpvGO5fRvta...</code>
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
                  Functional Requirement Document (FRD) Synchronization
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
                Metrics and analytical cards strictly adhere to the FRD specifications. Metric fields without sufficient data or computable algorithms strictly output <span className="font-mono font-bold text-rose-600 bg-rose-50 px-1 py-0.2 rounded border border-rose-200">"Null"</span> per business rule.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <a
              href="https://docs.google.com/document/d/11QOvpvGO5fRvtaOIBa_9mzvPNQyUrgo5S7KBUFUElHg/edit?pli=1&tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer transition-all flex items-center gap-1"
            >
              <span>View Source Google Doc</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
            </a>
          </div>
        </div>

        {/* Key Performance Indicators (KPI Cards per FRD Requirements) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* KPI 1: Booked ARR */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Total Booked ARR</span>
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {totalARRWon !== "Null" ? `$${(totalARRWon as number).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Closed Won deals</span>
              <span className="text-emerald-700 font-bold font-mono">Active cohort</span>
            </div>
          </div>

          {/* KPI 2: Open Pipeline */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Open Pipeline</span>
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {pipelineOpportunityValue !== "Null" ? `$${(pipelineOpportunityValue as number).toLocaleString()}` : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Active Opportunities</span>
              <span className="text-blue-700 font-bold font-mono">In flight</span>
            </div>
          </div>

          {/* KPI 3: Win Rate */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Opportunity Win Rate</span>
                <Target className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {winRate !== "Null" ? winRate : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Won / (Won + Lost)</span>
              <span className="text-purple-700 font-bold font-mono">Conversion</span>
            </div>
          </div>

          {/* KPI 4: MQL to SQL */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">MQL → SQL Velocity</span>
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {mqlToSqlConversionRate !== "Null" ? mqlToSqlConversionRate : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Qualification rate</span>
              <span className="text-amber-700 font-bold font-mono">Funnel</span>
            </div>
          </div>

          {/* KPI 5: Avg Sales Cycle */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Avg Sales Cycle</span>
                <Calendar className="h-3.5 w-3.5 text-indigo-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {avgSalesCycleDays !== "Null" ? avgSalesCycleDays : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>First Touch to Close</span>
              <span className="text-indigo-700 font-bold font-mono">Speed</span>
            </div>
          </div>

          {/* KPI 6: Customer CSAT */}
          <div className="bg-white border-3 border-ink rounded-2xl p-4 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Avg Post-Close CSAT</span>
                <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              </div>
              <div className="font-hand text-2xl font-black text-ink">
                {avgCSATScore !== "Null" ? avgCSATScore : <span className="text-rose-500 font-mono">Null</span>}
              </div>
            </div>
            <div className="font-sans text-[10px] text-zinc-500 mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span>Customer Satisfaction</span>
              <span className="text-teal-700 font-bold font-mono">NPS / CSAT</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-ink pb-2">
          <button
            onClick={() => setActiveTab("kpi_scripts")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "kpi_scripts"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <span>⚡ Metric Lookup & Script Generator</span>
            <span className="px-1.5 py-0.2 bg-teal-800/80 text-teal-200 text-[10px] rounded font-mono">{KPI_MASTER_DATA.length} KPIs</span>
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            📊 Executive Analytics & Charts
          </button>
          <button
            onClick={() => setActiveTab("funnel")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "funnel"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            🌪️ Conversion Funnel Analysis
          </button>
          <button
            onClick={() => setActiveTab("sql_workbench")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "sql_workbench"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            💻 SQL Query Workbench
          </button>
          <button
            onClick={() => setActiveTab("data_table")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "data_table"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            📋 Raw Data Records ({filteredData.length})
          </button>
          <button
            onClick={() => setActiveTab("frd_specs")}
            className={`px-4 py-2 font-hand text-sm font-bold rounded-lg border-2 border-ink transition-all cursor-pointer ${
              activeTab === "frd_specs"
                ? "bg-highlight text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] translate-y-[-1px]"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            📑 FRD Functional Specifications
          </button>
        </div>

        {/* Tab 0: Metric Lookup & Script Generator */}
        {activeTab === "kpi_scripts" && (
          <div className="w-full">
            <MetricLookupScriptGenerator />
          </div>
        )}

        {/* Tab 1: Executive Analytics & Charts */}
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

        {/* Tab 2: Conversion Funnel Analysis */}
        {activeTab === "funnel" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-4 mb-6">
              <div>
                <h3 className="font-hand text-xl font-bold text-ink">GTM Revenue Waterfall & Stage Conversion</h3>
                <p className="font-sans text-xs text-zinc-500 mt-0.5">
                  End-to-end telemetry from raw Marketing Qualified Lead (MQL) through Closed Won booking.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200 font-mono text-xs font-bold text-indigo-700">
                Cohort Conversion
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Stage 1: MQL */}
              <div className="bg-zinc-50 border-2 border-ink rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Stage 1</span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700 font-mono text-[10px] font-bold">100% Ingress</span>
                  </div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">MQL Created</h4>
                  <div className="font-hand text-3xl font-black text-ink mt-2">{filteredData.length}</div>
                </div>
                <p className="font-sans text-xs text-zinc-500 mt-3 pt-2 border-t border-zinc-200">
                  Total marketing inquiries filtered across selected cohorts.
                </p>
              </div>

              {/* Stage 2: SQL */}
              <div className="bg-zinc-50 border-2 border-ink rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Stage 2</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                      {mqlToSqlConversionRate} Pass
                    </span>
                  </div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">SQL Validated</h4>
                  <div className="font-hand text-3xl font-black text-ink mt-2">
                    {filteredData.filter((r) => r.stage !== "MQL").length}
                  </div>
                </div>
                <p className="font-sans text-xs text-zinc-500 mt-3 pt-2 border-t border-zinc-200">
                  Sales accepted leads meeting BANT & qualification standards.
                </p>
              </div>

              {/* Stage 3: Opportunity */}
              <div className="bg-zinc-50 border-2 border-ink rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase">Stage 3</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">In Flight</span>
                  </div>
                  <h4 className="font-sans font-extrabold text-base text-zinc-900">Active Opportunity</h4>
                  <div className="font-hand text-3xl font-black text-ink mt-2">
                    {filteredData.filter((r) => r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost").length}
                  </div>
                </div>
                <p className="font-sans text-xs text-zinc-500 mt-3 pt-2 border-t border-zinc-200">
                  Deals in CPQ quoting, legal review, and executive evaluation.
                </p>
              </div>

              {/* Stage 4: Closed Won */}
              <div className="bg-emerald-50 border-2 border-ink rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">Stage 4</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 font-mono text-[10px] font-bold">
                      {winRate} Won
                    </span>
                  </div>
                  <h4 className="font-sans font-extrabold text-base text-emerald-950">Closed Won Booked</h4>
                  <div className="font-hand text-3xl font-black text-emerald-900 mt-2">
                    {filteredData.filter((r) => r.stage === "Closed Won").length}
                  </div>
                </div>
                <p className="font-sans text-xs text-emerald-700 mt-3 pt-2 border-t border-emerald-200">
                  Booked ARR: <strong className="font-mono">${totalARRWon !== "Null" ? (totalARRWon as number).toLocaleString() : "Null"}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SQL Workbench */}
        {activeTab === "sql_workbench" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
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
                className="w-full bg-zinc-950 text-emerald-400 font-mono text-xs sm:text-sm p-4 focus:outline-none focus:ring-0 leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Error or Result Output */}
            {sqlError && (
              <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs font-mono text-rose-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{sqlError}</span>
              </div>
            )}

            {sqlResult && (
              <div className="border-2 border-ink rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                <div className="bg-zinc-100 px-4 py-2 font-mono text-xs font-bold text-zinc-700 border-b-2 border-ink flex items-center justify-between">
                  <span>Query Execution Output ({sqlResult.rows.length} rows returned)</span>
                  <span className="text-emerald-700 font-bold">Status: 200 OK • Execution: 4ms</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-zinc-50 border-b border-zinc-200">
                      <tr>
                        {sqlResult.headers.map((h, i) => (
                          <th key={i} className="px-4 py-2.5 font-mono font-bold text-zinc-700">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {sqlResult.rows.map((r, i) => (
                        <tr key={i} className="hover:bg-zinc-50">
                          {r.map((val: any, j: number) => (
                            <td key={j} className="px-4 py-2 font-sans text-zinc-800">
                              {val === null || val === undefined ? <span className="font-mono text-rose-500">Null</span> : val}
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

        {/* Tab 4: Raw Data Records */}
        {activeTab === "data_table" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div>
                <h3 className="font-hand text-lg font-bold text-ink flex items-center gap-2">
                  <TableIcon className="h-5 w-5 text-indigo-600" />
                  Telemetry Master Dataset
                </h3>
                <p className="font-sans text-xs text-zinc-500">
                  Showing {filteredData.length} records matching current slice parameters. Missing values render as "Null".
                </p>
              </div>
            </div>

            <div className="border-2 border-ink rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 border-b-2 border-ink">
                  <tr>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Record ID</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Lead Source</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Region</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Segment</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Stage</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Rep</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">ARR Deal Value</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">Cycle Days</th>
                    <th className="px-3 py-2.5 font-mono font-bold text-zinc-800">CSAT Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50">
                      <td className="px-3 py-2 font-mono font-bold text-zinc-900">{row.id}</td>
                      <td className="px-3 py-2 font-sans text-zinc-700">{row.leadSource}</td>
                      <td className="px-3 py-2 font-sans text-zinc-700">{row.region}</td>
                      <td className="px-3 py-2 font-sans text-zinc-700">{row.segment}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                            row.stage === "Closed Won"
                              ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                              : row.stage === "Closed Lost"
                              ? "bg-rose-100 border-rose-300 text-rose-800"
                              : row.stage === "Opportunity"
                              ? "bg-blue-100 border-blue-300 text-blue-800"
                              : "bg-zinc-100 border-zinc-300 text-zinc-700"
                          }`}
                        >
                          {row.stage}
                        </span>
                      </td>
                      <td className="px-3 py-2 font-sans text-zinc-800">{row.assignedRep}</td>
                      <td className="px-3 py-2 font-mono font-bold text-zinc-900">
                        {row.dealValue !== null ? `$${row.dealValue.toLocaleString()}` : <span className="text-rose-500 font-bold">Null</span>}
                      </td>
                      <td className="px-3 py-2 font-mono text-zinc-700">
                        {row.salesCycleDays !== null ? `${row.salesCycleDays} days` : <span className="text-rose-500 font-bold">Null</span>}
                      </td>
                      <td className="px-3 py-2 font-mono text-zinc-700">
                        {row.csatScore !== null ? `${row.csatScore} / 5` : <span className="text-rose-500 font-bold">Null</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: FRD Functional Specifications */}
        {activeTab === "frd_specs" && (
          <div className="bg-white border-3 border-ink rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-5">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div>
                <h3 className="font-hand text-xl font-bold text-ink flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  FRD Requirements Document Reference
                </h3>
                <p className="font-sans text-xs text-zinc-500 mt-0.5">
                  Specification guidelines governing dashboard calculations, metric fallbacks, and user interaction design.
                </p>
              </div>

              <a
                href="https://docs.google.com/document/d/11QOvpvGO5fRvtaOIBa_9mzvPNQyUrgo5S7KBUFUElHg/edit?pli=1&tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Google Doc</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink">1. Strict Metric Fallback Rule</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Whenever an analytical calculation, metric card, SQL aggregation, or cohort filter has zero samples, invalid data types, or cannot produce a computed value, the engine must strictly output <strong>"Null"</strong> rather than placeholder zeros, dashes, or NaN.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink">2. Open Dashboard Navigation Linkage</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Users clicking on the <em>Open Dashboard</em> button on the Let's Chat page launchpad are routed directly to this functional dashboard and analytics workbench.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink">3. Cohort Slicers & Dimension Filtering</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Real-time dynamic re-computation across Geographic Region, Customer Segment, Acquisition Channel, and Product Line dimensions with instant KPI recalculation.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 border-2 border-ink rounded-xl space-y-2">
                <h4 className="font-hand text-base font-bold text-ink">4. SQL Query Workbench</h4>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                  Interactive SQL syntax execution allowing analysts to test custom queries, inspect result schemas, and copy sanitized queries to the clipboard.
                </p>
              </div>
            </div>

            {frdContent && (
              <div className="mt-4 p-4 bg-amber-50/50 border-2 border-amber-200 rounded-xl space-y-2">
                <h4 className="font-mono text-xs font-bold text-amber-900 uppercase">Live Document Text Snippet</h4>
                <pre className="font-mono text-xs text-zinc-700 max-h-48 overflow-y-auto whitespace-pre-wrap bg-white p-3 border border-amber-200 rounded-lg">
                  {frdContent}
                </pre>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};
