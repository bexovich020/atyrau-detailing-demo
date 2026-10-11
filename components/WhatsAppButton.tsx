"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { EASE_EXPO } from "@/lib/motion";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const pastHero = v > window.innerHeight * 0.8;
    const nearEnd = v + window.innerHeight > document.documentElement.scrollHeight - window.innerHeight * 1.2;
    setShow(pastHero && !nearEnd);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          data-cursor="hide"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: EASE_EXPO }}
          className="group fixed bottom-[max(env(safe-area-inset-bottom),1rem)] right-4 z-50 flex h-12 items-center gap-3 overflow-hidden bg-accent pl-4 pr-4 text-bg md:bottom-8 md:right-8"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
