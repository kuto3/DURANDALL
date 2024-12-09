import React, { useEffect, useState } from 'react';
import Whitelist from '../../components/Whitlelist';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi'; // Assuming you're using wagmi for wallet connection

const WhitelistPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();
  const router = useRouter();
  const [access, setAccess] = useState(true); // Default true, change it based on user data
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await fetch(`/api/get-user?id=${connectedAddress}`);
        const data = await response.json();


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
    <div>
      <Whitelist />
    </div>
  );
};

export default WhitelistPage;
