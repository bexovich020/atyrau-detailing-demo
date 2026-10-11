export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const media = {
  hero: {
    src: "/images/cinematic/hero.png",
    alt: "Чёрное спортивное купе в тёмной студии под линейным светом",
    position: "object-[68%_center]",
  },
  cta: {
    src: "/images/cinematic/cta.png",
    alt: "Задняя часть графитового автомобиля с отражением света на кузове",
    position: "object-[70%_center]",
  },
  compare: {
    after: {
      src: "/images/cinematic/after.png",
      alt: "Отполированный чёрный капот с зеркальным отражением студийного света",
    },
    swirls: "/images/cinematic/swirls.png",
  },
  services: {
    ceramic: {
      src: unsplash("photo-1542282088-fe8426682b8f", 1400),
      alt: "Капли воды на поверхности автомобильного кузова",
      position: "object-[center_42%]",
    },
    polish: {
      src: "/images/detailing/polishing.jpg",
      alt: "Мастер полирует кузов автомобиля машинкой",
      position: "object-[center_48%]",
    },
    interior: {
      src: "/images/detailing/interior-vacuum.jpg",
      alt: "Чистка обивки автомобильного сиденья пылесосом",
      position: "object-[center_52%]",
    },
    tint: {
      src: unsplash("photo-1617814076367-b759c7d7e738", 1400),
      alt: "Автомобиль с тёмными стёклами",
      position: "object-[center_58%]",
    },
    ppf: {
      src: "/images/detailing/hydrophobic-surface.jpg",
      alt: "Деталь автомобильного кузова с отражением света",
      position: "object-[center_40%]",
    },
    full: {
      src: unsplash("photo-1711512972553-40d5931bc685", 1400),
      alt: "Автомобиль в студийном боксе",
      position: "object-[center_48%]",
    },
  },
  process: {
    booking: {
      src: unsplash("photo-1711512972553-40d5931bc685", 1400),
      alt: "Автомобиль в студийном боксе перед началом работ",
      position: "object-center",
    },
    inspect: {
      src: unsplash("photo-1711512972514-770522ab6b14", 1400),
      alt: "Осмотр лакокрасочного покрытия автомобиля",
      position: "object-center",
    },
    work: {
      src: "/images/detailing/polishing.jpg",
      alt: "Полировка кузова мастером в процессе работы",
      position: "object-[center_48%]",
    },
    handover: {
      src: "/images/cinematic/handover.png",
      alt: "Автомобиль после детейлинга и ключ в руке владельца",
      position: "object-center",
    },
  },
  gallery: [
    {
      src: "/images/detailing/gallery/polishing-process.jpg",
      alt: "Мастер полирует красный кузов эксцентриковой машинкой в студии",
      category: "Полировка ЛКП",
      title: "Работа с лаком",
      description: "Машинная полировка лакокрасочного покрытия.",
      position: "object-[center_46%]",
      shape: "tall",
    },
    {
      src: "/images/detailing/gallery/care-wash.jpg",
      alt: "Пенная очистка стекла и кузова автомобиля",
      category: "Бережная мойка",
      title: "Подготовка кузова",
      description: "Пенная очистка перед основными работами.",
      position: "object-[center_48%]",
      shape: "wide",
    },
    {
      src: "/images/detailing/gallery/interior-detail.jpg",
      alt: "Мастер очищает щёткой детали салона автомобиля",
      category: "Салон",
      title: "Детейлинг салона",
      description: "Очистка деталей интерьера щёткой.",
      position: "object-[center_50%]",
      shape: "square",
    },
    {
      src: "/images/detailing/gallery/surface-water.jpg",
      alt: "Капли воды и отражения на поверхности кузова автомобиля",
      category: "Детали кузова",
      title: "Капли и отражения",
      description: "Поведение воды на поверхности кузова.",
      position: "object-[center_52%]",
      shape: "tall",
    },
  ],
} as const;
