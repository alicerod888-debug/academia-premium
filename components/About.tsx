"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site.config";
import { EASE } from "@/lib/utils";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 90]);
  const { about } = site;

  return (
    <section id="sobre" ref={ref} className="relative py-28 md:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-12">
        <div className="relative h-[520px] md:h-[720px] lg:col-span-6">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 h-[84%] w-[76%]">
            <MediaFrame src={about.imageMain || undefined} alt={`Ambiente da ${site.name}`} variant={1} sizes="(min-width:1024px) 40vw, 80vw" className="absolute inset-0" />
            <span aria-hidden="true" className="absolute -left-3 -top-3 h-24 w-24 border-l-2 border-t-2 border-gold" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 h-[46%] w-[50%] border border-gold/40 bg-ink p-2">
            <MediaFrame src={about.imageSecond || undefined} alt={`Treino na ${site.name}`} variant={3} sizes="(min-width:1024px) 25vw, 45vw" className="absolute inset-2" />
          </motion.div>
          <span aria-hidden="true" className="absolute bottom-6 left-0 hidden origin-bottom-left -rotate-90 translate-x-full font-display text-6xl font-black uppercase outline-text md:block">Disciplina</span>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal from="right">
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.2rem)] font-black uppercase leading-[.92] tracking-tight">{about.title}</h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-mist">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}><p>{p}</p></Reveal>
            ))}
          </div>

          <ul className="mt-12">
            {about.points.map((pt, i) => (
              <li key={pt.title} className="relative py-6">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-gold/50"
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
                />
                <Reveal delay={i * 0.1}>
                  <h3 className="font-display text-2xl font-extrabold uppercase tracking-wide text-champagne">{pt.title}</h3>
                  <p className="mt-1 text-mist">{pt.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
