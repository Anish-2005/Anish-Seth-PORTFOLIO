"use client";

import { useReportWebVitals } from "next/web-vitals";

type WebVitalMetric = {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType?: string;
};

function sendMetric(metric: WebVitalMetric) {
  const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
  if (!endpoint || typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") {
    return;
  }

  const body = JSON.stringify({
    ...metric,
    path: window.location.pathname,
    userAgent: navigator.userAgent,
    ts: Date.now(),
  });

  navigator.sendBeacon(endpoint, body);
}

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const typedMetric: WebVitalMetric = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      navigationType: metric.navigationType,
    };

    if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_WEB_VITALS_DEBUG === "1") {
      // Keep local visibility for iterative tuning.
      console.info("[web-vitals]", typedMetric);
    }

    sendMetric(typedMetric);
  });

  return null;
}
