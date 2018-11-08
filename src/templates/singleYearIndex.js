import React from 'react'

import { Link } from 'gatsby'

import Layout from '../components/layout'

const SingleYearTemplate = ({ data, pageContext }) => {
  const { posts, year } = pageContext

  return (
    <Layout>
      Posts from {`${year}`}
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

export default SingleYearTemplate
