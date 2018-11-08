import React from 'react'

import { Link } from 'gatsby'

import Layout from '../components/layout'

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext

  return (
    <Layout>
      Posts about {`${tagName}`}
      <div>
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <Link to={post.fields.path}>{post.frontmatter.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default SingleTagTemplate
