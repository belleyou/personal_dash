export interface GTMVendor {
  vendor: string;
  category: string;
  coreFunctionality: string;
  example1SignalSSOT: string; // e.g. "Match an inbound form lead to the correct account using domain plus fuzzy company name."
  example2EngageCPQ: string;  // e.g. "Dedupe contacts by normalized email and retain the record with the freshest enrichment."
  availability: string;       // "Core / built-in", "Verified Partner", "AppExchange / Native", "Community / HTTP"
  indicativePricing: string;
  customerSize: string[]; // ['SMB', 'MMS', 'LCS']
  aiFeatures: string;
  integrations: string; // n8n Integrations
  n8nIntegrations?: string; // alias
  salesforceIntegration: string;
  claudeIntegration: string;
  codexIntegration: string;
  llmCapability: string;
  n8nNode: string;
  n8nNodeIcon: string;
  connectVia: "Native" | "Webhook" | "HTTP Request" | string;
  description?: string;
  keyWorkflows?: string[];
  samplePayload?: Record<string, any>;
  outOfBoxActions?: {
    action: string;
    description: string;
    endpoint?: string;
    method?: string;
    inputSchema?: Record<string, string>;
  }[];
}

export const RAW_GTM_CSV = `
"Vendor","Category","Core functionality","Indicative pricing","Customer size","AI features","Integrations","LLM capability","n8n node","n8n node logo/icon","Connect via"
"6sense","ABM & intent","Identify, prioritize and engage target accounts","Custom / contact sales","MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"Abstract API","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Acoustic Campaign","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Act-On","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"ActiveCampaign","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","Broad ecosystem + native n8n node","Built-in / assisted","ActiveCampaign","https://n8n.io/nodes/activecampaign.svg","Native"
"Adapt.io","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Adobe Campaign","Marketing automation","Create, personalize and measure lifecycle campaigns","Custom / contact sales","MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Adobe Experience Manager","Content & social","Create, manage and distribute brand content","Custom / contact sales","MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Adyen","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Affinity","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Affirm","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Agorapulse","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Aha!","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Ahrefs","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Aircall","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Airtable","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Airtable","https://n8n.io/nodes/airtable.svg","Native"
"Airwallex","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Albacross","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Allbound","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Aloware","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Amplemarket","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Amplitude","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Anaplan","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Apollo Data","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Apollo.io","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Appcues","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Apple App Store","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Apptivo","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Asana","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Asana","https://n8n.io/nodes/asana.svg","Native"
"Ashby","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Atrium","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Attio","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Autopilot","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Avalara","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Aviso","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"AWS","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Basecamp","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Beamer","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"BigCommerce","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Bigin by Zoho","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"BigQuery","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","BigQuery","https://n8n.io/nodes/google-bigquery.svg","Native"
"Bill.com","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Bizzabo","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Bloomreach Engagement","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Bluecore","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Bombora","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"BoostUp","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Box","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Braintree","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Brandwatch","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Braze","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Brevo","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","Broad ecosystem + native n8n node","Built-in / assisted","Brevo","https://n8n.io/nodes/brevo.svg","Native"
"Brex","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"BriteVerify","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Buffer","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"BuiltWith","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Bynder","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Calendly","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Campaign Monitor","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Canny","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Canva","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Capsule CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Catalyst","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Chameleon","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Champify","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Channeltivity","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Chargebee","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","Chargebee","https://n8n.io/nodes/chargebee.png","Native"
"Checkout.com","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Chili Piper","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Chorus by ZoomInfo","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"ChurnZero","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"Cin7","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Clari","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Custom / contact sales","MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Claude AI","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Clay","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Clearbit","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","Broad ecosystem + native n8n node","Via API or workflow","Clearbit","https://n8n.io/nodes/clearbit.svg","Native"
"ClickUp","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","ClickUp","https://n8n.io/nodes/clickup.svg","Native"
"ClientSuccess","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Close","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"CloudTalk","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Coda","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Cognism","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Common Room","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Confluence","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"ConnectAndSell","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Constant Contact","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"ContactOut","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Contentful","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Contentsquare","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Copper","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Copper","https://n8n.io/nodes/copper.svg","Native"
"Copy.ai","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Cordial","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"CoSchedule","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Coupa","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Creatio","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Crossbeam","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Crunchbase","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Cursor","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Custify","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Customer.io","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","Broad ecosystem + native n8n node","Built-in / assisted","Customer.io","https://n8n.io/nodes/customerio.svg","Native"
"Cvent","Productivity & events","Coordinate work, meetings, forms and events","Custom / contact sales","MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"Data Axle","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Databricks","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Databricks","https://n8n.io/nodes/databricks.svg","Native"
"Datanyze","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Daylite","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Dealfront","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Demandbase","ABM & intent","Identify, prioritize and engage target accounts","Custom / contact sales","MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"DemandTools","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Descript","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Dialpad","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Discord","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Discord","https://n8n.io/nodes/discord.svg","Native"
"Dixa","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Document360","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Domo","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Doodle","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Dotdigital","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Dreamdata","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Drip","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Dripify","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Dropbox","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Dropcontact","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Dun & Bradstreet","Data & enrichment","Find, verify and enrich company and contact data","Custom / contact sales","MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Dux-Soup","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Ebsta","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Emarsys","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Encharge","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"EspoCRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Eventbrite","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"EverAfter","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Expandi","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Expensify","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Facebook","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","Facebook","https://n8n.io/nodes/facebook-graph-api.svg","Native"
"Factors","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Factors.ai","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Fathom Analytics","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Figma","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Five9","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Folk","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Foundry ABM","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"FreshBooks","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Freshdesk","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","Broad ecosystem + native n8n node","Via API or workflow","Freshdesk","https://n8n.io/nodes/freshdesk.svg","Native"
"Freshsales","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Freshsales","https://n8n.io/nodes/freshworks-crm.svg","Native"
"Front","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"FullContact","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"FullStory","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"G2","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Gainsight","Customer success","Onboard, support and retain customers","Custom / contact sales","MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"GetResponse","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Ghost","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"GitHub","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","GitHub","https://n8n.io/nodes/github.svg","Native"
"Gladly","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Glassbox","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"GoCardless","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Gong","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Custom / contact sales","MMS | LCS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Gong","https://n8n.io/nodes/gong.svg","Native"
"Google Ads","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","Broad ecosystem + native n8n node","Built-in / assisted","Google Ads","https://n8n.io/nodes/google-ads.svg","Native"
"Google Analytics","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Google Analytics","https://n8n.io/nodes/google-analytics.svg","Native"
"Google Calendar","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Google Chat","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Google Chat","https://n8n.io/nodes/google-chat.svg","Native"
"Google Docs","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Google Docs","https://n8n.io/nodes/google-docs.svg","Native"
"Google Forms","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Google Mail (Gmail)","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Google Mail (Gmail)","https://n8n.io/nodes/gmail.svg","Native"
"Google Play Store","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Google Sheets","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Google Sheets","https://n8n.io/nodes/google-sheets.svg","Native"
"Google Slides","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Google Slides","https://n8n.io/nodes/google-slides.svg","Native"
"Google Workspace","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Grammarly Business","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Granola","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Grok AI","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Groove","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Groq","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Groq","https://n8n.io/nodes/groq-chat-model.svg","Native"
"Guru","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Heap","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Height","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Help Scout","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Helpjuice","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Hex","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"HG Insights","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Highspot","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Hook","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Hootsuite","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Hotjar","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"HubSpot","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","HubSpot","https://n8n.io/nodes/hubspot.svg","Native"
"HubSpot Marketing Hub","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Hunter","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","Broad ecosystem + native n8n node","Via API or workflow","Hunter","https://n8n.io/nodes/hunter.png","Native"
"Hushly","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Impartner","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Influ2","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Insider","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Insightly","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Instagram","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Instantly","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Intentsify","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Intercom","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","Broad ecosystem + native n8n node","Via API or workflow","Intercom","https://n8n.io/nodes/intercom.svg","Native"
"Iterable","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Jabmo","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Jasper","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Jira","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Jira","https://n8n.io/nodes/jira-software.svg","Native"
"Jotform","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"JustCall","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Kaspr","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Keap","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Keap","https://n8n.io/nodes/keap.png","Native"
"Kickbox","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"KickFire","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Kixie","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Klarna","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Klaviyo","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Klenty","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Koala","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Kustomer","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Kwanzoo","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Kylas","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LaGrowthMachine","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"LangChain","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","LangChain Code","https://api.iconify.design/fa-solid/code.svg?color=%23ff6b35","Native"
"Later","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Lead Forensics","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Lead411","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Leadfeeder","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LeadGenius","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LeadIQ","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LeadRebel","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Leadspace","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LeadSquared","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LeanData","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Lemlist","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Less Annoying CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LINE","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Linear","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"LinkedIn","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","LinkedIn","https://n8n.io/nodes/linkedin.svg","Native"
"Listrak","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Livestorm","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"LogRocket","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Looker","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Custom / contact sales","MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Looker Studio","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Loom","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Loomly","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Loopy Loyalty","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Lucky Orange","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Lusha","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"MadKudu","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Magento / Adobe Commerce","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Mailchimp","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","Broad ecosystem + native n8n node","Built-in / assisted","Mailchimp","https://n8n.io/nodes/mailchimp.svg","Native"
"Mailshake","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Marketo Engage","Marketing automation","Create, personalize and measure lifecycle campaigns","Custom / contact sales","MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Maropost","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Matomo","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mautic","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Maxio","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Melissa","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Meltwater","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Membrain","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Mention","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mercury","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Messages (SMS)","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Metabase","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Metadata.io","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Metaplane","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Metricool","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Microsoft 365","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Microsoft Dynamics 365","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Custom / contact sales","MMS | LCS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Microsoft Dynamics 365","https://n8n.io/nodes/microsoft-dynamics-crm.svg","Native"
"Microsoft Excel","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Microsoft Excel","https://n8n.io/nodes/microsoft-excel.svg","Native"
"Microsoft Outlook","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Microsoft SQL Server","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Microsoft SQL Server","https://n8n.io/nodes/microsoft-sql.svg","Native"
"Microsoft Teams","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Microsoft Teams","https://n8n.io/nodes/microsoft-teams.svg","Native"
"Miro","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Mixmax","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mixpanel","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Mode","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"MoEngage","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mollie","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Monday Sales CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Monday.com","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Monday.com","https://n8n.io/nodes/mondaycom.svg","Native"
"MongoDB","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","MongoDB","https://n8n.io/nodes/mongodb.svg","Native"
"Monte Carlo","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mouseflow","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Moz Pro","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Mural","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"MySQL","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","MySQL","https://n8n.io/nodes/mysql.svg","Native"
"Navan","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"NetSuite","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Custom / contact sales","MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"NeverBounce","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Nimble","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Nooks","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Notion","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Nutshell","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Ocean.io","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Odoo Accounting","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Odoo CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Omnisend","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"ON24","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"OnePageCRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Ontraport","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"OpenAI","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","OpenAI","https://n8n.io/nodes/openai.svg","Native"
"Oracle CX Sales","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Custom / contact sales","MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Oracle Eloqua","Marketing automation","Create, personalize and measure lifecycle campaigns","Custom / contact sales","MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Ortto","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Orum","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Otter.ai","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Outplay","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Outreach","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"Overloop","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Owler","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Paddle","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"Paperflite","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Paperform","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Parative","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Pardot Account Engagement","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"PartnerStack","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"PathFactory","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"PayPal","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","PayPal","https://n8n.io/nodes/paypal.svg","Native"
"Pendo","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"People Data Labs","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"People.ai","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"PersistIQ","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"PhoneBurner","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Pipedrive","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Pipedrive","https://n8n.io/nodes/pipedrive.svg","Native"
"Pipeline CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Planable","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Planhat","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Plausible","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Postgres","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Postgres","https://n8n.io/nodes/postgres.svg","Native"
"PostHog","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Power BI","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Custom / contact sales","MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Productboard","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Proxycurl","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Pylon","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Qlik Sense","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"QuickBooks Online","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","QuickBooks Online","https://n8n.io/nodes/quickbooks-online.svg","Native"
"QuickChart","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","QuickChart","https://n8n.io/nodes/quickchart.svg","Native"
"QuickMail","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Ramp","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Really Simple Systems","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Recurly","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Reddit","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Regie.ai","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Reply.io","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Retell.io","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Reveal","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Revenue Grid","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"RingCentral","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Rippling","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"RocketReach","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"RollWorks","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"RudderStack","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"SaaSGrid","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Sage Intacct","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Sailthru","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Salesflare","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Salesforce","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Custom / contact sales","MMS | LCS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Salesforce","https://n8n.io/nodes/salesforce.svg","Native"
"Saleshandy","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Salesloft","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","Webhook"
"SalesManago","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Salesmate","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Sanity","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"SAP Sales Cloud","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Custom / contact sales","MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Savio","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"SavvyCal","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Scratchpad","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Seamless.AI","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Segment","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Seismic","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Selligent","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Semrush","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Sendible","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"SharpSpring","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"ShipStation","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Shopify","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","Shopify","https://n8n.io/nodes/shopify.svg","Native"
"Showpad","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Sigma","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"SignalHire","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Sisense","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Skylead","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Slack","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Slack","https://n8n.io/nodes/slack.svg","Native"
"Slintel","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"SmartKarrot","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Smartlead","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Smartsheet","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Snitcher","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Snov.io","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS | LCS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Snowflake","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","Broad ecosystem + native n8n node","Built-in / assisted","Snowflake","https://n8n.io/nodes/snowflake.svg","Native"
"SocialBee","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Splash","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Spotify","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","Spotify","https://n8n.io/nodes/spotify.svg","Native"
"Sprout Social","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Square","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Staircase AI","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Streak","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Stripe","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","Stripe","https://n8n.io/nodes/stripe.svg","Native"
"SugarCRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"SuiteCRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"SupportLogic","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Surfer SEO","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Swordfish AI","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Tableau","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Custom / contact sales","MMS | LCS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Talkwalker","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Tally","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"TechTarget Priority Engine","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Terminus","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"The company’s website","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"ThoughtSpot","Analytics & intelligence","Analyze buyer activity, calls and revenue performance","Free–custom","SMB | MMS","Conversation AI, forecasting and anomaly detection","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Threads","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"TikTok","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Tipalti","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS | LCS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Todoist","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Tomba","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Totango","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Traction Complete","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Trello","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Trello","https://n8n.io/nodes/trello.svg","Native"
"Triblio","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Twenty","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS | LCS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Twilio","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","Broad ecosystem + native n8n node","Built-in / assisted","Twilio","https://n8n.io/nodes/twilio.svg","Native"
"Twitch","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Typeform","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Uberflip","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"UpdateAI","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"UpLead","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"UserGems","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Userpilot","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"VanillaSoft","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Vector","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Velaris","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Vidyard","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Visitor Queue","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Vitally","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Voila Norbert","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS | LCS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Vtiger","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Waalaxy","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"WalkMe","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Wappalyzer","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Warmly","ABM & intent","Identify, prioritize and engage target accounts","Custom / annual","SMB | MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Wave","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"WebEngage","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS | LCS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Webflow","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","Webflow","https://n8n.io/nodes/webflow.svg","Native"
"WeChat","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Whatfix","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"WhatsApp","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","WhatsApp","https://n8n.io/nodes/whatsapp-business-cloud.svg","Native"
"Wise Business","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Wistia","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"WooCommerce","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","WooCommerce","https://n8n.io/nodes/woocommerce.svg","Native"
"Woodpecker","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"WordPress","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","WordPress","https://n8n.io/nodes/wordpress.svg","Native"
"Workday","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Worldpay","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Wrike","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS | LCS","Assistants, summaries and workflow generation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Writer","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"X","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS | LCS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","X","https://n8n.io/nodes/twitter.svg","Native"
"Xero","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","Broad ecosystem + native n8n node","Via API or workflow","Xero","https://n8n.io/nodes/xero.svg","Native"
"Yesware","Sales engagement","Automate prospecting, sequences, calls and rep activity","$49–$150+/user/mo","SMB | MMS","AI email, call coaching, prospect research","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"YouTube","Content & social","Create, manage and distribute brand content","Free–$249+/mo","SMB | MMS","Generative content and brand insights","Broad ecosystem + native n8n node","Built-in / assisted","YouTube","https://n8n.io/nodes/youtube.png","Native"
"ZapScale","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Zendesk","Customer success","Onboard, support and retain customers","$20+/seat or custom","SMB | MMS | LCS","Health scoring, summaries and support copilots","Broad ecosystem + native n8n node","Via API or workflow","Zendesk","https://n8n.io/nodes/zendesk.svg","Native"
"Zendesk Sell","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"ZeroBounce","Data & enrichment","Find, verify and enrich company and contact data","Free credits–custom","SMB | MMS","AI research, matching and enrichment","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
"Zeta Marketing Platform","Marketing automation","Create, personalize and measure lifecycle campaigns","Free–custom","SMB | MMS","Content generation, segmentation, optimization","API, webhooks and partner connectors","Built-in / assisted","—","No native node","HTTP Request"
"Zoho CRM","CRM & revenue","Manage accounts, contacts, pipeline and forecasting","Free–$25+/user/mo","SMB | MMS","Lead scoring, summaries, next-best action","Broad ecosystem + native n8n node","Via API or workflow","Zoho CRM","https://n8n.io/nodes/zoho-crm.svg","Native"
"Zoom","Productivity & events","Coordinate work, meetings, forms and events","Free–$30+/user/mo","SMB | MMS","Assistants, summaries and workflow generation","Broad ecosystem + native n8n node","Via API or workflow","Zoom","https://n8n.io/nodes/zoom.svg","Native"
"ZoomInfo","ABM & intent","Identify, prioritize and engage target accounts","Custom / contact sales","MMS | LCS","Intent scoring and account recommendations","API, webhooks and partner connectors","Via API or workflow","—","No native node","Webhook"
"Zuora","Commerce & payments","Run commerce, billing, subscriptions and finance ops","Usage-based / custom","SMB | MMS","Fraud, recommendations and finance automation","API, webhooks and partner connectors","Via API or workflow","—","No native node","HTTP Request"
`;

