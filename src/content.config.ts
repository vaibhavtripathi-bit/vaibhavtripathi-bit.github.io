import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The "tutorials" collection. Every .md / .mdx file under src/content/tutorials
// is loaded here. The `schema` is a contract: if a tutorial is missing a title
// or has a malformed date, the build FAILS loudly instead of shipping broken
// pages. This is one of Astro's best features for a content site.
const tutorials = defineCollection({
  loader: glob({ base: "./src/content/tutorials", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Taxonomy (must match names in TAXONOMY in consts.ts):
    //   category = domain   e.g. "Mobile"
    //   topic    = area      e.g. "Android"
    //   subtopic = optional  e.g. "Performance"
    category: z.string(),
    topic: z.string(),
    subtopic: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Optional hero image path (relative to /public), used in social previews.
    heroImage: z.string().optional(),
    // Set to true to hide a work-in-progress article from listings & sitemap.
    draft: z.boolean().default(false),
  }),
});

export const collections = { tutorials };
