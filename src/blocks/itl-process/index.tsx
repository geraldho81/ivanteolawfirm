import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  steps: z.array(z.object({ number: z.string(), title: z.string(), text: z.string() })),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  ctaNote: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-process",
  label: "ITL process",
  description: "Heading plus numbered step cards and a call to action.",
  icon: "①",
  schema,
  defaults: {
    anchor: "process",
    kicker: "How it works",
    heading: "Four steps, and you know what comes next at each one.",
    lede: "Legal processes feel easier when the path is clear. Here is how we work with you.",
    steps: [
      { number: "01", title: "Reach out", text: "Send the form or call us. Our team arranges your consultation within 30 minutes." },
      { number: "02", title: "Talk it through", text: "Share your situation and your goals. We outline your options, fees from S$500, and likely timelines." },
      { number: "03", title: "Choose your plan", text: "You decide how to proceed. We prepare the documents and handle the filings with the Family Justice Courts." },
      { number: "04", title: "Move forward", text: "We stay with you through negotiation, hearings and final orders, and keep you informed at each stage." },
    ],
    ctaLabel: "Start with step one",
    ctaHref: "#contact",
    ctaNote: "Consultation arranged within 30 minutes.",
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (used by #links)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Intro text", rows: 2 },
    {
      kind: "list",
      name: "steps",
      label: "Steps",
      itemLabel: "Step",
      fields: [
        { kind: "text", name: "number", label: "Number label (e.g. 01)" },
        { kind: "text", name: "title", label: "Title" },
        { kind: "textarea", name: "text", label: "Text", rows: 3 },
      ],
    },
    { kind: "text", name: "ctaLabel", label: "Button label" },
    { kind: "text", name: "ctaHref", label: "Button link" },
    { kind: "text", name: "ctaNote", label: "Note beside the button" },
  ],
  Render: (p) => (
    <section className="itl itl-section" id={p.anchor || undefined}>
      <div className="itl-wrap">
        <div className="itl-head">
          <div className="itl-rv">
            <p className="itl-kicker">{p.kicker}</p>
            <h2>{p.heading}</h2>
          </div>
          <p className="itl-lede itl-rv" style={rvStyle(".1s")}>{p.lede}</p>
        </div>
        <div className="itl-steps">
          {p.steps.map((s, i) => (
            <div className="itl-step itl-rv" key={i} style={rvStyle(i ? `${i * 0.1}s` : undefined)}>
              <div className="itl-no">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className="itl-process-cta itl-rv">
          {p.ctaLabel && <a className="itl-btn itl-btn-primary" href={safeHref(p.ctaHref)}>{p.ctaLabel} <Arrow /></a>}
          {p.ctaNote && <p>{p.ctaNote}</p>}
        </div>
      </div>
    </section>
  ),
});
