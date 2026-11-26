import type { Metadata } from "next";
import Image from "next/image";
import portrait from "@/public/portrait.jpg";
import { EMAIL, getContent, GITHUB, TELEGRAM } from "../content";

const mono = "font-mono text-[7.5pt] text-muted";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const t = getContent((await params).lang);
  return { title: `${t.name} — CV`, robots: { index: false } };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[30mm_1fr] gap-x-6 border-t border-ink pt-2.5">
      <h2 className="font-display text-[8pt] font-semibold tracking-widest text-ink uppercase">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Entry({ title, meta, points, stack }: { title: string; meta: React.ReactNode; points: string[]; stack?: string }) {
  return (
    <div className="break-inside-avoid">
      <h3 className="font-display text-[11pt] leading-tight font-extrabold text-ink">{title}</h3>
      <p className={mono}>{meta}</p>
      <ul className="mt-0.5 list-disc gap-x-6 pl-4 marker:text-accent sm:columns-2 print:columns-2">
        {points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      {stack && <p className={`${mono} mt-1 text-ink`}>{stack}</p>}
    </div>
  );
}

export default async function CV({ params }: PageProps<"/[lang]/cv">) {
  const t = getContent((await params).lang);
  const r = t.resume;

  return (
    <main
      id="cv"
      className="mx-auto my-8 flex max-w-[210mm] flex-col gap-3 bg-white p-[14mm] text-[8.5pt] leading-[1.35] text-body shadow-xl print:m-0 print:max-w-none print:p-0 print:shadow-none"
    >
      <header className="flex items-start justify-between gap-6 pb-1">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-[30pt] leading-[0.95] font-extrabold tracking-[-0.035em] text-ink">{t.name}</h1>
          <p className="font-display text-[12pt] font-semibold text-accent">{r.title}</p>
          <p className={`${mono} flex flex-wrap gap-x-3 text-ink`}>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={TELEGRAM}>t.me/evanenev</a>
            <a href={GITHUB}>github.com/EvanEnev</a>
            <a href="https://bubenev.su">bubenev.su</a>
          </p>
          <p className={mono}>{t.meta.map((m) => m.v).join(" · ")}</p>
          <p className={mono}>{r.education}</p>
        </div>
        <Image src={portrait} alt="" sizes="200px" className="w-[26mm] grayscale" />
      </header>

      <Section title={r.labels.summary}>
        <p className="text-[9.5pt] text-ink">{r.summary}</p>
      </Section>

      <Section title={r.labels.skills}>
        <dl className="grid grid-cols-[22mm_1fr] gap-x-4 gap-y-1">
          {r.skills.map((s) => (
            <div key={s.k} className="contents">
              <dt className="font-display font-extrabold text-ink">{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={r.labels.experience}>
        {r.experience.map((e) => <Entry key={e.title} title={e.title} meta={e.period} points={e.points} />)}
      </Section>

      <Section title={r.labels.projects}>
        {t.cases.map((c) => (
          <Entry
            key={c.title}
            title={`${c.title} — ${c.line}`}
            meta={
              <>
                {[c.role, c.period].filter(Boolean).join(" · ")}
                {c.href && <> · <a href={c.href} className="text-accent">{c.href.replace(/^https:\/\/|\/$/g, "")}</a></>}
              </>
            }
            points={c.points}
            stack={c.stack}
          />
        ))}
      </Section>

      <Section title={r.labels.also}>
        <ul className="columns-2 gap-x-6">
          {t.other.map((o) => (
            <li key={o.k} className="break-inside-avoid">
              <b className="font-display text-ink">{o.k}</b> — {o.v}
            </li>
          ))}
        </ul>
      </Section>

    </main>
  );
}
