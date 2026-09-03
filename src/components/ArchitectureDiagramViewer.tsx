/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Move,
  Download,
  ExternalLink,
  Layers,
  MapPin,
  Bot,
  Database,
  Cloud,
  Cpu,
  Compass,
  Check
} from "lucide-react";

interface ArchitectureDiagramViewerProps {
  imageSrc: string;
  altText: string;
  title: string;
  subtitle?: string;
}

interface ArchitecturalZone {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  targetScale: number;
  targetX: number; // Offset relative to center in normalized coordinates
  targetY: number;
  description: string;
}

const ARCHITECTURAL_ZONES: ArchitecturalZone[] = [
  {
    id: "all",
    label: "Full Architecture Overview",
    shortLabel: "Fit Overview",
    icon: Compass,
    color: "bg-zinc-800 text-white border-zinc-700",
    targetScale: 1.0,
    targetX: 0,
    targetY: 0,
    description: "End-to-end multi-agent SaaS CPQ & Order Management blueprint from Omnichannel Ingress to Cloud Provisioning."
  },
  {
    id: "ingress",
    label: "1. Inbound Channels & Payload",
    shortLabel: "1. Inbound Hooks",
    icon: Cloud,
    color: "bg-sky-700 text-white border-sky-600",
    targetScale: 1.5,
    targetX: 520,
    targetY: -40,
    description: "Omnichannel customer/AE entry via Slack /cpq, Commerce Cloud, Web Experience, and Partner API payload."
  },
  {
    id: "master",
    label: "2. Master Agent & Capability Guards",
    shortLabel: "2. Master Agent",
    icon: Bot,
    color: "bg-indigo-700 text-white border-indigo-600",
    targetScale: 1.55,
    targetX: 180,
    targetY: 220,
    description: "Agentforce Master Delegator with Confirmation, Entitlements, Margin Guardrails, and Escalation."
  },
  {
    id: "subagents",
    label: "3. Specialized Subagents Swarm (5 Subagents)",
    shortLabel: "3. Subagents Swarm",
    icon: Cpu,
    color: "bg-blue-700 text-white border-blue-600",
    targetScale: 1.5,
    targetX: 180,
    targetY: -120,
    description: "5 Integrated Subagents: #1 Capture & Quoting, #2 Validation & Credit, #3 Fulfillment & IAM, #4 Billing & Rev-Rec, #5 Lifecycle & Churn."
  },
  {
    id: "data360",
    label: "4. Data 360 / Data Cloud SSoT",
    shortLabel: "4. Data 360",
    icon: Database,
    color: "bg-teal-700 text-white border-teal-600",
    targetScale: 1.5,
    targetX: 180,
    targetY: -360,
    description: "Single Source of Truth: Product SKUs, Rate Cards, Entitlements, Telemetry, and Deal Desk Governance."
  },
  {
    id: "mulesoft",
    label: "5. MuleSoft Orders MCP & Async Bus",
    shortLabel: "5. Orders MCP",
    icon: Layers,
    color: "bg-emerald-700 text-white border-emerald-600",
    targetScale: 1.55,
    targetX: -360,
    targetY: -30,
    description: "Standardized Model Context Protocol (MCP) tool bindings and async zero-loss execution queue."
  },
  {
    id: "fulfillment",
    label: "6. Downstream Cloud & Finance Engine",
    shortLabel: "6. Fulfillment & ERP",
    icon: Cloud,
    color: "bg-purple-700 text-white border-purple-600",
    targetScale: 1.5,
    targetX: -640,
    targetY: -30,
    description: "Zero-touch 15-second AWS/GCP SaaS tenant deployment and Stripe/Zuora ASC 606 revenue recognition."
  }
];

