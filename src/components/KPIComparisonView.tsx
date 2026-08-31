import React, { useState, useMemo } from "react";
import {
  Scale,
  ArrowRightLeft,
  Zap,
  BarChart3,
  Layers,
  Building2,
  DollarSign,
  ShieldCheck,
  Download,
  Info,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { GTMTelemetryRecord, TradeVertical } from "../data/gtmAnalyticsDataset";

export type KPICategoryId =
  | "sales_efficiency"
  | "campaign_perf"
  | "funnel_conversion"
  | "lead_flow"
  | "pipeline_opp"
  | "customer_retention";

export interface ComparativeMetric {
  id: string;
  name: string;
  category: KPICategoryId;
  type: "Leading" | "Lagging";
  computeValue: (data: GTMTelemetryRecord[]) => string;
  benchmark: string;
  unit: string;
  formula: string;
  ssotSource: string;
  strategicObjective: string;
  statusEval: (data: GTMTelemetryRecord[]) => "optimal" | "warning" | "neutral" | "null";
}

export interface KPICategoryMeta {
  id: KPICategoryId;
  title: string;
  shortTitle: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  northStar: string;
  keyQuestions: string[];
  metrics: ComparativeMetric[];
}

export const KPI_CATEGORIES: Record<KPICategoryId, KPICategoryMeta> = {
  sales_efficiency: {
    id: "sales_efficiency",
    title: "Sales Efficiency & Velocity",
    shortTitle: "Sales Efficiency",
    icon: Zap,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    northStar: "Maximize AE throughput, accelerate contract velocity, and optimize deal size without increasing quota ramp.",
    keyQuestions: [
      "Are reps closing opportunities at industry-leading win rates?",
      "How fast do deals progress from SQL to Closed Won?",
      "Is pipeline velocity generating sufficient yield per rep per month?"
    ],
    metrics: [
      {
        id: "se-1",
        name: "Opportunity Win Rate (%)",
        category: "sales_efficiency",
        type: "Lagging",
        computeValue: (data) => {
          const closed = data.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
          if (closed.length === 0) return "Null";
          const won = closed.filter((r) => r.stage === "Closed Won").length;
          return `${((won / closed.length) * 100).toFixed(1)}%`;
        },
        benchmark: "25.0% – 32.0%",
        unit: "%",
        formula: "COUNT(Won Opps) / COUNT(Total Closed Opps) * 100",
        ssotSource: "Salesforce CRM (Opportunity)",
        strategicObjective: "Measure sales conversion effectiveness and deal closing execution across reps.",
        statusEval: (data) => {
          const closed = data.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
          if (closed.length === 0) return "null";
          const rate = (closed.filter((r) => r.stage === "Closed Won").length / closed.length) * 100;
          return rate >= 25 ? "optimal" : "warning";
        }
      },
      {
        id: "se-2",
        name: "Pipeline Velocity ($/Day)",
        category: "sales_efficiency",
        type: "Leading",
        computeValue: (data) => {
          const closed = data.filter((r) => r.stage === "Closed Won" || r.stage === "Closed Lost");
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          const closedWithDays = data.filter((r) => r.salesCycleDays !== null);
          if (closed.length === 0 || won.length === 0 || closedWithDays.length === 0) return "Null";
          const winRate = won.length / closed.length;
          const avgAcv = won.reduce((acc, r) => acc + (r.dealValue || 0), 0) / won.length;
          const avgCycle = closedWithDays.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / closedWithDays.length;
          if (avgCycle === 0) return "Null";
          const oppCount = data.filter((r) => r.stage === "Opportunity").length || 1;
          const velocity = (oppCount * avgAcv * winRate) / avgCycle;
          return `$${Math.round(velocity).toLocaleString()}/day`;
        },
        benchmark: "> $15,000/day per pod",
        unit: "$/Day",
        formula: "(Active Opps × Avg ACV × Win Rate) / Avg Sales Cycle Days",
        ssotSource: "Salesforce CPQ + CRM Analytics",
        strategicObjective: "Quantify daily revenue yield generated across active pipeline.",
        statusEval: (data) => "optimal"
      },
      {
        id: "se-3",
        name: "Average Deal Size (ACV)",
        category: "sales_efficiency",
        type: "Lagging",
        computeValue: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (won.length === 0) return "Null";
          const avg = won.reduce((acc, r) => acc + (r.dealValue || 0), 0) / won.length;
          return `$${Math.round(avg).toLocaleString()}`;
        },
        benchmark: "$35,000 – $60,000",
        unit: "USD",
        formula: "SUM(Closed Won Deal Value) / COUNT(Closed Won Deals)",
        ssotSource: "Salesforce CPQ / Stripe Billing",
        strategicObjective: "Track commercial packaging and deal expansion upmarket.",
        statusEval: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (won.length === 0) return "null";
          const avg = won.reduce((acc, r) => acc + (r.dealValue || 0), 0) / won.length;
          return avg >= 35000 ? "optimal" : "warning";
        }
      },
      {
        id: "se-4",
        name: "Sales Cycle Dwell Time (Days)",
        category: "sales_efficiency",
        type: "Leading",
        computeValue: (data) => {
          const closed = data.filter((r) => r.salesCycleDays !== null);
          if (closed.length === 0) return "Null";
          const avg = closed.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / closed.length;
          return `${Math.round(avg)} Days`;
        },
        benchmark: "< 45 Days",
        unit: "Days",
        formula: "AVG(CloseDate - MqlDate) for closed records",
        ssotSource: "Salesforce Lead & Opportunity History",
        strategicObjective: "Minimize deal friction and contract negotiation cycle times.",
        statusEval: (data) => {
          const closed = data.filter((r) => r.salesCycleDays !== null);
          if (closed.length === 0) return "null";
          const avg = closed.reduce((acc, r) => acc + (r.salesCycleDays || 0), 0) / closed.length;
          return avg <= 45 ? "optimal" : "warning";
        }
      },
      {
        id: "se-5",
        name: "Net Revenue Retention (NRR)",
        category: "sales_efficiency",
        type: "Lagging",
        computeValue: (data) => {
          const withStarting = data.filter((r) => r.startingArr !== null && r.startingArr > 0);
          if (withStarting.length === 0) return "Null";
          const starting = withStarting.reduce((acc, r) => acc + (r.startingArr || 0), 0);
          const expansion = withStarting.reduce((acc, r) => acc + (r.expansionArr || 0), 0);
          const churn = withStarting.reduce((acc, r) => acc + (r.churnArr || 0), 0);
          const nrr = ((starting + expansion - churn) / starting) * 100;
          return `${nrr.toFixed(1)}%`;
        },
        benchmark: "> 115.0%",
        unit: "%",
        formula: "((Starting ARR + Expansion ARR - Churn ARR) / Starting ARR) * 100",
        ssotSource: "Stripe / Chargebee / Salesforce Contracts",
        strategicObjective: "Evaluate compounding expansion vs customer gross churn.",
        statusEval: (data) => {
          const withStarting = data.filter((r) => r.startingArr !== null && r.startingArr > 0);
          if (withStarting.length === 0) return "null";
          const starting = withStarting.reduce((acc, r) => acc + (r.startingArr || 0), 0);
          const expansion = withStarting.reduce((acc, r) => acc + (r.expansionArr || 0), 0);
          const churn = withStarting.reduce((acc, r) => acc + (r.churnArr || 0), 0);
          const nrr = ((starting + expansion - churn) / starting) * 100;
          return nrr >= 115 ? "optimal" : "warning";
        }
      }
    ]
  },
  campaign_perf: {
    id: "campaign_perf",
    title: "Campaign Performance & Unit Economics",
    shortTitle: "Campaign Performance",
    icon: BarChart3,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    northStar: "Maximize marketing ROI and accelerate customer acquisition payback while scaling lead volume.",
    keyQuestions: [
      "What is our fully loaded Customer Acquisition Cost (CAC) across paid channels?",
      "Which campaigns deliver payback in under 12 months?",
      "What is the blended Cost per Lead (CPL) and Cost per SQL (CPSQL)?"
    ],
    metrics: [
      {
        id: "cp-1",
        name: "Cost per Lead (CPL)",
        category: "campaign_perf",
        type: "Leading",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          return `$${(totalSpend / data.length).toFixed(2)}`;
        },
        benchmark: "< $150.00",
        unit: "USD",
        formula: "SUM(Campaign Allocated Spend) / COUNT(Total Leads Created)",
        ssotSource: "Google Ads / LinkedIn Campaign Manager / Marketo",
        strategicObjective: "Ensure top-of-funnel lead generation remains cost-efficient.",
        statusEval: (data) => {
          if (data.length === 0) return "null";
          const spend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          const cpl = spend / data.length;
          return cpl <= 150 ? "optimal" : "warning";
        }
      },
      {
        id: "cp-2",
        name: "Cost per SQL (CPSQL)",
        category: "campaign_perf",
        type: "Leading",
        computeValue: (data) => {
          const sqls = data.filter((r) => r.stage === "SQL" || r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost");
          if (sqls.length === 0) return "Null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          return `$${(totalSpend / sqls.length).toFixed(2)}`;
        },
        benchmark: "< $450.00",
        unit: "USD",
        formula: "SUM(Campaign Spend) / COUNT(SQLs Validated)",
        ssotSource: "Salesforce CRM + Marketing Automation",
        strategicObjective: "Measure cost to generate sales-accepted discovery meetings.",
        statusEval: (data) => {
          const sqls = data.filter((r) => r.stage === "SQL" || r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost");
          if (sqls.length === 0) return "null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          return totalSpend / sqls.length <= 450 ? "optimal" : "warning";
        }
      },
      {
        id: "cp-3",
        name: "Customer Acquisition Cost (CAC)",
        category: "campaign_perf",
        type: "Lagging",
        computeValue: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won");
          if (won.length === 0) return "Null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          return `$${Math.round(totalSpend / won.length).toLocaleString()}`;
        },
        benchmark: "< $12,000 per Logo",
        unit: "USD",
        formula: "SUM(Total Sales & Marketing Spend) / COUNT(Closed Won Logos)",
        ssotSource: "ERP (NetSuite) + CRM Attribution",
        strategicObjective: "Maintain sustainable unit economics per acquired customer.",
        statusEval: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won");
          if (won.length === 0) return "null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          return totalSpend / won.length <= 12000 ? "optimal" : "warning";
        }
      },
      {
        id: "cp-4",
        name: "Campaign Return on Investment (ROI)",
        category: "campaign_perf",
        type: "Lagging",
        computeValue: (data) => {
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (totalSpend === 0) return "Null";
          const totalArr = won.reduce((acc, r) => acc + (r.dealValue || 0), 0);
          const roi = ((totalArr - totalSpend) / totalSpend) * 100;
          return `${roi.toFixed(1)}%`;
        },
        benchmark: "> 400.0%",
        unit: "%",
        formula: "((Total Booked ARR - Total Campaign Spend) / Total Spend) * 100",
        ssotSource: "CRM Analytics + Marketing Finance",
        strategicObjective: "Validate net return generated per marketing dollar invested.",
        statusEval: (data) => {
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (totalSpend === 0) return "null";
          const totalArr = won.reduce((acc, r) => acc + (r.dealValue || 0), 0);
          const roi = ((totalArr - totalSpend) / totalSpend) * 100;
          return roi >= 400 ? "optimal" : "warning";
        }
      },
      {
        id: "cp-5",
        name: "CAC Payback Horizon (Months)",
        category: "campaign_perf",
        type: "Lagging",
        computeValue: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (won.length === 0) return "Null";
          const totalSpend = data.reduce((acc, r) => acc + (r.campaignSpend || 0), 0);
          const avgAcv = won.reduce((acc, r) => acc + (r.dealValue || 0), 0) / won.length;
          const grossMargin = 0.78; // Standard 78% SaaS gross margin
          const monthlyRevenuePerCustomer = (avgAcv * grossMargin) / 12;
          if (monthlyRevenuePerCustomer === 0) return "Null";
          const cac = totalSpend / won.length;
          const payback = cac / monthlyRevenuePerCustomer;
          return `${payback.toFixed(1)} Mos`;
        },
        benchmark: "< 12.0 Months",
        unit: "Months",
        formula: "CAC / ((Avg ACV × Gross Margin) / 12)",
        ssotSource: "Corporate Finance Model & SSoT",
        strategicObjective: "Ensure cash flow break-even on customer acquisition costs within 1 year.",
        statusEval: (data) => {
          const won = data.filter((r) => r.stage === "Closed Won" && r.dealValue !== null);
          if (won.length === 0) return "null";
          return "optimal";
        }
      }
    ]
  },
  funnel_conversion: {
    id: "funnel_conversion",
    title: "Funnel Conversion & Waterfall",
    shortTitle: "Funnel Conversion",
    icon: Layers,
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-300",
    northStar: "Eliminate pipeline drop-offs and maximize progression rates from raw lead ingress to closed won.",
    keyQuestions: [
      "Where are we experiencing the sharpest stage-to-stage leakage?",
      "What percentage of raw inbound leads convert into revenue?",
      "How effective is our ICP qualification and discovery process?"
    ],
    metrics: [
      {
        id: "fc-1",
        name: "Lead-to-MQL Conversion Rate",
        category: "funnel_conversion",
        type: "Leading",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const mql = data.filter((r) => r.stage !== "Lead Ingress").length;
          return `${((mql / data.length) * 100).toFixed(1)}%`;
        },
        benchmark: "> 65.0%",
        unit: "%",
        formula: "COUNT(MQLs) / COUNT(Total Leads) * 100",
        ssotSource: "Marketing Automation (Marketo / HubSpot)",
        strategicObjective: "Filter low-intent and out-of-profile inbound inquiries.",
        statusEval: (data) => (data.length > 0 ? "optimal" : "null")
      },
      {
        id: "fc-2",
        name: "MQL-to-SQL Acceptance Rate",
        category: "funnel_conversion",
        type: "Leading",
        computeValue: (data) => {
          const mqls = data.filter((r) => r.stage !== "Lead Ingress");
          if (mqls.length === 0) return "Null";
          const sqls = data.filter((r) => r.stage === "SQL" || r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost").length;
          return `${((sqls / mqls.length) * 100).toFixed(1)}%`;
        },
        benchmark: "> 50.0%",
        unit: "%",
        formula: "COUNT(SQLs) / COUNT(MQLs) * 100",
        ssotSource: "Salesforce Lead Status & SDR Queue",
        strategicObjective: "Validate alignment between marketing qualification and sales acceptance.",
        statusEval: (data) => "optimal"
      },
      {
        id: "fc-3",
        name: "SQL-to-Opportunity Creation Rate",
        category: "funnel_conversion",
        type: "Leading",
        computeValue: (data) => {
          const sqls = data.filter((r) => r.stage === "SQL" || r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost");
          if (sqls.length === 0) return "Null";
          const opps = data.filter((r) => r.stage === "Opportunity" || r.stage === "Closed Won" || r.stage === "Closed Lost").length;
          return `${((opps / sqls.length) * 100).toFixed(1)}%`;
        },
        benchmark: "> 55.0%",
        unit: "%",
        formula: "COUNT(Opportunities) / COUNT(SQLs) * 100",
        ssotSource: "Salesforce Opportunity History",
        strategicObjective: "Assess AE discovery qualification and CPQ quote generation.",
        statusEval: (data) => "optimal"
      },
      {
        id: "fc-4",
        name: "End-to-End Funnel Conversion (Lead → Won)",
        category: "funnel_conversion",
        type: "Lagging",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const won = data.filter((r) => r.stage === "Closed Won").length;
          return `${((won / data.length) * 100).toFixed(1)}%`;
        },
        benchmark: "8.0% – 15.0%",
        unit: "%",
        formula: "COUNT(Closed Won) / COUNT(Total Leads Ingress) * 100",
        ssotSource: "Salesforce Full Lifecycle Lineage",
        strategicObjective: "Measure overall GTM demand-to-revenue conversion throughput.",
        statusEval: (data) => (data.length > 0 ? "optimal" : "null")
      }
    ]
  },
  lead_flow: {
    id: "lead_flow",
    title: "Lead Gen Flow & Trade Verticals",
    shortTitle: "Lead Gen Flow",
    icon: Building2,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
    northStar: "Drive predictable, high-ICP lead volume across high-margin commercial trades and channels.",
    keyQuestions: [
      "Which trade vertical is delivering the highest volume of qualified leads?",
      "Are outbound AI sequences outperforming inbound organic channels?",
      "Is our speed to lead within the 5-minute SLA threshold?"
    ],
    metrics: [
      {
        id: "lf-1",
        name: "Total Lead Ingress Volume",
        category: "lead_flow",
        type: "Leading",
        computeValue: (data) => `${data.length.toLocaleString()} Leads`,
        benchmark: "> 400 Leads / Quarter",
        unit: "Leads",
        formula: "COUNT(Lead IDs captured in period)",
        ssotSource: "Marketo / HubSpot / Lemlist Ingestion",
        strategicObjective: "Ensure sufficient top-of-funnel capacity to feed sales team quota.",
        statusEval: (data) => (data.length >= 100 ? "optimal" : "warning")
      },
      {
        id: "lf-2",
        name: "Speed to Lead SLA (First Touch)",
        category: "lead_flow",
        type: "Leading",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const avg = data.reduce((acc, r) => acc + (r.speedToLeadMinutes || 0), 0) / data.length;
          return `${avg.toFixed(1)} Mins`;
        },
        benchmark: "< 15.0 Minutes",
        unit: "Minutes",
        formula: "AVG(First Activity Timestamp - Ingress Timestamp)",
        ssotSource: "Lemlist / Chili Piper / Salesforce Task",
        strategicObjective: "Engage prospective buyers within the critical golden conversion window.",
        statusEval: (data) => {
          if (data.length === 0) return "null";
          const avg = data.reduce((acc, r) => acc + (r.speedToLeadMinutes || 0), 0) / data.length;
          return avg <= 15 ? "optimal" : "warning";
        }
      },
      {
        id: "lf-3",
        name: "Trade Vertical Concentration (% Top Trade)",
        category: "lead_flow",
        type: "Leading",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const counts: Record<string, number> = {};
          data.forEach((r) => {
            counts[r.trade] = (counts[r.trade] || 0) + 1;
          });
          const maxVal = Math.max(...Object.values(counts));
          return `${((maxVal / data.length) * 100).toFixed(1)}%`;
        },
        benchmark: "< 40.0% (Balanced Portfolio)",
        unit: "%",
        formula: "MAX(Trade Volume) / Total Lead Volume * 100",
        ssotSource: "Clearbit / ZoomInfo Account Enrichment",
        strategicObjective: "Prevent revenue concentration risk in a single commercial vertical.",
        statusEval: (data) => "optimal"
      },
      {
        id: "lf-4",
        name: "Outbound AI Swarm Share (%)",
        category: "lead_flow",
        type: "Leading",
        computeValue: (data) => {
          if (data.length === 0) return "Null";
          const outbound = data.filter((r) => r.leadSource === "Outbound AI Agent").length;
          return `${((outbound / data.length) * 100).toFixed(1)}%`;
        },
        benchmark: "> 35.0%",
        unit: "%",
        formula: "COUNT(Outbound AI Ingress) / COUNT(Total Leads) * 100",
        ssotSource: "Lemlist / Apollo / Outbound Signal Engine",
        strategicObjective: "Scale proactive autonomous prospecting to reduce reliance on paid search.",
        statusEval: (data) => "optimal"
      }
    ]
  },
  pipeline_opp: {
    id: "pipeline_opp",
    title: "Pipeline & Opportunity Management",
    shortTitle: "Pipeline Management",
    icon: Target,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    northStar: "Maintain 3.5x+ quota pipeline coverage and actively de-risk stalled mid-stage opportunities.",
    keyQuestions: [
      "Is our open pipeline coverage sufficient to hit next quarter's revenue target?",
      "What is our weighted pipeline expected yield?",
      "Are enterprise deals stalling in technical CPQ review?"
    ],
    metrics: [
      {
        id: "po-1",
        name: "Active Open Pipeline Value",
        category: "pipeline_opp",
        type: "Leading",
        computeValue: (data) => {
          const opps = data.filter((r) => r.stage === "Opportunity" && r.dealValue !== null);
          if (opps.length === 0) return "Null";
          const sum = opps.reduce((acc, r) => acc + (r.dealValue || 0), 0);
          return `$${sum.toLocaleString()}`;
        },
        benchmark: "> $5,000,000",
        unit: "USD",
        formula: "SUM(DealValue) WHERE Stage = 'Opportunity'",
        ssotSource: "Salesforce Opportunity Pipeline",
        strategicObjective: "Ensure sufficient gross pipeline to support revenue targets.",
        statusEval: (data) => "optimal"
      },
      {
        id: "po-2",
        name: "Pipeline Coverage Ratio",
        category: "pipeline_opp",
        type: "Leading",
        computeValue: (data) => {
          const opps = data.filter((r) => r.stage === "Opportunity" && r.dealValue !== null);
          if (opps.length === 0) return "Null";
          const sum = opps.reduce((acc, r) => acc + (r.dealValue || 0), 0);
          const targetQuota = 2500000; // Benchmark quota
          return `${(sum / targetQuota).toFixed(2)}x Coverage`;
        },
        benchmark: "3.0x – 4.0x Coverage",
        unit: "Ratio",
        formula: "Open Pipeline Value / Team Period Quota",
        ssotSource: "Salesforce + Quota Planning Model",
        strategicObjective: "De-risk quarterly target attainment through healthy pipeline buffers.",
        statusEval: (data) => "optimal"
      },
      {
        id: "po-3",
        name: "Weighted Pipeline Value",
        category: "pipeline_opp",
        type: "Leading",
        computeValue: (data) => {
          const opps = data.filter((r) => r.stage === "Opportunity" && r.dealValue !== null);
          if (opps.length === 0) return "Null";
          const sum = opps.reduce((acc, r) => acc + (r.dealValue || 0), 0);
          return `$${Math.round(sum * 0.45).toLocaleString()}`; // 45% stage probability
        },
        benchmark: "> $2,000,000",
        unit: "USD",
        formula: "SUM(Deal Value × Stage Probability %)",
        ssotSource: "Clari / Gong / Salesforce Forecast",
        strategicObjective: "Forecast expected cash collections based on historical stage probability.",
        statusEval: (data) => "optimal"
      }
    ]
  },
  customer_retention: {
    id: "customer_retention",
    title: "Customer Retention & Expansion",
    shortTitle: "Customer Retention",
    icon: ShieldCheck,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-300",
    northStar: "Maximize customer lifetime value through zero logo churn and proactive expansion tiering.",
    keyQuestions: [
      "What is our Gross Revenue Retention (GRR)?",
      "Are onboarded trade accounts expanding into additional product lines?",
      "What is customer satisfaction across newly won cohorts?"
    ],
    metrics: [
      {
        id: "cr-1",
        name: "Net Revenue Retention (NRR)",
        category: "customer_retention",
        type: "Lagging",
        computeValue: (data) => {
          const withStarting = data.filter((r) => r.startingArr !== null && r.startingArr > 0);
          if (withStarting.length === 0) return "Null";
          const starting = withStarting.reduce((acc, r) => acc + (r.startingArr || 0), 0);
          const expansion = withStarting.reduce((acc, r) => acc + (r.expansionArr || 0), 0);
          const churn = withStarting.reduce((acc, r) => acc + (r.churnArr || 0), 0);
          const nrr = ((starting + expansion - churn) / starting) * 100;
          return `${nrr.toFixed(1)}%`;
        },
        benchmark: "> 115.0%",
        unit: "%",
        formula: "((Starting + Expansion - Churn) / Starting) * 100",
        ssotSource: "Stripe Billing / Gainsight",
        strategicObjective: "Evaluate compounding net account expansion.",
        statusEval: (data) => "optimal"
      },
      {
        id: "cr-2",
        name: "Gross Revenue Retention (GRR)",
        category: "customer_retention",
        type: "Lagging",
        computeValue: (data) => {
          const withStarting = data.filter((r) => r.startingArr !== null && r.startingArr > 0);
          if (withStarting.length === 0) return "Null";
          const starting = withStarting.reduce((acc, r) => acc + (r.startingArr || 0), 0);
          const churn = withStarting.reduce((acc, r) => acc + (r.churnArr || 0), 0);
          const grr = ((starting - churn) / starting) * 100;
          return `${grr.toFixed(1)}%`;
        },
        benchmark: "> 92.0%",
        unit: "%",
        formula: "((Starting ARR - Churn ARR) / Starting ARR) * 100",
        ssotSource: "Stripe Billing / Financial Ledger",
        strategicObjective: "Measure baseline core customer loyalty excluding expansion revenue.",
        statusEval: (data) => "optimal"
      },
      {
        id: "cr-3",
        name: "Average Customer Health & CSAT",
        category: "customer_retention",
        type: "Leading",
        computeValue: (data) => {
          const withCsat = data.filter((r) => r.csatScore !== null);
          if (withCsat.length === 0) return "Null";
          const avg = withCsat.reduce((acc, r) => acc + (r.csatScore || 0), 0) / withCsat.length;
          return `${avg.toFixed(1)} / 5.0`;
        },
        benchmark: "> 4.5 / 5.0",
        unit: "Score",
        formula: "AVG(Post-Onboarding CSAT Response Score)",
        ssotSource: "Zendesk / Qualtrics / In-App Survey",
        strategicObjective: "Detect customer dissatisfaction before churn renewal windows.",
        statusEval: (data) => "optimal"
      }
    ]
  }
};

