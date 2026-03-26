/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.SITE_URL || 'https://jessems.com',
	generateRobotsTxt: true,
	// Output directly to out/ so wrangler deploy picks up the files.
	// Without this, next-sitemap writes to public/ which isn't re-copied
	// to out/ after the export build completes.
	outDir: './out',
};
