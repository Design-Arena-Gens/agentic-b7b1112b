"use client"

import { Section } from '@/lib/types'

type Props = {
  section: Section
  onChange: (patch: Partial<Section>) => void
}

export default function SectionEditor({ section, onChange }: Props) {
  return (
    <div className="card p-4">
      <label className="label">Section Title</label>
      <input className="input mb-3" value={section.title} onChange={e=>onChange({ title: e.target.value })} />
      <label className="label">Content</label>
      <textarea className="input min-h-[140px]" value={section.content} onChange={e=>onChange({ content: e.target.value })} />
    </div>
  )
}
