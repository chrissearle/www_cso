module.exports = {
  siteMetadata: {
    title: 'Chris Searle',
    description: 'Random thoughts on various things tech',
    siteUrl: `https://www.chrissearle.org`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-2221544-1',
        head: false,
        anonymize: false,
        respectDNT: true,
      },
    },
    `gatsby-plugin-polyfill-io`,
    `gatsby-plugin-sitemap`,
  ],
}
