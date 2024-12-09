import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MintForm from '../../../components/putNFT';
import Image from 'next/image';
import UserProfileImage2 from '../../../components/ii';

const DiplomaPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [diploma, setDiploma] = useState(null);
  const [ipfs, setIpfs] = useState(""); // IPFS link to JSON metadata
  const [imageUrl, setImageUrl] = useState(""); // Extracted image URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDiploma = async () => {
        try {
          const response = await axios.get(`/api/diplomas/${id}`);
          const diplomaData = response.data;
          setDiploma(diplomaData);
          setIpfs(diplomaData.ipfsUri); // Set IPFS link from diploma data
        } catch (err) {
          console.error(err); // Log error for debugging
          setError('Diplôme non trouvé.');
        } finally {
          setLoading(false);
        }
      };
      fetchDiploma();
    }
  }, [id]);

  // Fetch metadata from IPFS to get the image URL
  useEffect(() => {
    const fetchMetadata = async () => {
      if (ipfs) {
        try {
          const response = await fetch(ipfs); // Fetch the JSON from IPFS
          if (!response.ok) {
            throw new Error('Erreur lors du chargement des données depuis IPFS');
          }
          const data = await response.json(); // Parse the JSON data
          setImageUrl(data.image); // Extract the image URL
        } catch (err) {
          console.error(err); // Log error for debugging
          setError('Erreur lors du chargement de l\'image depuis IPFS.');
        }
      }
    };

    fetchMetadata();
  }, [ipfs]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!diploma) return <p>Diplôme non disponible.</p>;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/diplomas/${id}`);
      router.push('/diplomas'); // Redirect to diplomas list after deletion
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Erreur lors de la suppression du diplôme.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:p-6 lg:p-9 text-white rounded-lg shadow-xl h-auto lg:h-screen">
      {/* Image section */}
      <div className="relative flex lg:items-center overflow-hidden">
        <Image
          src={imageUrl || '/diplome.jpg'} // Use fetched image URL or fallback
          width={400}
          height={400}
          alt={`Image de ${diploma.title}`} // Ensure alt text is descriptive
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      {/* Information section */}
{/* Information section */}
<div className="relative flex flex-col justify-between sm:m-4 lg:m-9 p-4 sm:p-6 lg:p-9 bg-neutral-900 border-neutral-800 border-4 rounded-lg overflow-auto overflow-x-hidden text-center lg:text-left">
  <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold drop-shadow-lg break-words leading-tight mb-3 mt-5">
    {diploma.title}
  </h1>
  <p className="text-xs sm:text-lg lg:text-2xl leading-relaxed font-light drop-shadow-md mb-3">
    <span className="font-semibold mt-2">The Contract address:  </span> 
    <span className="block sm:inline text-[10px] sm:text-sm lg:text-lg">
    <br/>
    <p >  {diploma.ethAddress} on   <span
  className="whitespace-nowrap rounded-full border border-purple-500 px-2.5 py-0.5 text-sm text-purple-700 dark:text-purple-100 ml-1"
>
 {diploma.imageUrl}
</span>
      
      
      
      
      </p>
    </span>
  </p>
  
  <div className="flex justify-center lg:justify-start mb-6 lg:mb-9">
    <UserProfileImage2 address={diploma.ethAddress2} />
  </div>

  {/* Description section */}
  <div className="text-xs sm:text-lg lg:text-xl leading-relaxed font-light drop-shadow-md bg-neutral-800 rounded-lg p-3 sm:p-4 lg:p-6 border-neutral-700 border-4 min-h-[200px] max-h-[300px] overflow-y-auto break-words mb-6">
    <span className="font-bold mt-3">Description:</span>
    <br/>
    <div>{diploma.description}</div>
  </div>

  <MintForm 
    contractadress={diploma.ethAddress} 
    name={diploma.title} 
    description={diploma.description} 
    imageurl={imageUrl} 
  />
</div>
</div>
  );
};

export default DiplomaPage;
