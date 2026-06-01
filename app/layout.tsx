import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog | Simeon Herbert',
  description: 'Practical thinking on agile delivery, team health, and flow from Simeon Herbert — Agile Delivery Consultant, London.',
  metadataBase: new URL('https://blog.simeonherbert.com'),
}

const NAV = [
  { label: 'Home', href: 'https://simeonherbert.com/' },
  { label: 'About', href: 'https://simeonherbert.com/about' },
  { label: 'Portfolio', href: 'https://simeonherbert.com/portfolio' },
  { label: 'Testimonials', href: 'https://simeonherbert.com/testimonials' },
  { label: 'Blog', href: 'https://simeonherbert.com/blog' },
  { label: 'Contact', href: 'https://simeonherbert.com/contact' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="https://simeonherbert.com" className="header-logo-link">
            <img
              src="https://simeonherbert.com/assets/logo-sh-BJwnzKGM.png"
              alt="Simeon Herbert"
              className="header-logo"
            />
          </a>
          <nav className="header-nav">
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <p className="footer-name">Simeon Herbert</p>
              <p className="footer-tagline">Delivery consultant. 35+ years. 70+ teams. No nonsense.</p>
            </div>
            <ul className="footer-links">
              {NAV.map(({ label, href }) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Simeon Herbert</p>
        </footer>
      </body>
    </html>
  )
}
