import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import Header from '../components/header'

import 'bootstrap/dist/css/bootstrap.min.css'

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col md="12" />
        </Row>
        <Row>
          <Col md="12" lg="9">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Layout
