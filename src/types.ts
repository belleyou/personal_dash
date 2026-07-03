/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  tools: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  dates: string;
}

export interface Certification {
  name: string;
  issuer: string;
  badgeColor: "yellow" | "blue" | "green" | "orange";
  date?: string;
  isSalesforce: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
  markerColor: "marker-blue" | "marker-green" | "marker-orange" | "highlight";
}

export interface Project {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  demoUrl?: string;
  aiUse?: string;
}

export interface MetricCard {
  value: string;
  label: string;
  explanation: string;
  markerColor: "marker-blue" | "marker-green" | "marker-orange" | "highlight";
}

export interface Article {
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  linkedInUrl: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
}

