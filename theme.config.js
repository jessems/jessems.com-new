const YEAR = new Date().getFullYear();
const SITE_URL = 'https://jessems.com';

export default {
	head: ({ title, meta }) => {
		const ogTitle = meta.title || title || 'Jesse Szepieniec';
		const ogDescription = meta.description || 'Blog by Jesse Szepieniec';
		const ogImage = meta.image
			? `${SITE_URL}${meta.image}`
			: `${SITE_URL}/images/default-og.png`;

		// JSON-LD structured data for blog posts
		const isPost = typeof window !== 'undefined' && window.location.pathname.startsWith('/posts/');
		const jsonLd = meta.title ? {
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: meta.title,
			description: ogDescription,
			image: ogImage,
			author: {
				'@type': 'Person',
				name: 'Jesse Szepieniec',
				url: SITE_URL,
			},
			publisher: {
				'@type': 'Person',
				name: 'Jesse Szepieniec',
				url: SITE_URL,
			},
			...(meta.date && { datePublished: meta.date }),
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': SITE_URL,
			},
		} : {
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Jesse Szepieniec',
			url: SITE_URL,
			author: {
				'@type': 'Person',
				name: 'Jesse Szepieniec',
				url: SITE_URL,
			},
		};

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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
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
