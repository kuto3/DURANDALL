"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the type for a slot machine object
interface SlotMachine {
  id: string;
  url?: string;
}

interface SlotMachineMetadata {
  name: string;
  description: string;
  images: string[];
}

// Skeleton component for loading state
const SkeletonCard = () => (
  <>
    <div className="block bg-neutral-800 border border-neutral-200 rounded-lg shadow-md dark:bg-neutral-800 dark:border-neutral-700 transition-transform transform animate-pulse">
    <div className="h-64 bg-gray-700 rounded-t-lg" /> {/* Placeholder for image */}
    <div className="p-5 h-32 flex-col mb-6">
      <div className="flex justify-between items-start">
        <div className="w-9/12 h-6 bg-gray-600 rounded mb-2 mr-8" /> {/* Placeholder for title */}
        <div className="w-3/12 h-12 bg-gray-600 rounded" /> {/* Placeholder for PLAY button */}
      </div>
      <div className="flex-col space-y-2">
        <div className="w-1/2 h-4 bg-gray-600 rounded" /> {/* Placeholder for players count */}
        <div className="w-1/3 h-4 bg-gray-600 rounded" /> {/* Placeholder for max win */}
        <div className="w-3/4 h-4 bg-gray-600 rounded" /> {/* Placeholder for description */}
      </div>
    </div>
  </div>
  </>
);
export default function SlotMachineList() {
  const [slotMachines, setSlotMachines] = useState<SlotMachine[]>([]);
  const [error, setError] = useState('');
  const [loadingMetadata, setLoadingMetadata] = useState<{ [id: string]: SlotMachineMetadata }>({});
  const [isSlotMachinesLoaded, setIsSlotMachinesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlotMachines() {
      try {
        const response = await fetch('/api/diplomas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SlotMachine[] = await response.json();
        console.log(data)
        setSlotMachines(data);
        setIsSlotMachinesLoaded(true);
      } catch (err) {
        console.error('Erreur lors de la récupération des machines à sous:', err);
        setError('Erreur lors de la récupération des machines à sous');
      } finally {
        setLoading(false);
      }
    }

    fetchSlotMachines();
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      const updatedMetadata: { [id: string]: SlotMachineMetadata } = {};

      for (const machine of slotMachines) {
        if (machine.url && !loadingMetadata[machine.id]) {
          try {
            const response = await fetch(machine.url);
            if (!response.ok) throw new Error(`Failed to fetch metadata from IPFS: ${response.status}`);
            const data: SlotMachineMetadata = await response.json();
            updatedMetadata[machine.id] = data;
            console.log(data);
          } catch (error) {
            console.error(`Erreur lors du chargement des métadonnées pour la machine ${machine.id}`, error);
          }
        }
      }

      setLoadingMetadata((prevMetadata) => ({ ...prevMetadata, ...updatedMetadata }));
    };

    if (isSlotMachinesLoaded) {
      fetchMetadata();
    }
  }, [isSlotMachinesLoaded, slotMachines]);

  return (
    <div className="p-6 bg-black ">
      <div className='h-12'></div>
      <div className='text-3xl font-semibold  text-white text-center  mt-9 flex'><div className='w-28 mb-4'></div><div className='h-1/2'>SLOT MACHINES</div></div>


      <div className='h-12'></div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-9 px-9">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : slotMachines.length === 0 ? (
          <p className="text-center">Aucune machine à sous trouvée.</p>
        ) : (
          slotMachines.map((machine) => {
            const metadata = loadingMetadata[machine.id];
            return (
              <Link key={machine.id} href={`/slotgame/${machine.id}`} legacyBehavior>
                <div className="block bg-neutral-800 border-4 border-neutral-700 rounded-lg shadow-md   transition-transform transform hover:scale-105">
                  <Image
                    className="rounded-t-lg w-full h-64 object-cover"
                    src={metadata?.images[0] || '/black.png'} // Use the first image from the array, or fallback
                    width={500}
                    height={500}
                    alt={`Image de ${metadata?.name || `la machine à sous ${machine.id}`}`}
                  />
                  <div className="p-5 h-32 flex-col mb-6 text-gray-400">
                    <div className="flex">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-300 dark:text-white overflow-hidden w-9/12">
                      {metadata?.name || `Machine à sous ${machine.id}`}
                    </h5>
                    <span className="w-3/12 text-xs inline-flex h-12 items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg border-2 border-neutral-600">
                     PLAY
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </span>
                    </div>
                    <div className="flex-col">
                    <h5 className="mb-2 text-xs font-bold tracking-tight  overflow-hidden w-9/12">
                      20 peoples playing it right now 
                    </h5>
                    <h5 className="mb-2 text-xs font-bold tracking-tight   overflow-hidden w-9/12">
                      MAX WIN x500 
                    </h5>
                    <h5 className="mb-2 text-xs font-bold tracking-tight   overflow-hidden w-9/12">
                      {metadata?.description || `Machine à sous ${machine.id}`}
                    </h5>
                   
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <div className='h-56 bg-black'></div>
    </div>
  );
}
