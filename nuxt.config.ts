export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  css: ["/assets/css/main.css"],
  ssr: true,
  experimental: {
    payloadExtraction: false,
  },
  router: {
    options: {
      strict: false,
    },
  },
  sourcemap: false,
  content: {
    highlight: {
      theme: "github-light",
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
        "lua",
        "ruby",
        "perl",
        "swift",
        "ini",
        "shell",
        "yaml",
      ],
    },
    markdown: {
      rehypePlugins: [
        [
          "rehype-external-links",
          {
            target: "_blank",
            rel: "noopener noreferer",
          },
        ],
      ],
    },
  },
  // currently generate isn't creating index.html - https://github.com/nuxt/nuxt/issues/28042
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
});
