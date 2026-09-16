import React, { useState } from "react";
import { 
  Maximize2, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  Share2,
  FileText
} from "lucide-react";

export const LinkedinIntentOrchestration: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  const imageSrc = "/linkedin_intent_orchestration.svg";
  const title = "Sales Intent Signal to Outreach Orchestration";
  const subtitle = "Original Architecture Diagram per Attachment";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "Sales_Intent_Signal_To_Outreach_Orchestration.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="linkedin-intent-orchestration-page" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/40 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5 text-sky-300" />
              Linkedin Intent Signal Architecture
            </div>
            <span className="text-xs text-blue-200/80 font-mono bg-white/10 px-3 py-1 rounded-md">
              Original Diagram • Single Page View
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Sales Intent Signal to Outreach Orchestration
          </h2>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Direct visual showcase of the original architecture diagram per the attachment. 
            Displays the complete flow from Nightly LinkedIn Batch Jobs and Manner Lookups to Intent Signal Discovery, Deal Risk Signal Scoring, Persona Routing, and n8n/Clay/SFDC/Outreach Solution Architecture &amp; Write-Back.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-white/15">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Fullscreen Lightbox View
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 text-xs font-bold transition-all border border-sky-400/30"
            >
              <Download className="w-3.5 h-3.5" />
              Download Original Diagram
            </button>
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Raw SVG in New Tab
            </a>
          </div>
        </div>
      </div>

      {/* Main Single Page Diagram View */}
      <div className="bg-white rounded-2xl border-2 border-zinc-200 shadow-sm overflow-hidden">
        {/* Card Top Toolbar */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/75">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />
            <div>
              <h3 className="text-base font-bold text-zinc-900">{title}</h3>
              <p className="text-xs text-zinc-500 font-medium">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1 shadow-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold px-2 min-w-14 text-center text-zinc-700">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
              title="Reset Zoom (100%)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-zinc-200 mx-1" />
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 text-zinc-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
              title="Download Diagram"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diagram Display Area */}
        <div className="p-4 sm:p-8 bg-[#f8fafc] overflow-auto flex items-center justify-center min-h-[680px]">
          <div 
            className="transition-transform duration-200 ease-out origin-center cursor-zoom-in max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setIsLightboxOpen(true)}
          >
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full max-w-4xl h-auto rounded-lg shadow-lg border border-zinc-300 bg-white"
              style={{ minWidth: "320px" }}
            />
          </div>
        </div>

        {/* Key Component Summary Cards */}
        <div className="p-6 bg-white border-t border-zinc-200">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
            Architecture Core Components
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-sky-600" />
                <span className="text-xs font-bold text-sky-950">1. Nightly Trigger &amp; Warm Paths</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Nightly LinkedIn batch job triggers Manner Lookup to prevent missed opportunities and maintain high data hygiene.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
                <span className="text-xs font-bold text-purple-950">2. Intent Signal Discovery</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tracks job title changes, post replies/likes/seniority, and executive link degrees for instant opportunity detection.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-xs font-bold text-indigo-950">3. Signal Scoring &amp; Persona</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Estimates deal risk per signal, calculates score, and routes across SDR ➔ AE/AM ➔ SalesOps ➔ RevOps ➔ MktOps.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-600" />
                <span className="text-xs font-bold text-amber-950">4. Solution Architecture</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                n8n AI Engine computes signal, Clay enriches data, syncs with SFDC Write-Back, and links to Outreach and Slack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between gap-4 pb-3 border-b border-white/20 text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sky-400" />
                {title}
              </h3>
              <p className="text-xs text-white/70">
                Original diagram • Full resolution inspection
              </p>
            </div>

            {/* Lightbox Controls */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setLightboxZoom(prev => Math.max(0.5, prev - 0.25))}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-white/90">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <button
                onClick={() => setLightboxZoom(prev => Math.min(3.5, prev + 0.25))}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightboxZoom(1)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-white/20 mx-1" />
              <button
                onClick={handleDownload}
                className="p-2 text-white/80 hover:text-emerald-400 hover:bg-white/10 rounded transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white/80 hover:text-rose-400 hover:bg-white/10 rounded transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div 
            className="flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto p-4 my-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="transition-transform duration-200 ease-out origin-center"
              style={{ transform: `scale(${lightboxZoom})` }}
            >
              <img 
                src={imageSrc} 
                alt={title}
                className="max-h-[82vh] w-auto max-w-full rounded-lg shadow-2xl border border-white/20 bg-white"
              />
            </div>
          </div>

          {/* Lightbox Bottom Footer Bar */}
          <div 
            className="w-full max-w-6xl pt-3 border-t border-white/20 flex flex-wrap items-center justify-between text-xs text-white/70"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Click outside or Esc to close • Use scroll or zoom buttons to inspect</span>
            <div className="flex items-center gap-3">
              <a
                href={imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1 font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Original in New Tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
