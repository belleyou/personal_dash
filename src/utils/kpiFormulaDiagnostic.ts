import { KPI_MASTER_DATA, KPIRecord, generateLanguageScripts } from "../data/kpiMasterData";

export type DiagnosticSeverity = "PASSED" | "OPTIMIZATION" | "WARNING" | "ERROR";

export type DiagnosticLanguage =
  | "SOQL"
  | "SQL"
  | "Python"
  | "Excel"
  | "Google Sheets"
  | "Apex"
  | "Java"
  | "JSON";

export interface SyntaxRuleCheck {
  id: string;
  ruleName: string;
  description: string;
  passed: boolean;
  severity: DiagnosticSeverity;
  detail: string;
  recommendation?: string;
}

export interface KPIFormulaDiagnosticResult {
  kpiId: string;
  metric: string;
  function: string;
  object: string;
  language: DiagnosticLanguage;
  formulaScript: string;
  status: DiagnosticSeverity;
  score: number; // 0 - 100
  checks: SyntaxRuleCheck[];
  timestamp: string;
}

export interface LibraryDiagnosticSummary {
  totalKpisScanned: number;
  totalFormulasAnalyzed: number;
  overallPassRate: number;
  severityCounts: {
    PASSED: number;
    OPTIMIZATION: number;
    WARNING: number;
    ERROR: number;
  };
  languagePassRates: Record<DiagnosticLanguage, { total: number; passed: number; passRate: number }>;
  flaggedIssues: KPIFormulaDiagnosticResult[];
  scannedAt: string;
}

