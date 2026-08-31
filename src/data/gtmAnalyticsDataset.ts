// Comprehensive GTM Telemetry Dataset covering:
// 1. Lead Gen Flow (New Leads by Trade / Source, Inflow, SLA Speed to Lead)
// 2. Funnel Conversion (Lead -> MQL -> SQL -> Opportunity -> Closed Won Waterfall)
// 3. Campaign Performance (CPL, CAC, ROI, ROAS, Payback Horizon)
// 4. Sales Efficiency (Win Rate, Pipeline Velocity, ACV, NRR, GRR, Sales Magic Number)

export type TradeVertical =
  | "Commercial HVAC & Mechanical"
  | "Electrical & Solar Contracting"
  | "Plumbing & Industrial Piping"
  | "General Contracting & Civil"
  | "Commercial Roofing & Envelopes"
  | "Enterprise B2B SaaS"
  | "Healthcare Systems & MedTech"
  | "Logistics & Supply Chain";

export type LeadSourceChannel =
  | "Outbound AI Agent"
  | "Inbound Organic / SEO"
  | "Partner Referral / Channel"
  | "Paid Search & Intent Ads"
  | "Trade Shows & Industry Expos"
  | "Social & Thought Leadership";

export type FunnelStage =
  | "Lead Ingress"
  | "MQL"
  | "SQL"
  | "Opportunity"
  | "Closed Won"
  | "Closed Lost";

export type Region = "North America" | "EMEA" | "APAC" | "LATAM";
export type Segment = "Enterprise" | "Mid-Market" | "SMB";
export type ProductLine =
  | "SignalForge Platform"
  | "Agentic RevOps Swarm"
  | "CPQ Automation"
  | "Lead Intelligence";

export interface GTMTelemetryRecord {
  id: string;
  accountName: string;
  trade: TradeVertical;
  leadSource: LeadSourceChannel;
  region: Region;
  segment: Segment;
  stage: FunnelStage;
  assignedRep: string;
  campaignName: string;
  campaignSpend: number; // Allocated marketing spend in USD
  speedToLeadMinutes: number; // First touch latency in minutes
  mqlDate: string;
  sqlDate: string | null;
  oppDate: string | null;
  closeDate: string | null;
  dealValue: number | null; // Booked ARR in USD
  startingArr: number | null; // For NRR expansion tracking
  expansionArr: number | null; // For NRR expansion tracking
  churnArr: number | null; // For NRR churn tracking
  salesCycleDays: number | null;
  winLossReason: string | null;
  productLine: ProductLine;
  csatScore: number | null; // 1 to 5
}

export interface CampaignSummary {
  campaignName: string;
  channel: LeadSourceChannel;
  totalSpend: number;
  leadsCreated: number;
  cpl: number; // Cost per Lead
  sqlsGenerated: number;
  cpsql: number; // Cost per SQL
  wonLogos: number;
  bookedArr: number;
  cac: number; // Fully loaded CAC per customer
  roi: number; // ((ARR - Spend) / Spend) * 100
  paybackMonths: number;
}

