import type { MetadataRoute } from "next";
import { checklists } from "@/lib/checklists";

const BASE = "https://cam-nang-han.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/cam-nang`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/khan-cap`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ban-do`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ung-dung`, changeFrequency: "monthly", priority: 0.7 },
    ...checklists.map((s) => ({
      url: `${BASE}/cam-nang/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
