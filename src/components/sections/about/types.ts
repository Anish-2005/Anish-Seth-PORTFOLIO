import type { ComponentType } from "react";

export type Principle = {
  icon: ComponentType;
  title: string;
  description: string;
};

export type AboutSkills = {
  frontend: string[];
  backend: string[];
  tools: string[];
};

export type JourneyEntry = {
  year: string;
  title: string;
  description: string;
};

export type AboutData = {
  headline: string;
  description: string;
  principles: Principle[];
  skills: AboutSkills;
  journey: JourneyEntry[];
};

export type AboutPalette = {
  accent: string;
  accentStrong: string;
  glow: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  textSub: string;
  beam?: string;
  highlight?: string;
  shadow?: string;
};
