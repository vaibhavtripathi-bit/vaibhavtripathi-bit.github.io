# Vaibhav Tripathi — Portfolio & Tutorials

Personal site + tutorial platform, built with [Astro](https://astro.build).
Portfolio homepage plus a growing library of mobile-engineering tutorials, with
built-in SEO, sitemap, RSS, and dormant hooks for analytics and ads.

## Quick start (local preview)

```bash
npm install        # one time — downloads dependencies into node_modules/
npm run dev        # start a live preview at http://localhost:4321
npm run build      # produce the production site into dist/
npm run preview    # preview the production build locally
```

`npm run dev` hot-reloads: edit a file, the browser updates instantly.

## Writing a new tutorial

1. Create a Markdown file in `src/content/tutorials/`, e.g. `kotlin-flows-101.md`.
2. Start it with frontmatter (the metadata block between `---` lines):

   ```markdown
   ---
   title: "Understanding Kotlin Flows"
   description: "A one-line summary used in listings and Google results."
   pubDate: 2026-06-10
   category: "Kotlin"          # groups it under /tutorials/category/kotlin
   tags: ["Kotlin", "Coroutines"]
   draft: false                 # set true to hide while writing
   ---

   Your article body in **Markdown** goes here.
   ```

3. Write the body in Markdown. Code blocks get automatic syntax highlighting.
4. Save. The tutorials listing, category pages, sitemap, and RSS update themselves.

That's it — no HTML, no manual lists to maintain.

## Configuration — `src/consts.ts`

One file controls everything that changes:

| Setting | What it does |
| --- | --- |
| `SITE_URL` | The public URL. **Change this one line** when you move hosts or add a domain. |
| `CLOUDFLARE_ANALYTICS_TOKEN` | Paste your token to turn on privacy-friendly analytics. |
| `ADSENSE_CLIENT_ID` | Paste your AdSense ID to activate ads (needs a custom domain + approval first). |

## Deploying

Two supported paths (pick one):

### Option A — Cloudflare Pages (recommended)
1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings: **Build command** `npm run build`, **Output directory** `dist`.
4. Cloudflare builds on every push and serves it on a fast global CDN.
   You get a `*.pages.dev` URL; attach a custom domain later under **Custom domains**.

### Option B — GitHub Pages
The included workflow at `.github/workflows/deploy.yml` builds and publishes on every
push to `main`. Enable it once: **repo Settings → Pages → Source: GitHub Actions**.

> If you use Cloudflare Pages, you can delete `.github/workflows/deploy.yml` to avoid
> double-publishing (or keep it as a backup).

## Project structure

```
src/
  consts.ts                  # central config (URL, analytics, ads)
  content.config.ts          # tutorial schema (validated at build time)
  content/tutorials/*.md     # your tutorials — add files here
  layouts/BaseLayout.astro   # master page template
  components/                # BaseHead (SEO), Header, Footer
  pages/
    index.astro              # portfolio homepage
    tutorials/               # listing, article template, category pages
    rss.xml.js               # RSS feed generator
public/                      # static files served as-is (images, PDF, favicon, robots.txt)
```

The downloadable resume lives at `public/assets/Vaibhav_Tripathi_Mobile_Architect.pdf`.
