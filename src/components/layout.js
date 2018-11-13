import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import Helmet from 'react-helmet'

import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import RecentPosts from './recentPosts'
import TopTags from './topTags'
import Search from './search'
import AdBoxFooter from './adboxFooter'
import AdBoxRight from './adboxRight'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'prismjs/themes/prism-okaidia.css'
import '../stylesheets/footer.css'

const Layout = ({ data, title, description, children }) => {
  const siteMetadata = data.site.siteMetadata

  let displayTitle = siteMetadata.title
  if (title) {
    displayTitle = title + ' - ' + siteMetadata.title
  }

  const displayDescription = description
    ? description
    : siteMetadata.description

  return (
    <div>
      <Helmet>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
      </Helmet>
      <Header title={siteMetadata.title} />
      <Container>
        <Row>
          <Col md="12" lg="9" className="pt-4">
            {children}
          </Col>
          <Col md="12" lg="3" className="pt-4">
            <Search />
            <TopTags />
            <AdBoxRight />
            <RecentPosts />
          </Col>
        </Row>
      </Container>
      <footer className="footer">
        <AdBoxFooter />
      </footer>
      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
    </div>
  )
}

const WrappedLayout = ({ title, description, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `}
      render={data => (
        <Layout
          data={data}
          children={children}
          title={title}
          description={description}
        />
      )}
    />
  )
}

export default WrappedLayout
