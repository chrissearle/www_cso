import React from 'react'

import Layout from '../components/layout'

import { graphql, Link } from 'gatsby'

import {
  Button,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  CardFooter,
} from 'reactstrap'

import moment from 'moment'

const Index = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      {edges.map(edge => {
        const post = edge.node

        const date = moment(post.frontmatter.date, 'YYYY-MM-DD HH:mm Z').format(
          'YYYY-MM-DD'
        )

        const tags = post.frontmatter.tags.split(/, */)

        return (
          <div key={`ex_${post.fields.path}`}>
            <Card className="mb-4">
              <CardHeader>
                Posted: {date}
                {tags.map(tag => {
                  return (
                    <Button outline color="info" size="sm" className="ml-2">
                      <Link to={`/tags/${tag}`}>{tag}</Link>
                    </Button>
                  )
                })}
              </CardHeader>
              <CardBody>
                <CardTitle>
                  <Link to={post.fields.path}>{post.frontmatter.title}</Link>
                </CardTitle>
                <CardText>{post.excerpt}</CardText>
              </CardBody>
              <CardFooter>
                <Link to={post.fields.path}>Read full article</Link>
              </CardFooter>
            </Card>
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
      limit: 10
    ) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            title
            date
            tags
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`
export default Index
