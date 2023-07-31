import ListPostView from "components/ListPostView";
import { loadMarkdown } from "lib/posts";

export default function ArticlesList({ files: items }) {
  return (
    <div className="w-full">
      <ListPostView listTitle="All Articles" items={items} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      files: loadMarkdown({ reverse: true }),
    },
  };
}
