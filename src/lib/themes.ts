export type ThemeName = "dark" | "light";

type ThemeDefinition = {
  name: ThemeName;
  label: string;
  tokens: Record<string, string>;
};

export const themes: Record<ThemeName, ThemeDefinition> = {
  dark: {
    name: "dark",
    label: "Midnight UI",
    tokens: {
      "--surface-0": "#0b0f1b",
      "--surface-1": "#10192a",
      "--surface-2": "#16233a",
      "--text-0": "#f8fbff",
      "--text-1": "rgba(248, 251, 255, 0.86)",
      "--text-2": "rgba(248, 251, 255, 0.64)",
      "--border": "rgba(155, 177, 207, 0.2)",
      "--accent": "#22d3ee",
      "--accent-contrast": "#041014",
      "--glow": "0 16px 60px rgba(34, 211, 238, 0.2)",
      "--bg-gradient":
        "radial-gradient(1400px 900px at 16% 14%, rgba(34, 211, 238, 0.14), transparent 58%), radial-gradient(1200px 820px at 86% 10%, rgba(94, 234, 212, 0.12), transparent 65%), linear-gradient(180deg, rgba(10, 15, 27, 0.98), rgba(10, 15, 27, 0.96))",
      "--grid-color": "rgba(120, 155, 208, 0.14)",
      "--flare-1": "rgba(34, 211, 238, 0.3)",
      "--flare-2": "rgba(94, 234, 212, 0.2)",
      "--beam-1": "rgba(255, 255, 255, 0.2)",
      "--beam-2": "rgba(82, 227, 255, 0.22)",
      "--section-color": "rgba(34, 211, 238, 0.22)",
      "--scrollbar-bg": "rgba(255,255,255,0.02)",
      "--scrollbar-thumb": "rgba(34,211,238,0.18)",
      "--scrollbar-thumb-hover": "rgba(34,211,238,0.28)",
      "--scrollbar-width": "12px",
      "--cta-primary-start": "#d73333",
      "--cta-primary-end": "#e74974",
      "--cta-primary-shadow": "rgba(211, 51, 51, 0.32)",
      "--cta-hover-shadow": "rgba(248, 113, 113, 0.22)",
      "--cta-secondary-border-hover": "rgba(248, 113, 113, 0.35)",
      "--cta-ghost-text-hover": "#ffd5db",
    },
  },
  light: {
    name: "light",
    label: "Studio Light",
    tokens: {
      "--surface-0": "#faf6f5",
      "--surface-1": "#ffffff",
      "--surface-2": "#f0e5e3",
      "--text-0": "#1f1215",
      "--text-1": "rgba(31, 18, 21, 0.88)",
      "--text-2": "rgba(31, 18, 21, 0.68)",
      "--border": "rgba(94, 47, 52, 0.2)",
      "--accent": "#ad314b",
      "--accent-contrast": "#ffffff",
      "--glow": "0 16px 42px rgba(173, 49, 75, 0.16)",
      "--bg-gradient":
        "radial-gradient(1200px 780px at 18% 10%, rgba(173, 49, 75, 0.12), transparent 64%), radial-gradient(1000px 720px at 84% 10%, rgba(123, 52, 63, 0.09), transparent 66%), linear-gradient(180deg, #fffdfc, #f4e9e7)",
      "--grid-color": "rgba(94, 47, 52, 0.09)",
      "--flare-1": "rgba(173, 49, 75, 0.16)",
      "--flare-2": "rgba(123, 52, 63, 0.13)",
      "--beam-1": "rgba(92, 37, 44, 0.14)",
      "--beam-2": "rgba(244, 63, 94, 0.18)",
      "--section-color": "rgba(173, 49, 75, 0.16)",
      "--scrollbar-bg": "rgba(94, 47, 52, 0.05)",
      "--scrollbar-thumb": "rgba(173, 49, 75, 0.3)",
      "--scrollbar-thumb-hover": "rgba(173, 49, 75, 0.42)",
      "--scrollbar-width": "12px",
      "--cta-primary-start": "#d73333",
      "--cta-primary-end": "#e74974",
      "--cta-primary-shadow": "rgba(211, 51, 51, 0.24)",
      "--cta-hover-shadow": "rgba(211, 51, 51, 0.18)",
      "--cta-secondary-border-hover": "rgba(211, 51, 51, 0.24)",
      "--cta-ghost-text-hover": "#1d4d5a",
    },
  },
};
