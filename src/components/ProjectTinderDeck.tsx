/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import {
  Sparkles,
  Heart,
  X,
  RotateCcw,
  Star,
  ArrowRight,
  ExternalLink,
  Bot,
  FileText,
  PlayCircle,
  Monitor,
  Workflow,
  FolderDot,
  Database,
  Leaf,
  Layers,
  Check,
  Link as LinkIcon,
  Flame,
  CheckCircle2,
  Share2,
  ChevronRight,
  Bookmark,
  Award,
  Zap,
  Briefcase
} from "lucide-react";
import { Project } from "../types";
import {
  AI_GTM_PROJECTS,
  TRADITIONAL_PROJECTS,
  EVALUATION_PROJECTS,
  MODELING_PROJECTS,
  SALES_PRO_PROJECTS
} from "../data";

export interface TinderCardItem {
  id: string;
  title: string;
  category: "Star Case Study" | "AI GTM & Workflows" | "Core GTM Systems" | "System Evaluation" | "Data Modeling" | "Revenue Growth Ops" | "PM Responsibility";
  categoryColor: string;
  categoryBg: string;
  icon: any;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  aiUse?: string;
  targetTab: "gong_revenue_agent" | "channel_partner_qtc" | "inactive_leads" | "revops_streamline" | "innovations_video" | "crm" | "jira_automation" | "n8n_orchestration" | "ai" | "traditional" | "evaluation" | "modeling" | "sales";
  isSpecialCaseStudy: boolean;
  demoUrl?: string;
  stats?: { label: string; value: string }[];
  highlightBadge?: string;
}

