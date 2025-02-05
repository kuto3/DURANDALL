import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Info = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 ">
      <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-300 overflow-hidden">
          <div className="rounded-[10px] bg-white h-auto px-6 m-2">
            <Image
              src="/star.webp"
              alt="Ethereum Logo"
              className="w-8 h-8 mb-1 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="text-lg font-bold text-black text-center ">
            Authenticity
            </h3>
            <p className="text-sm text-black text-center">
            We carefully inspect every piece of luxury clothing we sell to ensure its authenticity. We are committed to providing our customers with high-quality, authentic luxury fashion that they can trust.
            </p>
          </div>
        </article>
        <article className="rounded-xl m-2 p-0.5 border-2 border-neutral-300 overflow-hidden">
          <div className="rounded-[10px] bg-white h-auto m-2">
            <Image
              src="/star.webp"
              alt="Ethereum Logo"
              className="w-8 h-8 mb-1 mx-auto " 
              height={100}
              width={100}
            />
            <h3 className="text-lg text-black text-center font-bold">
              Shipping
            </h3>
            <p className="text-sm text-black text-center">
            We are pleased to offer free shipping on all orders! No hidden fees, no extra costs—just fast and secure delivery straight to your doorstep. Shop with confidence and enjoy a seamless shopping experience with us.
            </p>
          </div>
        </article>
      </div>
  )
}

export default Info
