export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
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
});
