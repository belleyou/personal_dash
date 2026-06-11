import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Music,
  Tv,
  HelpCircle
} from "lucide-react";

interface Scene {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
}

const SCENES: Scene[] = [
  {
    id: "sports",
    title: "🏀 NBA & Court Strategy",
    subtitle: "*Slam Dunk! Bao models court spacing, chemistry, and tactical systems* 🏀",
    desc: "An avid fan of tactical court play, statistics modeling, and GTM execution.",
    color: "bg-orange-100"
  },
  {
    id: "music",
    title: "🎸 Music & Instruments",
    subtitle: "*A C-Major melody! Double guitar strumming with drums, piano, & harmonica!* 🥁",
    desc: "Bao practices rhythm across Guitar, Drum set, Piano keys, and blues Harmonica.",
    color: "bg-pink-100"
  },
  {
    id: "travel",
    title: "✈️ Global Travel & Exploration",
    subtitle: "*Exploring regional architecture & system designs worldwide!* 🌍",
    desc: "Driven to experience international architecture, local cultures, and culinary history.",
    color: "bg-sky-100"
  },
  {
    id: "camera",
    title: "📸 Street Photography",
    subtitle: "*Flash! Capturing geometry, lighting details, and symmetry in real time!* ⚡",
    desc: "Capturing patterns, structures, and golden ratio alignment in busy urban landscapes.",
    color: "bg-purple-100"
  },
  {
    id: "reading",
    title: "📚 Strategic Reading",
    subtitle: "*Connecting system nodes & learning from organizational history* 💡",
    desc: "Exploring tech-forward system architecture and commercial industry records.",
    color: "bg-yellow-100"
  }
];

