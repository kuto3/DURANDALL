"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

import Link from 'next/link';
import {WalletButton} from '../solana/solana-provider'
import { AiOutlineMenu } from 'react-icons/ai';

import HeaderVertical from '@/components/ui/HeaderBagVertical'
import WatchesVertical from '@/components/ui/WatchesVertical'
import MenVertical from '@/components/ui/MenVertical'
import WomenVertical from '@/components/ui/WomenVertical'
import HeroSection from '@/components/ui/HeroSection'

const Header =  () => {


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isHandleVerticalBar, sethandleVerticalBar] = useState(false);
  const [isHandleWatchesVertical, sethandleWatchesVertical] = useState(false);
  const [isHandleMenVertical, sethandleMenVertical] = useState(false);
  const [isHandleWomenVertical, sethandleWomenVertical] = useState(false);
  const [isHandleJeweleryVertical, sethandleJeweleryVertical] = useState(false);
  
  const searchRef = useRef<HTMLDivElement | null>(null);



  // Filtrage basé sur la requête de recherche

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


  const renderLink2 = (href: string, label: string, onClick?: () => void) => (
    <Link href={href} className="h-16  text-neutral-700 flex justify-center items-center" onClick={onClick}>
      <div className='h-12  w-30 flex border-neutral-300 hover:border-2 justify-center items-center ' >{label}</div>
    </Link>
  );

  const handleLinkClick = () => {
    setShowMenu(false); // Hide the dropdown menu
  };

  const handleVerticalBar = () => {
    ExitVerticalBar()
    sethandleVerticalBar(true); // Hide the dropdown menu
  };

  const ExitVerticalBar = () => {
    sethandleVerticalBar(false); // Hide the dropdown menu
    sethandleWatchesVertical(false); 
    sethandleMenVertical(false);
    sethandleWomenVertical(false);
    sethandleJeweleryVertical(false); 
  };

  const handleWatchesVertical = () => {
    ExitVerticalBar()
    sethandleWatchesVertical(true); // Hide the dropdown menu
  };

  const handleMenVertical = () => {
    ExitVerticalBar()
    sethandleMenVertical(true); // Hide the dropdown menu
  };

  const handleWomenVertical = () => {
    ExitVerticalBar()
    sethandleWomenVertical(true); // Hide the dropdown menu
  };


  const handleJeweleryVertical = () => {
    ExitVerticalBar()
    sethandleJeweleryVertical(true); // Hide the dropdown menu
  };

 
  return (
    <div className='flex-col bg-white z-10 ' onClick={ExitVerticalBar} onMouseLeave={ExitVerticalBar}>
    <header
  className={`border-b-2 border-neutral-300 w-full  fixed top-0 left-0 p-6 flex justify-center bg-white backdrop-blur-lg z-10 h-20 transition-transform duration-300 ` } >

  
  <nav className="flex items-center px-1 w-full  ">
  {/* Bouton "H" positionné à l'extrême gauche */}

  
  {/* Logo positionné juste à côté */}


  <div className='flex justify-center items-center w-6/12 ' >
  <div className='w-2/12'>
  <div>
  </div>
    <div className='' onMouseEnter={handleVerticalBar}>
      {renderLink2('/bags/all', 'BAGS')}
      
      </div>
      </div>
      <div className='w-6/12 h-full' onMouseEnter={handleWatchesVertical}>
      {renderLink2('/watches-jewelry/all', 'WATCHES & JEWELRY')}
      </div>
      <div className='w-3/12 h-full' onMouseEnter={handleWomenVertical}>
      {renderLink2('/women/all', 'WOMEN')}
      </div>
      <div className='w-3/12 h-full' onMouseEnter={handleMenVertical}>
      {renderLink2('/men/all', 'MEN')}
      </div>
      <div className='w-6/12'>

      </div>
      </div>

<div className='flex justify-center items-center'>
    <Link href="/">
      <Image
        src="/logo.png"
        layout="intrinsic"
        alt="Logo"
        height={400}
        width={500}
        className="w-32 h-8 "
      />
    </Link>
    </div>

    <div
      className={`lg:flex items-center space-x-8 ml-auto hidden w-5/12 `}
    >
      <div className='w-3/12'>
    
      </div>
      <div className='w-3/12'>
     
      </div>
    <div className='w-6/12'>
      {renderLink2('/games', 'CONNECT')}
      </div>
      {isHandleVerticalBar && <HeaderVertical />}
      {isHandleWatchesVertical && <WatchesVertical />}
      {isHandleMenVertical && <MenVertical />}
      {isHandleWomenVertical && <WomenVertical />}
      {isHandleJeweleryVertical && <JeweleryVertical />}
      <div className="flex 'w-6/12 justify-center  items-center">
    
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
<div className='h-32 z-50'></div>
<div className='h-80 top-20 w-full bg-transparent fixed z-0'></div>
<div className='flex w-full'>



</div>
</div>

  );
};

export default Header;
