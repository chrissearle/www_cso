import React from 'react'

import { StaticQuery, graphql, Link } from 'gatsby'

import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'

const RecentPosts = ({ data }) => {
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark

  return (
    <Card className="mb-4">
      <CardHeader>Recent Articles</CardHeader>
      <ListGroup>
        {edges.map(edge => {
          const { frontmatter, fields } = edge.node

          return (
            <ListGroupItem key={fields.path}>
              <Link to={fields.path}>{frontmatter.title}</Link>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Card>
  )
}

const WrappedRecentPosts = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { collection: { eq: "blog" } } }
            limit: 10
          ) {
            edges {
              node {
                fields {
                  path
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      `}
      render={data => <RecentPosts data={data} />}
    />
  )
}
export default WrappedRecentPosts
