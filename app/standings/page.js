import { getServerSession } from "next-auth"
import { Options } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"


const StandingsPage = async () => {
  const session = await getServerSession(Options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/standings')
  }

  return (
    <main>
      <div className="p-24">
          you are on the standings page. Server Side rendered thing. You should not see this unless you are signed in

      </div>
    </main>
  )
}

export default StandingsPage