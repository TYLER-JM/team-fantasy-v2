import { getServerSession } from "next-auth"
import { Options } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Standings from "@/lib/Standings"

async function getStandings() {
  return await Standings.getStandings()
}

const StandingsPage = async () => {
  const session = await getServerSession(Options)
  const standings = await getStandings()

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/standings')
  }

  return (
      <div className="sm:p-24 overflow-x-auto">
          <table className="min-w-full text-sm font-light">
          <caption><h2 className="border-solid border-2 border-indigo-600">Fantasy League</h2></caption>
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th>Owner</th>
              <th>Total</th>
              <th>NHL Points</th>
              <th>Fantasy Points</th>
              <th>Betting %</th>
              <th>Bets Won</th>
              <th>Bets Lost</th>
              <th>Total Bets</th>
            </tr>
          </thead>
          <tbody>
            {standings && standings.map(row => (
              <tr className="border-b dark:border-neutral-500" key={row.owner.name + row.predictions.percentage}>
                <td className="whitespace-nowrap px-3 py-2">{row.owner.name}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.eventStats.totalNhlPoints + row.predictions.fantasyPoints}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.eventStats.totalNhlPoints}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.predictions.fantasyPoints}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.predictions.percentage}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.predictions.correct}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.predictions.incorrect}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.predictions.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default StandingsPage