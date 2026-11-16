"use client";

import { Fragment, useEffect, useRef } from "react";

const WORDS = ["Anish", "Seth"];
const BASE = { wg: 640, wd: 104 };
const PEAK = { wg: 900, wd: 118 };
const IDLE_MS = 3200;
const WAVE_MS = 2400;

/**
 * The hero name. Each letter's weight and width (Archivo's variable axes) swell toward the
 * pointer; on touch devices, or when the pointer rests, a slow wave travels through instead.
 * The same position drives the accent dot spotlight on the hero via --hx / --hy.
 */
export function Wordmark({ hostId }: { hostId: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = document.getElementById(hostId);
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-ch]"));
    let centers: number[] = [];
    let box = el.getBoundingClientRect();
    let hostBox = host.getBoundingClientRect();
    let frame = 0;
    let waveFrame = 0;
    let idleTimer = 0;
    let visible = true;
    let pending: { x: number; y: number } | null = null;

    const measure = () => {
      box = el.getBoundingClientRect();
      hostBox = host.getBoundingClientRect();
      centers = letters.map((l) => {
        const r = l.getBoundingClientRect();
        return r.left + r.width / 2 - box.left;
      });
    };

    /** x, y relative to the wordmark box; null resets to the resting state. */
    const apply = (x: number | null, y = 0, strength = 1) => {
      const radius = Math.max(box.width * 0.11, 70);
      const vy = Math.exp(-Math.pow(y / (box.height * 2.4 || 1), 2));
      letters.forEach((l, i) => {
        const t = x === null ? 0 : Math.exp(-Math.pow((centers[i] - x) / radius, 2)) * vy * strength;
        l.style.setProperty("--wg", String(Math.round(BASE.wg + (PEAK.wg - BASE.wg) * t)));
        l.style.setProperty("--wd", (BASE.wd + (PEAK.wd - BASE.wd) * t).toFixed(1));
      });
    };

    const spotlight = (clientX: number, clientY: number) => {
      host.style.setProperty("--hx", `${clientX - hostBox.left}px`);
      host.style.setProperty("--hy", `${clientY - hostBox.top}px`);
    };

    const stopWave = () => {
      if (waveFrame) cancelAnimationFrame(waveFrame);
      waveFrame = 0;
    };

    const scheduleWave = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(runWave, IDLE_MS);
    };

    const runWave = () => {
      if (!visible || document.visibilityState !== "visible") return scheduleWave();
      measure();
      const start = performance.now();
      const from = -0.15 * box.width;
      const to = 1.15 * box.width;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / WAVE_MS);
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        const x = from + (to - from) * eased;
        apply(x, 0, 0.85);
        spotlight(box.left + x, box.top + box.height / 2);
        if (p < 1) waveFrame = requestAnimationFrame(tick);
        else {
          waveFrame = 0;
          apply(null);
          scheduleWave();
        }
      };
      waveFrame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      stopWave();
      window.clearTimeout(idleTimer);
      pending = { x: e.clientX, y: e.clientY };
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (!pending) return;
          spotlight(pending.x, pending.y);
          apply(pending.x - box.left, pending.y - (box.top + box.height / 2));
        });
    };

    const onLeave = () => {
      pending = null;
      apply(null);
      scheduleWave();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stopWave();
    });

    const onResize = () => measure();
    const onScroll = () => {
      box = el.getBoundingClientRect();
      hostBox = host.getBoundingClientRect();
    };

    io.observe(host);
    document.fonts?.ready.then(measure);
    measure();
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    // First wave shortly after the intro animation settles.
    idleTimer = window.setTimeout(runWave, 2200);

    return () => {
      io.disconnect();
      stopWave();
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [hostId]);

  return (
    <h1 ref={ref} className="wordmark select-none text-fg" aria-label="Anish Seth">
      {WORDS.map((word, w) => {
        const offset = WORDS.slice(0, w).join("").length;
        return (
          <Fragment key={word}>
            {/* A real space keeps the heading text "Anish Seth" for crawlers; whitespace-only flex children don't render. */}
            {w > 0 ? " " : null}
            <span className="wordmark-word" aria-hidden>
              {word.split("").map((ch, c) => (
                <span key={c} data-ch style={{ "--i": offset + c } as React.CSSProperties}>
                  {ch}
                </span>
              ))}
              {w < WORDS.length - 1 ? <span data-space /> : null}
            </span>
          </Fragment>
        );
      })}
    </h1>
  );
}
