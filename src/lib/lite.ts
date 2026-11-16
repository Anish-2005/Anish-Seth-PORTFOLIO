"use client";

import { useSyncExternalStore } from "react";

/**
 * True when the visitor has Data Saver on or is on a 2G connection. The boot script in theme.ts
 * marks <html data-lite> before first paint; components use this to skip optional downloads
 * such as link prefetching.
 */
export function useLite() {
  return useSyncExternalStore(
    () => () => {},
    () => document.documentElement.hasAttribute("data-lite"),
    () => false,
  );
}
