import glob from "glob";
import path from "path";
import fs from "fs";

import { Feed } from "feed";

import matter from "gray-matter";
import { marked } from "marked";
import { displayDate } from "utils/dateutils";

marked.use({
  headerIds: false,
  mangle: false,
});

const postParams = (filename) => {
  const parts = filename.replace(".md", "").split("/");

  const idx = parts[3].indexOf("-");

  const day = parts[3].substring(0, idx);
  const slug = parts[3].substring(idx + 1);

  return {
    year: parts[1].toString(),
    month: parts[2].toString(),
    day: day,
    slug: slug,
  };
};

const loadMarkdownSingle = (filename, includeContent = true) => {
  const markdownWithMeta = fs.readFileSync(path.join(filename), "utf-8");

  const { data: frontmatter, content } = matter(markdownWithMeta);

  const params = postParams(filename);

  let imagePath = null;

  if (frontmatter.image) {
    imagePath = `/images/posts/${params.year}/${params.month}/${frontmatter.image}`;
  }

  if (frontmatter.tags) {
    frontmatter.tags = frontmatter.tags.toLowerCase();
  } else {
    frontmatter.tags = "";
  }

  if (frontmatter.updated) {
    frontmatter.updated = displayDate(frontmatter.updated);
  }

  const postPath = path.join(
    params.year,
    params.month,
    params.day,
    params.slug
  );

  if (includeContent) {
    return {
      filename: filename,
      frontmatter: frontmatter,
      params: params,
      path: postPath,
      content: marked(content),
      imagePath: imagePath,
    };
  }

  return {
    filename: filename,
    frontmatter: frontmatter,
    params: params,
    path: postPath,
    imagePath: imagePath,
  };
};

export const loadMarkdownParams = (params) => {
  return loadMarkdownSingle(
    path.join(
      "posts",
      params.year,
      params.month,
      params.day + "-" + params.slug + ".md"
    )
  );
};

export const loadMarkdown = ({
  content: includeContent = false,
  reverse = false,
}) => {
  const files = glob.sync(path.join("posts/**/*.md"));

  return files
    .map((filename) => loadMarkdownSingle(filename, includeContent))
    .sort((a, b) =>
      reverse
        ? b.frontmatter.date.localeCompare(a.frontmatter.date)
        : a.frontmatter.date.localeCompare(b.frontmatter.date)
    );
};

export const generateFeed = () => {
  const files = loadMarkdown({ content: true, reverse: true });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const author = {
    name: "Chris Searle",
    link: process.env.NEXT_PUBLIC_ABOUT,
  };

  const feed = new Feed({
    title: `Feed for ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      json: `${baseUrl}/feed.json`,
    },
    author,
  });

  files.forEach((file) => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${file.params.year}/${file.params.month}/${file.params.day}/${file.params.slug}/`;

    let item = {
      title: file.frontmatter.title,
      id: url,
      link: url,
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      favicon: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`,
      description: file.frontmatter.intro || file.frontmatter.title,
      author: [author],
      date: new Date(file.frontmatter.date),
    };

    if (file.imagePath) {
      item.image = `${process.env.NEXT_PUBLIC_SITE_URL}${file.imagePath}`;
    }

    let tags = file.frontmatter.tags.split(", ").filter((tag) => tag !== "");
    if (file.frontmatter.category) {
      tags.push(file.frontmatter.category);
    }

    if (tags.length > 0) {
      item.category = tags.map((tag) => ({
        name: tag,
      }));
    }

    feed.addItem(item);
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
  fs.writeFileSync("public/feed.json", feed.json1());
};
