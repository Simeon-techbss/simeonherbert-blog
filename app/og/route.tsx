import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Practical thinking on agile delivery'

  const fontSize = title.length > 80 ? 46 : title.length > 50 ? 54 : 62

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#131009',
        }}
      >
        {/* Gold header band */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#C9A84C',
            padding: '0 56px',
            height: '100px',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#131009', fontSize: '30px', fontWeight: 'bold', fontFamily: 'serif', letterSpacing: '1px' }}>
            SIMEON HERBERT
          </span>
          <span style={{ color: '#8A6820', fontSize: '24px', margin: '0 16px' }}>·</span>
          <span style={{ color: '#6A5010', fontSize: '22px', fontFamily: 'serif' }}>
            blog.simeonherbert.com
          </span>
        </div>

        {/* Title area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '40px 56px',
          }}
        >
          <div
            style={{
              color: '#F5F1EA',
              fontSize: `${fontSize}px`,
              fontFamily: 'serif',
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 56px 36px',
            gap: '16px',
          }}
        >
          <div style={{ width: '40px', height: '2px', backgroundColor: '#C9A84C', display: 'flex' }} />
          <span style={{ color: '#5A5040', fontSize: '20px', fontFamily: 'serif' }}>
            Agile delivery · 35 years · No nonsense.
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
