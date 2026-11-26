import type { MetadataRoute } from "next";
import { content, SITE } from "./[lang]/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(Object.keys(content).map((l) => [l, `${SITE}/${l}`]));
  return [
    ...Object.keys(content).map((lang) => ({ url: `${SITE}/${lang}`, alternates: { languages }, priority: 1 })),
    ...Object.keys(content).map((lang) => ({ url: `${SITE}/Ivan-Bubenev-CV-${lang}.pdf`, priority: 0.8 })),
    { url: `${SITE}/llms.txt`, priority: 0.5 },
  ];
}
