"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site.config";
import { whatsappLink } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsapp } from "./Icons";

const field = "w-full border-b border-white/20 bg-transparent px-0 py-3 text-bone outline-none transition-colors placeholder:text-mist/60 focus:border-gold";

export function Contact() {
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("nome") ?? "").trim();
    const phone = String(f.get("telefone") ?? "").trim();
    const goal = String(f.get("objetivo") ?? "");
    const msg = String(f.get("mensagem") ?? "").trim();

    if (!name || phone.replace(/\D/g, "").length < 10) {
      setStatus({ ok: false, msg: "Informe seu nome e um telefone com DDD." });
      return;
    }
    const text = `Olá! Meu nome é ${name}.\nTelefone: ${phone}\nObjetivo: ${goal}${msg ? `\nMensagem: ${msg}` : ""}`;

    const wa = whatsappLink(text);
    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      setStatus({ ok: true, msg: "Abrimos o WhatsApp com a sua mensagem pronta. É só enviar." });
      form.reset();
      return;
    }
    if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Contato pelo site")}&body=${encodeURIComponent(text)}`;
      setStatus({ ok: true, msg: "Abrimos o seu aplicativo de e-mail com a mensagem pronta." });
      form.reset();
      return;
    }
    setStatus({ ok: false, msg: "Os canais de contato ainda não foram configurados. Preencha o WhatsApp ou o e-mail em lib/site.config.ts." });
  }

  const mapSrc = site.address.mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed` : null;

  return (
    <section id="contato" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading title="Venha treinar" text="Fale com a gente, tire dúvidas e agende sua visita." />

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <Reveal from="left" className="space-y-8">
            <ul className="space-y-6">
              <li className="flex gap-4"><IconPin className="mt-1 shrink-0 text-gold" /><span><span className="block font-semibold">{site.address.line1}</span><span className="text-mist">{site.address.line2}</span></span></li>
              <li className="flex gap-4">
                <IconClock className="mt-1 shrink-0 text-gold" />
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
                  {site.hours.map((h) => (<div key={h.days} className="contents"><dt className="text-mist">{h.days}</dt><dd className="font-medium">{h.time}</dd></div>))}
                </dl>
              </li>
              {site.phone && <li className="flex gap-4"><IconPhone className="shrink-0 text-gold" /><a className="hover:text-gold" href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}>{site.phone}</a></li>}
              {site.email && <li className="flex gap-4"><IconMail className="shrink-0 text-gold" /><a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></li>}
            </ul>

            <SocialLinks />

            <div className="relative h-72 overflow-hidden border border-gold/30 bg-graphite">
              {mapSrc ? (
                <iframe
                  title={`Mapa: localização da ${site.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 [filter:grayscale(1)_invert(.9)_contrast(.9)]"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-mist">
                  <IconPin width={34} height={34} className="text-gold" />
                  <p className="max-w-xs px-4">O mapa aparece aqui assim que o endereço for informado.</p>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal from="right">
            <form onSubmit={onSubmit} noValidate className="space-y-7 border border-white/10 bg-graphite p-7 md:p-10">
              <h3 className="font-display text-3xl font-extrabold uppercase">Receba um retorno</h3>
              <div><label htmlFor="nome" className="text-sm text-mist">Nome</label><input id="nome" name="nome" autoComplete="name" required className={field} placeholder="Seu nome" /></div>
              <div><label htmlFor="telefone" className="text-sm text-mist">Telefone com DDD</label><input id="telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" required className={field} placeholder="(00) 00000-0000" /></div>
              <div>
                <label htmlFor="objetivo" className="text-sm text-mist">Objetivo</label>
                <select id="objetivo" name="objetivo" className={`${field} [&>option]:bg-ink`} defaultValue="Ainda não sei">
                  {["Emagrecimento", "Ganho de massa", "Condicionamento", "Saúde e bem-estar", "Ainda não sei"].map((o) => (<option key={o}>{o}</option>))}
                </select>
              </div>
              <div><label htmlFor="mensagem" className="text-sm text-mist">Mensagem (opcional)</label><textarea id="mensagem" name="mensagem" rows={3} className={field} placeholder="Conte o que você procura" /></div>
              <button type="submit" className="btn-gold w-full"><IconWhatsapp width={20} height={20} />Enviar mensagem</button>
              <p role="status" aria-live="polite" className={`min-h-[1.5rem] text-sm ${status?.ok ? "text-champagne" : "text-red-300"}`}>{status?.msg}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
