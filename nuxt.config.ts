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
      theme: "github-dark",
      // Define languages you expect to use
      preload: [
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
        "ini",
        "c",
        "lua",
        "ruby",
        "perl",
        "swift",
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
});
