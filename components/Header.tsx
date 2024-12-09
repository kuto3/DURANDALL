import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';

interface Diploma {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ipfsUri?: string;
  hasAccess?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  walletAddress: string;
  hasAccess?: string;
  ipfsUri?: string;
}

const Header = () => {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [searchQuery, setSearchQuery] = useState('');
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredResults, setFilteredResults] = useState<(Diploma | User)[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const url = `/user/${address}`;
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Fetch diplomas and users
  useEffect(() => {
    const fetchDiplomas = async () => {
      try {
        const { data } = await axios.get<Diploma[]>('/api/diplomas');
        setDiplomas(data);
      } catch (error) {
        console.error('Error fetching diplomas:', error);
      }
    };

   

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>('/api/users', { params: { searchQuery } });
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchDiplomas();
    if (searchQuery) fetchUsers();
  }, [searchQuery]);

  // Update filtered results based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredResults([
        ...diplomas.filter(diploma => diploma.title.toLowerCase().includes(searchQuery.toLowerCase())),
        ...users.filter(user =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ]);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, diplomas, users]);

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
    <Link href={href} className="hover:text-gray-500 text-white font-bold block w-full text-center" onClick={onClick}>
      {label}
    </Link>
  );

  const handleLinkClick = () => {
    setShowMenu(false); // Hide the dropdown menu
  };

  return (
    <header className={`w-full fixed top-0 left-0 bg-neutral-900 backdrop-blur-lg z-50 transition-transform duration-300 ${isScrollingDown ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="flex items-center px-1 mr-2">
        {/* Logo positioned to the far left */}
        <div className={`flex-shrink-0 mr-6`}>
          <Link href="/">
            <Image src="/h.png" layout="intrinsic" alt="Logo" height={500} width={500} className="w-24 h-9" />
          </Link>
        </div>

        {/* Search bar for larger screens */}
        <div className="hidden lg:flex flex-1 relative" ref={searchRef}>
          <input
            type="text"
            placeholder="Search for certificates or users..."
            value={searchQuery}
            onClick={() => setIsSearchOpen(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-1 px-3 mr-6 border-2 rounded-lg shadow-sm focus:outline-none focus:border-yellow-800 bg-black text-white border-neutral-800"
          />
          {isSearchOpen && searchQuery && filteredResults.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-black border border-gray-700 rounded-lg mt-2 shadow-lg max-h-40 overflow-y-auto z-10">
              {filteredResults.map((result) => (
                <li key={result.id} className="p-2 flex items-center hover:bg-gray-800 cursor-pointer">
                  <div className="relative w-12 h-12 mr-2">
                    {'imageUrl' in result && result.imageUrl && result.hasAccess ? (
                      <Image src={result.imageUrl} layout="fill" objectFit="cover" alt="Image" className="rounded-full" />
                    ) : (
                      <ImagePlaceholder ipfsUri={result.ipfsUri} />
                    )}
                  </div>
                  <div className="flex-grow">
                    {'title' in result ? (
                      <Link href={`/diplomas/${result.id}`}>
                        <h3 className="font-semibold text-white">{result.title}</h3>
                        <p className="text-gray-400">{result.description.length > 100 ? `${result.description.substring(0, 100)}...` : result.description}</p>
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

        {/* Navigation links */}
        <div className={`lg:flex items-center space-x-16 ml-auto hidden ml-9 mr-9`}>
          {renderLink("/create", "CREATE")}
          {renderLink("/Yourcertificates", "EXPLORE")}
          {renderLink("/tutorial", "TUTORIAL")}
          {isConnected && renderLink(url, "ACCOUNT")}
          <div className='w-full mr-2 text-center'>
            <ConnectButton label='Connect' accountStatus='address' chainStatus='none' />
          </div>
        </div>

    {/* Mobile menu button */}
    <div className="lg:hidden ml-auto flex items-center">
          <button onClick={() => setShowMenu(!showMenu)} className="ml-3">
            <AiOutlineMenu size={26} className="text-white" />
          </button>
        </div>

        {/* Mobile menu */}
        {showMenu && (
          <div className="lg:hidden w-full bg-black text-white p-4 absolute top-full left-0 z-10 h-screen">
            <Link href="/" className="block mb-3 font-bold text-xl text-center w-full p-3" onClick={handleLinkClick}>
              HOME
            </Link>
            <Link href="/create" className="block mb-3 font-bold text-xl text-center w-full p-3" onClick={handleLinkClick}>
              CREATE
            </Link>
            <Link href="/Yourcertificates" className="block mb-3 font-bold text-xl text-center w-full p-3" onClick={handleLinkClick}>
              EXPLORE
            </Link>
            <Link href="/tutorial" className="block mb-3 font-bold text-xl text-center w-full p-3" onClick={handleLinkClick}>
              TUTORIAL
            </Link>
            {isConnected ? (
              <Link href={url} className="block mb-3 font-bold text-xl text-center w-full p-3" onClick={handleLinkClick}>
                ACCOUNT
              </Link>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
