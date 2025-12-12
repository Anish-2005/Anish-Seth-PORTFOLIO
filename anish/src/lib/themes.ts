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
    },
  },
  light: {
    name: "light",
    label: "Studio Day",
    tokens: {
      "--surface-0": "#f6fbff",
      "--surface-1": "#ffffff",
      "--surface-2": "#ecf2f8",
      "--text-0": "#0c1220",
      "--text-1": "rgba(12, 18, 32, 0.86)",
      "--text-2": "rgba(12, 18, 32, 0.62)",
      "--border": "rgba(12, 18, 32, 0.12)",
      "--accent": "#14b8a6",
      "--accent-contrast": "#021011",
      "--glow": "0 16px 50px rgba(20, 184, 166, 0.18)",
      "--bg-gradient":
        "radial-gradient(1400px 880px at 18% 10%, rgba(20, 184, 166, 0.18), transparent 62%), radial-gradient(1200px 820px at 82% 8%, rgba(14, 165, 233, 0.12), transparent 66%), linear-gradient(180deg, #f6fbff, #eef4fa)",
      "--grid-color": "rgba(12, 18, 32, 0.08)",
      "--flare-1": "rgba(20, 184, 166, 0.2)",
      "--flare-2": "rgba(14, 165, 233, 0.16)",
      "--beam-1": "rgba(10, 132, 255, 0.16)",
      "--beam-2": "rgba(20, 184, 166, 0.18)",
    },
  },
};
