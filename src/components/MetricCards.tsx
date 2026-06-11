/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MetricCard } from "../types";

interface MetricCardsProps {
  metrics: MetricCard[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {metrics.map((item, idx) => {
        // Find custom marker highlights from CSS variables
        const markerClass = (() => {
          switch (item.markerColor) {
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

        return (
          <div
            key={idx}
            className="group relative bg-paper handdrawn-border handdrawn-shadow hover:translate-y-[-4px] hover:handdrawn-shadow-lg transition-all duration-200 p-8 flex flex-col justify-between"
          >
            {/* Playful sketched tape/marker line at the top corner */}
            <div className={`absolute top-3 right-4 px-3 py-1 font-hand text-xs ${markerClass} border border-ink rotate-[-4deg] opacity-90 rounded-sm select-none`}>
              Impact #{idx + 1}
            </div>

            <div>
              {/* Huge outstanding handwritten value */}
              <div className="font-hand text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-3">
                {item.value}
              </div>

              {/* Bold subtitle */}
              <h4 className="font-sans font-bold text-lg text-ink leading-tight mb-2">
                {item.label}
              </h4>
            </div>

            {/* Clear explanation sentence */}
            <p className="font-sans text-sm text-zinc-700 leading-relaxed mt-2 border-t border-dashed border-zinc-400 pt-2">
              {item.explanation}
            </p>
          </div>
        );
      })}
    </div>
  );
};
