import React from 'react';
import Image from 'next/image';

const Bodythree = () => {
  return (
    <div className="flex flex-col items-center mr-9 ml-9 p-2">
      {/* Header displayed only for larger screens */}
      <div className="hidden lg:block font-semibold text-neutral-300 text-center font underline mt-9 text-2xl font-semibold mb-1 text-white text-center underline mb-4">
        How it works?
      </div>
      
    


      {/* Steps arranged in a row with spacing for larger screens */}
      <div className="hidden lg:flex flex-row justify-between w-full gap-32 mt-9">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center flex-1 mb-8">
          <h3 className="text-lg font-semibold mb-1 text-neutral-200">Step 1</h3>
          <p className="text-sm text-neutral-300">Upload your diploma for verification and integration.</p>
          <div className="overflow-hidden rounded-lg mb-2 mt-4">
            <Image
              src="/11.png"
              alt="Step 1: Upload your diploma"
              layout="intrinsic"
              width={2400}
              height={1200}
              className="object-contain"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center flex-1 mb-8">
          <h3 className="text-lg font-semibold mb-1 text-neutral-200">Step 2</h3>
          <p className="text-sm text-neutral-300">Whitelist the people that you want in the blockchain.</p>
          <div className="overflow-hidden rounded-lg mb-2 mt-4">
            <Image
              src="/55.png"
              alt="Step 2: Enter details"
              layout="intrinsic"
              width={2400}
              height={1200}
              className="object-contain"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center flex-1 mb-8">
          <h3 className="text-lg font-semibold mb-1 text-neutral-200 ">Step 3</h3>
          <p className="text-sm text-neutral-300">Let the whitelist mint their Diploma as NFT.</p>
          <div className="overflow-hidden rounded-lg mb-2 mt-4">
            <Image
              src="/22.png"
              alt="Step 3: Confirm and Submit"
              layout="intrinsic"
              width={2400}
              height={1200}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Mobile view - header and steps in a vertical line */}
      <div className="lg:hidden flex flex-col items-center w-full mt-9">
        <h1 className='text-3xl font-semibold mb-1 text-neutral-300 text-center w-full mb-5 underline text-xl font-semibold mb-1 text-white text-center underline mb-4'>How it works?</h1>
       

        {/* Steps arranged in a vertical line for mobile */}
        <div className="flex flex-col items-center w-full">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center mb-8 w-full">
            <h3 className="text-lg font-semibold mb-1 text-neutral-200 mt-9">Step 1: Upload</h3>
            <p className="text-sm text-neutral-300">Upload your diploma for verification and integration.</p>
            <div className="overflow-hidden rounded-lg border-2 border-gray-600 mb-2 mt-4">
              <Image
                src="/11.png"
                alt="Step 1: Upload your diploma"
                layout="intrinsic"
                width={2400}
                height={1200}
                className="object-contain"
              />
            </div>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center mb-8 w-full">
            <h3 className="text-lg font-semibold mb-1 text-neutral-200">Step 2: Enter Details</h3>
            <p className="text-sm text-neutral-300">Whitelist the people that you want in the blockchain.</p>
            <div className="overflow-hidden rounded-lg border-2 border-gray-600 mb-2 mt-4">
              <Image
                src="/55.png"
                alt="Step 2: Enter details"
                layout="intrinsic"
                width={2400}
                height={1200}
                className="object-contain"
              />
            </div>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center mb-8 w-full">
            <h3 className="text-lg font-semibold mb-1 text-neutral-200">Step 3: Confirm</h3>
            <p className="text-sm text-neutral-300">Let the whitelist mint their Diploma as NFT.</p>
            <div className="overflow-hidden rounded-lg border-2 border-gray-600 mb-2 mt-4">
              <Image
                src="/22.png"
                alt="Step 3: Confirm and Submit"
                layout="intrinsic"
                width={2400}
                height={1200}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      

      {/* Call-to-action button */}
      <div className="mt-4 flex justify-center">
        {/* You can add other elements here if needed */}
      </div>
    </div>
  );
};

export default Bodythree;
