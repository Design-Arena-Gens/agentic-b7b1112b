"use client"

import { PersonalInfo } from '@/lib/types'

type Props = {
  value: PersonalInfo
  onChange: (patch: Partial<PersonalInfo>) => void
}

export default function PersonalEditor({ value, onChange }: Props) {
  return (
    <div className="card p-4 grid gap-3">
      <div>
        <label className="label">Full Name</label>
        <input className="input" value={value.fullName} onChange={e=>onChange({ fullName: e.target.value })} />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="label">Date of Birth</label>
          <input type="date" className="input" value={value.dateOfBirth} onChange={e=>onChange({ dateOfBirth: e.target.value })} />
        </div>
        <div>
          <label className="label">Birthplace</label>
          <input className="input" value={value.birthplace} onChange={e=>onChange({ birthplace: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="label">Background</label>
        <textarea className="input min-h-[120px]" value={value.background} onChange={e=>onChange({ background: e.target.value })} />
      </div>
    </div>
  )
}
