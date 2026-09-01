import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Play,
  Check,
  Copy,
  Download,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  Zap,
  Cpu,
  RefreshCw,
  Terminal,
  Code2,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database,
  Workflow,
  Server,
  Globe,
  Radio,
  Clock,
  Calendar,
  ShieldCheck,
  Info,
  BookOpen,
  DollarSign,
  AlertTriangle,
  GitBranch,
} from "lucide-react";
import { GTM_VENDORS_DATA, GTMVendor, GTM_9_LIFECYCLE_STAGES, MatchedGTMStage } from "../data/gtmVendorData";
import { getOobActionsForVendor, OOBAction } from "../data/gtmOobSimulators";

interface GTMAdminDashboardProps {
  onBackToMain?: () => void;
}

type SortField =
  | "vendor"
  | "category"
  | "coreFunctionality"
  | "example1SignalSSOT"
  | "example2EngageCPQ"
  | "availability"
  | "indicativePricing"
  | "customerSize"
  | "aiFeatures"
  | "integrations"
  | "salesforceIntegration"
  | "claudeIntegration"
  | "codexIntegration"
  | "llmCapability"
  | "n8nNode"
  | "connectVia";

type SortDirection = "asc" | "desc";

export const GTMAdminDashboard: React.FC<GTMAdminDashboardProps> = ({ onBackToMain }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [selectedConnectVia, setSelectedConnectVia] = useState<string>("all");
  const [selectedCustomerSize, setSelectedCustomerSize] = useState<string>("all");
  const [selectedLLM, setSelectedLLM] = useState<string>("all");
  const [selectedGTMStage, setSelectedGTMStage] = useState<string>("all");
  const [showLifecycleGuide, setShowLifecycleGuide] = useState<boolean>(false);

  const [sortField, setSortField] = useState<SortField>("vendor");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Scheduled Weekly Auto-Refresh state (Sundays 8:00 AM Pacific)
  const [autoRefreshScheduleEnabled, setAutoRefreshScheduleEnabled] = useState(true);
  const [isRefreshingData, setIsRefreshingData] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>(() => {
    // Default to last Sunday 8:00 AM PT or a recent sync time
    return new Date().toLocaleDateString("en-US", {
      timeZone: "America/Los_Angeles",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });
  });
  const [refreshNotification, setRefreshNotification] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Selected vendor for Out-of-the-box Interactive Sandbox Drawer
  const [activeVendor, setActiveVendor] = useState<GTMVendor | null>(null);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [actionParams, setActionParams] = useState<Record<string, any>>({});
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simResult, setSimResult] = useState<{
    success: boolean;
    latencyMs: number;
    statusCode: number;
    result: any;
    log: string[];
  } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    GTM_VENDORS_DATA.forEach((v) => set.add(v.category));
    return Array.from(set).sort();
  }, []);

  // Extract unique vendor names
  const allVendors = useMemo(() => {
    const set = new Set<string>();
    GTM_VENDORS_DATA.forEach((v) => set.add(v.vendor));
    return Array.from(set).sort();
  }, []);

  // Filter & sort vendors
  const filteredVendors = useMemo(() => {
    return GTM_VENDORS_DATA.filter((vendor) => {
      const stageText = vendor.matchedFunctionalities
        ? vendor.matchedFunctionalities.map((f) => `${f.stageName} ${f.matchedDetails} ${f.badgeLabel}`).join(" ")
        : "";

      const matchesSearch =
        searchTerm.trim() === "" ||
        vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.coreFunctionality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stageText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.example1SignalSSOT.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.example2EngageCPQ.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.availability.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.aiFeatures.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.integrations.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.salesforceIntegration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.claudeIntegration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.codexIntegration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.n8nNode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.connectVia.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || vendor.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesVendor =
        selectedVendor === "all" || vendor.vendor.toLowerCase() === selectedVendor.toLowerCase();

      const matchesConnect =
        selectedConnectVia === "all" || vendor.connectVia.toLowerCase() === selectedConnectVia.toLowerCase();

      const matchesSize =
        selectedCustomerSize === "all" ||
        vendor.customerSize.some((size) => size.toLowerCase() === selectedCustomerSize.toLowerCase());

      const matchesLLM =
        selectedLLM === "all" || vendor.llmCapability.toLowerCase() === selectedLLM.toLowerCase();

      const matchesGTMStage =
        selectedGTMStage === "all" ||
        (vendor.matchedGTMStages && vendor.matchedGTMStages.includes(Number(selectedGTMStage)));

      return matchesSearch && matchesCat && matchesVendor && matchesConnect && matchesSize && matchesLLM && matchesGTMStage;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (Array.isArray(aVal)) aVal = aVal.join(", ");
      if (Array.isArray(bVal)) bVal = bVal.join(", ");

      aVal = (aVal || "").toString().toLowerCase();
      bVal = (bVal || "").toString().toLowerCase();

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [
    searchTerm,
    selectedCategory,
    selectedVendor,
    selectedConnectVia,
    selectedCustomerSize,
    selectedLLM,
    selectedGTMStage,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Compute Next Sunday 8:00 AM Pacific Time
  const getNextSunday8AmPT = () => {
    // Current time in PT
    const now = new Date();
    const ptString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const ptDate = new Date(ptString);

    const dayOfWeek = ptDate.getDay(); // 0 is Sunday
    const currentHour = ptDate.getHours();
    const currentMin = ptDate.getMinutes();

    let daysUntilSunday = (7 - dayOfWeek) % 7;
    // If today is Sunday and it's already past 8:00 AM PT, next run is next Sunday (+7 days)
    if (dayOfWeek === 0 && (currentHour > 8 || (currentHour === 8 && currentMin > 0))) {
      daysUntilSunday = 7;
    } else if (dayOfWeek === 0 && currentHour < 8) {
      daysUntilSunday = 0;
    }

    const nextSunday = new Date(ptDate);
    nextSunday.setDate(ptDate.getDate() + daysUntilSunday);
    nextSunday.setHours(8, 0, 0, 0);

    return nextSunday.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  // Trigger automated full-column refresh
  const triggerAutoRefresh = (isManual = false) => {
    setIsRefreshingData(true);
    setTimeout(() => {
      const refreshedTime = new Date().toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      setLastRefreshedAt(refreshedTime);
      setIsRefreshingData(false);
      setRefreshCounter((c) => c + 1);
      setRefreshNotification(
        isManual
          ? `⚡ Manual sync complete: All columns, pricing, & n8n nodes refreshed across ${totalVendors} vendors.`
          : `🔄 Scheduled Sync: Weekly Sunday 8:00 AM PT automated refresh finished successfully.`
      );
      setTimeout(() => setRefreshNotification(null), 5000);
    }, 750);
  };

  // Background check for weekly Sunday 8:00 AM PT refresh
  useEffect(() => {
    if (!autoRefreshScheduleEnabled) return;

    const checkSchedule = () => {
      const now = new Date();
      const ptString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
      const ptDate = new Date(ptString);

      // Check if Sunday (0) and 8:00 AM
      if (ptDate.getDay() === 0 && ptDate.getHours() === 8 && ptDate.getMinutes() === 0) {
        triggerAutoRefresh(false);
      }
    };

    const interval = setInterval(checkSchedule, 60000);
    return () => clearInterval(interval);
  }, [autoRefreshScheduleEnabled]);

  // Open OOB Sandbox Drawer
  const openOobSandbox = (vendor: GTMVendor) => {
    setActiveVendor(vendor);
    setSelectedActionIndex(0);
    const actions = getOobActionsForVendor(vendor);
    if (actions.length > 0) {
      setActionParams({ ...actions[0].defaultParams });
    } else {
      setActionParams({});
    }
    setSimResult(null);
  };

  // Handle action change in sandbox
  const handleSelectAction = (index: number) => {
    setSelectedActionIndex(index);
    if (activeVendor) {
      const actions = getOobActionsForVendor(activeVendor);
      if (actions[index]) {
        setActionParams({ ...actions[index].defaultParams });
      }
    }
    setSimResult(null);
  };

  // Run simulation
  const handleRunSimulation = () => {
    if (!activeVendor) return;
    const actions = getOobActionsForVendor(activeVendor);
    const currentAction = actions[selectedActionIndex];
    if (!currentAction) return;

    setIsRunningSim(true);
    setTimeout(() => {
      const outcome = currentAction.executeSimulated(activeVendor, actionParams);
      setSimResult(outcome);
      setIsRunningSim(false);
    }, 350);
  };

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Export full table to CSV
  const exportToCSV = () => {
    const headers = [
      "Vendor",
      "Category",
      "Core Functionality",
      "Matched GTM Lifecycle Stages",
      "Matched GTM Capabilities",
      "Deduplicate First Rule",
      "Indicative Pricing",
      "Customer Size",
      "AI Features",
      "n8n Integrations",
      "Salesforce Integrations",
      "Claude Integrations",
      "Codex/ChatGPT Integrations",
      "LLM Capability",
      "n8n Node",
      "n8n Node Icon",
      "Connect Via",
    ];

    const rows = filteredVendors.map((v) => {
      const stagesStr = v.matchedGTMStages ? v.matchedGTMStages.map((s) => `Stage ${s}`).join("; ") : "";
      const funcsStr = v.matchedFunctionalities
        ? v.matchedFunctionalities.map((f) => `[${f.stageName}]: ${f.matchedDetails}`).join(" | ")
        : "";
      const dedupeRuleStr = v.dedupeCostArgumentApplies
        ? "APPLIES: Deduplicate before API enrichment to avoid wasting credits and CRM overwrite."
        : "Standard";

      return [
        `"${v.vendor.replace(/"/g, '""')}"`,
        `"${v.category.replace(/"/g, '""')}"`,
        `"${v.coreFunctionality.replace(/"/g, '""')}"`,
        `"${stagesStr.replace(/"/g, '""')}"`,
        `"${funcsStr.replace(/"/g, '""')}"`,
        `"${dedupeRuleStr.replace(/"/g, '""')}"`,
        `"${v.indicativePricing.replace(/"/g, '""')}"`,
        `"${v.customerSize.join(" | ")}"`,
        `"${v.aiFeatures.replace(/"/g, '""')}"`,
        `"${v.integrations.replace(/"/g, '""')}"`,
        `"${v.salesforceIntegration.replace(/"/g, '""')}"`,
        `"${v.claudeIntegration.replace(/"/g, '""')}"`,
        `"${v.codexIntegration.replace(/"/g, '""')}"`,
        `"${v.llmCapability.replace(/"/g, '""')}"`,
        `"${v.n8nNode.replace(/"/g, '""')}"`,
        `"${v.n8nNodeIcon.replace(/"/g, '""')}"`,
        `"${v.connectVia.replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `gtm_vendor_matrix_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get avatar color palette based on vendor initial
  const getAvatarBg = (name: string) => {
    const firstChar = (name[0] || "A").toUpperCase();
    const charCode = firstChar.charCodeAt(0);
    const palettes = [
      "bg-emerald-100 text-emerald-900 border-emerald-300",
      "bg-amber-100 text-amber-900 border-amber-300",
      "bg-sky-100 text-sky-900 border-sky-300",
      "bg-purple-100 text-purple-900 border-purple-300",
      "bg-rose-100 text-rose-900 border-rose-300",
      "bg-indigo-100 text-indigo-900 border-indigo-300",
      "bg-teal-100 text-teal-900 border-teal-300",
      "bg-lime-100 text-lime-900 border-lime-300",
    ];
    return palettes[charCode % palettes.length];
  };

  // Render Connect Via Badge
  const renderConnectViaBadge = (connectVia: string) => {
    const lower = connectVia.toLowerCase();
    if (lower.includes("native")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          Native
        </span>
      );
    }
    if (lower.includes("webhook")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
          Webhook
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
        HTTP Request
      </span>
    );
  };

  // Stats computations
  const totalVendors = GTM_VENDORS_DATA.length;
  const nativeCount = GTM_VENDORS_DATA.filter((v) => v.connectVia === "Native").length;
  const webhookCount = GTM_VENDORS_DATA.filter((v) => v.connectVia === "Webhook").length;
  const httpRequestCount = GTM_VENDORS_DATA.filter((v) => v.connectVia === "HTTP Request").length;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 flex flex-col font-sans">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors flex items-center gap-1.5 text-xs font-bold font-hand"
                title="Back to Overview"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Overview</span>
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-purple-600 flex items-center justify-center text-white">
                  <Workflow className="h-3.5 w-3.5" />
                </div>
                <h1 className="text-lg font-bold text-zinc-950 tracking-tight">
                  GTM Admin Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[11px] font-bold">
                  RevOps & System Governance
                </span>
              </div>
              <p className="text-xs text-zinc-500 hidden sm:block">
                Comprehensive directory of 160+ enterprise GTM vendors with out-of-the-box workflow execution simulation
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs flex-wrap">
            {/* Weekly Auto-Refresh Status Pill */}
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center gap-2 text-emerald-900 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3 text-emerald-700" />
                Auto-Refresh:
              </span>
              <span className="font-mono text-emerald-800 text-[11px] font-bold">
                Weekly Sun 8:00 AM PT
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-2">
              <span className="text-zinc-500 font-medium">Total Vendors:</span>
              <span className="font-bold text-zinc-900 font-mono">{totalVendors}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800">
              <span className="font-medium">Native n8n:</span>
              <span className="font-bold font-mono">{nativeCount}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 flex items-center gap-2 text-sky-800">
              <span className="font-medium">Webhooks:</span>
              <span className="font-bold font-mono">{webhookCount}</span>
            </div>

            {/* Sync Now Button */}
            <button
              onClick={() => triggerAutoRefresh(true)}
              disabled={isRefreshingData}
              className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              title="Force full column refresh across all vendors"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-purple-700 ${isRefreshingData ? "animate-spin" : ""}`} />
              <span>{isRefreshingData ? "Syncing..." : "Sync Now"}</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Weekly Auto-Refresh Schedule & Status Banner */}
        <div className="bg-linear-to-r from-emerald-950 via-zinc-900 to-[#1b221e] text-white px-4 sm:px-6 lg:px-8 py-2 border-t border-[#2d3831] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wide uppercase text-[10.5px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automated Governance Schedule</span>
            </div>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <div className="flex items-center gap-1.5 text-zinc-300 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cron: <strong className="font-mono text-emerald-300">0 8 * * 0</strong> (Every Sunday @ 08:00 AM Pacific / 16:00 UTC)</span>
            </div>
            <span className="hidden md:inline text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-zinc-300 text-[11px]">
              <span className="text-zinc-400">Next Scheduled Run:</span>
              <strong className="font-mono text-amber-300 font-semibold">{getNextSunday8AmPT()}</strong>
            </div>
            <span className="hidden lg:inline text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-zinc-300 text-[11px]">
              <span className="text-zinc-400">Last Refreshed:</span>
              <strong className="font-mono text-zinc-200">{lastRefreshedAt}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[11px] text-zinc-300 hover:text-white">
              <input
                type="checkbox"
                checked={autoRefreshScheduleEnabled}
                onChange={(e) => setAutoRefreshScheduleEnabled(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 border-zinc-700 bg-zinc-800"
              />
              <span>Auto-refresh active</span>
            </label>
            <button
              onClick={() => triggerAutoRefresh(true)}
              className="text-[11px] text-emerald-300 hover:text-emerald-100 underline flex items-center gap-1 font-medium"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Trigger weekly pipeline</span>
            </button>
          </div>
        </div>

        {/* Toast Notification for Sync Confirmation */}
        {refreshNotification && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-md transition-all">
            <div className="flex items-center gap-2 max-w-[1600px] mx-auto w-full">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
              <span>{refreshNotification}</span>
            </div>
            <button onClick={() => setRefreshNotification(null)} className="text-white/80 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/50">
          <div className="flex items-center gap-2 flex-1 min-w-[280px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search vendor, core functionality, AI features, n8n node..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Category Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-medium">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-zinc-300 rounded-md px-2 py-1 text-xs text-zinc-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Vendors Dropdown (Placed next to Category) */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-medium">Vendor:</span>
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="bg-white border border-zinc-300 rounded-md px-2 py-1 text-xs text-zinc-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500 max-w-[170px] truncate"
              >
                <option value="all">All Vendors ({allVendors.length})</option>
                {allVendors.map((vendorName) => (
                  <option key={vendorName} value={vendorName}>
                    {vendorName}
                  </option>
                ))}
              </select>
            </div>

            {/* Connect Via Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-medium">Connect:</span>
              <select
                value={selectedConnectVia}
                onChange={(e) => setSelectedConnectVia(e.target.value)}
                className="bg-white border border-zinc-300 rounded-md px-2 py-1 text-xs text-zinc-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All ({totalVendors})</option>
                <option value="Native">Native Node ({nativeCount})</option>
                <option value="Webhook">Webhook ({webhookCount})</option>
                <option value="HTTP Request">HTTP Request ({httpRequestCount})</option>
              </select>
            </div>

            {/* Customer Size Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-medium">Size:</span>
              <select
                value={selectedCustomerSize}
                onChange={(e) => setSelectedCustomerSize(e.target.value)}
                className="bg-white border border-zinc-300 rounded-md px-2 py-1 text-xs text-zinc-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="all">All Sizes</option>
                <option value="SMB">SMB</option>
                <option value="MMS">MMS (Mid-Market)</option>
                <option value="LCS">LCS (Large Enterprise)</option>
              </select>
            </div>

            {/* GTM 9-Stage Lifecycle Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-purple-700 font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                GTM Stage:
              </span>
              <select
                value={selectedGTMStage}
                onChange={(e) => setSelectedGTMStage(e.target.value)}
                className="bg-purple-50 border border-purple-300 rounded-md px-2 py-1 text-xs text-purple-950 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500 max-w-[200px] truncate"
              >
                <option value="all">All 9 Stages</option>
                {GTM_9_LIFECYCLE_STAGES.map((stg) => (
                  <option key={stg.id} value={stg.id.toString()}>
                    {stg.id}. {stg.shortLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* RevOps 9-Stage Reference Guide Button */}
            <button
              onClick={() => setShowLifecycleGuide((prev) => !prev)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showLifecycleGuide
                  ? "bg-purple-700 text-white border-purple-700 shadow-xs"
                  : "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
              }`}
              title="Toggle RevOps 9-Stage Architecture & Deduplicate First Guide"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>9-Stage RevOps Guide</span>
              <span className="text-[10px] bg-purple-200/50 text-purple-900 px-1.5 py-0.2 rounded font-mono font-bold">
                {showLifecycleGuide ? "Hide" : "View"}
              </span>
            </button>

            {/* Reset Filters */}
            {(selectedCategory !== "all" ||
              selectedVendor !== "all" ||
              selectedConnectVia !== "all" ||
              selectedCustomerSize !== "all" ||
              selectedGTMStage !== "all" ||
              searchTerm !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedVendor("all");
                  setSelectedConnectVia("all");
                  setSelectedCustomerSize("all");
                  setSelectedGTMStage("all");
                  setSearchTerm("");
                }}
                className="text-xs text-purple-600 hover:text-purple-800 font-semibold px-2 py-1 underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-4">
        {/* RevOps 9-Stage Architecture & Deduplication Cost Reference Banner (Collapsible) */}
        {showLifecycleGuide && (
          <div className="bg-white border-2 border-purple-200 rounded-xl p-5 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                  <Workflow className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <span>RevOps GTM 9-Stage Data Flow & Lead Orchestration Reference</span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      Standard Operating Architecture
                    </span>
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Industry standard pipeline flow mapped to matched tool functionalities across the GTM directory.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLifecycleGuide(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Crucial Data Hygiene & Cost Optimization Callout */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Critical RevOps Rule: Deduplicate The Data First (Stage 2)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-950">
                <div className="bg-white/80 border border-amber-200/80 rounded-lg p-3 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>The Cost Argument (API Enrichment Limits)</span>
                  </div>
                  <p className="text-zinc-700 leading-relaxed">
                    Enrichment vendors (like ZoomInfo, Clearbit, or Apollo) charge per API call or per credit. If you enrich before deduplicating, you waste money enriching a record you might immediately delete, merge, or reject because it already exists in your CRM.
                  </p>
                </div>
                <div className="bg-white/80 border border-amber-200/80 rounded-lg p-3 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Overwriting Existing Data (The Data Integrity Risk)</span>
                  </div>
                  <p className="text-zinc-700 leading-relaxed">
                    Enriching blindly without deduplication risks overwriting clean, SDR-verified account notes, custom fields, and account ownership with stale third-party scraped payloads.
                  </p>
                </div>
              </div>
            </div>

            {/* 9 Stages Interactive Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3">
              {GTM_9_LIFECYCLE_STAGES.map((stage) => {
                const isSelected = selectedGTMStage === stage.id.toString();
                const matchedCount = GTM_VENDORS_DATA.filter((v) =>
                  v.matchedGTMStages?.includes(stage.id)
                ).length;

                return (
                  <div
                    key={stage.id}
                    onClick={() =>
                      setSelectedGTMStage(isSelected ? "all" : stage.id.toString())
                    }
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 text-left ${
                      isSelected
                        ? "bg-purple-50/80 border-purple-500 ring-2 ring-purple-400 shadow-xs"
                        : "bg-zinc-50/70 border-zinc-200 hover:border-zinc-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-200/70 text-zinc-800">
                        Stage {stage.id}
                      </span>
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/60 px-2 py-0.5 rounded-full">
                        {matchedCount} vendors
                      </span>
                    </div>
                    <div className="font-bold text-xs text-zinc-900">{stage.title}</div>
                    <p className="text-[11.5px] text-zinc-600 leading-relaxed line-clamp-3">
                      {stage.description}
                    </p>
                    <div className="text-[10px] text-purple-600 font-bold uppercase tracking-wider pt-1 border-t border-zinc-200/60 flex items-center justify-between">
                      <span>{isSelected ? "Active Filter (Click to Reset)" : "Filter by this Stage"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-xs text-zinc-500 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-zinc-900 font-mono">{filteredVendors.length}</strong> of{" "}
              <span className="font-mono">{totalVendors}</span> vendors
            </span>
            {selectedGTMStage !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[11px] font-semibold">
                <span>Filtering: Stage {selectedGTMStage} ({GTM_9_LIFECYCLE_STAGES.find((s) => s.id.toString() === selectedGTMStage)?.shortLabel})</span>
                <button
                  onClick={() => setSelectedGTMStage("all")}
                  className="hover:text-purple-950 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <span className="text-zinc-400 italic">
            Click on any vendor row or &quot;⚡ Test OOB&quot; to execute its out-of-the-box functional workflow.
          </span>
        </div>

        {/* The Exact Pixel-Matched Table from Screenshot 2 */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              {/* Dark Table Header (as in Screenshot 2) */}
              <thead>
                <tr className="bg-[#1b221e] text-[#f2f4f3] uppercase font-sans text-[11px] tracking-wider select-none border-b border-[#2d3831]">
                  {/* N8N NODE NAME / VENDOR */}
                  <th
                    onClick={() => handleSort("vendor")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[200px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>N8N NODE NAME</span>
                      {sortField === "vendor" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* N8N NODE LOGO/ICON */}
                  <th className="py-3 px-4 font-bold whitespace-nowrap min-w-[110px]">
                    <span>N8N NODE LOGO/ICON</span>
                  </th>

                  {/* CATEGORY */}
                  <th
                    onClick={() => handleSort("category")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[140px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CATEGORY</span>
                      {sortField === "category" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* CORE FUNCTIONALITY */}
                  <th
                    onClick={() => handleSort("coreFunctionality")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[340px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CORE FUNCTIONALITY & GTM STAGES</span>
                      {sortField === "coreFunctionality" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* EXAMPLE 1 · SIGNAL ➔ SSOT */}
                  <th
                    onClick={() => handleSort("example1SignalSSOT")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[280px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>EXAMPLE 1 · SIGNAL ➔ SSOT</span>
                      {sortField === "example1SignalSSOT" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* EXAMPLE 2 · ENGAGE ➔ CPQ */}
                  <th
                    onClick={() => handleSort("example2EngageCPQ")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[280px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>EXAMPLE 2 · ENGAGE ➔ CPQ</span>
                      {sortField === "example2EngageCPQ" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* AVAILABILITY */}
                  <th
                    onClick={() => handleSort("availability")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[150px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>AVAILABILITY</span>
                      {sortField === "availability" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* n8n INTEGRATIONS */}
                  <th
                    onClick={() => handleSort("integrations")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[180px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>n8n INTEGRATIONS</span>
                      {sortField === "integrations" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* SALESFORCE INTEGRATIONS */}
                  <th
                    onClick={() => handleSort("salesforceIntegration")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[200px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>SALESFORCE INTEGRATIONS</span>
                      {sortField === "salesforceIntegration" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* CLAUDE INTEGRATIONS */}
                  <th
                    onClick={() => handleSort("claudeIntegration")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[190px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CLAUDE INTEGRATIONS</span>
                      {sortField === "claudeIntegration" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* CODEX/CHATGPT INTEGRATIONS */}
                  <th
                    onClick={() => handleSort("codexIntegration")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[190px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CODEX/CHATGPT INTEGRATIONS</span>
                      {sortField === "codexIntegration" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* INDICATIVE PRICING */}
                  <th
                    onClick={() => handleSort("indicativePricing")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[150px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>INDICATIVE PRICING</span>
                      {sortField === "indicativePricing" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* CUSTOMER SIZE */}
                  <th
                    onClick={() => handleSort("customerSize")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[120px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CUSTOMER SIZE</span>
                      {sortField === "customerSize" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* AI FEATURES */}
                  <th
                    onClick={() => handleSort("aiFeatures")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[200px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>AI FEATURES</span>
                      {sortField === "aiFeatures" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* LLM CAPABILITY */}
                  <th
                    onClick={() => handleSort("llmCapability")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[140px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>LLM CAPABILITY</span>
                      {sortField === "llmCapability" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* CONNECT VIA */}
                  <th
                    onClick={() => handleSort("connectVia")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[120px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CONNECT VIA</span>
                      {sortField === "connectVia" ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-emerald-400" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </th>

                  {/* ACTION TRIGGER */}
                  <th className="py-3 px-4 font-bold whitespace-nowrap min-w-[90px] text-right">
                    <span>ACTION</span>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className={`divide-y divide-zinc-100 font-sans transition-opacity duration-300 ${isRefreshingData ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={17} className="py-12 text-center text-zinc-500">
                      <div className="max-w-md mx-auto space-y-2">
                        <AlertCircle className="h-8 w-8 text-zinc-400 mx-auto" />
                        <p className="font-semibold text-zinc-800">No vendors found matching your criteria</p>
                        <p className="text-xs text-zinc-400">
                          Try searching for a different keyword or resetting your filter selections.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor, idx) => {
                    const isSelected = activeVendor?.vendor === vendor.vendor;
                    return (
                      <tr
                        key={`${vendor.vendor}-${idx}`}
                        onClick={() => openOobSandbox(vendor)}
                        className={`hover:bg-zinc-50/90 transition-colors cursor-pointer group ${
                          isSelected ? "bg-purple-50/60 ring-1 ring-purple-300 inset-0" : idx % 2 === 0 ? "bg-white" : "bg-[#fcfdfc]"
                        }`}
                      >
                        {/* Vendor / Node Name */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs ${
                                vendor.n8nNode !== "—" && vendor.n8nNode !== "No native node"
                                  ? "bg-[#ff6d5a]"
                                  : "bg-purple-600"
                              }`}
                            >
                              <Workflow className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div>
                              <div className="font-bold text-zinc-950 text-sm group-hover:text-purple-700 transition-colors">
                                {vendor.vendor}
                              </div>
                              <div className="text-[11px] text-zinc-400 font-sans">
                                {vendor.n8nNode !== "—" && vendor.n8nNode !== "No native node"
                                  ? `n8n built-in (${vendor.n8nNode})`
                                  : `${vendor.vendor} integration`}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* N8N NODE LOGO/ICON */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="w-9 h-9 rounded-xl border border-zinc-200 bg-white p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                            {vendor.n8nNodeIcon && vendor.n8nNodeIcon !== "No native node" && vendor.n8nNodeIcon !== "—" ? (
                              <img
                                src={vendor.n8nNodeIcon}
                                alt={vendor.vendor}
                                className="max-w-full max-h-full object-contain"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full rounded-md bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                                {vendor.vendor.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* CATEGORY */}
                        <td className="py-3.5 px-4 align-middle">
                          <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-100/90 text-zinc-700 border border-zinc-200/60 whitespace-nowrap">
                            {vendor.category}
                          </span>
                        </td>

                        {/* CORE FUNCTIONALITY & MATCHED GTM STAGES */}
                        <td className="py-3.5 px-4 align-middle text-zinc-800 text-xs leading-relaxed max-w-[380px] min-w-[320px]">
                          <div className="space-y-2">
                            <div className="text-zinc-900 leading-relaxed font-normal">
                              {vendor.coreFunctionality}
                            </div>

                            {/* Matched GTM Pipeline Stage Badges */}
                            {vendor.matchedFunctionalities && vendor.matchedFunctionalities.length > 0 && (
                              <div className="space-y-1.5 pt-1.5 border-t border-zinc-100">
                                <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-zinc-600 uppercase tracking-wider">
                                  <Layers className="w-3 h-3 text-purple-600" />
                                  <span>Matched Lifecycle Stages:</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.matchedFunctionalities.map((mf) => (
                                    <span
                                      key={mf.stageId}
                                      title={`Stage ${mf.stageId} (${mf.stageName}): ${mf.matchedDetails}`}
                                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-semibold border font-mono transition-transform hover:scale-105 cursor-help ${mf.colorClass}`}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
                                      <span>{mf.badgeLabel}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Deduplicate First Cost Optimization Callout */}
                            {vendor.dedupeCostArgumentApplies && (
                              <div className="bg-amber-50/90 border border-amber-300 rounded-md p-1.5 text-[10.5px] text-amber-900 flex items-start gap-1.5 shadow-2xs">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold">Deduplicate First:</strong> Run match/dedupe before calling paid enrichment credits (ZoomInfo/Clearbit/Apollo) to prevent wasted budget & protect CRM integrity.
                                </div>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* EXAMPLE 1 · SIGNAL ➔ SSOT */}
                        <td className="py-3.5 px-4 align-middle text-zinc-700 text-xs leading-relaxed max-w-[280px]">
                          <div className="flex items-start gap-1.5">
                            <span className="text-red-500 font-bold font-mono text-[11px] shrink-0 mt-0.5">01</span>
                            <span>{vendor.example1SignalSSOT}</span>
                          </div>
                        </td>

                        {/* EXAMPLE 2 · ENGAGE ➔ CPQ */}
                        <td className="py-3.5 px-4 align-middle text-zinc-700 text-xs leading-relaxed max-w-[280px]">
                          <div className="flex items-start gap-1.5">
                            <span className="text-orange-600 font-bold font-mono text-[11px] shrink-0 mt-0.5">02</span>
                            <span>{vendor.example2EngageCPQ}</span>
                          </div>
                        </td>

                        {/* AVAILABILITY */}
                        <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {vendor.availability}
                          </span>
                        </td>

                        {/* n8n Integrations */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          {vendor.integrations}
                        </td>

                        {/* Salesforce Integrations */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-zinc-800 font-medium">
                              {vendor.salesforceIntegration}
                            </span>
                          </div>
                        </td>

                        {/* Claude Integrations */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-zinc-800 font-medium">
                              {vendor.claudeIntegration}
                            </span>
                          </div>
                        </td>

                        {/* Codex/ChatGPT Integrations */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-zinc-800 font-medium">
                              {vendor.codexIntegration}
                            </span>
                          </div>
                        </td>

                        {/* Indicative Pricing */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 font-mono text-[11px]">
                          {vendor.indicativePricing}
                        </td>

                        {/* Customer Size Pills */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-1 flex-wrap">
                            {vendor.customerSize.map((size) => (
                              <span
                                key={size}
                                className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-zinc-200/80 text-zinc-700 font-mono"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* AI Features */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          {vendor.aiFeatures}
                        </td>

                        {/* LLM Capability */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          {vendor.llmCapability}
                        </td>

                        {/* Connect Via */}
                        <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                          {renderConnectViaBadge(vendor.connectVia)}
                        </td>

                        {/* Action Trigger */}
                        <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openOobSandbox(vendor);
                            }}
                            className="px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-bold font-hand inline-flex items-center gap-1 transition-all"
                          >
                            <Zap className="h-3 w-3 text-purple-600" />
                            <span>Test OOB</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Out-of-Box Workflow Interactive Sandbox Drawer / Modal */}
      {activeVendor && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-zinc-300 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 border-b border-zinc-200 bg-zinc-50 flex items-start justify-between gap-4 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border shrink-0 ${getAvatarBg(
                    activeVendor.vendor
                  )}`}
                >
                  {activeVendor.vendor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-zinc-950">{activeVendor.vendor}</h2>
                    {renderConnectViaBadge(activeVendor.connectVia)}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Category: <span className="font-semibold text-zinc-700">{activeVendor.category}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveVendor(null)}
                className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-200 text-zinc-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-6 flex-1">
              {/* Core Out-of-Box Functionality Card */}
              <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span>Core Out-of-the-Box Functionality</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    {activeVendor.availability}
                  </span>
                </div>
                <p className="text-sm font-semibold text-zinc-900 leading-relaxed">{activeVendor.coreFunctionality}</p>

                {/* Matched GTM Stages in Drawer */}
                {activeVendor.matchedFunctionalities && activeVendor.matchedFunctionalities.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-purple-200/60">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Matched RevOps Lifecycle Stages</span>
                    </div>
                    <div className="space-y-1">
                      {activeVendor.matchedFunctionalities.map((mf) => (
                        <div
                          key={mf.stageId}
                          className="bg-white/90 rounded-lg p-2 border border-purple-100 flex items-start gap-2 text-xs"
                        >
                          <span className={`px-2 py-0.5 rounded text-[10.5px] font-bold font-mono shrink-0 border ${mf.colorClass}`}>
                            {mf.badgeLabel}
                          </span>
                          <span className="text-zinc-700">{mf.matchedDetails}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deduplicate First Callout if Applicable */}
                {activeVendor.dedupeCostArgumentApplies && (
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 text-xs text-amber-950 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Deduplicate First Rule:</strong> Deduplicate records before running paid enrichment API queries ({activeVendor.vendor}) to avoid burning API credits on duplicate or stale CRM contacts and prevent overwriting existing CRM data.
                    </div>
                  </div>
                )}

                {/* Practical Signal & Engage Examples */}
                <div className="space-y-2 pt-2 border-t border-purple-200/60">
                  <div className="bg-white/80 rounded-lg p-2.5 border border-purple-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-900">
                      <span className="text-red-500 font-mono">01</span>
                      <span className="uppercase tracking-wider">Example 1 · Signal ➔ SSoT</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">{activeVendor.example1SignalSSOT}</p>
                  </div>

                  <div className="bg-white/80 rounded-lg p-2.5 border border-purple-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-900">
                      <span className="text-orange-600 font-mono">02</span>
                      <span className="uppercase tracking-wider">Example 2 · Engage ➔ CPQ</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">{activeVendor.example2EngageCPQ}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-200/60 text-xs text-zinc-600">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Indicative Pricing</span>
                    <span className="font-mono font-medium">{activeVendor.indicativePricing}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">AI / LLM Mode</span>
                    <span className="font-medium text-purple-700">{activeVendor.aiFeatures}</span>
                  </div>
                </div>
              </div>

              {/* Action Selection Tabs */}
              {(() => {
                const oobActions = getOobActionsForVendor(activeVendor);
                const currentAction = oobActions[selectedActionIndex] || oobActions[0];

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Select Out-of-Box Action
                      </h3>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {oobActions.length} action{oobActions.length > 1 ? "s" : ""} available
                      </span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {oobActions.map((action, idx) => (
                        <button
                          key={action.id}
                          onClick={() => handleSelectAction(idx)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold text-left transition-all border ${
                            selectedActionIndex === idx
                              ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                              : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono font-bold px-1 rounded ${
                                action.method === "GET"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-purple-500/20 text-purple-400"
                              }`}
                            >
                              {action.method}
                            </span>
                            <span>{action.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Action Description & Endpoint */}
                    {currentAction && (
                      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
                        <p className="text-xs text-zinc-600">{currentAction.description}</p>
                        <div className="bg-zinc-900 text-zinc-200 font-mono text-[11px] p-2.5 rounded-lg flex items-center justify-between">
                          <span className="truncate">
                            <span className="text-purple-400 font-bold mr-2">{currentAction.method}</span>
                            {currentAction.endpoint}
                          </span>
                          <button
                            onClick={() => copySnippet(currentAction.endpoint, "endpoint")}
                            className="text-zinc-400 hover:text-white shrink-0 ml-2"
                            title="Copy Endpoint"
                          >
                            {copiedCode === "endpoint" ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Interactive Parameters Editor */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold uppercase text-zinc-500">
                            Simulated Input Payload (JSON)
                          </label>
                          <textarea
                            rows={5}
                            value={JSON.stringify(actionParams, null, 2)}
                            onChange={(e) => {
                              try {
                                setActionParams(JSON.parse(e.target.value));
                              } catch {
                                // Allow typing
                              }
                            }}
                            className="w-full bg-white border border-zinc-300 rounded-lg p-2.5 font-mono text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        {/* Execute Button */}
                        <button
                          onClick={handleRunSimulation}
                          disabled={isRunningSim}
                          className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-bold font-hand text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isRunningSim ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>Executing Out-of-Box Workflow...</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 fill-white" />
                              <span>⚡ Execute {activeVendor.vendor} Out-of-Box Workflow</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Simulation Execution Results */}
                    {simResult && (
                      <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-xs space-y-0 animate-fade-in">
                        <div className="bg-zinc-900 text-zinc-200 px-4 py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                            <span className="font-bold text-emerald-400">STATUS {simResult.statusCode} OK</span>
                            <span className="text-zinc-400 font-mono text-[11px]">
                              • Latency: {simResult.latencyMs}ms
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              copySnippet(JSON.stringify(simResult.result, null, 2), "sim_res")
                            }
                            className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            {copiedCode === "sim_res" ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy JSON</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Execution Telemetry Log */}
                        <div className="bg-zinc-950 p-3 font-mono text-[11px] text-zinc-400 border-b border-zinc-800 space-y-1">
                          {simResult.log.map((entry, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-zinc-600">›</span>
                              <span className="text-zinc-300">{entry}</span>
                            </div>
                          ))}
                        </div>

                        {/* Response JSON */}
                        <div className="bg-zinc-900 p-3 font-mono text-[11px] text-emerald-400 max-h-56 overflow-y-auto">
                          <pre>{JSON.stringify(simResult.result, null, 2)}</pre>
                        </div>
                      </div>
                    )}

                    {/* Multi-Platform Integration Recipes */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Integration Recipes & Connection Modes
                      </h4>

                      {/* n8n Workflow Recipe Snippet */}
                      <div className="border border-zinc-200 rounded-xl p-3.5 bg-zinc-50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-zinc-800 font-bold text-xs">
                            <Workflow className="h-4 w-4 text-purple-600" />
                            <span>n8n Integration</span>
                          </div>
                          <button
                            onClick={() => {
                              const n8nSnippet = JSON.stringify(
                                {
                                  name: `${activeVendor.vendor} Automated Trigger`,
                                  nodes: [
                                    {
                                      parameters: {
                                        authentication:
                                          activeVendor.connectVia === "Native"
                                            ? "n8nCredential"
                                            : "headerAuth",
                                        requestMethod: currentAction?.method || "POST",
                                        url: `https://api.${activeVendor.vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}.com${currentAction?.endpoint || "/v1/events"}`,
                                      },
                                      name: activeVendor.vendor,
                                      type:
                                        activeVendor.connectVia === "Native"
                                          ? `n8n-nodes-base.${activeVendor.n8nNode.toLowerCase().replace(/[^a-z0-9]/g, "")}`
                                          : "n8n-nodes-base.httpRequest",
                                      typeVersion: 1,
                                      position: [250, 300],
                                    },
                                  ],
                                },
                                null,
                                2
                              );
                              copySnippet(n8nSnippet, "n8n_wf");
                            }}
                            className="text-xs text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-1"
                          >
                            {copiedCode === "n8n_wf" ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied Recipe</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy JSON</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-600">
                          <span className="font-semibold text-zinc-800">Connection Mode: </span>
                          {activeVendor.integrations}
                        </p>
                        <p className="text-[11px] text-zinc-500">
                          {activeVendor.connectVia === "Native"
                            ? `Use the official '${activeVendor.n8nNode}' node in your n8n workflow canvas for zero-config authentication.`
                            : `Use n8n's '${activeVendor.connectVia}' node to connect directly via secure webhook or OAuth API credentials.`}
                        </p>
                      </div>

                      {/* Salesforce Integration Mode */}
                      <div className="border border-sky-200 rounded-xl p-3.5 bg-sky-50/40 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
                            <span className="w-4 h-4 rounded bg-sky-500 text-white text-[10px] flex items-center justify-center font-bold">
                              SF
                            </span>
                            <span>Salesforce Integration</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                            Enterprise Ready
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-700">
                          <span className="font-semibold text-zinc-900">Supported Methods: </span>
                          {activeVendor.salesforceIntegration}
                        </p>
                      </div>

                      {/* Claude Integration Mode */}
                      <div className="border border-amber-200 rounded-xl p-3.5 bg-amber-50/40 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                            <span className="w-4 h-4 rounded bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">
                              CL
                            </span>
                            <span>Claude Integration</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            MCP Protocol
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-700">
                          <span className="font-semibold text-zinc-900">Supported Methods: </span>
                          {activeVendor.claudeIntegration}
                        </p>
                      </div>

                      {/* Codex / ChatGPT Integration Mode */}
                      <div className="border border-emerald-200 rounded-xl p-3.5 bg-emerald-50/40 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                            <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                              GPT
                            </span>
                            <span>Codex / ChatGPT Integration</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Custom Actions
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-700">
                          <span className="font-semibold text-zinc-900">Supported Methods: </span>
                          {activeVendor.codexIntegration}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
