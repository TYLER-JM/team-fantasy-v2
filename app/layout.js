import Provider from './components/Provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Team Fantast',
  description: 'make your picks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main className='grow'>{children}</main>
        </Provider>
      </body>
    </html>
  )
}
