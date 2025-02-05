import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const ClothesShow = () => {
  return (
    <div>
       <div className=" w-32 text-black text-2xl font-bold mb-2">Bags</div>
    <div className='flex w-full h-56 '>
        <div className='flex justify-center items-center w-1/4 h-full border-2 border-r-0'>
        <Link href={"/bags/designer/louis-vuitton"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/louisvuitton.png"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>LOUIS VUITTON</div>  
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2  border-r-0'>
        <Link href={"/bags/designer/hermes"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/data/bags/all-bags/hermes/sac4/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>HERMES</div>  
        </Link>
      
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2  border-r-0'>
        <Link href={"/bags/designer/balenciaga"} className='flex-col  justify-center items-center  rounded-xl  hover:transform hover:scale-110'>
            <Image
                  src="/data/bags/all-bags/balenciaga/sac1/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={150}
                  width={150}
                  className=' mt-3'
                />
                <div className='flex justify-center items-center font-bold mt-3'>BALENCIAGA</div>  
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2'>
        <Link href={"/bags/designer/ysl"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/data/bags/all-bags/yves-saint-laurent/sac2/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>YSL</div>  
        </Link>
        </div>
       
    </div>
    </div>
  )
}

export default ClothesShow;