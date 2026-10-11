"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Variant = "solid" | "ghost" | "accent";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
};

const variants: Record<Variant, string> = {
  solid: "bg-fg text-bg",
  accent: "bg-accent text-bg",
  ghost: "border border-fg/25 text-fg hover:border-fg/60",
};

const fills: Record<Variant, string> = {
  solid: "bg-accent",
  accent: "bg-fg",
  ghost: "bg-fg",
};

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  external,
  icon,
  className = "",
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = icon ?? <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden />;

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="hide"
      className={`group relative isolate inline-flex min-h-[52px] items-center justify-center gap-3 overflow-hidden px-7 text-[13px] font-semibold uppercase tracking-[0.14em] transition-[color,border-color] duration-500 ease-expo ${variants[variant]} ${variant === "ghost" ? "hover:text-bg" : ""} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover:scale-y-100 ${fills[variant]}`}
      />
      <span className="relative">{children}</span>
      <span className="relative flex h-4 w-4 overflow-hidden" aria-hidden>
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-expo group-hover:-translate-y-full group-hover:translate-x-full">
          {Icon}
        </span>
        <span className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0">
          {Icon}
        </span>
      </span>
    </motion.a>
  );
}
