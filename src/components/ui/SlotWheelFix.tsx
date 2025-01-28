import React, { useState, forwardRef, useImperativeHandle } from "react";
import AnimatedText from "./AnimatedText"
import Image from "next/image";

// Définition des symboles possibles pour le rouleau
export const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SlotMachine = forwardRef(({ initialSpinCount, images, isWin, isBigWin }, ref) => {

  const [reel1, setReel1] = useState(0); 
  const [reel2, setReel2] = useState(0);
  const [reel3, setReel3] = useState(0);

  const [isSpinning1, setIsSpinning1] = useState(false); // Indicateur de rotation
  const [isSpinning2, setIsSpinning2] = useState(false); // Indicateur de rotation
  const [isSpinning3, setIsSpinning3] = useState(false); // Indicateur de rotation

  const [spinCount1, setSpinCount1] = useState(1); // Nombre de crans à tourner
  const [spinCount2, setSpinCount2] = useState(6); // Nombre de crans à tourner
  const [spinCount3, setSpinCount3] = useState(6); // Nombre de crans à tourner
  const [finalResult, setFinalResult] = useState(null); // Résultat final à afficher
  const [symbolsList, setSymbolsList] = useState(symbols); // Liste dynamique des symboles




  // Expose la méthode `spinReel` à l'aide de `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    spinReel,
  }));

  // Fonction pour faire tourner le rouleau
  const spinReel = () => {
    if (isSpinning1) return; // Empêche de faire tourner si déjà en train de tourner

    setIsSpinning1(true);
    setIsSpinning2(true);
    setIsSpinning3(true);
    setFinalResult(null); // Réinitialiser le résultat final avant chaque tour

    // Remise à zéro du rouleau pour commencer avec le premier symbole
    setReel1(0);
    setReel2(0);
    setReel3(0);

    const totalSymbols = symbolsList.length;


    // Intervalle de défilement avec un délai de 100ms par cran
    let cranCompleted1 = 0;
    let cranCompleted2 = 0;
    let cranCompleted3 = 0;


    const spinInterval = setInterval(() => {
      setReel1((prevReel) => prevReel + 1);
      
      

      cranCompleted1 += 1;

      if (cranCompleted1 % totalSymbols === 0) {
        setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
      }

      if (cranCompleted1 > 20 && (cranCompleted1 + 2) % 10 === spinCount1) {
        clearInterval(spinInterval);
        setIsSpinning1(false);
        setFinalResult((cranCompleted1 + 2) % 10);
      }

    }, 55);
    const spinInterval2 = setInterval(() => {
        setReel2((prevReel) => prevReel + 1);
  
        cranCompleted2 += 1;
  
        if (cranCompleted2 % totalSymbols === 0) {
          setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
        }
  
        if (cranCompleted2 > 30 && (cranCompleted2 + 2) % 10 === spinCount2) {
          clearInterval(spinInterval2);
          setIsSpinning2(false);
          setFinalResult((cranCompleted2 + 2) % 10);
        }
  
      }, 55);
      const spinInterval3 = setInterval(() => {
        setReel3((prevReel) => prevReel + 1);
  
        cranCompleted3 += 1;
  
        if (cranCompleted3 % totalSymbols === 0) {
          setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
        }
  
        if (cranCompleted3 > 50 && (cranCompleted3 + 2) % 10 === spinCount3) {
          clearInterval(spinInterval3);
          setIsSpinning3(false);
          setFinalResult((cranCompleted3 + 2) % 10);
        }
  
      }, 55);
  };

  

  return (
    <div>
    <div className="flex items-start justify-center space-x-3">
    {/* Colonne 1 : Rouleau */}
    <div className="items-center space-x-2">
      <div className="flex justify-center relative w-64 h-[36rem] bg-gray-800  border-2 p-3 border-gray-500 overflow-hidden rounded-xl">
        <div
          className="absolute top-0 transition-transform duration-[100ms]"
          style={{
            transform: `translateY(-${reel1 * 192}px)`,
          }}
        >
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center text-4xl text-center w-56 h-[12rem] overflow-hidden rounded-xl `}
            >
                
              <Image
                src={images[symbolsList[index % symbolsList.length]]} // Utilisation correcte du tableau d'images
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
    <div className="flex flex-col justify-center items-center space-x-2">
      <div className="flex justify-center relative w-64 h-[36rem] bg-gray-800 border-2  border-gray-500 overflow-hidden rounded-xl">
        <div
          className="absolute top-0 transition-transform duration-[100ms]"
          style={{
            transform: `translateY(-${reel2 * 192}px)`,
          }}
        >
         {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className={`text-4xl text-center  w-56 h-[12rem] overflow-hidden rounded-xl `}
            >
              <Image
                src={images[symbolsList[index % symbolsList.length]]} // Utilisation correcte du tableau d'images
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
    <div className="flex flex-col items-center space-x-2">
      <div className="flex justify-center relative w-64 h-[36rem] bg-gray-800  border-2 border-gray-500 overflow-hidden rounded-xl">
        <div
          className="absolute top-0 transition-transform duration-[100ms]"
          style={{
            transform: `translateY(-${reel3 * 192}px)`,
          }}
        >
          {Array.from({ length: 60 }).map((_, index) => (
            <div
              key={index}
              className={`text-4xl text-center  w-56 h-[12rem] overflow-hidden rounded-xl `}
            >
              <Image
                src={images[symbolsList[index % symbolsList.length]]} // Utilisation correcte du tableau d'images
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
    {isWin && (

          <div className="h-32 right-75 absolute w-[49rem] top-1/2  -translate-y-1/2 flex justify-center items-center text-4xl text-yellow-600 font-bold border-4 bg-gray-800 border-yellow-500 animate-borderGlow rounded-xl">
             CONGRATULATION !
           
          </div>

      )}
    {isBigWin && (

<div className="flex flex-col h-3/4 w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center text-4xl text-yellow-600 font-bold bg-[url('/border.png')] bg-cover bg-center">
  <div className="h-full w-full flex justify-center items-center mt-6 ">
    <div className="text-3xl">
      Congratulations you win 5 SOL !
    </div>
  </div>
  <div className="h-1/2 w-full">
    {/* Empty content for the bottom section */}
  </div>
</div>


)}
      
  </div>

  </div>
  );
});

export default SlotMachine;