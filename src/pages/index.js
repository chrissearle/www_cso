import React from 'react'

import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

const Index = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      {edges.map(edge => {
        const { frontmatter, fields } = edge.node

        return (
          <div key={fields.path}>
            <Link to={fields.path}>{frontmatter.title}</Link>
          </div>
        )
      })}
    </Layout>
  )
}

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
`

export default Index
