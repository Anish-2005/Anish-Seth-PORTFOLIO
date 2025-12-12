"use client";

import { siteConfig } from "@/lib/site.config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { HeroFallback } from "@/components/sections/HeroFallback";
import { HeroMicroSceneGate } from "@/components/three/HeroMicroSceneGate";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80]);

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(900px_620px_at_75%_15%,color-mix(in_oklab,var(--accent),transparent_76%),transparent_55%),radial-gradient(760px_520px_at_18%_6%,rgba(126,143,172,0.16),transparent_62%)]"
        style={{ y: parallax }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-40%] top-[-18%] -z-10 h-[420px] rotate-[-2deg] bg-[linear-gradient(115deg,rgba(31,211,198,0.2),rgba(94,234,212,0.12),transparent_60%)] blur-[70px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <Container className="grid items-center gap-10 pb-12 md:grid-cols-12 md:gap-12 md:pb-16">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.22em] text-[color:var(--text-2)]">
              {siteConfig.role}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--text-0)] sm:text-5xl">
              {siteConfig.name}
              <span className="text-[color:var(--text-2)]"> —</span>
              <span className="text-[color:var(--text-0)]"> designer × builder</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--text-1)] sm:text-lg">
              I craft calm, luxurious product surfaces with rigorous engineering under the hood — from motion systems to ML and Web3 integrations.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" variant="primary">
                Contact
              </ButtonLink>
              <ButtonLink href={siteConfig.resume.href} variant="secondary">
                Resume
              </ButtonLink>
              <ButtonLink href="#work" variant="ghost">
                Featured work
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-8 max-w-xl text-sm leading-6 text-[color:var(--text-2)]">
              Inspired by angular.dev smoothness, but reimagined with a quieter, editorial rhythm and intentional pauses.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <div className="relative">
            <div className="hidden md:block">
              <HeroMicroSceneGate />
            </div>
            <div className="md:hidden">
              <HeroFallback />
            </div>
            <p className="mt-3 text-xs text-[color:var(--text-2)]">
              3D is lazy-loaded; reduced-motion friendly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
