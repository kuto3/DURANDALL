import { useState, useEffect } from 'react';
import Image from 'next/image';

interface UserProfileImageProps {
  address: string; // Définissez le type ici
}

function UserProfileImage({ address }: UserProfileImageProps) {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(address);
        const response = await fetch(`/api/getimage?address=${address}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProfileImageUrl(data.user.imageUrl);
          setUsername(data.user.username);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (address) {
      fetchUserProfile();
    }
  }, [address]);

  return (
    <div className="flex flex-col items-center">
        <Image
          src={profileImageUrl || '/black.png'}
          alt={`Profile of ${username}`}
          width={100}
          height={100}
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />
    </div>
  );
}

export default UserProfileImage;
