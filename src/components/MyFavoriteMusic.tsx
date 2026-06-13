import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Music, 
  Disc, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Tv, 
  Volume2, 
  Check, 
  Link2, 
  ExternalLink,
  Unlock,
  Settings,
  Heart,
  Plus,
  RefreshCw,
  Sparkles,
  HelpCircle
} from "lucide-react";

// Standard preset GTM & RevOps custom playlists
const PRESET_PLAYLISTS = [
  {
    name: "Waiting For Your Love",
    descr: "The soulful classic jam by Toto.",
    url: "https://embed.music.apple.com/us/album/waiting-for-your-love/1884387966?i=1884387969",
    tracks: [
      { id: 1, title: "Waiting For Your Love", artist: "Toto", duration: "5:06" },
      { id: 2, title: "CPQ Flow State", artist: "Bao's Beats Trio", duration: "3:40" },
      { id: 3, title: "UAT Sprint Cafe", artist: "Lofi Sandbox", duration: "2:55" },
      { id: 4, title: "Permission Set Chill", artist: "Tokenized Frequency", duration: "4:05" },
    ]
  },
  {
    name: "GTM Deep Focus",
    descr: "Instrumental lo-fi beats curated for dashboard builders and flow designers.",
    url: "https://embed.music.apple.com/us/playlist/lo-fi-beats/pl.353fa289fc0b4e288863f6a7d0e41300",
    tracks: [
      { id: 1, title: "CPQ Flow State", artist: "Bao's Beats Trio", duration: "3:40" },
      { id: 2, title: "UAT Sprint Cafe", artist: "Lofi Sandbox", duration: "2:55" },
      { id: 3, title: "Permission Set Chill", artist: "Tokenized Frequency", duration: "4:05" },
      { id: 4, title: "Process Automation Waltz", artist: "Syntax Error", duration: "3:12" },
    ]
  },
  {
    name: "RevOps Crunch Time",
    descr: "Slightly energetic electronic synthwave to power through end-of-quarter audits.",
    url: "https://embed.music.apple.com/us/playlist/synthwave-focus/pl.f748dfbbac6247c493a74659f77f04bf", // curated synthwave playlist embed
    tracks: [
      { id: 1, title: "Hotfix at Midnight", artist: "Retro Deployer", duration: "4:20" },
      { id: 2, title: "Apex Queue Runner", artist: "Cybernetic Ops", duration: "3:45" },
      { id: 3, title: "Pipeline Velocity", artist: "GTM Neon", duration: "4:10" },
      { id: 4, title: "SOX Audit Override", artist: "Compils", duration: "3:30" }
    ]
  }
];

