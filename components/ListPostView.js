import Head from "next/head";
import ListPostList from "./ListPostList";
import Meta from "./Meta";

export default function ListPostView({ listTitle, items }) {
  return (
    <>
      <Head>
        <title>{`Chris Searle - Posts: ${listTitle}`}</title>
      </Head>
      <Meta title={`Posts: ${listTitle}`} />

      <div className="w-full card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Posts: {listTitle}</h2>

          <ListPostList items={items} wide={true} />
        </div>
      </div>
    </>
  );
}
