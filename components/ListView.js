import Head from "next/head";
import ListList from "./ListList";
import Meta from "./Meta";

export default function ListView({
  listTitle,
  sortedItems,
  items,
  linkPath,
  linkQueryName,
}) {
  return (
    <>
      <Head>
        <title>{`Chris Searle - ${listTitle}`}</title>
      </Head>
      <Meta title={listTitle} />

      <div className="w-full card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">{listTitle}</h2>
          <ListList
            names={sortedItems}
            items={items}
            linkPath={linkPath}
            linkQueryName={linkQueryName}
          />
        </div>
      </div>
    </>
  );
}
