import Header from './components/Header'
import Provider from './components/Provider'
import './globals.css'
import { Inter } from 'next/font/google'

import { cookies } from 'next/dist/client/components/headers'
import FlashMessage from './components/FlashMessage'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Team Fantasy',
  description: 'make your picks',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className='grow min-h-screen'>
            <Header/>
            {cookieStore.getAll('flash-message').map(message => (
              <FlashMessage key={message.value.replaceAll(' ', '_')} message={message}/>
            ))}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
