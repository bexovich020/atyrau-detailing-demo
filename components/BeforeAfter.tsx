"use client";

import { useRef, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { media } from "@/lib/media";
import SectionLabel from "@/components/ui/SectionLabel";
import LineReveal from "@/components/ui/LineReveal";

export default function BeforeAfter() {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(frameRef, { once: true, margin: "-25% 0px" });

  const target = useMotionValue(50);
  const pos = useSpring(target, { stiffness: 260, damping: 32, mass: 0.6 });
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const beforeOpacity = useTransform(pos, [10, 40], [0.3, 1]);
  const afterOpacity = useTransform(pos, [60, 90], [1, 0.3]);
  const [value, setValue] = useState(50);
  useMotionValueEvent(target, "change", (v) => setValue(Math.round(v)));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(target, [50, 22, 74, 50], { duration: 2.4, ease: "easeInOut", delay: 0.3 });
    return () => controls.stop();
  }, [inView, reduceMotion, target]);

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromPointer(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current || e.pointerType === "mouse") setFromPointer(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    const map: Record<string, number> = {
      ArrowLeft: target.get() - step,
      ArrowRight: target.get() + step,
      Home: 0,
      End: 100,
    };
    if (e.key in map) {
      e.preventDefault();
      target.set(Math.min(100, Math.max(0, map[e.key])));
    }
  };

  return (
    <section id="result" aria-labelledby="result-title" className="relative bg-surface py-16 md:py-24">
      <div className="container-site">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="03">До / После</SectionLabel>
            <LineReveal id="result-title" lines={["Разница", "в отражении"]} className="display-lg mt-6 text-fg" />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            Полировка убирает голограммы и свирлы, которые рассеивают свет. Проведите по кадру, чтобы сравнить.
          </p>
        </div>
      </div>

      <div className="container-site mt-8 md:mt-10">
        <div
          ref={frameRef}
          data-cursor="Тянуть"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden bg-bg sm:aspect-[16/10] lg:aspect-[21/10]"
        >
          <Image
            src={media.compare.after.src}
            alt={media.compare.after.alt}
            fill
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="pointer-events-none object-cover object-[60%_center]"
          />

          <motion.div style={{ clipPath: clip }} className="absolute inset-0 will-change-[clip-path]" aria-hidden>
            <Image
              src={media.compare.after.src}
              alt=""
              fill
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="pointer-events-none object-cover object-[60%_center] brightness-[0.72] contrast-[0.85] saturate-0"
            />
            <Image
              src={media.compare.swirls}
              alt=""
              fill
              sizes="(min-width: 1440px) 1344px, 100vw"
              className="pointer-events-none object-cover opacity-70 mix-blend-screen"
            />
          </motion.div>

          <motion.span style={{ opacity: beforeOpacity }} className="meta absolute left-5 top-5 bg-bg/60 px-3 py-2 text-fg backdrop-blur md:left-8 md:top-8">
            До
          </motion.span>
          <motion.span style={{ opacity: afterOpacity }} className="meta absolute right-5 top-5 bg-bg/60 px-3 py-2 text-fg backdrop-blur md:right-8 md:top-8">
            После
          </motion.span>

          <motion.div style={{ left }} className="absolute inset-y-0 -ml-px w-px bg-fg/90">
            <div
              role="slider"
              tabIndex={0}
              aria-label="Сравнение до и после полировки"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={value}
              aria-valuetext={`${value}% кадра — до полировки`}
              onKeyDown={onKeyDown}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-fg/40 bg-bg/50 backdrop-blur-md"
            >
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-0 w-0 border-y-[5px] border-r-[6px] border-y-transparent border-r-fg" />
                <span className="h-0 w-0 border-y-[5px] border-l-[6px] border-y-transparent border-l-fg" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
