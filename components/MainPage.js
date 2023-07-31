import Head from "next/head";
import Meta from "./Meta";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";

export default function MainPage({ pages, indexes, currentPage }) {
  return (
    <>
      <Head>
        <title>Chris Searle</title>
      </Head>
      <Meta title="Chris Searle" />

      <div className="flex flex-wrap">
        {pages[currentPage - 1].map((post, index) => (
          <PostCard key={`post-${index}`} post={post} />
        ))}
      </div>

      <Pagination indexes={indexes} currentPage={currentPage} />
    </>
  );
}
