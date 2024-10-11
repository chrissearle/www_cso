// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: {
        compatibilityVersion: 4,
    },
    devtools: {enabled: true},
    modules: [
      'vuetify-nuxt-module',
      '@nuxt/content',
      "@nuxt/image",
      "@nuxtjs/sitemap",
      "nuxt-disqus"
    ],
    vuetify: {
        moduleOptions: {
            /* module specific options */
        },
        vuetifyOptions: {
            theme: {
                defaultTheme: 'dark'
            }
        }
    },
    site: {
        url: 'https://www.chrissearle.org',
        name: 'Chris Searle',
        trailingSlash: true
    },
    ssr: false,
    content: {
        highlight: {
            theme: "github-dark",
            // Define languages you expect to use
            langs: [
                "diff",
                "ts",
                "js",
                "css",
                "java",
                "groovy",
                "sql",
                "xml",
                "json",
                "kotlin",
                "scala",
                "c",
                "cpp",
                "lua",
                "ruby",
                "perl",
                "swift",
                "ini",
                "shell",
                "yaml",
                "log",
                "ini",
            ],
        },
        markdown: {
            rehypePlugins: [
                [
                    "rehype-external-links",
                    {
                        target: "_blank",
                        rel: "noopener noreferer nofollow",
                    }
                ],
            ],
        },
        experimental: {
            clientDB: true
        },
        respectPathCase: true
    },
    sitemap: {
        strictNuxtContentPaths: true
    },
    disqus: {
        shortname: "searle",
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/']
        }
    },
    experimental: {
        defaults: {
            nuxtLink: {
                trailingSlash: "append"
            }
        }
    }
})