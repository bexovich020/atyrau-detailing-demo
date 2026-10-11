type Props = {
  index: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ index, children, className = "" }: Props) {
  return (
    <p className={`meta flex items-center gap-3 ${className}`}>
      <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
      <span className="tabular-nums text-fg">{index}</span>
      <span className="h-px w-8 bg-fg/25" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
