import { getPost, getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

export const revalidate = 3600
export const dynamicParams = true

marked.use({ gfm: true, breaks: false })

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
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const htmlContent = await marked(post.content)

  return (
    <div className="article-wrap">
      <a href="/" className="back-link">← Back to blog</a>

      <p className="article-meta">
        <span className="article-meta-date">{formatDate(post.published_date)}</span>
        <span className="article-meta-sep">·</span>
        <span>Simeon Herbert</span>
      </p>

      <h1 className="article-title">{post.title}</h1>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <hr className="article-divider" />

      <div className="author-box">
        <p className="author-name">Simeon Herbert</p>
        <p className="author-bio">
          Agile delivery coach and consultant based in London. Helping teams flow better and
          leaders understand what&apos;s actually happening.
        </p>
        <a href="https://simeonherbert.com/contact" className="author-cta">
          Work with me →
        </a>
      </div>
    </div>
  )
}
