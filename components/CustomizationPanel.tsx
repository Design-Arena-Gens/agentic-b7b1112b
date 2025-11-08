"use client"

import { useRef } from 'react'
import { Customization } from '@/lib/types'

const fontOptions: Customization['font'][] = ['Inter', 'Georgia', 'Merriweather', 'System']

type Props = {
  value: Customization
  onChange: (patch: Partial<Customization>) => void
}

export default function CustomizationPanel({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  const onPickImage = async (file: File) => {
    const reader = new FileReader()
    return new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="card p-4 grid gap-3">
      <div>
        <label className="label">Book Title</label>
        <input className="input" value={value.title} onChange={e=>onChange({ title: e.target.value })} />
      </div>
      <div className="grid md:grid-cols-2 gap-3 items-end">
        <div>
          <label className="label">Font</label>
          <select className="input" value={value.font} onChange={e=>onChange({ font: e.target.value as any })}>
            {fontOptions.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Cover Image</label>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" onClick={() => fileRef.current?.click()}>Upload</button>
            {value.coverImageDataUrl && <span className="text-xs text-gray-600">Selected</span>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async (e)=>{
            const f = e.target.files?.[0]; if (!f) return; const data = await onPickImage(f); onChange({ coverImageDataUrl: data });
          }} />
        </div>
      </div>
      <div>
        <label className="label">Favorite Quotes (one per line)</label>
        <textarea className="input min-h-[120px]" value={value.favoriteQuotes.join('\n')} onChange={e=>onChange({ favoriteQuotes: e.target.value.split('\n').filter(Boolean) })} />
      </div>
    </div>
  )
}
