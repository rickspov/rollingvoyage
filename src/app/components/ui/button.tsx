import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-[#1f3550] border border-primary",
  outline:
    "bg-transparent text-primary border border-primary/30 hover:bg-primary/5",
  ghost: "bg-transparent text-primary hover:bg-primary/5 border border-transparent",
};

export function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 text-sm tracking-wide font-[family-name:var(--font-ui)] font-semibold transition-all duration-300 ease-out hover:opacity-90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
        <ArrowRight size={16} strokeWidth={1.5} />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
      {type !== "submit" && variant !== "ghost" && (
        <ArrowRight size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
