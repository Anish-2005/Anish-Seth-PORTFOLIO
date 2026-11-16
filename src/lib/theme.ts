export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "ui-theme";

/** Inline, render-blocking script: sets theme + js class before first paint (no flash). */
export const themeBootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');d.dataset.theme=t;var c=navigator.connection;if(c&&(c.saveData||/2g$/.test(c.effectiveType||'')))d.setAttribute('data-lite','');}catch(e){document.documentElement.dataset.theme='dark';}setTimeout(function(){document.documentElement.classList.add('reveal-fallback')},3500);})();`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export const THEME_EVENT = "themechange";

/**
 * Switch theme like re-inking the page: the new theme sweeps across the screen behind a fine
 * crimson rule, with the logo's node riding the rule at the toggle. Light rolls down from the
 * top, dark rolls back up from the bottom. Uses the View Transitions API; instant otherwise.
 */
export function applyTheme(next: Theme, origin?: { x: number; y: number }) {
  const root = document.documentElement;
  const commit = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute("content", next === "light" ? "#faf8f6" : "#0a090b"));
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  };

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
  };

  if (!doc.startViewTransition || reduce) {
    commit();
    return;
  }

  const down = next === "light";
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = Math.round(origin?.x ?? w - 40);
  // The rule and its node are full-screen crimson layers that exist only in the new snapshot.
  // Each is clipped down to a moving band (1px line, 7px node), so they animate exactly like the
  // reveal itself (same property, same timing) and can never drift from the edge.
  const layers = ["line", "node"].map((part) => {
    const el = document.createElement("div");
    el.className = `theme-sweep theme-sweep-${part}`;
    el.setAttribute("aria-hidden", "true");
    return el;
  });

  const transition = doc.startViewTransition(() => {
    commit();
    layers.forEach((el) => document.body.appendChild(el));
  });

  const timing = { duration: 900, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "both" as const };
  const from = down ? 0 : h;
  const to = down ? h : 0;
  // A horizontal band of half-height `half` centred on edge `e` (optionally narrowed and rounded).
  const band = (e: number, half: number, left = 0, right = 0, round = "") =>
    `inset(${e - half}px ${right}px ${h - e - half}px ${left}px${round})`;
  const travel = (clip: (e: number) => string) => [
    { clipPath: clip(from), opacity: 1, offset: 0 },
    { opacity: 1, offset: 0.86 },
    { clipPath: clip(to), opacity: 0, offset: 1 },
  ];

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: down
            ? [`inset(0px 0px ${h}px 0px)`, "inset(0px 0px 0px 0px)"]
            : [`inset(${h}px 0px 0px 0px)`, "inset(0px 0px 0px 0px)"],
        },
        { ...timing, pseudoElement: "::view-transition-new(root)" },
      );
      root.animate(
        travel((e) => band(e, 0.5)),
        { ...timing, pseudoElement: "::view-transition-new(theme-sweep-line)" },
      );
      root.animate(
        travel((e) => band(e, 3.5, x - 3.5, w - x - 3.5, " round 3.5px")),
        { ...timing, pseudoElement: "::view-transition-new(theme-sweep-node)" },
      );
    })
    .catch(() => {});
  transition.finished.finally(() => layers.forEach((el) => el.remove()));
}
