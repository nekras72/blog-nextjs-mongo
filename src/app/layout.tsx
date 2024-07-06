import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next/types';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'Interesting blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div className="wrapper">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
