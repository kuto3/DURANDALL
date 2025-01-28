import React, { useState, forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import Image from "next/image";

export const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SlotMachine = forwardRef(({ initialSpinCounts , images }, ref) => {
  const [reels, setReels] = useState(Array(3).fill(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCounts, setSpinCounts] = useState(initialSpinCounts);
  const [finalResults, setFinalResults] = useState(Array(5).fill(null));
  const [symbolsList, setSymbolsList] = useState(symbols);
  const [isWin, setIsWin] = useState(false);
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    spinReel,
  }));

  useEffect(() => {
    if (!isSpinning && audioRef.current) {
      // audioRef.current.play();
    }
  }, [isSpinning]);

  const spinReel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFinalResults(Array(3).fill(null));
    setReels(Array(3).fill(0));

    const totalSymbols = symbolsList.length;
    let cranCompleted = 0;

    const spinInterval = setInterval(() => {
      setReels((prevReels) => prevReels.map((reel) => reel + 1));

      cranCompleted += 1;

      if (cranCompleted % totalSymbols === 0) {
        setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
      }

      if (cranCompleted > 20) {
        const allReelsFinished = spinCounts.every((count, index) => 
          (cranCompleted + 2) % 10 === count
        );

        if (allReelsFinished) {
          clearInterval(spinInterval);
          setIsSpinning(false);
          setFinalResults(spinCounts.map(count => (cranCompleted + 2) % 10));
        }
      }
    }, 100);
  };

  const renderReels = () => (
    <div className="flex items-start space-x-4 w-full">
      {reels.map((reel, reelIndex) => (
        <div key={reelIndex} className="relative w-56 h-[30rem] bg-gray-800 border-gray-500 overflow-hidden rounded-xl">
          <div
            className="absolute top-0 transition-transform duration-[100ms]"
            style={{
              transform: `translateY(-${reel * 96}px)`,
            }}
          >
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className={`text-4xl text-center w-56 h-24 overflow-hidden rounded-xl 
                  ${index !== Math.floor(reel + 2) || isSpinning
                    ? 'border-2 border-gray-500'
                    : 'invisible'
                  }`}
              >
                <Image
                  src={images[symbolsList[index % symbolsList.length]]}
                  width={120}
                  height={120}
                  alt="Image de la machine à sous"
                  className="object-contain w-full h-full rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      {!isSpinning && (
        <div className="absolute top-1/2 left-100 right-0 transform -translate-y-1/2 flex justify-center w-full">
          <div className="flex justify-center items-center text-4xl text-yellow-600 font-bold border-4 bg-gray-800 border-yellow-500 animate-borderGlow rounded-xl overflow-hidden h-24 w-full ">
            BIG WIN !   BIG WIN !   BIG WIN !   BIG WIN !  
          </div>
          <audio ref={audioRef} src="/Victory Sound.mp3" />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative">
      {renderReels()}
    </div>
  );
});

export default SlotMachine;
