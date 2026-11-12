import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, Icon, iconField, rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  featureIcon: z.string(),
  featureTitle: z.string(),
  featureBody: z.string(),
  featureLinkLabel: z.string(),
  featureLinkHref: z.string(),
  routes: z.array(z.object({ title: z.string(), text: z.string() })),
  areas: z.array(z.object({ icon: z.string(), title: z.string(), body: z.string(), linkLabel: z.string(), linkHref: z.string() })),
});
type Props = z.infer<typeof schema>;

const area = (icon: string, title: string, body: string, linkLabel: string) => ({ icon, title, body, linkLabel, linkHref: "#contact" });

export default defineBlock<Props>({
  type: "itl-practice",
  label: "ITL practice areas",
  description: "Section heading, a featured navy card with sub-routes, and a grid of practice area cards.",
  icon: "▦",
  schema,
  defaults: {
    anchor: "practice",
    kicker: "Practice areas",
    heading: "Support for every part of a family matter.",
    lede: "Family disputes touch money, homes and children all at once. We handle each of these areas, so you deal with one team from first call to final order.",
    featureIcon: "rings",
    featureTitle: "Divorce",
    featureBody:
      "The route you take depends on how much you and your spouse agree on. We explain each option in plain words and recommend the one that fits your situation.",
    featureLinkLabel: "Ask about divorce",
    featureLinkHref: "#contact",
    routes: [
      { title: "Uncontested", text: "You and your spouse agree on the terms. We prepare the papers and guide you through the court steps." },
      { title: "Simplified", text: "A shorter route for couples who meet the court's conditions and agree on the key issues." },
      { title: "Contested", text: "You disagree on one or more issues. We prepare your case and speak for you before the Family Justice Courts." },
    ],
    areas: [
      area("person", "Child custody, care and control, access", "Plans for where your children live, how decisions are made, and how time is shared, built around what your children need.", "Get advice"),
      area("wallet", "Maintenance", "Support for a spouse or child, set at a level that reflects your real circumstances, whether you pay or receive.", "Get advice"),
      area("home", "Division of matrimonial assets", "Your home, savings, CPF and business interests, divided with a clear view of what the court looks at.", "Get advice"),
      area("shield", "Personal protection orders", "If you or your children face violence or harassment at home, we move quickly to apply for protection.", "Get help now"),
      area("doc", "Prenuptial agreements", "Agree how assets and debts are handled before marriage, in a document that is clear and fair to both sides.", "Get advice"),
      area("heart", "Adoption and guardianship", "Guidance through the legal steps of welcoming a child into your family or caring for a loved one.", "Get advice"),
    ],
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (used by #links)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Intro text", rows: 3 },
    iconField("featureIcon", "Featured card icon"),
    { kind: "text", name: "featureTitle", label: "Featured card title" },
    { kind: "textarea", name: "featureBody", label: "Featured card text", rows: 3 },
    { kind: "text", name: "featureLinkLabel", label: "Featured card link label" },
    { kind: "text", name: "featureLinkHref", label: "Featured card link" },
    {
      kind: "list",
      name: "routes",
      label: "Featured card routes",
      itemLabel: "Route",
      fields: [
        { kind: "text", name: "title", label: "Title" },
        { kind: "textarea", name: "text", label: "Text", rows: 3 },
      ],
    },
    {
      kind: "list",
      name: "areas",
      label: "Practice area cards",
      itemLabel: "Area",
      fields: [
        iconField(),
        { kind: "text", name: "title", label: "Title" },
        { kind: "textarea", name: "body", label: "Text", rows: 3 },
        { kind: "text", name: "linkLabel", label: "Link label" },
        { kind: "text", name: "linkHref", label: "Link" },
      ],
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
        <div className="itl-areas">
          <article className="itl-area itl-feature itl-rv">
            <div>
              <div className="itl-ic"><Icon name={p.featureIcon} /></div>
              <h3 style={{ marginTop: 18 }}>{p.featureTitle}</h3>
              <p style={{ marginTop: 10 }}>{p.featureBody}</p>
              {p.featureLinkLabel && (
                <a className="itl-link" href={safeHref(p.featureLinkHref)} style={{ color: "#8ec6fa", marginTop: 18 }}>
                  {p.featureLinkLabel} <Arrow />
                </a>
              )}
            </div>
            <div className="itl-routes">
              {p.routes.map((r, i) => (
                <div className="itl-route" key={i}>
                  <b>{r.title}</b>
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
          </article>
          {p.areas.map((a, i) => (
            <article className="itl-area itl-rv" key={i} style={rvStyle(`${0.05 * ((i % 3) + 1)}s`)}>
              <div className="itl-ic"><Icon name={a.icon} /></div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              {a.linkLabel && (
                <a className="itl-link" href={safeHref(a.linkHref)}>
                  {a.linkLabel} <Arrow />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  ),
});
