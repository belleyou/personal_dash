/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Experience, Education, Certification, SkillCategory, Project, MetricCard, Article } from "./types";

// ==========================================
// 1. EDITABLE CONTACT INFORMATION
// ==========================================
export const CONTACT_INFO = {
  name: "Bao You",
  headline: "Global CRM & GTM Systems Product Leader",
  subtitle: "Enterprise Applications Leader | Systems Analyst & Architect",
  email: "you.bell521@gmail.com",
  phone: "415-860-6650",
  location: "SF Bay Area, CA",
  linkedin: "https://www.linkedin.com/in/baoyingyou",
  salesforceTrailhead: "https://salesforce.com/trailblazer/baoyou",
  threads: "https://www.threads.com/@bao2you",
  instagram: "https://www.instagram.com/bao2you/?hl=en",
  tiktok: "https://www.tiktok.com/@bao2you?is_from_webapp=1&sender_device=pc",
  github: "https://github.com",                        // Edit check-in links if any
  calendarUrl: "https://calendar.google.com", // Link to live-time google calendar booking schedule
  calendlyUrl: "https://calendly.com/you-bell521", // Calendly embed url
};

// ==========================================
// 2. EDITABLE BUSINESS METRICS (IMPACT & OUTCOMES)
// ==========================================
export const METRICS: MetricCard[] = [
  {
    value: "$150M+",
    label: "Pipeline Influenced",
    explanation: "Driven through lead-to-pipeline optimization, partner community enhancements, data cleanliness, and CPQ acceleration.",
    markerColor: "marker-blue",
  },
  {
    value: "3,500+",
    label: "CRM Users Supported",
    explanation: "Managed global enterprise systems architecture supporting Sales, Service, and RevOps globally.",
    markerColor: "marker-green",
  },
  {
    value: "$450K+",
    label: "Annual Cost Savings",
    explanation: "Achieved by streamlining workflow automations and consolidating redundant license/feature sets across commercial systems.",
    markerColor: "marker-orange",
  },
  {
    value: "Global",
    label: "Regions Supported",
    explanation: "Designed cross-border commercial applications for United States, LATAM, EMEA, and APAC.",
    markerColor: "highlight",
  },
  {
    value: "50+",
    label: "Process Automations",
    explanation: "Implemented advanced flows, ecosystem integrations, and high-performance business process runbooks across the Salesforce ecosystem.",
    markerColor: "marker-blue",
  },
  {
    value: "85%+",
    label: "User Adoption Lift",
    explanation: "Realized post CRM optimizations, training sessions, and UAT feedback tracking iterations.",
    markerColor: "marker-green",
  },
];

// ==========================================
// 3. EDITABLE BIOGRAPHY
// ==========================================
export const ABOUT_ME = {
  summary: `Enterprise Business Applications Product Leader with 10+ years managing Salesforce CRM platforms, integrated commercial systems, and cross-functional analyst teams in large, matrixed organizations. Deep expertise in end-to-end incident management, UAT execution, release validation, and production support for Salesforce Sales Cloud, Service Cloud, CPQ, and mobile application integrations. Proven track record leading and coaching Business and Platform Analyst teams, driving process improvements, and maintaining operational continuity in regulated enterprise environments, specializing in building high-scale in-house and Salesforce CRM custom systems for SaaS, Ads Tech, and E-commerce industries.`,
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Mandarin Chinese", level: "Fluent" },
    { name: "Cantonese", level: "Conversational" },
  ],
};

