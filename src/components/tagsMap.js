import React from 'react'

import { Link } from 'gatsby'

import { Button } from 'reactstrap'

const TagsMap = ({ tags, keyPrefix }) => {
  return (
    <React.Fragment>
      {tags &&
        tags.map(tag => {
          return (
            <Button
              key={`tag_${tag}_ex_${keyPrefix}`}
              outline
              color="info"
              size="sm"
              className="ml-2 mt-2"
            >
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </Button>
          )
        })}
    </React.Fragment>
  )
}

export default TagsMap
