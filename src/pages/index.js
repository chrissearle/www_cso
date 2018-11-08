import React from "react";

import { graphql, Link } from "gatsby";

import Header from "../components/header";

const Layout = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <div>
      <Header />
      <div>
        <Link to="/tags">All Tags</Link>
      </div>
      <div>
        <Link to="/years">By Year</Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontFamily: "avenir"
        }}
      >
        {edges.map(edge => {
          const { frontmatter, fields } = edge.node;

          return (
            <div key={fields.path}>
              <Link to={fields.path}>{frontmatter.title}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { collection: { eq: "blog" } } }
    ) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`;

export default Layout;
