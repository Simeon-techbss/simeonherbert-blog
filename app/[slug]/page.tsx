import { getPost, getAllPosts, checkPostExists } from '@/lib/blog'
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
    description: (post.excerpt && post.excerpt.length >= 100)
      ? post.excerpt
      : (post.excerpt || post.content || '').replace(/‌/g, '').slice(0, 200),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_date,
      authors: ['Simeon Herbert'],
      url: `https://blog.simeonherbert.com/${post.slug}`,
      images: [post.image_url
        ? { url: post.image_url, width: 1200, height: 630, alt: post.title }
        : { url: `/og?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630, alt: post.title }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [post.image_url || `/og?title=${encodeURIComponent(post.title)}`],
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

  if (!post) {
    const exists = await checkPostExists(slug)
    if (exists) {
      return (
        <div className="article-wrap">
          <a href="/" className="back-link">← Back to blog</a>
          <p className="article-meta" style={{ marginTop: '2rem' }}>
            <span className="article-meta-date">Coming soon</span>
          </p>
          <h1 className="article-title">We&apos;re just applying the finishing touches</h1>
          <p style={{ color: '#64748b', marginTop: '1rem', lineHeight: '1.7' }}>
            This post is nearly ready. Check back soon — it won&apos;t be long.
          </p>
          <a href="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem' }}>
            ← See all posts
          </a>
        </div>
      )
    }
    notFound()
  }

  const cleanedContent = post.content
    .replace(/‌/g, '')
    .replace(/(?<!\(|")\b([a-z][a-z0-9-]*\.[a-z]{2,}\/\S+)/gi, (url) => `[${url}](https://${url})`)
  const htmlContent = await marked(cleanedContent)

  return (
    <div className="article-wrap">
      <a href="/" className="back-link">← Back to blog</a>

      <p className="article-meta">
        <span className="article-meta-date">{formatDate(post.published_date)}</span>
        <span className="article-meta-sep">·</span>
        <span>Simeon Herbert</span>
      </p>

      <h1 className="article-title">{post.title}</h1>

      {post.image_url && (
        <img src={post.image_url} alt="" className="article-hero-img" />
      )}

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
