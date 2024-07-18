import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next/types';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'Interesting blog app!',
}

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider>
            <div className="container">
              <div className="wrapper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}