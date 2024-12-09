import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="rounded-lg shadow sm:flex sm:items-center sm:justify-between p-2 sm:p-6 xl:p-8  bg-neutral-900 antialiased">
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        &copy; 2024{' '}
        <span className="hover:underline "  rel="noopener noreferrer">
            CertiFi
        </span>
      </p>
      <p className="mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0">
        <span >
        ⛓️⛓️
        </span>
      </p>
      <div className="flex justify-center items-center space-x-1">
       
      <Link href={"https://x.com/Certifiyou"}>
        <span
          data-tooltip-target="tooltip-twitter"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
            />
          </svg>
        </span>
      </Link>
      </div>
    </footer>
  );
};

export default Footer;
