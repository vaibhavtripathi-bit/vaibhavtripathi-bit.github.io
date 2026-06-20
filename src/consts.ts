// ── Central site configuration ───────────────────────────────────────────────
// Everything that might change lives here, so you update it in ONE place.

// The canonical, public URL of the site. Used for SEO tags, sitemap, RSS, and
// social-share previews. This is the ONE line to change when you switch hosts:
//   GitHub Pages  -> "https://vaibhavtripathi-bit.github.io"
//   Cloudflare    -> "https://<your-project>.pages.dev"
//   Custom domain -> "https://yourdomain.com"
export const SITE_URL = "https://vaibhavtripathi-bit.github.io";

export const SITE_TITLE = "Vaibhav Tripathi";
export const SITE_TAGLINE = "Mobile engineering, in depth — and the craft around it";
export const SITE_DESCRIPTION =
  "Deep, production-grade tutorials on mobile (Android & iOS) plus architecture, systems, and programming fundamentals — from a Mobile Architect with 15+ years of experience.";

// ── Taxonomy: Category → Topic → Sub-topic ───────────────────────────────────
// This single tree drives the Browse mega-menu, the /topics/* pages, breadcrumbs,
// sitemap, and RSS. To grow the site, just edit this tree and tag articles with
// matching `category` / `topic` / `subtopic` in their frontmatter.
//
// Levels with no published articles are hidden automatically (no "ghost town").
export const TAXONOMY = [
  {
    name: "Mobile",
    topics: [
      { name: "Android", subs: ["UI", "Performance", "Jetpack Compose", "Networking", "Testing"] },
      { name: "iOS", subs: ["SwiftUI", "Concurrency", "UIKit"] },
      { name: "Flutter", subs: ["Navigation", "Async", "State Management"] },
      { name: "Kotlin", subs: ["Coroutines", "Flow"] },
      { name: "Swift", subs: [] },
      { name: "Jetpack Compose", subs: [] },
      { name: "KMP", subs: [] },
    ],
  },
  {
    name: "Architecture",
    topics: [
      { name: "Clean Architecture", subs: [] },
      { name: "Design Patterns", subs: [] },
      { name: "Modularization", subs: [] },
    ],
  },
  {
    name: "Programming",
    topics: [
      { name: "Principles", subs: [] },
      { name: "Data Structures", subs: [] },
      { name: "Algorithms", subs: [] },
      { name: "Languages", subs: [] },
    ],
  },
  {
    name: "Systems",
    topics: [
      { name: "System Design", subs: [] },
      { name: "Performance", subs: [] },
      { name: "CI/CD", subs: [] },
    ],
  },
  {
    name: "Career",
    topics: [
      { name: "Interviews", subs: [] },
      { name: "Growth", subs: [] },
    ],
  },
  {
    name: "AI",
    topics: [
      { name: "Claude Code", subs: ["Workflow", "Configuration"] },
    ],
  },
] as const;

// Turn a display name into a URL slug, e.g. "Jetpack Compose" -> "jetpack-compose".
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

export const AUTHOR = {
  name: "Vaibhav Tripathi",
  email: "vaibhav.tripathime@gmail.com",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/vaibhav-tripathi-9231b21b7/",
  github: "https://github.com/vaibhavtripathi-bit",
};

// Cloudflare Web Analytics token. Leave empty until you create one in the
// Cloudflare dashboard (Analytics -> Web Analytics). When set, a tiny privacy-
// friendly tracking beacon is added automatically. No cookies, GDPR-friendly.
export const CLOUDFLARE_ANALYTICS_TOKEN = "";

// Google AdSense publisher ID, e.g. "ca-pub-1234567890123456". Leave empty.
// Ads stay completely dormant until you (a) have a custom domain, (b) get
// AdSense approval, and (c) paste your ID here.
export const ADSENSE_CLIENT_ID = "";
