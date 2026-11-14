import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, ...p,
});

export const IconWhatsapp = (p: P) => (<svg {...base(p)}><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3z" /><path d="M9 8.5c.3 2.8 3.2 5.7 6 6l1.2-1.3-2-1-.9.8c-1-.4-2-1.4-2.4-2.4l.8-.9-1-2L9 8.5z" /></svg>);
export const IconInstagram = (p: P) => (<svg {...base(p)}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></svg>);
export const IconFacebook = (p: P) => (<svg {...base(p)}><path d="M14 8h2V5h-2.5C11 5 10 6.5 10 8.5V11H8v3h2v6h3v-6h2.2l.5-3H13V9c0-.6.3-1 1-1z" /></svg>);
export const IconYoutube = (p: P) => (<svg {...base(p)}><rect x="3" y="6" width="18" height="12" rx="4" /><path d="M10.5 9.5v5l4-2.5-4-2.5z" /></svg>);
export const IconTiktok = (p: P) => (<svg {...base(p)}><path d="M14 4v10.2a3.2 3.2 0 1 1-3.2-3.2" /><path d="M14 4c.3 2.3 1.8 3.8 4.2 4" /></svg>);
export const IconPin = (p: P) => (<svg {...base(p)}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const IconClock = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></svg>);
export const IconPhone = (p: P) => (<svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>);
export const IconMail = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
export const IconCheck = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const IconLeft = (p: P) => (<svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>);
export const IconRight = (p: P) => (<svg {...base(p)}><path d="M9 5l7 7-7 7" /></svg>);
export const IconClose = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
