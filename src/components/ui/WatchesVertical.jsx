"use client";


import Link from "next/link";
import { useState } from "react";
import SecondVerticalWatch from '@/components/ui/SecondVerticalWatch'
import SecondVerticalJewelery from '@/components/ui/SecondVerticalJewelery'

import SecondVerticalJeweleryMen from '@/components/ui/SecondVerticalJeweleryMen'
import SecondVerticalJeweleryWomen from '@/components/ui/SecondVerticalJeweleryWomen'


export default function HeaderBagVertical() {
 const [isDesignerEnable, setisDesignerEnable] = useState(false);
 const [isIconicEnable, setisIconicEnable] = useState(false);
 const [isMenEnable, setisMenEnable] = useState(false);
 const [isWomenEnable, setisWomenEnable] = useState(false);

 const ExitAll = () => {
  ExitDesigner(); 
  ExitIconic();
  ExitMen();
  ExitWomen();
 };

 const handleDesigner = () => {
  ExitAll();
  setisDesignerEnable(true);
 };

 const ExitDesigner = () => {
  setisDesignerEnable(false);
 };

 const handleIconic = () => {
  ExitAll();
  setisIconicEnable(true);
 };
  
 const ExitIconic = () => {
  setisIconicEnable(false);
 };

 const handleMen = () => {
  ExitAll();
  setisMenEnable(true);
 };

 const ExitMen = () => {
  setisMenEnable(false);
 };

 const handleWomen = () => {
  ExitAll();
  setisWomenEnable(true);
 };
  
 const ExitWomen = () => {
  setisWomenEnable(false);
 };

 return (
  <div className="flex">
   <div className="fixed bg-white border-r-2 border-neutral-300 top-20 left-0 h-screen w-64 bg-gray-800 flex flex-col items-center p-9  -z-50 p-3" onMouseEnter={handleDesigner}>
     <div className="h-2"></div>
      <Link href="/watches-jewelry/watches/all" className="flex justify-center items-center text-black text-lg font-bold h-8 w-24 rounded-lg text-sm" onMouseEnter={handleDesigner}>
        <div className="flex">WATCHES</div>
      </Link>
      {isDesignerEnable && <SecondVerticalWatch/>}

      <Link href="/watches-jewelry/jewelry/all" className="flex justify-center items-center text-black text-lg font-bold h-8 w-24 rounded-lg text-sm" onMouseEnter={handleIconic}>
        <div>JEWELRY</div>
      </Link>
      {isIconicEnable && <SecondVerticalJewelery />}

    </div>
  </div>
 );
}
