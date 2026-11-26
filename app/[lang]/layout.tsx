import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { ViewTransition } from "react";
import { content, getContent, SITE } from "./content";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin", "cyrillic"], weight: ["500", "600", "800"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin", "cyrillic"] });

const themeScript = `try{document.documentElement.classList.toggle("dark",localStorage.theme==="dark"||(!("theme" in localStorage)&&matchMedia("(prefers-color-scheme: dark)").matches))}catch{}`;

export function generateStaticParams() {
  return Object.keys(content).map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2ef" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const t = getContent(lang);
  const title = `${t.name} — ${t.h1a.replace(".", "")}`;
  const [firstName, lastName] = t.name.split(" ");

  return {
    metadataBase: new URL(SITE),
    title,
    description: t.lead,
    authors: [{ name: t.name, url: SITE }],
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", ru: "/ru", "x-default": "/en" },
      types: { "text/markdown": "/llms.txt" },
    },
    openGraph: {
      type: "profile",
      firstName,
      lastName,
      username: "EvanEnev",
      title,
      description: t.lead,
      url: `/${lang}`,
      siteName: t.name,
      locale: lang === "ru" ? "ru_RU" : "en_US",
      alternateLocale: lang === "ru" ? "en_US" : "ru_RU",
    },
    twitter: { card: "summary_large_image", title, description: t.lead },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  getContent(lang);
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${mono.variable}`}
    >
      <head>
        <script>{themeScript}</script>
      </head>
      <body>
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
