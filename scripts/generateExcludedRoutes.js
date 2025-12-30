const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const postsDirectory = path.join(__dirname, '../pages/posts'); // Adjusted for script location
const excludedRoutes = [];
const excludedRoutesPath = path.join(
	__dirname,
	'../scripts/excludedRoutes.json'
); // Path for excludedRoutes.json

// Ensure excludedRoutes.json exists
if (!fs.existsSync(excludedRoutesPath)) {
	fs.writeFileSync(excludedRoutesPath, '[]');
}

glob.sync(`${postsDirectory}/**/index.@(md|mdx)`).forEach(file => {
	const content = fs.readFileSync(file, 'utf8');
	const { data } = matter(content);
	// Exclude posts that are marked as not to include in sitemap OR are unpublished
	if (data['include-in-sitemap'] === false || data.published === false) {
		// Convert file path to URL path
		const route = file
			.replace(postsDirectory, '') // Remove the posts directory path
			.replace(/\/index\.mdx?$/, ''); // Remove the '/index.md' or '/index.mdx' part
		excludedRoutes.push(route);
	}
});

// // Adjust the paths for the sitemap
// const webRoutes = excludedRoutes.map(
// 	route => route.replace(/\/index\.mdx?$/, '') // Remove the '/index.md' or '/index.mdx' part
// );

fs.writeFileSync(excludedRoutesPath, JSON.stringify(excludedRoutes, null, 2));
