import React from 'react';
import Bordy4 from '../../components/Bordy2';
import Bordy6 from '../../components/Body';
import Bodythree from '../../components/Body3';
import RandomDiplomaCarousel from '../../components/Caroussel';
import FAQ from '../../components/FAQ';
import HeroSection from '../../components/Title';
import Link from 'next/link';

const index = () => {
  return (
    <div>
      <HeroSection />
      <div  className="h-12"></div>
      <div className="hidden lg:block"> {/* Hide on mobile screens */}
        <RandomDiplomaCarousel />
        <div id="steps" className="h-12"></div>
      </div>
      <div id="steps" className="h-36"></div>
      <Bordy6/>
      <Bordy4/>
      <FAQ />
      <div className="h-36"></div>
    </div>
  );
}

export default index;
