import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/events"],
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: "https://www.clydefitness.co.ke/sitemap.xml",
    host: "https://www.clydefitness.co.ke",
  };
}
