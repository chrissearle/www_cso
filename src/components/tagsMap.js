import React from 'react'

import { Link } from 'gatsby'
import slugify from 'slugify'

import { Button } from 'reactstrap'

const TagsMap = ({ tags, series, keyPrefix }) => {
  //const className = innerClass ? innerClass : 'ml-2'

  const seriesPath = series ? `/series/${slugify(series)}`.toLowerCase() : ''

  return (
    <React.Fragment>
      {tags &&
        tags.map((tag, idx) => {
          return (
            <Button
              key={`tag_${tag}_ex_${keyPrefix}`}
              outline
              color="info"
              size="sm"
              className="mb-2 mr-2"
            >
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </Button>
          )
        })}
      <br />
      {series && (
        <Button outline color="success" size="sm">
          <Link className="text-success" to={seriesPath}>
            {series}
          </Link>
        </Button>
      )}
    </React.Fragment>
  )
}

export default TagsMap
