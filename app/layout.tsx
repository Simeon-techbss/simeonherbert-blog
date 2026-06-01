import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog | Simeon Herbert',
  description: 'Practical thinking on agile delivery, team health, and flow from Simeon Herbert — Agile Delivery Consultant, London.',
  metadataBase: new URL('https://blog.simeonherbert.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="https://simeonherbert.com" className="header-logo">Simeon Herbert</a>
          <span className="header-sep">/</span>
          <a href="https://blog.simeonherbert.com" className="header-blog">Blog</a>
          <div className="header-spacer" />
          <a href="https://simeonherbert.com/#contact" className="header-cta">Work with me</a>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} Simeon Herbert &nbsp;·&nbsp;
          <a href="https://simeonherbert.com">simeonherbert.com</a>
        </footer>
      </body>
    </html>
  )
}