// Specific Integration Resolvers for Enterprise Systems
const VENDOR_AI_OVERVIEWS: Record<string, string> = {
  "pylon": "Pylon is an AI-native customer support platform built specifically for B2B companies to manage and automate support interactions across channels like Slack Connect, Microsoft Teams, Discord, and email.",
  "6sense": "6sense is an AI-driven account-based marketing (ABM) and revenue platform that captures buyer intent, deanonymizes web traffic, and uncovers in-market accounts for B2B revenue teams.",
  "abstract api": "Abstract API is a suite of modern API microservices built for developers to validate emails, geolocate IP addresses, format phone numbers, and enrich company data.",
  "acoustic campaign": "Acoustic Campaign is a cloud-based marketing automation platform that enables digital marketers to deliver personalized multichannel campaigns across email, SMS, and mobile push.",
  "act-on": "Act-On is a marketing automation platform built to streamline inbound and outbound demand generation, lead scoring, email nurturing, and customer lifecycle engagement.",
  "activecampaign": "ActiveCampaign is a customer experience automation platform that combines email marketing, marketing automation, and CRM tools to orchestrate personalized customer journeys.",
  "adapt.io": "Adapt.io is a B2B lead generation and data enrichment platform that provides verified contact information, business emails, and firmographic intelligence for sales prospecting.",
  "adobe campaign": "Adobe Campaign is an enterprise cross-channel marketing platform that unifies online and offline customer data to orchestrate complex personalized marketing journeys at scale.",
  "adobe experience manager": "Adobe Experience Manager (AEM) is an enterprise content and digital asset management platform that enables organizations to author, govern, and deliver personalized digital experiences.",
  "adyen": "Adyen is a global financial technology platform providing end-to-end payment processing, data insights, and financial management across online, mobile, and in-store point-of-sale channels.",
  "affinity": "Affinity is a relationship intelligence CRM built for private capital and dealmaking teams to automatically capture relationship graphs, track pipelines, and manage network intelligence.",
  "affirm": "Affirm is a financial technology payment platform offering point-of-sale consumer financing and Buy Now, Pay Later (BNPL) solutions for digital commerce merchants.",
  "agorapulse": "Agorapulse is a social media management platform that helps marketing teams publish content, monitor brand conversations, engage audiences, and measure social ROI.",
  "aha!": "Aha! is a product management and roadmapping suite designed for software teams to establish strategy, capture user feedback, prioritize features, and manage visual release plans.",
  "ahrefs": "Ahrefs is an SEO and digital marketing software suite that provides backlink analysis, keyword research, competitor intelligence, and website rank tracking.",
  "aircall": "Aircall is a cloud-based voice and call center software platform built for modern sales and support teams to manage phone interactions with CRM integrations.",
  "airtable": "Airtable is a cloud-based relational database and low-code workflow platform that combines spreadsheet flexibility with database power to organize cross-functional GTM operations.",
  "airwallex": "Airwallex is a global payments and financial platform that enables businesses to accept payments, manage multi-currency accounts, issue corporate cards, and execute international transfers.",
  "albacross": "Albacross is a B2B intent data and website visitor identification platform that deanonymizes website traffic to generate qualified inbound sales leads.",
  "allbound": "Allbound is a partner relationship management (PRM) platform designed to onboard, train, manage, and collaborate with channel partners, resellers, and distributors.",
  "aloware": "Aloware is a contact center and sales engagement solution that provides automated SMS messaging, cloud calling, and multi-channel power dialers for sales teams.",
  "amplemarket": "Amplemarket is an AI-powered sales engagement platform that unifies B2B lead generation, email deliverability, automated multi-channel sequences, and AI messaging.",
  "amplitude": "Amplitude is a digital analytics platform that tracks user behavior across digital products to optimize conversion funnels, retention, and customer journeys.",
  "anaplan": "Anaplan is a cloud-native enterprise planning and business modeling platform that connects financial, sales, supply chain, and operational forecasting across organizations.",
  "apollo data": "Apollo Data is a B2B database engine providing verified contact emails, phone numbers, and company firmographics for automated lead enrichment.",
  "apollo.io": "Apollo.io is an all-in-one sales intelligence and engagement platform that combines B2B contact data, email verification, AI sequencing, and automated outreach workflows.",
  "appcues": "Appcues is a product adoption and user onboarding platform that enables non-technical product teams to design in-app walkthroughs, tooltips, modals, and user surveys.",
  "apple app store": "Apple App Store is a digital distribution platform for iOS and macOS applications providing app hosting, in-app purchase billing, and developer ecosystem telemetry.",
  "apptivo": "Apptivo is an integrated cloud business suite offering CRM, invoicing, project management, and supply chain tracking for small to mid-sized businesses.",
  "asana": "Asana is a collaborative work and project management platform that coordinates team initiatives, tracks milestones, and automates operational workflows across organizations.",
  "ashby": "Ashby is an all-in-one talent acquisition and applicant tracking system (ATS) with advanced recruiting analytics, candidate scheduling, and automated sourcing workflows.",
  "atrium": "Atrium is a data-driven sales performance and management platform that continuously monitors rep KPIs, diagnoses coaching opportunities, and forecasts attainment.",
  "attio": "Attio is a customizable, AI-native CRM platform that automatically enriches contacts, maps relational data models, and unifies customer data for fast-growing companies.",
  "autopilot": "Autopilot is a visual marketing automation platform that connects customer data to orchestrate behavioral email, SMS, and multi-channel customer journeys.",
  "avalara": "Avalara is a cloud-based tax compliance platform that automates sales tax calculation, exemption certificate management, and tax filing across global jurisdictions.",
  "aviso": "Aviso is an AI-guided revenue forecasting and deal intelligence platform that inspects pipeline risk, coaches sales reps, and optimizes revenue predictability.",
  "aws": "Amazon Web Services (AWS) is a comprehensive cloud computing platform offering scalable compute power, database storage, machine learning, and infrastructure services.",
  "basecamp": "Basecamp is a project management and team communication software that combines message boards, to-do lists, schedules, and file sharing in a simple interface.",
  "beamer": "Beamer is a product communication and changelog tool that allows software companies to announce product updates, gather user feedback, and drive feature adoption.",
  "bigcommerce": "BigCommerce is an open SaaS enterprise ecommerce platform providing online storefront creation, multi-channel selling, checkout customization, and headless commerce.",
  "bigin by zoho": "Bigin by Zoho is a lightweight, pipeline-centric CRM designed for small businesses to manage deals, track customer contacts, and streamline sales activities.",
  "bigquery": "Google BigQuery is a serverless, multi-cloud enterprise data warehouse designed for high-speed SQL analytics and machine learning over massive datasets.",
  "bill.com": "Bill.com is a cloud-based financial automation software that streamlines accounts payable, accounts receivable, expense management, and electronic payments.",
  "bizzabo": "Bizzabo is an event experience operating system that powers in-person, virtual, and hybrid conferences with registration, ticketing, and attendee networking.",
  "bloomreach engagement": "Bloomreach Engagement is an AI-powered customer data and experience platform that combines real-time CDP capabilities with omnichannel marketing automation.",
  "bluecore": "Bluecore is a retail marketing platform that connects customer identity with product catalog data to trigger real-time, predictive lifecycle marketing campaigns.",
  "bombora": "Bombora is a B2B intent data provider that measures aggregate business research activity across an extensive publisher data cooperative to identify in-market buying accounts.",
  "boostup": "BoostUp is a revenue operations and intelligence platform that unifies CRM data, call recordings, and email interactions to automate forecasting and pipeline inspection.",
  "box": "Box is a secure cloud content management and file-sharing platform that enables enterprise collaboration, automated document workflows, and governance compliance.",
  "braintree": "Braintree is a full-stack payment platform by PayPal that allows merchants to accept card payments, digital wallets, and local payment methods globally.",
  "brandwatch": "Brandwatch is a digital consumer intelligence and social listening platform that analyzes billions of online conversations to uncover consumer trends and brand sentiment.",
  "braze": "Braze is a customer engagement platform that automates real-time, multi-channel messaging across mobile push, email, SMS, and in-app notifications.",
  "brevo": "Brevo is an all-in-one marketing and CRM suite that enables businesses to manage email campaigns, transactional messaging, SMS, WhatsApp, and sales pipelines.",
  "brex": "Brex is a financial platform providing corporate credit cards, expense management, business bank accounts, and automated spend controls for scaling companies.",
  "briteverify": "BriteVerify is an email verification and data validation service by Validity that cleans email lists in real time to protect sender reputation and deliverability.",
  "buffer": "Buffer is an intuitive social media toolkit for small businesses to plan, schedule, publish content, and analyze social media performance across networks.",
  "builtwith": "BuiltWith is a website profiler and competitive intelligence tool that tracks the technology stacks, software adoption, and ecommerce trends of websites globally.",
  "bynder": "Bynder is a digital asset management (DAM) platform that centralizes brand asset storage, streamlines creative approvals, and ensures brand consistency across channels.",
  "calendly": "Calendly is a cloud scheduling automation platform that eliminates back-and-forth emails to book meetings, demos, and interviews across teams.",
  "campaign monitor": "Campaign Monitor is an email marketing platform that provides drag-and-drop campaign design, audience segmentation, and automated customer journeys.",
  "canny": "Canny is a customer feedback management platform that captures, organizes, and analyzes product requests from users to guide product roadmaps.",
  "canva": "Canva is an online graphic design platform that provides intuitive drag-and-drop design tools, brand kits, and templates for creating digital and visual assets.",
  "capsule crm": "Capsule CRM is a simple online CRM platform that helps small businesses track contacts, manage sales pipelines, and organize customer communication history.",
  "catalyst": "Catalyst is a customer success platform designed for modern CS teams to integrate customer data, monitor account health, and automate retention workflows.",
  "chameleon": "Chameleon is a digital adoption platform that enables software teams to build interactive product tours, in-app banners, tooltips, and micro-surveys.",
  "champify": "Champify is a sales intelligence platform that tracks former customer champions when they change jobs to generate warm outbound sales opportunities.",
  "channeltivity": "Channeltivity is a partner relationship management (PRM) platform for high-tech companies to manage channel partner portals, deal registration, and co-marketing.",
  "chargebee": "Chargebee is a subscription billing and revenue management platform that automates recurring invoicing, tax compliance, and quote-to-cash workflows.",
  "chili piper": "Chili Piper is an inbound conversion platform that automates instant qualification, round-robin lead routing, and calendar scheduling directly from web forms.",
  "clearbit": "Clearbit is a B2B data activation engine that enriches inbound leads with real-time firmographic and technographic attributes to streamline routing and qualification.",
  "clari": "Clari is a revenue platform that uses AI and historical pipeline data to inspect deal health, eliminate revenue leaks, and deliver automated sales forecasting.",
  "cognism": "Cognism is a B2B sales intelligence platform that provides verified phone numbers, business emails, and GDPR-compliant intent data for outbound prospecting.",
  "demandbase": "Demandbase is an AI-powered ABM and B2B go-to-market platform that combines intent data, account identification, advertising, and sales intelligence.",
  "docusign": "DocuSign is an electronic signature and agreement lifecycle platform that automates document signing, contract management, and compliance workflows.",
  "gong": "Gong is a revenue intelligence platform that captures and analyzes customer interactions across video calls, phone calls, and emails to provide AI-powered deal insights and pipeline forecasting.",
  "hubspot": "HubSpot is an inbound CRM, marketing, and customer service platform that unifies lead generation, multi-touch attribution, and lifecycle automation for scaling businesses.",
  "leandata": "LeanData is a revenue orchestration platform built natively on Salesforce that automates lead-to-account matching, routing, and complex multi-object territory governance.",
  "outreach": "Outreach is an enterprise sales execution platform that automates multi-channel sales engagement sequences, rep activity tracking, and pipeline management.",
  "salesforce": "Salesforce is a cloud-based CRM platform that manages sales pipelines, customer interactions, account hierarchies, and automated revenue operations across global enterprises.",
  "salesloft": "Salesloft is an AI-powered revenue engagement platform that helps sales teams execute orchestrated digital cadences, track buyer interactions, and forecast deals.",
  "snowflake": "Snowflake is a cloud data warehouse and analytics platform that enables scalable data storage, real-time querying, and unified business intelligence processing.",
  "stripe": "Stripe is a financial infrastructure and payment processing platform that enables businesses to accept online payments, manage subscription billing, and automate revenue recognition.",
  "zendesk": "Zendesk is a customer service and support platform that streamlines ticket management, omnichannel help desks, self-service knowledge bases, and customer interactions.",
  "zoominfo": "ZoomInfo is a B2B intelligence and go-to-market platform that delivers verified business contact data, company insights, intent signals, and CRM automated enrichment."
};

