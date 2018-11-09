import React from 'react'

import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'

const RecentPosts = () => {
  return (
    <Card className="mb-4">
      <CardHeader>Recent Articles</CardHeader>
      <ListGroup>
        <ListGroupItem>1</ListGroupItem>
        <ListGroupItem>2</ListGroupItem>
      </ListGroup>
    </Card>
  )
}

export default RecentPosts
