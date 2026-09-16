import React, { useState } from "react";
import { 
  Maximize2, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Mic,
  Share2
} from "lucide-react";

export const GongTriggeredWorkflowDiagram: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  const imageSrc = "/gong_sales_workflow_process.svg";
  const title = "GONG.IO TRIGGERED SALES WORKFLOW PROCESS";
  const subtitle = "Original Architecture Diagram per Attachment";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "Gong_Triggered_Sales_Workflow_Process.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="gong-diagram-page" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-sky-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800/60 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-xs font-semibold uppercase tracking-wider">
              <Mic className="w-3.5 h-3.5 text-cyan-300" />
              Gong.io Triggered Sales Workflow
            </div>
            <span className="text-xs text-cyan-200/80 font-mono bg-white/10 px-3 py-1 rounded-md">
              Original Diagram • Single Page View
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            GONG.IO TRIGGERED SALES WORKFLOW PROCESS
          </h2>
          <p className="text-slate-200/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Direct visual showcase of the original architecture diagram per the attachment. 
            Displays the complete flow from Gong.io Trigger (Meeting recorded), Integration &amp; Data processing, Automation Engine (Zapier/API), CRM Sync, Sales Coaching &amp; Alerts, Coaching Workflow, and measurable Business Outcomes.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-white/15">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Fullscreen Lightbox View
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/25 hover:bg-cyan-500/35 text-cyan-200 text-xs font-bold transition-all border border-cyan-400/30 cursor-pointer"
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
        <div className="p-4 sm:p-5 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100" />
            <div>
              <h3 className="text-base font-bold text-zinc-900">{title}</h3>
              <p className="text-xs text-zinc-500 font-medium">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg p-1 shadow-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.2))}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-semibold px-2 min-w-14 text-center text-zinc-700">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.2))}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
              title="Reset Zoom (100%)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <div className="h-4 w-px bg-zinc-200 mx-1" />
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="p-1.5 text-zinc-600 hover:text-cyan-600 hover:bg-cyan-50 rounded transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 text-zinc-600 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
              title="Download Diagram"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Diagram Display Area */}
        <div className="p-4 sm:p-8 bg-[#f1f3f5] overflow-auto flex items-center justify-center min-h-[580px]">
          <div 
            className="transition-transform duration-200 ease-out origin-center cursor-zoom-in max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setIsLightboxOpen(true)}
          >
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full max-w-5xl h-auto rounded-lg shadow-md border border-zinc-300 bg-white"
              style={{ minWidth: "320px" }}
            />
          </div>
        </div>

        {/* Key Component Summary Cards */}
        <div className="p-6 bg-white border-t border-zinc-200">
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
            Workflow Architecture Stages
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-sky-600" />
                <span className="text-xs font-bold text-sky-950">1. Trigger &amp; Data Pipeline</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Gong.io trigger on recorded meeting executes speech-to-text automatic transcription, keyword &amp; topic extraction, and sentiment analysis.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-teal-600" />
                <span className="text-xs font-bold text-teal-950">2. Automation &amp; CRM Sync</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Automation Engine (Zapier/API) updates Salesforce Opportunity MEDDICC fields, logs structured meeting notes, and creates follow-up tasks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-orange-600" />
                <span className="text-xs font-bold text-orange-950">3. Coaching &amp; Alerts</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dispatches customer recap email, posts wins to Slack (#wins), schedules internal debrief, and triggers managerial call reviews and scoring.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-xs font-bold text-emerald-950">4. Revenue Outcomes</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Measurable business lift: improved forecasting accuracy, shorter sales cycle, higher win rates, and systematic rep development &amp; training.
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
                <Mic className="w-5 h-5 text-cyan-400" />
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
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold px-2 text-white/90">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <button
                onClick={() => setLightboxZoom(prev => Math.min(3.5, prev + 0.25))}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightboxZoom(1)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-white/20 mx-1" />
              <button
                onClick={handleDownload}
                className="p-2 text-white/80 hover:text-emerald-400 hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-white/80 hover:text-rose-400 hover:bg-white/10 rounded transition-colors cursor-pointer"
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
