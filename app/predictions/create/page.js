'use client'
import LoadingTemplate from "@/app/components/LoadingTemplate"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

 // use client so that we load the page, fetch some upcoming games, then we have a button that allows more games to be loaded

export default function PredictionsCreate() {
  const {data: session, status} = useSession({required: true})
  const [day, setDay] = useState(0)
  const [games, setGames] = useState({})

  function seeGames() {
    console.log('GAMES', games)
  }

  useEffect(() => {
    console.log('getting games for day:', day)

    async function fetchUpcoming() {
      const res = await fetch(`/api/predictions?ownerId=${session.user.owner.id}&addDays=${day}`);
      const newGames = await res.json()
      if (!ignore) {
        setGames(g => ({...g, ...newGames}))
      }

    }

    session && fetchUpcoming()
    let ignore = false
    return () => {
      ignore = true
    }
  }, [session, day])

  if (status === 'loading') {
    return (
      <LoadingTemplate/>
    )
  }
  if (status === 'unauthenticated') {
    return (
      <main>not logged in</main>
    )
  }
  return (
    <main>
      <div>
        <form method="post" action={`/api/predictions?ownerId=${session.user.owner.id}`}>
          {Object.entries(games).map(([gameId ,game]) => (
            <p key={gameId}>
              <label htmlFor={gameId}><span>{game.homeTeam}</span> @ <span>{game.awayTeam}</span></label>
              {
                game.prediction ? <span>You have already bet on this</span> :
                  game.options ? 
                  <select name={gameId}>
                    <option value=''>no predictions</option>
                    {Object.entries(game.options).map(([id, text]) =>(
                      <option key={id} value={id}>{text}</option>
                    ))}
                  </select>
                  : 
                  <span>Game has already started</span>
              }

            </p>
          ))}
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit">Save Predictions</button>
        </form>
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setDay(day + 1)}>Load More</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={seeGames}>See Games</button>
    </main>
  )
}