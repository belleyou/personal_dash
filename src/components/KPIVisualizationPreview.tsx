import React, { useMemo, useState } from "react";
import { KPIRecord } from "../data/kpiMasterData";
import {
  BarChart3,
  Table as TableIcon,
  Sparkles,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Activity,
  Layers,
  Compass,
  PieChart as PieIcon,
  Filter,
  Info,
  CheckCircle2,
  Calendar,
  MapPin,
  Maximize2,
  Sliders,
  Grid3X3,
  Box,
  Split,
  Eye,
  CircleDot,
  LineChart as LineChartIcon
} from "lucide-react";

interface KPIVisualizationPreviewProps {
  kpi: KPIRecord;
}

// Color palette for rich visual rendering
const PALETTE = [
  { bg: "#0f766e", light: "#ccfbf1", border: "#14b8a6", text: "#115e59" }, // Teal
  { bg: "#0284c7", light: "#e0f2fe", border: "#38bdf8", text: "#0369a1" }, // Sky
  { bg: "#b84826", light: "#ffedd5", border: "#fb923c", text: "#9a3412" }, // Terracotta
  { bg: "#d97706", light: "#fef3c7", border: "#fcd34d", text: "#b45309" }, // Amber
  { bg: "#6366f1", light: "#e0e7ff", border: "#818cf8", text: "#4338ca" }, // Indigo
  { bg: "#8b5cf6", light: "#ede9fe", border: "#a78bfa", text: "#6d28d9" }, // Purple
  { bg: "#10b981", light: "#d1fae5", border: "#34d399", text: "#047857" }  // Emerald
];

export type CanonicalChartType =
  | "bubble"
  | "line_series"
  | "dual_axis_combo"
  | "funnel"
  | "waterfall"
  | "heatmap"
  | "choropleth_map"
  | "box_plot"
  | "histogram"
  | "stacked_100"
  | "treemap"
  | "sankey"
  | "gantt"
  | "kpi_counter_bullet"
  | "grouped_bar"
  | "sorted_bar";

export interface ChartRecommendation {
  canonicalType: CanonicalChartType;
  chartType: string;
  category: string;
  whyBest: string;
  dimensionMapping: string;
  alternativeCharts: string[];
  bestPractices: string[];
}

/**
 * Determines the canonical chart type strictly from kpi.bestVisualization
 * to guarantee 100% consistency between the suggestion and the rendered chart.
 */
export function getCanonicalChartType(bestVisualization: string): CanonicalChartType {
  const viz = (bestVisualization || "").toLowerCase().trim();

  // 1. Treemap (Must check before any generic map check)
  if (viz.includes("treemap")) {
    return "treemap";
  }
  // 2. Heatmaps (Cohort, Aging, Persona, Utilization)
  if (viz.includes("heatmap") || viz.includes("cohort")) {
    return "heatmap";
  }
  // 3. Bubble chart (3-variable matrix / velocity)
  if (viz.includes("bubble")) {
    return "bubble";
  }
  // 4. Dual-axis combo chart
  if (viz.includes("dual-axis") || viz.includes("combo")) {
    return "dual_axis_combo";
  }
  // 5. Variance waterfall
  if (viz.includes("waterfall") || viz.includes("variance")) {
    return "waterfall";
  }
  // 6. Funnel
  if (viz.includes("funnel")) {
    return "funnel";
  }
  // 7. Choropleth Map (Geographic / Territory)
  if (viz.includes("choropleth") || (viz.includes("map") && !viz.includes("treemap"))) {
    return "choropleth_map";
  }
  // 8. Box Plot (Statistical distribution)
  if (viz.includes("box plot") || viz.includes("box-plot") || viz.includes("box")) {
    return "box_plot";
  }
  // 9. Histogram (Binned frequencies)
  if (viz.includes("histogram") || viz.includes("binned")) {
    return "histogram";
  }
  // 10. 100% Stacked Bar
  if (viz.includes("100%") || viz.includes("stacked")) {
    return "stacked_100";
  }
  // 11. Sankey Diagram
  if (viz.includes("sankey")) {
    return "sankey";
  }
  // 12. Gantt Timeline
  if (viz.includes("gantt") || viz.includes("timeline")) {
    return "gantt";
  }
  // 13. Grouped Bar
  if (viz.includes("grouped")) {
    return "grouped_bar";
  }
  // 14. KPI counter + benchmark bullet
  if (viz.includes("counter") || viz.includes("benchmark") || viz.includes("gauge") || viz.includes("bullet")) {
    return "kpi_counter_bullet";
  }
  // 15. Line chart (Continuous time-series)
  if (viz.includes("line")) {
    return "line_series";
  }
  // 16. Sorted bar chart (Default)
  return "sorted_bar";
}

