'use client'

import { useSession } from "next-auth/react"


export default function PredictionsList() {
  const {data: session} = useSession({required: true})

  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
      Predictions List. This is the list of predictions you have made. You shouldn&apos;t be here without logging in
    </div>
  )
}