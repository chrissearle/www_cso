import React from 'react'

import { Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Layout from '../components/layout'

import { displayDate } from '../functions'

const SingleTagTemplate = ({ pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <Layout>
      <h2>Posts about {`${tagName}`}</h2>
      <ListGroup>
        {posts.map((post, index) => {
          const date = displayDate(post.frontmatter.date)

          return (
            <ListGroupItem key={index}>
              <Link to={post.fields.path}>{post.frontmatter.title}</Link>
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

export default SingleTagTemplate
