import React from 'react';

const FAQ = () => {
  return (
    <div className="space-y-4 mr-9 ml-9 p-2">

      <div className="h-6"></div>

      <details className="group [&_summary::-webkit-details-marker]:hidden" open>
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 bg-neutral-900 text-white border-2 border-neutral-700"
        >
          <h2 className="font-medium">How easy is it to use?</h2>

          <svg
            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="mt-4 px-4 leading-relaxed text-gray-200 dark:text-gray-200">
          It is very simple you just have to go in <span className='font-bold'>CREATE</span> and mint a contract with the image, description, and title that you want and then it publish on the blockchain the smart contract, you will can after whitelist people and let them mint the Certificates (NFT) that you have described. It can be a degree, a certificate, or much more!
        </p>
      </details>

      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 bg-neutral-900 text-white border-2 border-neutral-700"
        >
          <h2 className="font-medium">How much does it cost?</h2>

          <svg
            className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <p className="mt-4 px-4 leading-relaxed text-gray-200 dark:text-gray-200">
          <span className='font-bold'>Nothing</span> except the gas price that you will pay to deploy the contract on the blockchain that depends on which blockchain you put your contract in.
        </p>
      </details>
    </div>
  );
}

export default FAQ;
