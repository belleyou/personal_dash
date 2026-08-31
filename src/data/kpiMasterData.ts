export interface KPIRecord {
  id: string;
  metric: string;
  function: string;
  object: string;
  dataSources: string;
  dimensions: string;
  type: "Leading" | "Lagging";
  bestVisualization: string;
  analysisPurpose: string;
  // Precomputed or dynamically generated language scripts
  scripts?: {
    googleSheets?: string;
    excel?: string;
    java?: string;
    python?: string;
    json?: string;
    sql?: string;
    soql?: string;
    apex?: string;
  };
}

export const KPI_MASTER_DATA: KPIRecord[] = [
  {
    id: "KPI-001",
    metric: "Pipeline value by stage, region, rep, territory, channel",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Stage, Region, Rep, Territory, Channel",
    type: "Leading",
    bestVisualization: "Choropleth map + KPI counters",
    analysisPurpose: "Monitors pipeline value by stage, region, rep, territory, channel across stage, region, rep, territory, channel."
  },
  {
    id: "KPI-002",
    metric: "Pipeline coverage ratio (pipeline / quota)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity + Quota",
    dataSources: "Salesforce",
    dimensions: "Time, Region, Team",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors pipeline coverage ratio (pipeline / quota) across time, region, team."
  },
  {
    id: "KPI-003",
    metric: "Weighted pipeline (value × stage probability)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Stage, Rep, Time",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors weighted pipeline (value × stage probability) across stage, rep, time."
  },
  {
    id: "KPI-004",
    metric: "Number of open opportunities by opening duration/age bucket",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Opening Duration/Age Bucket, Rep, Region",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors number of open opportunities by opening duration/age bucket across opening duration/age bucket, rep, region."
  },
  {
    id: "KPI-005",
    metric: "Pipeline created this period vs. prior period",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Time, Region, Segment",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors pipeline created this period vs. prior period across time, region, segment."
  },
  {
    id: "KPI-006",
    metric: "Sales cycle length (average days from created to closed)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors sales cycle length (average days from created to closed) across rep, region, product."
  },
  {
    id: "KPI-007",
    metric: "Stage-to-stage conversion rates (stage funnel)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Stage, Time, Segment",
    type: "Leading",
    bestVisualization: "Funnel chart",
    analysisPurpose: "Monitors stage-to-stage conversion rates (stage funnel) across stage, time, segment."
  },
  {
    id: "KPI-008",
    metric: "Average opportunity stage duration last quarter",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity History",
    dataSources: "Salesforce",
    dimensions: "Stage, Rep, Region, Quarter",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors average opportunity stage duration last quarter across stage, rep, region, quarter."
  },
  {
    id: "KPI-009",
    metric: "Pipeline velocity = (# opps × win rate × ACV) / sales cycle length",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Region, Segment, Time",
    type: "Leading",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Monitors pipeline velocity = (# opps × win rate × acv) / sales cycle length across region, segment, time."
  },
  {
    id: "KPI-010",
    metric: "Stalled opportunities (no activity in N days)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity + Activity",
    dataSources: "Salesforce",
    dimensions: "Rep, Age Bucket, Region",
    type: "Leading",
    bestVisualization: "Histogram",
    analysisPurpose: "Monitors stalled opportunities (no activity in n days) across rep, age bucket, region."
  },
  {
    id: "KPI-011",
    metric: "Win rate overall/by rep/region/product/channel/competitor",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Product Usage",
    dimensions: "Rep, Region, Product, Competitor",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors win rate overall/by rep/region/product/channel/competitor across rep, region, product, competitor."
  },
  {
    id: "KPI-012",
    metric: "Opportunity Loss by loss reason",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Loss Reason, Region, Rep",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors opportunity loss by loss reason across loss reason, region, rep."
  },
  {
    id: "KPI-013",
    metric: "Opportunity Closed-won ACV / TCV",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors opportunity closed-won acv / tcv across rep, region, product."
  },
  {
    id: "KPI-014",
    metric: "Slip rate (opps moved out of period without closing)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Time, Rep, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors slip rate (opps moved out of period without closing) across time, rep, region."
  },
  {
    id: "KPI-015",
    metric: "Push rate (close date changed ≥ 1x)",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity History",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Time",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors push rate (close date changed ≥ 1x) across rep, region, time."
  },
  {
    id: "KPI-016",
    metric: "Forecast accuracy (committed vs. actual closed)",
    function: "Pipeline & Opportunity Management",
    object: "Forecast + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Time, Team, Region",
    type: "Lagging",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Monitors forecast accuracy (committed vs. actual closed) across time, team, region."
  },
  {
    id: "KPI-017",
    metric: "Best case vs. commit vs. closed",
    function: "Pipeline & Opportunity Management",
    object: "Forecast + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Time, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors best case vs. commit vs. closed across time, region."
  },
  {
    id: "KPI-018",
    metric: "Forecast coverage ratio",
    function: "Pipeline & Opportunity Management",
    object: "Forecast + Quota",
    dataSources: "Salesforce",
    dimensions: "Time, Region",
    type: "Leading",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Monitors forecast coverage ratio across time, region."
  },
  {
    id: "KPI-019",
    metric: "Quarter-over-quarter pipeline forecast delta",
    function: "Pipeline & Opportunity Management",
    object: "Forecast",
    dataSources: "Salesforce",
    dimensions: "Quarter, Region, Team",
    type: "Leading",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Monitors quarter-over-quarter pipeline forecast delta across quarter, region, team."
  },
  {
    id: "KPI-020",
    metric: "Leads created by source, region, period",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Source, Region, Time",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors leads created by source, region, period across source, region, time."
  },
  {
    id: "KPI-021",
    metric: "Lead-to-opportunity conversion rate",
    function: "Lead & Contact Management",
    object: "Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Source, Segment, Time",
    type: "Lagging",
    bestVisualization: "Grouped bar + KPI counters",
    analysisPurpose: "Monitors lead-to-opportunity conversion rate across source, segment, time."
  },
  {
    id: "KPI-022",
    metric: "Lead response time (first touch after creation)",
    function: "Lead & Contact Management",
    object: "Lead + Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Rep, Source, Time",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors lead response time (first touch after creation) across rep, source, time."
  },
  {
    id: "KPI-023",
    metric: "Lead age at conversion",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Source, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors lead age at conversion across source, region."
  },
  {
    id: "KPI-024",
    metric: "Time from MQL to SQL",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Segment, Source",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors time from mql to sql across segment, source."
  },
  {
    id: "KPI-025",
    metric: "Time from SQL to opportunity created",
    function: "Lead & Contact Management",
    object: "Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Segment, Source",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors time from sql to opportunity created across segment, source."
  },
  {
    id: "KPI-026",
    metric: "Contacts created in the current quarter vs. Enriched in the current quarter",
    function: "Lead & Contact Management",
    object: "Contact",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Quarter, Region, Contact Change Type",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors contacts created in the current quarter vs. enriched in the current quarter across quarter, region, contact change type."
  },
  {
    id: "KPI-027",
    metric: "Lead score by scoring range",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Scoring Range, Source, Segment",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors lead score by scoring range across scoring range, source, segment."
  },
  {
    id: "KPI-028",
    metric: "Lead Disqualification reason group",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Disqualification Reason, Source, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors lead disqualification reason group across disqualification reason, source, region."
  },
  {
    id: "KPI-029",
    metric: "Contact data completeness rate",
    function: "Lead & Contact Management",
    object: "Contact",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Field, Region",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors contact data completeness rate across field, region."
  },
  {
    id: "KPI-030",
    metric: "Duplicate rate",
    function: "Lead & Contact Management",
    object: "Lead + Contact",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Email / Phone Match, Name, Country, Zip Code, Job Title, Object Type, Source",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Detects and calculates duplicate lead and contact rate across sources, identifying records sharing (identical Email OR Phone) along with matching First Name, Last Name, Country, Zip Code, and Job Title."
  },
  {
    id: "KPI-031",
    metric: "Tasks created per seller per day/week",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Task Type, Day, Week",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors tasks created per seller per day/week across seller, task type, day, week."
  },
  {
    id: "KPI-032",
    metric: "Tasks completed per seller per day/week",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Task Type, Completion Day, Week",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors tasks completed per seller per day/week across seller, task type, completion day, week."
  },
  {
    id: "KPI-033",
    metric: "Task completion rate by seller and task type",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Task Type, Week, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors task completion rate by seller and task type across seller, task type, week, region."
  },
  {
    id: "KPI-034",
    metric: "Open task backlog by due-date bucket",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Priority, Due-Date Bucket, Region",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors open task backlog by due-date bucket across seller, priority, due-date bucket, region."
  },
  {
    id: "KPI-035",
    metric: "Overdue task rate by seller and priority",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Priority, Due-Date Bucket, Region",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors overdue task rate by seller and priority across seller, priority, due-date bucket, region."
  },
  {
    id: "KPI-036",
    metric: "Average task completion duration",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Task Type, Week, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors average task completion duration across seller, task type, week, region."
  },
  {
    id: "KPI-037",
    metric: "Follow-up task SLA compliance rate",
    function: "Sales Activity & Engagement",
    object: "Task",
    dataSources: "Salesforce",
    dimensions: "Seller, Priority, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors follow-up task sla compliance rate across seller, priority, week, region."
  },
  {
    id: "KPI-038",
    metric: "Events scheduled per seller per week",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Event Type, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors events scheduled per seller per week across seller, event type, week, region."
  },
  {
    id: "KPI-039",
    metric: "Meetings held per seller per week",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Meeting Type, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors meetings held per seller per week across seller, meeting type, week, region."
  },
  {
    id: "KPI-040",
    metric: "Meeting completion/show rate",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Meeting Type, Week, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors meeting completion/show rate across seller, meeting type, week, region."
  },
  {
    id: "KPI-041",
    metric: "Meeting cancellation/no-show rate",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Cancellation Reason, Week, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors meeting cancellation/no-show rate across seller, cancellation reason, week, region."
  },
  {
    id: "KPI-042",
    metric: "Average customer meeting duration",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Meeting Type, Week, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors average customer meeting duration across seller, meeting type, week, region."
  },
  {
    id: "KPI-043",
    metric: "Customer-facing meeting hours per seller",
    function: "Sales Activity & Engagement",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Seller, Meeting Type, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors customer-facing meeting hours per seller across seller, meeting type, week, region."
  },
  {
    id: "KPI-044",
    metric: "Activity mix by type and channel",
    function: "Sales Activity & Engagement",
    object: "Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Seller, Activity Type, Channel, Week",
    type: "Leading",
    bestVisualization: "Sankey diagram",
    analysisPurpose: "Monitors activity mix by type and channel across seller, activity type, channel, week."
  },
  {
    id: "KPI-045",
    metric: "Unique accounts engaged per seller per week",
    function: "Sales Activity & Engagement",
    object: "Activity + Account",
    dataSources: "Salesforce",
    dimensions: "Seller, Account, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors unique accounts engaged per seller per week across seller, account, week, region."
  },
  {
    id: "KPI-046",
    metric: "Unique contacts engaged per seller per week",
    function: "Sales Activity & Engagement",
    object: "Activity + Contact",
    dataSources: "Salesforce",
    dimensions: "Seller, Contact, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors unique contacts engaged per seller per week across seller, contact, week, region."
  },
  {
    id: "KPI-047",
    metric: "Activities per open opportunity",
    function: "Sales Activity & Engagement",
    object: "Activity + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Seller, Opportunity, Stage, Week",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors activities per open opportunity across seller, opportunity, stage, week."
  },
  {
    id: "KPI-048",
    metric: "Open opportunities with engagement in last 14 days",
    function: "Sales Activity & Engagement",
    object: "Activity + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Seller, Stage, Region, Engagement Status",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors open opportunities with engagement in last 14 days across seller, stage, region, engagement status."
  },
  {
    id: "KPI-049",
    metric: "Open opportunities with no activity in 14 days",
    function: "Sales Activity & Engagement",
    object: "Activity + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Seller, Stage, Region, Age Bucket",
    type: "Leading",
    bestVisualization: "Histogram",
    analysisPurpose: "Monitors open opportunities with no activity in 14 days across seller, stage, region, age bucket."
  },
  {
    id: "KPI-050",
    metric: "Time to first activity after lead assignment",
    function: "Sales Activity & Engagement",
    object: "Activity + Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Seller, Lead Source, Segment, Region",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors time to first activity after lead assignment across seller, lead source, segment, region."
  },
  {
    id: "KPI-051",
    metric: "Unique contacts engaged per opportunity (multi-threading)",
    function: "Sales Activity & Engagement",
    object: "Activity + Contact + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Seller, Opportunity, Stage, Region",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors unique contacts engaged per opportunity (multi-threading) across seller, opportunity, stage, region."
  },
  {
    id: "KPI-052",
    metric: "Seller active days per week",
    function: "Sales Activity & Engagement",
    object: "Activity",
    dataSources: "Salesforce",
    dimensions: "Seller, Week, Team, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors seller active days per week across seller, week, team, region."
  },
  {
    id: "KPI-053",
    metric: "Activity logging delay (activity time to CreatedDate)",
    function: "Sales Activity & Engagement",
    object: "Activity",
    dataSources: "Salesforce",
    dimensions: "Seller, Activity Type, Week, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors activity logging delay (activity time to createddate) across seller, activity type, week, region."
  },
  {
    id: "KPI-054",
    metric: "Accounts owned per rep",
    function: "Account Management",
    object: "Account",
    dataSources: "Salesforce",
    dimensions: "Rep, Team, Region",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors accounts owned per rep across rep, team, region."
  },
  {
    id: "KPI-055",
    metric: "Accounts with no activity in N days",
    function: "Account Management",
    object: "Account + Activity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Segment",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors accounts with no activity in n days across rep, region, segment."
  },
  {
    id: "KPI-056",
    metric: "Customer health score",
    function: "Account Management",
    object: "Account",
    dataSources: "Salesforce + Internal DW — Product Usage",
    dimensions: "Segment, Region, Cohort",
    type: "Leading",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors customer health score across segment, region, cohort."
  },
  {
    id: "KPI-057",
    metric: "Churn rate by segment, region, cohort",
    function: "Account Management",
    object: "Account + Subscription",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Segment, Region, Cohort",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors churn rate by segment, region, cohort across segment, region, cohort."
  },
  {
    id: "KPI-058",
    metric: "Cohort retention rate by signup month (Month 1/3/6/12)",
    function: "Account Management",
    object: "Account + Subscription",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Signup Cohort, Month Offset, Segment, Region",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors cohort retention rate by signup month (month 1/3/6/12) across signup cohort, month offset, segment, region."
  },
  {
    id: "KPI-059",
    metric: "Logo cohort retention curve (monthly)",
    function: "Account Management",
    object: "Account",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Signup Cohort, Month Offset, Region",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors logo cohort retention curve (monthly) across signup cohort, month offset, region."
  },
  {
    id: "KPI-060",
    metric: "Revenue cohort retention curve (monthly)",
    function: "Account Management",
    object: "Subscription",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Signup Cohort, Month Offset, Segment",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors revenue cohort retention curve (monthly) across signup cohort, month offset, segment."
  },
  {
    id: "KPI-061",
    metric: "Cohort retention rate by product line",
    function: "Account Management",
    object: "Subscription + Product",
    dataSources: "Salesforce + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Signup Cohort, Product, Month Offset",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors cohort retention rate by product line across signup cohort, product, month offset."
  },
  {
    id: "KPI-062",
    metric: "Net revenue retention (NRR)",
    function: "Account Management",
    object: "Subscription",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Segment, Region, Cohort",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors net revenue retention (nrr) across segment, region, cohort."
  },
  {
    id: "KPI-063",
    metric: "Gross revenue retention (GRR)",
    function: "Account Management",
    object: "Subscription",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Segment, Region, Cohort",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors gross revenue retention (grr) across segment, region, cohort."
  },
  {
    id: "KPI-064",
    metric: "Upsell Opportunity ARR",
    function: "Account Management",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Segment, Product, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors upsell opportunity arr across segment, product, region."
  },
  {
    id: "KPI-065",
    metric: "Logo retention rate",
    function: "Account Management",
    object: "Account",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Cohort, Segment, Region",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors logo retention rate across cohort, segment, region."
  },
  {
    id: "KPI-066",
    metric: "Last activity date per account",
    function: "Account Management",
    object: "Activity",
    dataSources: "Salesforce",
    dimensions: "Rep, Segment",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors last activity date per account across rep, segment."
  },
  {
    id: "KPI-067",
    metric: "Meetings held per account per quarter",
    function: "Account Management",
    object: "Event",
    dataSources: "Salesforce",
    dimensions: "Quarter, Rep, Segment",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors meetings held per account per quarter across quarter, rep, segment."
  },
  {
    id: "KPI-068",
    metric: "Quota attainment % by rep/team/region/channel",
    function: "Quota & Rep Performance",
    object: "Quota + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Rep, Team, Region, Channel",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors quota attainment % by rep/team/region/channel across rep, team, region, channel."
  },
  {
    id: "KPI-069",
    metric: "% of reps at ≥ 100% quota",
    function: "Quota & Rep Performance",
    object: "Quota",
    dataSources: "Salesforce",
    dimensions: "Team, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors % of reps at ≥ 100% quota across team, region."
  },
  {
    id: "KPI-070",
    metric: "Average attainment by segment",
    function: "Quota & Rep Performance",
    object: "Quota",
    dataSources: "Salesforce",
    dimensions: "Segment, Region",
    type: "Lagging",
    bestVisualization: "Grouped bar + KPI counters",
    analysisPurpose: "Monitors average attainment by segment across segment, region."
  },
  {
    id: "KPI-071",
    metric: "Ramp attainment for new hires",
    function: "Quota & Rep Performance",
    object: "Quota + HR",
    dataSources: "Salesforce",
    dimensions: "Hire Cohort, Segment",
    type: "Leading",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors ramp attainment for new hires across hire cohort, segment."
  },
  {
    id: "KPI-072",
    metric: "Revenue per rep",
    function: "Quota & Rep Performance",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Rep, Team, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors revenue per rep across rep, team, region."
  },
  {
    id: "KPI-073",
    metric: "Activities per seller per day/week",
    function: "Quota & Rep Performance",
    object: "Activity",
    dataSources: "Salesforce",
    dimensions: "Seller, Activity Type, Day, Week",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors activities per seller per day/week across seller, activity type, day, week."
  },
  {
    id: "KPI-074",
    metric: "Opportunities created per rep per period",
    function: "Quota & Rep Performance",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Time, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors opportunities created per rep per period across rep, time, region."
  },
  {
    id: "KPI-075",
    metric: "Average deal size per rep",
    function: "Quota & Rep Performance",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Segment",
    type: "Lagging",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors average deal size per rep across rep, region, segment."
  },
  {
    id: "KPI-076",
    metric: "Deals closed per seller per quarter",
    function: "Quota & Rep Performance",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Seller, Quarter, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors deals closed per seller per quarter across seller, quarter, region."
  },
  {
    id: "KPI-077",
    metric: "Rep quota attainment quarter over quarter",
    function: "Quota & Rep Performance",
    object: "Quota + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Quarter, Team, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors rep quota attainment quarter over quarter across rep, quarter, team, region."
  },
  {
    id: "KPI-078",
    metric: "Consistency score (% of quarters at target)",
    function: "Quota & Rep Performance",
    object: "Quota",
    dataSources: "Salesforce",
    dimensions: "Rep, Team",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors consistency score (% of quarters at target) across rep, team."
  },
  {
    id: "KPI-079",
    metric: "New logo bookings (ACV, TCV)",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Region, Segment, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors new logo bookings (acv, tcv) across region, segment, product."
  },
  {
    id: "KPI-080",
    metric: "Renewal bookings",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Region, Segment, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors renewal bookings across region, segment, product."
  },
  {
    id: "KPI-081",
    metric: "Expansion / upsell bookings",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Region, Segment, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors expansion / upsell bookings across region, segment, product."
  },
  {
    id: "KPI-082",
    metric: "Total bookings by period, region, product, channel",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Time, Region, Product, Channel",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors total bookings by period, region, product, channel across time, region, product, channel."
  },
  {
    id: "KPI-083",
    metric: "Bookings vs. budget / plan",
    function: "Revenue & Bookings",
    object: "Opportunity + Plan",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors bookings vs. budget / plan across time, region, segment."
  },
  {
    id: "KPI-084",
    metric: "ARR / MRR",
    function: "Revenue & Bookings",
    object: "Subscription",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Segment, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors arr / mrr across time, segment, region."
  },
  {
    id: "KPI-085",
    metric: "ARR growth rate",
    function: "Revenue & Bookings",
    object: "Subscription",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Segment, Region",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors arr growth rate across time, segment, region."
  },
  {
    id: "KPI-086",
    metric: "Revenue recognized vs. deferred",
    function: "Revenue & Bookings",
    object: "Invoice + Revenue Schedule",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Product, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors revenue recognized vs. deferred across time, product, region."
  },
  {
    id: "KPI-087",
    metric: "Revenue by product category, region, channel, segment",
    function: "Revenue & Bookings",
    object: "Invoice",
    dataSources: "Marketo / HubSpot + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Product, Region, Channel, Segment",
    type: "Lagging",
    bestVisualization: "Treemap",
    analysisPurpose: "Monitors revenue by product category, region, channel, segment across product, region, channel, segment."
  },
  {
    id: "KPI-088",
    metric: "YoY / QoQ revenue growth",
    function: "Revenue & Bookings",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors yoy / qoq revenue growth across time, region, segment."
  },
  {
    id: "KPI-089",
    metric: "Average contract value (ACV)",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Rep, Product, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors average contract value (acv) across rep, product, region."
  },
  {
    id: "KPI-090",
    metric: "Average deal size",
    function: "Revenue & Bookings",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Rep, Region, Segment",
    type: "Lagging",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors average deal size across rep, region, segment."
  },
  {
    id: "KPI-091",
    metric: "Average selling price (ASP) trend",
    function: "Revenue & Bookings",
    object: "Opportunity Line Item",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Time, Product, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors average selling price (asp) trend across time, product, region."
  },
  {
    id: "KPI-092",
    metric: "Discount rate by rep/deal size/product/region",
    function: "Revenue & Bookings",
    object: "Quote + Opportunity",
    dataSources: "Salesforce + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Rep, Deal Bucket, Product, Region",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors discount rate by rep/deal size/product/region across rep, deal bucket, product, region."
  },
  {
    id: "KPI-093",
    metric: "Multi-year deal mix %",
    function: "Revenue & Bookings",
    object: "Contract",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Term Length, Segment, Region",
    type: "Lagging",
    bestVisualization: "100% stacked bar",
    analysisPurpose: "Monitors multi-year deal mix % across term length, segment, region."
  },
  {
    id: "KPI-094",
    metric: "Quotes created per period",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce",
    dimensions: "Time, Region, Rep",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors quotes created per period across time, region, rep."
  },
  {
    id: "KPI-095",
    metric: "Quote-to-close rate",
    function: "Quote & Deal Desk",
    object: "Quote + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors quote-to-close rate across rep, region, product."
  },
  {
    id: "KPI-096",
    metric: "Quote revision count per deal",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce",
    dimensions: "Deal, Rep, Region",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors quote revision count per deal across deal, rep, region."
  },
  {
    id: "KPI-097",
    metric: "Quote turnaround time (request to delivery)",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors quote turnaround time (request to delivery) across rep, region, product."
  },
  {
    id: "KPI-098",
    metric: "Time from quote sent to signature",
    function: "Quote & Deal Desk",
    object: "Quote + Contract",
    dataSources: "Salesforce",
    dimensions: "Segment, Product, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors time from quote sent to signature across segment, product, region."
  },
  {
    id: "KPI-099",
    metric: "% deals requiring non-standard approval",
    function: "Quote & Deal Desk",
    object: "Quote + Approval",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors % deals requiring non-standard approval across rep, region, product."
  },
  {
    id: "KPI-100",
    metric: "Average discount depth by product/tier/rep/region",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce + Internal DW — Product Usage",
    dimensions: "Product, Tier, Rep, Region",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors average discount depth by product/tier/rep/region across product, tier, rep, region."
  },
  {
    id: "KPI-101",
    metric: "Discount by deal size bucket",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce",
    dimensions: "Deal Bucket, Rep, Product",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors discount by deal size bucket across deal bucket, rep, product."
  },
  {
    id: "KPI-102",
    metric: "% deals with custom terms",
    function: "Quote & Deal Desk",
    object: "Quote + Contract",
    dataSources: "Salesforce",
    dimensions: "Product, Region",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors % deals with custom terms across product, region."
  },
  {
    id: "KPI-103",
    metric: "Approval SLA compliance",
    function: "Quote & Deal Desk",
    object: "Approval",
    dataSources: "Salesforce",
    dimensions: "Approver, Region, Time",
    type: "Leading",
    bestVisualization: "Gantt chart",
    analysisPurpose: "Monitors approval sla compliance across approver, region, time."
  },
  {
    id: "KPI-104",
    metric: "Quote error rate",
    function: "Quote & Deal Desk",
    object: "Quote",
    dataSources: "Salesforce",
    dimensions: "Error Type, Product, Rep",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors quote error rate across error type, product, rep."
  },
  {
    id: "KPI-105",
    metric: "Orders created by period, region, channel",
    function: "Order & Contract Management",
    object: "Order",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Time, Region, Channel",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors orders created by period, region, channel across time, region, channel."
  },
  {
    id: "KPI-106",
    metric: "Order-to-cash cycle time",
    function: "Order & Contract Management",
    object: "Order + Invoice",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Region, Segment",
    type: "Lagging",
    bestVisualization: "Box plot",
    analysisPurpose: "Monitors order-to-cash cycle time across region, segment."
  },
  {
    id: "KPI-107",
    metric: "Contract execution time",
    function: "Order & Contract Management",
    object: "Contract",
    dataSources: "Salesforce",
    dimensions: "Region, Segment, Product",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors contract execution time across region, segment, product."
  },
  {
    id: "KPI-108",
    metric: "% contracts executed on time",
    function: "Order & Contract Management",
    object: "Contract",
    dataSources: "Salesforce",
    dimensions: "Region, Segment",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors % contracts executed on time across region, segment."
  },
  {
    id: "KPI-109",
    metric: "Non-standard terms rate",
    function: "Order & Contract Management",
    object: "Contract",
    dataSources: "Salesforce",
    dimensions: "Region, Segment",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors non-standard terms rate across region, segment."
  },
  {
    id: "KPI-110",
    metric: "Auto-renewal opt-out rate",
    function: "Order & Contract Management",
    object: "Contract",
    dataSources: "Salesforce",
    dimensions: "Segment, Region",
    type: "Leading",
    bestVisualization: "Renewal timeline (Gantt)",
    analysisPurpose: "Monitors auto-renewal opt-out rate across segment, region."
  },
  {
    id: "KPI-111",
    metric: "Contract expiration coverage (renewals due in N days)",
    function: "Order & Contract Management",
    object: "Contract",
    dataSources: "Salesforce",
    dimensions: "Days-to-Expiry Bucket, Region",
    type: "Leading",
    bestVisualization: "Gantt chart",
    analysisPurpose: "Monitors contract expiration coverage (renewals due in n days) across days-to-expiry bucket, region."
  },
  {
    id: "KPI-112",
    metric: "Revenue by product / SKU / category",
    function: "Product & Product Category",
    object: "Invoice + Product",
    dataSources: "Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Product, SKU, Category, Time",
    type: "Lagging",
    bestVisualization: "Treemap",
    analysisPurpose: "Monitors revenue by product / sku / category across product, sku, category, time."
  },
  {
    id: "KPI-113",
    metric: "Product mix % of total bookings",
    function: "Product & Product Category",
    object: "Opportunity Line Item",
    dataSources: "Salesforce + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Product, Region, Time",
    type: "Leading",
    bestVisualization: "Treemap",
    analysisPurpose: "Monitors product mix % of total bookings across product, region, time."
  },
  {
    id: "KPI-114",
    metric: "ASP by product over time",
    function: "Product & Product Category",
    object: "Opportunity Line Item",
    dataSources: "Salesforce + Internal DW — Product Usage",
    dimensions: "Product, Time, Region",
    type: "Leading",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors asp by product over time across product, time, region."
  },
  {
    id: "KPI-115",
    metric: "Win rate by product",
    function: "Product & Product Category",
    object: "Opportunity",
    dataSources: "Salesforce + Internal DW — Product Usage",
    dimensions: "Product, Region, Segment",
    type: "Lagging",
    bestVisualization: "Treemap",
    analysisPurpose: "Monitors win rate by product across product, region, segment."
  },
  {
    id: "KPI-116",
    metric: "Invoices issued by period",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Line chart",
    analysisPurpose: "Monitors invoices issued by period across time, region, segment."
  },
  {
    id: "KPI-117",
    metric: "Invoice accuracy rate",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Error Type, Region",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors invoice accuracy rate across error type, region."
  },
  {
    id: "KPI-118",
    metric: "Billing cycle adherence",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Cycle, Region, Segment",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors billing cycle adherence across cycle, region, segment."
  },
  {
    id: "KPI-119",
    metric: "Days Sales Outstanding (DSO)",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Region, Segment, Time",
    type: "Lagging",
    bestVisualization: "Aging heatmap + DSO trend line",
    analysisPurpose: "Monitors days sales outstanding (dso) across region, segment, time."
  },
  {
    id: "KPI-120",
    metric: "AR aging buckets (0–30, 31–60, 61–90, 90+)",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Aging Bucket, Region",
    type: "Leading",
    bestVisualization: "Histogram",
    analysisPurpose: "Monitors ar aging buckets (0–30, 31–60, 61–90, 90+) across aging bucket, region."
  },
  {
    id: "KPI-121",
    metric: "% overdue by bucket",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Aging Bucket, Region, Segment",
    type: "Lagging",
    bestVisualization: "Histogram",
    analysisPurpose: "Monitors % overdue by bucket across aging bucket, region, segment."
  },
  {
    id: "KPI-122",
    metric: "Collection rate",
    function: "Invoice & Collections",
    object: "Invoice + Payment",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Region, Segment, Time",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors collection rate across region, segment, time."
  },
  {
    id: "KPI-123",
    metric: "Bad debt write-off rate",
    function: "Invoice & Collections",
    object: "Invoice",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Region, Segment, Time",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Monitors bad debt write-off rate across region, segment, time."
  },
  {
    id: "KPI-124",
    metric: "Cash collected vs. billed",
    function: "Invoice & Collections",
    object: "Invoice + Payment",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors cash collected vs. billed across time, region, segment."
  },
  {
    id: "KPI-125",
    metric: "Revenue recognized vs. cash collected timing",
    function: "Invoice & Collections",
    object: "Invoice + Revenue Schedule",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors revenue recognized vs. cash collected timing across time, region, segment."
  },
  {
    id: "KPI-126",
    metric: "Deferred revenue balance",
    function: "Invoice & Collections",
    object: "Revenue Schedule",
    dataSources: "Internal DW — Finance PO",
    dimensions: "Time, Region, Segment",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Monitors deferred revenue balance across time, region, segment."
  },
  {
    id: "KPI-127",
    metric: "Cohort activation and retention by acquisition month",
    function: "Cohort Analysis",
    object: "Account + Activity",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Signup Cohort, Month Offset, Segment, Channel",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors cohort activation and retention by acquisition month across signup cohort, month offset, segment, channel."
  },
  {
    id: "KPI-128",
    metric: "Cohort revenue expansion and contraction",
    function: "Cohort Analysis",
    object: "Subscription + Invoice",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Signup Cohort, Month Offset, Expansion Type, Segment",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Monitors cohort revenue expansion and contraction across signup cohort, month offset, expansion type, segment."
  },
  {
    id: "KPI-129",
    metric: "Segment conversion rate from lead to closed-won",
    function: "Segment Analysis",
    object: "Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Segment, Funnel Stage, Time, Region",
    type: "Lagging",
    bestVisualization: "Funnel chart",
    analysisPurpose: "Monitors segment conversion rate from lead to closed-won across segment, funnel stage, time, region."
  },
  {
    id: "KPI-130",
    metric: "Segment pipeline, win rate, ACV, and sales cycle scorecard",
    function: "Segment Analysis",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Segment, Region, Time",
    type: "Lagging",
    bestVisualization: "Grouped bar + KPI counters",
    analysisPurpose: "Monitors segment pipeline, win rate, acv, and sales cycle scorecard across segment, region, time."
  },
  {
    id: "KPI-131",
    metric: "GTM funnel conversion from lead through closed-won",
    function: "GTM Analysis",
    object: "Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Funnel Stage, Channel, Segment, Time",
    type: "Lagging",
    bestVisualization: "Funnel chart",
    analysisPurpose: "Monitors gtm funnel conversion from lead through closed-won across funnel stage, channel, segment, time."
  },
  {
    id: "KPI-132",
    metric: "GTM channel efficiency (pipeline and bookings per dollar)",
    function: "GTM Analysis",
    object: "Campaign + Opportunity + Spend",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Channel, Campaign, Segment, Time",
    type: "Lagging",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Monitors gtm channel efficiency (pipeline and bookings per dollar) across channel, campaign, segment, time."
  },
  {
    id: "KPI-133",
    metric: "Forecast variance by period, team, and category",
    function: "Forecast Analysis",
    object: "Forecast + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Time, Team, Forecast Category, Region",
    type: "Lagging",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Monitors forecast variance by period, team, and category across time, team, forecast category, region."
  },
  {
    id: "KPI-134",
    metric: "Forecast trend with confidence interval",
    function: "Forecast Analysis",
    object: "Forecast",
    dataSources: "Salesforce",
    dimensions: "Time, Team, Region, Confidence Band",
    type: "Leading",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Monitors forecast trend with confidence interval across time, team, region, confidence band."
  },
  {
    id: "KPI-135",
    metric: "Territory pipeline coverage and quota attainment",
    function: "Territory Analysis",
    object: "Territory + Opportunity + Quota",
    dataSources: "Salesforce",
    dimensions: "Territory, Region, Rep, Time",
    type: "Leading",
    bestVisualization: "Choropleth map + KPI counters",
    analysisPurpose: "Monitors territory pipeline coverage and quota attainment across territory, region, rep, time."
  },
  {
    id: "KPI-136",
    metric: "Territory whitespace and account penetration",
    function: "Territory Analysis",
    object: "Territory + Account + Opportunity",
    dataSources: "Salesforce",
    dimensions: "Territory, Account Segment, Industry, Region",
    type: "Leading",
    bestVisualization: "Choropleth map + KPI counters",
    analysisPurpose: "Monitors territory whitespace and account penetration across territory, account segment, industry, region."
  },
  {
    id: "KPI-137",
    metric: "Lead-to-account matching accuracy and routing error rate",
    function: "Lead-to-Account (L2A) Analysis",
    object: "Lead + Account",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Match Status, Match Confidence, Routing Tool, Region",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Measures automated matching errors and identifies orphan leads that fail to attach to existing corporate accounts, preventing duplicate outreach and protecting the buyer experience."
  },
  {
    id: "KPI-138",
    metric: "Marketing campaign ROI by source and account",
    function: "Lead-to-Account (L2A) Analysis",
    object: "Campaign + Lead + Account + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Campaign, Source, Account, Segment, Time",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Connects campaign cost, sourced pipeline, and closed revenue to measure campaign return on investment."
  },
  {
    id: "KPI-139",
    metric: "Routing velocity and SLA breach rate",
    function: "Lead-to-Account (L2A) Analysis",
    object: "Lead + Account + Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Lead Created Time, Account Assignment Time, First Touch Time, Team, Region",
    type: "Leading",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Measures elapsed time from creation to assignment and first sales touch, flagging marketing-to-sales handoff bottlenecks."
  },
  {
    id: "KPI-140",
    metric: "Account penetration and buying center depth",
    function: "Lead-to-Account (L2A) Analysis",
    object: "Account + Contact + Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Account, Contact Seniority, Persona, Department, ICP Tier",
    type: "Leading",
    bestVisualization: "Persona engagement heatmap",
    analysisPurpose: "Compares engaged-contact volume, seniority, and multi-threading against the ICP buying-center blueprint."
  },
  {
    id: "KPI-141",
    metric: "Buying committee engagement and persona win-rate mapping",
    function: "Account-to-Quote (A2Q) Analysis",
    object: "Account + Contact + Opportunity + Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Account, Persona, Department, Opportunity Stage, Win Status",
    type: "Leading",
    bestVisualization: "Persona engagement heatmap",
    analysisPurpose: "Maps IT, Security, Legal, Finance, and other buying roles during evaluation and correlates persona presence with win rates."
  },
  {
    id: "KPI-142",
    metric: "PLG and product-qualified lead velocity",
    function: "Account-to-Quote (A2Q) Analysis",
    object: "Account + Contact + Product Usage + Opportunity",
    dataSources: "Salesforce + Internal DW — Product Usage + Marketo / HubSpot",
    dimensions: "Account, Product Event, Usage Threshold, PQL Date, Quote Date",
    type: "Leading",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Tracks trial and freemium usage signals, then measures time from PQL qualification to enterprise quote initiation."
  },
  {
    id: "KPI-143",
    metric: "Quote cycle time and approval friction",
    function: "Account-to-Quote (A2Q) Analysis",
    object: "Quote + Approval + Opportunity",
    dataSources: "Salesforce + Internal data warehouse",
    dimensions: "Quote Step, Approval Type, Pricing Type, Engineering Estimate, Time",
    type: "Leading",
    bestVisualization: "Box plot",
    analysisPurpose: "Measures build, review, and approval duration and isolates delays from custom pricing, approvals, or engineering estimates."
  },
  {
    id: "KPI-144",
    metric: "Discount variance and price realization",
    function: "Quote-to-Cash (Q2C) / Invoice Analysis",
    object: "Quote + Opportunity + Product",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Sales Tier, Product, Rep, Region, Discount Band",
    type: "Lagging",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Measures list-to-net and floor-price variance, exposing margin erosion from unauthorized or maximum discounting."
  },
  {
    id: "KPI-145",
    metric: "Billing leakage and revenue assurance exceptions",
    function: "Quote-to-Cash (Q2C) / Invoice Analysis",
    object: "Contract + Invoice + Subscription + Product Usage",
    dataSources: "Salesforce + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Account, Product, Subscription Tier, Billing Period, Exception Type",
    type: "Lagging",
    bestVisualization: "Variance waterfall + exception table",
    analysisPurpose: "Reconciles signed contracts, invoices, and usage to uncover unbilled services, missing add-ons, and incorrect tier upgrades."
  },
  {
    id: "KPI-146",
    metric: "DSO and collection efficiency by payment terms",
    function: "Quote-to-Cash (Q2C) / Invoice Analysis",
    object: "Invoice + Payment + Account",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Payment Terms, Account Segment, Region, Invoice Month, Aging Bucket",
    type: "Lagging",
    bestVisualization: "Aging heatmap + DSO trend line",
    analysisPurpose: "Measures collection time and efficiency by payment terms to improve cash-flow forecasting."
  },
  {
    id: "KPI-147",
    metric: "Legal redline frequency, clause deviation, and negotiation cost",
    function: "Contract Lifecycle Management (CLM) Analysis",
    object: "Contract + Contract Clause + Legal Activity",
    dataSources: "Salesforce + Internal data warehouse",
    dimensions: "Clause Type, Deviation Type, Account Segment, Legal Owner, Time",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Tracks frequently redlined clauses and quantifies legal hours and operating cost for non-standard negotiations."
  },
  {
    id: "KPI-148",
    metric: "Signature cycle bottlenecks",
    function: "Contract Lifecycle Management (CLM) Analysis",
    object: "Contract + E-Signature Event + Approval",
    dataSources: "Salesforce + Internal data warehouse",
    dimensions: "Signature Stage, Signer Role, Internal/External, Delay Reason, Time",
    type: "Leading",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Measures send-to-signature execution time and separates external roadblocks from internal executive approval delays."
  },
  {
    id: "KPI-149",
    metric: "Auto-renewal exposure and CPI escalation impact",
    function: "Contract Lifecycle Management (CLM) Analysis",
    object: "Contract + Subscription + CPI Index",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Renewal Date, Opt-Out Window, CPI Rate, Account, Product",
    type: "Leading",
    bestVisualization: "Renewal timeline (Gantt)",
    analysisPurpose: "Surfaces upcoming opt-out windows and calculates the compounding financial impact of contracted annual price increases."
  },
  {
    id: "KPI-150",
    metric: "CAC payback period by acquisition channel",
    function: "Cross-Lifecycle & Strategic Finance Analysis",
    object: "Campaign + Account + Opportunity + Invoice",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Acquisition Channel, Customer Cohort, Segment, Region, Month Offset",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Calculates the months of customer gross profit required to recover acquisition cost for each channel."
  },
  {
    id: "KPI-151",
    metric: "NRR and GRR driver decomposition",
    function: "Cross-Lifecycle & Strategic Finance Analysis",
    object: "Account + Subscription + Invoice",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Account, Segment, Cohort, Revenue Movement, Time",
    type: "Lagging",
    bestVisualization: "Cohort heatmap (pivot + color scale)",
    analysisPurpose: "Decomposes recurring revenue into price increases, cross-sells, downgrades, and churn to explain NRR and GRR movement."
  },
  {
    id: "KPI-152",
    metric: "RevOps technology stack ROI and utilization",
    function: "Cross-Lifecycle & Strategic Finance Analysis",
    object: "Software License + User Activity + Finance PO",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO + Internal DW — Product Usage",
    dimensions: "Tool, License Type, User, Team, Feature, Time",
    type: "Lagging",
    bestVisualization: "Utilization heatmap + ROI bubble chart",
    analysisPurpose: "Audits seat cost and feature adoption to identify redundant spend, unused licenses, and underutilized capabilities across the RevOps stack."
  },
  {
    id: "KPI-153",
    metric: "Opportunity Win Rate Last Quarter",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Rep, Region, Product, Quarter",
    type: "Lagging",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Measures closed-won opportunity ratio for the preceding fiscal quarter against all closed opportunities (won + lost)."
  },
  {
    id: "KPI-154",
    metric: "Opportunity Loss Rate Last Quarter",
    function: "Pipeline & Opportunity Management",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Loss Reason, Rep, Region, Quarter",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Measures closed-lost opportunity proportion during the previous quarter to pinpoint objection patterns and competitive displacements."
  },
  {
    id: "KPI-155",
    metric: "Lead Conversion Rate Last Quarter",
    function: "Lead & Contact Management",
    object: "Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Source, Segment, Region, Quarter",
    type: "Lagging",
    bestVisualization: "Grouped bar + KPI counters",
    analysisPurpose: "Evaluates the percentage of inbound/outbound leads converted into validated opportunities in the prior quarter."
  },
  {
    id: "KPI-156",
    metric: "Lead Qualified Rate Last Quarter",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Source, Segment, Scoring Range, Quarter",
    type: "Leading",
    bestVisualization: "Funnel chart",
    analysisPurpose: "Measures the percentage of captured leads meeting MQL/SQL acceptance criteria in the last quarter."
  },
  {
    id: "KPI-157",
    metric: "Lead Disqualified Rate Last Quarter",
    function: "Lead & Contact Management",
    object: "Lead",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Disqualification Reason, Source, Region, Quarter",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Tracks the proportion of leads flagged as unqualified, bogus, or spam during the previous quarter to adjust ICP and top-of-funnel targeting."
  },
  {
    id: "KPI-158",
    metric: "Trade Breakdown: Volume distribution, win rates, and booked ARR across commercial trades",
    function: "Trade & Industry Analysis",
    object: "Opportunity + Account",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Trade (Commercial HVAC & Mechanical, Electrical & Solar, Plumbing & Industrial Piping, General Contracting, Commercial Roofing, Enterprise SaaS, Healthcare Systems, Logistics), Region, Rep, Quarter",
    type: "Lagging",
    bestVisualization: "Grouped bar + KPI counters",
    analysisPurpose: "Monitors live opportunity volume distribution, competitive win rates, and booked ARR across key commercial trades including Commercial HVAC & Mechanical, Electrical & Solar, Plumbing & Industrial Piping, General Contracting, Commercial Roofing, Enterprise SaaS, Healthcare Systems, and Logistics to optimize vertical sales motions."
  },
  {
    id: "KPI-159",
    metric: "Channel Attribution: Lead share, win rates, and estimated customer acquisition costs",
    function: "GTM & Channel Analysis",
    object: "Campaign + Lead + Opportunity + Spend",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Channel (Outbound AI, Inbound Organic, Partner Referral, Paid Search, Trade Show), Campaign, Region, Time",
    type: "Lagging",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Measures lead volume share, closed-won win rates, and estimated acquisition costs across Outbound AI, Inbound Organic, Partner Referral, Paid Search, and Trade Show channels to optimize GTM resource allocation."
  },
  {
    id: "KPI-160",
    metric: "Speed-to-Lead and SLA tracking: First-touch latency in minutes (< 5 min)",
    function: "Lead-to-Account (L2A) Analysis",
    object: "Lead + Activity",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "First Touch Latency (Minutes), SLA Breach (< 5 min), Channel, Rep, Territory, Time",
    type: "Leading",
    bestVisualization: "KPI counter + benchmark bar",
    analysisPurpose: "Measures elapsed first-touch latency in minutes from lead creation to sales engagement, tracking adherence to the sub-5-minute target SLA benchmark (< 5 min) to prevent lead decay."
  },
  {
    id: "KPI-161",
    metric: "5-Stage Funnel Progression: Lead Ingress (100%) → MQL → SQL → Opportunity → Closed Won",
    function: "Funnel & Conversion Analysis",
    object: "Lead + Opportunity + History",
    dataSources: "Salesforce + Marketo / HubSpot",
    dimensions: "Funnel Stage (Lead Ingress 100% -> MQL Qualified -> SQL Validated -> Active Opportunity -> Closed Won Booked), Pass-Through Rate %, Drop-Off Reason, Dwell Time (Days)",
    type: "Leading",
    bestVisualization: "Funnel chart",
    analysisPurpose: "Visualizes the 5-stage progression from raw Lead Ingress (100%) through MQL Qualified, SQL Validated, Active Opportunity, and Closed Won Booked, diagnosing stage-to-stage conversion percentages, drop-offs, and sales cycle dwell times."
  },
  {
    id: "KPI-162",
    metric: "Campaign Performance Executive Economics (CPL, CAC, Net ROI %, CAC Payback)",
    function: "Marketing & Campaign ROI Analysis",
    object: "Campaign + Spend + Lead + Opportunity + Invoice",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Campaign, Channel, Spend, CPL, CAC, Net Campaign ROI %, CAC Payback (Months), Quarter",
    type: "Lagging",
    bestVisualization: "Dual-axis combo chart",
    analysisPurpose: "Computes executive unit economics including Blended Cost Per Lead (CPL), Customer Acquisition Cost (CAC), Net Campaign ROI %, and CAC Payback Period in months across marketing investments."
  },
  {
    id: "KPI-163",
    metric: "Campaign Performance Ledger: Spend, leads generated, SQLs, won logos, and booked ARR",
    function: "Marketing & Campaign ROI Analysis",
    object: "Campaign + Lead + Opportunity",
    dataSources: "Salesforce + Marketo / HubSpot + Internal DW — Finance PO",
    dimensions: "Campaign Name, Program Type, Spend Budget, Leads Generated, SQLs Generated, Won Logos, Booked ARR, Time",
    type: "Lagging",
    bestVisualization: "Sorted bar chart",
    analysisPurpose: "Detailed performance ledger breaking down spend, leads generated, SQLs generated, won customer logos, and booked ARR by campaign initiative."
  },
  {
    id: "KPI-164",
    metric: "Pipeline Velocity & Scenario Simulation: (# Opps × Win Rate % × ACV) / Sales Cycle Days",
    function: "Sales Efficiency & Velocity Analysis",
    object: "Opportunity",
    dataSources: "Salesforce",
    dimensions: "Opportunity Volume, Win Rate %, Average Contract Value (ACV), Sales Cycle Days, Pipeline Velocity ($/Day), Region, Segment",
    type: "Leading",
    bestVisualization: "Bubble chart",
    analysisPurpose: "Computes daily pipeline velocity via the formula: (# Opportunities × Win Rate % × Average Deal Size ACV) / Sales Cycle Length in Days, and powers interactive simulation engines to model revenue sensitivity."
  },
  {
    id: "KPI-165",
    metric: "Net Revenue Retention (NRR) and Gross Revenue Retention (GRR) Cohort Waterfall",
    function: "Customer Retention & Expansion Analysis",
    object: "Subscription + Contract + Invoice + Account",
    dataSources: "Salesforce + Internal DW — Finance PO",
    dimensions: "Starting ARR, Expansion ARR, Contraction ARR, Churn ARR, Ending ARR, NRR %, GRR %, Customer Cohort, Segment",
    type: "Lagging",
    bestVisualization: "Variance waterfall + exception table",
    analysisPurpose: "Decomposes customer cohort recurring revenue: Starting ARR + Expansion ARR - Contraction ARR - Churn ARR = Ending ARR, reporting both Net Revenue Retention (NRR %) and Gross Revenue Retention (GRR %) to evaluate net revenue durability."
  }
];

// Helper to generate syntactically rich, accurate language scripts for each metric
export function generateLanguageScripts(kpi: KPIRecord): Record<string, string> {
  const metricName = kpi.metric;
  const obj = kpi.object;
  const functionName = kpi.function;
  const isLastQuarter = metricName.toLowerCase().includes("last quarter");

  // If specific conditions cannot produce parity, return "Null"
  // For SOQL, if data source is purely external finance DW and not Salesforce object, SOQL returns Null
  const isPureExternalDW = kpi.dataSources.includes("Internal DW") && !kpi.dataSources.includes("Salesforce");

  // SOQL Script (Supports Salesforce Summer '26 Pilot: FORMULA() in WHERE clause)
  let soqlScript = "Null";
  if (!isPureExternalDW && kpi.dataSources.includes("Salesforce")) {
    const lowerMetric = metricName.toLowerCase();
    const lowerPurpose = kpi.analysisPurpose.toLowerCase();

    if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
      soqlScript = `// SOQL (Summer '26 Pilot): Detect Duplicate Lead Groups with Demographic Parity
// Rule: (Same Email OR Same Phone) AND Same FirstName, LastName, Country, PostalCode, Title
SELECT FirstName, LastName, Country, PostalCode, Title, Email,
       COUNT(Id) duplicateCount,
       MIN(CreatedDate) earliestCreated,
       MAX(CreatedDate) latestCreated
FROM Lead
WHERE IsConverted = FALSE
  AND Email != NULL
  AND PostalCode != NULL
  AND Title != NULL
GROUP BY FirstName, LastName, Country, PostalCode, Title, Email
HAVING COUNT(Id) > 1
ORDER BY COUNT(Id) DESC`;
    } else if (metricName === "Opportunity Win Rate Last Quarter") {
      soqlScript = `// SOQL (Summer '26 Pilot): Filter closed-won deals with cycle length calculation via FORMULA()
SELECT Owner.Name, Region__c, IsWon,
       COUNT(Id) totalOpportunities,
       SUM(Amount) totalAmount,
       AVG(Amount) avgDealSize
FROM Opportunity
WHERE IsClosed = TRUE 
  AND CloseDate = LAST_QUARTER
  AND FORMULA('CloseDate - CreatedDate') >= 0
GROUP BY Owner.Name, Region__c, IsWon
ORDER BY COUNT(Id) DESC`;
    } else if (metricName === "Opportunity Loss Rate Last Quarter") {
      soqlScript = `// SOQL (Summer '26 Pilot): Filter closed-lost opportunities evaluating deal lifespan via FORMULA()
SELECT Loss_Reason__c, Region__c,
       COUNT(Id) totalLostOpportunities,
       SUM(Amount) lostAmount
FROM Opportunity
WHERE IsClosed = TRUE 
  AND IsWon = FALSE
  AND CloseDate = LAST_QUARTER
  AND FORMULA('CloseDate - CreatedDate') >= 0
GROUP BY Loss_Reason__c, Region__c
ORDER BY COUNT(Id) DESC`;
    } else if (metricName === "Lead Conversion Rate Last Quarter") {
      soqlScript = `// SOQL (Summer '26 Pilot): Measure converted leads using FORMULA() for conversion duration in WHERE clause
SELECT LeadSource, Segment__c, IsConverted,
       COUNT(Id) totalLeads
FROM Lead
WHERE CreatedDate = LAST_QUARTER
  AND (IsConverted = FALSE OR FORMULA('ConvertedDate - CreatedDate') >= 0)
GROUP BY LeadSource, Segment__c, IsConverted
ORDER BY COUNT(Id) DESC`;
    } else if (metricName === "Lead Qualified Rate Last Quarter") {
      soqlScript = `SELECT LeadSource, Segment__c, Status,
       COUNT(Id) totalLeads
FROM Lead
WHERE CreatedDate = LAST_QUARTER
  AND Status IN ('Qualified', 'Sales Qualified', 'MQL')
GROUP BY LeadSource, Segment__c, Status
ORDER BY COUNT(Id) DESC`;
    } else if (metricName === "Lead Disqualified Rate Last Quarter") {
      soqlScript = `SELECT Disqualification_Reason__c, LeadSource, Region__c,
       COUNT(Id) totalDisqualifiedLeads
FROM Lead
WHERE CreatedDate = LAST_QUARTER
  AND Status = 'Disqualified'
GROUP BY Disqualification_Reason__c, LeadSource, Region__c
ORDER BY COUNT(Id) DESC`;
    } else if (lowerMetric.includes("cycle") || lowerMetric.includes("velocity") || lowerMetric.includes("duration") || lowerPurpose.includes("cycle time") || lowerPurpose.includes("days to close")) {
      // Sales cycle and deal duration calculation via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Filter deals meeting cycle velocity thresholds using FORMULA() in WHERE clause
SELECT StageName, Region__c, Owner.Name, LeadSource,
       COUNT(Id) oppCount,
       AVG(Amount) avgAmount,
       SUM(Amount) totalPipeline
FROM Opportunity
WHERE IsClosed = TRUE
  AND FORMULA('CloseDate - CreatedDate') <= 90
GROUP BY StageName, Region__c, Owner.Name, LeadSource
ORDER BY SUM(Amount) DESC`;
    } else if (lowerMetric.includes("slippage") || lowerMetric.includes("push") || lowerPurpose.includes("push") || lowerPurpose.includes("slippage")) {
      // Deal push / slippage via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Filter slipped opportunities where CloseDate moved past original target using FORMULA()
SELECT StageName, Owner.Name, Region__c, ForecastCategoryName,
       COUNT(Id) slippedDealsCount,
       SUM(Amount) slippedValue
FROM Opportunity
WHERE IsClosed = FALSE
  AND FORMULA('CloseDate - Original_Close_Date__c') > 0
GROUP BY StageName, Owner.Name, Region__c, ForecastCategoryName
ORDER BY SUM(Amount) DESC`;
    } else if (lowerMetric.includes("discount") || lowerMetric.includes("margin") || lowerPurpose.includes("discount") || lowerPurpose.includes("price realization")) {
      // Price realization / discounting via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Identify discounted line items using FORMULA() difference in WHERE clause
SELECT Opportunity.Name, Product2.Name, UnitPrice, ListPrice, Quantity,
       TotalPrice, Opportunity.Owner.Name
FROM OpportunityLineItem
WHERE FORMULA('ListPrice - UnitPrice') > 0
ORDER BY TotalPrice DESC`;
    } else if (lowerMetric.includes("sla") || lowerMetric.includes("speed to lead") || lowerMetric.includes("response time") || lowerPurpose.includes("response time") || lowerPurpose.includes("first touch")) {
      // Lead response SLA via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Filter leads within response SLA window using FORMULA() in WHERE clause
SELECT LeadSource, Status, Owner.Name, Country,
       COUNT(Id) respondedLeadsCount
FROM Lead
WHERE CreatedDate = THIS_QUARTER
  AND FORMULA('First_Touch_Date__c - CreatedDate') <= 1
GROUP BY LeadSource, Status, Owner.Name, Country
ORDER BY COUNT(Id) DESC`;
    } else if (lowerMetric.includes("quota") || lowerMetric.includes("attainment") || lowerPurpose.includes("quota attainment")) {
      // Quota attainment variance via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Filter opportunities contributing to quota surplus/deficit using FORMULA()
SELECT Owner.Name, Region__c, IsWon,
       COUNT(Id) wonDealsCount,
       SUM(Amount) totalClosedWonRevenue,
       AVG(Amount) averageDealSize
FROM Opportunity
WHERE IsClosed = TRUE
  AND IsWon = TRUE
  AND CloseDate = THIS_FISCAL_YEAR
  AND FORMULA('CloseDate - CreatedDate') >= 0
GROUP BY Owner.Name, Region__c, IsWon
ORDER BY SUM(Amount) DESC`;
    } else if (lowerMetric.includes("renewal") || lowerMetric.includes("expansion") || lowerMetric.includes("churn") || lowerMetric.includes("grr") || lowerMetric.includes("nrr")) {
      // Contract and Subscription duration / expansion via Summer '26 FORMULA()
      soqlScript = `// SOQL (Summer '26 Pilot): Filter contracts reaching renewal term using FORMULA() in WHERE clause
SELECT Account.Name, Status, StartDate, EndDate, ContractTerm,
       SpecialTerms, Owner.Name
FROM Contract
WHERE StatusCode = 'Activated'
  AND FORMULA('EndDate - StartDate') >= 365
ORDER BY EndDate ASC`;
    } else if (obj.includes("Opportunity") && (lowerMetric.includes("stage") || lowerMetric.includes("pipeline") || lowerMetric.includes("forecast"))) {
      soqlScript = `// SOQL (Summer '26 Pilot): Aggregate open pipeline with active lifespan filtering via FORMULA()
SELECT StageName, Region__c, Owner.Name, Territory__c, LeadSource,
       SUM(Amount) totalPipelineValue, COUNT(Id) oppCount
FROM Opportunity
WHERE IsClosed = FALSE
  AND FORMULA('CloseDate - CreatedDate') >= 0
GROUP BY StageName, Region__c, Owner.Name, Territory__c, LeadSource
ORDER BY SUM(Amount) DESC`;
    } else if (obj.includes("Opportunity") && lowerMetric.includes("win rate")) {
      soqlScript = `// SOQL (Summer '26 Pilot): Analyze closed opportunities with valid date range via FORMULA()
SELECT Owner.Name, Region__c, IsWon,
       COUNT(Id) totalOpps,
       AVG(Amount) avgACV,
       SUM(Amount) totalAmount
FROM Opportunity
WHERE IsClosed = TRUE
  AND FORMULA('CloseDate - CreatedDate') >= 0
GROUP BY Owner.Name, Region__c, IsWon
ORDER BY COUNT(Id) DESC`;
    } else if (obj.includes("Lead") && lowerMetric.includes("conversion")) {
      soqlScript = `// SOQL (Summer '26 Pilot): Evaluate lead conversion pipeline with duration checks via FORMULA()
SELECT LeadSource, Status, IsConverted,
       COUNT(Id) totalLeads
FROM Lead
WHERE CreatedDate = THIS_YEAR
  AND (IsConverted = FALSE OR FORMULA('ConvertedDate - CreatedDate') >= 0)
GROUP BY LeadSource, Status, IsConverted
ORDER BY COUNT(Id) DESC`;
    } else if (obj.includes("Task") || obj.includes("Activity")) {
      soqlScript = `// SOQL (Summer '26 Pilot): Query seller activities within active cadence window
SELECT Owner.Name, TaskSubtype, Status, Priority, ActivityDate,
       COUNT(Id) totalActivities
FROM Task
WHERE ActivityDate = THIS_QUARTER
GROUP BY Owner.Name, TaskSubtype, Status, Priority, ActivityDate`;
    } else if (obj.includes("Quote")) {
      soqlScript = `// SOQL (Summer '26 Pilot): Filter quotes evaluating discount variances with FORMULA() in WHERE clause
SELECT Opportunity.Name, Status, Discount, TotalPrice, GrandTotal,
       Opportunity.Owner.Name, CreatedDate
FROM Quote
WHERE CreatedDate = THIS_YEAR
  AND FORMULA('GrandTotal - Subtotal') <= 0
ORDER BY GrandTotal DESC`;
    } else if (obj.includes("Account")) {
      soqlScript = `// SOQL (Summer '26 Pilot): Aggregate accounts across segments
SELECT Type, Industry, Region__c, AnnualRevenue, Owner.Name,
       COUNT(Id) totalAccounts
FROM Account
WHERE CreatedDate = THIS_FISCAL_YEAR
GROUP BY Type, Industry, Region__c, AnnualRevenue, Owner.Name`;
    } else {
      const mainObj = obj.split("+")[0].trim().replace(/\s+/g, "");
      soqlScript = `// SOQL (Summer '26 Pilot): Query ${mainObj} records with active system delta evaluation via FORMULA()
SELECT Id, Name, CreatedDate, SystemModstamp
FROM ${mainObj}
WHERE CreatedDate = THIS_FISCAL_YEAR
  AND FORMULA('SystemModstamp - CreatedDate') >= 0
LIMIT 200`;
    }
  }

  // Google Sheets Formula
  let googleSheetsScript = "Null";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    googleSheetsScript = `=LET(
  totalRecords, COUNTA(LEAD_CONTACT_ID),
  duplicateFlags, MAP(
    FIRST_NAME, LAST_NAME, EMAIL, PHONE, COUNTRY, ZIP_CODE, JOB_TITLE,
    LAMBDA(fn, ln, em, ph, ctry, zip, ttl,
      LET(
        emailMatches, IF(em <> "", COUNTIFS(FIRST_NAME, fn, LAST_NAME, ln, COUNTRY, ctry, ZIP_CODE, zip, JOB_TITLE, ttl, EMAIL, em), 0),
        phoneMatches, IF(ph <> "", COUNTIFS(FIRST_NAME, fn, LAST_NAME, ln, COUNTRY, ctry, ZIP_CODE, zip, JOB_TITLE, ttl, PHONE, ph), 0),
        IF(OR(emailMatches > 1, phoneMatches > 1), 1, 0)
      )
    )
  ),
  duplicateTotal, SUM(duplicateFlags),
  IFERROR(duplicateTotal / totalRecords, "Null")
)`;
  } else if (metricName === "Opportunity Win Rate Last Quarter") {
    googleSheetsScript = `=IFERROR(
  COUNTIFS(OPP_STAGE, "Closed Won", OPP_CLOSE_QUARTER, "Last Quarter", OPP_REGION, DIMENSION_KEY) /
  COUNTIFS(OPP_IS_CLOSED, TRUE, OPP_CLOSE_QUARTER, "Last Quarter", OPP_REGION, DIMENSION_KEY),
  "Null"
)`;
  } else if (metricName === "Opportunity Loss Rate Last Quarter") {
    googleSheetsScript = `=IFERROR(
  COUNTIFS(OPP_STAGE, "Closed Lost", OPP_CLOSE_QUARTER, "Last Quarter", OPP_REGION, DIMENSION_KEY) /
  COUNTIFS(OPP_IS_CLOSED, TRUE, OPP_CLOSE_QUARTER, "Last Quarter", OPP_REGION, DIMENSION_KEY),
  "Null"
)`;
  } else if (metricName === "Lead Conversion Rate Last Quarter") {
    googleSheetsScript = `=IFERROR(
  COUNTIFS(LEAD_IS_CONVERTED, TRUE, LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY) /
  COUNTIFS(LEAD_ID, "<>", "", LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY),
  "Null"
)`;
  } else if (metricName === "Lead Qualified Rate Last Quarter") {
    googleSheetsScript = `=IFERROR(
  COUNTIFS(LEAD_STATUS, "Qualified", LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY) /
  COUNTIFS(LEAD_ID, "<>", "", LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY),
  "Null"
)`;
  } else if (metricName === "Lead Disqualified Rate Last Quarter") {
    googleSheetsScript = `=IFERROR(
  COUNTIFS(LEAD_STATUS, "Disqualified", LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY) /
  COUNTIFS(LEAD_ID, "<>", "", LEAD_CREATED_QUARTER, "Last Quarter", LEAD_SOURCE, DIMENSION_KEY),
  "Null"
)`;
  } else if (metricName.toLowerCase().includes("pipeline") || metricName.toLowerCase().includes("value")) {
    googleSheetsScript = `=QUERY(OPPORTUNITY_DATA, "SELECT Col1, Col2, SUM(Col5), COUNT(Col1) WHERE Col4 = 'Open' GROUP BY Col1, Col2 LABEL SUM(Col5) 'Pipeline Value'", 1)`;
  } else if (metricName.toLowerCase().includes("rate") || metricName.toLowerCase().includes("ratio") || metricName.toLowerCase().includes("conversion")) {
    googleSheetsScript = `=IFERROR(COUNTIFS(OPP_STAGE, "Closed Won", OPP_REGION, DIMENSION_KEY) / COUNTIFS(OPP_STAGE, "<>", "", OPP_REGION, DIMENSION_KEY), "Null")`;
  } else if (metricName.toLowerCase().includes("cycle") || metricName.toLowerCase().includes("duration") || metricName.toLowerCase().includes("age")) {
    googleSheetsScript = `=AVERAGEIFS(OPP_CLOSE_DAYS, OPP_STAGE, "Closed Won", OPP_REGION, DIMENSION_KEY)`;
  } else if (metricName.toLowerCase().includes("task") || metricName.toLowerCase().includes("event") || metricName.toLowerCase().includes("activity")) {
    googleSheetsScript = `=COUNTIFS(TASK_SELLER, DIMENSION_KEY, TASK_STATUS, "Completed", TASK_WEEK, WEEKNUM(TODAY()))`;
  } else {
    googleSheetsScript = `=SUMIFS(REVENUE_ARR, DIMENSION_RANGE, DIMENSION_KEY, STATUS_RANGE, "Active")`;
  }

  // Excel Formula
  let excelScript = "Null";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    excelScript = `=LET(
  totalRecords, COUNTA(LeadContactTable[Id]),
  duplicateFlags, MAP(
    LeadContactTable[FirstName],
    LeadContactTable[LastName],
    LeadContactTable[Email],
    LeadContactTable[Phone],
    LeadContactTable[Country],
    LeadContactTable[PostalCode],
    LeadContactTable[Title],
    LAMBDA(fn, ln, em, ph, ctry, zp, ttl,
      LET(
        emailMatchCount, IF(em <> "", COUNTIFS(
          LeadContactTable[FirstName], fn,
          LeadContactTable[LastName], ln,
          LeadContactTable[Country], ctry,
          LeadContactTable[PostalCode], zp,
          LeadContactTable[Title], ttl,
          LeadContactTable[Email], em
        ), 0),
        phoneMatchCount, IF(ph <> "", COUNTIFS(
          LeadContactTable[FirstName], fn,
          LeadContactTable[LastName], ln,
          LeadContactTable[Country], ctry,
          LeadContactTable[PostalCode], zp,
          LeadContactTable[Title], ttl,
          LeadContactTable[Phone], ph
        ), 0),
        IF(OR(emailMatchCount > 1, phoneMatchCount > 1), 1, 0)
      )
    )
  ),
  duplicateTotal, SUM(duplicateFlags),
  IF(totalRecords > 0, duplicateTotal / totalRecords, "Null")
)`;
  } else if (metricName === "Opportunity Win Rate Last Quarter") {
    excelScript = `=LET(
  won, COUNTIFS(OpportunityTable[Stage], "Closed Won", OpportunityTable[CloseQuarter], "Last Quarter", OpportunityTable[Region], [@Region]),
  closedTotal, COUNTIFS(OpportunityTable[IsClosed], TRUE, OpportunityTable[CloseQuarter], "Last Quarter", OpportunityTable[Region], [@Region]),
  IF(closedTotal > 0, won / closedTotal, "Null")
)`;
  } else if (metricName === "Opportunity Loss Rate Last Quarter") {
    excelScript = `=LET(
  lost, COUNTIFS(OpportunityTable[Stage], "Closed Lost", OpportunityTable[CloseQuarter], "Last Quarter", OpportunityTable[Region], [@Region]),
  closedTotal, COUNTIFS(OpportunityTable[IsClosed], TRUE, OpportunityTable[CloseQuarter], "Last Quarter", OpportunityTable[Region], [@Region]),
  IF(closedTotal > 0, lost / closedTotal, "Null")
)`;
  } else if (metricName === "Lead Conversion Rate Last Quarter") {
    excelScript = `=LET(
  converted, COUNTIFS(LeadTable[IsConverted], TRUE, LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  totalLeads, COUNTIFS(LeadTable[Id], "<>", "", LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  IF(totalLeads > 0, converted / totalLeads, "Null")
)`;
  } else if (metricName === "Lead Qualified Rate Last Quarter") {
    excelScript = `=LET(
  qualified, COUNTIFS(LeadTable[Status], "Qualified", LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  totalLeads, COUNTIFS(LeadTable[Id], "<>", "", LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  IF(totalLeads > 0, qualified / totalLeads, "Null")
)`;
  } else if (metricName === "Lead Disqualified Rate Last Quarter") {
    excelScript = `=LET(
  disqualified, COUNTIFS(LeadTable[Status], "Disqualified", LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  totalLeads, COUNTIFS(LeadTable[Id], "<>", "", LeadTable[CreatedQuarter], "Last Quarter", LeadTable[Source], [@Source]),
  IF(totalLeads > 0, disqualified / totalLeads, "Null")
)`;
  } else if (metricName.toLowerCase().includes("rate") || metricName.toLowerCase().includes("ratio") || metricName.toLowerCase().includes("conversion")) {
    excelScript = `=LET(
  won, COUNTIFS(OpportunityTable[Stage], "Closed Won", OpportunityTable[Region], [@Region]),
  total, COUNTIFS(OpportunityTable[Stage], "<>", "", OpportunityTable[Region], [@Region]),
  IF(total > 0, won / total, "Null")
)`;
  } else if (metricName.toLowerCase().includes("pipeline") || metricName.toLowerCase().includes("arr") || metricName.toLowerCase().includes("bookings")) {
    excelScript = `=SUMIFS(OpportunityTable[Amount], OpportunityTable[Stage], "<>Closed Lost", OpportunityTable[Region], [@Region], OpportunityTable[Rep], [@Rep])`;
  } else if (metricName.toLowerCase().includes("cycle") || metricName.toLowerCase().includes("duration")) {
    excelScript = `=AVERAGEIFS(OpportunityTable[SalesCycleDays], OpportunityTable[Stage], "Closed Won", OpportunityTable[Region], [@Region])`;
  } else {
    excelScript = `=SUMIFS(RevenueTable[ARR], RevenueTable[DIMENSION_KEY], [@DIMENSION_KEY])`;
  }

  // Java Script (Spring / Streams / JDBC)
  let javaScript = "";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    javaScript = `// KPI Engine Service Implementation for: Duplicate rate (KPI-030)
// Rule: (Same Email OR Same Phone) AND Same (FirstName + LastName + Country + ZipCode + JobTitle)
package com.codex.analytics.kpi.service;

import java.util.*;
import java.util.stream.Collectors;
import com.codex.analytics.model.LeadContactRecord;

public class DuplicateRateService {

    public static class DuplicateRateReport {
        private final int totalRecords;
        private final int duplicateCount;
        private final double duplicateRate;
        private final Map<String, List<LeadContactRecord>> matchedClusters;

        public DuplicateRateReport(int totalRecords, int duplicateCount, double duplicateRate, Map<String, List<LeadContactRecord>> matchedClusters) {
            this.totalRecords = totalRecords;
            this.duplicateCount = duplicateCount;
            this.duplicateRate = duplicateRate;
            this.matchedClusters = matchedClusters;
        }

        public int getTotalRecords() { return totalRecords; }
        public int getDuplicateCount() { return duplicateCount; }
        public double getDuplicateRate() { return duplicateRate; }
        public Map<String, List<LeadContactRecord>> getMatchedClusters() { return matchedClusters; }
    }

    public DuplicateRateReport calculateDuplicateRate(List<LeadContactRecord> records) {
        if (records == null || records.isEmpty()) {
            return new DuplicateRateReport(0, 0, 0.0, Collections.emptyMap());
        }

        int totalCount = records.size();
        Map<String, List<LeadContactRecord>> emailClusters = new HashMap<>();
        Map<String, List<LeadContactRecord>> phoneClusters = new HashMap<>();

        // Group by composite demographic key + normalized identifier
        for (LeadContactRecord r : records) {
            String demographicKey = String.format("%s|%s|%s|%s|%s",
                clean(r.getFirstName()),
                clean(r.getLastName()),
                clean(r.getCountry()),
                clean(r.getZipCode()),
                clean(r.getJobTitle())
            );

            if (r.getEmail() != null && !r.getEmail().isBlank()) {
                String emailKey = demographicKey + "|EMAIL:" + clean(r.getEmail());
                emailClusters.computeIfAbsent(emailKey, k -> new ArrayList<>()).add(r);
            }

            if (r.getPhone() != null && !r.getPhone().isBlank()) {
                String cleanPhone = r.getPhone().replaceAll("[^0-9]", "");
                if (!cleanPhone.isEmpty()) {
                    String phoneKey = demographicKey + "|PHONE:" + cleanPhone;
                    phoneClusters.computeIfAbsent(phoneKey, k -> new ArrayList<>()).add(r);
                }
            }
        }

        Set<String> duplicateRecordIds = new HashSet<>();
        Map<String, List<LeadContactRecord>> identifiedClusters = new HashMap<>();

        emailClusters.forEach((key, list) -> {
            if (list.size() > 1) {
                list.forEach(item -> duplicateRecordIds.add(item.getId()));
                identifiedClusters.put("EMAIL_MATCH:" + key, list);
            }
        });

        phoneClusters.forEach((key, list) -> {
            if (list.size() > 1) {
                list.forEach(item -> duplicateRecordIds.add(item.getId()));
                identifiedClusters.put("PHONE_MATCH:" + key, list);
            }
        });

        int duplicates = duplicateRecordIds.size();
        double rate = totalCount > 0 ? (double) duplicates / totalCount : 0.0;

        return new DuplicateRateReport(totalCount, duplicates, rate, identifiedClusters);
    }

    private String clean(String str) {
        return str == null ? "" : str.trim().toLowerCase();
    }
}`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("opportunity")) {
    javaScript = `// KPI Engine Service Implementation for: ${metricName}
package com.codex.analytics.kpi.service;

import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDate;
import com.codex.analytics.model.OpportunityRecord;

public class ${metricName.replace(/[^a-zA-Z0-9]/g, "")}Service {

    public Map<String, Double> calculateMetric(List<OpportunityRecord> records) {
        if (records == null || records.isEmpty()) {
            return Collections.emptyMap();
        }

        // Group by Region and Rep for Previous Quarter
        return records.stream()
            .filter(r -> Boolean.TRUE.equals(r.getIsClosed()))
            .filter(r -> "LAST_QUARTER".equalsIgnoreCase(r.getCloseQuarter()))
            .collect(Collectors.groupingBy(
                r -> r.getRegion() + " | " + r.getRep(),
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    list -> {
                        long targetCount = list.stream()
                            .filter(o -> ${metricName.includes("Loss") ? "\"Closed Lost\".equalsIgnoreCase(o.getStage())" : "\"Closed Won\".equalsIgnoreCase(o.getStage())"})
                            .count();
                        return list.isEmpty() ? 0.0 : (double) targetCount / list.size();
                    }
                )
            ));
    }
}`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("lead")) {
    javaScript = `// KPI Engine Service Implementation for: ${metricName}
package com.codex.analytics.kpi.service;

import java.util.*;
import java.util.stream.Collectors;
import com.codex.analytics.model.LeadRecord;

public class ${metricName.replace(/[^a-zA-Z0-9]/g, "")}Service {

    public Map<String, Double> calculateMetric(List<LeadRecord> records) {
        if (records == null || records.isEmpty()) {
            return Collections.emptyMap();
        }

        return records.stream()
            .filter(l -> "LAST_QUARTER".equalsIgnoreCase(l.getCreatedQuarter()))
            .collect(Collectors.groupingBy(
                LeadRecord::getLeadSource,
                Collectors.collectingAndThen(
                    Collectors.toList(),
                    list -> {
                        long matchCount = list.stream()
                            .filter(l -> ${
                              metricName.includes("Conversion")
                                ? "Boolean.TRUE.equals(l.getIsConverted())"
                                : metricName.includes("Disqualified")
                                ? "\"Disqualified\".equalsIgnoreCase(l.getStatus())"
                                : "\"Qualified\".equalsIgnoreCase(l.getStatus())"
                            })
                            .count();
                        return list.isEmpty() ? 0.0 : (double) matchCount / list.size();
                    }
                )
            ));
    }
}`;
  } else {
    javaScript = `// KPI Engine Service Implementation for: ${metricName}
package com.codex.analytics.kpi.service;

import java.util.*;
import java.util.stream.Collectors;
import com.codex.analytics.model.*;

public class ${metricName.replace(/[^a-zA-Z0-9]/g, "")}Service {

    public Map<String, Double> calculateMetric(List<OpportunityRecord> records) {
        if (records == null || records.isEmpty()) {
            return Collections.emptyMap();
        }

        return records.stream()
            .filter(r -> r.getStage() != null && !r.getStage().equalsIgnoreCase("Closed Lost"))
            .collect(Collectors.groupingBy(
                r -> r.getRegion() + "_" + r.getRep(),
                Collectors.summingDouble(OpportunityRecord::getDealValue)
            ));
    }
}`;
  }

  // Python Script (Pandas & SQLAlchemy)
  let pythonScript = "";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    pythonScript = `import pandas as pd
import numpy as np

def calculate_kpi_030_duplicate_rate(df: pd.DataFrame) -> dict:
    """
    KPI ID: KPI-030
    Metric: Duplicate rate
    Function: Lead & Contact Management
    Dimensions: Email / Phone Match, Name, Country, Zip Code, Job Title, Object Type, Source
    Rule: Detects all leads/contacts with (same email OR same phone) 
          AND same first_name AND same last_name AND same country AND same zip_code AND same job_title.
    """
    if df.empty or 'id' not in df.columns:
        return {'total_records': 0, 'duplicate_count': 0, 'duplicate_rate': 0.0, 'duplicates_df': pd.DataFrame()}

    work_df = df.copy()

    # Normalize fields for deterministic comparison
    for col in ['first_name', 'last_name', 'email', 'country', 'zip_code', 'job_title']:
        if col in work_df.columns:
            work_df[col] = work_df[col].astype(str).str.strip().str.lower().replace({'nan': '', 'none': ''})
        else:
            work_df[col] = ''

    if 'phone' in work_df.columns:
        work_df['phone_clean'] = work_df['phone'].astype(str).str.replace(r'\\D', '', regex=True).replace({'nan': '', 'none': ''})
    else:
        work_df['phone_clean'] = ''

    # Base demographic key: first_name + last_name + country + zip_code + job_title
    work_df['demo_key'] = (
        work_df['first_name'] + '|' +
        work_df['last_name'] + '|' +
        work_df['country'] + '|' +
        work_df['zip_code'] + '|' +
        work_df['job_title']
    )

    # 1. Email matches: (same email != '') AND same demo_key
    email_mask = work_df['email'] != ''
    email_dup_flags = work_df[email_mask].duplicated(subset=['demo_key', 'email'], keep=False)
    email_dup_ids = set(work_df[email_mask][email_dup_flags]['id'])

    # 2. Phone matches: (same phone != '') AND same demo_key
    phone_mask = work_df['phone_clean'] != ''
    phone_dup_flags = work_df[phone_mask].duplicated(subset=['demo_key', 'phone_clean'], keep=False)
    phone_dup_ids = set(work_df[phone_mask][phone_dup_flags]['id'])

    # Union of all duplicates matching either Email or Phone with demographic parity
    all_duplicate_ids = email_dup_ids.union(phone_dup_ids)
    total_records = len(work_df)
    duplicate_count = len(all_duplicate_ids)
    duplicate_rate = (duplicate_count / total_records) if total_records > 0 else 0.0

    work_df['is_duplicate'] = work_df['id'].isin(all_duplicate_ids)

    return {
        'total_records': total_records,
        'duplicate_count': duplicate_count,
        'duplicate_rate': round(duplicate_rate, 4),
        'duplicate_rate_percentage': f"{round(duplicate_rate * 100, 2)}%",
        'duplicates_df': work_df[work_df['is_duplicate']][['id', 'first_name', 'last_name', 'email', 'phone', 'country', 'zip_code', 'job_title']]
    }
`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("opportunity")) {
    pythonScript = `import pandas as pd
import numpy as np

def calculate_${kpi.id.toLowerCase().replace("-", "_")}(df: pd.DataFrame) -> pd.DataFrame:
    """
    KPI ID: ${kpi.id}
    Metric: ${metricName}
    Function: ${functionName}
    Dimensions: ${kpi.dimensions}
    """
    if df.empty or 'is_closed' not in df.columns:
        return pd.DataFrame()

    # Filter closed opportunities in previous fiscal quarter
    cohort = df[(df['is_closed'] == True) & (df['close_quarter'] == 'LAST_QUARTER')].copy()
    if cohort.empty:
        return pd.DataFrame({'result': ['Null']})

    ${
      metricName.includes("Loss")
        ? "cohort['target_match'] = cohort['stage_name'].str.lower() == 'closed lost'"
        : "cohort['target_match'] = cohort['stage_name'].str.lower() == 'closed won'"
    }

    aggregated = cohort.groupby(['region', 'rep_name']).agg(
        total_closed=('opportunity_id', 'count'),
        matching_count=('target_match', 'sum')
    ).reset_index()

    aggregated['rate'] = np.where(
        aggregated['total_closed'] > 0,
        aggregated['matching_count'] / aggregated['total_closed'],
        np.nan
    )

    aggregated['rate'] = aggregated['rate'].fillna('Null')
    return aggregated.sort_values(by='total_closed', ascending=False)
`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("lead")) {
    pythonScript = `import pandas as pd
import numpy as np

def calculate_${kpi.id.toLowerCase().replace("-", "_")}(df: pd.DataFrame) -> pd.DataFrame:
    """
    KPI ID: ${kpi.id}
    Metric: ${metricName}
    Function: ${functionName}
    Dimensions: ${kpi.dimensions}
    """
    if df.empty or 'lead_id' not in df.columns:
        return pd.DataFrame()

    # Filter leads created in previous fiscal quarter
    cohort = df[df['created_quarter'] == 'LAST_QUARTER'].copy()
    if cohort.empty:
        return pd.DataFrame({'result': ['Null']})

    ${
      metricName.includes("Conversion")
        ? "cohort['is_match'] = cohort['is_converted'] == True"
        : metricName.includes("Disqualified")
        ? "cohort['is_match'] = cohort['status'].str.lower() == 'disqualified'"
        : "cohort['is_match'] = cohort['status'].str.lower().isin(['qualified', 'mql', 'sql'])"
    }

    aggregated = cohort.groupby(['lead_source', 'region']).agg(
        total_leads=('lead_id', 'count'),
        matched_leads=('is_match', 'sum')
    ).reset_index()

    aggregated['calculated_rate'] = np.where(
        aggregated['total_leads'] > 0,
        aggregated['matched_leads'] / aggregated['total_leads'],
        np.nan
    )

    aggregated['calculated_rate'] = aggregated['calculated_rate'].fillna('Null')
    return aggregated.sort_values(by='total_leads', ascending=False)
`;
  } else {
    pythonScript = `import pandas as pd
import numpy as np

def calculate_${kpi.id.toLowerCase().replace("-", "_")}(df: pd.DataFrame) -> pd.DataFrame:
    """
    KPI ID: ${kpi.id}
    Metric: ${metricName}
    Function: ${functionName}
    Dimensions: ${kpi.dimensions}
    """
    if df.empty or 'deal_value' not in df.columns:
        return pd.DataFrame()

    # Filter cohort conditions
    filtered_df = df[df['is_closed'] == False].copy()
    
    aggregated = filtered_df.groupby(['region', 'rep_name', 'stage']).agg(
        total_pipeline=('deal_value', 'sum'),
        opp_count=('opportunity_id', 'count'),
        avg_cycle_days=('sales_cycle_days', 'mean')
    ).reset_index()

    # Handle Null safety contract
    aggregated['total_pipeline'] = aggregated['total_pipeline'].fillna(0.0)
    return aggregated.sort_values(by='total_pipeline', ascending=False)
`;
  }

  // JSON / GraphQL Schema Payload
  let jsonScript = "";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    jsonScript = JSON.stringify(
      {
        kpiId: kpi.id,
        metricName: kpi.metric,
        aggregationFunction: kpi.function,
        targetObject: kpi.object,
        dataSources: kpi.dataSources.split("+").map((s) => s.trim()),
        dimensions: kpi.dimensions.split(",").map((d) => d.trim()),
        classification: kpi.type,
        recommendedChart: kpi.bestVisualization,
        deduplicationSpecification: {
          evaluationScope: ["Lead", "Contact"],
          ruleLogic: "AND",
          identityClusters: [
            {
              operator: "OR",
              conditions: [
                { field: "email", matchType: "EXACT_NORMALIZED", ignoreBlank: true },
                { field: "phone", matchType: "NUMERIC_DIGITS_ONLY", ignoreBlank: true }
              ]
            },
            { field: "first_name", matchType: "CASE_INSENSITIVE_TRIMMED" },
            { field: "last_name", matchType: "CASE_INSENSITIVE_TRIMMED" },
            { field: "country", matchType: "ISO_OR_STANDARDIZED_NAME" },
            { field: "zip_code", matchType: "STANDARDIZED_POSTAL_CODE" },
            { field: "job_title", matchType: "CASE_INSENSITIVE_TRIMMED" }
          ]
        },
        queryDefinition: {
          dimensions: ["source", "object_type", "country"],
          measures: [
            {
              name: "total_records_evaluated",
              aggregate: "COUNT",
              field: "id"
            },
            {
              name: "duplicate_records_detected",
              aggregate: "COUNT_DEDUPLICATED_MATCHES",
              ruleId: "MATCH_EMAIL_OR_PHONE_AND_DEMOGRAPHICS"
            },
            {
              name: "duplicate_rate_percentage",
              formula: "(duplicate_records_detected / total_records_evaluated) * 100.0"
            }
          ],
          filters: [
            { field: "is_deleted", operator: "EQUALS", value: false }
          ]
        }
      },
      null,
      2
    );
  } else {
    jsonScript = JSON.stringify(
      {
        kpiId: kpi.id,
        metricName: kpi.metric,
        aggregationFunction: kpi.function,
        targetObject: kpi.object,
        dataSources: kpi.dataSources.split("+").map((s) => s.trim()),
        dimensions: kpi.dimensions.split(",").map((d) => d.trim()),
        classification: kpi.type,
        recommendedChart: kpi.bestVisualization,
        queryDefinition: {
          dimensions: kpi.dimensions.split(",").map((d) => d.trim().toLowerCase().replace(/\s+/g, "_")),
          measures: [
            { name: "total_value", aggregate: "SUM", field: "amount" },
            { name: "record_count", aggregate: "COUNT", field: "id" }
          ],
          filters: [
            { field: "is_deleted", operator: "EQUALS", value: false },
            ...(isLastQuarter ? [{ field: "time_period", operator: "EQUALS", value: "LAST_QUARTER" }] : [])
          ]
        }
      },
      null,
      2
    );
  }

  // SQL (Postgres / Snowflake / BigQuery)
  let sqlScript = "";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    sqlScript = `-- KPI: Duplicate rate (KPI-030)
-- Target: Lead + Contact | Data Sources: Salesforce + Marketo / HubSpot
-- Matching Rule: (Same Email OR Same Phone) AND Same FirstName AND Same LastName AND Same Country AND Same ZipCode AND Same JobTitle

WITH normalized_records AS (
    -- Combine Leads and Contacts into unified record stream
    SELECT 
        'Lead' AS record_type,
        id AS record_id,
        LOWER(TRIM(COALESCE(first_name, ''))) AS first_name,
        LOWER(TRIM(COALESCE(last_name, ''))) AS last_name,
        LOWER(TRIM(COALESCE(email, ''))) AS email,
        REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g') AS phone_clean,
        UPPER(TRIM(COALESCE(country, ''))) AS country,
        TRIM(COALESCE(postal_code, '')) AS zip_code,
        LOWER(TRIM(COALESCE(title, ''))) AS job_title,
        lead_source AS source_channel,
        created_date
    FROM warehouse_crm.leads
    WHERE is_deleted = FALSE

    UNION ALL

    SELECT 
        'Contact' AS record_type,
        id AS record_id,
        LOWER(TRIM(COALESCE(first_name, ''))) AS first_name,
        LOWER(TRIM(COALESCE(last_name, ''))) AS last_name,
        LOWER(TRIM(COALESCE(email, ''))) AS email,
        REGEXP_REPLACE(COALESCE(phone, ''), '[^0-9]', '', 'g') AS phone_clean,
        UPPER(TRIM(COALESCE(mailing_country, ''))) AS country,
        TRIM(COALESCE(mailing_postal_code, '')) AS zip_code,
        LOWER(TRIM(COALESCE(title, ''))) AS job_title,
        'Direct CRM Contact' AS source_channel,
        created_date
    FROM warehouse_crm.contacts
    WHERE is_deleted = FALSE
),
email_matched_duplicates AS (
    -- Match on same Email + FirstName + LastName + Country + Zip + JobTitle
    SELECT 
        record_id
    FROM (
        SELECT 
            record_id,
            COUNT(*) OVER (
                PARTITION BY first_name, last_name, country, zip_code, job_title, email
            ) AS match_count
        FROM normalized_records
        WHERE email <> ''
    ) t
    WHERE match_count > 1
),
phone_matched_duplicates AS (
    -- Match on same Phone + FirstName + LastName + Country + Zip + JobTitle
    SELECT 
        record_id
    FROM (
        SELECT 
            record_id,
            COUNT(*) OVER (
                PARTITION BY first_name, last_name, country, zip_code, job_title, phone_clean
            ) AS match_count
        FROM normalized_records
        WHERE phone_clean <> ''
    ) t
    WHERE match_count > 1
),
all_duplicate_ids AS (
    SELECT record_id FROM email_matched_duplicates
    UNION
    SELECT record_id FROM phone_matched_duplicates
)
SELECT 
    r.record_type,
    r.source_channel,
    COUNT(r.record_id) AS total_records_evaluated,
    COUNT(d.record_id) AS total_duplicate_records,
    ROUND(
        (COUNT(d.record_id)::NUMERIC / NULLIF(COUNT(r.record_id), 0)) * 100.0, 
        2
    ) AS duplicate_rate_percentage
FROM normalized_records r
LEFT JOIN all_duplicate_ids d ON r.record_id = d.record_id
GROUP BY r.record_type, r.source_channel
ORDER BY total_duplicate_records DESC;`;
  } else if (metricName === "Opportunity Win Rate Last Quarter") {
    sqlScript = `-- KPI: Opportunity Win Rate Last Quarter (KPI-153)
-- Target: Opportunity | Data Sources: Salesforce / Data Warehouse
WITH last_quarter_opps AS (
    SELECT 
        o.id AS opportunity_id,
        o.owner_name AS rep_name,
        o.region,
        o.product_name,
        o.stage_name,
        o.is_won,
        o.amount AS deal_value,
        o.close_date
    FROM warehouse_crm.opportunities o
    WHERE o.is_deleted = FALSE
      AND o.is_closed = TRUE
      AND o.close_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 month')
      AND o.close_date < DATE_TRUNC('quarter', CURRENT_DATE)
)
SELECT 
    region,
    rep_name,
    product_name,
    COUNT(opportunity_id) AS total_closed_opps,
    SUM(CASE WHEN is_won = TRUE THEN 1 ELSE 0 END) AS total_won_opps,
    ROUND(
        (SUM(CASE WHEN is_won = TRUE THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(opportunity_id), 0)) * 100.0, 
        2
    ) AS win_rate_percentage,
    COALESCE(SUM(CASE WHEN is_won = TRUE THEN deal_value ELSE 0 END), 0) AS total_won_arr
FROM last_quarter_opps
GROUP BY 1, 2, 3
ORDER BY win_rate_percentage DESC;`;
  } else if (metricName === "Opportunity Loss Rate Last Quarter") {
    sqlScript = `-- KPI: Opportunity Loss Rate Last Quarter (KPI-154)
-- Target: Opportunity | Data Sources: Salesforce / Data Warehouse
WITH last_quarter_opps AS (
    SELECT 
        o.id AS opportunity_id,
        o.loss_reason,
        o.owner_name AS rep_name,
        o.region,
        o.is_won,
        o.amount AS deal_value,
        o.close_date
    FROM warehouse_crm.opportunities o
    WHERE o.is_deleted = FALSE
      AND o.is_closed = TRUE
      AND o.close_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 month')
      AND o.close_date < DATE_TRUNC('quarter', CURRENT_DATE)
)
SELECT 
    COALESCE(loss_reason, 'No Reason Specified') AS loss_reason,
    region,
    rep_name,
    COUNT(opportunity_id) AS total_closed_opps,
    SUM(CASE WHEN is_won = FALSE THEN 1 ELSE 0 END) AS lost_opps_count,
    ROUND(
        (SUM(CASE WHEN is_won = FALSE THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(opportunity_id), 0)) * 100.0, 
        2
    ) AS loss_rate_percentage
FROM last_quarter_opps
GROUP BY 1, 2, 3
ORDER BY lost_opps_count DESC;`;
  } else if (metricName === "Lead Conversion Rate Last Quarter") {
    sqlScript = `-- KPI: Lead Conversion Rate Last Quarter (KPI-155)
-- Target: Lead + Opportunity | Data Sources: Salesforce + Marketo / HubSpot
WITH last_quarter_leads AS (
    SELECT 
        l.id AS lead_id,
        l.lead_source,
        l.segment,
        l.region,
        l.is_converted,
        l.converted_opportunity_id,
        l.created_date
    FROM warehouse_crm.leads l
    WHERE l.is_deleted = FALSE
      AND l.created_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 month')
      AND l.created_date < DATE_TRUNC('quarter', CURRENT_DATE)
)
SELECT 
    lead_source,
    segment,
    region,
    COUNT(lead_id) AS total_leads_captured,
    SUM(CASE WHEN is_converted = TRUE THEN 1 ELSE 0 END) AS total_converted_leads,
    ROUND(
        (SUM(CASE WHEN is_converted = TRUE THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(lead_id), 0)) * 100.0, 
        2
    ) AS conversion_rate_percentage
FROM last_quarter_leads
GROUP BY 1, 2, 3
ORDER BY conversion_rate_percentage DESC;`;
  } else if (metricName === "Lead Qualified Rate Last Quarter") {
    sqlScript = `-- KPI: Lead Qualified Rate Last Quarter (KPI-156)
-- Target: Lead | Data Sources: Salesforce + Marketo / HubSpot
WITH last_quarter_leads AS (
    SELECT 
        l.id AS lead_id,
        l.lead_source,
        l.segment,
        l.lead_score_range,
        l.status,
        l.created_date
    FROM warehouse_crm.leads l
    WHERE l.is_deleted = FALSE
      AND l.created_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 month')
      AND l.created_date < DATE_TRUNC('quarter', CURRENT_DATE)
)
SELECT 
    lead_source,
    segment,
    lead_score_range,
    COUNT(lead_id) AS total_leads_captured,
    SUM(CASE WHEN status IN ('Qualified', 'MQL', 'SQL') THEN 1 ELSE 0 END) AS qualified_leads_count,
    ROUND(
        (SUM(CASE WHEN status IN ('Qualified', 'MQL', 'SQL') THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(lead_id), 0)) * 100.0, 
        2
    ) AS qualified_rate_percentage
FROM last_quarter_leads
GROUP BY 1, 2, 3
ORDER BY qualified_rate_percentage DESC;`;
  } else if (metricName === "Lead Disqualified Rate Last Quarter") {
    sqlScript = `-- KPI: Lead Disqualified Rate Last Quarter (KPI-157)
-- Target: Lead | Data Sources: Salesforce + Marketo / HubSpot
WITH last_quarter_leads AS (
    SELECT 
        l.id AS lead_id,
        l.lead_source,
        l.region,
        COALESCE(l.disqualification_reason, 'Unspecified') AS disqualification_reason,
        l.status,
        l.created_date
    FROM warehouse_crm.leads l
    WHERE l.is_deleted = FALSE
      AND l.created_date >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '3 month')
      AND l.created_date < DATE_TRUNC('quarter', CURRENT_DATE)
)
SELECT 
    disqualification_reason,
    lead_source,
    region,
    COUNT(lead_id) AS total_leads_captured,
    SUM(CASE WHEN status = 'Disqualified' THEN 1 ELSE 0 END) AS disqualified_leads_count,
    ROUND(
        (SUM(CASE WHEN status = 'Disqualified' THEN 1.0 ELSE 0.0 END) / NULLIF(COUNT(lead_id), 0)) * 100.0, 
        2
    ) AS disqualified_rate_percentage
FROM last_quarter_leads
GROUP BY 1, 2, 3
ORDER BY disqualified_leads_count DESC;`;
  } else {
    sqlScript = `-- KPI: ${metricName}
-- Target: ${kpi.object} | Data Sources: ${kpi.dataSources}
WITH cohort_base AS (
    SELECT 
        o.id AS opportunity_id,
        o.rep_name,
        o.region,
        o.stage_name,
        o.amount AS deal_value,
        o.created_date,
        o.close_date,
        DATEDIFF('day', o.created_date, o.close_date) AS sales_cycle_days
    FROM warehouse_crm.opportunities o
    WHERE o.is_deleted = FALSE
      AND o.created_date >= DATEADD('quarter', -1, CURRENT_DATE())
)
SELECT 
    region,
    rep_name,
    stage_name,
    COUNT(opportunity_id) AS total_opportunities,
    COALESCE(SUM(deal_value), 0) AS total_pipeline_arr,
    ROUND(AVG(sales_cycle_days), 1) AS avg_sales_cycle_days
FROM cohort_base
GROUP BY 1, 2, 3
ORDER BY total_pipeline_arr DESC;`;
  }

  // Apex (Salesforce Apex Controller)
  let apexScript = "";
  if (metricName === "Duplicate rate" || kpi.id === "KPI-030") {
    apexScript = `// Apex Controller: Duplicate Rate Engine for Leads & Contacts (KPI-030)
// Matching Rule: (Same Email OR Same Phone) AND Same FirstName AND LastName AND Country AND PostalCode AND Title
public with sharing class KPI030_DuplicateRateController {

    public class DuplicateRateSummary {
        @AuraEnabled public Integer totalRecords { get; set; }
        @AuraEnabled public Integer duplicateCount { get; set; }
        @AuraEnabled public Decimal duplicateRatePercent { get; set; }
        @AuraEnabled public List<DuplicateCluster> clusters { get; set; }
    }

    public class DuplicateCluster {
        @AuraEnabled public String matchType { get; set; }
        @AuraEnabled public String clusterKey { get; set; }
        @AuraEnabled public Integer recordCount { get; set; }
        @AuraEnabled public List<Id> recordIds { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static DuplicateRateSummary calculateDuplicateRate(String objectScope) {
        try {
            DuplicateRateSummary summary = new DuplicateRateSummary();
            summary.clusters = new List<DuplicateCluster>();
            Set<Id> duplicateRecordIds = new Set<Id>();

            // Query active Leads with demographic attributes
            List<Lead> leads = [
                SELECT Id, FirstName, LastName, Email, Phone, Country, PostalCode, Title, LeadSource 
                FROM Lead 
                WHERE IsConverted = false 
                ORDER BY CreatedDate DESC 
                LIMIT 5000
            ];

            summary.totalRecords = leads.size();
            if (leads.isEmpty()) {
                summary.duplicateCount = 0;
                summary.duplicateRatePercent = 0.0;
                return summary;
            }

            Map<String, List<Id>> emailClusters = new Map<String, List<Id>>();
            Map<String, List<Id>> phoneClusters = new Map<String, List<Id>>();

            for (Lead ld : leads) {
                String fn = ld.FirstName != null ? ld.FirstName.trim().toLowerCase() : '';
                String ln = ld.LastName != null ? ld.LastName.trim().toLowerCase() : '';
                String ctry = ld.Country != null ? ld.Country.trim().toUpperCase() : '';
                String zip = ld.PostalCode != null ? ld.PostalCode.trim() : '';
                String ttl = ld.Title != null ? ld.Title.trim().toLowerCase() : '';
                String demoKey = fn + '|' + ln + '|' + ctry + '|' + zip + '|' + ttl;

                // Match by Email + Demographics
                if (String.isNotBlank(ld.Email)) {
                    String emailKey = demoKey + '|EMAIL:' + ld.Email.trim().toLowerCase();
                    if (!emailClusters.containsKey(emailKey)) {
                        emailClusters.put(emailKey, new List<Id>());
                    }
                    emailClusters.get(emailKey).add(ld.Id);
                }

                // Match by Phone + Demographics
                if (String.isNotBlank(ld.Phone)) {
                    String cleanPhone = ld.Phone.replaceAll('[^0-9]', '');
                    if (String.isNotBlank(cleanPhone)) {
                        String phoneKey = demoKey + '|PHONE:' + cleanPhone;
                        if (!phoneClusters.containsKey(phoneKey)) {
                            phoneClusters.put(phoneKey, new List<Id>());
                        }
                        phoneClusters.get(phoneKey).add(ld.Id);
                    }
                }
            }

            // Collect Email Duplicate Clusters
            for (String key : emailClusters.keySet()) {
                List<Id> ids = emailClusters.get(key);
                if (ids.size() > 1) {
                    duplicateRecordIds.addAll(ids);
                    DuplicateCluster cl = new DuplicateCluster();
                    cl.matchType = 'EMAIL_MATCH';
                    cl.clusterKey = key;
                    cl.recordCount = ids.size();
                    cl.recordIds = ids;
                    summary.clusters.add(cl);
                }
            }

            // Collect Phone Duplicate Clusters
            for (String key : phoneClusters.keySet()) {
                List<Id> ids = phoneClusters.get(key);
                if (ids.size() > 1) {
                    duplicateRecordIds.addAll(ids);
                    DuplicateCluster cl = new DuplicateCluster();
                    cl.matchType = 'PHONE_MATCH';
                    cl.clusterKey = key;
                    cl.recordCount = ids.size();
                    cl.recordIds = ids;
                    summary.clusters.add(cl);
                }
            }

            summary.duplicateCount = duplicateRecordIds.size();
            summary.duplicateRatePercent = summary.totalRecords > 0 
                ? (((Decimal)summary.duplicateCount / summary.totalRecords) * 100.0).setScale(2)
                : 0.0;

            return summary;
        } catch (Exception ex) {
            throw new AuraHandledException('Error calculating duplicate rate: ' + ex.getMessage());
        }
    }
}
`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("opportunity")) {
    apexScript = `// Apex Controller Implementation for: ${metricName}
public with sharing class ${kpi.id.replace("-", "")}_QuarterController {
    
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getQuarterlyMetrics(String regionFilter) {
        try {
            Map<String, Object> resultMap = new Map<String, Object>();
            
            String query = 'SELECT Region__c region, IsWon isWon, COUNT(Id) totalCount, SUM(Amount) totalArr ' +
                           'FROM Opportunity ' +
                           'WHERE IsClosed = true AND CloseDate = LAST_QUARTER ';
            if (String.isNotBlank(regionFilter) && regionFilter != 'All') {
                query += 'AND Region__c = :regionFilter ';
            }
            query += 'GROUP BY Region__c, IsWon';
            
            List<AggregateResult> results = Database.query(String.escapeSingleQuotes(query));
            resultMap.put('records', results);
            resultMap.put('status', 'SUCCESS');
            return resultMap;
        } catch (Exception ex) {
            throw new AuraHandledException('Unable to compute quarterly metric: ' + ex.getMessage());
        }
    }
}`;
  } else if (isLastQuarter && metricName.toLowerCase().includes("lead")) {
    apexScript = `// Apex Controller Implementation for: ${metricName}
public with sharing class ${kpi.id.replace("-", "")}_QuarterController {
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getLeadQuarterMetrics(String sourceFilter) {
        try {
            String query = 'SELECT LeadSource source, Status status, IsConverted isConverted, COUNT(Id) leadCount ' +
                           'FROM Lead ' +
                           'WHERE CreatedDate = LAST_QUARTER ';
            if (String.isNotBlank(sourceFilter) && sourceFilter != 'All') {
                query += 'AND LeadSource = :sourceFilter ';
            }
            query += 'GROUP BY LeadSource, Status, IsConverted';
            
            return Database.query(String.escapeSingleQuotes(query));
        } catch (Exception ex) {
            throw new AuraHandledException('Unable to compute lead metric: ' + ex.getMessage());
        }
    }
}`;
  } else {
    apexScript = `// Apex Controller Implementation for: ${metricName}
public with sharing class ${kpi.id.replace("-", "")}_MetricController {
    
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> fetchKPIData(String regionFilter) {
        try {
            String query = 'SELECT Region__c region, StageName stage, SUM(Amount) totalAmount, COUNT(Id) totalCount ' +
                           'FROM Opportunity ' +
                           'WHERE IsClosed = false ';
            if (String.isNotBlank(regionFilter) && regionFilter != 'All') {
                query += 'AND Region__c = :regionFilter ';
            }
            query += 'GROUP BY Region__c, StageName ORDER BY SUM(Amount) DESC LIMIT 100';
            
            return Database.query(String.escapeSingleQuotes(query));
        } catch (Exception ex) {
            throw new AuraHandledException('Unable to compute metric: ' + ex.getMessage());
        }
    }
}`;
  }

  return {
    googleSheets: googleSheetsScript,
    excel: excelScript,
    java: javaScript,
    python: pythonScript,
    json: jsonScript,
    sql: sqlScript,
    soql: soqlScript,
    apex: apexScript
  };
}
