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

const Layout = ({ data, title, description, url, image, children }) => {
  const siteMetadata = data.site.siteMetadata

  let displayTitle = siteMetadata.title
  if (title) {
    displayTitle = title + ' - ' + siteMetadata.title
  }

  const displayDescription = description
    ? description
    : siteMetadata.description

  if (image) {
    //  og:image
    //  og:image:secure_url
    //  og:image:type
    //  og:image:width
    //  og:image:height
  }

  return (
    <div>
      <Helmet>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        <meta property="og:locale" content="en_gb" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={url ? url : data.site.siteMetadata.siteUrl}
        />
      </Helmet>
      <Header title={data.site.siteMetadata.title} />
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

const WrappedLayout = ({ title, description, url, image, children }) => {
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
          url={url}
          image={image}
        />
      )}
    />
  )
}

export default WrappedLayout
