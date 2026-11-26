import Image from "next/image";
import Link from "next/link";
import portrait from "@/public/portrait.jpg";
import { Accordion, Counter, StickyHeader, Ticker } from "../motion";
import { ThemeToggle } from "../theme-toggle";
import { content, EMAIL, getContent, GITHUB, SITE, TELEGRAM } from "./content";

const TICKER = ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL", "Socket.IO", "Docker", "nginx", "Linux", "Go"];

const h2 = "font-display text-[15px] font-semibold uppercase tracking-[0.08em]";
const label = "text-[13px] uppercase tracking-[0.08em] text-muted";
const pill = "inline-flex min-h-12 items-center rounded-full px-6 font-medium transition active:scale-95";
const reveal = "opacity-0 translate-y-3 transition duration-500 group-data-open/item:translate-y-0 group-data-open/item:opacity-100 motion-reduce:transition-none";
const navLink = "bg-linear-to-r from-current to-current bg-size-[0_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_1px]";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  const t = getContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE}/${lang}`,
    inLanguage: lang,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: t.name,
      alternateName: [content.en.name, content.ru.name, "EvanEnev"].filter((n) => n !== t.name),
      jobTitle: t.resume.title,
      description: t.lead,
      url: SITE,
      image: `${SITE}${portrait.src}`,
      email: `mailto:${EMAIL}`,
      address: { "@type": "PostalAddress", addressLocality: "Yerevan", addressCountry: "AM" },
      knowsLanguage: ["ru", "en"],
      knowsAbout: t.resume.skills.flatMap((s) => s.v.split(", ")),
      sameAs: [GITHUB, TELEGRAM],
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <StickyHeader>
        <div className="mx-auto max-w-300 px-6">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink py-4 motion-safe:animate-rise md:py-6">
            <span className="font-display text-lg font-extrabold">{t.name}</span>
            <nav aria-label="Sections" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] max-md:order-last max-md:w-full">
              {Object.entries(t.nav).map(([id, name]) => (
                <a key={id} href={`#${id}`} className={navLink}>{name}</a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle label={t.themeLabel} />
              <div role="group" aria-label="Language" className="flex overflow-hidden rounded-full border border-ink text-sm">
                {Object.keys(content).map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    scroll={false}
                    aria-current={l === lang ? "page" : undefined}
                    className="flex min-h-10.5 items-center px-4 uppercase transition-colors hover:bg-ink/10 aria-[current]:bg-ink aria-[current]:text-paper"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            </div>
          </header>
        </div>
      </StickyHeader>

      <div className="mx-auto max-w-300 px-6">
        <section className="flex flex-col gap-10 pt-16 pb-16 md:pt-24">
          <span className="font-mono text-sm text-muted motion-safe:animate-rise motion-safe:[animation-delay:100ms]">{t.kicker}</span>
          <h1 className="max-w-275 font-display text-[clamp(44px,7vw,104px)] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance motion-safe:animate-rise motion-safe:[animation-delay:200ms]">
            {t.h1a} <span className="text-accent">{t.h1b}</span>
          </h1>
          <div className="flex flex-wrap items-end justify-between gap-8 motion-safe:animate-rise motion-safe:[animation-delay:350ms]">
            <div className="flex max-w-145 flex-col gap-7">
              <p className="text-xl leading-[1.55] text-body">{t.lead}</p>
              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${EMAIL}`} className={`${pill} bg-ink text-paper hover:bg-accent hover:text-white`}>{t.ctaMail}</a>
                <a href="#work" className={`${pill} group gap-2 border border-ink hover:bg-ink hover:text-paper`}>
                  {t.ctaWork} <span className="transition-transform group-hover:translate-y-1">↓</span>
                </a>
              </div>
            </div>
            <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1.5 font-mono text-sm">
              {t.meta.map((m) => (
                <div key={m.k} className="contents">
                  <dt className="text-muted">{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <Ticker words={TICKER} />

      <main className="mx-auto max-w-300 px-6 pb-16">
        <section aria-label={t.factsLabel} className="grid grid-cols-2 border-b border-ink lg:grid-cols-4">
          {t.facts.map((f) => (
            <div key={f.n} className="reveal flex flex-col gap-2 py-10 pr-6">
              <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.03em] sm:text-[64px]"><Counter value={f.n} /></span>
              <span className="max-w-55 text-[15px] text-body">{f.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="grid scroll-mt-28 gap-x-16 gap-y-8 py-24 md:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-6">
            <h2 className={`${h2} reveal`}>{t.nav.about}</h2>
            <Image
              src={portrait}
              alt={t.name}
              placeholder="blur"
              sizes="280px"
              className="reveal w-full max-w-70 grayscale transition duration-700 hover:grayscale-0"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div className="reveal flex flex-col gap-5">
              <p className="font-display text-[clamp(24px,2.6vw,34px)] leading-tight font-semibold tracking-[-0.01em]">{t.about1}</p>
              <p className="text-[19px] leading-[1.6] text-body">{t.about2}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {t.principles.map((p) => (
                <div key={p.n} className="reveal flex flex-col gap-2.5 border-t-[3px] border-ink pt-4">
                  <span className="font-mono text-sm text-muted">{p.n}</span>
                  <span className="font-display text-[22px] leading-[1.2] font-extrabold">{p.k}</span>
                  <span className="text-base leading-[1.55] text-body">{p.v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 pb-18">
          <div className="flex items-baseline justify-between border-b border-ink pb-3">
            <h2 className={h2}>{t.nav.work}</h2>
            <span className="text-sm text-muted">{t.workHint}</span>
          </div>
          <Accordion
            items={t.cases.map((cs, i) => ({
              head: (
                <>
                  <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(30px,4vw,52px)] leading-none font-extrabold tracking-[-0.02em]">{cs.title}</span>
                  <span className="text-body max-md:col-start-2 max-md:row-start-2">{cs.line}</span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 self-center transition duration-300 group-data-open/item:rotate-180 group-data-open/item:text-accent max-md:col-start-3 max-md:row-start-1" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12h16" />
                    <path d="M12 4v16" className="origin-center transition-transform duration-300 group-data-open/item:scale-y-0" />
                  </svg>
                </>
              ),
              body: (
                <div className="grid gap-x-16 gap-y-8 px-2 pt-2 pb-12 md:grid-cols-[2fr_1fr] md:pl-18">
                  <div className="flex flex-col gap-6">
                    <p className={`${reveal} group-data-open/item:delay-100 text-xl leading-[1.55]`}>{cs.desc}</p>
                    <div className="flex flex-col gap-2">
                      <span className={`${reveal} group-data-open/item:delay-150 ${label}`}>{t.didLabel}</span>
                      <ul className="flex list-disc flex-col gap-1.5 pl-5 text-body">
                        {cs.points.map((p, j) => (
                          <li key={p} style={{ "--i": j } as React.CSSProperties} className={`${reveal} group-data-open/item:delay-[calc(200ms+var(--i)*60ms)]`}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={`${reveal} group-data-open/item:delay-200 flex flex-col gap-5`}>
                    <div className="flex flex-col gap-1.5">
                      <span className={label}>{t.roleLabel}</span>
                      <span className="text-base">{cs.role}</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className={label}>{t.stackLabel}</span>
                      <span className="font-mono text-sm leading-[1.7]">{cs.stack}</span>
                    </div>
                    {cs.href && (
                      <a href={cs.href} target="_blank" rel="noopener" className={`${pill} group min-h-11 gap-1 self-start bg-ink px-5 text-paper hover:bg-accent hover:text-white`}>
                        {cs.hrefLabel} <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ),
            }))}
          />
        </section>

        <section aria-labelledby="other-h" className="pb-24">
          <h2 id="other-h" className={`${h2} border-b border-ink pb-3`}>{t.otherTitle}</h2>
          {t.other.map((o) => (
            <div key={o.k} className="reveal grid items-baseline gap-x-8 gap-y-1.5 border-b border-line px-2 py-4.5 transition-colors hover:bg-neutral-500/8 md:grid-cols-[1fr_2fr_1fr]">
              <span className="font-display text-[22px] font-extrabold">{o.k}</span>
              <span className="text-base text-body">{o.v}</span>
              <span className="font-mono text-[13px] text-muted md:text-right">{o.s}</span>
            </div>
          ))}
        </section>

        <section id="stack" className="flex scroll-mt-28 flex-col gap-8 pb-24">
          <h2 className={`${h2} border-b border-ink pb-3`}>{t.nav.stack}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.stack.map((s) => (
              <div key={s.k} className="reveal flex flex-col gap-3">
                <span className="font-display text-[28px] font-extrabold tracking-[-0.01em]">{s.k}</span>
                <span className="leading-[1.7] text-body">{s.v}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="path" className="flex scroll-mt-28 flex-col gap-8 pb-24">
          <h2 className={`${h2} border-b border-ink pb-3`}>{t.nav.path}</h2>
          <ol className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {t.path.map((p, i) => (
              <li key={i} className="reveal flex flex-col gap-2.5 border-t-[3px] border-ink pt-4">
                <span className="font-mono text-sm text-muted">{p.k}</span>
                <span className="leading-normal">{p.v}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="now-h" className="grid gap-x-16 gap-y-8 border-t border-ink pt-12 pb-24 md:grid-cols-[1fr_3fr]">
          <h2 id="now-h" className={h2}>{t.nowTitle}</h2>
          <ul className="flex flex-col gap-4">
            {t.now.map((n) => (
              <li key={n} className="reveal flex items-baseline gap-4 font-display text-[clamp(22px,2.4vw,30px)] leading-[1.3] font-semibold">
                <span aria-hidden="true" className="text-accent">→</span>
                {n}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="flex scroll-mt-28 flex-col gap-6 border-t border-ink pt-16">
          <span className={h2}>{t.nav.contact}</span>
          <p className="max-w-160 text-xl leading-normal text-body">{t.contactLead}</p>
          <a
            href={`mailto:${EMAIL}`}
            className="reveal font-display text-[clamp(36px,6.5vw,96px)] leading-none font-extrabold tracking-[-0.035em] break-all text-accent transition-opacity hover:opacity-80"
          >
            {EMAIL}
          </a>
          <div className="flex flex-wrap gap-6 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:decoration-2">
            <a href={TELEGRAM} target="_blank" rel="me noopener">Telegram ↗</a>
            <a href={GITHUB} target="_blank" rel="me noopener">GitHub ↗</a>
            <a href={`/Ivan-Bubenev-CV-${lang}.pdf`} target="_blank">{t.cv} ↓</a>
          </div>
          <footer className="mt-16 flex flex-wrap justify-between gap-3 border-t border-line pt-5 font-mono text-[13px] text-muted">
            <span>© 2026 {t.name}</span>
            <span>{t.footer}</span>
          </footer>
        </section>
      </main>
    </>
  );
}
