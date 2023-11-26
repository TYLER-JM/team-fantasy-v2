'use client'

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

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
        <p className="p-1 text-left">This is your Dashboard page:</p>
        <p className="p-1 text-left">Check out which teams everyone picked from the <button className="px-1 rounded text-stone-200 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"><Link href="/roster">Rosters</Link></button> page.</p>
        <p className="p-1 text-left">View your teams&apos; <button className="px-1 rounded text-stone-200 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"><Link href="/predictions/create">Upcoming Games</Link></button> and make predictions.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Hello!</h1>
      <p>Please <button className="px-1 rounded text-stone-200 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700" onClick={() => signIn()}>Sign In</button> to make predictions and view the standings</p>
    </div>
  )
}