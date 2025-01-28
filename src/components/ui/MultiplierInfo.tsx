import React from 'react';
import Image from 'next/image';

const MultiplierInfo = ({ images, multiplier }) => {
  return (
    <div>
      <div className="flex space-x-2 ml-5 mt-3 ">
       
      <div className='flex justify-center items-center h-16 w-16 overflow-hidden'>
        <Image
          src={images}
          width={70}
          height={70}
          alt="Picture of the author"
        />
        </div>
      
        <div className='flex justify-center items-center h-16 w-16 overflow-hidden'>
        <Image
          src={images}
          width={70}
          height={70}
          alt="Picture of the author"
        />
        </div>
        
        <div className='flex justify-center items-center h-16 w-16 overflow-hidden'>
        <Image
          src={images}
          width={70}
          height={70}
          alt="Picture of the author"
        />
        </div>
        <div className="ml-6 text-gray-200 font-bold text-2xl flex items-center text-sm">
          <div>x {multiplier} MULTIPLIER</div>
        </div>
      </div>
    </div>
  );
};

export default MultiplierInfo;
