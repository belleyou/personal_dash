import sys

svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 540" width="1024" height="540" style="background:#f1f3f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 7 5 L 0 8.5 z" fill="#1e293b" />
    </marker>
  </defs>

  <!-- Background -->
  <rect x="0" y="0" width="1024" height="540" fill="#f1f3f5" />

  <!-- TOP TITLE -->
  <text x="32" y="44" font-size="20" font-weight="900" fill="#0f172a" letter-spacing="-0.3">GONG.IO TRIGGERED SALES WORKFLOW PROCESS</text>

  <!-- 1. GONG.IO TRIGGER BOX -->
  <g transform="translate(32, 230)">
    <rect x="0" y="0" width="118" height="56" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" />
    <!-- Blue Mic Icon in circle -->
    <circle cx="59" cy="-14" r="14" fill="#0284c7" />
    <!-- Mic SVG -->
    <rect x="56" y="-21" width="6" height="10" rx="3" fill="#ffffff" />
    <path d="M 53 -16 C 53 -11, 65 -11, 65 -16" stroke="#ffffff" stroke-width="1.5" fill="none" />
    <line x1="59" y1="-11" x2="59" y2="-7" stroke="#ffffff" stroke-width="1.5" />

    <text x="59" y="24" font-size="10.5" font-weight="900" fill="#0f172a" text-anchor="middle">GONG.IO TRIGGER:</text>
    <text x="59" y="40" font-size="10" font-weight="500" fill="#334155" text-anchor="middle">Meeting recorded</text>
  </g>

  <!-- Connector from Trigger to Integration & Data -->
  <path d="M 150 258 L 168 258 C 176 258, 176 150, 184 150 L 190 150" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 2. INTEGRATION & DATA CONTAINER -->
  <g transform="translate(186, 76)">
    <rect x="0" y="0" width="144" height="286" rx="12" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1.2" />
    <text x="72" y="24" font-size="11" font-weight="900" fill="#0f172a" text-anchor="middle">INTEGRATION &amp; DATA</text>

    <!-- Node 1: Automatic Transcription -->
    <g transform="translate(12, 48)">
      <rect x="0" y="0" width="120" height="50" rx="6" fill="#0284c7" />
      <text x="60" y="19" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">AUTOMATIC</text>
      <text x="60" y="31" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">TRANSCRIPTION</text>
      <text x="60" y="43" font-size="8.5" font-weight="500" fill="#e0f2fe" text-anchor="middle">(Speech-to-Text)</text>
    </g>

    <!-- Arrow down -->
    <line x1="72" y1="98" x2="72" y2="134" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

    <!-- Node 2: Keyword & Topic Extraction -->
    <g transform="translate(12, 136)">
      <rect x="0" y="0" width="120" height="50" rx="6" fill="#22c55e" />
      <text x="60" y="24" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">KEYWORD &amp; TOPIC</text>
      <text x="60" y="38" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">EXTRACTION</text>
    </g>

    <!-- Arrow down -->
    <line x1="72" y1="186" x2="72" y2="222" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

    <!-- Node 3: Sentiment Analysis -->
    <g transform="translate(12, 224)">
      <rect x="0" y="0" width="120" height="50" rx="6" fill="#22c55e" />
      <text x="60" y="24" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">SENTIMENT</text>
      <text x="60" y="38" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">ANALYSIS</text>
    </g>
  </g>

  <!-- Connector from Integration & Data to Automation Engine -->
  <path d="M 318 325 L 342 325 C 350 325, 350 258, 360 258 L 366 258" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 3. AUTOMATION ENGINE -->
  <g transform="translate(368, 152)">
    <rect x="0" y="0" width="148" height="210" rx="12" fill="#bae6fd" stroke="#7dd3fc" stroke-width="1.2" />

    <!-- Robot / Automation Icon -->
    <g transform="translate(62, 54)">
      <!-- Reticle / brackets -->
      <path d="M 0 6 L 0 0 L 6 0" stroke="#0f172a" stroke-width="2" fill="none" />
      <path d="M 24 6 L 24 0 L 18 0" stroke="#0f172a" stroke-width="2" fill="none" />
      <path d="M 0 18 L 0 24 L 6 24" stroke="#0f172a" stroke-width="2" fill="none" />
      <path d="M 24 18 L 24 24 L 18 24" stroke="#0f172a" stroke-width="2" fill="none" />
      <!-- Face -->
      <circle cx="12" cy="10" r="4" fill="#0f172a" />
      <path d="M 6 18 C 6 14, 18 14, 18 18 Z" fill="#0f172a" />
    </g>

    <text x="74" y="118" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle">AUTOMATION</text>
    <text x="74" y="134" font-size="12" font-weight="900" fill="#0f172a" text-anchor="middle">ENGINE</text>
    <text x="74" y="152" font-size="10.5" font-weight="500" fill="#334155" text-anchor="middle">(Zapier/API)</text>
  </g>

  <!-- Number 1 on branch top -->
  <text x="522" y="180" font-size="14" font-weight="900" fill="#0f172a">1</text>
  <!-- Connector Branch 1 from Automation Engine to CRM Sync -->
  <path d="M 516 182 L 536 182" fill="none" stroke="#1e293b" stroke-width="1.6" />
  <path d="M 536 182 C 542 182, 542 135, 548 135 L 560 135" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 536 182 L 560 182" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 536 182 C 542 182, 542 228, 548 228 L 560 228" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 4. CRM SYNC CONTAINER -->
  <g transform="translate(554, 76)">
    <rect x="0" y="0" width="134" height="186" rx="12" fill="#d1fae5" stroke="#a7f3d0" stroke-width="1.2" />

    <!-- Salesforce mini cloud logo -->
    <g transform="translate(18, 10) scale(0.6)">
      <path d="M 10 16 C 6 16 3 12 5 8 C 7 5 12 5 15 7 C 18 2 28 2 31 7 C 36 5 41 8 41 12 C 44 12 46 15 44 19 C 44 22 39 24 36 24 L 10 24 Z" fill="#0284c7" />
    </g>
    <text x="76" y="24" font-size="11" font-weight="900" fill="#0f172a">CRM SYNC</text>

    <!-- Node 1: UPDATE OPPORTUNITY MEDDICC -->
    <g transform="translate(10, 36)">
      <rect x="0" y="0" width="114" height="42" rx="6" fill="#0f766e" />
      <text x="57" y="18" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">UPDATE</text>
      <text x="57" y="29" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">OPPORTUNITY</text>
      <text x="57" y="39" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">MEDDICC</text>
    </g>

    <!-- Node 2: LOG MEETING NOTES -->
    <g transform="translate(10, 88)">
      <rect x="0" y="0" width="114" height="40" rx="6" fill="#0f766e" />
      <text x="57" y="18" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">LOG MEETING</text>
      <text x="57" y="31" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">NOTES</text>
    </g>

    <!-- Node 3: CREATE FOLLOW-UP TASK -->
    <g transform="translate(10, 136)">
      <rect x="0" y="0" width="114" height="40" rx="6" fill="#0f766e" />
      <text x="57" y="18" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">CREATE</text>
      <text x="57" y="31" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">FOLLOW-UP TASK</text>
    </g>
  </g>


  <!-- Number 2 on branch bottom -->
  <text x="522" y="380" font-size="14" font-weight="900" fill="#0f172a">2</text>
  <!-- Connector Branch 2 from Automation Engine to Sales Coaching & Alerts -->
  <path d="M 440 362 L 440 382 L 536 382" fill="none" stroke="#1e293b" stroke-width="1.6" />
  <path d="M 536 382 C 542 382, 542 334, 548 334 L 558 334" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 536 382 C 542 382, 542 444, 548 444 L 558 444" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 5. SALES COACHING & ALERTS CONTAINER -->
  <g transform="translate(552, 276)">
    <rect x="0" y="0" width="138" height="216" rx="12" fill="#ffedd5" stroke="#fed7aa" stroke-width="1.2" />
    <text x="69" y="22" font-size="10.5" font-weight="900" fill="#0f172a" text-anchor="middle">SALES COACHING</text>
    <text x="69" y="35" font-size="10.5" font-weight="900" fill="#0f172a" text-anchor="middle">&amp; ALERTS</text>

    <!-- Node 1: SEND EMAIL RECAP TO CUSTOMER -->
    <g transform="translate(10, 44)">
      <rect x="0" y="0" width="118" height="46" rx="6" fill="#ea580c" />
      <!-- Mail icon -->
      <g transform="translate(6, 15)">
        <rect x="0" y="0" width="16" height="12" rx="1.5" fill="#cbd5e1" />
        <polyline points="1,2 8,7 15,2" stroke="#475569" stroke-width="1.2" fill="none" />
      </g>
      <text x="68" y="16" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">SEND EMAIL</text>
      <text x="68" y="28" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">RECAP TO</text>
      <text x="68" y="40" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">CUSTOMER</text>
    </g>

    <!-- Node 2: POST IN SLACK CHANNEL -->
    <g transform="translate(10, 98)">
      <rect x="0" y="0" width="118" height="48" rx="6" fill="#ea580c" />
      <!-- Slack logo -->
      <g transform="translate(6, 14) scale(0.32)">
        <rect x="18" y="0" width="8" height="24" rx="4" fill="#36C5F0" />
        <circle cx="6" cy="12" r="4" fill="#36C5F0" />
        <rect x="28" y="18" width="24" height="8" rx="4" fill="#2EB67D" />
        <circle cx="40" cy="6" r="4" fill="#2EB67D" />
        <rect x="28" y="32" width="8" height="24" rx="4" fill="#E01E5A" />
        <circle cx="48" cy="44" r="4" fill="#E01E5A" />
        <rect x="2" y="28" width="24" height="8" rx="4" fill="#ECB22E" />
        <circle cx="14" cy="48" r="4" fill="#ECB22E" />
      </g>
      <text x="68" y="18" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">POST IN SLACK</text>
      <text x="68" y="30" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">CHANNEL</text>
      <text x="68" y="42" font-size="8.5" font-weight="500" fill="#ffedd5" text-anchor="middle">(e.g., #wins)</text>
    </g>

    <!-- Node 3: SCHEDULE INTERNAL DEBRIEF -->
    <g transform="translate(10, 154)">
      <rect x="0" y="0" width="118" height="48" rx="6" fill="#ea580c" />
      <text x="59" y="18" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">SCHEDULE</text>
      <text x="59" y="30" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">INTERNAL</text>
      <text x="59" y="42" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">DEBRIEF</text>
    </g>
  </g>

  <!-- Connectors from Sales Coaching & Alerts to Coaching Workflow -->
  <path d="M 670 398 L 702 398" fill="none" stroke="#1e293b" stroke-width="1.6" />
  <path d="M 702 398 C 708 398, 708 300, 714 300 L 722 300" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 702 398 C 708 398, 708 350, 714 350 L 722 350" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 702 398 C 708 398, 708 398, 714 398 L 722 398" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />
  <path d="M 702 398 C 708 398, 708 444, 714 444 L 722 444" fill="none" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 6. COACHING WORKFLOW CONTAINER -->
  <g transform="translate(718, 250)">
    <rect x="0" y="0" width="128" height="242" rx="12" fill="#f3e8ff" stroke="#e9d5ff" stroke-width="1.2" />
    <text x="64" y="22" font-size="10.5" font-weight="900" fill="#0f172a" text-anchor="middle">COACHING</text>
    <text x="64" y="35" font-size="10.5" font-weight="900" fill="#0f172a" text-anchor="middle">WORKFLOW</text>

    <!-- Node 1: MANAGER REVIEWS CALL -->
    <g transform="translate(10, 44)">
      <rect x="0" y="0" width="108" height="38" rx="6" fill="#6b21a8" />
      <text x="54" y="16" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">MANAGER</text>
      <text x="54" y="28" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">REVIEWS CALL</text>
    </g>

    <!-- Node 2: ADD COMMENTS & FEEDBACK -->
    <g transform="translate(10, 90)">
      <rect x="0" y="0" width="108" height="40" rx="6" fill="#6b21a8" />
      <text x="54" y="16" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">ADD COMMENTS</text>
      <text x="54" y="28" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">&amp; FEEDBACK</text>
    </g>

    <!-- Node 3: ASSIGN TRAINING MODULE -->
    <g transform="translate(10, 138)">
      <rect x="0" y="0" width="108" height="40" rx="6" fill="#6b21a8" />
      <text x="54" y="16" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">ASSIGN TRAINING</text>
      <text x="54" y="28" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">MODULE</text>
    </g>

    <!-- Node 4: SCORE CALL PERFORMANCE -->
    <g transform="translate(10, 186)">
      <rect x="0" y="0" width="108" height="42" rx="6" fill="#6b21a8" />
      <text x="54" y="16" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">SCORE CALL</text>
      <text x="54" y="28" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">PERFORMANCE</text>
    </g>
  </g>

  <!-- Connector from Coaching Workflow to Outcomes -->
  <line x1="836" y1="316" x2="866" y2="316" stroke="#1e293b" stroke-width="1.6" marker-end="url(#arrow)" />

  <!-- 7. OUTCOMES CONTAINER -->
  <g transform="translate(870, 144)">
    <rect x="0" y="0" width="128" height="348" rx="12" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.2" />
    <text x="64" y="24" font-size="11" font-weight="900" fill="#0f172a" text-anchor="middle">OUTCOMES</text>

    <!-- Node 1: IMPROVED FORECASTING ACCURACY -->
    <g transform="translate(10, 48)">
      <rect x="0" y="0" width="108" height="66" rx="8" fill="#16a34a" />
      <!-- Chart icon -->
      <g transform="translate(48, 10)">
        <rect x="0" y="8" width="3" height="8" fill="#ffffff" />
        <rect x="4" y="4" width="3" height="12" fill="#ffffff" />
        <rect x="8" y="0" width="3" height="16" fill="#ffffff" />
      </g>
      <text x="54" y="38" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">IMPROVED</text>
      <text x="54" y="49" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">FORECASTING</text>
      <text x="54" y="60" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">ACCURACY</text>
    </g>

    <!-- Node 2: SHORTER SALES CYCLE -->
    <g transform="translate(10, 124)">
      <rect x="0" y="0" width="108" height="66" rx="8" fill="#16a34a" />
      <!-- Stopwatch icon -->
      <g transform="translate(49, 10)">
        <circle cx="5" cy="8" r="6" stroke="#ffffff" stroke-width="1.5" fill="none" />
        <line x1="5" y1="5" x2="5" y2="8" stroke="#ffffff" stroke-width="1.2" />
        <line x1="5" y1="8" x2="8" y2="8" stroke="#ffffff" stroke-width="1.2" />
        <rect x="4" y="0" width="2" height="2" fill="#ffffff" />
      </g>
      <text x="54" y="42" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">SHORTER SALES</text>
      <text x="54" y="55" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">CYCLE</text>
    </g>

    <!-- Node 3: HIGHER WIN RATES -->
    <g transform="translate(10, 200)">
      <rect x="0" y="0" width="108" height="66" rx="8" fill="#0284c7" />
      <!-- Chart icon -->
      <g transform="translate(48, 10)">
        <rect x="0" y="8" width="3" height="8" fill="#ffffff" />
        <rect x="4" y="4" width="3" height="12" fill="#ffffff" />
        <rect x="8" y="0" width="3" height="16" fill="#ffffff" />
      </g>
      <text x="54" y="42" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">HIGHER WIN</text>
      <text x="54" y="55" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">RATES</text>
    </g>

    <!-- Node 4: REP DEVELOPMENT & TRAINING -->
    <g transform="translate(10, 276)">
      <rect x="0" y="0" width="108" height="64" rx="8" fill="#9333ea" />
      <!-- Chart icon -->
      <g transform="translate(48, 10)">
        <rect x="0" y="8" width="3" height="8" fill="#ffffff" />
        <rect x="4" y="4" width="3" height="12" fill="#ffffff" />
        <rect x="8" y="0" width="3" height="16" fill="#ffffff" />
      </g>
      <text x="54" y="38" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">REP</text>
      <text x="54" y="49" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">DEVELOPMENT</text>
      <text x="54" y="60" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">&amp; TRAINING</text>
    </g>
  </g>

  <!-- BOTTOM FOOTER -->
  <text x="512" y="522" font-size="10.5" font-weight="500" fill="#64748b" text-anchor="middle">Diagram created in Figma - [Date]</text>

</svg>"""

with open("public/gong_sales_workflow_process.svg", "w") as f:
    f.write(svg)

print("Gong SVG written to public/gong_sales_workflow_process.svg")
