import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, Logo, linkListFields } from "@/blocks/itl-shared";

const link = z.object({ label: z.string(), href: z.string() });
const schema = z.object({
  firmName: z.string(),
  logoImage: z.string(),
  logoAlt: z.string(),
  homeLabel: z.string(),
  navLinks: z.array(link),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  openMenuLabel: z.string(),
  closeMenuLabel: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-header",
  label: "ITL header",
  description: "Fixed top bar: firm name or logo, nav links, consultation button and mobile menu.",
  icon: "▭",
  schema,
  defaults: {
    firmName: "Ivan Teo Law Firm",
    logoImage: "",
    logoAlt: "",
    homeLabel: "Ivan Teo Law Firm home",
    navLinks: [
      { label: "Practice areas", href: "#practice" },
      { label: "Our approach", href: "#approach" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Book a consultation",
    ctaHref: "#contact",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
  },
  fields: [
    { kind: "text", name: "firmName", label: "Firm name" },
    { kind: "image", name: "logoImage", label: "Logo image (optional, replaces the built-in mark)" },
    { kind: "text", name: "logoAlt", label: "Logo alt text" },
    { kind: "text", name: "homeLabel", label: "Home link accessible label" },
    { kind: "list", name: "navLinks", label: "Navigation links", itemLabel: "Link", fields: linkListFields },
    { kind: "text", name: "ctaLabel", label: "Button label" },
    { kind: "text", name: "ctaHref", label: "Button link" },
    { kind: "text", name: "openMenuLabel", label: "Open menu accessible label" },
    { kind: "text", name: "closeMenuLabel", label: "Close menu accessible label" },
  ],
  Render: (p) => (
    <div className="itl itl-hdr-wrap">
      <header className="itl-hdr" data-itl-hdr>
        <div className="itl-wrap itl-hdr-in">
          <a className="itl-mark" href="#top" aria-label={p.homeLabel}>
            <Logo src={p.logoImage} alt={p.logoAlt} />
            <span>{p.firmName}</span>
          </a>
          <nav className="itl-nav" aria-label="Main">
            {p.navLinks.map((l, i) => (
              <a key={i} href={safeHref(l.href)}>{l.label}</a>
            ))}
          </nav>
          <div className="itl-hdr-right">
            <a className="itl-btn itl-btn-primary" href={safeHref(p.ctaHref)}>{p.ctaLabel}</a>
            <button className="itl-burger" type="button" data-itl-open aria-label={p.openMenuLabel} aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 8h16M4 16h16" /></svg>
            </button>
          </div>
        </div>
      </header>
      <div className="itl-drawer" data-itl-drawer aria-hidden="true">
        <div className="itl-drawer-top">
          <span className="itl-mark">
            <Logo src={p.logoImage} alt={p.logoAlt} />
            <span>{p.firmName}</span>
          </span>
          <button className="itl-burger" type="button" data-itl-close aria-label={p.closeMenuLabel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        {p.navLinks.map((l, i) => (
          <a key={i} className="itl-drawer-link" href={safeHref(l.href)}>{l.label}</a>
        ))}
        <a className="itl-btn itl-btn-primary" href={safeHref(p.ctaHref)}>{p.ctaLabel}</a>
      </div>
    </div>
  ),
});
void Arrow;
