import ListPostView from "components/ListPostView";

import { loadMarkdown } from "lib/posts";

export default function ArticlesList({ files: items }) {
  return <ListPostView listTitle="All Articles" items={items} />;
}

export async function getStaticProps() {
  return {
    props: {
      files: loadMarkdown({ reverse: true }),
    },
  };
}
