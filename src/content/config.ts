import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'data',
  schema: ({ image }) => z.array(z.object({
    name: z.string(),
    year: z.number(),
    description: z.string(),
    source_code: z.string().url().nullable(),
    project_url: z.string().nullable(),
    category: z.enum(['project', 'website', 'talk'])
  }))
});

export const collections = {
  projects
};