// ==========================================
// 4. EDITABLE CAREER EXPERIENCE (EXPERIMENT TIMELINE)
// ==========================================
export const CAREER_EXPERIENCE: Experience[] = [
  {
    company: "SpaceX",
    role: "Lead Enterprise & GTM Systems Architect (IPO Readiness Engagement)",
    location: "Hawthorne, CA (SpaceX Headquarters)",
    dates: "Special Engagement",
    tools: ["Salesforce custom products", "Systems Consolidation", "SOX Systems Compliance", "Robust GTM systems", "Federation Workflows", "System Scalability", "Cost Controlling"],
    bullets: [
      "IPO Readiness & Systems Consolidation: Led critical enterprise application consolidation and rationalization efforts, steering high-scale GTM infrastructure toward strict IPO readiness standards.",
      "Cost Controlling & Optimization: Established rigorous system auditing and process-based cost controlling to eliminate duplicate software licenses and optimize overall enterprise application expenditures.",
      "Systems Compliance & Governance: Architected end-to-end compliance procedures aligning enterprise SaaS platforms, security protocols, and system access logs with public company ITGC audit requirements.",
      "Robust GTM Systems & Architecture: Engineered resilient, robust GTM system flows to synchronize sales pipeline dynamics, partner incentive models, and enterprise transaction processing under high scale.",
      "Salesforce Custom Products: Built bespoke, high-performance custom Salesforce products and automation pipelines to streamline multi-tier quote-to-contract workflows.",
      "Federation Workflows & Identity Governance: Designed scalable cross-division user federation workflows and identity governance models, guaranteeing bulletproof security boundaries and system scalability."
    ],
  },
  {
    company: "X Corp (Twitter / X / xAI / Grok)",
    role: "Global Senior Business Systems Manager — GTM Sales, PRM & Service Cloud",
    location: "San Francisco, CA",
    dates: "Jul 2022 – Apr 2026",
    tools: ["Salesforce CRM", "Sales Cloud", "Service Cloud", "CPQ", "GTM Automation", "API Integrations", "Slack Integration", "Jira"],
    bullets: [
      "BizOps Product Delivery: Drove end-to-end feature delivery across a cross-functional team of Business Analysts, Platform Admins, and Integration Engineers — owning backlog prioritization, translating stakeholder requirements into scoped deliverables, and managing release sequencing.",
      "Incident Management & Escalation: Owned end-to-end incident response for Salesforce and integrated commercial platforms across 30+ applications — served as escalation lead for high-impact production issues, coordinating resolution across Engineering, IT, and business stakeholders under strict SLAs.",
      "UAT Leadership & Release Validation: Designed and executed UAT frameworks for Salesforce Sales Cloud, Marketing Cloud, and Partner Community releases — authored test scripts, led defect tracking cycles, and secured business sign-off.",
      "Platform Troubleshooting & CRM Architecture: Troubleshot and resolved complex issues across Salesforce, CPQ workflows, O2C integrations, and downstream ERP processes — collaborating with architects to maintain clean, scalable data models.",
      "Process Improvement & Documentation: Identified and implemented process improvements that increased delivery efficiency and release quality across the business applications portfolio; maintained SOPs, knowledge base articles, and operational runbooks.",
      "Intelligent Workflow Automation: Planned, built, and scaled out-of-the-box (OOB) CRM/GTM automated features and high-efficiency enterprise infrastructure, incorporating advanced routing rules and core API integrations."
    ],
  },
  {
    company: "Rubrik",
    role: "IT Product Manager, Enterprise Applications — Global GTM / PRM",
    location: "Palo Alto, CA",
    dates: "Mar 2022 – Jul 2022",
    tools: ["Salesforce GTM", "Partner PRM Portal", "CRM Hygiene", "Roadmapping", "UAT Cycles"],
    bullets: [
      "Enterprise Application Delivery: Made feature delivery, incident resolution, and platform enhancements for Salesforce and partner portal systems against a strategic GTM application roadmap.",
      "Platform Stability & Adoption: Ensured data quality, system usability, and adoption across Salesforce.com and PRM systems through close collaboration with Sales and Revenue leadership — establishing configuration governance standards.",
      "Structured Release Cycles: Led the rebranding and redesign of the partner portal community system, delivering ongoing feature enhancements through structured release cycles with stakeholder-validated UAT and defect-to-resolution tracking."
    ],
  },
  {
    company: "Quantcast",
    role: "Enterprise Applications Product Owner — Salesforce & Integrated Applications",
    location: "San Francisco, CA",
    dates: "Oct 2019 – Mar 2022",
    tools: ["Salesforce CRM", "CPQ", "Marketo", "Zendesk", "Jira", "Smartsheet", "SOX Compliance"],
    bullets: [
      "Salesforce Platform Ownership: Owned org-wide Salesforce Sales Cloud, CPQ, Service Cloud, and Community — led a Scrum team on large strategic initiatives from problem framing through system delivery, UAT, and change management across global geographies.",
      "Multi-System Integration & Release Operations: Architected and maintained integrations across Salesforce, SalesLoft, ZoomInfo, Marketo, Zendesk, JIRA, and Smartsheet — coordinating cross-team release cycles and production support.",
      "Incident Resolution & Delivery Cadence: Managed a standard cadence of system changes; coordinated requirement gathering, quality testing, and deployment — resolving production issues within SLA and maintaining operational predictability.",
      "SOX & Compliance Governance: Supported internal and external SOX ITGC and SOD compliance audits — ensuring system access controls, change documentation, and audit trails met enterprise governance standards."
    ],
  },
  {
    company: "Salesforce.com (via Global Infotech Consulting)",
    role: "Sr. Business Systems Analyst — CIO Org, Sales Operations",
    location: "San Francisco, CA (Salesforce HQ)",
    dates: "Feb 2019 – Oct 2019",
    tools: ["Salesforce core Platform", "Sales Ops", "UAT Testing", "Data Governance Analysis"],
    bullets: [
      "CRM Enhancements: Led planning, design, and delivery of cross-functional CRM enhancement projects at Salesforce HQ; partnered with stakeholders to shape requirements and align business strategy with system architecture.",
      "System Testing Co-ordination: Coordinated and performed system testing; worked closely with project teams during UAT, tracking defects through resolution and securing end-user acceptance.",
      "Operational Intersections: Identified process improvement opportunities via data governance analysis; surfaced recommendations on integration and functionality intersection points to reduce operational risk."
    ],
  },
  {
    company: "Google Inc. (via Crowdstaffing)",
    role: "Sr. Partner Incentive Business Operations Analyst — Google Cloud",
    location: "Sunnyvale, CA",
    dates: "Feb 2018 – Sep 2018",
    tools: ["SQL", "Python", "Salesforce Analytics", "Google Cloud", "Partner Programs"],
    bullets: [
      "Partner Incentive Programs: Launched and managed five annual pre-sales incentive partnership programs end-to-end; maintained comprehensive program documentation and managed complex escalations through the full delivery lifecycle.",
      "Analytics & Reporting: Developed and automated operational reports and dashboards using SQL, Python, BI tools, and Salesforce Analytics — driving data-informed decisions.",
      "Strategic Alignment: Leveraged analytical insights to drive organizational decision-making and strategy, identify opportunities for operational efficiencies, and develop program roadmaps to implement processes at scale."
    ],
  },
  {
    company: "Salesforce.com (via Talentburst Consulting)",
    role: "Partnership Sales Operations Analyst — Revenue Org",
    location: "San Francisco, CA (Salesforce HQ)",
    dates: "Nov 2016 – Oct 2017",
    tools: ["Salesforce CPQ", "SFDC Analytics", "Data Loader", "Workbench", "Quote-to-Cash"],
    bullets: [
      "License Delivery & SLA Tracking: Managed Salesforce CPQ and partner systems supporting global license delivery, account reconciliation, and SKU management — maintaining 100% SLA performance across commercial operations workflows.",
      "Partner Order Management: Led Partner Order Management Channel 2.0 system planning and implementation; conducted SFDC Analytics, Data Loader, Workbench, and SOQL-based analysis.",
      "Quote-to-Cash: Drove Quote-to-Cash process improvements spanning territory management, deal approvals, and commission planning; built dashboards to track business metrics and surface actionable insights."
    ],
  },
  {
    company: "Google Inc. (via Artech)",
    role: "Sales Operations Analyst Team Lead — Google Ads",
    location: "Mountain View, CA",
    dates: "Dec 2015 – Oct 2016",
    tools: ["Google Ads", "Sales Operations", "UAT Automation Tools", "Performance Reporting"],
    bullets: [
      "Operational Specifications: Defined scope, business-function requirements, and system specifications for complex operational projects — participated in UAT testing for new automation tools with cross-functional teams.",
      "Performance Reporting: Produced 30+ weekly reports analyzing qualitative and quantitative insights to improve business performance, growth, product adoption, and productivity across global markets.",
      "Strategic Solutions: Established alternative problem-solving methods and forecasted yearly headcount for strategic business perspectives; incorporated best practices and global programs."
    ],
  },
  {
    company: "iHerb.com (Global E-Commerce)",
    role: "Global Logistics Operations Specialist",
    location: "Moreno Valley, CA",
    dates: "Apr 2013 – Sep 2015",
    tools: ["Global Logistics", "Salesforce CRM Core", "Zendesk", "SKU Setups", "Cost Allocation"],
    bullets: [
      "Global Shipping Management: Coordinated global shipping logistics, managing schedules, data, and contracts with freight forwarders, airlines, vendors, and partners.",
      "Platform Tracking: Oversee warehouse operations, including SKU and pricing setups, badge and manifest tracking, and trucking payments. Managed customer feedback data in Salesforce, Zendesk, and Excel.",
      "CRM Implementation: Successfully implemented a CRM system to manage vendor and partner relationships and resolved cost allocation issues and invoices."
    ],
  }
];

