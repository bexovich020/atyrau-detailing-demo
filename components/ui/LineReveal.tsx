"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

export default function LineReveal({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
  immediate = false,
  id,
}: Props) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  const trigger = immediate
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-12% 0px" } };

  return (
    <Tag id={id} className={className} {...trigger} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line + i} aria-hidden className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={{
              hidden: reduceMotion ? { y: 0 } : { y: "108%", rotate: 1.5 },
              visible: {
                y: 0,
                rotate: 0,
                transition: {
                  duration: reduceMotion ? 0 : 1.1,
                  ease: EASE_EXPO,
                  delay: reduceMotion ? 0 : delay + i * stagger,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
