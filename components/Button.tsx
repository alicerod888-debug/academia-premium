import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props { href: string; children: ReactNode; variant?: "gold" | "ghost"; className?: string; icon?: ReactNode }

export function Button({ href, children, variant = "gold", className, icon }: Props) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cn(variant === "gold" ? "btn-gold" : "btn-ghost", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      {children}
    </a>
  );
}
