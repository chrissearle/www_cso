import React from 'react'

import Layout from '../components/layout'

import { Link } from 'gatsby'

import _ from 'lodash'

import {
  Button,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap'

import moment from 'moment'

const Index = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? '/' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  console.log(previousUrl)

  const pages = _.range(2, pageCount + 1)

  return (
    <Layout>
      {group.map(edge => {
        const post = edge.node

        const date = moment(post.frontmatter.date, 'YYYY-MM-DD HH:mm Z').format(
          'YYYY-MM-DD'
        )

        const tags = post.frontmatter.tags && post.frontmatter.tags.split(/, */)

        return (
          <div key={`ex_${post.fields.path}`}>
            <Card className="mb-4">
              <CardHeader>
                Posted: {date}
                {tags &&
                  tags.map(tag => {
                    return (
                      <Button
                        key={`tag_${tag}_ex_${post.fields.path}`}
                        outline
                        color="info"
                        size="sm"
                        className="ml-2"
                      >
                        <Link to={`/tags/${tag}`}>{tag}</Link>
                      </Button>
                    )
                  })}
              </CardHeader>
              <CardBody>
                <CardTitle>
                  <Link to={post.fields.path}>{post.frontmatter.title}</Link>
                </CardTitle>
                <CardText>{post.excerpt}</CardText>
              </CardBody>
              <CardFooter>
                <Link to={post.fields.path}>Read full article</Link>
              </CardFooter>
            </Card>
          </div>
        )
      })}
      <Pagination listClassName="justify-content-center">
        <PaginationItem disabled={index <= 1}>
          <PaginationLink href={previousUrl}>&lt;</PaginationLink>
        </PaginationItem>
        <PaginationItem active={1 === index}>
          <PaginationLink href={'/'}>1</PaginationLink>
        </PaginationItem>
        {pages.map(page => {
          return (
            <PaginationItem active={page === index} key={`page_${page}`}>
              <PaginationLink href={page}>{page}</PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem disabled={index >= pageCount}>
          <PaginationLink href={nextUrl}>&gt;</PaginationLink>
        </PaginationItem>
      </Pagination>
    </Layout>
  )
}

export default Index
