import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  BookOpen, 
  Copy, 
  Check, 
  Share2, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  FileCode, 
  Cpu, 
  Flame, 
  Sparkles,
  RefreshCw,
  Eye,
  ChevronRight,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Globe
} from "lucide-react";

// The TIMES Magazine styled Article structure & pre-written content
export interface TimesArticleData {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  role: string;
  issueDate: string;
  volume: string;
  price?: string;
  category: string;
  coverTopic: string;
  sections: { heading: string; content: string }[];
  pullQuote: string;
}

export const PRESET_ARTICLES: Record<string, TimesArticleData> = {
  "salesforce-scale": {
    id: "salesforce-scale",
    title: "Architecting Salesforce & CPQ for $150M+ Scale",
    subtitle: "A Masterclass in RevOps Integrity and Zero-Data-Leakage GTM Workflows",
    author: "Baoying You",
    role: "Global GTM CRM & Revenue Systems Product Manager",
    issueDate: "JULY 4, 2026",
    volume: "VOL. CVII NO. 2",
    category: "SPECIAL SYSTEMS INITIATIVE",
    coverTopic: "SYSTEMS ARCHITECTURE",
    pullQuote: "“TRUE CRITICAL SCALE IS ACHIEVED NOT BY EXPANDING COMPONENT QUANTITY, BUT BY ENFORCING ABSOLUTE SYSTEM HYGIENE AND DETERMINISTIC SCHEMAS.”",
    sections: [
      {
        heading: "I. THE COST OF THE COMPLEXITY TAX",
        content: `In high-growth B2B enterprise technology, scale is a double-edged sword. As a company moves from $10M to $150M+ in annual recurring revenue (ARR), system architecture often degrades under the weight of "unstructured configuration." Speed-to-market is prioritized, custom code accumulates, and single-purpose integrations are bolted onto the core CRM platform like scaffolding. This is what we define as the "Complexity Tax." Without rigorous system hygiene and strict data schema compliance, Salesforce orgs enter an operational death spiral. Quoting speeds degrade into multi-day manual approval marathons, duplicate account definitions fracture the customer record, and sales representatives lose valuable pipeline velocity fighting unstable interfaces. To scale past $150M ARR with high structural integrity, GTM platform teams must replace ad-hoc adjustments with absolute schema governance and deterministic revenue pipelines.`
      },
      {
        heading: "II. THE CPQ LATENCY CHALLENGE AND DECOUPLED SYSTEMS",
        content: `At the heart of the enterprise GTM engine lies Salesforce CPQ (Configure, Price, Quote). In legacy setups, quote calculation latency often spikes past 30 seconds per transaction. This latency is rarely a fault of the package itself; rather, it is driven by nested Price Rules, excessive Product Rules executing on every line change, and poorly mapped Quote-to-Cash triggers. To build a high-velocity quoting engine, we executed a major CPQ transformation centered on three architectural pillars:
        
1. Decoupled Calculators: Moving heavy computation workflows (such as tier-based discount schedules and complex bundle pricing) away from the browser and offloading them into optimized, asynchronous backend routines.
2. Unified Product Bundling: Consolidating 400+ custom SKU definitions into 12 parent-child configurable product families, cutting rule-evaluation complexity by 75%.
3. Advanced Approvals Matrix: Streamlining the deal approval chain by implementing automated delegation structures based on strict discount thresholds, region, and product margins.`
      },
      {
        heading: "III. MASTERING SUBSCRIPTIONS AND THE GOLDEN RECORD",
        content: `A recurring-revenue model demands an impeccable contract schema. Subscription renewals, mid-term contract amendments, and co-terminations are highly susceptible to "downstream data leakage"—where system discrepancies lead to unrecognized revenue. To solve this, we redesigned the conceptual and physical database schema to establish a single "Golden Record" master account definition. Standard Account-to-Contact relationships were redesigned with strict MDM (Master Data Management) key structures. When custom enterprise contracts are amended mid-term, CPQ price rules now dynamically compute multi-dimensional billing schedules, sync with NetSuite ERP in real-time, and auto-provision the resources. This eliminated 100% of billing calculation errors, saving weeks of manual auditing and ensuring full SOX/ITGC audit compliance.`
      },
      {
        heading: "IV. EMPOWERING REVOPS WITH AGENTIC AUTOMATION",
        content: `As GTM platforms evolve, the next horizon of scale lies in Agentic AI workflows. The integration of modern server-side LLMs (such as Google Gemini models via the Google-GenAI SDK) directly into CRM routes allows teams to automate the most labor-intensive parts of operations. 
 
Rather than manual data entry or complex lookup forms, our intelligent GTM console leverages:
• Automated Proposal Parsing: Matching incoming customer RFPs (Request for Proposals) against active product catalogs and generating exact CPQ quotes in under 10 minutes.
• Discovery-to-Task Pipeline: Transcribing live discovery sessions and extracting key customer business requirements directly into structured Salesforce tasks and Jira tickets.
• Predictive Deal Scoring: Analyzing historical opportunity change patterns, email velocities, and stage duration to flag high-risk pipelines before quarter closing.`
      }
    ]
  },
  "incident-management": {
    id: "incident-management",
    title: "SLA Controls & Incident Playbooks in Enterprise SaaS",
    subtitle: "Establishing Operational Predictability Across Hundreds of Live Integrations",
    author: "Baoying You",
    role: "Global GTM CRM & Revenue Systems Product Manager",
    issueDate: "JUNE 18, 2026",
    volume: "VOL. CVII NO. 1",
    category: "OPERATIONAL EXCELLENCE",
    coverTopic: "INCIDENT MANAGEMENT",
    pullQuote: "“INCIDENT EXCELLENCE IS MEASURED NOT BY THE ABSENCE OF FAULTS, BUT BY THE DETERMINISTIC SPEED AND STRUCTURE OF RESPONSE SYSTEM CYCLES.”",
    sections: [
      {
        heading: "I. THE COST OF INTERRUPTED COMMERCE",
        content: `When a core CRM or global e-commerce integration fails, the cost is counted in seconds. Outages in lead routing pipelines, partner portal sign-ups, or Quote-to-Cash processes cause immediate friction for sales operations, commercial teams, and end-users. Establishing operational predictability requires moving beyond reactive troubleshooting to design formal production SLA controls and playbooks.`
      },
      {
        heading: "II. REBUILDING RELEASE GOVERNANCE AND UAT CYCLES",
        content: `We implemented a structured release operation framework featuring complete sandbox isolation, automated quality assurance scripts, and standardized user-acceptance testing (UAT). Every system upgrade—spanning Salesforce custom releases, Zendesk updates, or Hubspot synchronizations—now undergoes peer-reviewed change-documentation, mitigating risks and ensuring 99.9% uptime for core business flows.`
      },
      {
        heading: "III. ANATOMY OF A HIGH-VELOCITY INCIDENT RESPONSE",
        content: `Our customized incident response protocol ensures immediate visibility and rapid resolution:
1. Automated Monitoring: Utilizing telemetry alerts that flag API sync bottlenecks, authentication timeouts, or system failures within 60 seconds.
2. Cross-Functional Taskforces: Instantly convening key stakeholders from engineering, business ops, and product divisions via automated Slack and Jira bridges.
3. Post-Incident Autopsies: Formally documenting root-cause analysis (RCA), tracking follow-up mitigation steps, and refining security governance schemas.`
      }
    ]
  },
  "agentic-workspaces": {
    id: "agentic-workspaces",
    title: "Transitioning CRM Pipelines to Intelligent Workspaces",
    subtitle: "A Strategic Blueprint for Integrating Server-Side Gemini APIs with Enterprise Hubs",
    author: "Baoying You",
    role: "Global GTM CRM & Revenue Systems Product Manager",
    issueDate: "MAY 24, 2026",
    volume: "VOL. CVI NO. 4",
    category: "AI & SYSTEMS AUTOMATION",
    coverTopic: "AGENTIC WORKSPACES",
    pullQuote: "“INTELLIGENT SYSTEMS TRANSITION CRM FROM A STATIC DATA REPOSITORY INTO A PROACTIVE, COGNITIVE WORKSPACE PARTNER.”",
    sections: [
      {
        heading: "I. BEYOND THE STATIC RECORD",
        content: `Traditional CRM systems serve primarily as databases of record—dependable but entirely passive. Sales reps and operations staff spend significant hours manually inputting data, searching for contextual attachments, and formatting updates. By integrating modern, secure server-side LLMs, we transform the pipeline into an active collaborative assistant.`
      },
      {
        heading: "II. ARCHITECTING SECURE MIDDLEWARE GATEWAYS",
        content: `A critical error in enterprise AI deployment is sending sensitive customer data to public APIs. To ensure absolute privacy, we architected secure server-side gateways utilizing Google-GenAI SDKs. The system filters raw inputs, masks personally identifiable information (PII), applies named-credentials authentication, and leverages isolated sandbox processing—supporting compliance with SOX, HIPAA, and SOC 2 Type II controls.`
      },
      {
        heading: "III. THE IMPACT OF THE INTELLIGENT GTM PIPELINE",
        content: `By automating low-value tasks, enterprise teams unlock massive leverage. Automated email drafting matches customer buying triggers; smart lead-enrichment scans public business filings; and intelligent meeting transcription maps live feature requests to core system workflows—decreasing administrative overhead by over 40% and freeing reps to focus on strategic execution.`
      }
    ]
  },
  "gtm-vc": {
    id: "gtm-vc",
    title: "Sellers Are Vibe-Coding Their Own Tools. Why do we still need a GTM System Team?",
    subtitle: "The Strategic Balance Between Field-Driven Prototypes and Governed Systems in the AI Era",
    author: "Baoying You",
    role: "Global GTM CRM & Revenue Systems Product Manager",
    issueDate: "JUNE 29, 2026",
    volume: "VOL. CVII NO. 3",
    category: "REVOPS & GOVERNANCE",
    coverTopic: "GOVERNED SYSTEM PLATFORMS",
    pullQuote: "“VIBE-CODING IS NOT THE PROBLEM. UNGOVERNED VIBE-CODING WITH BROAD, UNREVIEWED PERMISSIONS AND NO PATH FROM PROTOTYPE TO PRODUCTION IS.”",
    sections: [
      {
        heading: "I. THE VIBE-CODING INSTINCT",
        content: `Across GTM orgs in the current AI era, everyone including sellers (SDR/BDR/AE/AM/CSM/CP) is building their own automations like a Slack bot that auto-drafts follow-ups or a script that syncs a spreadsheet. They're using Claude, Cursor, low-code connectors, whatever gets them unblocked. This is "vibe-coding": build fast, ship to yourself, iterate by feel.

The instinct is right. The seller closest to the pain point is often the fastest person to prototype a fix. But most orgs are handling this the wrong way either banning it outright (sellers route around the ban) or ignoring it (until it breaks something in production). Neither is a strategy.

Here's the actual tradeoff I observe, and what RevOps and IT/System teams need to do about it. The upside is real: a seller who vibe-codes helps themselves sell faster and has compressed a multi-week backlog request into an afternoon. The org's real automation backlog is bigger than what IT can staff. Left unaddressed, that backlog either stalls the business or gets built anyway just without oversight.`
      },
      {
        heading: "II. WHERE THE HAPPY PATH BREAKS",
        content: `The cost side is where it breaks. 

1. Unified sales process. One seller's shortcut is invisible to the next seller, to the manager running forecast, to the AE inheriting the account next quarter. A process that isn't documented, versioned, or shared isn't a process. It's a personal workaround with a shelf life of "until that person leaves."

2. Data quality and reporting. Vibe-coded tools write to the same CRM everyone reports off of. A script that writes a field in a slightly different format, skips a validation rule, or fires twice on retry corrupts data silently. Nobody catches it until the pipeline number in the board deck doesn't tie out.

3. Security. This is the sharp edge. To make their automation work, sellers often request broad API scopes in read/write across Opportunity, Account, Contact, sometimes admin-level connected app access because it's the fastest way to stop getting permission errors. Broad scope requested for convenience is still broad scope granted. If that credential leaks, gets reused in a public repo, or the automation itself has a bug, the blast radius is the whole org's revenue data, not one workflow.

4. Token and system usage. API call volume, LLM token spend, integration middleware capacity. These are shared, metered resources. An unmonitored script polling every 60 seconds or reprocessing full record sets instead of deltas can quietly burn a meaningful chunk of the org's API limit or AI spend, and nobody finds out until the invoice comes in.

5. Scale ceiling. A vibe-coded tool almost always works for one seller, on one laptop, with one seller's edge cases hardcoded in. It was never built to handle the tenth user's different territory rules, timezone, or record ownership model. It stays a personal tool because it structurally can't become an org-wide one without someone re-architecting it.`
      },
      {
        heading: "III. STANDING PERMISSION MODELS FOR MODERN SELLERS",
        content: `The instinct to request broad access isn't malicious. It's the path of least resistance when nobody's defined the narrower path. The fix is a standing permission model, not a case-by-case negotiation:

• Read-only by default on any object outside what the seller directly owns (their own Opportunities, their own Accounts).
• Write access scoped to specific fields, not full-object CRUD. A seller automating status updates gets written on the status field, not the object.
• No connected-app or API-user credential provisioning without RevOps/IT System sign-off. Sellers building on a personal integration user is how shadow access sprawls.
• No admin or metadata-level access Ever. Field creation, workflow/flow changes, and permission set changes stay with system owners.
• Sandbox-first for anything beyond a read. SalesOps should have sandbox access but be cautious about sandbox cross functional usage. If it can't be tested outside production, it doesn't ship to production unreviewed.`
      },
      {
        heading: "IV. THE EVOLUTION OF THE SYSTEM TEAM",
        content: `The argument "sellers can build it themselves now" misses what IT System actually does. It's not "write the script." It's:

Project structure. Sellers building solo don't design for error handling, retries, logging, or what happens when Salesforce changes a field type underneath them. They build a happy path. The IT system builds for the path that breaks at 2am.

Tech debt absorption. Every unowned vibe-coded tool that gains traction eventually becomes "critical" and lands on IT System's desk to stabilize, secure, and maintain usually after it's already broken something. The debt isn't avoided by letting sellers build; it's deferred and compounded.

Approval and intervention points. Vibe-coding by design skips the step where someone asks "should this be allowed to fire automatically, or does a human need to confirm first?" A seller automating outbound, discounting logic, or record deletion without a human-in-the-loop checkpoint is one bad prompt or one edge case away from a real incident like mass emails sent, wrong discount applied, records overwritten. IT System and RevOps exist to put that checkpoint back in before it's needed the hard way, not after.`
      },
      {
        heading: "V. PRODUCTIONIZING THE VIBE-CODE PIPELINE",
        content: `The goal isn't to kill the seller-led building. It's to give it a path to scale safely:

1. Intake, don't gatekeep. Give sellers a lightweight way to submit what they built and what problem it solves. Treat it as a fast-tracked backlog item, not a violation report.
2. Triage by blast radius. Does it read or write? Does it touch shared records or just the seller's own? Does it call an LLM with customer data? That determines review depth, not seniority or how good the demo looked.
3. Re-platform on the managed layer. If it's worth scaling, rebuild the logic on governed infrastructure by a flow, an approved integration platform, a proper connected app with scoped OAuth instead of grandfathering in the original script.
4. License the pattern, not the person's build. The value was the idea (webform triggers a ticket). The seller's implementation is a prototype, not the deliverable. Ship the pattern to everyone; retire the prototype.
5. Close the loop. Tell the seller what happened to their idea. Sellers stop going around the process when the process visibly turns their prototypes into real tools faster than staying invisible would.

Vibe-coding isn't the problem. Ungoverned vibe-coding with broad, unreviewed permissions and no path from prototype to production is. The orgs that get this right aren't the ones that ban it. They're the ones that built the on-ramp before they needed one.`
      }
    ]
  }
};

