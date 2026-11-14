"use client";
import { motion } from "framer-motion";
import { contactHref, EASE } from "@/lib/utils";
import { IconWhatsapp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={contactHref()}
      {...(contactHref().startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-gold text-ink shadow-[0_10px_40px_-8px_rgba(212,175,55,.7)]"
      initial={{ opacity: 0, scale: 0.4, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.7, ease: EASE }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
    >
      <span aria-hidden="true" className="ping-ring absolute inset-0 rounded-full border-2 border-gold" />
      <IconWhatsapp width={30} height={30} />
    </motion.a>
  );
}
