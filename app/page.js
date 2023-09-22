import Dashboard from './components/Dashboard'

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="mb-28 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Dashboard/>
      </div>
    </main>
  )
  
}
