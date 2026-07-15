import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage, useNavItems, routes } from "../../i18n/context";
import { LanguageToggle } from "../ui/LanguageToggle";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const navItems = useNavItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = location.pathname === routes.home;
  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-out ${
        solid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 flex items-center justify-between py-3 sm:py-4 gap-3">
        <Link to={routes.home} className="flex items-center shrink-0 transition-opacity duration-300 hover:opacity-80">
          <img
            src={solid ? "/assets/brand/logos/logo-nav-navy.png" : "/assets/brand/logos/logo-nav-white.png"}
            alt={t.site.name}
            className="h-9 sm:h-10 md:h-12 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm tracking-wide font-[family-name:var(--font-ui)] transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-primary font-semibold"
                  : "text-foreground/65 hover:text-primary font-light"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary/40"
                  transition={{ duration: 0.35, ease }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageToggle variant="header" instanceId="desktop" />
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageToggle variant="header" instanceId="mobile" />
          <button
            className="p-2 text-primary transition-transform duration-300 active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease }}
            className="lg:hidden overflow-hidden border-t border-border bg-background"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
              className="px-4 sm:px-5 py-5 space-y-1 max-h-[calc(100dvh-4rem)] overflow-y-auto"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -8 },
                  }}
                  transition={{ duration: 0.3, ease }}
                >
                  <Link
                    to={item.path}
                    className={`block text-base py-3 transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-primary font-medium"
                        : "text-foreground/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
