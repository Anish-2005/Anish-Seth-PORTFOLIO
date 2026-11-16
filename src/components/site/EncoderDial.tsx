"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import "./encoder-dial.css";

const SHELL = 1240; // keep in sync with --shell
const MIN_MARGIN = 56; // laptops and up
const SPIN = 0.06; // degrees of rotation per pixel scrolled
const BITS = 4;
const SECTORS = 1 << BITS;
const RADII = [21, 30, 39, 48]; // one track per bit, most significant bit innermost

const gray = (k: number) => k ^ (k >> 1);
const sectorAngle = (k: number) => -90 + (k * 360) / SECTORS; // sector 0 starts at 12 o'clock
const polar = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return [(r * Math.cos(t)).toFixed(2), (r * Math.sin(t)).toFixed(2)];
};

/** The disk's arcs: on each track, the runs of sectors where that Gray-code bit is 1. */
const ARCS = (() => {
  const out: { key: string; bit: number; d: string }[] = [];
  for (let b = 0; b < BITS; b++) {
    const r = RADII[BITS - 1 - b];
    for (let k = 0; k < SECTORS; ) {
      if (!((gray(k) >> b) & 1)) {
        k++;
        continue;
      }
      const start = k;
      while (k < SECTORS && (gray(k) >> b) & 1) k++;
      const [x0, y0] = polar(r, sectorAngle(start));
      const [x1, y1] = polar(r, sectorAngle(k));
      out.push({ key: `${b}-${start}`, bit: b, d: `M${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}` });
    }
  }
  return out;
})();

type Layer = { id: number; leaving: boolean };

/**
 * A rotary encoder in the empty left margin (laptop widths and up), shown once you're past the hero.
 * The disk carries a 4-bit Gray code and turns as you scroll; the read head at 12 o'clock lights the
 * bits passing under it, so only one bit ever flips at a time. The crimson rim fills as you read
 * each section, and every new section wipes the disk and draws it again.
 */
export function EncoderDial() {
  const pathname = usePathname();
  const [margin, setMargin] = useState(0);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [on, setOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only where there's a real margin left of the shell.
  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${SHELL + MIN_MARGIN * 2}px)`);
    const update = () => setMargin(wide.matches ? Math.floor((document.documentElement.clientWidth - SHELL) / 2) : 0);
    update();
    wide.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      wide.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !margin) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rim = root.querySelector<SVGCircleElement>("[data-rim]");
    const disk = root.querySelector<SVGGElement>("[data-disk]");
    const bits = Array.from(root.querySelectorAll<SVGCircleElement>("[data-bit]"));

    let sections: HTMLElement[] = [];
    let list: Layer[] = [];
    let nextId = 0;
    let active = -1;
    let p = 0;
    let angle = reduce ? 0 : window.scrollY * SPIN;
    let last = performance.now();
    let raf = 0;
    const timers: number[] = [];

    const commit = () => setLayers(list.slice());
    const collect = () => {
      sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    };

    const show = (s: number) => {
      const outgoing = list.filter((l) => !l.leaving).map((l) => l.id);
      list = list.map((l) => ({ ...l, leaving: true }));
      if (s >= 0) list.push({ id: ++nextId, leaving: false });
      commit();
      setOn(s >= 0);
      timers.push(
        window.setTimeout(
          () => {
            list = list.filter((l) => !outgoing.includes(l.id));
            commit();
          },
          reduce ? 0 : 900,
        ),
      );
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - last);
      last = now;
      const line = window.innerHeight * 0.5;
      let idx = -1;
      for (let i = 0; i < sections.length; i++) if (sections[i].getBoundingClientRect().top <= line) idx = i;
      if (idx !== active) {
        active = idx;
        show(idx);
      }

      let target = 0;
      if (idx >= 0) {
        const r = sections[idx].getBoundingClientRect();
        target = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
      }
      const spin = reduce ? 0 : window.scrollY * SPIN;
      const k = reduce ? 1 : 1 - Math.exp(-dt / 140);
      p += (target - p) * k;
      angle += (spin - angle) * k;
      const settled = Math.abs(target - p) < 0.0005 && Math.abs(spin - angle) < 0.01;
      if (settled) {
        p = target;
        angle = spin;
      }

      if (rim) rim.style.strokeDashoffset = (1 - p).toFixed(4);
      disk?.setAttribute("transform", `rotate(${angle.toFixed(2)})`);
      // Which sector sits under the read head, and its Gray code.
      const rel = (((-angle % 360) + 360) % 360) / (360 / SECTORS);
      const code = gray(Math.floor(rel) % SECTORS);
      bits.forEach((el) => el.classList.toggle("is-set", ((code >> Number(el.dataset.bit)) & 1) === 1));
      if (!settled) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const refresh = () => {
      collect();
      kick();
    };

    commit(); // clear anything left over from the previous page
    collect();
    kick();

    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", refresh);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      ro.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", refresh);
    };
  }, [margin, pathname]);

  if (!margin) return null;

  const size = Math.round(Math.min(96, Math.max(40, margin * 0.6)));

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-frame
      className="enc"
      data-on={on ? "" : undefined}
      style={{ width: margin, "--gap": `${size / 2 + 12}px`, "--u": 128 / size } as React.CSSProperties}
    >
      <span className="enc-axis enc-axis-top" />
      <span className="enc-axis enc-axis-bottom" />
      <svg className="enc-dial" width={size} height={size} viewBox="-64 -64 128 128">
        <circle r="58" className="enc-rim" />
        <circle data-rim r="58" className="enc-progress" pathLength={1} transform="rotate(-90)" />
        {RADII.map((r) => (
          <circle key={r} r={r} className="enc-track" />
        ))}

        <g data-disk>
          {layers.map((l) => (
            <g key={l.id} className="enc-layer" data-leaving={l.leaving ? "" : undefined}>
              {ARCS.map((a) => (
                <path key={a.key} d={a.d} pathLength={1} style={{ "--m": BITS - 1 - a.bit } as React.CSSProperties} />
              ))}
            </g>
          ))}
        </g>

        {/* Read head at 12 o'clock and the bits it's reading */}
        <line className="enc-head" x1="0" y1="-54" x2="0" y2="-14" />
        {RADII.map((r, i) => (
          <circle key={r} data-bit={BITS - 1 - i} className="enc-bit" cx="0" cy={-r} r="2.2" />
        ))}

        <circle r="5" className="enc-node-ring" />
        <circle r="2.6" className="enc-node" />
      </svg>
    </div>
  );
}
