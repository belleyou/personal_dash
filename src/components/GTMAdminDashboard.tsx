import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { GTM_VENDORS_DATA, GTMVendor } from "../data/gtmVendorData";
import { getOobActionsForVendor, OOBAction } from "../data/gtmOobSimulators";

interface GTMAdminDashboardProps {
  onBackToMain?: () => void;
}

type SortField =
  | "vendor"
  | "category"
  | "coreFunctionality"
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

  const [sortField, setSortField] = useState<SortField>("vendor");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

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
      const matchesSearch =
        searchTerm.trim() === "" ||
        vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.coreFunctionality.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

      return matchesSearch && matchesCat && matchesVendor && matchesConnect && matchesSize && matchesLLM;
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

    const rows = filteredVendors.map((v) => [
      `"${v.vendor.replace(/"/g, '""')}"`,
      `"${v.category.replace(/"/g, '""')}"`,
      `"${v.coreFunctionality.replace(/"/g, '""')}"`,
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
    ]);

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
          <div className="flex items-center gap-2 sm:gap-4 text-xs">
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
            <button
              onClick={exportToCSV}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

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

            {/* Reset Filters */}
            {(selectedCategory !== "all" ||
              selectedVendor !== "all" ||
              selectedConnectVia !== "all" ||
              selectedCustomerSize !== "all" ||
              searchTerm !== "") && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedVendor("all");
                  setSelectedConnectVia("all");
                  setSelectedCustomerSize("all");
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
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        <div className="text-xs text-zinc-500 mb-2 flex items-center justify-between">
          <span>
            Showing <strong className="text-zinc-900 font-mono">{filteredVendors.length}</strong> of{" "}
            <span className="font-mono">{totalVendors}</span> vendors
          </span>
          <span className="text-zinc-400 italic">
            Click on any vendor row or the &quot;⚡ Test OOB&quot; button to execute its out-of-the-box functional workflow.
          </span>
        </div>

        {/* The Exact Pixel-Matched Table from Screenshot 2 */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              {/* Dark Table Header (as in Screenshot 2) */}
              <thead>
                <tr className="bg-[#1b221e] text-[#f2f4f3] uppercase font-sans text-[11px] tracking-wider select-none border-b border-[#2d3831]">
                  {/* VENDOR */}
                  <th
                    onClick={() => handleSort("vendor")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[180px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>VENDOR</span>
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

                  {/* CORE FUNCTIONALITY */}
                  <th
                    onClick={() => handleSort("coreFunctionality")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[240px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>CORE FUNCTIONALITY</span>
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

                  {/* N8N NODE */}
                  <th
                    onClick={() => handleSort("n8nNode")}
                    className="py-3 px-4 font-bold cursor-pointer hover:bg-[#252f2a] transition-colors whitespace-nowrap min-w-[120px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>N8N NODE</span>
                      {sortField === "n8nNode" ? (
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
                  <th className="py-3 px-4 font-bold whitespace-nowrap min-w-[100px]">
                    <span>N8N NODE LOGO/ICON</span>
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
              <tbody className="divide-y divide-zinc-100 font-sans">
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-12 text-center text-zinc-500">
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
                        {/* Vendor Name + Avatar + Category */}
                        <td className="py-3.5 px-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-sans border shrink-0 ${getAvatarBg(
                                vendor.vendor
                              )}`}
                            >
                              {vendor.vendor.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-zinc-950 text-sm group-hover:text-purple-700 transition-colors">
                                {vendor.vendor}
                              </div>
                              <div className="text-[11px] text-zinc-500 leading-tight">
                                {vendor.category}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Core Functionality */}
                        <td className="py-3.5 px-4 align-middle text-zinc-700 text-xs">
                          {vendor.coreFunctionality}
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

                        {/* LLM Capability */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 text-xs">
                          {vendor.llmCapability}
                        </td>

                        {/* n8n Node */}
                        <td className="py-3.5 px-4 align-middle text-zinc-600 font-mono text-xs">
                          {vendor.n8nNode === "—" ? (
                            <span className="text-zinc-400">No native node</span>
                          ) : (
                            <span className="font-semibold text-zinc-900">{vendor.n8nNode}</span>
                          )}
                        </td>

                        {/* n8n Node Logo / Icon */}
                        <td className="py-3.5 px-4 align-middle">
                          {vendor.n8nNodeIcon && vendor.n8nNodeIcon !== "No native node" && vendor.n8nNodeIcon !== "—" ? (
                            <div className="w-7 h-7 rounded-md border border-zinc-200 bg-white p-1 flex items-center justify-center shrink-0">
                              <img
                                src={vendor.n8nNodeIcon}
                                alt={vendor.vendor}
                                className="max-w-full max-h-full object-contain"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  // Fallback if image fails
                                  (e.target as HTMLElement).style.display = "none";
                                }}
                              />
                            </div>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-full text-zinc-400 text-xs bg-zinc-100 border border-zinc-200/60 font-mono">
                              —
                            </span>
                          )}
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
              <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wide">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span>Core Out-of-the-Box Functionality</span>
                </div>
                <p className="text-sm font-semibold text-zinc-900">{activeVendor.coreFunctionality}</p>
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