function getEnhancedCoreFunctionality(vendorName: string, category: string, raw: string): string {
  const v = vendorName.toLowerCase().trim();
  const cat = category.toLowerCase().trim();

  // 1. Direct dictionary match
  if (VENDOR_AI_OVERVIEWS[v]) {
    return VENDOR_AI_OVERVIEWS[v];
  }

  // 2. Substring match against known key vendors
  for (const [key, overview] of Object.entries(VENDOR_AI_OVERVIEWS)) {
    if (v.includes(key) || key.includes(v)) {
      return overview;
    }
  }

  // 3. Specialized n8n core node overviews
  if (v.includes("aggregate")) {
    return "The Aggregate node is a data manipulation utility in n8n that combines multiple incoming data items into arrays or unified lists for batch processing.";
  }
  if (v.includes("ai agent") || v.includes("agent")) {
    return "The AI Agent node is an autonomous reasoning engine in n8n that connects LLMs to custom tools, memory stores, and APIs to execute multi-step workflows.";
  }
  if (v.includes("basic llm") || v.includes("llm")) {
    return "The Basic LLM Chain node is an AI orchestration tool in n8n that prompts large language models and outputs structured text or parsed JSON.";
  }
  if (v.includes("chat trigger")) {
    return "The Chat Trigger node is an event listener in n8n that initiates automated workflows directly from inbound user chat messages and conversational interfaces.";
  }
  if (v.includes("code") && !v.includes("codex")) {
    return "The Code node is an execution environment in n8n that runs custom JavaScript or Python code to transform data payloads and apply algorithmic logic.";
  }
  if (v.includes("compression")) {
    return "The Compression node is a file utility in n8n that zips, unzips, compresses, and decompresses binary files and asset bundles within workflows.";
  }
  if (v.includes("convert to file")) {
    return "The Convert to File node is a document utility in n8n that converts JSON, CSV, HTML, or raw text data into downloadable binary files.";
  }
  if (v.includes("crypto")) {
    return "The Crypto node is a cryptographic security tool in n8n that generates hashes, HMAC signatures, encryption keys, and secure tokens for API authorization.";
  }
  if (v.includes("data table")) {
    return "The Data Table node is an in-memory data store in n8n that enables workflows to read, write, query, and cache structured records across executions.";
  }
  if (v.includes("date & time")) {
    return "The Date & Time node is a temporal processing utility in n8n that parses, formats, adds, subtracts, and normalizes timestamps across timezones.";
  }

  // 4. Synthesized Google Search AI Overview by Category
  if (cat.includes("abm") || cat.includes("intent")) {
    return `${vendorName} is an account-based marketing (ABM) and B2B intent platform designed to identify in-market accounts, capture buyer signals, and prioritize high-value pipeline opportunities.`;
  }
  if (cat.includes("crm") || cat.includes("revenue")) {
    return `${vendorName} is a customer relationship management (CRM) and revenue operations platform built to manage accounts, track sales pipelines, and automate customer lifecycle records.`;
  }
  if (cat.includes("data & enrichment")) {
    return `${vendorName} is a B2B data intelligence and enrichment platform that provides verified contact information, firmographic profiles, and email verification for sales teams.`;
  }
  if (cat.includes("sales engagement")) {
    return `${vendorName} is a sales engagement and outreach platform designed to automate multi-channel prospecting sequences, track rep activities, and accelerate deal conversations.`;
  }
  if (cat.includes("marketing automation")) {
    return `${vendorName} is a marketing automation platform built to design, personalize, and orchestrate omnichannel lead nurturing campaigns across email, SMS, and digital channels.`;
  }
  if (cat.includes("analytics & intelligence")) {
    return `${vendorName} is an analytics and revenue intelligence platform that tracks user behavior, analyzes pipeline health, and delivers predictive business forecasting.`;
  }
  if (cat.includes("customer success")) {
    return `${vendorName} is a customer success platform built for B2B teams to monitor product adoption, calculate health scores, and automate proactive retention workflows.`;
  }
  if (cat.includes("commerce & payments")) {
    return `${vendorName} is a financial infrastructure and commerce platform that automates payment processing, recurring subscription billing, and quote-to-cash operations.`;
  }
  if (cat.includes("productivity & events")) {
    return `${vendorName} is a productivity and collaboration platform that coordinates cross-functional team projects, streamlines meetings, and automates operational workflows.`;
  }
  if (cat.includes("content & social")) {
    return `${vendorName} is a content and social media platform that enables marketing teams to create, schedule, publish, and analyze digital brand engagement across channels.`;
  }

  return `${vendorName} is an enterprise go-to-market software platform built to integrate GTM workflows, synchronize customer data, and automate revenue operations.`;
}

