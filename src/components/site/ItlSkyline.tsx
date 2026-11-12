"use client";

import { useEffect, useRef } from "react";

/* The Marina Bay skyline is drawn in code (static markup below, windows/stars/lotus generated in the effect). */
const MARKUP = `<defs>
  <linearGradient id="dusk" gradientUnits="userSpaceOnUse" x1="0" y1="-200" x2="0" y2="760"><stop offset="0" stop-color="#0f2a52"/><stop offset=".55" stop-color="#1f4a82"/><stop offset=".85" stop-color="#3b80c8"/><stop offset="1" stop-color="#7fbdf2"/></linearGradient>
  <linearGradient id="nightg" gradientUnits="userSpaceOnUse" x1="0" y1="-200" x2="0" y2="760"><stop offset="0" stop-color="#030a17"/><stop offset=".6" stop-color="#071830"/><stop offset="1" stop-color="#123763"/></linearGradient>
  <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx="1000" cy="760" r="760"><stop offset="0" stop-color="#3098f3" stop-opacity=".55"/><stop offset="1" stop-color="#3098f3" stop-opacity="0"/></radialGradient>
  <linearGradient id="water" gradientUnits="userSpaceOnUse" x1="0" y1="760" x2="0" y2="920"><stop offset="0" stop-color="#1b4a7d"/><stop offset=".5" stop-color="#0b2444"/><stop offset="1" stop-color="#050f20"/></linearGradient>
  <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2d5f9a"/><stop offset=".18" stop-color="#14325d"/><stop offset="1" stop-color="#081a33"/></linearGradient>
  <linearGradient id="tgR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14325d"/><stop offset=".7" stop-color="#0a2142"/><stop offset="1" stop-color="#244f86"/></linearGradient>
  <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5a93"/><stop offset=".25" stop-color="#10294d"/><stop offset="1" stop-color="#071629"/></linearGradient>
  <pattern id="rows" width="10" height="12" patternUnits="userSpaceOnUse"><rect width="10" height="1" fill="#8cc0f0" opacity=".16"/></pattern>
  <clipPath id="cA"><path d="M900,760 Q918,550 940,352 L1027,352 L1011,760Z"/></clipPath>
  <clipPath id="cB"><path d="M1019,760 L1034,352 L1121,352 L1131,760Z"/></clipPath>
  <clipPath id="cC"><path d="M1262,760 Q1241,550 1215,352 L1129,352 L1141,760Z"/></clipPath>
  <filter id="blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="11"/></filter>
  <filter id="rip" filterUnits="userSpaceOnUse" x="-200" y="260" width="2000" height="520">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.07" numOctaves="1" seed="3" result="n"><animate attributeName="baseFrequency" dur="14s" values="0.004 0.07;0.006 0.1;0.004 0.07" repeatCount="indefinite"/></feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <linearGradient id="rfade" gradientUnits="userSpaceOnUse" x1="0" y1="760" x2="0" y2="540"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
  <mask id="rm" maskUnits="userSpaceOnUse" x="-1000" y="0" width="3600" height="900"><rect x="-1000" y="0" width="3600" height="900" fill="url(#rfade)"/></mask>
</defs>

<rect x="-3000" y="-3000" width="7600" height="3760" fill="url(#dusk)"/>
<g class="afterglow night" style="animation-direction:alternate-reverse" opacity=".9"><rect x="-3000" y="-3000" width="7600" height="3760" fill="url(#glow)"/></g>
<rect class="night" x="-3000" y="-3000" width="7600" height="3760" fill="url(#nightg)"/>
<g class="night" id="stars" fill="#dbeaff"></g>
<g id="clouds" filter="url(#blur)" fill="#a9cdf3">
  <g class="cloud" style="--t:190s;--dl:-60s"><ellipse cx="520" cy="330" rx="270" ry="20" opacity=".16"/></g>
  <g class="cloud" style="--t:240s;--dl:-120s"><ellipse cx="1260" cy="236" rx="320" ry="16" opacity=".13"/></g>
  <g class="cloud" style="--t:300s;--dl:-30s"><ellipse cx="880" cy="150" rx="250" ry="12" opacity=".1"/></g>
</g>
<rect x="-3000" y="760" width="7600" height="1400" fill="url(#water)"/>
<g id="glints" fill="#cfe8ff"></g>

<g id="parFar">
  <g id="farC"></g>
  <g class="refl" transform="translate(0,1520) scale(1,-1)" mask="url(#rm)" filter="url(#rip)" opacity=".34"><use href="#farC"/></g>
</g>

<g id="parMid">
  <g id="midC">
    <g id="superTrees"></g>
    <path d="M900,760 Q918,550 940,352 L1027,352 L1011,760Z" fill="url(#tg)"/>
    <path d="M1019,760 L1034,352 L1121,352 L1131,760Z" fill="url(#tg)"/>
    <path d="M1262,760 Q1241,550 1215,352 L1129,352 L1141,760Z" fill="url(#tgR)"/>
    <g fill="url(#rows)"><path d="M900,760 Q918,550 940,352 L1027,352 L1011,760Z"/><path d="M1019,760 L1034,352 L1121,352 L1131,760Z"/><path d="M1262,760 Q1241,550 1215,352 L1129,352 L1141,760Z"/></g>
    <g class="lights">
      <g clip-path="url(#cA)" id="winA"></g><g clip-path="url(#cB)" id="winB"></g><g clip-path="url(#cC)" id="winC"></g>
    </g>
    <!-- SkyPark -->
    <path d="M816,366 L905,343 L1330,328 Q1392,326 1397,336 Q1382,350 1340,356 Q1130,378 925,376 Q850,374 816,366Z" fill="url(#deck)"/>
    <path d="M1340,356 Q1130,378 925,376 Q850,374 816,366" fill="none" stroke="#ffd9a0" stroke-width="1.2" opacity=".5"/>
    <g id="deckTrees" fill="#134a55"></g>
    <path class="pool" d="M1296,328.6 L1372,326.4" stroke="#9fd6ff" stroke-width="1.8" stroke-linecap="round"/>
    <!-- podium -->
    <path d="M860,760 L860,744 Q960,726 1075,738 Q1180,728 1300,744 L1300,760Z" fill="#0a2040"/>
    <path d="M870,744 Q960,730 1075,741 Q1180,731 1290,746" fill="none" stroke="#ffd9a0" stroke-width="1" opacity=".45"/>
    <g id="lotus"></g>
    <rect x="-3000" y="756" width="7600" height="6" fill="#071a34"/>
    <g id="shoreLights" fill="#ffd48a"></g>
  </g>
  <g class="refl" transform="translate(0,1520) scale(1,-1)" mask="url(#rm)" filter="url(#rip)" opacity=".4"><use href="#midC"/></g>
</g>`;

