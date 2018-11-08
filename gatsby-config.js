module.exports = {
  siteMetadata: {
    title: 'Chris Searle',
    description: '...',
    siteUrl: `https://www.chrissearle.org`,
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
  ],
}