export function getChartRecommendation(kpi: KPIRecord): ChartRecommendation {
  const canonicalType = getCanonicalChartType(kpi.bestVisualization);

  switch (canonicalType) {
    case "bubble":
      return {
        canonicalType,
        chartType: "Bubble Chart (3-Variable Multi-Axis Correlation)",
        category: "Multi-Variable Correlation",
        whyBest: "Encodes three distinct quantitative dimensions simultaneously (X-Axis: Cycle Duration, Y-Axis: Win Rate %, Bubble Area: Deal Size $). This is ideal for velocity formulas where deal volume, velocity, and contract value interact simultaneously.",
        dimensionMapping: "X-Axis: Cycle Duration (Days) | Y-Axis: Win Rate % | Bubble Radius: Deal Size ($ ACV) | Color: Segment / Region",
        alternativeCharts: ["Scatter Plot Matrix", "Dual-Axis Combo Chart", "Quadrant Grid"],
        bestPractices: [
          "Scale bubble radius by area (square root) rather than diameter to prevent visual distortion",
          "Limit to 20-30 discrete bubbles to prevent visual crowding",
          "Include quadrant reference benchmark crosshairs to highlight velocity sweet spots"
        ]
      };

    case "line_series":
      return {
        canonicalType,
        chartType: "Continuous Time-Series Line Chart",
        category: "Trend & Trajectory Analysis",
        whyBest: "Provides continuous visual continuity across sequential time periods (Days, Weeks, Months, Quarters), making trajectory shifts, seasonal pacing, and plan variance immediately recognizable.",
        dimensionMapping: "X-Axis: Sequential Time Period | Y-Axis: Metric Value | Solid Line: Actuals | Dashed Line: Target Plan | Dotted Line: Prior Year",
        alternativeCharts: ["Area Trend Chart", "Dual-Axis Combo Chart", "Sparkline Matrix"],
        bestPractices: [
          "Include reference benchmark lines for quarterly plan quotas",
          "Use distinct stroke styles (solid for Actuals, dashed for Target/Prior Year)",
          "Limit to maximum 4 comparative series lines per chart to avoid clutter"
        ]
      };

    case "dual_axis_combo":
      return {
        canonicalType,
        chartType: "Dual-Axis Combo Chart (Bars + Trend Line)",
        category: "Comparative Ratio Analysis",
        whyBest: "Allows simultaneous comparison of two metrics with completely different units of measure—such as total dollar volume ($) on the primary left vertical axis and percentage rate (%) on the secondary right vertical axis.",
        dimensionMapping: "Left Y-Axis: Total Pipeline / Revenue ($k) | Right Y-Axis: Conversion / Win Rate (%) | X-Axis: Time / Segment",
        alternativeCharts: ["Side-by-side Synchronized Charts", "Grouped Bar Chart"],
        bestPractices: [
          "Clearly color-code each axis to match its respective series",
          "Start bar charts at zero on the primary vertical axis",
          "Keep the line metric for ratios and bar metric for absolute totals"
        ]
      };

    case "funnel":
      return {
        canonicalType,
        chartType: "Stage-to-Stage Conversion Funnel",
        category: "Sequential Pipeline Progression",
        whyBest: "Visualizes sequential stage degradation, highlighting exact conversion drop-off bottlenecks between discovery, qualification, proposal, and closed-won stages.",
        dimensionMapping: "Stages: Top-of-funnel to Closed-Won | Bar Width: Record Volume & Total $ Value | Labels: Step-to-Step Conversion %",
        alternativeCharts: ["Sankey Flow Diagram", "Horizontal Progression Bar"],
        bestPractices: [
          "Display both raw counts and percentage drop-off between adjacent stages",
          "Maintain chronological stage order from top to bottom",
          "Include cumulative pipeline dollar values alongside deal counts"
        ]
      };

    case "waterfall":
      return {
        canonicalType,
        chartType: "Variance Waterfall Bridge",
        category: "Financial Reconciliation & Movement",
        whyBest: "Deconstructs net change from starting baseline to ending total by showing positive additions (new logos, upsells) and negative deductions (downsells, churn) as floating columns.",
        dimensionMapping: "Columns: Base ARR → +New ARR → +Expansion → -Downsell → -Churn → Ending ARR | Color: Green (Inflow) / Terracotta (Outflow)",
        alternativeCharts: ["Stacked Bar Variance", "Bridge Line Chart"],
        bestPractices: [
          "Distinctly color-code positive additions in green/blue and contractions in terracotta/red",
          "Ensure starting and ending totals are anchored to the baseline",
          "Include delta percentage annotations on key movement bars"
        ]
      };

    case "heatmap":
      return {
        canonicalType,
        chartType: "2D Dimensional Heatmap Matrix",
        category: "Multi-Segment Density & Cohorts",
        whyBest: "Uses color saturation intensity across a two-dimensional grid (e.g. Cohort Month vs. Retention Period or Age Bucket vs. Territory) to surface concentration hotspots and decay patterns instantly.",
        dimensionMapping: "Rows: Cohort / Persona / Territory | Columns: Time Elapsed / Aging Buckets | Cell Color: Intensity & Attainment %",
        alternativeCharts: ["Contour Matrix", "Pivot Data Grid with Conditional Formatting"],
        bestPractices: [
          "Use a monochromatic or diverging color ramp (e.g. Light Teal to Dark Emerald)",
          "Display actual numeric values inside high-contrast matrix cells",
          "Sort rows by performance or volume to create a visual diagonal pattern"
        ]
      };

    case "choropleth_map":
      return {
        canonicalType,
        chartType: "Choropleth Geographic Map + Regional Scorecards",
        category: "Geospatial & Territory Distribution",
        whyBest: "Connects performance data directly to geographical sales territories, highlighting regional quota coverage disparities and market penetration patterns.",
        dimensionMapping: "Geographic Boundaries: State / Country / Region | Color Shading: Revenue Density / Quota Attainment %",
        alternativeCharts: ["Bubble Geo Map", "Ranked Horizontal Bar Chart"],
        bestPractices: [
          "Accompany the map with a top/bottom territory ranking leaderboard",
          "Normalize metrics by addressable market size or quota rather than raw geography",
          "Provide quick zoom and regional filtering controls"
        ]
      };

    case "box_plot":
      return {
        canonicalType,
        chartType: "Statistical Box Plot (Five-Number Summary)",
        category: "Variance & Outlier Distribution",
        whyBest: "Reveals the true distribution spread (Minimum, 25th Percentile Q1, Median, 75th Percentile Q3, Maximum) and flags extreme outliers in sales cycle lengths, ramp times, or discount depth.",
        dimensionMapping: "X-Axis: Segment / Rep Tier | Box Boundaries: Interquartile Range (IQR) | Center Line: Median | Whiskers: Min/Max Range",
        alternativeCharts: ["Violin Plot", "Histogram with Standard Deviation Curves"],
        bestPractices: [
          "Plot individual outlier points beyond the 1.5x IQR whisker boundary",
          "Highlight the median line distinctly from the mean marker",
          "Group by team or region to compare consistency across cohorts"
        ]
      };

    case "histogram":
      return {
        canonicalType,
        chartType: "Frequency Histogram with Bin Ranges",
        category: "Distribution & Frequency Analysis",
        whyBest: "Groups continuous numeric variables (like days without activity or deal ages) into uniform bucket intervals to reveal normal distributions, skewness, and clustering.",
        dimensionMapping: "X-Axis: Duration / Age Bins (e.g. 0-15d, 16-30d, 31-60d, 61-90d, 90d+) | Y-Axis: Opportunity Count / Pipeline $",
        alternativeCharts: ["Cumulative Distribution Curve", "Frequency Polygon"],
        bestPractices: [
          "Choose uniform, logically intuitive bin intervals",
          "Highlight critical SLA breach thresholds with vertical markers",
          "Avoid overlapping bar gaps to maintain standard histogram semantics"
        ]
      };

    case "stacked_100":
      return {
        canonicalType,
        chartType: "100% Stacked Bar Composition",
        category: "Proportional Mix & Share Analysis",
        whyBest: "Standardizes total segment sizes to 100% to compare the proportional mix (e.g. Lead Source Share or Product Mix) across diverse regions regardless of total volume differences.",
        dimensionMapping: "X-Axis: Dimension / Period | Bar Segments: Sub-categories summing to 100% | Segment Color: Product / Channel",
        alternativeCharts: ["Donut Chart Matrix", "Treemap"],
        bestPractices: [
          "Limit sub-segments to maximum 5 distinct categories for readability",
          "Keep the segment color legend consistent across all bars",
          "Order segments logically from largest to smallest baseline"
        ]
      };

    case "treemap":
      return {
        canonicalType,
        chartType: "Hierarchical Treemap",
        category: "Hierarchical Volume & Health Breakdown",
        whyBest: "Displays nested rectangles where area represents revenue or pipeline volume and fill color represents growth rate or quota attainment, packing high-density portfolio data into a single screen.",
        dimensionMapping: "Box Area: Pipeline Volume ($) | Box Color: Margin % / Win Rate % | Nesting: Region → Product → Rep",
        alternativeCharts: ["Sunburst Diagram", "Multi-Level Donut Chart"],
        bestPractices: [
          "Label top-tier categories clearly with contrasting headers",
          "Use a diverging color scale (Red to Green) for attainment ratings",
          "Enable drill-down into deeper hierarchy branches"
        ]
      };

    case "sankey":
      return {
        canonicalType,
        chartType: "Sankey Multi-Stage Flow Diagram",
        category: "Flow & Attribution Mapping",
        whyBest: "Traces the proportional flow and transition volume of leads and pipeline from initial Marketing Channels through Sales Teams into final Won/Lost outcomes.",
        dimensionMapping: "Source Nodes: Lead Channel | Middle Nodes: Territory/Team | Target Nodes: Closed-Won / Lost / Stalled",
        alternativeCharts: ["Alluvial Diagram", "Multi-Stage Conversion Funnel"],
        bestPractices: [
          "Color flow paths by source channel or outcome status",
          "Ensure total volume is conserved from left input to right output",
          "Hover paths to highlight full end-to-end attribution journey"
        ]
      };

    case "gantt":
      return {
        canonicalType,
        chartType: "Gantt Renewal & Contract Timeline",
        category: "Time-Bound Milestone Execution",
        whyBest: "Maps active customer contract lifecycles, opt-out notice windows, health review checkpoints, and renewal decision dates across a horizontal calendar timeline.",
        dimensionMapping: "Rows: Customer Accounts | Horizontal Bars: Contract Active Period | Markers: 90-Day Notice & Renewal Milestones",
        alternativeCharts: ["Milestone Roadmap", "Calendar Event Grid"],
        bestPractices: [
          "Highlight the current date with a vertical 'Today' reference line",
          "Color-code contract bars by renewal risk / health score (Green, Yellow, Red)",
          "Group accounts by renewal quarter or ARR tier"
        ]
      };

    case "grouped_bar":
      return {
        canonicalType,
        chartType: "Grouped Comparative Bar Chart + KPI Scorecards",
        category: "Multi-Series Segment Comparison",
        whyBest: "Compares multiple related metrics side-by-side (e.g. Quota vs Actual vs Pipeline) across multiple segments or sales teams with dedicated benchmark summary cards.",
        dimensionMapping: "Categories: Reps / Teams / Regions | Bar Groups: Actual vs Quota vs Prior Period | Counters: Aggregate Attainment",
        alternativeCharts: ["Stacked Bar Chart", "Radar Chart"],
        bestPractices: [
          "Keep consistent color coding across all grouped bars",
          "Limit groups to 2-3 bars per category to prevent visual clutter",
          "Include a zero baseline and clear numeric value labels"
        ]
      };

    case "kpi_counter_bullet":
      return {
        canonicalType,
        chartType: "Executive KPI Counter + Benchmark Attainment Bar",
        category: "Executive Scorecard & SLA Monitoring",
        whyBest: "Delivers an instantaneous high-contrast readout of primary performance metrics against predefined quarterly quota benchmarks and historical SLA targets.",
        dimensionMapping: "Main Display: Current Real-Time Metric | Benchmark Bar: Target SLA & Minimum Threshold | Status Badge: Attainment %",
        alternativeCharts: ["Radial Speedometer Gauge", "Bullet Graph"],
        bestPractices: [
          "Display both absolute actual value and target delta variance",
          "Use clear threshold indicators (Floor, Target, Stretch Goal)",
          "Include time context (e.g. 'Pacing at +4.2% vs. Q3 Target')"
        ]
      };

    case "sorted_bar":
    default:
      return {
        canonicalType: "sorted_bar",
        chartType: "Ranked Sorted Bar Chart",
        category: "Comparative Performance Ranking",
        whyBest: "Horizontal or vertical bars sorted in descending order make relative performance differences, top performers, and lagging segments immediately visible without cognitive friction.",
        dimensionMapping: "Categories: Reps / Regions / Products | Bar Length: Metric Value ($ or Count) | Target Line: Average Benchmark",
        alternativeCharts: ["Lollipop Chart", "Grouped Bar Chart"],
        bestPractices: [
          "Always sort bars in descending order for immediate ranking clarity",
          "Include a dashed reference benchmark line for team quota average",
          "Display value labels directly on or adjacent to bars"
        ]
      };
  }
}

