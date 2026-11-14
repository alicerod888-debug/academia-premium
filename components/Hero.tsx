"use client";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { site } from "@/lib/site.config";
import { contactHref, EASE } from "@/lib/utils";
import { Button } from "./Button";
import { MediaFrame } from "./MediaFrame";
import { IconWhatsapp } from "./Icons";

function Words({ words, delay = 0, wordClass = "" }: { words: string[]; delay?: number; wordClass?: string }) {
  return (
    <span className="flex flex-wrap">
      {words.map((w, i) => (
        <span key={i} className="mr-[.22em] inline-block overflow-hidden pb-[.1em] align-bottom">
          <motion.span
            className={`inline-block ${wordClass}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, delay: delay + i * 0.1, ease: EASE }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const particles = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 11) % 100, size: 2 + (i % 3), delay: (i * 1.3) % 9, dur: 9 + (i % 5) * 2,
}));

export function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 900], [0, 180]);
  const yTxt = useTransform(scrollY, [0, 900], [0, -90]);
  const fade = useTransform(scrollY, [0, 650], [1, 0]);

  const mx = useMotionValue(70);
  const my = useMotionValue(35);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(640px circle at ${sx}% ${sy}%, rgba(212,175,55,0.24), transparent 62%)`;

  function onMove(e: ReactPointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  const { video, poster, image } = site.hero;

  return (
    <section onPointerMove={onMove} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <motion.div style={{ y: yBg }} className="absolute inset-x-0 -top-24 bottom-[-90px]">
        {video ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={video} poster={poster || undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        ) : (
          <MediaFrame src={image || undefined} alt="" variant={0} priority className="absolute inset-0" />
        )}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/75" />
      <div aria-hidden="true" className="gold-lines" />
      <motion.div aria-hidden="true" style={{ backgroundImage: spot }} className="pointer-events-none absolute inset-0 mix-blend-screen" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <span key={i} className="particle" style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
        ))}
      </div>

      <motion.div style={{ y: yTxt, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-40 md:px-8">
        <h1 className="font-display font-black uppercase leading-[.84] tracking-tight">
          <span className="block text-[clamp(4.2rem,17vw,13rem)] text-bone">
            <Words words={["Supere", "seus", "limites."]} />
          </span>
          <span className="mt-5 block text-[clamp(1.7rem,5.6vw,4.4rem)] leading-none">
            <Words words={["Construa", "sua", "melhor", "versão."]} delay={0.5} wordClass="gold-text" />
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80 md:text-xl"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
        >
          Estrutura, método e energia para transformar treino em resultado.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9, ease: EASE }}
        >
          <Button href="#planos">Comece agora</Button>
          <Button href={contactHref()} variant="ghost" icon={<IconWhatsapp width={20} height={20} />}>Fale no WhatsApp</Button>
        </motion.div>
      </motion.div>

      <a href="#sobre" aria-label="Rolar para a próxima seção" className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <span className="relative block h-14 w-px overflow-hidden bg-white/20">
          <span className="scroll-dot absolute inset-x-0 top-0 block h-5 bg-gold" />
        </span>
      </a>
    </section>
  );
}
