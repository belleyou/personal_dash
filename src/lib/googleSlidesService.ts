export interface SlideFile {
  id: string;
  name: string;
  webViewLink?: string;
  thumbnailLink?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export interface GooglePresentation {
  presentationId: string;
  title: string;
  slides?: any[];
}

/**
 * Fetch presentations from Google Drive using the Drive API
 */
export async function listUserPresentations(accessToken: string): Promise<SlideFile[]> {
  const url = `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.presentation' and trashed=false&fields=files(id,name,webViewLink,thumbnailLink,createdTime,modifiedTime)&orderBy=modifiedTime desc&pageSize=20`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to list presentations (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Fetch a specific Google Slides presentation by ID
 */
export async function getPresentation(accessToken: string, presentationId: string): Promise<GooglePresentation> {
  const url = `https://slides.googleapis.com/v1/presentations/${presentationId}`;
  
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch presentation (${response.status})`);
  }

  return await response.json();
}

/**
 * Export the Revenue Systems Streamline Initiative deck directly into Google Slides!
 */
export async function createRevenueStreamlineDeck(accessToken: string): Promise<{ presentationId: string; webViewLink: string }> {
  // 1. Create a blank Google Presentation
  const createUrl = 'https://slides.googleapis.com/v1/presentations';
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Revenue Systems Streamline Initiative — Bao You Portfolio',
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create presentation (${createRes.status})`);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const webViewLink = `https://docs.google.com/presentation/d/${presentationId}/edit`;

  // First slide created by default
  const defaultSlideId = presentation.slides?.[0]?.objectId;

  // 2. Prepare slide definitions to populate via batchUpdate
  const slideConfigs = [
    {
      title: "Revenue Systems Streamline Initiative",
      subtitle: "Evaluations, Architectural Options & Recommendations for Scaling from 20 to 50 AEs during Migration from HubSpot to Salesforce",
      bullets: [
        "ENTERPRISE REVOPS ARCHITECTURE",
        "Author: Bao You — GTM Systems & Revenue Operations Portfolio",
        "Objective: Streamline list ingestion, eliminate 60+ min delays, and map healthcare account hierarchies."
      ]
    },
    {
      title: "1. Core Business Bottlenecks & System Goals",
      bullets: [
        "1. Tool & Data Overlap: Severe fragmentation across 11 tools (Definitive, Clay, LISN, Modigie, Apollo, Nooks, Commonroom, Outreach, Dripify, Salesforce, HubSpot).",
        "2. 60+ Min Upload Delays: Synchronous list processing in Salesforce & heavy list segmentation in HubSpot create >1hr bottlenecks per 50k in SFDC.",
        "Goal: Salesforce as One-Stop Shop — Reps never leave the CRM; Automate PE → MSO Parent → MSO Child hierarchy mapping asynchronously."
      ]
    },
    {
      title: "2. Key System Assumptions",
      bullets: [
        "• Investment Flexibility & Vendor Strategy: Organization comfortable with extra costs for best-in-class data hygiene & pipeline velocity.",
        "• AI Openness & Automation Readiness: Fully open to AI capabilities (Agentforce, n8n AI agent workflows, Claude 3.5 Sonnet) for enrichment.",
        "• HubSpot to Salesforce Contact Object Migration: Direct migration to SFDC Contact object (skipping Lead object).",
        "• Salesforce as Single Source of Truth: Salesforce Sales Cloud holds ~95% TAM; HubSpot CRM fully decommissioned post-migration.",
        "• Growth Target & Scale: Support scaling AE team from 20 to 50 AEs over 12 months without operational friction.",
        "• Healthcare Hierarchy Governance: Parent-child structures (PE → MSO Parent → MSO Child) auto-maintained with manual overrides."
      ]
    },
    {
      title: "3. Key Business Metrics & KPIs to Track",
      bullets: [
        "• Ingestion Velocity: Target <5 mins / 10k rows (Human prep time reduced to <10 mins per campaign list).",
        "• Hierarchy Accuracy: Target >90% Account Coverage (Automated parent-child mapping PE → MSO Parent → MSO Child).",
        "• Deliverability & Pickup: Target >15% Call Connects (Mobile pickup tripled via Clay waterfall; bounce rate <2%).",
        "• AE Productivity & Usage: Target 100% SFDC Adoption (Zero platform switching; 100% prospect research inside Salesforce)."
      ]
    },
    {
      title: "4. Evaluation of 4 Architecture Solutions",
      bullets: [
        "• Solution #1: Custom Apex & Point-to-Point REST APIs (Est: 16-20 Wks, Effort: High)",
        "• Solution #2: Salesforce Agentforce & Data Cloud (Est: 12-16 Wks, Effort: Medium-High)",
        "• Solution #3 (⭐ RECOMMENDED): Middleware n8n AI Orchestration (Est: 8-12 Wks, Effort: Medium-Low)",
        "• Solution #4: Custom MCP Microservices (Est: 18-20 Wks, Effort: Very High)",
        "Scope: Multi-Channel Lead Ingestion across Webforms, Emails, Events, Detected Intent, and Social."
      ]
    },
    {
      title: "5. Solution 1: Native Apex & Point-to-Point",
      bullets: [
        "• Architecture Approach: Custom Apex code, Batch Apex, and LWC flow triggers within SFDC. Direct REST API calls.",
        "• Pros: Fully native to SFDC UI; no external middleware subscription fees.",
        "• Cons: Heavy technical debt, tight coupling, high exposure to Salesforce governor limits and API callout ceilings.",
        "• Risk: Batch #30 rate limit failures and 70-min sync queue bottlenecks."
      ]
    },
    {
      title: "6. Solution 2: Salesforce Agentforce & Data Cloud",
      bullets: [
        "• Architecture Approach: Native Salesforce AI Agents, Data Cloud Data Model Objects (DMOs), and Prompt Builder.",
        "• Capabilities: Autonomously detects intent signals and maps healthcare account relationships natively.",
        "• Pros: Cutting-edge native AI rep experience directly inside Salesforce Console.",
        "• Cons: High consumption cost (Data Cloud / Flex Credits) and vendor lock-in."
      ]
    },
    {
      title: "7. Solution 3: n8n AI Orchestration (⭐ Recommended)",
      bullets: [
        "• Architecture Approach: Node-based n8n automation engine orchestrating Claude 3.5 Sonnet, Definitive Healthcare, and Clay enrichment.",
        "• Execution: Pushes clean records directly via Salesforce Bulk API v2 in parallel batches.",
        "• Impact: Decouples heavy processing from SFDC, reduces list upload times from 60 mins to <5 mins, and cuts tool spend.",
        "• Personas: RevOps Strategist, n8n Architect, and Account Executive aligned seamlessly."
      ]
    },
    {
      title: "8. Solution 4: Custom MCP Microservices",
      bullets: [
        "• Architecture Approach: Custom Model Context Protocol (MCP) server built on Python/Node.js microservices.",
        "• Integration: Connects LLM models to databases and SFDC APIs via open-source protocols.",
        "• Pros: Zero vendor lock-in; complete control over AI logic & data models.",
        "• Cons: Extremely high DevOps engineering overhead, custom container hosting, and ongoing code maintenance."
      ]
    },
    {
      title: "9. Why Solution #3 Wins (n8n Engine)",
      bullets: [
        "• Bulk API v2 Speed: Bypasses synchronous SFDC trigger limits by staging and bulk-upserting records asynchronously.",
        "• Hierarchy AI Parsing: Uses Claude 3.5 LLM nodes to clean PE → MSO Parent → MSO Child trees before writing.",
        "• GTM Agility: Allows RevOps to modify enrichment logic and intent triggers visually without Apex code deployments.",
        "• Processing Time: <5 min Campaign Processing Time (12x speedup; human effort <10 mins)."
      ]
    },
    {
      title: "10. Phased Rollout Plan For Solution #3",
      bullets: [
        "• W1-3 (Core Infra): Deploy n8n cluster; authenticate OAuth2 to SFDC, Clay, Definitive, Outreach.",
        "• W3-5 (Bulk API): Build Bulk API v2 asynchronous event upload pipeline.",
        "• W5-8 (AI Hierarchy): Integrate Claude LLM nodes for PE-MSO hierarchy and intent scoring.",
        "• W8-10 (Go-Live): Slack alerts, error catchers, rep enablement, and full rollout."
      ]
    },
    {
      title: "11. Stack Rationalization Summary",
      bullets: [
        "• KEEP: Salesforce (Core CRM), CRM Marketing Campaign, Definitive (Health Data), Clay (AI Waterfall), Outreach / Nooks, Commonroom.",
        "• CUT: ISN & Modigie (Bad phone data), Dripify (LinkedIn risk).",
        "• REPLACE: Apollo.ai (Downgrade standalone user seats; retain API inside Clay waterfall for backfill lookup).",
        "• ADD: Einstein Copilot / Agentforce, n8n (AI Orchestration Engine), LeanData (Matching/Routing), D&B Optimizer / ZoomInfo, Claude 3.5 / GPT-4o."
      ]
    },
    {
      title: "12. Executive Q&A & Governance",
      bullets: [
        "Q1. Tech Stack Trust: Evaluated on Primary Source Data Authority, API Speed & Asynchronous Throughput, ROI.",
        "Q2. Enablement & Adoption: Role-Based Sandbox Training, Actionable Alerts, Feedback via Office Hours.",
        "Q3. Human Approval: Account tier, buying threshold, Low-Confidence Deduplication Exceptions.",
        "Q4. Intent Signals: Multi-Source Signal Monitoring, AI Candidate & Title Parsing, Former Champion Tracking.",
        "Q5. Lead Qualification: Firmographic & Healthcare Fit, Behavioral Intent, Automated AI Qualification Score."
      ]
    },
    {
      title: "13. Appendix: Implementation Phase Plan Comparison",
      bullets: [
        "• Solution #1 (Apex/LWC): 16 Wks | High Complexity | Lengthy release cycles",
        "• Solution #2 (Agentforce): 12 Wks | Moderate Complexity | Consumption-based costs",
        "• Solution #3 (n8n AI ⭐): 8 Wks | Low-Moderate Complexity | Low-code, rapid deployment",
        "• Solution #4 (Custom MCP): 18 Wks | Very High Complexity | Dev-first open-source"
      ]
    }
  ];

  const requests: any[] = [];

  // Update default slide 1 title if present
  if (defaultSlideId) {
    // Delete default slide elements and re-build clean
  }

  // Create slides for config items
  slideConfigs.forEach((cfg, index) => {
    const slideId = `slide_revops_${index}_${Date.now()}`;
    const titleBoxId = `title_box_${index}_${Date.now()}`;
    const bodyBoxId = `body_box_${index}_${Date.now()}`;

    // Add slide
    requests.push({
      createSlide: {
        objectId: slideId,
        insertionIndex: index,
        slideLayout: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // Set background color to dark navy (#0B1120)
    requests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: { red: 0.043, green: 0.067, blue: 0.125 },
              },
            },
          },
        },
        fields: 'pageBackgroundFill',
      },
    });

    // Create Title Text Box
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 60, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 25,
            unit: 'PT',
          },
        },
      },
    });

    // Insert Title Text
    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: cfg.title,
      },
    });

    // Style Title Text
    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        style: {
          fontFamily: 'Montserrat',
          fontSize: { magnitude: 20, unit: 'PT' },
          bold: true,
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.22, green: 0.74, blue: 0.96 }, // Sky blue
            },
          },
        },
        fields: 'fontFamily,fontSize,bold,foregroundColor',
      },
    });

    // Create Body Text Box
    requests.push({
      createShape: {
        objectId: bodyBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 280, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 90,
            unit: 'PT',
          },
        },
      },
    });

    const bodyText = cfg.subtitle 
      ? `${cfg.subtitle}\n\n` + cfg.bullets.join('\n\n')
      : cfg.bullets.join('\n\n');

    requests.push({
      insertText: {
        objectId: bodyBoxId,
        text: bodyText,
      },
    });

    // Style Body Text
    requests.push({
      updateTextStyle: {
        objectId: bodyBoxId,
        style: {
          fontFamily: 'Inter',
          fontSize: { magnitude: 11, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.88, green: 0.92, blue: 0.96 }, // Slate 200
            },
          },
        },
        fields: 'fontFamily,fontSize,foregroundColor',
      },
    });
  });

  // If there was a default slide at creation, delete it so our custom index 0 is first
  if (defaultSlideId) {
    requests.push({
      deleteObject: {
        objectId: defaultSlideId,
      },
    });
  }

  // 3. Send batchUpdate request to Google Slides API
  const batchUrl = `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`;
  const batchRes = await fetch(batchUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requests }),
  });

  if (!batchRes.ok) {
    const err = await batchRes.json().catch(() => ({}));
    console.error('Batch update error:', err);
    // Even if formatting fails, the presentation is created
  }

  return { presentationId, webViewLink };
}
