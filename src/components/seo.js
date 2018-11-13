import React from 'react'

import { StaticQuery, graphql } from 'gatsby'

import Helmet from 'react-helmet'

const SEO = ({ data }) => {
  const siteMetadata = data.site.siteMetadata

  const image = siteMetadata.siteUrl + '/logo.png'

  return (
    <Helmet>
      <meta name="description" content={siteMetadata.title} />
      <meta name="image" content={image} />

      <meta property="og:url" content={siteMetadata.siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteMetadata.title} />
      <meta property="og:description" content={siteMetadata.description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />
    </Helmet>
  )
}

const WrappedSEO = () => {
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
      render={data => <SEO data={data} />}
    />
  )
}

export default WrappedSEO
