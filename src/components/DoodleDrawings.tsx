/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

/**
 * Clean hand-drawn styled SVG icon of the Handshake ("Who Am I?")
 */
/**
 * Clean hand-drawn styled SVG icon of the Handshake ("Who Am I?")
 * Upgraded to cozy crayon colored-pencil shading and felt-tip marker outlines
 */
export const HandshakeSvg: React.FC<{ className?: string }> = ({ className = "h-24 w-24" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      className={`${className} select-none`}
      aria-label="Golden State Warriors illustration"
    >
      <defs>
        {/* Arcing paths for the top/bottom text to follow the circular logo */}
        <path id="gsw-top-path" d="M 44,54 A 58,58 0 0,1 156,54" fill="none" />
        <path id="gsw-bottom-path" d="M 44,66 A 58,58 0 0,0 156,66" fill="none" />
        
        {/* Immersive 3D Drop-Shadow filter to lift layers off the background */}
        <filter id="handshake-drop-shadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="2" dy="4" stdDeviation="1.8" floodColor="#18181b" floodOpacity="0.32" />
          <feDropShadow dx="0.5" dy="1" stdDeviation="0.5" floodColor="#18181b" floodOpacity="0.18" />
        </filter>
        
        {/* Rich 3D spherical radial gradient for primary Warriors blue circle base */}
        <radialGradient id="handshake-radial-blue" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="45%" stopColor="#1d428a" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        {/* Dynamic linear metallic gold gradient for bridge details */}
        <linearGradient id="handshake-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#ffc72c" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Soft 3D base shadow filter */}
        <filter id="badge-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 
        3D BACKGROUND SHADOW FOR SEPARATION
      */}
      <g filter="url(#handshake-drop-shadow)">
        {/* 
          COZY CRAYON COLOR FILLS (Warriors Blue Circle Base with 3D Spherical Shader)
        */}
        <circle
          cx="100"
          cy="60"
          r="46"
          fill="url(#handshake-radial-blue)"
          opacity="0.95"
        />

        {/* Glossy 3D spherical surface light streak */}
        <path
          d="M 60 44 A 40 40 0 0 1 140 44"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.35"
        />
        <ellipse cx="100" cy="22" rx="20" ry="4" fill="#ffffff" opacity="0.25" />

        {/* 
          HAND-DRAWN CRAYON SCRIBBLES/COLOURED-PENCIL TEXTURES
        */}
        <g strokeWidth="1.2" opacity="0.45" strokeLinecap="round">
          {/* Dark blue scribbles to give realistic crayon feel */}
          <path d="M 60 40 L 140 80 M 65 35 L 135 75 M 70 30 L 130 90 M 55 55 L 145 55 M 70 85 L 130 25" fill="none" stroke="#1e3a8a" />
          <path d="M 58 45 Q 100 20 142 45 M 58 75 Q 100 100 142 75" fill="none" stroke="#1d4ed8" />
          {/* Golden yellow highlight scribbles */}
          <path d="M 85 45 Q 100 50 115 45 M 80 75 Q 100 70 120 75" fill="none" stroke="#f59e0b" />
        </g>

        {/* 
          INK FELT-TIP OUTLINES (Double sketchy strokes for circular base)
        */}
        <circle
          cx="100"
          cy="60"
          r="46"
          fill="none"
          stroke="#18181b"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="100.5"
          cy="59.5"
          r="46.5"
          fill="none"
          stroke="#27272a"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />

        {/* 
          GOLDEN BRAND RING INSIDE (Salesforce-yellow/GSW-gold match with 3D metallic gradient)
        */}
        <circle
          cx="100"
          cy="60"
          r="41"
          fill="none"
          stroke="url(#handshake-gold-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle
          cx="99.5"
          cy="60.5"
          r="41"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.2"
          opacity="0.75"
          strokeLinecap="round"
        />

        {/* 
          THE SUSPENSION BRIDGE (Double ink outline, filled with warm gold 3D gradient)
        */}
        
        {/* Horizontal / Arched Roadway deck */}
        <path
          d="M 56 74 Q 100 72 144 74"
          fill="none"
          stroke="#18181b"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 55.5 74.5 Q 100 72.5 144.5 74.5"
          fill="none"
          stroke="url(#handshake-gold-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Main Bridge Tower (Double sketchy bar) */}
        <g stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Left vertical pillar */}
          <path d="M 85 41 L 85 91" />
          {/* Right vertical pillar */}
          <path d="M 91 41 L 91 91" />
          {/* Crossbeam braces */}
          <path d="M 85 46 L 91 46" />
          <path d="M 85 54 L 91 54" />
          <path d="M 85 64 L 91 64" />
          <path d="M 85 71 L 91 71" />
          <path d="M 85 81 L 91 81" />
          
          {/* Little triangle cap */}
          <path d="M 83 41 L 88 35 L 93 41 Z" fill="url(#handshake-gold-grad)" />
        </g>

        {/* Sweeping Cables (Yellow with ink offset) */}
        <path
          d="M 58 74 Q 73 50 88 41 Q 112 65 124 70 Q 134 66 142 60"
          fill="none"
          stroke="url(#handshake-gold-grad)"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        <path
          d="M 58 74 Q 73 50 88 41 Q 112 65 124 70 Q 134 66 142 60"
          fill="none"
          stroke="#18181b"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Symmetrical Vertical Support Suspension Cables */}
        <g stroke="url(#handshake-gold-grad)" strokeWidth="1.5" opacity="0.95" strokeLinecap="round">
          <line x1="64" y1="65" x2="64" y2="74" />
          <line x1="70" y1="56" x2="70" y2="74" />
          <line x1="76" y1="49" x2="76" y2="74" />
          <line x1="82" y1="44" x2="82" y2="74" />
          <line x1="94" y1="46" x2="94" y2="74" />
          <line x1="100" y1="54" x2="100" y2="74" />
          <line x1="106" y1="62" x2="106" y2="74" />
          <line x1="112" y1="68" x2="112" y2="74" />
          <line x1="118" y1="70" x2="118" y2="74" />
          <line x1="124" y1="70" x2="124" y2="74" />
          <line x1="130" y1="68" x2="130" y2="74" />
          <line x1="136" y1="64" x2="136" y2="74" />
        </g>
        
        {/* Ink overlays on suspension lines to give doodle fidelity */}
        <g stroke="#18181b" strokeWidth="0.8" opacity="0.6" strokeLinecap="round">
          <line x1="70" y1="56" x2="70" y2="74" />
          <line x1="76" y1="49" x2="76" y2="74" />
          <line x1="100" y1="54" x2="100" y2="74" />
          <line x1="106" y1="62" x2="106" y2="74" />
          <line x1="118" y1="70" x2="118" y2="74" />
        </g>

        {/* 
          THE ICONIC NUMBER "30" (Stephen Curry Tribute styled in deep 3D layers)
        */}
        <text
          x="105.5"
          y="55.5"
          className="font-hand font-black text-xl select-none fill-[#0f172a]"
          style={{ transform: "rotate(-2deg)" }}
          opacity="0.8"
        >
          30
        </text>
        <text
          x="105"
          y="55"
          className="font-hand font-black text-xl select-none fill-[#18181b]"
          style={{ transform: "rotate(-2deg)" }}
        >
          30
        </text>
        <text
          x="104"
          y="54"
          className="font-hand font-black text-xl select-none"
          fill="url(#handshake-gold-grad)"
          style={{ transform: "rotate(-2deg)" }}
        >
          30
        </text>

        {/* 
          ARCED TEXT ENTRIES (Arched "GOLDEN STATE" over top, "WARRIORS" under bottom)
        */}
        {/* Top text */}
        <text className="font-hand font-black text-[9px] tracking-[0.25em] select-none uppercase">
          <textPath href="#gsw-top-path" startOffset="50%" textAnchor="middle" className="fill-[#18181b] stroke-[#18181b] stroke-[2px]">GOLDEN STATE</textPath>
        </text>
        <text className="font-hand font-black text-[9px] tracking-[0.25em] select-none uppercase">
          <textPath href="#gsw-top-path" startOffset="50%" textAnchor="middle" fill="url(#handshake-gold-grad)">GOLDEN STATE</textPath>
        </text>

        {/* Bottom text */}
        <text className="font-hand font-black text-[10px] tracking-[0.3em] select-none uppercase">
          <textPath href="#gsw-bottom-path" startOffset="50%" textAnchor="middle" className="fill-[#18181b] stroke-[#18181b] stroke-[2px]">WARRIORS</textPath>
        </text>
        <text className="font-hand font-black text-[10px] tracking-[0.3em] select-none uppercase">
          <textPath href="#gsw-bottom-path" startOffset="50%" textAnchor="middle" fill="url(#handshake-gold-grad)">WARRIORS</textPath>
        </text>

        {/* 
          AMBIENT DOODLE SPARKLES & SHAKE TICKS (Fits Home Vibe)
        */}
        <path d="M 35 22 Q 38 15 45 20" fill="none" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 165 24 Q 158 17 155 25" fill="none" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 100 112 Q 98 116 103 115" fill="none" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
        
        {/* Mini gold sparkle star */}
        <path d="M 42 96 L 44 92 L 46 96 L 50 98 L 46 100 L 44 104 L 42 100 L 38 98 Z" fill="url(#handshake-gold-grad)" stroke="#18181b" strokeWidth="1" />
      </g>
    </svg>
  );
};

