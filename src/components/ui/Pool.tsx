"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';
import Image from 'next/image';

export default function Pool() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wheelImages, setWheelImages] = useState<FileList | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const router = useRouter();
  const { publicKey } = useWallet();

  const [isDeposit, setIsDeposit] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (wheelImages) {
      Array.from(wheelImages).forEach((file, index) => {
        formData.append(`wheelImage${index}`, file);
      });
    }

    if (backgroundImage) {
      formData.append('backgroundImage', backgroundImage);
    }

    if (logoImage) {
      formData.append('logoImage', logoImage);
    }

    try {
      const response = await axios.post('/api/publishtoipfs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erreur lors de la création : ${response.statusText}`);
      }

      router.push('/slotmachines');
    } catch (err) {
      setError('Une erreur s\'est produite lors de la création.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex-col bg-black p-9'>
          <h1>Your Public key is: {publicKey?.toString()}</h1>
    <div className="flex space-x-8 border-gray-500 justify-center items-center ">
      <div className="justify-center items-center p-2 ml-5 w-1/3 h-full flex ">
        <div className="w-full mx-auto p-6 rounded-lg bg-neutral-800 w-full h-[35rem] border-2 border-neutral-700">
        <h2 className="text-2xl font-semibold text-white mt-1">POOL</h2>
          <div className='flex'>
      
       
            

            <div className="space-y-4 border-2 p-4 rounded-xl bg-neutral-900 border-neutral-700 text-neutral-300 h-full w-full mt-6">
              <div>
                <p className="text-white mb-3">Your actual deposit :</p>
                <div className="space-y-4 border-2 p-4 rounded-xl bg-neutral-900 border-neutral-700 text-neutral-300 h-full w-full mt-6 mb-6">
                2 SOL
              </div>
              <div className="grid grid-cols-2 gap-2">
                  <button>
                  <div onClick={() => setIsDeposit(true)} className='border-2 border-neutral-700 h-10 rounded-xl flex justify-center items-center bg-neutral-800 hover:bg-neutral-900'>
                    DEPOSIT
                  </div>
                  </button>
                  <div onClick={() => setIsDeposit(false)} className='border-2 border-neutral-700 h-10 rounded-xl flex justify-center items-center bg-neutral-800 hover:bg-neutral-900'>
                    WITHDRAW
                  </div>
                  
                 
           
                </div>
                <div onClick={() => setIsDeposit(false)} className='border-2 mt-2 border-neutral-700 h-10 rounded-xl flex justify-center items-center bg-neutral-800 hover:bg-neutral-900'>
                    WITHDRAW GAINS
                  </div>
              <div className='h-24 border-2 mt-4 w-full flex-col rounded-xl border-neutral-700'>
                <div className='h-3/5  w-full flex'>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= 25) {
                      setTitle(e.target.value);
                    }
                  }}
                  className="w-4/5 h-full bg-neutral-900 text-white rounded-md mx-4 focus:outline-none focus:ring-0"
                  required
                />
                <div className='h-full w-1/5 border-l-2 border-neutral-700 flex justify-center items-center mr-4'>
                <Image src="/PNG LIST/8.png" layout="intrinsic" alt="Logo" height={500} width={500} className="w-12 h-12 p-2" />
                SOL
                </div>
                </div>
                <div className='h-2/5 border-t-2 border-neutral-700 w-full flex'>
                <div className='w-3/5'></div>
                <div className='w-2/5 flex'>
               
                <div className='w-4/5 flex justify-center items-center text-sm ml-9'> 222 SOL max</div>
                <div className='w-1/5  flex justify-center items-center mr-3 mb-1'>
                <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17C12 19.7614 14.2386 22 17 22C19.7614 22 22 19.7614 22 17C22 14.2386 19.7614 12 17 12C14.2386 12 12 14.2386 12 17ZM12 17C12 15.8742 12.3721 14.8353 13 13.9995V5M12 17C12 17.8254 12.2 18.604 12.5541 19.2901C11.7117 20.0018 9.76584 20.5 7.5 20.5C4.46243 20.5 2 19.6046 2 18.5V5M13 5C13 6.10457 10.5376 7 7.5 7C4.46243 7 2 6.10457 2 5M13 5C13 3.89543 10.5376 3 7.5 3C4.46243 3 2 3.89543 2 5M2 14C2 15.1046 4.46243 16 7.5 16C9.689 16 11.5793 15.535 12.4646 14.8618M13 9.5C13 10.6046 10.5376 11.5 7.5 11.5C4.46243 11.5 2 10.6046 2 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
                </div>
              
                </div>
              </div>
           
             
              {isDeposit && ( <div className="flex justify-end col-span-2">
                <button
                  type="submit"
                  className={`px-6 py-2 mt-3 w-full bg-blue-600 hover:bg-blue-900 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Deposit...' : 'DEPOSIT'}
                </button>
              </div>)}

              {!isDeposit && ( <div className="flex justify-end col-span-2">
                <button
                  type="submit"
                  className={`px-6 py-2 mt-3 w-full bg-blue-600 hover:bg-blue-900 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Withdraw...' : 'WITHDRAW'}
                </button>
              </div>)}
             
              
            </div>
            

          </div>
        </div>
      </div>

      </div>
      
      </div>
      <div className="flex space-x-8 border-gray-500  rounded-2xl justify-center items-center mt-8">
      <div className="justify-center items-center p-3 ml-5 w-10/12 h-full flex ">
        <div className="w-full mx-auto p-6 rounded-lg bg-neutral-800 w-full h-[17rem] border-2 border-neutral-700 h-full">
        <h2 className="text-2xl font-semibold text-white ">POOL INFORMATION</h2>
         <div className=' bg-neutral-700 flex justify-center items-center rounded-xl h-4/5 mt-3 p-6'><div className='flex-col space-y-3 justify-center items-center'> <div className='text-neutral-400 text-xl'>Actual Liquidity</div><div className='text-neutral-100 text-4xl ml-8'>200K</div></div></div>
        </div>
      </div>

      </div>
      <div className='h-12'></div>
      </div>
  );
}

