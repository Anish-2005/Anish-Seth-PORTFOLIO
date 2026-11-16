"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EncoderDial = dynamic(() => import("@/components/site/EncoderDial").then((m) => m.EncoderDial), { ssr: false });

/** The margin dial only exists on wide laptop screens, so phones and tablets never download it. */
export function EncoderDialLoader() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1352px)"); // shell (1240) + two 56px margins, as in EncoderDial
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return wide ? <EncoderDial /> : null;
}
