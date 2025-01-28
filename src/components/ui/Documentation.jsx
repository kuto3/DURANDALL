import React from 'react'
import Link from 'next/link'

const Documentation = () => {
  return (

<Link href="/createslotgame">
<article
  className="hover:animate-background rounded-xl bg-neutral-700 p-0.5 shadow-xl transition "
>
  <div className="rounded-[10px] p-4 !pt-20 sm:p-6 bg-neutral-900">
    <time datetime="2022-10-10" className="block text-xs text-gray-400">
      Documentation
    </time>

    
      <h3 className="mt-0.5 text-lg font-medium text-white">
        How create a game ?
      </h3>


    <div className="mt-4 flex flex-wrap gap-1">
      <span
        className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs text-white-600 bg-purple-950 text-purple-100 border border-purple-400"
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