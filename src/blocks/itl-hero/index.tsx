import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Arrow, Laurel, Icon, rvStyle } from "@/blocks/itl-shared";

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
  artAlt: z.string(),
  imgSky: z.string(),
  imgCloud1: z.string(),
  imgCloud2: z.string(),
  imgCloud3: z.string(),
  imgCloud4: z.string(),
  imgSkyline: z.string(),
  imgWater: z.string(),
  imgLights: z.string(),
  imgGlow: z.string(),
});
type Props = z.infer<typeof schema>;

const CLD = "https://res.cloudinary.com/dsg6ukzzt/image/upload/";
const art = (v: string, name: string) => `${CLD}${v}/ivanteolaw/hero/${name}.webp`;

/** Cloudinary delivery URL at a given width (auto format and quality); other URLs pass through. */
function sized(url: string, w: number): string {
  const i = url.indexOf("/image/upload/");
  if (i < 0) return url;
  const head = url.slice(0, i + 14);
  const tail = url.slice(i + 14).replace(/^(?:[a-z]{1,3}_[^/]*\/)+/, "");
  return `${head}f_auto,q_auto:good,w_${w}/${tail}`;
}
function Layer({ src, className, depth, alt = "" }: { src: string; className?: string; depth: number; alt?: string }) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={sized(src, 1400)} srcSet={`${sized(src, 1400)} 1400w, ${sized(src, 2748)} 2748w`} sizes="(max-width: 600px) 1400px, 2400px" alt={alt} decoding="async" draggable={false} data-d={depth} />
  );
}

/* Window-light groups: [x0, x1, y0, y1] in plate pixels (2748 x 810 layer box), each twinkles on its own clock. */
const GROUPS: [number, number, number, number][] = [
  [1540, 1760, 330, 540], [1540, 1760, 540, 740],
  [1760, 1930, 330, 540], [1760, 1930, 540, 740],
  [1930, 2100, 330, 540], [1930, 2100, 540, 740],
];
const RIPPLE = [0, 0.06, 0.13, 0.21, 0.3, 0.4, 0.51, 0.62, 0.72, 0.82, 0.91, 1];

export default defineBlock<Props>({
  type: "itl-hero",
  label: "ITL hero",
  description: "Animated hero: a painted Marina Bay Sands scene built from layers (sky, clouds, skyline, water, lights). Text, buttons, award badge and every layer image are editable.",
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
    artAlt: "",
    imgSky: art("v1794535634", "mbs-sky"),
    imgCloud1: art("v1794535638", "mbs-c1"),
    imgCloud2: art("v1794535640", "mbs-c2"),
    imgCloud3: art("v1794535642", "mbs-c3"),
    imgCloud4: art("v1794535643", "mbs-c4"),
    imgSkyline: art("v1794535636", "mbs-fg"),
    imgWater: art("v1794535649", "mbs-water"),
    imgLights: art("v1794535645", "mbs-lights"),
    imgGlow: art("v1794535647", "mbs-glow"),
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
    { kind: "text", name: "artAlt", label: "Hero artwork description for screen readers (empty = decorative)" },
    { kind: "image", name: "imgSky", label: "Layer: sky plate (calm painted sky)" },
    { kind: "image", name: "imgCloud1", label: "Layer: cloud wisps, high (transparent PNG/WebP)" },
    { kind: "image", name: "imgCloud2", label: "Layer: cloud wisps, upper right" },
    { kind: "image", name: "imgCloud3", label: "Layer: cloud wisps, low" },
    { kind: "image", name: "imgCloud4", label: "Layer: cloud wisps, left" },
    { kind: "image", name: "imgSkyline", label: "Layer: skyline cut-out with transparent sky" },
    { kind: "image", name: "imgWater", label: "Layer: water band with reflections" },
    { kind: "image", name: "imgLights", label: "Layer: window light glow (transparent)" },
    { kind: "image", name: "imgGlow", label: "Layer: SkyPark glow (transparent)" },
  ],
  Render: (p) => (
    <section className="itl itl-hero" data-itl-hero id="top">
      <div className="itl-hero-bg" aria-hidden="true">
        <div className="itl-stage" data-itl-stage>
          <div className="itl-kb">
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.15 }}><Layer src={p.imgSky} depth={0.15} alt={p.artAlt} /></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.25 }}><div className="itl-cl itl-cl1"><Layer src={p.imgCloud1} depth={0.25} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.35 }}><div className="itl-cl itl-cl2"><Layer src={p.imgCloud2} depth={0.35} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.45 }}><div className="itl-cl itl-cl3"><Layer src={p.imgCloud3} depth={0.45} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.3 }}><div className="itl-cl itl-cl4"><Layer src={p.imgCloud4} depth={0.3} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.15 }}>
              <i className="itl-dusk" />
              <i className="itl-night" />
            </div>
            <div className="itl-ly itl-ly-water" style={{ ["--d" as string]: 0.9 }}>
              {RIPPLE.slice(0, -1).map((f0, i) => {
                const f1 = RIPPLE[i + 1];
                const hh = f1 - f0;
                return (
                  <div key={i} className="itl-rs" style={{ top: `${f0 * 100}%`, height: `${hh * 100}%` }}>
                    <div className="itl-rp" style={{ ["--a" as string]: `${(1 + i * 0.55).toFixed(2)}px`, ["--t" as string]: `${(6.5 + (i % 4) * 1.3).toFixed(1)}s`, ["--dl" as string]: `${(-i * 1.7).toFixed(1)}s` }}>
                      {p.imgWater && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={sized(p.imgWater, 1400)} srcSet={`${sized(p.imgWater, 1400)} 1400w, ${sized(p.imgWater, 2748)} 2748w`} sizes="(max-width: 600px) 1400px, 2400px" alt="" decoding="async" draggable={false} style={{ top: `${-(f0 / hh) * 100}%`, height: `${(1 / hh) * 100}%` }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.7 }}><Layer src={p.imgSkyline} depth={0.7} /></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.7 }}>
              {GROUPS.map((g, i) => (
                <div key={i} className="itl-lt" style={{ clipPath: `inset(${(g[2] / 810) * 100}% ${100 - (g[1] / 2748) * 100}% ${100 - (g[3] / 810) * 100}% ${(g[0] / 2748) * 100}%)`, ["--t" as string]: `${(4.6 + i * 0.9).toFixed(1)}s`, ["--dl" as string]: `${(-i * 1.9).toFixed(1)}s` }}>
                  <Layer src={p.imgLights} depth={0.7} />
                </div>
              ))}
              <div className="itl-gl"><Layer src={p.imgGlow} depth={0.7} /></div>
            </div>
          </div>
        </div>
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