/**
 * Clean hand-drawn styled SVG of the Architectural flowchart & servers ("Architectural Innovations")
 * Upgraded to cozy crayon colored-pencil shading and felt-tip marker outlines
 */
export const ArchitectureFlowSvg: React.FC<{ className?: string }> = ({ className = "h-24 w-24" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      className={`${className} select-none`}
      aria-label="System architecture diagram"
    >
      <defs>
        {/* Dynamic linear 3D gradient for top yellow node */}
        <linearGradient id="flow-yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Dynamic linear 3D gradient for decision diamonds */}
        <linearGradient id="flow-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Dynamic linear 3D gradient for output nodes */}
        <linearGradient id="flow-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>

        {/* Dynamic linear 3D gradient for blue database rack */}
        <linearGradient id="flow-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Soft 3D metallic server bay gradient */}
        <linearGradient id="flow-silver-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>

        {/* Soft 3D drop shadow filter to float components */}
        <filter id="flow-pop-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1.8" dy="3.2" stdDeviation="1.5" floodColor="#18181b" floodOpacity="0.32" />
        </filter>
      </defs>

      {/* 
        COLOR BACKGROUNDS WITH INNER COLOURED-PENCIL SCRIBBLE SHADING PATTERNS WITH 3D SHADOW
      */}

      {/* Connection paths (underneath elements to stay behind nodes) */}
      <g>
        <line x1="78" y1="23" x2="78" y2="35" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="77.5" y1="23" x2="77.5" y2="35" stroke="#18181b" strokeWidth="1" opacity="0.5" />

        {/* Horizontal split level paths */}
        <path d="M 50 35 L 105 35" fill="none" stroke="#18181b" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 49.5 35.5 L 105.5 35.5" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />
        
        <line x1="50" y1="35" x2="50" y2="45" stroke="#18181b" strokeWidth="2.8" />
        <line x1="105" y1="35" x2="105" y2="45" stroke="#18181b" strokeWidth="2.8" />

        {/* Connections flow */}
        <line x1="50" y1="65" x2="50" y2="78" stroke="#18181b" strokeWidth="2.8" />
        <line x1="105" y1="65" x2="105" y2="78" stroke="#18181b" strokeWidth="2.8" />

        {/* Database connecting messy squiggly flowchart split */}
        <path d="M 112 35 C 130 35, 125 50, 142 50" fill="none" stroke="#18181b" strokeWidth="2.5" strokeDasharray="4,3" />
        {/* Arrow tip dual stroke */}
        <path d="M 137 44 L 143 50 L 137 56" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating 3D Elements Group */}
      <g filter="url(#flow-pop-shadow)">
        {/* Top Source Node Box: Yellow background & crayon shading */}
        <rect x="65" y="5" width="26" height="18" rx="4" fill="url(#flow-yellow-grad)" opacity="0.95" />
        <g stroke="#ca8a04" strokeWidth="1" opacity="0.55" strokeLinecap="round">
          <line x1="68" y1="8" x2="88" y2="20" />
          <line x1="72" y1="7" x2="84" y2="19" />
          <line x1="66" y1="13" x2="78" y2="21" />
        </g>
        {/* Gloss highlight edge */}
        <path d="M 66 10 Q 78 7 90 10" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />

        {/* Diamonds Decision: Orange background & crayon shading */}
        <polygon points="50,45 62,55 50,65 38,55" fill="url(#flow-orange-grad)" opacity="0.95" />
        <g stroke="#ea580c" strokeWidth="0.9" opacity="0.55" strokeLinecap="round">
          <path d="M 44 50 L 56 60 M 42 55 L 50 62 M 48 48 L 54 54" fill="none" />
        </g>
        <path d="M 39 53 L 49 46 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        
        <polygon points="105,45 117,55 105,65 93,55" fill="url(#flow-orange-grad)" opacity="0.95" />
        <g stroke="#ea580c" strokeWidth="0.9" opacity="0.55" strokeLinecap="round">
          <path d="M 99 50 L 111 60 M 97 55 L 105 62 M 103 48 L 109 54" fill="none" />
        </g>
        <path d="M 94 53 L 104 46 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

        {/* Bottom Output Nodes: Green background & crayon shading */}
        <rect x="38" y="78" width="24" height="18" rx="3" fill="url(#flow-green-grad)" opacity="0.95" />
        <g stroke="#16a34a" strokeWidth="1" opacity="0.55" strokeLinecap="round">
          <line x1="41" y1="81" x2="59" y2="93" />
          <line x1="45" y1="80" x2="56" y2="91" />
        </g>
        <path d="M 39 82 L 61 82" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        
        <rect x="93" y="78" width="24" height="18" rx="3" fill="url(#flow-green-grad)" opacity="0.95" />
        <g stroke="#16a34a" strokeWidth="1" opacity="0.55" strokeLinecap="round">
          <line x1="96" y1="81" x2="114" y2="93" />
          <line x1="100" y1="80" x2="111" y2="91" />
        </g>
        <path d="M 94 82 L 116 82" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />

        {/* Database Rack Envelope: Light blue background & blue crayon shading */}
        <rect x="150" y="12" width="38" height="85" rx="5" fill="url(#flow-blue-grad)" opacity="0.95" />
        <g stroke="#1e40af" strokeWidth="1.1" opacity="0.5" strokeLinecap="round">
          <path d="M 153 16 L 185 45 M 153 35 L 185 65 M 153 55 L 185 85 M 153 75 L 175 93" fill="none" />
        </g>
        <path d="M 152 14 L 152 95 Q 169 13 186 14" fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.45" strokeLinecap="round" />

        {/* Server Bays inside: Light gray highlights with inner scribbles */}
        <rect x="155" y="20" width="28" height="15" rx="2" fill="url(#flow-silver-grad)" />
        <rect x="155" y="45" width="28" height="15" rx="2" fill="url(#flow-silver-grad)" />
        <rect x="155" y="70" width="28" height="15" rx="2" fill="url(#flow-silver-grad)" />

        {/* Top Source Node ink border */}
        <rect x="65" y="5" width="26" height="18" rx="4" fill="none" stroke="#18181b" strokeWidth="2.8" />
        <rect x="65.5" y="4.5" width="25" height="19" rx="4" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

        {/* Diamond Decisions ink borders */}
        <polygon points="50,45 62,55 50,65 38,55" fill="none" stroke="#18181b" strokeWidth="2.5" />
        <polygon points="50.5,44.5 62.5,54.5 50.5,65.5 38.5,55.5" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

        <polygon points="105,45 117,55 105,65 93,55" fill="none" stroke="#18181b" strokeWidth="2.5" />
        <polygon points="105.5,44.5 117.5,54.5 105.5,65.5 93.5,55.5" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

        {/* Bottom Output box borders */}
        <rect x="38" y="78" width="24" height="18" rx="3" fill="none" stroke="#18181b" strokeWidth="2.5" />
        <rect x="38.5" y="77.5" width="23" height="19" rx="3" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

        <rect x="93" y="78" width="24" height="18" rx="3" fill="none" stroke="#18181b" strokeWidth="2.5" />
        <rect x="93.5" y="77.5" width="23" height="19" rx="3" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

        {/* Database server rack boundary shadow */}
        <rect x="150" y="12" width="38" height="85" rx="5" fill="none" stroke="#18181b" strokeWidth="3" />
        <rect x="150.5" y="11.5" width="37" height="86" rx="5" fill="none" stroke="#27272a" strokeWidth="1.2" opacity="0.7" />

        {/* Server bays outline frames */}
        <rect x="155" y="20" width="28" height="15" rx="2" fill="none" stroke="#18181b" strokeWidth="2.2" />
        <circle cx="160" cy="27" r="2.2" fill="#18181b" />
        <circle cx="166" cy="27" r="2.2" fill="#18181b" />
        <line x1="172" y1="27" x2="179" y2="27" stroke="#18181b" strokeWidth="2" />

        <rect x="155" y="45" width="28" height="15" rx="2" fill="none" stroke="#18181b" strokeWidth="2.2" />
        <circle cx="160" cy="52" r="2.2" fill="#18181b" />
        <circle cx="166" cy="52" r="2.2" fill="#18181b" />
        <line x1="172" y1="52" x2="179" y2="52" stroke="#18181b" strokeWidth="2" />

        <rect x="155" y="70" width="28" height="15" rx="2" fill="none" stroke="#18181b" strokeWidth="2.2" />
        <circle cx="160" cy="77" r="2.2" fill="#18181b" />
        <circle cx="166" cy="77" r="2.2" fill="#18181b" />
        <line x1="172" y1="77" x2="179" y2="77" stroke="#18181b" strokeWidth="2" />
      </g>

      {/* Server grounding bottom feet rack lines */}
      <line x1="169" y1="97" x2="169" y2="108" stroke="#18181b" strokeWidth="2.8" />
      <line x1="155" y1="108" x2="183" y2="108" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="154" y1="109" x2="184" y2="109" stroke="#18181b" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
};

