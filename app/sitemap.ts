import { getAllPosts } from '@/lib/blog'
import type { MetadataRoute } from 'next'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    {
      url: 'https://blog.simeonherbert.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...posts.map(post => ({
      url: `https://blog.simeonherbert.com/${post.slug}`,
      lastModified: new Date(post.published_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