// 1. Validate SOQL syntax
export function validateSOQL(formula: string, kpi: KPIRecord): SyntaxRuleCheck[] {
  const checks: SyntaxRuleCheck[] = [];
  const trimmed = formula.trim();

  // Check 1: Null handling contract for non-Salesforce / pure DW
  const isPureExternalDW = kpi.dataSources.includes("Internal DW") && !kpi.dataSources.includes("Salesforce");
  if (isPureExternalDW) {
    checks.push({
      id: "soql-dw-null-contract",
      ruleName: "Pure External DW Null Contract",
      description: "Metrics originating purely from internal DWs without Salesforce objects must return Null in SOQL.",
      passed: trimmed === "Null",
      severity: trimmed === "Null" ? "PASSED" : "ERROR",
      detail: trimmed === "Null" 
        ? "Correctly resolved to 'Null' as required for non-Salesforce native data sources." 
        : "Pure external DW metric should output 'Null' for SOQL syntax compatibility.",
      recommendation: "Ensure isPureExternalDW returns 'Null' when Salesforce data source is absent."
    });
    return checks;
  }

  // Check 2: Valid SELECT ... FROM clause
  const hasSelectFrom = /SELECT\s+[\s\S]+?\s+FROM\s+[\w_]+/i.test(trimmed);
  checks.push({
    id: "soql-select-from",
    ruleName: "Standard SELECT ... FROM Clause",
    description: "SOQL must have a valid SELECT list and FROM object clause.",
    passed: hasSelectFrom,
    severity: hasSelectFrom ? "PASSED" : "ERROR",
    detail: hasSelectFrom ? "Valid SELECT and FROM clauses detected." : "Missing or malformed SELECT ... FROM structure.",
    recommendation: "Structure query as SELECT <fields> FROM <SalesforceObject>."
  });

  // Check 3: Standard Salesforce Object Reference
  const fromMatch = trimmed.match(/FROM\s+([a-zA-Z0-9_]+)/i);
  const fromObject = fromMatch ? fromMatch[1] : "";
  const standardSObjects = [
    "Lead",
    "Opportunity",
    "Account",
    "Contact",
    "Contract",
    "Quote",
    "Task",
    "Event",
    "OpportunityLineItem",
    "Campaign",
    "CampaignMember",
    "User"
  ];
  const isValidObject = standardSObjects.includes(fromObject) || fromObject.endsWith("__c") || kpi.object.includes(fromObject);
  checks.push({
    id: "soql-valid-sobject",
    ruleName: "Valid Salesforce SObject Entity",
    description: "Queries must target recognized Salesforce standard or custom (__c) objects.",
    passed: isValidObject,
    severity: isValidObject ? "PASSED" : "WARNING",
    detail: isValidObject 
      ? `Target SObject '${fromObject}' is a valid Salesforce entity matching KPI schema '${kpi.object}'.`
      : `SObject '${fromObject}' may not be native. Verify custom object definition.`,
    recommendation: `Align FROM object with ${kpi.object}.`
  });

  // Check 4: Summer '26 Pilot FORMULA() in WHERE Clause Syntax
  const hasFormulaSyntax = trimmed.includes("FORMULA(");
  if (hasFormulaSyntax) {
    const validFormulaPattern = /FORMULA\(\s*['"][^'"]+['"]\s*\)\s*(=|!=|<=|>=|<|>)\s*[\d\w.-]+/i.test(trimmed);
    checks.push({
      id: "soql-summer26-formula",
      ruleName: "Salesforce Summer '26 Pilot FORMULA() Syntax",
      description: "Verifies single-quoted date/arithmetic expression inside FORMULA() with valid comparison operators.",
      passed: validFormulaPattern,
      severity: validFormulaPattern ? "PASSED" : "WARNING",
      detail: validFormulaPattern 
        ? "Salesforce Summer '26 Pilot FORMULA() expression is syntactically well-formed."
        : "FORMULA() expression in WHERE clause must use single quotes and standard comparison operator.",
      recommendation: "Format as FORMULA('FieldA - FieldB') >= value."
    });
  }

  // Check 5: GROUP BY & Aggregate Parity
  const hasAggregates = /COUNT\(|SUM\(|AVG\(|MIN\(|MAX\(/i.test(trimmed);
  const hasGroupBy = /GROUP\s+BY\s+/i.test(trimmed);
  const hasNonAggFields = /SELECT\s+(?!COUNT\(\w+\)\s*FROM|COUNT\(\)\s*FROM)[a-zA-Z0-9_.]+/i.test(trimmed);
  
  if (hasAggregates && hasNonAggFields) {
    checks.push({
      id: "soql-group-by-parity",
      ruleName: "Aggregate and GROUP BY Clause Consistency",
      description: "SOQL queries selecting non-aggregated dimensions alongside aggregates must include a GROUP BY clause.",
      passed: hasGroupBy,
      severity: hasGroupBy ? "PASSED" : "ERROR",
      detail: hasGroupBy ? "GROUP BY clause properly declared for aggregated query." : "Non-aggregated field selected without GROUP BY clause.",
      recommendation: "Add GROUP BY clause with all non-aggregated select fields."
    });
  }

  // Check 6: Date Literal Standardization
  const hasDateLiterals = /LAST_QUARTER|THIS_QUARTER|THIS_YEAR|THIS_FISCAL_YEAR|TODAY|YESTERDAY/i.test(trimmed);
  if (kpi.metric.toLowerCase().includes("last quarter") || kpi.metric.toLowerCase().includes("rate")) {
    checks.push({
      id: "soql-date-literals",
      ruleName: "Salesforce Relative Date Literal",
      description: "Ensures standard SOQL relative date literals are used rather than hardcoded timestamps.",
      passed: hasDateLiterals || trimmed.includes("CreatedDate"),
      severity: hasDateLiterals ? "PASSED" : "OPTIMIZATION",
      detail: hasDateLiterals ? "Uses native Salesforce relative date literal filter." : "Consider adding relative date literal (e.g. LAST_QUARTER) for deterministic reporting.",
      recommendation: "Use LAST_QUARTER or THIS_FISCAL_YEAR in WHERE clause."
    });
  }

  return checks;
}

// 2. Validate SQL Syntax (Postgres, Snowflake, BigQuery)
export function validateSQL(formula: string, kpi: KPIRecord): SyntaxRuleCheck[] {
  const checks: SyntaxRuleCheck[] = [];
  const trimmed = formula.trim();

  // Check 1: CTE or SELECT Statement Structure
  const isCteOrSelect = /^\s*(--[\s\S]*?\n)?\s*(WITH\s+[\s\S]+?\s+AS\s+\([\s\S]+?\)|SELECT\s+[\s\S]+?\s+FROM)/i.test(trimmed);
  checks.push({
    id: "sql-structure",
    ruleName: "Standard SQL Query & CTE Grammar",
    description: "Validates standard ANSI SQL query structure with valid CTEs or SELECT statements.",
    passed: isCteOrSelect,
    severity: isCteOrSelect ? "PASSED" : "ERROR",
    detail: isCteOrSelect ? "Valid SQL structure with standard CTE / SELECT hierarchy." : "Malformed SQL statement header.",
    recommendation: "Ensure query begins with valid CTE (WITH ...) or SELECT statement."
  });

  // Check 2: Balanced Parentheses
  let openParen = 0;
  let closeParen = 0;
  for (const c of trimmed) {
    if (c === "(") openParen++;
    if (c === ")") closeParen++;
  }
  const parenBalanced = openParen === closeParen;
  checks.push({
    id: "sql-balanced-parens",
    ruleName: "Balanced Expression Parentheses",
    description: "Ensures all opened parentheses in CTEs, aggregates, and subqueries are closed.",
    passed: parenBalanced,
    severity: parenBalanced ? "PASSED" : "ERROR",
    detail: parenBalanced ? `All ${openParen} parentheses pairs balanced.` : `Parenthesis mismatch: ${openParen} opened vs ${closeParen} closed.`,
    recommendation: "Verify all subqueries, CASE expressions, and function calls are closed."
  });

  // Check 3: Division-by-Zero Safety
  const hasDivision = /\/\s*(?![\/*])/g.test(trimmed);
  if (hasDivision) {
    const hasNullIfOrCase = /NULLIF\(|CASE\s+WHEN[\s\S]+?THEN[\s\S]+?ELSE/i.test(trimmed);
    checks.push({
      id: "sql-zero-division-guard",
      ruleName: "Division by Zero Protection",
      description: "Division expressions in metrics/percentages must be protected with NULLIF(..., 0) or CASE guard.",
      passed: hasNullIfOrCase,
      severity: hasNullIfOrCase ? "PASSED" : "WARNING",
      detail: hasNullIfOrCase ? "Division expression safely guarded with NULLIF / CASE guard." : "Unprotected division detected. May fail with DivideByZero error on zero records.",
      recommendation: "Wrap denominator in NULLIF(denominator, 0)."
    });
  }

  // Check 4: Aggregation and Grouping Consistency
  const hasAgg = /COUNT\(|SUM\(|AVG\(|MIN\(|MAX\(/i.test(trimmed);
  const hasGroupBy = /GROUP\s+BY\s+/i.test(trimmed);
  checks.push({
    id: "sql-group-by",
    ruleName: "Aggregation Group By Alignment",
    description: "Multi-row metrics aggregating over dimensions require GROUP BY clauses.",
    passed: !hasAgg || hasGroupBy,
    severity: (!hasAgg || hasGroupBy) ? "PASSED" : "OPTIMIZATION",
    detail: hasGroupBy ? "GROUP BY clause present for aggregated dimensional output." : "Single scalar aggregate or no grouping needed.",
    recommendation: "Add GROUP BY 1, 2, ... when selecting categorical dimensions with measures."
  });

  return checks;
}

// 3. Validate Python Syntax (Pandas & NumPy)
export function validatePython(formula: string, kpi: KPIRecord): SyntaxRuleCheck[] {
  const checks: SyntaxRuleCheck[] = [];
  const trimmed = formula.trim();

  // Check 1: Required Library Imports
  const hasPandasImport = /import\s+pandas\s+as\s+pd/i.test(trimmed);
  const hasNumpyImport = /import\s+numpy\s+as\s+np/i.test(trimmed);
  checks.push({
    id: "py-imports",
    ruleName: "Standard Data Science Imports",
    description: "Verifies import of Pandas (pd) and NumPy (np).",
    passed: hasPandasImport && hasNumpyImport,
    severity: (hasPandasImport && hasNumpyImport) ? "PASSED" : "WARNING",
    detail: hasPandasImport && hasNumpyImport ? "Pandas and NumPy imports properly declared." : "Missing standard pandas/numpy imports.",
    recommendation: "Include 'import pandas as pd' and 'import numpy as np' at top of script."
  });

  // Check 2: Function Declaration & Return Type
  const hasFunctionDef = /def\s+calculate_[a-zA-Z0-9_]+\s*\(/i.test(trimmed);
  const hasReturn = /return\s+/i.test(trimmed);
  checks.push({
    id: "py-func-def",
    ruleName: "Callable Function Definition & Return",
    description: "Verifies Python script defines a callable calculate_* function with a return value.",
    passed: hasFunctionDef && hasReturn,
    severity: (hasFunctionDef && hasReturn) ? "PASSED" : "ERROR",
    detail: hasFunctionDef && hasReturn ? "Valid Python function signature and return statement." : "Missing function definition or return statement.",
    recommendation: "Wrap logic inside def calculate_<kpi_id>(df: pd.DataFrame) -> dict/pd.DataFrame."
  });

  // Check 3: Empty DataFrame & Column Validation Guard
  const hasEmptyGuard = /if\s+df\.empty/i.test(trimmed);
  checks.push({
    id: "py-empty-guard",
    ruleName: "Empty DataFrame Input Guard",
    description: "Production data scripts must gracefully handle empty DataFrames without runtime crashing.",
    passed: hasEmptyGuard,
    severity: hasEmptyGuard ? "PASSED" : "OPTIMIZATION",
    detail: hasEmptyGuard ? "Input guard protects against empty DataFrame." : "Add empty DataFrame check at beginning of function.",
    recommendation: "Add 'if df.empty: return pd.DataFrame()' guard."
  });

  // Check 4: Zero Division & NaN Handling
  const hasZeroDivisionProtection = /np\.where|fillna|\.replace\(0,\s*np\.nan\)|\.empty/i.test(trimmed);
  checks.push({
    id: "py-zero-division",
    ruleName: "Zero-Division & NaN Safety Guard",
    description: "Rate/ratio calculations must protect against zero denominator division using np.where or fillna.",
    passed: hasZeroDivisionProtection,
    severity: hasZeroDivisionProtection ? "PASSED" : "OPTIMIZATION",
    detail: hasZeroDivisionProtection ? "Safe division / NaN fallback mechanism present." : "Consider adding np.where(total > 0, val / total, np.nan) safeguard.",
    recommendation: "Use np.where with fillna('Null') for rates."
  });

  return checks;
}

// 4. Validate Excel / Google Sheets Formulas
export function validateSpreadsheetFormula(formula: string, language: "Excel" | "Google Sheets", kpi: KPIRecord): SyntaxRuleCheck[] {
  const checks: SyntaxRuleCheck[] = [];
  const trimmed = formula.trim();

  // Check 1: Leading Equal Sign (=)
  const startsWithEqual = trimmed.startsWith("=");
  checks.push({
    id: `${language.toLowerCase().replace(/\s+/g, "-")}-equal-prefix`,
    ruleName: "Formula Prefix Requirement (=)",
    description: "Spreadsheet formulas must begin with an '=' character.",
    passed: startsWithEqual,
    severity: startsWithEqual ? "PASSED" : "ERROR",
    detail: startsWithEqual ? "Formula correctly begins with '=' prefix." : "Missing leading '=' in spreadsheet formula.",
    recommendation: "Prefix formula with '='"
  });

  // Check 2: Balanced Parentheses
  let openParen = 0;
  let closeParen = 0;
  for (const c of trimmed) {
    if (c === "(") openParen++;
    if (c === ")") closeParen++;
  }
  const parenBalanced = openParen === closeParen && openParen > 0;
  checks.push({
    id: `${language.toLowerCase().replace(/\s+/g, "-")}-balanced-parens`,
    ruleName: "Balanced Formula Parentheses",
    description: "All opened parentheses in nested functions must be closed.",
    passed: parenBalanced,
    severity: parenBalanced ? "PASSED" : "ERROR",
    detail: parenBalanced ? `All ${openParen} function parameter sets balanced.` : `Mismatch: ${openParen} opened vs ${closeParen} closed.`,
    recommendation: "Ensure every function call has a closing parenthesis."
  });

  // Check 3: Valid Spreadsheet Functions
  const validFuncs = /LET|COUNTIFS|AVERAGEIFS|SUMIFS|MAP|LAMBDA|QUERY|IFERROR|IF|COUNTA|SUM|AVERAGE|XLOOKUP|VLOOKUP/i;
  const hasRecognizedFunctions = validFuncs.test(trimmed);
  checks.push({
    id: `${language.toLowerCase().replace(/\s+/g, "-")}-valid-functions`,
    ruleName: "Recognized Native Spreadsheet Functions",
    description: `Ensures formula uses official ${language} standard functions.`,
    passed: hasRecognizedFunctions,
    severity: hasRecognizedFunctions ? "PASSED" : "WARNING",
    detail: hasRecognizedFunctions ? "Recognized native spreadsheet functions detected." : "Unknown formula function names.",
    recommendation: "Use standard COUNTIFS, LET, SUMIFS, or IFERROR functions."
  });

  // Check 4: Error Handling Guard (IFERROR or IF)
  const hasErrorHandling = /IFERROR|IF\s*\(/i.test(trimmed);
  checks.push({
    id: `${language.toLowerCase().replace(/\s+/g, "-")}-error-guard`,
    ruleName: "Division-by-Zero / Error Fallback Guard",
    description: "Calculations producing #DIV/0! must be guarded with IFERROR or IF condition.",
    passed: hasErrorHandling,
    severity: hasErrorHandling ? "PASSED" : "OPTIMIZATION",
    detail: hasErrorHandling ? "Error handler (IFERROR / IF) prevents sheet calculation errors." : "Wrap formula in IFERROR(..., 'Null') to prevent #DIV/0! in empty sheets.",
    recommendation: "Wrap in IFERROR(..., 'Null')."
  });

  return checks;
}

// 5. Validate Apex / Java Scripts
export function validateApexAndJava(formula: string, language: "Apex" | "Java", kpi: KPIRecord): SyntaxRuleCheck[] {
  const checks: SyntaxRuleCheck[] = [];
  const trimmed = formula.trim();

  // Check 1: Class Definition
  const hasClassDef = /public\s+(with\s+sharing\s+)?class\s+[a-zA-Z0-9_]+/i.test(trimmed);
  checks.push({
    id: `${language.toLowerCase()}-class-def`,
    ruleName: "Public Class Declaration",
    description: `Verifies ${language} code defines an exportable public service class.`,
    passed: hasClassDef,
    severity: hasClassDef ? "PASSED" : "ERROR",
    detail: hasClassDef ? `Valid public ${language} class structure.` : "Missing public class declaration.",
    recommendation: `Define class as 'public with sharing class ...' or 'public class ...'`
  });

  // Check 2: Balanced Braces
  let openBrace = 0;
  let closeBrace = 0;
  for (const c of trimmed) {
    if (c === "{") openBrace++;
    if (c === "}") closeBrace++;
  }
  const bracesBalanced = openBrace === closeBrace && openBrace > 0;
  checks.push({
    id: `${language.toLowerCase()}-balanced-braces`,
    ruleName: "Balanced Code Block Braces {}",
    description: "Verifies all class and method code blocks are properly terminated.",
    passed: bracesBalanced,
    severity: bracesBalanced ? "PASSED" : "ERROR",
    detail: bracesBalanced ? `All ${openBrace} code blocks balanced.` : `Brace mismatch: ${openBrace} open vs ${closeBrace} closed.`,
    recommendation: "Ensure all method and class blocks end with '}'."
  });

  // Check 3: Null Safety on Input Collections
  const hasNullSafety = /if\s*\(\s*(records|records\.isEmpty|list|list\.isEmpty)/i.test(trimmed) || trimmed.includes("null");
  checks.push({
    id: `${language.toLowerCase()}-null-guard`,
    ruleName: "Collection Null Guard",
    description: "Methods accepting record collections must check for null/empty lists to prevent NullPointerExceptions.",
    passed: hasNullSafety,
    severity: hasNullSafety ? "PASSED" : "OPTIMIZATION",
    detail: hasNullSafety ? "Null safety check present on collection parameters." : "Add null/empty list check at start of method.",
    recommendation: "Add 'if (records == null || records.isEmpty()) return ...' check."
  });

  return checks;
}

// Master Diagnostic Engine: Run checks on a specific KPI formula
export function diagnoseKPIFormula(kpi: KPIRecord, language: DiagnosticLanguage): KPIFormulaDiagnosticResult {
  const scripts = generateLanguageScripts(kpi);
  const formulaScript = scripts[language] || "";

  let checks: SyntaxRuleCheck[] = [];

  switch (language) {
    case "SOQL":
      checks = validateSOQL(formulaScript, kpi);
      break;
    case "SQL":
      checks = validateSQL(formulaScript, kpi);
      break;
    case "Python":
      checks = validatePython(formulaScript, kpi);
      break;
    case "Excel":
      checks = validateSpreadsheetFormula(formulaScript, "Excel", kpi);
      break;
    case "Google Sheets":
      checks = validateSpreadsheetFormula(formulaScript, "Google Sheets", kpi);
      break;
    case "Apex":
      checks = validateApexAndJava(formulaScript, "Apex", kpi);
      break;
    case "Java":
      checks = validateApexAndJava(formulaScript, "Java", kpi);
      break;
    case "JSON":
      try {
        JSON.parse(formulaScript);
        checks.push({
          id: "json-valid-syntax",
          ruleName: "Valid JSON Schema Specification",
          description: "Ensures output parses as valid JSON without syntax errors.",
          passed: true,
          severity: "PASSED",
          detail: "JSON payload parsed successfully."
        });
      } catch (err: any) {
        checks.push({
          id: "json-valid-syntax",
          ruleName: "Valid JSON Schema Specification",
          description: "Ensures output parses as valid JSON without syntax errors.",
          passed: false,
          severity: "ERROR",
          detail: `JSON parse error: ${err?.message || "Invalid JSON"}`
        });
      }
      break;
  }

  // Calculate Overall Status and Score
  const errorCount = checks.filter((c) => c.severity === "ERROR" && !c.passed).length;
  const warningCount = checks.filter((c) => c.severity === "WARNING" && !c.passed).length;
  const optCount = checks.filter((c) => c.severity === "OPTIMIZATION" && !c.passed).length;

  let status: DiagnosticSeverity = "PASSED";
  if (errorCount > 0) {
    status = "ERROR";
  } else if (warningCount > 0) {
    status = "WARNING";
  } else if (optCount > 0) {
    status = "OPTIMIZATION";
  }

  const passedChecks = checks.filter((c) => c.passed).length;
  const score = checks.length > 0 ? Math.round((passedChecks / checks.length) * 100) : 100;

  return {
    kpiId: kpi.id,
    metric: kpi.metric,
    function: kpi.function,
    object: kpi.object,
    language,
    formulaScript,
    status,
    score,
    checks,
    timestamp: new Date().toISOString()
  };
}

// Master Diagnostic Engine: Run Full Library Sweep across all 157 KPIs and all 8 languages
export function runFullLibraryDiagnostics(): LibraryDiagnosticSummary {
  const languages: DiagnosticLanguage[] = [
    "SOQL",
    "SQL",
    "Python",
    "Excel",
    "Google Sheets",
    "Apex",
    "Java",
    "JSON"
  ];

  const allResults: KPIFormulaDiagnosticResult[] = [];
  const flaggedIssues: KPIFormulaDiagnosticResult[] = [];

  const severityCounts = {
    PASSED: 0,
    OPTIMIZATION: 0,
    WARNING: 0,
    ERROR: 0
  };

  const languageStats: Record<DiagnosticLanguage, { total: number; passed: number; passRate: number }> = {
    "SOQL": { total: 0, passed: 0, passRate: 100 },
    "SQL": { total: 0, passed: 0, passRate: 100 },
    "Python": { total: 0, passed: 0, passRate: 100 },
    "Excel": { total: 0, passed: 0, passRate: 100 },
    "Google Sheets": { total: 0, passed: 0, passRate: 100 },
    "Apex": { total: 0, passed: 0, passRate: 100 },
    "Java": { total: 0, passed: 0, passRate: 100 },
    "JSON": { total: 0, passed: 0, passRate: 100 }
  };

  for (const kpi of KPI_MASTER_DATA) {
    for (const lang of languages) {
      const diag = diagnoseKPIFormula(kpi, lang);
      allResults.push(diag);
      severityCounts[diag.status]++;

      languageStats[lang].total++;
      if (diag.status === "PASSED" || diag.status === "OPTIMIZATION") {
        languageStats[lang].passed++;
      }

      if (diag.status !== "PASSED") {
        flaggedIssues.push(diag);
      }
    }
  }

  // Calculate Language Pass Rates
  for (const lang of languages) {
    const stats = languageStats[lang];
    stats.passRate = stats.total > 0 ? Math.round((stats.passed / stats.total) * 1000) / 10 : 100;
  }

  const totalFormulas = allResults.length;
  const passedTotal = severityCounts.PASSED + severityCounts.OPTIMIZATION;
  const overallPassRate = totalFormulas > 0 ? Math.round((passedTotal / totalFormulas) * 1000) / 10 : 100;

  return {
    totalKpisScanned: KPI_MASTER_DATA.length,
    totalFormulasAnalyzed: totalFormulas,
    overallPassRate,
    severityCounts,
    languagePassRates: languageStats,
    flaggedIssues,
    scannedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    })
  };
}
