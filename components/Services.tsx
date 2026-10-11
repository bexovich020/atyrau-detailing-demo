"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { quoteUrl, services } from "@/lib/studio";
import { EASE_EXPO, EASE_IN_OUT, useFinePointer } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import LineReveal from "@/components/ui/LineReveal";
import { studio } from "@/lib/studio";

export default function Services() {
  const [active, setActive] = useState<number | null>(0);
  const fine = useFinePointer();
  const reduceMotion = useReducedMotion();
  // A closed accordion has no active index. Keep rendering safe if the list changes
  // or an event ever supplies an out-of-range index.
  const current = active === null ? null : services[active] ?? null;

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-bg py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionLabel index="02">Услуги</SectionLabel>
            <LineReveal
              id="services-title"
              lines={["Что мы", "делаем"]}
              className="display-lg mt-6 text-fg"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              От ухода за кузовом до нового цвета и перешива салона. Выберите направление и обсудите детали со студией.
            </p>

            <p className="mt-4 text-[11px] leading-relaxed text-muted">Фото услуг — иллюстрации. Реальные фото студии — в разделе «Работы».</p>
            <div className="relative mt-8 hidden aspect-[4/5] max-h-[52vh] w-full overflow-hidden bg-surface lg:block">
              {current && (
                <>
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={current.id}
                      initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
                      animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", scale: 1 }}
                      exit={{ opacity: 1 }}
                      transition={{ duration: 0.9, ease: EASE_IN_OUT }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image.src}
                        alt={current.image.alt}
                        fill
                        sizes="(min-width: 1024px) 38vw, 0px"
                        className={`object-cover grayscale-[35%] ${current.image.position}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div className="overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                          key={current.number}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "-100%" }}
                          transition={{ duration: 0.5, ease: EASE_EXPO }}
                          className="font-display text-7xl font-medium leading-none text-fg tabular-nums"
                        >
                          {current.number}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                    <p className="meta text-fg/80">{current.category}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <ul className="border-b border-line lg:col-span-7 lg:pt-2">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <li
                key={service.id}
                className="border-t border-line"
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`service-panel-${service.id}`}
                    onClick={() => {
                      if (fine) {
                        setActive(i);
                        return;
                      }
                      setActive((currentActive) => (currentActive === i ? null : i));
                    }}
                    onFocus={() => fine && setActive(i)}
                    className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span className={`meta w-8 shrink-0 tabular-nums transition-colors duration-500 ${isActive ? "text-accent" : ""}`}>
                      {service.number}
                    </span>
                    <span
                      className={`flex-1 font-display text-[clamp(1.6rem,3.6vw,3.25rem)] font-medium uppercase leading-none transition-[color,transform] duration-700 ease-expo ${
                        isActive ? "translate-x-2 text-fg md:translate-x-4" : "text-fg/45 group-hover:text-fg/80"
                      }`}
                    >
                      {service.title}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-500 ease-expo ${
                        isActive ? "rotate-45 border-accent bg-accent text-bg" : "border-line text-fg/60"
                      }`}
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${service.id}`}
                  role="region"
                  aria-label={service.title}
                  className={`grid transition-[grid-template-rows] duration-700 ease-expo ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pb-8 pl-[3.25rem] pr-2 transition-opacity duration-500 md:pl-16 ${isActive ? "opacity-100 delay-150" : "opacity-0"}`}
                    >
                      <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-surface lg:hidden">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          fill
                          sizes="(max-width: 1023px) 90vw, 0px"
                          className={`object-cover ${service.image.position}`}
                        />
                      </div>
                      <p className="max-w-md text-[15px] leading-relaxed text-fg/70">{service.description}</p>
                      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                        <span className="meta">{service.price === "По запросу" ? service.price : `от ${service.price} · 2ГИС`}</span>
                        <a
                          href={quoteUrl(service.title)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent"
                        >
                          {studio.serviceCta}
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-500 ease-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            strokeWidth={1.6}
                            aria-hidden
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
