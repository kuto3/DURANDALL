import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface NFT {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  ownerAddress: string;
  createdAt: string;
}

interface NFTListProps {
  address: string;
}

const SkeletonCard = () => (
  <div className="block bg-neutral-800 border border-neutral-200 rounded-lg shadow-md dark:bg-neutral-800 dark:border-neutral-700 transition-transform transform animate-pulse w-1/4 ">
    <div className="h-32 bg-gray-700 rounded-t-lg" /> {/* Placeholder for image */}
    <div className="p-5">
      <div className="mb-2 h-6 bg-gray-600 rounded w-3/4" /> {/* Placeholder for title */}
      <div className="mb-3 h-4 bg-gray-600 rounded w-1/2" /> {/* Placeholder for description */}
      <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">
        <span className="h-4 bg-gray-600 rounded w-32" /> {/* Placeholder for button */}
      </div>
    </div>
  </div>
  
);

const NFTList: React.FC<NFTListProps> = ({ address }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await axios.get('/api/nfts');
        const nftList = response.data;

        // Filter NFTs by owner address
        const filteredNfts = nftList.filter((element: NFT) => element.ownerAddress === address);
        setNfts(filteredNfts);
      } catch (fetchError) {
        console.error('Error fetching NFTs:', fetchError);
        setError('Error fetching NFTs.');
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [address]);

  const handleViewCertificate = (id: number) => {
    router.push(`/certificates/${id - 1}`);
  };

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="p-4 rounded-xl min-h-full">
      <h1 className="text-2xl font-bold text-center pb-4 mt-4 text-white">
        User Qualifications :
      </h1>
      <hr className='mb-9 mt-2' />

      {loading ? (
         Array.from({ length: 1 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : nfts.length === 0 ? (
        <div className="text-xl font-bold text-center pb-4 mb-9 mt-9 text-gray-500">
          THIS USER HAS NO CERTIFICATES
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-black border border-neutral-700 rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                className="rounded-t-lg w-full h-32 object-cover"
                src={nft.imageUrl || 'https://via.placeholder.com/200'}
                width={400}
                height={400}
                alt={nft.name || 'NFT Image'}
              />
              <div className="p-4">
                <h5 className="mb-3 text-lg font-bold tracking-tight text-white overflow-hidden">
                  {nft.name}
                </h5>
                <p className="text-neutral-400 text-sm overflow-hidden">
                  {nft.description}
                </p>
                <button
                  onClick={() => handleViewCertificate(nft.id)}
                  className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-neutral-700 rounded-lg hover:bg-neutral-800 focus:ring-2 focus:outline-none focus:ring-yellow-500"
                >
                  Voir le certificat
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
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTList;
