import { defineContentConfig, defineCollection, z } from "@nuxt/content"
import { asSitemapCollection } from "@nuxtjs/sitemap/content"

const contentSchema = z.object({
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  date: z.string().optional(),
  category: z.string().optional(),
  intro: z.string().optional(),
  embedImage: z.string().optional(),
  series: z.string().optional(),
  sitemap: z.any().optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection(
      asSitemapCollection({
        type: "page",
        source: "**/*.md",
        schema: contentSchema,
      }),
    ),
  },
})
