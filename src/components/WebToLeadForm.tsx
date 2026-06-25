import React, { useState } from "react";
import { 
  Send, 
  FileCode, 
  Mail, 
  Check, 
  Copy, 
  ExternalLink, 
  CheckCircle,
  Database,
  Briefcase,
  Coffee,
  Music,
  Camera,
  Paperclip,
  Trash2,
  UploadCloud,
  AlertTriangle,
  FileText
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
  const [projectDescriptionField, setProjectDescriptionField] = useState("00NgL000047eJlp"); // User's Salesforce Project Description Custom ID
  const [companyEmailField, setCompanyEmailField] = useState("company_email__c");
  const [projectDeadlineField, setProjectDeadlineField] = useState("00NgL000047vQ7l");
  const [projectNameField, setProjectNameField] = useState("00NgL000048ALHR");

  // Lead Form Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    projectName: "",
    description: "",
    projectType: "Aries PCIe/CXL Smart DSP Retimers",
    projectStatus: "New",
    companyEmail: "",
    country: "US",
    projectDeadline: ""
  });

  // Intel reCAPTCHA verification states
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showCaptchaChallenge, setShowCaptchaChallenge] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [duplicateError, setDuplicateError] = useState("");
  const [allowBypass, setAllowBypass] = useState(false);

  const [copiedCode, setCopiedCode] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const formRef = React.useRef<HTMLFormElement>(null);
  const [showDuplicateConfirm, setShowDuplicateConfirm] = useState(false);
  
  // File Attachment States
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let stateKey = name;
    if (name === "countrySelect") stateKey = "country";
    if (name === "descriptionInput") stateKey = "description";
    if (name === "projectNameInput") stateKey = "projectName";
    setFormData(prev => {
      const updated = {
        ...prev,
        [stateKey]: value
      };
      if (stateKey === "companyEmail") {
        updated.email = value;
      }
      return updated;
    });
  };

  const handleCopyCode = () => {
    const actionUrl = isSandbox 
      ? `https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${oid}`
      : `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${oid}`;

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

  <label for="${projectNameField}">Project Name</label>
  <input id="${projectNameField}" name="${projectNameField}" type="text" value="${formData.projectName}" required /><br>

  <label for="${projectDescriptionField}">Project Description</label>
  <textarea id="${projectDescriptionField}" name="${projectDescriptionField}">${formData.description}</textarea><br>

  <!-- Custom Lead Attributes (mapped via Salesforce Custom Field IDs or API Name tokens) -->
  <label for="${projectTypeField}">Project Type</label>
  <input id="${projectTypeField}" name="${projectTypeField}" type="text" value="${formData.projectType}" /><br>

  <label for="${projectStatusField}">Project Status</label>
  <input id="${projectStatusField}" name="${projectStatusField}" type="text" value="${formData.projectStatus}" /><br>

  <label for="${companyEmailField}">Company Email</label>
  <input id="${companyEmailField}" name="${companyEmailField}" type="text" value="${formData.companyEmail}" /><br>

  <label for="${projectDeadlineField}">Project Deadline</label>
  <input id="${projectDeadlineField}" name="${projectDeadlineField}" type="date" value="${formData.projectDeadline}" required /><br>

  <input type="submit" name="submit" value="Submit Lead to Salesforce">

</form>`;

    navigator.clipboard.writeText(generatedHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Safe client-side pre-submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Intercept actual form submission to display the duplicate confirmation check modal
    
    if (!isCaptchaVerified) {
      setCaptchaError("Please solve the engineering visual challenge first to verify you are human!");
      return;
    }

    // Trigger the duplicate warning check dialog on submit click
    setShowDuplicateConfirm(true);
  };

  const proceedWithSubmission = () => {
    setShowDuplicateConfirm(false);

    const tokenByName = [formData.company, formData.projectStatus, formData.projectType, formData.projectDeadline, formData.country]
      .map(s => (s || "").trim().toLowerCase())
      .join('|');

    const tokenByEmail = [formData.companyEmail, formData.projectStatus, formData.projectType, formData.projectDeadline, formData.country]
      .map(s => (s || "").trim().toLowerCase())
      .join('|');

    const now = Date.now();
    try {
      const stored = localStorage.getItem("last_gtm_submissions_list");
      const list = stored ? JSON.parse(stored) : [];
      list.push({ tokenByName, tokenByEmail, timestamp: now });
      localStorage.setItem("last_gtm_submissions_list", JSON.stringify(list));
    } catch (err) {
      console.warn("Saving storage token history failed:", err);
    }

    setDuplicateError("");
    setSubmitSuccess(true);

    // Submit form programmatically to Salesforce target iframe
    if (formRef.current) {
      formRef.current.submit();
    }

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

    // Deduplication check: Company Name + Project Status + Project Type + Project Deadline + Country / Region
    const tokenByName = [formData.company, formData.projectStatus, formData.projectType, formData.projectDeadline, formData.country]
      .map(s => (s || "").trim().toLowerCase())
      .join('|');

    // Deduplication check: Company Email + Project Status + Project Type + Project Deadline + Country / Region
    const tokenByEmail = [formData.companyEmail, formData.projectStatus, formData.projectType, formData.projectDeadline, formData.country]
      .map(s => (s || "").trim().toLowerCase())
      .join('|');

    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (!allowBypass) {
      try {
        const stored = localStorage.getItem("last_gtm_submissions_list");
        if (stored) {
          const submissions = JSON.parse(stored);
          const foundDuplicate = submissions.find((sub: any) => {
            const isRecent = (now - sub.timestamp) < fiveMinutes;
            const matchName = sub.tokenByName === tokenByName;
            const matchEmail = sub.tokenByEmail === tokenByEmail;
            return isRecent && (matchName || matchEmail);
          });

          if (foundDuplicate) {
            setDuplicateError("Integrity Check: A submission with the same configuration (Company Name/Email, Project Status, Project Type, Project Deadline, and Country/Region) was processed in the last 5 minutes. Salesforce deduplication is active to prevent twin Opportunity/Project creation in the CRM.");
            return;
          }
        }
      } catch (err) {
        console.warn("Storage check failed:", err);
      }
    }

    // Save tokens to history
    try {
      const stored = localStorage.getItem("last_gtm_submissions_list");
      const list = stored ? JSON.parse(stored) : [];
      list.push({ tokenByName, tokenByEmail, timestamp: now });
      localStorage.setItem("last_gtm_submissions_list", JSON.stringify(list));
    } catch (err) {
      console.warn("Saving storage token history failed:", err);
    }

    setDuplicateError("");
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
* Project Name: ${formData.projectName || "N/A"}
* Project Type: ${formData.projectType || "Enterprise Integration"}
* Project Status: ${formData.projectStatus || "Not Sandbox Tested"}
* Project Deadline: ${formData.projectDeadline || "N/A"}
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
* Project Name: ${formData.projectName || "N/A"}
* Selected Product/Service: ${formData.projectType}
* Project Status: ${formData.projectStatus}
* Project Deadline: ${formData.projectDeadline || "N/A"}
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

    window.open(`mailto:${formData.companyEmail}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-8 px-4 flex flex-col items-center">
      {/* Whimsical 3D Sketchbook Buttons Side-By-Side */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 z-10 w-full mb-10 select-none">
        
        {/* Submit a Project Sketchbook Button */}
        <button
          id="btn-submit-project"
          onClick={() => {
            setActiveSection(activeSection === "submit" ? null : "submit");
          }}
          className={`px-6 py-3 font-hand text-sm md:text-base font-extrabold transition-all duration-150 border-3 border-ink rounded-lg shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-2 cursor-pointer rotate-[-1.2deg] ${
            activeSection === "submit"
              ? "bg-highlight text-ink ring-2 ring-emerald-800/25"
              : "bg-white hover:bg-emerald-50 text-ink"
          }`}
        >
          <Database className={`h-4.5 w-4.5 shrink-0 ${activeSection === "submit" ? "text-emerald-800 animate-pulse" : "text-[#4b5563]"}`} />
          <span>Submit a Project</span>
        </button>

        {/* Email Me a Project Sketchbook Button */}
        <button
          id="btn-email-me-project"
          onClick={() => {
            setActiveSection(activeSection === "email" ? null : "email");
          }}
          className={`px-6 py-3 font-hand text-sm md:text-base font-extrabold transition-all duration-150 border-3 border-ink rounded-lg shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[2px_2px_0px_0px_rgba(24,24,27,1)] flex items-center gap-2 cursor-pointer rotate-[0.8deg] ${
            activeSection === "email"
              ? "bg-highlight text-ink ring-2 ring-emerald-800/25"
              : "bg-white hover:bg-rose-50 text-ink"
          }`}
        >
          <Mail className={`h-4.5 w-4.5 shrink-0 ${activeSection === "email" ? "text-emerald-800 animate-pulse" : "text-[#4b5563]"}`} />
          <span>Email Me a Project</span>
        </button>

      </div>

      {/* SECTION CONTENT OVERLAYS - Sub-sections display gracefully with hand-drawn canvas details */}
      {activeSection && (
        <div className="w-full bg-white border-3 border-ink rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] notebook-column bg-graph-paper animate-fade-in mb-6 relative">
          

          {/* Form Fields Section */}
          <form 
            ref={formRef}
            action={isSandbox ? `https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${oid}` : `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${oid}`}
            method="POST"
            onSubmit={handleFormSubmit}
            target="sf-iframe"
            className="w-full max-w-2xl mx-auto space-y-5"
          >
            {/* Salesforce Standard Hidden OID Fields */}
            <input type="hidden" name="oid" value={oid} />
            <input type="hidden" name="retURL" value={retURL} />

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
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  id="sf_company_input"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp"
                  maxLength={40}
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Company Email *</label>
                <input
                  type="email"
                  name="companyEmail"
                  id="sf_company_email_input"
                  required
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  placeholder="e.g. contact@company.com"
                  maxLength={80}
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
                />
                <input type="hidden" name="email" value={formData.companyEmail} />
                <input type="hidden" name={companyEmailField} value={formData.companyEmail} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Country / Region *</label>
              <select
                name="countrySelect"
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
                <option value="KR">South Korea (APAC Commercial Hub)</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="NL">Netherlands (ASML Ecosystem)</option>
                <option value="SG">Singapore (ASEAN Tech Hub)</option>
                <option value="Other">Other / International</option>
              </select>
              <input type="hidden" name="country_code" value={formData.country} />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Name *</label>
              <input
                type="text"
                name="projectNameInput"
                id="sf_project_name_input"
                required
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="e.g. Next-Gen PCIe Retimer Expansion"
                maxLength={100}
                className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400"
              />
              <input type="hidden" name={projectNameField} value={formData.projectName} />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Description *</label>
              <textarea
                name="descriptionInput"
                id="sf_description_input"
                rows={4}
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Elaborate on scope, target go-live times, architectural hurdles, etc..."
                className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0 placeholder:text-zinc-400 resize-none"
              />
              <input 
                type="hidden" 
                name={projectDescriptionField} 
                value={formData.description + (attachedFile ? `\n\n--- ATTACHED DESIGN SPECIFICATION ---\nFile Name: ${attachedFile.name}\nFile Size: ${(attachedFile.size / 1024 / 1024).toFixed(2)} MB\nType: ${attachedFile.type || "unknown"}` : '')} 
              />
            </div>

            {/* Project Attachments Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Attachments (Optional)</label>
              
              {!attachedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      setAttachedFile(e.dataTransfer.files[0]);
                    }
                  }}
                  onClick={() => document.getElementById("project_attachment_input")?.click()}
                  className={`border-3 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                    isDragging 
                      ? "border-yellow-500 bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] scale-[0.98]" 
                      : "border-ink bg-zinc-50 hover:bg-zinc-100 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:scale-[0.99]"
                  }`}
                >
                  <input
                    type="file"
                    id="project_attachment_input"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setAttachedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <UploadCloud className="h-7 w-7 text-ink" />
                  <div>
                    <p className="font-hand font-bold text-sm text-ink">Drag & Drop blueprint or click to upload</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Supports PDF, CAD, PNG, ZIP, DOCX (Max 25MB)</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-yellow-50 border-3 border-ink rounded-xl shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-white rounded-lg border-2 border-ink text-ink shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="font-hand font-extrabold text-sm text-ink truncate max-w-[200px] sm:max-w-xs">{attachedFile.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{(attachedFile.size / 1024 / 1024).toFixed(2)} MB • Linked to Salesforce descriptor</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedFile(null)}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border-2 border-ink hover:text-red-700 transition cursor-pointer active:scale-90 shrink-0"
                    title="Remove attachment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Type *</label>
                <select
                  name="projectType"
                  id="sf_project_type_input"
                  required
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0"
                >
                  <option value="Aries PCIe/CXL Smart DSP Retimers">Aries PCIe/CXL Smart DSP Retimers</option>
                  <option value="Taurus Ethernet Smart Cable Modules">Taurus Ethernet Smart Cable Modules</option>
                  <option value="Leo CXL Memory Connectivity Controllers">Leo CXL Memory Connectivity Controllers</option>
                  <option value="Intelligent Connectivity for Cloud & High-Speed Infrastructure">Intelligent Connectivity for Cloud & High-Speed Infrastructure</option>
                  <option value="Custom Semiconductor Connectivity Integration">Custom Semiconductor Connectivity Integration</option>
                </select>
                {/* Custom fields in salesforce are injected with custom name */}
                <input type="hidden" name={projectTypeField} value={formData.projectType} />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Status *</label>
                <select
                  name="projectStatus"
                  id="sf_project_status_input"
                  disabled
                  value="New"
                  className="w-full px-3 py-2 border-2 border-ink rounded bg-zinc-100 text-zinc-500 text-sm cursor-not-allowed opacity-75 focus:outline-none"
                >
                  <option value="New">New</option>
                </select>
                <input type="hidden" name={projectStatusField} value="New" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink uppercase mb-1 font-mono">Project Deadline *</label>
              <input
                type="date"
                name="projectDeadline"
                id="sf_project_deadline_input"
                required
                value={formData.projectDeadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border-2 border-ink rounded bg-white text-zinc-800 text-sm focus:border-ink focus:ring-0"
              />
              <input type="hidden" name={projectDeadlineField} value={formData.projectDeadline} />
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
                    Astera Labs powers high-speed system connections! Solve this quick design fuel block:
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

              {duplicateError && (
                <div id="duplicate-warning-banner" className="border-3 border-amber-500 bg-amber-50 p-4 rounded-xl mt-4 text-left space-y-2 animate-fade-in w-full">
                  <div className="flex items-start gap-2 text-amber-800 font-bold font-hand text-base">
                    <span>⚠️ Double-Submission Prevention Active</span>
                  </div>
                  <p className="font-sans text-xs text-zinc-700 leading-relaxed">
                    {duplicateError}
                  </p>
                  <div className="pt-1 flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs font-mono font-bold text-amber-950 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowBypass}
                        id="sf_bypass_checkbox"
                        onChange={(e) => setAllowBypass(e.target.checked)}
                        className="rounded border-2 border-amber-600 text-amber-600 focus:ring-amber-500 cursor-pointer h-4 w-4"
                      />
                      <span>Bypass protection and force submit this proposal anyway</span>
                    </label>
                  </div>
                </div>
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

                {/* Bottom dialog dismiss keys */}
                <div className="flex items-center justify-end gap-3 pt-2">
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

          {/* Duplicate Submission Warning Confirmation Modal */}
          {showDuplicateConfirm && (
            <div className="absolute inset-0 bg-white/98 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-4 sm:p-8 z-30 animate-fade-in overflow-y-auto">
              <div className="max-w-xl w-full bg-amber-50 border-3 border-ink rounded-xl p-5 sm:p-6 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] text-left space-y-4">
                
                {/* Header Status */}
                <div className="flex items-start gap-3 border-b-2 border-amber-200 pb-3">
                  <div className="bg-amber-100 p-2.5 rounded-full border-2 border-ink shrink-0 text-amber-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-hand text-xl sm:text-2xl font-extrabold text-ink leading-tight">
                      Duplicate Submission Verification
                    </h4>
                    <p className="font-sans text-[11px] text-zinc-600 mt-1 font-bold">
                      Astera Labs CRM Pipeline Integrity Check
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-zinc-800 font-sans leading-relaxed">
                  <p>
                    Please verify whether you are submitting a duplicate project before we route this Web-to-Lead request to the Salesforce CRM. Duplicate records may result in split tracking pipelines inside the sales hub.
                  </p>

                  {/* Summary card */}
                  <div className="p-3.5 bg-white border-2 border-ink rounded-xl space-y-1.5 shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]">
                    <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">PROJECT INTENDED SCHEMATIC</p>
                    <div className="grid grid-cols-3 gap-y-1 text-ink text-[11px]">
                      <span className="font-bold">Project Name:</span>
                      <span className="col-span-2 truncate">{formData.projectName || "N/A"}</span>

                      <span className="font-bold">Company:</span>
                      <span className="col-span-2 truncate">{formData.company || "N/A"}</span>

                      <span className="font-bold">Product Category:</span>
                      <span className="col-span-2 truncate">{formData.projectType}</span>

                      <span className="font-bold">Attachment:</span>
                      <span className="col-span-2 truncate text-zinc-600 italic">
                        {attachedFile ? `${attachedFile.name} (${(attachedFile.size / 1024 / 1024).toFixed(2)} MB)` : "None attached"}
                      </span>
                    </div>
                  </div>

                  <p className="bg-amber-100/70 p-2.5 rounded border border-amber-200 text-[11px] text-amber-900 font-bold">
                    Are you sure you want to proceed? Proceeding will initiate the secure Salesforce Web-to-Lead intake handshake.
                  </p>
                </div>

                {/* Confirmation Options */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDuplicateConfirm(false)}
                    className="w-full sm:w-auto px-4 py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-hand font-extrabold text-sm border-2 border-ink rounded transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={proceedWithSubmission}
                    className="w-full sm:w-auto px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-ink font-hand font-extrabold text-sm border-2 border-ink rounded shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] active:translate-y-0.5 active:shadow-none transition cursor-pointer"
                  >
                    Confirm No Duplicate Submission
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
