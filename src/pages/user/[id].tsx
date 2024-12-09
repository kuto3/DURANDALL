import { GetServerSideProps } from 'next';
import { useAccount } from 'wagmi';
import React, { useEffect, useState } from 'react';
import Certficates from '../../../components/ShowCertificates2';
import { useRouter } from 'next/router';
import UserProfileImage from "../../../components/UserProfileImage"


interface UserProfileProps {
  profile: {
    username: string;
  };
  address: string;
}


const UserProfilePage: React.FC<UserProfileProps> = ({ profile, address }) => {
  const { address: connectedAddress, isConnected } = useAccount();
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/settings/profile');
  };

  const [user, setUser] = useState<UserProfileProps['profile'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/get-user?id=${address}`);
        const data = await response.json();
        
        if (address == "undefined") {
          router.push('/');
          return;
        }

        if (data.error === "User not found") {
          console.log("No account found, redirecting to signup");
          router.push('/signup');
          return;
        }
  
        console.log(data);
  
        // Utilisation de setUser avec un try-catch pour gérer les erreurs
        try {
          setUser({
            username: data.user?.username || profile.username, // Correctly setting the username
          });
          console.log("the user ", user);
        } catch (error) {
          console.error("Error setting user:", error);
        }
  
      } catch (error) {
    
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [address, , router, profile]);

  useEffect(() => {
    if (isConnected) {
      setIsOwner(connectedAddress?.toLowerCase() === address.toLowerCase());
    }
  }, [connectedAddress, isConnected, address]);


  return (
    <>
      <div className="flex flex-col items-center rounded-xl shadow-lg ">
          <UserProfileImage address={address}/>
      
        <div className=" w-full text-center">
        <h2 className="text-xl font-bold text-white mt-2">
  {user?.username || <br/>}
</h2>
<p className="text-sm sm:text-base text-white overflow-hidden">
  Address: {address}
</p>
        </div>

        {isOwner && (
          <div className=" text-center">
            <button
              onClick={handleRedirect}
              className="bg-neutral-600 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mt-6"
            >
              Go to Profile Settings
            </button>
          </div>
        )}

        
      </div>
      <div className="mt-9 mr-9 ml-9 p-2">
      <Certficates address={address} />
      </div>
    </>
  );
};

// Fetch user profile data based on the address in the URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const address = id as string;

  // Fetch the user profile based on the address

  return {
    props: {
      address,
    },
  };
};

export default UserProfilePage;
