import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const ClothesShow = () => {
  return (
    <div className='flex-col items-center w-full h-56 bg-neutral-100 rounded-xl' >
      <div className='h-6'></div>
    <div className='flex w-full '>
        <div className='flex justify-center items-center w-1/4 h-full '>
        <Link href={"/watches-jewelry/watches/all"} className='flex justify-center items-center bg-neutral-200  rounded-xl h-40 w-40  transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
          <div className='h-full'>
            <Image
                  src="/rolex1.png"
                  layout="intrinsic"
                  alt="Logo"
                  height={100}
                  width={100}
                  className=""
                />
              <div className='h-1/5 flex justify-center items-center mb-2 font-bold text-neutral-700'></div>  
            </div>    
        </Link>
     
        </div>
        
        <div className='flex justify-center items-center w-1/4 h-full '>
        <Link href={"/bags/all"} className='flex justify-center items-center bg-neutral-200 rounded-xl h-40 w-40  transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
        <div >
            <Image
                  src="/birkin.png"
                  layout="intrinsic"
                  alt="Logo"
                  height={100}
                  width={100}
                  className="w-24 h-24 "
                />
                    <div className='h-1/5  flex justify-center items-center mb-2 font-bold text-neutral-700'></div>  
                    </div>    
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full '>
        <Link href={"/men/men-clothes/coats"} className='flex justify-center items-center bg-neutral-200 rounded-xl h-40 w-40 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
        <div>
            <Image
                  src="/doudounes.png"
                  layout="intrinsic"
                  alt="Logo"
                  height={200}
                  width={200}
                  className=""
                />
                    <div className='h-1/5  flex justify-center items-center mb-2 font-bold text-neutral-700'></div>  
                    </div>    
        </Link>
        </div>
        <div className='flex justify-center items-center w-1/4 h-full '>
        <Link href={"/watches-jewelry/jewelry/all"} className='flex justify-center items-center bg-neutral-200 rounded-xl h-40 w-40  transition duration-100 ease-in-out transform hover:-translate-y-1 hover:scale-110'>
        <div>
            <Image
                  src="/jew.png"
                  layout="intrinsic"
                  alt="Logo"
                  height={200}
                  width={200}
                  className="w-32 h-8 mb-5"
                />
                    <div className='h-1/5 flex justify-center items-center mb-2 font-bold text-neutral-700'></div>  
                    </div>    
        </Link>
        </div>
    </div>
    <div className='flex w-full text-neutral-700 font-bold'>
    <div className='flex justify-center items-top w-1/4 h-full'>WATCHES</div>
    <div className='flex justify-center items-top w-1/4 h-full'>BAGS</div>
    <div className='flex justify-center items-top w-1/4 h-full'>COATS</div>
    <div className='flex justify-center items-top w-1/4 h-full'>JEWELRY</div>
    
    </div>
    </div>
  )
}

export default ClothesShow;