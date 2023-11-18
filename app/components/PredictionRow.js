'use client'

export default function PredictionRow({row}) {
  return (
    <tr className="border-b dark:border-neutral-500" key={row.date + row.finalScore}>
      <td className="whitespace-nowrap px-3 py-2">{row.date.toDateString()}</td>
      <td className="whitespace-nowrap px-3 py-2">{row.prediction}</td>
      <td className="whitespace-pre-line px-3 py-2">{row.finalScore}</td>
      <td className="whitespace-nowrap px-3 py-2">{row.result}</td>
    </tr>
  )
}