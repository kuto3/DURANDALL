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

// Skeleton component for loading state
const SkeletonCard = () => (
  <>
  <div className="block bg-neutral-800 border border-neutral-200 rounded-lg shadow-md dark:bg-neutral-800 dark:border-neutral-700 transition-transform transform animate-pulse">
    <div className="h-48 bg-gray-700 rounded-t-lg" /> {/* Placeholder for image */}
    <div className="p-5">
      <div className="mb-2 h-6 bg-gray-600 rounded w-3/4" /> {/* Placeholder for title */}
      <div className="mb-3 h-4 bg-gray-600 rounded w-1/2" /> {/* Placeholder for description */}
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
        <span className="h-4 bg-gray-600 rounded w-32" /> {/* Placeholder for button */}
      </div>
    </div>
  </div>
   <div className="block bg-neutral-800 border border-neutral-200 rounded-lg shadow-md dark:bg-neutral-800 dark:border-neutral-700 transition-transform transform animate-pulse">
    <div className="h-48 bg-gray-700 rounded-t-lg" /> {/* Placeholder for image */}
    <div className="p-5">
      <div className="mb-2 h-6 bg-gray-600 rounded w-3/4" /> {/* Placeholder for title */}
      <div className="mb-3 h-4 bg-gray-600 rounded w-1/2" /> {/* Placeholder for description */}
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
        <span className="h-4 bg-gray-600 rounded w-32" /> {/* Placeholder for button */}
      </div>
    </div>
  </div>
  </>
);

export default function DiplomaList() {
  const [diplomas, setDiplomas] = useState<Diploma[]>([]); // Explicitly define the type for diplomas
  const [error, setError] = useState('');
  const [loadingImages, setLoadingImages] = useState<{ [id: string]: string }>({}); // Store fetched IPFS images
  const [isDiplomasLoaded, setIsDiplomasLoaded] = useState(false); // Track if diplomas are fully loaded
  const [loading, setLoading] = useState(true); // Loading state for diplomas

  useEffect(() => {
    async function fetchDiplomas() {
      try {
        const response = await fetch('/api/diplomas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Diploma[] = await response.json(); // Define the response data type
        setDiplomas(data);
        setIsDiplomasLoaded(true); // Diplomas are loaded
      } catch (err) {
        console.error('Erreur lors de la récupération des diplômes:', err);
        setError('Erreur lors de la récupération des diplômes');
      } finally {
        setLoading(false); // Set loading to false after attempting to fetch
      }
    }

    fetchDiplomas();
  }, []);

  useEffect(() => {
    // Only fetch IPFS images if diplomas are loaded and available
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

    // Trigger image fetch when diplomas are loaded
    if (isDiplomasLoaded) {
      fetchIPFSImages();
    }
  }, [isDiplomasLoaded, diplomas]); // Trigger whenever diplomas load or change

  return (
    <div className="p-6 rounded-xl mb-9">
      <div className='text-xl font-semibold mb-1 text-white text-center underline mb-4'>All Smart Contracts</div>
      <br />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : diplomas.length === 0 ? (
          <p className="text-center">Aucun diplôme trouvé.</p>
        ) : (
          diplomas.map((diploma) => (
            <Link key={diploma.id} href={`/diplomas/${diploma.id}`} legacyBehavior>
              <div className="block bg-neutral-800 border border-neutral-200 rounded-lg shadow-md dark:bg-neutral-800 dark:border-neutral-700 transition-transform transform hover:scale-105">
                <Image
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={loadingImages[diploma.id] || '/black.png'} // Use fetched IPFS image, fallback to imageUrl or placeholder
                  width={500}
                  height={500}
                  alt={`Image de ${diploma.title}`}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-300 dark:text-white overflow-hidden">
                    {diploma.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-400 dark:text-gray-400 overflow-hidden">
                    {diploma.description}
                  </p>
                  <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg border-2 border-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
                    Voir les détails
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
