import React from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const UserProfile: React.FC = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center bg-black p-6 rounded-lg shadow-lg">
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
        <Image
          src="/pic.jpg"
          alt="Profile picture"
          layout="fill"         // This makes the image fill the parent div
          objectFit="cover"     // Ensures the image covers the entire area
        />
      </div>

      <div className="mt-6 w-full text-center">
        <h2 className="text-2xl font-bold text-white">
          {isConnected ? address : 'Not Connected'}
        </h2>
      </div>

      <div className="mt-4">
        <ConnectButton />
      </div>
    </div>
  );
};

export default UserProfile;
