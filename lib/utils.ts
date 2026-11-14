import { site } from "./site.config";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/** Link do WhatsApp com mensagem pronta. Retorna null se o número ainda não foi configurado. */
export function whatsappLink(text?: string): string | null {
  const n = site.whatsapp.number.replace(/\D/g, "");
  if (!n) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(text ?? site.whatsapp.message)}`;
}

/** WhatsApp quando configurado; caso contrário leva ao formulário de contato. */
export const contactHref = (text?: string) => whatsappLink(text) ?? "#contato";
