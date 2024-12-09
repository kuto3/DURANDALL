import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Bordy6 = () => {
  return (
    <div className="p-9">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700 overflow-hidden">
          <div className="rounded-[10px] p-4 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/ethereum (1).png"
              alt="Ethereum Logo"
              className="w-16 h-16 mb-4 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center ">
              Blockchain for Diploma Security
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              The blockchain ensures the <span className='font-bold text-orange-800' >authenticity</span> of diplomas and certificates.<br/><br/> Once registered, these documents <span className='font-bold text-orange-800' >cannot be altered</span> , offering unparalleled security and protection against fraud.
            </p>
          </div>
        </article>
        <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700">
          <div className="rounded-[10px] p-5 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/blockchain (1).png"
              alt="Blockchain Logo"
              className="w-16 h-16 mb-4 mx-auto" 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center">
              Blockchain for Verifiable Credentials
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              The verification process for diplomas and certificates becomes decentralized and <span className='font-bold text-orange-800' >transparent</span>.
            </p>
          </div>
        </article>
        <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-700">
          <div className="rounded-[10px] p-6 !pt-20 sm:p-6 bg-neutral-900 h-96">
            <Image
              src="/contract.png"
              alt="Contract Logo"
              className="w-16 h-16 mb-4 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="mt-0.5 text-lg font-medium text-white text-center">
              What is useful to put in Blockchain?
            </h3>
            <p className="mt-4 text-sm text-gray-300 text-center">
              We can literally put anything, we will be able to secure <span className='font-bold text-orange-800' >Diploma</span>, <span className='font-bold text-orange-800' >Insurance contract</span>, <span className='font-bold text-orange-800' >Vocational training certificates</span> and more...
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Bordy6
