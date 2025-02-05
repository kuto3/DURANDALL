"use client";

import Link from "next/link";

export default function SecondVerticalIconic() {
  const categories = [
    { name: "2.55", link: "/bags/iconic/255" },
    { name: "Birkin 35", link: "/bags/iconic/birkin-35" },
    { name: "Boy", link: "/bags/iconic/boy" },
    { name: "Constance", link: "/bags/iconic/constance" },
    { name: "Dionysus", link: "/bags/iconic/dionysus" },
    { name: "Kelly 32", link: "/bags/iconic/kelly-32" },
    { name: "Lady Dior", link: "/bags/iconic/lady-dior" },
    { name: "Marmont", link: "/bags/iconic/marmont" },
    { name: "Neverfull", link: "/bags/iconic/neverfull" },
    { name: "Noé", link: "/bags/iconic/noe" },
    { name: "Saddle", link: "/bags/iconic/saddle" },
    { name: "Speedy", link: "/bags/iconic/speedy" },
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