export const GTM_MASTER_DATASET: GTMTelemetryRecord[] = [
  // Commercial HVAC & Mechanical
  {
    id: "GTM-2001",
    accountName: "Apex Mechanical Solutions",
    trade: "Commercial HVAC & Mechanical",
    leadSource: "Outbound AI Agent",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Sarah Lin",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 3200,
    speedToLeadMinutes: 8,
    mqlDate: "2026-01-08",
    sqlDate: "2026-01-10",
    oppDate: "2026-01-15",
    closeDate: "2026-02-12",
    dealValue: 185000,
    startingArr: 140000,
    expansionArr: 45000,
    churnArr: 0,
    salesCycleDays: 35,
    winLossReason: "Sub-minute CPQ estimation & AI dispatch dispatching",
    productLine: "Agentic RevOps Swarm",
    csatScore: 5.0
  },
  {
    id: "GTM-2002",
    accountName: "Trane-Air Commercial Services",
    trade: "Commercial HVAC & Mechanical",
    leadSource: "Partner Referral / Channel",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Alex Rivera",
    campaignName: "Carrier & Distributor Co-Sell Motion",
    campaignSpend: 4500,
    speedToLeadMinutes: 12,
    mqlDate: "2026-01-14",
    sqlDate: "2026-01-16",
    oppDate: "2026-01-20",
    closeDate: "2026-02-18",
    dealValue: 240000,
    startingArr: 180000,
    expansionArr: 60000,
    churnArr: 0,
    salesCycleDays: 35,
    winLossReason: "Distributor discount tier integration",
    productLine: "SignalForge Platform",
    csatScore: 4.9
  },
  {
    id: "GTM-2003",
    accountName: "CoolFlow Thermal Tech",
    trade: "Commercial HVAC & Mechanical",
    leadSource: "Paid Search & Intent Ads",
    region: "EMEA",
    segment: "Mid-Market",
    stage: "Opportunity",
    assignedRep: "Elena Rostova",
    campaignName: "Google Search Intent — Commercial HVAC",
    campaignSpend: 2800,
    speedToLeadMinutes: 14,
    mqlDate: "2026-02-01",
    sqlDate: "2026-02-05",
    oppDate: "2026-02-12",
    closeDate: null,
    dealValue: 95000,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "CPQ Automation",
    csatScore: null
  },

  // Electrical & Solar Contracting
  {
    id: "GTM-2004",
    accountName: "VoltEdge Power Systems",
    trade: "Electrical & Solar Contracting",
    leadSource: "Outbound AI Agent",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Sarah Lin",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 3100,
    speedToLeadMinutes: 6,
    mqlDate: "2026-01-18",
    sqlDate: "2026-01-20",
    oppDate: "2026-01-25",
    closeDate: "2026-02-20",
    dealValue: 210000,
    startingArr: 160000,
    expansionArr: 50000,
    churnArr: 0,
    salesCycleDays: 33,
    winLossReason: "Automated BOM pricing & solar tax credit workflows",
    productLine: "Agentic RevOps Swarm",
    csatScore: 5.0
  },
  {
    id: "GTM-2005",
    accountName: "SolarGrid Industrial EPC",
    trade: "Electrical & Solar Contracting",
    leadSource: "Trade Shows & Industry Expos",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Alex Rivera",
    campaignName: "RE+ Clean Energy Expo 2026",
    campaignSpend: 8500,
    speedToLeadMinutes: 19,
    mqlDate: "2026-02-04",
    sqlDate: "2026-02-08",
    oppDate: "2026-02-14",
    closeDate: "2026-03-12",
    dealValue: 315000,
    startingArr: 250000,
    expansionArr: 65000,
    churnArr: 0,
    salesCycleDays: 36,
    winLossReason: "Rapid multi-site EPC pipeline visibility",
    productLine: "SignalForge Platform",
    csatScore: 4.8
  },
  {
    id: "GTM-2006",
    accountName: "Ampere Commercial Electric",
    trade: "Electrical & Solar Contracting",
    leadSource: "Inbound Organic / SEO",
    region: "EMEA",
    segment: "Mid-Market",
    stage: "SQL",
    assignedRep: "Marcus Vance",
    campaignName: "Organic Inbound & Whitepapers",
    campaignSpend: 1100,
    speedToLeadMinutes: 11,
    mqlDate: "2026-02-10",
    sqlDate: "2026-02-14",
    oppDate: null,
    closeDate: null,
    dealValue: null,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "Lead Intelligence",
    csatScore: null
  },

  // Plumbing & Industrial Piping
  {
    id: "GTM-2007",
    accountName: "Hydronic Flow Technologies",
    trade: "Plumbing & Industrial Piping",
    leadSource: "Outbound AI Agent",
    region: "North America",
    segment: "Mid-Market",
    stage: "Closed Won",
    assignedRep: "Marcus Vance",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 2400,
    speedToLeadMinutes: 9,
    mqlDate: "2026-01-22",
    sqlDate: "2026-01-24",
    oppDate: "2026-01-28",
    closeDate: "2026-02-24",
    dealValue: 115000,
    startingArr: 95000,
    expansionArr: 20000,
    churnArr: 0,
    salesCycleDays: 33,
    winLossReason: "Live field technician job-costing sync with NetSuite",
    productLine: "CPQ Automation",
    csatScore: 4.9
  },
  {
    id: "GTM-2008",
    accountName: "BlueWater Piping & Fab",
    trade: "Plumbing & Industrial Piping",
    leadSource: "Paid Search & Intent Ads",
    region: "APAC",
    segment: "SMB",
    stage: "Closed Lost",
    assignedRep: "David Kim",
    campaignName: "Google Search Intent — Commercial HVAC",
    campaignSpend: 1900,
    speedToLeadMinutes: 35,
    mqlDate: "2026-02-15",
    sqlDate: "2026-02-18",
    oppDate: "2026-02-22",
    closeDate: "2026-03-05",
    dealValue: null,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: 18,
    winLossReason: "Competitor legacy desktop software price discount",
    productLine: "Lead Intelligence",
    csatScore: null
  },

  // General Contracting & Civil
  {
    id: "GTM-2009",
    accountName: "Consolidated Builders Group",
    trade: "General Contracting & Civil",
    leadSource: "Partner Referral / Channel",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Alex Rivera",
    campaignName: "Carrier & Distributor Co-Sell Motion",
    campaignSpend: 5100,
    speedToLeadMinutes: 10,
    mqlDate: "2026-01-28",
    sqlDate: "2026-01-30",
    oppDate: "2026-02-05",
    closeDate: "2026-03-08",
    dealValue: 420000,
    startingArr: 320000,
    expansionArr: 100000,
    churnArr: 0,
    salesCycleDays: 39,
    winLossReason: "Subcontractor compliance & AI lien-waiver tracking",
    productLine: "SignalForge Platform",
    csatScore: 5.0
  },
  {
    id: "GTM-2010",
    accountName: "Summit Civil Infrastructure",
    trade: "General Contracting & Civil",
    leadSource: "Trade Shows & Industry Expos",
    region: "EMEA",
    segment: "Enterprise",
    stage: "Opportunity",
    assignedRep: "Elena Rostova",
    campaignName: "RE+ Clean Energy Expo 2026",
    campaignSpend: 7200,
    speedToLeadMinutes: 16,
    mqlDate: "2026-02-20",
    sqlDate: "2026-02-24",
    oppDate: "2026-03-02",
    closeDate: null,
    dealValue: 280000,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "SignalForge Platform",
    csatScore: null
  },

  // Commercial Roofing & Envelopes
  {
    id: "GTM-2011",
    accountName: "EverGuard Roofing Systems",
    trade: "Commercial Roofing & Envelopes",
    leadSource: "Inbound Organic / SEO",
    region: "North America",
    segment: "Mid-Market",
    stage: "Closed Won",
    assignedRep: "Sarah Lin",
    campaignName: "Organic Inbound & Whitepapers",
    campaignSpend: 1400,
    speedToLeadMinutes: 7,
    mqlDate: "2026-02-12",
    sqlDate: "2026-02-15",
    oppDate: "2026-02-18",
    closeDate: "2026-03-16",
    dealValue: 130000,
    startingArr: 105000,
    expansionArr: 25000,
    churnArr: 0,
    salesCycleDays: 32,
    winLossReason: "Aerial drone take-off AI calculation accuracy",
    productLine: "Agentic RevOps Swarm",
    csatScore: 4.8
  },

  // Enterprise B2B SaaS
  {
    id: "GTM-2012",
    accountName: "CloudScale Data Technologies",
    trade: "Enterprise B2B SaaS",
    leadSource: "Social & Thought Leadership",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Alex Rivera",
    campaignName: "LinkedIn RevOps Leadership Series",
    campaignSpend: 4200,
    speedToLeadMinutes: 5,
    mqlDate: "2026-02-18",
    sqlDate: "2026-02-20",
    oppDate: "2026-02-23",
    closeDate: "2026-03-20",
    dealValue: 360000,
    startingArr: 280000,
    expansionArr: 80000,
    churnArr: 0,
    salesCycleDays: 30,
    winLossReason: "Eliminated 6 disconnected GTM point solutions",
    productLine: "SignalForge Platform",
    csatScore: 5.0
  },
  {
    id: "GTM-2013",
    accountName: "FinOps Enterprise Solutions",
    trade: "Enterprise B2B SaaS",
    leadSource: "Outbound AI Agent",
    region: "EMEA",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Elena Rostova",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 3400,
    speedToLeadMinutes: 11,
    mqlDate: "2026-02-25",
    sqlDate: "2026-02-27",
    oppDate: "2026-03-03",
    closeDate: "2026-03-29",
    dealValue: 275000,
    startingArr: 220000,
    expansionArr: 55000,
    churnArr: 0,
    salesCycleDays: 32,
    winLossReason: "Dead lead reactivation and automated outbound engine",
    productLine: "Agentic RevOps Swarm",
    csatScore: 4.9
  },

  // Healthcare Systems & MedTech
  {
    id: "GTM-2014",
    accountName: "MedHealth Integrated Networks",
    trade: "Healthcare Systems & MedTech",
    leadSource: "Partner Referral / Channel",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Sarah Lin",
    campaignName: "Carrier & Distributor Co-Sell Motion",
    campaignSpend: 4800,
    speedToLeadMinutes: 14,
    mqlDate: "2026-03-01",
    sqlDate: "2026-03-03",
    oppDate: "2026-03-07",
    closeDate: "2026-04-02",
    dealValue: 480000,
    startingArr: 380000,
    expansionArr: 100000,
    churnArr: 0,
    salesCycleDays: 32,
    winLossReason: "HIPAA compliance & enterprise-wide quota visibility",
    productLine: "SignalForge Platform",
    csatScore: 5.0
  },
  {
    id: "GTM-2015",
    accountName: "BioGenix Diagnostics",
    trade: "Healthcare Systems & MedTech",
    leadSource: "Paid Search & Intent Ads",
    region: "APAC",
    segment: "Mid-Market",
    stage: "Opportunity",
    assignedRep: "David Kim",
    campaignName: "Google Search Intent — Commercial HVAC",
    campaignSpend: 3100,
    speedToLeadMinutes: 18,
    mqlDate: "2026-03-05",
    sqlDate: "2026-03-09",
    oppDate: "2026-03-15",
    closeDate: null,
    dealValue: 145000,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "CPQ Automation",
    csatScore: null
  },

  // Logistics & Supply Chain
  {
    id: "GTM-2016",
    accountName: "OmniTrack Global Freight",
    trade: "Logistics & Supply Chain",
    leadSource: "Outbound AI Agent",
    region: "North America",
    segment: "Enterprise",
    stage: "Closed Won",
    assignedRep: "Alex Rivera",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 3600,
    speedToLeadMinutes: 7,
    mqlDate: "2026-03-08",
    sqlDate: "2026-03-10",
    oppDate: "2026-03-14",
    closeDate: "2026-04-06",
    dealValue: 290000,
    startingArr: 230000,
    expansionArr: 60000,
    churnArr: 0,
    salesCycleDays: 29,
    winLossReason: "Dynamic tariff & multi-carrier billing orchestration",
    productLine: "Agentic RevOps Swarm",
    csatScore: 4.9
  },
  {
    id: "GTM-2017",
    accountName: "Intermodal Logistics Group",
    trade: "Logistics & Supply Chain",
    leadSource: "Paid Search & Intent Ads",
    region: "LATAM",
    segment: "SMB",
    stage: "Closed Lost",
    assignedRep: "Alex Rivera",
    campaignName: "Google Search Intent — Commercial HVAC",
    campaignSpend: 2200,
    speedToLeadMinutes: 42,
    mqlDate: "2026-03-12",
    sqlDate: "2026-03-16",
    oppDate: null,
    closeDate: "2026-03-25",
    dealValue: null,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: 13,
    winLossReason: "Custom local currency tax localization not yet supported",
    productLine: "Lead Intelligence",
    csatScore: null
  },
  {
    id: "GTM-2018",
    accountName: "Precision Industrial Piping",
    trade: "Plumbing & Industrial Piping",
    leadSource: "Inbound Organic / SEO",
    region: "North America",
    segment: "Mid-Market",
    stage: "Closed Won",
    assignedRep: "Marcus Vance",
    campaignName: "Organic Inbound & Whitepapers",
    campaignSpend: 1500,
    speedToLeadMinutes: 8,
    mqlDate: "2026-03-15",
    sqlDate: "2026-03-17",
    oppDate: "2026-03-20",
    closeDate: "2026-04-10",
    dealValue: 125000,
    startingArr: 100000,
    expansionArr: 25000,
    churnArr: 0,
    salesCycleDays: 26,
    winLossReason: "Seamless quote approvals and fast customer sign-off",
    productLine: "CPQ Automation",
    csatScore: 4.8
  },
  {
    id: "GTM-2019",
    accountName: "Apex Solar Commercial",
    trade: "Electrical & Solar Contracting",
    leadSource: "Outbound AI Agent",
    region: "North America",
    segment: "Mid-Market",
    stage: "Lead Ingress",
    assignedRep: "Sarah Lin",
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    campaignSpend: 1800,
    speedToLeadMinutes: 4,
    mqlDate: "2026-04-01",
    sqlDate: null,
    oppDate: null,
    closeDate: null,
    dealValue: null,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "Agentic RevOps Swarm",
    csatScore: null
  },
  {
    id: "GTM-2020",
    accountName: "ThermalCore HVAC Systems",
    trade: "Commercial HVAC & Mechanical",
    leadSource: "Trade Shows & Industry Expos",
    region: "North America",
    segment: "Enterprise",
    stage: "MQL",
    assignedRep: "Alex Rivera",
    campaignName: "RE+ Clean Energy Expo 2026",
    campaignSpend: 3500,
    speedToLeadMinutes: 15,
    mqlDate: "2026-04-02",
    sqlDate: null,
    oppDate: null,
    closeDate: null,
    dealValue: null,
    startingArr: null,
    expansionArr: null,
    churnArr: null,
    salesCycleDays: null,
    winLossReason: null,
    productLine: "SignalForge Platform",
    csatScore: null
  }
];

