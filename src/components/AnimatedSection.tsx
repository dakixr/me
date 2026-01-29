"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { useScrollAnimation, AnimationType } from "../hooks/useScrollAnimation";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport"> {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  animationType = "fadeIn",
  delay = 0,
  duration = 0.6,
  once = true,
  ...props
}: AnimatedSectionProps) {
  const variants = useScrollAnimation({
    delay,
    duration,
    type: animationType,
    once
  });

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.whileInView}
      viewport={variants.viewport}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { useScrollAnimation };
export type { AnimationType };
