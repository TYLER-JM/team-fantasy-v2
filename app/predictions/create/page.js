'use client'
import { useSession } from "next-auth/react"

 // use client so that we load the page, fetch some upcoming games, then we have a button that allows more games to be loaded

export default function PredictionsCreate() {
  const {data: session} = useSession({required: true})

  return (
    <main>
      

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        Predictions Create. You shouldn&apos;t be here without logging in
      </div>
    </main>
  )
}