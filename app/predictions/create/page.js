'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

 // use client so that we load the page, fetch some upcoming games, then we have a button that allows more games to be loaded

export default function PredictionsCreate() {
  const {data: session} = useSession({required: true})
  const [day, setDay] = useState(0)

  useEffect(() => {
    console.log('getting games for day:', day)
  }, [session, day])

  return (
    <main>
      

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        Predictions Create. You shouldn&apos;t be here without logging in
      </div>
      <button onClick={() => setDay(day + 1)}>Next Day</button>
    </main>
  )
}