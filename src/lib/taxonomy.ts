import { getCollection, type CollectionEntry } from "astro:content";
import { TAXONOMY, slugify } from "../consts.ts";

export type Tutorial = CollectionEntry<"tutorials">;

// All published tutorials (drafts excluded), newest first.
export async function getTutorials(): Promise<Tutorial[]> {
  return (await getCollection("tutorials"))
    .filter((t) => !t.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export interface SubNode { name: string; slug: string; count: number }
export interface TopicNode { name: string; slug: string; count: number; subs: SubNode[] }
export interface CatNode { name: string; slug: string; count: number; topics: TopicNode[] }

// Build the live menu tree from the taxonomy, keeping ONLY levels that have
// published articles. Counts roll up. Categories/topics/subs that appear in
// content but aren't in TAXONOMY are appended so nothing is ever lost.
export async function buildMenu(tutorials?: Tutorial[]): Promise<CatNode[]> {
  const all = tutorials ?? (await getTutorials());

  const countCat = (c: string) => all.filter((t) => t.data.category === c).length;
  const countTopic = (c: string, tp: string) =>
    all.filter((t) => t.data.category === c && t.data.topic === tp).length;
  const countSub = (c: string, tp: string, s: string) =>
    all.filter((t) => t.data.category === c && t.data.topic === tp && t.data.subtopic === s).length;

  const out: CatNode[] = [];

  // 1) Curated order from TAXONOMY.
  for (const cat of TAXONOMY) {
    const topics: TopicNode[] = [];
    for (const tp of cat.topics) {
      const subsInContent = [
        ...new Set(
          all
            .filter((t) => t.data.category === cat.name && t.data.topic === tp.name && t.data.subtopic)
            .map((t) => t.data.subtopic as string)
        ),
      ];
      // Curated subs (in order) that have content, then any uncurated ones.
      const subNames = [
        ...tp.subs.filter((s) => subsInContent.includes(s)),
        ...subsInContent.filter((s) => !tp.subs.includes(s as any)),
      ];
      const subs: SubNode[] = subNames.map((s) => ({
        name: s,
        slug: slugify(s),
        count: countSub(cat.name, tp.name, s),
      }));
      const count = countTopic(cat.name, tp.name);
      if (count > 0) topics.push({ name: tp.name, slug: slugify(tp.name), count, subs });
    }
    if (topics.length > 0) {
      out.push({ name: cat.name, slug: slugify(cat.name), count: countCat(cat.name), topics });
    }
  }

  return out;
}
