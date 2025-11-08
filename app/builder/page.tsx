"use client"

import { useAuthStore } from '@/lib/auth'
import { useDataStore } from '@/lib/dataStore'
import PersonalEditor from '@/components/PersonalEditor'
import SectionEditor from '@/components/SectionEditor'
import CustomizationPanel from '@/components/CustomizationPanel'
import RichEditor from '@/components/RichEditor'
import { generateStory } from '@/lib/generator'
import { StoryStyle } from '@/lib/types'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export default function BuilderPage() {
  const { currentUser, loadFromStorage, signOut } = useAuthStore()
  const { getForUser, updateForUser } = useDataStore()
  const userId = currentUser?.id
  const data = useMemo(()=> userId ? getForUser(userId) : null, [getForUser, userId])
  const [style, setStyle] = useState<StoryStyle>('Emotional')

  useEffect(()=>{ loadFromStorage() }, [loadFromStorage])

  if (!currentUser) return (
    <div className="card p-6">
      <p className="mb-4">Please sign in to build your autobiography.</p>
      <Link href="/signin" className="btn-primary">Go to Sign In</Link>
    </div>
  )

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Builder</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-600">{currentUser.email}</span>
          <button className="btn-secondary" onClick={signOut}>Sign out</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid gap-6">
          <PersonalEditor value={data!.personal} onChange={(p)=>updateForUser(userId!, { personal: { ...data!.personal, ...p } })} />
          <SectionEditor section={data!.childhood} onChange={(p)=>updateForUser(userId!, { childhood: { ...data!.childhood, ...p } })} />
          <SectionEditor section={data!.education} onChange={(p)=>updateForUser(userId!, { education: { ...data!.education, ...p } })} />
          <SectionEditor section={data!.career} onChange={(p)=>updateForUser(userId!, { career: { ...data!.career, ...p } })} />
          <SectionEditor section={data!.family} onChange={(p)=>updateForUser(userId!, { family: { ...data!.family, ...p } })} />
          <SectionEditor section={data!.challenges} onChange={(p)=>updateForUser(userId!, { challenges: { ...data!.challenges, ...p } })} />
          <SectionEditor section={data!.dreams} onChange={(p)=>updateForUser(userId!, { dreams: { ...data!.dreams, ...p } })} />

          <div className="card p-4 grid gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Story Generator</h2>
              <div className="flex items-center gap-2">
                <label className="label m-0">Style</label>
                <select className="input" value={style} onChange={e=>setStyle(e.target.value as StoryStyle)}>
                  {(['Emotional', 'Professional', 'Simple', 'Poetic'] as StoryStyle[]).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn-primary" onClick={async ()=>{
                  const text = await generateStory(data!, style)
                  updateForUser(userId!, { generatedDraft: text })
                }}>Generate</button>
              </div>
            </div>
            <RichEditor value={data!.generatedDraft || ''} onChange={(v)=>updateForUser(userId!, { generatedDraft: v })} />
          </div>
        </div>

        <div className="grid gap-6">
          <CustomizationPanel value={data!.customization} onChange={(p)=>updateForUser(userId!, { customization: { ...data!.customization, ...p } })} />
          <div className="card p-4 grid gap-2">
            <h3 className="font-medium mb-1">Next steps</h3>
            <Link className="btn-secondary" href="/timeline">Manage Timeline</Link>
            <Link className="btn-secondary" href="/export">Export & Share</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
