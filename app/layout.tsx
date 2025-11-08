import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autobiography Data Builder',
  description: 'Collect, organize, and generate your life story',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b bg-white">
          <div className="container-page flex items-center justify-between py-3">
            <Link href="/" className="font-semibold">Autobiography Data Builder</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/builder">Builder</Link>
              <Link href="/timeline">Timeline</Link>
              <Link href="/export">Export</Link>
              <Link href="/admin">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container-page py-8">{children}</main>
        <footer className="border-t bg-white mt-10">
          <div className="container-page py-6 text-sm text-gray-500">? {new Date().getFullYear()} Autobiography Data Builder</div>
        </footer>
      </body>
    </html>
  )
}
