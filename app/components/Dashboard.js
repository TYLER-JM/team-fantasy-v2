'use client'

import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
  const {data: session } = useSession()

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user.username}!</h1>
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