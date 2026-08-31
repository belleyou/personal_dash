import { GTMVendor } from "./gtmVendorData";

export interface OOBAction {
  id: string;
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "WEBHOOK";
  endpoint: string;
  defaultParams: Record<string, any>;
  executeSimulated: (vendor: GTMVendor, params: Record<string, any>) => {
    success: boolean;
    latencyMs: number;
    statusCode: number;
    result: any;
    log: string[];
  };
}

export function getOobActionsForVendor(vendor: GTMVendor): OOBAction[] {
  const cat = vendor.category.toLowerCase();
  const vName = vendor.vendor;

  if (vName.toLowerCase().includes("lucid")) {
    return [
      {
        id: "lucid_generate_diagram",
        name: "Generate GTM Architecture Flowchart from API Payload",
        description: "Creates an intelligent visual process map or data flow diagram in Lucidchart using structured schema or text prompts.",
        method: "POST",
        endpoint: `/api/v1/documents/diagrams/generate`,
        defaultParams: {
          title: "Enterprise RevOps Ingestion & SSoT Architecture 2026",
          diagramType: "System Architecture Flow",
          components: [
            "Website Form Ingestion",
            "Real-time IP & Email Enrichment (Clearbit / ZoomInfo)",
            "Lead-to-Account Hierarchy Matcher (LeanData)",
            "Salesforce CRM Master SSoT",
            "Outreach / Salesloft SDR Cadences"
          ],
          exportFormat: "SVG / PNG / Interactive URL",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 165,
          statusCode: 200,
          result: {
            documentId: "lucid_doc_882901a",
            title: params.title || "Enterprise RevOps Ingestion & SSoT Architecture 2026",
            editUrl: "https://lucid.app/lucidchart/882901a/edit",
            viewUrl: "https://lucid.app/documents/embedded/882901a",
            nodesGenerated: 5,
            connectionsCreated: 4,
            theme: "Modern Enterprise Indigo",
            aiAutoLayoutApplied: true,
            status: "Document published and share permissions configured.",
          },
          log: [
            `[${v.vendor}] Authenticating with Lucid REST API using OAuth 2.0 Bearer token...`,
            `[${v.vendor}] Ingesting 5 architecture nodes and directional relationship graph...`,
            `[${v.vendor}] Applying Lucid AI auto-layout engine for optimal node spacing and routing...`,
            `[${v.vendor}] Document created successfully. Interactive embed URL generated.`,
          ],
        }),
      },
      {
        id: "lucid_sync_salesforce_orgchart",
        name: "Sync Salesforce Buying Committee to Lucidchart Org Chart",
        description: "Extracts contact reporting relationships from Salesforce Account records and renders an interactive Org Chart diagram.",
        method: "POST",
        endpoint: `/api/v1/salesforce/sync-orgchart`,
        defaultParams: {
          salesforceAccountId: "0018000000abc123",
          accountName: "Snowflake Inc.",
          includeDecisionMakers: true,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 138,
          statusCode: 200,
          result: {
            account: params.accountName || "Snowflake Inc.",
            syncedContacts: 14,
            hierarchicalLevels: 3,
            identifiedChampions: ["VP of Revenue Operations", "Chief Technology Officer"],
            blockersFlagged: ["Procurement Director"],
            lucidchartUrl: "https://lucid.app/lucidchart/orgchart-snowflake-2026",
            lastSyncTimestamp: new Date().toISOString(),
          },
          log: [
            `[${v.vendor}] Fetching Contact & Opportunity Contact Role records from Salesforce...`,
            `[${v.vendor}] Constructing hierarchical reporting tree based on ReportsToId...`,
            `[${v.vendor}] Synchronizing visual nodes to Lucidchart account folder. Complete.`,
          ],
        }),
      },
    ];
  }

  if (vName.toLowerCase().includes("lemlist")) {
    return [
      {
        id: "lemlist_multichannel_campaign",
        name: "Launch Multichannel Outreach Sequence with Dynamic Image Personalization",
        description: "Dispatches automated multi-touch cold email and LinkedIn touchpoints with customized text tokens, dynamic landing page links, and Lemwarm deliverability protection.",
        method: "POST",
        endpoint: `/api/v2/campaigns/enroll-multichannel`,
        defaultParams: {
          campaignName: "Q4 Enterprise RevOps Outbound - Hyper-Personalized",
          leadEmail: "elena.rostova@acmecorp.com",
          leadFirstName: "Elena",
          leadCompany: "Acme Corporation",
          dynamicImageTemplate: "coffee-cup-personalized-logo",
          customIcebreaker: "Loved your recent keynote on scaling automated data pipelines at SaaStr!",
          lemwarmDeliverabilityBoost: true,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 156,
          statusCode: 200,
          result: {
            campaignId: "cam_lem_994812",
            campaignName: params.campaignName || "Q4 Enterprise RevOps Outbound",
            prospect: {
              email: params.leadEmail || "elena.rostova@acmecorp.com",
              name: params.leadFirstName || "Elena",
              company: params.leadCompany || "Acme Corporation",
              dynamicImageGeneratedUrl: `https://app.lemlist.com/dynamic-assets/render?template=${params.dynamicImageTemplate || "coffee-cup"}&company=${encodeURIComponent(params.leadCompany || "Acme")}&name=${encodeURIComponent(params.leadFirstName || "Elena")}`,
            },
            lemwarmScore: "99.4% (Inbox Placement Protected)",
            sequenceCadence: [
              { step: "Step 1 (Day 1 - Immediate)", channel: "Cold Email", subject: "Quick question on {{company}} GTM stack", status: "Sent / In Inbox", personalizedImageRendered: true },
              { step: "Step 2 (Day 3)", channel: "LinkedIn", action: "Profile View + Soft Connection Request", status: "Scheduled" },
              { step: "Step 3 (Day 6)", channel: "Cold Email Follow-up", action: "AI Context-Aware Reply Thread", status: "Scheduled" },
              { step: "Step 4 (Day 9)", channel: "Phone Dialer / Voice Note", action: "Automated Rep Task in Salesforce CRM", status: "Scheduled" },
            ],
            crmBiDirectionalSync: "Active (Salesforce Contact Role: Lead -> Working)",
            deliverabilityStatus: "Lemwarm Verified — SPF/DKIM/DMARC 100% Passing",
          },
          log: [
            `[${v.vendor}] Ingesting lead payload for ${params.leadEmail}...`,
            `[${v.vendor}] Rendering dynamic image with company logo & personalized canvas...`,
            `[${v.vendor}] Validating Lemwarm domain warmup score: 99.4% inbox placement rating.`,
            `[${v.vendor}] Step 1 email dispatched via authenticated SMTP relay. Multi-channel sequence initiated.`,
            `[${v.vendor}] Webhook emitted to Salesforce CRM: Activity.Outbound_Sequence_Enrolled.`,
          ],
        }),
      },
      {
        id: "lemlist_lemwarm_health",
        name: "Lemwarm Inbox Deliverability & Domain Reputation Audit",
        description: "Monitors SPF/DKIM/DMARC DNS records, sender domain reputation score, and automated peer-to-peer warmup email exchanges.",
        method: "GET",
        endpoint: `/api/v2/lemwarm/health-status?domain=acmecorp-outbound.io`,
        defaultParams: {
          senderDomain: "acmecorp-outbound.io",
          senderEmail: "growth@acmecorp-outbound.io",
          dailyWarmupVolume: 40,
          targetInboxPlacementRate: "98.5%",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 94,
          statusCode: 200,
          result: {
            domain: params.senderDomain || "acmecorp-outbound.io",
            senderEmail: params.senderEmail || "growth@acmecorp-outbound.io",
            overallHealthScore: "98.8 / 100 (Optimal Deliverability)",
            dnsRecords: {
              spf: "PASS (v=spf1 include:_spf.google.com ~all)",
              dkim: "PASS (2048-bit RSA key verified)",
              dmarc: "PASS (p=reject; sp=reject; pct=100)",
              mxPointers: "PASS (Valid mail exchanger resolved)",
            },
            lemwarmNetworkTelemetry: {
              activeWarmupDays: 28,
              dailyEmailsExchanged: params.dailyWarmupVolume || 40,
              spamFolderRescueRate: "100% (All warmup messages moved to Primary Inbox)",
              reputationGrade: "Tier 1 Pristine Sender",
            },
            recommendedMaxOutboundPerDay: "120 emails / mailbox / day",
            status: "Safe for high-volume outbound campaigns.",
          },
          log: [
            `[${v.vendor}] Performing live DNS lookup for SPF, DKIM, and DMARC records on ${params.senderDomain}...`,
            `[${v.vendor}] Querying Lemwarm peer-to-peer reputation network for ${params.senderEmail}...`,
            `[${v.vendor}] Deliverability audit computed: 98.8/100 score. Primary inbox placement confirmed.`,
          ],
        }),
      },
    ];
  }

  // Specific tailored actions based on vendor category and name
  if (cat.includes("abm") || cat.includes("intent")) {
    return [
      {
        id: "intent_score",
        name: "Calculate Target Account Intent Score",
        description: "Evaluates surging keyword searches, technographic signals, and web engagement across buyer journeys.",
        method: "POST",
        endpoint: `/api/v1/intent/accounts/score`,
        defaultParams: {
          domain: "snowflake.com",
          keywords: ["Enterprise Data Warehouse", "PCIe Retimers", "RevOps Architecture"],
          timeWindowDays: 14,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 142,
          statusCode: 200,
          result: {
            domain: params.domain || "snowflake.com",
            accountName: "Snowflake Inc.",
            intentScore: 88,
            buyingStage: "Decision / Evaluation",
            surgingTopics: [
              { topic: params.keywords?.[0] || "Enterprise Data Warehouse", surgeMultiplier: "3.4x", confidence: 0.94 },
              { topic: "GTM Integration Middleware", surgeMultiplier: "2.8x", confidence: 0.89 },
            ],
            deanonymizedVisitorsLast30d: 34,
            priorityTier: "Tier 1 (High Intent)",
            recommendedNextAction: "Trigger automated SDR email sequence & alert Named Account AE in Slack.",
          },
          log: [
            `[${v.vendor}] Ingesting 3rd-party intent bidstream and publisher network telemetry...`,
            `[${v.vendor}] Matching domain ${params.domain} against 140M corporate IP CIDR blocks...`,
            `[${v.vendor}] Keyword surge detected on 3 topics. Intent score computed: 88/100.`,
            `[${v.vendor}] Dispatched intent payload to CRM sync pipeline.`,
          ],
        }),
      },
      {
        id: "deanonymize_ip",
        name: "Deanonymize Web Visitor IP to Firmographics",
        description: "Resolves anonymous inbound corporate IP address to account employee count, industry, and revenue tier.",
        method: "GET",
        endpoint: `/api/v1/deanonymize?ip=199.16.156.0`,
        defaultParams: {
          ipAddress: "199.16.156.120",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 98,
          statusCode: 200,
          result: {
            resolvedCompany: "Datadog, Inc.",
            domain: "datadoghq.com",
            industry: "Cloud Infrastructure Monitoring",
            employeeRange: "5,000 - 10,000",
            estimatedRevenue: "$1.8B",
            geo: { city: "New York", country: "United States", region: "NY" },
            isTargetAccountList: true,
          },
          log: [
            `[${v.vendor}] Looking up BGP route and corporate IP range for ${params.ipAddress}...`,
            `[${v.vendor}] Identified reverse DNS pointer: datadog.corp.net`,
            `[${v.vendor}] Merged firmographic data from master database. Match confidence: 99.2%.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("crm") || cat.includes("revenue")) {
    return [
      {
        id: "pipeline_deal_progression",
        name: "Simulate Pipeline Deal Progression & ARR Forecast",
        description: "Advances opportunity stage, recalculates probability weighting, and evaluates custom validation rules.",
        method: "POST",
        endpoint: `/api/v2/opportunities/advance-stage`,
        defaultParams: {
          opportunityName: "Enterprise Expansion Deal - Acme Corp",
          arrValue: 120000,
          currentStage: "Technical Evaluation",
          nextStage: "Executive Proposal & Security Review",
          leadScore: 92,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 165,
          statusCode: 200,
          result: {
            opportunityId: "OPP-948210",
            opportunityName: params.opportunityName,
            previousStage: params.currentStage,
            updatedStage: params.nextStage,
            previousProbability: "40%",
            updatedProbability: "75%",
            weightedARR: `$${((params.arrValue || 120000) * 0.75).toLocaleString()}`,
            forecastCategory: "Commit",
            validationStatus: "PASSED (All required RevOps compliance fields populated)",
            automatedTasksGenerated: [
              "Schedule Executive Sponsor Alignment Call",
              "Send Security SOC2 Type II Package",
              "Notify Legal & Deal Desk for MSA Draft",
            ],
          },
          log: [
            `[${v.vendor}] Verifying user permissions for pipeline stage update...`,
            `[${v.vendor}] Executing RevOps governance validation rules: ARR > 0, Primary Contact assigned.`,
            `[${v.vendor}] Recalculating weighted forecast category -> Commit.`,
            `[${v.vendor}] Audit log entry created with immutable timestamp.`,
          ],
        }),
      },
      {
        id: "lead_ai_score",
        name: "AI Lead Scoring & Next-Best Action",
        description: "Scores inbound contact using historical win-rate patterns and recommends personalized engagement.",
        method: "POST",
        endpoint: `/api/v2/leads/ai-score`,
        defaultParams: {
          contactEmail: "vp_eng@anthropic.com",
          title: "VP of Engineering & Infrastructure",
          companySize: "1,200",
          budgetDeclared: "$250,000+",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 118,
          statusCode: 200,
          result: {
            leadScore: 96,
            icpFitCategory: "Tier 1 Alpha (Ideal Customer Profile)",
            conversionProbability: "84.3%",
            keySignals: [
              "Decision-maker title with budget authority",
              "High hiring velocity in engineering",
              "Matching enterprise tech stack",
            ],
            recommendedAction: "Bypass SDR qualification; route directly to Enterprise Strategic AE with custom architecture deck.",
          },
          log: [
            `[${v.vendor}] Ingesting lead contact vector data...`,
            `[${v.vendor}] Comparing against 50,000 closed-won historical opps...`,
            `[${v.vendor}] AI Predictive model confidence: 0.96. Routing rule triggered.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("marketing")) {
    return [
      {
        id: "dispatch_journey",
        name: "Trigger Multi-Touch Lifecycle Journey",
        description: "Executes automated campaign branching based on buyer behavior, lead score, and email engagement.",
        method: "POST",
        endpoint: `/api/v3/campaigns/journey/trigger`,
        defaultParams: {
          campaignName: "Q3 High-Intent Product Qualified Lead (PQL) Nurture",
          recipientSegment: "Enterprise Trial Users > 10 Active Seats",
          channel: "Omnichannel (Email + Push + SDR Notification)",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 205,
          statusCode: 200,
          result: {
            journeyId: "JRN-883902",
            campaign: params.campaignName,
            enrolledAudienceCount: 1420,
            activeBranches: [
              { step: "Step 1: AI Personalized Case Study Email", sendTime: "Immediate", estimatedDeliverability: "99.4%" },
              { step: "Step 2: Conditional Check (Opened within 48h?)", rule: "If YES -> Send VIP Demo Invite; If NO -> Send SMS nudge" },
              { step: "Step 3: Webhook ping to Salesforce CRM", payload: "Update Lead Status to PQL_Nurturing" },
            ],
            projectedOpenRate: "48.6%",
            projectedClickRate: "14.2%",
          },
          log: [
            `[${v.vendor}] Ingesting audience segment definition...`,
            `[${v.vendor}] Validating suppression lists, GDPR consent, and email unsubscribes...`,
            `[${v.vendor}] Campaign journey activated for 1,420 target contacts across all channels.`,
          ],
        }),
      },
      {
        id: "ai_copy_optimize",
        name: "AI Subject Line & Copy Variation Optimizer",
        description: "Generates high-converting subject line variations tailored to the ICP persona.",
        method: "POST",
        endpoint: `/api/v3/ai/optimize-copy`,
        defaultParams: {
          product: "Enterprise RevOps Automation Platform",
          targetPersona: "Chief Revenue Officer & VP RevOps",
          tone: "Strategic, High-Impact, Concise",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 135,
          statusCode: 200,
          result: {
            recommendations: [
              { subject: "Stop pipeline slippage before Q3 close", predictedOpenRate: "52.4%", spamScore: "0.02" },
              { subject: "How top RevOps leaders automated 90% of Salesforce hygiene", predictedOpenRate: "49.1%", spamScore: "0.01" },
              { subject: "Quick question on your 2026 GTM tooling stack", predictedOpenRate: "46.8%", spamScore: "0.03" },
            ],
            keyKeywords: ["Salesforce governance", "Forecast accuracy", "Pipeline velocity"],
          },
          log: [
            `[${v.vendor}] Running generative copy synthesis with LLM pipeline...`,
            `[${v.vendor}] Analyzing subject line against 5M B2B sales email benchmark database...`,
            `[${v.vendor}] Outputting optimized variants ranked by predicted open rate.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("sales")) {
    return [
      {
        id: "outbound_sequence_run",
        name: "Execute Outbound Sequence & Multi-Touch Outreach",
        description: "Enrolls prospect into automated multi-step outreach across cold email, dialer cadence, and social pings.",
        method: "POST",
        endpoint: `/api/v1/sequences/enroll`,
        defaultParams: {
          sequenceName: "Tier-1 CXO Outbound Cadence",
          targetLeadEmail: "sarah.chen@techscale.io",
          targetTitle: "Chief Information Security Officer (CISO)",
          customVariables: { companyName: "TechScale", painPoint: "SOC2 Compliance Automation" },
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 178,
          statusCode: 200,
          result: {
            enrollmentId: "ENR-7721",
            contact: params.targetLeadEmail,
            sequenceName: params.sequenceName,
            status: "Active - In Flight",
            schedule: [
              { day: "Day 1 (Today)", action: "Custom AI Personalized Intro Email", status: "Queued" },
              { day: "Day 3", action: "Automated Phone Task created in Sales Dialer", status: "Scheduled" },
              { day: "Day 5", action: "LinkedIn Profile View & InMail ping", status: "Scheduled" },
              { day: "Day 8", action: "Value-add benchmark PDF follow-up", status: "Scheduled" },
            ],
            safetyCheck: "Passed (No conflicting active sequences or domain blacklist)",
          },
          log: [
            `[${v.vendor}] Validating domain throttling and mailbox warmup limits...`,
            `[${v.vendor}] Personalized template synthesized with variable tokens: {{companyName}} = TechScale.`,
            `[${v.vendor}] Sequence step 1 queued for dispatch via SMTP/OAuth relay.`,
          ],
        }),
      },
      {
        id: "call_coaching_ai",
        name: "AI Call Coaching & Live Objection Handling",
        description: "Provides real-time objection handling prompts and automatic conversation sentiment analysis.",
        method: "POST",
        endpoint: `/api/v1/calls/ai-coach`,
        defaultParams: {
          detectedObjection: "We already use an incumbent solution and we are locked into an annual contract until next year.",
          callContext: "Mid-Market VP Sales Demo",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 110,
          statusCode: 200,
          result: {
            objectionType: "Competitor Contract Lock-in",
            suggestedResponseScript:
              "Understood! Most of our current customers like Stripe and Figma had existing contracts too. What they found was our bi-directional sync can run parallel without disrupting your current contract, giving you immediate visibility for Q4 planning without extra switching overhead. Would it make sense to review a 10-minute side-by-side gap analysis?",
            keyBattlecards: ["Competitor X vs Our Platform Switcher Playbook", "Contract Buyout Program terms"],
            recommendedFollowUpAsset: "Customer Migration Case Study (PDF)",
          },
          log: [
            `[${v.vendor}] Transcribing audio stream in real-time...`,
            `[${v.vendor}] Detected objection pattern: Contract Lock-in.`,
            `[${v.vendor}] Matched battlecard repository and generated objection rebuttal script.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("customer success") || cat.includes("support")) {
    return [
      {
        id: "calculate_health_score",
        name: "Calculate Customer Health & Churn Risk Score",
        description: "Aggregates login frequency, license seat utilization, open ticket count, and NPS to score account health.",
        method: "POST",
        endpoint: `/api/v1/accounts/health-score`,
        defaultParams: {
          accountName: "CloudPioneer Corp",
          activeSeats: 85,
          purchasedSeats: 100,
          openUrgentTickets: 0,
          npsScore: 9,
          daysSinceLastLogin: 1,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 122,
          statusCode: 200,
          result: {
            account: params.accountName,
            overallHealthScore: 91,
            healthGrade: "A+ (Champions / Expansion Ready)",
            riskLevel: "Low (0.04 Churn Probability)",
            metricsBreakdown: {
              seatUtilization: `${((params.activeSeats / params.purchasedSeats) * 100).toFixed(0)}% (Healthy > 80%)`,
              supportSentiment: "Positive (0 blocker tickets)",
              featureAdoptionBreadth: "7 out of 8 core modules deployed",
              executiveEngagementScore: "High (Attended last QBR)",
            },
            recommendedAction: "Trigger CSM Upsell Playbook: Pitch +50 seat expansion package for next renewal cycle.",
          },
          log: [
            `[${v.vendor}] Fetching telemetry metrics from data warehouse and support desk...`,
            `[${v.vendor}] Computing weighted health algorithm across 4 pillars...`,
            `[${v.vendor}] Account health updated to 91/100. Expansion signal flagged in CRM.`,
          ],
        }),
      },
      {
        id: "ai_ticket_summarize",
        name: "AI Support Ticket Triage & Resolution Copilot",
        description: "Summarizes multi-message customer ticket thread and writes an automated high-fidelity solution draft.",
        method: "POST",
        endpoint: `/api/v1/tickets/ai-copilot`,
        defaultParams: {
          ticketSubject: "Webhook delivery failure error code 429 on bulk ingest",
          customerTier: "Enterprise VIP",
          messageSnippet: "Our sync job failed at 2:00 AM with HTTP 429 Too Many Requests when uploading 50,000 batch rows.",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 145,
          statusCode: 200,
          result: {
            rootCause: "Rate limit exceeded (Maximum 100 concurrent requests per second for standard endpoint)",
            recommendedPriority: "P2 - High",
            aiDraftedResponse:
              "Hi there,\n\nThanks for reaching out! The HTTP 429 error occurs because the standard API endpoint is capped at 100 req/sec. For batch operations over 10,000 records, please use our Bulk Ingest Endpoint (`/api/v2/bulk/import`) with gzip compression, which handles up to 500,000 records per job seamlessly without hitting rate limits.\n\nHere is a direct code snippet to format your batch payload: [Link to Bulk Docs]\n\nLet us know if you would like us to temporarily raise your standard rate limit while you test!",
            autoTags: ["api-limits", "bulk-ingest", "status-429"],
          },
          log: [
            `[${v.vendor}] Ingesting ticket body and customer profile...`,
            `[${v.vendor}] Querying internal knowledge base and API error registry...`,
            `[${v.vendor}] Generated customer-ready resolution draft with documentation link.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("analytics") || cat.includes("intelligence")) {
    return [
      {
        id: "conversation_intelligence",
        name: "Analyze Sales Call Audio & Extract Deal Signals",
        description: "Transcribes sales meeting audio, detects competitor mentions, buying questions, and customer sentiment.",
        method: "POST",
        endpoint: `/api/v2/intelligence/calls/analyze`,
        defaultParams: {
          callTitle: "Discovery Call - Fortune 500 Bank",
          callDurationMinutes: 32,
          competitorsToTrack: ["Competitor A", "Competitor B"],
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 190,
          statusCode: 200,
          result: {
            callTitle: params.callTitle,
            overallSentiment: "Strongly Positive (0.88)",
            talkTimeRatio: { rep: "38%", prospect: "62% (Optimal)" },
            keyQuestionsAsked: [
              "How do you handle SOC2 Type II and FedRAMP compliance?",
              "What is the average timeline to roll out to 250 sales reps?",
            ],
            competitorMentions: [
              { competitor: "Competitor A", timestamp: "14:20", context: "Prospect mentioned evaluating them last quarter but found UI clunky." },
            ],
            nextStepsIdentified: [
              "Send security whitepaper by Friday",
              "Schedule technical deep-dive with Enterprise Architect",
            ],
            dealRiskRating: "Low Risk (High buyer urgency)",
          },
          log: [
            `[${v.vendor}] Processing stereo audio stream with neural speaker diarization...`,
            `[${v.vendor}] Extracting semantic entities, pricing queries, and competitor tokens...`,
            `[${v.vendor}] Summary and action items auto-synchronized to CRM opportunity activity log.`,
          ],
        }),
      },
      {
        id: "generate_sql_query",
        name: "Generate Warehouse Analytical SQL Query",
        description: "Produces optimized SQL query for data warehouse tables with aggregation and retention metrics.",
        method: "POST",
        endpoint: `/api/v2/analytics/sql/generate`,
        defaultParams: {
          businessQuestion: "Calculate Net Revenue Retention (NRR) and Churn rate by cohort quarter for 2025-2026",
          warehouseDialect: "Snowflake / BigQuery SQL",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 115,
          statusCode: 200,
          result: {
            generatedSQL: `WITH cohort_arr AS (
  SELECT 
    DATE_TRUNC('quarter', subscription_start_date) AS cohort_quarter,
    account_id,
    SUM(arr_amount) AS beginning_arr,
    SUM(CASE WHEN status = 'active' THEN arr_amount ELSE 0 END) AS ending_arr,
    SUM(expansion_arr) AS expansion_arr,
    SUM(churn_arr) AS churn_arr
  FROM revenue_ledger
  GROUP BY 1, 2
)
SELECT 
  cohort_quarter,
  COUNT(DISTINCT account_id) AS cohort_size,
  SUM(beginning_arr) AS total_beginning_arr,
  ROUND(((SUM(ending_arr) + SUM(expansion_arr) - SUM(churn_arr)) / NULLIF(SUM(beginning_arr), 0)) * 100, 2) AS nrr_percentage
FROM cohort_arr
GROUP BY 1
ORDER BY 1 DESC;`,
            estimatedExecutionTime: "1.2s",
            dataScanned: "48.2 MB",
          },
          log: [
            `[${v.vendor}] Parsing business question into semantic AST...`,
            `[${v.vendor}] Applying dimensional modeling patterns for ASC 606 revenue retention...`,
            `[${v.vendor}] Validated SQL syntax against dialect compiler.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("data") || cat.includes("enrichment")) {
    return [
      {
        id: "waterfall_enrich",
        name: "Waterfall Contact & Domain Enrichment",
        description: "Enriches company domain and email with verified phone, LinkedIn, employee headcount, and technographics.",
        method: "POST",
        endpoint: `/api/v1/enrichment/waterfall`,
        defaultParams: {
          targetEmail: "brian.chesky@airbnb.com",
          domain: "airbnb.com",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 154,
          statusCode: 200,
          result: {
            email: params.targetEmail,
            deliverabilityStatus: "Deliverable (Verified SMTP Handshake)",
            fullName: "Brian Chesky",
            jobTitle: "Co-Founder & Chief Executive Officer",
            company: "Airbnb, Inc.",
            domain: params.domain || "airbnb.com",
            headquarters: "San Francisco, California, USA",
            employeeCount: "6,800+",
            estimatedAnnualRevenue: "$9.9B+",
            linkedinUrl: "https://linkedin.com/in/brianchesky",
            technographicsDetected: ["Salesforce", "Marketo", "Snowflake", "AWS", "Stripe", "Looker", "Slack"],
            dataSourceConfidence: "99.8% (Tier-1 Primary Provider)",
          },
          log: [
            `[${v.vendor}] Querying primary contact index for ${params.targetEmail}...`,
            `[${v.vendor}] Performing DNS MX record validation and SMTP mailbox handshake...`,
            `[${v.vendor}] Appending company firmographics, funding rounds, and tech stack fingerprints.`,
          ],
        }),
      },
      {
        id: "email_mx_verify",
        name: "Real-time Email & MX Deliverability Verification",
        description: "Verifies email syntax, DNS MX records, disposable domain status, and spam-trap risk score.",
        method: "GET",
        endpoint: `/api/v1/verify?email=test@example.com`,
        defaultParams: {
          email: "alex.rivera@enterprise-corp.com",
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 82,
          statusCode: 200,
          result: {
            email: params.email,
            status: "Valid / Deliverable",
            isCatchAll: false,
            isDisposable: false,
            isFreeMail: false,
            mxRecordFound: "aspmx.l.google.com",
            spamRiskScore: 0.01,
            safeToSend: true,
          },
          log: [
            `[${v.vendor}] Validating RFC 5322 email syntax...`,
            `[${v.vendor}] Querying DNS for MX pointers... Match found.`,
            `[${v.vendor}] Simulating SMTP HELO/EHLO protocol verification... Response 250 OK.`,
          ],
        }),
      },
    ];
  }

  if (cat.includes("commerce") || cat.includes("payments")) {
    return [
      {
        id: "create_subscription",
        name: "Create SaaS Subscription & Prorated Billing",
        description: "Creates multi-tiered subscription with seat quantity, billing cycles, automated tax calculation, and discounts.",
        method: "POST",
        endpoint: `/api/v1/billing/subscriptions/create`,
        defaultParams: {
          customerId: "CUST_99182",
          planTier: "Enterprise Annual Scale",
          seatCount: 50,
          seatUnitPrice: 40,
          billingInterval: "Annual (Upfront)",
          discountPercent: 15,
        },
        executeSimulated: (v, params) => {
          const rawSubtotal = (params.seatCount || 50) * (params.seatUnitPrice || 40) * 12;
          const discount = rawSubtotal * ((params.discountPercent || 15) / 100);
          const total = rawSubtotal - discount;
          return {
            success: true,
            latencyMs: 168,
            statusCode: 200,
            result: {
              subscriptionId: "sub_1N8k209Fkd8102",
              customerId: params.customerId,
              plan: params.planTier,
              seats: params.seatCount,
              calculatedARR: `$${total.toLocaleString()}`,
              subtotal: `$${rawSubtotal.toLocaleString()}`,
              discountApplied: `-$${discount.toLocaleString()} (${params.discountPercent}%)`,
              billingInterval: params.billingInterval,
              nextInvoiceDate: "2027-08-30",
              paymentStatus: "Payment Succeeded (Credit Card / ACH on file)",
              taxJurisdiction: "Automated Avalara Tax Sync (Exempt - B2B Reseller Cert on file)",
            },
            log: [
              `[${v.vendor}] Calculating seat proration and discount matrices...`,
              `[${v.vendor}] Charging default payment method via payment gateway... Succeeded.`,
              `[${v.vendor}] Webhook event invoice.payment_succeeded dispatched to ERP/Salesforce.`,
            ],
          };
        },
      },
      {
        id: "simulate_dunning_webhook",
        name: "Simulate Payment Dunning & Webhook Ingestion",
        description: "Triggers automated failed charge retry, customer portal grace period, and webhook notification.",
        method: "POST",
        endpoint: `/api/v1/webhooks/simulate/payment_failed`,
        defaultParams: {
          invoiceId: "inv_882901",
          failureReason: "insufficient_funds",
          attemptCount: 1,
        },
        executeSimulated: (v, params) => ({
          success: true,
          latencyMs: 104,
          statusCode: 200,
          result: {
            webhookEvent: "invoice.payment_failed",
            invoiceId: params.invoiceId,
            actionTaken: "Smart Dunning Sequence Activated",
            smartRetrySchedule: "Next retry scheduled in 48 hours (Smart Retries Engine)",
            customerEmailNotification: "Sent: 'Action Required: Update your payment method'",
            gracePeriodDaysRemaining: 7,
            autoLockAccount: false,
          },
          log: [
            `[${v.vendor}] Received payment gateway decline code: ${params.failureReason}.`,
            `[${v.vendor}] Smart dunning AI selected optimal retry window (Wed 9:00 AM local time).`,
            `[${v.vendor}] Dispatched webhook payload to n8n / RevOps monitoring webhook.`,
          ],
        }),
      },
    ];
  }

  // Default fallback for Content & social / Productivity & events
  return [
    {
      id: "default_trigger",
      name: `Execute ${vendor.vendor} Out-of-Box Workflow`,
      description: `Runs the core functionality: "${vendor.coreFunctionality}" with simulated cloud execution.`,
      method: "POST",
      endpoint: `/api/v1/${vendor.vendor.toLowerCase().replace(/[^a-z0-9]/g, "")}/execute`,
      defaultParams: {
        vendorName: vendor.vendor,
        category: vendor.category,
        action: vendor.coreFunctionality,
      },
      executeSimulated: (v, params) => ({
        success: true,
        latencyMs: 120 + Math.floor(Math.random() * 80),
        statusCode: 200,
        result: {
          vendor: v.vendor,
          category: v.category,
          coreFunctionalityExecuted: v.coreFunctionality,
          indicativePricing: v.indicativePricing,
          aiFeaturesActive: v.aiFeatures,
          connectionProtocol: v.connectVia,
          n8nIntegration: v.n8nNode !== "—" ? `Native node: ${v.n8nNode}` : `Connected via ${v.connectVia}`,
          status: "Completed successfully with 0 errors.",
        },
        log: [
          `[${v.vendor}] Authenticating client via ${v.connectVia} credentials...`,
          `[${v.vendor}] Executing out-of-box core capability: ${v.coreFunctionality}...`,
          `[${v.vendor}] Telemetry log streamed to RevOps Admin Dashboard. 200 OK.`,
        ],
      }),
    },
  ];
}
