import React from "react";

import { graphql, Link } from "gatsby";

const SingleYearTemplate = ({ data, pageContext }) => {
  const { posts, year } = pageContext;

  return (
    <div>
      <div>
        Posts from {`${year}`}
        <div>
          <ul>
            {posts.map((post, index) => {
              return (
                <li key={index}>
                  <Link to={post.fields.path}>{post.frontmatter.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleYearTemplate;
