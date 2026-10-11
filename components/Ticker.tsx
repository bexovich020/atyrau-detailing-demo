import { services } from "@/lib/content";

export default function Ticker() {
  const items = services.map((s) => s.title);
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-bg py-5 md:py-7" aria-hidden>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row.map((title, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`whitespace-nowrap px-6 font-display text-3xl font-medium uppercase tracking-wide md:px-10 md:text-5xl ${
                i % 2 === 0 ? "text-fg" : "text-outline"
              }`}
            >
              {title}
            </span>
            <span className="h-2 w-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
