import Head from "next/head";

import ListPostList from "./ListPostList";
import Meta from "./Meta";

export default function ListPostView({ listTitle, items }) {
  return (
    <>
      <Head>
        <title>Chris Searle - Posts: {listTitle}</title>
        <Meta title={`Posts: ${listTitle}`} />
      </Head>
      <div className="pt-4">
        <h1>Posts: {listTitle}</h1>

        <ListPostList items={items} />
      </div>
    </>
  );
}
