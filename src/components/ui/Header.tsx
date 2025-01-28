"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import axios from 'axios';
import {WalletButton} from '../solana/solana-provider'
import { AiOutlineMenu } from 'react-icons/ai';
import HeaderVertical from '@/components/ui/HeaderVertical'
import HeaderVertical2 from '@/components/ui/HeaderVertical2'

const Header = () => {


  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Diploma[]>([]);
  const [filteredResults, setFilteredResults] = useState<(Diploma | User)[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHandleVerticalBar, sethandleVerticalBar] = useState(false);
  

  const searchRef = useRef<HTMLDivElement | null>(null);

  // Fetch diplomas and users
  useEffect(() => {
    const fetchDiplomas = async () => {
      try {
        const { data } = await axios.get<Diploma[]>('/api/diplomas');
        setGames(data);

        // Récupérer les métadonnées de chaque URL dans `games`
        const updatedGames = await Promise.all(
          data.map(async (game) => {
            try {
              const metadataResponse = await axios.get(game.url);
              return {
                ...game,
                metadata: metadataResponse.title, // Stocke les métadonnées ici
              };
            } catch (error) {
              console.error(`Error fetching metadata for ${game.url}:`, error);
              return game; // Si une erreur survient, on garde le game sans les métadonnées
            }
          })
        );
        setGames(updatedGames); // Mettre à jour l'état des jeux avec les métadonnées
      } catch (error) {
        console.error('Error fetching diplomas:', error);
      }
    };

    fetchDiplomas(); // Appel de la fonction pour récupérer les diplômes au chargement
  }, []);

  // Filtrage basé sur la requête de recherche
  useEffect(() => {
    if (searchQuery) {
      setFilteredResults(
        games.filter((game) =>
          game.url.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredResults(games); // Si aucune recherche, on montre tous les jeux
    }
  }, [searchQuery, games]);

  // Handle click outside search bar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll events to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const scrollingDown = window.scrollY > lastScrollY && window.scrollY > 50;
      setIsScrollingDown(scrollingDown);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fetch image from IPFS
  const fetchImageFromIPFS = useCallback(async (ipfsUri?: string): Promise<string | undefined> => {
    if (!ipfsUri) return;
    try {
      const response = await axios.get(ipfsUri);
      return response.data.image; // Adjust if necessary
    } catch (error) {
      console.error('Error fetching image from IPFS:', error);
    }
  }, []);

  // ImagePlaceholder Component
  const ImagePlaceholder = ({ ipfsUri }: { ipfsUri?: string }) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
      const fetchImage = async () => {
        if (ipfsUri) {
          const url = await fetchImageFromIPFS(ipfsUri);
          setImageUrl(url);
        }
      };

      fetchImage();
    }, [ipfsUri, fetchImageFromIPFS]);

    return (
      <div className="relative w-12 h-12">
        {imageUrl ? (
          <Image src={imageUrl} layout="fill" objectFit="cover" alt="Image" className="rounded-full" />
        ) : (
          <div className="w-full h-full bg-gray-700 rounded-full animate-pulse" />
        )}
      </div>
    );
  };

  // Render links with common properties
  const renderLink = (href: string, label: string, onClick?: () => void) => (
    <Link href={href} className="hover:text-red-600 text-white font-bold block w-full text-center" onClick={onClick}>
      {label}
    </Link>
  );

  const renderLink2 = (href: string, label: string, onClick?: () => void) => (
    <Link href={href} className="text-purple-300 hover:text-purple-300 hover:bg-purple-950 bg-purple-800 border-2 rounded-lg p-2 w-24 border-purple-900 text-white font-bold block text-center border-purple-900 ml-4 h-10" onClick={onClick}>
      <div className='w-32 flex justify-center items-center mr-9 mb-3' ><div className=' mr-[3rem] mb-3'>{label}</div></div>
    </Link>
  );

  const handleLinkClick = () => {
    setShowMenu(false); // Hide the dropdown menu
  };

  const handleVerticalBar = () => {
    sethandleVerticalBar((prev) => !prev);; // Hide the dropdown menu
  };

  return (
    <header
  className={`w-full fixed top-0 left-0 p-6 flex justify-center bg-neutral-900 backdrop-blur-lg z-50 h-24 transition-transform duration-300 `}>
  {isHandleVerticalBar ? (<HeaderVertical/>) : (<HeaderVertical2/>)}
  
  <nav className="flex items-center px-1 w-full">
  {/* Bouton "H" positionné à l'extrême gauche */}
  {isHandleVerticalBar ? (
  <button
  onClick={handleVerticalBar}
  className="flex justify-center items-center bg-neutral-900 text-white text-lg font-bold w-10 h-10 mt-4 rounded-xl mr-5 mb-3 border-2 border-neutral-700 "
><svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M3 3V21M21 12H7M7 12L14 19M7 12L14 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
</button>) : (<button
    onClick={handleVerticalBar}
    className="flex justify-center items-center bg-neutral-900 text-white text-lg font-bold w-10 h-10 mt-4 rounded-xl mr-5 mb-3 border-2 border-neutral-700 "
  >
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
  </button>)}
  
  {/* Logo positionné juste à côté */}
  <div className="flex-shrink-0  ml-3">
    <Link href="/">
      <Image
        src="/MULTISLOT.png"
        layout="intrinsic"
        alt="Logo"
        height={500}
        width={500}
        className="w-32 h-9 mr-1 ml-1"
      />
    </Link>
  </div>



    {/* Barre de recherche pour les écrans larges */}
    <div className="hidden lg:flex flex-1 relative ml-4" ref={searchRef}>
      <input
        type="text"
        placeholder="Search for games..."
        value={searchQuery}
        onClick={() => setIsSearchOpen(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-1 px-3 mr-6 border-2 rounded-lg shadow-sm focus:outline-none focus:border-yellow-800 bg-black text-white border-neutral-800"
      />
      {isSearchOpen && searchQuery && filteredResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-black border border-gray-700 rounded-lg mt-2 shadow-lg max-h-40 overflow-y-auto z-10">
          {filteredResults.map((result) => (
            <li
              key={result.id}
              className="p-2 flex items-center hover:bg-gray-800 cursor-pointer"
            >
              <div className="relative w-12 h-12 mr-2">
                {'imageUrl' in result && result.imageUrl && result.hasAccess ? (
                  <Image
                    src={result.imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="Image"
                    className="rounded-full"
                  />
                ) : (
                  <ImagePlaceholder ipfsUri={result.ipfsUri} />
                )}
              </div>
              <div className="flex-grow">
                {'title' in result ? (
                  <Link href={`/diplomas/${result.id}`}>
                    <h3 className="font-semibold text-white">{result.title}</h3>
                    <p className="text-gray-400">
                      {result.description.length > 100
                        ? `${result.description.substring(0, 100)}...`
                        : result.description}
                    </p>
                  </Link>
                ) : (
                  <Link href={`/user/${result.walletAddress}`}>
                    <h3 className="font-semibold text-white">{result.username}</h3>
                    <p className="text-gray-400">{result.walletAddress}</p>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Liens de navigation */}
    <div
      className={`lg:flex items-center space-x-8 ml-auto hidden w-3/12 mr-4`}
    >
      <div className='w-3/12'>
      {renderLink2('/games', 'PLAY')}
      </div>
      <div className='w-3/12'>
      {renderLink('/deposit', 'DEPOSIT')}
      </div>
      <div className="flex 'w-6/12 justify-center  items-center">
      <div className="flex items-center justify-center border-2 border-neutral-700 text-sm h-8 rounded-xl bg-neutral-800 py-5 px-1 pl-1">
  <div className="p-1">DEPOSIT: 4 SOL</div>
  <div className="w-2"></div>
  <button className="h-8 w-8 rounded-lg bg-gradient-to-b from-purple-600 to-purple-900 border-2 border-purple-900 flex justify-center items-center shadow-md hover:shadow-lg hover:from-purple-500 hover:to-purple-800 active:shadow-sm active:translate-y-[1px] transition-all">
    <svg
      width="70%"
      height="70%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-purple-300"
      />
    </svg>
  </button>
</div>

      </div>
    </div>
    <div className='w-2'></div>
    <WalletButton />

    {/* Bouton du menu mobile */}
    <div className="lg:hidden ml-auto flex items-center">
      <button onClick={() => setShowMenu(!showMenu)} className="ml-3">
        <AiOutlineMenu size={26} className="text-white" />
      </button>
    </div>

    {/* Menu mobile */}
    {showMenu && (
      <div className="lg:hidden w-full bg-black text-white p-4 absolute top-full left-0 z-10 h-screen">
        <Link
          href="/"
          className="block mb-3 font-bold text-xl text-center w-full p-3"
          onClick={handleLinkClick}
        >
          HOME
        </Link>
        <Link
          href="/create"
          className="block mb-3 font-bold text-xl text-center w-full p-3"
          onClick={handleLinkClick}
        >
          CREATE
        </Link>
        <Link
          href="/Yourcertificates"
          className="block mb-3 font-bold text-xl text-center w-full p-3"
          onClick={handleLinkClick}
        >
          EXPLORE
        </Link>
        <Link
          href="/tutorial"
          className="block mb-3 font-bold text-xl text-center w-full p-3"
          onClick={handleLinkClick}
        >
          TUTORIAL
        </Link>
      </div>
    )}
  </nav>
</header>

  );
};

export default Header;
