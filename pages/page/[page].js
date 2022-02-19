import MainPage from "components/MainPage";

import { pagination, split } from "utils/pageutils";
import { loadMarkdown } from "lib/posts";

export default function Home(props) {
  return <MainPage {...props} />;
}

export async function getStaticPaths() {
  const files = loadMarkdown({ reverse: true });

  const pages = pagination(files);

  return {
    paths: pages.indexes.slice(1).map((index) => ({
      params: { page: index.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const files = loadMarkdown({ reverse: true });

  const pages = pagination(files);

  let currentPage = Number.parseInt(params.page);

  if (Number.isNaN(currentPage)) {
    currentPage = 1;
  }

  return {
    props: {
      files: files,
      currentPage: currentPage,
      ...pages,
    },
  };
}
