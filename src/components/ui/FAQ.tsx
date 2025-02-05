import React from 'react';

const FAQ = () => {
  return (
    <>
 
    <div className="space-y-4">



      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between  rounded-lg p-4 bg-white text-black border-2 border-neutral-300"
        >
          <h2 className="font-medium">Is the shipping free?</h2>

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

        <p className="mt-4 px-4 leading-relaxed text-black">
        No hidden fees, no extra costs—just fast and secure delivery straight to your doorstep
        </p>
      </details>

      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
            className="flex cursor-pointer items-center justify-between  rounded-lg p-4 bg-white text-black border-2 border-neutral-300"
        >
          <h2 className="font-medium">Is the product authentic?</h2>

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

        <p className="mt-4 px-4 leading-relaxed text-black">
        We inspect every piece of luxury clothing we sell to ensure its authenticity. 
        </p>
      </details>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
           className="flex cursor-pointer items-center justify-between  rounded-lg p-4 bg-white text-black border-2 border-neutral-300"
        >
          <h2 className="font-medium">What is the project ?</h2>

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

        <p className="mt-4 px-4 leading-relaxed text-black">
          Make possible to buy our fovorite luxury items with crypto.
        </p>
      </details>

    </div>
    </>
  );
}

export default FAQ;
