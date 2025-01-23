import React, { useState, forwardRef, useImperativeHandle } from "react";

import Image from "next/image";

// Définition des symboles possibles pour le rouleau
export const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SlotMachine = forwardRef(({ initialSpinCount, images }, ref) => {
  const [reel, setReel] = useState(0); // Indice du symbole actuellement visible
  const [isSpinning, setIsSpinning] = useState(false); // Indicateur de rotation
  const [spinCount, setSpinCount] = useState(initialSpinCount); // Nombre de crans à tourner
  const [finalResult, setFinalResult] = useState(null); // Résultat final à afficher
  const [symbolsList, setSymbolsList] = useState(symbols); // Liste dynamique des symboles

  // Définir les 10 images à partir de images
  const [image1, setImage1] = useState(images[0] || "/path/to/defaultImage.png");
  const [image2, setImage2] = useState(images[1] || "/path/to/defaultImage.png");
  const [image3, setImage3] = useState(images[2] || "/path/to/defaultImage.png");
  const [image4, setImage4] = useState(images[3] || "/path/to/defaultImage.png");
  const [image5, setImage5] = useState(images[4] || "/path/to/defaultImage.png");
  const [image6, setImage6] = useState(images[5] || "/path/to/defaultImage.png");
  const [image7, setImage7] = useState(images[6] || "/path/to/defaultImage.png");
  const [image8, setImage8] = useState(images[7] || "/path/to/defaultImage.png");
  const [image9, setImage9] = useState(images[8] || "/path/to/defaultImage.png");
  const [image10, setImage10] = useState(images[9] || "/path/to/defaultImage.png");


  // Expose la méthode `spinReel` à l'aide de `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    spinReel,
  }));

  // Fonction pour faire tourner le rouleau
  const spinReel = () => {
    if (isSpinning) return; // Empêche de faire tourner si déjà en train de tourner

    setIsSpinning(true);
    setFinalResult(null); // Réinitialiser le résultat final avant chaque tour

    // Remise à zéro du rouleau pour commencer avec le premier symbole
    setReel(0);

    const totalSymbols = symbolsList.length;
    const totalCranCount = spinCount; // Nombre de sauts (crans) que l'utilisateur veut

    // Intervalle de défilement avec un délai de 100ms par cran
    let cranCompleted = 0;

    const spinInterval = setInterval(() => {
      setReel((prevReel) => prevReel + 1);

      cranCompleted += 1;

      if (cranCompleted % totalSymbols === 0) {
        setSymbolsList((prevSymbols) => [...prevSymbols, ...symbols]);
      }

      if (cranCompleted > 20 && (cranCompleted + 2) % 10 === totalCranCount) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setFinalResult((cranCompleted + 2) % 10);
      }
    }, 100);
  };

  return (
    <div className="flex items-start">
    {/* Colonne 1 : Rouleau */}
    <div className="flex flex-col items-center space-x-2">
      <div className="relative w-56 h-[30rem] bg-gray-800 border-gray-500 overflow-hidden rounded-xl">
        <div
          className="absolute top-0 transition-transform duration-[100ms]"
          style={{
            transform: `translateY(-${reel * 96}px)`,
          }}
        >
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className={`text-4xl text-center  w-56 h-24 overflow-hidden rounded-xl ${
                index === Math.floor(reel + 2) ? "border-2 border-gray-500" : "border-2 border-gray-500"
              }`}
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
  </div>
  );
});

export default SlotMachine;
