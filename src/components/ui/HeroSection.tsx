import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="h-48 mt-3 bg-neutral-200 antialised h-auto rounded-3xl -z-10 opacity-90">
      <div className="p-4 mx-auto max-w-screen-xl text-center opacity-1 mt-2">
        
        <h1 className="mb-4 mt-4 text-4xl font-extrabold tracking-tight leading-none text-black  antialised">
        The Crypto Luxury Plateform.
        </h1>
        <p className="font-bold  mb-8 text-lg text-black lg:text-xl sm:px-16 xl:px-48 antialised">
        Buy all items with crypto now possible.
        </p>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between"></div>
        </div>
      </div>
    </section>
  );
}
