"use client"

import { useAuthStore } from '@/lib/auth'
import { useDataStore } from '@/lib/dataStore'
import { exportPDF, exportDOCX } from '@/lib/exporters'
import { encodeShare } from '@/lib/share'
import Link from 'next/link'

export default function ExportPage() {
  const { currentUser } = useAuthStore()
  const { getForUser } = useDataStore()

  if (!currentUser) return (
    <div className="card p-6">
      <p className="mb-4">Please sign in.</p>
      <Link href="/signin" className="btn-primary">Go to Sign In</Link>
    </div>
  )

  const data = getForUser(currentUser.id)
  const shareSlug = encodeShare(data)
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${shareSlug}` : ''

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Export & Share</h1>
        <Link href="/builder" className="btn-secondary">Back to Builder</Link>
      </div>

      <div className="card p-4 grid md:grid-cols-3 gap-4">
        <button className="btn-primary" onClick={()=>exportPDF(data)}>Download PDF</button>
        <button className="btn-secondary" onClick={()=>exportDOCX(data)}>Download DOCX</button>
        <a className="btn-secondary text-center" href={shareUrl} target="_blank" rel="noreferrer">Open Shareable Link</a>
      </div>

      <div className="card p-4">
        <label className="label">Shareable URL</label>
        <input readOnly className="input" value={shareUrl} onFocus={(e)=>e.currentTarget.select()} />
        <p className="text-xs text-gray-500 mt-2">The link encodes your content client-side; no server storage required.</p>
      </div>
    </div>
  )
}
