import MainPage from "components/MainPage";

import { pagination, split } from "utils/pageutils";
import { loadMarkdown, generateFeed } from "lib/posts";

export default function Home(props) {
  return <MainPage {...props} />;
}

export async function getStaticProps() {
  generateFeed();

  const files = loadMarkdown({ reverse: true });

  const pages = pagination(files);

  return {
    props: {
      files: files,
      currentPage: 1,
      ...pages,
    },
  };
}
