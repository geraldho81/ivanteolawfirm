import type { CSSProperties, ReactNode } from "react";
import type { FieldSpec } from "@/blocks/types";

/** Structure-only helpers shared by the itl-* blocks. No copy lives here. */

export const rvStyle = (d?: string): CSSProperties | undefined => (d ? ({ "--d": d } as CSSProperties) : undefined);

export const ICON_OPTIONS = [
  { value: "rings", label: "Rings" },
  { value: "person", label: "Person" },
  { value: "wallet", label: "Wallet" },
  { value: "home", label: "Home" },
  { value: "shield", label: "Shield" },
  { value: "shieldcheck", label: "Shield with tick" },
  { value: "doc", label: "Document" },
  { value: "heart", label: "Heart" },
  { value: "clock", label: "Clock" },
  { value: "trophy", label: "Trophy" },
  { value: "chat", label: "Chat" },
  { value: "phone", label: "Phone" },
  { value: "mail", label: "Mail" },
];

export const iconField = (name = "icon", label = "Icon"): FieldSpec => ({
  kind: "select",
  name,
  label,
  options: ICON_OPTIONS,
});

const PATHS: Record<string, ReactNode> = {
  rings: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" />,
  shieldcheck: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export function Icon({ name, sw = 1.5 }: { name: string; sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name] ?? PATHS.shield}
    </svg>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Logo({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="itl-logo-img" src={src} alt={alt ?? ""} />;
  }
  // One source for the Marina Bay roofline mark: src/app/icon.svg (also the favicon).
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="itl-logo-img" src="/icon.svg" alt="" width={32} height={32} />;
}

const LAUREL = [
  [21.0, 7.3, -10], [14.5, 9.9, -34], [9.6, 15.0, -58], [7.2, 21.6, -82], [7.7, 28.7, -106], [11.0, 34.9, -130], [16.5, 39.3, -154],
  [27.0, 7.3, 10], [33.5, 9.9, 34], [38.4, 15.0, 58], [40.8, 21.6, 82], [40.3, 28.7, 106], [37.0, 34.9, 130], [31.5, 39.3, 154],
];

export function Laurel() {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
      <g opacity=".92">
        {LAUREL.map(([x, y, r], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2.1" ry="4.6" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
      <path d="M24 15l2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6-4.5-4.1 6-.7z" />
    </svg>
  );
}

export const linkListFields: FieldSpec[] = [
  { kind: "text", name: "label", label: "Label" },
  { kind: "text", name: "href", label: "Link (e.g. #contact or https://...)" },
];
