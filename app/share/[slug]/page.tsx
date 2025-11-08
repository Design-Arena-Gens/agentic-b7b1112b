"use client"

import { decodeShare } from '@/lib/share'
import { notFound, useParams } from 'next/navigation'

export default function SharePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug as string)
  const data = decodeShare(slug)
  if (!data) return notFound()

  return (
    <article className="prose max-w-none">
      <h1>{data.customization.title}</h1>
      <p><strong>{data.personal.fullName}</strong> ? born {data.personal.dateOfBirth} in {data.personal.birthplace}</p>
      <h2>Background</h2>
      <p>{data.personal.background}</p>
      <h2>{data.childhood.title}</h2>
      <p>{data.childhood.content}</p>
      <h2>{data.education.title}</h2>
      <p>{data.education.content}</p>
      <h2>{data.career.title}</h2>
      <p>{data.career.content}</p>
      <h2>{data.family.title}</h2>
      <p>{data.family.content}</p>
      <h2>{data.challenges.title}</h2>
      <p>{data.challenges.content}</p>
      <h2>{data.dreams.title}</h2>
      <p>{data.dreams.content}</p>
      <h2>Timeline</h2>
      <ul>
        {data.timeline.sort((a,b)=>a.date.localeCompare(b.date)).map(ev => (
          <li key={ev.id}><strong>{ev.date}</strong> ? {ev.title}: {ev.description}</li>
        ))}
      </ul>
    </article>
  )
}
