"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { site } from "@/lib/site.config";
import { cn, EASE } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { IconLeft, IconRight } from "./Icons";

const slide: Variants = {
  enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 90 : -90 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -90 : 90 }),
};

export function Testimonials() {
  const items = site.testimonials.items;
  const [[i, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((d: number) => setState(([c]) => [(c + d + items.length) % items.length, d]), [items.length]);

  useEffect(() => {
    if (paused || reduce || items.length < 2) return;
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [paused, reduce, go, items.length]);

  const t = items[i];
  const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden bg-graphite py-28 md:py-40"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -left-4 top-10 select-none font-display text-[26rem] font-black leading-none text-gold/[.06]">“</span>
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <SectionHeading title="O que dizem os alunos" />

        <div className="mt-16 min-h-[320px] md:min-h-[280px]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={i} custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.55, ease: EASE }}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
              onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
              className="cursor-grab active:cursor-grabbing"
            >
              <blockquote className="font-display text-3xl font-bold leading-snug text-bone md:text-5xl">{t.text}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full border border-gold font-display text-xl font-extrabold text-gold">{initials}</span>
                <span>
                  <span className="block font-semibold text-bone">{t.name}</span>
                  <span className="block text-sm text-mist">{t.detail}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex gap-2" role="tablist" aria-label="Escolher depoimento">
            {items.map((_, n) => (
              <button
                key={n} type="button" role="tab" aria-selected={n === i} aria-label={`Depoimento ${n + 1}`}
                onClick={() => setState([n, n > i ? 1 : -1])}
                className={cn("h-[3px] transition-all duration-500", n === i ? "w-14 bg-gold" : "w-6 bg-white/25 hover:bg-white/50")}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Depoimento anterior" onClick={() => go(-1)} className="border border-gold/40 p-3 text-gold transition-colors hover:bg-gold hover:text-ink"><IconLeft /></button>
            <button type="button" aria-label="Próximo depoimento" onClick={() => go(1)} className="border border-gold/40 p-3 text-gold transition-colors hover:bg-gold hover:text-ink"><IconRight /></button>
          </div>
        </div>
        {site.testimonials.demo && <p className="mt-8 text-sm text-mist/70">Depoimentos demonstrativos. Substitua por avaliações reais.</p>}
      </div>
    </section>
  );
}
