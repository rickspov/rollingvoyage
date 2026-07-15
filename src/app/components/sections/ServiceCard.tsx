type ServiceCardProps = {
  name: string;
  price: string;
  description: string;
  includes: readonly string[];
  note?: string;
  featured?: boolean;
};

export function ServiceCard({
  name,
  price,
  description,
  includes,
  note,
  featured,
}: ServiceCardProps) {
  return (
    <article
      className={`flex flex-col h-full border p-6 sm:p-8 transition-all ${
        featured
          ? "bg-primary text-primary-foreground border-primary shadow-lg md:scale-[1.02]"
          : "bg-card border-border hover:border-primary/25"
      }`}
    >
      <div className="mb-6">
        <p
          className={`font-subtitle text-sm uppercase tracking-[0.2em] mb-2 ${
            featured ? "text-[var(--rv-sky)]" : "text-accent"
          }`}
        >
          {price}
        </p>
        <h3 className="text-2xl md:text-3xl mb-3">{name}</h3>
        <p className={`text-sm leading-relaxed ${featured ? "text-primary-foreground/80" : "text-foreground/70"}`}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 flex-1">
        {includes.map((item) => (
          <li
            key={item}
            className={`text-sm flex gap-3 leading-relaxed ${
              featured ? "text-primary-foreground/85" : "text-foreground/75"
            }`}
          >
            <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${featured ? "bg-[var(--rv-sky)]" : "bg-primary"}`} />
            {item}
          </li>
        ))}
      </ul>

      {note && (
        <p
          className={`mt-6 pt-6 border-t text-xs leading-relaxed ${
            featured ? "border-primary-foreground/20 text-primary-foreground/65" : "border-border text-foreground/55"
          }`}
        >
          {note}
        </p>
      )}
    </article>
  );
}
