import type { MetadataRoute } from "next";
import { getAllProducts } from "@/server/products/services";
import { getAllCareers } from "@/server/careers/services";
import { SITE_URL } from "@/lib/constants/metadataConstants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productsResult, careersResult] = await Promise.all([
    getAllProducts(),
    getAllCareers(),
  ]);

  const products = productsResult.data ?? [];
  const careers = careersResult.careers ?? [];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-us`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const careerPages: MetadataRoute.Sitemap = careers.map((career) => ({
    url: `${SITE_URL}/careers/${career.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...careerPages];
}
