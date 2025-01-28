"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Page = () => {

  return (
    <div className='h-screen mt-7'>
      <div className='flex-col justify-center items-center border-gray-600 rounded-xl h-full bg-gray-950'>
        <div className='rounded-xl  my-5 w-full flex justify-center items-center'>
          <div className='w-3/12 h-4/5 border-gray-600 border-2'></div>
          <div className='w-9/12 p-6 h-2/3 bg-gray-900 relative'>
         
            <div className='flex-col justify-bottom items-bottom border-2 border-gray-600 h-full w-full bg-neutral-900 relative'>
            <div className='h-2/3 bg-blue-900  w-full'>
            <Image
                                src="/horse.png"
                                layout="intrinsic"
                                alt="Rocket"
                                height={800}
                                width={800}
                                className="w-32 h-9"
                              />
            </div>
              <div className='h-1/3 bg-green-900  w-full'></div>
            </div>
          </div>
        </div>
        <div className='h-12 w-full border-2 border-gray-600 rounded-xl mt-3 bg-gray-900'></div>
      </div>
    </div>
  );
};

export default Page;