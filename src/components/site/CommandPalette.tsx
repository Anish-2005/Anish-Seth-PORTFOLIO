"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { OPEN_COMMAND_EVENT } from "@/components/site/Nav";
import { projects } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { applyTheme, getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Action =
  | { type: "section"; id: string }
  | { type: "route"; href: string }
  | { type: "external"; href: string }
  | { type: "copy-email" }
  | { type: "theme" };

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Actions" | "Profiles";
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  action: Action;
};

/** Pure data — built once at module load, executed by the component's handler. */
const COMMANDS: Command[] = [
  ...(
    [
      ["about", "About", "users"],
      ["experience", "Experience", "branch"],
      ["work", "Work", "layers"],
      ["skills", "Skills & capabilities", "cpu"],
      ["open-source", "Open source activity", "github"],
      ["recognition", "Awards & certifications", "trophy"],
      ["contact", "Contact", "mail"],
    ] as const
  ).map(([id, label, icon]) => ({
    id: `nav-${id}`,
    group: "Navigate" as const,
    label,
    icon,
    action: { type: "section" as const, id },
  })),
  {
    id: "photography",
    group: "Navigate",
    label: "Photography",
    icon: "file",
    keywords: "photos pictures portraits images gallery",
    action: { type: "route", href: "/photography" },
  },
  {
    id: "copy-email",
    group: "Actions",
    label: "Copy email address",
    hint: profile.email,
    icon: "copy",
    keywords: "mail contact",
    action: { type: "copy-email" },
  },
  { id: "theme", group: "Actions", label: "Toggle light / dark theme", icon: "sun", keywords: "mode appearance", action: { type: "theme" } },
  {
    id: "resume",
    group: "Actions",
    label: "Download résumé (PDF)",
    icon: "download",
    keywords: "cv resume pdf",
    action: { type: "external", href: profile.links.resume },
  },
  ...projects.map((p) => ({
    id: `p-${p.slug}`,
    group: "Projects" as const,
    label: p.title,
    hint: p.kicker,
    icon: "file" as const,
    keywords: `${p.stack.join(" ")} ${p.kicker}`,
    action: { type: "route" as const, href: `/projects/${p.slug}` },
  })),
  ...(
    [
      ["gh", "GitHub", "@Anish-2005", "github", profile.links.github],
      ["li", "LinkedIn", "in/anishseth", "linkedin", profile.links.linkedin],
      ["x", "X / Twitter", "@AnishSeth170734", "x", profile.links.x],
      ["lc", "LeetCode", "Anish_Seth", "leetcode", profile.links.leetcode],
      ["ig", "Instagram", "@anishseth.in", "instagram", profile.links.instagram],
    ] as const
  ).map(([id, label, hint, icon, href]) => ({
    id,
    group: "Profiles" as const,
    label,
    hint,
    icon,
    action: { type: "external" as const, href },
  })),
];

/** `autoOpen`: the loader mounts this on the first request, so open straight away. */
export function CommandPalette({ autoOpen = false }: { autoOpen?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const close = useCallback(() => dialogRef.current?.close(), []);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setActiveIndex(0);
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  function execute(command: Command | undefined) {
    if (!command) return;
    const { action } = command;
    switch (action.type) {
      case "section":
        close();
        if (pathname === "/") {
          document.getElementById(action.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${action.id}`);
        } else {
          router.push(`/#${action.id}`);
        }
        break;
      case "route":
        close();
        router.push(action.href);
        break;
      case "external":
        close();
        window.open(action.href, "_blank", "noopener,noreferrer");
        break;
      case "copy-email":
        navigator.clipboard?.writeText(profile.email).then(
          () => setToast("Email copied"),
          () => setToast(profile.email),
        );
        break;
      case "theme":
        close();
        applyTheme(getTheme() === "dark" ? "light" : "dark");
        break;
    }
  }

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return COMMANDS;
    return COMMANDS.filter((c) => {
      const hay = `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [query]);

  // Global shortcut + external open requests.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_EVENT, open);
    };
  }, [close, open]);

  // First mount from the loader: the search is already empty, so just show the dialog.
  useEffect(() => {
    const d = dialogRef.current;
    if (!autoOpen || !d || d.open) return;
    d.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [autoOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[activeIndex]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      className="m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-24px))] max-w-none overflow-hidden rounded-[4px] border border-line-strong bg-bg-elev p-0 text-fg shadow-[var(--shadow-pop)] backdrop:bg-transparent open:animate-[fade-in_.35s_var(--ease-out-expo)]"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Icon name="search" size={17} className="text-subtle" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Jump to a section, project or link…"
          className="h-14 flex-1 bg-transparent text-[0.95rem] text-fg outline-none placeholder:text-subtle"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
          aria-autocomplete="list"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">ESC</kbd>
      </div>

      <ul ref={listRef} id="command-list" role="listbox" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <li className="px-3 py-10 text-center text-sm text-subtle">No results for “{query}”</li>
        ) : (
          filtered.map((c, i) => {
            const showGroup = i === 0 || filtered[i - 1].group !== c.group;
            return (
              <li key={c.id} role="presentation">
                {showGroup ? (
                  <div className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{c.group}</div>
                ) : null}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === activeIndex}
                  data-index={i}
                  onMouseMove={() => setActiveIndex(i)}
                  onClick={() => execute(c)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm transition-colors",
                    i === activeIndex ? "bg-bg-elev-2 text-fg" : "text-muted",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-[3px] border border-line",
                      i === activeIndex ? "text-accent-ink" : "text-subtle",
                    )}
                  >
                    <Icon name={c.icon} size={15} />
                  </span>
                  <span className="truncate">{c.label}</span>
                  {c.hint ? <span className="ml-auto truncate pl-3 text-xs text-subtle">{c.hint}</span> : null}
                  {i === activeIndex ? <Icon name="arrow-right" size={14} className="shrink-0 text-subtle" /> : null}
                </div>
              </li>
            );
          })
        )}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
        <span className="flex items-center gap-3">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
        </span>
        <span aria-live="polite" className={cn("transition-opacity", toast ? "text-ok opacity-100" : "opacity-0")}>
          {toast ?? "·"}
        </span>
      </div>
    </dialog>
  );
}
