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
  imgBloom: z.string(),
  imgRim: z.string(),
  imgDark: z.string(),
  imgBridge: z.string(),
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

/* Plate geometry: every layer lives on one 2748 x 1152 plate; boxes below are in plate pixels. */
type Box = [number, number, number, number];
const PW = 2748, PH = 1152;
const pct = (v: number, t: number) => `${((v / t) * 100).toFixed(3)}%`;
const boxStyle = (b: Box) => ({ left: pct(b[0], PW), top: pct(b[1], PH), width: pct(b[2] - b[0], PW), height: pct(b[3] - b[1], PH) });
const TOWERS: Box = [1500, 320, 2110, 745];
const BLOOM: Box = [1200, 200, 2560, 810];
const RIM: Box = [1480, 340, 2100, 500];
const BRIDGE: Box = [500, 690, 1260, 790];
/* Window cells: 3 towers x 4 rows. Each flickers on its own clock; "off" cells dim a cluster of windows. */
const COLS = [1500, 1710, 1900, 2110];
const ROWS = [320, 427, 533, 639, 745];
const CELLS: { clip: string; i: number }[] = [];
for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
  const x0 = (COLS[c] - TOWERS[0]) / (TOWERS[2] - TOWERS[0]), x1 = (COLS[c + 1] - TOWERS[0]) / (TOWERS[2] - TOWERS[0]);
  const y0 = (ROWS[r] - TOWERS[1]) / (TOWERS[3] - TOWERS[1]), y1 = (ROWS[r + 1] - TOWERS[1]) / (TOWERS[3] - TOWERS[1]);
  CELLS.push({ clip: `inset(${(y0 * 100).toFixed(1)}% ${(100 - x1 * 100).toFixed(1)}% ${(100 - y1 * 100).toFixed(1)}% ${(x0 * 100).toFixed(1)}%)`, i: r * 3 + c });
}
/* Search-light beams: base on the SkyPark [x, y, from deg, to deg, seconds] */
const BEAMS: [number, number, number, number, number][] = [
  [1560, 380, -2, 17, 12], [1650, 372, 3, 27, 10], [1860, 405, 8, 33, 13], [2050, 425, 12, 40, 11],
];
/* Sparkle points on bright details (first 12 are the ones kept on mobile). */
const SPARKS: [number, number][] = [[1512, 383], [1652, 376], [2068, 455], [1511, 576], [1757, 682], [1790, 436], [1988, 442], [2038, 759], [1679, 716], [1523, 681], [1728, 712], [1991, 770], [1654, 777], [1585, 692], [1519, 746], [1897, 779], [1814, 751], [1749, 772], [1654, 422], [1870, 715], [1625, 501], [2097, 728], [1790, 708], [2113, 774], [1561, 397], [1974, 693], [1623, 645], [1697, 538], [2024, 710], [1874, 444]];
const rnd = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const GLINTS = Array.from({ length: 16 }, (_, i) => ({
  x: 1600 + rnd(i + 1) * 700, y: 840 + Math.pow(rnd(i + 40), 1.2) * 230, w: 30 + rnd(i + 80) * 40,
}));

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
    imgLights: art("v1794536270", "mbs-lights-box"),
    imgGlow: art("v1794535647", "mbs-glow"),
    imgBloom: art("v1794536273", "mbs-bloom"),
    imgRim: art("v1794536274", "mbs-rim"),
    imgDark: art("v1794536272", "mbs-dark"),
    imgBridge: art("v1794536275", "mbs-bridge"),
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
    { kind: "image", name: "imgLights", label: "Layer: window light glow, tower box crop (transparent)" },
    { kind: "image", name: "imgGlow", label: "Layer: SkyPark glow (transparent)" },
    { kind: "image", name: "imgBloom", label: "Layer: building bloom (soft glow, transparent)" },
    { kind: "image", name: "imgRim", label: "Layer: SkyPark rim light (transparent)" },
    { kind: "image", name: "imgDark", label: "Layer: window-off overlay, tower box crop (transparent)" },
    { kind: "image", name: "imgBridge", label: "Layer: bridge light pulse (transparent)" },
  ],
  Render: (p) => (
    <section className="itl itl-hero" data-itl-hero id="top">
      <div className="itl-hero-bg" aria-hidden="true">
        <div className="itl-stage" data-itl-stage>
          <div className="itl-kb">
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.15 }}><Layer src={p.imgSky} depth={0.15} alt={p.artAlt} /></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.25 }}><div className="itl-cl itl-cl1"><Layer src={p.imgCloud1} depth={0.25} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.3 }}><div className="itl-cl itl-cl4"><Layer src={p.imgCloud4} depth={0.3} /></div></div>
            <div className="itl-ly itl-ly-full" style={{ ["--d" as string]: 0.4 }}>
              {BEAMS.map((b, i) => (
                <div key={i} className="itl-bm" style={{ left: pct(b[0], PW), top: pct(b[1], PH) }}>
                  <i style={{ ["--r0" as string]: `${b[2]}deg`, ["--r1" as string]: `${b[3]}deg`, ["--t" as string]: `${b[4]}s`, ["--dl" as string]: `${-i * 3.1}s` }} />
                </div>
              ))}
            </div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.35 }}><div className="itl-cl itl-cl2"><Layer src={p.imgCloud2} depth={0.35} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.45 }}><div className="itl-cl itl-cl3"><Layer src={p.imgCloud3} depth={0.45} /></div></div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.15 }}>
              <i className="itl-dusk" />
              <i className="itl-night" />
            </div>
            <div className="itl-ly itl-ly-full" style={{ ["--d" as string]: 0.6 }}>
              <div className="itl-bloom itl-bloom-back" style={boxStyle(BLOOM)}><Layer src={p.imgBloom} depth={0.6} /></div>
            </div>
            <div className="itl-ly itl-ly-water" style={{ ["--d" as string]: 0.9 }}><Layer src={p.imgWater} depth={0.9} /></div>
            <div className="itl-ly itl-ly-full" style={{ ["--d" as string]: 0.9 }}>
              {GLINTS.map((g, i) => (
                <i key={i} className="itl-gn" style={{ left: pct(g.x, PW), top: pct(g.y, PH), width: pct(g.w, PW), ["--t" as string]: `${(6.5 + rnd(i + 7) * 3).toFixed(2)}s`, ["--dl" as string]: `${(-rnd(i + 21) * 9).toFixed(2)}s` }} />
              ))}
            </div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.7 }}><Layer src={p.imgSkyline} depth={0.7} /></div>
            <div className="itl-ly itl-ly-full" style={{ ["--d" as string]: 0.7 }}>
              <div className="itl-box" style={boxStyle(TOWERS)}>
                {CELLS.map((c) => (
                  <div key={"d" + c.i} className="itl-wd" style={{ clipPath: c.clip, ["--t" as string]: `${(5 + rnd(c.i + 3) * 5).toFixed(1)}s`, ["--dl" as string]: `${(-rnd(c.i + 11) * 9).toFixed(1)}s` }}>
                    <Layer src={p.imgDark} depth={0.7} />
                  </div>
                ))}
                {CELLS.map((c) => (
                  <div key={"l" + c.i} className="itl-wl" style={{ clipPath: c.clip, ["--t" as string]: `${(2.6 + rnd(c.i + 5) * 3).toFixed(1)}s`, ["--dl" as string]: `${(-rnd(c.i + 17) * 6).toFixed(1)}s` }}>
                    <Layer src={p.imgLights} depth={0.7} />
                  </div>
                ))}
              </div>
              <div className="itl-rim" style={boxStyle(RIM)}><Layer src={p.imgRim} depth={0.7} /></div>
              <div className="itl-bloom itl-bloom-over" style={boxStyle(BLOOM)}><Layer src={p.imgBloom} depth={0.7} /></div>
              {[0, 1, 2, 3].map((i) => {
                const x0 = i * 25;
                return (
                  <div key={i} className="itl-br" style={{ ...boxStyle(BRIDGE), clipPath: `inset(0 ${100 - x0 - 25}% 0 ${x0}%)`, ["--dl" as string]: `${-i * 0.9}s` }}>
                    <Layer src={p.imgBridge} depth={0.7} />
                  </div>
                );
              })}
            </div>
            <div className="itl-ly itl-ly-sky" style={{ ["--d" as string]: 0.7 }}><div className="itl-gl"><Layer src={p.imgGlow} depth={0.7} /></div></div>
            <div className="itl-ly itl-ly-full" style={{ ["--d" as string]: 0.7 }}>
              {SPARKS.map((q, i) => (
                <i key={i} className="itl-sp" style={{ left: pct(q[0], PW), top: pct(q[1], PH), ["--s" as string]: (0.026 + rnd(i + 3) * 0.028).toFixed(4), ["--t" as string]: `${(2.4 + rnd(i + 9) * 2.6).toFixed(2)}s`, ["--dl" as string]: `${(-rnd(i + 31) * 5).toFixed(2)}s` }} />
              ))}
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
