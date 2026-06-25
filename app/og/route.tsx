import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Practical thinking on agile delivery'

  const fontSize = title.length > 80 ? 44 : title.length > 50 ? 52 : 60

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#131009',
          padding: '64px 72px',
        }}
      >
        {/* Gold rule */}
        <div style={{ width: '72px', height: '3px', backgroundColor: '#C9A84C', marginBottom: '48px', display: 'flex' }} />

        {/* Byline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <span style={{ color: '#C9A84C', fontSize: '22px', fontFamily: 'serif', fontWeight: 'bold' }}>
            Simeon Herbert
          </span>
          <span style={{ color: '#3A3020', fontSize: '22px' }}>·</span>
          <span style={{ color: '#5A5040', fontSize: '20px', fontFamily: 'serif' }}>
            blog.simeonherbert.com
          </span>
        </div>

        {/* Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              color: '#F5F1EA',
              fontSize: `${fontSize}px`,
              fontFamily: 'serif',
              fontWeight: 'bold',
              lineHeight: 1.25,
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '2px', backgroundColor: '#3A3020', display: 'flex' }} />
          <span style={{ color: '#4A4030', fontSize: '18px', fontFamily: 'serif' }}>
            Agile delivery · 35 years · No nonsense.
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
