import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className=" mt-3 antialised">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div  className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white rounded-full bg-neutral-800 dark:text-white">
          <span className="text-xs bg-neutral-900 rounded-full text-white px-4 py-1.5 mr-3">New</span>
          <span className="text-sm font-medium ">Certifi is launch!</span>
        </div>
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-6xl text-neutral-400 antialised">
        Decentralized application, buy company shares
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-400 lg:text-xl sm:px-16 xl:px-48">
        Create smart contract for more secure diplomas, and certificates.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link href="#steps" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-neutral-400 rounded-lg bg-primary-700  dark:focus:ring-yellow-900">
            Learn more
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between"></div>
        </div>
      </div>
    </section>
  );
}
