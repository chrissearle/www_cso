import Head from "next/head";
import Meta from "components/Meta";
import PostCard from "components/PostCard";
import { loadMarkdown } from "lib/posts";
import { split } from "utils/pageutils";

export default function Category({ category, posts }) {
  const splitPosts = split(posts, 2);

  return (
    <>
      <Head>
        <title>{`Chris Searle - Category: ${category}`}</title>
      </Head>
      <Meta title={`Category: ${category}`} />
      <div className="pt-4">
        <h1>Category: {category}</h1>

        <div>
          {splitPosts.map((row, index) => (
            <div className="card-group my-2" key={`row-${index}`}>
              {row.map((post, index2) => (
                <PostCard key={`post-${index2}`} post={post} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const uniqueCategories = new Set(
    loadMarkdown({})
      .filter((file) => file.frontmatter.category)
      .map((file) => file.frontmatter.category)
      .flat()
  );

  return {
    paths: [...uniqueCategories].map((category) => ({
      params: { category: category },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let cat = params.category;

  const files = loadMarkdown({ reverse: true });

  return {
    props: {
      category: cat,
      posts: files
        .filter((post) => post.frontmatter.category)
        .filter((post) => {
          return post.frontmatter.category.split(", ").includes(cat);
        }),
      files: files,
    },
  };
}
