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

import { metaDate } from '../functions'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'prismjs/themes/prism-okaidia.css'
import '../stylesheets/footer.css'

const Layout = ({
  data,
  title,
  description,
  type,
  url,
  article,
  image,
  children,
}) => {
  const siteMetadata = data.site.siteMetadata

  let displayTitle = siteMetadata.title
  if (title) {
    displayTitle = title + ' - ' + siteMetadata.title
  }

  const meta = [
    {
      name: 'description',
      content: description ? description : siteMetadata.description,
    },
    {
      property: 'og:title',
      content: displayTitle,
    },
    {
      property: 'og:description',
      content: description ? description : siteMetadata.description,
    },
    {
      property: 'og:locale',
      content: 'en_gb',
    },
    {
      property: 'og:type',
      content: type ? type : 'website',
    },
    {
      property: 'og:url',
      content: url ? url : data.site.siteMetadata.siteUrl,
    },
  ]

  if (article) {
    meta.push({
      name: 'article:published_time',
      content: metaDate(article.date),
    })

    article.tags &&
      article.tags.forEach(tag => {
        meta.push({
          name: 'article:tag',
          content: tag,
        })
      })
  }

  if (image) {
    //  og:image
    //  og:image:secure_url
    //  og:image:type
    //  og:image:width
    //  og:image:height
  }

  return (
    <div>
      <Helmet title={displayTitle} meta={meta} />
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

const WrappedLayout = ({
  title,
  description,
  type,
  url,
  article,
  image,
  children,
}) => {
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
          type={type}
          url={url}
          article={article}
          image={image}
        />
      )}
    />
  )
}

export default WrappedLayout
