"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js (offline support and instant repeat visits) in production only, after the page
 * has fully loaded so it never competes with the first visit for bandwidth.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* not critical: the site works the same without it */
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
