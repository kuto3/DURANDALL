"use client";

import Link from "next/link";

export default function SecondVerticalDesigner() {
  const brands = [
    { name: "Balenciaga", link: "/bags/designer/balenciaga" },
    { name: "Balmain", link: "/bags/designer/balmain" },
    { name: "Burberry", link: "/bags/designer/burberry" },
    { name: "Bvlgari", link: "/bags/designer/bvlgari" },
    { name: "Cartier", link: "/bags/designer/cartier" },
    { name: "Chanel", link: "/bags/designer/chanel" },
    { name: "Christian Louboutin", link: "/bags/designer/christian-louboutin" },
    { name: "Dior", link: "/bags/designer/dior" },
    { name: "Dolce & Gabbana", link: "/bags/designer/dolce-gabbana" },
    { name: "Fendi", link: "/bags/designer/fendi" },
    { name: "Gucci", link: "/bags/designer/gucci" },
    { name: "Hermès", link: "/bags/designer/hermes" },
    { name: "Isabel Marant", link: "/bags/designer/isabel-marant" },
    { name: "Louis Vuitton", link: "/bags/designer/louis-vuitton" },
    { name: "Yves Saint Laurent", link: "/bags/designer/ysl" },
    { name: "All", link: "/bags/all" },
  ];

  return (
    <div className="flex">
      <div className="fixed bg-white border-r-2 border-neutral-300 top-20 left-60 h-screen w-64 flex flex-col items-center p-3 space-y-3 z-50">
        <div className="flex flex-col text-sm">
          {brands.map((brand, index) => (
            <Link key={index} href={brand.link} className="hover:text-yellow-600 text-neutral-500">
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
