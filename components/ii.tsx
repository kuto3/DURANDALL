import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AddressProp {
  address: string;
}

function UserProfileImage2({ address }: AddressProp) {  // Destructure the 'address' prop
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setOwnerAddress(address); // Use the passed address
        console.log(address);
        
        // Fetch user profile based on the address
        const response = await fetch(`/api/getimage?address=${address}`);
        const data = await response.json();
        
        if (response.ok) {
          setProfileImageUrl(data.user.imageUrl);
          setUsername(data.user.username);
          setId(data.user.id);
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
    <div className="items-center  flex mt-6 mb-3" >
    
      <Link href={`/user/${ownerAddress}`}>
        <Image
          src={profileImageUrl ?? '/black.png'} // Provide fallback for missing image
          alt={`Profile of ${username}`}
          width={100}
          height={100}
          className="w-12 h-12 rounded-full border-2 border-neutral-300"
        />
      </Link>
      
      <span className="font-bold text-xl ">
        <p className="ml-3 text-white ">
          {username ? `${username}` : ''} &nbsp;
        </p>
      </span>
    </div>
  );
}

export default UserProfileImage2;
