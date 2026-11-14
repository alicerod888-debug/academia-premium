import { site } from "@/lib/site.config";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <rect x="2" y="14" width="5" height="12" rx="1" fill="#D4AF37" />
        <rect x="8" y="9" width="5" height="22" rx="1" fill="#F1DC8E" />
        <rect x="13" y="18.5" width="14" height="3" fill="#D4AF37" />
        <rect x="27" y="9" width="5" height="22" rx="1" fill="#F1DC8E" />
        <rect x="33" y="14" width="5" height="12" rx="1" fill="#D4AF37" />
      </svg>
      <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide text-bone">{site.name}</span>
    </span>
  );
}