// ==========================================
// 5. EDITABLE EDUCATION LIST
// ==========================================
export const EDUCATION_LIST: Education[] = [
  {
    degree: "Master of Business Administration (MBA)",
    institution: "University of Redlands",
    location: "California",
    dates: "2013 – 2015",
  },
  {
    degree: "Bachelor of Arts, Economics",
    institution: "University of California, Riverside",
    location: "California",
    dates: "2009 – 2013",
  },
];

// ==========================================
// 6. EDITABLE CERTIFICATIONS LIST
// ==========================================
export const CERTIFICATIONS: Certification[] = [
  { name: "Salesforce Certified Architect", issuer: "Salesforce", badgeColor: "yellow", isSalesforce: true },
  { name: "Salesforce Admin & Advanced Admin", issuer: "Salesforce", badgeColor: "blue", isSalesforce: true },
  { name: "Salesforce CPQ Specialist", issuer: "Salesforce", badgeColor: "orange", isSalesforce: true },
  { name: "Salesforce Sales Cloud Consultant", issuer: "Salesforce", badgeColor: "yellow", isSalesforce: true },
  { name: "Salesforce Service Cloud Consultant", issuer: "Salesforce", badgeColor: "blue", isSalesforce: true },
  { name: "Salesforce Experience Cloud Consultant", issuer: "Salesforce", badgeColor: "green", isSalesforce: true },
  { name: "Salesforce Platform App Builder", issuer: "Salesforce", badgeColor: "green", isSalesforce: true },
  { name: "Salesforce Business Analyst", issuer: "Salesforce", badgeColor: "orange", isSalesforce: true },
  { name: "Salesforce Data Governance Architect", issuer: "Salesforce", badgeColor: "yellow", isSalesforce: true },
  { name: "Salesforce AI Specialist", issuer: "Salesforce", badgeColor: "green", isSalesforce: true },
  { name: "All-Star Trailhead Ranger", issuer: "Salesforce", badgeColor: "yellow", isSalesforce: true },
  
  { name: "Cornell Certified System Designer", issuer: "Cornell University", badgeColor: "orange", isSalesforce: false },
  { name: "Certified Professional Jira Administrator", issuer: "Atlassian", badgeColor: "blue", isSalesforce: false },
  { name: "LeanData Admin", issuer: "LeanData", badgeColor: "green", isSalesforce: false },
  { name: "Outreach Admin", issuer: "Outreach", badgeColor: "orange", isSalesforce: false },
  { name: "Slack Admin", issuer: "Slack", badgeColor: "yellow", isSalesforce: false },
  { name: "OKTA Admin", issuer: "OKTA Network", badgeColor: "blue", isSalesforce: false },
  { name: "Zendesk Admin", issuer: "Zendesk", badgeColor: "green", isSalesforce: false },
  { name: "Notion Certified Admin", issuer: "Notion", badgeColor: "orange", isSalesforce: false },
  { name: "HubSpot CRM Certified", issuer: "HubSpot", badgeColor: "yellow", isSalesforce: false },
  { name: "Google Ads Certified", issuer: "Google Inc.", badgeColor: "blue", isSalesforce: false }
];