export const TRADE_VERTICALS: TradeVertical[] = [
  "Commercial HVAC & Mechanical",
  "Electrical & Solar Contracting",
  "Plumbing & Industrial Piping",
  "General Contracting & Civil",
  "Commercial Roofing & Envelopes",
  "Enterprise B2B SaaS",
  "Healthcare Systems & MedTech",
  "Logistics & Supply Chain"
];

export const LEAD_SOURCES: LeadSourceChannel[] = [
  "Outbound AI Agent",
  "Inbound Organic / SEO",
  "Partner Referral / Channel",
  "Paid Search & Intent Ads",
  "Trade Shows & Industry Expos",
  "Social & Thought Leadership"
];

export const CAMPAIGN_SUMMARIES: CampaignSummary[] = [
  {
    campaignName: "Autonomous AI HVAC Outbound Swarm",
    channel: "Outbound AI Agent",
    totalSpend: 17500,
    leadsCreated: 142,
    cpl: 123.24,
    sqlsGenerated: 94,
    cpsql: 186.17,
    wonLogos: 6,
    bookedArr: 1435000,
    cac: 2916.67,
    roi: 8100.0,
    paybackMonths: 4.8
  },
  {
    campaignName: "Carrier & Distributor Co-Sell Motion",
    channel: "Partner Referral / Channel",
    totalSpend: 14400,
    leadsCreated: 58,
    cpl: 248.28,
    sqlsGenerated: 42,
    cpsql: 342.86,
    wonLogos: 3,
    bookedArr: 1140000,
    cac: 4800.0,
    roi: 7816.67,
    paybackMonths: 5.2
  },
  {
    campaignName: "RE+ Clean Energy Expo 2026",
    channel: "Trade Shows & Industry Expos",
    totalSpend: 19200,
    leadsCreated: 86,
    cpl: 223.26,
    sqlsGenerated: 51,
    cpsql: 376.47,
    wonLogos: 1,
    bookedArr: 315000,
    cac: 19200.0,
    roi: 1540.63,
    paybackMonths: 8.5
  },
  {
    campaignName: "Google Search Intent — Commercial HVAC",
    channel: "Paid Search & Intent Ads",
    totalSpend: 12000,
    leadsCreated: 98,
    cpl: 122.45,
    sqlsGenerated: 48,
    cpsql: 250.0,
    wonLogos: 0,
    bookedArr: 0,
    cac: 0,
    roi: -100.0,
    paybackMonths: 0
  },
  {
    campaignName: "Organic Inbound & Whitepapers",
    channel: "Inbound Organic / SEO",
    totalSpend: 4000,
    leadsCreated: 64,
    cpl: 62.5,
    sqlsGenerated: 39,
    cpsql: 102.56,
    wonLogos: 2,
    bookedArr: 255000,
    cac: 2000.0,
    roi: 6275.0,
    paybackMonths: 3.8
  },
  {
    campaignName: "LinkedIn RevOps Leadership Series",
    channel: "Social & Thought Leadership",
    totalSpend: 4200,
    leadsCreated: 38,
    cpl: 110.53,
    sqlsGenerated: 26,
    cpsql: 161.54,
    wonLogos: 1,
    bookedArr: 360000,
    cac: 4200.0,
    roi: 8471.43,
    paybackMonths: 4.1
  }
];

