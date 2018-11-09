import React from 'react'

import { StaticQuery, graphql, Link } from 'gatsby'

import { Card, CardHeader, ListGroup, ListGroupItem, Badge } from 'reactstrap'

const TopTags = ({ data }) => {
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark

  const postCountByTag = {}

  edges.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      const tags = node.frontmatter.tags.split(/, */)

      tags.forEach(tag => {
        if (!postCountByTag[tag]) {
          postCountByTag[tag] = 0
        }

        postCountByTag[tag] += 1
      })
    }
  })

  const tags = Object.keys(postCountByTag)
    .sort((a, b) => {
      return postCountByTag[b] - postCountByTag[a]
    })
    .slice(0, 10)

  return (
    <Card className="mb-4">
      <CardHeader>Popular Tags</CardHeader>
      <ListGroup>
        {tags.map(tag => {
          return (
            <ListGroupItem key={tag}>
              <Link to={`/tags/${tag}`}>{tag}</Link>
              <Badge pill color="dark" className="float-right">
                {postCountByTag[tag]}
              </Badge>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Card>
  )
}

const WrappedTopTags = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: { fields: { collection: { eq: "blog" } } }
          ) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
      render={data => <TopTags data={data} />}
    />
  )
}

export default WrappedTopTags
