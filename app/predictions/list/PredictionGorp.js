'use client'

import { useState, useEffect } from "react"

// import Owner from "@/lib/Owner"
// import { getServerSession } from "next-auth"

// async function getPredictions(ownerId, page) {
  // return await Owner.loadPredictions(ownerId, page)
// }

const PredictionGorp = async ({ preds, ownerId }) => {
  const [page, setPage] = useState(0)
  const [predictions, setPredictions] = useState(preds)

  useEffect(() => {
    console.log('fetcing', page)
    // if (session) {
      // let ownerId = session.user.owner.id
      fetch(`http://localhost:3000/predictions/list/${ownerId}/${page}`)
        .then(res => {
          console.log('res', res)
          // setPredictions()
        })
        .catch(error => console.log('wtf, ', error))
    // }
  }, [page, ownerId])


  return (
    <div>
      <table className="min-w-full text-left text-sm font-light">
          <caption><h2 className="border-solid border-2 border-indigo-600">Your Predictions</h2></caption>
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th>Date</th>
              <th>Prediction</th>
              <th>Final Score</th>
              <th>Result</th>
            </tr>
          </thead>
          
          <tbody>
          {predictions && predictions.map(row => {
            <tr className="border-b dark:border-neutral-500" key={row.date + row.finalScore}>
              <td className="whitespace-nowrap px-6 py-4">{row.date}</td>
              <td className="whitespace-nowrap px-6 py-4">{row.prediction}</td>
              <td className="whitespace-nowrap px-6 py-4">{row.finalScore}</td>
              <td className="whitespace-nowrap px-6 py-4">{row.result}</td>
            </tr>
          })}
          </tbody>
        </table>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => setPage(page + 1)}
        >
          LoadMore
        </button>

    </div>
  )
}

export default PredictionGorp