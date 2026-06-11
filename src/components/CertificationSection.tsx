/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Certification } from "../types";
import { Award, Zap, Shield, CheckCircle } from "lucide-react";

interface CertificationSectionProps {
  certifications: Certification[];
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({ certifications }) => {
  const [filter, setFilter] = useState<"all" | "salesforce" | "other">("all");

  const filteredCerts = certifications.filter((cert) => {
    if (filter === "all") return true;
    if (filter === "salesforce") return cert.isSalesforce;
    return !cert.isSalesforce;
  });

  // Count to show on badges
  const totalSf = certifications.filter(c => c.isSalesforce).length;
  const totalOther = certifications.filter(c => !c.isSalesforce).length;

  return (
    <div>
      {/* Dynamic Hand-Drawn Styled Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          onClick={() => setFilter("all")}
          className={`px-5 py-2 hover-sketch transition-all duration-200 font-hand text-base rounded-[10px_100px_15px_100px/10px_15px_100px_15px] border-2 border-ink ${
            filter === "all" ? "bg-highlight text-ink font-bold handdrawn-shadow-sm" : "bg-paper text-zinc-600"
          }`}
        >
          All Credentials ({certifications.length})
        </button>
        <button
          onClick={() => setFilter("salesforce")}
          className={`px-5 py-2 hover-sketch transition-all duration-200 font-hand text-base rounded-[80px_10px_100px_15px/15px_100px_10px_120px] border-2 border-ink ${
            filter === "salesforce" ? "bg-marker-blue text-ink font-bold handdrawn-shadow-sm" : "bg-paper text-zinc-600"
          }`}
        >
          Salesforce Platform ({totalSf}x)
        </button>
        <button
          onClick={() => setFilter("other")}
          className={`px-5 py-2 hover-sketch transition-all duration-200 font-hand text-base rounded-[120px_15px_100px_10px/10px_120px_15px_100px] border-2 border-ink ${
            filter === "other" ? "bg-marker-green text-ink font-bold handdrawn-shadow-sm" : "bg-paper text-zinc-600"
          }`}
        >
          Other GTM Platforms ({totalOther})
        </button>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCerts.map((cert, idx) => {
          // Identify badge colors
          const badgeBg = (() => {
            switch (cert.badgeColor) {
              case "yellow":
                return "bg-[#fef08a]";
              case "blue":
                return "bg-[#93c5fd]";
              case "green":
                return "bg-[#86efac]";
              default:
                return "bg-[#fed7aa]";
            }
          })();

          // Pick an icon based on certificate keywords
          const renderIcon = () => {
            const lowerName = cert.name.toLowerCase();
            if (lowerName.includes("architect") || lowerName.includes("designer")) {
              return <Shield className="h-5 w-5 text-ink shrink-0" />;
            }
            if (lowerName.includes("ai") || lowerName.includes("ranger")) {
              return <Zap className="h-5 w-5 text-ink shrink-0 animate-pulse" />;
            }
            if (lowerName.includes("consultant")) {
              return <Award className="h-5 w-5 text-ink shrink-0" />;
            }
            return <CheckCircle className="h-5 w-5 text-ink shrink-0" />;
          };

          return (
            <div
              key={idx}
              className={`group flex items-start gap-3 p-4 bg-paper handdrawn-border-sm hover:translate-y-[-2px] hover:handdrawn-shadow-sm transition-all duration-150`}
            >
              {/* Little colored credential representation card */}
              <div className={`p-2 rounded-lg border border-ink ${badgeBg} flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(24,24,27,1)]`}>
                {renderIcon()}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-sans font-bold text-sm text-ink leading-snug truncate-3-lines" title={cert.name}>
                  {cert.name}
                </h4>
                <p className="font-hand text-xs text-zinc-600 leading-tight mt-1">
                  {cert.issuer}
                </p>
                {cert.isSalesforce && (
                  <span className="inline-block px-1.5 py-0.5 font-mono text-[9px] bg-sky-50 text-sky-800 border border-sky-300 rounded mt-2 uppercase font-semibold">
                    Salesforce certified
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
