"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqs } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/contact-links";
import { EASE_EXPO } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import LineReveal from "@/components/ui/LineReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-bg py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="08">Вопросы</SectionLabel>
            <LineReveal id="faq-title" lines={["Частые", "вопросы"]} className="display-lg mt-6 text-fg" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">Не нашли ответ? Спросите напрямую — ответим в мессенджере.</p>
            <div className="mt-8">
              <MagneticButton href={WHATSAPP_URL} external variant="ghost">
                Спросить в WhatsApp
              </MagneticButton>
            </div>
          </div>
        </div>

        <ul className="border-b border-line lg:col-span-7">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <li key={faq.question} className={`border-t border-line transition-colors duration-500 ${isOpen ? "bg-surface" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 px-1 py-5 text-left md:gap-8 md:px-6 md:py-6"
                  >
                    <span className="meta tabular-nums">0{i + 1}</span>
                    <span className={`flex-1 text-lg font-medium leading-snug transition-colors duration-300 md:text-2xl ${isOpen ? "text-fg" : "text-fg/70 group-hover:text-fg"}`}>
                      {faq.question}
                    </span>
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-line" aria-hidden>
                      <span className="absolute h-px w-3.5 bg-fg" />
                      <span className={`absolute h-3.5 w-px bg-fg transition-transform duration-500 ease-expo ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_EXPO }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl px-1 pb-6 pl-[3.25rem] text-[15px] leading-relaxed text-muted md:px-6 md:pl-[5.5rem]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
