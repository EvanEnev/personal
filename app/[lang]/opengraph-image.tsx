import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { content, getContent } from "./content";

export const alt = "Ivan Bubenev — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return Object.keys(content).map((lang) => ({ lang }));
}

const font = (file: string) => readFile(join(process.cwd(), "node_modules/@fontsource/inter-tight/files", file));
const fonts = await Promise.all(
  ["latin", "cyrillic"].flatMap((subset) =>
    ([500, 800] as const).map(async (weight) => ({
      name: `Inter Tight ${subset}`,
      data: await font(`inter-tight-${subset}-${weight}-normal.woff`),
      weight,
    })),
  ),
);

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const t = getContent((await params).lang);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f2f2ef", color: "#111", fontFamily: "Inter Tight latin, Inter Tight cyrillic" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", gap: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: "#555" }}>{t.kicker}</div>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em" }}>{t.name}</div>
          <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#c2361a" }}>{t.h1b}</div>
        </div>
        <div style={{ display: "flex", background: "#c2361a", color: "#fff", padding: "22px 72px", fontSize: 34, fontWeight: 800, borderTop: "2px solid #111" }}>
          Next.js · TypeScript · React · PostgreSQL · Docker · bubenev.su
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
