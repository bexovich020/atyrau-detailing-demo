import { studio } from "@/lib/studio";

export default function Preloader() {
  const [firstName, secondName] = studio.name.split(" ");
  return (
    <div
      aria-hidden
      className="preloader pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
    >
      <div className="overflow-hidden">
        <p className="preloader-word translate-y-full font-display text-3xl font-medium uppercase tracking-[0.32em] text-fg md:text-4xl">
          {firstName}<span className="text-accent">.</span>{secondName}
        </p>
      </div>
      <div className="mt-6 h-px w-40 bg-fg/10">
        <div className="preloader-bar h-full w-full scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
