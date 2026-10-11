import { media } from "@/lib/media";
import { services, serviceCategories, quoteUrl, type Service, type ServiceCategory } from "@/lib/studio";

export { services, serviceCategories, quoteUrl };
export type { Service, ServiceCategory };

export const steps = [
  {
    number: "01",
    title: "Запись",
    text: "Расскажите, что хотите улучшить. Обсудим задачу и удобное время.",
    image: media.process.booking,
  },
  {
    number: "02",
    title: "Диагностика",
    text: "Оцениваем состояние автомобиля и уточняем, какой уход ему подходит.",
    image: media.process.inspect,
  },
  {
    number: "03",
    title: "Работа",
    text: "Выполняем согласованные работы и уделяем внимание деталям.",
    image: media.process.work,
  },
  {
    number: "04",
    title: "Выдача",
    text: "Показываем результат и рассказываем, как ухаживать за автомобилем дальше.",
    image: media.process.handover,
  },
];

export const principles = [
  {
    number: "01",
    title: "Под вашу задачу",
    text: "Сначала обсуждаем, что важно именно для вас и вашего автомобиля.",
  },
  {
    number: "02",
    title: "Понятный план",
    text: "Согласовываем состав работ до того, как приступим к уходу.",
  },
  {
    number: "03",
    title: "Внимание к деталям",
    text: "Работаем с кузовом и интерьером, учитывая их состояние.",
  },
];

export const faqs = [
  {
    question: "От чего зависит стоимость работ?",
    answer:
      "От выбранной услуги и состояния автомобиля. Напишите нам — уточним задачу и сориентируем по стоимости до записи.",
  },
  {
    question: "Как понять, какая услуга нужна автомобилю?",
    answer:
      "Расскажите, что хотите изменить или защитить. Обсудим состояние автомобиля и подходящий объём работ.",
  },
  {
    question: "Как записаться?",
    answer:
      "Напишите в WhatsApp или Telegram либо позвоните. Уточним свободные даты и договоримся о времени.",
  },
];

export const navLinks = [
 { href: "#services", label: "Услуги" },
 { href: "#gallery", label: "Работы" },
 { href: "#studio", label: "Студия" },
 { href: "#pricing", label: "Цены" },
 { href: "#location", label: "Адрес" },
];
