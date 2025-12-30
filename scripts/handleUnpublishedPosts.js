const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const postsDirectory = path.join(__dirname, '../pages/posts');
const tempDirectory = path.join(__dirname, '../.temp-unpublished');
const mode = process.argv[2]; // 'hide' or 'restore'

if (mode === 'hide') {
	// Create temp directory if it doesn't exist
	if (!fs.existsSync(tempDirectory)) {
		fs.mkdirSync(tempDirectory, { recursive: true });
	}

	// Find all unpublished posts and move them
	glob.sync(`${postsDirectory}/**/index.@(md|mdx)`).forEach(file => {
		const content = fs.readFileSync(file, 'utf8');
		const { data } = matter(content);

		if (data.published === false) {
			// Get the post directory (parent of index.md/mdx)
			const postDir = path.dirname(file);
			const postDirName = path.basename(postDir);

			// Move the entire post directory to temp
			const tempPostDir = path.join(tempDirectory, postDirName);

			console.log(`Hiding unpublished post: ${postDirName}`);

			// Move directory
			fs.renameSync(postDir, tempPostDir);
		}
	});

	console.log('Unpublished posts hidden');
} else if (mode === 'restore') {
	// Restore all posts from temp directory
	if (fs.existsSync(tempDirectory)) {
		const tempPosts = fs.readdirSync(tempDirectory);

		tempPosts.forEach(postDirName => {
			const tempPostDir = path.join(tempDirectory, postDirName);
			const originalPostDir = path.join(postsDirectory, postDirName);

			console.log(`Restoring unpublished post: ${postDirName}`);

			// Move directory back
			fs.renameSync(tempPostDir, originalPostDir);
		});

		// Remove temp directory
		fs.rmdirSync(tempDirectory);
		console.log('Unpublished posts restored');
	}
}
