"use client";

import Link from "next/link";

export default function SecondVerticalWomenShoes() {
  const categories = [
    { name: "New Arrivals", link: "/women/women-shoes/new-arrivals" },
    { name: "Heeled Shoes", link: "/women/women-shoes/heeled-shoes" },
    { name: "Ankle Boots", link: "/women/women-shoes/ankle-boots" },
    { name: "Boots and Ankle Boots", link: "/women/women-shoes/boots-ankleboots" },
    { name: "Sandals", link: "/women/women-shoes/sandals" },
    { name: "Espadrilles", link: "/women/women-shoes/espadrilles" },
    { name: "Mules and Clogs", link: "/women/women-shoes/mules-clogs" },
    { name: "Sneakers", link: "/women/women-shoes/sneakers" },
    { name: "Loafers", link: "/women/women-shoes/loafers" },
    { name: "Ballerinas", link: "/women/women-shoes/ballerinas" },
    { name: "Derbies and Oxfords", link: "/women/women-shoes/derbies-oxfords" },
    { name: "All Shoes", link: "/women/women-shoes/all" },
  ];

  return (
    <div className="flex">
      <div className="fixed bg-white border-r-2 border-neutral-300 top-20 left-60 h-screen w-64 flex flex-col items-center p-3 space-y-3 z-50">
        <div className="flex flex-col text-sm">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="hover:text-yellow-600  text-neutral-500">
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
