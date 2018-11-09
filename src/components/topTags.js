import React from 'react'

import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'

const TopTags = () => {
  return (
    <Card className="mb-4">
      <CardHeader>Popular Tags</CardHeader>
      <ListGroup>
        <ListGroupItem>1</ListGroupItem>
        <ListGroupItem>2</ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default TopTags
