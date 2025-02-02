import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { Metadata } from 'next/types';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
import { CategoriesContextProvider } from '@/context/CategoriesContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web cheat sheet',
  description: 'Web cheat sheet by Ilia Nekrasov!',
}

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <CategoriesContextProvider>
                <div className="container">
                  <div className="wrapper">
                    <Navbar />
                    {children}
                    <Footer />
                  </div>
                </div>
              </CategoriesContextProvider>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
