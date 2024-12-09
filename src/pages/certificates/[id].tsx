import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import UserProfileImage2 from '../../../components/ii';
import { useAccount } from 'wagmi';
import Image from 'next/image';

interface NFT {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  ownerAddress: string;
  createdAt: string;
}

const NFTDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nft, setNft] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchNft = async () => {
      if (!id) return; // Assurer que l'ID est présent

      try {
        const idd = parseInt(id as string); // Convertir l'ID en entier
        // Récupérer les détails du NFT via l'API
        const response = await axios.get(`/api/nft/${idd}`);
        setNft(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des données du NFT.'); // Message d'erreur convivial
      } finally {
        setLoading(false);
      }
    };

    fetchNft();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section className="py-8 md:py-16  antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              {nft && (
                <>
                 
                  <Image
                    className="w-full hidden dark:block overflow-hidden"
                    width={900}
                    height={900}
                    src={nft.imageUrl}
                    alt={nft.name}
                  />
                </>
              )}
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white overflow-hidden">
                {nft?.name}
              </h1>
              {/* Profil du propriétaire */}
              {nft?.ownerAddress && <UserProfileImage2 address={nft.ownerAddress} />}

              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <div className="flex items-center gap-2 sm:mt-0">
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"></p>
                  <Link
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  ></Link>
                </div>
              </div>

              <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400 overflow-hidden">
                {nft?.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NFTDetail;
