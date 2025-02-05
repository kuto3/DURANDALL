'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ZoomImage from "@/components/ui/ZoomImage";
import Link from 'next/link';

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(1);
  const [validImages, setValidImages] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/getProductbyId/${id}`);
          if (!response.ok) {
            throw new Error('Produit non trouvé');
          }
          const data = await response.json();
          setProduct(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const checkImages = async () => {
        const valid = [];
        for (let i = 1; i <= 5; i++) {
          const imageSrc = `${product.imagesrc1}${i}.webp`;
          const img = new window.Image();
          img.src = imageSrc;
          await new Promise((resolve) => {
            img.onload = () => {
              valid.push(i);
              resolve();
            };
            img.onerror = () => resolve();
          });
        }
        setValidImages(valid);
      };

      checkImages();
    }
  }, [product]);

  const renderSideImages = () => {
    return validImages.map((i) => (
      <div 
        key={i} 
        className={`h-16 w-16 border-2 ${currentImage === i ? 'border-black' : 'border-neutral-400'} overflow-hidden cursor-pointer`}
        onMouseEnter={() => setCurrentImage(i)}
      >
        <Image
          className="w-full h-full relative object-contain z-70"
          src={`${product?.imagesrc1}${i}.webp`}
          width={64}
          height={64}
          alt={`Product image ${i}`}
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>
    ));
  };

  if (loading) {
    return (
      <div className='min-h-screen flex-col justify-center items-center'>
        <div className='h-96 w-full flex justify-center items-center'><div className="spinner"></div></div>
        <div className='h-1/2  w-full'></div>
      </div>
    );
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className='min-h-screen'>
      <div className="min-h-screen w-full h-screen flex-col justify-center items-center ">
        {product ? (
          <div className='h-full'>        
            <div className='flex justify-center items-center h-2/4 border-2 border-neutral-500'>
              <div className='flex flex-col w-1/12 p-6 h-full bg-neutral-200 space-y-2'>
                {renderSideImages()}
              </div>
              <div className="w-6/12 h-full">
                <div className="w-full h-full overflow-hidden group">
                  <ZoomImage src={`${product?.imagesrc1}${currentImage}.webp`} />
                </div>
              </div>
              <div className='w-5/12 p-6 h-full  bg-neutral-200 space-y-2'>
                <div className='text-black text-5xl font-bold'>{product.designer}</div>
                <div className='text-black text-3xl'>{product.souscategorie}</div>
                <div className='text-black font-bold'>{product.price}<span className='text-neutral-700'> USDT</span> </div> 
                <div className=' text-black'>{product.size}</div> 
                <div className=' text-black'>{product.color}</div> 
                <div className='text-black'>{product.etat}</div> 
                <div className='text-green-800 flex w-full'>
                  Authentificated by our experts 
                  <svg className='ml-1 mt-1' width="3%" height="3%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11.4999L11 13.4999L15.5 8.99987M20 11.9999C20 16.9083 14.646 20.4783 12.698 21.6147C12.4766 21.7439 12.3659 21.8085 12.2097 21.842C12.0884 21.868 11.9116 21.868 11.7903 21.842C11.6341 21.8085 11.5234 21.7439 11.302 21.6147C9.35396 20.4783 4 16.9083 4 11.9999V7.21747C4 6.41796 4 6.0182 4.13076 5.67457C4.24627 5.37101 4.43398 5.10015 4.67766 4.8854C4.9535 4.64231 5.3278 4.50195 6.0764 4.22122L11.4382 2.21054C11.6461 2.13258 11.75 2.0936 11.857 2.07815C11.9518 2.06444 12.0482 2.06444 12.143 2.07815C12.25 2.0936 12.3539 2.13258 12.5618 2.21054L17.9236 4.22122C18.6722 4.50195 19.0465 4.64231 19.3223 4.8854C19.566 5.10015 19.7537 5.37101 19.8692 5.67457C20 6.0182 20 6.41796 20 7.21747V11.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                </div> 
                <div className='h-auto w-full flex-col justify-center items-center border-2 border-neutral-300'>
                  <button className='h-8 w-full flex justify-center items-center bg-black text-white'>Buy</button>
                </div> 
              </div>
              
            </div>
            <div className='h-96 flex w-full border-2 border-neutral-500 border-t-0 text-black  '>
              
            <div className='flex-col justify-center items-top w-1/3 h-full border-2'>
            
            <div className='h-6'></div>
            <div className='text-lg'>
            <div className='text-2xl ml-3 mt-2 font-bold'>Information</div>
            <div className='ml-2'>-{product?.description || product?.souscategorie}</div>

            <div className='ml-2'>-Categorie:   {product?.categorie}</div>
            <div className='ml-2'>-Universe:   {product?.genre}</div>
            <div className='ml-2'>-Designer:   {product?.designer}</div> 
            {product?.size && <div className='ml-2'>-Size: {product.size}</div>}

            </div>


            </div>
         
            <div className='flex-col justify-center items-top w-1/3 h-full border-2'>
          
            <div className='h-6'></div>
            <div className='text-lg'>
            <div className='text-2xl ml-3 mt-2 font-bold'>Authenticity</div>
            <div className='ml-2'> -This article has been approved after verification. All articles are reviewed by our team of experts in this field.</div>
            <div className='text-2xl ml-3 mt-2 font-bold'>Payment</div>
            <div className='ml-2'> -Solana, USDT, BTC, ETH accepted.</div>
            </div>
            
            </div>
            
            <div className='flex-col justify-center items-top w-1/3 h-full border-2'>
          
            <div className='h-6'></div>
            <div className='text-lg'>
            <div className='text-2xl ml-3 mt-2 font-bold'>Shipping</div>
            <div className='ml-2'> -Fast shipping, and free. can be delivered directly to your home or to a relay point.</div>
            <div className='text-2xl ml-3 mt-2 font-bold'>Help</div>
            <div className='ml-2'> -If you have question, check <Link href={"/help"}>here.</Link> </div>
            </div>
            
            </div>
            
            
            </div>
            
            
          </div>
        ) : (
          <div className=''>Aucun produit trouvé.</div>
        )}
        
      </div>
      <div className='h-24'></div>
    </div>
  );
};

export default Page;