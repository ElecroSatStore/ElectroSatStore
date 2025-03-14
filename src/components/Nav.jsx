'use client'
import Link from "next/link";
import { Cart, List, Person, Search, TV } from "../../svg";


export default function Nav() {
  return (
    <header style={{backdropFilter : 'blur(10px)'}} className="z-10 w-full py-3 px-5 sm:px-10 flex justify-between items-center bg-[rgba(255,255,255,0.7)] sticky top-0">
        <div className="flex lg:gap-20 gap-10 items-center w-8/12">
            <Link href={'/'} className="mb-0 hover:cursor-pointer font-medium uppercase flex items-center gap-2 text-xl sm:text-2xl md:text-3xl"><TV size={30} color={'#0aad0a'}/> ipdemp</Link>
            <div className="rounded-xl border border-gray-300 px-4 hidden md:flex items-center gap-3 w-full lg:w-6/12 hover:cursor-pointer">
                <Search width={15} height={15} color={'gray'}/>
                <div className="py-2">
                    <p className="mb-0 text-gray-500">Rechercher...</p>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
            <Link href={'/cart'} className="hover:cursor-pointer"><Cart size={25} color={'black'}/></Link>
            <button className="hover:cursor-pointer"><Person size={25} color={'black'}/></button>
            <button className="hover:cursor-pointer block md:hidden"><Search width={25} height={25} color={'black'}/></button>
        </div>
    </header>
  )
}
