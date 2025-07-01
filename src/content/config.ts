import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  year_started: z.number(),
  year_ended: z.number(),
  description: z.string(),
  source_code: z.string().url().nullable(),
  project_url: z.string().nullable(),
  category: z.enum(['project', 'website', 'talk']),
  tags: z.array(z.string()),
  image: z.string().nullable().optional()
});

const blogSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional().default(false),
  tags: z.array(z.string()).nullable().optional().default([]),
});

const pagesSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export const collections = {
  'projects': defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
    schema: projectsSchema
  }),
  'blog': defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
  'pages': defineCollection({ schema: pagesSchema }),
};