// ==========================================
// 7. EDITABLE SKILLS BLOCKS
// ==========================================
export const SKILLS_DATA: SkillCategory[] = [
  {
    category: "CRM & GTM Systems",
    markerColor: "marker-blue",
    skills: [
      "Salesforce Sales Cloud",
      "Salesforce Service Cloud",
      "Experience Cloud",
      "Marketing Cloud",
      "CPQ & Quote-to-Cash (Q2C)",
      "Revenue Operations Systems",
      "Sales Operations Systems",
      "Partner Communities (PRM)",
      "HubSpot CRM"
    ]
  },
  {
    category: "Product & Release Delivery",
    markerColor: "marker-green",
    skills: [
      "Enterprise Product Management",
      "Business Analyst (BRD / PRD / SRD)",
      "UAT Leadership & Testing",
      "Release Validation Systems",
      "Change Management Operations",
      "Incident Response Leadership",
      "Stakeholder Management",
      "Agile Scrum Processes"
    ]
  },
  {
    category: "Data & Analytics",
    markerColor: "marker-orange",
    skills: [
      "Salesforce Analytics",
      "SQL",
      "SOQL Queries",
      "Snowflake Data",
      "BigQuery SQL",
      "Tableau Dashboarding",
      "Data Governance & Quality",
      "KPI Reporting Metrics"
    ]
  },
  {
    category: "Workflow Automation & GTM Integrations",
    markerColor: "marker-green",
    skills: [
      "Smart Workflow Routines & APIs",
      "Intelligent CRM Pipelines",
      "Lead Routing Automation",
      "Business Logic Automations",
      "Zapier & Middleware Orchestration",
      "Mulesoft Integration",
      "Traction Complete & Lead-to-Account",
      "Salesforce Einstein Platform"
    ]
  },
  {
    category: "SSO & System Security Compliance",
    markerColor: "marker-blue",
    skills: [
      "Okta Single Sign-On (SSO)",
      "SOX Compliance & ITGC",
      "SOC 2 Type II Auditing",
      "HIPAA Privacy Safeguards",
      "Shield Platform Encryption",
      "Event Monitoring Audits",
      "Field Audit Trails",
      "Security Center Controls",
      "Backup & Recovery Systems",
      "Data Mask & Sandbox Privacy",
      "Named Credentials Auth",
      "Trusted IP Ranges & MFA"
    ]
  }
];

