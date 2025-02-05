"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Footer = () => {

  const router = useRouter();
  
  return (
    <footer className="border-t-2 h-max mb-9 border-neutral-300  sm:flex-col sm:items-center sm:justify-between antialiased">
    
    <div className='h-8'></div>
    <div className='flex h-56 w-full'>
      <div className='w-1/3 flex-col justify-center font-bold  space-y-1'>
        <div className='flex justify-center'>
          <div>Virgile</div>      
        </div>
        <div className='flex justify-center'>
          <button onClick={() => router.push('/ourconcept')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
            Our Concept
          </button>      
        </div>
        <div className='flex justify-center'>
          <button onClick={() => router.push('/ourconcept')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
            Service
          </button>      
        </div>
     
     
      </div>

      <div className='w-1/3 flex-col justify-center font-bold space-y-1'>
        <div className='flex justify-center'>
          <div>Buy</div>      
          
        </div>
        <div className='flex justify-center'>
        <button onClick={() => router.push('/authentification')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
        Our authentication service
          </button>      
        </div>
        <div className='flex justify-center'>
        <button onClick={() => router.push('/returnpolicy')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
        Return Policy
          </button>      
        </div>
      </div>

      <div className='w-1/3 flex-col justify-center font-bold  space-y-1'>
        <div className='flex justify-center'>
          <div>Customer Service</div>      
        </div>
        <div className='flex justify-center'>
        <button onClick={() => router.push('/contact')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
            Contact
          </button>      
        </div>
        <div className='flex justify-center'>
        <button onClick={() => router.push('/contact')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
            Help center
          </button>      
        </div>
        <div className='flex justify-center'>
        <button onClick={() => router.push('/contact')} className="text-yellow-900 underline-offset-2 hover:text-yellow-600">
            {/* empty div - no text */}
          </button>      
        </div>
      </div>

      

    </div>
    <div className='h-4 border-t-2  border-neutral-300 '></div>
    <div className='h-10 w-full '>
      <div className='w-1/4 flex h-full justify-center font-bold space-y-1'>
        <div>Token accepted</div>
      </div>
    </div>
    <div className='h-12 w-full'>
      <div className='flex w-full h-full font-bold '>
        <div className='w-24 ml-4'></div>
        <div className='w-24 rounded-lg bg-neutral-200 flex justify-center items-center '>
          <div className='justify-center flex items-center space-x-5'>
            <Image
              src="/PNG LIST/8.png"
              layout="intrinsic"
              alt="Logo"
              height={20}
              width={20}
              className='mr-2'
            />
            USDT
          </div>
        </div>
      </div>
    </div>
    <div className='h-4 mt-9 border-t-2  border-neutral-300  '></div>
    <div className='flex mt-5 items-center justify-between w-full'>
      <Image
        src="/LOGO.png"
        layout="intrinsic"
        alt="Logo"
        height={100}
        width={100}
        className="w-20 h-6 mr-1 ml-1"
      />
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        <span>
          A selection of the most prestigious brands in the world.
        </span>
      </p>
      <div className="flex-col justify-center items-center space-x-1">
        <Link href={"https://x.com/Durandall235383"}>
          <span
            data-tooltip-target="tooltip-twitter"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>

  </footer>
  );
};

export default Footer;
