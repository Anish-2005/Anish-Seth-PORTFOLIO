import { memo } from "react";

function LightBackgroundInner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fffdfc 0%, #f8e9e7 46%, #efd9d5 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 620px at 18% 12%, rgba(173,49,75,0.17), transparent 62%), radial-gradient(880px 640px at 82% 20%, rgba(190,50,91,0.14), transparent 64%), radial-gradient(720px 540px at 50% 76%, rgba(151,61,73,0.12), transparent 68%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(213,45,45,0.14) 1px, transparent 1px), linear-gradient(0deg, rgba(226,38,114,0.12) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}

export const LightBackground = memo(LightBackgroundInner);
