import ListPostView from "components/ListPostView";

import { loadMarkdown } from "lib/posts";
import { yearDate } from "utils/dateutils";

export default function Year({ year, posts }) {
  return <ListPostView listTitle={year} items={posts} />;
}

export async function getStaticPaths() {
  const uniqueYears = new Set(
    loadMarkdown({})
      .map((file) => yearDate(file.frontmatter.date))
      .flat()
  );

  return {
    paths: [...uniqueYears].map((year) => ({ params: { year: year } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const files = loadMarkdown({ reverse: true });

  return {
    props: {
      year: params.year.toString(),
      posts: files.filter((file) => {
        return yearDate(file.frontmatter.date) === params.year.toString();
      }),
      files: files,
    },
  };
}
