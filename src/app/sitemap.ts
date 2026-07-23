import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dividend-snowball-calc.vercel.app', // 추후 실제 도메인으로 변경
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}