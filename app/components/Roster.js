'use client'

export default function Roster({roster}) {

  return (
    <div className="sm:p-16 overflow-x-auto container mx-auto px-4">
      <ul className="next-center">
        {roster && roster.map(history => (
          <li key={history.team.name.replaceAll(' ', '_')}>{history.team.name}</li>
        ))}
      </ul>
    </div>
  )
}