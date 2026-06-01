import { getAllPosts } from '@/lib/blog'
import BlogIndex from './components/BlogIndex'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Simeon Herbert — Agile Delivery Consultant London',
  description: 'Practical thinking on agile delivery, team health, and flow metrics from Simeon Herbert.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return (
    <div className="blog-index">
      <p className="page-eyebrow">Simeon Herbert</p>
      <h1 className="page-title">Blog</h1>
      <BlogIndex posts={posts} />
    </div>
  )
}