/**
 * Clean hand-drawn styled SVG of the winding pathway ("Professional Path")
 * Upgraded to cozy crayon colored-pencil shading and felt-tip marker outlines
 */
export const ProfessionalPathSvg: React.FC<{ className?: string }> = ({ className = "h-24 w-24" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      className={`${className} select-none`}
      aria-label="Professional career path map"
    >
      <defs>
        {/* Soft 3D drop shadow filter to float components */}
        <filter id="path-pop-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="1.8" dy="3.2" stdDeviation="1.5" floodColor="#18181b" floodOpacity="0.32" />
        </filter>

        {/* 3D gradient for the starting map pin */}
        <radialGradient id="pin-red-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>

        {/* 3D gradient for middle green flag */}
        <linearGradient id="flag-green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>

        {/* 3D gradient for red goal flag */}
        <linearGradient id="flag-red-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>

        {/* 3D linear gradient for scroll gold ribbon */}
        <linearGradient id="ribbon-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>

        {/* Soft paper silver cylinder roll gradient */}
        <linearGradient id="scroll-paper-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>
      </defs>

      {/* Connection elements staying behind floating 3D markers */}
      <g>
        {/* The winding path road: thick marker dotted lines with double ink-crayon sketch layer */}
        <path
          d="M 30 92 Q 60 85, 80 62 T 130 50 T 170 65"
          fill="none"
          stroke="#18181b"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="4,4"
        />
        <path
          d="M 30 92.5 Q 60 85.5, 80 62.5 T 130 50.5 T 170 65.5"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="4,4"
          opacity="0.6"
        />

        {/* Checkpoint flag pole outlines */}
        <line x1="95" y1="35" x2="95" y2="60" stroke="#18181b" strokeWidth="2.2" />
        <line x1="94" y1="35" x2="94" y2="60" stroke="#18181b" strokeWidth="0.8" opacity="0.5" />

        {/* Goal flag pole outlines */}
        <line x1="165" y1="18" x2="165" y2="55" stroke="#18181b" strokeWidth="2.8" />
        <line x1="164.2" y1="18" x2="164.2" y2="55" stroke="#18181b" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Floating 3D Elements with drop shadows */}
      <g filter="url(#path-pop-shadow)">
        {/* Starting map pin (Location icon): Red fill + dark red scribbles */}
        <path
          d="M 30 75 C 22 75, 18 83, 30 98 C 42 83, 38 75, 30 75 Z"
          fill="url(#pin-red-grad)"
          opacity="0.95"
        />
        <g stroke="#991b1b" strokeWidth="1.1" opacity="0.45" strokeLinecap="round">
          <path d="M 26 80 L 34 94 M 24 84 L 32 96 M 28 77 Q 35 77 34 85" fill="none" />
        </g>
        {/* Highlighting sheen path */}
        <path d="M 24 81 Q 28 78 33 80" fill="none" stroke="#ffffff" strokeWidth="1.8" opacity="0.55" strokeLinecap="round" />

        {/* Middle Checkpoint Green Flag: Green fill + emerald scribbles */}
        <polygon points="95,35 110,41 95,47" fill="url(#flag-green-grad)" opacity="0.95" />
        <g stroke="#16a34a" strokeWidth="1" opacity="0.45" strokeLinecap="round">
          <line x1="97" y1="38" x2="107" y2="44" />
          <line x1="97" y1="41" x2="104" y2="45" />
        </g>
        <path d="M 96 37 L 109 42" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />

        {/* Red Goal Flag at the end: Pink/Red background + red scribbles */}
        <polygon points="165,18 185,25 165,32" fill="url(#flag-red-grad)" opacity="0.95" />
        <g stroke="#dc2626" strokeWidth="1.1" opacity="0.45" strokeLinecap="round">
          <line x1="167" y1="21" x2="181" y2="28" />
          <line x1="167" y1="26" x2="177" y2="30" />
        </g>
        <path d="M 166 20 L 182 25" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />

        {/* Graduation Scroll / Diploma in the corner: White/beige background + orange ribbon & red ribbon tails */}
        <g transform="translate(133, 70) rotate(-15)">
          {/* Scroll rolled cylinder solid base */}
          <rect x="10" y="10" width="34" height="16" rx="3" fill="url(#scroll-paper-grad)" />
          {/* Scroll pencil shader lines */}
          <g stroke="#d4d4d8" strokeWidth="0.95" opacity="0.7" strokeLinecap="round">
            <line x1="13" y1="12" x2="21" y2="12" />
            <line x1="13" y1="16" x2="21" y2="16" />
            <line x1="31" y1="13" x2="41" y2="13" />
            <line x1="31" y1="18" x2="42" y2="18" />
          </g>
          
          {/* Ribbon wrapped around: Red fill + darker red scribbles */}
          <rect x="22" y="9.5" width="8" height="17" fill="url(#ribbon-gold-grad)" />
          <line x1="24" y1="10" x2="24" y2="26" stroke="#b91c1c" strokeWidth="1.1" opacity="0.5" />
          <line x1="27" y1="10" x2="27" y2="26" stroke="#b91c1c" strokeWidth="1.1" opacity="0.5" />
          
          {/* Ribbon tails solid base */}
          <path d="M 26 26.5 L 22 36 L 26 34 L 30 36 Z" fill="url(#ribbon-gold-grad)" />
          <g stroke="#b91c1c" strokeWidth="0.9" opacity="0.5">
            <line x1="24" y1="28" x2="24" y2="34" />
            <line x1="28" y1="28" x2="28" y2="34" />
          </g>

          {/* Scroll rolled cylinder dual-outliner */}
          <rect
            x="10"
            y="10"
            width="34"
            height="16"
            rx="3"
            fill="none"
            stroke="#18181b"
            strokeWidth="2.5"
          />
          <rect
            x="9.5"
            y="10.5"
            width="35"
            height="15"
            rx="3"
            fill="none"
            stroke="#27272a"
            strokeWidth="0.9"
            opacity="0.6"
          />
          
          {/* Ribbon wrapped around border */}
          <rect
            x="22"
            y="9.5"
            width="8"
            height="17"
            fill="none"
            stroke="#18181b"
            strokeWidth="2.2"
          />
          {/* Ribbon tails outline */}
          <path d="M 26 26.5 L 22 36 L 26 34 L 30 36 Z" fill="none" stroke="#18181b" strokeWidth="2" strokeLinejoin="round" />
          
          {/* Roll circular lines for the rolled effect */}
          <ellipse cx="10" cy="18" rx="2.5" ry="8" fill="#e4e4e7" stroke="#18181b" strokeWidth="2" />
          <ellipse cx="44" cy="18" rx="2" ry="8" fill="#e4e4e7" stroke="#18181b" strokeWidth="2" />
        </g>

        {/* Starting map pin Location marker double outline */}
        <path
          d="M 30 75 C 22 75, 18 83, 30 98 C 42 83, 38 75, 30 75 Z"
          fill="none"
          stroke="#18181b"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M 30.5 74.5 C 22.5 74.5, 18.5 82.5, 30.5 98.5 C 42.5 82.5, 38.5 74.5, 30.5 74.5 Z"
          fill="none"
          stroke="#27272a"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle cx="30" cy="82" r="3.2" fill="#18181b" />

        {/* Checkpoint flag outlines */}
        <polygon points="95,35 110,41 95,47" fill="none" stroke="#18181b" strokeWidth="2.2" />

        {/* Goal flag outlines */}
        <polygon points="165,18 185,25 165,32" fill="none" stroke="#18181b" strokeWidth="2.8" />
      </g>
    </svg>
  );
};

interface DoodleBoyProps {
  currentHoverSection?: string;
  className?: string;
}

/**
 * The core header Doodle Boy from the top of the screenshot!
 * Highly interactive: Displays a custom thought bubble with appropriate doodles inside 
 * depending on which portfolio section is currently active or hovered!
 */