function getExample1SignalSSOT(vendorName: string, category: string): string {
  const v = vendorName.toLowerCase();
  const cat = category.toLowerCase();

  if (v.includes("aggregate")) {
    return "Match an inbound form lead to the correct account using domain plus fuzzy company name.";
  }
  if (v.includes("ai agent")) {
    return "Assign a high-fit MQL by territory, segment, capacity, and account ownership.";
  }
  if (v.includes("basic llm")) {
    return "Enroll a qualified lead in a personalized outbound sequence with signal-based messaging.";
  }
  if (v.includes("chat trigger")) {
    return "Upsert the qualified person and account into the CRM system of record with source lineage.";
  }
  if (v.includes("code") && !v.includes("codex")) {
    return "Use AI reasoning to summarize signals and recommend the next-best nurture action.";
  }
  if (v.includes("compression")) {
    return "Attribute pipeline to first-touch, last-touch, and influenced campaigns.";
  }
  if (v.includes("convert to file")) {
    return "Create a CPQ quote when opportunity stage and product configuration are complete.";
  }
  if (v.includes("crypto")) {
    return "Resolve parent-child account hierarchy before territory assignment and opportunity creation.";
  }
  if (v.includes("data table")) {
    return "Capture a webinar submission, validate consent, and start an omni-channel nurture.";
  }
  if (v.includes("date & time")) {
    return "Convert a scored lead to an MQL and sync lifecycle stage across CRM and marketing automation.";
  }

  // Enterprise Vendor specific examples
  if (v.includes("6sense") || v.includes("demandbase") || v.includes("bombora")) {
    return "Capture anonymous domain intent surge, resolve parent-child account hierarchy, and trigger AE alert.";
  }
  if (v.includes("leandata") || v.includes("ringlead")) {
    return "Resolve parent-child account hierarchy, match lead to parent account, and deduplicate CRM records.";
  }
  if (v.includes("clearbit") || v.includes("zoominfo") || v.includes("apollo") || v.includes("cognism")) {
    return "Match an inbound form lead to the correct account using domain plus fuzzy company name.";
  }
  if (v.includes("salesforce") || v.includes("hubspot") || v.includes("zoho") || v.includes("pipedrive")) {
    return "Upsert the qualified person and account into the CRM system of record with source lineage.";
  }
  if (v.includes("outreach") || v.includes("salesloft") || v.includes("instantly")) {
    return "Enroll a qualified lead in a personalized outbound sequence with signal-based messaging.";
  }
  if (v.includes("chili piper") || v.includes("calendly") || v.includes("qualified")) {
    return "Assign a high-fit MQL by territory, segment, capacity, and account ownership.";
  }
  if (v.includes("gong") || v.includes("clari") || v.includes("chorus")) {
    return "Extract competitor mentions and buying stage updates from sales calls to sync opportunity fields.";
  }
  if (v.includes("stripe") || v.includes("chargebee") || v.includes("zuora") || v.includes("dealhub")) {
    return "Create a CPQ quote when opportunity stage and product configuration are complete.";
  }

  // Category fallback
  if (cat.includes("abm") || cat.includes("intent")) {
    return "Capture intent surge signals and resolve parent-child account hierarchies before AE assignment.";
  }
  if (cat.includes("crm") || cat.includes("revenue")) {
    return "Upsert qualified accounts and contacts into CRM system of record with automated deduplication.";
  }
  if (cat.includes("data & enrichment")) {
    return "Match an inbound lead to the verified account record using fuzzy matching and domain verification.";
  }
  if (cat.includes("sales engagement")) {
    return "Assign high-fit leads to target outbound sequences based on buying signals and account tier.";
  }
  if (cat.includes("marketing automation")) {
    return "Convert a scored lead to an MQL and sync lifecycle stage across CRM and marketing automation.";
  }
  if (cat.includes("analytics & intelligence")) {
    return "Attribute pipeline to first-touch, last-touch, and influenced campaigns.";
  }
  if (cat.includes("customer success")) {
    return "Ingest telemetry health drop signal, log renewal risk flag in CRM, and notify account owner.";
  }
  if (cat.includes("commerce & payments")) {
    return "Create a CPQ quote when opportunity stage and product configuration are complete.";
  }
  if (cat.includes("productivity & events")) {
    return "Capture webinar registration submission, validate consent, and start omni-channel nurture.";
  }
  return "Ingest real-time webhook signal, validate payload schema, and sync golden record to SSoT.";
}

