"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactField } from "@/components/site/ContactForm";

type Props = {
  fields: ContactField[];
  submitLabel: string;
  formName: string;
  receiverToken: string;
  heading: string;
  hint: string;
  finePrint: string;
  selectPlaceholder: string;
  messagePlaceholder: string;
  requiredError: string;
  emailError: string;
  sendingLabel: string;
  genericError: string;
  successTitle: string;
  successText: string;
  successMode: "inline" | "redirect";
  successPath: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function ItlContactForm(p: Props) {
  const router = useRouter();
  const [bad, setBad] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    for (const f of p.fields) {
      const v = String(entries[f.name] ?? "").trim();
      if (f.required && !v) errs[f.name] = p.requiredError;
      else if (f.type === "email" && v && !EMAIL_RE.test(v)) errs[f.name] = p.emailError;
    }
    setBad(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entries, _form: p.formName, _rt: p.receiverToken }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || p.genericError);
      }
      if (p.successMode === "redirect" && p.successPath) {
        router.push(p.successPath);
        return;
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : p.genericError);
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="itl-ok itl-show" role="status" aria-live="polite">
        <div className="itl-tick">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
        </div>
        <h3>{p.successTitle}</h3>
        <p>{p.successText}</p>
      </div>
    );
  }

  // Lay fields out in rows: full-width and textarea fields take a row, others pair up.
  const rows: ContactField[][] = [];
  let pending: ContactField[] = [];
  for (const f of p.fields) {
    if (f.fullWidth || f.type === "textarea") {
      if (pending.length) { rows.push(pending); pending = []; }
      rows.push([f]);
    } else {
      pending.push(f);
      if (pending.length === 2) { rows.push(pending); pending = []; }
    }
  }
  if (pending.length) rows.push(pending);

  const renderField = (f: ContactField) => {
    const id = `itl-${f.name}`;
    const opts = f.options.split(/\n|,/).map((o) => o.trim()).filter(Boolean);
    return (
      <div key={f.name} className={`itl-f${bad[f.name] ? " itl-bad" : ""}`}>
        <label htmlFor={id}>{f.label}</label>
        {f.type === "textarea" ? (
          <textarea id={id} name={f.name} placeholder={p.messagePlaceholder} />
        ) : f.type === "select" ? (
          <select id={id} name={f.name} defaultValue={f.required ? "" : opts[0] ?? ""}>
            {f.required && <option value="">{p.selectPlaceholder}</option>}
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : (
          <input
            id={id}
            name={f.name}
            type={f.type}
            autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : f.name === "name" ? "name" : undefined}
            inputMode={f.type === "tel" ? "tel" : undefined}
          />
        )}
        <span className="itl-err">{bad[f.name]}</span>
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <h3>{p.heading}</h3>
      <p className="itl-hint">{p.hint}</p>
      {rows.map((r, i) => (
        <div key={i} className={`itl-row${r.length === 2 ? " itl-two" : ""}`}>{r.map(renderField)}</div>
      ))}
      <div className="itl-hp" aria-hidden="true">
        <label htmlFor="itl-website">Website</label>
        <input id="itl-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {error && <p className="itl-form-error">{error}</p>}
      <button className="itl-btn itl-btn-primary" type="submit" disabled={busy || p.fields.length === 0}>
        {busy ? p.sendingLabel : p.submitLabel}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
      <p className="itl-fine">{p.finePrint}</p>
    </form>
  );
}