export const CrayonVideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(1); // Default to Music
  const [progress, setProgress] = useState(0); // 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x, 3x (crank mode)
  const [isMuted, setIsMuted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const requestRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastTimeRef = useRef<number>(0);

  const scene = SCENES[currentSceneIdx];

  // Simple Synthesizer sounds matching the cute doodle theme
  const playBeep = (freq: number, type: "sine" | "triangle" | "sawtooth" = "sine", duration = 0.15) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Ignore audio load blocks in sandbox
    }
  };

  // Auto progression of time & interactive triggers
  useEffect(() => {
    let intervalId: any;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (0.8 * playbackSpeed);
          if (next >= 100) {
            // Scene completed! Switch or reset
            playBeep(440, "sine", 0.08);
            return 0;
          }
          
          // Trigger periodic interactive beeps depending on scene
          if (Math.floor(next) % 20 === 0 && Math.floor(next) !== 0) {
            triggerSceneBeeps(Math.floor(next));
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentSceneIdx, playbackSpeed, isMuted]);

  const triggerSceneBeeps = (step: number) => {
    const sId = SCENES[currentSceneIdx].id;
    if (sId === "sports") {
      playBeep(180, "triangle", 0.2); // Ball slam
    } else if (sId === "music") {
      // play a short arpeggio step
      const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00]; // C D E F G A
      const note = scale[(step / 20) % scale.length];
      playBeep(note, "sine", 0.25);
    } else if (sId === "travel") {
      playBeep(523.25, "sine", 0.1); // Plane engine hum
    } else if (sId === "camera") {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 120);
      playBeep(880, "sawtooth", 0.06); // Shutter click
    } else if (sId === "reading") {
      playBeep(659.25, "triangle", 0.12); // Book page flip
    }
  };

  const handlesPlayPause = () => {
    setIsPlaying(!isPlaying);
    playBeep(isPlaying ? 330 : 553, "sine", 0.1);
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentSceneIdx((prev) => (prev + 1) % SCENES.length);
    playBeep(440, "sine", 0.12);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentSceneIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
    playBeep(380, "sine", 0.12);
  };

  // Speed adjustments matching the crayon machine crank
  const cycleSpeed = () => {
    let nextSpeed = 1;
    if (playbackSpeed === 1) nextSpeed = 2;
    else if (playbackSpeed === 2) nextSpeed = 4; // Crank mode
    setPlaybackSpeed(nextSpeed);
    playBeep(600 * nextSpeed, "triangle", 0.1);
  };

  // Define some animation counters based on core progress state
  const phase = (progress * 0.12) % (Math.PI * 2);
  const scaleEffect = 1 + 0.04 * Math.sin(phase * 4);
  const rotEffect = 2 * Math.cos(phase * 2);
  const strokeDashOffset = 100 - progress;

  // Let's render custom procedural sketchy SVG animations for each scene inside our player
  const renderInteractiveDraftDrawing = () => {
    const sId = scene.id;
    switch (sId) {
      case "sports": {
        // Orange Basketball bouncing with trajectory arches and a tiny basketball outline
        const ballY = 50 + 26 * Math.abs(Math.sin(phase * 3.5)); // Bounce simulation
        const netSquish = ballY > 70 ? 1.05 : 0.95;
        const trailOffset = Math.sin(phase * 3.5) > 0 ? "opacity-35" : "opacity-0";
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            {/* Sketch grid background */}
            <defs>
              <pattern id="videoGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e4e4e7" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="120" fill="url(#videoGrid)" />

            {/* Simulated Basketball Hoop & Net */}
            <g transform="translate(140, 45)" className="text-zinc-800">
              {/* Backboard */}
              <rect x="18" y="-30" width="8" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="12" y="-20" width="6" height="20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" />
              
              {/* Ring Rim */}
              <line x1="-12" y1="-5" x2="18" y2="-5" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
              
              {/* Net (wiggly lines) */}
              <path 
                d="M -10 -5 L -6 20 L 0 25 L 6 20 L 10 -5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round" 
                style={{ transform: `scaleY(${netSquish})` }}
              />
              <path d="M -5 -3 L 5 20 M 5 -3 L -5 20" stroke="currentColor" strokeWidth="1" strokeDasharray="1,2" />
            </g>

            {/* Air Trails (Motion line ticks) */}
            <g stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" className={trailOffset}>
              <path d="M 50 20 Q 55 15 60 25" fill="none" />
              <path d="M 65 30 Q 70 25 75 35" fill="none" />
              <path d="M 80 40 Q 85 35 90 45" fill="none" />
            </g>

            {/* Tactical Strategy Arrows on Court */}
            <path d="M 20 100 Q 60 80 120 75" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeDasharray="3,3" strokeLinecap="round" />
            <path d="M 115 70 L 123 75 L 115 80" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <text x="35" y="85" className="font-hand text-[8px] font-black fill-blue-600">Pick & Roll (Screen)</text>

            <circle cx="20" cy="100" r="4" fill="#3b82f6" stroke="currentColor" strokeWidth="1.5" />
            <text x="18" y="103" className="font-sans text-[6px] text-white font-extrabold flex">X</text>

            <circle cx="120" cy="75" r="4" fill="#ef4444" stroke="currentColor" strokeWidth="1.5" />
            <text x="18" y="103" className="font-sans text-[6px] text-white font-extrabold flex">O</text>

            {/* Bounce Spot indicators */}
            <ellipse cx="65" cy="112" rx="12" ry="3" fill="none" stroke="#e4e4e7" strokeWidth="1" />
            <span className="text-zinc-600"></span>

            {/* Sketched Orange Basketball bouncing */}
            <g transform={`translate(${45 + progress * 0.8}, ${ballY}) scale(${scaleEffect}) rotate(${progress * 6})`}>
              {/* Outer stroke */}
              <circle cx="0" cy="0" r="14" fill="#fdba74" stroke="currentColor" strokeWidth="2.5" />
              {/* Inner details / seams of a basketball */}
              <path d="M -14 0 H 14 M 0 -14 V 14" stroke="currentColor" strokeWidth="1.8" />
              <path d="M -10 -10 Q 0 0 -10 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 10 -10 Q 0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Cozy hand shadow */}
              <circle cx="-4" cy="-4" r="14" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.4" />
            </g>

            {/* Bounce speed indicators */}
            <path d="M 50 115 H 150" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6,4" strokeLinecap="round" />
            {/* Watermark quote */}
            <text x="10" y="22" className="font-mono text-[6px] text-zinc-400 select-none uppercase tracking-widest">BOUNCE ENGINE v1.1</text>
          </svg>
        );
      }

      case "music": {
        // Instruments & Floating elements: Guitar playing, music wave patterns, drums beating, harmonica puffing
        const scaleInt = 1 + 0.06 * Math.sin(phase * 5);
        const stickRot = 15 * Math.sin(phase * 4);
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect width="200" height="120" fill="#fdf2f8" opacity="0.3" />
            
            {/* Wavy Floating Staff Lines */}
            <path 
              d={`M 10 30 Q 50 ${30 + 15 * Math.sin(phase)}, 100 30 T 190 30`} 
              fill="none" 
              stroke="#f472b6" 
              strokeWidth="1.2" 
              className="opacity-45"
            />
            <path 
              d={`M 10 40 Q 50 ${40 + 15 * Math.sin(phase)}, 100 40 T 190 40`} 
              fill="none" 
              stroke="#f472b6" 
              strokeWidth="1" 
              className="opacity-45"
            />

            {/* 1. GUITAR SKETCH (Tilted and strumming) */}
            <g transform={`translate(45, 60) rotate(${rotEffect * 2.8}) scale(${scaleInt})`}>
              {/* Body */}
              <path d="M -18 -8 C -7 -14, 7 -14, 18 -8 Q 12 12, 18 20 C 13 32, -13 32, -18 20 Q -12 12, -18 -8 Z" fill="#fed7aa" stroke="currentColor" strokeWidth="2.2" />
              {/* Pickguard & hole */}
              <circle cx="0" cy="5" r="4.5" fill="#fdb36b" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="0" cy="5" r="2.5" fill="#18181b" />
              {/* Neck & Head */}
              <rect x="-3" y="-38" width="6" height="30" fill="#fdb36b" stroke="currentColor" strokeWidth="1.8" />
              <rect x="-4" y="-45" width="8" height="8" rx="2" fill="#fed7aa" stroke="currentColor" strokeWidth="1.8" />
              {/* Strings */}
              <line x1="-1.5" y1="-38" x2="-1.5" y2="15" stroke="currentColor" strokeWidth="0.8" />
              <line x1="0" y1="-38" x2="0" y2="15" stroke="currentColor" strokeWidth="0.8" />
              <line x1="1.5" y1="-38" x2="1.5" y2="15" stroke="currentColor" strokeWidth="0.8" />
              {/* Strum sparkles */}
              <path d="M -12 5 H -6" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 6 5 H 12" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* 2. DRUM & STICK SKETCH */}
            <g transform="translate(100, 75)">
              {/* Drum Base */}
              <ellipse cx="0" cy="0" rx="18" ry="10" fill="#f3f4f6" stroke="currentColor" strokeWidth="2.2" />
              <path d="M -18 0 V 16 C -18 22, 18 22, 18 16 V 0" fill="#fbcfe8" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M -18 5 L -8 16 M 0 8 L 8 16 M 18 5 L 8 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              
              {/* Snare top skin texture */}
              <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />

              {/* Bouncing Drum Stitch */}
              <g transform={`translate(-10, -18) rotate(${-stickRot - 10})`}>
                <line x1="-15" y1="0" x2="10" y2="-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="11" cy="-5" r="2.5" fill="#18181b" />
              </g>
              <g transform={`translate(10, -18) rotate(${stickRot - 25})`}>
                <line x1="15" y1="0" x2="-10" y2="-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-11" cy="-5" r="2.5" fill="#18181b" />
              </g>
            </g>

            {/* 3. COZY HARMONICA & PIANO LAYOUT */}
            <g transform="translate(155, 60) scale(0.95)" className="text-zinc-800">
              {/* Harmonica outline */}
              <rect x="-14" y="-18" width="28" height="10" rx="2" fill="#e4e4e7" stroke="currentColor" strokeWidth="1.8" />
              <line x1="-12" y1="-13" x2="12" y2="-13" stroke="currentColor" strokeWidth="1.2" />
              {/* Teeth grill */}
              <line x1="-10" y1="-13" x2="-10" y2="-8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="-5" y1="-13" x2="-5" y2="-8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="0" y1="-13" x2="0" y2="-8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="5" y1="-13" x2="5" y2="-8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="10" y1="-13" x2="10" y2="-8" stroke="currentColor" strokeWidth="1.2" />
              {/* Blowing Air Puff */}
              <path d="M -18 -13 Q -24 -20 -30 -14" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
              <path d="M 18 -13 Q 24 -20 30 -14" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />

              {/* Mini Piano keys underneath */}
              <rect x="-18" y="5" width="36" height="18" fill="white" stroke="currentColor" strokeWidth="1.8" />
              {/* Keys lines */}
              <line x1="-12" y1="5" x2="-12" y2="23" stroke="currentColor" strokeWidth="1.5" />
              <line x1="-6" y1="5" x2="-6" y2="23" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="5" x2="0" y2="23" stroke="currentColor" strokeWidth="1.5" />
              <line x1="6" y1="5" x2="6" y2="23" stroke="currentColor" strokeWidth="1.5" />
              <line x1="12" y1="5" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" />
              {/* Black keys */}
              <rect x="-14" y="5" width="3.2" height="10" fill="#18181b" />
              <rect x="-8" y="5" width="3.2" height="10" fill="#18181b" />
              <rect x="-2" y="5" width="3.2" height="10" fill="#18181b" />
              <rect x="4" y="5" width="3.2" height="10" fill="#18181b" />
              <rect x="10" y="5" width="3.2" height="10" fill="#18181b" />
            </g>

            {/* Floating Music Notes 🎵 */}
            <g transform="translate(100, 25)" className="text-pink-600">
              <path 
                d="M -20 0 A 3 3 0 0 1 -17 3 Q -17 0 -10 -5 L -10 -15 L 0 -13 L 0 0 A 3 3 0 0 1 3 3 Q 3 0 10 -5" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.8" 
                strokeLinecap="round"
                style={{ transform: `translate(${5 * Math.sin(phase * 2)}px, ${4 * Math.cos(phase)}px)` }}
              />
              <circle cx="-13" cy="-5" r="2.5" fill="currentColor" />
              <circle cx="7" cy="-5" r="2.5" fill="currentColor" />
              
              {/* Sparkle star */}
              <path d="M 35 -10 L 37 -14 L 39 -10 L 43 -8 L 39 -6 L 37 -2 L 35 -6 L 31 -8 Z" fill="#fbbf24" stroke="currentColor" strokeWidth="0.8" />
            </g>
          </svg>
        );
      }

      case "travel": {
        // Airplane flying over a spinning world globe, clouds passing by
        const planeY = 32 + 6 * Math.sin(phase * 4);
        const planeTilt = 8 * Math.cos(phase * 4);
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect width="200" height="120" fill="#f0f9ff" opacity="0.3" />
            
            {/* Soft background grid longitude/latitude rings */}
            <circle cx="100" cy="65" r="38" fill="none" stroke="#bae6fd" strokeWidth="1" />
            <ellipse cx="100" cy="65" rx="38" ry="12" fill="none" stroke="#bae6fd" strokeWidth="1" />
            <ellipse cx="100" cy="65" rx="12" ry="38" fill="none" stroke="#bae6fd" strokeWidth="1" />

            {/* Sketched Earth Globe base (Warm pastel colors) */}
            <g transform={`translate(100, 65) rotate(${progress * 1.5})`}>
              {/* Water base */}
              <circle cx="0" cy="0" r="30" fill="#bae6fd" stroke="currentColor" strokeWidth="2.2" />
              
              {/* Cozy continents details drawn procedurally as friendly wiggle globs */}
              {/* North America */}
              <path d="M -22 -10 Q -15 -18 -5 -15 Q -4 -5 -12 -2 Q -18 5 -22 -10 Z" fill="#bbf7d0" stroke="currentColor" strokeWidth="1.5" />
              {/* South America */}
              <path d="M -12 2 Q -2 4 4 12 Q 2 24 -6 22 Q -15 15 -12 2 Z" fill="#bbf7d0" stroke="currentColor" strokeWidth="1.5" />
              {/* Europe/Africa continents */}
              <path d="M 10 -15 Q 22 -18 25 -5 Q 15 5 18 15 Q 5 24 8 8 Q 0 -5 10 -15 Z" fill="#bbf7d0" stroke="currentColor" strokeWidth="1.5" />
              {/* Equator line */}
              <line x1="-30" y1="0" x2="30" y2="0" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3,3" />
            </g>

            {/* Drift Clouds (Sketchy bubbles sliding right to left) */}
            <g transform={`translate(${(180 - progress * 1.8) % 230}, 20)`} className="text-zinc-400 opacity-60">
              <path d="M -15 5 C -15 1, -8 0, -5 2 C -2 -2, 8 -2, 11 3 C 15 2, 22 5, 18 10 H -15 Z" fill="white" stroke="currentColor" strokeWidth="1.5" />
            </g>
            <g transform={`translate(${(120 - progress * 2) % 230}, 85)`} className="text-zinc-400 opacity-40">
              <path d="M -10 3 C -10 1, -5 0, -3 1 C -1 -2, 5 -2, 7 2 C 10 1, 14 3, 11 7 H -10 Z" fill="white" stroke="currentColor" strokeWidth="1.2" />
            </g>

            {/* Hand-drawn Airplane */}
            <g transform={`translate(${45 + progress * 1.1}, ${planeY}) rotate(${planeTilt})`} className="text-indigo-900">
              {/* Propeller Wind Trail */}
              <path d="M -25 -2 Q -35 -15 -45 -12" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M -25 2 Q -35 15 -45 12" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2,2" />

              {/* Plane Body */}
              <path d="M -18 -3 Q -22 0 -18 3 L 8 4 Q 15 2 18 0 Q 15 -2 8 -4 Z" fill="#bfdbfe" stroke="currentColor" strokeWidth="2.2" />
              {/* Wings */}
              <path d="M -2 -4 L -8 -16 L -2 -16 L 3 -4 Z" fill="#3b82f6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M -2 4 L -8 16 L -2 16 L 3 4 Z" fill="#3b82f6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              {/* Tail fin */}
              <path d="M -15 -3 L -21 -10 L -17 -10 L -12 -3" fill="#3b82f6" stroke="currentColor" strokeWidth="1.8" />
              {/* Pilot Window */}
              <ellipse cx="6" cy="-1" rx="2.5" ry="1.5" fill="white" stroke="currentColor" strokeWidth="1" />
            </g>

            {/* Travel compass mark in bottom left */}
            <g transform="translate(25, 25)" className="text-zinc-500 scale-90">
              <circle cx="0" cy="0" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" strokeWidth="1.2" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="currentColor" strokeWidth="1.2" />
              {/* Red needle tip */}
              <polygon points="0,0 -3,-3 0,-8 3,-3" fill="#ef4444" stroke="currentColor" strokeWidth="1" />
              <text x="-2" y="-14" className="font-mono text-[7px] font-bold fill-zinc-900">N</text>
            </g>
          </svg>
        );
      }

      case "camera": {
        // Shutter lens focusing, photo frame sliding down, camera body shaking
        const flashClass = isFlashing ? "opacity-100" : "opacity-0";
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect width="200" height="120" fill="#f5f3ff" opacity="0.3" />

            {/* Capturing guidelines (Camera viewfinder rect) */}
            <g stroke="#cbd5e1" strokeWidth="1.2" fill="none">
              <rect x="15" y="15" width="170" height="90" strokeDasharray="5,5" />
              {/* Corner brackets */}
              <path d="M 15 25 V 15 H 25" />
              <path d="M 185 25 V 15 H 175" />
              <path d="M 15 85 V 95 H 25" />
              <path d="M 185 85 V 95 H 175" />
              {/* Center crosshair */}
              <circle cx="100" cy="60" r="3" />
            </g>

            {/* Polaroid Snapshot sliding down on high progress */}
            {progress > 50 && (
              <g transform={`translate(150, ${15 + (progress - 50) * 1.5}) rotate(8)`} className="text-zinc-800">
                {/* Photo card */}
                <rect x="-18" y="-22" width="36" height="42" rx="2" fill="white" stroke="currentColor" strokeWidth="2" />
                {/* Snapshot image inside (Tiny mountains) */}
                <rect x="-14" y="-18" width="28" height="24" fill="#a78bfa" stroke="currentColor" strokeWidth="1.2" />
                <polygon points="-14,-4 -6,-14 2,-4" fill="#e9d5ff" stroke="currentColor" strokeWidth="1" />
                <polygon points="-4,-4 4,-11 14,-4" fill="#ddd6fe" stroke="currentColor" strokeWidth="1" />
                {/* Cute caption line */}
                <line x1="-10" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="-10" y1="16" x2="0" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {/* Sketched Camera (Shaking with zoom ticks) */}
            <g transform={`translate(100, 60) scale(${scaleEffect}) rotate(${rotEffect * 1.5})`}>
              {/* Camera top flash/sensor bay */}
              <rect x="-16" y="-23" width="12" height="8" rx="1.5" fill="#ddd6fe" stroke="currentColor" strokeWidth="2.2" />
              <circle cx="20" cy="-21" r="2.5" fill="#a78bfa" stroke="currentColor" strokeWidth="1.8" />
              
              {/* Camera Main Body */}
              <rect x="-35" y="-16" width="70" height="38" rx="5" fill="#e9d5ff" stroke="currentColor" strokeWidth="2.6" />
              {/* Grip strip */}
              <rect x="-31" y="-12" width="14" height="30" fill="#c084fc" stroke="currentColor" strokeWidth="1.5" />
              <line x1="-28" y1="-8" x2="-28" y2="14" stroke="currentColor" strokeWidth="1.2" />
              <line x1="-24" y1="-8" x2="-24" y2="14" stroke="currentColor" strokeWidth="1.2" />

              {/* Shutter Button */}
              <rect x="18" y="-20" width="8" height="5" fill="#fca5a5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

              {/* Big Lens (Multiple Rings) */}
              <circle cx="8" cy="3" r="18" fill="white" stroke="currentColor" strokeWidth="2.6" />
              <circle cx="8" cy="3" r="14" fill="#faf5ff" stroke="currentColor" strokeWidth="1.5" />
              {/* Focus aperture lines */}
              <circle cx="8" cy="3" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3,2" />
              <circle cx="8" cy="3" r="6" fill="#18181b" />
              {/* Reflection gloss */}
              <path d="M 5 -1 A 3 3 0 0 1 11 -1" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Flash Burst Shockwave Overlay (Renders on triggered shoot interval) */}
            <g className={`transition-opacity duration-100 ${flashClass} pointer-events-none`}>
              <rect width="200" height="120" fill="white" opacity="0.8" />
              {/* Spike bursts */}
              <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
                <line x1="100" y1="60" x2="100" y2="15" />
                <line x1="100" y1="60" x2="100" y2="105" />
                <line x1="100" y1="60" x2="155" y2="60" />
                <line x1="100" y1="60" x2="45" y2="60" />
                <line x1="100" y1="60" x2="140" y2="25" />
                <line x1="100" y1="60" x2="60" y2="95" />
              </g>
              {/* Pop text */}
              <text x="100" y="65" className="font-hand text-lg font-black fill-zinc-900 text-center select-none" textAnchor="middle" style={{ transform: "rotate(-8deg)" }}>CHICK!</text>
            </g>
          </svg>
        );
      }

      case "reading": {
        // Animated open textbook, sparkles of ideas drifting up, key light bulbs
        const pageWobble = 2 * Math.sin(phase * 4);
        return (
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <rect width="200" height="120" fill="#fefcbf" opacity="0.15" />

            {/* Glowing Lightbulb Sketch (Source of inspiration / strategy) */}
            <g transform="translate(100, 24)" className="text-yellow-600">
              {/* Rays glow */}
              <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="animate-pulse">
                <line x1="0" y1="-14" x2="0" y2="-19" />
                <line x1="-12" y1="-7" x2="-16" y2="-10" />
                <line x1="12" y1="-7" x2="16" y2="-10" />
                <line x1="-14" y1="5" x2="-19" y2="5" />
                <line x1="14" y1="5" x2="19" y2="5" />
              </g>
              {/* Bulb body */}
              <path d="M -7 5 C -13 -2, -10 -11, 0 -11 C 10 -11, 13 -2, 7 5 Q 5 11, 3 11 H -3 Q -5 11, -7 5 Z" fill="#fef08a" stroke="currentColor" strokeWidth="1.8" />
              <rect x="-3" y="11" width="6" height="4" rx="1" fill="#e4e4e7" stroke="currentColor" strokeWidth="1.5" />
              {/* Inside filament */}
              <path d="M -3 0 Q 0 -6 3 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </g>

            {/* Drifting Sparkles & Math/Node symbols */}
            <g className="text-zinc-500 font-mono text-[9px] font-bold">
              <text x="45" y={35 - (progress * 0.25) % 35} className="fill-indigo-600 opacity-60">GTM</text>
              <text x="140" y={45 - (progress * 0.22) % 35} className="fill-emerald-600 opacity-60">RAG</text>
              <text x="30" y={60 - (progress * 0.18) % 35} className="fill-amber-600 opacity-40">UAT</text>
              
              {/* Floating Star */}
              <path 
                d="M 120 30 L 122 26 L 124 30 L 128 32 L 124 34 L 122 38 L 120 34 L 116 32 Z" 
                fill="#f59e0b" 
                stroke="currentColor" 
                strokeWidth="0.8" 
                style={{ transform: `translate(${-10 + (progress * 0.2) % 30}px, ${-12 + Math.sin(phase) * 6}px)` }}
              />
            </g>

            {/* Opened textbook (double pages lifting up and down) */}
            <g transform="translate(100, 80)">
              {/* Book cover (backboard shadow) */}
              <path d="M -44 14 Q 0 17, 44 14 V 2 C 0 5, 0 5, -44 2 Z" fill="#b45309" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              
              {/* Paper Stack Thickness block */}
              <path d="M -42 12 Q 0 15, 42 12 V 0 C 0 3, 0 3, -42 0 Z" fill="#f5f5f4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

              {/* Left Page (Wobbling with page turn) */}
              <path 
                d={`M -40 0 Q -20 ${-3 + pageWobble}, 0 -1 V 11 Q -20 ${9 + pageWobble}, -40 12 Z`} 
                fill="#fffbeb" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinejoin="round" 
              />
              {/* Printed horizontal lines on Left Page */}
              <line x1="-32" y1="3" x2="-8" y2="2.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />
              <line x1="-32" y1="6" x2="-8" y2="5.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />
              <line x1="-32" y1="9" x2="-8" y2="8.5" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />

              {/* Right Page */}
              <path 
                d={`M 0 -1 Q 20 ${-3 - pageWobble}, 40 0 V 12 Q 20 ${9 - pageWobble}, 0 11 Z`} 
                fill="#fffbeb" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinejoin="round" 
              />
              {/* Printed lines on Right Page */}
              <line x1="8" y1="2.5" x2="32" y2="3" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />
              <line x1="8" y1="5.5" x2="32" y2="6" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />
              <line x1="8" y1="8.5" x2="32" y2="9" stroke="currentColor" strokeWidth="1.1" strokeDasharray="1,1" />

              {/* Bookmark silk ribbon */}
              <path d="M 0 11 Q 5 18, 3 24 Q 0 26, -2 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            </g>

            <text x="145" y="105" className="font-hand text-[8px] font-black fill-amber-700 select-none">Bao's Notes ✒️</text>
          </svg>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-3 border-ink rounded-xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] overflow-hidden flex flex-col">
      
      {/* 1. Header Bar of Crayon Video Cabinet */}
      <div className="bg-zinc-50 px-4 py-3 border-b-3 border-ink flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-ink"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-ink"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 border border-ink"></span>
          </div>
          <span className="font-hand font-extrabold text-sm text-ink flex items-center gap-1">
            <Tv className="h-4 w-4 text-pink-500" />
            Bao's Playable Doodle Cinema
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-yellow-100 border-2 border-ink px-2 py-0.5 rounded-md transform rotate-[1.5deg]">
          <Sparkles className="h-3 w-3 text-amber-600 animate-spin" />
          <span className="font-mono text-[9px] font-black tracking-wide text-zinc-900">CRAYON-O-VISION</span>
        </div>
      </div>

      {/* 2. Interactive Screen Stage */}
      <div className="relative bg-[#faf8f5] border-b-3 border-ink aspect-[16/10] overflow-hidden group select-none">
        
        {/* Draw current scene graphics */}
        {renderInteractiveDraftDrawing()}

        {/* Dynamic Scene Subtitle Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/92 border-2 border-ink py-1.5 px-3 rounded-lg shadow-sm font-hand text-xs text-center text-ink leading-tight select-none">
          {scene.subtitle}
        </div>

        {/* Scene list overlay for side-channels */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          {SCENES.map((sc, scIdx) => (
            <button
              key={sc.id}
              onClick={() => {
                setProgress(0);
                setCurrentSceneIdx(scIdx);
                playBeep(320 + scIdx * 50, "sine");
              }}
              className={`px-1.5 py-0.5 font-mono text-[8.5px] font-bold border rounded flex items-center gap-1 text-left transition-colors cursor-pointer ${
                scIdx === currentSceneIdx 
                  ? "bg-ink text-white border-ink" 
                  : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              {sc.title.split(" ")[1]} {/* Shorten name */}
            </button>
          ))}
        </div>

        {/* Big central Play overlay badge on pause */}
        {!isPlaying && (
          <div 
            onClick={handlesPlayPause}
            className="absolute inset-0 bg-zinc-900/15 flex items-center justify-center cursor-pointer animate-fade-in group-hover:bg-zinc-900/22 transition-colors"
          >
            <div className="bg-yellow-300 border-3 border-ink p-4 rounded-full h-16 w-16 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:scale-105 active:scale-95 transform transition-all">
              <Play className="h-8 w-8 text-ink fill-ink ml-1.5" />
            </div>
          </div>
        )}
      </div>

      {/* 3. Physical Controller Deck Panel */}
      <div className="bg-zinc-50 p-4 space-y-3.5">
        
        {/* Progress scrub bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400 font-extrabold uppercase select-none">
            <span>Doodle Reel Stream // {scene.title}</span>
            <span>{Math.floor(progress / 10).toString().padStart(2, "0")}:{(Math.floor(progress % 10) * 10).toString().padStart(2, "0")} / 10:00</span>
          </div>
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = (clickX / rect.width) * 100;
              setProgress(percentage);
              playBeep(400, "sine", 0.08);
            }}
            className="h-4 bg-white border-2 border-ink rounded-lg relative cursor-pointer group shadow-[1px_1px_0px_0px_rgba(24,24,27,1)]"
          >
            {/* Progress fill (Crayon-style diagonal pattern) */}
            <div 
              style={{ width: `${progress}%` }}
              className="h-full bg-pink-300 border-r-2 border-ink transition-all duration-150 relative flex items-center justify-end"
            >
              {/* Glowing handle knob */}
              <div className="w-3.5 h-3.5 bg-yellow-300 border-2 border-ink rounded-full absolute -right-2 transform translate-x-1 shadow-sm group-hover:scale-110"></div>
            </div>
          </div>
        </div>

        {/* Buttons and switches */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Play/Pause/Prev/Next bundle */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              title="Previous Doodle Scene"
              className="p-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer text-ink flex items-center"
            >
              <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              onClick={handlesPlayPause}
              title={isPlaying ? "PAUSE REEL" : "PLAY REEL"}
              className={`px-4 py-2 font-hand text-xs font-black border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer flex items-center gap-1.5 ${
                isPlaying ? "bg-red-200 hover:bg-red-300" : "bg-green-200 hover:bg-green-300 text-ink"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5 stroke-[3] fill-current" />
                  PAUSE
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 stroke-[3] fill-current" />
                  PLAY
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              title="Next Doodle Scene"
              className="p-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer text-ink flex items-center"
            >
              <ChevronRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => {
                setProgress(0);
                playBeep(261.63, "triangle", 0.15); // Clear/reset sound
              }}
              title="Reset Reel"
              className="p-2 bg-white hover:bg-zinc-100 active:bg-zinc-200 border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer text-ink flex items-center"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Speed adjuster & Sound toggle */}
          <div className="flex items-center gap-1.5">
            {/* Speed machine crank */}
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-1.5 bg-yellow-100 hover:bg-yellow-200 border-2 border-ink text-[10px] font-mono font-black rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer text-ink"
            >
              🎥 CRANK RATIO: <span className="text-pink-600 font-extrabold">{playbackSpeed}x</span>
            </button>

            {/* Mute button */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (isMuted) {
                  setTimeout(() => playBeep(523, "sine", 0.1), 50);
                }
              }}
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              className={`p-2 border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px] transition-all cursor-pointer flex items-center ${
                isMuted ? "bg-zinc-200 text-zinc-500" : "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
              }`}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 animate-pulse" />}
            </button>
          </div>

        </div>

        {/* Descriptive Footer commentary */}
        <div className="bg-zinc-100/50 border border-dashed border-zinc-200 p-2.5 rounded-lg">
          <p className="font-sans text-[10px] md:text-xs text-zinc-650 leading-relaxed">
            <span className="font-bold text-ink italic font-hand block mb-0.5">💡 Interactive Director Console:</span>
            {scene.desc} Adjust playback rates or trigger instant musical notation tones inside the canvas using the console selectors.
          </p>
        </div>

      </div>

    </div>
  );
};
