import React from 'react'

import { Link } from 'gatsby'

const AllYearsTemplate = ({ data, pageContext }) => {
  const { years } = pageContext

  return (
    <div>
      <h2>Years</h2>
      <div>
        <ul>
          {years.map((year, index) => {
            return (
              <li key={index}>
                <Link to={`/years/${year}`}>{year}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AllYearsTemplate
