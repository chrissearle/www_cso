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

import moment from 'moment'

import Layout from '../components/layout'

import TagsMap from '../components/tagsMap'

import '../stylesheets/blogImage.css'

const PageLinks = ({ nodes }) => {
  return (
    <Pagination listClassName="justify-content-center">
      {nodes
        .filter(node => node)
        .map(node => {
          return (
            <PaginationItem key={node.fields.path}>
              <PaginationLink href={node.fields.path}>
                {node.frontmatter.title}
              </PaginationLink>
            </PaginationItem>
          )
        })}
    </Pagination>
  )
}

const Template = ({ data, pageContext }) => {
  const { next, prev } = pageContext

  const { markdownRemark } = data

  const { frontmatter } = markdownRemark

  const title = frontmatter.title

  const html = markdownRemark.html

  const tags = frontmatter.tags && frontmatter.tags.split(/, */)

  const date = moment(frontmatter.date, 'YYYY-MM-DD HH:mm Z').format(
    'YYYY-MM-DD'
  )

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

      <PageLinks nodes={[prev, next]} />
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