function getExample2EngageCPQ(vendorName: string, category: string): string {
  const v = vendorName.toLowerCase();
  const cat = category.toLowerCase();

  if (v.includes("aggregate")) {
    return "Dedupe contacts by normalized email and retain the record with the freshest enrichment.";
  }
  if (v.includes("ai agent")) {
    return "Route a buying-committee contact to the parent-account owner and notify the SDR.";
  }
  if (v.includes("basic llm")) {
    return "Trigger coordinated email, LinkedIn, and call tasks while respecting suppression lists.";
  }
  if (v.includes("chat trigger")) {
    return "Synchronize golden account fields to the SSoT while preserving field ownership rules.";
  }
  if (v.includes("code") && !v.includes("codex")) {
    return "Classify buying stage from web, email, CRM, and product signals with a confidence score.";
  }
  if (v.includes("compression")) {
    return "Join campaign costs to sourced revenue and calculate channel ROI by quarter.";
  }
  if (v.includes("convert to file")) {
    return "Validate discount guardrails, request approval, and sync the accepted quote to CRM.";
  }
  if (v.includes("crypto")) {
    return "Roll subsidiary engagement up to the global account for account-level qualification.";
  }
  if (v.includes("data table")) {
    return "Ingest a chat hand-raise, enrich the visitor, and send an immediate sales alert.";
  }
  if (v.includes("date & time")) {
    return "Qualify an inbound request, create the opportunity, and preserve campaign membership.";
  }

  // Enterprise Vendor specific examples
  if (v.includes("leandata") || v.includes("ringlead")) {
    return "Dedupe contacts by normalized email and retain the record with the freshest enrichment.";
  }
  if (v.includes("6sense") || v.includes("demandbase")) {
    return "Roll subsidiary engagement up to the global account for account-level qualification.";
  }
  if (v.includes("outreach") || v.includes("salesloft")) {
    return "Trigger coordinated email, LinkedIn, and call tasks while respecting suppression lists.";
  }
  if (v.includes("salesforce") || v.includes("hubspot")) {
    return "Synchronize golden account fields to the SSoT while preserving field ownership rules.";
  }
  if (v.includes("dealhub") || v.includes("cacheflow") || v.includes("stripe") || v.includes("zuora")) {
    return "Validate discount guardrails, request approval, and sync the accepted quote to CRM.";
  }
  if (v.includes("docusign") || v.includes("pandadoc")) {
    return "Execute automated contract generation and route eSignature envelope upon quote acceptance.";
  }
  if (v.includes("gong") || v.includes("clari")) {
    return "Classify buying stage from web, email, CRM, and product signals with a confidence score.";
  }
  if (v.includes("apollo") || v.includes("clearbit") || v.includes("zoominfo")) {
    return "Route a buying-committee contact to the parent-account owner and notify the SDR.";
  }

  // Category fallback
  if (cat.includes("abm") || cat.includes("intent")) {
    return "Roll subsidiary engagement up to the global account for account-level qualification.";
  }
  if (cat.includes("crm") || cat.includes("revenue")) {
    return "Synchronize golden account fields to the SSoT while preserving field ownership rules.";
  }
  if (cat.includes("data & enrichment")) {
    return "Dedupe contacts by normalized email and retain the record with the freshest enrichment.";
  }
  if (cat.includes("sales engagement")) {
    return "Trigger coordinated email, LinkedIn, and call tasks while respecting suppression lists.";
  }
  if (cat.includes("marketing automation")) {
    return "Join campaign costs to sourced revenue and calculate channel ROI by quarter.";
  }
  if (cat.includes("analytics & intelligence")) {
    return "Classify buying stage from web, email, CRM, and product signals with a confidence score.";
  }
  if (cat.includes("customer success")) {
    return "Calculate customer health score and trigger automated expansion campaign in CRM.";
  }
  if (cat.includes("commerce & payments")) {
    return "Validate discount guardrails, request approval, and sync the accepted quote to CRM.";
  }
  if (cat.includes("productivity & events")) {
    return "Qualify an inbound request, create the opportunity, and preserve campaign membership.";
  }
  return "Route qualified engagement to sales queue and sync activity log to CRM.";
}

