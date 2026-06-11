/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Experience } from "../types";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Star } from "lucide-react";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  // Keep track of which card index is expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First card open by default

  const toggleExpand = (idx: number) => {
    if (expandedIndex === idx) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(idx);
    }
  };

  return (
    <div className="relative border-l-3 border-ink ml-4 md:ml-8 space-y-10 pl-6 md:pl-10 pb-4">
      {experience.map((item, idx) => {
        const isOpen = expandedIndex === idx;

        // Custom highlight indicator for GTM core roles (first 3-4 items)
        const isCoreGtmLeader = idx < 3;

        return (
          <div key={idx} className="relative group">
            
            {/* Timeline Circle Node */}
            <button
              onClick={() => toggleExpand(idx)}
              className={`absolute left-[-39px] md:left-[-55px] top-1.5 h-6 w-6 md:h-8 md:w-8 rounded-full border-3 border-ink flex items-center justify-center transition-transform duration-200 hover:scale-110 z-10 ${
                isOpen 
                  ? "bg-highlight text-ink rotate-[15deg]" 
                  : "bg-paper text-zinc-500"
              }`}
              title="Expand/Collapse details"
            >
              <Briefcase className="h-3 w-3 md:h-4 md:w-4" />
            </button>

            {/* Main Interactive Roll Container Card */}
            <div className="bg-white border-3 border-ink rounded-xl p-5 md:p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all">
              
              {/* Header block with click-to-expand trigger */}
              <div 
                className="cursor-pointer flex flex-col md:flex-row md:items-start md:justify-between gap-3 select-none"
                onClick={() => toggleExpand(idx)}
              >
                <div>
                  {/* Job Title */}
                  <h4 className="font-sans font-extrabold text-lg md:text-xl text-ink tracking-tight hover:text-zinc-700 flex items-center gap-2 flex-wrap">
                    {item.role}
                    {isCoreGtmLeader && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-[10px] uppercase font-bold text-ink rotate-[1deg]">
                        <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-600 animate-pulse" />
                        Key Role
                      </span>
                    )}
                  </h4>

                  {/* Company Name */}
                  <p className="font-hand text-base text-zinc-800 font-bold mt-1">
                    {item.company}
                  </p>

                  {/* Sub-meta metrics (Dates & Location) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 mt-2">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      {item.dates}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Expand / Collapse Indicator Icon */}
                <div className="self-end md:self-start p-1 bg-zinc-50 border border-zinc-200 rounded-md">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-ink" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-ink animate-bounce" />
                  )}
                </div>
              </div>

              {/* Expandable Bullet list (with high transition smoothness) */}
              <div className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[1000px] opacity-100 mt-6 pt-5 border-t border-dashed border-zinc-300" : "max-h-0 opacity-0 overflow-hidden"
              }`}>
                {/* Specific tool list at the top */}
                <div className="mb-5 flex flex-wrap gap-2 items-center">
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-400 mr-2">Featured Tools:</span>
                  {item.tools.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 font-semibold text-xs bg-sky-50 border border-sky-200 text-sky-800 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-3.5 text-zinc-700 text-sm leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => {
                    // Highlight key CRM/GTM/AI keywords inside the text for better recruiter scanning
                    const parts = bullet.split(/(\b(?:Salesforce|CRM|CPQ|GTM|AI-Powered|AI-augmented|UAT|SOPs|SDLC|BizOps|Quote-to-Cash|SLAs)\b)/g);
                    
                    return (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="font-hand text-lg text-ink font-bold shrink-0 mt-[-3px] select-none">-</span>
                        <span className="flex-1">
                          {parts.map((part, pIdx) => {
                            const isKeyword = /\b(?:Salesforce|CRM|CPQ|GTM|AI-Powered|AI-augmented|UAT|SOPs|SDLC|BizOps|Quote-to-Cash|SLAs)\b/.test(part);
                            return isKeyword ? (
                              <strong key={pIdx} className="text-zinc-950 font-bold bg-[#fef08a]/40 px-0.5 rounded">
                                {part}
                              </strong>
                            ) : (
                              part
                            );
                          })}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};
