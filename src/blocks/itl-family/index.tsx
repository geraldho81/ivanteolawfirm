import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, rvStyle } from "@/blocks/itl-shared";

const schema = z.object({
  anchor: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  imagePosition: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  chips: z.array(z.object({ label: z.string() })),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-family",
  label: "ITL children and family",
  description: "Navy split section: photo, heading, text, topic chips and a button.",
  icon: "◨",
  schema,
  defaults: {
    anchor: "family",
    image: "https://res.cloudinary.com/dsg6ukzzt/image/upload/v1794471088/ivanteolaw/family.jpg",
    imageAlt: "A mother and her young daughter laughing together on a sofa",
    imagePosition: "62% 50%",
    kicker: "Children and family",
    heading: "Your children stay at the centre of every plan",
    lede: "A divorce ends a marriage. It does not end a family. We help you build arrangements that give your children stability and keep both parents involved where that is right for them.",
    chips: [{ label: "Custody" }, { label: "Care and control" }, { label: "Access" }, { label: "Maintenance" }, { label: "Guardianship" }],
    ctaLabel: "Book a consultation",
    ctaHref: "#contact",
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (optional)" },
    { kind: "image", name: "image", label: "Photo" },
    { kind: "text", name: "imageAlt", label: "Photo alt text" },
    { kind: "text", name: "imagePosition", label: "Photo focal point (CSS object-position, e.g. 62% 50%)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Text", rows: 3 },
    { kind: "list", name: "chips", label: "Topic chips", itemLabel: "Chip", fields: [{ kind: "text", name: "label", label: "Label" }] },
    { kind: "text", name: "ctaLabel", label: "Button label" },
    { kind: "text", name: "ctaHref", label: "Button link" },
  ],
  Render: (p) => (
    <section className="itl itl-section itl-family" id={p.anchor || undefined}>
      <div className="itl-wrap itl-split itl-flip">
        <div className="itl-media itl-rv">
          {p.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.image} alt={p.imageAlt} loading="lazy" data-itl-par style={{ objectPosition: p.imagePosition || undefined }} />
          )}
        </div>
        <div>
          <p className="itl-kicker itl-rv">{p.kicker}</p>
          <h2 className="itl-rv" style={rvStyle(".08s")}>{p.heading}</h2>
          <p className="itl-lede itl-rv" style={{ ...rvStyle(".16s"), marginTop: 20 }}>{p.lede}</p>
          <div className="itl-chips itl-rv" style={rvStyle(".24s")}>
            {p.chips.map((c, i) => (
              <span className="itl-chip" key={i}>{c.label}</span>
            ))}
          </div>
          {p.ctaLabel && (
            <a className="itl-btn itl-btn-primary itl-rv" style={rvStyle(".3s")} href={safeHref(p.ctaHref)}>{p.ctaLabel} <Arrow /></a>
          )}
        </div>
      </div>
    </section>
  ),
});
