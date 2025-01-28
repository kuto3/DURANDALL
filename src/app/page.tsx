import React from 'react';
import Documentation from '../components/ui/Documentation';
import Info from '../components/ui/Info';
import FAQ from '../components/ui/FAQ';
import HeroSection from '../components/ui/HeroSection';
import SmallSlotMachineList from '../components/ui/SmallDiplomalist';
import SmallGamesList from '../components/ui/SmallGameslist';
import Link from 'next/link';


export default function Page() {
  return  <div className='flex-col bg-black min-h-screen overflow-hidden'>
    <div className="h-6"></div>
  <HeroSection />


 
  <SmallGamesList />
  
  <div id="steps" className="h-20"></div>
  <Info/>
  <div className="h-6"></div>
  <Documentation/>
  <div className="h-6"></div>
  <FAQ />

  <div className="h-36"></div>
  </div>

}


