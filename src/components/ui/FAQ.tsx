import React from 'react';

const FAQ = () => {
  return (
    <>
 
    <div className="space-y-4 mr-9 ml-9 p-2">

      <div className="h-6"></div>

      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg p-4 bg-neutral-900 text-white border-2 border-neutral-700"
        >
          <h2 className="font-medium">How create a casino game?</h2>

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
        go to the create section 
        </p>
      </details>

      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-900 p-4 text-white border-2 border-neutral-700"
        >
          <h2 className="font-medium">Where can i play ?</h2>

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
         Go buy some gems and you ready play in the casino
        </p>
      </details>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg  p-4 bg-neutral-900 text-white border-2 border-neutral-700"
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

        <p className="mt-4 px-4 leading-relaxed text-gray-200 dark:text-gray-200">
          Make a casino that everyone can own for making the best game possible for fun 
        </p>
      </details>

    </div>
    </>
  );
}

export default FAQ;
