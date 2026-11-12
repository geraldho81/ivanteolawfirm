import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { Icon, Laurel, iconField, rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  showAward: z.boolean(),
  awardTitle: z.string(),
  awardText: z.string(),
  cards: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-why",
  label: "ITL why us",
  description: "Heading, the award card and a grid of reason cards.",
  icon: "★",
  schema,
  defaults: {
    anchor: "why",
    kicker: "Why Ivan Teo",
    heading: "Experience you can feel from the first conversation.",
    lede: "You are dealing with some of the hardest decisions of your life. Here is what you can expect from us.",
    showAward: true,
    awardTitle: "Spirit of Enterprise Award 2026",
    awardText: "The Spirit of Enterprise Awards recognise Singapore's local entrepreneurs. We are proud to receive this award for our work.",
    cards: [
      { icon: "clock", title: "13 years in practice", text: "We have spent our careers in family law and divorce, and the work shows in how we prepare." },
      { icon: "trophy", title: "A record of results", text: "We have won numerous cases for clients across divorce, children and financial matters." },
      { icon: "wallet", title: "Clear fees from S$500", text: "We tell you what to expect on cost early, so money does not add to the stress." },
      { icon: "chat", title: "A reply within 30 minutes", text: "Our professional team arranges your consultation within 30 minutes, so you are not left waiting." },
    ],
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (optional)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Intro text", rows: 2 },
    { kind: "toggle", name: "showAward", label: "Show award card" },
    { kind: "text", name: "awardTitle", label: "Award card title" },
    { kind: "textarea", name: "awardText", label: "Award card text", rows: 3 },
    {
      kind: "list",
      name: "cards",
      label: "Reason cards",
      itemLabel: "Card",
      fields: [iconField(), { kind: "text", name: "title", label: "Title" }, { kind: "textarea", name: "text", label: "Text", rows: 3 }],
    },
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
        <div className="itl-why">
          {p.showAward && (
            <div className="itl-award-card itl-rv">
              <Laurel />
              <div>
                <h3>{p.awardTitle}</h3>
                <p>{p.awardText}</p>
              </div>
            </div>
          )}
          {p.cards.map((c, i) => (
            <div className="itl-card itl-rv" key={i} style={rvStyle(i ? `${i * 0.08}s` : undefined)}>
              <div className="itl-ic"><Icon name={c.icon} /></div>
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
});
