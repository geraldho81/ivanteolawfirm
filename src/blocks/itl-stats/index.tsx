import { z } from "zod";
import { defineBlock } from "@/blocks/types";

const schema = z.object({
  items: z.array(z.object({ prefix: z.string(), value: z.number(), unit: z.string(), text: z.string() })),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-stats",
  label: "ITL stats strip",
  description: "Card of animated counters that overlaps the hero.",
  icon: "123",
  schema,
  defaults: {
    items: [
      { prefix: "", value: 13, unit: "years", text: "Focused on family law and divorce in Singapore." },
      { prefix: "S$", value: 500, unit: "onwards", text: "Fees start from S$500, so you know where you stand early." },
      { prefix: "", value: 30, unit: "minutes", text: "Our team arranges your consultation within 30 minutes of your enquiry." },
    ],
  },
  fields: [
    {
      kind: "list",
      name: "items",
      label: "Stats",
      itemLabel: "Stat",
      fields: [
        { kind: "text", name: "prefix", label: "Prefix (e.g. S$)" },
        { kind: "number", name: "value", label: "Number (counts up)" },
        { kind: "text", name: "unit", label: "Unit (small text after the number)" },
        { kind: "text", name: "text", label: "Description" },
      ],
    },
  ],
  Render: (p) => (
    <div className="itl itl-stats">
      <div className="itl-wrap">
        <div className="itl-stats-card itl-rv">
          {p.items.map((s, i) => (
            <div className="itl-stat" key={i}>
              <div className="itl-n">
                {s.prefix}
                <span data-itl-count={s.value}>{s.value}</span>
                {s.unit && <small>{s.unit}</small>}
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});