function getAvailability(vendorName: string, connectVia: string, n8nNode: string): string {
  const v = vendorName.toLowerCase();
  if (connectVia === "Native" || (n8nNode !== "—" && n8nNode !== "No native node" && n8nNode.trim() !== "")) {
    return "Core / built-in";
  }
  if (v.includes("salesforce") || v.includes("hubspot") || v.includes("leandata") || v.includes("marketo") || v.includes("6sense")) {
    return "AppExchange / Native";
  }
  if (connectVia === "Webhook") {
    return "Verified Partner";
  }
  return "Core / built-in";
}

function getSalesforceIntegration(vendorName: string, category: string): string {
  const v = vendorName.toLowerCase();
  if (v.includes("6sense") || v.includes("demandbase") || v.includes("zoominfo") || v.includes("clearbit")) {
    return "AppExchange Managed Package, REST API & Webhooks";
  }
  if (v.includes("hubspot") || v.includes("pipedrive") || v.includes("zoho") || v.includes("copper")) {
    return "AppExchange Bi-directional Sync, REST/SOAP API";
  }
  if (v.includes("outreach") || v.includes("salesloft") || v.includes("gong") || v.includes("clari")) {
    return "Native AppExchange App, Bi-directional Connector, REST API";
  }
  if (v.includes("apollo") || v.includes("cognism") || v.includes("lusha") || v.includes("lead411")) {
    return "AppExchange Package, Chrome Plugin, REST API";
  }
  if (v.includes("stripe") || v.includes("chargebee") || v.includes("recurly") || v.includes("adyen")) {
    return "AppExchange Billing Connector, REST API & Webhooks";
  }
  if (v.includes("docusign") || v.includes("pandadoc") || v.includes("adobe sign")) {
    return "AppExchange eSignature Package, REST/SOAP API";
  }
  if (v.includes("chili piper") || v.includes("calendly") || v.includes("qualified") || v.includes("drift")) {
    return "AppExchange Package, In-Form Plugin, REST API";
  }
  if (v.includes("leandata") || v.includes("ringlead")) {
    return "Native AppExchange Routing Engine, Apex Triggers";
  }
  if (v.includes("airtable") || v.includes("notion") || v.includes("coda") || v.includes("asana")) {
    return "Marketplace Connector, REST API & OAuth 2.0";
  }
  if (v.includes("salesforce") || v.includes("pardot")) {
    return "Native Core Platform, REST/SOAP & Bulk API";
  }

  // Category based resolution
  const cat = category.toLowerCase();
  if (cat.includes("abm") || cat.includes("intent")) {
    return "AppExchange Package, REST/SOAP API, Intent Webhooks";
  }
  if (cat.includes("crm") || cat.includes("revenue")) {
    return "AppExchange Connector, REST/SOAP API, Bi-directional Sync";
  }
  if (cat.includes("sales engagement")) {
    return "Native AppExchange App, Vendor Plugin, REST API";
  }
  if (cat.includes("data & enrichment")) {
    return "AppExchange Package, REST/SOAP API, Marketplace Connector";
  }
  if (cat.includes("marketing automation")) {
    return "AppExchange Connector, REST/SOAP API & Webhooks";
  }
  if (cat.includes("analytics & intelligence")) {
    return "AppExchange App, REST API & Data Cloud Connector";
  }
  if (cat.includes("customer success")) {
    return "AppExchange Package, REST/SOAP API, Bi-directional Sync";
  }
  if (cat.includes("commerce & payments")) {
    return "AppExchange Billing Plugin, REST API & Webhooks";
  }
  if (cat.includes("productivity & events")) {
    return "Marketplace Connector, REST/SOAP API, OAuth 2.0";
  }
  if (cat.includes("content & social")) {
    return "Marketplace Connector, REST API & Webhooks";
  }
  return "REST/SOAP API, Connector & Webhooks";
}

