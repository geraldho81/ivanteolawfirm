import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Logo, linkListFields } from "@/blocks/itl-shared";

const link = z.object({ label: z.string(), href: z.string() });
const schema = z.object({
  firmName: z.string(),
  logoImage: z.string(),
  logoAlt: z.string(),
  about: z.string(),
  col1Heading: z.string(),
  col1Links: z.array(link),
  col2Heading: z.string(),
  col2Links: z.array(link),
  creditsLead: z.string(),
  credits: z.array(z.object({ subject: z.string(), author: z.string(), authorHref: z.string(), source: z.string(), sourceHref: z.string() })),
  creditsNote: z.string(),
  legal: z.string(),
  fabHref: z.string(),
  fabLabel: z.string(),
  fabNewTab: z.boolean(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-footer",
  label: "ITL footer",
  description: "Footer with link columns, photo credits, legal line and the floating contact button.",
  icon: "▁",
  schema,
  defaults: {
    firmName: "Ivan Teo Law Firm",
    logoImage: "",
    logoAlt: "",
    about: "Family law and divorce advice in Singapore. Fees from S$500.",
    col1Heading: "Practice areas",
    col1Links: [
      { label: "Divorce", href: "#practice" },
      { label: "Children and custody", href: "#practice" },
      { label: "Maintenance and assets", href: "#practice" },
      { label: "Protection orders", href: "#practice" },
    ],
    col2Heading: "Contact",
    col2Links: [
      { label: "+65 6000 0000", href: "tel:+6560000000" },
      { label: "hello@ivanteolaw.sg", href: "mailto:hello@ivanteolaw.sg" },
      { label: "Book a consultation", href: "#contact" },
    ],
    creditsLead: "Photo credits:",
    credits: [
      { subject: "Family of five", author: "Rohit Dey", authorHref: "https://unsplash.com/@rohit16dey", source: "Unsplash", sourceHref: "https://unsplash.com/photos/apOMdj47q6s" },
      { subject: "Mother and daughter", author: "Vivek Kumar", authorHref: "https://unsplash.com/@vikceo", source: "Unsplash", sourceHref: "https://unsplash.com/photos/a-_1PPjnbUg" },
      { subject: "Hero painted from a photo", author: "Pang Yuhao", authorHref: "https://unsplash.com/@yuhao", source: "Unsplash", sourceHref: "https://unsplash.com/photos/marina-bay-sands-in-singapore-during-night-time-WCck07a9MbM" },
    ],
    creditsNote: "",
    legal: "This page gives general information and does not replace legal advice. All contact details on this preview are placeholders.",
    fabHref: "#contact",
    fabLabel: "Contact us now",
    fabNewTab: false,
  },
  fields: [
    { kind: "text", name: "firmName", label: "Firm name" },
    { kind: "image", name: "logoImage", label: "Logo image (optional)" },
    { kind: "text", name: "logoAlt", label: "Logo alt text" },
    { kind: "textarea", name: "about", label: "About line", rows: 2 },
    { kind: "text", name: "col1Heading", label: "Column 1 heading" },
    { kind: "list", name: "col1Links", label: "Column 1 links", itemLabel: "Link", fields: linkListFields },
    { kind: "text", name: "col2Heading", label: "Column 2 heading" },
    { kind: "list", name: "col2Links", label: "Column 2 links", itemLabel: "Link", fields: linkListFields },
    { kind: "text", name: "creditsLead", label: "Photo credits lead-in" },
    {
      kind: "list",
      name: "credits",
      label: "Photo credits",
      itemLabel: "Credit",
      fields: [
        { kind: "text", name: "subject", label: "Subject (e.g. Family of five)" },
        { kind: "text", name: "author", label: "Photographer" },
        { kind: "text", name: "authorHref", label: "Photographer link" },
        { kind: "text", name: "source", label: "Source name (e.g. Unsplash)" },
        { kind: "text", name: "sourceHref", label: "Photo link" },
      ],
    },
    { kind: "text", name: "creditsNote", label: "Extra credit line" },
    { kind: "textarea", name: "legal", label: "Legal line", rows: 2 },
    { kind: "text", name: "fabHref", label: "Floating button link (e.g. https://wa.me/65XXXXXXXX or #contact)" },
    { kind: "text", name: "fabLabel", label: "Floating button accessible label" },
    { kind: "toggle", name: "fabNewTab", label: "Open floating button link in a new tab" },
  ],
  Render: (p) => (
    <>
      <footer className="itl itl-footer">
        <div className="itl-wrap">
          <div className="itl-fgrid">
            <div>
              <a className="itl-mark" href="#top">
                <Logo src={p.logoImage} alt={p.logoAlt} />
                <span>{p.firmName}</span>
              </a>
              <p style={{ maxWidth: "22rem" }}>{p.about}</p>
            </div>
            <div>
              <h4>{p.col1Heading}</h4>
              <ul>{p.col1Links.map((l, i) => <li key={i}><a href={safeHref(l.href)}>{l.label}</a></li>)}</ul>
            </div>
            <div>
              <h4>{p.col2Heading}</h4>
              <ul>{p.col2Links.map((l, i) => <li key={i}><a href={safeHref(l.href)}>{l.label}</a></li>)}</ul>
            </div>
          </div>
          <p className="itl-credits">
            {p.creditsLead}{" "}
            {p.credits.map((c, i) => (
              <span key={i}>
                {c.subject} by <a href={safeHref(c.authorHref)} target="_blank" rel="noopener">{c.author}</a> on{" "}
                <a href={safeHref(c.sourceHref)} target="_blank" rel="noopener">{c.source}</a>.{" "}
              </span>
            ))}
            {p.creditsNote}
          </p>
          <p className="itl-legal">{p.legal}</p>
        </div>
      </footer>
      <a className="itl itl-fab" href={safeHref(p.fabHref)} aria-label={p.fabLabel} {...(p.fabNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16.04 3C8.84 3 3 8.8 3 15.95c0 2.3.6 4.5 1.75 6.45L3 29l6.8-1.7a13 13 0 0 0 6.24 1.6C23.2 28.9 29 23.1 29 15.95 29 8.8 23.2 3 16.04 3zm0 23.7c-1.95 0-3.85-.52-5.5-1.5l-.4-.23-4.04 1 1.08-3.93-.26-.4a10.6 10.6 0 0 1-1.63-5.7c0-5.9 4.84-10.7 10.8-10.7 5.95 0 10.8 4.8 10.8 10.7 0 5.9-4.85 10.76-10.85 10.76zm5.93-8.05c-.32-.16-1.92-.94-2.22-1.05-.3-.1-.52-.16-.73.16s-.84 1.05-1.03 1.27c-.19.2-.38.23-.7.08-.33-.16-1.38-.5-2.62-1.6-.97-.86-1.6-1.9-1.8-2.23-.18-.32-.02-.5.14-.66.15-.14.33-.37.5-.56.15-.2.2-.33.3-.55.1-.2.05-.4-.03-.56-.08-.16-.73-1.74-1-2.4-.26-.62-.53-.54-.73-.55h-.62c-.2 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.68s1.15 3.1 1.3 3.32c.16.2 2.26 3.45 5.47 4.84.76.33 1.36.52 1.83.67.77.24 1.47.2 2.02.12.62-.1 1.92-.78 2.19-1.54.27-.76.27-1.4.19-1.54-.08-.14-.3-.22-.62-.38z" />
        </svg>
      </a>
    </>
  ),
});
