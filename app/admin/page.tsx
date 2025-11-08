"use client"

import { useAuthStore } from '@/lib/auth'
import { useDataStore } from '@/lib/dataStore'
import Link from 'next/link'

export default function AdminPage() {
  const { users, currentUser } = useAuthStore()
  const { dataByUserId, resetUserData } = useDataStore()

  if (!currentUser) return (
    <div className="card p-6">
      <p className="mb-4">Please sign in.</p>
      <Link href="/signin" className="btn-primary">Go to Sign In</Link>
    </div>
  )

  const entries = Object.entries(users)
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <Link href="/" className="btn-secondary">Home</Link>
      </div>

      <div className="card p-4">
        <h2 className="text-lg font-medium mb-3">Users</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Provider</th>
                <th className="py-2 pr-4">Data</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([id, user]) => (
                <tr key={id} className="border-b">
                  <td className="py-2 pr-4 font-mono text-xs">{id}</td>
                  <td className="py-2 pr-4">{user.email}</td>
                  <td className="py-2 pr-4">{user.provider}</td>
                  <td className="py-2 pr-4">{dataByUserId[id] ? 'Yes' : 'No'}</td>
                  <td className="py-2">
                    <button className="btn-secondary" onClick={()=>resetUserData(id)}>Reset Data</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">Demo admin: manages locally stored users and data.</p>
      </div>
    </div>
  )
}
