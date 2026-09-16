import sys

svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" style="background:#18181b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Neon Glow Filters -->
    <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-magenta" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#818cf8" />
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#34d399" />
    </marker>
    <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#38bdf8" />
    </marker>
    <marker id="arrow-yellow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#facc15" />
    </marker>
    <marker id="arrow-magenta" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#c084fc" />
    </marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#f87171" />
    </marker>
  </defs>

  <!-- Dark Background -->
  <rect x="0" y="0" width="1200" height="750" fill="#18181b" />

  <!-- TOP TITLE -->
  <text x="32" y="44" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="-0.3">
    OPPORTUNITY RENEWAL SIGNAL PROCESS WORKFLOW (NIGHTLY BATCH JOB TRIGGER)
  </text>

  <!-- COLUMN HEADERS -->
  <text x="360" y="112" font-size="14.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">SALESFORCE CRM</text>
  <text x="686" y="112" font-size="14.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">AI ORCHESTRATOR</text>
  <text x="984" y="112" font-size="14.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">INTEGRATIONS</text>

  <!-- START PILL: NIGHTLY BATCH JOB -->
  <g transform="translate(24, 88)">
    <rect x="0" y="0" width="194" height="52" rx="26" fill="#1e1b4b" stroke="#818cf8" stroke-width="2.2" filter="url(#glow-purple)" />
    <!-- Clock Icon -->
    <circle cx="30" cy="26" r="12" fill="none" stroke="#a5b4fc" stroke-width="2" />
    <polyline points="30,19 30,26 36,26" fill="none" stroke="#a5b4fc" stroke-width="2" stroke-linecap="round" />
    <text x="56" y="23" font-size="12" font-weight="900" fill="#ffffff">START: NIGHTLY</text>
    <text x="56" y="38" font-size="12" font-weight="900" fill="#ffffff">BATCH JOB</text>
  </g>

  <!-- Triggered Connector from Start to Salesforce Box -->
  <path d="M 121 140 L 121 216 L 244 216" fill="none" stroke="#818cf8" stroke-width="1.8" marker-end="url(#arrow)" />
  <text x="174" y="208" font-size="13" font-weight="600" fill="#cbd5e1" text-anchor="middle">Triggered</text>

  <!-- 1. SALESFORCE CRM BOX -->
  <g transform="translate(244, 146)">
    <!-- Cyan Glowing Outer & Inner Card -->
    <rect x="0" y="0" width="234" height="136" rx="14" fill="#0c1e33" stroke="#38bdf8" stroke-width="2.5" filter="url(#glow-blue)" />
    
    <!-- Salesforce Cloud Logo Mini -->
    <g transform="translate(10, 14) scale(0.65)">
      <path d="M 12 18 C 8 18 4 14 6 10 C 8 6 14 6 18 8 C 22 2 34 2 38 8 C 44 6 50 10 50 14 C 54 14 56 18 54 22 C 54 26 48 28 44 28 L 12 28 C 8 28 4 24 6 20 Z" fill="#0284c7" />
      <text x="28" y="20" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">salesforce</text>
    </g>
    
    <!-- Box Title -->
    <text x="52" y="24" font-size="13" font-weight="900" fill="#ffffff">1. RENEWAL SIGNAL</text>
    <text x="52" y="40" font-size="12" font-weight="900" fill="#ffffff">DETECTION (Batch Query)</text>

    <!-- Bullet Items -->
    <circle cx="24" cy="62" r="2.5" fill="#38bdf8" />
    <text x="34" y="66" font-size="12" font-weight="500" fill="#e2e8f0">Oppty End Date ≤ 120 Days</text>

    <circle cx="24" cy="82" r="2.5" fill="#38bdf8" />
    <text x="34" y="86" font-size="12" font-weight="500" fill="#e2e8f0">Stage = Closed Won</text>

    <circle cx="24" cy="102" r="2.5" fill="#38bdf8" />
    <text x="34" y="106" font-size="12" font-weight="500" fill="#e2e8f0">Product = Active</text>

    <circle cx="24" cy="122" r="2.5" fill="#38bdf8" />
    <text x="34" y="126" font-size="12" font-weight="500" fill="#e2e8f0">Opt-out check for auto-update</text>
  </g>

  <!-- Connector from Salesforce to AI Analysis -->
  <line x1="478" y1="214" x2="564" y2="214" stroke="#34d399" stroke-width="2" marker-end="url(#arrow-green)" />
  <text x="521" y="196" font-size="13" font-weight="600" fill="#cbd5e1" text-anchor="middle">Data &amp;</text>
  <text x="521" y="211" font-size="13" font-weight="600" fill="#cbd5e1" text-anchor="middle">Signals</text>

  <!-- 2. AI ANALYSIS & CHURN RISK SCORING BOX -->
  <g transform="translate(566, 146)">
    <!-- Green Glowing Card -->
    <rect x="0" y="0" width="242" height="152" rx="14" fill="#062817" stroke="#22c55e" stroke-width="2.5" filter="url(#glow-green)" />
    
    <!-- AI Chip Icon -->
    <g transform="translate(12, 10)">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#15803d" stroke="#4ade80" stroke-width="1.5" />
      <line x1="0" y1="10" x2="4" y2="10" stroke="#4ade80" stroke-width="1.5" />
      <line x1="0" y1="16" x2="4" y2="16" stroke="#4ade80" stroke-width="1.5" />
      <line x1="0" y1="22" x2="4" y2="22" stroke="#4ade80" stroke-width="1.5" />
      <line x1="28" y1="10" x2="32" y2="10" stroke="#4ade80" stroke-width="1.5" />
      <line x1="28" y1="16" x2="32" y2="16" stroke="#4ade80" stroke-width="1.5" />
      <line x1="28" y1="22" x2="32" y2="22" stroke="#4ade80" stroke-width="1.5" />
      <text x="16" y="20" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">AI</text>
    </g>

    <text x="50" y="24" font-size="12.5" font-weight="900" fill="#ffffff">2. AI ANALYSIS &amp; CHURN</text>
    <text x="50" y="40" font-size="12.5" font-weight="900" fill="#ffffff">RISK SCORING</text>

    <!-- Bullets -->
    <circle cx="22" cy="58" r="2.5" fill="#4ade80" />
    <text x="32" y="62" font-size="11.5" font-weight="500" fill="#e2e8f0">Analyze Churn Risk &amp; Competitor</text>
    <text x="32" y="75" font-size="11.5" font-weight="500" fill="#e2e8f0">Dynamics</text>

    <circle cx="22" cy="91" r="2.5" fill="#4ade80" />
    <text x="32" y="95" font-size="11.5" font-weight="500" fill="#e2e8f0">ARR vs. Competitor Rate</text>

    <circle cx="22" cy="111" r="2.5" fill="#4ade80" />
    <text x="32" y="115" font-size="11.5" font-weight="500" fill="#e2e8f0">Managed Services Utilization</text>

    <circle cx="22" cy="131" r="2.5" fill="#4ade80" />
    <text x="32" y="135" font-size="11.5" font-weight="500" fill="#e2e8f0">Historical Interaction Scan (≤ 3 Yrs)</text>

    <circle cx="22" cy="151" r="2.5" fill="#4ade80" />
    <text x="32" y="155" font-size="11.5" font-weight="500" fill="#e2e8f0">Keyword Analysis</text>
  </g>

  <!-- Connector from AI Analysis to Slack Review -->
  <line x1="808" y1="198" x2="870" y2="198" stroke="#c084fc" stroke-width="2" marker-end="url(#arrow-magenta)" />

  <!-- 4. HUMAN-IN-THE-LOOP REVIEW (SLACK) BOX -->
  <g transform="translate(872, 146)">
    <!-- Magenta Glowing Card -->
    <rect x="0" y="0" width="230" height="92" rx="14" fill="#290b2e" stroke="#c084fc" stroke-width="2.5" filter="url(#glow-magenta)" />

    <!-- Slack Icon -->
    <g transform="translate(10, 10) scale(0.42)">
      <rect x="18" y="0" width="8" height="24" rx="4" fill="#36C5F0" />
      <circle cx="6" cy="12" r="4" fill="#36C5F0" />
      <rect x="28" y="18" width="24" height="8" rx="4" fill="#2EB67D" />
      <circle cx="40" cy="6" r="4" fill="#2EB67D" />
      <rect x="28" y="32" width="8" height="24" rx="4" fill="#E01E5A" />
      <circle cx="48" cy="44" r="4" fill="#E01E5A" />
      <rect x="2" y="28" width="24" height="8" rx="4" fill="#ECB22E" />
      <circle cx="14" cy="48" r="4" fill="#ECB22E" />
    </g>

    <text x="44" y="24" font-size="12" font-weight="900" fill="#ffffff">4. HUMAN-IN-THE-LOOP</text>
    <text x="44" y="40" font-size="12" font-weight="900" fill="#ffffff">REVIEW (SLACK)</text>

    <!-- Bullets -->
    <circle cx="22" cy="62" r="2.5" fill="#e879f9" />
    <text x="32" y="65" font-size="11.5" font-weight="500" fill="#e2e8f0">Post Score Tier &amp; Draft</text>
    <text x="32" y="79" font-size="11.5" font-weight="500" fill="#e2e8f0">Proposal to AE Channel</text>
  </g>

  <!-- Connector from Slack Review down to Diamond D1 -->
  <line x1="986" y1="238" x2="986" y2="304" stroke="#facc15" stroke-width="2" marker-end="url(#arrow-yellow)" />

  <!-- D1: PROPOSAL APPROVED? (DIAMOND) -->
  <g transform="translate(922, 304)">
    <!-- Yellow Neon Glow Diamond -->
    <polygon points="64,0 128,64 64,128 0,64" fill="#2a1f07" stroke="#facc15" stroke-width="2.6" filter="url(#glow-yellow)" />
    <text x="64" y="52" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">D1:</text>
    <text x="64" y="68" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">PROPOSAL</text>
    <text x="64" y="84" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">APPROVED?</text>
  </g>

  <!-- Connector: NO / REVISIONS (Left from Diamond into 3. PROPOSAL & TIER GENERATION) -->
  <line x1="922" y1="368" x2="812" y2="368" stroke="#f87171" stroke-width="2" marker-end="url(#arrow-red)" />
  <text x="866" y="358" font-size="12" font-weight="900" fill="#fca5a5" text-anchor="middle">NO / REVISIONS</text>

  <!-- Loopback from Proposal Generation back to Slack Review -->
  <path d="M 686 298 L 686 324 L 686 324" fill="none" stroke="#c084fc" stroke-width="2" />
  <!-- Arrow from 2. AI Analysis down to 3. Proposal -->
  <line x1="686" y1="298" x2="686" y2="326" stroke="#c084fc" stroke-width="2" marker-end="url(#arrow-magenta)" />

  <!-- Right side connector from Diamond Approved back or to approval:
       Loop from Diamond right back up to Slack Review if revision processed -->
  <path d="M 1050 368 L 1134 368 L 1134 198 L 1102 198" fill="none" stroke="#c084fc" stroke-width="1.8" marker-end="url(#arrow-magenta)" />

  <!-- 3. PROPOSAL & TIER GENERATION BOX -->
  <g transform="translate(566, 330)">
    <rect x="0" y="0" width="242" height="90" rx="14" fill="#200d33" stroke="#a855f7" stroke-width="2.5" filter="url(#glow-purple)" />
    
    <!-- File Edit Icon -->
    <g transform="translate(14, 12)">
      <rect x="0" y="0" width="18" height="24" rx="2" fill="none" stroke="#c084fc" stroke-width="2" />
      <line x1="4" y1="6" x2="14" y2="6" stroke="#c084fc" stroke-width="1.8" />
      <line x1="4" y1="12" x2="14" y2="12" stroke="#c084fc" stroke-width="1.8" />
      <!-- Small pencil -->
      <polygon points="14,18 24,10 26,12 16,20" fill="#e879f9" />
    </g>

    <text x="48" y="24" font-size="12.5" font-weight="900" fill="#ffffff">3. PROPOSAL &amp; TIER</text>
    <text x="48" y="40" font-size="12.5" font-weight="900" fill="#ffffff">GENERATION</text>

    <!-- Bullets -->
    <circle cx="22" cy="60" r="2.5" fill="#c084fc" />
    <text x="32" y="64" font-size="11.5" font-weight="500" fill="#e2e8f0">Determine Score Tiers</text>

    <circle cx="22" cy="80" r="2.5" fill="#c084fc" />
    <text x="32" y="84" font-size="11.5" font-weight="500" fill="#e2e8f0">Generate Draft Renewal Proposal</text>
  </g>

  <!-- Connector: YES (Down from Diamond D1) -->
  <line x1="986" y1="432" x2="986" y2="466" stroke="#34d399" stroke-width="2" />
  <text x="1004" y="454" font-size="12" font-weight="900" fill="#86efac">YES</text>

  <!-- Fork from YES to 5A (Gmail) and 5B (Google Calendar) -->
  <path d="M 986 466 L 878 466 L 878 496" fill="none" stroke="#34d399" stroke-width="2" marker-end="url(#arrow-green)" />
  <path d="M 986 466 L 1090 466 L 1090 496" fill="none" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow-cyan)" />

  <!-- 5A. GMAIL INTEGRATION BOX -->
  <g transform="translate(790, 498)">
    <rect x="0" y="0" width="180" height="98" rx="14" fill="#072317" stroke="#22c55e" stroke-width="2.5" filter="url(#glow-green)" />
    
    <!-- Gmail Colorful Logo -->
    <g transform="translate(12, 12)">
      <path d="M 0 4 L 0 20 C 0 22 2 24 4 24 L 6 24 L 6 9 L 16 16 L 26 9 L 26 24 L 28 24 C 30 24 32 22 32 20 L 32 4 C 32 1.5 29 0 27 1.5 L 16 9.5 L 5 1.5 C 3 0 0 1.5 0 4 Z" fill="#ea4335" />
      <polygon points="0,4 6,9 6,24 0,20" fill="#c5221f" />
      <polygon points="32,4 26,9 26,24 32,20" fill="#4285f4" />
      <polygon points="6,9 16,16 6,24" fill="#fbbc05" />
      <polygon points="26,9 16,16 26,24" fill="#34a853" />
    </g>

    <text x="56" y="24" font-size="12" font-weight="900" fill="#ffffff">5A. GMAIL</text>
    <text x="56" y="38" font-size="12" font-weight="900" fill="#ffffff">INTEGRATION</text>

    <!-- Bullet -->
    <circle cx="22" cy="62" r="2.5" fill="#4ade80" />
    <text x="32" y="66" font-size="11.5" font-weight="500" fill="#e2e8f0">Send Proposal Email to</text>
    <text x="32" y="80" font-size="11.5" font-weight="500" fill="#e2e8f0">Customer</text>
  </g>

  <!-- 5B. GOOGLE CALENDAR INTEGRATION BOX -->
  <g transform="translate(998, 498)">
    <rect x="0" y="0" width="186" height="98" rx="14" fill="#082236" stroke="#38bdf8" stroke-width="2.5" filter="url(#glow-blue)" />
    
    <!-- Google Calendar '31' Icon -->
    <g transform="translate(12, 12)">
      <rect x="0" y="0" width="28" height="28" rx="5" fill="#ffffff" stroke="#1d4ed8" stroke-width="1.5" />
      <rect x="0" y="0" width="28" height="8" rx="3" fill="#1d4ed8" />
      <text x="14" y="22" font-size="12" font-weight="900" fill="#1e293b" text-anchor="middle">31</text>
    </g>

    <text x="54" y="22" font-size="11.5" font-weight="900" fill="#ffffff">5B. GOOGLE</text>
    <text x="54" y="35" font-size="11.5" font-weight="900" fill="#ffffff">CALENDAR</text>
    <text x="54" y="48" font-size="11" font-weight="900" fill="#ffffff">INTEGRATION</text>

    <!-- Bullet -->
    <circle cx="22" cy="68" r="2.5" fill="#38bdf8" />
    <text x="32" y="72" font-size="11.5" font-weight="500" fill="#e2e8f0">Schedule Renewal</text>
    <text x="32" y="86" font-size="11.5" font-weight="500" fill="#e2e8f0">Discussion Meeting</text>
  </g>

  <!-- Convergence lines from 5A and 5B down to END -->
  <path d="M 878 596 L 878 630 L 986 630" fill="none" stroke="#38bdf8" stroke-width="2" />
  <path d="M 1090 596 L 1090 630 L 986 630" fill="none" stroke="#38bdf8" stroke-width="2" />
  <line x1="986" y1="630" x2="986" y2="656" stroke="#818cf8" stroke-width="2" marker-end="url(#arrow)" />

  <!-- END PILL: PROCESS COMPLETE: Renewal Initiated -->
  <g transform="translate(892, 658)">
    <rect x="0" y="0" width="188" height="52" rx="26" fill="#1e1b4b" stroke="#818cf8" stroke-width="2.2" filter="url(#glow-purple)" />
    <text x="94" y="16" font-size="11" font-weight="900" fill="#cbd5e1" text-anchor="middle">END</text>
    <text x="94" y="32" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">PROCESS COMPLETE:</text>
    <text x="94" y="46" font-size="11.5" font-weight="700" fill="#e0e7ff" text-anchor="middle">Renewal Initiated</text>
  </g>

</svg>"""

with open("public/renewal_signal_process_workflow.svg", "w") as f:
    f.write(svg)

print("Renewal SVG written to public/renewal_signal_process_workflow.svg")
