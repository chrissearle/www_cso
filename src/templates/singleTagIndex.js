import React from 'react'

import { Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import moment from 'moment'

import Layout from '../components/layout'

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <Layout>
      <h2>Posts about {`${tagName}`}</h2>
      <ListGroup>
        {posts.map((post, index) => {
          const date = moment(
            post.frontmatter.date,
            'YYYY-MM-DD HH:mm Z'
          ).format('YYYY-MM-DD')

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
