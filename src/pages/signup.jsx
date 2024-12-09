import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

export default function Signup() {
  const { address } = useAccount();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    console.log({
      walletAddress: address,
      email,
      username,
    });
  
    const response = await fetch('api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletAddress: address,
        email,
        username,
      }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      router.push('/');
    } else {
      setError(data.error || 'An error occurred during signup.');
    }
    setLoading(false);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen rounded-xl">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-neutral-800">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-1">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-600"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-600"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mt-1">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white bg-neutral-700 hover:bg-neutral-600 rounded-md shadow-md font-medium transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
