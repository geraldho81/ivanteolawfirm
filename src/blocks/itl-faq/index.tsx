import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  items: z.array(z.object({ q: z.string(), a: z.string() })),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-faq",
  label: "ITL FAQ",
  description: "Two-column FAQ accordion with a side heading and button. Feeds FAQPage structured data.",
  icon: "?",
  schema,
  defaults: {
    anchor: "faq",
    kicker: "Questions",
    heading: "Answers to what people ask us first",
    lede: "Cannot find your question? Send us a message and our team will reply.",
    ctaLabel: "Book a consultation",
    ctaHref: "#contact",
    items: [
      { q: "What is the difference between contested and uncontested divorce?", a: "In an uncontested divorce, you and your spouse agree on the key issues, so the process moves faster. A contested divorce means you disagree on matters such as children or assets, and the Family Justice Courts help resolve them." },
      { q: "Do I qualify for a simplified divorce?", a: "The simplified route suits couples who meet the court's conditions and agree on all the main issues. Tell us your circumstances in a consultation and we will confirm whether it applies to you." },
      { q: "How are child custody, care and control, and access decided?", a: "Parents can agree on these arrangements together, and the court looks at what serves the child's welfare. We help you set out a clear plan, and we speak for you if the court needs to decide." },
      { q: "How are matrimonial assets divided?", a: "The court looks at what each spouse contributed to the marriage, both in money and in care of the home and family. We gather the facts on your assets and present a clear position on your behalf." },
      { q: "What does a consultation cost?", a: "Our fees start from S$500. The final figure depends on your matter, and we explain it to you before you decide to go ahead." },
      { q: "I need protection from a family member. What can I do?", a: "A personal protection order can restrain a family member from violence or harassment. If you are in immediate danger, call 999 first. Then contact us and we will help you apply." },
      { q: "Is what I tell you kept private?", a: "Yes. Your conversations with your lawyer are confidential, and we handle every matter with discretion." },
    ],
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (used by #links)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Side text", rows: 2 },
    { kind: "text", name: "ctaLabel", label: "Button label" },
    { kind: "text", name: "ctaHref", label: "Button link" },
    {
      kind: "list",
      name: "items",
      label: "Questions",
      itemLabel: "Question",
      fields: [{ kind: "text", name: "q", label: "Question" }, { kind: "textarea", name: "a", label: "Answer", rows: 4 }],
    },
  ],
  Render: (p) => (
    <section className="itl itl-section" id={p.anchor || undefined}>
      <div className="itl-wrap itl-faq-wrap">
        <div className="itl-rv">
          <p className="itl-kicker">{p.kicker}</p>
          <h2>{p.heading}</h2>
          <p className="itl-lede" style={{ marginTop: 18 }}>{p.lede}</p>
          {p.ctaLabel && (
            <a className="itl-btn itl-btn-line" style={{ marginTop: 28 }} href={safeHref(p.ctaHref)}>{p.ctaLabel}</a>
          )}
        </div>
        <div className="itl-faq">
          {p.items.map((it, i) => (
            <div className="itl-fq itl-rv" key={i} style={rvStyle(i ? "0.05s" : undefined)}>
              <button type="button" aria-expanded="false">
                <span>{it.q}</span>
                <span className="itl-pm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className="itl-ans"><div><p>{it.a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});
