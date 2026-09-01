import React, { useState } from "react";
import {
  Layers,
  Database,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Eye,
  Workflow,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Zap,
  Target,
  BarChart3,
  Users,
  Compass,
  Cpu,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet
} from "lucide-react";

export interface FunnelLayerSpec {
  id: number;
  stageName: string;
  stageSubtitle: string;
  badge: string;
  colorClass: string;
  borderClass: string;
  iconBg: string;
  platforms: string[];
  coreWorkflows: string[];
  equalsDataModels: {
    tableName: string;
    description: string;
    primaryKey: string;
    refreshRate: string;
    keyFields: string[];
    equalsFormulaOrSQL: string;
  }[];
  kpiMasterMappings: {
    kpiCode: string;
    kpiName: string;
    formula: string;
    targetBenchmark: string;
  }[];
  leadershipDecisions: {
    theSignal: string;
    theReasoning: string;
    recommendation: string;
    cadence: string;
  };
  backendStory: {
    role: string;
    userStory: string;
    acceptanceCriteria: string[];
    syncTrigger: string;
  };
}

export const MODERN_REVOPS_FUNNEL_DATA: FunnelLayerSpec[] = [
  {
    id: 1,
    stageName: "Top-of-Funnel: Market Attention & Intent Ingestion",
    stageSubtitle: "Capture Omni-Channel Inbound/Outbound Leads & Digital Campaign Signals",
    badge: "Layer 1 · Ingestion",
    colorClass: "bg-blue-50 text-blue-800 border-blue-200",
    borderClass: "border-blue-500",
    iconBg: "bg-blue-600 text-white",
    platforms: ["HubSpot Marketing Hub", "Commonroom", "LinkedIn Ads", "Google Ads", "G2 / TrustRadius"],
    coreWorkflows: [
      "Real-time Digital Intent Signals (Commonroom Github/Community/Site Tracker)",
      "External Media Digital Campaign Tracking (Google/LinkedIn Ads UTM Ingress)",
      "Web Form Submissions & CSV List Ingestion",
      "Closed-Loop Initial Attribution Token Tagging",
    ],
    equalsDataModels: [
      {
        tableName: "dim_accounts_intent_daily",
        description: "Aggregated intent surge scores across domain visitors, 3rd-party topic consumption, and product doc readers.",
        primaryKey: "account_domain + surge_date",
        refreshRate: "Hourly / Real-time Webhook",
        keyFields: ["account_domain", "intent_score (0-100)", "surge_topics", "source_platform", "first_seen_at"],
        equalsFormulaOrSQL: `SELECT \n  domain,\n  MAX(intent_score) AS peak_intent,\n  COUNT(DISTINCT visitor_id) AS unique_visitors,\n  ARRAY_AGG(DISTINCT topic_name) AS surge_topics\nFROM commonroom_signals\nWHERE signal_date >= CURRENT_DATE - 7\nGROUP BY 1 HAVING MAX(intent_score) > 70;`,
      },
      {
        tableName: "fct_campaign_traffic_daily",
        description: "Ad platform daily spend, impression, click, and inbound lead registration ledger across channels.",
        primaryKey: "campaign_id + log_date",
        refreshRate: "Daily at 04:00 UTC",
        keyFields: ["campaign_id", "channel_name", "ad_spend_usd", "impressions", "clicks", "cpl_usd"],
        equalsFormulaOrSQL: `=SUMIFS(fct_campaign_traffic[ad_spend_usd], fct_campaign_traffic[channel], "LinkedIn Ads") / COUNTIFS(fct_lead_ingress[channel], "LinkedIn Ads")`,
      },
      {
        tableName: "fct_lead_ingress_raw",
        description: "Raw lead event stream captured prior to hygiene normalization, recording raw UTM parameters and device payloads.",
        primaryKey: "ingress_event_id",
        refreshRate: "Real-time CDC",
        keyFields: ["ingress_event_id", "raw_email", "raw_company", "utm_source", "utm_campaign", "landing_page_url"],
        equalsFormulaOrSQL: `SELECT COUNT(ingress_event_id) AS total_raw_leads, utm_source, utm_medium \nFROM fct_lead_ingress_raw \nWHERE DATE(created_at) = CURRENT_DATE GROUP BY 2, 3;`,
      },
    ],
    kpiMasterMappings: [
      {
        kpiCode: "KPI-159",
        kpiName: "Channel Attribution Lead Volume & Share %",
        formula: "COUNT(Leads_by_Channel) / TOTAL(Leads) * 100",
        targetBenchmark: "Outbound AI: 35%, Inbound Organic: 28%, Referral: 20%, Paid: 17%",
      },
      {
        kpiCode: "KPI-160",
        kpiName: "Speed-to-Lead Inbound Response Latency",
        formula: "AVG(First_Touch_Timestamp - Ingress_Timestamp) in Minutes",
        targetBenchmark: "< 5.0 Minutes (100% SLA for Inbound High-Intent)",
      },
      {
        kpiCode: "KPI-162",
        kpiName: "Campaign Cost Per Ingress Lead (CPL)",
        formula: "Total_Campaign_Ad_Spend / Total_Ingress_Leads",
        targetBenchmark: "< $85.00 for Mid-Market, < $350.00 for Enterprise",
      },
    ],
    leadershipDecisions: {
      theSignal: "High ad spend on LinkedIn/Google producing high raw clicks, but Commonroom high-intent ICP accounts are surging without submitting web forms or receiving outreach.",
      theReasoning: "Pipeline slippage happens at the top of the funnel when marketing pays for top-tier traffic but lacks automated intent ingestion to convert anonymous surging accounts into active pipeline.",
      recommendation: "Reallocate 25% of top-of-funnel paid search budget into Commonroom-triggered automated outbound plays for accounts surging with intent scores > 75.",
      cadence: "Weekly Executive Sync",
    },
    backendStory: {
      role: "Senior RevOps Automation Engineer",
      userStory: "As a RevOps Engineer, I want Commonroom webhook intent surges (>75 score) to automatically POST into HubSpot with normalized domain hashing so that SDRs receive an auto-prioritized Slack notification within 60 seconds of account surge.",
      acceptanceCriteria: [
        "Commonroom webhook fires on topic surge > 75 with 99.9% uptime",
        "HubSpot ingests domain and checks if account is already owned by an AE",
        "If unassigned, route immediately via HubSpot automated round-robin within 60 seconds",
        "Set Ingress_Channel__c = 'Intent: Commonroom' and log initial attribution token",
      ],
      syncTrigger: "Real-time Webhook from Commonroom / LinkedIn Lead Gen Forms via HubSpot API",
    },
  },
  {
    id: 2,
    stageName: "Funnel Stage 2: Data Hygiene & Orchestration / Enrichment",
    stageSubtitle: "Deduplicate Before Paid Enrichment & AI Lead Fit Scoring",
    badge: "Layer 2 · Dedupe & Enrich",
    colorClass: "bg-amber-50 text-amber-900 border-amber-300",
    borderClass: "border-amber-500",
    iconBg: "bg-amber-600 text-white",
    platforms: ["HubSpot (Data Management Core)", "Clay (Waterfall Enrichment 150+ Providers)", "ZoomInfo", "Clearbit", "Dropcontact"],
    coreWorkflows: [
      "CRITICAL: Deduplicate Before Enrichment (Enforce email & domain matching before API calls)",
      "HubSpot Deduplication & Data Normalization Engine",
      "API Cost Guardrails & Waterfall Rate-Limiting Sync Logic",
      "AI-Powered ICP Fit & Behavioral Lead Scoring",
    ],
    equalsDataModels: [
      {
        tableName: "fct_lead_dedupe_audit",
        description: "Logs every incoming record match against existing HubSpot Contacts and Accounts before triggering paid enrichments.",
        primaryKey: "dedupe_log_id",
        refreshRate: "Real-time on Lead Creation",
        keyFields: ["raw_record_id", "matched_contact_id", "matched_account_id", "dedupe_action", "credits_saved_usd"],
        equalsFormulaOrSQL: `SELECT \n  dedupe_action, \n  COUNT(*) AS records_processed,\n  SUM(estimated_enrichment_cost_saved) AS total_savings_usd\nFROM fct_lead_dedupe_audit\nWHERE processed_at >= CURRENT_DATE - 30\nGROUP BY 1;`,
      },
      {
        tableName: "fct_waterfall_enrichment_ledger",
        description: "Tracks individual Clay waterfall steps, provider hit rates (Clay -> ZoomInfo -> Apollo -> Dropcontact), and unit credit consumption.",
        primaryKey: "enrichment_request_id",
        refreshRate: "Daily at 05:00 UTC",
        keyFields: ["lead_id", "provider_hit", "waterfall_tier_reached", "credit_cost", "verified_email_flag", "mobile_phone_flag"],
        equalsFormulaOrSQL: `=COUNTIFS(fct_waterfall[verified_email_flag], TRUE) / COUNT(fct_waterfall[lead_id]) * 100`,
      },
      {
        tableName: "dim_lead_fit_scoring",
        description: "Calculates firmographic, technographic, and buying intent scores to categorize leads into Tier A, B, or C.",
        primaryKey: "lead_id",
        refreshRate: "Hourly",
        keyFields: ["lead_id", "icp_fit_tier", "employee_count_score", "revenue_tier_score", "tech_stack_score", "total_score_100"],
        equalsFormulaOrSQL: `=IF(OR([@trade]="Commercial HVAC", [@trade]="Commercial Roofing"), 40, 20) + IF([@employee_count]>100, 30, 15) + IF([@tech_stack_matched]=TRUE, 30, 0)`,
      },
    ],
    kpiMasterMappings: [
      {
        kpiCode: "KPI-164",
        kpiName: "Duplicate Ingress Prevention & Wasted API Credit Savings",
        formula: "COUNT(Duplicates_Blocked) * $0.45 (Avg API Credit Cost)",
        targetBenchmark: "> 95% Deduplication Pre-Filter, $12,500+ Annual API Credit Savings",
      },
      {
        kpiCode: "KPI-042",
        kpiName: "Enrichment Fill Rate & Data Completeness Score",
        formula: "COUNT(Records with Verified Phone + Email + Trade Vertical) / TOTAL(Records)",
        targetBenchmark: "> 92.5% Complete ICP Profiles for Tier A/B",
      },
      {
        kpiCode: "KPI-161",
        kpiName: "Stage 1-to-2 Funnel Validation Rate",
        formula: "COUNT(Deduplicated_Enriched_Leads) / COUNT(Raw_Ingress_Leads)",
        targetBenchmark: "68% - 75% Qualified Clean Lead Ingress",
      },
    ],
    leadershipDecisions: {
      theSignal: "Rapid spike in monthly Clay/ZoomInfo API bills while CRM users complain about duplicate records and overwritten custom notes.",
      theReasoning: "Calling paid enrichment APIs before running HubSpot deduplication burns thousands of dollars on contacts already existing in the database and clobbers verified rep data with stale scraped data.",
      recommendation: "Lock API gateway rules to require positive CRM non-existence check before calling secondary paid waterfall providers in Clay.",
      cadence: "Weekly Executive Sync",
    },
    backendStory: {
      role: "Lead Data Architect & HubSpot Specialist",
      userStory: "As a Data Architect, I want Clay's webhook orchestrator to verify if an incoming lead's email or domain exists in HubSpot CRM before executing any waterfall enrichment credits, so that we never pay twice for known accounts.",
      acceptanceCriteria: [
        "Clay recipe checks HubSpot Search API (/crm/v3/objects/contacts/search) first",
        "If matched, update existing Contact record without consuming external data credits",
        "If net new, execute Tier 1 (Clay Internal) -> Tier 2 (ZoomInfo) -> Tier 3 (Dropcontact) waterfall only until verified email/phone is returned",
        "Log API credit cost per transaction to Snowflake `fct_waterfall_enrichment_ledger`",
      ],
      syncTrigger: "HubSpot Data Management Webhook & Clay Automation Recipes",
    },
  },
  {
    id: 3,
    stageName: "Funnel Stage 3: The Single Source of Truth (SSOT Core)",
    stageSubtitle: "Unified Account Hierarchy, Territory Routing & Revenue Operations Hub",
    badge: "Layer 3 · SSoT Core",
    colorClass: "bg-purple-50 text-purple-900 border-purple-300",
    borderClass: "border-purple-600",
    iconBg: "bg-purple-600 text-white",
    platforms: ["HubSpot CRM (SSOT Core)", "HubSpot Revenue Operations Hub", "Snowflake / BigQuery Warehouse", "Census / Hightouch (Reverse ETL)"],
    coreWorkflows: [
      "Account, Contact, and Deal Master Golden Record Management",
      "AI Reasoning & Account Hierarchy (Parent-Child Rollup)",
      "Automated Territory Management & Weighted Capacity Routing",
      "Custom Revenue Reporting & Warehouse Data Lake Bi-Directional Sync",
    ],
    equalsDataModels: [
      {
        tableName: "dim_accounts_ssot",
        description: "Master unified account table enriched with ultimate parent rollups, trade vertical taxonomy, and account tiering.",
        primaryKey: "account_id",
        refreshRate: "Hourly Bi-directional Sync",
        keyFields: ["account_id", "master_golden_id", "ultimate_parent_id", "trade_vertical", "annual_revenue", "territory_code", "assigned_ae_id"],
        equalsFormulaOrSQL: `SELECT \n  trade_vertical, \n  COUNT(DISTINCT account_id) AS total_accounts,\n  SUM(arr_potential_usd) AS pipeline_potential,\n  AVG(lead_to_opp_days) AS avg_sales_cycle\nFROM dim_accounts_ssot GROUP BY 1;`,
      },
      {
        tableName: "fct_territory_routing_sla",
        description: "Tracks automated routing decisions, rep capacity allocation, and handoff times from MQL to SDR/AE assignment.",
        primaryKey: "routing_event_id",
        refreshRate: "Real-time",
        keyFields: ["lead_id", "matched_territory_rule", "assigned_rep_id", "routing_duration_seconds", "sla_breached_flag"],
        equalsFormulaOrSQL: `=COUNTIFS(fct_territory_routing[sla_breached_flag], FALSE) / COUNT(fct_territory_routing[routing_event_id]) * 100`,
      },
      {
        tableName: "dim_buying_committee_ssot",
        description: "Maps multi-threaded buyer personas (Champion, Economic Buyer, Technical Evaluator, Blocker) inside target accounts.",
        primaryKey: "account_id + contact_id",
        refreshRate: "Daily",
        keyFields: ["account_id", "contact_id", "stakeholder_role", "seniority_tier", "engagement_score"],
        equalsFormulaOrSQL: `SELECT account_id, COUNT(DISTINCT contact_id) AS committee_size \nFROM dim_buying_committee_ssot \nWHERE stakeholder_role IN ('Champion', 'Economic Buyer') \nGROUP BY 1 HAVING COUNT(DISTINCT contact_id) >= 2;`,
      },
    ],
    kpiMasterMappings: [
      {
        kpiCode: "KPI-158",
        kpiName: "Trade & Vertical Breakdown (ARR & Win Rate by Trade)",
        formula: "SUM(Booked_ARR_by_Trade) / TOTAL(Booked_ARR) * 100",
        targetBenchmark: "HVAC & Mech: $1.85M (29%), Electrical: $1.42M (22%), Roofing: $1.05M (16%)",
      },
      {
        kpiCode: "KPI-023",
        kpiName: "SSoT Account Hierarchy Coverage %",
        formula: "COUNT(Accounts with Resolved Parent ID) / TOTAL(Enterprise Accounts)",
        targetBenchmark: "> 98.0% Golden Record Completeness",
      },
      {
        kpiCode: "KPI-095",
        kpiName: "Territory Capacity Equity & Rep Pipeline Load Balance",
        formula: "STDEV(Pipeline_ARR_per_Rep) / MEAN(Pipeline_ARR_per_Rep)",
        targetBenchmark: "< 15% Variance Across Equal-Quota Reps",
      },
    ],
    leadershipDecisions: {
      theSignal: "Reps complaining about unequal territory distribution while enterprise deals are stalled because subsidiaries are assigned to different reps in different regions.",
      theReasoning: "Without an automated account hierarchy and centralized SSoT in HubSpot RevOps Hub, enterprise accounts suffer from cannibalization and disjointed multi-threading.",
      recommendation: "Deploy automated Ultimate Parent ID assignment and restrict account routing to global buying parent territories.",
      cadence: "Monthly Board & Executive Review",
    },
    backendStory: {
      role: "Principal RevOps Architect",
      userStory: "As a RevOps Architect, I want HubSpot Revenue Operations Hub to evaluate parent company hierarchies and assign newly ingress contacts to the existing Enterprise Account Owner, so that all communication is unified under one account strategy.",
      acceptanceCriteria: [
        "Domain match checks if account is a subsidiary of an Ultimate Parent Account",
        "If parent exists, associate contact and assign to Parent Account Owner in HubSpot CRM",
        "Sync updated golden records to Snowflake data warehouse via Census reverse ETL every 60 minutes",
        "Notify Account Owner in Slack with full buying committee lineage",
      ],
      syncTrigger: "HubSpot Workflow Rules + Census Reverse ETL to Snowflake",
    },
  },
  {
    id: 4,
    stageName: "Funnel Stage 4: The Single Source of Funnel: Sales Execution & Nurture",
    stageSubtitle: "HubSpot Sales Hub Playbooks, AI Parallel Dialing & Automated Sequences",
    badge: "Layer 4 · Sales Hub & Nurture",
    colorClass: "bg-emerald-50 text-emerald-900 border-emerald-300",
    borderClass: "border-emerald-500",
    iconBg: "bg-emerald-600 text-white",
    platforms: ["HubSpot Sales Hub", "HubSpot Playbooks", "AI Parallel Dialing (Orum / Nooks)", "HubSpot Automated Sequences", "Lemlist / Smartlead"],
    coreWorkflows: [
      "HubSpot Playbooks & Guided Qualification Call Scripts",
      "AI Parallel Dialing Integration with Auto-Call Logging in HubSpot",
      "Automated Multi-Touch Email & LinkedIn Sequences by Trade Vertical",
      "Prospect Q&A AI Copilot & Nurture Re-engagement cadences",
    ],
    equalsDataModels: [
      {
        tableName: "fct_sales_activity_daily",
        description: "Granular activity log recording AI parallel dials, connected conversations, emails sent, and sequence replies.",
        primaryKey: "activity_id",
        refreshRate: "Hourly",
        keyFields: ["activity_id", "rep_id", "account_id", "activity_type", "connect_status", "duration_seconds", "objection_tagged"],
        equalsFormulaOrSQL: `SELECT \n  rep_id, \n  COUNT(CASE WHEN activity_type='Call' AND connect_status='Connected' THEN 1 END) AS connects,\n  COUNT(CASE WHEN activity_type='Meeting Booked' THEN 1 END) AS meetings_booked\nFROM fct_sales_activity_daily \nWHERE activity_date >= CURRENT_DATE - 30 GROUP BY 1;`,
      },
      {
        tableName: "fct_sequence_engagement_cohort",
        description: "Step-by-step conversion performance across industry-tailored sequence playbooks (HVAC vs Electrical vs Enterprise SaaS).",
        primaryKey: "sequence_id + step_number",
        refreshRate: "Daily at 06:00 UTC",
        keyFields: ["sequence_id", "step_number", "channel", "open_rate_pct", "reply_rate_pct", "meeting_rate_pct", "unsub_rate_pct"],
        equalsFormulaOrSQL: `=COUNTIFS(fct_sequence[meeting_booked_flag], TRUE, fct_sequence[trade], "Commercial HVAC") / COUNTIFS(fct_sequence[trade], "Commercial HVAC") * 100`,
      },
      {
        tableName: "fct_pipeline_stage_velocity",
        description: "Stage-to-stage conversion rates, dwell time (days in stage), and stall rates across Discovery, Demo, Validation, and Closing stages.",
        primaryKey: "deal_id + stage_name",
        refreshRate: "Real-time on Stage Change",
        keyFields: ["deal_id", "stage_name", "entered_at", "exited_at", "dwell_days", "next_stage_name", "is_stalled_flag"],
        equalsFormulaOrSQL: `=AVERAGEIFS(fct_pipeline_stage_velocity[dwell_days], fct_pipeline_stage_velocity[stage_name], "Demo / Evaluation")`,
      },
    ],
    kpiMasterMappings: [
      {
        kpiCode: "KPI-161",
        kpiName: "5-Stage Funnel Conversion Waterfall (MQL ➔ SQL ➔ Opp ➔ Won)",
        formula: "MQL➔SQL (43.8%), SQL➔Opp (61.9%), Opp➔Won (40.4%)",
        targetBenchmark: "Overall Lead Ingress to Won Conversion: 11.0%",
      },
      {
        kpiCode: "KPI-165",
        kpiName: "Rep Attainment & Sequence Meeting Booking Rate",
        formula: "Total_Meetings_Booked / Total_Enrolled_Prospects * 100",
        targetBenchmark: "> 8.5% Meeting Rate on Tier A ICP Playbooks",
      },
      {
        kpiCode: "KPI-056",
        kpiName: "AI Parallel Dialing Connect-to-Meeting Conversion",
        formula: "Meetings_Booked_via_Phone / Total_Live_Connects * 100",
        targetBenchmark: "> 18.0% Live Connect Conversion to Validated Demo",
      },
    ],
    leadershipDecisions: {
      theSignal: "MQL volume is high and rep call volume is maxed out, but Demo-to-Opportunity conversion has dropped from 62% to 34% over the last 6 weeks.",
      theReasoning: "Reps are using generic, unstructured discovery questions instead of following trade-specific HubSpot playbooks, resulting in low-qualification pipeline that clogs AE calendars.",
      recommendation: "Mandate HubSpot Playbook qualification criteria (BANT / MEDDPICC) before moving deals to Stage 3 Validation; auto-route unqualified leads to marketing nurture.",
      cadence: "Weekly Sales Leadership Pipeline Review",
    },
    backendStory: {
      role: "Sales Operations Specialist",
      userStory: "As a Sales Operations Specialist, I want HubSpot Sales Hub to require completion of mandatory Playbook qualification fields (Economic Buyer identified, Budget verified, Metric defined) before a deal can progress past the Demo stage.",
      acceptanceCriteria: [
        "HubSpot Deal Stage validation prevents moving to 'Stage 3 - Technical Validation' if Playbook fields are null",
        "AI Parallel Dialing connects sync call transcripts and AI objection summaries into HubSpot Timeline within 3 minutes",
        "If a meeting is booked, un-enroll the contact from active outbound sequences across all channels automatically",
      ],
      syncTrigger: "HubSpot Sales Hub Webhooks & Dialing Partner APIs (Orum/Nooks)",
    },
  },
  {
    id: 5,
    stageName: "Funnel Apex (Stage 5): Closed-Loop Deals & Revenue Realization",
    stageSubtitle: "Attribution ROI Feedback Loop to Stage 1 & Unit Economics Realization",
    badge: "Layer 5 · Closed-Loop Apex",
    colorClass: "bg-teal-50 text-teal-900 border-teal-300",
    borderClass: "border-teal-600",
    iconBg: "bg-teal-700 text-white",
    platforms: ["HubSpot CRM (Closed-Loop)", "Stripe / NetSuite ERP", "Equals Spreadsheet Engine", "Snowflake / BigQuery Warehouse"],
    coreWorkflows: [
      "Closed-Loop Multi-Touch Marketing & Sales Attribution Modeling (W-Shaped / First-Last Touch)",
      "Real-time GTM Performance, Booked ARR, ACV & Margin Realization",
      "Attribution Data Flow feedback loop back to Stage 1 Campaign Spend",
      "Cohort CAC Payback & Net Revenue Retention (NRR) Waterfall",
    ],
    equalsDataModels: [
      {
        tableName: "fct_closed_won_deals_ledger",
        description: "Official financial ledger of booked ARR, contract terms, gross margin, implementation fees, and commission attribution.",
        primaryKey: "deal_id",
        refreshRate: "Real-time on Deal Closed-Won",
        keyFields: ["deal_id", "account_id", "booked_arr_usd", "gross_margin_pct", "sales_cycle_days", "assigned_ae_id", "trade_vertical"],
        equalsFormulaOrSQL: `=SUMIFS(fct_closed_won[booked_arr_usd], fct_closed_won[close_date], ">=2026-01-01", fct_closed_won[close_date], "<=2026-12-31")`,
      },
      {
        tableName: "fct_multi_touch_attribution_weights",
        description: "Calculates fractional revenue credit across all touches (First Touch 30%, Lead Creation 20%, Opp Creation 30%, Last Touch 20%).",
        primaryKey: "deal_id + touchpoint_id",
        refreshRate: "Daily at 07:00 UTC",
        keyFields: ["deal_id", "touchpoint_id", "campaign_id", "channel_name", "attributed_arr_usd", "w_shaped_weight"],
        equalsFormulaOrSQL: `SELECT \n  channel_name, \n  SUM(attributed_arr_usd) AS total_attributed_arr,\n  SUM(campaign_spend_usd) AS total_spend,\n  SUM(attributed_arr_usd) / NULLIF(SUM(campaign_spend_usd), 0) AS roas_ratio\nFROM fct_multi_touch_attribution GROUP BY 1;`,
      },
      {
        tableName: "fct_unit_economics_cohort_monthly",
        description: "Monthly customer cohort tracking CAC payback months, expansion ARR, churn rate, and LTV-to-CAC ratios over 36 months.",
        primaryKey: "cohort_month",
        refreshRate: "Monthly on 1st of Month",
        keyFields: ["cohort_month", "cohort_starting_arr", "cac_spend_usd", "cac_payback_months", "nrr_pct_12mo", "ltv_cac_ratio"],
        equalsFormulaOrSQL: `=[@total_sm_spend] / ([@new_arr_added] * [@gross_margin_pct]) * 12`,
      },
    ],
    kpiMasterMappings: [
      {
        kpiCode: "KPI-163",
        kpiName: "Campaign CAC Payback Period & Net Programmatic ROI %",
        formula: "(Total S&M Spend / New ARR Added × Gross Margin %) × 12",
        targetBenchmark: "Blended Payback: 8.4 Months (< 12 Mo Target), Net ROI: +318%",
      },
      {
        kpiCode: "KPI-012",
        kpiName: "Net Revenue Retention (NRR) Waterfall",
        formula: "(Starting ARR + Expansion ARR - Contraction - Churn) / Starting ARR * 100",
        targetBenchmark: "> 124.5% Enterprise NRR across Commercial Trades",
      },
      {
        kpiCode: "KPI-034",
        kpiName: "Sales Velocity ($/Day Engine)",
        formula: "(Qualified Pipeline $ × Win Rate % × Avg Deal Size $) / Sales Cycle Days",
        targetBenchmark: "$18,450 / Day Velocity (Commercial HVAC: $31,200/day)",
      },
    ],
    leadershipDecisions: {
      theSignal: "Paid Search has the highest initial deal count, but Cohort Analysis reveals 18.2-month CAC payback and high 1st-year churn, whereas Partner Referrals & Outbound AI have 6.1-month payback and 132% NRR.",
      theReasoning: "Top-line lead metrics masked low long-term unit economics. Without closed-loop attribution back to Stage 1, marketing continues burning cash on fast-churning buyer segments.",
      recommendation: "Cut Paid Search ad budget by 40% and double budget allocations into Outbound AI and Partner Referral co-marketing programs.",
      cadence: "Quarterly Board & Executive QBR",
    },
    backendStory: {
      role: "Lead Analytics Engineer & Equals Modeler",
      userStory: "As an Analytics Engineer, I want HubSpot Closed-Won Deals to trigger an automated attribution reconciliation in Equals and Snowflake, syncing attributed revenue back into Google Ads and LinkedIn Conversion APIs so ad algorithms optimize for high-LTV trades.",
      acceptanceCriteria: [
        "When Deal moves to Closed Won, emit webhook to Snowflake and Equals data model",
        "Calculate W-Shaped multi-touch attribution credit across all campaign touches",
        "Send server-side Conversion API events to Google Ads and LinkedIn with actual contract ARR",
        "Auto-update Equals Executive Revenue Dashboard with real-time CAC Payback and LTV:CAC",
      ],
      syncTrigger: "HubSpot Deal Closed-Won Webhook + Equals Automated Daily Refresh",
    },
  },
];