function getClaudeIntegration(vendorName: string, category: string): string {
  const v = vendorName.toLowerCase();
  const cat = category.toLowerCase();

  if (v.includes("airtable") || v.includes("notion") || v.includes("github") || v.includes("postgres") || v.includes("snowflake") || v.includes("bigquery")) {
    return "MCP Server (Model Context Protocol), REST API";
  }
  if (cat.includes("crm") || cat.includes("revenue") || cat.includes("sales engagement")) {
    return "MCP Server, Claude Desktop Tool, REST API";
  }
  if (cat.includes("analytics") || cat.includes("data")) {
    return "MCP Server, Anthropic Tool Calling, REST API";
  }
  if (cat.includes("marketing") || cat.includes("content")) {
    return "Anthropic Tool Plugin, REST API & Webhooks";
  }
  if (cat.includes("commerce") || cat.includes("customer success")) {
    return "MCP Server, REST API & Tool Calling";
  }
  return "MCP Server, REST API & Anthropic Function Calling";
}

function getCodexIntegration(vendorName: string, category: string): string {
  const v = vendorName.toLowerCase();
  const cat = category.toLowerCase();

  if (v.includes("airtable") || v.includes("notion") || v.includes("github") || v.includes("linear") || v.includes("jira")) {
    return "Custom GPT Actions, MCP Server, REST API";
  }
  if (cat.includes("crm") || cat.includes("revenue") || cat.includes("sales engagement")) {
    return "Custom GPT Actions, OpenAI Plugin, REST API";
  }
  if (cat.includes("analytics") || cat.includes("data")) {
    return "Custom GPT Actions, Assistant API, REST/SOAP API";
  }
  if (cat.includes("marketing") || cat.includes("content")) {
    return "OpenAI Plugin, Custom GPT Actions, REST API";
  }
  if (cat.includes("commerce") || cat.includes("customer success")) {
    return "Custom GPT Actions, REST API & Webhooks";
  }
  return "Custom GPT Actions, REST API & OpenAI Tool Calling";
}

