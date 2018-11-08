import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import Helmet from 'react-helmet'

import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'prismjs/themes/prism-okaidia.css'

const Layout = ({ data, title, children }) => {
  let displayTitle = data.site.siteMetadata.title
  if (title) {
    displayTitle = title + ' - ' + data.site.siteMetadata.title
  }

  return (
    <div>
      <Helmet
        title={displayTitle}
        meta={[
          {
            name: 'description',
            content: data.site.siteMetadata.description,
          },
        ]}
      />
      <Header title={data.site.siteMetadata.title} />
      <Container>
        <Row>
          <Col md="12" lg="9" className="pt-4">
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const WrappedLayout = ({ title, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <Layout data={data} children={children} title={title} />}
    />
  )
}

export default WrappedLayout
