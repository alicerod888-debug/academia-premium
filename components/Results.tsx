"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site.config";
import { MediaFrame } from "./MediaFrame";
import { Reveal } from "./Reveal";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    const c = animate(0, value, { duration: 2.2, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{n.toLocaleString("pt-BR")}{suffix}</span>;
}

export function Results() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const phrases = site.phrases;
  const loop = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <section id="resultados" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="relative h-[480px] overflow-hidden lg:col-span-5 lg:h-[640px]">
          <motion.div style={{ y: imgY }} className="absolute inset-x-0 -inset-y-[10%]">
            <MediaFrame src={undefined} alt="" variant={2} className="absolute inset-0" />
          </motion.div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-display text-4xl font-black uppercase leading-[.95] text-bone md:text-5xl">
            Quem não desiste, evolui.
          </p>
        </div>

        <div className="lg:col-span-7 lg:pl-10">
          <Reveal from="clip">
            <h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-black uppercase leading-[.9] tracking-tight">
              Resultado é consequência de constância.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">Cada treino é um passo. Disciplina todos os dias, evolução que você sente e enxerga.</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-12">
            {site.stats.items.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="border-t border-gold/40 pt-5">
                  <p className="gold-text font-display text-6xl font-black leading-none md:text-7xl"><Counter value={s.value} suffix={s.suffix} /></p>
                  <p className="mt-2 text-mist">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {site.stats.demo && <p className="mt-8 text-sm text-mist/70">Números ilustrativos. Substitua pelos dados reais da academia.</p>}
        </div>
      </div>

      <div aria-hidden="true" className="mt-24 -rotate-1 overflow-hidden bg-gradient-to-r from-gold via-champagne to-gold py-4">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {loop.map((p, i) => (
                <span key={`${k}-${i}`} className="flex items-center font-display text-4xl font-black uppercase text-ink md:text-5xl">
                  <span className="px-8">{p}</span>
                  <span className="h-3 w-3 rotate-45 bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
