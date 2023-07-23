const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

// New function to check if a path is a file
async function isFile(path) {
	try {
		const stat = await fs.stat(path);
		return stat.isFile();
	} catch (err) {
		console.error(`Error checking if path is a file: ${path}`, err);
		return false;
	}
}

async function generate() {
	const feed = new RSS({
		title: 'Your Name',
		site_url: 'https://yoursite.com',
		feed_url: 'https://yoursite.com/feed.xml'
	});

	const posts = await fs.readdir(
		path.join(__dirname, '..', 'pages', 'posts')
	);

	await Promise.all(
		posts.map(async name => {
			const postPath = path.join(__dirname, '..', 'pages', 'posts', name);

			// If the path is not a file, return and skip it
			if (name.startsWith('index.') || !(await isFile(postPath))) {
				return;
			}

			const content = await fs.readFile(postPath);
			const frontmatter = matter(content);

			feed.item({
				title: frontmatter.data.title,
				url: '/posts/' + name.replace(/\.mdx?/, ''),
				date: frontmatter.data.date,
				description: frontmatter.data.description,
				categories: frontmatter.data.tag.split(', '),
				author: frontmatter.data.author
			});
		})
	);

	await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