interface KPIComparisonViewProps {
  data: GTMTelemetryRecord[];
}

export const KPIComparisonView: React.FC<KPIComparisonViewProps> = ({ data }) => {
  // State for Dual Category Selection
  const [categoryAId, setCategoryAId] = useState<KPICategoryId>("sales_efficiency");
  const [categoryBId, setCategoryBId] = useState<KPICategoryId>("campaign_perf");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const catA = KPI_CATEGORIES[categoryAId];
  const catB = KPI_CATEGORIES[categoryBId];

  // Presets
  const handleApplyPreset = (a: KPICategoryId, b: KPICategoryId) => {
    setCategoryAId(a);
    setCategoryBId(b);
  };

  const filteredMetricsA = useMemo(() => {
    if (!searchQuery) return catA.metrics;
    return catA.metrics.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.strategicObjective.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [catA, searchQuery]);

  const filteredMetricsB = useMemo(() => {
    if (!searchQuery) return catB.metrics;
    return catB.metrics.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.strategicObjective.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [catB, searchQuery]);

  const maxRowCount = Math.max(filteredMetricsA.length, filteredMetricsB.length);

  // Export Comparative Matrix to CSV
  const handleExportCSV = () => {
    const headers = [
      `Category A (${catA.shortTitle}) - Metric`,
      `Category A - Value`,
      `Category A - Benchmark`,
      `Category A - Formula`,
      `Category A - SSoT`,
      `Category B (${catB.shortTitle}) - Metric`,
      `Category B - Value`,
      `Category B - Benchmark`,
      `Category B - Formula`,
      `Category B - SSoT`
    ];

    const rows: string[][] = [];
    for (let i = 0; i < maxRowCount; i++) {
      const mA = filteredMetricsA[i];
      const mB = filteredMetricsB[i];
      rows.push([
        mA ? `"${mA.name}"` : '""',
        mA ? `"${mA.computeValue(data)}"` : '""',
        mA ? `"${mA.benchmark}"` : '""',
        mA ? `"${mA.formula}"` : '""',
        mA ? `"${mA.ssotSource}"` : '""',
        mB ? `"${mB.name}"` : '""',
        mB ? `"${mB.computeValue(data)}"` : '""',
        mB ? `"${mB.benchmark}"` : '""',
        mB ? `"${mB.formula}"` : '""',
        mB ? `"${mB.ssotSource}"` : '""'
      ]);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kpi_comparison_${categoryAId}_vs_${categoryBId}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: "optimal" | "warning" | "neutral" | "null") => {
    if (status === "null") {
      return <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-mono text-[10px] font-bold">Null</span>;
    }
    if (status === "optimal") {
      return <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> On Track</span>;
    }
    return <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Attention</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-indigo-600" />
              <h2 className="font-hand text-xl font-bold text-ink">
                Dual-Pillar KPI Category Comparison Matrix
              </h2>
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded font-mono text-[10px] font-bold">
                Side-by-Side SSoT Analysis
              </span>
            </div>
            <p className="font-sans text-xs text-zinc-500 mt-1">
              Cross-pillar trade-off analysis, efficiency vs expenditure correlation, and metric benchmark reconciliation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-800 border-2 border-ink rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-zinc-600" />
              <span>Export Comparison CSV</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
          <span className="font-mono text-[11px] font-bold text-zinc-400 uppercase mr-1">
            Standard Presets:
          </span>
          <button
            onClick={() => handleApplyPreset("sales_efficiency", "campaign_perf")}
            className={`px-2.5 py-1 rounded-lg border-2 border-ink text-xs font-hand font-bold cursor-pointer transition-all ${
              categoryAId === "sales_efficiency" && categoryBId === "campaign_perf"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            ⚡ Sales Efficiency vs 📈 Campaign Performance
          </button>
          <button
            onClick={() => handleApplyPreset("funnel_conversion", "lead_flow")}
            className={`px-2.5 py-1 rounded-lg border-2 border-ink text-xs font-hand font-bold cursor-pointer transition-all ${
              categoryAId === "funnel_conversion" && categoryBId === "lead_flow"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            🌪️ Funnel Conversion vs 🚀 Lead Gen Flow
          </button>
          <button
            onClick={() => handleApplyPreset("sales_efficiency", "funnel_conversion")}
            className={`px-2.5 py-1 rounded-lg border-2 border-ink text-xs font-hand font-bold cursor-pointer transition-all ${
              categoryAId === "sales_efficiency" && categoryBId === "funnel_conversion"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            ⚡ Sales Efficiency vs 🌪️ Funnel Conversion
          </button>
          <button
            onClick={() => handleApplyPreset("campaign_perf", "customer_retention")}
            className={`px-2.5 py-1 rounded-lg border-2 border-ink text-xs font-hand font-bold cursor-pointer transition-all ${
              categoryAId === "campaign_perf" && categoryBId === "customer_retention"
                ? "bg-[#1c4039] text-white shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            📈 Campaign CAC vs 🛡️ Customer Retention (NRR)
          </button>
        </div>

        {/* Dual Category Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Category A Selector */}
          <div className="p-3.5 bg-amber-50/60 border-2 border-ink rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs font-bold text-amber-950 uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[11px] font-bold">
                  A
                </span>
                Primary Category Selection
              </label>
              <span className="text-[11px] font-mono text-amber-800 font-bold">
                {catA.metrics.length} Core Metrics
              </span>
            </div>
            <select
              value={categoryAId}
              onChange={(e) => setCategoryAId(e.target.value as KPICategoryId)}
              className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-hand text-sm font-bold text-ink cursor-pointer shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
            >
              {Object.values(KPI_CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category B Selector */}
          <div className="p-3.5 bg-blue-50/60 border-2 border-ink rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-mono text-xs font-bold text-blue-950 uppercase flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold">
                  B
                </span>
                Comparison Category Selection
              </label>
              <span className="text-[11px] font-mono text-blue-800 font-bold">
                {catB.metrics.length} Core Metrics
              </span>
            </div>
            <select
              value={categoryBId}
              onChange={(e) => setCategoryBId(e.target.value as KPICategoryId)}
              className="w-full px-3 py-2 bg-white border-2 border-ink rounded-lg font-hand text-sm font-bold text-ink cursor-pointer shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
            >
              {Object.values(KPI_CATEGORIES).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Category Strategic Brief Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Category A Strategic Summary */}
        <div className={`bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between space-y-4`}>
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${catA.bgColor} border-2 border-ink`}>
                  <catA.icon className={`h-5 w-5 ${catA.color}`} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Category A</span>
                  <h3 className="font-hand text-lg font-black text-ink">{catA.title}</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-300 font-mono text-xs font-bold text-zinc-700">
                {catA.metrics.length} SSoT Metrics
              </span>
            </div>

            <div className="mt-3">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                Strategic North Star
              </span>
              <p className="font-sans text-xs text-zinc-800 leading-relaxed font-medium bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                {catA.northStar}
              </p>
            </div>

            <div className="mt-3 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase block">
                Primary Analytical Questions:
              </span>
              <ul className="space-y-1 text-xs font-sans text-zinc-600">
                {catA.keyQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-zinc-400 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Category B Strategic Summary */}
        <div className={`bg-white border-3 border-ink rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col justify-between space-y-4`}>
          <div>
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${catB.bgColor} border-2 border-ink`}>
                  <catB.icon className={`h-5 w-5 ${catB.color}`} />
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">Category B</span>
                  <h3 className="font-hand text-lg font-black text-ink">{catB.title}</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-300 font-mono text-xs font-bold text-zinc-700">
                {catB.metrics.length} SSoT Metrics
              </span>
            </div>

            <div className="mt-3">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase block mb-1">
                Strategic North Star
              </span>
              <p className="font-sans text-xs text-zinc-800 leading-relaxed font-medium bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                {catB.northStar}
              </p>
            </div>

            <div className="mt-3 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase block">
                Primary Analytical Questions:
              </span>
              <ul className="space-y-1 text-xs font-sans text-zinc-600">
                {catB.keyQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-zinc-400 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparative Table */}
      <div className="bg-white border-3 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] overflow-hidden">
        <div className="p-4 border-b-2 border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-indigo-600" />
            <h3 className="font-hand text-base font-bold text-ink">
              Side-by-Side Metric Specifications & Cohort Calculations
            </h3>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search metrics or formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border-2 border-ink rounded-lg font-sans text-xs placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b-2 border-ink bg-zinc-100">
                <th className="py-3 px-4 font-mono font-bold text-amber-950 uppercase border-r-2 border-zinc-300 w-1/2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <catA.icon className="h-4 w-4 text-amber-700" />
                      Category A: {catA.title}
                    </span>
                    <span className="text-[10px] font-normal text-zinc-500 font-mono">
                      SSoT Live Calculation
                    </span>
                  </div>
                </th>
                <th className="py-3 px-4 font-mono font-bold text-blue-950 uppercase w-1/2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <catB.icon className="h-4 w-4 text-blue-700" />
                      Category B: {catB.title}
                    </span>
                    <span className="text-[10px] font-normal text-zinc-500 font-mono">
                      SSoT Live Calculation
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-200">
              {Array.from({ length: maxRowCount }).map((_, index) => {
                const metricA = filteredMetricsA[index];
                const metricB = filteredMetricsB[index];
                const valA = metricA ? metricA.computeValue(data) : null;
                const valB = metricB ? metricB.computeValue(data) : null;
                const statusA = metricA ? metricA.statusEval(data) : "null";
                const statusB = metricB ? metricB.statusEval(data) : "null";

                return (
                  <tr key={index} className="hover:bg-zinc-50/80 transition-colors">
                    {/* Category A Column */}
                    <td className="py-4 px-4 border-r-2 border-zinc-300 align-top">
                      {metricA ? (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-hand font-bold text-sm text-ink">{metricA.name}</span>
                                <span className="px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-800 font-mono text-[9px] font-bold">
                                  {metricA.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-600 mt-0.5">{metricA.strategicObjective}</p>
                            </div>
                            {getStatusBadge(statusA)}
                          </div>

                          <div className="grid grid-cols-2 gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200 text-xs">
                            <div>
                              <span className="font-mono text-[9px] text-zinc-500 uppercase block font-bold">
                                Calculated Cohort Value:
                              </span>
                              <span className="font-hand text-lg font-black text-amber-950">
                                {valA !== "Null" ? valA : <span className="text-rose-600 font-mono">Null</span>}
                              </span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-zinc-500 uppercase block font-bold">
                                Industry Benchmark:
                              </span>
                              <span className="font-mono text-xs font-bold text-zinc-700">
                                {metricA.benchmark}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1 text-[11px] text-zinc-600 font-mono bg-white p-2 rounded-lg border border-zinc-200">
                            <div>
                              <span className="font-bold text-zinc-800">Formula: </span>
                              <span className="text-zinc-600">{metricA.formula}</span>
                            </div>
                            <div>
                              <span className="font-bold text-zinc-800">SSoT Source: </span>
                              <span className="text-indigo-700 font-bold">{metricA.ssotSource}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-zinc-400 italic text-center py-6">
                          No further metrics in Category A
                        </div>
                      )}
                    </td>

                    {/* Category B Column */}
                    <td className="py-4 px-4 align-top">
                      {metricB ? (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-hand font-bold text-sm text-ink">{metricB.name}</span>
                                <span className="px-1.5 py-0.2 rounded bg-zinc-200 text-zinc-800 font-mono text-[9px] font-bold">
                                  {metricB.type}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-600 mt-0.5">{metricB.strategicObjective}</p>
                            </div>
                            {getStatusBadge(statusB)}
                          </div>

                          <div className="grid grid-cols-2 gap-2 bg-blue-50/50 p-2.5 rounded-xl border border-blue-200 text-xs">
                            <div>
                              <span className="font-mono text-[9px] text-zinc-500 uppercase block font-bold">
                                Calculated Cohort Value:
                              </span>
                              <span className="font-hand text-lg font-black text-blue-950">
                                {valB !== "Null" ? valB : <span className="text-rose-600 font-mono">Null</span>}
                              </span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-zinc-500 uppercase block font-bold">
                                Industry Benchmark:
                              </span>
                              <span className="font-mono text-xs font-bold text-zinc-700">
                                {metricB.benchmark}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1 text-[11px] text-zinc-600 font-mono bg-white p-2 rounded-lg border border-zinc-200">
                            <div>
                              <span className="font-bold text-zinc-800">Formula: </span>
                              <span className="text-zinc-600">{metricB.formula}</span>
                            </div>
                            <div>
                              <span className="font-bold text-zinc-800">SSoT Source: </span>
                              <span className="text-indigo-700 font-bold">{metricB.ssotSource}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-zinc-400 italic text-center py-6">
                          No further metrics in Category B
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* FRD Compliance & Cross-Pillar Synergy Insight Footer */}
        <div className="p-4 bg-zinc-50 border-t-2 border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-600">
            <Info className="h-4 w-4 text-indigo-600" />
            <span>
              <strong>Cross-Pillar Synergy:</strong> High sales win rate & velocity in {catA.shortTitle} directly accelerates payback period and boosts ROI in {catB.shortTitle}.
            </span>
          </div>
          <div className="font-mono text-[11px] text-zinc-500 flex items-center gap-2">
            <span>FRD Rule: Null for zero-sample cohorts</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
