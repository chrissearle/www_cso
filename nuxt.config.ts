// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-28",
    devtools: {enabled: true},
    modules: [
        'vuetify-nuxt-module',
        '@nuxt/content',
        "@nuxt/image",
        "nuxt-disqus",
        "@nuxtjs/seo",
        "nuxt-gtag",
        "@nuxt/scripts"
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
    ssr: true,
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
        respectPathCase: true,
        contentHead: false
    },
    sitemap: {},
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
    },
    gtag: {
        id: 'G-MFFN7PQDM8'
    }
})
