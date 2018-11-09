const path = require('path')
const moment = require('moment')
const createPaginatedPages = require('gatsby-paginate')

const pathFromFile = file => {
  return file.replace(
    /.*\/src\/blog\/(\d{4})\/(\d{2})\/(\d{2})-(.*).md/,
    '/$1/$2/$3/$4/'.toLowerCase()
  )
}

const createYearPages = (createPage, posts) => {
  const allYearsTemplate = path.resolve('src/templates/allYearsIndex.js')
  const singleYearTemplate = path.resolve('src/templates/singleYearIndex.js')

  const postsByYear = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.date) {
      const year = moment(node.frontmatter.date, 'YYYY-MM-DD HH:mm Z').year()

      if (!postsByYear[year]) {
        postsByYear[year] = []
      }

      postsByYear[year].push(node)
    }
  })

  const years = Object.keys(postsByYear)

  const yearsWithCounts = {}

  years.forEach(year => {
    const posts = postsByYear[year]

    yearsWithCounts[year] = posts.length

    createPage({
      path: `/years/${year}`,
      component: singleYearTemplate,
      context: {
        posts,
        year,
      },
    })
  })

  createPage({
    path: '/years',
    component: allYearsTemplate,
    context: {
      years: yearsWithCounts,
    },
  })
}

const createTagPages = (createPage, posts) => {
  const allTagsTemplate = path.resolve('src/templates/allTagsIndex.js')
  const singleTagTemplate = path.resolve('src/templates/singleTagIndex.js')

  const postsByTag = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      const tags = node.frontmatter.tags.split(/, */)

      tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = []
        }

        postsByTag[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  const tagsWithCounts = {}

  tags.forEach(tagName => {
    const posts = postsByTag[tagName]

    tagsWithCounts[tagName] = posts.length

    createPage({
      path: `/tags/${tagName}`,
      component: singleTagTemplate,
      context: {
        posts,
        tagName,
      },
    })
  })

  createPage({
    path: '/tags',
    component: allTagsTemplate,
    context: {
      tags: tagsWithCounts,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent)

    createNodeField({
      node,
      name: 'collection',
      value: parent.sourceInstanceName,
    })

    createNodeField({
      node,
      name: 'path',
      value: pathFromFile(node.fileAbsolutePath),
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve('src/templates/blogPost.js')

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              filter: { fields: { collection: { eq: "blog" } } }
            ) {
              edges {
                node {
                  fields {
                    path
                  }
                  frontmatter {
                    title
                    tags
                    date
                    image {
                      publicURL
                    }
                  }
                  excerpt(pruneLength: 200)
                }
              }
            }
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges

        createPaginatedPages({
          edges: posts,
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 20,
        })

        createTagPages(createPage, posts)
        createYearPages(createPage, posts)

        posts.forEach(({ node }, index) => {
          const path = node.fields.path

          createPage({
            path,
            component: blogTemplate,
            context: {
              pathSlug: path,
              next: index === 0 ? null : posts[index - 1].node,
              prev: index === posts.length - 1 ? null : posts[index + 1].node,
            },
          })

          resolve()
        })
      })
    )
  })
}
