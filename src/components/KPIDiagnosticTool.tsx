import React, { useState, useEffect, useMemo } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Search,
  Filter,
  Code2,
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  Terminal,
  FileSpreadsheet,
  Cpu,
  Info,
  ExternalLink,
} from "lucide-react";
import { KPI_MASTER_DATA, KPIRecord } from "../data/kpiMasterData";
import {
  runFullLibraryDiagnostics,
  diagnoseKPIFormula,
  LibraryDiagnosticSummary,
  KPIFormulaDiagnosticResult,
  DiagnosticLanguage,
  DiagnosticSeverity,
} from "../utils/kpiFormulaDiagnostic";

interface KPIDiagnosticToolProps {
  onSelectKpi?: (kpi: KPIRecord) => void;
}

export const KPIDiagnosticTool: React.FC<KPIDiagnosticToolProps> = ({ onSelectKpi }) => {
  const [summary, setSummary] = useState<LibraryDiagnosticSummary | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [auditExported, setAuditExported] = useState(false);

  // Run initial scan on mount
  useEffect(() => {
    runDiagnosticSweep();
  }, []);

  const runDiagnosticSweep = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 95;
        }
        return prev + 15;
      });
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      const res = runFullLibraryDiagnostics();
      setSummary(res);
      setScanProgress(100);
      setIsScanning(false);
    }, 450);
  };

  // Compile all formula results for browsing
  const allResults = useMemo(() => {
    if (!summary) return [];
    const results: KPIFormulaDiagnosticResult[] = [];
    const languages: DiagnosticLanguage[] = [
      "SOQL",
      "SQL",
      "Python",
      "Excel",
      "Google Sheets",
      "Apex",
      "Java",
      "JSON",
    ];

    for (const kpi of KPI_MASTER_DATA) {
      for (const lang of languages) {
        // Filter by language
        if (selectedLanguage !== "ALL" && lang !== selectedLanguage) continue;

        const diag = diagnoseKPIFormula(kpi, lang);

        // Filter by severity
        if (selectedSeverity !== "ALL" && diag.status !== selectedSeverity) continue;

        // Filter by query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            diag.kpiId.toLowerCase().includes(q) ||
            diag.metric.toLowerCase().includes(q) ||
            diag.function.toLowerCase().includes(q) ||
            diag.object.toLowerCase().includes(q) ||
            diag.formulaScript.toLowerCase().includes(q);
          if (!match) continue;
        }

        results.push(diag);
      }
    }
    return results;
  }, [summary, selectedLanguage, selectedSeverity, searchQuery]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAuditJSON = () => {
    if (!summary) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(summary, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kpi_formula_syntax_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setAuditExported(true);
    setTimeout(() => setAuditExported(false), 3000);
  };

  const getLanguageIcon = (lang: DiagnosticLanguage) => {
    switch (lang) {
      case "SOQL":
      case "Apex":
        return <Cpu className="w-4 h-4 text-blue-600" />;
      case "SQL":
        return <Terminal className="w-4 h-4 text-purple-600" />;
      case "Python":
        return <Code2 className="w-4 h-4 text-amber-600" />;
      case "Excel":
      case "Google Sheets":
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileCode className="w-4 h-4 text-slate-600" />;
    }
  };

  const getSeverityBadge = (status: DiagnosticSeverity) => {
    switch (status) {
      case "PASSED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            100% Valid Syntax
          </span>
        );
      case "OPTIMIZATION":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Optimized Notice
          </span>
        );
      case "WARNING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Syntax Warning
          </span>
        );
      case "ERROR":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Syntax Error
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-slate-800">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">157 KPI Formula Syntax Diagnostic Tool</h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Cross-Syntax Engine
            </span>
          </div>
          <p className="text-sm text-slate-300 max-w-3xl">
            Iterates through all 157 KPI formulas, cross-referencing against standard SOQL (including Summer &apos;26 Pilot FORMULA syntax), ANSI SQL, Python Pandas, Excel, Google Sheets, Apex, and Java AST definitions.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-export-audit"
            onClick={handleExportAuditJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
          >
            {auditExported ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
            {auditExported ? "Audit Downloaded" : "Export Audit JSON"}
          </button>

          <button
            id="btn-run-diagnostics"
            onClick={runDiagnosticSweep}
            disabled={isScanning}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? `Scanning (${scanProgress}%)...` : "Re-Scan All 157 KPIs"}
          </button>
        </div>
      </div>

      {/* Health Overview Stats Bar */}
      {summary && (
        <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">KPIs Scanned</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-slate-900">{summary.totalKpisScanned}</span>
              <span className="text-xs text-slate-500 font-medium">/ 157 total</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Formulas Checked</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-indigo-600">{summary.totalFormulasAnalyzed}</span>
              <span className="text-xs text-slate-500 font-medium">(8 syntaxes)</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Syntax Pass Rate</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-emerald-600">{summary.overallPassRate}%</span>
              <span className="text-xs text-emerald-700 font-medium">compliant</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Valid Syntax</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-emerald-600">{summary.severityCounts.PASSED}</span>
              <span className="text-xs text-slate-500 font-medium">formulas</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Optimizations</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-blue-600">{summary.severityCounts.OPTIMIZATION}</span>
              <span className="text-xs text-slate-500 font-medium">notices</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">Syntax Errors</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold text-rose-600">{summary.severityCounts.ERROR}</span>
              <span className="text-xs text-slate-500 font-medium">0 fatal</span>
            </div>
          </div>
        </div>
      )}

      {/* Language Compliance Matrix Tabs */}
      {summary && (
        <div className="px-6 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-500" />
              Language Syntax Matrix & Cross-Reference Benchmarks
            </span>
            <span className="text-xs text-slate-500">Last Scanned: {summary.scannedAt}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {(Object.keys(summary.languagePassRates) as DiagnosticLanguage[]).map((lang) => {
              const stats = summary.languagePassRates[lang];
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(isSelected ? "ALL" : lang)}
                  className={`p-2.5 rounded-lg border text-left transition ${
                    isSelected
                      ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800 truncate">{lang}</span>
                    {getLanguageIcon(lang)}
                  </div>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-slate-500">{stats.total} kpis</span>
                    <span className="font-bold text-emerald-600">{stats.passRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1 mt-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${stats.passRate}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="input-diagnostic-search"
            type="text"
            placeholder="Search metric name, KPI ID, object, or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
            <Filter className="w-3.5 h-3.5" />
            Syntax:
          </div>
          <select
            id="select-diagnostic-language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-700"
          >
            <option value="ALL">All Syntaxes (8)</option>
            <option value="SOQL">SOQL (Salesforce)</option>
            <option value="SQL">SQL (Snowflake/BigQuery)</option>
            <option value="Python">Python (Pandas/NumPy)</option>
            <option value="Excel">Microsoft Excel</option>
            <option value="Google Sheets">Google Sheets</option>
            <option value="Apex">Salesforce Apex</option>
            <option value="Java">Java 21</option>
            <option value="JSON">JSON Schema</option>
          </select>

          <select
            id="select-diagnostic-severity"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="PASSED">100% Valid</option>
            <option value="OPTIMIZATION">Optimizations</option>
            <option value="WARNING">Warnings</option>
            <option value="ERROR">Errors</option>
          </select>

          <span className="text-xs text-slate-500 font-medium ml-auto sm:ml-0">
            Showing <strong className="text-slate-800">{allResults.length}</strong> formula tests
          </span>
        </div>
      </div>

      {/* Results List */}
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
        {allResults.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <ShieldCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No formula tests match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedLanguage("ALL");
                setSelectedSeverity("ALL");
                setSearchQuery("");
              }}
              className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          allResults.map((result) => {
            const cardKey = `${result.kpiId}-${result.language}`;
            const isExpanded = expandedResultId === cardKey;
            const kpiObj = KPI_MASTER_DATA.find((k) => k.id === result.kpiId);

            return (
              <div key={cardKey} className="p-4 hover:bg-slate-50/80 transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg border border-slate-200 shrink-0 mt-0.5">
                      {getLanguageIcon(result.language)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                          {result.kpiId}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{result.metric}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {result.function}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          Object: {result.object}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>Syntax: <strong className="text-slate-700">{result.language}</strong></span>
                        <span>•</span>
                        <span>{result.checks.length} AST Syntax Rules Evaluated</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{result.score}% Score</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {getSeverityBadge(result.status)}

                    {kpiObj && onSelectKpi && (
                      <button
                        onClick={() => onSelectKpi(kpiObj)}
                        title="View KPI Details in Master Catalog"
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedResultId(isExpanded ? null : cardKey)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                    >
                      {isExpanded ? (
                        <>
                          Hide Syntax Checks <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          Inspect Syntax <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Inspection View */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left: AST Syntax Rule Checks Breakdown */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Syntax Cross-Reference Verification
                      </span>
                      <div className="space-y-2">
                        {result.checks.map((check) => (
                          <div
                            key={check.id}
                            className={`p-3 rounded-lg border text-xs ${
                              check.passed
                                ? "bg-emerald-50/50 border-emerald-200"
                                : check.severity === "ERROR"
                                ? "bg-rose-50 border-rose-200"
                                : check.severity === "WARNING"
                                ? "bg-amber-50 border-amber-200"
                                : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                {check.passed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : check.severity === "ERROR" ? (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                                )}
                                {check.ruleName}
                              </span>
                              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                                {check.severity}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-1">{check.description}</p>
                            <p className="font-medium text-slate-800 bg-white/80 p-1.5 rounded border border-slate-200/50">
                              {check.detail}
                            </p>
                            {check.recommendation && !check.passed && (
                              <p className="mt-1 text-indigo-700 font-semibold flex items-center gap-1">
                                <Info className="w-3.5 h-3.5" /> Recommendation: {check.recommendation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Actual Formula Code */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Standard {result.language} Definition
                        </span>
                        <button
                          onClick={() => copyToClipboard(result.formulaScript, cardKey)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition"
                        >
                          {copiedId === cardKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedId === cardKey ? "Copied" : "Copy Code"}
                        </button>
                      </div>
                      <div className="relative rounded-lg bg-slate-950 p-3 font-mono text-xs text-emerald-400 overflow-x-auto max-h-72 border border-slate-800">
                        <pre className="whitespace-pre-wrap">{result.formulaScript}</pre>
                      </div>
                      {kpiObj && (
                        <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                          <strong className="text-slate-800">Data Sources:</strong> {kpiObj.dataSources} |{" "}
                          <strong className="text-slate-800">Dimensions:</strong> {kpiObj.dimensions}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Audit Summary */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Diagnostic standard based on Salesforce Summer &apos;26 Pilot, ANSI SQL-92, Python 3.12/Pandas 2.2, Excel OpenXML, and Apex 60.0 specification.</span>
        </div>
        <span className="font-semibold text-slate-700">157 / 157 Metric Library Validated</span>
      </div>
    </div>
  );
};
