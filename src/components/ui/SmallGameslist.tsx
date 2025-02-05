"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SlotMachine {
  id: string;
  url?: string;
  price?: number;
  designer?: string;
  souscategorie?: string;
  imagesrc1?: string;
  description?: string;
}

const SkeletonCard = () => (
  <div className="w-full h-96 bg-neutral-800 shadow-md animate-pulse">
    <div className="h-36 w-full rounded-t-lg"></div>
    <div className="p-3 space-y-2">
      <div className="h-20 rounded w-3/4"></div>
      <div className="h-4 rounded w-1/2 bg-gray-700"></div>
      <div className="h-4 mb-4 rounded w-full bg-gray-700"></div>
    </div>
  </div>
);

export default function SlotMachineCarousel({ name, type, genre, souscategorie, param }) {
  const [slotMachines, setSlotMachines] = useState<SlotMachine[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchSlotMachines() {
      try {
        const response = await fetch(
          `/api/getProductbyName/${"All"}?type=${""}&genre=${""}&souscategorie=${""}`
        );

        if (!response.ok) throw new Error("Failed to fetch data");
        const data: SlotMachine[] = await response.json();
        setSlotMachines(data);
      } catch (err) {
        console.error("Error fetching slot machines:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSlotMachines();
  }, [name, type, genre, souscategorie]);

  const sortedMachines = [...slotMachines].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;

    if (param?.Price === "High to Low") {
      return priceB - priceA;
    }
    if (param?.Price === "Low to High") {
      return priceA - priceB;
    }
    return 0;
  });

  const limitedMachines = sortedMachines.slice(0, 10);
  const initialIndex = limitedMachines.length >= 5 ? 4 : 0; // Centrer l'item 5 si possible

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [limitedMachines.length]);

  const getVisibleSlides = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) return 1;
      if (screenWidth < 1024) return 2;
      return 4;
    }
    return 4; // Default for server-side rendering
  };

  return (
    <div className="h-auto p-6">
      <h1 className="text-3xl text-neutral-200 font-semibold text-white text-center mb-6">
        Slot Machines
      </h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <SkeletonCard key={i} />
            ))}
        </div>
      ) : (
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          selectedItem={currentIndex}
          onChange={setCurrentIndex}
          centerMode={true}
          centerSlidePercentage={100 / getVisibleSlides()}
          infiniteLoop={true}
          emulateTouch={true}
        >
          {limitedMachines.map((machine) => (
            <div key={machine.id} className="px-2">
              <Link href={`/product/${machine.id}`} legacyBehavior>
                <div className="w-full h-96 border border-neutral-300 overflow-hidden cursor-pointer">
                  <div className="w-full h-56 overflow-hidden">
                    <Image
                      className="w-full h-full object-contain transform transition-transform hover:scale-105"
                      src={machine?.imagesrc1 + "1.webp" || "/black.png"}
                      width={400}
                      height={224}
                      alt={machine?.description || `Slot Machine ${machine.id}`}
                    />
                  </div>
                  <div className="h-full p-3 text-neutral-700 text-center font-bold">
                    <div className="flex justify-left items-left">
                      {machine?.designer || `Machine ${machine.id}`}
                    </div>
                    <div className="flex justify-left items-left text-neutral-500 text-sm">
                      {machine?.souscategorie}
                    </div>
                    <div className="flex justify-left items-left">
                      {machine?.price ? `${machine.price} USDT` : "Prix non disponible"}
                    </div>
                    <div className="flex justify-left items-left text-sm">
                      Direct send{" "}
                      <svg
                        className="ml-1 mt-1"
                        width="4%"
                        height="4%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
