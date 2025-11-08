"use client"

import { useAuthStore } from '@/lib/auth'
import { useDataStore } from '@/lib/dataStore'
import TimelineEditor from '@/components/TimelineEditor'
import Link from 'next/link'

export default function TimelinePage() {
  const { currentUser } = useAuthStore()
  const { getForUser, addTimelineEvent, updateTimelineEvent, removeTimelineEvent } = useDataStore()
  if (!currentUser) return (
    <div className="card p-6">
      <p className="mb-4">Please sign in.</p>
      <Link href="/signin" className="btn-primary">Go to Sign In</Link>
    </div>
  )
  const data = getForUser(currentUser.id)

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Timeline</h1>
        <Link href="/builder" className="btn-secondary">Back to Builder</Link>
      </div>
      <TimelineEditor
        events={data.timeline}
        onAdd={(e)=>addTimelineEvent(currentUser.id, e)}
        onUpdate={(id, p)=>updateTimelineEvent(currentUser.id, id, p)}
        onDelete={(id)=>removeTimelineEvent(currentUser.id, id)}
      />
    </div>
  )
}
