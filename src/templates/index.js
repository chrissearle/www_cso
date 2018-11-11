import React from 'react'

import Layout from '../components/layout'

import { Link } from 'gatsby'

import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardTitle,
  CardFooter,
  CardImg,
} from 'reactstrap'

import TagsMap from '../components/tagsMap'
import Pagination from '../components/pagination'

import { displayDate } from '../functions'

const Index = ({ pageContext }) => {
  const { group, index, pageCount } = pageContext

  return (
    <Layout>
      {group.map(edge => {
        const post = edge.node

        const date = displayDate(post.frontmatter.date)

        const tags = post.frontmatter.tags && post.frontmatter.tags.split(/, */)

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
      <Pagination index={index} pageCount={pageCount} />
    </Layout>
  )
}

export default Index
