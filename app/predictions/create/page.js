'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

 // use client so that we load the page, fetch some upcoming games, then we have a button that allows more games to be loaded

export default function PredictionsCreate() {
  const {data: session} = useSession({required: true})
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

  return (
    <main>
      

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        Predictions Create. You shouldn&apos;t be here without logging in
      </div>
      <div>
        <form>
          {Object.entries(games).map(([gameId ,game]) => (
            <p key={gameId}>
              <span>{game.homeTeam}</span> AT <span>{game.awayTeam}</span>
            </p>
          ))}
        </form>
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setDay(day + 1)}>Load More</button>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={seeGames}>See Games</button>
    </main>
  )
}