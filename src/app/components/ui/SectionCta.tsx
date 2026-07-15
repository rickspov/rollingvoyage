import { Button } from "./button";

type SectionCtaProps = {
  to: string;
  label: string;
  variant?: "primary" | "outline";
  /** Standalone strip below a section (legacy). Prefer overlay on banners. */
  tone?: "cream" | "beige" | "navy";
  /** Sit on top of the banner, pinned to the bottom edge. */
  overlay?: boolean;
};

const tones = {
  cream: "bg-background",
  beige: "bg-secondary/40",
  navy: "bg-primary",
};

export function SectionCta({
  to,
  label,
  variant = "outline",
  tone = "cream",
  overlay = false,
}: SectionCtaProps) {
  if (overlay) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-5 sm:pb-7 md:pb-9">
        <div className="pointer-events-auto">
          <Button
            to={to}
            variant="outline"
            className="!bg-background/95 !text-primary !border-primary/25 shadow-sm backdrop-blur-sm hover:!bg-background"
          >
            {label}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center px-4 py-8 sm:py-10 ${tones[tone]}`}>
      <Button
        to={to}
        variant={tone === "navy" ? "primary" : variant}
        className={
          tone === "navy"
            ? "!bg-primary-foreground !text-primary !border-primary-foreground hover:!opacity-90"
            : ""
        }
      >
        {label}
      </Button>
    </div>
  );
}
