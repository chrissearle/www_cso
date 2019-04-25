import React from 'react'

import { Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Layout from '../components/layout'

const AllSeriesTemplate = ({ pageContext }) => {
  const { seriesWithCounts, seriesInfo } = pageContext

  return (
    <Layout>
      <h2>All Series</h2>
      <ListGroup>
        {seriesInfo.map(({ title, path }, index) => {
          return (
            <ListGroupItem key={index}>
              <Link to={`/${path}`}>{title}</Link>
              <Badge pill color="dark" className="float-right">
                {seriesWithCounts[title]}
              </Badge>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Layout>
  )
}

export default AllSeriesTemplate