/**
 * Generates tailored chart data payloads strictly according to the canonical type.
 * Metric name and dimensions from the KPI are used to personalize the data and labels.
 */
function generateChartPayload(kpi: KPIRecord) {
  const hash = kpi.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const canonicalType = getCanonicalChartType(kpi.bestVisualization);

  switch (canonicalType) {
    case "bubble":
      return {
        type: "bubble",
        title: `${kpi.metric} (Bubble Matrix)`,
        xAxisLabel: "Sales Cycle Duration (Avg Days to Close)",
        yAxisLabel: "Win Rate Attainment (%)",
        zAxisLabel: "Average Contract Value (ACV)",
        bubbles: [
          { name: "Enterprise North (Sarah T.)", x: 28, y: 76, r: 42, value: "$420k ACV", count: 32, fill: "#0f766e" },
          { name: "Strategic Cloud (Alex M.)", x: 38, y: 84, r: 55, value: "$550k ACV", count: 48, fill: "#0284c7" },
          { name: "Commercial West (David K.)", x: 19, y: 62, r: 24, value: "$240k ACV", count: 64, fill: "#6366f1" },
          { name: "FinServ Direct (Elena R.)", x: 45, y: 88, r: 60, value: "$600k ACV", count: 39, fill: "#10b981" },
          { name: "SMB High Velocity (Marcus L.)", x: 14, y: 44, r: 16, value: "$160k ACV", count: 95, fill: "#d97706" },
          { name: "EMEA Expansion (Chloe B.)", x: 52, y: 56, r: 35, value: "$350k ACV", count: 28, fill: "#b84826" },
          { name: "Global Systems (James W.)", x: 64, y: 92, r: 50, value: "$500k ACV", count: 22, fill: "#8b5cf6" },
          { name: "APAC High Growth (Kenji S.)", x: 32, y: 68, r: 30, value: "$300k ACV", count: 41, fill: "#0f766e" }
        ]
      };

    case "line_series":
      return {
        type: "line_series",
        title: `${kpi.metric} (Pacing & Trend Trajectory)`,
        yAxisLabel: "Metric Value ($k / Rate)",
        xAxisLabel: "Fiscal Months (M1 - M8)",
        points: [
          { period: "M1 Jan", actual: 180 + (hash % 20), target: 170, priorYear: 140 },
          { period: "M2 Feb", actual: 235 + (hash % 25), target: 210, priorYear: 165 },
          { period: "M3 Mar", actual: 310 + (hash % 30), target: 270, priorYear: 210 },
          { period: "M4 Apr", actual: 290 + (hash % 20), target: 280, priorYear: 230 },
          { period: "M5 May", actual: 380 + (hash % 35), target: 340, priorYear: 280 },
          { period: "M6 Jun", actual: 460 + (hash % 40), target: 410, priorYear: 340 },
          { period: "M7 Jul", actual: 440 + (hash % 30), target: 430, priorYear: 370 },
          { period: "M8 Aug", actual: 540 + (hash % 45), target: 490, priorYear: 420 }
        ]
      };

    case "dual_axis_combo":
      return {
        type: "dual_axis_combo",
        title: `${kpi.metric} (Dual-Axis Volume vs Rate)`,
        leftAxisLabel: "Volume / Total Value ($k)",
        rightAxisLabel: "Win Rate / Attainment Rate (%)",
        items: [
          { label: "Q1 Jan", volume: 640 + (hash % 50), rate: 28.5 },
          { label: "Q1 Feb", volume: 720 + (hash % 60), rate: 31.2 },
          { label: "Q1 Mar", volume: 910 + (hash % 80), rate: 36.4 },
          { label: "Q2 Apr", volume: 830 + (hash % 70), rate: 34.0 },
          { label: "Q2 May", volume: 1050 + (hash % 90), rate: 39.8 },
          { label: "Q2 Jun", volume: 1240 + (hash % 100), rate: 43.5 }
        ]
      };

    case "funnel":
      return {
        type: "funnel",
        title: `${kpi.metric} (Conversion Funnel)`,
        stages: [
          { name: "1. Initial Inquiry / Lead Inbound", count: 14500, value: "$5.8M", conversionRate: 100, dropRate: "0%" },
          { name: "2. Marketing Qualified (MQL)", count: 6800, value: "$3.9M", conversionRate: 46.9, dropRate: "-53.1%" },
          { name: "3. Sales Accepted Discovery (SQL)", count: 3200, value: "$2.6M", conversionRate: 22.1, dropRate: "-52.9%" },
          { name: "4. Proposal & Solution Validation", count: 1450, value: "$1.5M", conversionRate: 10.0, dropRate: "-54.7%" },
          { name: "5. Closed-Won Customer Signed", count: 620, value: "$820k", conversionRate: 4.3, dropRate: "-57.2%" }
        ]
      };

    case "waterfall":
      return {
        type: "waterfall",
        title: `${kpi.metric} (Movement & Variance Bridge)`,
        steps: [
          { label: "Starting Base", value: 1450, isTotal: true, color: "#0f766e" },
          { label: "+ New Logos", value: 380, isPositive: true, color: "#10b981" },
          { label: "+ Expansion ARR", value: 210, isPositive: true, color: "#0284c7" },
          { label: "+ Cross-Sell", value: 95, isPositive: true, color: "#6366f1" },
          { label: "- Downsell Contraction", value: -85, isPositive: false, color: "#d97706" },
          { label: "- Customer Churn", value: -160, isPositive: false, color: "#b84826" },
          { label: "Ending Net ARR", value: 1890, isTotal: true, color: "#0f766e" }
        ]
      };

    case "heatmap":
      return {
        type: "heatmap",
        title: `${kpi.metric} (2D Matrix Heatmap)`,
        xLabels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 9", "Month 12"],
        rows: [
          { name: "Cohort Jan (Enterprise)", values: [100, 96, 94, 91, 89, 88, 86, 84] },
          { name: "Cohort Feb (Mid-Market)", values: [100, 94, 90, 87, 84, 82, 79, 76] },
          { name: "Cohort Mar (Commercial)", values: [100, 92, 88, 85, 81, 78, 75, 71] },
          { name: "Cohort Apr (Strategic)", values: [100, 98, 97, 95, 94, 93, 91, 89] },
          { name: "Cohort May (High-Growth)", values: [100, 91, 86, 82, 79, 76, 72, 68] },
          { name: "Cohort Jun (Channel)", values: [100, 95, 92, 89, 87, 85, 82, 80] }
        ]
      };

    case "choropleth_map":
      return {
        type: "choropleth_map",
        title: `${kpi.metric} (Territory Quota & Density Map)`,
        regions: [
          { id: "NA-EAST", name: "North America - East", value: "$4.8M", attainment: "118%", score: 92, color: "#0f766e", reps: 18 },
          { id: "NA-WEST", name: "North America - West", value: "$5.2M", attainment: "124%", score: 96, color: "#10b981", reps: 22 },
          { id: "NA-CENTRAL", name: "North America - Central", value: "$3.1M", attainment: "98%", score: 78, color: "#0284c7", reps: 14 },
          { id: "EMEA-NORTH", name: "EMEA - UK & Nordics", value: "$2.9M", attainment: "105%", score: 85, color: "#6366f1", reps: 12 },
          { id: "EMEA-DACH", name: "EMEA - DACH Central", value: "$2.4M", attainment: "94%", score: 74, color: "#d97706", reps: 10 },
          { id: "APAC-ANZ", name: "APAC - Australia / NZ", value: "$1.8M", attainment: "112%", score: 88, color: "#8b5cf6", reps: 8 },
          { id: "LATAM", name: "Latin America Strategic", value: "$950k", attainment: "89%", score: 68, color: "#b84826", reps: 6 }
        ]
      };

    case "box_plot":
      return {
        type: "box_plot",
        title: `${kpi.metric} (Statistical Five-Number Summary)`,
        yAxisLabel: "Distribution Spread (Days / Value)",
        groups: [
          { name: "Enterprise Tier ($250k+)", min: 22, q1: 45, median: 68, q3: 94, max: 135, outliers: [155, 172] },
          { name: "Mid-Market ($100k-$250k)", min: 14, q1: 28, median: 42, q3: 60, max: 88, outliers: [104] },
          { name: "Commercial ($25k-$100k)", min: 8, q1: 16, median: 26, q3: 38, max: 54, outliers: [70] },
          { name: "SMB Velocity (<$25k)", min: 3, q1: 7, median: 12, q3: 18, max: 28, outliers: [36, 42] }
        ]
      };

    case "histogram":
      return {
        type: "histogram",
        title: `${kpi.metric} (Binned Frequency Histogram)`,
        xAxisLabel: "Age Interval & Duration Bins",
        yAxisLabel: "Number of Active Deals / Records",
        bins: [
          { range: "0-7 Days (Fresh)", count: 340, value: "$4.2M", isHealthy: true },
          { range: "8-14 Days (Active)", count: 280, value: "$3.1M", isHealthy: true },
          { range: "15-30 Days (Attention)", count: 190, value: "$1.9M", isWarning: true },
          { range: "31-60 Days (Stalled)", count: 110, value: "$980k", isDanger: true },
          { range: "61-90 Days (At Risk)", count: 65, value: "$520k", isDanger: true },
          { range: "90+ Days (Dormant)", count: 38, value: "$290k", isDanger: true }
        ]
      };

    case "stacked_100":
      return {
        type: "stacked_100",
        title: `${kpi.metric} (100% Proportional Segment Mix)`,
        segments: [
          { label: "Enterprise Direct", direct: 45, partner: 30, inbound: 15, referral: 10 },
          { label: "Mid-Market", direct: 35, partner: 35, inbound: 20, referral: 10 },
          { label: "Commercial North", direct: 25, partner: 40, inbound: 25, referral: 10 },
          { label: "EMEA Commercial", direct: 20, partner: 45, inbound: 25, referral: 10 },
          { label: "APAC Growth", direct: 30, partner: 30, inbound: 30, referral: 10 }
        ]
      };

    case "treemap":
      return {
        type: "treemap",
        title: `${kpi.metric} (Hierarchical Treemap)`,
        items: [
          { name: "Enterprise Cloud Infrastructure", share: 34, value: "$4.2M", growth: "+24%", color: "#0f766e" },
          { name: "Security & Compliance Suite", share: 26, value: "$3.1M", growth: "+31%", color: "#0284c7" },
          { name: "AI Analytics & Intelligence", share: 18, value: "$2.2M", growth: "+68%", color: "#10b981" },
          { name: "Customer Data Platform (CDP)", share: 12, value: "$1.4M", growth: "+15%", color: "#6366f1" },
          { name: "Developer API Tooling", share: 10, value: "$1.1M", growth: "+8%", color: "#d97706" }
        ]
      };

    case "sankey":
      return {
        type: "sankey",
        title: `${kpi.metric} (Lead Attribution Flow)`,
        flows: [
          { source: "Paid Digital Search", target: "Inside Sales Team", value: "$1.8M", share: "32%" },
          { source: "Organic Search & Content", target: "Enterprise SDRs", value: "$2.4M", share: "41%" },
          { source: "Executive Events & Partner", target: "Strategic Account Reps", value: "$1.6M", share: "27%" },
          { source: "Inside Sales Team", target: "Closed-Won ($1.2M)", value: "$1.2M", share: "66%" },
          { source: "Enterprise SDRs", target: "Closed-Won ($1.9M)", value: "$1.9M", share: "79%" },
          { source: "Strategic Account Reps", target: "Closed-Won ($1.4M)", value: "$1.4M", share: "88%" }
        ]
      };

    case "gantt":
      return {
        type: "gantt",
        title: `${kpi.metric} (Contract & Renewal Timeline)`,
        accounts: [
          { name: "Acme Cloud Global ($450k)", startMonth: "M1", duration: 12, noticeMonth: "M9", status: "Healthy", score: 94, color: "#0f766e" },
          { name: "Nexus Health Systems ($320k)", startMonth: "M3", duration: 12, noticeMonth: "M11", status: "Healthy", score: 88, color: "#0284c7" },
          { name: "Apex Financial Core ($680k)", startMonth: "M2", duration: 24, noticeMonth: "M21", status: "At Risk", score: 62, color: "#d97706" },
          { name: "Vertex Media Corp ($210k)", startMonth: "M4", duration: 12, noticeMonth: "M12", status: "Review Scheduled", score: 79, color: "#6366f1" }
        ]
      };

    case "grouped_bar":
      return {
        type: "grouped_bar",
        title: `${kpi.metric} (Grouped Comparative Bars + KPI Counters)`,
        categories: [
          { name: "Enterprise North", actual: 880, target: 800, prior: 690 },
          { name: "Strategic Accounts", actual: 790, target: 720, prior: 610 },
          { name: "Commercial East", actual: 640, target: 650, prior: 580 },
          { name: "EMEA Expansion", actual: 520, target: 500, prior: 410 },
          { name: "APAC High-Growth", actual: 490, target: 430, prior: 340 }
        ],
        counters: [
          { label: "Average Attainment", value: "108.4%", badge: "+8.4% vs Target", isGood: true },
          { label: "Top Segment", value: "Enterprise North", badge: "110% Quota", isGood: true },
          { label: "YOY Growth", value: "+26.8%", badge: "Solid Pacing", isGood: true }
        ]
      };

    case "kpi_counter_bullet":
      {
        const actual = 74.5 + (hash % 20);
        const target = 70.0;
        return {
          type: "kpi_counter_bullet",
          title: `${kpi.metric} (Attainment Scorecard)`,
          actual,
          target,
          min: 0,
          max: 100,
          delta: (actual - target).toFixed(1),
          status: actual >= target ? "Target Attained" : "Below Target SLA"
        };
      }

    case "sorted_bar":
    default:
      return {
        type: "sorted_bar",
        title: `${kpi.metric} (Ranked Dimension Breakdown)`,
        bars: [
          { dimension: "Enterprise Direct Tier 1", actual: 890 + (hash % 90), benchmark: 780, attainment: "114%" },
          { dimension: "Strategic High-Growth Accounts", actual: 740 + (hash % 70), benchmark: 650, attainment: "113%" },
          { dimension: "Commercial North Region", actual: 620 + (hash % 60), benchmark: 580, attainment: "107%" },
          { dimension: "EMEA Central Expansion", actual: 530 + (hash % 50), benchmark: 540, attainment: "98%" },
          { dimension: "APAC High-Velocity", actual: 480 + (hash % 40), benchmark: 420, attainment: "114%" },
          { dimension: "Global Channel Tier 2", actual: 340 + (hash % 30), benchmark: 380, attainment: "89%" }
        ]
      };
  }
}

