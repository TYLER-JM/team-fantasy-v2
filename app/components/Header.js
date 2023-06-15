'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header() {
  const {data: session} = useSession()

  if (session) {
    return (
      <nav className='relative flex flex-col w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start'>
        <div className='flex w-full flex-wrap items-center justify-end px-3'>
          <div className='px-3'>
            <span>{session.user.username}</span>
          </div>
          <div className='px-3'>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row w-full sm:divide-x  justify-around'>
          <span className='grow sm:text-center'><Link href="/predictions/list">Prediction History</Link></span>
          <span className='grow sm:text-center'><Link href="/predictions/create">Upcoming Games (make predictions)</Link></span>
          <span className='grow sm:text-center'><Link href="/standings">Standings</Link></span>
          <span className='grow sm:text-center'><Link href="/">Dashboard</Link></span>
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
