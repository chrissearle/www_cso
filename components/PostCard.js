import Link from "next/link";
import PostLink from "./PostLink";
import PostTags from "../components/PostTags";
import { displayDate } from "../utils/dateutils";

export default function PostCard({ post }) {
  const tags = {
    tags: post.frontmatter.tags || null,
    series: post.frontmatter.series || null,
  };

  return (
    <div className="card sm:w-full lg:w-full xl:w-6/12 2xl:w-4/12 p-4">
      <div className="bg-base-100 shadow-lg p-2">
        {post.imagePath && (
          <figure>
            <img src={post.imagePath} alt="" />
          </figure>
        )}

        {post.frontmatter.embedImage && (
          <figure>
            <img src={post.frontmatter.embedImage} alt="" />
          </figure>
        )}

        <div className="card-body">
          <h6 className="text-xs text-info">
            Posted: {displayDate(post.frontmatter.date)}
            {post.frontmatter.updated && (
              <span className="mx-2 text-accent">
                Updated: {post.frontmatter.updated}
              </span>
            )}
          </h6>

          <h2 className="card-title">
            <PostLink
              title={post.frontmatter.title}
              params={post.params}
              heading={true}
            />
          </h2>

          {post.frontmatter.intro && (
            <div className="prose">
              <p>{post.frontmatter.intro}</p>
            </div>
          )}
        </div>

        <div className="card-actions justify-end">
          <PostTags {...tags} />
        </div>
      </div>
    </div>
  );
}
