import { store, useStore } from "@/lib/portfolio-store";

/** Injects admin-controlled section spacing + custom CSS into the page. */
export function SiteStyle() {
  const s = useStore(store.getSettings);
  const rules = Object.entries(s.spacing || {})
    .map(([id, v]) =>
      v ? `#${id}{padding-top:${v.t}px !important;padding-bottom:${v.b}px !important}` : "",
    )
    .join("");
  return <style dangerouslySetInnerHTML={{ __html: rules + (s.css || "") }} />;
}
