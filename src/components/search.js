import React from 'react'

import { Card, CardBody, CardText, Form, Input } from 'reactstrap'

const Search = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardText tag="div">
          <Form action="//www.google.com" id="cse-search-box">
            <Input
              type="hidden"
              name="cx"
              value="partner-pub-6208435820744910:2042811242"
            />
            <Input type="hidden" name="ie" value="UTF-8" />
            <Input type="text" name="q" size="40" />
            <Input type="submit" name="sa" value="Search" />
          </Form>
          <script src="//www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en" />
        </CardText>
      </CardBody>
    </Card>
  )
}

export default Search