export const DoodleBoyWithBubble: React.FC<DoodleBoyProps> = ({ 
  currentHoverSection = "home",
  className = "w-64 h-64" 
}) => {
  // Determine bubble drawing based on active section
  const renderThoughtContent = () => {
    switch (currentHoverSection) {
      case "about":
        return (
          <>
            {/* Thinking of self, networking, talking */}
            <circle cx="50" cy="27" r="10" fill="#fde047" stroke="#18181b" strokeWidth="2" />
            <path d="M 35 48 C 35 40, 65 40, 65 48" fill="none" stroke="#18181b" strokeWidth="2" />
            <path d="M 40 27 Q 44 32 48 27" fill="none" stroke="#18181b" strokeWidth="2" />
            
            {/* Little heart */}
            <path d="M 80 20 C 75 12, 65 18, 75 28 C 85 28, 85 18, 80 20 Z" fill="#fca5a5" stroke="#18181b" strokeWidth="1.5" />
            <text x="50" y="58" fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#18181b">Who Am I?</text>
          </>
        );
      case "experience":
        return (
          <>
            {/* Briefcase representation */}
            <rect x="35" y="24" width="30" height="20" rx="3" fill="#fed7aa" stroke="#18181b" strokeWidth="2" />
            <path d="M 44 24 L 44 20 Q 50 16 56 20 L 56 24" fill="none" stroke="#18181b" strokeWidth="2" />
            <circle cx="50" cy="34" r="2.5" fill="#18181b" />
            {/* Spurt stars */}
            <path d="M 18 15 L 22 20 M 82 20 L 78 15" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
            <text x="50" y="58" fontFamily="sans-serif" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#18181b">GTM Leader</text>
          </>
        );
      case "projects":
        return (
          <>
            {/* Traditional + AI connection nodes / starry spark */}
            <circle cx="35" cy="24" r="5" fill="#fde047" stroke="#18181b" strokeWidth="2" />
            <circle cx="65" cy="24" r="5" fill="#bfdbfe" stroke="#18181b" strokeWidth="2" />
            <line x1="40" y1="24" x2="60" y2="24" stroke="#18181b" strokeWidth="2" />
            <circle cx="50" cy="42" r="5" fill="#86efac" stroke="#18181b" strokeWidth="2" />
            <line x1="35" y1="29" x2="45" y2="39" stroke="#18181b" strokeWidth="2" />
            <line x1="65" y1="29" x2="55" y2="39" stroke="#18181b" strokeWidth="2" />
            <text x="50" y="58" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#18181b">AI & CPQ Hub</text>
          </>
        );
      case "contact":
        return (
          <>
            {/* Mail Envelope drawing */}
            <rect x="32" y="22" width="36" height="24" rx="2" fill="#bfdbfe" stroke="#18181b" strokeWidth="2" />
            <path d="M 32 22 L 50 35 L 68 22" fill="none" stroke="#18181b" strokeWidth="2" />
            {/* Wave dynamic sound cue */}
            <path d="M 75 22 Q 80 27 75 32" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <text x="50" y="58" fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#18181b">Reach out!</text>
          </>
        );
      case "certifications":
        return (
          <>
            {/* Little trophy cup */}
            <path d="M 38 20 L 62 20 L 58 38 L 42 38 Z" fill="#fde047" stroke="#18181b" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 50 38 L 50 44" stroke="#18181b" strokeWidth="2" />
            <line x1="42" y1="44" x2="58" y2="44" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
            <path d="M 38 24 A 4 4 0 0 1 34 28 A 4 4 0 0 1 38 32" fill="none" stroke="#18181b" strokeWidth="1.5" />
            <path d="M 62 24 A 4 4 0 0 0 66 28 A 4 4 0 0 0 62 32" fill="none" stroke="#18181b" strokeWidth="1.5" />
            <text x="50" y="58" fontFamily="sans-serif" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#18181b">13x Salesforce</text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      
      {/* 2. Thought Bubble Container (positioned above/to the right of the boy) */}
      {currentHoverSection !== "home" && (
        <div className="absolute top-[-30px] right-[-15px] z-20 transition-all duration-300 transform scale-100 hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 120 100"
            className="w-36 h-30 filter drop-shadow-sm select-none"
          >
            {/* Main Thought Cloud Ellipse */}
            <ellipse cx="50" cy="38" rx="42" ry="32" fill="#fbf8f3" stroke="#18181b" strokeWidth="2.5" />
            
            {/* Cloud secondary overlaps for a hand-drawn bubble effect */}
            <ellipse cx="20" cy="33" rx="14" ry="12" fill="#fbf8f3" stroke="#18181b" strokeWidth="2" />
            <ellipse cx="80" cy="35" rx="15" ry="14" fill="#fbf8f3" stroke="#18181b" strokeWidth="2" />
            {/* Re-fill inside white over borders */}
            <ellipse cx="50" cy="38" rx="40" ry="30" fill="#fbf8f3" />
            <ellipse cx="20" cy="33" rx="12" ry="10" fill="#fbf8f3" />
            <ellipse cx="80" cy="35" rx="13" ry="12" fill="#fbf8f3" />

            {/* Dynamic inside drawing based on hovered section */}
            {renderThoughtContent()}

            {/* Little thought helper circles leading down to the boy's head */}
            <circle cx="16" cy="74" r="6" fill="#fbf8f3" stroke="#18181b" strokeWidth="2" />
            <circle cx="8" cy="85" r="4" fill="#fbf8f3" stroke="#18181b" strokeWidth="2" />
          </svg>
        </div>
      )}

      {/* 1. Main Doodle Boy character drawing holding a real balloon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 130"
        className="w-full h-full select-none z-10"
      >
        <defs>
          {/* Gaussian blur for beautiful, realistic soft 3D shadows on the ground */}
          <filter id="shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          {/* Multi-layered drop shadow for a stellar 3D layered/cut-out paper art feel */}
          <filter id="pop-shadow" x="-10%" y="-10%" width="125%" height="125%">
            <feDropShadow dx="1.4" dy="2.4" stdDeviation="1.2" floodColor="#1c1917" floodOpacity="0.22" />
          </filter>
          
          {/* Beautiful gradients for polished 3D modeling effects */}
          {/* Soft 3D spherical radial gradient for the floating balloon */}
          <radialGradient id="balloon-grad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="45%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
          
          {/* Warm professional camel-to-orange gradient for the camel trench coat */}
          <linearGradient id="coat-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="35%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Golden yellow gradient for lapels */}
          <linearGradient id="lapel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Rich charcoal gradient for top hat */}
          <linearGradient id="hat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>

          {/* Sneaker red gradient */}
          <linearGradient id="shoe-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Soft 3D Grounding shadows underneath the boy's feet (drawn first for correct background rendering) */}
        <ellipse cx="50" cy="126" rx="20" ry="3.5" fill="#18181b" opacity="0.14" filter="url(#shadow-blur)" />
        <ellipse cx="50" cy="126" rx="10" ry="1.8" fill="#18181b" opacity="0.22" filter="url(#shadow-blur)" />

        {/* Group the entire boy structure with a realistic drop-shadow filter to separate him from the paper page */}
        <motion.g 
          filter="url(#pop-shadow)"
          animate={{
            y: [0, -1.8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        >
          {/* Trouser legs peeking out */}
          <path d="M 42 110 L 42 119 C 42 119, 45 119, 45 119" fill="none" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 58 110 L 58 119 C 58 119, 55 119, 55 119" fill="none" stroke="#18181b" strokeWidth="2.2" strokeLinecap="round" />

          {/* Left Polished Sneaker */}
          <g>
            {/* Red Sneaker Canvas Upper */}
            <path
              d="M 37.5 118.5 C 36 120.5, 34.5 122.5, 34.5 124.5 C 39.5 125.5, 44 125, 46.5 122 L 44 118.5 Z"
              fill="url(#shoe-grad)"
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* White Rubber Sneaker Sole */}
            <path
              d="M 33.8 124 L 33.8 126 C 37.5 127.5, 43.5 127, 46.5 124.5 L 46.2 123 C 43.8 124.8, 37.8 124.8, 33.8 124 Z"
              fill="#fafafa"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* White Rubber Toe Cap */}
            <path
              d="M 33.8 122.8 C 33.8 121.2, 36.8 120.5, 37.8 123.5 Z"
              fill="#fafafa"
              stroke="#18181b"
              strokeWidth="1.5"
            />
            {/* White Sneaker Lace Lines */}
            <line x1="38" y1="120" x2="42" y2="123" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="39" y1="122" x2="43" y2="125" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            {/* Cute knotted laces bow */}
            <path d="M 40.5 116.5 C 39.5 114.5, 36.5 113.5, 38 116.5 C 39 118, 40.5 118, 40.5 118" fill="none" stroke="#18181b" strokeWidth="1.2" />
            <path d="M 42.5 116.5 C 43.5 114.5, 46.5 113.5, 45 116.5 C 44 118, 42.5 118, 42.5 118" fill="none" stroke="#18181b" strokeWidth="1.2" />
          </g>

          {/* Right Polished Sneaker */}
          <g>
            {/* Red Sneaker Canvas Upper */}
            <path
              d="M 62.5 118.5 C 64 120.5, 65.5 122.5, 65.5 124.5 C 60.5 125.5, 56 125, 53.5 122 L 56 118.5 Z"
              fill="url(#shoe-grad)"
              stroke="#18181b"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* White Rubber Sneaker Sole */}
            <path
              d="M 66.2 124 L 66.2 126 C 62.5 127.5, 56.5 127, 53.5 124.5 L 53.8 123 C 56.2 124.8, 62.2 124.8, 66.2 124 Z"
              fill="#fafafa"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* White Rubber Toe Cap */}
            <path
              d="M 66.2 122.8 C 66.2 121.2, 63.2 120.5, 62.2 123.5 Z"
              fill="#fafafa"
              stroke="#18181b"
              strokeWidth="1.5"
            />
            {/* White Sneaker Lace Lines */}
            <line x1="62" y1="120" x2="58" y2="123" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="61" y1="122" x2="57" y2="125" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            {/* Cute knotted laces bow */}
            <path d="M 59.5 116.5 C 60.5 114.5, 63.5 113.5, 62 116.5 C 61 118, 59.5 118, 59.5 118" fill="none" stroke="#18181b" strokeWidth="1.2" />
            <path d="M 57.5 116.5 C 56.5 114.5, 53.5 113.5, 55 116.5 C 56 118, 57.5 118, 57.5 118" fill="none" stroke="#18181b" strokeWidth="1.2" />
          </g>

          {/* Left Hand peeking out of sleeve */}
          <path
            d="M 23 98 C 21 98, 19 101, 21 104 C 23 107, 27 107, 28 103 C 28 100, 26 98, 23 98 Z"
            fill="#fafafa"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Right Hand peeking out of sleeve */}
          <path
            d="M 77 98 C 79 98, 81 101, 79 104 C 77 107, 73 107, 72 103 C 72 100, 74 98, 77 98 Z"
            fill="#fafafa"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Real Crayon Sky Blue Balloon floating on the right side of the child (held by the right hand) */}
          <motion.g
            animate={{
              rotate: [-5, 6, -5],
              y: [0, -3.5, 0],
              x: [0, 1.2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "77px 98px" }}
          >
            {/* Balloon Polish Fill: Base Sky Blue with dynamic radial 3D gradient */}
            <path
              d="M 79 17 C 69.5 17, 65 32, 65 39 C 65 47.5, 72 55, 79 55 C 86 55, 93 47.5, 93 39 C 93 32, 88.5 17, 79 17 Z"
              fill="url(#balloon-grad)"
              opacity="0.95"
            />
            
            {/* Hand-drawn scribble / colored pencil shading strokes inside the balloon */}
            <g stroke="#0369a1" strokeWidth="1.2" opacity="0.75" strokeLinecap="round">
              <path d="M 71 28 Q 79 38 87 28" fill="none" />
              <path d="M 69 35 Q 79 45 89 35" fill="none" />
              <path d="M 73 21 Q 79 29 85 21" fill="none" />
            </g>

            {/* Whimsical shine highlight to add glossy polished 3D glass effect */}
            <path
              d="M 85 23.5 C 88 28.5, 87.5 35, 85 39"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.9"
            />
            <circle cx="83" cy="24" r="1.5" fill="#ffffff" opacity="0.95" />

            {/* Balloon outer ink outline */}
            <path
              d="M 79 17 C 69.5 17, 65 32, 65 39 C 65 47.5, 72 55, 79 55 C 86 55, 93 47.5, 93 39 C 93 32, 88.5 17, 79 17 Z"
              fill="none"
              stroke="#18181b"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Balloon bottom knot */}
            <path
              d="M 79 55 L 76 59 L 82 59 Z"
              fill="url(#balloon-grad)"
              stroke="#18181b"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Balloon String: goes from knot (79, 59) down to the Right Hand at (77, 98) */}
            <path
              d="M 79 59 Q 86 72 81 84 T 77 98"
              fill="none"
              stroke="#18181b"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 79.5 59.5 Q 86.5 72.5 81.5 84.5 T 77.5 97.5"
              fill="none"
              stroke="#18181b"
              strokeWidth="1"
              opacity="0.55"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Oversized Trench Coat Body - Colored in polished 3D Camel orange gradient */}
          <path
            d="M 34 65 L 29 111 Q 50 115 71 111 L 66 65 Z"
            fill="url(#coat-grad)"
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Shaky secondary line for custom hand-drawn feeling */}
          <path
            d="M 34.5 66 L 29.5 110 L 70.5 110 L 65.5 66"
            fill="none"
            stroke="#18181b"
            strokeWidth="1.2"
            opacity="0.75"
          />

          {/* Delicate hand-shaded pencil scribble texture inside the coat */}
          <g stroke="#7c2d12" strokeWidth="1" strokeLinecap="round" opacity="0.35">
            <line x1="33" y1="73" x2="42" y2="70" />
            <line x1="32" y1="81" x2="41" y2="78" />
            <line x1="31" y1="89" x2="40" y2="86" />
            <line x1="31" y1="97" x2="40" y2="94" />
            <line x1="32" y1="105" x2="42" y2="101" />

            <line x1="67" y1="73" x2="58" y2="76" />
            <line x1="68" y1="81" x2="59" y2="84" />
            <line x1="69" y1="89" x2="60" y2="92" />
            <line x1="69" y1="97" x2="60" y2="100" />
            <line x1="68" y1="105" x2="58" y2="108" />
          </g>

          {/* Coat folds and details */}
          {/* Fold line down the middle */}
          <line x1="50.5" y1="65" x2="49.5" y2="113.5" stroke="#18181b" strokeWidth="2" />
          <line x1="51.2" y1="67" x2="50.2" y2="111.5" stroke="#18181b" strokeWidth="1.2" opacity="0.6" />

          {/* Breast pocket with sky blue highlight! */}
          <path d="M 34 78 H 40.5 V 84 H 34 Z" fill="url(#balloon-grad)" stroke="#18181b" strokeWidth="2" strokeLinejoin="round" />
          <line x1="33" y1="78" x2="41.5" y2="78" stroke="#18181b" strokeWidth="2" />

          {/* Placket/buttons of the coat (2 large black solid buttons in vertical row) */}
          <circle cx="53" cy="85" r="3.2" fill="#18181b" stroke="#18181b" strokeWidth="1" />
          <circle cx="52" cy="98" r="3.2" fill="#18181b" stroke="#18181b" strokeWidth="1" />
          {/* Buttons sketch cross details */}
          <line x1="51.5" y1="83.5" x2="54.5" y2="86.5" stroke="#ffffff" strokeWidth="0.8" />
          <line x1="50.5" y1="96.5" x2="53.5" y2="99.5" stroke="#ffffff" strokeWidth="0.8" />

          {/* Baggy Oversized Sleeves - Colored in beautiful vertical gradient camel/tan! */}
          {/* Left Sleeve */}
          <path
            d="M 34 65 C 20 76, 22 93, 26 98 C 29 95, 33 96, 36 67"
            fill="url(#coat-grad)"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Cuff shadow inside sleeve opening */}
          <path d="M 26.2 98 Q 29.5 95 32.8 98" fill="none" stroke="#18181b" strokeWidth="1.5" />

          {/* Right Sleeve */}
          <path
            d="M 66 65 C 80 76, 78 93, 74 98 C 71 95, 67 96, 64 67"
            fill="url(#coat-grad)"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Cuff shadow inside sleeve opening */}
          <path d="M 73.8 98 Q 70.5 95 67.2 98" fill="none" stroke="#18181b" strokeWidth="1.5" />

          {/* High pointed Lapels with yellow gold gradient contrast! */}
          {/* Left pointed lapel block */}
          <path d="M 41 64 L 34 74 L 46 78 Z" fill="url(#lapel-grad)" stroke="#18181b" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="41" y1="64" x2="46" y2="78" stroke="#18181b" strokeWidth="1.5" />

          {/* Right pointed lapel block */}
          <path d="M 59 64 L 66 74 L 54 78 Z" fill="url(#lapel-grad)" stroke="#18181b" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="59" y1="64" x2="54" y2="78" stroke="#18181b" strokeWidth="1.5" />

          {/* Collar Neck opening & peeking shirt */}
          <path d="M 45 64 Q 50 67 55 64" fill="none" stroke="#18181b" strokeWidth="2.2" />
          <path d="M 46 66 Q 50 69 54 66" fill="none" stroke="#18181b" strokeWidth="1.2" opacity="0.6" />

          {/* Head Structure motion container */}
          <motion.g
            animate={{
              rotate: [-2, 2, -2],
              y: [0, 0.3, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "50px 64px" }}
          >
            {/* Main Head Structure */}
            <ellipse cx="50" cy="49" rx="14.5" ry="13.5" fill="#fafafa" stroke="#18181b" strokeWidth="2.8" />
          <ellipse cx="50" cy="49" rx="14" ry="13" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.6" />

          {/* Side protruding round ears */}
          <path d="M 35.5 44 C 31.5 44, 30.5 50, 35.5 52" fill="#fafafa" stroke="#18181b" strokeWidth="2.2" />
          <path d="M 64.5 44 C 68.5 44, 69.5 50, 64.5 52" fill="#fafafa" stroke="#18181b" strokeWidth="2.2" />
          {/* Inner ear squiggles */}
          <path d="M 34.5 46 Q 32.5 48 34.5 50" fill="none" stroke="#18181b" strokeWidth="1.2" />
          <path d="M 65.5 46 Q 67.5 48 65.5 50" fill="none" stroke="#18181b" strokeWidth="1.2" />

          {/* Simple cute face elements */}
          {/* Eyes (wide set dots) */}
          <circle cx="43" cy="48" r="1.8" fill="#18181b" />
          <circle cx="57" cy="48" r="1.8" fill="#18181b" />
          {/* Little eye highlights next to them to feel sketched */}
          <path d="M 41 45.5 Q 43 44.5 45 45.5" fill="none" stroke="#18181b" strokeWidth="1" />
          <path d="M 55 45.5 Q 57 44.5 59 45.5" fill="none" stroke="#18181b" strokeWidth="1" />

          {/* Cute small smile line (happy smiling child!) */}
          <path d="M 46 51.5 Q 50 56.5 54 51.5" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />

          {/* Smooth clean cheeks with tiny warm rosy circles instead of wrinkle lines */}
          <circle cx="37" cy="52" r="1.8" fill="#f87171" opacity="0.45" />
          <circle cx="63" cy="52" r="1.8" fill="#f87171" opacity="0.45" />

          {/* Orange Crayon Hair (chaotic shaggy layers matching attachment 2) */}
          {/* Hair solid background */}
          <path
            d="M 33 46 C 30 38, 32 30, 44 29 C 48 26, 56 25, 62 30 C 68 33, 70 39, 67 46 C 65 43, 62 44, 60 40 C 55 38, 50 41, 48 38 C 44 41, 38 42, 33 46 Z"
            fill="#ea580c"
            stroke="#18181b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Crayon scribbly overlay line-work inside and over boundaries */}
          <g stroke="#d97706" strokeWidth="1.8" strokeLinecap="round">
            <path d="M 33 42 Q 43 32 55 35" fill="none" />
            <path d="M 38 45 Q 48 33 60 36" fill="none" />
            <path d="M 44 43 Q 54 29 65 34" fill="none" />
            <path d="M 32 38 Q 46 27 58 29" fill="none" />
            <path d="M 40 33 Q 52 24 64 30" fill="none" />
            <path d="M 45 37 L 42 45" fill="none" />
            <path d="M 52 38 L 49 46" fill="none" />
            <path d="M 58 37 L 55 45" fill="none" />
          </g>
          {/* Ink shaggy hair outlines overlapping the hair */}
          <path d="M 32 45 Q 36 38 31 32 Q 42 34 46 28 Q 50 33 55 26 Q 59 34 65 30 Q 64 38 68 44" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />

          {/* Top Hat (tall and slightly tilted with charcoal 3D gradient) */}
          {/* Brim of the Hat with triple-outline sketch */}
          <path
            d="M 34 31.5 C 44 29.5, 56 29.5, 66 31.5 C 66 31.5, 68 33, 50 33 C 32 33, 34 31.5, 34 31.5 Z"
            fill="url(#hat-grad)"
            stroke="#18181b"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Crown of the Hat */}
          <path
            d="M 39 L 41.5 13.5 Q 49.5 12 58.5 13.5 L 61"
            fill="none"
            stroke="#18181b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Solid Hat fill */}
          <path
            d="M 39 31 L 41.5 13.5 Q 49.5 12 58.5 13.5 L 61 31 Z"
            fill="url(#hat-grad)"
          />
          {/* Shaky secondary lines on top hat side */}
          <path d="M 39.5 30 L 42 14.5 Q 49.5 13 58 14.5 L 60.5 30" fill="none" stroke="#18181b" strokeWidth="1" opacity="0.6" />
          <path d="M 42 21 H 58" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.3" />

          {/* White / Light Gray Hatband (mirrors original hair/hat transition ribbon) */}
          <path
            d="M 39.3 28.5 Q 50 26.5 60.7 28.5 L 60.8 30.5 Q 50 28.5 39.2 30.5 Z"
            fill="#e4e4e7"
            stroke="#18181b"
            strokeWidth="1.5"
          />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};

