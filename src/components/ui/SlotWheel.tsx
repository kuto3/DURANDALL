import React, { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";

export const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SlotMachine = forwardRef(({ initialSpinCounts = [6,6,1,6,1], images }, ref) => {
  const [reels, setReels] = useState(Array(5).fill(0));
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCounts, setSpinCounts] = useState(initialSpinCounts);
  const [finalResults, setFinalResults] = useState(Array(5).fill(null));
  const [symbolsList, setSymbolsList] = useState(symbols);
  const [isWin, setIsWin] = useState(false);

  useImperativeHandle(ref, () => ({
    spinReel,
  }));

  const spinReel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setFinalResults(Array(5).fill(null));
    setReels(Array(5).fill(0));

    const totalSymbols = symbolsList.length;
    let cranCompleted = Array(5).fill(0);

    const spinIntervals = spinCounts.map((count, index) => {
      return setInterval(() => {
        setReels((prevReels) => {
          const newReels = [...prevReels];
          newReels[index] += 1;
          return newReels;
        });

        cranCompleted[index] += 1;

        if (cranCompleted[index] % totalSymbols === 0) {
          setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
        }

        if (cranCompleted[index] > 20 && (cranCompleted[index] + 2) % 10 === count) {
          clearInterval(spinIntervals[index]);
          setFinalResults((prevResults) => {
            const newResults = [...prevResults];
            newResults[index] = (cranCompleted[index] + 2) % 10;
            return newResults;
          });

          if (cranCompleted.every((cran, i) => (cran + 2) % 10 === spinCounts[i])) {
            setIsSpinning(false);
          }
        }
      }, 100);
    });
  };

  const renderReel = (reelIndex) => (
    <div key={reelIndex} className="flex flex-col items-center space-x-2">
      <div className="relative w-56 h-[30rem] bg-gray-800 border-gray-500 overflow-hidden rounded-xl">
        <div
          className="absolute top-0 transition-transform duration-[100ms]"
          style={{
            transform: `translateY(-${reels[reelIndex] * 96}px)`,
          }}
        >
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className={`text-4xl text-center w-56 h-24 overflow-hidden rounded-xl ${
                index === Math.floor(reels[reelIndex] + 2) && !isSpinning
                  ? "border-4 animate-borderGlow"
                  : "border-2 border-gray-500"
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
    </div>
  );

  return (
    <div className="flex items-start space-x-4">
      {Array.from({ length: 5 }).map((_, index) => renderReel(index))}
    </div>
  );
});

export default SlotMachine;
