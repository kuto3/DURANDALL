import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="h-48 mt-3 antialised h-auto rounded-3xl bg-[url('/background_casino.jpg')] opacity-90">
      <div className="p-4 mx-auto max-w-screen-xl text-center ">
        <div  className="inline-flex justify-between items-center py-1 px-1 pr-4 text-sm text-white rounded-full bg-neutral-800 dark:text-white">
          <span className="text-xs bg-neutral-900 rounded-full text-white px-4 py-1.5 mr-3">New</span>
          <span className="text-sm font-medium ">MULTISLOT is launch!</span>
        </div>
        <h1 className="mb-4 mt-4 text-4xl font-extrabold tracking-tight leading-none text-white  antialised">
        The First Decentralized Casino
        </h1>
        <p className="font-bold  mb-8 text-lg text-gray-400 lg:text-xl sm:px-16 xl:px-48 text-neutral-100 antialised">
        Create your own game, play and win money !
        </p>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between"></div>
        </div>
      </div>
    </section>
  );
}