/**
 * Hand-drawn camera emoji sketch for "Contact Channels & Hobbies" 📸
 */
export const CameraSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="crayon-hatch-camera" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#0284c7" strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>
      {/* Flash box */}
      <rect x="35" y="15" width="20" height="15" rx="3" fill="#fde047" stroke="#18181b" strokeWidth="2.5" />
      <path d="M 40 22 L 50 22" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Main body with crayon sky blue */}
      <rect x="15" y="28" width="70" height="52" rx="8" fill="#7dd3fc" opacity="0.9" />
      <rect x="15" y="28" width="70" height="52" rx="8" fill="url(#crayon-hatch-camera)" />
      {/* Shaky double border */}
      <rect x="15" y="28" width="70" height="52" rx="8" fill="none" stroke="#18181b" strokeWidth="3" />
      <rect x="16.5" y="29.5" width="67" height="49" rx="8" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

      {/* Red accent strip */}
      <path d="M 16 42 H 84" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
      <path d="M 16 42.5 H 84" stroke="#18181b" strokeWidth="1" opacity="0.5" />

      {/* Lens Circle with dark filler and double ink border */}
      <circle cx="50" cy="54" r="18" fill="#1e293b" />
      <circle cx="50" cy="54" r="18" fill="none" stroke="#18181b" strokeWidth="3.2" />
      <circle cx="50" cy="54" r="13" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
      
      {/* Lens shine sparkle */}
      <circle cx="45" cy="49" r="3" fill="#ffffff" />
      <circle cx="53" cy="59" r="1.5" fill="#ffffff" />

      {/* Top shutter button */}
      <path d="M 22 23 L 28 23 L 28 28 L 22 28 Z" fill="#fca5a5" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Little star decoration */}
      <path d="M 74 38 L 76 34 L 78 38 L 82 40 L 78 42 L 76 46 L 74 42 L 70 40 Z" fill="#fde047" stroke="#18181b" strokeWidth="1" />
    </svg>
  );
};

