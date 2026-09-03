import React, { useState } from "react";
import {
  Layers,
  Cpu,
  Database,
  Workflow,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  FileCode,
  Table,
  ArrowRight,
  Server,
  Cloud,
  Lock,
  Boxes,
  Key,
  CreditCard,
  RefreshCw,
  Terminal,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export interface SubagentDetail {
  id: string;
  name: string;
  codeName: string;
  color: string;
  accentBg: string;
  borderClass: string;
  badgeColor: string;
  icon: string;
  mission: string;
  aiTech: {
    model: string;
    capabilities: string[];
    temperature: number;
    promptPattern: string;
  };
  middleware: {
    engine: string;
    messaging: string;
    protocol: string;
    slaResponse: string;
  };
  mcpTools: {
    toolName: string;
    description: string;
    inputSchema: string;
    outputSchema: string;
  }[];
  integrations: {
    partner: string;
    apiType: string;
    authMethod: string;
    scope: string;
  }[];
  sfCustomObjects: {
    apiName: string;
    label: string;
    relationship: string;
    purpose: string;
  }[];
  sfCustomFields: {
    field: string;
    object: string;
    type: string;
    description: string;
  }[];
  cpqRulesAndLogic: {
    ruleType: string;
    name: string;
    enforcement: string;
    failureAction: string;
  }[];
}

export const SUBAGENTS_DATA: SubagentDetail[] = [
  {
    id: "subagent-1",
    name: "Subagent #1: Order Capture & Quoting",
    codeName: "subagent.capture_quoting",
    color: "sky",
    accentBg: "bg-sky-50",
    borderClass: "border-sky-500",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
    icon: "⚡",
    mission: "Ingests buyer and sales rep requests, calculates hybrid subscriptions (seats + prepaid consumption credits), computes multi-year ramps, and configures SLA commitments with zero pricing drift.",
    aiTech: {
      model: "Gemini 2.0 Flash / Claude 3.5 Sonnet (Deterministic Structured Output Mode)",
      capabilities: [
        "Natural Language to Quote Parameter Extraction",
        "JSON-Schema Enforcement with Zero-Shot Validation",
        "Multi-year Compound Ramp Curve Math Engine",
        "Deterministic Currency & Proration Rounding"
      ],
      temperature: 0.0,
      promptPattern: "System prompt locks exact JSON schema. Negative constraints forbid inventing unlisted product SKUs."
    },
    middleware: {
      engine: "MuleSoft CloudHub 2.0 / Anypoint Runtime 4.5",
      messaging: "Apache Kafka Topic: `orders.quote.capture.v1` (Partitioned by AccountId)",
      protocol: "Async OpenAPI 3.1 REST & gRPC Streaming",
      slaResponse: "< 450ms p95 Latency"
    },
    mcpTools: [
      {
        toolName: "mcp_quote_calculator",
        description: "Executes deterministic ACV, TCV, blended tier discount, and multi-year ramp schedule math.",
        inputSchema: '{"seats": 500, "prepaidCredits": 100000, "rampYears": 3, "discountPercent": 18, "currency": "USD"}',
        outputSchema: '{"annualSubValue": 102500, "consumptionValue": 8000, "totalACV": 110500, "totalTCV": 348075, "grossMarginPct": 81.4}'
      },
      {
        toolName: "mcp_catalog_query",
        description: "Queries Salesforce CPQ active Pricebook2 and Product2 hierarchy for valid SKU bundles and features.",
        inputSchema: '{"channel": "Enterprise_LCS", "productFamily": "Core_Subscription", "includeAddOns": true}',
        outputSchema: '{"bundleSku": "SKU-ENT-HYBRID-2026", "allowedAddons": ["SKU-CREDIT-POOL-100K", "SKU-SLA-MISSION-CRITICAL"]}'
      }
    ],
    integrations: [
      {
        partner: "Salesforce CPQ API",
        apiType: "Apex REST (`/services/apexrest/SBQQ/ServiceRouter`)",
        authMethod: "OAuth 2.0 JWT Bearer Token",
        scope: "Full CPQ Quote & QuoteLine programmatic generation"
      },
      {
        partner: "DocuSign eSignature API",
        apiType: "REST API v2.1 (`/v2.1/accounts/{id}/envelopes`)",
        authMethod: "OAuth 2.0 User Impersonation (RSA Keypair)",
        scope: "Dynamic Order Form & MSA envelope assembly"
      }
    ],
    sfCustomObjects: [
      {
        apiName: "SBQQ__Quote__c",
        label: "CPQ Quote Header",
        relationship: "Lookup to Opportunity & Account",
        purpose: "Primary transaction envelope storing terms, blended margins, and contract totals."
      },
      {
        apiName: "SBQQ__QuoteLine__c",
        label: "CPQ Quote Line Item",
        relationship: "Master-Detail to SBQQ__Quote__c",
        purpose: "Individual line items storing recurring seat charges, rate cards, and SLA commitments."
      },
      {
        apiName: "Ramp_Schedule__c",
        label: "Contract Ramp Schedule",
        relationship: "Master-Detail to SBQQ__Quote__c",
        purpose: "Multi-year phased commitment schedule storing Year 1..5 seat counts, uplift caps, and ACV."
      }
    ],
    sfCustomFields: [
      {
        field: "Customer_Channel__c",
        object: "SBQQ__Quote__c",
        type: "Picklist (Enterprise_LCS, Self_Serve_PLG, Partner_Reseller)",
        description: "Controls automated routing rules and pricing discount guardrails."
      },
      {
        field: "SLA_Tier__c",
        object: "SBQQ__Quote__c",
        type: "Picklist (99.9% Standard, 99.99% Mission Critical, 99.999% Dedicated)",
        description: "Determines SLA penalty clauses and dedicated infrastructure provisioning hooks."
      },
      {
        field: "Prepaid_Credit_Pool__c",
        object: "SBQQ__Quote__c",
        type: "Currency(18,2)",
        description: "Stores dollar value of consumption credits drawn down by metering daemon."
      },
      {
        field: "Consumption_Overage_Rate__c",
        object: "SBQQ__QuoteLine__c",
        type: "Currency(10,4)",
        description: "Burst unit price applied when customer exhausts prepaid credit pool."
      }
    ],
    cpqRulesAndLogic: [
      {
        ruleType: "CPQ Product Rule (Validation)",
        name: "PR-01: Enterprise Seat Minimum Floor",
        enforcement: "Blocks saving quote if Customer_Channel__c = 'Enterprise_LCS' and Total_Seats__c < 250.",
        failureAction: "Raises error: 'Enterprise LCS contracts require minimum 250 seat commitment.'"
      },
      {
        ruleType: "CPQ Price Rule (Calculation)",
        name: "PR-02: Volume Discount Tier Matrix",
        enforcement: "Injects discount percent based on seat tiers: 250-499 seats = 10%, 500-999 = 18%, 1000+ = 25%.",
        failureAction: "Applies automatically during Quote Calculate event."
      }
    ]
  },
  {
    id: "subagent-2",
    name: "Subagent #2: Order Validation, Credit & Compliance",
    codeName: "subagent.validation_compliance",
    color: "amber",
    accentBg: "bg-amber-50",
    borderClass: "border-amber-500",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    icon: "🛡️",
    mission: "Enforces Deal Desk gross margin thresholds, validates corporate D&B credit ratings, executes 3-way Purchase Order line matching, and calculates real-time international VAT/sales taxes.",
    aiTech: {
      model: "Gemini 1.5 Pro / GPT-4o Vision + Structured Extraction",
      capabilities: [
        "Multimodal PDF Purchase Order OCR & Line Extraction",
        "Semantic 3-Way Matching (PO Lines vs Quote Lines vs Legal Terms)",
        "Automated Gross Margin Floor Verification (>75%)",
        "Compliance & Sanction Screening Lookups"
      ],
      temperature: 0.0,
      promptPattern: "Strict verification prompt returning binary approval state or specific line item mismatch variance."
    },
    middleware: {
      engine: "MuleSoft Anypoint Enterprise Bus & Enterprise Integration Patterns (EIP)",
      messaging: "Kafka Topic: `orders.compliance.audit.v1`",
      protocol: "Secure Mutual TLS (mTLS) REST Endpoints",
      slaResponse: "< 1.2 seconds (including D&B external query)"
    },
    mcpTools: [
      {
        toolName: "mcp_dnb_credit_evaluator",
        description: "Queries Dun & Bradstreet Direct+ API to extract PAYDEX score, maximum credit line, and delinquency risk.",
        inputSchema: '{"dunsNumber": "08-123-4567", "requestedCredit": 150000, "paymentTerms": "Net 30"}',
        outputSchema: '{"paydexScore": 88, "creditTier": "Tier 1 Approved", "approvedLimit": 1000000, "recommendation": "Approve Net 30"}'
      },
      {
        toolName: "mcp_margin_floor_checker",
        description: "Computes blended hosting COGS against contract price to ensure minimum gross margin floor.",
        inputSchema: '{"totalACV": 110500, "estimatedHostingCOGS": 20500, "minimumMarginThreshold": 75.0}',
        outputSchema: '{"blendedMargin": 81.44, "status": "AUTO_APPROVED", "dealDeskExceptionRequired": false}'
      },
      {
        toolName: "mcp_tax_nexus_calculator",
        description: "Calculates global jurisdiction tax rates (EU VAT reverse charge, UK VAT, US State Sales Tax).",
        inputSchema: '{"billingCountry": "US", "billingState": "CA", "taxExemptId": null, "subtotal": 110500}',
        outputSchema: '{"taxRate": 0.0825, "taxAmount": 9116.25, "nexusCode": "US-CA-SFO", "taxExempt": false}'
      }
    ],
    integrations: [
      {
        partner: "Dun & Bradstreet Direct+",
        apiType: "REST API (`https://plus.dnb.com/v1/data/duns`)",
        authMethod: "OAuth 2.0 Client Credentials",
        scope: "Corporate credit risk, financial stress score, global company family tree"
      },
      {
        partner: "Avalara AvaTax / Stripe Tax",
        apiType: "REST API (`/api/v2/transactions/create`)",
        authMethod: "Basic Auth / Bearer API Key",
        scope: "Real-time cross-border tax calculation and address verification"
      },
      {
        partner: "Slack Bolt API",
        apiType: "Webhooks & Block Kit (`chat.postMessage`)",
        authMethod: "Bot User OAuth Token",
        scope: "Interactive 1-click Deal Desk executive approval requests"
      }
    ],
    sfCustomObjects: [
      {
        apiName: "Credit_Audit_Log__c",
        label: "Credit Audit Log",
        relationship: "Lookup to Account",
        purpose: "Historical record of D&B inquiries, risk ratings, and authorized payment credit ceilings."
      },
      {
        apiName: "Deal_Desk_Approval__c",
        label: "Deal Desk Approval Exception",
        relationship: "Lookup to SBQQ__Quote__c",
        purpose: "Audit trail for discount exceptions, non-standard SLA terms, and executive sign-offs."
      },
      {
        apiName: "Purchase_Order_Line__c",
        label: "Customer PO Line Item",
        relationship: "Lookup to SBQQ__Quote__c",
        purpose: "Parsed lines from buyer-submitted PDF POs used for automated programmatic reconciliation."
      }
    ],
    sfCustomFields: [
      {
        field: "Credit_Rating_Tier__c",
        object: "Account",
        type: "Picklist (Tier 1 Approved, Tier 2 Deposit Required, Tier 3 Prepay Only)",
        description: "Dictates eligible payment terms (Net 30 vs Net 60 vs Prepaid Credit Card)."
      },
      {
        field: "PO_Match_Status__c",
        object: "SBQQ__Quote__c",
        type: "Picklist (Matched 100%, Amount Mismatch, Term Variance, Missing PO)",
        description: "Automated indicator populated by OCR comparison agent."
      },
      {
        field: "Deal_Desk_Approval_State__c",
        object: "SBQQ__Quote__c",
        type: "Picklist (Auto_Approved, VP_Pending, Executive_Approved, Rejected)",
        description: "Tracks lifecycle of governance workflows across CPQ approvals."
      }
    ],
    cpqRulesAndLogic: [
      {
        ruleType: "Salesforce Advanced Approvals (SBAA)",
        name: "AA-01: Executive Discount Approval Escalation",
        enforcement: "Routes quote to VP of Sales Ops if discount > 20%, and to CFO if discount > 30%.",
        failureAction: "Locks Quote in 'Pending Approval' until Slack interactive button is clicked."
      },
      {
        ruleType: "Validation Rule",
        name: "VR-02: Block Contracting Without Validated PO",
        enforcement: "AND(ISPICKVAL(SBQQ__Status__c, 'Approved'), ISPICKVAL(PO_Match_Status__c, 'Amount Mismatch'))",
        failureAction: "Prevents quote progression until PO line variance is reconciled."
      }
    ]
  },
  {
    id: "subagent-3",
    name: "Subagent #3: Fulfillment & Cloud IAM Provisioning",
    codeName: "subagent.fulfillment_iam",
    color: "purple",
    accentBg: "bg-purple-50",
    borderClass: "border-purple-500",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    icon: "☁️",
    mission: "Automates digital goods fulfillment immediately upon contract signing, spinning up single-tenant AWS/GCP VPCs or multi-tenant workspaces and syncing Okta SCIM v2 directories.",
    aiTech: {
      model: "Autonomous Infrastructure Controller Agent (Heuristic + Health Validation LLM)",
      capabilities: [
        "Dynamic Terraform & Helm Variable Injection",
        "Single-Tenant vs Multi-Tenant Topology Selection",
        "Automated SCIM Directory Role Mapping",
        "Cryptographic License Key Generation & Signature"
      ],
      temperature: 0.0,
      promptPattern: "Evaluates contract SKU payload and selects cloud topology profile."
    },
    middleware: {
      engine: "AWS EventBridge & GCP Cloud Pub/Sub",
      messaging: "Kafka Topic: `provisioning.tenant.orchestrate.v1`",
      protocol: "CloudEvents v1.0 standard JSON payloads",
      slaResponse: "< 15 seconds for Self-Serve containers, < 8 minutes for Dedicated VPC"
    },
    mcpTools: [
      {
        toolName: "mcp_cloud_cluster_provisioner",
        description: "Spins up cloud compute namespaces, isolated database instances, and dedicated VPC routing tables.",
        inputSchema: '{"tenantTier": "dedicated_vpc", "cloudProvider": "AWS", "region": "us-east-1", "clusterName": "vpc_corp_acme_prod"}',
        outputSchema: '{"tenantId": "ten_auto_8091", "vpcId": "vpc-09a8bc4", "endpoint": "https://acme.cloud.internal", "status": "ACTIVE"}'
      },
      {
        toolName: "mcp_okta_scim_connector",
        description: "Configures SAML 2.0 / OIDC identity federation and provisions user rosters via SCIM v2.0 API.",
        inputSchema: '{"tenantId": "ten_auto_8091", "oktaOrgUrl": "https://acme.okta.com", "licensedSeats": 500}',
        outputSchema: '{"scimEndpoint": "/scim/v2/Users", "adminRosterCreated": true, "authMethod": "SAML2_ENTERPRISE_SSO"}'
      },
      {
        toolName: "mcp_api_license_keygen",
        description: "Generates RS256 signed JWT enterprise license keys encoding purchased feature flags and limits.",
        inputSchema: '{"tenantId": "ten_auto_8091", "tier": "Enterprise", "features": ["HYBRID_METERING", "ADVANCED_AUDIT", "CUSTOM_SLA"]}',
        outputSchema: '{"licenseKey": "eyJhbGciOiJSUzI1NiIs...", "expiresAt": "2029-09-03T00:00:00Z"}'
      }
    ],
    integrations: [
      {
        partner: "AWS / Google Cloud Control Plane",
        apiType: "Terraform Cloud API & AWS SDK v3",
        authMethod: "AWS IAM Roles Anywhere / Workload Identity Federation",
        scope: "EKS cluster namespace, Aurora Serverless v2 PostgreSQL database provisioning"
      },
      {
        partner: "Okta / Microsoft Entra ID",
        apiType: "SCIM v2.0 REST Protocol (`/scim/v2/Users`, `/scim/v2/Groups`)",
        authMethod: "Bearer Token (OAuth 2.0 Token)",
        scope: "Automated JIT user provisioning and role assignments"
      },
      {
        partner: "HashiCorp Vault KMS",
        apiType: "REST API (`/v1/transit/encrypt`)",
        authMethod: "AppRole Authentication",
        scope: "Dedicated tenant encryption key management"
      }
    ],
    sfCustomObjects: [
      {
        apiName: "Cloud_Tenant__c",
        label: "Cloud Tenant Registry",
        relationship: "Lookup to Contract & Account",
        purpose: "Stores tenant ID, cloud cluster ARN, URL endpoint, and live health ping metrics."
      },
      {
        apiName: "Tenant_Seat_Allocation__c",
        label: "Tenant Seat Allocation",
        relationship: "Master-Detail to Cloud_Tenant__c",
        purpose: "Real-time ledger tracking active provisioned users against purchased contract seats."
      },
      {
        apiName: "Provisioning_Event_Log__c",
        label: "Provisioning Audit Event",
        relationship: "Lookup to Cloud_Tenant__c",
        purpose: "Immutable audit log recording bootstrap duration, errors, and retry milestones."
      }
    ],
    sfCustomFields: [
      {
        field: "Cloud_Tenant_ID__c",
        object: "Contract",
        type: "Text(64) [External ID]",
        description: "Unique external identifier linking Salesforce Contract to Cloud Infrastructure."
      },
      {
        field: "Provisioning_Duration_Seconds__c",
        object: "Contract",
        type: "Number(6,2)",
        description: "Benchmark duration tracking fulfillment SLA compliance."
      },
      {
        field: "Feature_Flag_Payload__c",
        object: "Cloud_Tenant__c",
        type: "Long Text Area(32768)",
        description: "JSON array of unlocked features injected into tenant environment."
      }
    ],
    cpqRulesAndLogic: [
      {
        ruleType: "Change Data Capture (CDC)",
        name: "CDC-01: Contract Activation Event",
        enforcement: "Triggers MuleSoft Event Listener when Contract.Status transitions to 'Activated'.",
        failureAction: "Publishes `Tenant_Provision_Request__e` platform event to AWS EventBridge."
      },
      {
        ruleType: "Platform Event",
        name: "PE-02: Tenant_Provision_Request__e",
        enforcement: "Decouples Salesforce transaction from asynchronous cloud infrastructure creation.",
        failureAction: "Dead-letter queue (DLQ) retry up to 3 times before raising PagerDuty alert."
      }
    ]
  },
  {
    id: "subagent-4",
    name: "Subagent #4: Billing & ASC 606 Revenue Recognition",
    codeName: "subagent.billing_revenue",
    color: "emerald",
    accentBg: "bg-emerald-50",
    borderClass: "border-emerald-500",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: "💳",
    mission: "Dispatches NetSuite ERP sales orders, manages Stripe card tokenization, tracks real-time consumption credit drawdowns, and generates audit-ready dual ASC 606 revenue schedules.",
    aiTech: {
      model: "ASC 606 Compliance & Revenue Amortization Daemon",
      capabilities: [
        "Dual Performance Obligation (POB) Decomposition",
        "Ratable vs Point-in-Time Consumption Amortization",
        "Credit Burn Rate Run-Rate Projection",
        "Automated Reconciliation Anomaly Detection"
      ],
      temperature: 0.0,
      promptPattern: "Deterministic mathematical allocation of Standalone Selling Price (SSP) across contract lines."
    },
    middleware: {
      engine: "MuleSoft NetSuite ERP Connector (SuiteTalk SOAP/REST)",
      messaging: "Kafka Topic: `billing.telemetry.events.v1`",
      protocol: "Batch Microservices & Webhook Handlers",
      slaResponse: "< 2.5s invoice generation; daily midnight Rev-Rec schedule batch"
    },
    mcpTools: [
      {
        toolName: "mcp_netsuite_invoice_sync",
        description: "Generates NetSuite Sales Orders, Accounts Receivable line invoices, and GL posting journals.",
        inputSchema: '{"contractId": "8008c000003ABC", "paymentTerms": "Net 30", "invoiceAmount": 110500, "poNumber": "PO-8829-CORP"}',
        outputSchema: '{"netsuiteSoId": "SO-8831", "netsuiteInvoiceId": "INV-8831", "syncStatus": "POSTED", "glCode": "4000-SUBSCRIPTION-REV"}'
      },
      {
        toolName: "mcp_stripe_subscription_charger",
        description: "Tokenizes payment methods, executes 3D-Secure charge, and schedules recurring monthly auto-debit.",
        inputSchema: '{"customerId": "cus_N8x2...", "paymentMethodId": "pm_card_visa", "amountCents": 99000, "currency": "usd"}',
        outputSchema: '{"chargeId": "ch_3M4...", "status": "succeeded", "riskScore": 2, "receiptUrl": "https://pay.stripe.com/receipts/..."}'
      },
      {
        toolName: "mcp_asc606_amortization_builder",
        description: "Builds monthly amortized revenue recognition schedules adhering to US GAAP / IFRS 15.",
        inputSchema: '{"contractStartDate": "2026-09-03", "contractEndDate": "2029-09-02", "totalValue": 348075, "pobType": "Ratable_Access"}',
        outputSchema: '{"monthlyAmortizationARR": 9668.75, "recognizedDay1": 0, "deferredDay1": 348075, "auditState": "GAAP_COMPLIANT"}'
      }
    ],
    integrations: [
      {
        partner: "NetSuite ERP (Oracle)",
        apiType: "SuiteTalk REST Web Services v2024.1",
        authMethod: "Token-Based Authentication (TBA / HMAC-SHA256)",
        scope: "Sales Order, Invoice, Customer, Revenue Recognition Schedule records"
      },
      {
        partner: "Stripe Billing / Zuora",
        apiType: "REST API (`/v1/invoices`, `/v1/subscriptions`)",
        authMethod: "Secret API Key + Webhook Signing Secrets",
        scope: "Credit card tokenization, multi-currency debiting, and webhook notifications"
      },
      {
        partner: "Snowflake Data Cloud",
        apiType: "Snowflake SQL REST API v2",
        authMethod: "Key-Pair Authentication",
        scope: "High-volume API consumption telemetry ingestion and usage aggregations"
      }
    ],
    sfCustomObjects: [
      {
        apiName: "Revenue_Schedule__c",
        label: "ASC 606 Revenue Schedule",
        relationship: "Master-Detail to Contract",
        purpose: "Monthly ledger of recognized vs deferred revenue split across ratable and point-in-time POBs."
      },
      {
        apiName: "Usage_Summary_Batch__c",
        label: "Usage Consumption Snapshot",
        relationship: "Master-Detail to Cloud_Tenant__c",
        purpose: "Daily drawdown batch subtracting consumed API units from prepaid credit balance."
      },
      {
        apiName: "ERP_Billing_Sync__c",
        label: "ERP Integration Sync Log",
        relationship: "Lookup to SBQQ__Quote__c",
        purpose: "Maintains synchronization tokens and reconciliation status with NetSuite General Ledger."
      }
    ],
    sfCustomFields: [
      {
        field: "Payment_Rail__c",
        object: "Contract",
        type: "Picklist (Net 30 ACH/Wire, Net 60 Corporate, Stripe Auto-Debit)",
        description: "Defines whether customer pays via manual invoice or automated credit card charge."
      },
      {
        field: "ASC606_Audit_Status__c",
        object: "Contract",
        type: "Picklist (Compliant, Variance Detected, Re-Amortizing)",
        description: "Automated flag certifying audit compliance with ASC 606 revenue standards."
      },
      {
        field: "Performance_Obligation_ID__c",
        object: "SBQQ__Subscription__c",
        type: "Text(50)",
        description: "Links line items to distinct accounting revenue treatment categories."
      }
    ],
    cpqRulesAndLogic: [
      {
        ruleType: "Salesforce Billing Rule",
        name: "BR-01: Split Charge Type Rule",
        enforcement: "Assigns 'Recurring' billing schedule to seat licenses and 'Usage-Based' schedule to credit draws.",
        failureAction: "Executed automatically during Order Generation from Quote."
      },
      {
        ruleType: "Price Rule",
        name: "PR-03: Prepaid Drawdown Threshold Trigger",
        enforcement: "When remaining credit balance falls below 15%, generates automated add-on top-up task for CSM.",
        failureAction: "Dispatches proactive replenishment email to customer admin."
      }
    ]
  },
  {
    id: "subagent-5",
    name: "Subagent #5: Contract Lifecycle, Renewals & Churn Guard",
    codeName: "subagent.lifecycle_churn",
    color: "rose",
    accentBg: "bg-rose-50",
    borderClass: "border-rose-500",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    icon: "🔄",
    mission: "Manages mid-cycle contract modifications, co-termed seat additions, SKU swaps, proactive 90-day renewal uplifts (+7%), and smart dunning sequences for failed payments.",
    aiTech: {
      model: "Predictive Churn Forecasting & Autonomous Retention Agent",
      capabilities: [
        "Product Telemetry & Usage Drop-off Detection",
        "Automated Co-Terming End-Date Calculation & Proration",
        "Machine-Timed Dunning Payment Recovery Orchestration",
        "Contractual Uplift Escalation Indexing (+7% CPI Cap)"
      ],
      temperature: 0.1,
      promptPattern: "Analyzes telemetry signals, health scores, and payment failures to formulate retention action."
    },
    middleware: {
      engine: "Salesforce Agentforce Scheduler & Webhook Daemon",
      messaging: "Kafka Topic: `contract.lifecycle.events.v1`",
      protocol: "Scheduled Crons + Inbound Stripe Webhooks (`invoice.payment_failed`)",
      slaResponse: "Runs continuous daily evaluation batches; real-time response to payment failures"
    },
    mcpTools: [
      {
        toolName: "mcp_coterm_amendment_engine",
        description: "Calculates exact pro-rated dollar values and locks end dates for mid-cycle seat expansions.",
        inputSchema: '{"activeContractId": "8008c000003ABC", "additionalSeats": 100, "amendmentStartDate": "2027-03-01"}',
        outputSchema: '{"masterEndDate": "2029-09-02", "remainingDays": 916, "proratedSubtotal": 38450, "amendmentQuoteId": "Q-0921"}'
      },
      {
        toolName: "mcp_renewal_uplift_orchestrator",
        description: "Generates renewal opportunity at T-90 days, applying contractual +7% price uplift cap.",
        inputSchema: '{"expiringContractId": "8008c000003ABC", "baselineACV": 110500, "contractualCapPct": 7.0}',
        outputSchema: '{"renewalACV": 118235, "renewalOppId": "0068c000004DEF", "renewalQuoteId": "Q-8840", "status": "Quoted"}'
      },
      {
        toolName: "mcp_smart_dunning_retention",
        description: "Executes 4-phase smart retry sequence (Day 1, 3, 7, 14) and triggers soft feature throttling.",
        inputSchema: '{"customerId": "cus_N8x2...", "failedInvoiceId": "in_1M5...", "attemptCount": 2}',
        outputSchema: '{"nextRetryDate": "2026-09-10", "gracePeriodActive": true, "throttleStatus": "Soft Warning Displayed"}'
      }
    ],
    integrations: [
      {
        partner: "Gainsight / ChurnZero",
        apiType: "REST API v1 (`/v1/customer-health`)",
        authMethod: "API Access Key",
        scope: "Retrieves customer health scores, feature adoption depth, and NPS survey results"
      },
      {
        partner: "Stripe Smart Dunning Engine",
        apiType: "Webhooks (`invoice.payment_failed`, `customer.subscription.trial_will_end`)",
        authMethod: "HMAC Webhook Signature Verification",
        scope: "Machine-learning payment retry optimization and card updater service"
      },
      {
        partner: "DocuSign Auto-Renew Envelopes",
        apiType: "eSignature REST API v2.1",
        authMethod: "OAuth 2.0 JWT",
        scope: "Automatic distribution of renewal order confirmation notices"
      }
    ],
    sfCustomObjects: [
      {
        apiName: "Renewal_Pipeline_Forecast__c",
        label: "Renewal Pipeline Forecast",
        relationship: "Lookup to Opportunity & Contract",
        purpose: "AI-projected renewal ACV, retention probability, and contractual price index."
      },
      {
        apiName: "Dunning_Action_History__c",
        label: "Dunning Action Audit Log",
        relationship: "Lookup to Account",
        purpose: "Chronological log of failed card attempts, automated notifications, and grace period states."
      },
      {
        apiName: "Contract_Amendment_Audit__c",
        label: "Contract Amendment Record",
        relationship: "Master-Detail to Contract",
        purpose: "Audits mid-cycle seat additions, SKU swaps, and historical prorations."
      }
    ],
    sfCustomFields: [
      {
        field: "SBQQ__RenewalForecast__c",
        object: "Contract",
        type: "Checkbox",
        description: "Triggers Salesforce CPQ background engine to spawn Renewal Opportunity at T-90 days."
      },
      {
        field: "SBQQ__RenewalQuoted__c",
        object: "Contract",
        type: "Checkbox",
        description: "Triggers CPQ to generate draft Renewal Quote with +7% uplift at T-60 days."
      },
      {
        field: "Contractual_Uplift_Cap_Pct__c",
        object: "Contract",
        type: "Percent(5,2)",
        description: "Contractually agreed maximum annual price escalator (typically 5% to 7%)."
      },
      {
        field: "Dunning_State__c",
        object: "Contract",
        type: "Picklist (Normal, Grace_Period_Day_1_7, Throttled_Day_8_14, Suspended)",
        description: "Controls tenant feature availability during payment delinquency."
      }
    ],
    cpqRulesAndLogic: [
      {
        ruleType: "CPQ Renewal Batch Logic",
        name: "RB-01: 90/60 Day Proactive Renewal Pipeline",
        enforcement: "Automated cron sets RenewalForecast=true at T-90, then RenewalQuoted=true at T-60.",
        failureAction: "Ensures 100% of expiring contracts are quoted without sales rep manual effort."
      },
      {
        ruleType: "CPQ Amendment Rules",
        name: "AR-02: Co-Term End Date Lock",
        enforcement: "Forces all add-on lines added during contract term to inherit master Contract.EndDate.",
        failureAction: "Guarantees unified single-contract renewal anniversary."
      },
      {
        ruleType: "Workflow & Cloud Webhook",
        name: "WF-03: Progressive Dunning Feature Throttling",
        enforcement: "On Day 8 of uncollected debt, flips Cloud_Tenant__c.Status to 'Throttled Read-Only'.",
        failureAction: "Protects customer data from hard cutoff while prompting buyer to update card."
      }
    ]
  }
];

export const SubagentsTechToolingSpecs: React.FC = () => {
  const [selectedSubagentId, setSelectedSubagentId] = useState<string>("all");
  const [activeViewMode, setActiveViewMode] = useState<"cards" | "matrix" | "json">("cards");
  const [copiedState, setCopiedState] = useState<boolean>(false);

  const filteredSubagents = selectedSubagentId === "all" 
    ? SUBAGENTS_DATA 
    : SUBAGENTS_DATA.filter((s) => s.id === selectedSubagentId);

  const handleCopySpec = () => {
    const summaryText = JSON.stringify(SUBAGENTS_DATA, null, 2);
    navigator.clipboard.writeText(summaryText);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-ink font-sans">
      {/* HEADER SECTION */}
      <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-zinc-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                Architectural Blueprint • RevOps &amp; CPQ Engineering
              </span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-sky-100 text-sky-900 border border-sky-300">
                5 Subagents Specification
              </span>
            </div>
            <h3 className="font-hand text-2xl md:text-3xl font-extrabold text-ink tracking-tight flex items-center gap-2">
              <span>SaaS CPQ &amp; Order-to-Cash: 5 Subagents Technical Architecture &amp; Tooling Matrix</span>
            </h3>
            <p className="font-sans text-xs md:text-sm text-zinc-650 max-w-3xl leading-relaxed">
              Complete technical breakdown of the <strong>AI models</strong>, <strong>MuleSoft middleware</strong>, <strong>Model Context Protocol (MCP) tools</strong>, <strong>external integrations</strong>, <strong>Salesforce custom objects/fields</strong>, and <strong>CPQ declarative rules</strong> powering autonomous end-to-end Quote-to-Cash execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopySpec}
              className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-hand text-xs font-bold border-2 border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-1.5 cursor-pointer transition-all active:translate-y-0.5"
            >
              {copiedState ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-zinc-600" />}
              <span>{copiedState ? "Copied JSON Spec!" : "Copy Architecture Spec"}</span>
            </button>
          </div>
        </div>

        {/* HIGH-LEVEL METRIC TILES */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="bg-sky-50 border-2 border-sky-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-sky-800 uppercase block">Subagents</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-hand text-2xl font-black text-sky-950">5 Specialized</span>
            </div>
            <span className="text-[10px] text-sky-700 font-mono">Capture, Validate, Fulfill, Bill, Renew</span>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block">MCP Tool Bindings</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-hand text-2xl font-black text-emerald-950">14 Registered</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-mono">Strict JSON Schema validated</span>
          </div>

          <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-purple-800 uppercase block">Salesforce Schema</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-hand text-2xl font-black text-purple-950">10 Objects • 18 Fields</span>
            </div>
            <span className="text-[10px] text-purple-700 font-mono">CPQ + Billing + Cloud Tenant</span>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3">
            <span className="font-mono text-[10px] font-bold text-amber-800 uppercase block">Middleware &amp; ERP</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-hand text-2xl font-black text-amber-950">MuleSoft + NetSuite</span>
            </div>
            <span className="text-[10px] text-amber-700 font-mono">Kafka event bus &amp; ASC 606 Rev-Rec</span>
          </div>
        </div>

        {/* NAVIGATION CONTROLS & SUBAGENT FILTER CHIPS */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Subagent Selector */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedSubagentId("all")}
              className={`px-3 py-1.5 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer ${
                selectedSubagentId === "all"
                  ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                  : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200"
              }`}
            >
              All 5 Subagents
            </button>
            {SUBAGENTS_DATA.map((subagent, idx) => (
              <button
                key={subagent.id}
                type="button"
                onClick={() => setSelectedSubagentId(subagent.id)}
                className={`px-3 py-1.5 rounded-lg font-hand text-xs font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedSubagentId === subagent.id
                    ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]"
                    : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200"
                }`}
              >
                <span>{subagent.icon}</span>
                <span>#{idx + 1}</span>
                <span className="hidden sm:inline">{subagent.name.split(":")[1]}</span>
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-300">
            <button
              type="button"
              onClick={() => setActiveViewMode("cards")}
              className={`px-2.5 py-1 rounded-lg font-hand text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                activeViewMode === "cards" ? "bg-white text-ink shadow-xs border border-zinc-300" : "text-zinc-600 hover:text-ink"
              }`}
            >
              <Boxes className="h-3 w-3" />
              <span>Deep-Dive Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode("matrix")}
              className={`px-2.5 py-1 rounded-lg font-hand text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                activeViewMode === "matrix" ? "bg-white text-ink shadow-xs border border-zinc-300" : "text-zinc-600 hover:text-ink"
              }`}
            >
              <Table className="h-3 w-3" />
              <span>Summary Matrix Table</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode("json")}
              className={`px-2.5 py-1 rounded-lg font-hand text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                activeViewMode === "json" ? "bg-white text-ink shadow-xs border border-zinc-300" : "text-zinc-600 hover:text-ink"
              }`}
            >
              <FileCode className="h-3 w-3" />
              <span>JSON Schema</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: DEEP-DIVE ARCHITECTURAL CARDS */}
      {activeViewMode === "cards" && (
        <div className="space-y-6">
          {filteredSubagents.map((subagent, index) => (
            <div
              key={subagent.id}
              className="bg-white border-3 border-ink rounded-2xl p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-5 animate-fade-in"
            >
              {/* Card Title & Code Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-zinc-200 pb-3.5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-zinc-100 border-2 border-ink flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                    {subagent.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-hand font-extrabold text-xl text-ink">
                        {subagent.name}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${subagent.badgeColor}`}>
                        {subagent.codeName}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-zinc-600 mt-0.5 leading-snug">
                      {subagent.mission}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase block">Response SLA</span>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                    {subagent.middleware.slaResponse}
                  </span>
                </div>
              </div>

              {/* 3-Column Architectural Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Column 1: AI Model & Middleware Engine (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* AI Model Specification */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <Cpu className="h-4 w-4 text-sky-600" />
                      <span className="font-mono uppercase text-[11px]">AI Model &amp; Reasoning</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="font-mono text-[11px] font-bold text-zinc-900 bg-white p-1.5 rounded border border-zinc-200">
                        {subagent.aiTech.model}
                      </div>
                      <div className="text-[11px] text-zinc-600">
                        <strong className="text-zinc-800">Prompting &amp; Guardrails:</strong> {subagent.aiTech.promptPattern}
                      </div>
                      <div className="pt-1">
                        <strong className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Core Autonomous Capabilities:</strong>
                        <ul className="space-y-1 text-[11px] text-zinc-700">
                          {subagent.aiTech.capabilities.map((cap, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Middleware & Message Bus */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <Workflow className="h-4 w-4 text-purple-600" />
                      <span className="font-mono uppercase text-[11px]">Middleware &amp; Messaging</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between py-1 border-b border-zinc-200">
                        <span className="text-zinc-500 font-mono text-[10px]">Engine:</span>
                        <span className="font-bold text-zinc-800 text-[11px]">{subagent.middleware.engine}</span>
                      </div>
                      <div className="py-1 border-b border-zinc-200">
                        <span className="text-zinc-500 font-mono text-[10px] block">Event Stream:</span>
                        <span className="font-mono text-[10.5px] text-indigo-700 font-bold break-all">{subagent.middleware.messaging}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-zinc-500 font-mono text-[10px]">Protocol:</span>
                        <span className="font-mono text-[11px] text-zinc-700">{subagent.middleware.protocol}</span>
                      </div>
                    </div>
                  </div>

                  {/* External Third-Party APIs */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <ExternalLink className="h-4 w-4 text-emerald-600" />
                      <span className="font-mono uppercase text-[11px]">External Third-Party APIs</span>
                    </div>
                    <div className="space-y-2">
                      {subagent.integrations.map((integ, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-zinc-200 text-xs space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-zinc-900">{integ.partner}</span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">{integ.authMethod}</span>
                          </div>
                          <div className="font-mono text-[10px] text-sky-700">{integ.apiType}</div>
                          <div className="text-[11px] text-zinc-650 leading-tight">{integ.scope}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Model Context Protocol (MCP) Tool Bindings (4 cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <Terminal className="h-4 w-4 text-emerald-600" />
                      <span className="font-mono uppercase text-[11px]">Registered MCP Tool Bindings ({subagent.mcpTools.length})</span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-bold">
                      JSON-RPC 2.0
                    </span>
                  </div>

                  <div className="space-y-3">
                    {subagent.mcpTools.map((tool, i) => (
                      <div key={i} className="bg-slate-900 text-slate-100 rounded-xl p-3 space-y-2 border-2 border-slate-700 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            {tool.toolName}
                          </span>
                          <span className="text-[9.5px] font-mono text-slate-400">MCP Tool</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">
                          {tool.description}
                        </p>
                        
                        <div className="space-y-1 pt-1">
                          <span className="text-[9.5px] font-mono uppercase text-slate-400 block font-bold">Sample Arguments Schema:</span>
                          <pre className="bg-slate-950 p-2 rounded text-[10px] font-mono text-sky-300 overflow-x-auto leading-tight border border-slate-800">
                            {tool.inputSchema}
                          </pre>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9.5px] font-mono uppercase text-slate-400 block font-bold">Deterministic Output Response:</span>
                          <pre className="bg-slate-950 p-2 rounded text-[10px] font-mono text-emerald-300 overflow-x-auto leading-tight border border-slate-800">
                            {tool.outputSchema}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: Salesforce Custom Objects, Fields & CPQ Rules (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Salesforce Custom Objects */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <Database className="h-4 w-4 text-sky-700" />
                      <span className="font-mono uppercase text-[11px]">Salesforce Custom Objects</span>
                    </div>
                    <div className="space-y-2">
                      {subagent.sfCustomObjects.map((obj, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-zinc-200 text-xs space-y-0.5">
                          <div className="flex items-baseline justify-between">
                            <span className="font-mono font-bold text-sky-900 text-[11px]">{obj.apiName}</span>
                            <span className="text-[9.5px] font-mono text-zinc-500">{obj.relationship}</span>
                          </div>
                          <div className="text-[11px] font-bold text-zinc-700">{obj.label}</div>
                          <p className="text-[10.5px] text-zinc-600 leading-snug">{obj.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Salesforce Custom Fields */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <Key className="h-4 w-4 text-amber-600" />
                      <span className="font-mono uppercase text-[11px]">Key Salesforce Custom Fields</span>
                    </div>
                    <div className="space-y-1.5">
                      {subagent.sfCustomFields.map((f, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-zinc-200 text-xs space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-zinc-900 text-[11px]">{f.field}</span>
                            <span className="font-mono text-[9px] text-zinc-500 bg-zinc-100 px-1 rounded">{f.object}</span>
                          </div>
                          <div className="font-mono text-[10px] text-indigo-700">{f.type}</div>
                          <p className="text-[10.5px] text-zinc-600 leading-tight">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CPQ Rules & Declarative Logic */}
                  <div className="bg-zinc-50 border-2 border-zinc-300 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                      <ShieldCheck className="h-4 w-4 text-red-600" />
                      <span className="font-mono uppercase text-[11px]">CPQ Rules &amp; Declarative Logic</span>
                    </div>
                    <div className="space-y-2">
                      {subagent.cpqRulesAndLogic.map((rule, i) => (
                        <div key={i} className="bg-white p-2 rounded-lg border border-zinc-200 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                              {rule.ruleType}
                            </span>
                          </div>
                          <div className="font-bold text-zinc-800 text-[11px]">{rule.name}</div>
                          <div className="text-[10.5px] text-zinc-650 leading-snug">
                            <strong className="text-zinc-700">Enforcement:</strong> {rule.enforcement}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            <strong>Action:</strong> {rule.failureAction}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: FULL PM COMPARISON MATRIX TABLE */}
      {activeViewMode === "matrix" && (
        <div className="bg-white border-3 border-ink rounded-2xl p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-4 animate-fade-in overflow-x-auto">
          <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3">
            <div>
              <h4 className="font-hand text-xl font-bold text-ink">
                Side-by-Side 5-Subagent Architectural Comparison Table
              </h4>
              <p className="font-sans text-xs text-zinc-600">
                Cross-functional matrix mapping subagents against all technical layers from AI model to Salesforce schema.
              </p>
            </div>
            <span className="font-mono text-[10px] bg-zinc-100 text-zinc-800 px-2 py-1 rounded border border-zinc-300">
              5 Stages • 7 Technical Dimensions
            </span>
          </div>

          <table className="w-full text-left border-collapse min-w-[900px] text-xs">
            <thead>
              <tr className="border-b-2 border-ink bg-zinc-100 font-mono text-[11px] text-zinc-800">
                <th className="p-2.5">Subagent</th>
                <th className="p-2.5">AI Engine</th>
                <th className="p-2.5">Middleware &amp; Bus</th>
                <th className="p-2.5">Key MCP Tools</th>
                <th className="p-2.5">Integrations</th>
                <th className="p-2.5">SF Custom Objects</th>
                <th className="p-2.5">CPQ Rules &amp; Logic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-sans">
              {SUBAGENTS_DATA.map((subagent, index) => (
                <tr key={subagent.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-2.5 align-top">
                    <div className="font-hand font-bold text-sm text-ink flex items-center gap-1.5">
                      <span>{subagent.icon}</span>
                      <span>#{index + 1}</span>
                    </div>
                    <span className="font-mono text-[9.5px] text-zinc-500 block">{subagent.codeName}</span>
                    <span className="text-[10px] text-zinc-600 block mt-1 line-clamp-2 max-w-[150px]">{subagent.mission}</span>
                  </td>
                  <td className="p-2.5 align-top">
                    <span className="font-mono font-bold text-[10.5px] text-sky-800 block">{subagent.aiTech.model.split("/")[0]}</span>
                    <span className="text-[10px] text-zinc-500">Temp: {subagent.aiTech.temperature}</span>
                  </td>
                  <td className="p-2.5 align-top">
                    <span className="font-bold text-zinc-800 block text-[11px]">{subagent.middleware.engine.split("/")[0]}</span>
                    <span className="font-mono text-[9.5px] text-indigo-700 block mt-0.5">{subagent.middleware.protocol}</span>
                    <span className="font-mono text-[9px] text-emerald-700 bg-emerald-50 px-1 rounded inline-block mt-1">{subagent.middleware.slaResponse}</span>
                  </td>
                  <td className="p-2.5 align-top">
                    <ul className="space-y-1">
                      {subagent.mcpTools.map((t, i) => (
                        <li key={i} className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {t.toolName}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2.5 align-top">
                    <ul className="space-y-1">
                      {subagent.integrations.map((integ, i) => (
                        <li key={i} className="text-[10.5px] text-zinc-700">
                          <strong>{integ.partner}</strong>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2.5 align-top">
                    <ul className="space-y-1">
                      {subagent.sfCustomObjects.map((obj, i) => (
                        <li key={i} className="font-mono text-[10px] text-purple-800 bg-purple-50 px-1 rounded border border-purple-200">
                          {obj.apiName}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2.5 align-top">
                    <ul className="space-y-1">
                      {subagent.cpqRulesAndLogic.map((rule, i) => (
                        <li key={i} className="text-[10px] text-zinc-700">
                          <span className="font-bold text-red-700">{rule.ruleType.split(" ")[1] || rule.ruleType}:</span> {rule.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: FULL JSON ARCHITECTURE SCHEMA SPEC */}
      {activeViewMode === "json" && (
        <div className="bg-slate-900 border-3 border-ink rounded-2xl p-5 md:p-6 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] space-y-3 animate-fade-in text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-400" />
              <span className="font-mono text-sm font-bold text-emerald-400">
                subagents_cpq_architecture_spec.json
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopySpec}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono text-xs border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedState ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedState ? "Copied!" : "Copy Full JSON"}</span>
            </button>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-sky-300 overflow-x-auto max-h-[600px] border border-slate-800 leading-relaxed">
            {JSON.stringify(SUBAGENTS_DATA, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
