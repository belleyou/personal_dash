import React, { useState, useMemo } from "react";
import {
  Search,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Database,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  ArrowUpDown,
  ExternalLink,
  Table,
  HelpCircle,
  X,
  Zap,
  Target
} from "lucide-react";
import { KPI_MASTER_DATA, KPIRecord, generateLanguageScripts } from "../data/kpiMasterData";
import { searchKpisSemantically, SEMANTIC_INTENT_PRESETS, SemanticSearchResult } from "../utils/kpiSemanticSearch";
import { KPIVisualizationPreview } from "./KPIVisualizationPreview";

export type ScriptLanguage =
  | "Google Sheets"
  | "Excel"
  | "Java"
  | "Python"
  | "JSON"
  | "SQL"
  | "SOQL"
  | "Apex";

const SCRIPT_LANGUAGES: ScriptLanguage[] = [
  "Google Sheets",
  "Excel",
  "Java",
  "Python",
  "JSON",
  "SQL",
  "SOQL",
  "Apex"
];

export const MetricLookupScriptGenerator: React.FC = () => {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState<string>("rate");
  const [isSemanticMode, setIsSemanticMode] = useState<boolean>(true);
  const [selectedMetric, setSelectedMetric] = useState<string>("All Metrics");
  const [selectedFunction, setSelectedFunction] = useState<string>("All Functions");
  const [selectedObject, setSelectedObject] = useState<string>("All Objects");
  const [selectedDataSource, setSelectedDataSource] = useState<string>("All Data Sources");
  const [selectedDimension, setSelectedDimension] = useState<string>("All Dimensions");
  const [selectedType, setSelectedType] = useState<string>("Leading + Lagging");
  const [selectedVisualization, setSelectedVisualization] = useState<string>("All Visualizations");
  const [purposeSearch, setPurposeSearch] = useState<string>("");
  const [selectedKpiId, setSelectedKpiId] = useState<string>("All KPI IDs");

  // Selected Active KPI
  const [activeKpi, setActiveKpi] = useState<KPIRecord>(KPI_MASTER_DATA[10]); // Win rate overall by default (matches 'rate')
  const [activeLanguage, setActiveLanguage] = useState<ScriptLanguage>("SOQL");
  const [generatorViewTab, setGeneratorViewTab] = useState<"scripts" | "visualization">("scripts");
  const [modalKpi, setModalKpi] = useState<KPIRecord | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const visualizerSectionRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChartPreview = (kpiToView?: KPIRecord) => {
    const targetKpi = kpiToView || activeKpi;
    setActiveKpi(targetKpi);
    setGeneratorViewTab("visualization");
    setModalKpi(targetKpi);
    
    // Smoothly scroll to visualizer section if on page
    setTimeout(() => {
      visualizerSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // Dynamic filter options extracted from dataset
  const metricOptions = useMemo(() => {
    return ["All Metrics", ...Array.from(new Set(KPI_MASTER_DATA.map((k) => k.metric))).sort()];
  }, []);

  const functionOptions = useMemo(() => {
    return ["All Functions", ...Array.from(new Set(KPI_MASTER_DATA.map((k) => k.function))).sort()];
  }, []);

  const objectOptions = useMemo(() => {
    const set = new Set<string>();
    KPI_MASTER_DATA.forEach((k) => {
      k.object.split("+").forEach((o) => set.add(o.trim()));
    });
    return ["All Objects", ...Array.from(set).sort()];
  }, []);

  const dataSourceOptions = useMemo(() => {
    const set = new Set<string>();
    KPI_MASTER_DATA.forEach((k) => {
      k.dataSources.split("+").forEach((d) => set.add(d.trim()));
    });
    return ["All Data Sources", ...Array.from(set).sort()];
  }, []);

  const dimensionOptions = useMemo(() => {
    const set = new Set<string>();
    KPI_MASTER_DATA.forEach((k) => {
      k.dimensions.split(",").forEach((d) => set.add(d.trim()));
    });
    return ["All Dimensions", ...Array.from(set).sort()];
  }, []);

  const visualizationOptions = useMemo(() => {
    return ["All Visualizations", ...Array.from(new Set(KPI_MASTER_DATA.map((k) => k.bestVisualization))).sort()];
  }, []);

  const kpiIdOptions = useMemo(() => {
    return ["All KPI IDs", ...KPI_MASTER_DATA.map((k) => `${k.id} - ${k.metric.slice(0, 30)}...`)];
  }, []);

  // Filtered dataset with Semantic Search Relevance Engine
  const searchResultsWithScores = useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;

    let candidateKpis: { kpi: KPIRecord; score: number; semanticReason?: string; matchedTokens?: string[] }[] = [];

    if (hasSearch && isSemanticMode) {
      // Execute Semantic Search
      const semanticResults = searchKpisSemantically(searchQuery, KPI_MASTER_DATA);
      candidateKpis = semanticResults.map((res) => ({
        kpi: res.kpi,
        score: res.score,
        semanticReason: res.semanticReason,
        matchedTokens: res.matchedTokens
      }));
    } else if (hasSearch && !isSemanticMode) {
      // Exact Keyword / Substring mode
      const q = searchQuery.toLowerCase().trim();
      candidateKpis = KPI_MASTER_DATA.filter((k) => {
        return (
          k.metric.toLowerCase().includes(q) ||
          k.function.toLowerCase().includes(q) ||
          k.object.toLowerCase().includes(q) ||
          k.dataSources.toLowerCase().includes(q) ||
          k.dimensions.toLowerCase().includes(q) ||
          k.analysisPurpose.toLowerCase().includes(q) ||
          k.id.toLowerCase().includes(q)
        );
      }).map((k) => ({
        kpi: k,
        score: 100,
        semanticReason: "Exact keyword match"
      }));
    } else {
      // No search query - return all
      candidateKpis = KPI_MASTER_DATA.map((k) => ({
        kpi: k,
        score: 100
      }));
    }

    // Apply secondary categorical filters
    return candidateKpis.filter(({ kpi: k }) => {
      if (selectedMetric !== "All Metrics" && k.metric !== selectedMetric) return false;
      if (selectedFunction !== "All Functions" && k.function !== selectedFunction) return false;
      if (selectedObject !== "All Objects" && !k.object.includes(selectedObject)) return false;
      if (selectedDataSource !== "All Data Sources" && !k.dataSources.includes(selectedDataSource)) return false;
      if (selectedDimension !== "All Dimensions" && !k.dimensions.includes(selectedDimension)) return false;
      if (selectedType === "Leading" && k.type !== "Leading") return false;
      if (selectedType === "Lagging" && k.type !== "Lagging") return false;
      if (selectedVisualization !== "All Visualizations" && k.bestVisualization !== selectedVisualization) return false;
      if (purposeSearch.trim() && !k.analysisPurpose.toLowerCase().includes(purposeSearch.toLowerCase().trim())) return false;
      if (selectedKpiId !== "All KPI IDs" && !selectedKpiId.startsWith(k.id)) return false;

      return true;
    });
  }, [
    searchQuery,
    isSemanticMode,
    selectedMetric,
    selectedFunction,
    selectedObject,
    selectedDataSource,
    selectedDimension,
    selectedType,
    selectedVisualization,
    purposeSearch,
    selectedKpiId
  ]);

  const filteredKpis = useMemo(() => {
    return searchResultsWithScores.map((item) => item.kpi);
  }, [searchResultsWithScores]);

  // Compute active KPI's semantic match info if available
  const activeKpiSemanticInfo = useMemo(() => {
    if (!activeKpi) return null;
    return searchResultsWithScores.find((item) => item.kpi.id === activeKpi.id);
  }, [activeKpi, searchResultsWithScores]);

  // Compute generated script for current active KPI and language
  const generatedScripts = useMemo(() => {
    if (!activeKpi) return {};
    return generateLanguageScripts(activeKpi);
  }, [activeKpi]);

  const currentScript = useMemo(() => {
    if (!activeKpi) return "Null";
    switch (activeLanguage) {
      case "Google Sheets":
        return generatedScripts.googleSheets || "Null";
      case "Excel":
        return generatedScripts.excel || "Null";
      case "Java":
        return generatedScripts.java || "Null";
      case "Python":
        return generatedScripts.python || "Null";
      case "JSON":
        return generatedScripts.json || "Null";
      case "SQL":
        return generatedScripts.sql || "Null";
      case "SOQL":
        return generatedScripts.soql || "Null";
      case "Apex":
        return generatedScripts.apex || "Null";
      default:
        return "Null";
    }
  }, [activeLanguage, generatedScripts, activeKpi]);

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedMetric("All Metrics");
    setSelectedFunction("All Functions");
    setSelectedObject("All Objects");
    setSelectedDataSource("All Data Sources");
    setSelectedDimension("All Dimensions");
    setSelectedType("Leading + Lagging");
    setSelectedVisualization("All Visualizations");
    setPurposeSearch("");
    setSelectedKpiId("All KPI IDs");
  };

  // Copy code handler
  const handleCopy = () => {
    if (currentScript) {
      navigator.clipboard.writeText(currentScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerateScripts = () => {
    if (filteredKpis.length > 0) {
      setActiveKpi(filteredKpis[0]);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner Context Card */}
      <div className="bg-gradient-to-r from-teal-900 via-zinc-900 to-slate-900 text-white p-6 rounded-2xl border-2 border-ink shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-500/20 border border-teal-400/40 rounded-lg text-teal-300">
              <Code2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-sans tracking-tight">
              Enterprise KPI Script Engine & Metric Master Hub
            </h2>
          </div>
          <p className="text-xs text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            Instantly search 157 RevOps & GTM metrics using <span className="text-teal-300 font-semibold">Semantic Concept AI & Ontology Search</span>.
            Supports exact multi-language code generation across Google Sheets, Excel, Java, Python, JSON, SQL, SOQL, and Apex with strict Null fallback parity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-teal-800/60 border border-teal-400/30 rounded-lg text-xs font-mono text-teal-200">
            Active KPI: {activeKpi ? activeKpi.id : "None"}
          </span>
        </div>
      </div>

      {/* Main 2-Column Split matching the user's provided UI specification */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Metric Lookup & Script Generator */}
        <div className="xl:col-span-6 bg-[#f8faf7] border-2 border-zinc-300/80 rounded-2xl p-6 shadow-sm space-y-5">
          {/* Header with Search Mode Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">
              Metric Lookup & Script Generator
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSemanticMode(!isSemanticMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                  isSemanticMode
                    ? "bg-teal-900 text-teal-100 border-teal-700 shadow-xs"
                    : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                }`}
                title="Toggle between Semantic Concept Search and Strict Keyword Match"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isSemanticMode ? "text-teal-300 fill-teal-300/20" : "text-zinc-400"}`} />
                <span>{isSemanticMode ? "Semantic AI Active" : "Exact Keyword"}</span>
              </button>
              <span className="text-xs font-mono text-zinc-700 bg-zinc-200/80 px-2.5 py-1 rounded-md font-semibold">
                {filteredKpis.length} Matched
              </span>
            </div>
          </div>

          {/* Primary Search Bar with 'Generate Scripts' button */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  {isSemanticMode ? (
                    <Sparkles className="w-4 h-4 text-teal-600" />
                  ) : (
                    <Search className="w-4 h-4 text-zinc-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isSemanticMode
                      ? "Search naturally (e.g., 'sales velocity', 'churn risk', 'duplicate leads', 'rep quota', 'CAC payback')..."
                      : "Search exact keywords in metric name, object, or dimensions..."
                  }
                  className="w-full pl-9 pr-8 py-2.5 bg-white border-2 border-zinc-300 rounded-lg text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-teal-700 transition-colors shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleGenerateScripts}
                className="px-5 py-2.5 bg-[#b84826] hover:bg-[#a23d1f] text-white font-bold text-sm rounded-lg shadow-sm active:translate-y-0.5 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Generate Scripts</span>
              </button>
            </div>

            {/* Semantic Intent Concept Presets */}
            {isSemanticMode && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-600">Quick Semantic Concept Presets:</span>
                  <span className="italic">Click to test instant semantic retrieval</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SEMANTIC_INTENT_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setSearchQuery(preset.query.split(" ").slice(0, 3).join(" "));
                      }}
                      className="px-2 py-1 rounded-md text-[11px] font-medium bg-white hover:bg-teal-50 border border-zinc-300 hover:border-teal-400 text-zinc-700 hover:text-teal-900 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                      title={preset.description}
                    >
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3-Column Dropdown Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Metric */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                METRIC
              </label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {metricOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Function */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                FUNCTION
              </label>
              <select
                value={selectedFunction}
                onChange={(e) => setSelectedFunction(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {functionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Object */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                OBJECT
              </label>
              <select
                value={selectedObject}
                onChange={(e) => setSelectedObject(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {objectOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Sources */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                DATA SOURCES
              </label>
              <select
                value={selectedDataSource}
                onChange={(e) => setSelectedDataSource(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {dataSourceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                DIMENSIONS
              </label>
              <select
                value={selectedDimension}
                onChange={(e) => setSelectedDimension(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {dimensionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                TYPE
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                <option value="Leading + Lagging">Leading + Lagging</option>
                <option value="Leading">Leading</option>
                <option value="Lagging">Lagging</option>
              </select>
            </div>

            {/* Best Visualization */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                BEST VISUALIZATION
              </label>
              <select
                value={selectedVisualization}
                onChange={(e) => setSelectedVisualization(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {visualizationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose Search */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                PURPOSE
              </label>
              <input
                type="text"
                value={purposeSearch}
                onChange={(e) => setPurposeSearch(e.target.value)}
                placeholder="Search analysis purpose"
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              />
            </div>

            {/* KPI ID */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 uppercase tracking-wider text-[10px]">
                KPI ID
              </label>
              <select
                value={selectedKpiId}
                onChange={(e) => setSelectedKpiId(e.target.value)}
                className="w-full py-1.5 px-2 bg-white border border-zinc-300 rounded-md text-zinc-800 text-xs truncate focus:outline-none focus:border-teal-700"
              >
                {kpiIdOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear All Filters button */}
          <div>
            <button
              onClick={handleClearFilters}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1c4039] hover:bg-[#15312c] text-white font-bold text-xs rounded-lg shadow-sm active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          </div>

          {/* View Mode Switcher Tabs: Scripts vs Best Visualization Chart Preview */}
          <div ref={visualizerSectionRef} className="flex items-center gap-2 p-1 bg-zinc-200/80 rounded-xl border border-zinc-300">
            <button
              onClick={() => setGeneratorViewTab("scripts")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                generatorViewTab === "scripts"
                  ? "bg-[#1c4039] text-white shadow-sm"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/60"
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Execution Scripts (8 Languages)</span>
            </button>
            <button
              onClick={() => setGeneratorViewTab("visualization")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                generatorViewTab === "visualization"
                  ? "bg-[#1c4039] text-white shadow-sm"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/60"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Best Visualization Chart</span>
            </button>
          </div>

          {generatorViewTab === "scripts" ? (
            <div className="space-y-4">
              {/* Language Selection Buttons (Stacked Pills matching screenshot) */}
              <div className="space-y-1.5 pt-1">
                {SCRIPT_LANGUAGES.map((lang) => {
                  const isSelected = activeLanguage === lang;
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={`w-full py-2 px-4 rounded-full text-xs font-bold text-center transition-all cursor-pointer select-none border ${
                        isSelected
                          ? "bg-[#1c4039] text-white border-[#1c4039] shadow-sm font-semibold"
                          : "bg-white hover:bg-zinc-100 text-zinc-800 border-zinc-300 shadow-xs"
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>

              {/* Terminal / Code Output View */}
              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#090e17] text-zinc-100 shadow-inner">
                <div className="flex items-center justify-between px-4 py-2 bg-[#121926] border-b border-zinc-800 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 font-medium ml-2">
                      {activeLanguage} Script • {activeKpi.id} ({activeKpi.metric.slice(0, 32)}...)
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-[11px] font-mono transition-colors cursor-pointer"
                    title="Copy script to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="p-4 overflow-x-auto max-h-80 min-h-[160px] font-mono text-xs leading-relaxed select-text">
                  {currentScript === "Null" ? (
                    <div className="text-zinc-300 font-mono py-2">
                      Null
                    </div>
                  ) : (
                    <pre className="text-emerald-400 whitespace-pre font-mono">
                      {currentScript}
                    </pre>
                  )}
                </div>
              </div>

              {/* Formula Contract Notice Footer */}
              <div className="text-[11px] text-zinc-600 leading-relaxed font-sans pt-1 border-t border-zinc-200">
                <span className="font-bold text-zinc-800">Formula contract:</span> Spreadsheet formulas use populated named ranges;{" "}
                <span className="font-mono font-semibold text-zinc-800">DIMENSION_KEY</span> must represent the same combined dimensions shown in SQL.{" "}
                <span className="font-mono font-semibold text-zinc-800">Null</span> means exact parity is not available.
              </div>
            </div>
          ) : (
            /* Best Visualization Chart Preview Mode */
            <div className="space-y-3 pt-1">
              <KPIVisualizationPreview kpi={activeKpi} />
            </div>
          )}
        </div>

        {/* Right Column: KPI Master Reference */}
        <div className="xl:col-span-6 bg-[#f8faf7] border-2 border-zinc-300/80 rounded-2xl p-6 shadow-sm space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-zinc-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                  KPI Master Reference
                </h3>
                {isSemanticMode && searchQuery.trim() && (
                  <span className="px-2 py-0.5 text-[10px] bg-teal-100 text-teal-800 font-bold rounded-full border border-teal-300">
                    Semantic Ranked
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Showing <span className="font-bold text-zinc-800">{filteredKpis.length}</span> of{" "}
                <span className="font-bold text-zinc-800">{KPI_MASTER_DATA.length}</span> KPIs
              </p>
            </div>
            <div className="text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 font-medium">
              Click any row to inspect scripts or charts
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto max-h-[820px] rounded-xl border border-zinc-300 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-[#eef3eb] border-b-2 border-zinc-300 z-10">
                <tr>
                  <th className="py-2.5 px-3 font-extrabold text-zinc-900 uppercase tracking-wider text-[11px]">
                    METRIC
                  </th>
                  <th className="py-2.5 px-3 font-extrabold text-zinc-900 uppercase tracking-wider text-[11px] whitespace-nowrap">
                    FUNCTION
                  </th>
                  <th className="py-2.5 px-3 font-extrabold text-zinc-900 uppercase tracking-wider text-[11px] whitespace-nowrap">
                    OBJECT
                  </th>
                  <th className="py-2.5 px-3 font-extrabold text-zinc-900 uppercase tracking-wider text-[11px] whitespace-nowrap">
                    CHART & DATA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700 font-sans">
                {searchResultsWithScores.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-12 text-zinc-400 italic">
                      No KPIs found matching your current search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  searchResultsWithScores.map(({ kpi, score, semanticReason, matchedTokens }) => {
                    const isSelected = activeKpi.id === kpi.id;
                    return (
                      <tr
                        key={kpi.id}
                        onClick={() => {
                          setActiveKpi(kpi);
                        }}
                        className={`cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? "bg-teal-100/70 hover:bg-teal-100 text-zinc-900 font-medium"
                            : "hover:bg-zinc-50"
                        }`}
                      >
                        {/* Metric with blue highlighted badge or link text */}
                        <td className="py-2 px-3 align-top">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span
                                className={`inline-block px-2 py-1 rounded text-xs leading-normal ${
                                  isSelected
                                    ? "bg-teal-200/80 text-teal-950 font-semibold"
                                    : "bg-[#c8e1fc]/70 text-[#0d3b66] hover:bg-[#bcdbfc]"
                                }`}
                              >
                                {kpi.metric}
                              </span>
                              {/* Semantic Relevance Badge when search query is active */}
                              {isSemanticMode && searchQuery.trim() && (
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                    score >= 75
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                      : score >= 45
                                      ? "bg-teal-100 text-teal-800 border border-teal-300"
                                      : "bg-zinc-100 text-zinc-600 border border-zinc-200"
                                  }`}
                                  title={semanticReason || "Semantic relevance score"}
                                >
                                  {score}% match
                                </span>
                              )}
                            </div>

                            {/* Semantic matched reason preview */}
                            {isSemanticMode && searchQuery.trim() && semanticReason && (
                              <div className="text-[10px] text-zinc-500 italic pl-0.5">
                                💡 {semanticReason}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Function */}
                        <td className="py-2 px-3 align-top whitespace-normal">
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-800 border border-slate-200">
                            {kpi.function}
                          </span>
                        </td>

                        {/* Object */}
                        <td className="py-2 px-3 align-top whitespace-normal">
                          <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-sky-50 text-sky-800 border border-sky-200 font-medium">
                            {kpi.object}
                          </span>
                        </td>

                        {/* Chart & Quick Action */}
                        <td className="py-2 px-3 align-top">
                          <div className="space-y-1">
                            <span className="inline-block text-[11px] text-zinc-600">
                              {kpi.bestVisualization}
                            </span>
                            <div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenChartPreview(kpi);
                                }}
                                className="px-2 py-1 text-[10px] font-bold bg-[#1c4039] hover:bg-[#15312c] text-white rounded transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                                title={`View example ${kpi.bestVisualization} for ${kpi.metric}`}
                              >
                                <Sparkles className="w-3 h-3 text-amber-300" />
                                <span>View Chart</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Active KPI Details Card */}
          {activeKpi && (
            <div className="p-4 bg-white rounded-xl border border-zinc-300 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 text-sm">{activeKpi.metric}</span>
                  {activeKpiSemanticInfo && isSemanticMode && searchQuery.trim() && (
                    <span className="px-2 py-0.5 bg-teal-100 text-teal-900 rounded-md font-mono text-[10px] font-bold border border-teal-300">
                      {activeKpiSemanticInfo.score}% Semantic Match
                    </span>
                  )}
                </div>
                <span className="px-2 py-0.5 bg-zinc-900 text-white rounded font-mono text-[10px]">
                  {activeKpi.type}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-600 text-[11px]">
                <div>
                  <span className="font-semibold text-zinc-800">Dimensions:</span> {activeKpi.dimensions}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-zinc-800">Best Visualization:</span> {activeKpi.bestVisualization}
                  </div>
                  <button
                    onClick={() => handleOpenChartPreview(activeKpi)}
                    className="px-2.5 py-1 text-xs font-bold bg-teal-800 hover:bg-teal-900 text-white rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>View Example Chart</span>
                  </button>
                </div>
              </div>
              <p className="text-zinc-500 italic text-[11px] border-t border-zinc-100 pt-1.5">
                <span className="font-semibold text-zinc-700 not-italic">Purpose:</span> {activeKpi.analysisPurpose}
              </p>
              {activeKpiSemanticInfo?.semanticReason && isSemanticMode && searchQuery.trim() && (
                <div className="text-[11px] text-teal-800 bg-teal-50/80 p-2 rounded border border-teal-200">
                  <span className="font-bold">Semantic Search Match Logic:</span> {activeKpiSemanticInfo.semanticReason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Full-Fidelity Interactive KPI Chart Modal Dialog */}
      {modalKpi && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setModalKpi(null)}
        >
          <div
            className="bg-white border-2 border-zinc-300 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 space-y-4 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-3 gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#1c4039] text-white uppercase tracking-wider">
                    {modalKpi.bestVisualization}
                  </span>
                  <span className="text-xs font-mono text-zinc-500 font-bold">
                    {modalKpi.id} • {modalKpi.function}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono">
                    {modalKpi.type}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-zinc-900 mt-1 leading-snug">
                  {modalKpi.metric}
                </h3>
              </div>
              <button
                onClick={() => setModalKpi(null)}
                className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Close Chart Modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Render Preview Chart */}
            <KPIVisualizationPreview kpi={modalKpi} />

            {/* Modal Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-200 text-xs">
              <div className="text-zinc-600 text-[11px] max-w-md">
                <span className="font-bold text-zinc-800">Analysis Purpose:</span> {modalKpi.analysisPurpose}
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    setActiveKpi(modalKpi);
                    setGeneratorViewTab("scripts");
                    setModalKpi(null);
                  }}
                  className="px-3.5 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Inspect Code Scripts</span>
                </button>
                <button
                  onClick={() => setModalKpi(null)}
                  className="px-5 py-2 bg-[#1c4039] hover:bg-[#15312c] text-white font-bold rounded-lg shadow-sm transition-colors cursor-pointer text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

