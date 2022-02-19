import ListView from "components/ListView";

import { loadMarkdown } from "lib/posts";

import { buildListProps } from "utils/pageutils";

export default function TagList({ items, sortedItems }) {
  return (
    <ListView
      listTitle="All Tags"
      sortedItems={sortedItems}
      items={items}
      linkPath="/tags/[tag]/"
      linkQueryName="tag"
    />
  );
}

export async function getStaticProps() {
  const files = loadMarkdown({});

  let tagToPosts = {};

  files
    .map((file) => {
      return {
        tags: file.frontmatter.tags.split(", "),
        ...file,
      };
    })
    .map((file) => file.tags)
    .forEach((tags) => {
      tags.forEach((tag) => {
        if (tagToPosts.hasOwnProperty(tag)) {
          tagToPosts[tag] = tagToPosts[tag] + 1;
        } else {
          tagToPosts[tag] = 1;
        }
      });
    });

  return {
    props: {
      files: files,
      ...buildListProps(tagToPosts),
    },
  };
}
