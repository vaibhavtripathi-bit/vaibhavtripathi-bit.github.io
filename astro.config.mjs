// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
  // `site` powers absolute URLs in the sitemap, RSS feed, and canonical/OG tags.
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  markdown: {
    // Syntax highlighting theme for code blocks in tutorials.
    shikiConfig: {
      theme: "github-dark",
      wrap: true,
    },
  },
});
