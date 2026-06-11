/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Project } from "../types";
import { ArrowUpRight, Code, AlertTriangle, Lightbulb, TrendingUp, Sparkles, FolderDot } from "lucide-react";

interface ProjectsShowcaseProps {
  traditional: Project[];
  aiGtm: Project[];
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ traditional, aiGtm }) => {
  const [activeTab, setActiveTab] = useState<"traditional" | "ai">("ai");

  return (
    <div>
      {/* Folder-like navigation tabs for Traditional vs AI */}
      <div className="flex border-b-3 border-ink mb-10 w-full">
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-6 py-4 font-hand text-lg md:text-xl font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-xl translate-y-[3px] select-none ${
            activeTab === "ai"
              ? "bg-highlight text-ink border-b-3 border-b-highlight z-10"
              : "bg-zinc-100 text-zinc-500 opacity-80 border-b-3 border-b-ink hover:text-ink hover:bg-neutral-50"
          }`}
        >
          <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
          AI GTM & Gen AI Prototypes
        </button>
        <button
          onClick={() => setActiveTab("traditional")}
          className={`flex items-center gap-2 px-6 py-4 font-hand text-lg md:text-xl font-bold transition-all border-t-3 border-x-3 border-ink rounded-t-xl translate-y-[3px] select-none ${
            activeTab === "traditional"
              ? "bg-marker-blue text-ink border-b-3 border-b-marker-blue z-10"
              : "bg-zinc-100 text-zinc-500 opacity-80 border-b-3 border-b-ink hover:text-ink hover:bg-neutral-50"
          }`}
        >
          <FolderDot className="h-5 w-5 text-blue-600" />
          Traditional GTM Solutions
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(activeTab === "ai" ? aiGtm : traditional).map((project, idx) => {
          return (
            <div
              key={idx}
              className="bg-white border-3 border-ink rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)] hover:shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] hover:translate-y-[-2px] transition-all flex flex-col justify-between"
            >
              <div>
                {/* AI Custom Banner */}
                {project.aiUse && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-hand text-xs font-bold leading-none rotate-[-1deg]">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    AI Workflow: {project.aiUse}
                  </div>
                )}

                {/* Project Title */}
                <h4 className="font-sans font-extrabold text-xl md:text-2xl text-ink tracking-tight mb-6 flex items-center justify-between">
                  {project.title}
                  <FolderDot className="h-5 w-5 text-zinc-400 shrink-0 ml-2" />
                </h4>

                {/* Problem, Solution, Impact Grid with handdrawn hints */}
                <div className="space-y-4">
                  {/* Problem */}
                  <div className="flex gap-3">
                    <span className="p-1 px-1.5 h-6 bg-red-100 text-red-700 border border-red-300 rounded text-[10px] font-bold uppercase shrink-0">
                      Problem
                    </span>
                    <p className="font-sans text-sm text-zinc-600 leading-relaxed pt-0.5">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="flex gap-3">
                    <span className="p-1 px-1.5 h-6 bg-blue-100 text-blue-700 border border-blue-300 rounded text-[10px] font-bold uppercase shrink-0">
                      Solution
                    </span>
                    <p className="font-sans text-sm text-zinc-600 leading-relaxed pt-0.5">
                      {project.solution}
                    </p>
                  </div>

                  {/* Highlighted Impact */}
                  <div className="flex gap-3">
                    <span className="p-1 px-1.5 h-6 bg-green-100 text-green-700 border border-green-300 rounded text-[10px] font-bold uppercase shrink-0">
                      Impact
                    </span>
                    <div className="relative inline-block w-full pt-0.5">
                      <span className="bg-highlight px-1 text-ink font-sans font-bold text-sm leading-relaxed rounded-sm">
                        {project.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools and Demo Section */}
              <div className="mt-8 pt-6 border-t border-dashed border-zinc-300 flex flex-wrap items-center justify-between gap-4">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                  {project.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 font-mono text-[10px] text-zinc-600 bg-zinc-100 border border-zinc-300 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Demo Action Button (Clickable bookmark link with instructions comment for later) */}
                <a
                  href={project.demoUrl}
                  onClick={(e) => {
                    // Alert users this is a custom anchor placeholder edit point
                    if (project.demoUrl === "#") {
                      e.preventDefault();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper border border-ink text-xs font-hand font-bold rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  Demo Link
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="font-hand text-xs text-zinc-500 italic">
          * Note for Bao: You can easily substitute your own final private YouTube or Loom video demo anchor targets inside /src/data.ts
        </p>
      </div>
    </div>
  );
};
