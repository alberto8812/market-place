import type { Metadata } from 'next'
import './globals.css'
import { inter, titleFont } from './config/fonts'



export const metadata: Metadata = {
  title:{
    template: '%s - ClaraRivera Marketplace',
    default: 'Home -  ClaraRivera Marketplace'
  },
  description: 'tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={titleFont.className}>{children}</body>
    </html>
  )
}
