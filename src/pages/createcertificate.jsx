import React, { useEffect, useState } from 'react';
import PublishDiploma from '../../components/CreateContractwithURI';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi'; // Assuming you're using wagmi for wallet connection

const Test2 = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();
  const [access, setAccess] = useState(true); // Default true, change it based on user data
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch(`/api/get-user?id=${connectedAddress}`);
        const data = await response.json();

        // Check if the user has access
       

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [connectedAddress, isConnected, router]);

  if (!access) {
    return null; // Don't render the component if access is not granted
  }

  return (
    <div className='mb-9'>
      <PublishDiploma />
      <div className='h-12'></div>
    </div>
  );
};

export default Test2;
