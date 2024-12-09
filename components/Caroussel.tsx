import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the type for a diploma object
interface Diploma {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ipfsUri?: string; // Add IPFS URI if needed
}

// Skeleton loader component
const SkeletonLoader = () => {
  return (
    <div className="flex space-x-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-1/4 mx-1 border-2 border-gray-600 bg-gray-800 rounded-xl animate-pulse">
          <div className="h-96 bg-gray-700 rounded-t-xl"></div>
         
        </div>
      ))}
    </div>
  );
};

export default function DiplomaList() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [error, setError] = useState('');
  const [loadingImages, setLoadingImages] = useState<{ [id: string]: string }>({});
  const [isDiplomasLoaded, setIsDiplomasLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first image

  useEffect(() => {
    async function fetchDiplomas() {
      try {
        const response = await fetch('/api/diplomas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Diploma[] = await response.json();
        setDiplomas(data);
        setIsDiplomasLoaded(true);
      } catch (err) {
        console.error('Erreur lors de la récupération des diplômes:', err);
        setError('Erreur lors de la récupération des diplômes');
      }
    }

    fetchDiplomas();
  }, []);

  useEffect(() => {
    const fetchIPFSImages = async () => {
      const updatedImages: { [id: string]: string } = {};

      for (const diploma of diplomas) {
        if (diploma.ipfsUri && !loadingImages[diploma.id]) {
          try {
            const response = await fetch(diploma.ipfsUri);
            if (!response.ok) throw new Error(`Failed to fetch image from IPFS: ${response.status}`);
            const data = await response.json();
            updatedImages[diploma.id] = data.image; // Assuming image URL is inside the IPFS metadata
          } catch (error) {
            console.error(`Erreur lors du chargement de l'image IPFS pour le diplôme ${diploma.id}`, error);
          }
        }
      }

      setLoadingImages((prevImages) => ({ ...prevImages, ...updatedImages }));
    };

    if (isDiplomasLoaded) {
      fetchIPFSImages();
    }
  }, [isDiplomasLoaded, diplomas]);

  const maxScrolls = Math.max(0, diplomas.length - 4); // Calculate maximum scrolls
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxScrolls ? prevIndex + 1 : 0)); // Loop back to start after reaching max
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxScrolls)); // Loop to end when at start
  };

  // Filter diplomas to only include those that have images available
  const displayedDiplomas = diplomas.filter((diploma) => {
    return loadingImages[diploma.id] || diploma.imageUrl;
  });

  return (
    <div className="mb-9 p-5">
      <br />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="relative">
        {isDiplomasLoaded ? (
          displayedDiplomas.length === 0 ? (
            <p className="text-center">Aucun diplôme trouvé.</p>
          ) : (
            <>
              <div className="flex items-center justify-between relative hidden lg:block">
                {/* Flèche gauche, plus large et SVG amélioré */}
                <button
                  onClick={prevSlide}
                  className="absolute left-[-64px] top-1/2 transform -translate-y-1/2 h-96 w-10 ml-5  bg-opacity-75 hover:bg-opacity-90 text-white flex items-center justify-center transition-colors duration-300 z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="relative flex-1 overflow-hidden w-full">
               
                  {/* Slide Display */}
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `translateX(-${(currentIndex * 100) / 4}%)`,
                    }}
                  >
                    {displayedDiplomas.map((diploma) => (
                      <Link key={diploma.id} href={`/diplomas/${diploma.id}`} legacyBehavior>
                     <div className="flex-shrink-0 w-1/4 relative m-2 group">
                        <Image
                          className="rounded-lg w-full h-96 object-cover transition-opacity duration-300 ease-in-out"
                          src={loadingImages[diploma.id] || '/black.jpg'}
                          width={640}
                          height={256}
                          alt={`Image de ${diploma.title}`}
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center bg-black bg-opacity-50 rounded-lg overflow-hidden p-6 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                          {/* Overlay for text */}
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300 dark:text-white overflow-hidden mt-9">
                            {diploma.title}
                          </h5>
                          <p className=" font-normal text-gray-400 dark:text-gray-400 overflow-hidden w-32">
                            {diploma.description}
                          </p>
                          {/* Button that fades out with the overlay */}
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Flèche droite, plus large et SVG amélioré */}
                <button
                  onClick={nextSlide}
                  className="absolute right-[-64px] top-1/2 transform mr-4 -translate-y-1/2 h-96 w-12 bg-opacity-75 hover:bg-opacity-90 text-white flex items-center justify-center transition-colors duration-300 z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
          )
        ) : (
          <SkeletonLoader />
        )}
      </div>
    </div>
  );
}
