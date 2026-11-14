"use client";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { site, type Plan } from "@/lib/site.config";
import { cn, contactHref } from "@/lib/utils";
import { Button } from "./Button";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { IconCheck } from "./Icons";

function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const cfg = { stiffness: 140, damping: 16 };
  const rx = useSpring(useMotionValue(0), cfg);
  const ry = useSpring(useMotionValue(0), cfg);
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} onPointerMove={move} onPointerLeave={leave} className={className}>
      {children}
    </motion.div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const hl = plan.highlight;
  return (
    <div className={cn("h-full", hl && "lg:-translate-y-8")}>
    <Tilt className="relative h-full">
      <div className={cn("relative h-full p-px", hl ? "bg-gradient-to-br from-champagne via-gold to-gold/30 shadow-[0_30px_90px_-30px_rgba(212,175,55,.55)]" : "bg-white/10")}>
        <div className={cn("flex h-full flex-col p-8 md:p-10", hl ? "bg-gradient-to-b from-[#1c1707] to-ink" : "bg-ink")}>
          {hl && <span className="mb-5 w-fit bg-gold px-3 py-1 text-xs font-bold text-ink">Recomendado</span>}
          <h3 className={cn("font-display text-4xl font-black uppercase", hl ? "gold-text" : "text-bone")}>{plan.name}</h3>
          <p className="mt-2 text-mist">{plan.description}</p>

          <p className="mt-8 flex items-baseline gap-2 font-display font-black">
            {plan.price ? (
              <>
                <span className="text-2xl text-mist">R$</span>
                <span className="text-7xl leading-none text-bone">{plan.price}</span>
                <span className="text-xl text-mist">{plan.period}</span>
              </>
            ) : (
              <span className="text-5xl leading-none text-bone">Consulte</span>
            )}
          </p>

          <ul className="mt-8 flex-1 space-y-3">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-bone/85">
                <IconCheck width={20} height={20} className="mt-0.5 shrink-0 text-gold" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            href={contactHref(`Olá! Quero me matricular no plano ${plan.name}.`)}
            variant={hl ? "gold" : "ghost"}
            className="mt-10 w-full"
          >
            Quero este plano
          </Button>
        </div>
      </div>
    </Tilt>
    </div>
  );
}

export function Plans() {
  return (
    <section id="planos" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,.10),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Planos e matrículas" text="Escolha o plano ideal para o seu objetivo e comece a treinar." />
        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-3">
          {site.plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12} className="h-full"><PlanCard plan={p} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
