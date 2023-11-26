'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Roster from "../components/Roster"

const RosterPage = async () => {

  const {data: session, status} = useSession({required: true})
  const [activeOwner, setActiveOwner] = useState(0)
  const [owners, setOwners] = useState([])

  useEffect(() => {
    if (session && session.user.owner) {
      setActiveOwner(session.user.owner.id)
    }
  }, [session])

  useEffect(() => {
    async function fetchRosters() {
      const res = await fetch(`api/rosters`)
      const ownersWithRosters = await res.json()
      if (!ignore) {
        setOwners(ownersWithRosters)
      }
    }

    fetchRosters()
    let ignore = false
    return () => {
      ignore = true
    }
  }, [])
  
  if (status === 'loading') {
    return (
      <p>still loading...</p>
    )
  }

  if (session) {
    return (
      <div className="sm:p-16 overflow-x-auto container mx-auto px-4">
        {owners.map(owner => {
          return (<button key={owner.id} className={`m-2 px-2 p-1 rounded border border-indigo-700 hover:text-stone-200 hover:bg-indigo-700 ${activeOwner === owner.id ? 'text-stone-200 bg-indigo-600' : ''}`} onClick={() => setActiveOwner(owner.id)}>{owner.name}</button>)
        })}
        <div>
          {owners.filter(owner => owner.id === activeOwner).map(owner => {
            return <Roster key={owner.id} roster={owner.ownerTeamHistory}/>
          })}
        </div>
      </div>
      )
  }

  return (
    <p>sign in</p>
  )

}

export default RosterPage