export function MyFavoriteMusic({ isModalView = false }: { isModalView?: boolean }) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [appleId, setAppleId] = useState<string>("");
  const [playlistUrl, setPlaylistUrl] = useState<string>(PRESET_PLAYLISTS[0].url);
  const [customInputUrl, setCustomInputUrl] = useState<string>("");
  const [activePresetIdx, setActivePresetIdx] = useState<number>(0);
  
  // Custom interactive deck state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [deckVolume, setDeckVolume] = useState<number>(75);
  const [activeView, setActiveView] = useState<"embed" | "retro">("embed");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successToast, setSuccessToast] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedConnected = localStorage.getItem("gsw_apple_music_connected");
    const savedAppleId = localStorage.getItem("gsw_apple_music_id");
    const savedPlaylist = localStorage.getItem("gsw_apple_music_playlist");
    
    if (savedConnected === "true" && savedAppleId) {
      setIsConnected(true);
      setAppleId(savedAppleId);
      if (savedPlaylist) {
        setPlaylistUrl(savedPlaylist);
      }
    }
  }, []);

  // Set up event listener for OAuth popup message
  useEffect(() => {
    const handleAuthMessage = (event: MessageEvent) => {
      // Validate origin is safe
      const origin = event.origin;
      if (!origin.endsWith(".run.app") && !origin.includes("localhost")) {
        return;
      }
      
      const data = event.data;
      if (data && data.type === "OAUTH_AUTH_SUCCESS" && data.provider === "apple-music") {
        setIsConnected(true);
        setAppleId(data.appleId || "you.bell521@gmail.com");
        
        let targetUrl = data.playlistUrl || PRESET_PLAYLISTS[0].url;
        const convertedUrl = convertToEmbedUrl(targetUrl);
        setPlaylistUrl(convertedUrl);
        
        // Save to cache
        localStorage.setItem("gsw_apple_music_connected", "true");
        localStorage.setItem("gsw_apple_music_id", data.appleId || "you.bell521@gmail.com");
        localStorage.setItem("gsw_apple_music_playlist", convertedUrl);
        
        setSuccessToast(true);
        setTimeout(() => setSuccessToast(false), 5000);
      }
    };

    window.addEventListener("message", handleAuthMessage);
    return () => window.removeEventListener("message", handleAuthMessage);
  }, []);

  // Utility to convert user-pasted Standard Apple Music URL to Embed URL
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return PRESET_PLAYLISTS[0].url;
    if (url.includes("embed.music.apple.com")) return url;
    
    // Check if it's an Apple Music playlist
    // e.g. https://music.apple.com/us/playlist/lo-fi-beats/pl.353fa289fc0b4e288863f6a7d0e41300
    if (url.includes("music.apple.com")) {
      return url.replace("music.apple.com", "embed.music.apple.com");
    }
    return url;
  };

  const handleConnectClick = () => {
    const width = 500;
    const height = 740;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    const popup = window.open(
      "/apple-music-auth.html",
      "apple_music_oauth",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      alert("Popup blocker active! Please allow popups for GTM Systems Portfolio to connect Apple Music.");
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAppleId("");
    setPlaylistUrl(PRESET_PLAYLISTS[0].url);
    localStorage.removeItem("gsw_apple_music_connected");
    localStorage.removeItem("gsw_apple_music_id");
    localStorage.removeItem("gsw_apple_music_playlist");
  };

  const handlePresetSelect = (idx: number) => {
    setActivePresetIdx(idx);
    setPlaylistUrl(PRESET_PLAYLISTS[idx].url);
    setCurrentTrackIdx(0);
    setIsPlaying(false);
    
    // Save playlist
    if (isConnected) {
      localStorage.setItem("gsw_apple_music_playlist", PRESET_PLAYLISTS[idx].url);
    }
  };

  const handleCustomPlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputUrl) return;
    
    if (!customInputUrl.includes("music.apple.com")) {
      setErrorMsg("Oops! Please enter a valid apple music link (music.apple.com)");
      setTimeout(() => setErrorMsg(""), 4000);
      return;
    }

    const converted = convertToEmbedUrl(customInputUrl);
    setPlaylistUrl(converted);
    setCustomInputUrl("");
    setErrorMsg("");
    
    if (isConnected) {
      localStorage.setItem("gsw_apple_music_playlist", converted);
    }
    
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  // Simulated retro controls
  const activeTracks = PRESET_PLAYLISTS[activePresetIdx]?.tracks || PRESET_PLAYLISTS[0].tracks;
  const currentTrack = activeTracks[currentTrackIdx];

  const handleNextTrack = () => {
    setCurrentTrackIdx((prev) => (prev + 1) % activeTracks.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIdx((prev) => (prev - 1 + activeTracks.length) % activeTracks.length);
  };

  return (
    <div 
      id={!isModalView ? "my-favorite-music-comp" : undefined}
      className={isModalView 
        ? "flex flex-col h-full relative w-full" 
        : "bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] flex flex-col h-full relative overflow-hidden"}
    >
      {/* Visual Accent Sticker */}
      {!isModalView && (
        <div className="absolute right-3 top-3 select-none flex gap-1">
          <Sparkles className="h-5 w-5 text-red-500 animate-pulse" />
        </div>
      )}

      {!isModalView && (
        <div className="border-b-2 border-dashed border-zinc-200 pb-3 mb-4">
          <h3 className="font-hand text-xl font-black text-ink flex items-center gap-2">
            <span>🎵 My Favorite Music</span>
            {isConnected && (
              <span className="text-[10px] uppercase font-sans tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1 animate-bounce">
                <Check className="h-3 w-3" /> Connected
              </span>
            )}
          </h3>
          <p className="font-sans text-[11px] text-zinc-650 mt-1">
            {isConnected 
              ? "Successfully authorized with Apple Music. Your playlist is synchronized live!"
              : "Preview my favorite focus albums or log in with Apple Music to share yours."}
          </p>
        </div>
      )}

      {/* Success Notification Bubble */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute top-2 w-[calc(100%-2.5rem)] left-5 right-5 bg-emerald-500 border-2 border-ink text-white font-hand font-extrabold text-sm p-3 rounded-lg shadow-md z-30 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">🎈 Synchronized playlist successfully!</span>
            <button onClick={() => setSuccessToast(false)} className="text-white hover:text-zinc-200 font-black">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - Divided to display selection */}
      <div className="flex-1 flex flex-col space-y-4">

        {/* View Stage */}
        <div className="flex-1 min-h-[300px] border-2 border-ink rounded-xl bg-zinc-50 overflow-hidden relative shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.06)] flex flex-col">
          <div className="w-full h-full flex-1 relative flex flex-col bg-stone-900">
            {/* Apple Music Live Embed IFrame */}
            <iframe
              id="apple-music-iframe"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="100%"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              src={playlistUrl}
              className="w-full flex-1 rounded-xl"
              style={{
                border: "none",
                backgroundColor: "transparent",
                minHeight: "330px"
              }}
            />
            <div className="absolute bottom-2 right-2 bg-stone-950/80 backdrop-blur-md px-2 py-1 rounded border border-stone-800 text-[10px] text-stone-400 font-mono flex items-center gap-1 select-none pointer-events-none">
              <Music className="h-3 w-3 text-red-500" /> Apple Music Stream
            </div>
          </div>
        </div>

        {/* Dynamic customized URL link paste form */}
        <div className="bg-zinc-50 border-2 border-ink rounded-xl p-3.5 space-y-2 text-ink shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
          <div className="flex justify-between items-center">
            <label className="font-hand font-black text-xs flex items-center gap-1.5 uppercase">
              <Link2 className="h-3.5 w-3.5 text-red-500" /> Share Playlist URL
            </label>
            <span className="text-[10px] font-sans text-stone-400">Apple Music only</span>
          </div>

          <form onSubmit={handleCustomPlaylistSubmit} className="flex gap-2">
            <input
              type="url"
              placeholder="https://music.apple.com/..."
              value={customInputUrl}
              onChange={(e) => setCustomInputUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 border-2 border-ink bg-white font-sans text-xs rounded-lg focus:outline-none focus:border-red-550 transition-colors"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#18181b] hover:bg-neutral-800 text-white font-hand font-extrabold text-xs rounded-lg hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0 active:shadow-none cursor-pointer transition-all"
            >
              Share
            </button>
          </form>

          {errorMsg && (
            <p className="text-[10px] font-sans text-red-500 font-semibold">{errorMsg}</p>
          )}
        </div>

        {/* "Connect My Apple Music" Authorization Button / Dashboard */}
        <div className="pt-2 border-t border-dashed border-zinc-200">
          {!isConnected ? (
            <button
              onClick={handleConnectClick}
              className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white border-2 border-ink font-hand font-black text-sm rounded-xl shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="h-4 w-4" /> 🔒 Connect My Apple Music
            </button>
          ) : (
            <div className="flex items-center justify-between text-xs font-hand font-black bg-stone-50 border-2 border-ink p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
              <div className="flex items-center gap-2 truncate text-stone-700">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 select-none">🔑</div>
                <span className="truncate text-zinc-600">Personal Live Connected Link</span>
              </div>
              <button
                onClick={handleDisconnect}
                className="text-red-500 hover:text-red-700 hover:underline px-1.5 py-0.5 border border-dashed border-red-350 hover:border-solid rounded cursor-pointer text-[10px] uppercase font-sans tracking-wide"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
