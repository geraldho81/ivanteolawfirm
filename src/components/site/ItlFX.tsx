"use client";

import { useEffect } from "react";

/**
 * Behaviour for the itl-* blocks: sticky header state, mobile drawer, scroll
 * reveals, counters, FAQ accordion and image parallax. Blocks render plain
 * markup tagged with data-itl-* / itl-* hooks; nothing here carries copy.
 * Plain DOM + IntersectionObserver, no animation library.
 */
export function ItlFX() {
  useEffect(() => {
    const d = document;
    const root = d.documentElement;
    root.classList.add("js");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const on = <T extends EventTarget>(t: T, ev: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn, opts);
      cleanups.push(() => t.removeEventListener(ev, fn, opts));
    };

    /* Header + image parallax */
    const hdr = d.querySelector<HTMLElement>("[data-itl-hdr]");
    const pars = Array.from(d.querySelectorAll<HTMLElement>("[data-itl-par]"));
    const onScroll = () => {
      hdr?.classList.toggle("itl-solid", scrollY > 40);
      if (reduce) return;
      pars.forEach((im) => {
        const parent = im.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        im.style.transform = "translate3d(0," + (-6 - p * 34) + "px,0)";
      });
    };
    on(window, "scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile drawer */
    const drawer = d.querySelector<HTMLElement>("[data-itl-drawer]");
    const burger = d.querySelector<HTMLElement>("[data-itl-open]");
    const setMenu = (o: boolean) => {
      if (!drawer || !burger) return;
      drawer.classList.toggle("itl-open", o);
      drawer.setAttribute("aria-hidden", String(!o));
      burger.setAttribute("aria-expanded", String(o));
      d.body.style.overflow = o ? "hidden" : "";
    };
    burger && on(burger, "click", () => setMenu(true));
    const close = d.querySelector("[data-itl-close]");
    close && on(close, "click", () => setMenu(false));
    drawer?.querySelectorAll("a").forEach((a) => on(a, "click", () => setMenu(false)));
    on(window, "keydown", ((e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); }) as EventListener);
    on(window, "resize", () => { if (innerWidth >= 960) setMenu(false); });
    cleanups.push(() => { d.body.style.overflow = ""; });

    /* Reveals */
    const rv = Array.from(d.querySelectorAll<HTMLElement>(".itl-rv"));
    if (reduce || !("IntersectionObserver" in window)) {
      rv.forEach((n) => n.classList.add("itl-in"));
    } else {
      const timers: number[] = [];
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.classList.add("itl-in");
            io.unobserve(t);
            timers.push(window.setTimeout(() => t.classList.add("itl-done"), 1800));
          }
        }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      rv.forEach((n) => io.observe(n));
      timers.push(window.setTimeout(() => d.querySelectorAll(".itl-hero .itl-rv").forEach((n) => n.classList.add("itl-in")), 80));
      cleanups.push(() => { io.disconnect(); timers.forEach(clearTimeout); });
    }

    /* Counters */
    const count = (el: HTMLElement) => {
      const to = Number(el.dataset.itlCount);
      if (reduce) { el.textContent = String(to); return; }
      let t0: number | null = null;
      const dur = 1800;
      const f = (t: number) => {
        if (t0 === null) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(f);
      };
      el.textContent = "0";
      requestAnimationFrame(f);
    };
    if ("IntersectionObserver" in window) {
      const co = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { count(e.target as HTMLElement); co.unobserve(e.target); } }),
        { threshold: 0.6 }
      );
      d.querySelectorAll<HTMLElement>("[data-itl-count]").forEach((c) => co.observe(c));
      cleanups.push(() => co.disconnect());
    }

    /* FAQ accordion (one open at a time) */
    d.querySelectorAll<HTMLElement>(".itl-fq").forEach((q) => {
      const b = q.querySelector("button");
      b && on(b, "click", () => {
        const open = !q.classList.contains("itl-open");
        d.querySelectorAll(".itl-fq.itl-open").forEach((x) => {
          x.classList.remove("itl-open");
          x.querySelector("button")?.setAttribute("aria-expanded", "false");
        });
        if (open) { q.classList.add("itl-open"); b.setAttribute("aria-expanded", "true"); }
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
