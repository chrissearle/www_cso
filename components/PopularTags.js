import Link from "next/link";
import ListList from "./ListList";

export default function PopularTags({ files }) {
  let popular = null;

  if (files) {
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

    const tagCounts = Object.keys(tagToPosts).map((tag) => ({
      name: tag,
      count: tagToPosts[tag],
    }));

    popular = tagCounts.sort((a, b) => b.count - a.count).slice(0, 5);
  }

  if (!popular) {
    return <></>;
  }

  const sortedNames = popular.map((item) => item.name);
  const items = {};
  popular.forEach((tag) => (items[tag.name] = tag.count));

  return (
    <div className="bg-base-100 p-4">
      <h2 className="mb-2 font-bold">Popular Tags</h2>
      <ListList
        names={sortedNames}
        items={items}
        linkPath="/tags/[tag]/"
        linkQueryName="tag"
      />
    </div>
  );
}
