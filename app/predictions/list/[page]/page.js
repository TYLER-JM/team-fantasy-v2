import { getServerSession } from "next-auth"
import { Options } from "@/app/api/auth/[...nextauth]/route"
import Owner from "@/lib/Owner"
import Link from "next/link"
import PredictionRow from "@/app/components/PredictionRow"

async function getPredictions(owner, page) {
  return await Owner.loadPredictions(owner, page)
}


const PredictionListPage = async ({ params }) => {
  const session = await getServerSession(Options)
  const predictions = await getPredictions(session.user.owner.id, parseInt(params.page) - 1)
  return (
    <div className="sm:p-24 overflow-x-auto">
      <table className="min-w-full text-sm font-light">
          <caption><h2 className="border-solid border-2 border-indigo-600">Your Predictions (Page {params.page})</h2></caption>
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th>Date</th>
              <th>Prediction</th>
              <th>Final Score</th>
              <th>Result</th>
            </tr>
          </thead>
          
          <tbody>

          {predictions.map(row => (
            <PredictionRow row={row} key={row.date + row.finalScore}/>
          ))}
          </tbody>
        </table>
        <div className="flex justify-between">
            <Link
              className={parseInt(params.page) > 1 ? '' : 'invisible'}
              href={`predictions/list/${parseInt(params.page) - 1}`}
            >
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >Previous Page</button>
            </Link>
          
            <Link
              className={predictions.length > 0 ? '' : 'invisible'}
              href={`predictions/list/${parseInt(params.page) + 1}`}>
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >Next Page</button>
            </Link>
        </div>
    </div>
  )
}

export default PredictionListPage