const gatsbyBlogPostRedirects = require('./scripts/gatsbyBlogPostRedirects.json');
const gatsbyGenericRedirects = require('./scripts/gatsbyGenericRedirects.json');

const withNextra = require('nextra')({
	theme: 'nextra-theme-blog',
	themeConfig: './theme.config.js'
	// optional: add `unstable_staticImage: true` to enable Nextra's auto image import
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [...gatsbyBlogPostRedirects, ...gatsbyGenericRedirects];
	}
};

module.exports = withNextra(nextConfig);