export default function ItlSkyline() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const sky = ref.current;
    if (!sky) return;
    const NS = "http://www.w3.org/2000/svg";
    const q = (id: string) => sky.querySelector<SVGGElement>("#" + id)!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const el = (n: string, a: Record<string, string | number>, parent?: Element) => {
      const e = document.createElementNS(NS, n);
      for (const k in a) e.setAttribute(k, String(a[k]));
      if (parent) parent.appendChild(e);
      return e as SVGElement;
    };
    ["stars", "glints", "farC", "winA", "winB", "winC", "deckTrees", "shoreLights", "superTrees", "lotus"].forEach((id) => { q(id).innerHTML = ""; });

    function winGroups(parent: Element, x0: number, x1: number, y0: number, y1: number, step: number, rowH: number, chance: number, sz: number) {
      const buckets: string[][] = [[], [], [], []];
      const steady: string[] = [];
      for (let y = y0; y < y1; y += rowH) {
        for (let x = x0; x < x1; x += step) {
          if (rnd() > chance) continue;
          const r = rnd();
          const seg = "M" + x.toFixed(1) + " " + y.toFixed(1) + "h" + sz + "v" + (sz * 1.25).toFixed(1) + "h-" + sz + "z";
          if (r < 0.3) steady.push(seg); else buckets[Math.floor(((r - 0.3) / 0.7) * 4) % 4].push(seg);
        }
      }
      const cols = ["#ffd48a", "#ffd48a", "#bfe2ff", "#ffe6b3"];
      const g = el("g", {}, parent);
      el("path", { d: steady.join(""), fill: "#ffd48a", opacity: ".8" }, g);
      buckets.forEach((b, i) => {
        const p = el("path", { d: b.join(""), fill: cols[i], class: "tw" }, g);
        p.style.setProperty("--t", (5 + i * 2.3 + rnd() * 2).toFixed(1) + "s");
        p.style.setProperty("--dl", "-" + (rnd() * 9).toFixed(1) + "s");
      });
    }

    const st = q("stars");
    for (let i = 0; i < 70; i++) {
      const c = el("circle", { cx: (rnd() * 3200 - 800).toFixed(0), cy: (rnd() * 520 - 80).toFixed(0), r: (rnd() * 1.1 + 0.4).toFixed(1), opacity: (rnd() * 0.6 + 0.2).toFixed(2) }, st);
      if (i % 3 === 0) { c.setAttribute("class", "tw"); c.style.setProperty("--t", (4 + rnd() * 5).toFixed(1) + "s"); c.style.setProperty("--dl", "-" + (rnd() * 8).toFixed(1) + "s"); }
    }
    const gl = q("glints");
    for (let i = 0; i < 46; i++) {
      const gx = rnd() * 2600 - 500, gy = 772 + rnd() * 120, gw = 14 + rnd() * 50;
      const r = el("rect", { x: gx.toFixed(0), y: gy.toFixed(0), width: gw.toFixed(0), height: "1.3", rx: ".6", class: "glint" }, gl);
      r.style.setProperty("--t", (5 + rnd() * 6).toFixed(1) + "s"); r.style.setProperty("--dl", "-" + (rnd() * 10).toFixed(1) + "s");
    }
    const far = q("farC");
    const cbd: [number, number, number, string][] = [[1150,38,230,"f"],[1192,30,300,"p"],[1226,44,190,"s"],[1274,34,260,"r"],[1312,40,210,"f"],[1356,28,330,"p"],[1388,46,240,"f"],[1438,34,180,"s"],[1476,40,270,"r"],[1520,36,210,"f"],[1560,42,160,"f"],[1604,40,230,"f"],[1648,38,190,"s"],
      [360,34,90,"f"],[398,40,120,"f"],[442,30,100,"s"],[476,44,140,"f"],[524,36,110,"f"],[566,32,84,"s"],[-40,40,120,"f"],[4,36,90,"f"],[44,50,150,"f"],[96,34,100,"f"],[134,38,130,"s"],[176,44,110,"f"],[224,34,140,"f"],[262,40,100,"f"],[306,34,120,"f"]];
    const gb = el("g", { fill: "#0f2a4e" }, far);
    cbd.forEach((b) => {
      const [x, w, h, t] = b; const y = 760 - h; let dd;
      if (t === "f") dd = "M" + x + " 760V" + y + "h" + w + "V760z";
      else if (t === "p") dd = "M" + x + " 760V" + (y + 22) + "L" + (x + w / 2) + " " + (y - 14) + "L" + (x + w) + " " + (y + 22) + "V760z";
      else if (t === "s") dd = "M" + x + " 760V" + (y + 18) + "L" + (x + w) + " " + y + "V760z";
      else dd = "M" + x + " 760V" + (y + 10) + "Q" + (x + w / 2) + " " + (y - 14) + " " + (x + w) + " " + (y + 10) + "V760z";
      el("path", { d: dd }, gb);
      if (t === "p") el("rect", { x: x + w / 2 - 0.8, y: y - 34, width: 1.6, height: 22 }, gb);
    });
    const fw = el("g", { class: "lights" }, far);
    cbd.forEach((b) => winGroups(fw, b[0] + 5, b[0] + b[1] - 8, 760 - b[2] + 26, 752, 8, 13, 0.42, 2.6));
    winGroups(q("winA"), 905, 1022, 362, 752, 8, 11, 0.5, 3.4);
    winGroups(q("winB"), 1030, 1122, 362, 752, 8, 11, 0.5, 3.4);
    winGroups(q("winC"), 1135, 1252, 362, 752, 8, 11, 0.5, 3.4);
    const dt = q("deckTrees");
    for (let i = 0; i < 34; i++) { const tx = 1050 + i * 9.6 + rnd() * 3, ty = 341 - (tx - 905) * (14 / 425) - 2; el("circle", { cx: tx.toFixed(1), cy: ty.toFixed(1), r: (3.4 + rnd() * 3.4).toFixed(1) }, dt); }
    for (let i = 0; i < 8; i++) el("circle", { cx: (934 + i * 14).toFixed(0), cy: "338", r: (3 + rnd() * 2).toFixed(1) }, dt);
    const sl = q("shoreLights");
    for (let i = 0; i < 90; i++) el("rect", { x: (-200 + i * 22 + rnd() * 8).toFixed(0), y: "757.4", width: "2.4", height: "2", opacity: (0.35 + rnd() * 0.5).toFixed(2) }, sl);
    const stg = q("superTrees");
    [[640,160],[708,118],[774,138]].forEach((t) => {
      const cx = t[0], top = 760 - t[1];
      el("path", { d: "M" + (cx - 5) + " 760Q" + (cx - 2) + " " + (top + 60) + " " + (cx - 1.6) + " " + top + "L" + (cx + 1.6) + " " + top + "Q" + (cx + 2) + " " + (top + 60) + " " + (cx + 5) + " 760z", fill: "#0b2142" }, stg);
      el("path", { d: "M" + (cx - 34) + " " + (top + 14) + "Q" + cx + " " + (top - 22) + " " + (cx + 34) + " " + (top + 14) + "Q" + cx + " " + (top + 2) + " " + (cx - 34) + " " + (top + 14) + "z", fill: "#10305a" }, stg);
      [-26, -13, 0, 13, 26].forEach((o, k) => {
        const c = el("circle", { cx: cx + o, cy: top + (k % 2 ? -2 : 3) + Math.abs(o) * 0.18 - 6, r: "1.8", fill: "#6cc3ff", class: "tw" }, stg);
        c.style.setProperty("--t", (4 + rnd() * 4).toFixed(1) + "s"); c.style.setProperty("--dl", "-" + (rnd() * 6).toFixed(1) + "s");
      });
    });
    const lo = q("lotus"), lx = 1362;
    el("path", { d: "M" + (lx - 46) + " 760Q" + lx + " 726 " + (lx + 46) + " 760z", fill: "#16355f" }, lo);
    for (let i = -4; i <= 4; i++) {
      const a = i * 0.26, tipx = lx + Math.sin(a) * 66, tipy = 752 - Math.cos(a) * (46 + Math.abs(i) * -2 + 8), bx = lx + i * 7, nx = Math.cos(a) * 5;
      el("path", { d: "M" + (bx - 4) + " 754Q" + (lx + Math.sin(a) * 34 - nx) + " " + (tipy + 26) + " " + tipx + " " + tipy + "Q" + (lx + Math.sin(a) * 34 + nx + 3) + " " + (tipy + 30) + " " + (bx + 4) + " 754z", fill: "#cfe0f5", opacity: ".72" }, lo);
      el("path", { d: "M" + bx + " 754Q" + (lx + Math.sin(a) * 34) + " " + (tipy + 28) + " " + tipx + " " + tipy, fill: "none", stroke: "#ffe6b3", opacity: ".55", "stroke-width": ".8" }, lo);
    }

    const hero = sky.closest(".itl-hero");
    if (reduce) {
      hero?.classList.add("itl-reduced");
      sky.querySelectorAll("animate").forEach((a) => a.parentNode?.removeChild(a));
      sky.querySelectorAll(".afterglow").forEach((g) => g.setAttribute("opacity", ".12"));
    }

    const fit = () => {
      const small = innerWidth <= 600;
      sky.setAttribute("viewBox", small ? "830 330 600 500" : "0 0 1600 900");
      sky.setAttribute("preserveAspectRatio", small ? "xMidYMax meet" : "xMidYMax slice");
    };
    fit();
    addEventListener("resize", fit);

    // parallax: pointer + scroll
    const pf = q("parFar"), pm = q("parMid");
    let mx = 0, my = 0, tx2 = 0, ty2 = 0, raf = 0;
    const par = () => {
      if (reduce) return;
      const s = scrollY < innerHeight * 1.2 ? scrollY : 0;
      pf.style.transform = "translate(" + (tx2 * -6).toFixed(1) + "px," + (ty2 * -3 + s * 0.04).toFixed(1) + "px)";
      pm.style.transform = "translate(" + (tx2 * -14).toFixed(1) + "px," + (ty2 * -6 + s * 0.09).toFixed(1) + "px)";
    };
    const tick = () => {
      raf = 0; tx2 += (mx - tx2) * 0.08; ty2 += (my - ty2) * 0.08; par();
      if (Math.abs(mx - tx2) > 0.002 || Math.abs(my - ty2) > 0.002) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; if (!raf) raf = requestAnimationFrame(tick); };
    if (!reduce) {
      addEventListener("scroll", par, { passive: true });
      if (matchMedia("(hover:hover)").matches) addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      removeEventListener("resize", fit);
      removeEventListener("scroll", par);
      removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="itl-skyline"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: MARKUP }}
    />
  );
}
