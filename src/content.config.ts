import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './blog' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    text: z.string().optional(),
    slug: z.string().optional(),
    draft: z.boolean().optional(),
    unlist: z.boolean().optional(),
  }),
});

export const collections = { blog };
