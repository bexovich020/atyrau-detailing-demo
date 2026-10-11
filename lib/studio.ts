import { media } from "@/lib/media";
export const SITE_URL = "https://atyrau-detailing-demo-bexxx1.vercel.app";
export const INSTAGRAM_URL = "https://www.instagram.com/atyrau_detailing_studio01/";
export const MAP_URL = "https://2gis.kz/atyrau/firm/70000001054815561";
export const studio = {
 name: "Atyrau detailing studio", city: "Атырау", country: "Казахстан",
 phone: "+77786811911", displayPhone: "+7 778 681 19 11", whatsappNumber: "77786811911", telegramUsername: "+77786811911",
 address: "Проспект Зейноллы Кабдолова, 68а", hours: "Пн–Сб 10:00–19:00 · перерыв 13:00–14:00 · Вс выходной",
 metaDescription: "Atyrau detailing studio в Атырау: полировка, химчистка, защитная плёнка, автовинил, шумоизоляция и перешив салона. Зейноллы Кабдолова, 68а.",
 keywords: ["детейлинг Атырау", "Atyrau detailing studio", "автовинил Атырау", "полировка Атырау"],
 hero: {eyebrow: "Atyrau detailing studio", lines: ["Характер", "в каждой", "детали."], description: "Блеск кузова. Новый цвет. Тишина в салоне. Детейлинг и индивидуальный стиль вашего автомобиля в Атырау.", primaryCta: "Обсудить автомобиль", secondaryCta: "Услуги и цены"},
 contact: {headingLines: ["Ваш автомобиль.", "Ваш характер."], description: "Напишите, какая услуга вас интересует, и отправьте фото автомобиля. Уточните стоимость, объём работ и удобную дату напрямую у студии.", whatsappCta: "Написать в WhatsApp", telegramCta: "Instagram", phoneCta: "Позвонить"},
 pricingCta: "Обсудить", serviceCta: "Уточнить стоимость",
 quoteMessage: (title: string) => `Здравствуйте, Atyrau detailing studio! Интересует ${title}. Подскажите стоимость для моего автомобиля и свободные даты.`,
 contactMessage: "Здравствуйте, Atyrau detailing studio! Хочу обсудить услуги для моего автомобиля. Подскажите по стоимости и записи.",
 services: [
 {id:"polish",number:"01",title:"Полировка",category:"Кузов",price:"80 000 ₸",unit:"",description:"Работа с лакокрасочным покрытием и блеском кузова. Объём коррекции уточните для своего автомобиля.",image:media.services.polish},
 {id:"ppf",number:"02",title:"Бронирование кузова",category:"Кузов",price:"200 000 ₸",unit:"",description:"Защитная плёнка PPF. Уточните зоны оклейки, материал и стоимость выбранного объёма работ.",image:media.services.ppf},
 {id:"vinyl",number:"03",title:"Автовинил",category:"Стиль",price:"По запросу",unit:"",description:"Новый цвет и фактура кузова. Обсудите доступные материалы и оттенки напрямую со студией.",image:{src:"/images/business/vinyl-purple.jpg",alt:"Фиолетовый автомобиль из галереи Atyrau detailing studio",position:"object-center"}},
 {id:"interior",number:"04",title:"Химчистка",category:"Салон",price:"30 000 ₸",unit:"",description:"Очистка салона автомобиля. Уточните состав работ для обивки и поверхностей вашего интерьера.",image:media.services.interior},
 {id:"sound",number:"05",title:"Шумоизоляция",category:"Салон",price:"280 000 ₸",unit:"",description:"Шумоизоляция автомобиля. Обсудите зоны обработки и материал для вашей задачи.",image:media.services.interior},
 {id:"trim",number:"06",title:"Пошив и перешив салона",category:"Салон",price:"60 000 ₸",unit:"",description:"Работа с обивкой и индивидуальным оформлением интерьера. Материал, детали и объём уточните перед записью.",image:media.services.interior},
 {id:"chrome",number:"07",title:"Антихром",category:"Стиль",price:"7 000 ₸",unit:"",description:"Изменение внешнего вида хромированных элементов. Обсудите детали и желаемую фактуру со студией.",image:{src:"/images/business/bmw.jpg",alt:"Красный BMW с брендингом Atyrau detailing studio",position:"object-center"}},
 ]
} as const;
export const studioDescription = studio.metaDescription;
export const studioKeywords = [...studio.keywords];
export const serviceCategories = ["Кузов", "Салон", "Стиль"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];
export type Service = (typeof studio.services)[number];
export const services: readonly Service[] = studio.services;
export function quoteUrl(title: string) {return `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(studio.quoteMessage(title))}`;}
export const WHATSAPP_URL = `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(studio.contactMessage)}`;
export const PHONE_URL = `tel:${studio.phone}`;
export const TELEGRAM_URL = `https://t.me/${studio.telegramUsername}`;
