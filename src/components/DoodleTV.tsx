import React from "react";

export const DoodleTV: React.FC = () => {
  // YouTube video ID: cSQwgrympdM
  // We use autoplay=1, mute=1 to allow auto-play as soon as user opens the About tab.
  // We enable controls=1 and include loop settings.
  const embedUrl = "https://www.youtube.com/embed/cSQwgrympdM?autoplay=1&mute=1&playlist=cSQwgrympdM&loop=1&controls=1&rel=0&modestbranding=1";

  return (
    <div className="relative flex flex-col items-center select-none w-full max-w-[340px] md:max-w-[360px] mx-auto">
      {/* Hand-drawn retro TV border container */}
      <div className="w-full bg-white border-3 border-ink rounded-3xl p-2.5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden">
        {/* TV Screen Wrapper */}
        <div 
          className="relative border-3 border-ink rounded-2xl aspect-[16/10] w-full overflow-hidden bg-black shadow-inner"
        >
          {/* YouTube Embed Frame */}
          <iframe
            src={embedUrl}
            title="Bao You Salesforce Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover rounded-xl"
          />

          {/* CRT Curved Screen Scanlines effect for retro TV feeling */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_rgba(0,0,0,0.15)_100%)]" />
        </div>
      </div>

      {/* Tiny descriptive indicator */}
      <div className="text-center font-hand text-[11px] text-zinc-650 leading-tight mt-2">
        🎥 <span className="font-bold">Bao's Salesforce Demo Recording</span> — Playing automatically
      </div>
    </div>
  );
};
