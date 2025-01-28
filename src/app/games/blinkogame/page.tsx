"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Page = () => {


  return (
    <div className='h-screen mt-7'>
    <div className='h-3/4 flex-col justify-center items-center border-2 border-gray-800 rounded-xl h-full bg-gray-950'>
      <div className='h-6'></div>
      <div className='w-full flex justify-left items-center text-2xl '>
        <div className='w-12'></div>
        <div>THE BLINKO GAME</div>
      </div>
      <div className='flex  h-3/4  w-full overflow-hidden'>
        <div className='h-full  w-3/12'>
        <div className='h-full w-full  bg-gray-950'>
        <div className='h-3/4 flex-col justify-center items-center'>
        <div className='flex justify-center mb-3'>MANUEL</div>
        <div className='w-full  h-4 text-xs ml-4 '>Montant de la mise</div>
        <div className='flex justify-center h-10 mx-4 border-2 border-gray-700 bg-gray-900'></div>
        <div className='w-full mt-4 h-4 text-xs ml-4  '>Montant de la mise</div>
        <div className='flex justify-center h-10 mx-4 border-2 border-gray-700 bg-gray-900'></div>
        <div className='h-8'></div>
        <button className='w-11/12 h-10 flex justify-center items-center mx-4 border-2 border-gray-700 hover:bg-purple-700 bg-purple-700  text-white'>
          <div>Put the bet</div>
         

        </button>
      
        <div className='w-full h-full bg-gray-600 mt-9'>

          <div className='h-6 bg-gray-800 w-full'></div>
          <div className='h-6 bg-gray-700 w-full'></div>
          <div className='h-6 bg-gray-800 w-full'></div>
          <div className='h-6 bg-gray-700 w-full'></div>
          <div className='h-6 bg-gray-800 w-full'></div>
        </div>
       
        </div>
        </div>

        </div>
        <div className='flex-col w-9/12 h-full bg-gray-900 relative'>
          <div className='flex  h-full w-full bg-gray-900 relative '>
           PUT THE BLINKO HERE
          </div> </div>
      </div>
      <div className='h-8 w-full border-t-2 border-gray-600  bg-gray-900'></div>
    </div>
    <div className='h-12 w-full border-2 border-gray-600 rounded-xl bg-gray-900'></div>
  </div>
  
  );
};

export default Page;