import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/context";

export function TestimonialCarousel() {
  const { t } = useLanguage();
  const items = t.home.testimonials.items;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div key={item.trip} className="flex-[0_0_100%] min-w-0 px-1">
              <blockquote className="bg-card border border-border p-6 sm:p-8 md:p-12 relative">
                <span className="font-script text-6xl text-[var(--rv-sky)] leading-none absolute top-4 left-6">
                  "
                </span>
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed relative z-10 pt-6">
                  {item.quote}
                </p>
                <footer className="mt-8 font-subtitle text-xl text-primary italic">
                  ? {item.trip}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.trip}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary-foreground" : "w-1.5 bg-primary-foreground/30"
              }`}
              aria-label={t.home.testimonials.label(i + 1)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
            aria-label={t.home.testimonials.prev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
            aria-label={t.home.testimonials.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
