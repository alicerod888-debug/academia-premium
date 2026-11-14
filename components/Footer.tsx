import { site } from "@/lib/site.config";
import { Brand } from "./Brand";
import { SocialLinks } from "./SocialLinks";

const nav = [["Sobre", "#sobre"], ["Modalidades", "#modalidades"], ["Estrutura", "#estrutura"], ["Planos", "#planos"], ["Resultados", "#resultados"], ["Depoimentos", "#depoimentos"], ["Contato", "#contato"]];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/30 bg-ink pb-10 pt-20">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-3 md:px-8">
        <div className="space-y-5">
          <Brand />
          <p className="max-w-xs text-mist">{site.description}</p>
          <SocialLinks />
        </div>
        <nav aria-label="Rodapé">
          <h2 className="font-display text-xl font-extrabold uppercase text-champagne">Navegação</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {nav.map(([l, h]) => (<li key={h}><a href={h} className="text-mist transition-colors hover:text-gold">{l}</a></li>))}
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-xl font-extrabold uppercase text-champagne">Onde estamos</h2>
          <p className="mt-4 text-mist">{site.address.line1}<br />{site.address.line2}</p>
          {site.phone && <p className="mt-3 text-mist">{site.phone}</p>}
          {site.email && <p className="text-mist">{site.email}</p>}
        </div>
      </div>
      <p className="mx-auto mt-16 max-w-7xl px-5 text-sm text-mist/70 md:px-8">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
    </footer>
  );
}
