import PredictionGorp from "./PredictionGorp"
import { getServerSession } from "next-auth"
import { Options } from "@/app/api/auth/[...nextauth]/route"



const PredictionListPage = async () => {
  const session = await getServerSession(Options)

  return (
    <div className="p-24 overflow-x-auto">
      <PredictionGorp preds={[]} ownerId={session.user.owner.id}/>
    </div>
  )
}

export default PredictionListPage