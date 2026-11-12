/**
 * Seeds the Ivan Teo Law Firm site content: the home page (itl-* blocks built
 * from each block's defaults), the consultation form, site settings and the
 * home page SEO fields. Removes the framework's sample about page and post.
 *
 *   npx tsx scripts/seed-itl.ts
 *
 * Re-running resets the home page blocks to the defaults in src/blocks/itl-* .
 * Edit content in /admin afterwards; do not re-run once the client has edited.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

const FORM_ID = "itl-consultation";

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const { db } = await import("../src/db");
  const { pages, posts, settings, menus } = await import("../src/db/schema");
  const { eq } = await import("drizzle-orm");
  const { registry, validateBlocks } = await import("../src/blocks/registry");
  const { newBlockId } = await import("../src/blocks/types");

  const upsertSetting = async (key: string, value: unknown) => {
    await db.insert(settings).values({ key, value }).onConflictDoUpdate({ target: settings.key, set: { value } });
  };

  /* Consultation form (reusable form in the Contacts admin) */
  const matterOptions = [
    "Divorce (uncontested or simplified)",
    "Divorce (contested)",
    "Child custody, care and control, access",
    "Maintenance",
    "Division of matrimonial assets",
    "Personal protection order",
    "Prenuptial agreement",
    "Adoption or guardianship",
    "Other or not sure",
  ].join("\n");
  const form = {
    id: FORM_ID,
    name: "Consultation request",
    fields: [
      { name: "name", label: "Full name", type: "text", required: true, options: "", fullWidth: false },
      { name: "phone", label: "Phone", type: "tel", required: true, options: "", fullWidth: false },
      { name: "email", label: "Email", type: "email", required: true, options: "", fullWidth: true },
      { name: "matter", label: "Type of matter", type: "select", required: true, options: matterOptions, fullWidth: false },
      { name: "time", label: "Preferred contact time", type: "select", required: false, options: "As soon as possible\nMorning\nAfternoon\nEvening", fullWidth: false },
      { name: "message", label: "Brief message (optional)", type: "textarea", required: false, options: "", fullWidth: true },
    ],
    submitLabel: "Request my consultation",
    receiverEmail: "hello@ivanteolaw.sg",
    formName: "Consultation request",
    successMode: "inline",
    successMessage: "Thank you, we have your request.",
    successPath: "/thank-you",
  };
  await upsertSetting("contactForms", [form]);

  /* Site settings */
  await upsertSetting("siteName", "Ivan Teo Law Firm");
  await upsertSetting("tagline", "Family law and divorce advice in Singapore. Fees from S$500.");
  await upsertSetting("logoUrl", "");
  await upsertSetting("footerText", "");
  await upsertSetting("social", []);
  await upsertSetting("defaultOgImage", "https://res.cloudinary.com/dsg6ukzzt/image/upload/v1794471086/ivanteolaw/approach.jpg");

  /* Menus are unused: header and footer are itl-header / itl-footer blocks */
  for (const name of ["header", "footer"]) {
    await db.insert(menus).values({ name, items: [] }).onConflictDoUpdate({ target: menus.name, set: { items: [] } });
  }

  /* Home page */
  const order = ["header", "hero", "stats", "practice", "approach", "process", "family", "why", "quotes", "faq", "contact", "footer"];
  const blocks = order.map((n) => {
    const def = registry[`itl-${n}`];
    if (!def) throw new Error(`Missing block itl-${n}`);
    const props = { ...(def.defaults as Record<string, unknown>) };
    if (n === "contact") props.formId = FORM_ID;
    return { id: newBlockId(), type: def.type, props };
  });
  validateBlocks(blocks);

  const values = {
    title: "Ivan Teo Law Firm",
    status: "published" as const,
    blocks,
    metaTitle: "Ivan Teo Law Firm",
    metaDescription: "Family law and divorce lawyers in Singapore. Fees from S$500. A consultation arranged within 30 minutes.",
    ogImage: "https://res.cloudinary.com/dsg6ukzzt/image/upload/v1794471086/ivanteolaw/approach.jpg",
    updatedAt: new Date(),
  };
  const [home] = await db.select({ id: pages.id }).from(pages).where(eq(pages.slug, "home")).limit(1);
  if (home) await db.update(pages).set(values).where(eq(pages.slug, "home"));
  else await db.insert(pages).values({ slug: "home", publishedAt: new Date(), ...values });

  /* Remove framework samples */
  await db.delete(pages).where(eq(pages.slug, "about"));
  await db.delete(posts).where(eq(posts.slug, "hello-world"));

  console.log("Seeded Ivan Teo Law Firm home page, consultation form and settings.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