export const KPIVisualizationPreview: React.FC<KPIVisualizationPreviewProps> = ({ kpi }) => {
  const [viewMode, setViewMode] = useState<"chart" | "recommendation" | "data">("chart");
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  const recommendation = useMemo(() => getChartRecommendation(kpi), [kpi]);
  const payload = useMemo(() => generateChartPayload(kpi), [kpi]);

  const renderBadgeIcon = () => {
    switch (recommendation.canonicalType) {
      case "bubble":
        return <CircleDot className="w-3.5 h-3.5 text-sky-300" />;
      case "line_series":
        return <LineChartIcon className="w-3.5 h-3.5 text-teal-300" />;
      case "dual_axis_combo":
      case "grouped_bar":
      case "sorted_bar":
        return <BarChart3 className="w-3.5 h-3.5 text-amber-300" />;
      case "funnel":
        return <Filter className="w-3.5 h-3.5 text-emerald-300" />;
      case "heatmap":
        return <Grid3X3 className="w-3.5 h-3.5 text-purple-300" />;
      case "choropleth_map":
        return <MapPin className="w-3.5 h-3.5 text-orange-300" />;
      case "box_plot":
        return <Box className="w-3.5 h-3.5 text-indigo-300" />;
      case "histogram":
        return <Layers className="w-3.5 h-3.5 text-cyan-300" />;
      case "stacked_100":
      case "treemap":
        return <PieIcon className="w-3.5 h-3.5 text-amber-300" />;
      case "sankey":
        return <Split className="w-3.5 h-3.5 text-pink-300" />;
      case "gantt":
        return <Calendar className="w-3.5 h-3.5 text-teal-300" />;
      case "kpi_counter_bullet":
        return <Target className="w-3.5 h-3.5 text-emerald-300" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-300" />;
    }
  };

  return (
    <div className="bg-white border-2 border-zinc-300 rounded-xl p-5 shadow-xs space-y-4">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#1c4039] text-white uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
              {renderBadgeIcon()}
              <span>{kpi.bestVisualization}</span>
            </span>
            <span className="text-xs font-mono text-zinc-500 font-bold">
              {kpi.id} • {kpi.function}
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono font-semibold">
              {kpi.type} Metric
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-extrabold text-zinc-900 mt-2 leading-snug">
            {kpi.metric}
          </h4>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode("chart")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "chart"
                ? "bg-white text-[#1c4039] shadow-xs border border-zinc-200"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Interactive Chart</span>
          </button>
          <button
            onClick={() => setViewMode("recommendation")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "recommendation"
                ? "bg-white text-[#1c4039] shadow-xs border border-zinc-200"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>Chart Rationale</span>
          </button>
          <button
            onClick={() => setViewMode("data")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === "data"
                ? "bg-white text-[#1c4039] shadow-xs border border-zinc-200"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Sample Records</span>
          </button>
        </div>
      </div>

      {/* Rationale Banner */}
      <div className="bg-teal-50/60 border border-teal-200 rounded-lg p-3 flex items-start gap-2.5 text-xs text-teal-950">
        <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold flex items-center gap-1.5">
            <span>Recommended Visualization:</span>
            <span className="text-[#1c4039] underline decoration-teal-400 font-extrabold">{recommendation.chartType}</span>
          </div>
          <p className="text-[11px] text-teal-900 leading-relaxed">
            {recommendation.whyBest}
          </p>
        </div>
      </div>

      {/* 1. Interactive Chart Canvas Render Container */}
      {viewMode === "chart" && (
        <div className="min-h-[340px] w-full pt-1 flex flex-col justify-center">
          {/* A. BUBBLE CHART (Multi-Variable 3-Axis: X, Y, Radius) */}
          {payload.type === "bubble" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-600 px-1">
                <span className="font-bold text-zinc-900">Bubble Size = Average Contract Value ($ ACV)</span>
                <span className="font-mono text-[11px] text-teal-800 font-semibold">Hover bubbles for deep record inspect</span>
              </div>

              <div className="relative w-full h-64 bg-zinc-50 border border-zinc-300 rounded-xl p-4 overflow-hidden select-none">
                {/* Quadrant dividing crosshairs */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-zinc-300 z-0" />
                <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-zinc-300 z-0" />
                
                {/* Quadrant labels */}
                <div className="absolute top-2 right-3 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 z-0">
                  ★ High Velocity Sweet Spot (Short Cycle + High Win Rate)
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] font-bold text-zinc-400 z-0">
                  Lagging / High Friction Deals
                </div>

                {/* SVG Coordinate Grid & Bubbles */}
                <svg className="w-full h-full relative z-10 overflow-visible">
                  {payload.bubbles.map((b: any) => {
                    // Coordinate scaling (X: 0 - 80 days, Y: 0 - 100 win rate)
                    const cx = `${Math.min(92, Math.max(8, (b.x / 75) * 100))}%`;
                    const cy = `${Math.min(90, Math.max(10, 100 - (b.y / 100) * 100))}%`;
                    const radius = Math.max(10, Math.min(26, b.r / 2.2));

                    return (
                      <g
                        key={b.name}
                        className="cursor-pointer transition-transform duration-200 hover:scale-125"
                        onMouseEnter={() => setHoveredPoint(b)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill={b.fill}
                          fillOpacity="0.75"
                          stroke="#ffffff"
                          strokeWidth="2.5"
                          className="drop-shadow-md hover:fill-opacity-100"
                        />
                        <text
                          x={cx}
                          y={cy}
                          dy="3.5"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          pointerEvents="none"
                        >
                          {b.count}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Dynamic Tooltip on Hover */}
                {hoveredPoint && (
                  <div className="absolute top-3 left-3 bg-zinc-900/95 text-white p-2.5 rounded-lg shadow-xl text-xs z-30 space-y-1 border border-zinc-700 animate-in fade-in duration-150">
                    <div className="font-bold text-teal-300">{hoveredPoint.name}</div>
                    <div className="font-mono text-[11px] text-zinc-200">
                      • Sales Cycle: <strong>{hoveredPoint.x} days</strong>
                    </div>
                    <div className="font-mono text-[11px] text-zinc-200">
                      • Win Rate: <strong>{hoveredPoint.y}%</strong>
                    </div>
                    <div className="font-mono text-[11px] text-amber-300">
                      • ACV Deal Size: <strong>{hoveredPoint.value}</strong> ({hoveredPoint.count} opps)
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-[11px] text-zinc-600 font-semibold px-2">
                <span>← Shorter Sales Cycle ({payload.xAxisLabel})</span>
                <span>Higher Win Rate % ({payload.yAxisLabel}) ↑</span>
              </div>
            </div>
          )}

          {/* B. CONTINUOUS TIME-SERIES LINE CHART */}
          {payload.type === "line_series" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-600 px-1">
                <span className="font-bold text-zinc-900">{payload.title}</span>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-[#1c4039]">
                    <span className="w-3 h-0.5 bg-[#1c4039] border-t-2 border-[#1c4039]" />
                    <span>Current Actual Pacing</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500" />
                    <span>Target Plan</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-400">
                    <span className="w-3 h-0.5 border-t-2 border-dotted border-zinc-400" />
                    <span>Prior Year</span>
                  </span>
                </div>
              </div>

              {/* Real SVG Line Chart Canvas */}
              <div className="relative w-full h-64 bg-zinc-50 border border-zinc-300 rounded-xl p-4 overflow-hidden">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none opacity-40">
                  <div className="border-b border-zinc-300 w-full" />
                  <div className="border-b border-zinc-300 w-full" />
                  <div className="border-b border-zinc-300 w-full" />
                  <div className="border-b border-zinc-300 w-full" />
                </div>

                <svg className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="lineActualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f766e" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Polyline: Target Plan (Dashed Amber) */}
                  <polyline
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                    strokeDasharray="5,5"
                    points={payload.points
                      .map((p: any, i: number) => {
                        const x = (i / (payload.points.length - 1)) * 100;
                        const y = 100 - (p.target / 600) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(" ")}
                  />

                  {/* Polyline: Prior Year (Dotted Gray) */}
                  <polyline
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="2,3"
                    points={payload.points
                      .map((p: any, i: number) => {
                        const x = (i / (payload.points.length - 1)) * 100;
                        const y = 100 - (p.priorYear / 600) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(" ")}
                  />

                  {/* Area Fill for Actuals */}
                  <polygon
                    fill="url(#lineActualGrad)"
                    points={`0%,100% ${payload.points
                      .map((p: any, i: number) => {
                        const x = (i / (payload.points.length - 1)) * 100;
                        const y = 100 - (p.actual / 600) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(" ")} 100%,100%`}
                  />

                  {/* Main Line: Actuals (Solid Teal) */}
                  <polyline
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={payload.points
                      .map((p: any, i: number) => {
                        const x = (i / (payload.points.length - 1)) * 100;
                        const y = 100 - (p.actual / 600) * 100;
                        return `${x}%,${y}%`;
                      })
                      .join(" ")}
                  />

                  {/* Point circles with hover interaction */}
                  {payload.points.map((p: any, i: number) => {
                    const cx = `${(i / (payload.points.length - 1)) * 100}%`;
                    const cy = `${100 - (p.actual / 600) * 100}%`;
                    return (
                      <g
                        key={p.period}
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredPoint(p)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={cx}
                          cy={cy}
                          r="5"
                          fill="#0f766e"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-transform group-hover:scale-150 shadow-sm"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip on Line Hover */}
                {hoveredPoint && (
                  <div className="absolute top-2 right-2 bg-zinc-900/95 text-white p-2.5 rounded-lg shadow-xl text-xs z-30 font-mono space-y-0.5 border border-zinc-700">
                    <div className="font-bold text-teal-300 font-sans">{hoveredPoint.period}</div>
                    <div>• Actual: <strong>${hoveredPoint.actual}k</strong></div>
                    <div>• Plan Target: <strong>${hoveredPoint.target}k</strong></div>
                    <div>• Prior Year: <strong>${hoveredPoint.priorYear}k</strong></div>
                  </div>
                )}
              </div>

              {/* X-Axis Labels */}
              <div className="grid grid-cols-8 text-center text-[10px] font-semibold text-zinc-600 px-1">
                {payload.points.map((p: any) => (
                  <span key={p.period}>{p.period}</span>
                ))}
              </div>
            </div>
          )}

          {/* C. DUAL-AXIS COMBO CHART */}
          {payload.type === "dual_axis_combo" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-600 px-1">
                <span className="font-bold text-zinc-900">{payload.title}</span>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <span className="w-3 h-3 bg-[#1c4039] rounded-xs" />
                    <span>Pipeline Volume ($k) [Left Axis]</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <span className="w-3 h-0.5 bg-amber-500 border-t-2 border-amber-500" />
                    <span>Win Rate % [Right Axis]</span>
                  </span>
                </div>
              </div>

              <div className="relative w-full h-64 bg-zinc-50 border border-zinc-300 rounded-xl p-4 flex items-end justify-between gap-3">
                {payload.items.map((item: any) => {
                  const barHeight = Math.round((item.volume / 1400) * 100);
                  const rateY = 100 - (item.rate / 50) * 100;
                  return (
                    <div key={item.label} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                      {/* Rate point dot */}
                      <div
                        className="absolute w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-md z-20 group-hover:scale-150 transition-transform"
                        style={{ bottom: `${100 - rateY}%` }}
                        title={`Win Rate: ${item.rate}%`}
                      />

                      {/* Bar Column */}
                      <div
                        className="w-full max-w-[42px] bg-[#1c4039] group-hover:bg-teal-700 rounded-t-md transition-all shadow-xs relative"
                        style={{ height: `${barHeight}%` }}
                      >
                        <span className="hidden group-hover:block absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded shadow z-30 font-mono">
                          ${item.volume}k ({item.rate}%)
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-zinc-700 mt-2">{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[11px] text-zinc-500 font-mono px-2">
                <span>Left Axis: $0k to $1.4M</span>
                <span>Right Axis: 0% to 50% Win Rate</span>
              </div>
            </div>
          )}

          {/* D. FUNNEL CHART */}
          {payload.type === "funnel" && (
            <div className="space-y-2.5 py-1">
              {payload.stages.map((step: any, idx: number) => {
                const colors = PALETTE[idx % PALETTE.length];
                const widthPct = Math.max(22, Math.round(step.conversionRate));
                return (
                  <div key={step.name} className="space-y-1 group">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors.bg }} />
                        {step.name}
                      </span>
                      <span className="font-mono text-zinc-600 text-[11px]">
                        <strong>{step.count.toLocaleString()}</strong> opps ({step.value}) • Conv: <span className="font-bold text-teal-800">{step.conversionRate}%</span> ({step.dropRate})
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-lg h-7 p-1 border border-zinc-200 flex items-center">
                      <div
                        className="h-full rounded-md transition-all duration-500 flex items-center justify-between px-3 text-[11px] font-bold text-white shadow-xs"
                        style={{ width: `${widthPct}%`, backgroundColor: colors.bg }}
                      >
                        <span>{step.conversionRate}%</span>
                        {widthPct > 35 && <span>{step.count.toLocaleString()} deals</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* E. WATERFALL VARIANCE BRIDGE */}
          {payload.type === "waterfall" && (
            <div className="space-y-3">
              <div className="flex items-end justify-between h-52 pt-4 pb-2 border-b border-zinc-200 px-2">
                {payload.steps.map((item: any) => {
                  const maxVal = 2000;
                  const absVal = Math.abs(item.value);
                  const heightPct = Math.max(14, Math.round((absVal / maxVal) * 100));
                  return (
                    <div key={item.label} className="flex flex-col items-center flex-1 max-w-[76px] group">
                      <span className="text-[10px] font-mono font-bold text-zinc-700 mb-1">
                        {item.value > 0 && !item.isTotal ? `+${item.value}` : item.value}
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-90 shadow-2xs"
                        style={{ height: `${heightPct}%`, backgroundColor: item.color }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-zinc-600">
                {payload.steps.map((item: any) => (
                  <span key={item.label} className="truncate px-0.5" title={item.label}>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* F. HEATMAP MATRIX */}
          {payload.type === "heatmap" && (
            <div className="space-y-3">
              <div className="overflow-x-auto border border-zinc-300 rounded-xl p-3 bg-zinc-50">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left font-bold text-zinc-700 py-1.5 px-2 text-[11px]">Cohort / Dimension</th>
                      {payload.xLabels.map((lbl: string) => (
                        <th key={lbl} className="text-center font-bold text-zinc-700 py-1.5 px-1 text-[10px] whitespace-nowrap">
                          {lbl}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {payload.rows.map((row: any) => (
                      <tr key={row.name}>
                        <td className="font-semibold text-zinc-900 py-2 px-2 whitespace-nowrap text-[11px]">
                          {row.name}
                        </td>
                        {row.values.map((val: number, cIdx: number) => {
                          const opacity = Math.max(0.2, (val - 60) / 40);
                          return (
                            <td key={cIdx} className="p-1 text-center">
                              <div
                                className="w-full py-1.5 rounded-md font-mono text-[10px] font-bold text-zinc-900 transition-all hover:scale-110 shadow-2xs cursor-pointer"
                                style={{
                                  backgroundColor: `rgba(15, 118, 110, ${opacity})`,
                                  color: opacity > 0.65 ? "#ffffff" : "#115e59"
                                }}
                                title={`${row.name} - ${payload.xLabels[cIdx]}: ${val}%`}
                              >
                                {val}%
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* G. CHOROPLETH MAP + REGIONAL CARDS */}
          {payload.type === "choropleth_map" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {payload.regions.map((reg: any) => (
                  <div key={reg.id} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1.5 hover:border-teal-500 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-zinc-900">{reg.name}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{reg.reps} Active Quota Reps</div>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
                        style={{ backgroundColor: reg.color }}
                      >
                        {reg.attainment}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-zinc-600">Pipeline Total:</span>
                      <strong className="text-teal-900 font-extrabold">{reg.value}</strong>
                    </div>
                    <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.min(100, reg.score)}%`, backgroundColor: reg.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* H. BOX PLOT DISTRIBUTION */}
          {payload.type === "box_plot" && (
            <div className="space-y-3">
              <div className="space-y-3 pt-2">
                {payload.groups.map((grp: any, idx: number) => {
                  const colors = PALETTE[idx % PALETTE.length];
                  return (
                    <div key={grp.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-zinc-800">
                        <span>{grp.name}</span>
                        <span className="font-mono text-zinc-600 text-[11px]">
                          Median: <strong>{grp.median}d</strong> (IQR: {grp.q1}d – {grp.q3}d, Max: {grp.max}d)
                        </span>
                      </div>
                      {/* Box plot visual bar */}
                      <div className="relative w-full h-8 bg-zinc-100 rounded-lg border border-zinc-200 flex items-center px-2">
                        {/* Whisker Line */}
                        <div
                          className="absolute h-0.5 bg-zinc-400"
                          style={{
                            left: `${(grp.min / 180) * 100}%`,
                            width: `${((grp.max - grp.min) / 180) * 100}%`
                          }}
                        />
                        {/* Box IQR */}
                        <div
                          className="absolute h-5 rounded-md border-2 shadow-xs flex items-center justify-center"
                          style={{
                            left: `${(grp.q1 / 180) * 100}%`,
                            width: `${((grp.q3 - grp.q1) / 180) * 100}%`,
                            backgroundColor: colors.light,
                            borderColor: colors.border
                          }}
                        >
                          {/* Median Marker Notch */}
                          <div className="w-1 h-full bg-[#1c4039]" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-1">
                <span>0 Days</span>
                <span>60 Days</span>
                <span>120 Days</span>
                <span>180 Days Max</span>
              </div>
            </div>
          )}

          {/* I. HISTOGRAM FREQUENCY */}
          {payload.type === "histogram" && (
            <div className="space-y-3">
              <div className="flex items-end justify-between h-48 pt-4 pb-2 border-b border-zinc-200 px-2 gap-2">
                {payload.bins.map((bin: any) => {
                  const maxCount = 400;
                  const heightPct = Math.round((bin.count / maxCount) * 100);
                  const color = bin.isHealthy ? "#0f766e" : bin.isWarning ? "#d97706" : "#b84826";
                  return (
                    <div key={bin.range} className="flex flex-col items-center flex-1 group">
                      <span className="text-[10px] font-mono font-bold text-zinc-700 mb-1">
                        {bin.count} deals
                      </span>
                      <div
                        className="w-full rounded-t-md transition-all shadow-xs group-hover:opacity-90"
                        style={{ height: `${heightPct}%`, backgroundColor: color }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-6 text-center text-[10px] font-semibold text-zinc-600">
                {payload.bins.map((bin: any) => (
                  <span key={bin.range} className="truncate px-0.5" title={bin.range}>
                    {bin.range}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* J. 100% STACKED BAR */}
          {payload.type === "stacked_100" && (
            <div className="space-y-3">
              {payload.segments.map((seg: any) => (
                <div key={seg.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-zinc-800">
                    <span>{seg.label}</span>
                    <span className="text-[10px] font-mono text-zinc-500">100% Proportional Mix</span>
                  </div>
                  <div className="w-full h-7 rounded-lg overflow-hidden flex border border-zinc-200 shadow-2xs">
                    <div style={{ width: `${seg.direct}%`, backgroundColor: "#0f766e" }} className="flex items-center justify-center text-[10px] font-bold text-white" title={`Direct: ${seg.direct}%`}>
                      {seg.direct}%
                    </div>
                    <div style={{ width: `${seg.partner}%`, backgroundColor: "#0284c7" }} className="flex items-center justify-center text-[10px] font-bold text-white" title={`Partner: ${seg.partner}%`}>
                      {seg.partner}%
                    </div>
                    <div style={{ width: `${seg.inbound}%`, backgroundColor: "#6366f1" }} className="flex items-center justify-center text-[10px] font-bold text-white" title={`Inbound: ${seg.inbound}%`}>
                      {seg.inbound}%
                    </div>
                    <div style={{ width: `${seg.referral}%`, backgroundColor: "#d97706" }} className="flex items-center justify-center text-[10px] font-bold text-white" title={`Referral: ${seg.referral}%`}>
                      {seg.referral}%
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center gap-4 text-xs text-zinc-600 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#0f766e]" /> Direct</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" /> Partner</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#6366f1]" /> Inbound</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-xs bg-[#d97706]" /> Referral</span>
              </div>
            </div>
          )}

          {/* K. TREEMAP */}
          {payload.type === "treemap" && (
            <div className="grid grid-cols-3 gap-2.5 h-56 p-1">
              {payload.items.map((item: any, idx: number) => (
                <div
                  key={item.name}
                  className={`rounded-xl p-3 text-white flex flex-col justify-between shadow-xs transition-transform hover:scale-[1.02] cursor-pointer ${
                    idx === 0 ? "col-span-2 row-span-2" : "col-span-1"
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-extrabold truncate max-w-[180px]">{item.name}</span>
                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">{item.growth}</span>
                  </div>
                  <div>
                    <div className="text-lg font-black font-mono">{item.value}</div>
                    <div className="text-[10px] opacity-80">{item.share}% of Portfolio</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* L. SANKEY FLOW */}
          {payload.type === "sankey" && (
            <div className="space-y-2 py-1">
              {payload.flows.map((flow: any, idx: number) => (
                <div key={idx} className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-900">{flow.source}</span>
                  <span className="text-zinc-400 font-mono text-[11px]">────── {flow.value} ({flow.share}) ─────►</span>
                  <span className="font-bold text-teal-800">{flow.target}</span>
                </div>
              ))}
            </div>
          )}

          {/* M. GANTT RENEWAL TIMELINE */}
          {payload.type === "gantt" && (
            <div className="space-y-3">
              {payload.accounts.map((acc: any) => (
                <div key={acc.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-zinc-800">
                    <span>{acc.name}</span>
                    <span className="text-[10px] font-mono font-bold text-teal-800">Notice Month: {acc.noticeMonth}</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-6 rounded-md p-1 border border-zinc-200 relative overflow-hidden flex items-center">
                    <div
                      className="h-full rounded text-white font-mono text-[10px] font-bold flex items-center px-2 shadow-2xs"
                      style={{ width: `${(acc.duration / 24) * 100}%`, backgroundColor: acc.color }}
                    >
                      {acc.duration} Mos Contract
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* N. GROUPED COMPARATIVE BAR CHART + KPI COUNTERS */}
          {payload.type === "grouped_bar" && (
            <div className="space-y-4">
              {/* Summary KPI counter cards */}
              <div className="grid grid-cols-3 gap-2.5">
                {payload.counters.map((c: any) => (
                  <div key={c.label} className="bg-zinc-50 p-2.5 rounded-lg border border-zinc-200">
                    <div className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">{c.label}</div>
                    <div className="text-base font-black text-zinc-900 font-mono mt-0.5">{c.value}</div>
                    <div className="text-[10px] font-semibold text-teal-700 mt-0.5">{c.badge}</div>
                  </div>
                ))}
              </div>

              {/* Grouped Bar Visual */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold px-1">
                  <span>Segment Performance Comparison</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-[#0f766e]" /> Actual</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" /> Target Quota</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-zinc-300" /> Prior Year</span>
                  </div>
                </div>

                {payload.categories.map((cat: any) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-zinc-800">
                      <span>{cat.name}</span>
                      <span className="font-mono text-[11px] text-zinc-600">
                        ${cat.actual}k / quota ${cat.target}k (
                        <span className="font-bold text-teal-800">{Math.round((cat.actual / cat.target) * 100)}%</span>)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-md p-1 border border-zinc-200 flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 text-[10px] font-mono text-zinc-500">Actual</div>
                        <div
                          className="h-3.5 rounded bg-[#0f766e] text-white text-[9px] font-mono font-bold flex items-center justify-end pr-1.5 transition-all"
                          style={{ width: `${Math.min(100, (cat.actual / 1000) * 100)}%` }}
                        >
                          ${cat.actual}k
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 text-[10px] font-mono text-zinc-500">Target</div>
                        <div
                          className="h-2.5 rounded bg-[#0284c7] opacity-80"
                          style={{ width: `${Math.min(100, (cat.target / 1000) * 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 text-[10px] font-mono text-zinc-500">Prior</div>
                        <div
                          className="h-2 rounded bg-zinc-300"
                          style={{ width: `${Math.min(100, (cat.prior / 1000) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* O. KPI COUNTER + BENCHMARK BULLET GAUGE */}
          {payload.type === "kpi_counter_bullet" && (
            <div className="space-y-5 py-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#1c4039] tracking-tight font-mono">
                      {payload.actual.toFixed(1)}%
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">Active Current Level</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-extrabold rounded-full border ${
                      payload.actual >= payload.target
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-amber-100 text-amber-900 border-amber-300"
                    }`}
                  >
                    {payload.actual >= payload.target ? "▲ Above Benchmark" : "▼ Under Benchmark"} (+{payload.delta}%)
                  </span>
                  <span className="text-xs text-zinc-600 font-mono bg-zinc-100 px-2.5 py-1 rounded border border-zinc-200">
                    Target SLA: <strong>{payload.target.toFixed(1)}%</strong>
                  </span>
                </div>
              </div>

              {/* Progress Bullet Bar */}
              <div className="space-y-2">
                <div className="w-full bg-zinc-200 h-8 rounded-xl relative overflow-hidden border border-zinc-300 p-1">
                  <div
                    className="h-full bg-[#1c4039] rounded-lg transition-all duration-500 shadow-inner flex items-center justify-end pr-3 text-white font-mono text-xs font-bold"
                    style={{ width: `${Math.min(100, payload.actual)}%` }}
                  >
                    {payload.actual.toFixed(1)}%
                  </div>
                  {/* Target reference notch */}
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-amber-500 z-10 shadow-md"
                    style={{ left: `${payload.target}%` }}
                    title={`Target SLA: ${payload.target}%`}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-1">
                  <span>0% (Floor)</span>
                  <span className="text-amber-700 font-bold">▲ Benchmark SLA ({payload.target}%)</span>
                  <span>100% (Ceiling)</span>
                </div>
              </div>
            </div>
          )}

          {/* P. SORTED BAR CHART */}
          {payload.type === "sorted_bar" && (
            <div className="space-y-2.5">
              {payload.bars.map((bar: any, idx: number) => {
                const colors = PALETTE[idx % PALETTE.length];
                const maxVal = 1000;
                const widthPct = Math.min(100, Math.round((bar.actual / maxVal) * 100));
                return (
                  <div key={bar.dimension} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-zinc-800">
                      <span className="truncate max-w-[240px]">{bar.dimension}</span>
                      <span className="font-mono text-[11px] text-zinc-600">
                        <strong>${bar.actual}k</strong> / benchmark ${bar.benchmark}k (
                        <span className="font-bold text-teal-800">{bar.attainment}</span>)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 h-6 rounded-md overflow-hidden p-0.5 border border-zinc-200 flex items-center">
                      <div
                        className="h-full rounded transition-all duration-500 flex items-center justify-end pr-2 text-white font-mono text-[10px] font-bold"
                        style={{ width: `${widthPct}%`, backgroundColor: colors.bg }}
                      >
                        ${bar.actual}k
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Chart Suggestion Rationale & Best Practice Intelligence */}
      {viewMode === "recommendation" && (
        <div className="space-y-4 p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-teal-700" />
                <span>Executive Rationale</span>
              </h5>
              <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                {recommendation.whyBest}
              </p>
              <div className="pt-2 border-t border-zinc-200 text-[11px] text-zinc-600">
                <span className="font-bold text-zinc-900">Functional Category:</span> {recommendation.category}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-700" />
                <span>Dimension & Axis Encoding</span>
              </h5>
              <p className="text-xs font-mono text-teal-950 bg-teal-50/80 p-2 rounded-lg border border-teal-200">
                {recommendation.dimensionMapping}
              </p>
              <div className="pt-1 text-[11px] text-zinc-600">
                <span className="font-bold text-zinc-900">Metric Object:</span> {kpi.object}
              </div>
            </div>
          </div>

          {/* Best Practices Checklist */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2.5">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Production Dashboard Best Practices</span>
            </h5>
            <ul className="space-y-1.5 text-xs text-zinc-700">
              {recommendation.bestPractices.map((bp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-700 font-bold">•</span>
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 3. Underlying Data Table */}
      {viewMode === "data" && (
        <div className="overflow-x-auto max-h-[300px] rounded-lg border border-zinc-200 bg-zinc-50">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-200/80 text-zinc-800 font-bold sticky top-0">
              <tr>
                <th className="py-2 px-3 uppercase tracking-wider text-[10px]">Segment / Record</th>
                <th className="py-2 px-3 uppercase tracking-wider text-[10px]">Metric Value</th>
                <th className="py-2 px-3 uppercase tracking-wider text-[10px]">Target / Benchmark</th>
                <th className="py-2 px-3 uppercase tracking-wider text-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-zinc-700 font-mono text-[11px]">
              {(
                payload.bubbles ||
                payload.points ||
                payload.items ||
                payload.stages ||
                payload.steps ||
                payload.regions ||
                payload.groups ||
                payload.bins ||
                payload.segments ||
                payload.categories ||
                payload.bars ||
                []
              ).map((item: any, i: number) => (
                <tr key={i} className="hover:bg-white transition-colors">
                  <td className="py-1.5 px-3 font-sans font-medium text-zinc-900">
                    {item.name || item.period || item.label || item.dimension || item.range || `Record #${i + 1}`}
                  </td>
                  <td className="py-1.5 px-3 font-bold text-teal-900">
                    {item.value ? item.value : item.actual ? (payload.type === "line_series" ? `$${item.actual}k` : `${item.actual}%`) : item.volume ? `$${item.volume}k` : item.count ? `${item.count} deals` : "—"}
                  </td>
                  <td className="py-1.5 px-3 text-zinc-600">
                    {item.target ? `$${item.target}k` : item.benchmark ? `$${item.benchmark}k` : item.conversionRate ? `${item.conversionRate}%` : "Standard SLA"}
                  </td>
                  <td className="py-1.5 px-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800">
                      {item.attainment || item.status || "Verified"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Details */}
      <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-zinc-500">
        <div>
          <span className="font-semibold text-zinc-700">Recommended Dimensions:</span> {kpi.dimensions}
        </div>
        <div className="flex items-center gap-1 text-teal-900 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Chart dynamically matches <strong>{kpi.bestVisualization}</strong> standard</span>
        </div>
      </div>
    </div>
  );
};
