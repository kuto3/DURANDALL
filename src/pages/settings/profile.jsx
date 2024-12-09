import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import axios from 'axios';

export default function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State for profile image file
  const [profileImagePreview, setProfileImagePreview] = useState(null); // Preview of the image
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { address } = useAccount();
  const [error, setError] = useState('');
  const [ipfsImageUrl, setIpfsImageUrl] = useState(''); // State to store IPFS image URL

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/get-user?id=${address}`);
        const data = await response.json();
        setUser(data.user);
        setUsername(data.user?.username || '');
        setProfileImagePreview(data.user?.profileImage || '');
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    if (address) {
      fetchUserData();
    }
  }, [address]);

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const files = e.target?.files;
    const file = files && files.length > 0 ? files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(file); // Store the file for uploading
          setProfileImagePreview(reader.result); // Display preview
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission, including IPFS upload and profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      let imageUrl = profileImagePreview; // Default to the existing image URL

      // Upload new image to IPFS if there's a new file selected
      if (profileImage) {
        const formData = new FormData();
        formData.append('image', profileImage);
        formData.append('name', 'Profile Image');
        formData.append('description', 'Profile image for user');

        const response = await axios.post('/api/PUTPROFILEPICTURE', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = response.data.imageUrl;
        setIpfsImageUrl(imageUrl); // Store the IPFS URL
      }

      // Now update the profile with the IPFS image URL
      const profileData = new FormData();
      profileData.append('id', address);
      profileData.append('username', username);
      if (imageUrl) {
        profileData.append('profileImage', imageUrl); // Add the IPFS image URL
      }

      const updateResponse = await fetch('/api/update-profile', {
        method: 'PUT',
        body: profileData,
      });

      const updateData = await updateResponse.json();
      if (updateResponse.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setError(updateData.error || 'An error occurred');
      }

    } catch (err) {
      setError('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
      {user ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Username (Optional)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image</label>
            {profileImagePreview ? (
              <Image
                src={profileImagePreview}
                width={500}
                height={200}
                alt="Profile Preview"
                className="mb-4 w-24 h-24 rounded-full"
              />
            ) : (
              <p>No image uploaded</p>
            )}
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-1"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
