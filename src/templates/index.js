import React from 'react'

import Layout from '../components/layout'

import { Link } from 'gatsby'

import _ from 'lodash'

import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  CardColumns,
  CardFooter,
  CardImg,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

import moment from 'moment'

import TagsMap from '../components/tagsMap'

const Index = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  console.log(previousUrl)

  const pages = _.range(2, pageCount + 1)

  return (
    <Layout>
      <CardColumns>
        {group.map(edge => {
          const post = edge.node

          const date = moment(
            post.frontmatter.date,
            'YYYY-MM-DD HH:mm Z'
          ).format('YYYY-MM-DD')

          const tags =
            post.frontmatter.tags && post.frontmatter.tags.split(/, */)

          return (
            <Card className="mb-4" key={`ex_${post.fields.path}`}>
              <CardHeader tag="h6">
                <div>Posted: {date}</div>
              </CardHeader>
              {post.frontmatter.image && (
                <Link to={post.fields.path}>
                  <CardImg
                    top
                    width="100%"
                    src={post.frontmatter.image.publicURL}
                  />
                </Link>
              )}
              <CardBody>
                <CardTitle>
                  <Link to={post.fields.path}>{post.frontmatter.title}</Link>
                </CardTitle>
                <CardText>{post.excerpt}</CardText>
              </CardBody>
              <CardFooter>
                <TagsMap
                  tags={tags}
                  keyPrefix={post.fields.path}
                  innerClass="ml-2 mt-2"
                />
                <div className="mt-2">
                  <Link to={post.fields.path}>Read full article</Link>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </CardColumns>
      <Pagination listClassName="justify-content-center">
        <PaginationItem disabled={index <= 1}>
          <PaginationLink href={`/${previousUrl}`}>&lt;</PaginationLink>
        </PaginationItem>
        <PaginationItem active={1 === index}>
          <PaginationLink href={'/'}>1</PaginationLink>
        </PaginationItem>
        {pages.map(page => {
          return (
            <PaginationItem active={page === index} key={`page_${page}`}>
              <PaginationLink href={`/${page}`}>{page}</PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem disabled={index >= pageCount}>
          <PaginationLink href={`/${nextUrl}`}>&gt;</PaginationLink>
        </PaginationItem>
      </Pagination>
    </Layout>
  )
}

export default Index
