"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { OPEN_COMMAND_EVENT } from "@/components/site/Nav";

const CommandPalette = dynamic(() => import("@/components/site/CommandPalette").then((m) => m.CommandPalette), { ssr: false });

/**
 * Keeps the command palette (and the project list it searches) out of the first page load.
 * Its code is fetched the first time someone asks for it, with ⌘K / Ctrl+K or the nav.
 */
export function CommandPaletteLoader() {
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    if (wanted) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setWanted(true);
      }
    };
    const onOpen = () => setWanted(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, [wanted]);

  return wanted ? <CommandPalette autoOpen /> : null;
}
