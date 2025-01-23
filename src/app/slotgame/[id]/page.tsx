"use client"

import { useRef, useState, useEffect } from "react"; // Importations correctes
import Image from "next/image"; // Importation de Image depuis Next.js
import SlotMachine from "../../../components/ui/SlotWheel"; // Importation de SlotMachine

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

  const id = params.id;

  interface SlotMachine {
    id: string;
    url?: string;
  }
  
  interface SlotMachineMetadata {
    name: string;
    description: string;
    images: string[];
  }

  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setPageisLoading] = useState(true);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const Spinner = () => (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500"></div>
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

  const toggleInfo = () => {
    setIsInfoVisible(!isInfoVisible); // Alterne l'affichage de la section info
  };

  return ( 
  <div className="h-screen flex-col bg-black p-6">
    {isPageLoading ? (
        // Afficher un écran de chargement (spinner) pendant le chargement
        <div className="absolute inset-0 bg-black  flex justify-center items-center">
          <Spinner />
        </div>
      ) : (

   <div className="bg-cover bg-center flex bg-cover rounded-xl  h-5/6"   style={{ backgroundImage: `url(${background})` }}>
      <div className="w-8"></div>
      <div className="flex flex-col justify-center items-center w-1/5 ">
      {isInfoVisible ? (
          <div className="flex-col">
            <div className="h-6"></div>
          <div className="w-80 h-[25rem] mr-2 ml-9 mt-9 rounded-xl bg-gray-900 text-neutral-300">
        
            <div className="border-b-2 border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">contract address: ugeregergergergreger</span>
              </div>
            </div>
            <div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">creator address: goerogergreg</span>
              </div>
            </div>
            <div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">x20 pourcentage: 0.1</span>
              </div>
            </div>
            <div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">x20 pourcentage: 0.1</span>
              </div>
            </div>
            <div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">x20 pourcentage: 0.1</span>
              </div>
            </div><div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">x20 pourcentage: 0.1</span>
              </div>
            </div><div className="border-b-2  border-gray-300 h-10 flex justify-center text-sm">
              <div className="mt-2">
                <span className="font-bold">x20 pourcentage: 0.1</span>
              </div>
            </div>
            </div>
          </div>
        ) : (
          <div className="flex-col">
            <div className="h-6"></div>
          <div className="w-80 h-[25rem] mr-2 ml-9 mt-9 rounded-xl bg-gray-900 text-neutral-300">
            {/* Ancienne section info */}
            <div className={`h-1/2 rounded-t-lg overflow-hidden ${isLoading ? 'bg-gray-700' : ''}`} >
              <Image src={logo} width={500} height={500} alt="Picture of the author "onLoadingComplete={handleImageLoad} placeholder="empty"  />
            </div>
            <div className="flex-col  h-1/2">
            <div className="border-b-2 border-gray-300  flex justify-center text-sm h-1/5">
              <div className="mt-2">
                <span className="font-bold"></span> {title}
              </div>
            </div>
            <div className=" flex items-center justify-center text-sm h-4/5">
            <div className="w-full h-full flex items-center justify-center text-center">
              <span className="font-bold block w-full whitespace-pre-wrap break-words p-4 mb-9">{description}</span>
            </div>
          </div>


         
            </div>
          </div>
        
       
          </div>
          
        )}
      
        <div className="h-56">
          <div className="h-16 mt-5 w-80 mr-2 ml-9 rounded-lg bg-gray-900  text-xs mb-3 rounded-xl text-gray-300 font-bold">
            <div className="mb-8 flex justify-center space-x-2 p-2">

            <button
                onClick={toggleInfo}
                className="mt-2 h-8 w-1/3 bg-blue-800 rounded-xl hover:bg-blue-950"
              >
                INFO
              </button>
              
              <button className="mt-2 h-8 w-1/3 bg-blue-800 rounded-xl hover:bg-blue-950">TELEGRAM</button>
              <button className="mt-2 h-8 w-1/5 bg-neutral-800 rounded-xl  hover:bg-neutral-900 ml-2 " >
              <svg
            className="w-3 h-3 ml-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
            />
          </svg>
          </button>

            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col justify-center items-center h-auto space-y-2  ml-9 w-4/5 ">
        <div className="">
        <div>
      {isPageLoading ? (
       <div ></div> // Affiche un loader
      ) : (
        <div className="flex space-x-0 border-4 border-gray-500 p-4 rounded-3xl bg-gray-900 mb-1 mt-3">
      <SlotMachine
         initialSpinCounts={[6, 6, 6, 6, 6]} 
        ref={(el) => (machineRefs.current[1] = el)}
        images={images}
      />
      </div>
      )}
    </div>
          
        </div>
        <div className="h-22   w-2/3 border-2 border-gray-700 rounded-lg bg-gray-900">
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
            onClick={toggleSound}
            className={`bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-700 h-10 mb-2 ml-2 w-20 text-xs mr-2`}
          >
            {isSoundEnabled ? "🔊 ON" : "🔊 OFF"}
          </button>
        </div>
        </div>
      </div>
      
    </div>
    )}

    
    </div>
  );
}
