"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contactHref, cn, EASE } from "@/lib/utils";
import { Brand } from "./Brand";
import { Button } from "./Button";

const links = [
  ["Sobre", "#sobre"], ["Modalidades", "#modalidades"], ["Estrutura", "#estrutura"],
  ["Planos", "#planos"], ["Resultados", "#resultados"], ["Depoimentos", "#depoimentos"], ["Contato", "#contato"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", solid || open ? "border-b border-gold/15 bg-ink/80 py-3 backdrop-blur-xl" : "py-6")}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#" aria-label="Voltar ao topo" onClick={() => setOpen(false)}><Brand /></a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="group relative py-2 text-sm font-medium text-bone/80 transition-colors hover:text-champagne">
              {label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
          <Button href="#planos" className="!px-5 !py-3 !text-base">Matricule-se</Button>
        </nav>

        <button
          type="button"
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={cn("h-[2px] w-7 bg-gold transition-transform duration-300", open && "translate-y-[8px] rotate-45")} />
          <span className={cn("h-[2px] w-7 bg-gold transition-opacity duration-300", open && "opacity-0")} />
          <span className={cn("h-[2px] w-7 bg-gold transition-transform duration-300", open && "-translate-y-[8px] -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[55] flex flex-col justify-center bg-ink px-8 lg:hidden"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav aria-label="Menu mobile" className="flex flex-col gap-1">
              {links.map(([label, href], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-display text-5xl font-black uppercase leading-[1.1] text-bone active:text-gold"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: EASE }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-10"><Button href={contactHref()}>Falar com a gente</Button></div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