/**
 * Hand-drawn briefcase/rocket emoji sketch for "Work Experience & System Impact" 💼
 */
export const BriefcaseSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <path d="M 38 24 Q 50 12 62 24" fill="none" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 38.5 24.5 Q 50 13.5 61.5 24.5" fill="none" stroke="#ffc72c" strokeWidth="1.5" strokeLinecap="round" />

      {/* Briefcase major body with orange crayon fill */}
      <rect x="15" y="25" width="70" height="52" rx="6" fill="#fed7aa" opacity="0.9" />
      {/* Crayon scribble hatch texture */}
      <g stroke="#ea580c" strokeWidth="1" opacity="0.4" strokeLinecap="round">
        <line x1="18" y1="28" x2="82" y2="74" />
        <line x1="22" y1="26" x2="80" y2="70" />
        <line x1="16" y1="36" x2="72" y2="76" />
      </g>
      {/* Dual ink outline */}
      <rect x="15" y="25" width="70" height="52" rx="6" fill="none" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" />
      <rect x="16.5" y="26.5" width="67" height="49" rx="6" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.5" />

      {/* Straps/buckles */}
      <line x1="30" y1="25" x2="30" y2="77" stroke="#18181b" strokeWidth="2.5" />
      <line x1="70" y1="25" x2="70" y2="77" stroke="#18181b" strokeWidth="2.5" />

      {/* Golden lock buckles */}
      <rect x="27" y="50" width="6" height="10" rx="1.5" fill="#fde047" stroke="#18181b" strokeWidth="2" />
      <rect x="67" y="50" width="6" height="10" rx="1.5" fill="#fde047" stroke="#18181b" strokeWidth="2" />

      {/* Handle leather accents */}
      <ellipse cx="38" cy="24" rx="2.5" ry="3.5" fill="#18181b" />
      <ellipse cx="62" cy="24" rx="2.5" ry="3.5" fill="#18181b" />
    </svg>
  );
};

/**
 * Hand-drawn lightbulb emoji sketch for "Architectural Innovations & Case Studies" 💡
 */
export const LightbulbSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Yellow glow background scribble */}
      <circle cx="50" cy="40" r="28" fill="#fef08a" opacity="0.6" />
      
      {/* Lightbulb glass sphere base */}
      <path 
        d="M 28 38 C 28 22, 72 22, 72 38 C 72 49, 62 50, 59 64 H 41 C 38 50, 28 49, 28 38 Z" 
        fill="#fde047" 
        opacity="0.8" 
      />
      {/* Double sketched outline */}
      <path 
        d="M 28 38 C 28 22, 72 22, 72 38 C 72 49, 62 50, 59 64 H 41 C 38 50, 28 49, 28 38" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 29.5 38.5 C 29.5 23.5, 70.5 23.5, 70.5 38.5 C 70.5 48, 61 49, 58 63 H 42 C 39 49, 29.5 48, 29.5 38.5" 
        fill="none" 
        stroke="#27272a" 
        strokeWidth="1" 
        opacity="0.55" 
      />

      {/* Filament details */}
      <path d="M 44 64 L 46 45 L 38 45" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
      <path d="M 56 64 L 54 45 L 62 45" fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
      <path d="M 44 45 Q 50 34 56 45" fill="none" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />

      {/* Little curly looping loop on the filament */}
      <circle cx="50" cy="38" r="2" fill="none" stroke="#18181b" strokeWidth="1.8" />

      {/* Metal socket base */}
      <rect x="42" y="64" width="16" height="6" rx="2" fill="#d4d4d8" stroke="#18181b" strokeWidth="2.5" />
      <rect x="43" y="70" width="14" height="6" rx="2" fill="#a1a1aa" stroke="#18181b" strokeWidth="2.5" />
      <path d="M 46 76 L 50 82 L 54 76" fill="#18181b" stroke="#18181b" strokeWidth="2" strokeLinejoin="round" />

      {/* Energy aura glow sparks */}
      <g stroke="#eab308" strokeWidth="2.2" strokeLinecap="round">
        <line x1="50" y1="10" x2="50" y2="2" />
        <line x1="78" y1="20" x2="84" y2="14" />
        <line x1="88" y1="42" x2="96" y2="42" />
        <line x1="12" y1="42" x2="4" y2="42" />
        <line x1="22" y1="20" x2="16" y2="14" />
      </g>
    </svg>
  );
};

