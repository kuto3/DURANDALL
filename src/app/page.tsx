import React from 'react';
import Documentation from '../components/ui/Documentation';
import Info from '../components/ui/Info';
import FAQ from '../components/ui/FAQ';
import HeroSection from '../components/ui/HeroSection';
import SmallSlotMachineList from '../components/ui/SmallDiplomalist';
import Link from 'next/link';


export default function Page() {
  return <div className='relative bg-black min-h-screen overflow-hidden p-9'>
    <div className='p-9'>
  <div className=" rounded-xl mx-9 bg-[url('/FF.jpg')] opacity-90 " >
  <HeroSection />
  </div>
  <div className='h-6'></div>
  <div className='flex justify-center mx-9'>
 
 
  </div>

  <SmallSlotMachineList/>
  <div className="hidden lg:block"> {/* Hide on mobile screens */}
  </div>
  <div id="steps" className="h-6"></div>
  <Info/>
  <Documentation/>
  <FAQ />

  <div className="h-36"></div>
  </div>
</div>
}


