import React from 'react'

import { Link } from 'gatsby'

import { ListGroup, ListGroupItem, Badge } from 'reactstrap'

import Layout from '../components/layout'

const AllYearsTemplate = ({ data, pageContext }) => {
  const { years } = pageContext

  const yearNames = Object.keys(years)
    .sort()
    .reverse()

  return (
    <Layout>
      <h2>By Year</h2>
      <ListGroup>
        {yearNames.map((year, index) => {
          return (
            <ListGroupItem key={index}>
              <Link to={`/years/${year}`}>{year}</Link>
              <Badge pill color="dark" className="float-right">
                {years[year]}
              </Badge>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </Layout>
  )
}

export default AllYearsTemplate
