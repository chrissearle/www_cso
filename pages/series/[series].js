import ListPostView from "components/ListPostView";

import { loadMarkdown } from "lib/posts";

export default function Series({ series, posts }) {
  return <ListPostView listTitle={series} items={posts} />;
}

export async function getStaticPaths() {
  const uniqueSeries = new Set(
    loadMarkdown({})
      .filter((file) => file.frontmatter.series)
      .map((file) => file.frontmatter.series)
      .flat()
  );

  return {
    paths: [...uniqueSeries].map((series) => ({ params: { series: series } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const files = loadMarkdown({ reverse: true });

  return {
    props: {
      series: params.series,
      posts: files.filter((file) => {
        return file.frontmatter.series === params.series;
      }),
      files: files,
    },
  };
}
