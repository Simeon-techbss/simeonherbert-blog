'use client'

import { useState } from 'react'
import type { BlogPost } from '@/lib/blog'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? posts.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(query.toLowerCase())
      )
    : posts

  return (
    <>
      <div className="search-wrap">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          type="search"
          className="search-input"
          placeholder="Search posts..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <p className="search-empty">No posts match &ldquo;{query}&rdquo;</p>
      )}

      <ul className="post-list">
        {filtered.map(post => (
          <li key={post.id} className="post-card">
            <a href={`/${post.slug}`}>
              {post.image_url && (
                <div className="post-card-img-wrap">
                  <img src={post.image_url} alt="" className="post-card-img" />
                </div>
              )}
              <div className="post-card-body">
                <p className="post-date">{formatDate(post.published_date)} · Simeon Herbert</p>
                <h2 className="post-title">{post.title}</h2>
                {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
                <p className="post-read-more">Read {post.title} →</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
