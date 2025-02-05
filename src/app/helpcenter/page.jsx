"use client"

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const page = () => {
    const pathname = usePathname();
  
    // Convertir l'URL en segments pour le breadcrumb
    const segments = pathname.split("/").filter((segment) => segment);
  return (
 
  
    <div className='min-h-screen flex-col justify-center items-center'>
        <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1 text-sm text-yellow-600">
          <li>
            <Link href="/" className="block transition hover:text-gray-700">
              <span className="sr-only"> Home </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </li>
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <Link href={`/${segments.slice(0, index + 1).join("/")}`} className="block transition hover:text-gray-700">
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ol>
      </nav>
    <div className='w-full flex justify-center items-center font-bold text-neutral-700 text-2xl'>Our Concept</div>
    <div className='h-12'></div>
    <div className='h-96 w-full bg-neutral-200 rounded-xl p-6'>
        <div className='bg-neutral-300 w-full h-full p-6'>
            <div className='text-neutral-700 text-lg'>On our website, we are redefining the luxury fashion industry by making it accessible to everyone. Our mission is simple: to provide you with the most prestigious brands and exclusive pieces, sourced directly from trusted suppliers, all in exchange for cryptocurrency.

We are pioneers of a new era where high-end shopping meets blockchain technology. No more traditional barriers to luxury! Whether you're a fashion enthusiast or a savvy investor, we offer you a seamless, secure, and modern shopping experience.

With us, excellence is no longer a privilege reserved for a few but an opportunity open to all. We are the architects of a marketplace where elegance and innovation come together to reshape the standards of premium shopping. 💎🚀</div>

        </div>
    </div>
    </div>
  )
}

export default page