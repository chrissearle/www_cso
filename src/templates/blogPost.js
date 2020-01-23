import React from 'react'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'
import Helmet from 'react-helmet'
import _ from 'lodash'

import {
  Card,
  CardBody,
  CardText,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

import { lookup } from 'mime-types'

import Layout from '../components/layout'

import TagsMap from '../components/tagsMap'

import Discussion from '../components/disqusPost'

import SEO from '../components/seo'

import { displayDate, metaDate } from '../functions'

import '../stylesheets/blogImage.css'
import '../stylesheets/blogOverrides.css'

const exists = (obj, path) => {
  if (_.has(obj, path)) {
    return !_.isNil(_.get(obj, path))
  }

  return false
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler

const PageLink = ({ path, title }) => {
  return (
    <PaginationItem>
      <PaginationLink href={path}>{title}</PaginationLink>
    </PaginationItem>
  )
}

const PageLinks = ({ prev, next }) => {
  return (
    <Pagination listClassName="justify-content-center">
      {prev && (
        <PageLink
          path={prev.fields.path}
          title={`< ${prev.frontmatter.title}`}
        />
      )}
      {next && (
        <PageLink
          path={next.fields.path}
          title={`${next.frontmatter.title} >`}
        />
      )}
    </Pagination>
  )
}

const ImageMeta = ({ frontmatter, origin }) => {
  if (exists(frontmatter, 'image.childImageSharp.fixed')) {
    const image = frontmatter.image.childImageSharp.fixed
    const url = origin + image.src

    return (
      <Helmet>
        <meta name="image" content={url} />
        <meta property="og:image" content={url} />
        <meta property="og:image:width" content={image.width} />
        <meta property="og:image:height" content={image.height} />
        <meta property="og:image:type" content={lookup(url)} />
      </Helmet>
    )
  }

  return null
}

const Template = ({ location, data, pageContext }) => {
  const { next, prev } = pageContext

  const { markdownRemark } = data

  const { frontmatter, excerpt } = markdownRemark

  const title = frontmatter.title

  const htmlAst = markdownRemark.htmlAst

  const tags = frontmatter.tags && frontmatter.tags.split(/, */)

  const date = displayDate(frontmatter.date)

  const updated = frontmatter.updated ? displayDate(frontmatter.updated) : ''

  // const url = location.href
  // const origin = location.origin
  // Facebook isn't playing ball with location used in the header

  const origin = data.site.siteMetadata.siteUrl
  const url = data.site.siteMetadata.siteUrl + markdownRemark.fields.path

  const hideImage = exists(frontmatter, 'image.childImageSharp.fixed')

  return (
    <Layout title={title} description={excerpt}>
      <SEO hideImage={hideImage} />
      <Helmet>
        <meta property="og:description" content={excerpt} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta
          property="article:published_time"
          content={metaDate(frontmatter.date)}
        />
        {updated && (
          <meta
            property="article:modified_time"
            content={metaDate(frontmatter.updated)}
          />
        )}
        <meta
          property="article:author"
          content="https://about.me/chrissearle"
        />
      </Helmet>
      <ImageMeta origin={origin} frontmatter={frontmatter} />
      <h1 style={{ fontFamily: 'avenir' }}>{title}</h1>
      <Card className="mb-4">
        <CardBody>
          <CardText>
            Posted: {date}
            <TagsMap tags={tags} series={frontmatter.series} keyPrefix="post" />
            {updated && <div className="small">Updated: {updated}</div>}
          </CardText>
        </CardBody>
      </Card>
      <div className="blogpost" style={{ fontFamily: 'avenir' }}>
        {renderAst(htmlAst)}
      </div>

      <PageLinks prev={prev} next={next} />

      <Discussion title={title} url={location.href} />
    </Layout>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(fields: { path: { eq: $pathSlug } }) {
      htmlAst
      frontmatter {
        title
        date
        updated
        tags
        series
        image {
          childImageSharp {
            fixed {
              width
              height
              src
            }
          }
        }
      }
      excerpt(pruneLength: 200)
      fields {
        path
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default Template
