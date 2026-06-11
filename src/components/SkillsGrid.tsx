/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { SkillCategory } from "../types";
import { Sparkles } from "lucide-react";

interface SkillsGridProps {
  categories: SkillCategory[];
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((cat, idx) => {
        // Find custom marker highlights from CSS variables
        const highlightClass = (() => {
          switch (cat.markerColor) {
            case "marker-blue":
              return "bg-marker-blue";
            case "marker-green":
              return "bg-marker-green";
            case "marker-orange":
              return "bg-marker-orange";
            default:
              return "bg-highlight";
          }
        })();

        // Distribute alternating border tilts
        const borderTilt = idx % 2 === 0 
          ? "rounded-[15px_225px_15px_225px/12px_15px_22px_15px]" 
          : "rounded-[225px_15px_225px_15px/15px_22px_15px_12px]";

        return (
          <div
            key={idx}
            className={`bg-white border-3 border-ink ${borderTilt} p-6 shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] hover:shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] transition-all`}
          >
            {/* Category header styled with notebook title highlighter */}
            <div className="inline-block relative mb-6">
              {/* Highlighter stroke background */}
              <div className={`absolute inset-0 ${highlightClass} -skew-y-2 opacity-85 transform translate-y-1.5`}></div>
              <h4 className="relative font-hand text-xl font-black text-ink px-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0" />
                {cat.category}
              </h4>
            </div>

            {/* List of skills with a whiteboard dot marker */}
            <ul className="space-y-3">
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center gap-3">
                  {/* Miniature hand-drawn bullet button representation */}
                  <span className="h-3 w-3 rounded-full bg-ink shrink-0 inline-block border border-white transform rotate-[45deg] shadow-sm"></span>
                  <span className="font-sans font-medium text-sm text-zinc-800">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