export const ModernRevOpsFunnelEqualsTable: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<number | "all">("all");
  const [expandedLayerId, setExpandedLayerId] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showFormulaModal, setShowFormulaModal] = useState<FunnelLayerSpec | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleExportCSV = () => {
    const headers = [
      "Funnel Layer",
      "Layer Name",
      "Architectural Platforms",
      "Core Ingestion & Workflows",
      "Equals Data Models (Tables)",
      "Key KPI Master Mappings",
      "Leadership Signal",
      "Leadership Reasoning",
      "Strategic Recommendation",
      "Decision Cadence",
      "Backend User Story",
      "Acceptance Criteria",
    ];

    const rows = MODERN_REVOPS_FUNNEL_DATA.map((layer) => [
      `"Layer ${layer.id}"`,
      `"${layer.stageName.replace(/"/g, '""')}"`,
      `"${layer.platforms.join(", ").replace(/"/g, '""')}"`,
      `"${layer.coreWorkflows.join(" | ").replace(/"/g, '""')}"`,
      `"${layer.equalsDataModels.map((m) => `${m.tableName} (${m.primaryKey})`).join(" | ").replace(/"/g, '""')}"`,
      `"${layer.kpiMasterMappings.map((k) => `${k.kpiCode}: ${k.kpiName}`).join(" | ").replace(/"/g, '""')}"`,
      `"${layer.leadershipDecisions.theSignal.replace(/"/g, '""')}"`,
      `"${layer.leadershipDecisions.theReasoning.replace(/"/g, '""')}"`,
      `"${layer.leadershipDecisions.recommendation.replace(/"/g, '""')}"`,
      `"${layer.leadershipDecisions.cadence}"`,
      `"${layer.backendStory.userStory.replace(/"/g, '""')}"`,
      `"${layer.backendStory.acceptanceCriteria.join("; ").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Modernized_RevOps_Funnel_Equals_Tracker_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLayers =
    selectedLayerId === "all"
      ? MODERN_REVOPS_FUNNEL_DATA
      : MODERN_REVOPS_FUNNEL_DATA.filter((l) => l.id === selectedLayerId);

  return (
    <div className="w-full bg-[#f8faf9] border-3 border-ink rounded-2xl p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-6">
      {/* Header Banner with RevOps Funnel Architecture Context */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-3 border-ink pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-ink text-white flex items-center justify-center font-black">
              <Workflow className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="font-hand text-2xl font-black text-ink tracking-tight flex items-center gap-2">
              <span>Modernized RevOps Revenue Funnel Architecture</span>
              <span className="text-xs font-mono font-bold bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                Equals & KPI Master Tracker
              </span>
            </h2>
          </div>
          <p className="font-sans text-xs text-zinc-600 max-w-4xl leading-relaxed">
            Full-stack data tracking matrix mapping the <strong>5 Funnel Architecture Layers</strong> to <strong>Equals Data Models</strong>, <strong>KPI Master Reference formulas</strong>, <strong>Leadership Decision Dashboards (Signal ➔ Reasoning ➔ Recommendation)</strong>, and <strong>Backend RevOps Engineering Stories</strong>.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-2 border-emerald-600 rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(5,150,105,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 transition-all"
            title="Download full 5-layer RevOps tracking table as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <a
            href="#equals-playground"
            onClick={(e) => {
              e.preventDefault();
              setShowFormulaModal(MODERN_REVOPS_FUNNEL_DATA[0]);
            }}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-2 border-indigo-600 rounded-lg font-hand text-xs font-bold shadow-[2px_2px_0px_0px_rgba(79,70,229,1)] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Equals Formula Sandbox</span>
          </a>
        </div>
      </div>

      {/* Layer Quick Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="font-mono text-xs font-bold text-zinc-500 uppercase shrink-0 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-zinc-700" />
          Filter Layer:
        </span>
        <button
          onClick={() => setSelectedLayerId("all")}
          className={`px-3 py-1 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer ${
            selectedLayerId === "all"
              ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
              : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
          }`}
        >
          All 5 Funnel Layers
        </button>

        {MODERN_REVOPS_FUNNEL_DATA.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setSelectedLayerId(layer.id)}
            className={`px-3 py-1 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedLayerId === layer.id
                ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Layer {layer.id}: {layer.badge.split("·")[1]?.trim() || layer.stageName.split(":")[0]}</span>
          </button>
        ))}
      </div>

      {/* Closed-Loop Attribution Flow Notice */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 border-2 border-dashed border-purple-300 rounded-xl p-3 text-xs flex items-center justify-between flex-wrap gap-2 text-zinc-700">
        <div className="flex items-center gap-2 font-sans">
          <RefreshCw className="w-4 h-4 text-purple-600 animate-spin-slow shrink-0" />
          <span>
            <strong>Attribution Data Flow Loop:</strong> Realized revenue from <strong>Layer 5 (Closed-Loop Deals & Net Realization)</strong> continuously feeds weighted W-shaped multi-touch ROI back into <strong>Layer 1 (Market Attention & Intent Ingestion)</strong> to automatically tune Google/LinkedIn Ad spend algorithms and SDR outbound triggers.
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-purple-800 bg-white px-2 py-0.5 rounded border border-purple-200 shadow-2xs">
          Stage 5 ➔ Stage 1 Loop
        </span>
      </div>

      {/* Master Tracking Table */}
      <div className="border-3 border-ink rounded-xl overflow-hidden bg-white shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#202925] text-white border-b-2 border-ink">
              <tr>
                <th className="py-3 px-4 font-mono font-bold text-amber-300 whitespace-nowrap min-w-[240px]">
                  FUNNEL LAYER & TOOLING
                </th>
                <th className="py-3 px-4 font-mono font-bold text-sky-300 whitespace-nowrap min-w-[320px]">
                  EQUALS DATA MODELS & TABLES
                </th>
                <th className="py-3 px-4 font-mono font-bold text-emerald-300 whitespace-nowrap min-w-[280px]">
                  KPI MASTER MAPPINGS & BENCHMARKS
                </th>
                <th className="py-3 px-4 font-mono font-bold text-amber-200 whitespace-nowrap min-w-[360px]">
                  LEADERSHIP DECISIONS: SIGNAL ➔ REASONING ➔ ACTION
                </th>
                <th className="py-3 px-4 font-mono font-bold text-purple-300 whitespace-nowrap min-w-[340px]">
                  BACKEND REVOPS STORIES & CRITERIA
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-200">
              {filteredLayers.map((layer) => {
                const isExpanded = expandedLayerId === layer.id;

                return (
                  <tr key={layer.id} className="hover:bg-zinc-50/80 transition-colors align-top">
                    {/* Column 1: Funnel Layer & Tooling */}
                    <td className="p-4 space-y-2.5 border-r border-zinc-200">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${layer.colorClass}`}>
                          {layer.badge}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-hand text-base font-black text-ink leading-tight">
                          {layer.stageName}
                        </h3>
                        <p className="font-sans text-[11px] text-zinc-500 mt-0.5 leading-snug">
                          {layer.stageSubtitle}
                        </p>
                      </div>

                      {/* Tool Stack Tags */}
                      <div className="space-y-1 pt-1.5 border-t border-zinc-100">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                          Integrated Platforms:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {layer.platforms.map((p, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-zinc-100 text-zinc-800 rounded font-mono text-[10px] font-medium border border-zinc-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Core Ingestion / Architecture Workflows */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                          Core Architecture:
                        </span>
                        <ul className="space-y-1 text-[11px] text-zinc-600 list-disc list-inside">
                          {layer.coreWorkflows.map((w, idx) => (
                            <li key={idx} className="leading-tight">
                              <span className={w.includes("Deduplicate") ? "font-bold text-amber-900 bg-amber-50 px-1 rounded" : ""}>
                                {w}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>

                    {/* Column 2: Equals Data Models & Tables */}
                    <td className="p-4 space-y-3 border-r border-zinc-200">
                      {layer.equalsDataModels.map((model, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 space-y-1.5 hover:border-zinc-300 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs text-indigo-900 flex items-center gap-1">
                              <Database className="w-3 h-3 text-indigo-600" />
                              {model.tableName}
                            </span>
                            <span className="text-[9.5px] font-mono text-zinc-500 bg-white px-1.5 py-0.2 rounded border border-zinc-200">
                              {model.refreshRate}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 leading-snug">
                            {model.description}
                          </p>

                          {/* Key Fields */}
                          <div className="text-[10px] text-zinc-500 font-mono">
                            <span className="font-bold text-zinc-700">PK:</span> {model.primaryKey}
                          </div>

                          {/* Equals SQL / Formula Snippet */}
                          <div className="bg-white border border-zinc-200 rounded p-1.5 font-mono text-[10.5px] text-zinc-800 flex items-start justify-between gap-1 group">
                            <code className="text-indigo-800 break-all line-clamp-2">
                              {model.equalsFormulaOrSQL.split("\n")[0]}...
                            </code>
                            <button
                              onClick={() => handleCopy(model.equalsFormulaOrSQL, `${layer.id}-model-${idx}`)}
                              className="text-zinc-400 hover:text-zinc-700 p-1 rounded hover:bg-zinc-100 cursor-pointer shrink-0"
                              title="Copy Equals formula / SQL query"
                            >
                              {copiedKey === `${layer.id}-model-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </td>

                    {/* Column 3: KPI Master Mappings */}
                    <td className="p-4 space-y-2.5 border-r border-zinc-200">
                      {layer.kpiMasterMappings.map((kpi, idx) => (
                        <div
                          key={idx}
                          className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-2.5 space-y-1 hover:border-emerald-300 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs text-emerald-950">
                              {kpi.kpiCode}: {kpi.kpiName}
                            </span>
                          </div>
                          <div className="font-mono text-[10.5px] text-emerald-900 bg-white/90 px-2 py-0.5 rounded border border-emerald-100">
                            {kpi.formula}
                          </div>
                          <div className="text-[10.5px] text-zinc-600 flex items-center gap-1 font-sans">
                            <strong className="text-zinc-800">Target:</strong>
                            <span className="font-semibold text-emerald-800">{kpi.targetBenchmark}</span>
                          </div>
                        </div>
                      ))}
                    </td>

                    {/* Column 4: Leadership Decisions: Signal ➔ Reasoning ➔ Action */}
                    <td className="p-4 space-y-2.5 border-r border-zinc-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                          Cadence: {layer.leadershipDecisions.cadence}
                        </span>
                      </div>

                      {/* The Signal */}
                      <div className="bg-rose-50/70 border border-rose-200 rounded-lg p-2.5 space-y-0.5">
                        <span className="text-[10px] font-bold font-mono text-rose-800 uppercase flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          The Signal (Dashboard Alert)
                        </span>
                        <p className="text-[11.5px] text-rose-950 leading-snug">
                          {layer.leadershipDecisions.theSignal}
                        </p>
                      </div>

                      {/* The Reasoning */}
                      <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 space-y-0.5">
                        <span className="text-[10px] font-bold font-mono text-zinc-700 uppercase flex items-center gap-1">
                          <Compass className="w-3 h-3 text-indigo-600" />
                          The Economic Reasoning
                        </span>
                        <p className="text-[11.5px] text-zinc-700 leading-snug">
                          {layer.leadershipDecisions.theReasoning}
                        </p>
                      </div>

                      {/* Strategic Recommendation */}
                      <div className="bg-emerald-50/90 border border-emerald-300 rounded-lg p-2.5 space-y-0.5">
                        <span className="text-[10px] font-bold font-mono text-emerald-900 uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Executive Recommendation
                        </span>
                        <p className="text-[11.5px] text-emerald-950 font-medium leading-snug">
                          {layer.leadershipDecisions.recommendation}
                        </p>
                      </div>
                    </td>

                    {/* Column 5: Backend RevOps Stories & Acceptance Criteria */}
                    <td className="p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                          Role: {layer.backendStory.role}
                        </span>
                      </div>

                      {/* Agile User Story */}
                      <div className="bg-purple-50/70 border border-purple-200 rounded-lg p-2.5 space-y-1">
                        <span className="text-[10px] font-bold font-mono text-purple-800 uppercase">
                          Agile User Story
                        </span>
                        <p className="text-[11px] text-purple-950 leading-relaxed font-sans italic">
                          "{layer.backendStory.userStory}"
                        </p>
                      </div>

                      {/* Acceptance Criteria */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                          Acceptance Criteria:
                        </span>
                        <ul className="space-y-1 text-[11px] text-zinc-700 list-disc list-inside">
                          {layer.backendStory.acceptanceCriteria.map((ac, idx) => (
                            <li key={idx} className="leading-tight">
                              {ac}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sync Trigger */}
                      <div className="text-[10.5px] text-zinc-500 bg-zinc-100 p-1.5 rounded border border-zinc-200 font-mono">
                        <span className="font-bold text-zinc-700">Trigger:</span> {layer.backendStory.syncTrigger}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equals Formula Sandbox Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-3 border-ink rounded-2xl max-w-3xl w-full p-6 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-hand text-lg font-bold text-ink">
                    Equals Model Queries & Formulas · Layer {showFormulaModal.id}
                  </h3>
                  <p className="font-sans text-xs text-zinc-500">
                    {showFormulaModal.stageName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFormulaModal(null)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {showFormulaModal.equalsDataModels.map((model, idx) => (
                <div key={idx} className="border border-zinc-200 rounded-xl p-4 space-y-2 bg-zinc-50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-indigo-900">
                      {model.tableName}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Refresh: {model.refreshRate}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600">{model.description}</p>
                  <pre className="font-mono text-xs bg-zinc-900 text-emerald-400 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {model.equalsFormulaOrSQL}
                  </pre>
                  <button
                    onClick={() => handleCopy(model.equalsFormulaOrSQL, `modal-${idx}`)}
                    className="px-3 py-1 bg-white border border-zinc-300 rounded font-hand text-xs font-bold text-zinc-800 hover:bg-zinc-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === `modal-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === `modal-${idx}` ? "Copied!" : "Copy Formula"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
