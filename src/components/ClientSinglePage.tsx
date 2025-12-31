"use client";
import dynamic from "next/dynamic";
import React from "react";

const SinglePagePortfolio = dynamic(
  () => import("@/app/SinglePagePortfolio").then((mod) => mod.SinglePagePortfolio),
  { ssr: false, loading: () => <div /> }
);

export default function ClientSinglePage() {
  return <SinglePagePortfolio />;
}
