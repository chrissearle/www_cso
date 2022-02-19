import Head from "next/head";

import ListPostList from "./ListPostList";

export default function ListPostView({ listTitle, items }) {
  return (
    <>
      <Head>
        <title>Chris Searle - Posts: {listTitle}</title>
      </Head>
      <div className="pt-4">
        <h1>Posts: {listTitle}</h1>

        <ListPostList items={items} />
      </div>
    </>
  );
}
