"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import { PrismaClient } from '@prisma/client';
import { GiConsoleController } from 'react-icons/gi';
import { Console } from 'console';

export default function CreateSlotMachine() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [wheelImages, setWheelImages] = useState<FileList | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    if (wheelImages) {
      Array.from(wheelImages).forEach((file, index) => {
        formData.append(`wheelImage${index}`, file);
      });
    }

    if (backgroundImage) {
      formData.append('backgroundImage', backgroundImage);
    }

    if (logoImage) {
      formData.append('logoImage', logoImage);
    }
    console.log('go')
    try {
      const response = await axios.post('/api/publishtoipfs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erreur lors de la création : ${response.statusText}`);
      }

      setSuccessMessage('Création réussie !');
      setTimeout(() => {
        router.push('/slotmachines');
      }, 2000);
    } catch (err) {
      setError('Une erreur s\'est produite lors de la création.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const validateForm = () => {
    if (!title || !description || !backgroundImage || !logoImage || !wheelImages || wheelImages.length !== 10) {
      setError('Veuillez remplir tous les champs et ajouter toutes les images requises.');
      return false;
    }
    return true;
  };
  

  return ( 
    <div className='h-screen p-9'>
    <div className="flex flex-col h-[39rem] p-7">
      <div className="flex space-x-8 h-screen bg-neutral-900 rounded-2xl p-9">
        <div className="justify-center items-center p-2 ml-5 w-1/2 h-full flex ">
          <div className="max-w-4xl mx-auto p-6 rounded-lg bg-neutral-800 w-full h-[33rem] border-2 border-neutral-700">
            
            <div className='flex'>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                
                <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-white mt-1">CREATE YOUR OWN SLOT GAME</h2>
                  <div>

                    <label htmlFor="title" className="block mt-4 text-white mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => {
                        if (e.target.value.length <= 23) {
                          setTitle(e.target.value);
                        }
                      }}
                      className="w-full p-3 bg-neutral-700 text-white rounded-md border-neutral-600 border-2"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-white mb-2">Description</label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 bg-neutral-700 text-white rounded-md border-neutral-600 border-2"
                      rows={6}
                      required
                      style={{ maxHeight: '200px', resize: 'none' }}
                    />
                  </div>
                </div>

                <div className="space-y-4 border-2 p-5 rounded-xl bg-neutral-900 border-neutral-700 ">
                  <div>
                    <p className="text-white mb-5">Click on the boxes to add the wheel images (10 images):</p>
                    <div className="grid grid-cols-5 gap-2 mr-3">
                      {Array.from({ length: 10 }, (_, index) => (
                        <div
                          key={index}
                          className={`w-16 h-16 border-neutral-700 text-neutral-500 rounded-md flex justify-center items-center overflow-hidden border-2 ${wheelImages && wheelImages.length > index ? 'border-green-500' : 'border-gray-600'}`}
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const files = e.target?.files;
                              if (files && files.length > 0) {
                                const newImages = wheelImages ? [...wheelImages] : [];
                                newImages[index] = files[0];
                                setWheelImages(newImages as FileList);
                              }
                            };
                            input.click();
                          }}
                        >
                          {wheelImages && wheelImages[index] ? (
                            <img
                              src={URL.createObjectURL(wheelImages[index])}
                              alt={`Wheel Image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-neutral-500 font-bold text-2xl">+</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className='h-full'>
                    <div className="h-full">
  {/* Background Image Upload */}
  <label htmlFor="backgroundImage" className="block text-white p-2">
    Background Image
  </label>
  <div
    onClick={() => document.getElementById("backgroundImage").click()}
    className="w-full bg-neutral-800 text-white rounded-md h-10 flex justify-center items-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-gray-300"
  >
    {backgroundImage ? (
      <img
        src={URL.createObjectURL(backgroundImage)}
        alt="Background Preview"
        className="w-full h-full object-cover rounded-md"
      />
    ) : (
      <span className="text-gray-400 mx-1">CLICK TO UPLOAD BACKGROUND</span>
    )}
  </div>
  <input
    type="file"
    id="backgroundImage"
    accept="image/*"
    onChange={(e) =>
      setBackgroundImage(e.target.files ? e.target.files[0] : null)
    }
    className="hidden"
  />

  {/* Logo Upload */}
  <label htmlFor="logoImage" className="block text-white p-2">
    Logo
  </label>
  <div
    onClick={() => document.getElementById("logoImage").click()}
    className="w-full bg-neutral-800 text-white rounded-md h-10 flex justify-center items-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-gray-300"
  >
    {logoImage ? (
      <img
        src={URL.createObjectURL(logoImage)}
        alt="Logo Preview"
        className="w-full h-full object-contain rounded-md"
      />
    ) : (
      <span className="text-gray-400 ">CLICK TO UPLOAD LOGO IMAGE</span>
    )}
  </div>
  <input
    type="file"
    id="logoImage"
    accept="image/*"
    onChange={(e) =>
      setLogoImage(e.target.files ? e.target.files[0] : null)
    }
    className="hidden"
  />
</div>

                    </div>
                  </div>

                  <div className="flex justify-end col-span-2">
                    <button
                      type="submit"
                      className={`px-6 py-1 mt-3 mr-1 bg-purple-600 border-4 border-purple-800 hover:bg-purple-900 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={loading}
                    >
                      {loading ? 'Creation loading...' : 'CREATE'}
                    </button>
                  </div>
                 
                  {error && (
                    <div className="mt-4 text-red-500 font-bold">{error}</div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="p-2 justify-center items-center  w-1/2 h-full flex ">
          <div
            className="max-w-4xl mx-auto p-6 rounded-xl bg-neutral-800 w-full h-[33rem] bg-cover bg-center  border-2 border-neutral-700"
            style={{
              backgroundImage: backgroundImage ? `url(${URL.createObjectURL(backgroundImage)})` : undefined,
            }}
          >
            <h2 className="text-2xl font-semibold text-white mb-3">VISUALISATION</h2>
            <div className="flex w-full space-x-2 h-full">
              <div className="space-y-4 border-2 rounded-xl bg-neutral-900 mb-9 border-neutral-700 w-1/5 py-7 px-3">
                <div className="h-1/3  bg-cover bg-center" 
                  style={{
                    backgroundImage: logoImage && logoImage instanceof Blob ? `url(${URL.createObjectURL(logoImage)})` : undefined,
                  }}></div>
              </div>
              <div className="space-y-4 border-2 p-4 rounded-xl bg-neutral-900 mb-9 border-neutral-700 w-4/5 p-7">
              <div className="p-3 h-full flex">
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <div key={colIndex} className="h-full w-32 flex-col">
                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                      <div
                        key={`${colIndex}-${rowIndex}`}
                        className="h-1/5 border-2 mb-1 border-neutral-700 rounded-xl bg-cover bg-center mx-1"
                        style={{
                          backgroundImage:
                            Array.isArray(wheelImages) &&
                            wheelImages[rowIndex] &&
                            wheelImages[rowIndex] instanceof Blob
                              ? `url(${URL.createObjectURL(wheelImages[rowIndex])})`
                              : undefined,
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
      {successMessage && (
                   <div
                   role="alert"
                   className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 mt-8"
                 >
                   <div className="flex items-start gap-4">
                     <span className="text-green-600">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth="1.5"
                         stroke="currentColor"
                         className="size-6"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                         />
                       </svg>
                     </span>
                 
                     <div className="flex-1">
                       <strong className="block font-medium text-gray-900 dark:text-white"> Changes saved </strong>
                 
                       <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                         Your product changes have been saved.
                       </p>
                     </div>
                 
                     <button
                       className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
                     >
                       <span className="sr-only">Dismiss popup</span>
                 
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         strokeWidth="1.5"
                         stroke="currentColor"
                         className="size-6"
                       >
                         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                     </button>
                   </div>
                 </div>
                  )}

    </div>
    </div>
  );
}

