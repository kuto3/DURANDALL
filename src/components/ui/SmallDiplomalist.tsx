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
// Skeleton component for loading state
const SkeletonCard = () => (
  <div className="w-36 h-56 mx-2 bg-neutral-800 rounded-lg shadow-md animate-pulse">
    {/* Placeholder pour l'image */}
    <div className="h-36 w-full rounded-t-lg"></div>
    {/* Placeholder pour les détails */}
    <div className="p-3 space-y-2">
      <div className="h-4  rounded w-3/4"></div>
      <div className="h-4  rounded w-1/2"></div>
      <div className="h-4 mb-4 rounded w-full"></div>
    </div>
  </div>
);



export default function SlotMachineList() {
  const [slotMachines, setSlotMachines] = useState<SlotMachine[]>([]);
  const [error, setError] = useState('');
  const [loadingMetadata, setLoadingMetadata] = useState<{ [id: string]: SlotMachineMetadata }>({});
  const [isSlotMachinesLoaded, setIsSlotMachinesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchSlotMachines() {
      try {
        const response = await fetch('/api/diplomas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SlotMachine[] = await response.json();
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

  // Handle next and previous actions with wrap-around for infinite scrolling
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (slotMachines.length * 0.3));
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slotMachines.length * 1) % (slotMachines.length * 1));
  };

  const translateX = () => {
    return -((currentIndex % slotMachines.length) * 15); // 25% for each card
  };

  // Render cards in triplicate for the illusion of infinite scrolling
  const renderCards = () => {
    let cards = [];
    for (let i = 0; i < slotMachines.length * 3; i++) { 
      let index = i % slotMachines.length; 
      const machine = slotMachines[index];
      const metadata = loadingMetadata[machine.id]; 
    
      cards.push(
        <div key={i} className="w-36 h-56 flex-none mx-2 ">
          <Link key={machine.id} href={`/slotgame/${machine.id}`} legacyBehavior>
            <div className="shadow-md transition-transform transform hover:-translate-y-4 block bg-neutral-800 rounded-lg shadow-md h-56 w-full overflow-hidden relative">
              <Image
                className="rounded-t-lg w-full h-full object-cover opacity-80"
                src={metadata?.images[0] || '/black.png'}
                width={200}
                height={200}
                alt={`Image de ${metadata?.name || `la machine à sous ${machine.id}`}`}
              />
              <div className="absolute inset-0 flex items-end justify-center text-white text-lg font-bold">
                <div className="mb-4">
                  {metadata?.name || `Machine à sous ${machine.id}`}
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return cards;
  };

  return (
    <div className="bg-black overflow-hidden w-full">
      <div className='text-3xl font-semibold text-white text-center mt-9 flex'>
        <div className="flex h-16 justify-start items-center pl-2">
          <div className='flex'>
            <svg
              width="6%"
              height="6%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className='mt-1'
            >
              <path
                d="M13 2L4.09344 12.6879C3.74463 13.1064 3.57023 13.3157 3.56756 13.4925C3.56524 13.6461 3.63372 13.7923 3.75324 13.8889C3.89073 14 4.16316 14 4.70802 14H12L11 22L19.9065 11.3121C20.2553 10.8936 20.4297 10.6843 20.4324 10.5075C20.4347 10.3539 20.3663 10.2077 20.2467 10.1111C20.1092 10 19.8368 10 19.292 10H12L13 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="ml-3 text-2xl font-bold">COMMUNITY SLOT MACHINES</div>
          </div>
        </div>
        <div className='h-10 mt-4 w-full flex justify-end'>
          <button
            className='h-8 w-12 bg-purple-800 hover:bg-purple-950 flex justify-center items-center rounded-lg'
            onClick={prevCard}
            style={{ zIndex: 10 }}  // Ensure the button is on top if other elements overlap
          >
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            className='h-8 w-12 bg-purple-800 hover:bg-purple-950 flex justify-center items-center rounded-lg'
            onClick={nextCard}
            style={{ zIndex: 10 }}  // Ensure the button is on top if other elements overlap
          >
            <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className='flex justify-center items-center w-full rounded-xl h-56'>
      <div className="relative w-full">
      <div className="flex" style={{ transform: `translateX(${translateX()}%)` }}>
      {loading ? Array(8).fill(<SkeletonCard />) : renderCards()}
</div>

    </div>

      </div>
    </div>
  );
}
