import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://dividend-snowball-calc.vercel.app/sitemap.xml', // 추후 실제 도메인으로 변경
  }
}