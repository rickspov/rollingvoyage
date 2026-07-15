import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../i18n/context";
import { bannerSrc, type BannerKey } from "../../data/banners";

type BannerCarouselProps = {
  banners: BannerKey[];
  alt?: string;
};

export function BannerCarousel({ banners, alt = "" }: BannerCarouselProps) {
  const { locale, t } = useLanguage();
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
    <div className="relative bg-primary">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((key) => (
            <div key={key} className="flex-[0_0_100%] min-w-0">
              <picture>
                <source media="(min-width: 768px)" srcSet={bannerSrc(locale, key, "desktop")} />
                <img
                  src={bannerSrc(locale, key, "mobile")}
                  alt={alt}
                  className="w-full h-auto block"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 md:px-8">
        <div className="flex gap-2">
          {banners.map((key, i) => (
            <button
              key={key}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
              }`}
              aria-label={t.home.testimonials.label(i + 1)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 min-h-[40px] min-w-[40px] border border-primary-foreground/40 bg-primary/40 text-primary-foreground hover:bg-primary/60 transition-colors"
            aria-label={t.home.testimonials.prev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 min-h-[40px] min-w-[40px] border border-primary-foreground/40 bg-primary/40 text-primary-foreground hover:bg-primary/60 transition-colors"
            aria-label={t.home.testimonials.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