export function parseGTMVendors(): GTMVendor[] {
  const lines = RAW_GTM_CSV.trim().split("\n");
  const headers = lines[0];
  const vendors: GTMVendor[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parser for quoted fields
    const fields: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let charIdx = 0; charIdx < line.length; charIdx++) {
      const char = line[charIdx];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    fields.push(current.trim());

    if (fields.length >= 11) {
      const customerSizeRaw = fields[4];
      const customerSizes = customerSizeRaw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);

      const vendorName = fields[0];
      const categoryName = fields[1];
      const rawFunctionality = fields[2];
      const n8nNode = fields[8];
      const connectVia = fields[10];

      vendors.push({
        vendor: vendorName,
        category: categoryName,
        coreFunctionality: getEnhancedCoreFunctionality(vendorName, categoryName, rawFunctionality),
        example1SignalSSOT: getExample1SignalSSOT(vendorName, categoryName),
        example2EngageCPQ: getExample2EngageCPQ(vendorName, categoryName),
        availability: getAvailability(vendorName, connectVia, n8nNode),
        indicativePricing: fields[3],
        customerSize: customerSizes,
        aiFeatures: fields[5],
        integrations: fields[6],
        n8nIntegrations: fields[6],
        salesforceIntegration: getSalesforceIntegration(vendorName, categoryName),
        claudeIntegration: getClaudeIntegration(vendorName, categoryName),
        codexIntegration: getCodexIntegration(vendorName, categoryName),
        llmCapability: fields[7],
        n8nNode: n8nNode,
        n8nNodeIcon: fields[9],
        connectVia: connectVia,
      });
    }
  }

  return vendors;
}

export const GTM_VENDORS_DATA = parseGTMVendors();
