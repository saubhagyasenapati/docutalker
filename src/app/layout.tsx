import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Providers from '@/components/Providers'
import {Toaster} from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DocuTalker',
  description: 'AI companion for all your docs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <Providers>
    <html lang="en">
      <body className={inter.className}>
        <Toaster  position="top-center"/>
        {children}
      </body>
    
    </html>
    </Providers>
    </ClerkProvider>
  )
}
