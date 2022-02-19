import Head from "next/head";

import Meta from "./Meta";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

import { split } from "../utils/pageutils";

export default function MainPage({ pages, indexes, currentPage }) {
  const splitPosts = split(pages[currentPage - 1], 2);

  return (
    <>
      <Head>
        <title>Chris Searle</title>
        <Meta title="Chris Searle" />
      </Head>

      <div>
        {splitPosts.map((row, index) => (
          <div className="card-group my-2" key={`row-${index}`}>
            {row.map((post, index2) => (
              <PostCard key={`post-${index2}`} post={post} />
            ))}
          </div>
        ))}
      </div>

      <Pagination indexes={indexes} currentPage={currentPage} />
    </>
  );
}
