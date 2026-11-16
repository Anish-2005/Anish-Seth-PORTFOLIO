"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { OPEN_COMMAND_EVENT } from "@/components/site/Nav";
import { profile, projects } from "@/data/portfolio";
import { applyTheme, getTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  group: "Navigate" | "Case studies" | "Actions" | "Profiles";
  label: string;
  hint?: string;
  icon: IconName;
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
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

  const goTo = useCallback(
    (id: string) => {
      close();
      if (pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    },
    [close, pathname, router],
  );

  const external = useCallback(
    (href: string) => {
      close();
      window.open(href, "_blank", "noopener,noreferrer");
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "about", label: "About", icon: "users" },
      { id: "experience", label: "Experience", icon: "branch" },
      { id: "work", label: "Selected work", icon: "layers" },
      { id: "skills", label: "Skills & capabilities", icon: "cpu" },
      { id: "open-source", label: "Open source activity", icon: "github" },
      { id: "recognition", label: "Awards & certifications", icon: "trophy" },
      { id: "contact", label: "Contact", icon: "mail" },
    ].map((n) => ({ ...n, id: `nav-${n.id}`, group: "Navigate" as const, icon: n.icon as IconName, run: () => goTo(n.id) }));

    const studies: Command[] = projects.map((p) => ({
      id: `p-${p.slug}`,
      group: "Case studies",
      label: p.title,
      hint: p.kicker,
      icon: "file",
      keywords: `${p.stack.join(" ")} ${p.kicker}`,
      run: () => {
        close();
        router.push(`/projects/${p.slug}`);
      },
    }));

    const actions: Command[] = [
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: "copy",
        keywords: "mail contact",
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setToast("Email copied"),
            () => setToast(profile.email),
          );
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark theme",
        icon: "sun",
        keywords: "mode appearance",
        run: () => {
          close();
          applyTheme(getTheme() === "dark" ? "light" : "dark");
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé (PDF)",
        icon: "download",
        keywords: "cv resume pdf",
        run: () => {
          close();
          window.open(profile.links.resume, "_blank", "noopener");
        },
      },
    ];

    const profiles: Command[] = [
      { id: "gh", label: "GitHub", hint: "@Anish-2005", icon: "github" as const, href: profile.links.github },
      { id: "li", label: "LinkedIn", hint: "in/anishseth", icon: "linkedin" as const, href: profile.links.linkedin },
      { id: "x", label: "X / Twitter", hint: "@AnishSeth170734", icon: "x" as const, href: profile.links.x },
      { id: "lc", label: "LeetCode", hint: "Anish_Seth", icon: "leetcode" as const, href: profile.links.leetcode },
      { id: "ig", label: "Instagram", hint: "@_anish.seth_", icon: "instagram" as const, href: profile.links.instagram },
    ].map(({ href, ...p }) => ({ ...p, group: "Profiles" as const, run: () => external(href) }));

    return [...nav, ...actions, ...studies, ...profiles];
  }, [close, external, goTo, router]);

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [commands, query]);

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
      filtered[activeIndex]?.run();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command menu"
      className="m-0 mx-auto mt-[12vh] w-[min(640px,calc(100vw-24px))] max-w-none overflow-hidden rounded-2xl border border-line-strong bg-bg-elev p-0 text-fg shadow-[var(--shadow-pop)] backdrop:bg-transparent open:animate-[fade-in_.35s_var(--ease-out-expo)]"
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
          placeholder="Search sections, case studies, actions…"
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
                  onClick={() => c.run()}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    i === activeIndex ? "bg-bg-elev-2 text-fg" : "text-muted",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg border border-line",
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
