import React from 'react';
import Info from '../components/ui/Info';
import FAQ from '../components/ui/FAQ';

import SmallGamesList from '../components/ui/SmallGameslist';
import ClothesShow from '../components/ui/ClothesShow';
import BigClothesShow from '../components/ui/BigClothesShow';
import WatchShow from '../components/ui/WatchShow';
import Info2 from '../components/ui/Info2';
import HeroSection from '@/components/ui/HeroSection';
import MenWomen from '@/components/ui/MenWomen';



export default function Page() {
  return  <div className='flex-col bg-white min-h-screen overflow-hidden justify-top items-top '>

    
<div className='h-auto w-full bg-white -z-10'><HeroSection/></div>
<div className="h-8"></div>
  <ClothesShow />
  <SmallGamesList />
  <div className="h-6"></div>
  <BigClothesShow />
  <div id="steps" className="h-12"></div>
  
  <Info2/>
  <div className="h-6"></div>
  <WatchShow />
  <div className="h-12"></div>
  <Info/>

  <div className="h-12"></div>


  <FAQ />

  <div className="h-36"></div>
  </div>

}


