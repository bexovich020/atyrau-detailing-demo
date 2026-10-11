"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/motion";

type Mode = "default" | "link" | "hide" | "label";

export default function Cursor() {
  const fine = useFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = fine && !reduceMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='slider']",
      );
      const attr = target?.dataset.cursor;
      if (attr === "hide") setMode("hide");
      else if (attr) {
        setMode("label");
        setLabel(attr);
      } else if (target) setMode("link");
      else setMode("default");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 88 : mode === "link" ? 44 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden items-center justify-center rounded-full border lg:flex"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible && mode !== "hide" ? 1 : 0,
        backgroundColor: mode === "label" ? "rgba(236,237,239,0.95)" : mode === "link" ? "rgba(236,237,239,0)" : "rgba(236,237,239,0.9)",
        borderColor: mode === "link" ? "rgba(236,237,239,0.5)" : "rgba(236,237,239,0)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {mode === "label" && (
        <span className="absolute text-[10px] font-semibold uppercase tracking-[0.18em] text-bg">{label}</span>
      )}
    </motion.div>
  );
}
