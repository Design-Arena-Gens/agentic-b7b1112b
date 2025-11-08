"use client"

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { currentUser, signInEmail, signInGoogle, loadFromStorage } = useAuthStore()

  useEffect(() => { loadFromStorage() }, [loadFromStorage])
  useEffect(() => { if (currentUser) router.replace('/builder') }, [currentUser, router])

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <label className="label">Email</label>
      <input className="input mb-3" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
      <label className="label">Password</label>
      <input type="password" className="input mb-4" value={password} onChange={e=>setPassword(e.target.value)} placeholder="????????"/>
      <div className="flex gap-3">
        <button className="btn-primary" onClick={() => signInEmail(email, password)}>Continue</button>
        <button className="btn-secondary" onClick={() => signInGoogle()}>Sign in with Google</button>
      </div>
      <p className="text-xs text-gray-500 mt-3">Demo auth: email/password stored locally; Google is simulated.</p>
    </div>
  )
}
