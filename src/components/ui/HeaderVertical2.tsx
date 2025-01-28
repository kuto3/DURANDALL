import Link from "next/link";

// components/Header.jsx

export default function HeaderVertical() {
    return (
        <div className="fixed bg-neutral-900 top-20 left-0 h-screen w-40 bg-gray-800 flex flex-col items-center p-9 space-y-3 z-50 p-3">
    {/* Icônes ou liens dans la barre verticale */}
    <div className="h-2"></div>
    <Link href="/games" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
        PLAY
    </Link>
   
    <Link href="/createslotgame" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
       CREATE 
    </Link>

    <Link href="/createslotgame" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
       CRASH
    </Link>
    <Link href="/createslotgame" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
       PLINKO 
    </Link>
    <Link href="/createslotgame" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
       HORSE 
    </Link>
    <div className="w-12 border-t-2 border-neutral-800"></div>
    <Link href="/createslotgame" className="flex justify-center items-center text-white text-lg font-bold h-8 w-32 p-4 rounded-lg bg-purple-900  text-sm" >
       HELP CENTER 
    </Link>
    
  </div>
    );
  }
  