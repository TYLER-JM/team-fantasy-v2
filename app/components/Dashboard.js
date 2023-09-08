'use client'

import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
  const {data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <h2>Loading...</h2>
    )
  }

  if (session) {
    return (
      <div className="rounded bg-white shadow-md">
        <h1 className="pt-1 bg-teal-500 rounded-t">Welcome, <span className="uppercase">{session.user.username}</span>!</h1>        
        <p className="p-1 text-left">This is your Dashboard page. There&apos;s not much here yet.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Hello!</h1>
      <p>Please <button className="px-1 rounded text-stone-200 bg-violet-500 hover:bg-violet-600 active:bg-violet-700" onClick={() => signIn()}>Sign In</button> to make predictions and view the standings</p>
    </div>
  )
}