// Master list of all cards for the Project Card Deck
export const MASTER_DECK: TinderCardItem[] = [
  {
    id: "pm_responsibility",
    title: "GTM PM: BRD & SSoT to Multi-Channel AI Reactivation",
    category: "PM Responsibility",
    categoryColor: "text-blue-900",
    categoryBg: "bg-blue-100 border-blue-300",
    icon: Briefcase,
    problem: "A GTM Product Manager, I interview/connect/discover/document BRD/Pain point => define SSoT => translate a complex automation into a results-driven business outcome with data models/data mapping/data system access creation and governance.",
    solution: "Present solution: Identify the inactive, higher-potential leads (SDR-vetted but stale/Lead Scoring/Filtering) and implement an intelligent, personalized, and fully automated reactivation system.",
    impact: "I prioritized and built a unified, multi-channel GTM automation using n8n to connect Salesforce, AI-driven personalization via OpenAI, and automated Gmail outreach with response-driven logic.",
    tools: ["BRD / Pain Point Discovery", "SSoT Definition", "Data Models & Mapping", "Data Governance & Access", "n8n Orchestration", "Salesforce CRM", "OpenAI Personalization", "Gmail Outreach API"],
    aiUse: "n8n Multi-Channel Orchestration + OpenAI Personalization + Response-Driven Logic",
    targetTab: "inactive_leads",
    isSpecialCaseStudy: true,
    highlightBadge: "💼 GTM Product Manager Responsibility",
    stats: [
      { label: "PM Discovery", value: "BRD ➔ SSoT" },
      { label: "Data Ops", value: "Model & Access" },
      { label: "Lead Filter", value: "SDR-Vetted Stale" },
      { label: "Execution", value: "n8n + AI + Gmail" }
    ]
  },
  {
    id: "gong_revenue_agent",
    title: "Gong Revenue Intelligence Agent",
    category: "Star Case Study",
    categoryColor: "text-violet-900",
    categoryBg: "bg-violet-100 border-violet-300",
    icon: Bot,
    problem: "Three symptoms, one root cause: AEs enter calls blind to CRM state; post-call MEDDIC & Task logging is inconsistent (38% completion, 54% freshness); forecast reviews run on stale CRM fields missing buyer verbal signals recorded in Gong.",
    solution: "Consolidated 3-stream agent on one spine: Stream A Pre-Call Slack briefs, Stream B Post-Call MEDDIC & Task delta-sync with deterministic n8n confidence gate and zero-overwrite rules, Stream C Scheduled forecast checks, and a durable Notion audit log.",
    impact: "MEDDIC field completion jumped 38% → 86%, Next Step freshness 54% → 91%, AE post-call admin reduced by 17 min/call, manager deal-review prep cut by 40%, and zero unreviewed AI overwrites.",
    tools: ["Gong API", "Salesforce Core", "Claude 3.5 Sonnet", "n8n Orchestrator", "Slack Interactive Cards", "Notion Database"],
    aiUse: "Gong Webhooks + Claude Synthesis + Deterministic n8n Scorer",
    targetTab: "gong_revenue_agent",
    isSpecialCaseStudy: true,
    highlightBadge: "🔥 STAR Architectural Case Study",
    stats: [
      { label: "MEDDIC Fill", value: "86% (from 38%)" },
      { label: "Next Step Fresh", value: "91% (from 54%)" },
      { label: "AE Admin Time", value: "-17 min/call" },
      { label: "Review Prep", value: "-40% Time" }
    ]
  },
  {
    id: "channel_partner_qtc",
    title: "Channel Partner QTC Automation",
    category: "Star Case Study",
    categoryColor: "text-emerald-800",
    categoryBg: "bg-emerald-100 border-emerald-300",
    icon: Bot,
    problem: "Severe indirect channel partner friction: Manual portal workflows, slow approvals (5 business days), slow QTC cycle time (8 days), 24% duplicate lead registrations, and revenue leakage ($145 per deal reg).",
    solution: "Product Manager E2E Solution: Custom Partner Portal & 4-Agent Intelligent AI Swarm with Slack/Teams self-service hooks, DRICAD governance, automated deduction engine, and pre-filtering layer.",
    impact: "Deal registration approval time cut from 5 days to < 10 mins (99.6% speedup), QTC cycle time reduced from 8 days to < 24 hrs, partner adoption (MAP) soared from 28% to 82%, duplicate registration dropped from 24% to < 2%, and channel ops cost slashed by 72%.",
    tools: ["Salesforce Experience Cloud", "Slack & Teams Bots", "AI Agent Swarm", "CPQ / Billing", "ERP Sync", "DRICAD Governance"],
    aiUse: "4-Agent Swarm: Identify & Dedupe, Discount Validation, Parallel Approval, OM Syncing",
    targetTab: "channel_partner_qtc",
    isSpecialCaseStudy: true,
    highlightBadge: "🔥 STAR Architectural Case Study",
    stats: [
      { label: "Deal Approval", value: "< 10 Mins" },
      { label: "QTC Time", value: "< 24 Hours" },
      { label: "Partner MAP", value: "82% (+54%)" },
      { label: "Cost Reduction", value: "72%" }
    ]
  },
  {
    id: "inactive_leads",
    title: "AI Dead Lead Reactivation System",
    category: "Star Case Study",
    categoryColor: "text-emerald-800",
    categoryBg: "bg-emerald-100 border-emerald-300",
    icon: Bot,
    problem: "20,000+ high-potential dormant leads in Salesforce were untouched for >180 days, costing manual SDR time for minimal return.",
    solution: "Autonomous STAR multi-agent pipeline: SOQL scoring in Salesforce, Clay/ZeroBounce waterfall verification, and OpenAI GPT-4o 3-sentence dynamic personalization.",
    impact: "$3.2M pipeline created, 4,500+ reactivated leads, $850k closed-won ARR, and 100% SDR time saved (14.2x ROI).",
    tools: ["Salesforce CRM", "n8n AI Engine", "OpenAI GPT-4o", "Clay Waterfall", "ZeroBounce API", "Smartlead"],
    aiUse: "n8n Autonomous Orchestration + Clay + ZeroBounce + GPT-4o",
    targetTab: "inactive_leads",
    isSpecialCaseStudy: true,
    highlightBadge: "🔥 STAR Architectural Case Study",
    stats: [
      { label: "Pipeline Created", value: "$3.2M" },
      { label: "Closed-Won ARR", value: "$850k" },
      { label: "Reactivated", value: "4,500+" },
      { label: "SDR Hours Saved", value: "100%" }
    ]
  },
  {
    id: "revops_streamline",
    title: "Revenue Systems Streamline Initiative",
    category: "Star Case Study",
    categoryColor: "text-emerald-800",
    categoryBg: "bg-emerald-100 border-emerald-300",
    icon: FileText,
    problem: "11 fragmented tools caused severe data clashing and >1 hour upload delays scaling AE bench from 20 to 50 reps during HubSpot → Salesforce migration.",
    solution: "Evaluated 4 architectural paths and implemented Middleware AI Orchestration via n8n, Claude 3.5 Sonnet hierarchy resolution (PE → Parent → Child), and Salesforce Bulk API v2.",
    impact: "Cut campaign ingestion from 60+ mins to <5 mins (12x speedup), achieved >90% hierarchy accuracy, >15% call connects, and 100% Salesforce adoption.",
    tools: ["n8n Orchestration", "Claude 3.5 Sonnet", "Salesforce Bulk API v2", "Clay Waterfall", "HubSpot Decommission"],
    aiUse: "n8n AI Orchestration & Claude 3.5 Sonnet LLM",
    targetTab: "revops_streamline",
    isSpecialCaseStudy: true,
    highlightBadge: "📄 Interactive Blueprint & Architecture",
    stats: [
      { label: "Speedup", value: "12x Faster" },
      { label: "Processing Time", value: "<5 mins" },
      { label: "Hierarchy Accuracy", value: ">90%" },
      { label: "SFDC Adoption", value: "100%" }
    ]
  },
  {
    id: "innovations_video",
    title: "Architectural Innovations & Enterprise Design",
    category: "Star Case Study",
    categoryColor: "text-amber-800",
    categoryBg: "bg-amber-100 border-amber-300",
    icon: PlayCircle,
    problem: "Disconnected enterprise systems lack standardized commercial architectures, leading to data leakage across customer journeys.",
    solution: "Video walkthrough of global process mapping, advanced RevOps routing mechanisms, and custom REST relays with zero leakage.",
    impact: "Provides clear architectural blueprints for scaling customer operations databases and connecting modular APIs.",
    tools: ["Systems Design", "Salesforce RevOps", "Enterprise GTM", "Workflow Automation", "API Integration"],
    targetTab: "innovations_video",
    isSpecialCaseStudy: true,
    highlightBadge: "🎥 Video Demonstration",
    stats: [
      { label: "Format", value: "Full Video" },
      { label: "Focus", value: "Systems Architecture" },
      { label: "Scope", value: "Enterprise GTM" }
    ]
  },
  {
    id: "crm",
    title: "Custom CRM Prototype Demonstration",
    category: "Star Case Study",
    categoryColor: "text-emerald-800",
    categoryBg: "bg-emerald-100 border-emerald-300",
    icon: Monitor,
    problem: "Traditional CRM interfaces are clunky, rigid, and slow down sales representatives with manual field entries.",
    solution: "Replaces traditional layouts with a high-velocity whiteboard flow, real-time background queues, and dynamic pipeline widgets.",
    impact: "Streamlines lead qualification and delivers instantaneous bidirectional sync with Salesforce.",
    tools: ["React 18", "Tailwind CSS", "Express Server", "Salesforce API", "Google Cloud"],
    targetTab: "crm",
    isSpecialCaseStudy: true,
    highlightBadge: "🎥 Interactive Prototype Video",
    stats: [
      { label: "Architecture", value: "Whiteboard Flow" },
      { label: "Sync Latency", value: "Instant" },
      { label: "Manual Entry", value: "0%" }
    ]
  },
  {
    id: "jira_automation",
    title: "Salesforce & JIRA Bi-Directional Synchronization",
    category: "Star Case Study",
    categoryColor: "text-sky-800",
    categoryBg: "bg-sky-100 border-sky-300",
    icon: Workflow,
    problem: "Commercial account managers and engineering product teams operated in siloes with slow manual issue tracking.",
    solution: "Bi-directional synchronization listening to webhook events, triggering automatic JIRA issues, and relaying bug fixes to Salesforce.",
    impact: "Eliminates cross-department communication latency and aligns commercial deals with engineering delivery.",
    tools: ["Salesforce", "JIRA API", "Mulesoft / Zapier", "Webhooks", "Issue Sync"],
    targetTab: "jira_automation",
    isSpecialCaseStudy: true,
    highlightBadge: "🎥 Integration Video",
    stats: [
      { label: "Sync Mode", value: "Bi-Directional" },
      { label: "Latency", value: "Real-time" },
      { label: "Alignment", value: "100%" }
    ]
  },
  {
    id: "n8n_orchestration",
    title: "n8n Multi-SaaS Orchestration in GTM",
    category: "Star Case Study",
    categoryColor: "text-indigo-800",
    categoryBg: "bg-indigo-100 border-indigo-300",
    icon: Workflow,
    problem: "Complex multi-SaaS commercial ecosystems struggle with inflexible custom scripts and fragile point-to-point connections.",
    solution: "Visual node-based workflow orchestration executing advanced payload mutations, rate-limiting, and resilient event triggers.",
    impact: "Unifies diverse marketing, sales, and analytics systems into a self-documenting, fault-tolerant integration hub.",
    tools: ["n8n", "Workflow Engines", "APIs", "GTM Integration", "Webhooks"],
    targetTab: "n8n_orchestration",
    isSpecialCaseStudy: true,
    highlightBadge: "🎥 Orchestration Video",
    stats: [
      { label: "Engine", value: "n8n Visual Nodes" },
      { label: "Reliability", value: "99.9%" },
      { label: "Architecture", value: "Event-Driven" }
    ]
  },
  // AI GTM Projects
  ...AI_GTM_PROJECTS.slice(2).map((p, idx) => ({
    id: `ai_proj_${idx}`,
    title: p.title,
    category: "AI GTM & Workflows" as const,
    categoryColor: "text-indigo-800",
    categoryBg: "bg-indigo-100 border-indigo-300",
    icon: Bot,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    tools: p.tools,
    aiUse: p.aiUse,
    targetTab: "ai" as const,
    isSpecialCaseStudy: false,
    demoUrl: p.demoUrl,
    highlightBadge: "🤖 AI Intelligent Workflow"
  })),
  // Traditional GTM Projects
  ...TRADITIONAL_PROJECTS.map((p, idx) => ({
    id: `trad_proj_${idx}`,
    title: p.title,
    category: "Core GTM Systems" as const,
    categoryColor: "text-teal-800",
    categoryBg: "bg-teal-100 border-teal-300",
    icon: FolderDot,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    tools: p.tools,
    targetTab: "traditional" as const,
    isSpecialCaseStudy: false,
    demoUrl: p.demoUrl,
    highlightBadge: "⚙️ Core GTM System"
  })),
  // System Evaluation Projects
  ...EVALUATION_PROJECTS.slice(1).map((p, idx) => ({
    id: `eval_proj_${idx}`,
    title: p.title,
    category: "System Evaluation" as const,
    categoryColor: "text-amber-800",
    categoryBg: "bg-amber-100 border-amber-300",
    icon: FileText,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    tools: p.tools,
    targetTab: "evaluation" as const,
    isSpecialCaseStudy: false,
    demoUrl: p.demoUrl,
    highlightBadge: "📊 Architectural Audit"
  })),
  // Data Modeling Projects
  ...MODELING_PROJECTS.map((p, idx) => ({
    id: `model_proj_${idx}`,
    title: p.title,
    category: "Data Modeling" as const,
    categoryColor: "text-rose-800",
    categoryBg: "bg-rose-100 border-rose-300",
    icon: Database,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    tools: p.tools,
    targetTab: "modeling" as const,
    isSpecialCaseStudy: false,
    demoUrl: p.demoUrl,
    highlightBadge: "🗄️ Schema & Golden Record"
  })),
  // Revenue Growth Ops Projects
  ...SALES_PRO_PROJECTS.map((p, idx) => ({
    id: `sales_proj_${idx}`,
    title: p.title,
    category: "Revenue Growth Ops" as const,
    categoryColor: "text-purple-800",
    categoryBg: "bg-purple-100 border-purple-300",
    icon: Leaf,
    problem: p.problem,
    solution: p.solution,
    impact: p.impact,
    tools: p.tools,
    targetTab: "sales" as const,
    isSpecialCaseStudy: false,
    demoUrl: p.demoUrl,
    highlightBadge: "📈 SOP & Revenue Engine"
  }))
];