// ==========================================
// 8. EDITABLE PROJECTS (TRADITIONAL & AI GTM GROUPS)
// ==========================================
export const TRADITIONAL_PROJECTS: Project[] = [
  {
    title: "Global Quote-to-Cash (CPQ) Transformation",
    problem: "Global commercial sales struggled with slow, error-prone quoting and approval workflows across regions, bottlenecking active pipeline execution.",
    solution: "Architected and deployed a standardized Salesforce CPQ solution with unified templates, automated discount thresholds, and real-time approval pipelines.",
    impact: "+100% SLA compliance rate across global operations workflow, cutting Quote-to-Cash cycles in half.",
    tools: ["Salesforce CPQ", "Advanced Approvals", "Docusign", "O2C Integration"],
    demoUrl: "#_demo_cpq", // Edit with actual video/demo URL later
  },
  {
    title: "Lead-to-Account Routing Automation",
    problem: "Incoming inbound leads suffered high response times due to manual triage and poor territory synchronization.",
    solution: "Designed and implemented automated multi-tier routing logic integrating LeanData and Traction Complete within Salesforce core.",
    impact: "Boosted operational triage efficiency by over 50% while completely eliminating orphaned leads.",
    tools: ["LeanData", "Traction Complete", "Salesforce Sales Cloud"],
    demoUrl: "#_demo_routing",
  },
  {
    title: "Salesforce CRM Core Optimization",
    problem: "Years of custom code and unstructured release cycles created severe platform instability, leading to low user adoption.",
    solution: "Led a massive CRM hygiene initiative, deprecating complex dead flows, refining data validation policies, and introducing structured monthly releases.",
    impact: "Stabilized the environment for 3,500+ global users and increased user feedback satisfaction scores by 40%.",
    tools: ["Salesforce Admin Suite", "Data Loader", "Jira", "UAT Frameworks"],
    demoUrl: "#_demo_hub",
  },
  {
    title: "Multi-System Commercial Integration Hub",
    problem: "Siloed commercial stack led to data discrepancy between CRM, marketing clouds, and customer success applications.",
    solution: "Architected a multi-direction integration syncing Salesforce Sales Cloud, Marketo, ZoomInfo, and Zendesk.",
    impact: "Ensured end-to-end data predictability, compliance and seamless Handshake between GTM teams.",
    tools: ["REST APIs", "Mulesoft", "Marketo API", "Zendesk Support"],
    demoUrl: "#_demo_integrations",
  }
];

