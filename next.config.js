const gatsbyBlogPostRedirects = require('./scripts/gatsbyBlogPostRedirects.json');
const gatsbyGenericRedirects = require('./scripts/gatsbyGenericRedirects.json');
const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');

const withNextra = require('nextra')({
	theme: 'nextra-theme-blog',
	themeConfig: './theme.config.js'
	// optional: add `unstable_staticImage: true` to enable Nextra's auto image import
});

// Set `NEXT_OUTPUT=export` to build a fully-static export (no Workers runtime, no cold starts).
const isStaticExport = process.env.NEXT_OUTPUT === 'export';

/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [...gatsbyBlogPostRedirects, ...gatsbyGenericRedirects];
	},
	...(isStaticExport
		? {
				output: 'export',
				// Cloudflare Pages (and most static hosts) will serve `/foo/` via `/foo/index.html`.
				trailingSlash: true,
				// Next/Image optimization requires a server runtime; disable for static export.
				images: { unoptimized: true }
			}
		: {})
};

// Only initialize OpenNext dev tooling when we're actually using the Workers runtime.
if (!isStaticExport) initOpenNextCloudflareForDev();

module.exports = withNextra(nextConfig);
