"use client";
import dynamic from "next/dynamic";
import React from "react";

const FloatingThemeToggle = dynamic(
  () => import("@/components/ui/FloatingThemeToggle").then((mod) => mod.FloatingThemeToggle),
  { ssr: false, loading: () => <></> }
);

export default function ClientFloatingThemeToggle() {
  return <FloatingThemeToggle />;
}
