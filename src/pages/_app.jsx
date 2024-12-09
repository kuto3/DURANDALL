import '../styles/globals.css'; // Assurez-vous que 'globals.css' contient la règle @import
import '@rainbow-me/rainbowkit/styles.css';
import "../output.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import 'slick-carousel/slick/slick.css';
import Footer from '../../components/Footer';
import { ethers } from 'ethers';
import 'slick-carousel/slick/slick-theme.css';
import { config } from '../wagmi';
import Header from '../../components/Header';
import { space } from '../ui/fonts';

const client = new QueryClient();

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}
const customTheme = {
  colors: {
    accentColor: 'hsl(16 53% 26%)',
    accentColorForeground: 'hsl(0, 0%, 100%)',
    actionButtonBorder: 'hsl(228, 9%, 11%)',
    actionButtonBorderMobile: 'hsl(228, 9%, 11%)',
    actionButtonSecondaryBackground: 'hsl(0, 0%, 100%)',
    closeButton: 'hsl(226, 11%, 64%)',
    closeButtonBackground: 'hsl(228, 5%, 18%)',
    connectButtonBackground: 'hsl(228, 9%, 11%)',
    connectButtonBackgroundError: 'hsl(360,100%,64%)',
    connectButtonInnerBackground: 'hsl(225, 4%, 21%)',
    connectButtonText: 'hsl(0, 0%, 100%)',
    connectButtonTextError: 'hsl(0,0%,100%)',
    error: 'hsl(0,0%,100%)',
    generalBorder: 'hsl(228, 5%, 18%)',
    generalBorderDim: 'rgba(0, 0, 0, 0.03)',
    menuItemBackground: 'hsl(229, 9%, 20%)',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBackground: 'hsl(228, 9%, 11%)',
    modalBorder: 'hsl(228, 5%, 18%)',
    modalText: 'hsl(0, 0%, 100%)',
    modalTextDim: 'rgba(60, 66, 66, 0.3)',
    modalTextSecondary: 'hsl(0, 0%, 60%)',
    profileAction: 'hsl(218, 9%, 23%)',
    profileActionHover: 'hsl(230, 7%, 31%)',
    profileForeground: 'hsl(220, 8%, 15%)',
    selectedOptionBorder: 'hsl(16 53% 26%)',
    downloadBottomCardBackground: '"linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF"',
    downloadTopCardBackground: '"linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF"',
    connectionIndicator: 'hsl(107, 100%, 44%)',
    standby: 'hsl(47, 100%, 63%)',
  },
  radii: {
    actionButton: '18px',
    connectButton: '9px',
    menuButton: '9px',
    modal: '18px',
    modalMobile: '18px',
  },
  shadows: {
    connectButton: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
  blurs: {
    modalOverlay: 'blur(0px)', // e.g. 'blur(4px)'
  },

}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className={`${space.className} antialised`}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider
            chains={config.chains}
            theme={customTheme}
          >
            {/* Ajout d'un overflow-hidden pour éviter les scrollbars */}
            <div className='relative bg-black min-h-screen overflow-hidden'>
              {/* Fond dupliqué qui remplit tout l'écran */}
       


              {/* Contenu principal */}
              <Header />
              <div className={`h-36`}></div>
              <div className="flex flex-col relative z-10 min-h-screen">
                <main className="flex-grow">
                  <Component {...pageProps} />
                </main>
                <Footer />
              </div>
            </div>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      </div>
    </>
  );
}

export default MyApp;