export const AI_GTM_PROJECTS: Project[] = [
  {
    title: "Revenue Systems Streamline Initiative (HubSpot → Salesforce Migration)",
    aiUse: "n8n AI Orchestration & Claude 3.5 Sonnet Hierarchy Resolution",
    problem: "11 fragmented tools (Definitive, Clay, LISN, Modigie, Apollo, Nooks, Commonroom, Outreach, Dripify, Salesforce, HubSpot) caused data clashing and 60+ min upload delays (>1 hr per 50k SFDC / 10k HubSpot rows) scaling from 20 to 50 AEs.",
    solution: "Evaluated 4 architecture paths and implemented Solution #3: Middleware AI Orchestration via n8n, Claude 3.5 Sonnet LLM hierarchy parsing (PE → MSO Parent → MSO Child), and Salesforce Bulk API v2.",
    impact: "Cut campaign list ingestion processing from 60+ mins to <5 mins (12x speedup), achieved >90% healthcare hierarchy accuracy, >15% call connects, and 100% Salesforce adoption.",
    tools: ["n8n Orchestration", "Claude 3.5 Sonnet", "Salesforce Bulk API v2", "Clay Waterfall", "HubSpot Decommission", "Agentforce / Data Cloud"],
    demoUrl: "#projects?tab=revops_streamline",
  },
  {
    title: "Intelligent CRM Data Quality Pipeline",
    aiUse: "Structured data parsing & quality checks",
    problem: "Hiring managers and RevOps staff lost hours correcting typos, unformatted names, and missing details on incoming partner sign-ups.",
    solution: "Configured an intelligent pipeline that parses unstructured text, extracts accurate company details, and updates Salesforce records.",
    impact: "Secured a 95% reduction in manual data entry error rates across incoming partner registries.",
    tools: ["Node.js Server", "Salesforce APIs", "Webhook triggers", "Data Validation"],
    demoUrl: "#_demo_data_ai",
  },
  {
    title: "Automated Transcript Task Generator",
    aiUse: "Workflow mapping & smart task extraction",
    problem: "Customer-facing teams spent excessive time transcribing sales discovery sessions and translating summaries into actionable Salesforce tasks.",
    solution: "Engineered an automated pipeline that ingests raw transcripts, maps user stories against templates, and triggers automated tasks directly in Salesforce and Slack.",
    impact: "Saved discovery-to-scoping turnaround latency by 4.5 hours per business requirement package.",
    tools: ["Confluence", "Salesforce REST API", "Slack Webhooks", "XML/JSON Parsers"],
    demoUrl: "#_demo_meeting_ai",
  },
  {
    title: "Predictive Opportunity Scoring Engine",
    aiUse: "Activity analytical weighting models",
    problem: "Sales leaders lacked predictive signals on active deals in Salesforce, relying strictly on subjective deal close-dates.",
    solution: "Designed a model reviewing Salesforce activity patterns (emails, meetings, age, stage shifts) and passing historical trends to predictive engines for real-time risk grading.",
    impact: "Achieved an 88% precision score in forecasting high-risk active opportunities before quarter closing.",
    tools: ["Python Analytics", "Snowflake", "SOQL Queries", "Risk Modeling"],
    demoUrl: "#_demo_health_ai",
  },
  {
    title: "Automated Proposal Generation Module",
    aiUse: "CPQ itemized mapping routines",
    problem: "Replying to complex, multi-million dollar commercial RFP (Request For Proposal) requirements took up to 5 days of manual effort.",
    solution: "Built a GTM application prototype that matches RFP bullet items against CPQ SKU catalogs and generates tailored SLA quotes through intelligent workflows.",
    impact: "Reduced proposal generation overhead by 70% while improving pricing accuracy.",
    tools: ["Traction Complete", "Salesforce CPQ APIs", "JSON Schemas", "Express.js"],
    demoUrl: "#_demo_quote_ai",
  }
];

export const EVALUATION_PROJECTS: Project[] = [
  {
    title: "Revenue Systems Streamline Initiative (HubSpot → Salesforce Architecture)",
    problem: "Severe tool & data overlap across 11 fragmented tools created >1 hour upload delays and data clashing while scaling AE team from 20 to 50 reps.",
    solution: "Evaluated 4 architecture paths (Native Apex, Agentforce/Data Cloud, Middleware n8n AI Orchestration, Custom MCP Microservices) and delivered an n8n + Claude 3.5 Sonnet + SF Bulk API v2 blueprint.",
    impact: "Cut campaign list processing from 60+ mins to <5 mins (12x speedup), achieved >90% healthcare hierarchy accuracy, >15% call connects, and 100% SFDC adoption.",
    tools: ["n8n", "Claude 3.5 Sonnet", "Salesforce Bulk API v2", "Clay Waterfall", "HubSpot Decommission"],
    demoUrl: "#projects?tab=revops_streamline",
  },
  {
    title: "Multi-Vendor CPQ & Billing Suite Audit",
    problem: "Legacy multi-ERP billing and complex discounting structures resulted in a 4-day quoting lead time and severe revenue leakage.",
    solution: "Conducted an exhaustive system evaluation comparing Salesforce CPQ/Billing, DealHub, and Stripe Billing against custom microservices. Designed a decoupled CRM/ERP data integration blueprint.",
    impact: "Standardized quoting architecture, paving a clear roadmap that reduced vendor licensing costs by 22% and secured SLA alignment.",
    tools: ["Gartner Frameworks", "SOQL Queries", "TCO Models", "Salesforce Billing"],
    demoUrl: "#_demo_audit",
  },
  {
    title: "Enterprise Lead Routing Engine Assessment",
    problem: "Conflicting custom Apex-based lead routers and LeanData triggers caused infinite recursion loops, delaying critical GTM lead distribution.",
    solution: "Evaluated routing speed, error handling, and territory mapping interfaces of LeanData, Traction Complete, and native active assignment rules.",
    impact: "Delivered a routing matrix model that eliminated 100% of deadlock loops and established a scalable framework for 100+ global territories.",
    tools: ["Apex Profiler", "Visual Flow", "Lead Distribution Matrix", "LeanData"],
    demoUrl: "#_demo_eval",
  },
  {
    title: "Outreaching/Engaging App Evaluation",
    problem: "Siloed prospecting sequences, disconnected chat widgets and unstable call-routing platforms led to low lead-response times and fragmented activity records.",
    solution: "Directed a system evaluation comparing Salesloft, Outreach.io, and Salesforce High Velocity Sales against custom dialers for contact-center efficiency.",
    impact: "Selected and migrated global business development reps to Outreach.io, boosting daily call engagement velocity by 25%.",
    tools: ["Evaluation Matrices", "ROI Calculators", "Integration Mappings", "Salesloft vs Outreach"],
    demoUrl: "#_demo_outreach_eval",
  },
  {
    title: "Billing/Involving/Order management System Evaluation",
    problem: "Inconsistent billing schedules and lack of central order-management state caused multi-system order-to-cash desynchronizations and manual invoice overrides.",
    solution: "Conducted a rigorous strategic appraisal of NetSuite ERP, Salesforce Revenue Cloud (CPQ/Billing), and Zuora to establish a cohesive enterprise billing framework.",
    impact: "Identified key capabilities gap and formulated a phased roadmap expected to eliminate 95% of billing calculation errors.",
    tools: ["ERP Blueprinting", "NetSuite vs Zuora", "Order-to-Cash mapping", "Strategic Assessment"],
    demoUrl: "#_demo_billing_eval",
  }
];

