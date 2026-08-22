import type { MetadataRoute } from "next";

const base = "https://cyberscope.dev";

// Single Next route (`/`) drives a hash-based client router.
// We declare the canonical landing URL plus the hash routes users can reach.
const hashRoutes = [
  "",
  "#/download",
  "#/releases",
  "#/updates",
  "#/architecture",
  "#/docs",
  "#/security",
  "#/system",
  "#/about",
  "#/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return hashRoutes.map((hash) => ({
    url: `${base}/${hash}`,
    lastModified: now,
    changeFrequency: hash === "" ? "weekly" : "monthly",
    priority: hash === "" ? 1 : hash === "#/download" ? 0.9 : 0.6,
  }));
}
