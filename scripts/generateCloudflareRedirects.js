const fs = require('fs');
const path = require('path');

function loadJson(relPath) {
  const abs = path.join(__dirname, relPath);
  return JSON.parse(fs.readFileSync(abs, 'utf8'));
}

function normalizeSource(source) {
  if (!source.startsWith('/')) return `/${source}`;
  return source;
}

function toRedirectLine({ source, destination, permanent }) {
  const status = permanent ? 301 : 302;
  const from = normalizeSource(source);
  const to = destination;
  return `${from} ${to} ${status}`;
}

function main() {
  const redirects = [
    ...loadJson('./gatsbyBlogPostRedirects.json'),
    ...loadJson('./gatsbyGenericRedirects.json')
  ];

  // Dedupe by source (last one wins, mirroring common redirect semantics).
  const bySource = new Map();
  for (const r of redirects) bySource.set(normalizeSource(r.source), r);

  const lines = Array.from(bySource.values())
    .map(toRedirectLine)
    .sort((a, b) => a.localeCompare(b));

  const outPath = path.join(__dirname, '..', 'public', '_redirects');
  fs.writeFileSync(outPath, lines.join('\n') + '\n', 'utf8');

  // eslint-disable-next-line no-console
  console.log(`Wrote ${lines.length} redirects to ${outPath}`);
}

main();





