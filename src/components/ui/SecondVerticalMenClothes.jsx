"use client";

import Link from "next/link";

export default function SecondVerticalMenClothes() {
  const categories = [
    { name: "Coats", link: "/men/men-clothes/coats" },
    { name: "Knitwear and Sweaters", link: "/men/men-clothes/knitwear-sweaters" },
    { name: "Suits", link: "/men/men-clothes/suits" },
    { name: "All", link: "/men/men-clothes/all" },
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
