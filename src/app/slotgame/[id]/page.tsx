"use client"

import { useRef, useState, useEffect } from "react"; // Importations correctes
import Image from "next/image"; // Importation de Image depuis Next.js
import SlotMachine2 from "../../../components/ui/SlotWheelFix"; // Importation de SlotMachine
import MultiplierInfo from "../../../components/ui/MultiplierInfo"; // Importation de SlotMachine
import AnimatedText from "../../../components/ui/AnimatedText"; // Importation de SlotMachine

export default function Page({ params }: { params: { id: string } }) {
  const machineRefs = useRef<SlotMachine[]>([]);
  const [bet, setBet] = useState(0.1); // État pour le montant du pari
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Variable pour activer/désactiver le son
  const [soundFile, setSoundFile] = useState("/0120.mp3");
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState("");
  const [background, setBackground] = useState("");
  const [isInfoVisible, setIsInfoVisible] = useState(false); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setPageisLoading] = useState(true);
  const [isWin, setIWinEnabled] = useState(true);
  const [isBigWin, setBigWinEnabled] = useState(true);
  const [isInfo, setInfoPage] = useState(false);
  const id = params.id;

  interface SlotMachine {
    id: string;
    url?: string;
  }


  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const Spinner = () => (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-purple-500"></div>
    </div>
  );


  // Fonction pour récupérer les données depuis l'API
  const fetchDiplomas = async () => {
    try {
      const response = await fetch("/api/diplomas"); // Remplacez par l'URL réelle de l'API
      const data: SlotMachine[] = await response.json();

      const id = Number(params.id) - 18
      if (!data || data.length === 0) {
        throw new Error("No data available");
      }
      
      
      let response2: Response; // Déclarez response2 dans un scope plus large
  
      if (data[id] && typeof data[id].url === "string") {
        response2 = await fetch(data[id].url);
        if (!response2.ok) {
          throw new Error("Impossible de récupérer les données de la seconde requête");
        }
      } else {
        throw new Error(`L'URL pour l'id ${id + 18} est introuvable.`);
      }
  
      const data2 = await response2.json(); // Parsez les données après la validation
      console.log(data2);
  
      // Mettre à jour les états avec les données récupérées
      setLogo(data2?.images[0]);
      console.log(logo);
      setBackground(data2?.images[1]);
      setTitle(data2?.name);
      console.log("title" + title);
      setDescription(data2?.description);
      const otherImages = data2?.images.slice(2, 12); // Récupère les images de l'index 2 à 11 (10 images)
      setImages(otherImages);
      setPageisLoading(false);
      console.log("Images restantes:", otherImages);
    } catch (error) {
      console.error("Error fetching diplomas:", error);
    }
  };
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDiplomas(); // Appelle la fonction fetchDiplomas après 10 secondes
      
    }, 1500); // 10 secondes de délai (10 000 ms)

    // Nettoie le timeout si le composant est démonté avant que le délai ne soit écoulé
    return () => clearTimeout(timeout);
  }, [id]);


  const spinAllReels = () => {
    // Lancer tous les rouleaux en même temps
    machineRefs.current.forEach((machine) => {
      if (machine?.spinReel) {
        machine.spinReel(); // Démarrer le rouleau
      }
    });

    // Arrêter chaque rouleau indépendamment avec des délais spécifiques
    machineRefs.current.forEach((machine, index) => {
      if (machine?.stopReel) {
        const stopDelay = (index + 1) * 5000; // Chaque rouleau s'arrête avec un délai croissant (1s, 2s, 3s...)
        setTimeout(() => {
          machine.stopReel(); // Arrêter le rouleau
        }, stopDelay);
      }
    });
  
    // Jouer le son si l'option est activée
    if (isSoundEnabled) {
      const sound = new Audio(soundFile);
      sound.play();
    }
  };

  // Fonction pour augmenter le pari
  const increaseBet = () => {
    setBet((prevBet) => parseFloat((prevBet + 0.05).toFixed(2)));
  };

  // Fonction pour diminuer le pari
  const decreaseBet = () => {
    setBet((prevBet) => (prevBet > 0.05 ? parseFloat((prevBet - 0.05).toFixed(2)) : prevBet));
  };

  // Fonction pour activer/désactiver le son
  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev); // Alterner entre true et false
  };

  const toggleInfoPage = () => {
    setInfoPage((prev) => !prev); // Alterner entre true et false
  };

  const toggleWin = () => {
    setIWinEnabled((prev) => !prev); // Alterner entre true et false
  };


  const toggleBigWin = () => {
    setBigWinEnabled((prev) => !prev); // Alterner entre true et false
  };
  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible); // Alterne l'affichage de la section info
  };

  return ( 
  <div className="flex flex-col  bg-black items-center h-screen ">
    {isPageLoading ? (
        // Afficher un écran de chargement (spinner) pendant le chargement
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner />
        </div>
      ) :  isBigWin ? (
        <div className="h-full w-full flex-col justify-center items-center">
        
        <div className="flex flex-col h-3/4 w-full justify-center items-center text-4xl text-yellow-600 font-bold bg-[url('/border.png')] bg-cover bg-center">
          <div className="h-full w-full flex justify-center items-center mt-6 ">
            <div className="text-3xl">
             <AnimatedText text={"Congratulation you win 5 SOL !"}/>
            </div>
          </div>
          <div className="h-1/2 w-full">
            {/* Empty content for the bottom section */}
          </div>
        </div>

       <div className="flex w-full h-22  w-4/5 border-2 border-gray-700 rounded-lg bg-gray-900 mt-2">
        <div className="flex justify-center items-center mt-2">
            <div className="flex w-1/3">
          <button
            onClick={spinAllReels}
            className="bg-blue-500 border-2 border-blue-900 text-white font-bold rounded-lg hover:bg-blue-700 h-10 mb-2 ml-4 w-56"
          >
            PLAY
          </button>
          <button
            onClick={increaseBet}
            className="bg-red-800 border-2 border-red-900 text-white text-2xl font-bold rounded-lg hover:bg-red-700 h-10 mb-2 ml-4 w-24 flex justify-center"
          >
            <div className="mb-5">+</div>
          </button>
          <button
            onClick={decreaseBet}
            className="bg-green-600 border-2 border-green-800 text-white text-2xl font-bold rounded-lg hover:bg-green-700 h-10 mb-2 ml-4 w-24 flex justify-center"
          >
            <div className="mb-5">-</div>
          </button>
          </div>
          <div className="flex">
          <div className="bg-gray-700 text-white font-bold rounded-lg h-10 mb-2 ml-4 w-32 flex justify-center">
            <div className="mt-2">BET : {bet.toFixed(2)}</div>
          </div>
          <div className="bg-gray-700 text-white font-bold rounded-lg h-10 mb-2 ml-2 w-52  flex justify-center">
            <div className="mt-2">BALANCE : 10000</div>
          </div>
          </div>
          <button
            onClick={toggleWin}
            className={`bg-red-500 text-white font-bold rounded-lg hover:bg-yellow-700 h-10 mb-2 ml-2 w-20 text-xs mr-2`}
          >
            {isSoundEnabled ? " WIN" : " LOOSE"}
          </button>
          <button
            onClick={toggleBigWin}
            className={`bg-red-500 text-white font-bold rounded-lg hover:bg-yellow-700 h-10 mb-2 ml-2 w-20 text-xs mr-2`}
          >
            {isSoundEnabled ? " BIGWIN" : " NOTBIGWIN"}
          </button>        
        </div>
        </div>
      </div>  
   

      ) : (

        
        

   <div className="flex flex-col w-4/5 justify-center bg-neutral-800 bg-cover bg-center flex bg-cover rounded-3xl border-2 border-gray-400"   style={{ backgroundImage: `url(${background})` }}>
    <div className="w-full flex justify-end">

    <button onClick={toggleSound} className="bg-yellow-500 h-10 w-20 text-xs  mr-4 mt-2 ml-2 text-white font-bold rounded-lg hover:bg-yellow-700 ">
      {isSoundEnabled ? "🔊 ON" : "🔊 OFF"}
    </button>

    <button onClick={toggleInfoPage} className={`flex justify-center items-center bg-neutral-600 hover:bg-neutral-800 text-gray-300 font-bold rounded-lg mr-4 mt-2 ml-2 h-10 w-16 text-xs `}>
            <svg width="65%" height="65%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M12.0005 15C13.6573 15 15.0005 13.6569 15.0005 12C15.0005 10.3431 13.6573 9 12.0005 9C10.3436 9 9.00049 10.3431 9.00049 12C9.00049 13.6569 10.3436 15 12.0005 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.28957 19.3711L9.87402 20.6856C10.0478 21.0768 10.3313 21.4093 10.6902 21.6426C11.0492 21.8759 11.4681 22.0001 11.8962 22C12.3244 22.0001 12.7433 21.8759 13.1022 21.6426C13.4612 21.4093 13.7447 21.0768 13.9185 20.6856L14.5029 19.3711C14.711 18.9047 15.0609 18.5159 15.5029 18.26C15.9477 18.0034 16.4622 17.8941 16.9729 17.9478L18.4029 18.1C18.8286 18.145 19.2582 18.0656 19.6396 17.8713C20.021 17.6771 20.3379 17.3763 20.5518 17.0056C20.766 16.635 20.868 16.2103 20.8455 15.7829C20.823 15.3555 20.677 14.9438 20.4251 14.5978L19.5785 13.4344C19.277 13.0171 19.1159 12.5148 19.1185 12C19.1184 11.4866 19.281 10.9864 19.5829 10.5711L20.4296 9.40778C20.6814 9.06175 20.8275 8.65007 20.85 8.22267C20.8725 7.79528 20.7704 7.37054 20.5562 7C20.3423 6.62923 20.0255 6.32849 19.644 6.13423C19.2626 5.93997 18.833 5.86053 18.4074 5.90556L16.9774 6.05778C16.4667 6.11141 15.9521 6.00212 15.5074 5.74556C15.0645 5.48825 14.7144 5.09736 14.5074 4.62889L13.9185 3.31444C13.7447 2.92317 13.4612 2.59072 13.1022 2.3574C12.7433 2.12408 12.3244 1.99993 11.8962 2C11.4681 1.99993 11.0492 2.12408 10.6902 2.3574C10.3313 2.59072 10.0478 2.92317 9.87402 3.31444L9.28957 4.62889C9.0825 5.09736 8.73245 5.48825 8.28957 5.74556C7.84479 6.00212 7.33024 6.11141 6.81957 6.05778L5.38513 5.90556C4.95946 5.86053 4.52987 5.93997 4.14844 6.13423C3.76702 6.32849 3.45014 6.62923 3.23624 7C3.02206 7.37054 2.92002 7.79528 2.94251 8.22267C2.96499 8.65007 3.11103 9.06175 3.36291 9.40778L4.20957 10.5711C4.51151 10.9864 4.67411 11.4866 4.67402 12C4.67411 12.5134 4.51151 13.0137 4.20957 13.4289L3.36291 14.5922C3.11103 14.9382 2.96499 15.3499 2.94251 15.7773C2.92002 16.2047 3.02206 16.6295 3.23624 17C3.45036 17.3706 3.76727 17.6712 4.14864 17.8654C4.53001 18.0596 4.95949 18.1392 5.38513 18.0944L6.81513 17.9422C7.3258 17.8886 7.84034 17.9979 8.28513 18.2544C8.72966 18.511 9.08134 18.902 9.28957 19.3711Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    </button>

  </div>
      <div className="flex flex-col justify-center items-center  py-5 ">

      
   
        <div className="flex justify-center border-4 border-gray-500 text-black font-bold p-5 rounded-3xl bg-gray-900">
        {isInfo ? (
          <div className="flex items-start justify-center space-x-3">
          <div className=" border- flex w-[49rem] mx-1 h-[36rem] bg-gray-900 rounded-xl">

          <div className="p-4 w-1/2">
          <div className="h-full border-2 rounded-xl p-3 border-2  border-gray-400 bg-gray-800">
            <MultiplierInfo images={images[0]} multiplier={20}/>
            <MultiplierInfo images={images[1]} multiplier={10}/>
            <MultiplierInfo images={images[2]} multiplier={5}/>
            <MultiplierInfo images={images[3]} multiplier={2}/>
            <MultiplierInfo images={images[4]} multiplier={1}/>
            </div>
            </div>
          

            <div className="p-4 w-1/2">
            <div className="h-5/6 border-2 rounded-xl p-3 border-2  border-gray-400 bg-gray-800 text-gray-200">
            <div className="flex text-3xl mt-4 justify-center ">
              THE GAME
              </div>
              <div className="flex my-2 text-sm flex justify-center">
                MADE BY : udYgrpgefrgiergjregper
                </div>

              <div className="flex mt-4 text-sm flex justify-center bg-gray-700 rounded-xl p-2">
                {title}
                </div>
                <div className="h-6"></div>
                <div className="flex text-sm justify-center overflow-auto h-24 bg-gray-700 rounded-xl  p-2  ">
                  <div className="h-full w-full text-center break-words whitespace-normal ">
                    {description}
                  </div>
                  </div>
                </div>
            </div>      
            <div>
            </div>
            </div>
          </div>

        ) : (
          <SlotMachine2
          initialSpinCount={[1, 2, 6]}
          ref={(el) => (machineRefs.current[1] = el)}
          images={images}
          isWin={isWin}
          isBigWin={isBigWin}
        />
        ) }       
        </div>
        <div className="h-22  w-4/5 border-2 border-gray-700 rounded-lg bg-gray-900 mt-2">
        <div className="flex justify-center mt-2">
            <div className="flex w-1/3">
          <button
            onClick={spinAllReels}
            className="bg-blue-500 border-2 border-blue-900 text-white font-bold rounded-lg hover:bg-blue-700 h-10 mb-2 ml-4 w-56"
          >
            PLAY
          </button>
          <button
            onClick={increaseBet}
            className="bg-red-800 border-2 border-red-900 text-white text-2xl font-bold rounded-lg hover:bg-red-700 h-10 mb-2 ml-4 w-24 flex justify-center"
          >
            <div className="mb-5">+</div>
          </button>
          <button
            onClick={decreaseBet}
            className="bg-green-600 border-2 border-green-800 text-white text-2xl font-bold rounded-lg hover:bg-green-700 h-10 mb-2 ml-4 w-24 flex justify-center"
          >
            <div className="mb-5">-</div>
          </button>
          </div>
          <div className="flex">
          <div className="bg-gray-700 text-white font-bold rounded-lg h-10 mb-2 ml-4 w-32 flex justify-center">
            <div className="mt-2">BET : {bet.toFixed(2)}</div>
          </div>
          <div className="bg-gray-700 text-white font-bold rounded-lg h-10 mb-2 ml-2 w-52  flex justify-center">
            <div className="mt-2">BALANCE : 10000</div>
          </div>
          </div>
          <button
            onClick={toggleWin}
            className={`bg-red-500 text-white font-bold rounded-lg hover:bg-yellow-700 h-10 mb-2 ml-2 w-20 text-xs mr-2`}
          >
            {isSoundEnabled ? " WIN" : " LOOSE"}
          </button>
          <button
            onClick={toggleBigWin}
            className={`bg-red-500 text-white font-bold rounded-lg hover:bg-yellow-700 h-10 mb-2 ml-2 w-20 text-xs mr-2`}
          >
            {isSoundEnabled ? " BIGWIN" : " NOTBIGWIN"}
          </button>        
        </div>
        </div>
      </div>
      
    </div>
    )}

    
    </div>
  );
}
