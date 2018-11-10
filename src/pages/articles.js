import React from 'react'

import { graphql, Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Layout from '../components/layout'

import { displayDate } from '../functions'

const Articles = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <h2>All Articles</h2>
      <ListGroup>
        {edges.map(edge => {
          const { frontmatter, fields } = edge.node
          const date = displayDate(frontmatter.date)

          return (
            <ListGroupItem key={fields.path}>
              <Link to={fields.path}>{frontmatter.title}</Link>
              <Badge pill color="dark" className="float-right">
                {date}
              </Badge>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Layout>
  )
}

export const query = graphql`
  query ArticlesQuery {
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

export default Articles
