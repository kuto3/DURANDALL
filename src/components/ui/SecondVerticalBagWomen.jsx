"use client";

import Link from "next/link";

export default function SecondVerticalBagWomen() {
  const categories = [
    { name: "All Bags", link: "/bags/women/all-bags" },
    { name: "Handbags", link: "/bags/women/handbags" },
    { name: "Shoulder Bags", link: "/bags/women/shoulder-bags" },
    { name: "Tote Bags", link: "/bags/women/tote-bags" },
    { name: "Crossbody Bags", link: "/bags/women/crossbody-bags" },
    { name: "Clutches", link: "/bags/women/clutches" },
    { name: "Backpacks", link: "/bags/women/backpacks" },
    { name: "Travel Bags", link: "/bags/women/travel-bags" },
    { name: "Satchels", link: "/bags/women/satchels" },
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
