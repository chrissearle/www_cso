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
    <div className="my-2 card">
      <div className="card-header">Latest Articles</div>

      <ListPostList items={popular} />
    </div>
  );
}
