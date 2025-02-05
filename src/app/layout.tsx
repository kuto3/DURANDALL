import './globals.css'
import { ClusterProvider } from '@/components/cluster/cluster-data-access'
import { SolanaProvider } from '@/components/solana/solana-provider'
import { UiLayout } from '@/components/ui/ui-layout'
import { ReactQueryProvider } from './react-query-provider'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'

export const metadata = {
  title: 'VIRGILE',
  description: 'Generated by create-solana-dapp',
}
const wallets = [new PhantomWalletAdapter()]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Importing Grotesk font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-grotesk">
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <Header />
              <div className="w-full flex justify-center bg-white">
                <div className="flex-col w-4/6 justify-center items-center">
               
                  {children}
                  <Footer />
                </div>
              </div>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
