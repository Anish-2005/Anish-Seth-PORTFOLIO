import { memo } from "react";

function DarkBackgroundInner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f060b 0%, #150910 42%, #0c050b 100%)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 620px at 16% 14%, rgba(248,113,113,0.16), transparent 62%), radial-gradient(880px 620px at 84% 18%, rgba(190,24,93,0.13), transparent 64%), radial-gradient(720px 540px at 50% 72%, rgba(88,28,67,0.16), transparent 68%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(248,113,113,0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(190,24,93,0.1) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}

export const DarkBackground = memo(DarkBackgroundInner);
