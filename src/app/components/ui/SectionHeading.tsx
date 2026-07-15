type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="font-subtitle text-lg italic text-accent mb-3">{eyebrow}</p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-4 sm:mb-5">{title}</h2>
      {subtitle && (
        <p className="text-base md:text-lg text-foreground/75 leading-relaxed">{subtitle}</p>
      )}
      <div
        className={`mt-8 h-px w-16 bg-primary/25 ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
