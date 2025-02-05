"use client";

import Link from "next/link";

export default function SecondVerticalWatch() {
  const brands = [
    { name: "Audemars Piguet", link: "/watches-jewelry/watches/audemars-piguet" },
    { name: "Cartier", link: "/watches-jewelry/watches/cartier" },
    { name: "Chanel", link: "/watches-jewelry/watches/chanel" },
    { name: "Patek Philippe", link: "/watches-jewelry/watches/patek-philippe" },
    { name: "Rolex", link: "/watches-jewelry/watches/rolex" },
    { name: "All", link: "/watches-jewelry/watches/all" },
  ];

  return (
    <div className="flex">
      <div className="fixed bg-white border-r-2 border-neutral-300 top-20 left-60 h-screen w-64 flex flex-col items-center p-3 space-y-3 z-50">
        <div className="flex flex-col text-sm">
          {brands.map((brand, index) => (
            <Link key={index} href={brand.link} className="hover:text-yellow-600  text-neutral-500">
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
