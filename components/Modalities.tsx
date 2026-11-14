"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site.config";
import { cn, contactHref, EASE } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";

export function Modalities() {
  const [active, setActive] = useState(0);

  return (
    <section id="modalidades" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Modalidades" text="Escolha como treinar. Passe o mouse ou toque para conhecer cada uma." />

        <div className="mt-14 flex h-[700px] flex-col gap-2 lg:h-[580px] lg:flex-row">
          {site.modalities.map((m, i) => {
            const on = active === i;
            return (
              <motion.article
                key={m.name}
                tabIndex={0}
                aria-label={m.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: on ? 5 : 1 }}
                transition={{ duration: 0.75, ease: EASE }}
                className="group relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              >
                <MediaFrame
                  src={m.image || undefined} alt={m.name} variant={i}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className={cn("absolute inset-0 transition-transform duration-[1400ms] ease-out", on ? "scale-105" : "scale-100")}
                />
                <div aria-hidden="true" className={cn("absolute inset-0 transition-opacity duration-700", on ? "bg-gradient-to-t from-ink via-ink/30 to-transparent" : "bg-ink/55")} />
                <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-[3px] origin-left bg-gold transition-transform duration-700", on ? "scale-x-100" : "scale-x-0")} />

                <div className="absolute bottom-0 left-0 p-5 lg:p-7">
                  <h3
                    className={cn(
                      "font-display font-extrabold uppercase leading-none transition-all duration-500",
                      on ? "text-5xl text-champagne md:text-6xl" : "text-2xl text-bone/85 lg:rotate-180 lg:text-3xl lg:[writing-mode:vertical-rl]"
                    )}
                  >
                    {m.name}
                  </h3>
                  <AnimatePresence>
                    {on && (
                      <motion.div
                        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
                        className="mt-4 w-[min(24rem,78vw)]"
                      >
                        <p className="leading-relaxed text-bone/85">{m.text}</p>
                        <Button href={contactHref(`Olá! Quero saber mais sobre ${m.name}.`)} variant="ghost" className="mt-5 !px-5 !py-3 !text-base">
                          Quero experimentar
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