/**
 * Hand-drawn badge / award ribbon emoji sketch for "Professional Certifications & Badges" 🎖️
 */
export const CertificateSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Downward hanging sash ribbons (background of badge) */}
      {/* Ribbon 1 */}
      <path d="M 38 48 L 30 84 L 43 80 L 52 84 L 45 48" fill="#fca5a5" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="36" y1="52" x2="31" y2="78" stroke="#b91c1c" strokeWidth="1.2" opacity="0.5" />

      {/* Ribbon 2 */}
      <path d="M 45 48 L 52 84 L 63 80 L 70 84 L 62 48" fill="#93c5fd" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="60" y1="52" x2="65" y2="78" stroke="#1d4ed8" strokeWidth="1.2" opacity="0.5" />

      {/* Main outer medallion circle (Yellow/Gold) */}
      <circle cx="50" cy="38" r="23" fill="#fde047" opacity="0.9" />
      {/* Starburst teeth lines representing the badge edge */}
      <circle cx="50" cy="38" r="23" fill="none" stroke="#18181b" strokeWidth="3" />
      <circle cx="50" cy="38" r="17" fill="none" stroke="#ffc72c" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Inner star detail */}
      <path 
        d="M 50 25 L 54 33 L 63 33 L 56 39 L 59 48 L 50 42 L 41 48 L 44 39 L 37 33 L 46 33 Z" 
        fill="#f59e0b" 
        stroke="#18181b" 
        strokeWidth="1.8" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};

/**
 * Hand-drawn waving hand emoji sketch for "Who Am I? About Bao You" 👋
 */
export const WavingHandSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Hand flesh tone and scribbles */}
      <path 
        d="M 38 68 C 26 50, 24 38, 32 30 C 37 25, 41 33, 44 38 C 47 18, 55 16, 58 26 C 61 14, 69 16, 70 28 C 71 18, 78 21, 75 35 C 78 30, 84 34, 79 46 C 74 58, 65 68, 52 68 H 38" 
        fill="#fed7aa" 
        opacity="0.9" 
      />
      {/* Rosy palm makeup */}
      <circle cx="50" cy="52" r="8" fill="#f87171" opacity="0.3" />

      {/* Splendid double-sketch outlines */}
      <path 
        d="M 38 68 C 26 50, 24 38, 32 30 C 37 25, 41 33, 44 40 M 44 28 C 47 18, 55 16, 58 26 M 58 24 C 61 14, 69 16, 70 28 M 70 25 C 71 18, 78 21, 75 35 M 75 32 C 78 30, 84 34, 79 46 C 74 58, 65 68, 52 68 H 38" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      <path 
        d="M 39 67 C 27 49, 25 39, 32.5 31.5 C 37 27, 41 34, 44 41" 
        fill="none" 
        stroke="#27272a" 
        strokeWidth="1" 
        opacity="0.5" 
      />

      {/* Wrist Cuff details */}
      <path d="M 35 68 L 33 82 H 58 L 55 68" fill="#bfdbfe" stroke="#18181b" strokeWidth="2.8" strokeLinejoin="round" />
      <line x1="45" y1="68" x2="45" y2="82" stroke="#18181b" strokeWidth="1.5" strokeDasharray="3,2" />

      {/* Movement action lines waving */}
      <g stroke="#18181b" strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M 12 36 Q 6 42 12 48" fill="none" />
        <path d="M 16 30 Q 10 39 16 48" fill="none" />
        <path d="M 88 36 Q 94 42 88 48" fill="none" />
        <path d="M 84 30 Q 90 39 84 48" fill="none" />
      </g>
    </svg>
  );
};

/**
 * Hand-drawn steaming coffee mug sketch for "Meet Me & Booking Workspace" ☕
 */
