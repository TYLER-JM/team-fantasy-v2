'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header() {
  const {data: session} = useSession()

  if (session) {
    return (
      <nav >
        <div>
          <button
          >MENU</button>
          <div>
            <span>{session.user.username}</span>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
        <div>
          <ul>
            <li><Link href="/predictions/list">Prediction History</Link></li>
            <li><Link href="/predictions/create">Upcoming Games (make predictions)</Link></li>
            <li><Link href="/standings">Standings</Link></li>
            <li><Link href="/">Dashboard</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
  return (
    <nav>
      <div>
        <span>Not signed in</span>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    </nav>
  )
}
