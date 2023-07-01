'use client'

import { useState } from "react";

export default function FlashMessage({message}) {
  // message = {name: String, value: String}
  const [display, setDisplay] = useState(true)
  return (
    display && <div className="border-2 border-blue-500 rounded font-medium text-blue-700 py-2 px-3 flex justify-between">
      <span>{message.value}</span>
      <button onClick={() => setDisplay(false)}>❌</button>  
    </div>
  )
}