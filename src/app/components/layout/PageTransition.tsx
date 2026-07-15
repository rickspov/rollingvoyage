import { Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../../i18n/context";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageTransition() {
  const location = useLocation();
  const { locale } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${location.pathname}-${locale}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.45, ease }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
