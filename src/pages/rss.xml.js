import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts.ts";

// Generates /rss.xml — lets readers subscribe in any feed reader, and lets
// aggregators pick up new tutorials automatically.
export async function GET(context) {
  const tutorials = (await getCollection("tutorials")).filter((t) => !t.data.draft);
  return rss({
    title: `${SITE_TITLE} — Tutorials`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: tutorials
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((t) => ({
        title: t.data.title,
        description: t.data.description,
        pubDate: t.data.pubDate,
        categories: [t.data.category, ...t.data.tags],
        link: `/tutorials/${t.id}/`,
      })),
  });
}
