"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

const variants: Record<"up" | "left" | "right" | "clip", Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  clip: { hidden: { clipPath: "inset(0 0 100% 0)", y: 30 }, show: { clipPath: "inset(0 0 0% 0)", y: 0 } },
};

interface Props { children: ReactNode; className?: string; delay?: number; from?: keyof typeof variants }

export function Reveal({ children, className, delay = 0, from = "up" }: Props) {
  return (
    <motion.div
      className={className}
      variants={variants[from]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
