import React from 'react'
import Link from 'next/link'

const Bordy4 = () => {
  return (
    <div className=' p-9'>
<Link href="/tutorial">
<article
  className="hover:animate-background rounded-xl bg-gradient-to-r from-neutral-700 via-neutral-700 m-2 to-neutral-700 p-0.5 shadow-xl transition "
>
  <div className="rounded-[10px] p-4 !pt-20 sm:p-6 bg-neutral-900">
    <time datetime="2022-10-10" className="block text-xs text-gray-400">
      Documentation
    </time>

    
      <h3 className="mt-0.5 text-lg font-medium text-white">
        How it's work ?
      </h3>


    <div className="mt-4 flex flex-wrap gap-1">
      <span
        className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs text-white-600 bg-orange-950 text-purple-100 border border-red-500"
      >
        Publish a smart contract
      </span>
    </div>
  </div>
</article>
</Link>
    </div>
  )
}

export default Bordy4