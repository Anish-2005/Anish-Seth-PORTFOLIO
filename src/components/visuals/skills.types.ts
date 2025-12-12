export type SkillsData = {
  clusters: Array<{
    name: string;
    weight: number;
    skills: Array<{
      name: string;
      weight: number;
      examples: string[];
    }>;
  }>;
};

export type SkillsMode = "distribution" | "mapping" | "impact";