export const CoffeeSketchSvg: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block align-middle select-none`} xmlns="http://www.w3.org/2000/svg">
      {/* Plate / Saucer holding the mug */}
      <ellipse cx="50" cy="80" rx="36" ry="8" fill="#e4e4e7" stroke="#18181b" strokeWidth="2.8" />
      <ellipse cx="50" cy="80" rx="30" ry="4" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.5" />

      {/* Handle of the mug */}
      <path d="M 68 45 C 82 45, 82 68, 68 68" fill="none" stroke="#18181b" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M 67.5 45.5 C 79.5 45.5, 79.5 67.5, 67.5 67.5" fill="none" stroke="#fca5a5" strokeWidth="1.8" />

      {/* Mug cylindrical body with bright orange or red crayon coloring */}
      <path d="M 28 38 L 31 74 C 31 74, 50 78, 69 74 L 72 38 Z" fill="#fca5a5" opacity="0.9" />
      
      {/* Crayon shading hatch lines inside */}
      <g stroke="#b91c1c" strokeWidth="1.1" opacity="0.35" strokeLinecap="round">
        <line x1="32" y1="42" x2="68" y2="42" />
        <line x1="33" y1="50" x2="67" y2="50" />
        <line x1="34" y1="58" x2="66" y2="58" />
        <line x1="35" y1="66" x2="65" y2="66" />
      </g>

      {/* Dual hand-ink outlines */}
      <path d="M 28 38 L 31 74 Q 50 78 69 74 L 72 38 Z" fill="none" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 29 39 L 32 73 Q 50 77 68 73 L 71 39" fill="none" stroke="#27272a" strokeWidth="1" opacity="0.6" />

      {/* Liquid coffee brown inside upper rim ellipse */}
      <ellipse cx="50" cy="38" rx="20.5" ry="5.5" fill="#78350f" stroke="#18181b" strokeWidth="2.5" />
      <ellipse cx="49" cy="38" rx="15" ry="3" fill="#92400e" opacity="0.8" />

      {/* Whimsical steam curls wafting up */}
      <g stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M 40 26 Q 36 18 42 12 T 38 4" />
        <path d="M 50 28 Q 54 18 48 13 T 52 5" />
        <path d="M 60 26 Q 56 18 62 12 T 58 4" />
      </g>
      <g stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4">
        <path d="M 41 26.5 Q 37 18.5 43 12.5 T 39 4.5" />
        <path d="M 51 28.5 Q 55 18.5 49 13.5 T 53 5.5" />
      </g>

      {/* Smiling face on the mug center! */}
      <circle cx="44" cy="56" r="1.5" fill="#18181b" />
      <circle cx="56" cy="56" r="1.5" fill="#18181b" />
      <path d="M 47 61 Q 50 64 53 61" fill="none" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};


/**
 * Hand-drawn iHerb logo sketch in green crayon-and-ink style 🌿
 */
export const IHerbLogoSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-24" }) => {
  return (
    <svg viewBox="0 0 140 50" className={`${className} inline-block select-none`} xmlns="http://www.w3.org/2000/svg" aria-label="iHerb Logo">
      {/* Soft leaf scribble fill */}
      <path 
        d="M 28 36 C 20 22, 22 10, 42 12 C 34 24, 34 38, 28 36 Z" 
        fill="#bbf7d0" 
        opacity="0.85" 
      />
      {/* Leaf vine strokes */}
      <path d="M 26 31 Q 30 24 38 18" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* double-ink leaf outlines */}
      <path 
        d="M 28 36 C 20 22, 22 10, 42 12 C 34 24, 34 38, 28 36 Z" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 29 35 C 21 21, 23 11, 41 13" 
        fill="none" 
        stroke="#15803d" 
        strokeWidth="0.8" 
        opacity="0.5" 
      />
      {/* Text "iHerb" hand-drawn letter-by-letter */}
      <g fill="#18181b">
        {/* i */}
        <text x="50" y="34" fontFamily="var(--font-sans), 'Inter', sans-serif" fontSize="18" fontWeight="900" fontStyle="italic">i</text>
        {/* Herb */}
        <text x="58" y="34" fontFamily="var(--font-hand), 'Comic Sans MS', cursive" fontSize="21" fontWeight="900" fill="#15803d">Herb</text>
      </g>
      {/* Green underline crayon squiggle */}
      <path d="M 50 40 Q 90 38 130 41" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
      <path d="M 52 41 Q 88 39 126 40" fill="none" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
};


/**
 * Hand-drawn Google logo sketch in 4-quadrant crayon-and-ink style 🎨
 */
export const GoogleLogoSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-24" }) => {
  return (
    <svg viewBox="0 0 140 50" className={`${className} inline-block select-none`} xmlns="http://www.w3.org/2000/svg" aria-label="Google Logo">
      {/* The colorful G circle background sections */}
      {/* Blue: right sector */}
      <path d="M 28 25 L 43 25 C 43 21, 40 13, 28 13 C 24 13, 21 15, 18 18 Z" fill="#93c5fd" opacity="0.8" />
      {/* Red: top sector */}
      <path d="M 28 13 C 18 13, 14 21, 14 25 C 14 25, 15 15, 28 13 Z" fill="#fca5a5" opacity="0.8" />
      {/* Green: bottom sector */}
      <path d="M 14 25 C 14 34, 21 37, 28 37 C 36 37, 41 32, 42 27 L 28 27 L 28 25 Z" fill="#86efac" opacity="0.8" />
      {/* Yellow: lower-left sector */}
      <path d="M 14 25 C 14 31, 18 35, 23 36 Z" fill="#fef08a" opacity="0.8" />

      {/* Double outline hand-drawn G */}
      <path 
        d="M 41 21 C 39 16, 34 13, 28 13 C 18.5 13, 13.5 20, 13.5 25 C 13.5 31, 18 37, 28 37 C 36 37, 41 32, 41.5 25 L 28 25 L 28 28.5 L 38 28.5 C 37.5 32, 34 34, 28 34 C 21 34, 17 30, 17 25 C 17 20, 21 16.5, 28 16.5 C 32.5 16.5, 35.5 18, 37.5 20 L 41 21 Z" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="2.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 40.5 21.5 Q 35 15.5 28 15.5 C 19 15.5 14.5 21, 14.5 25 Q 14.5 32 28 32 Q 35 32 37.5 27" 
        fill="none" 
        stroke="#27272a" 
        strokeWidth="1" 
        opacity="0.4" 
      />

      {/* Hand-drawn "Google" text */}
      <text x="52" y="32" fontFamily="var(--font-hand), 'Comic Sans MS', cursive" fontSize="21" fontWeight="900" fill="#18181b">
        <tspan fill="#3b82f6">G</tspan>
        <tspan fill="#ef4444">o</tspan>
        <tspan fill="#f59e0b">o</tspan>
        <tspan fill="#3b82f6">g</tspan>
        <tspan fill="#10b981">l</tspan>
        <tspan fill="#ef4444">e</tspan>
      </text>
    </svg>
  );
};


/**
 * Hand-drawn Salesforce logo sketch with friendly cloud-shaped blue wash ☁️
 */
export const SalesforceLogoSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-24" }) => {
  return (
    <svg viewBox="0 0 140 50" className={`${className} inline-block select-none`} xmlns="http://www.w3.org/2000/svg" aria-label="Salesforce Logo">
      {/* Salesforce Cloud soft blue crayon wash */}
      <path 
        d="M 16 31 C 12 31, 11 25, 15 22 C 14 16, 21 12, 27 15 C 31 10, 42 12, 42 19 C 45 19, 47 24, 43 28 C 44 31, 38 33, 35 31 C 32 33, 22 34, 16 31 Z" 
        fill="#bae6fd" 
        opacity="0.85" 
      />
      {/* Double outline hand-drawn cloud */}
      <path 
        d="M 16 31 C 12 31, 11 25, 15 22 C 14 16, 21 12, 27 15 C 31 10, 42 12, 42 19 C 45 19, 47 24, 43 28 C 44 31, 38 33, 35 31 C 32 33, 22 34, 16 31 Z" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 16.5 30 C 13.5 30, 12 25.5, 15.5 23 C 15 17, 21 13.5, 26 16 C 30 11.5, 40 13, 40 19.5" 
        fill="none" 
        stroke="#0284c7" 
        strokeWidth="1" 
        opacity="0.4" 
      />

      {/* Salesforce Text */}
      <text x="49" y="32" fontFamily="var(--font-sans), 'Inter', sans-serif" fontSize="14" fontWeight="900" fill="#0284c7">sales</text>
      <text x="85" y="32" fontFamily="var(--font-hand), 'Comic Sans MS', cursive" fontSize="16" fontWeight="900" fill="#18181b">force</text>
      
      {/* Little action sparks */}
      <g stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
        <line x1="12" y1="15" x2="8" y2="12" />
        <line x1="43" y1="10" x2="45" y2="6" />
      </g>
    </svg>
  );
};


/**
 * Hand-drawn classic Twitter bird logo sketch with sky blue crayon wash 🐦
 */
export const TwitterLogoSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-24" }) => {
  return (
    <svg viewBox="0 0 140 50" className={`${className} inline-block select-none`} xmlns="http://www.w3.org/2000/svg" aria-label="Twitter Logo">
      {/* Crayon blue bird fill */}
      <path 
        d="M 14 36 C 26 36, 36 30, 42 16 C 36 19, 30 19, 25 17 C 28 14, 32 11, 35 11 C 28 11, 23 15, 19 20 C 17 18, 15 17, 13 17 C 15 22, 19 24, 21 26 C 18 26, 16 25, 14 24 T 18 32 C 15 32, 13 33, 11 34 Z" 
        fill="#bae6fd" 
        opacity="0.9" 
      />
      {/* Ink-drawn outlines resembling standard bird logo in handwired sketch style */}
      <path 
        d="M 14 36 C 26 36, 36 30, 42 16 C 36 18.5, 30 18.5, 25 17 C 28 14, 32 11, 35 11 C 28 11, 23 15, 19 20 C 17 18, 15 17, 13 17 C 15 22, 19 24, 21 26 C 18 26, 16 25, 14 24 C 15 28, 19 31, 23 32 C 19 32, 16 33, 13 34 Z" 
        fill="none" 
        stroke="#18181b" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M 15 35 C 25 35, 34 30, 40 17" 
        fill="none" 
        stroke="#0369a1" 
        strokeWidth="0.8" 
        opacity="0.4" 
      />

      {/* Twitter hand-written Text */}
      <text x="50" y="32" fontFamily="var(--font-hand), 'Comic Sans MS', cursive" fontSize="18" fontWeight="900" fill="#0284c7">Twitter</text>

      {/* Whimsical audio notes / chirping sparks */}
      <g stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6">
        <path d="M 44 20 Q 48 18 51 22" />
        <path d="M 45 15 Q 50 14 52 18" />
      </g>
    </svg>
  );
};


/**
 * Hand-drawn xAI / Grok logo sketch in raw tech-crayon charcoal style 🚀
 */
export const XaiLogoSketchSvg: React.FC<{ className?: string }> = ({ className = "h-10 w-24" }) => {
  return (
    <svg viewBox="0 0 140 50" className={`${className} inline-block select-none`} xmlns="http://www.w3.org/2000/svg" aria-label="XAI Logo">
      {/* Charcoal grid/blueprint background block */}
      <rect x="10" y="10" width="32" height="32" rx="6" fill="#f4f4f5" stroke="#e4e4e7" strokeWidth="1.5" strokeDasharray="3,2" />
      
      {/* Hand-sketched thick X and companion AI in ink and crayon */}
      <g stroke="#18181b" strokeLinecap="round">
        {/* Main diagonal 1 */}
        <line x1="16" y1="16" x2="36" y2="36" strokeWidth="4" />
        {/* Main diagonal 2 with space gap in between */}
        <line x1="36" y1="16" x2="28" y2="24" strokeWidth="3" />
        <line x1="24" y1="28" x2="16" y2="36" strokeWidth="3" />
        
        {/* Sketchy shadow stroke */}
        <line x1="17" y1="15" x2="37" y2="35" stroke="#71717a" strokeWidth="1" opacity="0.5" />
      </g>

      {/* xAI / Grok Text in tech stencil layout */}
      <text x="48" y="32" fontFamily="var(--font-mono), monospace" fontSize="21" fontWeight="900" fill="#18181b">xAI</text>
      
      {/* Little starry sparkles representing next-gen GenAI */}
      <g fill="#71717a" opacity="0.7">
        <path d="M 12 12 L 14 14 L 12 16 L 10 14 Z" />
        <path d="M 38 38 L 40 40 L 38 42 L 36 40 Z" />
      </g>
    </svg>
  );
};


/**
 * Hand-drawn SpaceXRocketSketchSvg
 */
export const SpaceXRocketSketchSvg: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg viewBox="0 0 100 100" className={`${className} inline-block select-none animate-bounce`} style={{ animationDuration: '3.5s' }} xmlns="http://www.w3.org/2000/svg" aria-label="SpaceX Rocket">
      {/* Flame trail (cozy fire gradients) */}
      <path d="M 50 70 Q 42 84 50 96 Q 58 84 50 70" fill="#f97316" stroke="#18181b" strokeWidth="2.5" />
      <path d="M 50 72 Q 46 80 50 90 Q 54 80 50 72" fill="#facc15" />
      
      {/* Rocket body with whiteboard/crayon style fill */}
      <path d="M 50 12 C 37 42, 37 68, 50 70 C 63 68, 63 42, 50 12 Z" fill="#ffffff" stroke="#18181b" strokeWidth="3" strokeLinejoin="round" />
      
      {/* SpaceX Style minimal logo stripe across the nose */}
      <path d="M 46 36 L 54 44 M 54 36 L 46 44" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Left side booster wing */}
      <path d="M 38 52 Q 22 66, 38 66 Z" fill="#dc2626" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Right side booster wing */}
      <path d="M 62 52 Q 78 66, 62 66 Z" fill="#dc2626" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Central observation glass portal */}
      <circle cx="50" cy="28" r="5" fill="#38bdf8" stroke="#18181b" strokeWidth="2" />
      
      {/* Micro sparkles as cosmic background stars */}
      <g fill="#eab308" opacity="0.8">
        <path d="M 18 20 L 21 23 L 18 26 L 15 23 Z" />
        <path d="M 80 32 L 83 35 L 80 38 L 77 35 Z" />
        <path d="M 22 58 L 24 60 L 22 62 L 20 60 Z" />
        <path d="M 76 68 L 78 70 L 76 72 L 74 70 Z" />
      </g>
    </svg>
  );
};