export const MODELING_PROJECTS: Project[] = [
  {
    title: "Global Unified Account & Contact Schema (Golden Record)",
    problem: "Duplicate billing records, legacy lead lists, and conflicting customer data schemas across Sales and Support divisions caused fragmented user profiles.",
    solution: "Led the conceptual and physical database schema redesign to standardize Account-to-Contact relationships, introducing a unified MDM (Master Data Management) key structure.",
    impact: "Reduced duplicate account records by 84%, providing a single 'Golden Record' source-of-truth across all commercial applications.",
    tools: ["ERD Mapping", "Schema Builder", "Snowflake", "dbt (Data Build Tool)"],
    demoUrl: "#_demo_golden_record",
  },
  {
    title: "RevOps Forecasting & Pipeline Historical Snapshot Model",
    problem: "Sales operations lacked point-in-time snapshotting capabilities for deep pipeline analysis, preventing accurate stage-velocity tracking.",
    solution: "Engineered a robust data-mart modeling design that captures daily change deltas for lead, contact, and opportunity records.",
    impact: "Powered predictive stage-duration analytics which improved sales forecasting accuracy by over 15% quarter-over-quarter.",
    tools: ["SQL", "Reporting Snapshots", "Snowflake", "Tableau", "dbt"],
    demoUrl: "#_demo_snapshots",
  },
  {
    title: "Data Modeling for CPQ: Subscriptions & Amendments Schema",
    problem: "Complex co-terming calculations and customized multi-year deal terms resulted in pricing inconsistencies and slower quotation creation.",
    solution: "Architected a flexible subscription-product data model in CPQ, framing price schedules, block pricing rules, and dynamic MDQ (Multi-Dimensional Quoting) layouts.",
    impact: "Ensured 100% price rule compliance for contract amendments and reduced sales quoting cycles for sub-renewals by 55%.",
    tools: ["Salesforce CPQ", "MDQ Modeling", "Product Bundles", "Data Dictionary"],
    demoUrl: "#_demo_sub_cpq",
  },
  {
    title: "Data Modeling for CPQ: Usage & Consumption-Based Metering Workflows",
    problem: "SaaS consumption events collected from multiple cloud systems could not be accurately aggregated, leading to delayed usage-based invoice creation.",
    solution: "Configured a robust usage-based metering object schema designed to ingest millions of telemetry messages, bucket them into metrics, and output usage summary objects.",
    impact: "Fully automated product-usage billing directly inside CRM dashboards, eliminating manual computation efforts and billing lag.",
    tools: ["Usage Metering Schema", "Salesforce Billing", "API Gateway", "Kafka Streams"],
    demoUrl: "#_demo_usage_billing",
  }
];

