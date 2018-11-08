import React from 'react'
import { graphql, Link } from 'gatsby'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

import Layout from '../components/layout'

const PageLinks = ({ nodes }) => {
  return (
    <Pagination>
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

  const title = markdownRemark.frontmatter.title

  const html = markdownRemark.html

  return (
    <Layout title={title}>
      <h1 style={{ fontFamily: 'avenir' }}>{title}</h1>
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
      }
    }
  }
`

export default Template
