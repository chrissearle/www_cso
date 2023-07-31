import ListPostList from "./ListPostList";

export default function LatestArticles({ files }) {
  let popular = null;

  if (files) {
    popular = files
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .slice(0, 5);
  }

  if (!popular) {
    return <></>;
  }

  return (
    <div className="bg-base-100 p-4">
      <h2 className="mb-2 font-bold">Latest Articles</h2>
      <ListPostList items={popular} />
    </div>
  );
}
