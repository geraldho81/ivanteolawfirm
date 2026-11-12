import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, Icon, iconField, rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  imagePosition: z.string(),
  tagIcon: z.string(),
  tagTitle: z.string(),
  tagText: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  points: z.array(z.object({ title: z.string(), text: z.string() })),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-approach",
  label: "ITL approach",
  description: "Tinted split section: photo with a floating tag, heading, numbered points and a button.",
  icon: "◧",
  schema,
  defaults: {
    anchor: "approach",
    image: "https://res.cloudinary.com/dsg6ukzzt/image/upload/v1794471086/ivanteolaw/approach.jpg",
    imageAlt: "A family of five standing together outdoors, with a father holding a baby",
    imagePosition: "4% 50%",
    tagIcon: "chat",
    tagTitle: "Every family is different",
    tagText: "We learn your goals before we suggest a plan.",
    kicker: "Our approach",
    heading: "We start by understanding you",
    lede: "After 13 years in family law, we have learned that no two families need the same plan. We take the time to understand your needs, then work toward the solution that suits you.",
    points: [
      { title: "We listen before we advise", text: "You set out your concerns and goals. Our advice follows from them." },
      { title: "We explain every option", text: "You hear the routes open to you, with the likely effort and cost of each." },
      { title: "We act for you with care", text: "We have won numerous cases for clients, and we prepare yours with the same care." },
    ],
    ctaLabel: "Book a consultation",
    ctaHref: "#contact",
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (used by #links)" },
    { kind: "image", name: "image", label: "Photo" },
    { kind: "text", name: "imageAlt", label: "Photo alt text" },
    { kind: "text", name: "imagePosition", label: "Photo focal point (CSS object-position, e.g. 4% 50%)" },
    iconField("tagIcon", "Photo tag icon"),
    { kind: "text", name: "tagTitle", label: "Photo tag title" },
    { kind: "text", name: "tagText", label: "Photo tag text" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Intro text", rows: 3 },
    {
      kind: "list",
      name: "points",
      label: "Numbered points",
      itemLabel: "Point",
      fields: [
        { kind: "text", name: "title", label: "Title" },
        { kind: "textarea", name: "text", label: "Text", rows: 2 },
      ],
    },
    { kind: "text", name: "ctaLabel", label: "Button label" },
    { kind: "text", name: "ctaHref", label: "Button link" },
  ],
  Render: (p) => (
    <section className="itl itl-section itl-approach" id={p.anchor || undefined}>
      <div className="itl-wrap itl-split">
        <div className="itl-media itl-rv">
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.imageAlt} loading="lazy" data-itl-par style={{ objectPosition: p.imagePosition || undefined }} />
          )}
          {(p.tagTitle || p.tagText) && (
            <div className="itl-tag">
              <Icon name={p.tagIcon} />
              <div>
                <b>{p.tagTitle}</b>
                <span>{p.tagText}</span>
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="itl-kicker itl-rv">{p.kicker}</p>
          <h2 className="itl-rv" style={rvStyle(".08s")}>{p.heading}</h2>
          <p className="itl-lede itl-rv" style={{ ...rvStyle(".16s"), marginTop: 20 }}>{p.lede}</p>
          <ul className="itl-points">
            {p.points.map((pt, i) => (
              <li className="itl-rv" key={i} style={rvStyle(`${0.2 + i * 0.06}s`)}>
                <span className="itl-num">{i + 1}</span>
                <div>
                  <b>{pt.title}</b>
                  <p>{pt.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {p.ctaLabel && (
            <a className="itl-btn itl-btn-primary itl-rv" style={rvStyle(".38s")} href={safeHref(p.ctaHref)}>{p.ctaLabel} <Arrow /></a>
          )}
        </div>
      </div>
    </section>
  ),
});
