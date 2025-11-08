"use client"

import Link from 'next/link'
import { useAuthStore } from '@/lib/auth'
import { useEffect } from 'react'

export default function HomePage() {
  const { currentUser, loadFromStorage } = useAuthStore()
  useEffect(() => { loadFromStorage() }, [loadFromStorage])

  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold mb-2">Welcome</h1>
          <p className="text-gray-600 mb-4">Build your life story step-by-step and generate a beautiful autobiography.</p>
          <div className="flex gap-3">
            <Link href={currentUser ? '/builder' : '/signin'} className="btn-primary">Get Started</Link>
            <Link href="/timeline" className="btn-secondary">View Timeline</Link>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Guided sections for your journey</li>
            <li>AI-generated drafts in multiple styles</li>
            <li>Timeline with images and notes</li>
            <li>Export PDF, DOCX, shareable links</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
