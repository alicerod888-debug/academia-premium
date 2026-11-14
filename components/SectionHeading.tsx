"use client";
import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({ title, text, className = "" }: { title: string; text?: string; className?: string }) {
  return (
    <div className={className}>
      <Reveal from="clip">
        <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[.9] tracking-tight">{title}</h2>
      </Reveal>
      <motion.span
        aria-hidden="true"
        className="mt-6 block h-[2px] w-28 origin-left bg-gradient-to-r from-gold to-champagne"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
      />
      {text && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{text}</p>
        </Reveal>
      )}
    </div>
  );
}
