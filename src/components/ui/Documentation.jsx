import React from 'react'
import Link from 'next/link'

const Documentation = () => {
  return (

<Link href="/createslotgame">
<article
  className="hover:animate-background rounded-xl bg-white border-2 border-neutral-300 p-0.5  transition "
>
  <div className="rounded-[10px] p-4 !pt-20 sm:p-6 bg-white">
    <time datetime="2022-10-10" className="block text-xs text-black">
      Documentation
    </time>

    
      <h3 className="mt-0.5 text-lg font-medium text-black">
        How create a game ?
      </h3>


    <div className="mt-4 flex flex-wrap gap-1">
      <span
        className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs text-white-600 bg-yellow-950 text-yellow-100 border border-yellow-400"
      >
        Win money
      </span>
    </div>
  </div>
</article>
</Link>

  )
}

export default Documentation