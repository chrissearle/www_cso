import ListView from "components/ListView";

import { loadMarkdown } from "lib/posts";
import { buildListProps } from "utils/pageutils";

export default function SeriesList({ items, sortedItems }) {
  return (
    <ListView
      listTitle="All Series"
      sortedItems={sortedItems}
      items={items}
      linkPath="/series/[series]/"
      linkQueryName="series"
    />
  );
}

export async function getStaticProps() {
  const files = loadMarkdown({});
  let seriesToPosts = {};

  files
    .map((file) => {
      return {
        series: file.frontmatter.series,
        ...file,
      };
    })
    .filter((file) => file.series)
    .map((file) => file.series)
    .forEach((series) => {
      if (seriesToPosts.hasOwnProperty(series)) {
        seriesToPosts[series] = seriesToPosts[series] + 1;
      } else {
        seriesToPosts[series] = 1;
      }
    });

  return {
    props: {
      files: files,
      ...buildListProps(seriesToPosts),
    },
  };
}
