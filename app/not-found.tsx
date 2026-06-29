export default function NotFound() {
  return (
    <div className="article-wrap" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <p className="article-meta">
        <span className="article-meta-date">404</span>
      </p>
      <h1 className="article-title">Page not found</h1>
      <p style={{ color: '#64748b', marginTop: '1rem', lineHeight: '1.7' }}>
        That page doesn&apos;t exist. Maybe it moved, or maybe the link was wrong.
      </p>
      <a href="/" className="back-link" style={{ display: 'inline-block', marginTop: '2rem' }}>
        ← Back to the blog
      </a>
    </div>
  )
}
