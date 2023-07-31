import Prism from "prismjs";
import "prismjs/components/prism-ini";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-java";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-scala";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-xml-doc";
import "prismjs/components/prism-log";

import { loadMarkdown, loadMarkdownParams } from "lib/posts";

import DisqusComments from "components/Disqus";
import Head from "next/head";
import Meta from "components/Meta";
import PostLink from "components/PostLink";
import PostTags from "components/PostTags";
import { displayDate } from "utils/dateutils";
import { useEffect } from "react";

function PageLinks({ previous, next }) {
  return (
    <nav aria-label="Previous/Next">
      <div className="join flex justify-center space-x-2">
        {previous && (
          <PostLink
            title={`« ${previous.frontmatter.title}`}
            params={previous.params}
            className="join-item text-xs"
          />
        )}

        {next && (
          <PostLink
            title={`${next.frontmatter.title} »`}
            params={next.params}
            className="join-item text-xs"
          />
        )}
      </div>
    </nav>
  );
}

export default function PostPage(props) {
  const { frontmatter, content, previous, next, path, params } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const tags = {
    tags: frontmatter.tags || null,
    series: frontmatter.series || null,
  };

  return (
    <>
      <Head>
        <title>{`Chris Searle - ${frontmatter.title}`}</title>
      </Head>
      <Meta post={props} />
      <div>
        <div className="prose">
          <h1>{frontmatter.title}</h1>
        </div>

        <h6 className="text-xs text-info">
          Posted: {displayDate(frontmatter.date)}
          {frontmatter.updated && (
            <span className="mx-2 text-accent">
              Updated: {frontmatter.updated}
            </span>
          )}
        </h6>

        <div className="flex space-x-2 justify-end">
          <PostTags {...tags} />
        </div>

        <div className="prose">
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>

        <DisqusComments
          path={path}
          slugs={params.slug}
          title={frontmatter.title}
        />

        <PageLinks previous={previous} next={next} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: loadMarkdown({}).map((file) => ({
      params: file.params,
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const files = loadMarkdown({});

  const page = loadMarkdownParams(params);

  const index = files.map((file) => file.filename).indexOf(page.filename);

  let previous = null;
  let next = null;

  if (index > 1) {
    previous = files[index - 1];
  }

  if (index < files.length - 1) {
    next = files[index + 1];
  }

  return {
    props: {
      files: files,
      previous: previous,
      next: next,
      ...page,
    },
  };
}
