import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  alt: string;
  variant?: number;
  /** Informe sempre uma posição (relative ou absolute) e o tamanho. */
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/** Mostra a foto quando existe; senão, uma arte dourada gerada em SVG. Nunca fica quebrado. */
export function MediaFrame({ src, alt, variant = 0, className, priority = false, sizes = "100vw" }: Props) {
  if (src) {
    return (
      <div className={cn("overflow-hidden bg-graphite", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden bg-graphite", className)} {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}>
      <Art variant={variant} />
    </div>
  );
}

function Art({ variant }: { variant: number }) {
  const v = variant % 6;
  const gx = [70, 25, 55, 80, 35, 60][v];
  const gy = [30, 60, 75, 40, 25, 55][v];
  const id = `glow-${v}`;
  const x0 = gx * 4;
  const y0 = gy * 5;
  const kind = v % 3;
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx={`${gx}%`} cy={`${gy}%`} r="70%">
          <stop offset="0" stopColor="#D4AF37" stopOpacity=".4" />
          <stop offset=".5" stopColor="#D4AF37" stopOpacity=".08" />
          <stop offset="1" stopColor="#080808" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="#0f0f0f" />
      <rect width="400" height="500" fill={`url(#${id})`} />
      {kind === 0 &&
        [50, 95, 140, 185, 230].map((r, i) => (
          <circle key={r} cx={x0} cy={y0} r={r} fill="none" stroke="#D4AF37" strokeOpacity={0.34 - i * 0.055} strokeWidth={i === 0 ? 8 : 1.5} />
        ))}
      {kind === 1 &&
        Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={-120 + i * 62} y="-80" width="14" height="680" transform="rotate(24 200 250)" fill="#D4AF37" opacity={0.05 + (i % 3) * 0.045} />
        ))}
      {kind === 2 &&
        [40, 80, 120, 160, 200].map((r, i) => (
          <ellipse key={r} cx={x0} cy={y0} rx={r * 1.5} ry={r * 0.55} fill="none" stroke="#F1DC8E" strokeOpacity={0.3 - i * 0.05} strokeWidth="1.2" transform={`rotate(-20 ${x0} ${y0})`} />
        ))}
    </svg>
  );
}