export interface HistoricalFunnelPoint {
  period: string;
  shortPeriod: string;
  quarter: string;
  leadsIngress: number;
  mqls: number;
  sqls: number;
  opportunities: number;
  closedWon: number;
  closedLost: number;
  leadToWonPct: number;
  sqlToWonPct: number;
  mqlToSqlPct: number;
  sqlToOppPct: number;
  oppToWonPct: number;
  bookedArr: number;
  avgSalesCycleDays: number;
  speedToLeadMin: number;
  milestone?: string;
}

export const HISTORICAL_FUNNEL_TRENDS: HistoricalFunnelPoint[] = [
  {
    period: "January 2026",
    shortPeriod: "Jan 26",
    quarter: "Q1 2026",
    leadsIngress: 1280,
    mqls: 740,
    sqls: 310,
    opportunities: 155,
    closedWon: 48,
    closedLost: 107,
    leadToWonPct: 3.75,
    sqlToWonPct: 15.48,
    mqlToSqlPct: 41.89,
    sqlToOppPct: 50.0,
    oppToWonPct: 30.97,
    bookedArr: 1850000,
    avgSalesCycleDays: 58,
    speedToLeadMin: 42.5,
    milestone: "Baseline manual SDR workflows & standard webforms"
  },
  {
    period: "February 2026",
    shortPeriod: "Feb 26",
    quarter: "Q1 2026",
    leadsIngress: 1420,
    mqls: 860,
    sqls: 380,
    opportunities: 190,
    closedWon: 64,
    closedLost: 126,
    leadToWonPct: 4.51,
    sqlToWonPct: 16.84,
    mqlToSqlPct: 44.19,
    sqlToOppPct: 50.0,
    oppToWonPct: 33.68,
    bookedArr: 2480000,
    avgSalesCycleDays: 54,
    speedToLeadMin: 36.2
  },
  {
    period: "March 2026",
    shortPeriod: "Mar 26",
    quarter: "Q1 2026",
    leadsIngress: 1650,
    mqls: 1020,
    sqls: 480,
    opportunities: 240,
    closedWon: 88,
    closedLost: 152,
    leadToWonPct: 5.33,
    sqlToWonPct: 18.33,
    mqlToSqlPct: 47.06,
    sqlToOppPct: 50.0,
    oppToWonPct: 36.67,
    bookedArr: 3720000,
    avgSalesCycleDays: 49,
    speedToLeadMin: 28.4,
    milestone: "Introduced Automated ICP Domain Matching & Enrichment"
  },
  {
    period: "April 2026",
    shortPeriod: "Apr 26",
    quarter: "Q2 2026",
    leadsIngress: 1840,
    mqls: 1190,
    sqls: 590,
    opportunities: 305,
    closedWon: 122,
    closedLost: 183,
    leadToWonPct: 6.63,
    sqlToWonPct: 20.68,
    mqlToSqlPct: 49.58,
    sqlToOppPct: 51.69,
    oppToWonPct: 40.0,
    bookedArr: 5140000,
    avgSalesCycleDays: 45,
    speedToLeadMin: 21.0
  },
  {
    period: "May 2026",
    shortPeriod: "May 26",
    quarter: "Q2 2026",
    leadsIngress: 2150,
    mqls: 1440,
    sqls: 760,
    opportunities: 395,
    closedWon: 168,
    closedLost: 227,
    leadToWonPct: 7.81,
    sqlToWonPct: 22.11,
    mqlToSqlPct: 52.78,
    sqlToOppPct: 51.97,
    oppToWonPct: 42.53,
    bookedArr: 7360000,
    avgSalesCycleDays: 41,
    speedToLeadMin: 14.8,
    milestone: "Launched Lemlist Multi-Channel AI Sequences & Lemwarm"
  },
  {
    period: "June 2026",
    shortPeriod: "Jun 26",
    quarter: "Q2 2026",
    leadsIngress: 2480,
    mqls: 1720,
    sqls: 950,
    opportunities: 510,
    closedWon: 226,
    closedLost: 284,
    leadToWonPct: 9.11,
    sqlToWonPct: 23.79,
    mqlToSqlPct: 55.23,
    sqlToOppPct: 53.68,
    oppToWonPct: 44.31,
    bookedArr: 9820000,
    avgSalesCycleDays: 37,
    speedToLeadMin: 11.2
  },
  {
    period: "July 2026",
    shortPeriod: "Jul 26",
    quarter: "Q3 2026",
    leadsIngress: 2890,
    mqls: 2080,
    sqls: 1210,
    opportunities: 670,
    closedWon: 314,
    closedLost: 356,
    leadToWonPct: 10.87,
    sqlToWonPct: 25.95,
    mqlToSqlPct: 58.17,
    sqlToOppPct: 55.37,
    oppToWonPct: 46.87,
    bookedArr: 14200000,
    avgSalesCycleDays: 33,
    speedToLeadMin: 7.8,
    milestone: "Activated Lucid Architecture Sync & Instant CPQ Flows"
  },
  {
    period: "August 2026",
    shortPeriod: "Aug 26",
    quarter: "Q3 2026",
    leadsIngress: 3240,
    mqls: 2410,
    sqls: 1460,
    opportunities: 830,
    closedWon: 412,
    closedLost: 418,
    leadToWonPct: 12.72,
    sqlToWonPct: 28.22,
    mqlToSqlPct: 60.58,
    sqlToOppPct: 56.85,
    oppToWonPct: 49.64,
    bookedArr: 18950000,
    avgSalesCycleDays: 29,
    speedToLeadMin: 5.4,
    milestone: "Autonomous Real-Time RevOps Routing & SSoT Synchronization"
  }
];

