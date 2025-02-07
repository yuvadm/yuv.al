import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
const projectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.number(),
  description: z.string(),
  source_code: z.string().url().nullable(),
  project_url: z.string().nullable(),
  category: z.enum(['project', 'website', 'talk'])
});

export const collections = {
  'projects': defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: projectsSchema
  })
};