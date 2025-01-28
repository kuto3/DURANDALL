"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Footer = () => {

  const router = useRouter();
  
  return (
    <footer className="border-t-2 h-auto mb-9 border-neutral-700 shadow sm:flex-col sm:items-center sm:justify-between antialiased">
    
    <div className='h-8'></div>
    <div className='flex h-56 w-full'>
      <div className='w-1/4 flex-col justify-center font-bold  space-y-1'>
        <div className='flex justify-center'>
          <div>Casino</div>      
        </div>
        <div className='flex justify-center'>
          <button onClick={() => router.push('/games')} className="text-purple-900 underline-offset-2 hover:text-neutral-300">
            multislots originals
          </button>      
        </div>
        <div className='flex justify-center'>
          <button onClick={() => router.push('/games')} className="text-purple-900 underline-offset-2 hover:text-neutral-300">
            slot machine
          </button>         
        </div>
        <div className='flex justify-center'>
          <button onClick={() => router.push('/games')} className="text-purple-900 underline-offset-2 hover:text-neutral-300">
            slot machine by the community
          </button>       
        </div>
      </div>

      <div className='w-1/4 flex-col justify-center font-bold space-y-1'>
        <div className='flex justify-center'>
          <div>Politics</div>      
          
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/terms_of_use')}>
            terms of use
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/privacy_policy')}>
            privacy policy
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/gaming_policy')}>
            gaming policy
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/kyc-aml-cft_policy')}>
            kyc-aml-cft policy
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/responsible_gaming')}>
            responsible gaming
          </button>  
        </div>
      </div>

      <div className='w-1/4 flex-col justify-center font-bold  space-y-1'>
        <div className='flex justify-center'>
          <div>Customer Service</div>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/responsible_gaming')}>
            about us
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/responsible_gaming')}>
            live customer support
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/responsible_gaming')}>
            help center
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/responsible_gaming')}>
            {/* empty div - no text */}
          </button>      
        </div>
      </div>

      <div className='w-1/4 flex-col justify-center font-bold  space-y-1'>
        <div className='flex justify-center'>
          <div>Community</div>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/join_our_program')}>
            join our program
          </button>      
        </div>
        <div className='flex justify-center'>
          <button className="text-purple-900 underline-offset-2 hover:text-neutral-300" onClick={() => router.push('/slot_machine')}>
            slot machine
          </button>      
        </div>
      </div>

    </div>
    <div className='h-4 border-t-2  border-neutral-700 shadow '></div>
    <div className='h-10 w-full '>
      <div className='w-1/4 flex h-full justify-center font-bold space-y-1'>
        <div>Token accepted</div>
      </div>
    </div>
    <div className='h-12 w-full'>
      <div className='flex w-full h-full font-bold '>
        <div className='w-24 ml-4'></div>
        <div className='w-24 rounded-lg bg-neutral-800 flex justify-center items-center border-2 border-neutral-700'>
          <div className='justify-center flex items-center'>
            <Image
              src="/PNG LIST/8.png"
              layout="intrinsic"
              alt="Logo"
              height={30}
              width={30}
            />
            Solana
          </div>
        </div>
      </div>
    </div>
    <div className='h-4 mt-9 border-t-2  border-neutral-700 shadow '></div>
    <div className='flex mt-5 items-center justify-between w-full'>
      <Image
        src="/MULTISLOT.png"
        layout="intrinsic"
        alt="Logo"
        height={200}
        width={200}
        className="w-32 h-9 mr-1 ml-1"
      />
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        <span>
          Create games on solana, play, win money !
        </span>
      </p>
      <div className="flex-col justify-center items-center space-x-1">
        <Link href={"https://x.com/multislotcasino"}>
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
