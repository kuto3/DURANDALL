"use client";

import Link from "next/link";

export default function SecondVerticalJewelery() {
  const categories = [
    { name: "Bvlgari", link: "/watches-jewelry/jewelry/bvlgari" },
    { name: "Cartier", link: "/watches-jewelry/jewelry/cartier" },
    { name: "Chanel", link: "/watches-jewelry/jewelry/chanel" },
    { name: "Hermès", link: "/watches-jewelry/jewelry/hermes" },
    { name: "Mauboussin", link: "/watches-jewelry/jewelry/mauboussin" },
    { name: "Pomellato", link: "/watches-jewelry/jewelry/pomellato" },
    { name: "Tiffany & Co", link: "/watches-jewelry/jewelry/tiffany-co" },
    { name: "Van Cleef & Arpels", link: "/watches-jewelry/jewelry/van-cleef-arples" },
    { name: "All", link: "/watches-jewelry/jewelry/all" },
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
