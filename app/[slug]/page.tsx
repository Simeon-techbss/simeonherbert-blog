import { getPost, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Simeon Herbert`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_date,
      authors: ['Simeon Herbert'],
      url: `https://blog.simeonherbert.com/${post.slug}`,
    },
    alternates: {
      canonical: `https://blog.simeonherbert.com/${post.slug}`,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const paragraphs = post.content.split('\n').filter(p => p.trim())

  return (
    <article>
      <header className="article-header">
        <h1 className="article-title">{post.title}</h1>
        <p className="article-meta">
          <span>{formatDate(post.published_date)}</span> &nbsp;·&nbsp; Simeon Herbert
        </p>
      </header>

      <div className="article-body">
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <hr className="article-divider" />

      <div className="author-box">
        <p className="author-name">Simeon Herbert</p>
        <p className="author-bio">
          Agile delivery coach and consultant based in London. Helping teams flow better and
          leaders understand what&apos;s actually happening.
        </p>
        <a href="https://simeonherbert.com" className="author-link">Visit simeonherbert.com</a>
      </div>

      <a href="/" className="back-link">← All posts</a>
    </article>
  )
}
