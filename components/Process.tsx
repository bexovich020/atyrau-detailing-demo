"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { steps } from "@/lib/content";
import { EASE_EXPO, EASE_IN_OUT } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import LineReveal from "@/components/ui/LineReveal";

function DesktopProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  const step = steps[active];

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${steps.length * 85 + 15}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-site grid grid-cols-12 items-center gap-10">
          <div className="col-span-5 flex flex-col">
            <SectionLabel index="04">Процесс</SectionLabel>
            <LineReveal id="process-title" lines={["Как мы", "работаем"]} className="display-lg mt-6 text-fg" />

            <ol className="mt-10 flex flex-col" aria-label="Этапы работы">
              {steps.map((s, i) => (
                <li key={s.number} aria-current={i === active ? "step" : undefined} className="relative border-t border-line py-5 pl-8">
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[1.9rem] h-1.5 w-1.5 transition-colors duration-500 ${i <= active ? "bg-accent" : "bg-fg/20"}`}
                  />
                  <div className="flex items-baseline gap-6">
                    <span className={`meta tabular-nums transition-colors duration-500 ${i === active ? "text-fg" : ""}`}>{s.number}</span>
                    <h3
                      className={`font-display text-2xl font-medium uppercase transition-colors duration-500 ${
                        i === active ? "text-fg" : "text-fg/35"
                      }`}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <div className={`grid transition-[grid-template-rows] duration-700 ease-expo ${i === active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden pl-[3.4rem] text-[15px] leading-relaxed text-muted">
                      <span className="block pt-3">{s.text}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative col-span-7 aspect-[5/4] max-h-[78vh] overflow-hidden bg-surface">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={step.number}
                initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)", scale: 1.08 }}
                animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)", scale: 1 }}
                exit={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE_IN_OUT }}
                className="absolute inset-0"
              >
                <Image src={step.image.src} alt={step.image.alt} fill sizes="55vw" className={`object-cover ${step.image.position}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 right-0 overflow-hidden p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={step.number}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: EASE_EXPO }}
                  className="font-display text-[9rem] font-medium leading-[0.8] text-fg tabular-nums"
                  aria-hidden
                >
                  {step.number}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="absolute inset-x-0 top-0 flex h-px bg-fg/10">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ scaleX: scrollYProgress, width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <div className="container-site py-16 lg:hidden">
      <SectionLabel index="04">Процесс</SectionLabel>
      <LineReveal lines={["Как мы", "работаем"]} className="display-lg mt-6 text-fg" />
      <ol ref={ref} className="relative mt-8 flex flex-col gap-10 pl-8">
        <span className="absolute bottom-0 left-[3px] top-0 w-px bg-fg/10" aria-hidden />
        <motion.span
          style={{ scaleY: scrollYProgress }}
          className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-accent"
          aria-hidden
        />
        {steps.map((s) => (
          <motion.li
            key={s.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: EASE_EXPO }}
            className="relative"
          >
            <span className="absolute -left-8 top-2 h-[7px] w-[7px] bg-accent" aria-hidden />
            <div className="flex items-baseline gap-4">
              <span className="meta tabular-nums text-fg">{s.number}</span>
              <h3 className="font-display text-3xl font-medium uppercase text-fg">{s.title}</h3>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.text}</p>
            <div className="relative mt-5 aspect-[16/10] overflow-hidden bg-surface">
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 1023px) 90vw, 0px" className={`object-cover ${s.image.position}`} />
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative bg-bg">
      <DesktopProcess />
      <MobileProcess />
    </section>
  );
}