interface TimesMagazineProps {
  articleId: string | null;
  onClose: () => void;
  onArticleSelect: (id: string) => void;
}

export const TimesMagazine: React.FC<TimesMagazineProps> = ({ 
  articleId, 
  onClose,
  onArticleSelect
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [pastedText, setPastedText] = useState("");
  const [customArticle, setCustomArticle] = useState<TimesArticleData | null>(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [importTitle, setImportTitle] = useState("");
  const [importSubtitle, setImportSubtitle] = useState("");
  
  // Audio narration voice simulator state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Active article to render (either preset or custom)
  const currentArticle = customArticle || (articleId ? PRESET_ARTICLES[articleId] : PRESET_ARTICLES["gtm-vc"]);

  // Copy unique deep link for LinkedIn post
  const handleCopyLink = () => {
    const origin = window.location.origin + window.location.pathname;
    const shareUrl = `${origin}#articles?id=${currentArticle.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Import custom text into TIMES cover format
  const handleImportText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) return;

    // Split text into paragraphs for sections
    const paragraphs = pastedText.split("\n\n").filter(p => p.trim());
    const formattedSections = paragraphs.map((para, idx) => {
      const heading = idx === 0 ? "I. INTRODUCTION" : idx === 1 ? "II. CORE METHODOLOGY" : idx === 2 ? "III. METRICS & ANALYSIS" : `IV. CORE INSIGHT SECTION ${idx}`;
      return {
        heading,
        content: para.trim()
      };
    });

    const newDoc: TimesArticleData = {
      id: "custom-import",
      title: importTitle.trim() || "The Enterprise Scale Dilemma",
      subtitle: importSubtitle.trim() || "Insights Gathered From Unstructured Business Workflows",
      author: "Baoying You",
      role: "Global GTM CRM & Revenue Systems Product Manager",
      issueDate: "SPECIAL EDITION",
      volume: "VOL. I NO. 1",
      category: "COMMUNITY BRIEFING",
      coverTopic: "EXECUTIVE INTEL",
      sections: formattedSections,
      pullQuote: `“INNOVATION EMERGES THE MOMENT WE RE-ENGINEER PASSIVE ARCHITECTURES INTO ACTIVE WORKFLOW ENGINES.”`
    };

    setCustomArticle(newDoc);
    setIsImporterOpen(false);
    setPastedText("");
    setImportTitle("");
    setImportSubtitle("");
  };

  const handleClearCustom = () => {
    setCustomArticle(null);
  };

  // Web Speech API Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechPaused, setIsSpeechPaused] = useState(false);

  // Clean up any ongoing speech synthesis on article change or unmount
  React.useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentArticle.id]);

  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      // Fallback: just toggle simulated audio if SpeechSynthesis is not supported
      toggleAudio();
      return;
    }

    if (isSpeaking) {
      if (isSpeechPaused) {
        window.speechSynthesis.resume();
        setIsSpeechPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsSpeechPaused(true);
      }
    } else {
      window.speechSynthesis.cancel(); // Stop any ongoing speech first
      
      // Build full text to speak: title + subtitle + each section's heading and content
      const textParts = [
        currentArticle.title,
        currentArticle.subtitle,
        `By ${currentArticle.author}`,
      ];
      
      currentArticle.sections.forEach(section => {
        textParts.push(section.heading);
        textParts.push(section.content);
      });
      
      const fullText = textParts.join(". ");
      
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 1.05; // Slightly faster for natural reading
      utterance.pitch = 1.0;
      
      // Try to find a nice English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha"))) || voices.find(v => v.lang.startsWith("en"));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsSpeechPaused(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsSpeechPaused(false);
      };
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsSpeechPaused(false);
    }
  };

  const handleStopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsSpeechPaused(false);
  };

  // Simulating custom audio narration player
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div className="bg-[#FAF6EE] text-[#1a1310] border-4 border-[#c21d1d] rounded-2xl p-6 md:p-10 shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] relative z-20 overflow-hidden font-serif">
      
      {/* Newspaper grid watermarks & subtle textures */}
      <div className="absolute inset-0 bg-graph-paper opacity-5 pointer-events-none"></div>
      
      {/* Custom Red Signature TIME Board Framing Header */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#c21d1d] select-none"></div>

      {/* Retro Navigation header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-dashed border-[#8d8272]/30 pb-5 mb-8">
        <button 
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1310] hover:bg-[#c21d1d] text-[#FAF6EE] rounded font-sans text-xs font-bold transition-all cursor-pointer shadow-sm select-none"
        >
          <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
          <span>Back to Portfolio Home</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy LinkedIn Link button */}
          <button 
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0077b5] hover:bg-[#005582] text-white rounded font-sans text-xs font-extrabold transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5"
            title="Copy high-fidelity article link to attach on LinkedIn post"
          >
            {copiedLink ? (
              <>
                <Check className="h-4 w-4 stroke-[2.5]" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>LinkedIn Attachment Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* THE TIMES VINTAGE EDITORIAL COVER PAGE */}
      <div className="border-3 border-[#1a1310] p-6 md:p-10 bg-[#FAF6EE] relative select-none">
        
        {/* Newspaper Issue Details */}
        <div className="flex items-center justify-between text-[11px] font-sans font-black tracking-wider uppercase border-b-4 border-[#1a1310] pb-1.5 mb-1">
          <span>{currentArticle.volume}</span>
          <span>{currentArticle.issueDate}</span>
          <span>PORTFOLIO EDITION</span>
        </div>

        {/* TIME Iconic Old-Style Gothic Logo */}
        <div className="text-center py-6 border-b-2 border-[#1a1310] relative">
          <span className="font-sans text-[10px] font-black uppercase text-[#c21d1d] tracking-widest block mb-1">
            {currentArticle.category}
          </span>
          <h1 className="font-serif text-6xl md:text-8xl font-extrabold tracking-[-0.04em] text-[#c21d1d] leading-none select-none">
            TIME
          </h1>
          <span className="absolute bottom-1 right-2 font-sans text-[9px] font-bold text-zinc-400">
            BAOYING YOU PORTFOLIO SPECIAL
          </span>
        </div>

        {/* Vintage Cover Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Left Column: Left Margin System metrics & Side briefing */}
          <div className="lg:col-span-4 border-r-0 lg:border-r border-dashed border-[#8d8272]/40 lg:pr-8 text-left space-y-6">
            <div className="border-b-2 border-[#1a1310] pb-3">
              <span className="font-sans text-[10px] font-black uppercase text-[#c21d1d] block">SPECIAL BRIEFING</span>
              <h4 className="font-serif text-lg font-black leading-tight mt-1">{currentArticle.coverTopic}</h4>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="bg-amber-100/50 p-3 rounded-lg border border-amber-200">
                <span className="font-black uppercase tracking-wider block text-[9px] text-[#c21d1d] mb-1">THE GTM LEADER</span>
                <p className="font-serif italic text-zinc-800 leading-relaxed">
                  Baoying You is a distinguished GTM Product Manager who has masterminded enterprise transformations across Salesforce, CPQ, and multi-system automation hubs for global orgs.
                </p>
              </div>

              {/* Dynamic Audio Narration Box */}
              <div className="p-3 bg-zinc-100/80 rounded-lg border border-zinc-200 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                    <Volume2 className="h-3.5 w-3.5 text-zinc-600" />
                    Narrator Simulator
                  </span>
                  {isPlayingAudio && <span className="h-1.5 w-1.5 rounded-full bg-[#c21d1d] animate-ping"></span>}
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-sans">
                  Listen to an artificial summary narration of the Systems Analysis.
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleAudio}
                    className="p-1.5 bg-[#c21d1d] hover:bg-red-800 text-[#FAF6EE] rounded transition-all cursor-pointer"
                  >
                    {isPlayingAudio ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  </button>
                  <div className="flex-1 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#c21d1d] transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Switch to other Articles within TIMES */}
              <div className="space-y-2 pt-2">
                <span className="font-black uppercase tracking-wider block text-[9px] text-[#c21d1d]">
                  ALSO IN THIS ISSUE:
                </span>
                {Object.values(PRESET_ARTICLES).map((art) => {
                  if (art.id === currentArticle.id) return null;
                  return (
                    <button 
                      key={art.id}
                      onClick={() => {
                        onArticleSelect(art.id);
                        setCustomArticle(null);
                      }}
                      className="w-full text-left p-2.5 rounded bg-white hover:bg-red-50 border border-zinc-200 hover:border-[#c21d1d] transition-all group cursor-pointer flex items-center justify-between"
                    >
                      <div className="pr-2">
                        <h5 className="font-serif font-black text-xs text-zinc-800 group-hover:text-[#c21d1d] line-clamp-1">
                          {art.title}
                        </h5>
                        <span className="text-[9px] text-zinc-400 font-sans block">{art.issueDate}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 stroke-[2.5] text-zinc-400 group-hover:text-[#c21d1d] shrink-0" />
                    </button>
                  );
                })}
              </div>

              {/* Hand-drawn architectural sketch watermark */}
              <div className="pt-4 opacity-50 flex justify-center">
                <div className="border-2 border-zinc-300 rounded-lg p-3 text-center w-full select-none">
                  <div className="font-mono text-[9px] text-zinc-400">// AUDITED ARCHITECTURE</div>
                  <div className="text-zinc-600 font-serif italic text-[11px] font-bold mt-1">
                    CPQ Decoupled Calculator Pipeline
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actual full readable article body */}
          <div className="lg:col-span-8 text-left font-serif space-y-6">
            
             {/* Main Article Title Masthead */}
             <div className="space-y-3 pb-5 border-b-2 border-[#1a1310]/15">
               <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                 {currentArticle.title}
               </h2>
               <p className="text-lg md:text-xl font-medium text-zinc-650 italic leading-relaxed">
                 {currentArticle.subtitle}
               </p>
               
               <div className="flex flex-wrap items-center gap-2 pt-2 font-sans text-xs text-zinc-500 font-black tracking-wider uppercase">
                 <span>By {currentArticle.author}</span>
                 <span>•</span>
                 <span>{currentArticle.role}</span>
               </div>

               {/* Functional Audio Narrator Playback Controls */}
               <div className="flex flex-wrap items-center gap-3 pt-3 mt-1">
                 <button
                   onClick={handleToggleSpeech}
                   className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#c21d1d] hover:bg-red-800 text-white rounded font-sans text-xs font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 active:translate-y-0 select-none"
                   title="Listen to this article spoken aloud"
                 >
                   {isSpeaking && !isSpeechPaused ? (
                     <>
                       <Pause className="h-3.5 w-3.5 fill-current" />
                       <span>Pause Listening</span>
                     </>
                   ) : (
                     <>
                       <Volume2 className="h-3.5 w-3.5" />
                       <span>{isSpeechPaused ? "Resume Listening" : "Listen to Article"}</span>
                     </>
                   )}
                 </button>

                 {isSpeaking && (
                   <button
                     onClick={handleStopSpeech}
                     className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded font-sans text-xs font-bold transition-all cursor-pointer border border-zinc-300 select-none"
                   >
                     <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                     <span>Stop</span>
                   </button>
                 )}

                 {isSpeaking && (
                   <span className="text-[11px] font-sans text-zinc-500 italic animate-pulse">
                     {isSpeechPaused ? "Reading paused" : "Speaking... Enjoy the narration!"}
                   </span>
                 )}
               </div>
             </div>

            {/* Pull Quote Embedded inside News columns */}
            <div className="py-4 border-y-2 border-[#1a1310] my-6 text-center select-none">
              <span className="font-serif text-base md:text-lg font-black tracking-wide text-[#c21d1d] block max-w-2xl mx-auto italic leading-relaxed">
                {currentArticle.pullQuote}
              </span>
            </div>

            {/* Newspaper Styled Readable Text Paragraphs */}
            <div className="space-y-6 text-zinc-800 leading-relaxed text-sm md:text-base font-serif">
              {currentArticle.sections.map((section, sIdx) => {
                // Formatting the first section with a large elegant Drop Cap
                if (sIdx === 0) {
                  const firstChar = section.content.charAt(0);
                  const remainingText = section.content.slice(1);
                  return (
                    <div key={sIdx} className="space-y-2.5">
                      <h4 className="font-sans text-xs font-black tracking-wider uppercase text-[#c21d1d]">
                        {section.heading}
                      </h4>
                      <p className="indent-0">
                        <span className="float-left text-5xl md:text-6xl font-black font-serif text-[#c21d1d] pr-2.5 pt-1.5 leading-[0.8em]">
                          {firstChar}
                        </span>
                        {remainingText}
                      </p>
                    </div>
                  );
                }

                // Standard Section Formatting
                return (
                  <div key={sIdx} className="space-y-2.5">
                    <h4 className="font-sans text-xs font-black tracking-wider uppercase text-[#c21d1d]">
                      {section.heading}
                    </h4>
                    <p className="whitespace-pre-line text-justify leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sign-off Seal / Stamp */}
            <div className="pt-8 border-t border-dashed border-[#8d8272]/30 flex items-center justify-between font-sans text-xs text-zinc-400 select-none">
              <span>Published Editorial Release</span>
              <div className="flex items-center gap-1.5 text-zinc-500 font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>SYSTEM INTEGRITY RATED: EXCELLENT</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
