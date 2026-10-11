"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { media } from "@/lib/media";
import { EASE_EXPO, INTRO_DELAY } from "@/lib/motion";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { MAP_URL, WHATSAPP_URL, studio } from "@/lib/studio";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const sceneInView = useInView(ref, { amount: 0.05 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const imageX = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduceMotion ? 1 : 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  const d = reduceMotion ? 0 : INTRO_DELAY;
  const fade = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE_EXPO, delay: d + delay },
  });

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="hero-section relative isolate flex h-[100svh] min-h-[780px] flex-col overflow-hidden bg-bg"
    >
      <motion.div style={{ x: imageX, y: imageY, scale: imageScale }} className="hero-scene absolute -z-20 will-change-transform">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.16, x: "8%", opacity: 0 }}
          animate={{ scale: 1, x: "0%", opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE_EXPO, delay: d }}
          className="absolute inset-0"
        >
          <motion.div className="absolute inset-0" animate={sceneInView && !reduceMotion ? { scale: [1, 1.045, 1], x: ["0%", "-1.5%", "0%"] } : { scale: 1, x: "0%" }} transition={{ duration: reduceMotion || !sceneInView ? 0 : 16, ease: "easeInOut", repeat: sceneInView && !reduceMotion ? Infinity : 0 }}>
          <Image
            src={media.hero.src}
            alt={media.hero.alt}
            fill
            priority
            sizes="(max-width: 767px) 900px, 100vw"
            className="hero-scene-image object-cover"
          />
          </motion.div>
          <div className="hero-scene-edge absolute inset-0 md:hidden" aria-hidden />
        </motion.div>
      </motion.div>

      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="hero-veil absolute inset-0" />
        <div className="animate-light-drift absolute -top-1/4 left-1/4 h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(180,200,220,0.10),transparent)] blur-2xl" />
        <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-bg" />
        <div className="grid-overlay absolute inset-0 opacity-60" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="hero-content container-site relative flex flex-1 flex-col justify-between pb-20 pt-28 md:justify-end md:pb-28 md:pt-36"
      >
        <div>
        <motion.p {...fade(0)} className="meta mb-4 flex items-center gap-3 md:mb-6">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
          {studio.hero.eyebrow} · {studio.city}
        </motion.p>

        <LineReveal
          as="h1"
          id="hero-title"
          immediate
          delay={d + 0.05}
          stagger={0.1}
          lines={[...studio.hero.lines]}
          className="display-xl hero-heading text-fg"
          lineClassName="[&:nth-child(1)]:text-fg"
        />
        </div>

        <div className="hero-details mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-end md:justify-between">
          <motion.p {...fade(0.45)} className="max-w-md text-[15px] leading-relaxed text-fg/70 md:text-base">
            {studio.hero.description}
          </motion.p>

          <motion.div {...fade(0.6)} className="hero-actions flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={WHATSAPP_URL} external variant="accent">{studio.hero.primaryCta}</MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              {studio.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute right-5 top-28 hidden border-l border-fg/20 pl-5 text-right lg:block lg:right-12">
        <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-fg/80">4.9 / 5 · 2ГИС <span className="block mt-1 text-[11px] text-muted">102 оценки · 11.10.2026</span></a>
      </div>
      <p className="absolute bottom-7 left-5 text-[9px] tracking-wide text-muted md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:text-[10px]">Имиджевый визуал · не фото работ студии</p>
      <motion.div
        {...fade(0.9)}
        className="container-site pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-end pb-6 md:justify-between md:pb-8"
      >
        <div className="hidden items-center gap-4 md:flex">
          <span className="relative block h-12 w-px overflow-hidden bg-fg/15" aria-hidden>
            <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/3 bg-fg" />
          </span>
          <span className="meta">Листайте</span>
        </div>
        <p className="meta tabular-nums">
          <span className="text-fg">01</span> / 07
        </p>
      </motion.div>
    </section>
  );
}
