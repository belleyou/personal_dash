import React from "react";
import {
  Layers,
  Bot,
  Link2,
  MessageSquare,
  Code2,
  Archive,
  FileText,
  Key,
  Table,
  Clock,
  PenTool,
  Sparkles,
  CornerDownRight,
  CornerUpRight,
  FileInput,
  Filter,
  FileCheck,
  Hexagon,
  Code,
  Globe,
  GitBranch,
  Wand2,
  SlidersHorizontal,
  Repeat,
  MousePointer,
  GitMerge,
  Share2,
  HardDrive,
  Copy,
  Send,
  Rss,
  CalendarClock,
  ArrowUpDown,
  ListTree,
  AlertOctagon,
  ClipboardList,
  GitFork,
  Tag,
  Database,
  Pause,
  Radio,
  FileCode,
  Workflow,
} from "lucide-react";
import { GTMVendor } from "../data/gtmVendorData";

interface N8nNodeLogoProps {
  vendor: GTMVendor;
  className?: string;
}

export const N8nNodeLogo: React.FC<N8nNodeLogoProps> = ({ vendor, className = "w-5 h-5" }) => {
  const v = vendor.vendor.toLowerCase().trim();

  // Distinct icon renderer for all 42 n8n built-in nodes
  switch (v) {
    case "aggregate":
      return <Layers className={`${className} text-[#ff6d5a]`} />;
    case "ai agent":
      return <Bot className={`${className} text-purple-600`} />;
    case "basic llm chain":
      return <Link2 className={`${className} text-purple-600`} />;
    case "chat trigger":
      return <MessageSquare className={`${className} text-purple-500`} />;
    case "code":
      return <Code2 className={`${className} text-[#ff6d5a]`} />;
    case "compression":
      return <Archive className={`${className} text-sky-600`} />;
    case "convert to file":
      return <FileText className={`${className} text-sky-600`} />;
    case "crypto":
      return <Key className={`${className} text-slate-700`} />;
    case "data table":
      return <Table className={`${className} text-violet-600`} />;
    case "date & time":
      return <Clock className={`${className} text-teal-600`} />;
    case "edit fields (set)":
    case "edit fields":
      return <PenTool className={`${className} text-teal-600`} />;
    case "embeddings":
      return <Sparkles className={`${className} text-purple-600`} />;
    case "execute workflow":
      return <CornerDownRight className={`${className} text-amber-600`} />;
    case "execute workflow trigger":
      return <CornerUpRight className={`${className} text-emerald-600`} />;
    case "extract from file":
      return <FileInput className={`${className} text-sky-600`} />;
    case "filter":
      return <Filter className={`${className} text-teal-600`} />;
    case "form trigger":
      return <FileCheck className={`${className} text-emerald-600`} />;
    case "graphql":
      return <Hexagon className={`${className} text-[#e535ab]`} />;
    case "html":
      return <Code className={`${className} text-[#e34f26]`} />;
    case "http request":
      return <Globe className={`${className} text-indigo-600`} />;
    case "if":
      return <GitBranch className={`${className} text-amber-600`} />;
    case "information extractor":
      return <Wand2 className={`${className} text-purple-600`} />;
    case "limit":
      return <SlidersHorizontal className={`${className} text-teal-600`} />;
    case "loop over items":
      return <Repeat className={`${className} text-amber-600`} />;
    case "manual trigger":
      return <MousePointer className={`${className} text-emerald-600`} />;
    case "merge":
      return <GitMerge className={`${className} text-amber-600`} />;
    case "n8n":
      return <Share2 className={`${className} text-[#ff6d5a]`} />;
    case "read/write files from disk":
      return <HardDrive className={`${className} text-sky-600`} />;
    case "remove duplicates":
      return <Copy className={`${className} text-teal-600`} />;
    case "respond to webhook":
      return <Send className={`${className} text-indigo-600`} />;
    case "rss feed read":
      return <Rss className={`${className} text-[#ff6600]`} />;
    case "schedule trigger":
      return <CalendarClock className={`${className} text-emerald-600`} />;
    case "sort":
      return <ArrowUpDown className={`${className} text-teal-600`} />;
    case "split out":
      return <ListTree className={`${className} text-teal-600`} />;
    case "stop and error":
      return <AlertOctagon className={`${className} text-rose-600`} />;
    case "summarize":
      return <ClipboardList className={`${className} text-teal-600`} />;
    case "switch":
      return <GitFork className={`${className} text-amber-600`} />;
    case "text classifier":
      return <Tag className={`${className} text-purple-600`} />;
    case "vector store":
      return <Database className={`${className} text-purple-600`} />;
    case "wait":
      return <Pause className={`${className} text-amber-600`} />;
    case "webhook":
      return <Radio className={`${className} text-emerald-600`} />;
    case "xml":
      return <FileCode className={`${className} text-teal-600`} />;
  }

  // If vendor has an n8nNodeIcon image URL
  if (
    vendor.n8nNodeIcon &&
    vendor.n8nNodeIcon !== "No native node" &&
    vendor.n8nNodeIcon !== "—" &&
    vendor.n8nNodeIcon.startsWith("http")
  ) {
    return (
      <img
        src={vendor.n8nNodeIcon}
        alt={vendor.vendor}
        className="max-w-full max-h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />
    );
  }

  // Fallback initial badge
  return (
    <div className="w-full h-full rounded-md bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
      {vendor.vendor.charAt(0).toUpperCase()}
    </div>
  );
};
