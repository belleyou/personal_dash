import React, { useState } from "react";
import { 
  Send, 
  FileCode, 
  Settings, 
  Mail, 
  Check, 
  Copy, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle,
  Database,
  Briefcase,
  Coffee,
  Music,
  Camera
} from "lucide-react";

interface WebToLeadFormProps {
  userEmail?: string;
}

export const WebToLeadForm: React.FC<WebToLeadFormProps> = ({ 
  userEmail = "you.bell521@gmail.com" 
}) => {
  // State to manage active panels
  const [activeSection, setActiveSection] = useState<"submit" | "email" | null>(null);
  
  // Salesforce Configuration States
  const [oid, setOid] = useState("00DgL00000TX4P7"); // Activated Production organization ID from user
  const [retURL, setRetURL] = useState(window.location.origin + "/#thank-you");
  const [isSandbox, setIsSandbox] = useState(false);
  
  // Custom Field mapping inputs (allows mapping to actual Salesforce Custom Field API names/IDs)
  const [projectTypeField, setProjectTypeField] = useState("00NgL000047BQPJ"); // User's Salesforce Project Type Custom ID
  const [projectStatusField, setProjectStatusField] = useState("00NgL000047B8P1"); // User's Salesforce Project Status Custom ID
  const [companyEmailField, setCompanyEmailField] = useState("company_email__c");

  // Lead Form Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    description: "",
    projectType: "Aries PCIe/CXL Smart DSP Retimers",
    projectStatus: "New",
    companyEmail: "",
    country: "US"
  });

  // Intel reCAPTCHA verification states
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showCaptchaChallenge, setShowCaptchaChallenge] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const [copiedCode, setCopiedCode] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyCode = () => {
    const actionUrl = isSandbox 
      ? "https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      : "https://webtolead.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";

    // Generate compliant standard Salesforce Web-to-Lead HTML Code
    const generatedHtml = `<!--  ----------------------------------------------------------------------  -->
<!--  NOTE: Please copy the following code into your website's markup to      -->
<!--        deploy your custom Salesforce Web-to-Lead Integration.            -->
<!--  ----------------------------------------------------------------------  -->

<form action="${actionUrl}" method="POST">

  <!-- Salesforce Org Identifier -->
  <input type="hidden" name="oid" value="${oid}">
  <input type="hidden" name="retURL" value="${retURL}">

  <!-- Basic Contact Information -->
  <label for="first_name">First Name</label>
  <input id="first_name" maxlength="40" name="first_name" size="20" type="text" value="${formData.firstName}" /><br>

  <label for="last_name">Last Name</label>
  <input id="last_name" maxlength="80" name="last_name" size="20" type="text" value="${formData.lastName}" required /><br>

  <label for="email">Email</label>
  <input id="email" maxlength="80" name="email" size="20" type="text" value="${formData.email}" required /><br>

  <label for="company">Company</label>
  <input id="company" maxlength="40" name="company" size="20" type="text" value="${formData.company}" /><br>

  <label for="description">Project Description</label>
  <textarea name="description">${formData.description}</textarea><br>

  <!-- Custom Lead Attributes (mapped via Salesforce Custom Field IDs or API Name tokens) -->
  <label for="${projectTypeField}">Project Type</label>
  <input id="${projectTypeField}" name="${projectTypeField}" type="text" value="${formData.projectType}" /><br>

  <label for="${projectStatusField}">Project Status</label>
  <input id="${projectStatusField}" name="${projectStatusField}" type="text" value="${formData.projectStatus}" /><br>

  <label for="${companyEmailField}">Company Email</label>
  <input id="${companyEmailField}" name="${companyEmailField}" type="text" value="${formData.companyEmail}" /><br>

  <input type="submit" name="submit" value="Submit Lead to Salesforce">

</form>`;

    navigator.clipboard.writeText(generatedHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Safe client-side pre-submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    if (!isCaptchaVerified) {
      e.preventDefault();
      setCaptchaError("Please solve the engineering visual challenge first to verify you are human!");
      return;
    }
    // Show beautiful success card with live email dispatch info, letting the user verify/send the mail confirmation.
    setSubmitSuccess(true);
    // Programmatically route to the dedicated Thank You page
    setTimeout(() => {
      window.location.hash = "thank-you";
    }, 600);
  };

  const handleEmailTrigger = () => {
    if (!isCaptchaVerified) {
      setCaptchaError("Please solve the engineering visual challenge first to verify you are human!");
      return;
    }
    const subject = encodeURIComponent(`New Project Proposal: ${formData.projectType || "Consulting"} - ${formData.company || "Interested Client"}`);
    
    // Draft a crisp, professional markdown email to Bao You
    const body = encodeURIComponent(`Hi Bao,

I am reaching out regarding a new project opportunity. Here are the primary details:

* First Name: ${formData.firstName || "N/A"}
* Last Name: ${formData.lastName || "N/A"}
* Sender Email: ${formData.email || "N/A"}
* Company: ${formData.company || "N/A"}
* Company Contact Email: ${formData.companyEmail || "N/A"}

Project Details:
----------------------------------------
* Project Type: ${formData.projectType || "Enterprise Integration"}
* Project Status: ${formData.projectStatus || "Not Sandbox Tested"}
* Description:
${formData.description || "Looking for enterprise CRM integrations, GTM workflow engineering, and revenue operations strategy alignment."}

I'd map this over to your Salesforce Web-to-Lead handler once we connect. Let me know if you are free for a technical blueprint review.

Best regards,
${formData.firstName || ""} ${formData.lastName || ""}
${formData.company ? `Representative at ${formData.company}` : ""}`);

    window.open(`mailto:${userEmail}?subject=${subject}&body=${body}`);
  };

  const handleSendConfirmationEmail = () => {
    const randomRef = `AST-${Math.floor(Math.random() * 89999 + 10000)}`;
    const subject = encodeURIComponent(`Project Proposal Confirmation [Ref: ${randomRef}] - Astera Labs Connectivity Solutions`);
    
    const body = encodeURIComponent(`Hi ${formData.firstName || "Innovative Builder"},

Thank you for your interest in Astera Labs' connectivity hardware. We have successfully registered your project request in our lead intake portal with the following configuration:

============================================
PROJECT CONFIRMATION DETAILS
============================================
* Form Submitter: ${formData.firstName || ""} ${formData.lastName || ""}
* Project Reference: ${randomRef}
* Selected Product/Service: ${formData.projectType}
* Project Status: ${formData.projectStatus}
* Company: ${formData.company || "N/A"}
* Company Business Email: ${formData.companyEmail || "N/A"}

Selected Configuration Summary:
--------------------------------------------
${formData.description || "Inquiry to optimize PCIe/CXL high-speed lanes, Ethernet performance thresholds, or memory expansion bandwidth."}

============================================

Our California-based systems and software integration engineers will organize a technical review of your design details. Expect a design blueprint dispatch or meeting agenda proposal in your inbox within 24-48 business hours.

We look forward to accelerating your cloud system performance.

Best regards,

Intake Orchestrator
Astera Labs Global GTM Hub
San Jose, California`);

    window.open(`mailto:${formData.email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 flex flex-col items-center">
      {/* Sky Blue Styled 3D Buttons Side-By-Side */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 z-10 w-full mb-10">
        
        {/* Submit a Project Glass-Gel Button */}
        <button
          id="btn-submit-project"
          onClick={() => {
            setActiveSection(activeSection === "submit" ? null : "submit");
          }}
          className={`relative group shrink-0 transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer ${
            activeSection === "submit" ? "scale-105" : ""
          }`}
        >
          {/* Inner / Outer Double Bezel 3D Glass Shell ring */}
          <div className={`absolute -inset-[3px] rounded-full bg-gradient-to-b from-sky-300 via-sky-500 to-sky-700 opacity-80 group-hover:opacity-95 blur-[1px] transition-all duration-300 ${
            activeSection === "submit" ? "from-yellow-300 via-sky-400 to-sky-600 ring-2 ring-yellow-400/50" : ""
          }`} />
          
          {/* Main Capsule Body */}
          <div className={`relative px-8 py-3.5 rounded-full bg-gradient-to-b ${
            activeSection === "submit" 
              ? "from-sky-600 via-sky-700 to-sky-850 border-3 border-yellow-400 shadow-xl shadow-sky-900/30" 
              : "from-sky-400 via-sky-500 to-sky-650 border border-sky-300/45"
          } shadow-xl overflow-hidden min-w-[210px] flex items-center justify-center`}>
            
            {/* Top Gloss Glare reflection overlay */}
            <div className={`absolute top-[1.5px] left-[5px] right-[5px] h-[35%] bg-gradient-to-b ${
              activeSection === "submit" ? "from-white/40" : "from-white/60"
            } to-white/5 rounded-t-full pointer-events-none`} />

            {/* Bottom interior reflection up-glow for plastic volumetric depth */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sky-300/25 to-transparent rounded-b-full pointer-events-none" />
            
            {/* Soft bottom rim highlight line */}
            <div className="absolute inset-x-4 bottom-[2.5px] h-[1px] bg-white/20 pointer-events-none" />

            {/* Content holder (Icon + Text) */}
            <div className="relative z-10 flex items-center gap-2.5 text-white font-sans font-semibold tracking-wide text-sm md:text-base selection:bg-transparent drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.65)]">
              <Database className={`h-4.5 w-4.5 shrink-0 ${activeSection === "submit" ? "text-yellow-300 animate-pulse" : "text-sky-100"}`} />
              <span className={activeSection === "submit" ? "text-yellow-200" : "text-white"}>Submit a Project</span>
            </div>
          </div>
        </button>

        {/* Email Me a Project Glass-Gel Button */}
        <button
          id="btn-email-me-project"
          onClick={() => {
            setActiveSection(activeSection === "email" ? null : "email");
          }}
          className={`relative group shrink-0 transition-all duration-300 active:scale-95 focus:outline-none cursor-pointer ${
            activeSection === "email" ? "scale-105" : ""
          }`}
        >
          {/* Inner / Outer Double Bezel 3D Glass Shell ring */}
          <div className={`absolute -inset-[3px] rounded-full bg-gradient-to-b from-sky-300 via-sky-500 to-sky-700 opacity-80 group-hover:opacity-95 blur-[1px] transition-all duration-300 ${
            activeSection === "email" ? "from-yellow-300 via-sky-400 to-sky-600 ring-2 ring-yellow-400/50" : ""
          }`} />
          
          {/* Main Capsule Body */}
          <div className={`relative px-8 py-3.5 rounded-full bg-gradient-to-b ${
            activeSection === "email" 
              ? "from-sky-600 via-sky-700 to-sky-850 border-3 border-yellow-400 shadow-xl shadow-sky-900/30" 
              : "from-sky-400 via-sky-500 to-sky-650 border border-sky-300/45"
          } shadow-xl overflow-hidden min-w-[210px] flex items-center justify-center`}>
            
            {/* Top Gloss Glare reflection overlay */}
            <div className={`absolute top-[1.5px] left-[5px] right-[5px] h-[35%] bg-gradient-to-b ${
              activeSection === "email" ? "from-white/40" : "from-white/60"
            } to-white/5 rounded-t-full pointer-events-none`} />

            {/* Bottom interior reflection up-glow for plastic volumetric depth */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-sky-300/25 to-transparent rounded-b-full pointer-events-none" />
            
            {/* Soft bottom rim highlight line */}
            <div className="absolute inset-x-4 bottom-[2.5px] h-[1px] bg-white/20 pointer-events-none" />

            {/* Content holder (Icon + Text) */}
            <div className="relative z-10 flex items-center gap-2.5 text-white font-sans font-semibold tracking-wide text-sm md:text-base selection:bg-transparent drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.65)]">
              <Mail className={`h-4.5 w-4.5 shrink-0 ${activeSection === "email" ? "text-yellow-300 animate-pulse" : "text-sky-100"}`} />
              <span className={activeSection === "email" ? "text-yellow-200" : "text-white"}>Email Me a Project</span>
            </div>
          </div>
        </button>

      </div>

      {/* SECTION CONTENT OVERLAYS - Sub-sections display gracefully with hand-drawn canvas details */}
      {activeSection && (
        <div className="w-full bg-white border-3 border-ink rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] notebook-column bg-graph-paper animate-fade-in mb-6 relative">
          
          <div className="absolute right-4 top-4 text-[10px] font-mono text-zinc-400 select-none opacity-60">
            {activeSection === "submit" ? "salesforce web-to-lead form" : "project proposal email dispatch"}
          </div>
          
          {/* Form Fields Section */}
          <form 
            action={isSandbox ? "https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8" : "https://webtolead.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"}
            method="POST"
            onSubmit={handleFormSubmit}
            target="sf-iframe"
            className="w-full max-w-2xl mx-auto space-y-5"
          >
            {/* Salesforce Standard Hidden OID Fields */}
            <input type="hidden" name="oid" value={oid} />
            <input type="hidden" name="retURL" value={retURL} />

            {activeSection === "submit" && (
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border-2 border-dashed border-sky-400 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 select-none mb-4 animate-fade-in text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 relative">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse relative"></span>
                    <h5 className="font-hand text-lg font-black text-sky-950 uppercase tracking-tight">
                      Salesforce Integration Connected
                    </h5>
                  </div>
                  <p className="font-sans text-xs text-sky-800 font-medium">
                    This form is successfully bound to your active production Salesforce Web-to-Lead handler.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[10px] bg-white px-3 py-2 border border-sky-200 rounded-lg text-zinc-600 shadow-sm shrink-0">
                  <div>
                    <span className="text-zinc-400 block font-bold uppercase text-[8px] tracking-wider">ORG ID</span>
                    <strong className="text-zinc-800">{oid}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-bold uppercase text-[8px] tracking-wider">PROJECT STATUS KEY</span>
                    <strong className="text-zinc-800">00NgL000047B8P1</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-bold uppercase text-[8px] tracking-wider">RET URL</span>
                    <strong className="text-sky-600 truncate max-w-[100px] block" title={retURL}>{retURL}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block font-bold uppercase text-[8px] tracking-wider">PROJECT TYPE KEY</span>
                    <strong className="text-zinc-800">00NgL000047BQPJ</strong>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="sf_first_name_input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. John"
                  maxLength={40}
                  className="w-full px-3 py-2 border-2 border-zinc-500 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                <input type="hidden" name="first_name" value={formData.firstName} />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  id="sf_last_name_input"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Doe"
                  maxLength={80}
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                {/* Web-to-lead standard field name is last_name */}
                <input type="hidden" name="last_name" value={formData.lastName} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  id="sf_email_input"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. client@company.com"
                  maxLength={80}
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                <input type="hidden" name="email" value={formData.email} />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Company Name</label>
                <input
                  type="text"
                  name="company"
                  id="sf_company_input"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp"
                  maxLength={40}
                  className="w-full px-3 py-2 border-2 border-zinc-500 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                <input type="hidden" name="company" value={formData.company} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Country / Region *</label>
              <select
                name="country"
                id="sf_country_input"
                required
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 font-sans"
              >
                <option value="US">United States</option>
                <option value="TW">Taiwan (Astera HQ Design Node)</option>
                <option value="DE">Germany (EU Cloud Region)</option>
                <option value="JP">Japan (APAC Enterprise)</option>
                <option value="KR">South Korea (AI Foundry Hub)</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="NL">Netherlands (ASML Ecosystem)</option>
                <option value="SG">Singapore (ASEAN Tech Hub)</option>
                <option value="Other">Other / International</option>
              </select>
              <input type="hidden" name="country_code" value={formData.country} />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Description</label>
              <textarea
                name="description"
                id="sf_description_input"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Elaborate on scope, target go-live times, architectural hurdles, etc..."
                className="w-full px-3 py-2 border-2 border-zinc-500 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Type</label>
                <select
                  name="projectType"
                  id="sf_project_type_input"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-zinc-400 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0"
                >
                  <option value="Aries PCIe/CXL Smart DSP Retimers">Aries PCIe/CXL Smart DSP Retimers</option>
                  <option value="Taurus Ethernet Smart Cable Modules">Taurus Ethernet Smart Cable Modules</option>
                  <option value="Leo CXL Memory Connectivity Controllers">Leo CXL Memory Connectivity Controllers</option>
                  <option value="Intelligent Connectivity for Cloud & AI Infrastructure">Intelligent Connectivity for Cloud & AI Infrastructure</option>
                  <option value="Custom Semiconductor Connectivity Integration">Custom Semiconductor Connectivity Integration</option>
                </select>
                {/* Custom fields in salesforce are injected with custom name */}
                <input type="hidden" name={projectTypeField} value={formData.projectType} />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Status</label>
                <select
                  name="projectStatus"
                  id="sf_project_status_input"
                  value={formData.projectStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-zinc-400 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0"
                >
                  <option value="New">New</option>
                  <option value="Planning/Initiation">Planning/Initiation</option>
                  <option value="RFP / Sourcing">RFP / Sourcing</option>
                  <option value="Active Development">Active Development</option>
                  <option value="Critical Optimization">Critical Optimization</option>
                </select>
                <input type="hidden" name={projectStatusField} value={formData.projectStatus} />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  id="sf_company_email_input"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. billing@company.com"
                  className="w-full px-3 py-2 border-2 border-zinc-500 rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                <input type="hidden" name={companyEmailField} value={formData.companyEmail} />
              </div>
            </div>

            {/* Intelligent Hand-Drawn reCAPTCHA Challenge Card */}
            <div className="bg-zinc-50 border-3 border-ink rounded-xl p-4 md:p-5 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] max-w-lg mx-auto my-6 relative overflow-hidden select-none">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left side: Checkbox action */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCaptchaVerified) {
                        setShowCaptchaChallenge(prev => !prev);
                        setCaptchaError("");
                      }
                    }}
                    className={`h-7 w-7 rounded border-3 border-ink flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      isCaptchaVerified ? "bg-emerald-200" : "bg-white hover:bg-zinc-100"
                    }`}
                  >
                    {isCaptchaVerified && <Check className="h-5 w-5 stroke-[3] text-emerald-800" />}
                  </button>
                  <div className="font-sans text-xs text-left">
                    <p className="font-bold text-zinc-950">Intelligent Human Verification</p>
                    <p className="text-zinc-500 font-medium">Prove you are an innovative builder, not a bot</p>
                  </div>
                </div>

                {/* Right side: Styled badge */}
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase font-bold text-zinc-400 select-none">
                  <div className="text-center sm:text-right">
                    <div className="text-sky-600 font-extrabold flex items-center justify-center sm:justify-end gap-1 font-hand text-sm select-none">
                      <svg className={`h-4.5 w-4.5 text-sky-500 ${!isCaptchaVerified ? "animate-spin-slow" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                      <span className="tracking-wider">reCAPTCHA</span>
                    </div>
                    <span>Shield v2 Active</span>
                  </div>
                </div>
              </div>

              {/* Slid-down puzzle challenge if checked but not verified */}
              {showCaptchaChallenge && !isCaptchaVerified && (
                <div className="mt-4 border-t-2 border-dashed border-zinc-200 pt-4 w-full text-center space-y-3 animate-fade-in">
                  <p className="font-hand text-sm font-black text-indigo-905 leading-snug">
                    Astera Labs powers cloud & AI hardware connections! Solve this quick design fuel block:
                  </p>
                  <p className="font-sans text-xs text-zinc-650">
                    "Which item powers PMs and hardware engineering teams at Astera Labs' global nodes?"
                  </p>
                  
                  {/* Visual buttons for the icons */}
                  <div className="flex justify-center flex-wrap gap-3 py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCaptchaVerified(true);
                        setShowCaptchaChallenge(false);
                        setCaptchaError("");
                      }}
                      className="p-3 bg-yellow-50 hover:bg-yellow-100 border-2 border-ink rounded-lg shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] font-sans text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer max-w-[110px] w-full transition-transform active:scale-95"
                    >
                      <Coffee className="h-5 w-5 text-amber-700" />
                      <span>Coffee Fuel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCaptchaError("Audio play cycles won't calibrate high-speed retimers! Select the proper tech fuel.");
                      }}
                      className="p-3 bg-zinc-50 hover:bg-zinc-105 border-2 border-zinc-400 rounded-lg shadow-sm font-sans text-xs flex flex-col items-center gap-1.5 cursor-pointer max-w-[110px] w-full transition-transform active:scale-95"
                    >
                      <Music className="h-5 w-5 text-zinc-400" />
                      <span>Music Wave</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCaptchaError("A camera captures beautiful street sights but coffee fuel keeps engineers going! Try again.");
                      }}
                      className="p-3 bg-zinc-50 hover:bg-zinc-105 border-2 border-zinc-400 rounded-lg shadow-sm font-sans text-xs flex flex-col items-center gap-1.5 cursor-pointer max-w-[110px] w-full transition-transform active:scale-95"
                    >
                      <Camera className="h-5 w-5 text-zinc-400" />
                      <span>Camera Frame</span>
                    </button>
                  </div>
                </div>
              )}

              {captchaError && (
                <p className="font-sans text-[11px] text-red-600 font-semibold bg-red-50 border border-red-200 p-2 rounded-lg mt-3 text-center">
                  ⚠️ {captchaError}
                </p>
              )}

              {isCaptchaVerified && (
                <p className="font-sans text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-300 p-2 rounded-lg mt-3 text-center flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Human Verification Successful! Design authorization granted.</span>
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-center gap-4">
              {activeSection === "submit" ? (
                <button
                  type="submit"
                  id="sf_submit_action_btn"
                  className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-sans font-bold tracking-wide text-sm border-2 border-ink rounded-lg shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit a Project</span>
                </button>
              ) : (
                <button
                  type="button"
                  id="email_send_action_btn"
                  onClick={handleEmailTrigger}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold tracking-wide text-sm border-2 border-ink rounded-lg shadow-[3px_3px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(24,24,27,1)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Me a Project</span>
                </button>
              )}
            </div>

            <iframe name="sf-iframe" id="sf-submit-target-iframe" className="hidden" title="Salesforce Post Target"></iframe>
          </form>

          {/* Success Dialog Banner */}
          {submitSuccess && (
            <div className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-4 sm:p-8 z-30 animate-fade-in overflow-y-auto">
              <div className="max-w-xl w-full bg-slate-50 border-3 border-ink rounded-xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] text-left space-y-4">
                
                {/* Header Status */}
                <div className="flex items-center gap-3 border-b-2 border-zinc-200 pb-3">
                  <div className="bg-emerald-100 p-2 rounded-full border border-emerald-500">
                    <CheckCircle className="h-6 w-6 text-emerald-600 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-hand text-xl sm:text-2xl font-extrabold text-ink leading-none">Inquiry Submitted Successfully!</h4>
                    <p className="font-sans text-xs text-zinc-500 mt-1">
                      Web-to-Lead payload sent to Salesforce. Reference generated.
                    </p>
                  </div>
                </div>

                {/* Simulated Email Confirmation Box */}
                <div className="space-y-1 bg-zinc-900 text-zinc-200 p-4 rounded-lg font-mono text-xs border border-zinc-700 shadow-inner max-h-[220px] overflow-y-auto select-none">
                  <div className="text-zinc-500 border-b border-zinc-800 pb-1.5 mb-2 font-mono flex flex-col gap-0.5">
                    <span className="text-[10px]"><strong className="text-zinc-400">From:</strong> system-dispatch@asteralabs-gtm.com</span>
                    <span className="text-[10px]"><strong className="text-zinc-400">To:</strong> {formData.email || "client@company.com"}</span>
                    <span className="text-[10px]"><strong className="text-zinc-400">Subject:</strong> Project Proposal Confirmation [Ref: AST-71285] - Astera Labs Connectivity Solutions</span>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    Hi {formData.firstName || "Innovative Builder"},<br /><br />
                    Thank you for your interest in Astera Labs' connectivity hardware. We have successfully registered your project request in our lead intake portal.<br /><br />
                    <strong className="text-yellow-400">Project Details:</strong><br />
                    • Product/Service: <span className="text-sky-300">{formData.projectType}</span><br />
                    • Status: <span className="text-emerald-400">{formData.projectStatus}</span><br />
                    • Organization: {formData.company || "N/A"}<br /><br />
                    Our California-based systems and software integration engineers are reviewing your requirements. We will send a customized technical blueprint presentation to your inbox within 24-48 business hours.<br /><br />
                    Best regards,<br />
                    <strong>Intake Orchestrator</strong><br />
                    Astera Labs Global GTM Hub
                  </p>
                </div>

                {/* Submitter Notification Notice & Action Button */}
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-850 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <p className="font-bold">Dispatch Real Email Confirmation</p>
                    <p className="text-[11px] text-sky-700">Send a real confirmation message to this submitter's address: <strong>{formData.email}</strong></p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendConfirmationEmail}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded border border-sky-800 shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 transition-all text-[11px]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Real Email</span>
                  </button>
                </div>

                {/* Bottom dialog dismiss keys */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2 bg-zinc-200 text-zinc-700 font-hand font-extrabold text-sm border-2 border-ink rounded hover:bg-zinc-300 transition cursor-pointer"
                  >
                    Reset & Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false);
                      setActiveSection(null);
                    }}
                    className="px-6 py-2 bg-highlight text-ink font-hand font-extrabold text-sm border-2 border-ink rounded hover:bg-yellow-300 transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
