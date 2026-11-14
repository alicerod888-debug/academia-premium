import { site } from "@/lib/site.config";
import { IconFacebook, IconInstagram, IconTiktok, IconYoutube } from "./Icons";

const networks = [
  { key: "instagram", label: "Instagram", Icon: IconInstagram },
  { key: "facebook", label: "Facebook", Icon: IconFacebook },
  { key: "youtube", label: "YouTube", Icon: IconYoutube },
  { key: "tiktok", label: "TikTok", Icon: IconTiktok },
] as const;

/** Mostra só as redes que têm link preenchido em lib/site.config.ts. */
export function SocialLinks() {
  const active = networks.filter((n) => site.social[n.key]);
  if (!active.length) return null;
  return (
    <ul className="flex gap-3">
      {active.map(({ key, label, Icon }) => (
        <li key={key}>
          <a href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold transition-all hover:-translate-y-1 hover:bg-gold hover:text-ink">
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
