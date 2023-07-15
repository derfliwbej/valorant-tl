import './globals.css'
import { Roboto } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: '400'
})

export const metadata = {
  title: 'ValorantTL',
  description: 'Check your valorant store anytime, anywhere',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  )
}
