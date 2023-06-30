'use client'

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";


export default function Dashboard({flashMessage}) {
  const {data: session, status } = useSession()
  const [flash, setFlash] = useState(flashMessage)

  if (status === 'loading') {
    return (
      <h2>Loading...</h2>
    )
  }

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.username}!</h1>
        {flash !== undefined && <p>saved predictions: {flash} <span onClick={() => setFlash(undefined)}>[X]</span></p> }
        
        <p>this is your Dashboard page with all sorts of fun stuff to do.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Hello!</h1>
      <p>Please <button onClick={() => signIn()}>Sign In</button> to make predictions and view the standings</p>
    </div>
  )
}