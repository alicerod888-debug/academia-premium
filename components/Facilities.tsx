"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site.config";
import { cn, EASE } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import { SectionHeading } from "./SectionHeading";
import { IconClose, IconLeft, IconRight } from "./Icons";

const spans = ["col-span-2 row-span-2", "", "row-span-2", "", "col-span-2", "col-span-2"];

export function Facilities() {
  const items = site.gallery;
  const [sel, setSel] = useState<number | null>(null);
  const isOpen = sel !== null;

  useEffect(() => {
    if (!isOpen) return;
    const n = items.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowRight") setSel((s) => (s === null ? s : (s + 1) % n));
      if (e.key === "ArrowLeft") setSel((s) => (s === null ? s : (s - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen, items.length]);

  const step = (d: number) => setSel((s) => (s === null ? s : (s + d + items.length) % items.length));

  return (
    <section id="estrutura" className="relative bg-graphite py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Estrutura e equipamentos" text="Toque em qualquer imagem para ampliar." />

        <div className="mt-14 grid auto-rows-[170px] grid-flow-dense grid-cols-2 gap-2 md:auto-rows-[230px] lg:grid-cols-4">
          {items.map((g, i) => (
            <motion.button
              key={g.label}
              type="button"
              onClick={() => setSel(i)}
              aria-label={`Ampliar: ${g.label}`}
              className={cn("group relative overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-champagne", spans[i % spans.length])}
              initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <MediaFrame
                src={g.image || undefined} alt={g.label} variant={i} sizes="(min-width:1024px) 40vw, 90vw"
                className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-5">
                <span className="font-display text-2xl font-extrabold uppercase text-bone md:text-3xl">{g.label}</span>
                <span aria-hidden="true" className="mt-1 block h-[2px] w-8 bg-gold transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {sel !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={items[sel].label}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={() => setSel(null)}
          >
            <button type="button" aria-label="Fechar" onClick={() => setSel(null)} className="absolute right-4 top-4 z-10 p-3 text-bone hover:text-gold"><IconClose width={28} height={28} /></button>
            <button type="button" aria-label="Imagem anterior" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 z-10 p-3 text-bone hover:text-gold md:left-6"><IconLeft width={32} height={32} /></button>
            <button type="button" aria-label="Próxima imagem" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 z-10 p-3 text-bone hover:text-gold md:right-6"><IconRight width={32} height={32} /></button>

            <motion.figure
              key={sel}
              className="relative w-[min(92vw,1100px)]"
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <MediaFrame src={items[sel].image || undefined} alt={items[sel].label} variant={sel} sizes="92vw" className="relative aspect-[4/3] w-full border border-gold/30" />
              <figcaption className="mt-4 font-display text-3xl font-extrabold uppercase text-champagne">{items[sel].label}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
