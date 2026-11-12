import { z } from "zod";
import { defineBlock } from "@/blocks/types";
import { safeHref } from "@/lib/content";
import { Icon, iconField, rvStyle } from "@/blocks/itl-shared";
import ItlContactForm from "@/components/site/ItlContactForm";
import type { ContactForm as ContactFormRow } from "@/db/schema";

const schema = z.object({
  anchor: z.string(),
  kicker: z.string(),
  heading: z.string(),
  lede: z.string(),
  info: z.array(z.object({ icon: z.string(), label: z.string(), href: z.string() })),
  formId: z.string(),
  formHeading: z.string(),
  formHint: z.string(),
  finePrint: z.string(),
  selectPlaceholder: z.string(),
  messagePlaceholder: z.string(),
  requiredError: z.string(),
  emailError: z.string(),
  sendingLabel: z.string(),
  genericError: z.string(),
  successTitle: z.string(),
  successText: z.string(),
});
type Props = z.infer<typeof schema>;

export default defineBlock<Props>({
  type: "itl-contact",
  label: "ITL contact",
  description: "Navy contact section: contact details plus the consultation form (pick a saved form under Contacts; submissions land in the admin inbox).",
  icon: "✉",
  schema,
  defaults: {
    anchor: "contact",
    kicker: "Book a consultation",
    heading: "Take the first step today",
    lede: "Tell us a little about your situation. Our team arranges your consultation, and fees start from S$500.",
    info: [
      { icon: "phone", label: "+65 6000 0000", href: "tel:+6560000000" },
      { icon: "mail", label: "hello@ivanteolaw.sg", href: "mailto:hello@ivanteolaw.sg" },
      { icon: "shieldcheck", label: "Private and confidential", href: "" },
    ],
    formId: "",
    formHeading: "Request a consultation",
    formHint: "Takes about a minute. We reply within 30 minutes.",
    finePrint: "Your details stay private and are used only to contact you.",
    selectPlaceholder: "Select one",
    messagePlaceholder: "Share as much or as little as you like.",
    requiredError: "Please complete this field.",
    emailError: "Please enter a valid email.",
    sendingLabel: "Sending...",
    genericError: "Something went wrong. Please try again.",
    successTitle: "Thank you, we have your request.",
    successText: "Our team will contact you at your preferred time.",
  },
  fields: [
    { kind: "text", name: "anchor", label: "Section anchor id (used by #links)" },
    { kind: "text", name: "kicker", label: "Kicker" },
    { kind: "text", name: "heading", label: "Heading" },
    { kind: "textarea", name: "lede", label: "Intro text", rows: 3 },
    {
      kind: "list",
      name: "info",
      label: "Contact details",
      itemLabel: "Detail",
      fields: [iconField(), { kind: "text", name: "label", label: "Text" }, { kind: "text", name: "href", label: "Link (tel:, mailto:, or empty for plain text)" }],
    },
    { kind: "contactForm", name: "formId", label: "Form (fields, receiver email and submit label live under Contacts)", placeholder: "Choose a saved form..." },
    { kind: "text", name: "formHeading", label: "Form heading" },
    { kind: "text", name: "formHint", label: "Form hint" },
    { kind: "text", name: "finePrint", label: "Fine print under the button" },
    { kind: "text", name: "selectPlaceholder", label: "Placeholder option for required dropdowns" },
    { kind: "text", name: "messagePlaceholder", label: "Message box placeholder" },
    { kind: "text", name: "requiredError", label: "Error: required field empty" },
    { kind: "text", name: "emailError", label: "Error: invalid email" },
    { kind: "text", name: "sendingLabel", label: "Button label while sending" },
    { kind: "text", name: "genericError", label: "Error: submission failed" },
    { kind: "text", name: "successTitle", label: "Success title" },
    { kind: "textarea", name: "successText", label: "Success text", rows: 3 },
  ],
  getData: async (props) => {
    if (!props.formId) return { token: "", form: null };
    const { getContactFormById } = await import("@/lib/queries");
    const form = await getContactFormById(props.formId);
    if (!form || !form.receiverEmail) return { token: "", form };
    const { signReceiver } = await import("@/lib/contact-token");
    return { token: signReceiver(form.receiverEmail), form };
  },
  Render: (p) => {
    const data = p.ctx?.data as { token?: string; form?: ContactFormRow | null } | undefined;
    const form = data?.form ?? null;
    return (
      <section className="itl itl-section itl-contact" id={p.anchor || undefined}>
        <div className="itl-wrap itl-cgrid">
          <div>
            <p className="itl-kicker itl-rv">{p.kicker}</p>
            <h2 className="itl-rv" style={rvStyle(".08s")}>{p.heading}</h2>
            <p className="itl-lede itl-rv" style={{ ...rvStyle(".16s"), marginTop: 20 }}>{p.lede}</p>
            <div className="itl-cinfo itl-rv" style={rvStyle(".24s")}>
              {p.info.map((it, i) => (
                <div key={i}>
                  <Icon name={it.icon} sw={1.8} />
                  {it.href ? <a href={safeHref(it.href)}>{it.label}</a> : <span>{it.label}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="itl-formcard itl-rv" style={rvStyle(".1s")}>
            <ItlContactForm
              fields={form?.fields ?? []}
              submitLabel={form?.submitLabel ?? ""}
              formName={form?.formName ?? ""}
              receiverToken={data?.token ?? ""}
              heading={p.formHeading}
              hint={p.formHint}
              finePrint={p.finePrint}
              selectPlaceholder={p.selectPlaceholder}
              messagePlaceholder={p.messagePlaceholder}
              requiredError={p.requiredError}
              emailError={p.emailError}
              sendingLabel={p.sendingLabel}
              genericError={p.genericError}
              successTitle={p.successTitle}
              successText={p.successText}
              successMode={form?.successMode ?? "inline"}
              successPath={form?.successPath ?? ""}
            />
          </div>
        </div>
      </section>
    );
  },
});
