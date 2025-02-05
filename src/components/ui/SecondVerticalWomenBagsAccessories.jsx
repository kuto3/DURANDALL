"use client";

import Link from "next/link";

export default function SecondVerticalWomenBagsAccessories() {
  const categories = [
    { name: "All Bags", link: "/women/bags-accessories/all" },
    { name: "Handbags", link: "/women/bags-accessories/handbags" },
    { name: "Shoulder Bags", link: "/women/bags-accessories/shoulder-bags" },
    { name: "Tote Bags", link: "/women/bags-accessories/tote-bags" },
    { name: "Crossbody Bags", link: "/women/bags-accessorie/crossbody-bags" },
    { name: "Clutches", link: "/women/bags-accessories/clutches" },
    { name: "Backpacks", link: "/women/bags-accessories/backpacks" },
    { name: "Travel Bags", link: "/women/bags-accessories/travel-bags" },
    { name: "Satchels", link: "/women/bags-accessories/satchels" },
    { name: "Silk squares", link: "/women/bags-accessories/silk-squares" },
    { name: "Wallets", link: "/women/bags-accessories/wallets" },
    { name: "Belts", link: "/women/bags-accessories/belts" },
    { name: "Small leather goods", link: "/women/bags-accessories/small-leather-goods" },
    { name: "All Accessories", link: "/women/bags-accessories/all-accessories" },
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