import React from 'react'
import { graphql } from 'gatsby'

import {
  Card,
  CardBody,
  CardText,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

import Layout from '../components/layout'

import TagsMap from '../components/tagsMap'

import Discussion from '../components/disqusPost'

import { displayDate } from '../functions'

import '../stylesheets/blogImage.css'

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

const Template = ({ location, data, pageContext }) => {
  const { next, prev } = pageContext

  const { markdownRemark } = data

  const { frontmatter } = markdownRemark

  const title = frontmatter.title

  const html = markdownRemark.html

  const tags = frontmatter.tags && frontmatter.tags.split(/, */)

  const date = displayDate(frontmatter.date)

  return (
    <Layout title={title}>
      <h1 style={{ fontFamily: 'avenir' }}>{title}</h1>
      <Card className="mb-4">
        <CardBody>
          <CardText>
            Posted: {date}
            <TagsMap tags={tags} keyPrefix="post" />
          </CardText>
        </CardBody>
      </Card>
      <div
        className="blogpost"
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ fontFamily: 'avenir' }}
      />

      <PageLinks prev={prev} next={next} />

      <Discussion title={title} url={location.href} />
    </Layout>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(fields: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`

export default Template
