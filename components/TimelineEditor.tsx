"use client"

import { useRef, useState } from 'react'
import { TimelineEvent } from '@/lib/types'

type Props = {
  events: TimelineEvent[]
  onAdd: (e: Omit<TimelineEvent,'id'>) => void
  onUpdate: (id: string, patch: Partial<TimelineEvent>) => void
  onDelete: (id: string) => void
}

export default function TimelineEditor({ events, onAdd, onUpdate, onDelete }: Props) {
  const [draft, setDraft] = useState<Omit<TimelineEvent,'id'>>({ date: '', title: '', description: '', imageDataUrl: undefined })
  const fileRef = useRef<HTMLInputElement>(null)

  const readFile = (file: File) => new Promise<string>((resolve) => { const r = new FileReader(); r.onload = ()=>resolve(r.result as string); r.readAsDataURL(file); })

  return (
    <div className="grid gap-4">
      <div className="card p-4 grid md:grid-cols-4 gap-3 items-end">
        <div>
          <label className="label">Date</label>
          <input type="date" className="input" value={draft.date} onChange={e=>setDraft({ ...draft, date: e.target.value })} />
        </div>
        <div>
          <label className="label">Title</label>
          <input className="input" value={draft.title} onChange={e=>setDraft({ ...draft, title: e.target.value })} />
        </div>
        <div>
          <label className="label">Notes</label>
          <input className="input" value={draft.description} onChange={e=>setDraft({ ...draft, description: e.target.value })} />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={() => fileRef.current?.click()}>Image</button>
          <button className="btn-primary" onClick={() => { onAdd(draft); setDraft({ date: '', title: '', description: '' }) }}>Add</button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e)=>{
            const f = e.target.files?.[0]; if (!f) return; const data = await readFile(f); setDraft({ ...draft, imageDataUrl: data })
          }} />
        </div>
      </div>

      <div className="grid gap-3">
        {events.sort((a,b)=>a.date.localeCompare(b.date)).map(ev => (
          <div key={ev.id} className="card p-4 grid md:grid-cols-[120px_1fr_auto] gap-4 items-start">
            <div className="text-sm text-gray-600">{ev.date}</div>
            <div>
              <div className="font-medium">{ev.title}</div>
              <div className="text-gray-700 text-sm">{ev.description}</div>
              {ev.imageDataUrl && <img src={ev.imageDataUrl} alt="event" className="mt-2 h-24 rounded" />}
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={()=>onUpdate(ev.id, { title: prompt('Title', ev.title) || ev.title })}>Edit</button>
              <button className="btn-secondary" onClick={()=>onDelete(ev.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
