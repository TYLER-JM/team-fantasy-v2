'use client'
import LoadingTemplate from "@/app/components/LoadingTemplate"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

 // use client so that we load the page, fetch some upcoming games, then we have a button that allows more games to be loaded

export default function PredictionsCreate() {
  const {data: session, status} = useSession({required: true})
  const [day, setDay] = useState(0)
  const [games, setGames] = useState([])

  // for development help
  function seeGames() {
    console.log('GAMES', games)
  }

  useEffect(() => {
    console.log('getting games for day:', day)

    async function fetchUpcoming() {
      const res = await fetch(`/api/predictions?ownerId=${session.user.owner.id}&addDays=${day}`);
      const newGames = await res.json()

      const arrayOfNewGames = Object.entries(newGames).map(([,value]) => value)

      // const emptyDate = new Date()
      const emptyDate = new Date('2023-04-11') // for development
      emptyDate.setDate(emptyDate.getDate() + Number(day))
      let emptyDay = {message: `no games on: ${emptyDate.toDateString()}`}

      if (arrayOfNewGames.length === 0) {
        arrayOfNewGames.push(emptyDay)
      }

      if (!ignore) {
        setGames(g => ([...g, ...arrayOfNewGames]))
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
        <form id="createPredictions" method="post" action={`/api/predictions?ownerId=${session.user.owner.id}`}>
          {games.map((game) => {
            if (game.id === undefined) {
              return (<p key={game.message.replaceAll(' ', '_')}>{game.message}</p>)
            } else {
              return (<p key={game.id}>
              <label htmlFor={game.id}><span>{game.homeTeam}</span> @ <span>{game.awayTeam}</span></label>
              {
                game.prediction ? <span>You have already bet on this</span> :
                  game.options ? 
                  <select name={game.id}>
                    <option value=''>no predictions</option>
                    {Object.entries(game.options).map(([id, text]) =>(
                      <option key={id} value={id}>{text}</option>
                    ))}
                  </select>
                  : 
                  <span>Game has already started</span>
              }

            </p>)
            }
          })}
        </form>
      </div>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setDay(day + 1)}>Load More</button>
      {Object.entries(games).length > 0 &&<button form="createPredictions" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit">Save Predictions</button>}
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={seeGames}>See Games</button>
    </main>
  )
}