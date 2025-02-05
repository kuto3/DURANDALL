"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SlotMachineList from "@/components/ui/SmallDiplomalist";
import Link from "next/link";

const filters = [
  { name: "Color", options: ["Black", "Gold", "White", "Red", "Brown"] },
  { name: "Size", options: ["S", "M", "L", "XL"] },
  { name: "Price", options: ["High to Low", "Low to High"] },
];

const Page = ({ name, type, genre, souscategorie, title, description }) => {
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const pathname = usePathname();
  
  // Convertir l'URL en segments pour le breadcrumb
  const segments = pathname.split("/").filter((segment) => segment);

  const handleFilterSelect = (filterName, option) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: option
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb dynamique */}
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

      <div className="text-4xl text-black flex justify-center items-center">{title}</div>
      <div className="h-6"></div>
      <div className="text-xl text-black flex justify-center items-center">
        {description} 
      </div>
      <div className="h-12"></div>
      <div className="h-full w-full">
        {/* Filtres */}
        <div className="flex justify-center items-center w-full h-40 border-2 border-neutral-300 relative space-x-1">
          {filters.map((filter, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-1/4 h-1/2 relative"
              onMouseEnter={() => setHoveredFilter(index)}
              onMouseLeave={() => setHoveredFilter(null)}
            >
              <div className="cursor-pointer">{filter.name}</div>
              <div className="border-2 w-full h-1/2 border-neutral-300 rounded-lg">
                {selectedFilters[filter.name] || "Select"}
              </div>

              {hoveredFilter === index && (
                <div className="absolute top-full bg-white border border-neutral-300 rounded-lg shadow-lg w-64 p-2 z-10">
                  {filter.options.map((option, idx) => (
                    <div
                      key={idx}
                      className="p-2 hover:bg-neutral-200 cursor-pointer"
                      onClick={() => handleFilterSelect(filter.name, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Liste des machines à sous */}
        <SlotMachineList 
          name={name} 
          type={type} 
          genre={genre || ""} 
          souscategorie={souscategorie || ""}
          param={selectedFilters}
        />
      </div>
      <div className="h-32"></div>
    </div>
  );
};

export default Page;
