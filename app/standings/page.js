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
      <div className="sm:p-8 lg:p-24 overflow-x-auto">
          <table className="min-w-full font-light">
          <caption><h2 className="border-solid border-2 border-indigo-600">Fantasy League</h2></caption>
          <thead className="font-medium">
            <tr>
              <th className="text-left whitespace-nowrap px-1 border-x border-slate-500">Owner</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Total</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">NHL Points</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Fantasy Points</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Betting %</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Bets Won</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Bets Lost</th>
              <th className="whitespace-nowrap px-1 border-x border-slate-500">Total Bets</th>
            </tr>
          </thead>
          <tbody>
            {standings && standings.map(row => (
              <tr key={row.owner.name + row.predictions.percentage}>
                <td className="whitespace-nowrap pl-1 pr-3 py-2 border-x border-slate-500">{row.owner.name}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.eventStats.totalNhlPoints + row.predictions.fantasyPoints}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.eventStats.totalNhlPoints}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.predictions.fantasyPoints}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.predictions.percentage}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.predictions.correct}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.predictions.incorrect}</td>
                <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{row.predictions.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default StandingsPage