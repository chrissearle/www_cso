import React from "react";

import { graphql, Link } from "gatsby";

import Layout from "../components/layout";

const Button = ({ path, title }) => {
  return (
    <span style={{ marginRight: "10px" }}>
      <Link to={path}>{title}</Link>
    </span>
  );
};

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext;

  const { markdownRemark } = data;

  const title = markdownRemark.frontmatter.title;

  const html = markdownRemark.html;

  return (
    <Layout>
      <h1 style={{ fontFamily: "avenir" }}>{title}</h1>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ fontFamily: "avenir" }}
      />

      <div style={{ marginBottom: "1rem", fontFamily: "avenir" }}>
        {prev && (
          <Button path={prev.fields.path} title={prev.frontmatter.title} />
        )}
        {next && (
          <Button path={next.fields.path} title={next.frontmatter.title} />
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(fields: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;

export default Template;
