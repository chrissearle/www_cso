module.exports = {
  siteMetadata: {
    title: 'Chris Searle',
    description: 'Random thoughts on various things tech',
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
    `gatsby-plugin-react-helmet`,
  ],
}
