"use client";
import { MotionConfig } from "framer-motion";

/** Respeita prefers-reduced-motion: animações de movimento são desligadas para quem pediu. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
