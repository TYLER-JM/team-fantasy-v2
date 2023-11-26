'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Header() {
  const {data: session, status} = useSession()

  if (status === 'loading') {
    return (
      <nav className='relative flex flex-col w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start'>
        <div className='flex w-full flex-wrap items-center justify-end px-3'>
          <span>Loading...</span>
        </div>
      </nav>
    )
  }

  if (session) {
    return (
      <nav className='relative flex flex-col w-full items-center justify-between bg-white text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start'>
        <div className='flex w-full flex-wrap items-center justify-end py-1'>
          <div className='px-3'>
            <button className="px-1 rounded box-border border border-indigo-700 hover:text-stone-200 active:bg-indigo-700 hover:bg-indigo-700 active:bg-indigo-700"><Link href="/">{session.user.username}</Link></button>
          </div>
          <div className='px-3'>
            <button className="px-1 rounded text-stone-200 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700" onClick={() => signOut()}>Sign Out</button>
          </div>
        </div>
        <div className='flex flex-col md:flex-row w-full  justify-around'>
          <span className='pl-1 border-t-2 border-l-2 border-slate-200 grow sm:text-center'><Link href="/predictions/list/1">Prediction History</Link></span>
          <span className='pl-1 border-t-2 border-l-2 border-slate-200 grow sm:text-center'><Link href="/predictions/create">Upcoming Games (make predictions)</Link></span>
          <span className='pl-1 border-t-2 border-l-2 border-slate-200 grow sm:text-center'><Link href="/standings">Standings</Link></span>
          <span className='pl-1 border-t-2 border-l-2 border-slate-200 grow sm:text-center'><Link href="/roster">Rosters</Link></span>
        </div>
      </nav>
    )
  }
  return (
    <nav className='relative flex flex-col w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start'>
      <div className='flex w-full flex-wrap items-center justify-end px-3'>
        <span className='px-1'>Not signed in</span>
        <button className="px-1 rounded text-stone-200 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700" onClick={() => signIn()}>Sign In</button>
      </div>
    </nav>
  )
}