interface ProjectTinderDeckProps {
  onSelectProjectDetail: (tab: TinderCardItem["targetTab"]) => void;
  onCopyLink?: (text: string, label: string) => void;
  copiedLabel?: string | null;
  likedProjects?: string[];
  onLikeProject?: (id: string) => void;
}

const LIKED_PROJECTS_STORAGE_KEY = "gtm_tinder_liked_projects";
const DECK_INDEX_STORAGE_KEY = "gtm_tinder_card_index";
const DECK_CATEGORY_STORAGE_KEY = "gtm_tinder_category_filter";
const DECK_HISTORY_STORAGE_KEY = "gtm_tinder_history";

export const ProjectTinderDeck: React.FC<ProjectTinderDeckProps> = ({
  onSelectProjectDetail,
  onCopyLink,
  copiedLabel,
  likedProjects: propsLikedProjects,
  onLikeProject
}) => {
  // Load initial filter category from localStorage
  const [filterCategory, setFilterCategory] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(DECK_CATEGORY_STORAGE_KEY);
      if (saved) return saved;
    } catch {}
    return "all";
  });

  // Load initial current card index from localStorage
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(DECK_INDEX_STORAGE_KEY);
      if (saved !== null) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num >= 0) return num;
      }
    } catch {}
    return 0;
  });

  // Load navigation history stack from localStorage
  const [history, setHistory] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_HISTORY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Load liked projects permanently from localStorage
  const [internalLiked, setInternalLiked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LIKED_PROJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error loading liked projects", e);
    }
    return [];
  });

  // Combine parent-provided liked items with localStorage to ensure 100% permanence
  const likedProjects = React.useMemo(() => {
    const combined = [...(propsLikedProjects || []), ...internalLiked];
    return Array.from(new Set(combined));
  }, [propsLikedProjects, internalLiked]);

  // Sync internal liked list back to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LIKED_PROJECTS_STORAGE_KEY, JSON.stringify(likedProjects));
    } catch {}
  }, [likedProjects]);

  // Persist current index and history
  useEffect(() => {
    try {
      localStorage.setItem(DECK_INDEX_STORAGE_KEY, String(currentIndex));
    } catch {}
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_CATEGORY_STORAGE_KEY, filterCategory);
    } catch {}
  }, [filterCategory]);

  const [matchedCard, setMatchedCard] = useState<TinderCardItem | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "super" | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [inspectedCard, setInspectedCard] = useState<TinderCardItem | null>(null);

  // Filtered deck
  const activeDeck = React.useMemo(() => {
    if (filterCategory === "all") return MASTER_DECK;
    if (filterCategory === "liked") {
      const liked = MASTER_DECK.filter((c) => likedProjects.includes(c.id));
      return liked.length > 0 ? liked : MASTER_DECK;
    }
    return MASTER_DECK.filter((c) => c.category === filterCategory);
  }, [filterCategory, likedProjects]);

  // Handle explicit category selection
  const handleSelectCategory = (catId: string) => {
    setFilterCategory(catId);
    setCurrentIndex(0);
    setHistory([]);
    try {
      localStorage.setItem(DECK_CATEGORY_STORAGE_KEY, catId);
      localStorage.setItem(DECK_INDEX_STORAGE_KEY, "0");
      localStorage.setItem(DECK_HISTORY_STORAGE_KEY, JSON.stringify([]));
    } catch {}
  };

  const currentCard = activeDeck.length > 0 ? activeDeck[currentIndex % activeDeck.length] : MASTER_DECK[0];

  // Motion values for top card drag
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-20, -120], [0, 1]);

  const handleSwipe = (direction: "left" | "right" | "super") => {
    if (!currentCard) return;

    setSwipeDirection(direction);

    // CRITICAL: Once a project is marked as Like, it is stored permanently and NEVER removed
    if (direction === "right" || direction === "super") {
      if (!likedProjects.includes(currentCard.id)) {
        const updated = Array.from(new Set([...likedProjects, currentCard.id]));
        setInternalLiked(updated);
        try {
          localStorage.setItem(LIKED_PROJECTS_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        if (onLikeProject) {
          onLikeProject(currentCard.id);
        }
      }
      setMatchedCard(currentCard);
    }

    setHistory((prev) => [...prev, currentIndex]);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeDeck.length);
      setSwipeDirection(null);
      x.set(0);
    }, 280);
  };

  const canRewind = history.length > 0 || currentIndex > 0;

  // Rewind to previous card - DOES NOT remove any likes
  const handleRewind = () => {
    if (!canRewind) return;
    if (history.length > 0) {
      const prevIdx = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentIndex(prevIdx);
    } else if (currentIndex > 0) {
      setCurrentIndex((prev) => (prev - 1 + activeDeck.length) % activeDeck.length);
    }
    setSwipeDirection(null);
    x.set(0);
  };

  const handleOpenDetail = (card: TinderCardItem) => {
    onSelectProjectDetail(card.targetTab);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSwipe("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSwipe("right");
      } else if (e.key === "ArrowUp" || e.key === "Enter") {
        e.preventDefault();
        if (currentCard) {
          handleOpenDetail(currentCard);
        }
      } else if (e.key === "ArrowDown" || e.key === "Backspace") {
        e.preventDefault();
        handleRewind();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, activeDeck, history, likedProjects]);

  return (
    <div className="space-y-6">
      {/* Category Pills & Saved Matches Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-dashed border-zinc-200 pb-3">
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: `🎴 All Deck (${MASTER_DECK.length})` },
            { id: "Star Case Study", label: `⭐ Case Studies (${MASTER_DECK.filter(c => c.category === "Star Case Study").length})` },
            { id: "AI GTM & Workflows", label: `🤖 AI & Workflows (${MASTER_DECK.filter(c => c.category === "AI GTM & Workflows").length})` },
            { id: "Core GTM Systems", label: `⚙️ Core GTM (${MASTER_DECK.filter(c => c.category === "Core GTM Systems").length})` },
            { id: "System Evaluation", label: `📊 Evaluations (${MASTER_DECK.filter(c => c.category === "System Evaluation").length})` },
            { id: "Data Modeling", label: `🗄️ Modeling (${MASTER_DECK.filter(c => c.category === "Data Modeling").length})` },
            { id: "Revenue Growth Ops", label: `📈 Revenue SOPs (${MASTER_DECK.filter(c => c.category === "Revenue Growth Ops").length})` },
            {
              id: "liked",
              label: `❤️ Liked (${likedProjects.length})`,
              highlight: likedProjects.length > 0
            },
            {
              id: "PM Responsibility",
              label: `💼 PM Responsibility (${MASTER_DECK.filter(c => c.category === "PM Responsibility").length})`
            }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`px-3 py-1 rounded-full font-hand text-xs font-bold border-2 transition-all cursor-pointer select-none shrink-0 ${
                filterCategory === cat.id
                  ? "bg-ink text-white border-ink shadow-[2px_2px_0px_0px_rgba(244,63,94,1)] scale-105"
                  : cat.highlight
                  ? "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100 animate-pulse"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Swipe Instructions Prompt */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-zinc-500 font-bold bg-zinc-100 px-3 py-1 rounded-lg border border-zinc-200 shrink-0">
          <span>👈 Swipe Left to Pass</span>
          <span className="text-zinc-300">|</span>
          <span>👉 Swipe Right to Like</span>
          <span className="text-zinc-300">|</span>
          <span>⭐ Space / Up for Deep Dive</span>
        </div>
      </div>

      {/* Main Tinder Card Deck Area */}
      <div className="relative min-h-[580px] sm:min-h-[540px] flex flex-col items-center justify-center py-2 select-none">
        {/* Background Stack Cards (Visual Depth) */}
        <div className="w-full max-w-xl relative flex justify-center items-center">
          {/* Stack Card 3 (Bottom) */}
          {activeDeck.length > 2 && (
            <div
              className="absolute top-6 w-full max-w-lg bg-zinc-100 border-3 border-zinc-300 rounded-3xl p-6 shadow-sm opacity-50 pointer-events-none scale-90 -z-20 transition-all duration-300"
              style={{ transform: "translateY(24px) scale(0.90)" }}
            />
          )}

          {/* Stack Card 2 (Middle) */}
          {activeDeck.length > 1 && (
            <div
              className="absolute top-3 w-full max-w-lg bg-zinc-50 border-3 border-zinc-400 rounded-3xl p-6 shadow-md opacity-80 pointer-events-none scale-95 -z-10 transition-all duration-300"
              style={{ transform: "translateY(12px) scale(0.95)" }}
            >
              <div className="h-4 bg-zinc-200 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-zinc-200 rounded w-3/4 mb-4"></div>
              <div className="h-20 bg-zinc-100 rounded mb-4"></div>
            </div>
          )}

          {/* Top Active Tinder Card */}
          {currentCard && (
            <motion.div
              key={currentCard.id + "_" + currentIndex}
              style={{ x, rotate }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (info.offset.x > 90 || info.velocity.x > 350) {
                  handleSwipe("right");
                } else if (info.offset.x < -90 || info.velocity.x < -350) {
                  handleSwipe("left");
                }
              }}
              animate={
                swipeDirection === "right"
                  ? { x: 500, opacity: 0, rotate: 20 }
                  : swipeDirection === "left"
                  ? { x: -500, opacity: 0, rotate: -20 }
                  : swipeDirection === "super"
                  ? { y: -400, opacity: 0, scale: 1.1 }
                  : { x: 0, y: 0, opacity: 1, rotate: 0 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-w-lg bg-white border-3 border-ink rounded-3xl p-6 sm:p-7 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] relative z-20 cursor-grab active:cursor-grabbing flex flex-col justify-between"
            >
              {/* Animated LIKE Stamp */}
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-7 left-7 z-30 pointer-events-none border-4 border-emerald-600 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl font-hand font-black text-xl sm:text-2xl tracking-wider uppercase rotate-[-15deg] shadow-lg flex items-center gap-1.5"
              >
                <Heart className="h-6 w-6 fill-emerald-600 text-emerald-600" />
                <span>MATCH / LIKE</span>
              </motion.div>

              {/* Animated NOPE Stamp */}
              <motion.div
                style={{ opacity: passOpacity }}
                className="absolute top-7 right-7 z-30 pointer-events-none border-4 border-rose-600 bg-rose-50 text-rose-700 px-4 py-1.5 rounded-xl font-hand font-black text-xl sm:text-2xl tracking-wider uppercase rotate-[15deg] shadow-lg flex items-center gap-1.5"
              >
                <X className="h-6 w-6 text-rose-600 stroke-[3]" />
                <span>PASS / NOPE</span>
              </motion.div>

              {/* Card Header & Category Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-hand text-xs font-bold border-2 ${currentCard.categoryBg} ${currentCard.categoryColor}`}
                    >
                      {React.createElement(currentCard.icon, {
                        className: "h-3.5 w-3.5 shrink-0"
                      })}
                      {currentCard.category}
                    </span>
                    {currentCard.highlightBadge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 font-mono text-[10px] font-bold">
                        {currentCard.highlightBadge}
                      </span>
                    )}
                    {likedProjects.includes(currentCard.id) && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border-2 border-rose-300 text-rose-700 font-hand text-xs font-black shadow-xs animate-fade-in">
                        <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                        <span>Liked ❤️</span>
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-zinc-400 font-bold">
                    #{currentIndex + 1} / {activeDeck.length}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-sans font-black text-xl sm:text-2xl text-zinc-900 tracking-tight leading-snug mb-3">
                  {currentCard.title}
                </h3>

                {/* AI / Custom Banner */}
                {currentCard.aiUse && (
                  <div className="p-2 bg-indigo-50/80 border border-indigo-200 rounded-xl text-indigo-950 font-sans text-xs font-semibold mb-4 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5 animate-spin" />
                    <span>
                      <strong className="text-indigo-900">AI Stack:</strong> {currentCard.aiUse}
                    </span>
                  </div>
                )}

                {/* Key Metrics Bento (if available) */}
                {currentCard.stats && currentCard.stats.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {currentCard.stats.map((stat, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-2 text-center"
                      >
                        <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-800 font-bold block">
                          {stat.label}
                        </span>
                        <span className="font-sans font-black text-sm sm:text-base text-emerald-950">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Problem, Solution, Impact Details */}
                <div className="space-y-3 font-sans text-xs">
                  {/* Problem */}
                  <div className="bg-red-50/60 p-2.5 rounded-xl border border-red-200">
                    <span className="font-mono text-[10px] font-bold uppercase text-red-700 block mb-0.5">
                      🚨 Friction Point / Problem:
                    </span>
                    <p className="text-zinc-700 leading-relaxed">{currentCard.problem}</p>
                  </div>

                  {/* Solution */}
                  <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-200">
                    <span className="font-mono text-[10px] font-bold uppercase text-blue-700 block mb-0.5">
                      💡 Architecture / Solution:
                    </span>
                    <p className="text-zinc-700 leading-relaxed">{currentCard.solution}</p>
                  </div>

                  {/* Impact */}
                  <div className="bg-emerald-50/80 p-2.5 rounded-xl border-2 border-emerald-400">
                    <span className="font-mono text-[10px] font-bold uppercase text-emerald-800 block mb-0.5">
                      🚀 Business & Revenue Impact:
                    </span>
                    <p className="text-emerald-950 font-bold leading-relaxed">{currentCard.impact}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Tech Pills & Deep Dive Action */}
              <div className="mt-5 pt-4 border-t border-dashed border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 max-w-[60%]">
                  {currentCard.tools.slice(0, 4).map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 font-mono text-[10px] font-bold text-zinc-700 bg-zinc-100 border border-zinc-200 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                  {currentCard.tools.length > 4 && (
                    <span className="px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 bg-zinc-100 rounded">
                      +{currentCard.tools.length - 4} more
                    </span>
                  )}
                </div>

                {/* Inspect Deep Dive Button directly on card */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetail(currentCard);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink hover:bg-neutral-800 text-white rounded-xl font-hand text-xs font-bold border-2 border-ink shadow-[2px_2px_0px_0px_rgba(244,63,94,1)] active:translate-y-0.5 cursor-pointer transition-all shrink-0"
                >
                  <span>Deep Dive</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tinder Action Buttons Bar */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mt-6 z-30">
          {/* Rewind / Undo Button (Backward) */}
          <button
            onClick={handleRewind}
            disabled={!canRewind}
            title="Backward / Rewind to previous card (Liked projects stay saved permanently)"
            className="w-12 h-12 rounded-full bg-white hover:bg-amber-50 text-amber-500 border-3 border-ink flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          {/* Pass / Dislike (Swipe Left) */}
          <button
            onClick={() => handleSwipe("left")}
            title="Pass card (Swipe Left) — Liked projects stay saved permanently"
            className="w-14 h-14 rounded-full bg-white hover:bg-rose-50 text-rose-600 border-3 border-ink flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer group"
          >
            <X className="h-7 w-7 stroke-[3] group-hover:scale-110 transition-transform" />
          </button>

          {/* Super Star / Deep Dive Detail */}
          <button
            onClick={() => currentCard && handleOpenDetail(currentCard)}
            title="Deep Dive Case Study (Space / Enter)"
            className="w-16 h-16 rounded-full bg-sky-400 hover:bg-sky-500 text-white border-3 border-ink flex flex-col items-center justify-center shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer group scale-105"
          >
            <Star className="h-7 w-7 fill-white text-white group-hover:rotate-45 transition-transform" />
            <span className="font-hand text-[9px] font-black uppercase tracking-tight -mt-0.5">
              Inspect
            </span>
          </button>

          {/* Like / Match (Swipe Right) */}
          {(() => {
            const isAlreadyLiked = currentCard ? likedProjects.includes(currentCard.id) : false;
            return (
              <button
                onClick={() => handleSwipe("right")}
                title={isAlreadyLiked ? "Marked as Liked (Permanently saved in your collection)" : "Like & Save Match (Swipe Right)"}
                className={`w-14 h-14 rounded-full border-3 border-ink flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer group ${
                  isAlreadyLiked
                    ? "bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-500 ring-2 ring-rose-300"
                    : "bg-white hover:bg-emerald-50 text-emerald-600"
                }`}
              >
                <Heart className={`h-7 w-7 transition-transform group-hover:scale-110 ${
                  isAlreadyLiked ? "fill-rose-500 text-rose-500" : "fill-emerald-500 text-emerald-500"
                }`} />
              </button>
            );
          })()}

          {/* Share / Copy Link to Current Card */}
          <button
            onClick={() => {
              if (currentCard) {
                const link = `${window.location.origin}/#projects?tab=${currentCard.targetTab}`;
                if (onCopyLink) {
                  onCopyLink(link, `Link to ${currentCard.targetTab}`);
                } else {
                  navigator.clipboard.writeText(link);
                }
              }
            }}
            title="Copy direct link to this project"
            className="w-12 h-12 rounded-full bg-white hover:bg-purple-50 text-purple-600 border-3 border-ink flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all cursor-pointer"
          >
            {copiedLabel?.includes(currentCard?.targetTab || "") ? (
              <Check className="h-5 w-5 text-emerald-600 animate-scale-up" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* "IT'S A MATCH!" Celebratory Pop-up Modal / Toast */}
      <AnimatePresence>
        {matchedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="fixed inset-x-4 bottom-6 md:inset-auto md:right-8 md:bottom-8 md:max-w-md bg-white border-3 border-ink rounded-2xl p-5 shadow-[8px_8px_0px_0px_rgba(244,63,94,1)] z-50 animate-fade-in"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-rose-100 text-rose-600 rounded-full border border-rose-300 animate-bounce">
                  <Flame className="h-5 w-5 fill-rose-500" />
                </span>
                <div>
                  <span className="font-hand font-black text-xs text-rose-600 uppercase tracking-wider block">
                    IT'S A REVOPS MATCH!
                  </span>
                  <h4 className="font-sans font-black text-sm text-zinc-900">
                    {matchedCard.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setMatchedCard(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="font-sans text-xs text-zinc-650 mb-4 line-clamp-2">
              {matchedCard.impact}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const target = matchedCard;
                  setMatchedCard(null);
                  handleOpenDetail(target);
                }}
                className="flex-1 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-hand text-xs font-bold border-2 border-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1"
              >
                <span>🚀 Inspect Full Case Study</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setMatchedCard(null)}
                className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-hand text-xs font-bold border-2 border-zinc-300 cursor-pointer"
              >
                Keep Swiping
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
