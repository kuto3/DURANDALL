"use client";

import Link from "next/link";

export default function SecondVerticalMenShoes() {
  const categories = [
    { name: "New Arrivals", link: "/men/men-shoes/new-arrivals" },
    { name: "Sneakers", link: "/men/men-shoes/sneakers" },
    { name: "Boots and ankle boots", link: "/men/men-shoes/boots-ankle-boots" },
    { name: "Derbies", link: "/men/men-shoes/derbies" },
    { name: "Flat shoes", link: "/men/men-shoes/flat-shoes" },
    { name: "Sandals", link: "/men/men-shoes/sandals" },
    { name: "Espadrilles", link: "/men/men-shoes/espadrilles" },
    { name: "All shoes", link: "/men/men-shoes/all" },
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
