import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi'; // assuming you're using wagmi for wallet connection
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Create = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
 
        const response = await fetch(`/api/get-user?id=${address}`);
        const data = await response.json();

        if (data.error === "User not found") {
          return;
        }

        setUser({
          username: data.user.username || 'Default Username',
          hasAccess: data.user.hasAccess || false, // Assume user data has a `hasAccess` field
        });
        console.log("hasAccess:" + data);
        // Set access flag based on user access rights
        if (!data.user.hasAccess) {
          setAccess(false);
          setErrorMessage("You don't have access. Please subscribe to gain access.");
        } else {
          setAccess(true);
        }

      } catch (error) {
        router.push('/signup');
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [address, isConnected, router]);

  if (!access && errorMessage) {
    return (
      <section className=" text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Access Denied</h2>
            <p className="mt-4 text-gray-300">{errorMessage}</p>
            <Link href="/payment" className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded">
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    );
  }
  



  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold sm:text-3xl underline">Manage your certificates</h2>
          <p className="mt-4 text-gray-300">
            Here you can create a smart contract, put a generic nft and after whitelist people to let them mint the diploma !
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 ">
          <Link
            className="block rounded-xl border-2 p-8 shadow-xl transition border-neutral-800 bg-neutral-900"
            href="/createcertificate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <h2 className="mt-4 text-xl font-bold text-white">Create a Certificate</h2>
            <p className="mt-1 text-sm text-gray-300">
              Create and manage your certificates with ease.
            </p>
          </Link>

          <Link
            className="block rounded-xl border-2 p-8 shadow-xl transition border-neutral-800 bg-neutral-900"
            href="/whitelist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <h2 className="mt-4 text-xl font-bold text-white">Whitelist Someone</h2>
            <p className="mt-1 text-sm text-gray-300">
              Manage your whitelisted users effectively.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Create;
