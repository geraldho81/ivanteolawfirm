import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, Laurel, Icon, rvStyle } from "@/blocks/itl-shared";
import ItlSkyline from "@/components/site/ItlSkyline";

const schema = z.object({
  headlineBefore: z.string(),
  headlineEmphasis: z.string(),
  headlineAfter: z.string(),
  subline: z.string(),
  primaryLabel: z.string(),
  primaryHref: z.string(),
  secondaryLabel: z.string(),
  secondaryHref: z.string(),
  assurance: z.string(),
  showAward: z.boolean(),
  awardTitle: z.string(),
  awardSub: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-hero",
  label: "ITL hero",
  description: "Animated Marina Bay skyline hero. The skyline is drawn in code; all text, buttons and the award badge are editable.",
  icon: "◐",
  schema,
  defaults: {
    headlineBefore: "Ivan Teo, the ",
    headlineEmphasis: "best lawyer",
    headlineAfter: " in Singapore",
    subline:
      "Family law and divorce advice from a team that listens first. Tell us what you need, and we will help you find the right way forward.",
    primaryLabel: "Book a consultation",
    primaryHref: "#contact",
    secondaryLabel: "See how we can help",
    secondaryHref: "#practice",
    assurance: "Your conversation with us is private.",
    showAward: true,
    awardTitle: "Spirit of Enterprise Award 2026",
    awardSub: "Singapore",
  },
  fields: [
    { kind: "text", name: "headlineBefore", label: "Headline: text before the emphasised word (keep the trailing space)" },
    { kind: "text", name: "headlineEmphasis", label: "Headline: emphasised words (light blue accent)" },
    { kind: "text", name: "headlineAfter", label: "Headline: text after the emphasised word (keep the leading space)" },
    { kind: "textarea", name: "subline", label: "Subline", rows: 3 },
    { kind: "text", name: "primaryLabel", label: "Primary button label" },
    { kind: "text", name: "primaryHref", label: "Primary button link" },
    { kind: "text", name: "secondaryLabel", label: "Secondary button label" },
    { kind: "text", name: "secondaryHref", label: "Secondary button link" },
    { kind: "text", name: "assurance", label: "Assurance line (empty to hide)" },
    { kind: "toggle", name: "showAward", label: "Show award badge" },
    { kind: "text", name: "awardTitle", label: "Award badge title" },
    { kind: "text", name: "awardSub", label: "Award badge subtitle" },
  ],
  Render: (p) => (
    <section className="itl itl-hero" data-itl-hero id="top">
      <div className="itl-hero-bg" aria-hidden="true">
        <ItlSkyline />
      </div>
      <div className="itl-wrap itl-hero-in">
        <h1 className="itl-rv">
          {p.headlineBefore}
          {p.headlineEmphasis && <em>{p.headlineEmphasis}</em>}
          {p.headlineAfter}
        </h1>
        <p className="itl-sub itl-rv" style={rvStyle(".15s")}>{p.subline}</p>
        <div className="itl-cta itl-rv" style={rvStyle(".3s")}>
          {p.primaryLabel && (
            <a className="itl-btn itl-btn-primary" href={safeHref(p.primaryHref)}>{p.primaryLabel} <Arrow /></a>
          )}
          {p.secondaryLabel && (
            <a className="itl-btn itl-btn-ghost" href={safeHref(p.secondaryHref)}>{p.secondaryLabel}</a>
          )}
        </div>
        {p.assurance && (
          <p className="itl-assure itl-rv" style={rvStyle(".45s")}>
            <Icon name="shieldcheck" sw={2} />
            {p.assurance}
          </p>
        )}
        {p.showAward && (
          <div className="itl-award itl-rv" style={rvStyle(".55s")}>
            <Laurel />
            <div>
              <b>{p.awardTitle}</b>
              <span>{p.awardSub}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  ),
});
