import { motion, AnimatePresence } from "framer-motion";

// Variants for sliding digits upward
const digitVariants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: "0%",
    opacity: 1,
  },
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

/** Renders an individual animated digit card */
export default function AnimatedDigit({ digit }: { digit: string }) {
  return (
    <span className="digit-card">
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        <motion.span
          key={digit}
          variants={digitVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 200, damping: 30 },
            opacity: { duration: 0.15 },
            filter: { duration: 0.15 },
          }}
          className="digit-value"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
