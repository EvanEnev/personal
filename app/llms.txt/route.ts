import { content, EMAIL, GITHUB, SITE, TELEGRAM } from "../[lang]/content";

export function GET() {
  const t = content.en;
  const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

  const md = `# ${t.name} (${content.ru.name})

> ${t.resume.title}. ${t.lead}

${t.resume.summary}

${t.about1} ${t.about2}

## Contact

${list([`Email: ${EMAIL}`, `Telegram: ${TELEGRAM}`, `GitHub: ${GITHUB}`, ...t.meta.map((m) => `${m.k}: ${m.v}`)])}

## Links

${list([
  `[Site in English](${SITE}/en)`,
  `[Сайт на русском](${SITE}/ru)`,
  `[Resume PDF, English](${SITE}/Ivan-Bubenev-CV-en.pdf)`,
  `[Резюме PDF, русский](${SITE}/Ivan-Bubenev-CV-ru.pdf)`,
])}

## Experience

${t.resume.experience.map((e) => `### ${e.title}\n\n${e.period}\n\n${list(e.points)}`).join("\n\n")}

## Projects

${t.cases
  .map((c) => `### ${c.title} — ${c.line}\n\n${[c.desc, `Role: ${c.role}`, `Stack: ${c.stack}`, c.href && `Link: ${c.href}`].filter(Boolean).join("\n\n")}\n\n${list(c.points)}`)
  .join("\n\n")}

### Other projects

${list(t.other.map((o) => `${o.k} — ${o.v} (${o.s})`))}

## Skills

${list(t.resume.skills.map((s) => `${s.k}: ${s.v}`))}

## Principles

${list(t.principles.map((p) => `${p.k}: ${p.v}`))}

## Path

${list(t.path.map((p) => `${p.k}: ${p.v}`))}

## Now

${list(t.now)}
`;

  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
