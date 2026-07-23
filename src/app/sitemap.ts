import { MetadataRoute } from 'next'
import { readFileSync } from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'

function pulseLastModified(): Date {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'income-pulse.json')
    const raw = readFileSync(filePath, 'utf-8')
    const json = JSON.parse(raw) as { updatedAt?: string }
    if (json.updatedAt) return new Date(json.updatedAt)
  } catch {
    // fall through
  }
  return new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData().map((post) => ({
    url: `https://yieldgrower.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: 'https://yieldgrower.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://yieldgrower.com/pulse',
      lastModified: pulseLastModified(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://yieldgrower.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://yieldgrower.com/fire',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/average',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/tax',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/compound',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/goal',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/cagr',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/inflation',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://yieldgrower.com/tools',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://yieldgrower.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...posts,
  ]
}
