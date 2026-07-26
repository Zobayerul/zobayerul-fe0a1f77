import { useEffect } from "react";
import { store, useStore } from "@/lib/portfolio-store";

function setMeta(attr: "name" | "property", key: string, value: string) {
  if (!value) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Injects admin-controlled section spacing, custom CSS and SEO tags. */
export function SiteStyle() {
  const s = useStore(store.getSettings);
  const seo = s.seo;

  useEffect(() => {
    if (!seo || typeof document === "undefined") return;
    if (seo.title) document.title = seo.title;
    setMeta("name", "description", seo.description);
    setMeta("name", "keywords", seo.keywords);
    setMeta("property", "og:title", seo.title);
    setMeta("property", "og:description", seo.description);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", seo.title);
    setMeta("name", "twitter:description", seo.description);
    setMeta("name", "twitter:image", seo.ogImage);
  }, [seo?.title, seo?.description, seo?.keywords, seo?.ogImage]);

  const rules = Object.entries(s.spacing || {})
    .map(([id, v]) =>
      v ? `#${id}{padding-top:${v.t}px !important;padding-bottom:${v.b}px !important}` : "",
    )
    .join("");
  return <style dangerouslySetInnerHTML={{ __html: rules + (s.css || "") }} />;
}
