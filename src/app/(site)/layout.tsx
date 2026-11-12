import { getSettings } from "@/lib/queries";
import { GoogleTagManager } from "@/components/site/GoogleTagManager";
import { ItlFX } from "@/components/site/ItlFX";

// Header and footer are blocks on the page (itl-header, itl-footer), so every
// word of site chrome is editable in the CMS.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let gtmId = "";
  try {
    gtmId = (await getSettings()).gtmId;
  } catch {
    // Database not reachable yet - render the shell without tags.
  }

  return (
    <>
      <GoogleTagManager gtmId={gtmId} />
      <ItlFX />
      <main className="site-main">{children}</main>
    </>
  );
}
