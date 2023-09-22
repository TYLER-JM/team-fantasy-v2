import { getServerSession } from "next-auth"
import { Options } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Owner from "@/lib/Owner"

async function getRoster(ownerId) {
  return await Owner.getRoster(ownerId)
}

const RosterPage = async () => {
  const session = await getServerSession(Options)
  
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/roster')
  }
  const roster = await getRoster(session.user.owner.id)
  
  return (
    <div className="sm:p-24 overflow-x-auto container mx-auto px-4">
      <h1 className="text-lg font-bold text-center">Your Teams</h1>
      <ul className="next-center">
        {roster && roster.map(history => (
          <li key={history.id}>{history.team.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default RosterPage