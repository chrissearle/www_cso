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
      <div className="pt-4">
        <h1>{listTitle}</h1>

        <ListList
          names={sortedItems}
          items={items}
          linkPath={linkPath}
          linkQueryName={linkQueryName}
        />
      </div>
    </>
  );
}
