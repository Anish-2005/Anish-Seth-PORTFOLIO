"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 15_000);
  return () => window.clearInterval(id);
}

/** Live local time in Kolkata. Renders a placeholder on the server. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--");
  return (
    <time className={className} suppressHydrationWarning>
      {time} IST
    </time>
  );
}
