import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Simeon Herbert — Agile Delivery Consultant London',
  description: 'Practical thinking on agile delivery, team health, flow metrics, and leadership from Simeon Herbert.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogIndex() {
  const posts = await getAllPosts()

  return (
    <>
      <h1 className="page-title">Blog</h1>
      <p className="page-subtitle">Practical thinking on agile delivery, team health, and flow.</p>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <a href={`/${post.slug}`}>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-date">{formatDate(post.published_date)}</p>
              {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
