import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                tags: z.array(z.string()),
                image: z.string(),
                date: z.string(),
                category: z.string(),
                intro: z.string(),
                embedImage: z.string(),
                series: z.string(),
            })
        })
    }
})
