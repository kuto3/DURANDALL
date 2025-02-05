import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const ClothesShow = () => {
  return (
    <div>
       <div className=" w-32 text-black text-2xl font-bold mb-2">Watch</div>
    <div className='flex w-full h-56 '>
        <div className='flex justify-center items-center w-1/4 h-full border-2 border-r-0'>
        <Link href={"/watches-jewelry/watches/rolex"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/data/watches-jewelery/watches/rolex/watch9/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>ROLEX</div>  
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2  border-r-0'>
        <Link href={"/watches-jewelry/watches/audemars-piguet"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/data/watches-jewelery/watches/audemars-piguet/watch12/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>AUDEMARS PIGUET</div>  
        </Link>
      
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2  border-r-0'>
        <Link href={"/watches-jewelry/watches/patek-philippe"} className='flex-col  justify-center items-center  rounded-xl  hover:transform hover:scale-110'>
            <Image
                  src="/data/watches-jewelery/watches/patek-philippe/watch1/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={150}
                  width={150}
                  className=' mt-3'
                />
                <div className='flex justify-center items-center font-bold mt-3'>PATEK PHILIPPE</div>  
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full border-2'>
        <Link href={"/watches-jewelry/watches/cartier"} className='flex-col  justify-center items-center  rounded-xl h-3/4 w-2/4 hover:transform hover:scale-110'>
            <Image
                  src="/data/watches-jewelery/watches/cartier/watch2/1.webp"
                  layout="intrinsic"
                  alt="Logo"
                  height={1000}
                  width={1000}
                />
                <div className='flex justify-center items-center font-bold'>CARTIER</div>  
        </Link>
        </div>
       
    </div>
    </div>
  )
}

export default ClothesShow;