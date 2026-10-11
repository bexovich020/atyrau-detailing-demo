"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import { INSTAGRAM_URL, MAP_URL } from "@/lib/studio";
const photos = [
 {src:"/images/business/bmw.jpg", alt:"Красный BMW с фирменной графикой Atyrau detailing studio", title:"Фирменный характер", tag:"ATYRAU DETAILING STUDIO", shape:"gallery-main"},
 {src:"/images/business/vinyl-green.jpg", alt:"Зелёный автомобиль с графикой из публичной галереи студии", title:"Цвет как заявление", tag:"ИЗ ГАЛЕРЕИ 2ГИС", shape:""},
 {src:"/images/business/vinyl-purple.jpg", alt:"Фиолетовый кузов автомобиля в галерее Atyrau detailing studio", title:"Другая фактура", tag:"ИЗ ГАЛЕРЕИ 2ГИС", shape:""},
];
export default function Gallery() {
 const reduce = useReducedMotion();
 return <section id="gallery" aria-labelledby="gallery-title" className="bg-surface py-20 md:py-28">
  <div className="container-site">
   <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
    <div><SectionLabel index="03">Работы и автомобили</SectionLabel><h2 id="gallery-title" className="display-lg mt-6">Стиль видно.<br/><span className="text-outline">В деталях.</span></h2></div>
    <div className="max-w-md lg:justify-self-end"><p className="text-[15px] leading-relaxed text-muted">Автомобили из публичной галереи Atyrau detailing studio. Яркие цвета, фактуры и фирменная графика — свой характер у каждого.</p><a href={`${MAP_URL.replace('/firm/','/gallery/firm/')}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-3 text-sm text-accent">Все фото в 2ГИС <ArrowUpRight size={16}/></a></div>
   </div>
   <div className="business-gallery">
    {photos.map((p,i)=><motion.figure key={p.src} initial={false} whileInView={reduce?{}:{y:[16,0]}} viewport={{once:true}} transition={{duration:.7}} className={`group relative overflow-hidden bg-bg ${p.shape}`}>
     <Image src={p.src} alt={p.alt} fill sizes={i===0?"(min-width:1024px) 60vw, 100vw":"(min-width:1024px) 24vw, 50vw"} className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${i===0?'object-center':'object-[center_45%]'}`}/>
     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>
     <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-6"><p className="text-[9px] tracking-[.14em] text-fg/70">{p.tag}</p><p className="mt-2 font-display text-xl uppercase md:text-2xl">{p.title}</p></figcaption>
    </motion.figure>)}
   </div>
   <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center"><p className="max-w-md text-sm leading-relaxed text-muted">Больше свежих работ и видео — в Instagram студии.</p><MagneticButton href={INSTAGRAM_URL} external variant="ghost">Открыть Instagram</MagneticButton></div>
  </div>
 </section>;
}
