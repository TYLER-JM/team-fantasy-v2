'use client'

export default function Roster({roster}) {
  return (
    <div className="sm:p-24 overflow-x-auto">
      <table className="min-w-full font-light">
        <thead className="font-medium">
          <tr>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Team</th>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Fantasy Points</th>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Betting %</th>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Bets Won</th>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Bets Lost</th>
            <th className="whitespace-nowrap px-1 border-x border-slate-500">Total Bets</th>
          </tr>
        </thead>
        <tbody>
          {roster && roster.map(history => (
            <tr key={history.team.name.replaceAll(' ', '_')}>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.team.name}</td>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.stats.fantasyPoints}</td>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.stats.percentage}</td>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.stats.correct}</td>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.stats.incorrect}</td>
              <td className="text-center whitespace-nowrap px-1 py-2 border-x border-slate-500">{history.stats.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}