export const SALES_PRO_PROJECTS: Project[] = [
  {
    title: "High-Velocity Inside Sales Standard Operating Workflow (SOP)",
    problem: "New sales reps averaged a 90-day ramp time due to unstructured outreach strategies, playbook siloes, and manual activity tracking.",
    solution: "Standardized and automated the end-to-end sales prospecting-to-opportunity pipeline by embedding Salesforce Sales Engagement cadence guidelines directly into user layouts.",
    impact: "Increased call-to-connection conversion ratios by 35% and compressed typical new-hire ramp time to under 45 days.",
    tools: ["Sales Engagement", "Outreach.io", "Cadence Builder", "Gong.io"],
    demoUrl: "#_demo_sop",
  },
  {
    title: "Complex Multi-Tier Deal Approval & Delegation Routing Process",
    problem: "Multi-million dollar custom configurations frequently stalled in executive approval queues, resulting in lost deals and missed quarterly numbers.",
    solution: "Streamlined the approval matrices by implementing automated delegation structures based on deal margin, product category, and regional discounts.",
    impact: "Slashed overall approval turnaround times by 68% while strictly maintaining SOX and ITGC compliance standards.",
    tools: ["Advanced Approvals", "Process Mapping", "Slack Integrations", "DocuSign"],
    demoUrl: "#_demo_approvals",
  },
  {
    title: "Manually Requesting Bulk Account Transfer Process",
    problem: "Sales representatives spent several days manually preparing spreadsheets for bulk account transfers, causing severe operational bottlenecks during sales planning cycles.",
    solution: "Designed a standardized, self-service automated request flow within the GTM console, utilizing dynamic validation rules and routing requests to Sales Ops managers.",
    impact: "Reduced turnaround times for territory adjustments from weeks to just under 24 hours, guaranteeing compliant and audited transfers.",
    tools: ["Workflows", "Salesforce Flow", "Approval Matrix", "Account Management"],
    demoUrl: "#_demo_bulk_transfer",
  },
  {
    title: "Create Quota Appeal Process Case Study",
    problem: "Informal, ad-hoc quota adjustment requests via undocumented chat messages and email threads led to inconsistent approvals and skewed commission models.",
    solution: "Configured a structured quota appeal system featuring automated justification logs, regional director delegations, and compensation alignment tasks.",
    impact: "Unified global compensation governance, preventing compliance risk and increasing field organization transparency by 40%.",
    tools: ["Quota Management", "Advanced Approvals", "Compensation Audits", "Finiqs/Xactly"],
    demoUrl: "#_demo_quota_appeal",
  }
];

// ==========================================
// 9. EDITABLE HOBBIES LIST
// ==========================================
export const HOBBIES = [
  {
    name: "NBA & Sports Strategy",
    description: "An avid fan of tactical court play, statistics modeling, and team chemistry.",
    iconName: "Flame",
    coverImage: "/src/AllStar.jpeg",
  },
  {
    name: "Global Travel & Exploration",
    description: "Solo travelled to over 30 countries globally to experience international architecture, local cultures, and culinary history.",
    iconName: "Globe",
    coverImage: "/src/Wing.jpeg",
  },
  {
    name: "Music & Acappella",
    description: "Acappella team lead in University. I play Guitar, Drum, Piano, and Harmonica.",
    iconName: "Music",
    coverImage: "/src/PAD.jpeg",
  },
  {
    name: "Street & Architecture Photography",
    description: "Capturing patterns, structures, and symmetry in urban environments.",
    iconName: "Camera",
    coverImage: "/src/AM.jpeg",
  },
  {
    name: "Strategic Reading",
    description: "Exploring tech-forward system design, organizational leadership, and commercial histories.",
    iconName: "BookOpen",
    coverImage: "/src/Doc.jpeg",
  },
];

// ==========================================
// 6. RECENT PUBLISHED ARTICLES (LINKEDIN POSTS)
// ==========================================
export const ARTICLES: Article[] = [
  {
    title: "Architecting Salesforce & CPQ for $150M+ Scale: A Masterclass in RevOps Integrity",
    excerpt: "How we redesigned lead-to-opportunity flows, integrated advanced CPQ rulesets, and optimized schema models to support over 3,500 active global enterprise users without downstream data leakage.",
    publishDate: "July 2026",
    readTime: "6 min read",
    linkedInUrl: "https://www.linkedin.com/posts/baoyingyou_architecting-salesforce-cpq-for-scale-activity-7212345678901234567-xxxx",
    category: "RevOps & Architecture",
    featured: true,
  },
  {
    title: "The Ultimate Guide to Incident Management & Production SLA Controls in Commercial Tech Org",
    excerpt: "A look into establishing production support playbooks, running zero-downtime UAT, and managing complex escalations across hundreds of SaaS and e-commerce integrations.",
    publishDate: "June 2026",
    readTime: "5 min read",
    linkedInUrl: "https://www.linkedin.com/posts/baoyingyou_crm-incident-management-playbook-activity-7208311548231845120-B5xz",
    category: "Incident Ops & Systems",
  },
  {
    title: "Transitioning Standard CRM Pipelines into Intelligent Agentic Workspaces with Gemini",
    excerpt: "How server-side Google-GenAI SDK integrations can enrich raw lead attributes, automate service ticket categorization, and bolster overall workspace productivity.",
    publishDate: "May 2026",
    readTime: "8 min read",
    linkedInUrl: "https://www.linkedin.com/posts/baoyingyou_agentic-ai-salesforce-integration-activity-7195821034927394816-C3yz",
    category: "AI & Automation",
  }
];

