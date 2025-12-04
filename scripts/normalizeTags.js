const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'pages', 'posts');

function getAllPostFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllPostFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeTagsInFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  let modified = false;

  // Rename 'tags' to 'tag'
  if (data.tags !== undefined) {
    data.tag = data.tags;
    delete data.tags;
    modified = true;
    console.log(`  ✓ Renamed 'tags' to 'tag'`);
  }

  // Normalize tag values to lowercase
  if (data.tag && typeof data.tag === 'string') {
    const originalTag = data.tag;
    data.tag = data.tag.toLowerCase();
    if (originalTag !== data.tag) {
      modified = true;
      console.log(`  ✓ Normalized tag: '${originalTag}' → '${data.tag}'`);
    }
  }

  // Normalize slug to lowercase
  if (data.slug && typeof data.slug === 'string') {
    const originalSlug = data.slug;
    data.slug = data.slug.toLowerCase();
    if (originalSlug !== data.slug) {
      modified = true;
      console.log(`  ✓ Normalized slug: '${originalSlug}' → '${data.slug}'`);
    }
  }

  if (modified) {
    const newContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }

  return false;
}

function main() {
  console.log('Starting tag and slug normalization...\n');

  const postFiles = getAllPostFiles(postsDirectory);
  console.log(`Found ${postFiles.length} post files\n`);

  let modifiedCount = 0;

  for (const filePath of postFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`Processing: ${relativePath}`);

    try {
      const wasModified = normalizeTagsInFile(filePath);
      if (wasModified) {
        modifiedCount++;
      } else {
        console.log(`  - No changes needed`);
      }
    } catch (error) {
      console.error(`  ✗ Error processing file: ${error.message}`);
    }

    console.log('');
  }

  console.log('─'.repeat(50));
  console.log(`\nCompleted! Modified ${modifiedCount} of ${postFiles.length} files`);
}

main();
