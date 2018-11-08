import React from 'react'

import { Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Layout from '../components/layout'

const AllTagsTemplate = ({ pageContext }) => {
  const { tags } = pageContext

  const tagNames = Object.keys(tags).sort()

  return (
    <Layout>
      <h2>Tags</h2>
      <ListGroup>
        {tagNames.map((tagName, index) => {
          return (
            <ListGroupItem key={index}>
              <Link to={`/tags/${tagName}`}>{tagName}</Link>
              <Badge pill color="dark" className="float-right">
                {tags[tagName]}
              </Badge>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Layout>
  )
}

export default AllTagsTemplate
