"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { url } from "inspector";

export default function SmallGamesList() {
  // Define a static array of slot machines for manual modification
  const [slotMachines, setSlotMachines] = useState([
    { id: "1", name: "NUCLEAR", image: "/nuclear.png", url: "/games/nucleargame" },
    { id: "2", name: "ROCKET", image: "/rockets.png", url: "/games/rocketgame" },
    { id: "3", name: "BLINKO", image: "/blinko.png", url: "/games/blinkogame" },
    { id: "4", name: "HORSE GAME", image: "/horses.jpg", url: "/games/horsegame" },
    { id: "5", name: "DICE", image: "/dice.png", url: "/games/dicegame" },
    { id: "6", name: "MINE", image: "/mine.jpg", url: "/games/minegame" },
    { id: "7", name: "ROULETTE", image: "/roulette.jpg", url: "/games/roulettegame" },
    { id: "8", name: "BLACKJACK", image: "/blackjack5.png", url: "/games/blackjackgame" },
  ]);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next and previous actions with wrap-around for infinite scrolling
  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (slotMachines.length * 3));
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + slotMachines.length * 3) % (slotMachines.length * 3)
    );
  };

  const translateX = () => {
    return -(currentIndex % slotMachines.length) * 15; // Adjust for card width
  };

  // Render cards in triplicate for the illusion of infinite scrolling
  const renderCards = () => {
    let cards = [];
    for (let i = 0; i < slotMachines.length * 3; i++) {
      const index = i % slotMachines.length;
      const machine = slotMachines[index];

      cards.push(
        <Link href={machine.url} key={i} className="w-36 h-56 flex-none mx-2">
          <div className="shadow-md transition-transform transform hover:-translate-y-4 block bg-neutral-800 rounded-lg shadow-md h-56 w-full overflow-hidden relative">
            <Image
              className="rounded-t-lg w-full h-full object-cover opacity-80"
              src={machine.image}
              width={200}
              height={200}
              alt={`Image of ${machine.name}`}
            />
            <div className="absolute inset-0 flex items-end justify-center text-white text-lg font-bold">
              <div className="mb-4">{machine.name}</div>
            </div>
          </div>
        </Link>
      );
    }
    return cards;
  };

  return (
    <div className="bg-black overflow-hidden  w-full">
      <div className="text-3xl font-semibold text-white text-center mt-9 flex">
        <div className="flex h-16 justify-start items-center pl-2">
          <div className="flex">
          <svg width="7%" height="7%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.99989 11H9.99989M7.99989 9V13M14.9999 12H15.0099M17.9999 10H18.0099M10.4488 5H13.5509C16.1758 5 17.4883 5 18.5184 5.49743C19.4254 5.9354 20.179 6.63709 20.6805 7.51059C21.2501 8.5027 21.3436 9.81181 21.5306 12.43L21.7766 15.8745C21.8973 17.5634 20.5597 19 18.8664 19C18.0005 19 17.1794 18.6154 16.6251 17.9502L16.2499 17.5C15.9068 17.0882 15.7351 16.8823 15.5398 16.7159C15.1302 16.3672 14.6344 16.1349 14.1043 16.0436C13.8514 16 13.5834 16 13.0473 16H10.9525C10.4164 16 10.1484 16 9.89553 16.0436C9.36539 16.1349 8.86957 16.3672 8.46 16.7159C8.26463 16.8823 8.09305 17.0882 7.74989 17.5L7.37473 17.9502C6.8204 18.6154 5.99924 19 5.13335 19C3.44013 19 2.1025 17.5634 2.22314 15.8745L2.46918 12.43C2.65619 9.81181 2.7497 8.5027 3.31926 7.51059C3.82074 6.63709 4.57433 5.9354 5.48135 5.49743C6.51151 5 7.82396 5 10.4488 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className="ml-3 text-2xl font-bold">ORIGINAL MULTISLOT GAMES</div>
          </div>
        </div>
        <div className="h-10 mt-4 w-full flex justify-end">
          <button
            className="h-8 w-12 bg-purple-800 hover:bg-purple-950 flex justify-center items-center rounded-lg"
            onClick={prevCard}
            style={{ zIndex: 10 }}
          >
            <svg
              width="60%"
              height="60%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="h-8 w-12 bg-purple-800 hover:bg-purple-950 flex justify-center items-center rounded-lg"
            onClick={nextCard}
            style={{ zIndex: 10 }}
          >
            <svg
              width="60%"
              height="60%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center w-full rounded-xl h-56">
        <div className="relative w-full">
          <div className="flex" style={{ transform: `translateX(${translateX()}%)` }}>
            {renderCards()}
          </div>
        </div>
      </div>
    </div>
  );
}
