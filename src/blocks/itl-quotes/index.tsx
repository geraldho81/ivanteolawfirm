import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  quotes: z.array(z.object({ quote: z.string(), cite: z.string() })),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-quotes",
  label: "ITL client quotes",
  description: "Tinted section with a row of client quote cards.",
  icon: "❝",
  schema,
  defaults: {
    anchor: "",
    kicker: "Client voices",
    heading: "What clients value most",
    quotes: [
      { quote: "They explained every step in words I could follow. I always knew what would happen next.", cite: "Client, divorce matter" },
      { quote: "Someone called me back the same hour. That calmed me more than I expected.", cite: "Client, child arrangements matter" },
      { quote: "The team listened to what mattered to my family and shaped the plan around it.", cite: "Client, matrimonial assets matter" },
    ],
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (optional)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    {
      kind: "list",
      name: "quotes",
      label: "Quotes (placeholders: replace with real, permissioned client feedback)",
      itemLabel: "Quote",
      fields: [{ kind: "textarea", name: "quote", label: "Quote", rows: 3 }, { kind: "text", name: "cite", label: "Attribution" }],
    },
  ],
  Render: (p) => (
    <section className="itl itl-section itl-quotes" id={p.anchor || undefined}>
      <div className="itl-wrap">
        <div className="itl-rv">
          <p className="itl-kicker">{p.kicker}</p>
          <h2>{p.heading}</h2>
        </div>
        <div className="itl-qgrid">
          {p.quotes.map((q, i) => (
            <figure className="itl-q itl-rv" key={i} style={rvStyle(i ? `${i * 0.1}s` : undefined)}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 7h4v5c0 3-1.5 5-4.5 5.5V15c1-.3 1.5-1 1.5-2H7zM14 7h4v5c0 3-1.5 5-4.5 5.5V15c1-.3 1.5-1 1.5-2h-1z" />
              </svg>
              <p>{q.quote}</p>
              <cite>{q.cite}</cite>
            </figure>
          ))}
        </div>
      </div>
    </section>
  ),
});