export const ArchitectureDiagramViewer: React.FC<ArchitectureDiagramViewerProps> = ({
  imageSrc,
  altText,
  title,
  subtitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeZone, setActiveZone] = useState<string>("all");
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Reset to default fit
  const handleReset = useCallback(() => {
    setScale(1.0);
    setPosition({ x: 0, y: 0 });
    setActiveZone("all");
  }, []);

  // Zoom in / out handlers with clamping
  const handleZoomIn = () => {
    setScale((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3.0));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.6));
  };

  const handleSetScale = (newScale: number) => {
    setScale(Math.max(0.6, Math.min(3.0, newScale)));
  };

  // Jump to architectural zone
  const handleJumpToZone = (zone: ArchitecturalZone) => {
    setActiveZone(zone.id);
    setScale(zone.targetScale);
    setPosition({ x: zone.targetX, y: zone.targetY });
  };

  // Drag handlers for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Drag handlers for touch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
      if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      }
      if (e.key === "-" || e.key === "_") {
        handleZoomOut();
      }
      if (e.key === "0") {
        handleReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, handleReset]);

  // Handle native wheel zoom with Ctrl/Cmd or normal trackpad
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
      setScale((prev) => Math.max(0.6, Math.min(3.0, Number((prev + zoomFactor).toFixed(2)))));
    } else {
      // Pan with wheel/trackpad
      setPosition((prev) => ({
        x: prev.x - e.deltaX * 0.8,
        y: prev.y - e.deltaY * 0.8
      }));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + imageSrc);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* SECTION NAVIGATOR / QUICK JUMP TABS */}
      <div className="bg-slate-900 border-2 border-ink rounded-xl p-2.5 shadow-[3px_3px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white text-xs font-mono">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            <span className="font-bold text-slate-200">Architecture Navigator:</span>
            <span className="text-slate-400 hidden sm:inline">Click any zone to zoom directly into that architectural subsystem</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <span className="hidden md:inline">Drag to pan • Wheel to scroll • ESC to exit</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {ARCHITECTURAL_ZONES.map((zone) => {
            const Icon = zone.icon;
            const isActive = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => handleJumpToZone(zone)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all border ${
                  isActive
                    ? "bg-sky-500 text-white border-white shadow-[0_0_12px_rgba(14,165,233,0.6)] ring-2 ring-sky-300 ring-offset-1 ring-offset-slate-900"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                }`}
                title={zone.description}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{zone.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEWER CONTAINER */}
      <div
        className={`border-3 border-ink rounded-2xl overflow-hidden bg-slate-950 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all flex flex-col ${
          isFullscreen
            ? "fixed inset-0 z-50 rounded-none border-none p-0 h-screen w-screen shadow-none"
            : "relative h-[550px] sm:h-[650px] md:h-[720px]"
        }`}
      >
        {/* Viewer Top Toolbar */}
        <div className="bg-slate-900 px-3.5 py-2.5 flex flex-wrap items-center justify-between border-b border-slate-800 text-white font-mono text-xs gap-2 shrink-0 select-none">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block shadow-sm"></span>
            </div>
            <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
              <Layers className="h-4 w-4 text-sky-400" />
              <span className="text-slate-200 font-bold hidden sm:inline">{title}</span>
              <span className="text-slate-400 text-[11px] hidden md:inline">1920 × 1080 SVG</span>
            </div>
          </div>

          {/* Quick HUD Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Zoom Percent indicator */}
            <div className="bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-200 text-xs font-bold min-w-[58px] text-center">
              {Math.round(scale * 100)}%
            </div>

            {/* Zoom Out Button */}
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.6}
              title="Zoom Out (-)"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded border border-slate-700 cursor-pointer transition-all"
            >
              <ZoomOut className="h-4 w-4" />
            </button>

            {/* Zoom In Button */}
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3.0}
              title="Zoom In (+)"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded border border-slate-700 cursor-pointer transition-all"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            {/* Fit / Reset Button */}
            <button
              onClick={handleReset}
              title="Fit to Screen (0)"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 cursor-pointer text-xs font-bold transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Fit</span>
            </button>

            {/* Presets dropdown/buttons */}
            <button
              onClick={() => handleSetScale(1.0)}
              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition-all hidden sm:inline-block ${
                scale === 1.0 ? "bg-sky-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              100%
            </button>
            <button
              onClick={() => handleSetScale(1.5)}
              className={`px-2 py-1 rounded text-xs font-bold cursor-pointer transition-all hidden sm:inline-block ${
                scale === 1.5 ? "bg-sky-600 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              150%
            </button>

            <div className="w-[1px] h-5 bg-slate-800 mx-1"></div>

            {/* Open Raw SVG / Download */}
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Raw SVG in New Tab"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 cursor-pointer transition-all hidden sm:flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href={imageSrc}
              download="saas_cpq_order_logic_architecture.svg"
              title="Download Architecture SVG"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 cursor-pointer transition-all flex items-center justify-center"
            >
              <Download className="h-4 w-4" />
            </a>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Fullscreen"}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold cursor-pointer transition-all shadow-sm ${
                isFullscreen
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black"
                  : "bg-sky-500 hover:bg-sky-600 text-white"
              }`}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span>Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Expand Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Pan & Drag Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className={`flex-1 overflow-hidden relative select-none flex items-center justify-center bg-slate-950 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ touchAction: "none" }}
        >
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
              backgroundSize: "24px 24px"
            }}
          />

          {/* Interactive Transform Container */}
          <div
            className="transition-transform ease-out will-change-transform flex items-center justify-center pointer-events-none"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
              transformOrigin: "center center",
              transitionDuration: isDragging ? "0ms" : "220ms"
            }}
          >
            <img
              src={imageSrc}
              alt={altText}
              className="max-w-none w-[1280px] md:w-[1500px] lg:w-[1720px] h-auto pointer-events-auto rounded-lg shadow-2xl"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Interactive Floating Hint */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-400 font-mono flex items-center gap-1.5 shadow-lg pointer-events-none">
            <Move className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
            <span>Click &amp; drag anywhere to pan • Scroll to zoom</span>
          </div>

          {/* Current Active Zone Badge */}
          {activeZone !== "all" && (
            <div className="absolute top-3 right-3 bg-sky-950/90 backdrop-blur-sm border border-sky-600 rounded-lg px-3 py-1.5 text-xs text-sky-200 font-mono shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block"></span>
              <span className="font-bold">
                Focused: {ARCHITECTURAL_ZONES.find((z) => z.id === activeZone)?.label}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                title="Reset to overview"
              >
                ✕
              </button>
            </div>
          )}

          {/* MINI-MAP INSET IN BOTTOM RIGHT */}
          {showMinimap && (
            <div className="absolute bottom-3 right-3 bg-slate-900/95 border-2 border-slate-700 rounded-xl p-2 shadow-2xl backdrop-blur-md hidden sm:block">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
                <span>Diagram Minimap</span>
                <span className="text-sky-400 font-bold">{Math.round(scale * 100)}%</span>
              </div>
              <div
                onClick={(e) => {
                  // Allow clicking on minimap to jump
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = (e.clientX - rect.left) / rect.width - 0.5;
                  const clickY = (e.clientY - rect.top) / rect.height - 0.5;
                  setPosition({
                    x: -clickX * 1200 * (scale - 0.5),
                    y: -clickY * 700 * (scale - 0.5)
                  });
                }}
                className="relative w-44 h-24 bg-slate-950 rounded border border-slate-800 overflow-hidden cursor-crosshair group"
              >
                <img
                  src={imageSrc}
                  alt="Minimap thumbnail"
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
                  draggable={false}
                  referrerPolicy="no-referrer"
                />
                {/* Viewport Indicator Box */}
                <div
                  className="absolute border-2 border-sky-400 bg-sky-400/20 rounded pointer-events-none transition-all duration-75"
                  style={{
                    width: `${Math.max(20, Math.min(100, 100 / scale))}%`,
                    height: `${Math.max(20, Math.min(100, 100 / scale))}%`,
                    left: `${Math.max(0, Math.min(80, 50 - (position.x / (800 * scale)) * 50 - 50 / scale))}%`,
                    top: `${Math.max(0, Math.min(80, 50 - (position.y / (500 * scale)) * 50 - 50 / scale))}%`
                  }}
                />
              </div>
            </div>
          )}

          {/* FLOATING ZOOM CONTROLS BOTTOM LEFT */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-xl p-1.5 shadow-xl">
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.6}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <input
              type="range"
              min="60"
              max="260"
              step="10"
              value={Math.round(scale * 100)}
              onChange={(e) => handleSetScale(Number(e.target.value) / 100)}
              className="w-20 accent-sky-500 cursor-pointer hidden md:block"
            />
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3.0}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-lg cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer"
              title="Reset Position & Zoom"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
