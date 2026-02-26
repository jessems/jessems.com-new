const YEAR = new Date().getFullYear();
const SITE_URL = 'https://jessems.com';

export default {
	head: ({ title, meta }) => {
		const ogTitle = meta.title || title || 'Jesse Szepieniec';
		const ogDescription = meta.description || 'Blog by Jesse Szepieniec';
		const ogImage = meta.image
			? `${SITE_URL}${meta.image}`
			: `${SITE_URL}/images/default-og.png`;

		return (
			<>
				<meta name="description" content={ogDescription} />
				<meta property="og:site_name" content="Jesse Szepieniec" />
				<meta property="og:title" content={ogTitle} />
				<meta property="og:description" content={ogDescription} />
				<meta property="og:image" content={ogImage} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={ogTitle} />
				<meta name="twitter:description" content={ogDescription} />
				<meta name="twitter:image" content={ogImage} />
			</>
		);
	},
	footer: (
		<footer>
			<small>
				<time>{YEAR}</time> © Jesse M. Szepieniec.
				<a href="/feed.xml">RSS</a>
			</small>
			<style jsx>{`
				footer {
					margin-top: 8rem;
				}
				a {
					float: right;
				}
			`}</style>
		</footer>
	),
	darkMode: true,
	nextThemes: {
		defaultTheme: 'dark',
		storageKey: 'theme',
		forcedTheme: undefined
	}
};
