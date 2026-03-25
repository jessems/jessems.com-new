#!/usr/bin/env node
/**
 * Generates sitemap.xml and robots.txt in public/ for Cloudflare Workers deployments.
 * 
 * next-sitemap only runs in postbuild (after `next build`), but the CF deploy
 * pipeline uses `opennextjs-cloudflare build` which skips npm lifecycle hooks.
 * This script generates equivalent output directly from the filesystem.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://jessems.com';
const POSTS_DIR = path.join(__dirname, '..', 'pages', 'posts');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function getPostSlugs() {
  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (entry.name === 'index.md' || entry.name === 'index.mdx') continue;
    if (entry.name === 'rename_images.sh') continue;
    if (entry.name.startsWith('.')) continue;

    let filePath, slug;

    if (entry.isDirectory()) {
      const mdx = path.join(POSTS_DIR, entry.name, 'index.mdx');
      const md = path.join(POSTS_DIR, entry.name, 'index.md');
      if (fs.existsSync(mdx)) filePath = mdx;
      else if (fs.existsSync(md)) filePath = md;
      else continue;
      slug = entry.name;
    } else if (entry.name.match(/\.mdx?$/)) {
      filePath = path.join(POSTS_DIR, entry.name);
      slug = entry.name.replace(/\.mdx?$/, '');
    } else {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    if (data.published === false) continue;

    posts.push({
      slug,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
    });
  }

  return posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

function generateSitemap(posts) {
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    `  <url>\n    <loc>${SITE_URL}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  ];

  for (const post of posts) {
    urls.push(
      `  <url>\n    <loc>${SITE_URL}/posts/${post.slug}</loc>${
        post.date ? `\n    <lastmod>${post.date}</lastmod>` : ''
      }\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

// Run
const posts = getPostSlugs();
const sitemap = generateSitemap(posts);
const robots = generateRobotsTxt();

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);

console.log(`Sitemap generated with ${posts.length + 1} URLs`);
console.log(`robots.txt generated`);
